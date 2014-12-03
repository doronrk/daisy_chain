// Declare global variables
var addthis_config = {},
	addthis_share = {},
	hidpi_query = "@media screen and (-o-min-device-pixel-ratio: 5/4),screen and (-webkit-min-device-pixel-ratio: 1.25),screen and (min-resolution: 120dpi)",
	$id = function(elem){return document.getElementById(elem);},
	$tag= function(t){return document.getElementsByTagName(t);},
	$elem = function(tag){return document.createElement(tag);},
	$txt = function(text){return document.createTextNode(text);}

// Common classes and prototypes
String.prototype.htmlEncode=function(){return this.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');};Array.prototype.indexOf=function(o,s){for(var i=(s||0),j=this.length;i<j;i++){if(this[i]===o){return i;}}return -1;};Array.prototype.removeByValue=function(s){for(var i=0,l=this.length;i<l;i++){if(this[i]==s){this.splice(i,1);break;}}};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};String.prototype.toNumber=function(){var r=new RegExp('(-?[0-9]+)([0-9]{3})'),v=this+'';while(r.test(v))v=v.replace(r,'$1,$2');return v};Number.prototype.toNumber=function(){return this.toString().toNumber()};String.prototype.toCurrency=function(){var num=this.toString().replace(/\$|\,/g,'');if(isNaN(num))return"0.00";var sign=(num==(num=Math.abs(num)));num=Math.floor(num*100+0.50000000001);var cents=num%100;num=Math.floor(num/100).toString();if(cents<10)cents="0"+cents;return num+"."+cents;};String.prototype.padLeft=function(len){var character="0";var str=this;if(arguments>1)character=arguments[1];for(var x=str.length;x<len;x++)str=character+str+'';return str;};String.prototype.startsWith=function(str){return(this.indexOf(str)==0)?true:false;};String.prototype.endsWith=function(str){return(this.indexOf(str)==(this.length+1)-str.length)?true:false;};String.prototype.isEmailAddress=function(){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this);};String.prototype.isDate=function(){return/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}$/.test(this);};String.prototype.isInteger=function(){return(isNaN(this)||this.indexOf('.')!=-1)?false:true;};String.prototype.isCurrency=function(){return/^\d+(\.\d{2})?$/.test(this);};String.prototype.isPhoneNumber=function(){return/^\d{3}(-)?\d{3}(-)?\d{4}(.+)?/.test(this);};Date.prototype.Add=function(strInterval,intIncrement){if(strInterval!="M"&&strInterval!="D"&&strInterval!="Y"&&strInterval!="h"&&strInterval!="m"&&strInterval!="ms"&&strInterval!="uM"&&strInterval!="uD"&&strInterval!="uY"&&strInterval!="uh"&&strInterval!="um"&&strInterval!="us"&&strInterval!="ums")throw("DateAdd: Second parameter must be M, D, Y, h, m, ms, uM, uD, uY, uh, um, us, or ums");if(typeof(intIncrement)!="number")throw("DateAdd: Third parameter must be a number");var dtNew=new Date(this.toString());switch(strInterval){case"M":dtNew.setMonth(parseInt(this.getMonth())+parseInt(intIncrement));break;case"D":dtNew.setDate(parseInt(this.getDate())+parseInt(intIncrement));break;case"Y":dtNew.setYear(parseInt(this.getYear())+parseInt(intIncrement));break;case"h":dtNew.setHours(parseInt(this.getHours())+parseInt(intIncrement));break;case"m":dtNew.setMinutes(parseInt(this.getMinutes())+parseInt(intIncrement));break;case"s":dtNew.setSeconds(parseInt(this.getSeconds())+parseInt(intIncrement));break;case"ms":dtNew.setMilliseconds(parseInt(this.setMilliseconds())+parseInt(intIncrement));break;case"uM":dtNew.setUTCMonth(parseInt(this.getUTCMonth())+parseInt(intIncrement));break;case"uD":dtNew.setUTCDate(parseInt(this.getUTCDate())+parseInt(intIncrement));break;case"uY":dtNew.setUTCFullYear(parseInt(this.getUTCFullYear())+parseInt(intIncrement));break;case"uh":dtNew.setUTCHours(parseInt(this.getUTCHours())+parseInt(intIncrement));break;case"um":dtNew.setUTCMinutes(parseInt(this.getUTCMinutes())+parseInt(intIncrement));break;case"us":dtNew.setUTCSeconds(parseInt(this.getUTCSeconds())+parseInt(intIncrement));break;case"ums":dtNew.setUTCMilliseconds(parseInt(this.getUTCMilliseconds())+parseInt(intIncrement));break;};return dtNew;};Date.prototype.getWeek=function(){var onejan=new Date(this.getFullYear(),0,1);return Math.ceil((((this-onejan)/86400000)+onejan.getDay()+1)/7);};Date.prototype.getDayOfYear=function(){var onejan=new Date(this.getFullYear(),0,1);return Math.ceil((this-onejan)/86400000);};Date.prototype.getDaysInMonth=function(){var m=new Number(this.getMonth());var y=new Number(this.getYear());var tmpDate=new Date(y,m,28);var checkMonth=tmpDate.getMonth();var lastDay=27;while(lastDay<=31){temp=tmpDate.setDate(lastDay+1);if(checkMonth!=tmpDate.getMonth())break;lastDay++;};return lastDay;};Date.prototype.isLeapYear=function(){return(new Date(theYear,1,29).getDate()==29);};Date.prototype.toFormattedString=function(args){var str="";var months=["January","February","March","April","May","June","July","August","September","October","November","December"];var shortmonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var shortdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];var monthdays=["31","28","31","30","31","30","31","31","30","31","30","31"];var ampm=["AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM"];var hr12time=["12","1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11"];var ordsuff=["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];for(var x=0;x<args.length;x++){switch(args.charAt(x)){case"d":str+=this.getDate().toString().padLeft(2);break;case"D":str+=shortdays[this.getDay()];break;case"j":str+=this.getDate().toString();break;case"l":str+=days[this.getDay()];break;case"N":str+=(this.getDay()+1).toString();break;case"S":str+=ordsuff[this.getDate()-1];break;case"w":str+=this.getDay().toString();break;case"z":str+=this.getDayOfYear().toString();break;case"W":str+=this.getWeek().toString();break;case"F":str+=months[this.getMonth()];break;case"m":str+=(this.getMonth()+1).toString().padLeft(2);break;case"M":str+=shortmonths[this.getMonth()];break;case"n":str+=(this.getMonth()+1).toString();break;case"t":str+=(this.isLeapYear()&&this.getMonth()==1)?"29":monthdays[this.getMonth()];break;case"L":str+=(this.isLeapYear())?"1":"0";break;case"Y":str+=this.getFullYear().toString();break;case"y":str+=this.getFullYear().toString().substr(2);break;case"a":str+=ampm[this.getHours()].toLowerCase();break;case"A":str+=ampm[this.getHours()];break;case"g":str+=hr12time[this.getHours()];break;case"G":str+=this.getHours().toString();break;case"h":str+=hr12time[this.getHours()].padLeft(2);break;case"H":str+=this.getHours().toString().padLeft(2);break;case"i":str+=this.getMinutes().toString().padLeft(2);break;case"s":str+=this.getSeconds().toString().padLeft(2);break;default:str+=args.charAt(x);break;}};return str;};
// Cookie
var Cookie={get:function(name){var getValue=function(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr));};var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i<clen){var j=i+alen;if(document.cookie.substring(i,j)==arg)return getValue(j);i=document.cookie.indexOf(" ",i)+1;if(i==0)break;};return null;},set:function(name,value,expires,path,domain,secure){tmppath=(path!="")?path:basePath;tmpdomain=(domain!="")?domain:location.hostname;document.cookie=name+"="+((value == null) ? null : value.replace(';', encodeURIComponent(';')))+((expires)?"; expires="+expires.toGMTString():"")+((tmppath)?"; path="+tmppath:"")+((tmpdomain)?"; domain="+tmpdomain:"")+((secure)?"; secure":"");},fixDate:function(date){var base=new Date(0);var skew=base.getTime();if(skew>0)date.setTime(date.getTime()-skew);}}
// Form validation
var FormValidation={isInteger:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isInteger())e.IsValid=true;else e.IsValid=false;}},isDate:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isDate())e.IsValid=true;else e.IsValid=false;}},isNotPastDate:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isDate()){var d=new Date(Date.parse(e.Value));var now=new Date();now.setHours(0);now.setMinutes(0);now.setSeconds(0);now.setMilliseconds(0);if(d.getTime()<now.getTime())e.IsValid=false;else e.IsValid=true;}else e.IsValid=false;}},isCurrency:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isCurrency())e.IsValid=true;else e.IsValid=false;}},isEmailAddress:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isEmailAddress())e.IsValid=true;else e.IsValid=false;}},isPhoneNumber:function(sender,e){if(e.Value.length==0)e.IsValid=false;else{if(e.Value.isPhoneNumber())e.IsValid=true;else e.IsValid=false;}},validateNewsletter:function(sender,e){var cbNewsletter=$id("cbNewsletter");var cblDept=$id("cblDept");if(cblDept){if(!cbNewsletter||cbNewsletter.checked){var numSelected=0;var items=cblDept.getElementsByTagName("input");for(var x=0;x<items.length;x++)if(items[x].type=='checkbox'&&items[x].checked)numSelected++;if(numSelected>0)e.IsValid=true;else e.IsValid=false;}else e.IsValid=true;}},passwordLength:function(sender,e){if(e.Value.length>=5)e.IsValid=true;else e.IsValid=false;return;},duplicateCustomerEmail:function(sender,e){e.IsValid=true/*Force server-side validation*//*$.ajax({async:false,type:"POST",url:"/ajax/customers.aspx",dataType:"json",data:{a:"d",e:e.Value},success:function(data){e.IsValid=(data.StrVal=="1")?false:true;},error:function(xhr,status,err){e.IsValid=false;}});*/},validateStateZip:function(state,zip){var result=false;$.ajax({async:false,type:"POST",url:"/ajax/customers.aspx",dataType:"json",data:{a:"sz",z:zip,s:state},success:function(data){result=(data.StrVal=="1")?true:false;},error:function(xhr,status,err){result=false;}});return result;},validateGiftCard:function(order,card,pin){return true;},validateRecipient:function(sender,e){var rblRecipient=$id("rblRecipient");if(rblRecipient){var buttons=rblRecipient.getElementsByTagName("input");if(buttons.length>1&&buttons[1].checked){if(e.Value.length==0){e.IsValid=false;return;}}};e.IsValid=true;return;},messageLength:function(sender,e){var rblRecipient=$id("rblRecipient");if(rblRecipient){var buttons=rblRecipient.getElementsByTagName("input");if(buttons.length>1&&buttons[1].checked){if(e.Value.length>250){e.IsValid=false;return;}}};e.IsValid=true;return;},isValidCardNum:function(type,ccnum){var re;if(type=="001")re=/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;else if(type=="002")re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;else if(type=="004")re = /^6011-?\d{4}-?\d{4}-?\d{4}$/;if(typeof(re)=="undefined")return true;if(!re.test(ccnum))return false;ccnum=ccnum.split("-").join("");var checksum=0;for(var i=(2-(ccnum.length%2));i<=ccnum.length;i+=2)checksum+=parseInt(ccnum.charAt(i-1));for(var i=(ccnum.length%2)+1;i<ccnum.length;i+=2){var digit=parseInt(ccnum.charAt(i-1))*2;if(digit<10)checksum+=digit;else checksum+=(digit-9);}if((checksum%10)==0)return true;else return false;},isValidExpDate:function(month,year){var expdate=new Date(),now=new Date;expdate.setMonth(month-1);expdate.setDate(expdate.getDaysInMonth());expdate.setYear(year);if(expdate.getTime()<now.getTime())return false;return true;},creditCardNumber:function(sender,e){var ddlCardType=$id("card_type");if(!ddlCardType)ddlCardType=$id("ddlCardType");if(!ddlCardType)ddlCardType=$id("hdnVerifyCardType");if(!ddlCardType)ddlCardType=$id("ddlCustomerCardType");if(!ddlCardType)ddlCardType=$id("ddlGuestCardType");if(!ddlCardType)ddlCardType=$id("ddlEditCardType");if(ddlCardType){console.log(ddlCardType);var num=e.Value.replace(/[^0-9]/g,'');var type=ddlCardType.value;if(e.Value.indexOf("*")==0){e.IsValid=true;return;}else if(type=="Visa"&&num.length!=13&&num.length!=16){e.IsValid=false;return;}else if(type=="MasterCard"){if(num.length!=16){e.IsValid=false;return;}else if(num.substr(0,2)!="51"&&num.substr(0,2)!="52"&&num.substr(0,2)!="53"&&num.substr(0,2)!="54"&&num.substr(0,2)!="55"){e.IsValid=false;return;}}else if(type=="American Express"){if(num.length!=15){e.IsValid=false;return;}else if(num.substr(0,2)!="34"&&num.substr(0,2)!="37"){e.IsValid=false;return;}}else if(type=="Discover"){if(num.substr(0,4)!="6011"){e.IsValid=false;return;}num=num.substr(4);};doubledDigits=new Array();notDoubledDigits=new Array();var doubleFlag=false;for(var i=num.length-1;i>=0;i--){if(doubleFlag==true)doubledDigits[doubledDigits.length]=num.substr(i,1)*2;else notDoubledDigits[notDoubledDigits.length]=num.substr(i,1);doubleFlag=!doubleFlag;};var result=new Number(0);for(var i=0;i<doubledDigits.length;i++){result+=Math.floor(doubledDigits[i]/10);result+=Math.floor(doubledDigits[i]%10);};for(var i=0;i<notDoubledDigits.length;i++)result+=parseInt(notDoubledDigits[i],10);e.IsValid=(result%10==0)?true:false;};return;},creditCardExpiration:function(sender,e){var ddlExpMonth=$id("card_expiry_month");if(!ddlExpMonth)ddlExpMonth=$id("ddlExpMonth");if(!ddlExpMonth)ddlExpMonth=$id("ddlCustomerExpMonth");if(!ddlExpMonth)ddlExpMonth=$id("ddlVerifyExpMonth");if(!ddlExpMonth)ddlExpMonth=$id("ddlGuestExpMonth");if(ddlExpMonth){var month=parseInt(ddlExpMonth.value);var ExpDate=new Date();var Now=new Date;ExpDate.setMonth(month-1);ExpDate.setDate(ExpDate.getDaysInMonth());ExpDate.setYear(e.Value);if(ExpDate.getTime()<Now.getTime())e.IsValid=false;else e.IsValid=true;};return;},formatPhoneNumber:function(ev){var e=ev||window.event;var code=e.charCode||e.keyCode;var field=ev.target||ev.srcElement;var val=field.value;if(e.charCode==0)return true;if(e.ctrlKey||e.altKey||e.metaKey)return true;if(code<32)return true;var charpos=0;if(window.getSelection){charpos=field.selectionStart;var str=field.value.substring(field.selectionStart,field.selectionEnd);if(str.length>0){charpos=field.value.indexOf(str);field.value=field.value.replace(str,'');val=field.value;field.focus();field.setSelectionRange(charpos,charpos);}}else if(document.selection){var range=document.selection.createRange();var sel=range.duplicate();sel.moveStart('character',-field.value.length);charpos=sel.text.length;var str=range.text;if(str.length>0){charpos=field.value.indexOf(str);field.value=field.value.replace(str,'');val=field.value;range=field.createTextRange();range.move('character',charpos);range.select();}};var c=String.fromCharCode(code);if(charpos==0&&c=="1"){if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;};if(charpos<12){if(isNaN(c)||c==" "){if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;};if((charpos==2&&val.charAt(2)!="-")||(charpos==6&&val.charAt(6)!="-")){field.value=val+c+"-";if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;}};if(charpos==12){field.value=val.trim()+" ";charpos++;if(c==" "){if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;}};if(c=="x"&&charpos==13){field.value=val.trim()+" ext. ";charpos=charpos+5;if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;};return true;},formatZipCode:function(ev){var e=ev||window.event;var code=e.charCode||e.keyCode;var field=ev.target||ev.srcElement;var val=field.value;if(e.charCode==0)return true;if(e.ctrlKey||e.altKey||e.metaKey)return true;if(code<32)return true;var charpos=0;if(window.getSelection){charpos=field.selectionStart;var str=field.value.substring(field.selectionStart,field.selectionEnd);if(str.length>0){charpos=field.value.indexOf(str);field.value=field.value.replace(str,'');val=field.value;field.focus();field.setSelectionRange(charpos,charpos);}}else if(document.selection){var range=document.selection.createRange();var sel=range.duplicate();sel.moveStart('character',-field.value.length);charpos=sel.text.length;var str=range.text;if(str.length>0){charpos=field.value.indexOf(str);field.value=field.value.replace(str,'');val=field.value;range=field.createTextRange();range.move('character',charpos);range.select();}};var c=String.fromCharCode(code);if(charpos==5&&c=="-")return true;else if(isNaN(c)||c==" "){if(e.keyCode)e.keyCode=0;if(e.preventDefault)e.preventDefault();if(e.returnValue)e.returnValue=false;return false;};if(charpos==5&&val.charAt(5)!="-"&&parseInt(field.getAttribute("maxlength"))>5){if(val.length==5)field.value=val+"-";else if(val.length>5)field.value=val.substr(0,5)+"-"+val.substr(5);};return true;}};

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.20",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.20"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance))return e=!0,!1}),e?!1:this.accept.call(this.element[0],d.currentItem||d.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d)),this.element):!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.20"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();g:for(var h=0;h<d.length;h++){if(d[h].options.disabled||b&&!d[h].accept.call(d[h].element[0],b.currentItem||b.element))continue;for(var i=0;i<f.length;i++)if(f[i]==d[h].element[0]){d[h].proportions.height=0;continue g}d[h].visible=d[h].element.css("display")!="none";if(!d[h].visible)continue;e=="mousedown"&&d[h]._activate.call(d[h],c),d[h].offset=d[h].element.offset(),d[h].proportions={width:d[h].element[0].offsetWidth,height:d[h].element[0].offsetHeight}}},drop:function(b,c){var d=!1;return a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c))}),d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.resizable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');h.css({zIndex:c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){if(c.disabled)return;a(this).removeClass("ui-resizable-autohide"),b._handles.show()},function(){if(c.disabled)return;b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);return l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui()),!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;return d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width)),a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;return p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null),a},_proportionallyResize:function(){var b=this.options;if(!this._proportionallyResizeElements.length)return;var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(!a.browser.msie||!a(c).is(":hidden")&&!a(c).parents(":hidden").length)e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0});else continue}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.20"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,d){a(b).each(function(){var b=a(this),e=a(this).data("resizable-alsoresize"),f={},g=d&&d.length?d:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(g,function(a,b){var c=(e[b]||0)+(h[b]||0);c&&c>=0&&(f[b]=c||null)}),b.css(f)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!i)return;e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/d.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*d.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.selectable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.addClass("ui-selectee"),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){return this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy(),this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(this.options.disabled)return;var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,!b.metaKey&&!b.ctrlKey&&(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}))}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey&&!b.ctrlKey||!d.$element.hasClass("ui-selected");return d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),d.unselecting=!e,d.selecting=e,d.selected=e,e?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element}),!1}})},_mouseDrag:function(b){var c=this;this.dragged=!0;if(this.options.disabled)return;var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e,e=i}if(f>h){var i=h;h=f,f=i}return this.helper.css({left:e,top:f,width:g-e,height:h-f}),this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!i||i.element==c.element[0])return;var j=!1;d.tolerance=="touch"?j=!(i.left>g||i.right<e||i.top>h||i.bottom<f):d.tolerance=="fit"&&(j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h),j?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,c._trigger("selecting",b,{selecting:i.element}))):(i.selecting&&((b.metaKey||b.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),c._trigger("unselecting",b,{unselecting:i.element}))),i.selected&&!b.metaKey&&!b.ctrlKey&&!i.startselected&&(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,c._trigger("unselecting",b,{unselecting:i.element})))}),!1},_mouseStop:function(b){var c=this;this.dragged=!1;var d=this.options;return a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element})}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element})}),this._trigger("stop",b),this.helper.remove(),!1}}),a.extend(a.ui.selectable,{version:"1.8.20"})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},destroy:function(){a.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--)this.items[b].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f)return e=a(this),!1});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}return this.currentItem=e,this._removeCurrentsFromItems(),!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));return a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b),!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}return this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(b,c){if(!b)return;a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"="),d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")}),d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=this.options.axis==="x"||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=this.options.axis==="y"||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();return e?this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1):!1},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){return this._refreshItems(a),this.refreshPositions(),this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f&&this.ready)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return e||(b.style.visibility="hidden"),b},update:function(a,b){if(e&&!d.forcePlaceholderSize)return;b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!c)return;if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.items[i][this.containers[d].floating?"left":"top"];Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i])}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;return d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height()),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.20"})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.accordion.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(c.disabled)return;a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){if(c.disabled)return;a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){if(c.disabled)return;a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){if(c.disabled)return;a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");e.length?b.active=e:b.active=d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");return(b.autoHeight||b.fillHeight)&&c.css("height",""),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(c),b=="icons"&&(this._destroyIcons(),c&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(this.options.disabled||b.altKey||b.ctrlKey)return;var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}return f?(a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus(),!1):!0},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",d),this.headers.each(function(){c-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(c=0,this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c));return this},activate:function(a){this.options.active=a;var b=this._findActive(a)[0];return this._clickHandler({target:b},b),this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(d.disabled)return;if(!b.target){if(!d.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),f={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:e},g=this.active=a([]);this._toggle(g,e,f);return}var h=a(b.currentTarget||c),i=h[0]===this.active[0];d.active=d.collapsible&&i?!1:this.headers.index(h);if(this.running||!d.collapsible&&i)return;var j=this.active,g=h.next(),e=this.active.next(),f={options:d,newHeader:i&&d.collapsible?a([]):h,oldHeader:this.active,newContent:i&&d.collapsible?a([]):g,oldContent:e},k=this.headers.index(this.active[0])>this.headers.index(h[0]);this.active=i?a([]):h,this._toggle(g,e,f,i,k),j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),i||(h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected),h.next().addClass("ui-accordion-content-active"));return},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b,g.toHide=c,g.data=d;var i=function(){if(!g)return;return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data),g.running=c.size()===0?b.size():c.size();if(h.animated){var j={};h.collapsible&&e?j={toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:j={toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace},h.proxied||(h.proxied=h.animated),h.proxiedDuration||(h.proxiedDuration=h.duration),h.animated=a.isFunction(h.proxied)?h.proxied(j):h.proxied,h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(j):h.proxiedDuration;var k=a.ui.accordion.animations,l=h.duration,m=h.animated;m&&!k[m]&&!a.easing[m]&&(m="slide"),k[m]||(k[m]=function(a){this.slide(a,{easing:m,duration:l||700})}),k[m](j)}else h.collapsible&&e?b.toggle():(c.hide(),b.show()),i(!0);c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(this.running)return;this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data)}}),a.extend(a.ui.accordion,{version:"1.8.20",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(!b.toHide.size()){b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b);return}if(!b.toShow.size()){b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);return}var d=b.toShow.css("overflow"),e=0,f={},g={},h=["height","paddingTop","paddingBottom"],i,j=b.toShow;i=j[0].style.width,j.width(j.parent().width()-parseFloat(j.css("paddingLeft"))-parseFloat(j.css("paddingRight"))-(parseFloat(j.css("borderLeftWidth"))||0)-(parseFloat(j.css("borderRightWidth"))||0)),a.each(h,function(c,d){g[d]="hide";var e=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:e[1],unit:e[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){c.prop=="height"&&(e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:d}),b.complete()}})},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.autocomplete.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.isMultiLine=this.element.is("textarea"),this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(b.options.disabled||b.element.propAttr("readOnly"))return;d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._keyEvent("previous",c);break;case e.DOWN:b._keyEvent("next",c);break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault())}).bind("focus.autocomplete",function(){if(b.options.disabled)return;b.selectedItem=null,b.previous=b.element.val()}).bind("blur.autocomplete",function(a){if(b.options.disabled)return;clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150)}),this._initSource(),this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete")},a(window).bind("beforeunload",b.beforeunloadHandler)},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var b=this,c,d;a.isArray(this.options.source)?(c=this.options.source,this.source=function(b,d){d(a.ui.autocomplete.filter(c,b.term))}):typeof this.options.source=="string"?(d=this.options.source,this.source=function(c,e){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:d,data:c,dataType:"json",success:function(a,b){e(a)},error:function(){e([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)===!1)return;return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this._response())},_response:function(){var a=this,b=++c;return function(d){b===c&&a.__response(d),a.pending--,a.pending||a.element.removeClass("ui-autocomplete-loading")}},__response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close()},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return typeof b=="string"?{label:b,value:b}:a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(!this.menu.element.is(":visible")){this.search(null,b);return}if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return}this.menu[a](b)},widget:function(){return this.menu.element},_keyEvent:function(a,b){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(a,b),b.preventDefault()}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})})(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(!a(c.target).closest(".ui-menu-item a").length)return;c.preventDefault(),b.select(c)}),this.refresh()},refresh:function(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){if(!this.active)return;this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(!this.active){this.activate(c,this.element.children(b));return}var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b))},nextPage:function(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:first")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.button.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);return c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.propAttr("disabled"):this.element.propAttr("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){if(h.disabled)return;a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active")}).bind("mouseleave.button",function(){if(h.disabled)return;a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){if(f)return;b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){if(h.disabled)return;f=!1,d=a.pageX,e=a.pageY}).bind("mouseup.button",function(a){if(h.disabled)return;if(d!==a.pageX||e!==a.pageY)f=!0})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled"){c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1);return}this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){if(a==="click")return;a in f?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.20",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(b.options.disabled)return;switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(d,e,h)}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i),j===!1?!1:(this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0,!0))},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);return}if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a),a},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b),b;c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return Math.abs(c)*2>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.20"})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function e(){return++c}function f(){return++d}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b)}else this.options[a]=b,this._tabify()},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k)}else e.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash)return e.selected=a,!1}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a)}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++)a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]))},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs")})}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1)return this.blur(),!1;e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected"))return e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f)}).dequeue("tabs"),this.blur(),!1;if(!f.length)return e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this)),this.blur(),!1}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f)}),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){return typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},destroy:function(){var b=this.options;return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),b.cookie&&this._cookie(null,b.cookie),this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);return j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e])),this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();return d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b}),function(a,c){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0])),this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)==-1)return;return this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b])),this},disable:function(a){a=this._getIndex(a);var b=this,c=this.options;return a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))),this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;return this.anchors.eq(a).trigger(this.options.event+".tabs"),this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}return this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs"),this},abort:function(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this},url:function(a,b){return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b),this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.20"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()}),f=c._unrotate||(c._unrotate=b?function(a){e()}:function(a){a.clientX&&c.rotate(null)});return a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate),this}})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.datepicker.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return a.bind("mouseout",function(a){var c=$(a.target).closest(b);if(!c.length)return;c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(c){var d=$(c.target).closest(b);if($.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])||!d.length)return;d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover")})}function extendRemove(a,b){$.extend(a,b);for(var c in b)if(b[c]==null||b[c]==undefined)a[c]=b[c];return a}function isArray(a){return a&&($.browser.safari&&typeof a=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/))}$.extend($.ui,{datepicker:{version:"1.8.20"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){return extendRemove(this._defaults,a||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(a,b){var c=$(a);b.append=$([]),b.trigger=$([]);if(c.hasClass(this.markerClassName))return;this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a)},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");(e=="focus"||e=="both")&&a.focus(this._showDatepicker);if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=a[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(a[0])):$.datepicker._showDatepicker(a[0]),!1})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){var b=0,c=0;for(var d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length,c=d);return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=$(a);if(c.hasClass(this.markerClassName))return;c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block")},_dialogDatepicker:function(a,b,c,d,e){var f=this._dialogInst;if(!f){this.uuid+=1;var g="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f)}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[h/2-100+j,i/2-150+k]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f),this},_destroyDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty()},_enableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b})},_disableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=a},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_getInst:function(a){try{return $.data(a,PROP_NAME)}catch(b){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(a,b,c){var d=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null;var e=b||{};typeof b=="string"&&(e={},e[b]=c);if(d){this._curInst==d&&this._hideDatepicker();var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){var b=this._getInst(a);b&&this._updateDatepicker(b)},_setDateDatepicker:function(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))},_getDateDatepicker:function(a,b){var c=this._getInst(a);return c&&!c.inline&&this._setDateFromField(c,b),c?this._getDate(c):null},_doKeyDown:function(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if($.datepicker._datepickerShowing)switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;break;case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);var f=$.datepicker._get(b,"onSelect");if(f){var g=$.datepicker._formatDate(b);f.apply(b.input?b.input[0]:null,[g,b])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1}else a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyPress:function(a){var b=$.datepicker._getInst(a.target);if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1}},_doKeyUp:function(a){var b=$.datepicker._getInst(a.target);if(b.input.val()!=b.lastVal)try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b))}catch(d){$.datepicker.log(d)}return!0},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);if($.datepicker._isDisabledDatepicker(a)||$.datepicker._lastInput==a)return;var b=$.datepicker._getInst(a);$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};if(d===!1)return;extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);var e=!1;$(a).parents().each(function(){return e|=$(this).css("position")=="fixed",!e}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b}},_updateDatepicker:function(a){var b=this;b.maxRows=4;var c=$.datepicker._getBorders(a.dpDiv);instActive=a,a.dpDiv.empty().append(this._generateHTML(a));var d=a.dpDiv.find("iframe.ui-datepicker-cover");!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();var e=this._getNumberOfMonths(a),f=e[1],g=17;a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var h=a.yearshtml;setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+$(document).scrollLeft(),i=document.documentElement.clientHeight+$(document).scrollTop();return b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0),b},_findPos:function(a){var b=this._getInst(a),c=this._get(b,"isRTL");while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a)))a=a[c?"previousSibling":"nextSibling"];var d=$(a).offset();return[d.left,d.top]},_hideDatepicker:function(a){var b=this._curInst;if(!b||a&&b!=$.data(a,PROP_NAME))return;if(this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=function(){$.datepicker._tidyDialog(b)};$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,e):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,e),c||e(),this._datepickerShowing=!1;var f=this._get(b,"onClose");f&&f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(!$.datepicker._curInst)return;var b=$(a.target),c=$.datepicker._getInst(b[0]);(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker()},_adjustDate:function(a,b,c){var d=$(a),e=this._getInst(d[0]);if(this._isDisabledDatepicker(d[0]))return;this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e)},_gotoToday:function(a){var b=$(a),c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay)c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear;else{var d=new Date;c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear()}this._notifyChange(c),this._adjustDate(b)},_selectMonthYear:function(a,b,c){var d=$(a),e=this._getInst(d[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d)},_selectDay:function(a,b,c,d){var e=$(a);if($(d).hasClass(this._unselectableClass)||this._isDisabledDatepicker(e[0]))return;var f=this._getInst(e[0]);f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))},_clearDate:function(a){var b=$(a),c=this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(a,b){var c=$(a),d=this._getInst(c[0]);b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);var e=this._get(d,"onSelect");e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],typeof d.input[0]!="object"&&d.input.focus(),this._lastInput=null)},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));$(b).each(function(){$(this).val(e)})}},noWeekends:function(a){var b=a.getDay();return[b>0&&b<6,""]},iso8601Week:function(a){var b=new Date(a.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;d=typeof d!="string"?d:(new Date).getFullYear()%100+parseInt(d,10);var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function(b){var c=s+1<a.length&&a.charAt(s+1)==b;return c&&s++,c},o=function(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);if(!f)throw"Missing number at position "+r;return r+=f[0].length,parseInt(f[0],10)},p=function(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)}),f=-1;$.each(e,function(a,c){var d=c[1];if(b.substr(r,d.length).toLowerCase()==d.toLowerCase())return f=c[0],r+=d.length,!1});if(f!=-1)return f+1;throw"Unknown name at position "+r},q=function(){if(b.charAt(r)!=a.charAt(s))throw"Unexpected literal at position "+r;r++},r=0;for(var s=0;s<a.length;s++)if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case"d":k=o("d");break;case"D":p("D",e,f);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",g,h);break;case"y":i=o("y");break;case"@":var t=new Date(o("@"));i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"!":var t=new Date((o("!")-this._ticksTo1970)/1e4);i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"'":n("'")?q():m=!0;break;default:q()}if(r<b.length)throw"Extra/unparsed characters found in date: "+b.substring(r);i==-1?i=(new Date).getFullYear():i<100&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=d?0:-100));if(l>-1){j=1,k=l;do{var u=this._getDaysInMonth(i,j-1);if(k<=u)break;j++,k-=u}while(!0)}var t=this._daylightSavingAdjust(new Date(i,j-1,k));if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function(b){var c=m+1<a.length&&a.charAt(m+1)==b;return c&&m++,c},i=function(a,b,c){var d=""+b;if(h(a))while(d.length<c)d="0"+d;return d},j=function(a,b,c,d){return h(a)?d[b]:c[b]},k="",l=!1;if(b)for(var m=0;m<a.length;m++)if(l)a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m);else switch(a.charAt(m)){case"d":k+=i("d",b.getDate(),2);break;case"D":k+=j("D",b.getDay(),d,e);break;case"o":k+=i("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":k+=i("m",b.getMonth()+1,2);break;case"M":k+=j("M",b.getMonth(),f,g);break;case"y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":k+=b.getTime();break;case"!":k+=b.getTime()*1e4+this._ticksTo1970;break;case"'":h("'")?k+="'":l=!0;break;default:k+=a.charAt(m)}return k},_possibleChars:function(a){var b="",c=!1,d=function(b){var c=e+1<a.length&&a.charAt(e+1)==b;return c&&e++,c};for(var e=0;e<a.length;e++)if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()==a.lastVal)return;var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h),d=b?"":d}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var d=function(a){var b=new Date;return b.setDate(b.getDate()+a),b},e=function(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a))}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date,e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);while(i){switch(i[2]||"d"){case"d":case"D":g+=parseInt(i[1],10);break;case"w":case"W":g+=parseInt(i[1],10)*7;break;case"m":case"M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));break;case"y":case"Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f))}i=h.exec(b)}return new Date(e,f,g)},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());return f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0)),this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(a){return a?(a.setHours(a.getHours()>12?a.getHours()+2:0),a):null},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;n<0&&(n+=12,o--);if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));p=l&&p<l?l:p;while(this._daylightSavingAdjust(new Date(o,n,1))>p)n--,n<0&&(n=11,o--)}a.drawMonth=n,a.drawYear=o;var q=this._get(a,"prevText");q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', -"+i+", 'M');\""+' title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', +"+i+", 'M');\""+' title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+a.id+"');\""+">"+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);y=isNaN(y)?0:y;var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";for(var L=0;L<g[0];L++){var M="";this.maxRows=4;for(var N=0;N<g[1];N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";if(j){Q+='<div class="ui-datepicker-group';if(g[1]>1)switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");break;case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");break;default:Q+=" ui-datepicker-group-middle",P=""}Q+='">'}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(var S=0;S<7;S++){var T=(S+y)%7;R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+A[T]+'">'+C[T]+"</span></th>"}Q+=R+"</tr></thead><tbody>";var U=this._getDaysInMonth(o,n);o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;this.maxRows=X;var Y=this._daylightSavingAdjust(new Date(o,n,1-V));for(var Z=0;Z<X;Z++){Q+="<tr>";var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";for(var S=0;S<7;S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+a.id+"',"+Y.getMonth()+","+Y.getFullYear()+', this);return false;"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y)}Q+=_+"</tr>"}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q}K+=M}return K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1,K},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else{var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" "+">";for(var p=0;p<12;p++)(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>");m+="</select>"}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else{var q=this._get(a,"yearRange").split(":"),r=(new Date).getFullYear(),s=function(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);return isNaN(b)?r:b},t=s(q[0]),u=Math.max(t,s(q[1]||""));t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" "+">";for(;t<=u;t++)a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>";a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null}}return l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>",l},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;return e=d&&e>d?d:e,e},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));return b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth())),this._isInRange(a,f)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");return b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10),{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))}}),$.fn.datepicker=function(a){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);return typeof a!="string"||a!="isDisabled"&&a!="getDate"&&a!="widget"?a=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b)):this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a)}):$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.8.20",window["DP_jQuery_"+dpuuid]=$})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.progressbar.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){return a===b?this._value():(this._setOption("value",a),this)},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;return typeof a!="number"&&(a=0),Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.20"})})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.20",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return b==0?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),(c/=f/2)<1?e/2*c*c*(((g*=1.525)+1)*c-g)+d:e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){return c<f/2?a.easing.easeInBounce(b,c*2,0,e,f)*.5+d:a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.blind.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.blind=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=f=="vertical"?"height":"width",i=f=="vertical"?g.height():g.width();e=="show"&&g.css(h,0);var j={};j[h]=e=="show"?i:0,g.animate(j,b.duration,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.bounce.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"up",g=b.options.distance||20,h=b.options.times||5,i=b.duration||250;/show|hide/.test(e)&&d.push("opacity"),a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",g=b.options.distance||(j=="top"?c.outerHeight({margin:!0})/3:c.outerWidth({margin:!0})/3);e=="show"&&c.css("opacity",0).css(j,k=="pos"?-g:g),e=="hide"&&(g=g/(h*2)),e!="hide"&&h--;if(e=="show"){var l={opacity:1};l[j]=(k=="pos"?"+=":"-=")+g,c.animate(l,i/2,b.options.easing),g=g/2,h--}for(var m=0;m<h;m++){var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing),g=e=="hide"?g*2:g/2}if(e=="hide"){var l={opacity:0};l[j]=(k=="pos"?"-=":"+=")+g,c.animate(l,i/2,b.options.easing,function(){c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}else{var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.clip.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.clip=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","height","width"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=c[0].tagName=="IMG"?g:c,i={size:f=="vertical"?"height":"width",position:f=="vertical"?"top":"left"},j=f=="vertical"?h.height():h.width();e=="show"&&(h.css(i.size,0),h.css(i.position,j/2));var k={};k[i.size]=e=="show"?j:0,k[i.position]=e=="show"?0:j/2,h.animate(k,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.drop.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.drop=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","opacity"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0})/2:c.outerWidth({margin:!0})/2);e=="show"&&c.css("opacity",0).css(g,h=="pos"?-i:i);var j={opacity:e=="show"?1:0};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.explode.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,d=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;var e=a(this).show().css("visibility","hidden"),f=e.offset();f.top-=parseInt(e.css("marginTop"),10)||0,f.left-=parseInt(e.css("marginLeft"),10)||0;var g=e.outerWidth(!0),h=e.outerHeight(!0);for(var i=0;i<c;i++)for(var j=0;j<d;j++)e.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(g/d),top:-i*(h/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/d,height:h/c,left:f.left+j*(g/d)+(b.options.mode=="show"?(j-Math.floor(d/2))*(g/d):0),top:f.top+i*(h/c)+(b.options.mode=="show"?(i-Math.floor(c/2))*(h/c):0),opacity:b.options.mode=="show"?0:1}).animate({left:f.left+j*(g/d)+(b.options.mode=="show"?0:(j-Math.floor(d/2))*(g/d)),top:f.top+i*(h/c)+(b.options.mode=="show"?0:(i-Math.floor(c/2))*(h/c)),opacity:b.options.mode=="show"?1:0},b.duration||500);setTimeout(function(){b.options.mode=="show"?e.css({visibility:"visible"}):e.css({visibility:"visible"}).hide(),b.callback&&b.callback.apply(e[0]),e.dequeue(),a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fade.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fold.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fold=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.size||15,g=!!b.options.horizFirst,h=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(c,d),c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),j=e=="show"!=g,k=j?["width","height"]:["height","width"],l=j?[i.width(),i.height()]:[i.height(),i.width()],m=/([0-9]+)%/.exec(f);m&&(f=parseInt(m[1],10)/100*l[e=="hide"?0:1]),e=="show"&&i.css(g?{height:0,width:f}:{height:f,width:0});var n={},p={};n[k[0]]=e=="show"?l[0]:f,p[k[1]]=e=="show"?l[1]:0,i.animate(n,h,b.options.easing).animate(p,h,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.highlight.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.pulsate.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"show"),e=(b.options.times||5)*2-1,f=b.duration?b.duration/2:a.fx.speeds._default/2,g=c.is(":visible"),h=0;g||(c.css("opacity",0).show(),h=1),(d=="hide"&&g||d=="show"&&!g)&&e--;for(var i=0;i<e;i++)c.animate({opacity:h},f,b.options.easing),h=(h+1)%2;c.animate({opacity:h},f,b.options.easing,function(){h==0&&c.hide(),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.scale.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.puff=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide"),e=parseInt(b.options.percent,10)||150,f=e/100,g={height:c.height(),width:c.width()};a.extend(b.options,{fade:!0,mode:d,percent:d=="hide"?e:100,from:d=="hide"?g:{height:g.height*f,width:g.width*f}}),c.effect("scale",b.options,b.duration,b.callback),c.dequeue()})},a.effects.scale=function(b){return this.queue(function(){var c=a(this),d=a.extend(!0,{},b.options),e=a.effects.setMode(c,b.options.mode||"effect"),f=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:e=="hide"?0:100),g=b.options.direction||"both",h=b.options.origin;e!="effect"&&(d.origin=h||["middle","center"],d.restore=!0);var i={height:c.height(),width:c.width()};c.from=b.options.from||(e=="show"?{height:0,width:0}:i);var j={y:g!="horizontal"?f/100:1,x:g!="vertical"?f/100:1};c.to={height:i.height*j.y,width:i.width*j.x},b.options.fade&&(e=="show"&&(c.from.opacity=0,c.to.opacity=1),e=="hide"&&(c.from.opacity=1,c.to.opacity=0)),d.from=c.from,d.to=c.to,d.mode=e,c.effect("size",d,b.duration,b.callback),c.dequeue()})},a.effects.size=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","width","height","overflow","opacity"],e=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],g=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],i=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],j=a.effects.setMode(c,b.options.mode||"effect"),k=b.options.restore||!1,l=b.options.scale||"both",m=b.options.origin,n={height:c.height(),width:c.width()};c.from=b.options.from||n,c.to=b.options.to||n;if(m){var p=a.effects.getBaseline(m,n);c.from.top=(n.height-c.from.height)*p.y,c.from.left=(n.width-c.from.width)*p.x,c.to.top=(n.height-c.to.height)*p.y,c.to.left=(n.width-c.to.width)*p.x}var q={from:{y:c.from.height/n.height,x:c.from.width/n.width},to:{y:c.to.height/n.height,x:c.to.width/n.width}};if(l=="box"||l=="both")q.from.y!=q.to.y&&(d=d.concat(h),c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(d=d.concat(i),c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to));(l=="content"||l=="both")&&q.from.y!=q.to.y&&(d=d.concat(g),c.from=a.effects.setTransition(c,g,q.from.y,c.from),c.to=a.effects.setTransition(c,g,q.to.y,c.to)),a.effects.save(c,k?d:e),c.show(),a.effects.createWrapper(c),c.css("overflow","hidden").css(c.from);if(l=="content"||l=="both")h=h.concat(["marginTop","marginBottom"]).concat(g),i=i.concat(["marginLeft","marginRight"]),f=d.concat(h).concat(i),c.find("*[width]").each(function(){var c=a(this);k&&a.effects.save(c,f);var d={height:c.height(),width:c.width()};c.from={height:d.height*q.from.y,width:d.width*q.from.x},c.to={height:d.height*q.to.y,width:d.width*q.to.x},q.from.y!=q.to.y&&(c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to)),c.css(c.from),c.animate(c.to,b.duration,b.options.easing,function(){k&&a.effects.restore(c,f)})});c.animate(c.to,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity),j=="hide"&&c.hide(),a.effects.restore(c,k?d:e),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.shake.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.shake=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"left",g=b.options.distance||20,h=b.options.times||3,i=b.duration||b.options.duration||140;a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",l={},m={},n={};l[j]=(k=="pos"?"-=":"+=")+g,m[j]=(k=="pos"?"+=":"-=")+g*2,n[j]=(k=="pos"?"-=":"+=")+g*2,c.animate(l,i,b.options.easing);for(var p=1;p<h;p++)c.animate(m,i,b.options.easing).animate(n,i,b.options.easing);c.animate(m,i,b.options.easing).animate(l,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.slide.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.slide=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"show"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c).css({overflow:"hidden"});var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0}):c.outerWidth({margin:!0}));e=="show"&&c.css(g,h=="pos"?isNaN(i)?"-"+i:-i:i);var j={};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.transfer.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.transfer=function(b){return this.queue(function(){var c=a(this),d=a(b.options.to),e=d.offset(),f={top:e.top,left:e.left,height:d.innerHeight(),width:d.innerWidth()},g=c.offset(),h=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:g.top,left:g.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(f,b.duration,b.options.easing,function(){h.remove(),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
/********** JQUERY PLUGINS ***********/
// Tiny carousel
(function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".next:first",q),d=a(".prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));


(function($){
	// Getting QueryString parameters with $.qs()
    $.qs = {
		get: function(name) {
			function parseParams() {
				var params = {},
					e,
					a = /\+/g,  // Regex for replacing addition symbol with a space
					r = /([^&=]+)=?([^&]*)/g,
					d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
					q = window.location.search.substring(1);
        	       while (e = r.exec(q)) params[d(e[1])] = d(e[2]);
        	       return params;
			}
			if (!this.qsParams) this.qsParams = parseParams();
			return this.qsParams[name];
		},
		set: function(key, value, url) {
			if (!url) url = window.location.href;
			var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "gi");
			if (url.match(re)) {
				if (value) return url.replace(re, '$1' + key + "=" + value + '$2');
				else return url.replace(re, '$2');
			} else {
				if (value) {
					var separator = url.indexOf('?') !== -1 ? '&' : '?',
						hash = url.split('#');
					url = hash[0] + separator + key + '=' + value;
					if (hash[1]) url += '#' + hash[1];
					return url;
				} else return url;
			}
		}
	};
	
	// Deserialize parameters into an object
	$.deparam = function(str) {
		var obj = {},
			arr = str.split("&"),
			pair, tmp;
  		for (var i=0,len=arr.length;i<len;i++) {
			pair = arr[i].split("=");
			pair[0] = decodeURIComponent(pair[0]);
			pair[1] = decodeURIComponent(pair[1]);
        	// If first entry with this name
			if (typeof obj[pair[0]] === "undefined") obj[pair[0]] = pair[1];
			// If second entry with this name
			else if (typeof obj[pair[0]] === "string") {
				tmp = [ obj[pair[0]], pair[1] ];
				obj[pair[0]] = tmp;
				// If third or later entry with this name
			} else obj[pair[0]].push(pair[1]);
		}
		return obj;
	};
	
	// Format items as an address
	$.toAddr = function(addr1, addr2, city, state, country, zip, format) {
		var breakchar = '<br />', sepchar = ' &bull; ', htmlstr = '';
		addr1 = addr1.trim();
		addr2 = addr2.trim();
		city = city.trim();
		state = state.trim();
		country = country.trim().toUpperCase();
		zip = zip.trim();
		if (addr1 == '' && addr2 == '' && city == '' && state == '' && zip == '') return '';
		else if (format == '1-line') {
			if (addr1 != '') htmlstr += addr1 + sepchar;
			if (addr2 != '') htmlstr += addr2 + sepchar;
			if (country == 'US' || country == '') htmlstr += city + ' ' + state + ' ' + zip;
			else htmlstr += city + ' ' + zip + sepchar + country;
		} else if (format == '2-line') {
			if (addr1 != '') htmlstr += addr1 + sepchar;
			if (addr2 != '') htmlstr += addr2 + breakchar;
			if (country == 'US' || country == '') htmlstr += city + ' ' + state + ' ' + zip;
			else htmlstr += city + ' ' + zip + sepchar + country;
		} else if (format == 'location') {
			if (country == 'US' || country == '') {
				if (city != '' && state != '') htmlstr += city + ' ' + state;
				else if (city != '') htmlstr += city;
				else if (state != '') htmlstr += state;
			} else {
				if (city != '' && state != '') htmlstr += city + ' ' + state + ' ' + country;
				else if (city != '') htmlstr += city + ' ' + country;
				else if (state != '') htmlstr += state + ' ' + country;
			}
		} else {
			if (addr1 != '') htmlstr += addr1 + breakchar;
			if (addr2 != '') htmlstr += addr2 + breakchar;
			if (country == 'US' || country == '') htmlstr += city + ' ' + state + ' ' + zip;
			else htmlstr += city + ' ' + zip + breakchar + country;
		}
		return htmlstr;
	};
	
	// Message dialog
	$.msgDialog = function(title, msg) {
		// Determine dialog parameters
		var win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self,
			$jp = win.jQuery,
			dlg = $jp('<div id="dialogmsg" title="' + title.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '">' + msg.toString().replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 500,
			height: 200,
			dialogClass: "ctrbuttons",
			buttons: { "OK": function() { dlg.dialog("close") } },
			close: function() { dlg.dialog("destroy").remove() }
		});
	};
	
	// Google Analytics pageview
	$.gaPageview = function(url) {
		if (typeof(_gaq) != 'undefined') _gaq.push(['_trackPageview', url]);
	}
	
	// Google Analytics event
	$.gaEvent = function(cat, act, lbl) {
		if (typeof(_gaq) != 'undefined') _gaq.push(['_trackEvent', cat, act, lbl]);
	};
	
	// Google Analytics event
	$.gaError = function(cat, act, status, error) {
		if (status > 0 && error != "") {
			if (typeof(_gaq) != 'undefined') _gaq.push(['_trackEvent', cat, act, error]);
			if (Blain.debug) try { alert(error); } catch(err) { alert('JavaScript Error: ' + err) }
		}
	};
	
	$.trace = function(str) {
		if (Blain.debug) try { console.log(str); } catch(err) {};
	};
	
	// Poof plugin
	$.fn.poof = function() {
		var cbfunc = (arguments.length > 0) ? arguments[0] : null;
		return this.each(function() {
			var obj = $(this),
			offset = obj.offset();
			offset.left += (obj.width() / 2) - 16;
			offset.top += (obj.height() / 2) - 16;
			obj.css('visibility', 'hidden');
			var poofer = $('<div class="poof"></div>').css({ left: offset.left + 'px', top: offset.top + 'px', backgroundPosition: '0 0' }).appendTo(document.body),
				bgTop = 0, // initial background-position for the poof sprit is '0 0'
				frames = 5, // number of frames in the sprite animation
				frameSize = 32, // size of poof <div> in pixels (32 x 32 px in this example)
				frameRate = 60, // set length of time each frame in the animation will display (in milliseconds)
				i;
			// loop through amination frames
			// and display each frame by resetting the background-position of the poof <div>
			frames--;
			var timer = setInterval(function() {
				if (frames == 0) {
					clearInterval(timer);
					poofer.remove();
					if (cbfunc != null) cbfunc();
					return;
				}
				frames--;
				bgTop -= frameSize;
				poofer.css('background-position', '0 ' + bgTop + 'px');
			}, frameRate);
		});
	};
	
	// Split card expiration date into two drop-down fields
	$.fn.splitExpDate = function() {
		var origitem = $(this), monthnums = [], monthnames = [], years = [], expdate = origitem.val(), expmonth = "", expyear = "";
		if (expdate.indexOf('-') != -1) {
			var tmp = expdate.split('-');
			expmonth = tmp[0];
			expyear = tmp[1];
		}
		origitem.find('option').each(function() {
			var opt = $(this),
				monthnum = opt.attr("data-blain-expmonthnum"),
				monthname = opt.attr("data-blain-expmonthname"),
				year = opt.attr("data-blain-expyear");
			if (monthnum != "" && monthname != "" && year != "") {
				if (monthnums.indexOf(monthnum) == -1) {
					monthnums.push(monthnum);
					monthnames.push(monthname);
				}
				if (years.indexOf(year) == -1) years.push(year);
			}
		});
		var htmlstr = '<select id="card_expiry_month" name="card_expiry_month" class="autowidth"><option value="">Month</option>';
		for (var x = 0, len = monthnums.length; x < len; x++) htmlstr += '<option value="' + monthnums[x].htmlEncode() + '"' + ((expmonth == monthnums[x]) ? ' selected' : '') + '>' + monthnames[x].htmlEncode() + '</option>';
		htmlstr += '</select><select id="card_expiry_year" name="card_expiry_year" class="autowidth"><option value="">Year</option>';
		for (var x = 0, len = years.length; x < len; x++) htmlstr += '<option value="' + years[x].htmlEncode() + '"' + ((expyear == years[x]) ? ' selected' : '') + '>' + years[x].htmlEncode() + '</option>';
		htmlstr += '</select><input type="hidden" id="card_expiry_date" name="card_expiry_date" />';
		origitem.replaceWith(htmlstr);
	};
	
	// Pin bounce plugin
	$.fn.pinBounce = function() {
		return this.each(function() {
			var pin = $(this).show().css({ backgroundPosition: '0 0' }),
				bgTop = 0, // initial background-position for the pin sprite is '0 0'
				frames = 41, // number of frames in the sprite animation
				frameSize = 36, // size of poof <span> in pixels
				frameRate = 20, // set length of time each frame in the animation will display (in milliseconds)
				i;
			// loop through amination frames
			// and display each frame by resetting the background-position of the poof <div>
			frames--;
			var timer = setInterval(function() {
				if (frames == 0) {
					clearInterval(timer);
					return;
				}
				frames--;
				bgTop -= frameSize;
				pin.css('background-position', '0 ' + bgTop + 'px');
			}, frameRate);
		});
	};
	
	// Banner slider
	$.fn.bannerSlider = function(data) {
		if (data.length <= 1) return false;
		var opts = (arguments.length > 1) ? arguments[1] : {};
		if (!opts.displayTime) opts.displayTime = 6;
		if (!opts.defaultPlay) opts.defaultPlay = true;
		if (!opts.cssClass) opts.cssClass = 'bannerslider';
		return this.each(function() {
			var mainid = this.id,
				obj = $(this),
				_index = 0,
				_playTimer = null,
				_playStatus = null,
				_waitTimer = null,
				_dissolving = false,
				btnPlayPause = null,
				btnPrev = null,
				btnNext = null;
			obj.addClass(opts.cssClass);
			$('<div id="' + mainid + '-status" class="bannerslider-status" style="display: none;"><span class="spinner"></span> Loading...</div>').appendTo(obj);
			$('<a id="' + mainid + '-btnprev" class="bannerslider-btnprev" title="Previous" href="javascript:void(0);"></a>'
				+ '<a id="' + mainid + '-btnplaypause" class="bannerslider-btnplay" title="Play" href="javascript:void(0);"></a>'
				+ '<a id="' + mainid + '-btnnext" class="bannerslider-btnnext" title="Next" href="javascript:void(0);"></a>').appendTo(obj);
			btnPrev = $('#' + mainid + '-btnprev');
			btnPlayPause = $('#' + mainid + '-btnplaypause');
			btnNext = $('#' + mainid + '-btnnext');
			var bannerdiv = $('#' + mainid + '-item'),
				bannerstatus = $('#' + mainid + '-status'),
			display = function(x) {
				// Clear the play timer if it is running
				if (_playTimer != null) {
					clearTimeout(_playTimer);
					_playTimer = null;
				}
				// Make sure we're not walking off the end of the list index
				if (x >= data.length) x = 0;
				else if (x < 0) x = data.length - 1;
				// Get the current image and its URL
				var lblCurImg = bannerdiv.find('img'),
					imgWidth = lblCurImg.attr('width')
					imgHeight = lblCurImg.attr('height'),
					linkattrs = { href: data[x].LinkURL, target: data[x].LinkTarget, title: data[x].ItemLabel };
				
				// Wait for any currently-dissolving ads to finish
				if (_dissolving) {
					if (_waitTimer != null) {
						clearTimeout(_waitTimer);
						_waitTimer = null;
					}
					_waitTimer = setTimeout(function() { display(x); }, 100);
					return;
				}
				
				// Assign the link to the link node (if this ad links anywhere)
				bannerdiv.attr(linkattrs);
				
				// Create the new image object
				var imgNewSrc = (Blain.hiRes) ? data[x].ImageURL.replace(".jpg", "@2x.jpg") : data[x].ImageURL,
					imgNew = new Image(),
					lblNewImg = $('<img src="' + imgNewSrc + '" data-src-orig="' + data[x].ImageURL + '" data-src2x="' + data[x].ImageURL.replace(".jpg", "@2x.jpg") + '" alt="' + data[x].ItemLabel.htmlEncode() + '" width="' + imgWidth + '" height="' + imgHeight + '" />');
				imgNew.src = imgNewSrc;
				
				// Dissolve in the image
				if (imgNew.complete) dissolveImage(lblNewImg, lblCurImg);
				else {
					bannerstatus.show();
					imgNew.onload = function() {
						bannerstatus.hide();
						dissolveImage(lblNewImg, lblCurImg);
					}
				}
				// Set the current value as the new index
				_index = x;
			},
			dissolveImage = function(lblNewImg, lblCurImg) {
				// Dissolve in new image
				_dissolving = true;
				$(lblNewImg).hide().appendTo(bannerdiv).fadeIn(1000, function() {
					// If we are in the 'play' mode, then run the timer
					if (_playStatus) _playTimer = setTimeout(goNext, opts.displayTime * 1000);
					// Preload the next ad (if there's more than one)
					if (data.length > 1) preload(_index + 1);
					// Remove the old image and set the dissolving flag to false
					lblCurImg.remove();
					_dissolving = false;
				});
			}
			playStop = function() {
				if (_playTimer != null) {
					clearTimeout(_playTimer);
					_playTimer = null;
				}
				if (_playStatus) togglePlayStatus(false);
				else togglePlayStatus(true);
				if (_playStatus) _playTimer = setTimeout(goNext, opts.displayTime * 1000);
			}
			goPrev = function() {
				if (data.length > 1) display(_index - 1);
			},
			goNext = function() {
				if (data.length > 1) display(_index + 1);
			},
			preload = function(x) {
				// Make sure we're not walking off the end of the list index
				if (x >= data.length) x = 0;
				else if (x < 0) x = data.length - 1;
				(new Image()).src = (Blain.hiRes) ? data[x].ImageURL.replace(".jpg", "@2x.jpg") : data[x].ImageURL;;
			},
			togglePlayStatus = function(val) {
				_playStatus = val;
				if (val) btnPlayPause.attr('class', 'bannerslider-btnpause');
				else btnPlayPause.attr('class', 'bannerslider-btnplay');
			};
			
			btnNext.click(goNext);
			btnPlayPause.click(playStop);
			btnPrev.click(goPrev);
			preload(1);
			if (opts.defaultPlay) {
				togglePlayStatus(true);
				_playTimer = setTimeout(goNext, opts.displayTime * 1000);
			}
		});
	};

	/*
	jQuery Text Input Plugin
	
	Author - Rudolf Naprstek
	Website - http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input
	Version - 1.3.0
	Release - 28th January 2012
	Thanks to Niko Halink from ARGH!media for bugfix!
	Remy Blom: Added a callback function when the filter surpresses a keypress in order to give user feedback
	Matt Seifert: Added a callback function when the text input passes the filter
	*/
	$.fn.extend({
		filter_input: function(options) {
			var defaults = { regex:".*", live:false, suppressEnter:false },
				options =  $.extend(defaults, options),
				regex = new RegExp(options.regex);
			function filter_input_function(event) {
				var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
				// 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
				if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return true;
				if (key == 13 && options.suppressEnter) return false;
				if (key == 13) return true;
				if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {
					if ($.browser.mozilla) {
						// if charCode = key & keyCode = 0
						// 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
						if (event.charCode == 0 && event.keyCode == key) return true;
					}
				}
				var string = String.fromCharCode(key);
				if (regex.test(string)) {
					if (typeof(options.success) == 'function') options.success.call(this, string);
					return true;
				}
				else if (typeof(options.feedback) == 'function') options.feedback.call(this, string);
				return false;
			}
			if (options.live) {
				$(this).live('keypress', filter_input_function); 
			} else {
				return this.each(function() {
					var input = $(this);
					input.unbind('keypress').keypress(filter_input_function);
				});
			}
		}
	});
})(jQuery);

// jQuery tappable plugin
(function($) {
	var touchSupported = ('ontouchstart' in window);
	$.fn.tappable = function(options) {
		var cancelOnMove = true,
			onlyIf = function() { return true },
			touchDelay = 0,
			callback
			
		switch(typeof options) {
			case 'function':
				callback = options;
				break;
			case 'object':
				callback = options.callback;
				if (typeof options.cancelOnMove != 'undefined') cancelOnMove = options.cancelOnMove;
    	    	if (typeof options.onlyIf != 'undefined') onlyIf = options.onlyIf;
				if (typeof options.touchDelay != 'undefined') touchDelay = options.touchDelay;
				break;
		}
		var fireCallback = function(el, event) {
			if (typeof callback == 'function' && onlyIf(el)) callback.call(el, event);
		}
		if (touchSupported) {
			this.bind('touchstart', function(event) {
				var el = this;
				if (onlyIf(this)) {
					$(el).addClass('touch-started');
					window.setTimeout(function() {
						if ($(el).hasClass('touch-started')) $(el).addClass('touched');
					}, touchDelay);
				}
				return true;
			});
			this.bind('touchend', function(event) {
				var el = this;
				if ($(el).hasClass('touch-started')) {
					$(el).removeClass('touched').removeClass('touch-started');
					fireCallback(el, event)
				}
				return true;
			});
			this.bind('click', function(event) { event.preventDefault(); });
			if (cancelOnMove) {
				this.bind('touchmove', function() { $(this).removeClass('touched').removeClass('touch-started'); });
			}
		} else if (typeof callback == 'function') {
			this.bind('click', function(event) {
				if (onlyIf(this)) { callback.call(this, event); }
			});
		}
		return this;
	}
})(jQuery);

/************* HiDPI Handling **************/
Blain.HiDPI=function(){return{init:function(){if(Blain.hiRes){$("img[data-src2x]").each(function(idx,el){el=$(el);if(el.attr("data-src2x")!=el.attr("src")){el.attr("src",el.attr("data-src2x"));}});}}};}();Blain.HiDPI.init();

/************* SITE SEARCH *****************/
// Sets up Hawk Search search events
Blain.HS = {
	loadTimer: null,
	obj: null,
	
	init: function() {
		Blain.HS.initHawkPage();
		
		if ($id("frmProductSearch")) {
			var frmProductSearch = $("#frmProductSearch"),
				txtSearchField = $("#keyword"),
				ddlSearchCat = $("#categorynew"),
				lblFindCat = $("#lblFindCat"),
				catval = "";
				
			// Don't search for an empty string
			frmProductSearch.bind('submit', function() {
				if (ddlSearchCat.val() == "") ddlSearchCat.prop('disabled', true);
				searchval = txtSearchField.val().trim();
				return (searchval == '') ? false : true;
			});
			
			// Search category drop-down handler
			ddlSearchCat.change(function() {
				catval = ddlSearchCat.find("option:selected").text();
				if (catval == "") catval = "Entire Store";
				lblFindCat.text(catval);
				txtSearchField.css('width', 278 - lblFindCat.width() + 'px');
			});
		}
	},
	
	initHawkPage: function() {
		Blain.HS.runFunc(function() {
			HawkSearch.loadingtpl = '<span class="spinner"></span> Loading...';
			if ($id("hawkitemlist")) {
				var hash = window.location.hash;
				if (hash === null) hash = "";
				if (hash.indexOf("#") == 0) hash = hash.substr(1);
				hash = hash.replace(/mpp=[0-9]+/g, '');
				if (hash !== "") HawkSearch.refreshResults();
				$("#hawkfacets").css('visibility', '');
				$.trace("HawkSearch settings modifications applied");
			}
		});
	},
	
	runFunc: function(callback) {
		if (Blain.HS.obj !== null) callback();
		else {
			// Detect Hawk and fire initialization events
			var hawkLoadTimer = setInterval(function() {
				if (Blain.HS.obj !== null) {
					clearInterval(hawkLoadTimer);
					callback();
				} else {
					if (typeof(HawkSearch)!='undefined') {
						if (typeof(HawkSearch.refreshResults) != "undefined") {
							clearInterval(hawkLoadTimer);
							Blain.HS.obj = HawkSearch;
							callback();
						}
					}
				}
			}, 100);
		}
	},
	
	initAutoComplete: function() {
		if ($id("frmProductSearch")) {
			HawkSearch.suggestInit('#keyword', {
				lookupUrlPrefix: HawkSearch.TrackingUrl + '/ajax.aspx?f=GetSuggestions',
				hiddenDivName: '',
				isAutoWidth: false });
		}
	}
}

Blain.StoresAll = {
	initializeMaps: function () {
		if ($id("allStoresLocsJSON")) {
			var temp = $("#allStoresLocsJSON"),
				stateLocs = JSON.parse(temp.val()),
				bound = new google.maps.LatLngBounds();

			for (var i = 0; i < stateLocs.length; i++) {
				var loc = stateLocs[i];
				var lat = loc[1],
				long = loc[2];
				bound.extend(new google.maps.LatLng(lat, long));
			}

			var myLatlng = bound.getCenter(),
				infowindow = new google.maps.InfoWindow(),
			mapOptions = {
				center: myLatlng,
				zoom: 7,
				panControl: false,
				zoomControl: true,
				mapTypeControl: true,
				scaleControl: true,
				streetViewControl: true,
				overviewMapControl: true

			},
			map = new google.maps.Map(document.getElementById("region-map-canvas"),
				mapOptions),
			image = '/images/icons/blain-pin.png';

			google.maps.event.addListener(map, 'click', function () {
				infowindow.close();
			});

			var topLat = 0, topLong = 0;
			var botLat = 0, botLong = 0;

			for (var i = 0; i < stateLocs.length; i++) {
				var loc = stateLocs[i];
				var storeNum = loc[0],
				lblLat = loc[1],
				lblLong = loc[2],
				lblAddress1 = loc[3],
				lblAddress2 = loc[4],
				lblCity = loc[5],
				lblState = loc[6],
				lblZip = loc[7],
				lblPhone = loc[8],
				lblStoreURL = loc[9],
				lblStoreName = loc[10],
				lblEndAddr = loc[11],
				divStoreInfo = loc[12];
				bound.extend(new google.maps.LatLng(lblLat, lblLong));

				var
				contentString = '<div id="mapPopupContent"  class="mapPopupContent" style="width: 200px;">' +
									'<div id="siteNotice">' +
									'</div>' +
									'<h3 id="firstHeading" class="firstHeading">Blain\'s Farm & Fleet</h3>' +
									'<div id="bodyContent">' +
									'<p>' + lblAddress1 + '</p>' +
									'<p>' + lblAddress2 + '</p>' +
									'<p>' + lblCity + ', ' + lblState + '  ' + lblZip + '</p>' +
									'<p>' + lblPhone + '</p>' +
									'</br><a href="/stores/set-store.aspx?stnum=' + storeNum + '" onclick="return Blain.StorePage.setStoreFromMap()">Set As My Local Store</a>' +
									'<br><a href="http://maps.google.com/maps?daddr=' + lblEndAddr + '" target="_blank">Get Directions</a>' +
				'</div>' +
				'</div>',

				storeLatlng = new google.maps.LatLng(lblLat, lblLong),


				marker = new google.maps.Marker({
					position: storeLatlng,
					map: map,
					title: 'Farm & Fleet',
					icon: image,
					zIndex: Math.round(storeLatlng.lat() * -100000) << 5
				});


				google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
					return function () {
						infowindow.setContent(content);
						infowindow.open(map, marker);
					};
				})(marker, contentString, infowindow));
			}
			map.fitBounds(bound);



			var styles = [
			   {
			   	featureType: "poi.business",
			   	elementType: "labels",
			   	stylers: [
				  { visibility: "off" }
			   	]
			   }
			];

			map.setOptions({ styles: styles });
			var start = false;
			google.maps.event.addListener(map, 'idle', function () {
				if (start == false) {
					var offsetx = 0, offsety = -20;
					var scale = Math.pow(2, map.getZoom());
					var nw = new google.maps.LatLng(
						map.getBounds().getNorthEast().lat(),
						map.getBounds().getSouthWest().lng()
					);

					var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(bound.getCenter());
					var pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0)

					var worldCoordinateNewCenter = new google.maps.Point(
						worldCoordinateCenter.x - pixelOffset.x,
						worldCoordinateCenter.y + pixelOffset.y
					);

					var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

					map.setCenter(newCenter);
					start = true;
				}
			});

		}
	},

	init: function () {
		Blain.StoresAll.initializeMaps();
	}
}
Blain.StoreRegion={
	initializeMaps: function () {
		if ($id("stateLocsJSON")) {
			var temp = $("#stateLocsJSON"),
				stateLocs = JSON.parse(temp.val()),
				bound = new google.maps.LatLngBounds();

			for (var i = 0; i < stateLocs.length; i++) {
				var loc = stateLocs[i];
				var lat = loc[1],
				long = loc[2];
				bound.extend(new google.maps.LatLng(lat, long));
			}

			var myLatlng = bound.getCenter(),
				infowindow = new google.maps.InfoWindow(),
			mapOptions = {
				center: myLatlng,
				zoom: 7,
				panControl: false,
				zoomControl: true,
				mapTypeControl: true,
				scaleControl: true,
				streetViewControl: true,
				overviewMapControl: true

			},
			map = new google.maps.Map(document.getElementById("state-map-canvas"),
				mapOptions),
			image = '/images/icons/blain-pin.png';

			google.maps.event.addListener(map, 'click', function () {
				infowindow.close();
			});

			var topLat = 0, topLong=0;
			var botLat = 0, botLong=0;

			for (var i = 0; i < stateLocs.length; i++) {
				var loc = stateLocs[i];
				var storeNum = loc[0],
				lblLat = loc[1],
				lblLong = loc[2],
				lblAddress1 = loc[3],
				lblAddress2 = loc[4],
				lblCity = loc[5],
				lblState = loc[6],
				lblZip = loc[7],
				lblPhone = loc[8],
				lblStoreURL = loc[9],
				lblStoreName = loc[10],
				lblEndAddr = loc[11],
				divStoreInfo = loc[12];
				bound.extend(new google.maps.LatLng(lblLat, lblLong));

				var
				contentString = '<div id="mapPopupContent"  class="mapPopupContent" style="width: 200px;">' +
									'<div id="siteNotice">' +
									'</div>' +
									'<h3 id="firstHeading" class="firstHeading">Blain\'s Farm & Fleet</h3>' +
									'<div id="bodyContent">' +
									'<p>' + lblAddress1 + '</p>' +
									'<p>' + lblAddress2+ '</p>' +
									'<p>' + lblCity + ', ' + lblState + '  ' + lblZip + '</p>' +
									'<p>' + lblPhone + '</p>' +
									'</br><a href="/stores/set-store.aspx?stnum=' + storeNum + '" onclick="return Blain.StorePage.setStoreFromMap()">Set As My Local Store</a>' +
									'<br><a href="http://maps.google.com/maps?daddr=' + lblEndAddr + '" target="_blank">Get Directions</a>' +
				'</div>' +
				'</div>',
				
				storeLatlng = new google.maps.LatLng(lblLat, lblLong),


				marker = new google.maps.Marker({
					position: storeLatlng,
					map: map,
					title: 'Farm & Fleet',
					icon: image,
					zIndex: Math.round(storeLatlng.lat() * -100000) << 5
				});


				google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
					return function () {
						infowindow.setContent(content);
						infowindow.open(map, marker);
					};
				})(marker, contentString, infowindow));
			}
			map.fitBounds(bound);



			var styles = [
			/*	{ "featureType": "landscape", "stylers": [{ "hue": "#00a1ff" }, { "saturation": -43 }, { "lightness": 7 }, { "gamma": 0.78 }] }, */
			   {
			   	featureType: "poi.business",
			   	elementType: "labels",
			   	stylers: [
				  { visibility: "off" }
			   	]
			   }/*, { "featureType": "poi", "stylers": [{ "lightness": 1, "hue":"none" }] }*/
			];

			map.setOptions({ styles: styles });
			var start=false;
			google.maps.event.addListener(map, 'idle', function () {
				if (start == false) {
					var offsetx = 0, offsety = -20;
					var scale = Math.pow(2, map.getZoom());
					var nw = new google.maps.LatLng(
						map.getBounds().getNorthEast().lat(),
						map.getBounds().getSouthWest().lng()
					);

					var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(bound.getCenter());
					var pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0)

					var worldCoordinateNewCenter = new google.maps.Point(
						worldCoordinateCenter.x - pixelOffset.x,
						worldCoordinateCenter.y + pixelOffset.y
					);

					var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

					map.setCenter(newCenter);
					start = true;
				}
			});

		}
	},

	init: function () {
		Blain.StoreRegion.initializeMaps();
	}
}

Blain.StorePage = {
	initializeMaps: function () {
		if ($id("lblLat") && $id("lblLong")) {
			var lblLat = $("#lblLat"),
				lblLong = $("#lblLong"),
				lblAddress1 = $("#lblAddress1"),
				lblAddress2 = $("#lblAddress2"),
				lblCity = $("#lblCity"),
				lblState = $("#lblState"),
				lblZip = $("#lblZip"),
				lblPhone = $("#lblPhone"),
				lblStoreURL = $("#lblStoreURL"),
				lblStoreName = $("#lblStoreName"),
				lblEndAddr = $("#lblEndAddr"),
				divStoreInfo = $("#divStoreInfo"),
				storeNum = divStoreInfo.data('blain-storenum'),
				loc = { s: storeNum, z: lblZip.text() },

			myLatlng = new google.maps.LatLng(lblLat.val(), lblLong.val()),

			mapOptions = {
				center: myLatlng,
				zoom: 14
			},
			map = new google.maps.Map(document.getElementById("map-canvas"),
				mapOptions),

			image = '/images/icons/blain-pin.png',

			
			contentString = '<div id="mapPopupContent"  class="mapPopupContent" style="width: 200px;">' +
								'<div id="siteNotice">' +
								'</div>' +
								'<h3 id="firstHeading" class="firstHeading">Blain\'s Farm & Fleet</h3>' +
								'<div id="bodyContent">' +
								'<p>' + lblAddress1.text() + '</p>' +
								'<p>' + lblAddress2.text() + '</p>' +
								'<p>' + lblCity.text() + ', ' + lblState.text() + '  ' + lblZip.text() + '</p>' +
								'<p>' + lblPhone.text() + '</p>' +
								'</br><a href="/stores/set-store.aspx?stnum=' + storeNum + '" onclick="return Blain.StorePage.setStoreFromMap()">Set As My Local Store</a>' +
								'<br><a href="http://maps.google.com/maps?daddr=' + lblEndAddr.val() + '" target="_blank">Get Directions</a>' +
			'</div>' +
			'</div>',

			infowindow = new google.maps.InfoWindow({
				content: contentString
			}),


			marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: 'Farm & Fleet',
				icon: image
			});
			var styles = [
			/*	{ "featureType": "landscape", "stylers": [{ "hue": "#00a1ff" }, { "saturation": -43 }, { "lightness": 7 }, { "gamma": 0.78 }] }, */
			   {
  				featureType: "poi.business",
  				elementType: "labels",
  				stylers: [
				  { visibility: "off" }
  				]
			   }/*, { "featureType": "poi", "stylers": [{ "lightness": 1, "hue":"none" }] }*/
			];

			map.setOptions({ styles: styles });
			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);
			});
		}		
	},
	
	setStoreFromMap: function () {
		var elem = $id('hlSetStore'),
			loc = { s: elem.getAttribute("data-blain-storenum"), z: elem.getAttribute("data-blain-zip") },
			stname = elem.getAttribute("data-blain-name"),
			staddr = elem.getAttribute("data-blain-addr"),
			stphone = elem.getAttribute("data-blain-phone"),
			sturl = elem.getAttribute("data-blain-url"),
			change = function () { Blain.Stores.setStore(loc, stname, staddr, stphone, sturl, false); }
		Blain.Stores.confirmChange(change, loc.s);
		return false;
	},

	initializeNearbyStores: function () {
		$("a.nearbystores").unbind().click(function (e) {
			var	divStoreInfo = $("#divStoreInfo"),
				storeNum = divStoreInfo.data('blain-storenum');
			e.preventDefault();
			Blain.StorePage.openNearbySelector(storeNum);
		})
	},
	initializeDirections: function () {
		if ($id('frmGetDirections')) {
			$("#frmGetDirections").unbind().submit(function (e) {
				e.preventDefault();
				var lblStartAddr = $("#lblStartAddr"),
					lblEndAddr = $("#lblEndAddr");
				window.open('http://maps.google.com/maps?saddr=' + lblStartAddr.val() + '&daddr=' + lblEndAddr.val());
			});
		}
	},

	initializeEmailMe: function () {
			$("a.emailme-link").unbind().click(function (e) {
				e.preventDefault();
				Blain.StorePage.openDialog();
			})

			$("#txtEmailMe").focus();
			$("#txtEmailMe").select();
			$("#btnEmailmeClose").click(Blain.StorePage.closeParentPopup);
	},
	openNearbySelector: function (blain) {
		var win = (window.parent && window.parent.Blain && window.parent.Blain.StorePage) ? window.parent : window.self,
			$jp = win.jQuery;
		var func = function () {
			// Create and open dialog
			var dlg = $jp('<div id="nearbystores" title="Neaby Stores">'
				+ '<iframe id="ifNBStores" name="ifNBStores" src="' + location.protocol + '//' + Blain.cDom + '/stores/nearby-stores-iframe.aspx?snum=' + blain + '" runat="server" class="ifcontent ifnearby" scrolling="no" frameborder="0"></iframe></div>');
			dlg.dialog({
				modal: true,
				resizable: false,
				closeOnEscape: true,
				width: 400,
				height: 270,
				close: function () { dlg.dialog("destroy").remove(); win.Blain.StorePage.curDialog = null }
			});
			win.Blain.StorePage.curDialog = dlg;
		}
		win.Blain.Stores.confirmChange(func, "");
	},
	openDialog: function () {
		var addrcol = $("#addrcol"),
			storeNum = addrcol.data('blain-storenum');
		var dlg = $('<div id="emailme-dialog"><a href="#" class="btnclose" title="Close"></a><iframe class="ifemailme" scrolling="no" src="' + location.protocol + '//' + Blain.cDom + '/stores/emailme-iframe.aspx?snum=' + storeNum + '" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 375,
			height: 140,
			title:'Email this Map',
			create: function() {
				dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
			},
			close: function() {}
		});
		Blain.StorePage.curDialog = dlg;
		
		// Track virtual pageview in Google Analytics
		//$.gaPageview('/stores/emailme-iframe.aspx');
	},
	// Closes the popup window
	closePopup: function() {
		Blain.StorePage.curDialog.dialog("close");
	},
	
	closeParentPopup: function(e) {
		e.preventDefault();
		if (window.parent && window.parent.Blain && window.parent.Blain) window.parent.Blain.StorePage.closePopup();
	},
	init: function(){
		Blain.StorePage.initializeMaps();
		Blain.StorePage.initializeNearbyStores();
		Blain.StorePage.initializeDirections();
		Blain.StorePage.initializeEmailMe();
	}
}
/**************** STORE SELECTOR METHODS ********************/

Blain.Stores = {
	
	timer: null,
	label: null,
	menu: null,
	localStore: {s:0,z:"",m:"D",t:0,o:0,g:""},
	mouseInside: false,
	menuUp: false,
	formHasFocus: false,
	list: [],
	noneLocal: false,
	curDialog: null,
	locExpDate: new Date(new Date().getTime() + (60 * 1000 * 60 * 60 * 24)),
	nullExp: new Date(new Date().getTime() - (1000 * 60 * 60 * 24)),
	selectPickup: false,
	htmlStoreList: '',

	// Sets up store selector events
	setupMenu: function() {
		if ($id("findstore")) {
			// Create store popup
			$("#findstore").append($('<div id="storepopup" style="display: none;"><span class="spinner"></span> Getting Information...</div>')).mouseenter(function() {
				$.trace('store popup mouse enter');
				Blain.Stores.mouseInside = true;
				clearTimeout(Blain.Stores.timer);
				if (!Blain.Stores.menuUp) Blain.Stores.timer = setTimeout(Blain.Stores.showMenu, 300);
				//else Blain.Stores.showMenu();
			}).mouseleave(function() {
				$.trace('store popup mouse leave');
				Blain.Stores.mouseInside = false;
				Blain.Stores.hideMenu();
			});
			// Set global objects and event handlers
			Blain.Stores.label = $("#ucHeader_hlStore");
			Blain.Stores.menu = $("#storepopup");
			Blain.Stores.label.click(function(e) {
				e.preventDefault();
				Blain.Stores.showMenu();
			});
			// Store set handler for store locator page buttons
			$("#hlSetStore").click(function(e) {
				e.preventDefault();
				var elem = this,
					loc = {s:elem.getAttribute("data-blain-storenum"),z:elem.getAttribute("data-blain-zip")},
					stname = elem.getAttribute("data-blain-name"),
					staddr = elem.getAttribute("data-blain-addr"),
					stphone = elem.getAttribute("data-blain-phone"),
					sturl = elem.getAttribute("data-blain-url"),
					change = function() { Blain.Stores.setStore(loc, stname, staddr, stphone, sturl, false); }
				Blain.Stores.confirmChange(change, loc.s);
			});
		}
		
		// Setup the new store ribbon
		$("#ucHeader_newstorepin").pinBounce();
		$("#newstoreclose").click(function() {
			$("#ucHeader_divNewStore").hide('blind');
		});
		$("#newstorechange").click(function(e) {
			e.preventDefault();
			$("#ucHeader_divNewStore").hide('blind');
			Blain.Stores.openNewSelector();
		});
	},

	// Gets the local store from the cookie
	getLocalStore: function() {
		var tmp = Cookie.get("Loc");
		if (tmp) {
			Blain.Stores.localStore = $.deparam(tmp);
			if (Blain.Stores.localStore.z == null || Blain.Stores.localStore.z == 'null') Blain.Stores.localStore.z = "";
			if (Blain.Stores.localStore.m == null || Blain.Stores.localStore.m == 'null') Blain.Stores.localStore.m = "D";
			if (Blain.Stores.localStore.t == null || Blain.Stores.localStore.t == 'null') Blain.Stores.localStore.t = 0;
			if (Blain.Stores.localStore.o == null || Blain.Stores.localStore.o == 'null') Blain.Stores.localStore.o = 0;
			if (Blain.Stores.localStore.g == null || Blain.Stores.localStore.g == 'null') Blain.Stores.localStore.g = "";
		}
	},
	
	// Gets the list of stores
	getHTMLStoreList: function() {
		$.get('/ajax/stores.aspx', { a: "sl" }, function(data) {
			Blain.Stores.htmlStoreList = data;
		});
	},
	
	// Clears the local store
	clearLocalStore: function() {
		Cookie.set("Loc", null, Blain.Stores.nullExp, "/", Blain.cDom);
		Blain.Stores.localStore = {s:0,z:"",m:"D",t:0,o:0,g:""};
	},

	// Shows the store selector popup window
	showMenu: function() {
		$.trace('Blain.Stores.showMenu');
		// Handler for local store and cookie
		var firstTime = true,
			htmlStoreSpinner = '<span class="spinner"></span> Getting Information...',
			htmlStoreError = '<p>Sorry, but an error occurred when trying to find a nearby store.</p><p><a href="/stores/">View Store List</a></p>',
			getStores = function(loc) {
				$.ajax({
					url: "/ajax/stores.aspx",
					data: { a: "z", z: loc.z, ss: "1" },
					dataType: "json",
					success: function(data, status, xhr) {
						Blain.Stores.list = data;
						Blain.Stores.noneLocal = (Blain.Stores.list.length == 0);
						displayStores();
						// Track event in Google Analytics
						$.gaEvent('Store Locator', 'Lookup By Zip Code', loc.z);
					}, error: function(xhr, status, error) {
						Blain.Stores.menu.html(htmlStoreError);
						$.gaError('Store Locator', 'Zip Code Lookup Error', xhr.status, error);
					}
				});
			},
			showStoreList = function(e) {
				e.preventDefault();
				$("#showstores").replaceWith(Blain.Stores.htmlStoreList);
				$("#storelist a").unbind().click(function(e) {
					e.preventDefault();
					var elem = this,
						loc = {s:elem.getAttribute('data-blain-storenum'),z:elem.getAttribute('data-blain-zip')};
						change = function() {
							Blain.Stores.setStore(loc, elem.getAttribute('data-blain-name'), elem.getAttribute('data-blain-addr'), elem.getAttribute('data-blain-phone'), elem.getAttribute('data-blain-url'), true);
							Blain.Stores.list = [];
							clearTimeout(Blain.Stores.timer);
							Blain.Stores.timer = setTimeout(function() { Blain.Stores.menuUp = false; Blain.Stores.menu.fadeOut(); }, 400);
						}
					Blain.Stores.confirmChange(change, loc.s);
				});
			},
			displayStores = function() {
				var htmlNoStores = '<p>Sorry, but we couldn\'t find a store close to you</p>'
					+ '<p><a href="/"><b>Shop Online Store</b></a></p><p><a href="javascript:void(0);" id="storeretry">Try Another Zip Code</a></p><p><a id="showstores" href="/stores/">View Store List</a></p>';
				if (Blain.Stores.noneLocal) {
					Blain.Stores.menu.html(htmlNoStores).show();
					$("#storeretry").unbind().click(displayLookupForm);
					$("#showstores").unbind().click(showStoreList);
					return;
				}
				var htmlstr = '<p>Your local store for product availability and in-store pickup has been selected.</p><ul>',
					storeSet = false, r, storezip,
					loc = Blain.Stores.localStore;
				if (Blain.Cart.obj != null) {
					htmlstr = '<p>Please select a new local store to be your Free In-Store Pickup location.</p><ul>';
					storeSet = true;
				} else if ($id("salesflyers")) {
					htmlstr = '<p>Please select a store below to see its current sales flyer(s).</p><ul>';
					storeSet = true;
				}
				for (var x=0,len=Math.min(Blain.Stores.list.length, 3);x<len;x++) {
					r = Blain.Stores.list[x];
					storezip = (r.Zip.length > 5) ? r.Zip.substr(0, 5) : r.Zip;
					if (loc.s == r.StoreNum || !storeSet) {
						if (!storeSet) {
							loc = {s:r.StoreNum,z:storezip};
							Blain.Stores.setStore(loc, r.CityAliasState, $.toAddr(r.Address1, r.Address2, r.City, r.State, "", r.Zip, "1-line"), r.Phone, "/stores/" + r.URLAlias + "/", true);
							storeSet = true;
						}
						htmlstr += '<li class="mystore" data-blain-storenum="' + r.StoreNum + '" data-blain-zip="' + storezip + '" data-blain-name="' + r.CityAliasState + '">';
					} else htmlstr += '<li data-blain-storenum="' + r.StoreNum + '" data-blain-zip="' + storezip + '" data-blain-name="' + r.CityAliasState + '" data-blain-addr="' + $.toAddr(r.Address1, r.Address2, r.City, r.State, "", r.Zip, '1-line') + '" data-blain-phone="' + r.Phone + '" data-blain-url="/stores/' + r.URLAlias + '/">';
					htmlstr += '<span class="checkmark"></span><strong>' + r.CityAliasState + '</strong><br />' + $.toAddr(r.Address1, '', r.City, r.State, '', r.Zip, 'full')
						+ '<br />' + r.Phone
						+ '<br /><a href="/stores/' + r.URLAlias + '/">Store Details</a></li>';
				}
				htmlstr += '</ul><p><a href="javascript:void(0);" id="storelookup">Search by Zip Code</a></p><p><a id="showstores" href="/stores/">See More Stores</a></p>'
				Blain.Stores.menu.html(htmlstr).show().find('li').unbind().click(function(e) {
					e.preventDefault();
					var elem = this,
						loc = {s:elem.getAttribute('data-blain-storenum'),z:elem.getAttribute('data-blain-zip')};
						change = function() {
							$(elem).addClass('mystore').effect('highlight').siblings().removeClass('mystore');
							Blain.Stores.setStore(loc, elem.getAttribute('data-blain-name'), elem.getAttribute('data-blain-addr'), elem.getAttribute('data-blain-phone'), elem.getAttribute('data-blain-url'), true);
							Blain.Stores.list = [];
							clearTimeout(Blain.Stores.timer);
							Blain.Stores.timer = setTimeout(function() { Blain.Stores.menuUp = false; Blain.Stores.menu.fadeOut(); }, 400);
						}
					Blain.Stores.confirmChange(change, loc.s);
				}).children("a").unbind().click(function(e) { e.stopPropagation(); });
				$("#storelookup").unbind().click(displayLookupForm);
				$("#showstores").unbind().click(showStoreList);
			},
			displayLookupForm = function() {
				var	htmlStoreForm = '<form id="frmFindStore" name="frmFindStore" method="get" action="/stores/find.aspx" autocomplete="off"><p>To find the store nearest you, please enter your zip code:</p>'
					+ '<p><label for="txtLocalZip">Zip Code:</label><input type="text" name="txtLocalZip" id="txtLocalZip" class="textbox" autocapitalize="off" /><input type="submit" class="button" value="Go" /></p>'
					+ '<p><a id="showstores" href="/stores/">View Store List</a></p></form>';
				Blain.Stores.list = [];
				Blain.Stores.noneLocal = false;
				// Display form to get zip
				Blain.Stores.clearLocalStore();
				Blain.Stores.menu.html(htmlStoreForm).show();
				var txtLocalZip = $("#txtLocalZip");
				Blain.Stores.label.removeClass('curstore').html('<span class="pinicon"></span>Find My Store<span class="downarrow"></span>');
				// Update the footer link
				$("a.localstorelink").attr('href', '/stores/').text('Contact a Local Store');
				txtLocalZip.unbind().focus(function() {
					$.trace('Store zip field focus');
					Blain.Stores.formHasFocus = true;
				}).blur(function() {
					$.trace('Store zip field blur');
					Blain.Stores.formHasFocus = false;
				}).select().filter_input({ regex: /[0-9]/, suppressEnter: false });
				$("#frmFindStore").unbind().submit(function(e) {
					e.preventDefault();
					var val = txtLocalZip.val().trim();
					if (val == "") return false;
					loc = {s:0, z:val};
					Blain.Stores.menu.html(htmlStoreSpinner);
					getStores(loc);
				});
				$("#showstores").unbind().click(showStoreList);
				// Trigger change to product catalog
				if ($id("radio2")) Blain.Catalog.triggerStoreChange(0);
				/**** MAY NOT BE NEEDED
				if ($id("salesflyers")) {
					Blain.Promotions.getSalesFlyerList(0);
					$("#lblStoreName").text("All Stores/Online");
				}*/
			},
			hidden = (Blain.Stores.menu.is(':hidden'));
		Blain.Stores.menuUp = true;
		clearTimeout(Blain.Stores.timer);
		// If this isn't the first time the popup has been displayed, display what's currently in it and exit the routine
		if (Blain.Stores.list.length > 0 && !firstTime) {
			Blain.Stores.menu.show();
			return;
		}
		firstTime = false;
		// If cookie exists, lookup and display current stores
		if (Blain.Stores.list.length > 0 || Blain.Stores.noneLocal) {
			displayStores();
			return;
		}
		if (hidden && Blain.Stores.localStore.s > 0) {
			Blain.Stores.menu.html(htmlStoreSpinner).show();
			getStores(Blain.Stores.localStore);
			return;
		}
		if (hidden || !$id("txtLocalZip")) displayLookupForm();
		else $id("txtLocalZip").select();
	},

	// Hides the store selector popup
	hideMenu: function() {
		clearTimeout(Blain.Stores.timer);
		//if (!Blain.Stores.formHasFocus)
		Blain.Stores.timer = setTimeout(function() { Blain.Stores.menuUp = false; Blain.Stores.menu.fadeOut(); }, 1000);
	},

	// Sets the local store
	setStore: function(loc, name, addr, phone, url, onlyifpickup) {
		if (loc.s != Blain.Stores.localStore.s) {
			Blain.Stores.localStore = loc;
			Blain.Stores.noneLocal = false;
			Cookie.set("Loc", "s=" + loc.s + "&z=" + loc.z + "&m=D&t=0&o=0&g=M", Blain.Stores.locExpDate, '/', Blain.cDom);
			Blain.Stores.label.addClass('curstore').html('<span class="pinicon"></span><span class="curstore-head">My Local Store</span>' + name + '<span class="downarrow"></span>');
			if ($id("ucHeader_ulCustomer") || Blain.Cart.numItems > 0) {
				$.ajax({
					type: "POST",
					url: "/ajax/stores.aspx",
					data: { a: "s", n: encodeURIComponent(loc.s) },
					dataType: "JSON",
					success: function(data, status, xhr) {
					},
					error: function(xhr, status, error) {
						$.gaError('Store Locator', 'Customer Store Set Error', xhr.status, error);
					}
				});
			}
			// Trigger change to product catalog
			try{ delete window.frames["ifQuickView"]; }catch(e){}
			var productFrame = window.frames['ifQuickView'];
			if (productFrame) {
				$.trace('Changing store in product frame');
				productFrame.Blain.Catalog.triggerStoreChange(loc.s);
			} else if ($id("radio2")) {
				$.trace('Changing store in parent frame');
				Blain.Catalog.triggerStoreChange(loc.s);
			}
			// Trigger a change in the cart
			else if ($id("frmShoppingCart")) {
				$.trace('Changing store in shopping cart');
				Blain.Cart.sendItemUpdates();
			} else {
				$.trace('Changing store');
				Blain.Stores.notifyChange(name, onlyifpickup);
			}
			if ($id("salesflyers")) {
				Blain.Promotions.getSalesFlyerList(loc.s);
				$("#lblStoreName").text(name);
			}
			// Update the ribbon
			$("#ucHeader_lblNewStore").text(name);
			$("#ucHeader_hlNewStore").attr('href', url);
			$("#ucHeader_lblNewStoreAddress").text(addr);
			$("#ucHeader_lblNewStorePhone").text(phone);
			// Update the footer link
			$("a.localstorelink").attr('href', url).text('Contact the ' + name.replace(/, [A-Z]{2}/, '') + ' store');
			// Track event in Google Analytics
			$.gaEvent('Store Locator', 'Set Local Store', name);
		}
	},

	// Opens the store selector popup
	openNewSelector: function() {
		$.trace('Blain.Stores.openNewSelector');
		var func = function() {
			Blain.Stores.list = [];
			Blain.Stores.noneLocal = false;
			Blain.Stores.clearLocalStore();
			Blain.Stores.showMenu();
			Blain.Stores.menu.effect('highlight', 'slow');
		}
		Blain.Stores.confirmChange(func, "");
	},

	// Store change dialog box
	notifyChange: function(locname, onlyifpickup) {
		// Determine dialog parameters
		var dlg, dlgheight, dlghtml, dlgbuttons;
		if (onlyifpickup && Blain.Cart.numPickupItems == 0 && !$id("radio2")) return;
		dlghtml = '<div id="storeset" title="Your Local Store"><a href="#" class="btnclose"></a><h5 align="center">Your local store has been set to</h5><h2 align="center">' + locname + '</h2>'
			+ '<p>This is now your local store for in-store pickup and viewing product availability.</p>'
			+ '<span class="fine-print"><b>We respect your privacy.</b><br />No personally-identifiable information has been sent to Blain\'s Farm &amp; Fleet '
			+ 'as a result of this operation. This feature in our web site is provided for your convenience.</span></div>';
		if (onlyifpickup) {
			if (Blain.Cart.numPickupItems > 0) {
				dlghtml = '<div id="storeset" title="Your Local Store"><a href="#" class="btnclose" title="Close"></a><h5 align="center">Your local store has been set to</h5><h2 align="center">' + locname + '</h2>'
					+ '<strong class="red">Product availability for your pickup items may have changed!</strong><br />'
					+ 'Please review your shopping cart to see current availability for your pickup items at this store.</b></div>';
				dlgbuttons = {
					"Review Shopping Cart": function() { dlg.dialog("close"); location.href = '/cart/'; },
					"Close Window": function() { dlg.dialog("close"); }
				}
				dlgheight = 205;
			} else {
				dlgbuttons = { "Close Window": function() { dlg.dialog("close"); } }
				dlgheight = 250;
			}
		} else {
			dlgbuttons = {
				"Shop Your Store": function() { dlg.dialog("close"); location.href = '/'; },
				"Close Window": function() { dlg.dialog("close"); }
			}
			dlgheight = 250;
		}
		// Create and open dialog
		dlg = $(dlghtml);
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 350,
			height: dlgheight,
			dialogClass: "notitle ctrbuttons",
			create: function() {
				dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
			},
			buttons: dlgbuttons,
			close: function() { dlg.dialog("destroy").remove(); }
		});
	},

	// Store change confirmation dialog box
	confirmChange: function(onconfirm, newstore) {
		if (Blain.Cart.numPickupItems == 0) {
			onconfirm();
			return;
		}
		if (Blain.Stores.localStore.s == 0 || Blain.Stores.localStore.s == newstore) {
			onconfirm();
			return;
		}
		// Create and open dialog
		var dlg = $('<div id="storeset" title="Your Local Store"><a href="#" class="btnclose"></a><h3 align="center" class="red">Changing your local store will<br />affect some items in your cart!</h3>'
			+ '<p>There are items in your shopping cart that you have set to pick up at the store. Changing your local store will <strong>change the pickup location for all of these items</strong> '
			+ 'and may also change their availability.</p>'
			+ '<h5 align="center">Do you want to continue?</h5></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 350,
			height: 240,
			dialogClass: "notitle ctrbuttons",
			create: function() {
				dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
			},
			buttons: {
				"Yes": function() {
					dlg.dialog("close");
					onconfirm();
				},
				"No": function() { dlg.dialog("close"); }
			},
			close: function() { dlg.dialog("destroy").remove(); }
		});
	},
	
	init: function() {
		Blain.Stores.getLocalStore();
		Blain.Stores.setupMenu();
		Blain.Stores.getHTMLStoreList();
	}
}

/**************** PRODUCT CATALOG METHODS ********************/

Blain.Catalog = {
	
	viewExpDate: new Date(new Date().getTime() + (60 * 1000 * 60 * 60 * 24)),
	
	showReviewTab: function() {	
		$("#tablinks li.reviews").addClass('selected').siblings().removeClass('selected');
		$("#tabs_reviews").addClass('active').siblings('.tabcontent').removeClass('active');
		location.href = "#reviews";
	},
	
	getReviews: function() {
		if (typeof($BV) != "undefined") {
			if ($id("BVRRSummaryContainer")) {
				var blainnum = $('#BVRRSummaryContainer').attr('data-blain-blainnum');
				$BV.configure('global', { productId : blainnum });
				$.trace('Rendering BazaarVoice detail page reviews');
				$BV.ui( 'rr', 'show_reviews', { doShowContent : function () { Blain.Catalog.showReviewTab(); } });
			}
			
			var prod = {}, prodCount = 0;
			$('div.bvinline').each(function() {
				var elem = $(this);
				if (elem.attr('data-blain-numreviews') != "0") {
					prod[elem.attr('data-blain-sku')] = { url: elem.attr('data-blain-url') };
					prodCount++;
				}
			});
			if (prodCount > 0) {
				$.trace('Rendering BazaarVoice inline reviews');
				$BV.ui('rr', 'inline_ratings', { productIds: prod, containerPrefix : 'BVRRInlineRating' });
			}
		}
	},
	
	getTurnToTeaser: function() {
		if (typeof(TurnToItemData) != 'undefined' && $id("turntoteaser")) {
			var htmlstr = '<div class="btnfloat"><a class="button btnsmall" href="javascript:void(0)">Ask a Question</a></div>';
    		if (TurnToItemData.counts.q > 0 || TurnToItemData.counts.a > 0) {
				htmlstr += '<p class="light"><strong>Get fast answers from people who own this!</strong></p><p class="count"><a href="javascript:void(0)">See ';
				if (TurnToItemData.counts.q > 0) htmlstr += '<strong>' + TurnToItemData.counts.q + '</strong>' + (TurnToItemData.counts.q > 1 ? ' questions' : ' question');
				if (TurnToItemData.counts.q > 0 && TurnToItemData.counts.a > 0) htmlstr += ' | ';
				if (TurnToItemData.counts.a > 0) htmlstr += ' <strong>' + TurnToItemData.counts.a + '</strong>' + (TurnToItemData.counts.a > 1 ? ' answers' : ' answer');
				htmlstr += '</a></p>';
			} else htmlstr += '<p class="light nocount"><strong>Get fast answers from people who own this!</strong></p>'
			var htmlobj = $(htmlstr);
			htmlobj.find('a').click(function(e) {
				e.preventDefault();
				Blain.Catalog.showQATab();
			});
			$('div.turntoteaser').append(htmlobj);
		}
	},
	
	showQATab: function() {
		$("#tablinks li.qa").addClass('selected').siblings().removeClass('selected');
		$("#tabs_qa").addClass('active').siblings('.tabcontent').removeClass('active');
		location.href = "#qa";
		//TurnTo.clickAsk();
	},
	getDataUrl: function () {
		var divContainer = $("#divProducts");
		return divContainer.data('blain-url');
	},
	getDataPath: function () {
		var qs = window.location.search, hawkitemlist = $("#hawkitemlist"),
			divContainer = (hawkitemlist.length>0) ? $("#divProducts") : $("#divProducts");
		if (window.location.hash != "")
			qs = "?" + window.location.hash.substring(1);

		return $("#divProducts").data('blain-path');
	},
	// Sets up product list event handlers
	setupLists: function() {
		var divNavContainer = $("#ucProductList_divProductNavTop, #ucProductList_divProductNavBottom"),
			divSortContainer = $("#ucProductList_divProductSortTop, #ucProductList_divProductSortBottom"),
			btnListView = divNavContainer.find("a.listview"),
			btnGridView = divNavContainer.find("a.gridview"),
			btnPages = divNavContainer.find("a.prev, a.next, a.pagenum"),
			btnPageSize = divSortContainer.find("div.productperpage a"),
			btnSort = divSortContainer.find("div.productsort a"),
			hawkitemlist = $("#hawkitemlist"),
			divContainer = $("#divProducts"),
			isSearchPage = (hawkitemlist.data("blain-issearch") == 1) ? true : false,
			isSearchPageOnLoad = (hawkitemlist.data("blain-issearch") == 1) ? true : false,
			bProductTotal = divNavContainer.find("div.productnav-lefttext > b"),
			datapath = Blain.Catalog.getDataPath(),
			dataurl = Blain.Catalog.getDataUrl(),
			htmlUpdateStatus = '<div id="product-update"><span class="spinner"></span> Loading</div>',
			pagenum = ((!$.qs.get('p')) ? 1 : $.qs.get('p')),
			pv = { ps: 64, s: "r", vm: "g" }, newurl,
			stylenode = null,
			getProductList = function(pagenum, mode) {
				var status = $(htmlUpdateStatus).dialog({
					autoOpen: false,
					resizable: false,
					closeOnEscape: false,
					width: 80,
					height: 30,
					dialogClass: "notitle",
					close: function() { status.dialog("destroy").remove(); }
				});
				datapath = Blain.Catalog.getDataPath();
				dataurl = Blain.Catalog.getDataUrl();
				$.ajax({
					url: "/ajax/products.aspx",
					data: { a: "pl", dp: datapath, du: dataurl, cont: divContainer.attr('id'), p: pagenum, ps: pv.ps, s: pv.s },
					dataType: "JSON",
					beforeSend: function() {
						btnPages.unbind().tappable(disabled);
						btnListView.unbind().tappable(disabled);
						btnGridView.unbind().tappable(disabled);
						btnPageSize.unbind().tappable(disabled);
						btnSort.unbind().tappable(disabled);
						divContainer.addClass('product-updating');
						$(window).scrollTop(divContainer.scrollTop());
						status.dialog("open");
					},
					complete: function() {
						divContainer.removeClass('product-updating');
						status.dialog("close");
					},
					success: function(data, status, xhr) {
						if (mode == "sort") updateSortControls();
						else if (mode == "size") updatePageSizeControls();
						btnPages.unbind();
						updateProductList(data, mode);
					},
					error: function(xhr, status, error) {
						$.gaError('Product List', 'Product List Error', xhr.status, error);
					}
				});
			},
			updateProductList = function (data, mode) {
				if (data.SearchQuery) {
					$.trace(data.SearchXML);
					$.trace(data.SearchQuery);
				}
				divNavContainer.children("ul.productnav-pagebuttons").remove();
				$(data.PageControlHTML).appendTo(divNavContainer);
				btnPages = divNavContainer.find("a.prev, a.next, a.pagenum").tappable(evtChangePage);
				btnListView.unbind().tappable(evtListView);
				btnGridView.unbind().tappable(evtGridView);
				btnPageSize.unbind().tappable(evtChangePageSize);
				btnSort.unbind().tappable(evtChangeSort);
				divContainer = $("#divProducts");
				divContainer.html(data.ProductHTML);
				bProductTotal.text((data.TotalProducts == 1) ? "1 Product" : data.TotalProducts + " Products");
				Blain.Catalog.getReviews();
				$("a.cartbtn").unbind().tappable(evtAddToCart);
				// Change data path
				datapath = data.NewPath;
				divContainer.data('blain-path', data.NewPath);
				if (newurl) {
					if (typeof(window.history.pushState) == 'function') window.history.pushState(null, newurl, newurl);
					else window.hash = '#!' + newurl;
					newurl = null;
				}
				setHawkTracking();
				$(document).trigger('blain.productlist.refreshed');
			},
			getCookie = function() {
				var tmp = Cookie.get("pv");
				if (tmp) pv = $.deparam(tmp);
			},
			updateCookie = function () {
				Cookie.set("pv", "ps=" + encodeURIComponent(pv.ps) + "&s=" + encodeURIComponent(pv.s) + "&vm=" + encodeURIComponent(pv.vm), Blain.Catalog.viewExpDate, '/', Blain.cDom);
			},
			updateSortControls = function () {
				updateCookie();
				btnSort.each(function() {
					var btn = $(this);
					if (btn.data('blain-sort') == pv.s) {
						$.trace("changing sort selection to " + pv.s);
						btn.addClass('down');
					}
					else btn.removeClass('down');
				});
			},
			updatePageSizeControls = function() {
				updateCookie();
				btnPageSize.each(function() {
					var btn = $(this);
					if (btn.data('blain-pagesize') == pv.ps) btn.addClass('down');
					else btn.removeClass('down');
				});
			},
			setHawkTracking = function() {
				$.trace('Setting up hawk link tracking');
				var index = 1;
				divContainer.find('div[data-blain-hawktrack]').each(function() {
					var elem = $(this);
					elem.data('blain-hawkindex', index).find('a').off('click.trackhawk').on('click.trackhawk', evtHawkTrack);
					index++;
				});
			},
			evtListView = function(e) {
				e.preventDefault();
				var btn = $(this);
				if (!btn.hasClass("down")) {
					btnListView.addClass("down");
					btnGridView.removeClass("down");
					divContainer.removeClass('product-gridview').addClass('product-listview');
					$.gaEvent("Product List", "Toggle Grid/List View", "List");
					pv.vm = "l";
					updateCookie();
				}
			},
			evtGridView = function(e) {
				e.preventDefault();
				var btn = $(this);
				if (!btn.hasClass("down")) {
					btnGridView.addClass("down");
					btnListView.removeClass("down");
					divContainer.removeClass('product-listview').addClass('product-gridview');
					$.gaEvent("Product List", "Toggle Grid/List View", "Grid");
					pv.vm = "g";
					updateCookie();
				}
			},
			evtChangePage = function(e) {
				e.preventDefault();
				var btn = $(this),
					pagenum = btn.data('blain-pagenum');
				if (!btn.hasClass("down") && !btn.hasClass("dis")) {
					if (isSearchPage) {
						if (pagenum != $("#hdnhawkpg").val()) {
							$.gaEvent("Product List", "Change Page", pagenum.toString());
							$("#hdnhawkpg").val(pagenum);
							HawkSearch.refreshUrl(e);
							return false;
						}
					} else {
						newurl = btn.attr('href');
						$.gaEvent("Product List", "Change Page", pagenum.toString());
						getProductList(pagenum, "page");
					}
				}
			},
			evtChangePageSize = function(e) {
				e.preventDefault();
				var btn = $(this);
				if (!btn.hasClass("down")) {
					pv.ps = btn.data('blain-pagesize');
					newurl = divContainer.data('blain-url');
					newurl = $.qs.set('p', null, newurl);
					pagenum = 1;
					updatePageSizeControls();
					$.gaEvent("Product List", "View Per Page", pv.ps.toString());

					if (isSearchPage) {
						$("#hdnhawkpg").val(pagenum);
						$("#hdnhawkmpp").val(pv.ps);
						//$(".hawkmpp").val($(this).val());
						HawkSearch.refreshUrl(e);
						return false;
					}
					else {
						getProductList(pagenum, "size");
					}
				}
			},
			evtChangeSort = function(e) {
				e.preventDefault();
				var btn = $(this);
				if (!btn.hasClass("down")) {
					pv.s = btn.data('blain-sort');
					newurl = divContainer.data('blain-url');
					//newurl = Blain.Catalog.getDataUrl();
					newurl = $.qs.set('p', null, newurl);
					pagenum = 1;
					updateSortControls();
					var sortby = '', hawksortby='';
					if (pv.s == "pa") {
						sortby = 'Price Low/High';
						if (isSearchPage) { hawksortby = 'salepriceasc'; }
					}
					else if (pv.s == "pd") {
						sortby = 'Price High/Low';
						if (isSearchPage) { hawksortby = 'salepricedesc'; }
					}
					else if (pv.s == "b") {
						sortby = 'Title A-Z';
						if (isSearchPage) { hawksortby = 'nameasc'; }
					}
					else {
						sortby = 'Featured/Relevancy';
						if (isSearchPage) { hawksortby = 'score'; }
					}

					$.gaEvent("Product List", "Sort Products", sortby);
					
					if (isSearchPage) {
						$("#hdnhawkpg").val(pagenum);
						$("#hdnhawksortby").val(hawksortby);
						//$(".hawksortby").val($(this).val());
						HawkSearch.refreshUrl(e);
						return false;
					}
					else{
						getProductList(pagenum, "sort");
					}


				}
			},
			evtAddToCart = function(e) {
				e.preventDefault();
				Blain.Catalog.openQuickView(this.getAttribute("data-blain-sku"));
			},
			evtHawkTrack = function(e) {
				var cont = $(this).closest('div.product');
				if (typeof(HawkSearch) != "undefined") {
					if (typeof(HawkSearch.link) != "undefined") return HawkSearch.link(this, cont.attr('data-blain-hawktrack'), cont.data('blain-hawkindex'), cont.attr('data-blain-hawkid'), 0);
				}
			},
			disabled = function(e) {
				e.preventDefault();
			};
		// Get the product list stylesheet
		var tmp = $tag("head")[0].getElementsByTagName("style");
		for (var x = 0, len = tmp.length; x < len; x++) {
			if (tmp[x].getAttribute("id") != "_vis_opt_path_hides") {
				stylenode = tmp[x];
				break;
			}
		}	
		getCookie();
		if (Blain.hiRes) {
			(new Image()).src = Blain.cssPrefix + '/css/images/spinner@2x.gif';
		} else {
			(new Image()).src = Blain.cssPrefix + '/css/images/spinner.gif';
		}
		$("a.cartbtn").tappable(evtAddToCart);

		// Product list view events
		btnListView.tappable(evtListView);
		btnGridView.tappable(evtGridView);
		btnPages.tappable(evtChangePage);
		btnSort.tappable(evtChangeSort);
		btnPageSize.unbind().tappable(evtChangePageSize);
		
		if (isSearchPage) {
			setHawkTracking();
		} else {
			// Set history and hashchange events
			$(window).unbind('popstate.productlist').bind('popstate.productlist', function (e) {
				if (isSearchPage) return;
				var loc = history.location || document.location,
					tmp = $.deparam(loc.search.replace('?', ''));
				if (!tmp.p) tmp.p = 1;
				if (tmp.p != pagenum && !isSearchPage) {
					pagenum = tmp.p;
					getProductList(pagenum, "page");
				}
			}).unbind('hashchange.productlist').bind('hashchange.productlist', function () {
				if (isSearchPage) return;
				var loc = history.location || document.location,
					tmp = $.deparam(loc.hash.substring(loc.hash.indexOf('?') + 1));
				if (!tmp.p) tmp.p = 1;
				if (tmp.p != pagenum) {
					pagenum = tmp.p;
					getProductList(pagenum, "page");
				}
			});
		}
		
		$(document).on('hawkchanged', function () {
			isSearchPage = true;
			// If there are no query parameters, redirect the page
			var hash = window.location.hash;
			if (hash === null) hash = "";
			if (hash.indexOf("#") == 0) hash = hash.substr(1);
			hash = hash.replace(/(&)?(mpp|sort)=[0-9a-zA-Z]+/g, '');
			if (hash === "" && window.location.search === "" && !isSearchPageOnLoad) location.replace(location.pathname);
			divNavContainer = $("#ucProductList_divProductNavTop, #ucProductList_divProductNavBottom");
			divSortContainer = $("#ucProductList_divProductSortTop, #ucProductList_divProductSortBottom");
			btnListView = divNavContainer.find("a.listview");
			btnGridView = divNavContainer.find("a.gridview");
			btnPages = divNavContainer.find("a.prev, a.next, a.pagenum");
			btnPageSize = divSortContainer.find("div.productperpage a");
			btnSort = divSortContainer.find("div.productsort a");
			divContainer = $("#divProducts");
			
			// Set up page events
			btnListView.unbind().tappable(evtListView);
			btnGridView.unbind().tappable(evtGridView);
			btnPageSize.unbind().tappable(evtChangePageSize);
			btnPages.unbind().tappable(evtChangePage);
			btnSort.unbind().tappable(evtChangeSort);
			
			// Set Hawk link tracking
			setHawkTracking();
			
			// Refresh product reviews
			Blain.Catalog.getReviews();
			
		});
	},

	// Sets up product detail pages
	setupProductDetail: function() {
		var qty = $("#qty"),
			blainnum = $("#sku"),
			req = $("#req"),
			vk = $("#vk"),
			hlBookmark = $("#hlBookmark"),
			mfrnum = $("#mfr"),
			radio1 = $("#radio1"),
			radio2 = $("#radio2"),
			ddlChild = $("#c"),
			onlinediv = $("#divOnline"),
			childdiv = $("#divChildren"),
			onlineprog = $("#lblOnlineSpinner"),
			storediv = $("#divStore"),
			storeprog = $("#lblStoreSpinner"),
			onlinestock = $("#onlinestock"),
			storestock = $("#lbl2"),
			noavailtext = $("#pNoAvail"),
			cartbtn = $("#btnCart"),
			reqbtn = $("#hlRequest"),
			qtyfield = $("#qty"),
			qtyerroricon = $("#lblQtyError"),
			qtyerrormsg = $("#lblQtyErrorMsg"),
			onlineInStock = (onlinediv.hasClass('noavail')) ? false : true,
			storeInStock = (storediv.hasClass('noavail')) ? false : true,
			checkItemQty = function() {
				var storenum = -1,
					onhand = 9999,
					delivery = '',
					qtyval = qtyfield.val().trim();
				if (radio1.is(':checked')) {
					storenum = 80;
					onhand = radio1.data('blain-onhand');
					delivery = 'to ship';
					$.trace("checkItemQty:: Branch 80: " + onhand);
				} else if (radio2.is(':checked')) {
					storenum = radio2.val();
					onhand = radio2.data('blain-onhand');
					delivery = 'at store';
					$.trace("checkItemQty:: Branch " + storenum + ": " + onhand);
				}
				if (storenum == -1) {
					qtyerrormsg.text('Please select whether to ship or pick up').show();
					qtyerroricon.show();
					return false;
				}
				if (qtyval == "") return false;
				else if (parseInt(qtyval) == 0) qtyerrormsg.text('Please enter a valid quantity');
				else if (onhand > 1) qtyerrormsg.text('Only ' + onhand + ' are available ' + delivery + ' right now');
				else if (onhand > 0) qtyerrormsg.text('Only 1 is available ' + delivery + ' right now');
				else qtyerrormsg.text('None are available ' + delivery + ' right now');
				if (parseInt(qtyval) == 0 || parseInt(qtyval) > onhand) {
					qtyerroricon.show();
					qtyerrormsg.show();
					return false;
				} else {
					qtyerroricon.hide();
					qtyerrormsg.hide();
					return true;
				}	
			},
			setStockStatus = function(storenum, onhand, htmlstr) {
				$.trace("setStockStatus:: Branch: " + storenum + ", On Hand: " + onhand);
				if (storenum == 80) {
					onlinestock.html(htmlstr);
					onlineprog.hide();
					if (onhand > 0) {
						onlinediv.attr('class', 'productdetail-radio');
						radio1.removeAttr('disabled').data('blain-onhand', onhand).show();
						onlineInStock = true;
					} else {
						onlinediv.attr('class', 'productdetail-radio noavail');
						onlineprog.hide();
						radio1.attr('disabled', 'disabled').data('blain-onhand', onhand).show();
						onlineInStock = false;
					}
				} else if (storenum > 0) {
					storestock.html(htmlstr);
					storeprog.hide();
					if (onhand > 0) {
						storediv.attr('class', 'productdetail-radio');
						radio2.removeAttr('disabled').data('blain-onhand', onhand).show();
						storeInStock = true;
					} else {
						storediv.attr('class', 'productdetail-radio noavail');
						radio2.attr('disabled', 'disabled').data('blain-onhand', onhand).show();
						storeInStock = false;
					}
				} else {
					storestock.html('<span class="status">FREE In-Store Pick-up - <a href="http://' + Blain.cDom + '/catalog/pickup.aspx?i=' + blainnum.val() + '" class="storeselect leftarrow">Check Store Availability<span></span></a></span>');
					storeprog.hide();
					storediv.attr('class', 'productdetail-radio');
					radio2.removeAttr('disabled').show();
					storeInStock = true;
				}
				if (onlineInStock || storeInStock) {
					noavailtext.hide();
					reqbtn.hide();
					cartbtn.show();
					checkItemQty();
				} else {
					qtyerroricon.hide();
					qtyerrormsg.hide();
					noavailtext.show();
					cartbtn.hide();
					if (req.val() == "1") reqbtn.show();
					else reqbtn.hide();
				}
				$("a.storeselect").unbind().click(function(e) {
					e.preventDefault();
					Blain.Catalog.openPickupSelector(blainnum.val());
				});
				$("a.storeinfo").unbind().click(function(e) {
					e.preventDefault();
					location.href = this.getAttribute('href');
				});
			};
		
		// Qty field and radio button event handler
		qty.keyup(function(e) { checkItemQty() });
		radio1.change(function(e) {
			checkItemQty();
		});
		radio2.change(function(e) {
			checkItemQty();
		});
		$("#frmProductDetailCart").submit(function(e) {
			var form = this,
				win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self;
				onConfirmed = function() {
					if (checkItemQty()) form.submit();
				}
			if (radio1.is(':checked') && Blain.Cart.numShipItems == 0 && Blain.Cart.numPickupItems > 0) {
				e.preventDefault();
				return win.Blain.Cart.confirmMixedOrder('ship', onConfirmed);
			} else if (radio2.is(':checked') && Blain.Cart.numShipItems > 0 && Blain.Cart.numPickupItems == 0) {
				e.preventDefault();
				return win.Blain.Cart.confirmMixedOrder('pickup', onConfirmed);
			} else return checkItemQty();
		});
		
		// Image popup event handler
		if ($id("hlImageButton")) {
			var divImage = $('<div id="productdetail-lgimg"></div>');
			divImage.dialog({
				autoOpen: false,
				modal: true,
				closeOnEscape: true,
				width: 624,
				height: 696,
				dialogClass: "ctrbuttons",
				buttons: { "Close Window": function() { $(this).dialog("close"); } }
			});
			$("#hlImage, #hlImageButton").click(function(e) {
				e.preventDefault();
				var title = this.getAttribute('title'),
					url = this.getAttribute('data-blain-imgurl');
				divImage.empty().append($('<img src="' + url + '" width="600" height="600" alt="" />'));
				divImage.dialog("option", "title", title);
				divImage.dialog("open");
			});
		}
		
		// Social icons
		if ($id("socialicons") || $id("socialicons2")) {
			var s = ($id("socialicons2")) ? $("#socialicons2") : $("#socialicons");
			addthis_config = {
				username: "farmandfleet",
				//ui_cobrand: "Blain's Farm & Fleet",
				data_ga_property: "UA-193719-1",
				data_track_clickback: true,
				data_track_addressbar: true,
				ui_delay: 500,
				ui_use_vertical_menu: true,
				services_compact: 'favorites, google_plusone_share, digg, twitter, reddit, stumbleupon',
				services_expanded: 'facebook, google_plusone_share, pinterest_share, email, favorites, digg, twitter, linkedin, linkedin, reddit'
			};
			addthis_share = {
				url: $("link[rel=canonical]").attr('href'),
				title: $('title').text(),
				description: $('meta[name=description]').attr('content'),
				email_template: 'blain_email',
				email_vars: {
					mfr: s.attr('data-blain-mfrnum'),
					blain: s.attr('data-blain-blainnum'),
					imgsrc: $("#lnkImage").attr('href').replace('p600/', 'product_detail/')
				}
			};
			addthis.init();
		}
		
		// Product children event handler
		var divChildInfo = $("#divPrice, #frmProductDetailCart"),
			lblChange = $("#lblChange"),
			resetChild = function() {
				// Reset display on window unload
				divChildInfo.show();
				lblChange.hide();
				ddlChild.val(childdiv.attr('data-blain-blainnum'));
			};
		ddlChild.change(function() {
			var url = location.pathname.replace(/^(\/products\/)([A-Za-z0-9]+)(-[a-z0-9-_]+)?(.html)?/, "$1" + this.value + "$3$4") + location.search.replace(/(i=)([A-Za-z0-9]+)/, "$1" + this.value);
			divChildInfo.hide();
			lblChange.show();
			window.location.replace(url);
		});
		$(document).off('ready.resetchild', resetChild).on('ready.resetchild', resetChild);
		
		// Request button handler
		$("#hlRequest").click(function(e) {
			e.preventDefault();
			var elem = $(this),
				requrl = $.qs.set('dq', qty.val(), elem.attr('href'));
			if (elem.attr('target') == "_parent") window.parent.location.href = requrl;
			else location.href = requrl;
		});
		
		// Store selection event handlers
		if ($id("frmProductDetailCart")) {
			radio2.click(function(e) {
				if (radio2.val() == "0") {
					e.preventDefault();
					Blain.Catalog.openPickupSelector(blainnum.val());
				}
			});
			$("a.storeselect").unbind().click(function(e) {
				e.preventDefault();
				Blain.Catalog.openPickupSelector(blainnum.val());
			});
			$("a.storeinfo").unbind().click(function(e) {
				e.preventDefault();
				location.href = this.getAttribute('href');
			});
		
			// Store change / stock status event handler
			$.trace('Binding changestore event to ' + self.location);
			$(document).bind('changestore', function(e, storenum) {
				var win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self,
					$jp = win.jQuery;
				// The store changed, get stock status for new store
				if (storenum == 0) {
					radio2.val('0').removeAttr('checked');
					setStockStatus(0, 0, "");
					return;
				}
				$.ajax({
					cache: false,
					url: "/ajax/products.aspx",
					data: { a: "sss", n: storenum, i: blainnum.val(), vk: vk.val() },
					dataType: "JSON",
					beforeSend: function() {
						storeprog.show();
						radio2.hide();
					},
					success: function(data, status, xhr) {
						radio2.val(storenum);
						if (win.Blain.Stores.selectPickup) {
							radio2.attr('checked', 'checked');
							win.Blain.Stores.selectPickup = false;
						}
						setStockStatus(storenum, data.OnHand, data.StatusHTML);
					},
					error: function(xhr, status, error) {
						setStockStatus(storenum, 0, '<span class="status no">Unable to get stock status. Please refresh the page and try again.</span>');
						$.gaError('Product Stock Status', 'AJAX Error', xhr.status, error);
					}
				});
			});
		}
		
		// In-store pickup selection event handlers
		if ($id("pickupstores")) {
			$("#pickuplist a.iconbutton").click(function(e) {
				if (window.parent && window.parent.Blain && window.parent.Blain.Stores && window.parent.Blain.Stores.curDialog) {
					e.preventDefault();
					var elem = this,
						loc = {s:elem.getAttribute("data-blain-storenum"),z:elem.getAttribute("data-blain-zip")},
						stname = elem.getAttribute("data-blain-name"),
						staddr = elem.getAttribute("data-blain-addr"),
						stphone = elem.getAttribute("data-blain-phone"),
						sturl = elem.getAttribute("data-blain-url");
					window.parent.Blain.Stores.selectPickup = true;
					window.parent.Blain.Stores.setStore(loc, stname, staddr, stphone, sturl, true);
					window.parent.Blain.Stores.list = [];
					window.parent.Blain.Stores.curDialog.dialog("close");
				}
			});
			$("#txtZipCode").filter_input({ regex: /[0-9]/, suppressEnter: false });
			$id("txtZipCode").focus();
			$id("txtZipCode").select();
		}
		
		// US Auto stock status checker
		if ($id("usauto")) {
			onlinestock = $("#usauto");
			var vehicle = $("#lblVehicleName").attr('data-blain-vehicle'),
				tiresize = $("#pTireSize").attr('data-blain-tiresize');
			$.ajax({
				cache: false,
				url: "/ajax/products.aspx",
				data: { a: "usats", i: blainnum.val(), vk: vk.val() },
				dataType: "JSON",
				timeout: 15000,
				beforeSend: function() {
					onlineprog.show();
					radio1.hide();
				},
				success: function(data, status, xhr) {
					setStockStatus(80, data.OnHand, data.StatusHTML);
					if (data.OnHand > 0) {
						if (data.OnHand < 4) {
							$.gaEvent('US Auto Tire', 'Limited Stock', blainnum.val());
							if (typeof(vehicle) != 'undefined') $.gaEvent('US Auto Tire', 'Limited Stock for Vehicle', vehicle);
							if (typeof(tiresize) != 'undefined') $.gaEvent('US Auto Tire', 'Limited Stock for Size', tiresize);
							qty.val(data.OnHand);
							radio1.click();
						} else {
							$.gaEvent('US Auto Tire', 'In Stock', blainnum.val());
							if (typeof(vehicle) != 'undefined') $.gaEvent('US Auto Tire', 'In Stock for Vehicle', vehicle);
							if (typeof(tiresize) != 'undefined') $.gaEvent('US Auto Tire', 'In Stock for Size', tiresize);
							qty.val(4);
							radio1.click();
						}
					} else {
						$.gaEvent('US Auto Tire', 'Out Of Stock', blainnum.val());
						if (typeof(vehicle) != 'undefined') $.gaEvent('US Auto Tire', 'Out of Stock for Vehicle', vehicle);
						if (typeof(tiresize) != 'undefined') $.gaEvent('US Auto Tire', 'Out of Stock for Size', tiresize);
					}
				},
				error: function(xhr, status, error) {
					setStockStatus(80, 0, '<span class="status no">Unable to get stock status at this time. Please try again later.</span>');
					$.gaError('US Auto Tire', 'AJAX Error', xhr.status, error);
				}
			});
		}
		
		// Product tabs
		$("#tablinks a").click(function(e) {
			e.preventDefault();
			var elem = $(this),
				val = elem.attr('href').replace('#', '');
			elem.parent().addClass('selected').siblings().removeClass('selected');
			$("#tabs_" + val).addClass('active').siblings('.tabcontent').removeClass('active');
			if (val == "qa") {

				//TurnTo.clickAsk();
			}
		});
		
		// Cross-sells
		if ($id("divCrossSells")) {
			var divCrossSells = $("#divCrossSells"),
				blain = divCrossSells.attr('data-blain-blainnum');
			$.ajax({
				url: "/ajax/products.aspx",
				data: { a: "cs", i: blain },
				dataType: "JSON",
				success: function(data, status, xhr) {
					if (data.SearchQuery) {
						$.trace(data.SearchXML);
						$.trace(data.SearchQuery);
					}
					if (data.ProductHTML != "") {
						$("#divCrossSells").append($(data.ProductHTML)).show();
						Blain.Catalog.getReviews();
					}
				},
				error: function(xhr, status, error) {
					$.gaError('Cross-Sell', 'AJAX Error', xhr.status, error);
				}
			});
		}
		
		// Product request form handlers
		if ($id("rblDeliveryMethod")) {
			var divStore = $("#divStore");
			$("#rblDeliveryMethod_0").click(function() {
				divStore.hide();
				$id("rfvStoreNum").enabled = false;
			});
			$("#rblDeliveryMethod_1").click(function() {
				divStore.show();
				$id("rfvStoreNum").enabled = true;
			});
		}
		
		// Bookmark event handler
		hlBookmark.click(function(e) {
			if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) return true;
			var elem = this;
			if (window.sidebar && window.sidebar.addPanel) {
				// Mozilla Firefox Bookmark
				window.sidebar.addPanel(document.title, this.getAttribute('href'), '');
				return false;
			} else if (window.external && ('AddFavorite' in window.external)) {
				// IE Favorite
				window.external.AddFavorite(this.getAttribute('href'), document.title);
				return false;
			} else if (window.opera && window.print) {
				// Opera Hotlist
				this.title = document.title;
				return true;
			} else { // webkit - safari/chrome
				alert('Drag the button to your bookmark bar, or press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command' : 'CTRL') + ' + D to bookmark this page.');
			}
			return false;
		});
	},
	
	// Triggers the changestore event for the current window
	triggerStoreChange: function(store) {
		$.trace('Triggering store change');
		$(document).trigger('changestore', store);
	},

	// Opens the store selector on the product detail page
	openPickupSelector: function(blain) {
		var win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self,
			$jp = win.jQuery;
		var func = function() {
			// Create and open dialog
			var dlg = $jp('<div id="pickuplocation" title="In-Store Pickup Availability">'
				+ '<iframe id="ifPickup" name="ifPickup" src="' + location.protocol + '//' + Blain.cDom + '/catalog/pickup_iframe.aspx?i=' + blain + '" runat="server" class="ifcontent ifpickup" scrolling="no" frameborder="0"></iframe></div>');
			dlg.dialog({
				modal: true,
				resizable: false,
				closeOnEscape: true,
				width: 550,
				height: 360,
				close: function() { dlg.dialog("destroy").remove(); win.Blain.Stores.curDialog = null }
			});
			win.Blain.Stores.curDialog = dlg;
		}
		win.Blain.Stores.confirmChange(func, "");
	},
	
	// Opens the product quick-view on a product list page
	openQuickView: function(blain) {
		// Create and open dialog
		var dlg = $('<div id="productqv" title="Add Item to Shopping Cart">'
			+ '<iframe id="ifQuickView" name="ifQuickView" src="' + location.protocol + '//' + Blain.cDom + '/catalog/product_iframe.aspx?i=' + blain + '" runat="server" class="ifcontent ifproduct" scrolling="no" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 850,
			height: 535,
			close: function() { dlg.dialog("destroy").remove() }
		});
		$.gaPageview('/catalog/product_iframe.aspx?i=' + blain);
	},
	
	initializeTrackingIframe: function () {
		if ($("a.fx-tracking-link")) {
			$("a.fx-tracking-link").unbind().click(function (e) {
				e.preventDefault();
				Blain.Catalog.openTrackingDialog($(this));
			})
			/*
			$("#txtEmailMe").focus();
			$("#txtEmailMe").select();
			$("#btnEmailmeClose").click(Blain.StorePage.closeParentPopup);*/
		}
	},

	openTrackingDialog: function (elem) {
		var link = elem,
			trackingNum = elem.attr('data-blain-tracking-number').toString();
		var res = trackingNum;
		var dlg = $('<div id="emailme-dialog"><a href="#" class="btnclose" title="Close"></a><iframe class="iftracking" scrolling="no" src="' + location.protocol + '//' + Blain.cDom + '/account/order_status_iframe.aspx?trackingNum=' + res + '" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 725,
			height: 550,
			title: 'Tracking Information for #' + trackingNum,
			create: function () {
				dlg.find("a.btnclose").click(function (e) { e.preventDefault(); dlg.dialog("close"); });
			},
			close: function () { }
		});
		Blain.Catalog.curDialog = dlg;
	},

	init: function() {
		Blain.Catalog.setupLists();
		Blain.Catalog.setupProductDetail();
		Blain.Catalog.getReviews();
		Blain.Catalog.getTurnToTeaser();
	}
}

/**************** E-ALERTS METHODS ********************/

// Set up newsletter subscription fields
Blain.EAlerts = {
	/*dialogDelay: 0,*/
	cookieExpiration: new Date(new Date().getTime() + (50 * 365 * 1000 * 60 * 60 * 24) ),
	/*
	curDialog: null,
	timer: null,*/
	
	init: function() {
		if ($id("cbNewsletter")) {
			var cbNewsletter = $("#cbNewsletter"),
				cbDepts = $("#cblDept input"),
				toggleDepts = function() {
					if (cbNewsletter.is(':checked')) cbDepts.removeAttr('disabled');
					else cbDepts.attr('disabled', 'disabled');
				}
			cbNewsletter.click(toggleDepts);
			toggleDepts();
		}
		
		if ($id("ealerts")) $("#txtEmail").focus();
		
		// Setup popup object, if it exists
		if ($id("ucHeader_pnEAlerts") && !Cookie.get("NoEAlerts")) {
			Blain.EAlerts.showHeaderForm();
		}
		
		// If subscription is completed, set the EAlerts cookie to prevent future popups
		if ($id("imgNewsletter")) Blain.EAlerts.setCookie();
		
		/*$("#btnEAlertsClose").click(Blain.EAlerts.closeParentPopup);*/
	},

	// Sets the e-alerts cookie
	setCookie: function() {
		Cookie.set("NoEAlerts", "1", Blain.EAlerts.cookieExpiration, "/", location.hostname);
	},
	
	
	showHeaderForm: function() {
		var pnEAlerts = $("#ucHeader_pnEAlerts"),
			divEAlertsForm = $("#divEAlertsForm"),
			divEAlertsSubmitting = $("#divEAlertsSubmitting"),
			divEAlertsSubscribed = $("#divEAlertsSubscribed"),
			btnEAlertsSubmit = $("#btnEAlertsSubmit"),
			frmEAlerts = $("#frmEAlerts"),
			txtEmail = $("#eaEmail");
		
		txtEmail.val('');
		btnEAlertsSubmit.prop('disabled', false);
		pnEAlerts.show('blind');
		Blain.EAlerts.setCookie();
		
		pnEAlerts.find('a.closebox').click(function() {
			pnEAlerts.slideUp();
		});
		
		frmEAlerts.on('submit', function(e) {
			e.preventDefault();
			var email = txtEmail.val();
			if (email.match(/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/)) {
				btnEAlertsSubmit.prop('disabled', true);
				btnEAlertsSubmit.removeClass('iconbutton-red').addClass('button-red dis').attr('value', 'Subscribing...');
				$.ajax({
					url: '/ajax/customers.aspx',
					async:true,
					type:"post",
					cache:false,
					data: { a: "sml", e: email },
					dataType: "text",
					complete: function() {
						divEAlertsForm.hide('blind', 'def', function() {
							divEAlertsSubscribed.fadeIn();
							setTimeout(function() { divEAlertsSubscribed.fadeOut(function() { pnEAlerts.slideUp(); }); }, 5000);
						});
                    },
					error: function(xhr, status, error) {}
				});
			} else alert('Please enter a valid email address.');
		});
		
		
	}
	
	
	/*
	openDialog: function() {
		var dlg = $('<div id="ealerts-dialog"><a href="#" class="btnclose" title="Close"></a><iframe class="ifealerts" scrolling="no" src="' + location.protocol + '//' + Blain.cDom + '/ealerts_iframe.aspx" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 420,
			height: 365,
			dialogClass: "notitle",
			create: function() {
				dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
			},
			close: function() { Blain.EAlerts.setCookie() }
		});
		Blain.EAlerts.curDialog = dlg;
		
		// Track virtual pageview in Google Analytics
		$.gaPageview('/ealerts_iframe.aspx');
	},
	*/
	/*
	// Closes the popup window
	closePopup: function() {
		Blain.EAlerts.curDialog.dialog("close");
	},
	
	closeParentPopup: function(e) {
		e.preventDefault();
		if (window.parent && window.parent.Blain && window.parent.Blain) window.parent.Blain.EAlerts.closePopup();
	}
	*/
}

/**************** CUSTOMER METHODS ********************/

Blain.Customers = {
	// Set up the site login form
	setupLoginForm: function() {
		if ($id("frmLogin")) {
			var txtEmail = $id("txtEmail"), email, url;
			if (!txtEmail) txtEmail = $id("txtValidEmail");
			$("#hlRegister, #hlRecover").click(function() {
				email = (!txtEmail) ? "" : txtEmail.value;
				url = $(this).attr('href');
				if (email && email.isEmailAddress()) url += "?email=" + encodeURIComponent(email);
				location.href = url;
				return false;
			});
		}
		
		if ($id("frmCaptchaLogin")) {
			var email = $('#lblEmail').data('blain-email');
			$("#hlRegister, #hlRecover").click(function() {
				url = $(this).attr('href');
				if (email && email.isEmailAddress()) url += "?email=" + encodeURIComponent(email);
				location.href = url;
				return false;
			});
			
			$('a.captchahelp').click(function() {
				$.msgDialog('What is this box, and what do I do?', 'The box you see is designed as a way to protect our customers from online nefarious activity. What you will need to do is look at the image in the box, and then type what you see in the form field below it. As we only wish for real live people to have customer accounts, this is one way in which we can make sure you are, in fact, a real live person. We apologize if this is an inconvenience.');
			});
		}
	},
	
	// Setup the account edit form
	setupEditForm: function() {
		if ($id("frmEditCustomer")) {
			var cbChangeEmail = $("#cbChangeEmail"),
				cbChangePassword = $("#cbChangePassword"),
				txtEmail = $("#txtEmail"),
				txtVerifyEmail = $("#txtVerifyEmail"),
				txtPassword = $("#txtPassword"),
				txtVerifyPassword = $("#txtVerifyPassword");
			cbChangeEmail.click(function(e) {
				if (this.checked) {
					txtEmail.removeAttr('disabled');
					txtVerifyEmail.removeAttr('disabled');
				} else {
					txtEmail.attr('disabled', 'disabled');
					txtVerifyEmail.attr('disabled', 'disabled');
				}
			});
			cbChangePassword.click(function(e) {
				if (this.checked) {
					txtPassword.removeAttr('disabled');
					txtVerifyPassword.removeAttr('disabled');
				} else {
					txtPassword.attr('disabled', 'disabled');
					txtVerifyPassword.attr('disabled', 'disabled');
				}
			});
		}
	},
	
	initializeTrackingIframe: function () {
		$("a.fx-tracking-link").unbind().click(function (e) {
			e.preventDefault();
			Blain.Customers.openTrackingDialog($(this));
		});
	},

	openTrackingDialog: function (elem) {
		var link = elem,
			trackingNum = elem.attr('data-blain-tracking-number').toString(),
			dlg = $('<div id="emailme-dialog"><a href="#" class="btnclose" title="Close"></a><iframe class="iftracking" scrolling="no" src="' + location.protocol + '//' + Blain.cDom + '/account/order-status-iframe.aspx?trackingNum=' + trackingNum + '" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 725,
			height: 550,
			title: 'Tracking Information for #' + trackingNum,
			create: function () {
				dlg.find("a.btnclose").click(function (e) { e.preventDefault(); dlg.dialog("close"); });
			},
			close: function () { }
		});
	},
	
	init: function() {
		Blain.Customers.setupLoginForm();
		Blain.Customers.setupEditForm();
		Blain.Customers.initializeTrackingIframe();
		
		$("#hlPrintReturnDocs").click(function() {
			var x=window.frames['ifReturnInfo'];
			x.focus();
			if (navigator.userAgent.indexOf('MSIE 7') != -1) x.document.execCommand('print',false,null);
			else x.print();
			x.focus();
			return false;
		});
	},
	
	// Validators
	validateStateZip: function(sender, e) {
		var ddlState = $id("ddlState");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},
	validateCVV: function(sender, e) {
		var txtCardNum = $id("txtCardNum"),
			pattern = /^\d{3,4}$/;
		if (txtCardNum.value.indexOf("*") == 0) e.IsValid = true;
		else if (txtCardNum.value.length == 0) e.IsValid = false;
		else e.IsValid = pattern.test(e.Value);
	},
	validateChangeEmail: function(sender, e) {
		if ($id("cbChangeEmail").checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else {
				if (e.Value.isEmailAddress()) e.IsValid = true;
				else e.IsValid = false;
			}	
		} else e.IsValid = true;
	},
	validateVerifyChangeEmail: function(sender, e) {
		if ($id("cbChangeEmail").checked) {
			if ($id("txtEmail").value != e.Value) e.IsValid = false;
			else e.IsValid = true;
		} else e.IsValid = true;
	},
	duplicateCustomerEmail: function(sender, e) {
		var email = e.Value,
			oldemail = $id("lblEmail").innerHTML;
		if ($id("cbChangeEmail").checked && email != oldemail) FormValidation.duplicateCustomerEmail(sender, e);
		else e.IsValid = true;
	},
	validateChangePassword: function(sender, e) {
		if ($id("cbChangePassword").checked) {
			if (e.Value.length >= 5) e.IsValid = true;
			else e.IsValid = false;
		} else e.IsValid = true;
	},
	validateVerifyChangePassword: function(sender, e) {
		if ($id("cbChangePassword").checked) {
			if ($id("txtPassword").value != e.Value) e.IsValid = false;
		} else e.IsValid = true;
	}
}


/**************** SHOPPING CART METHODS ********************/

// Set up shopping cart page
Blain.Cart = {
	
	timer: null,
	label: null,
	numPickupItems: 0,
	numShipItems: 0,
	numItems: 0,
	errors: [],
	errorHeader: null,
	hasErrors: false,
	checkoutBtns: null,
	shipTaxZip: null,
	shipTaxLink: null,
	obj: null,
	closePopup: function() {
		Blain.Cart.curDialog.dialog("close");
	},
	
	closeParentPopup: function(e) {
		e.preventDefault();
		if (window.parent && window.parent.Blain && window.parent.Blain) window.parent.Blain.Cart.closePopup();
	},
	
	openBogo: function (orderID, blainnumber, qty, dealnumber, promonumber, storenum) {
		var win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self,
			$jp = win.jQuery;
		// Create and open dialog
		var dlg = $jp('<div id="bogoalert">'
			+ '<iframe id="ifBogo" name="ifBogo" src="' + location.protocol + '//' + Blain.cDom + '/cart/bogos_iframe.aspx?sn=' + storenum + '&bn=' + blainnumber + '&oid=' + orderID + '&qty=' + qty + '&dn=' + dealnumber + '&pn=' + promonumber + '" runat="server" class="ifbogos" scrolling="no" frameborder="0"></iframe>'
			+ '</div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 400,
			height: 315,
			dialogClass: "notitle",
			create: function () {
				
			},
			success: function () {
				Blain.Cart.obj = $("#divCart");
				Blain.Cart.obj.data('blain-truebogo-blainnumber', "");
				Blain.Cart.obj.data('blain-truebogo-qty', "");
				Blain.Cart.obj.data('blain-truebogo-order', "");
				Blain.Cart.obj.data('blain-truebogo-dealnumber', "");
				Blain.Cart.obj.data('blain-truebogo-promonumber', "");
				Blain.Cart.obj.data('blain-truebogo-store', "");
			}
		});//.find("#btnGoCart").click(function () { dlg.dialog("close") });
		Blain.Cart.curDialog = dlg;

	},
	init: function() {
		
		// Get the cart data from the parent frame
		var win = (window.parent && window.parent.Blain && window.parent.Blain.Stores) ? window.parent : window.self,
			$jp = win.jQuery;

		$("#btnGoCart").click(function (e) { Blain.Cart.closeParentPopup(e); });
		// Cart data
		Blain.Cart.label = $jp("#ucHeader_lblCart");
		Blain.Cart.numPickupItems = Blain.Cart.label.data('blain-pickupitems');
		Blain.Cart.numShipItems = Blain.Cart.label.data('blain-shipitems');
		Blain.Cart.numItems = Blain.Cart.label.data('blain-cartitems');
		Blain.Cart.addSavedItems = Blain.Cart.label.data('blain-addsaveditems');


		// If saved items were added to the cart, open a dialog
		if (Blain.Cart.addSavedItems > 0) {
			var header = (Blain.Cart.addSavedItems == 1) ? "A saved item has been added to your cart" : Blain.Cart.addSavedItems + " saved items have been added to your cart.",
				dlg = $('<div id="saveditems"><a href="#" class="btnclose"></a><h3 align="center">' + header + '</h3>'
					+ 'For your convenience, we have added items that you may have placed into your cart but did not purchase during a previous visit. '
					+ 'Please notice we have also updated those quantities of anything you have reselected at this time. Review your shopping cart '
					+ 'to ensure you have the correct items and quantities before purchasing.</div>');
			dlg.dialog({
				modal: true,
				resizable: false,
				closeOnEscape: true,
				width: 500,
				height: 175,
				dialogClass: "notitle ctrbuttons",
				create: function() {
					dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
				},
				buttons: {
					"View Shopping Cart": function() {
						dlg.dialog("close");
						location.href = '/cart/';
					},
					"Close Window": function() { dlg.dialog("close"); }
				},
				close: function() { dlg.dialog("destroy").remove(); }
			});
		}
		
		// Cart items
		if ($id("divCart")) {
			// Get item counts from page data
			Blain.Cart.obj = $("#divCart");
			Blain.Cart.errorHeader = $("#divCartErrors");
			Blain.Cart.checkoutBtns = $("a.checkoutbtn, div.cart-paypal a");
			Blain.Cart.shipTaxLink = $("#estshiptax");
			if (Blain.Cart.errorHeader.data('blain-errors')) Blain.Cart.errors = Blain.Cart.errorHeader.data('blain-errors').split(',');
			
			// Estimated shipping and tax link event handler
			Blain.Cart.shipTaxLink.click(function(e) {
				e.preventDefault();
				Blain.Cart.openShipTaxCalc();
			});

			if (Blain.Cart.obj.data('blain-truebogo') == "True")
			{
				var bogoblainnumber = Blain.Cart.obj.data('blain-truebogo-blainnumber'),
					bogoqty = Blain.Cart.obj.data('blain-truebogo-qty'),
					orderID = Blain.Cart.obj.data('blain-truebogo-order'),
					dealnumber = Blain.Cart.obj.data('blain-truebogo-dealnumber'),
					promonumber = Blain.Cart.obj.data('blain-truebogo-promonumber'),
					storenum = Blain.Cart.obj.data('blain-truebogo-store');
				Blain.Cart.openBogo(orderID, bogoblainnumber, bogoqty, dealnumber, promonumber, storenum);
			}

			// Preload poof image
			(new Image()).src = Blain.cssPrefix + '/css/images/poof.png';
			var itemcount = Blain.Cart.obj.find("div.cart-tablerow").length,
				itemCheck = function(e) {
					this.prevValue = this.value;
				},
				itemChange = function(e) {
					if (this.type == "radio" && this.value == "0") return true;
					else if (this.type == "text" && this.prevValue == this.value) return true;
					this.prevValue = this.value;
					this.keyPressed = false;
					clearTimeout(Blain.Cart.timer);
					var jqrow = $(this).closest("div.cart-tablerow"),
						rowtype = jqrow.data('blain-rowtype'),
						rowid = jqrow.data('blain-rowid'),
						radio1 = jqrow.find('input.radio1'),
						radio2 = jqrow.find('input.radio2'),
						qtyerror = jqrow.find('span.qtyerror'),
						qtyspinner = jqrow.find('span.spinner'),
						storenum = 80,
						delivery = 'to ship',
						onhand = 0;
					if (radio1.length > 0) onhand = radio1.data('blain-onhand');
					if (radio2.length > 0) {
						if (radio2.is(':checked')) {
							storenum = radio2.val();
							onhand = radio2.data('blain-onhand');
						}
						if (storenum != 80) delivery = 'at store';
					}
					Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
					if (Blain.Cart.itemAvailStatus(rowtype, rowid, storenum, onhand)) {
						if (Blain.Cart.errors.length > 0) {
							qtyspinner.hide();
							qtyerror.show();
							if (radio2.is(':checked') && Blain.Cart.numPickupItems == 0) Blain.Cart.numPickupItems = 1;
							if (!Blain.Cart.hasErrors) Blain.Cart.errorHeader.show('blind');
							Blain.Cart.shipTaxLink.css('visibility', 'hidden');
							Blain.Cart.hasErrors = true;
							//if (this.type == "radio") Blain.Cart.sendItemUpdates();
							//else Blain.Cart.timer = setTimeout(Blain.Cart.sendItemUpdates, 1000);
						} else {
							qtyspinner.show();
							qtyerror.hide();
							if (Blain.Cart.hasErrors) Blain.Cart.errorHeader.hide('blind');
							Blain.Cart.shipTaxLink.css('visibility', '');
							Blain.Cart.hasErrors = false;
							if (this.type == "radio") Blain.Cart.sendItemUpdates();
							else Blain.Cart.timer = setTimeout(Blain.Cart.sendItemUpdates, 1000);
						}
					}
				};
			if (Blain.Cart.errors.length > 0) {
				Blain.Cart.checkoutBtns.bind('click', false);
				Blain.Cart.shipTaxLink.css('visible', 'hidden');
				Blain.Cart.hasErrors = true;
			}
			Blain.Cart.obj.find("input.radio2").click(function(e) {
				if (this.value == "" || this.value == "0") {
					//e.preventDefault();
					Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
					Blain.Stores.openNewSelector();
				}
			});
			
			Blain.Cart.obj.find("input.qtyfield").bind('init', itemCheck).trigger('init').filter_input({ regex: /[0-9]/, suppressEnter: false, success: itemCheck }).keyup(itemChange);
			Blain.Cart.obj.find("input.radio1, input.radio2").change(itemChange);
			Blain.Cart.obj.find("a.removeitembtn").click(function(e) {
				e.preventDefault();
				var jqrow = $(this).closest("div.cart-tablerow");
				var rowtype = jqrow.data('blain-rowtype'),
					rowid = jqrow.data('blain-rowid'),
					delTarget = this.getAttribute("href");
				// Confirmation dialog
				$('<div title="Remove item?">Are you sure you want to remove this item from your shopping cart?</div>').dialog({
					modal: true,
					draggable: false,
					resizable: false,
					closeOnEscape: false,
					buttons: {
						"Yes": function() {
							// If last item in cart, fire non-Javascript URL target
							if (itemcount == 1) {
								location.href = delTarget;
								return;
							}
							var confdialog = $(this),
								spinner = $("#lblSubtotalSpinner");
							// Remove the item from the list (if this is not the last item) with an Ajax call and the "poof" effect
							$.ajax({
								async: true,
								type: "POST",
								url: "/ajax/webstore.aspx",
								dataType: "json",
								data: { a: "dp", o: $id("hdnOrderID").value, i: rowid, it: rowtype},
								success: function (data, status, xhr) {
									Blain.Cart.refreshData(data);
									// Remove item with a "poof"
									itemcount--;
									jqrow.poof(function() {
										jqrow.hide('blind', 'def', function() { jqrow.remove(); });
									});
									Blain.Cart.checkoutBtns.removeClass('dis').unbind('click', false);
								},
								error: function(xhr, status, error) {
									if (xhr.status > 0 && error != "") {
										$.gaEvent('Shopping Cart', 'Remove Item AJAX Error', error);
										$.msgDialog("Shopping Cart Error", error);
									}
								},
								beforeSend: function() {
									confdialog.dialog("close");
									spinner.css('visibility', '');
									Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
								},
								complete: function(xhr, status) {
									spinner.css('visibility', 'hidden');
								}
							});
						},
						"No": function() { $(this).dialog("close"); }
					},
					close: function() { $(this).dialog("destroy").remove(); }
				});
				return false;
			});
			// Attach cart item-level events	
			Blain.Cart.attachEvents();
		}
		
		// Promo code items
		// Cart screen promo code events
		if ($id("txtCartPromoCode")) {
			var promoIsValid = -1,
				lblPromoValid = $("#lblPromoValid"),
				hlRemovePromo = $("#hlRemovePromo"),
				grpPromoValid = $("#lblPromoValid, #hlRemovePromo"),
				grpPromoInvalid = $("#lblPromoInvalid, #lblPromoInvalidText"),
				btnUpdatePromo = $("#btnUpdatePromo"),
				lblPromoSpinner = $("#lblPromoSpinner"),
				txtCartPromoCode = $("#txtCartPromoCode"),
				updatePromo = function() {
					if (txtCartPromoCode.val().trim() == "") {
						removePromo();
						return;
					}
					$.ajax({
						async: true,
						type: "POST",
						url: "/ajax/webstore.aspx",
						dataType: "json",
						data: { a: "upc", o: $id("hdnOrderID").value, pc: txtCartPromoCode.val()},
						success: function (data, status, xhr) {
							if (data.StrVal == "0") {
								promoIsValid = 0;
								$.gaEvent('Promotional Discount', 'Tried Invalid Promo Code', txtCartPromoCode.val());
							} else {
								promoIsValid = 1;
								Blain.Cart.refreshData(data);
								$.gaEvent('Promotional Discount', 'Set Promo Code', txtCartPromoCode.val());
							}
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Shopping Cart', 'Remove Item AJAX Error', error);
								$.msgDialog("Shopping Cart Error", error);
							}
						},
						beforeSend: function() {
							btnUpdatePromo.hide();
							lblPromoValid.hide();
							hlRemovePromo.hide();
							grpPromoInvalid.hide();
							lblPromoSpinner.show();
						},
						complete: function(xhr, status) {
							lblPromoSpinner.hide();
							if (promoIsValid == 1) {
								lblPromoValid.show();
								hlRemovePromo.show();
								grpPromoInvalid.hide();
							} else if (promoIsValid == 0) {
								lblPromoValid.hide();
								hlRemovePromo.hide();
								grpPromoInvalid.show();
							} else {
								lblPromoValid.hide();
								hlRemovePromo.hide();
								grpPromoInvalid.hide();
							}
						}
					});
				},
				removePromo = function() {
					$.ajax({
						async: true,
						type: "POST",
						url: "/ajax/webstore.aspx",
						dataType: "json",
						data: { a: "rpc", o: $id("hdnOrderID").value},
						success: function (data, status, xhr) {
							txtCartPromoCode.val("");
							promoIsValid = -1;
							Blain.Cart.refreshData(data);
							$.gaEvent('Promotional Discount', 'Removed Promo Code', '');
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Shopping Cart', 'Remove Item AJAX Error', error);
								$.msgDialog("Shopping Cart Error", error);
							}
						},
						beforeSend: function() {
							btnUpdatePromo.hide();
							lblPromoValid.hide();
							grpPromoInvalid.hide();
							lblPromoSpinner.show();
						},
						complete: function(xhr, status) {
							lblPromoSpinner.hide();
							lblPromoValid.hide();
							hlRemovePromo.hide();
							grpPromoInvalid.hide();
						}
					});
				}
			// Promo code event handler
			txtCartPromoCode.bind('focus', function() {
				btnUpdatePromo.show();
				lblPromoValid.hide();
				grpPromoInvalid.hide();
			}).bind('keyup', function(e) {
				if (e.keyCode == 13) {
					if (this.value.trim() == "") {
						btnUpdatePromo.hide();
						lblPromoValid.hide();
						hlRemovePromo.hide();
						grpPromoInvalid.hide();
					} else updatePromo();
					return false;
				}
			});
			btnUpdatePromo.click(function(e) {
				e.preventDefault();
				updatePromo();
			});
			hlRemovePromo.click(function(e) {
				e.preventDefault();
				removePromo();
			});
		}
		
		// Estimated ship/tax popup items
		if ($id("divForm")) {
			var frmShipTax = $("#frmShipTax"),
				txtZipCode = $("#txtZipCode"),
				spinner = $("#lblShipTaxSpinner"),
				rbEconomyShipping = $("#rbEconomyShipping"),
				rbStandardShipping = $("#rbStandardShipping"),
				rbPriorityShipping = $("#rbPriorityShipping"),
				lblSalesTax = $("#lblSalesTax"),
				lblShipping = $("#lblShipping"),
				lblGrandTotal = $("#lblGrandTotal"),
				lblArrival = $("#lblArrival"),
				divCustomQuote = $("#divCustomQuote"),
				divShipMethods = $("#divShipMethods"),
				divTotals = $("#divTotals"),
				vsForm = $("#vsForm"),
				win = (window.parent && window.parent.Blain && window.parent.Blain.Cart) ? window.parent : window.self,
				$jp = win.jQuery,
				divEstShipTaxCheckout = $jp("#divEstShipTaxCheckout"),
				divCustomQuoteBtns = $jp("#divCustomQuoteBtns"),
				toggleEstShipTaxBtns = function() {
					if (divCustomQuote.is(':visible')) {
						divEstShipTaxCheckout.hide();
						divCustomQuoteBtns.show();
					} else {
						divEstShipTaxCheckout.show();
						divCustomQuoteBtns.hide();
					}
				},
				calcShipTax = function() {
					clearTimeout(Blain.Cart.timer);
					var method = "GRND";
					if (rbEconomyShipping.is(':checked')) method = "ECON";
					if (rbPriorityShipping.is(':checked')) method = "2DAY";
					if (Blain.Cart.shipTaxZip.length == 5) {
						$.ajax({
							async: true,
							type: "POST",
							url: "/ajax/webstore.aspx",
							dataType: "json",
							data: { a: "ets", z: txtZipCode.value, sm: method, z: Blain.Cart.shipTaxZip },
							success: function(data, status, xhr) {
								if (!data.ValidZipCode) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("The zip code you entered does not appear to be valid.").show();
								} else if (!data.ValidLTLDestination) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("Freight items cannot be shipped to Alaska or Hawaii.").show();
								} else if (!data.ValidEconomyDestination) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("Economy Shipping is not available to Alaska or Hawaii.").show();
								} else if (data.LTLTooHeavy) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("Order exceeds maximum weight allowed. Please call Customer Service at 1-800-210-2370 for assistance.").show();
								} else if (data.LTLNoQuote) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("Cannot calculate freight shipping to this zip code. Please call Customer Service at 1-800-210-2370 for assistance.").show();
								} else if (data.CalcError) {
									divShipMethods.show();
									divTotals.hide();
									divCustomQuote.hide();
									vsForm.text("Sorry, but we cannot calculate an estimated shipping rate for you at this time. Please try again later.").show();
								} else if (data.CustomQuoteRequired) {
									divShipMethods.hide();
									divTotals.hide();
									divCustomQuote.show();
									vsForm.hide();
								} else {
									vsForm.hide();
									lblSalesTax.text(data.SalesTax);
									lblShipping.text(data.TotalShipping);
									lblGrandTotal.text(data.GrandTotal);
									lblArrival.text(data.EstimatedArrival);
									$.gaEvent(data.CourierMethod, data.GrandTotal.replace('$', ''), data.TotalShipping.replace('$', ''));
									divShipMethods.show();
									divTotals.show();
									divCustomQuote.hide();
								}
								toggleEstShipTaxBtns();
							},
							error: function(xhr, status, error) {
								$.gaEvent('Shopping Cart', 'Remove Item AJAX Error', error);
								$.msgDialog("Shopping Cart Error", "Sorry, but an unexpected error occurred with your shopping cart. Please refresh this page in your browser and try again. We apologize for the inconvenience.");
							},
							beforeSend: function() {
								divTotals.hide();
								spinner.css('visibility', '');
							},
							complete: function(xhr, status) {
								spinner.css('visibility', 'hidden');
							}
						});
					}	
				},
				zipCheck = function() {
					var zip = txtZipCode.val().trim();
					if (zip.length == 5 && zip != Blain.Cart.shipTaxZip) {
						Blain.Cart.shipTaxZip = zip;
						spinner.css('visibility', '');
						divTotals.hide();
						Blain.Cart.timer = setTimeout(calcShipTax, 500);
					}
				};	
			txtZipCode.select().filter_input({ regex: /[0-9]/, suppressEnter: false }).keyup(zipCheck);
			Blain.Cart.shipTaxZip = txtZipCode.val().trim();
			rbEconomyShipping.click(calcShipTax);
			rbStandardShipping.click(calcShipTax);
			rbPriorityShipping.click(calcShipTax);
			frmShipTax.bind('submit', function(e) { return false });
			toggleEstShipTaxBtns();
		}
		
		$("#hlNoEcon").click(function(e) {
			e.preventDefault();
			win.Blain.Cart.openNoEconInfo();
		});
	},

	// Method to send and process cart updates
	sendItemUpdates: function() {
		clearTimeout(Blain.Cart.timer);
		var params = "a=uc&" + Blain.Cart.obj.find("input").serialize(),
			spinner = $("#lblSubtotalSpinner");
		$.ajax({
			async: true,
			type: "POST",
			url: "/ajax/webstore.aspx",
			dataType: "json",
			data: params,
			success: function (data, status, xhr) {
				Blain.Cart.refreshData(data);
			},
			error: function(xhr, status, error) {
				if (xhr.status > 0 && error != "") {
					$.gaEvent('Shopping Cart', 'Update Cart AJAX Error', error);
					$.msgDialog("Shopping Cart Error", error);
				}
			},
			beforeSend: function() {
				spinner.css('visibility', '');
				Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
			},
			complete: function(xhr, status) {
				spinner.css('visibility', 'hidden');
			}
		});
	},
	
	// Process an item's availability status
	itemAvailStatus: function(rowtype, rowid, storenum, onhand) {
		if (rowtype == "GC") onhand = 50;
		$.trace("itemAvailStatus:: RowType: " + rowtype + ", On Hand: " + onhand);
		var row = rowtype + "_" + rowid,
			qtyval = $("#txtQty_" + row).val().trim();
			qtyerroricon = $("#lblQtyErrorIcon_" + row);
			qtyerrormsg = $("#lblQtyErrorMsg_" + row);
			otherfields = $("#lblDiscountLabel_" + row + ", #lblDiscountPrice_" + row + ", #lblLineTotalLabel_" + row + ", #lblLineTotalPrice_" + row),
			delivery = (storenum == 80) ? 'to ship' : 'at store';
		if (qtyval == "") return false;
		else if (parseInt(qtyval) == 0) qtyerrormsg.text('Please enter a valid quantity');
		else if (rowtype == "GC" && parseInt(qtyval) > onhand) qtyerrormsg.text('You may order up to ' + onhand + ' cards at a time');
		else if (onhand > 1) qtyerrormsg.text('Only ' + onhand + ' are available ' + delivery + ' right now');
		else if (onhand > 0) qtyerrormsg.text('Only 1 is available ' + delivery + ' right now');
		else if (rowtype == "P" && storenum != 80 && Blain.Stores.localStore.s == 0) qtyerrormsg.text('Please select a local store');
		else qtyerrormsg.text('None are available ' + delivery + ' right now');
		if (parseInt(qtyval) == 0 || parseInt(qtyval) > onhand) {
			otherfields.hide();
			qtyerroricon.show();
			qtyerrormsg.show();
			if (Blain.Cart.errors.indexOf(row) == -1) Blain.Cart.errors.push(row);
		} else {
			qtyerroricon.hide();
			qtyerrormsg.hide();
			otherfields.show();
			Blain.Cart.errors.removeByValue(row);
		}
		return true;
	},

	// Updates the cart screen
	refreshData: function(data) {
		var loc = Blain.Stores.localStore,
			r, x, len, htmlstr, onhand;
			
		// Update each product
		if (data.Products) {
			for (x = 0, len = data.Products.length; x < len; x++) {
				r = data.Products[x];
				$("#lblLineTotalPrice_P_" + r.ID).text(r.LineTotal);
				// If there is a promo deal discount, display the discount details
				if (r.TotalDiscount != "$0.00") {
					$("#lblDiscountLabel_P_" + r.ID).css('visibility', 'visible');
					$("#lblDiscountPrice_P_" + r.ID).css('visibility', 'visible').text("-" + r.TotalDiscount);
					if (r.PromoNumber > 0 && r.DealNumber > 0 && r.AvailPromoDescription == null) {
						$("#lblPromoDeal_P_" + r.ID).attr('class', 'promodeal-applied');
						$("#lblPromoDeal_P_" + r.ID).html(r.PromoDescription + ' (<a href="/catalog/promo_deal.aspx?pn=' + r.PromoNumber + '&dn=' + r.DealNumber + '" class="promodeal-link" data-blain-promonum="' + r.PromoNumber + '" data-blain-dealnum="' + r.DealNumber + '">Details</a>)').show();
					}
					else if (r.AvailPromoDescription != null) {
						$("#lblPromoDeal_P_" + r.ID).attr('class', 'promodeal');
						$("#lblPromoDeal_P_" + r.ID).html("<p class='promotext'>Please Add Eligible Item(s) to Get...</p><p>" + r.AvailPromoDescription + '</p><a href="/catalog/promo_deal.aspx?bn=' + r.BlainNumber + '&pn=' + r.AvailPromoNumber + '&dn=' + r.AvailDealNumber + '" class="promodeal-link" data-blain-promonum="' + r.PromoNumber + '" data-blain-dealnum="' + r.DealNumber + '">View/Add Items</a>').show();
					}
					else if (r.PromoNumber > 0 && r.DealNumber > 0) {
						$("#lblPromoDeal_P_" + r.ID).attr('class', 'promodeal');
						$("#lblPromoDeal_P_" + r.ID).html(r.PromoDescription + ' (<a href="/catalog/promo_deal.aspx?pn=' + r.PromoNumber + '&dn=' + r.DealNumber + '" class="promodeal-link" data-blain-promonum="' + r.PromoNumber + '" data-blain-dealnum="' + r.DealNumber + '">Details</a>)').show();
					}
					else $("#lblPromoDeal_P_" + r.ID).html('').hide();
				} else {
					$("#lblDiscountLabel_P_" + r.ID).css('visibility', 'hidden');
					$("#lblDiscountPrice_P_" + r.ID).css('visibility', 'hidden').html("&nbsp;");

					$("#lblPromoDeal_P_" + r.ID).attr('class', 'promodeal');
					if (r.AvailPromoDescription != null) {
						$("#lblPromoDeal_P_" + r.ID).html("<p class='promotext'>Please Add Eligible Item(s) to Get...</p><p>" + r.AvailPromoDescription + '</p><a href="/catalog/promo_deal.aspx?bn=' + r.BlainNumber + '&pn=' + r.AvailPromoNumber + '&dn=' + r.AvailDealNumber + '" class="promodeal-link" data-blain-promonum="' + r.PromoNumber + '" data-blain-dealnum="' + r.DealNumber + '">View/Add Items</a>').show();
					}
					else $("#lblPromoDeal_P_" + r.ID).html('').hide();
				}
				// If the product qualifies for an order discount (or doesn't), display the result
				htmlstr = '';
				if (r.DiscountID >= 0) {
					if (r.DiscountID > 0) htmlstr = '<span class="tiny-yes">Qualifies for promotion '
						+ '(<a href="promotion.aspx?did=' + r.DiscountID + '" class="promolink" data-blain-did="' + r.DiscountID + '">Details</a>)</span>';
					else htmlstr = '<span class="tiny-no">Does not qualify for promotion</span>';
				}
				$("#lblQualifier_P_" + r.ID).html(htmlstr);
				
				// Update store stock status
				if (r.EcomStockStatusHTML != "") {
					$("#lbl1_P_" + r.ID + " span").replaceWith(r.EcomStockStatusHTML);
					if (r.EcomOnHand > 0) {
						$("#radio1_P_" + r.ID).removeAttr('disabled').data('blain-onhand', r.EcomOnHand);
						$("#divOnline_P_" + r.ID).addClass('noavail');
					} else {
						$("#radio1_P_" + r.ID).attr('disabled', 'disabled').data('blain-onhand', r.EcomOnHand);
						$("#divOnline_P_" + r.ID).removeClass('noavail');
					}
				}
				if (r.StoreStockStatusHTML != "") {
					$("#lbl2_P_" + r.ID).html(r.StoreStockStatusHTML);
					if (r.StoreOnHand > 0) {
						$("#radio2_P_" + r.ID).removeAttr('disabled').data('blain-onhand', r.StoreOnHand).attr('value', loc.s);
						if (r.StoreNum > 0 && r.StoreNum < 80) $("#radio2_P_" + r.ID).attr('checked', 'checked');
						$("#divStore_P_" + r.ID).addClass('noavail');
					} else if (r.StoreOnHand >= 0) {
						$("#radio2_P_" + r.ID).attr({disabled:'disabled',value:r.StoreNum}).data('blain-onhand', r.StoreOnHand);
						$("#divStore_P_" + r.ID).removeClass('noavail');
					}
				}
				
				// Handle availability status
				onhand = (r.StoreNum == 80) ? r.EcomOnHand :  r.StoreOnHand;
				Blain.Cart.itemAvailStatus('P', r.ID, r.StoreNum, onhand);
			}
		}
		// Update the line total for gift cards
		if (data.GiftCards) {
			for (x = 0, len = data.GiftCards.length; x < len; x++) {
				r = data.GiftCards[x];
				$("#lblLineTotal_GC_" + r.ID).text(r.LineTotal);
				// If the product doesn't qualify for an order discount, display the result
				htmlstr = '';
				if (r.NoDiscount == "1") htmlstr = '<br /><span class="tiny-no">Does not qualify for promotion</span>';
				$("#lblQualifier_GC_" + r.ID).html(htmlstr);
			}
		}
		var addrows = $([]), delrows = $([]), itemmatch = false;
		// Remove discounts and teasers that no longer apply
		Blain.Cart.obj.find("div.cart-discount").each(function() {
			itemmatch = false;
			if (data.Discounts) {
				for (x = 0, len = data.Discounts.length; x < len; x++) {
					if (data.Discounts[x].ID == this.getAttribute("data-blain-rowid")) {
						itemmatch = true;
						break;
					}
				}
			}
			if (!itemmatch) delrows = delrows.add($(this));
		});
		Blain.Cart.obj.find("div.cart-discountteaser").each(function() {
			itemmatch = false;
			if (data.DiscountTeasers) {
				for (x = 0, len = data.DiscountTeasers.length; x < len; x++) {
					if (data.DiscountTeasers[x].ID == this.getAttribute("data-blain-rowid")) {
						itemmatch = true;
						break;
					}
				}
			}
			if (!itemmatch) delrows = delrows.add($(this));
		});
		// Add/update discounts
		if (data.Discounts) {
			for (x = 0, len = data.Discounts.length; x < len; x++) {
				r = data.Discounts[x];
				if ($id("dcart_" + r.ID)) $("#lblDiscount_" + r.ID).text(r.Description);
				else {
					var prefix = "";
					if (r.OfferType == "DOFFI" || r.OfferType == "POFFI") prefix = "Item discount:";
					else if (r.OfferType == "DOFFO" || r.OfferType == "POFFO") prefix = "This order qualifies for";
					else prefix = "Promotion:";
					addrows = addrows.add($('<div id="dcart_' + r.ID + '" data-blain-rowid="' + r.ID + '" class="cart-discount" style="display: none">'
						+ '<div class="ditem">' + prefix + ' <b id="lblDiscount_' + r.ID + '">' + r.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;')
						+ '</b> (<a href="promotion.aspx?did=' + r.DiscountID + '" target="_blank" data-blain-did="' + r.DiscountID + '" class="promolink">Details</a>)</div></div>'));
				}
			}
		}
		// Add/update discount teasers
		if (data.DiscountTeasers) {
			for (x = 0, len = data.DiscountTeasers.length; x < len; x++) {
				r = data.DiscountTeasers[x];
				if ($id("dtcart_" + r.ID)) {
					$("#lblDiscountTeaser_" + r.ID).text(r.Description);
					$("#lblShortage_" + r.ID).html((r.AmountShort == '$0.00') ? '' : '<b>' + r.AmountShort + '</b> in ');
				} else addrows = addrows.add($('<div id="dtcart_' + r.ID + '" data-blain-rowid="' + r.ID + '" class="cart-discountteaser" style="display: none">'
					+ '<div class="dtitem">Add <span id="lblShortage_' + r.ID + '">' + ((r.AmountShort == '$0.00') ? '' : '<b>' + r.AmountShort + '</b> in </span>')
					+ 'qualifying products to your cart to get <b id="lblDiscountTeaser_' + r.ID + '">'
					+ r.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;')
					+ '</b> (<a href="promotion.aspx?did=' + r.ID + '" target="_blank" data-blain-did="' + r.ID + '" class="promolink">Details</a>)</div></div>'));
			}
		}
		// Remove/add discount rows and teasers
		var len = delrows.length;
		if (len > 0) {
			delrows.hide('blind', 'def', function() {
				delrows.remove();
				len--;
				if (len == 0) addrows.appendTo(Blain.Cart.obj).show('blind');
			});
		} else addrows.appendTo(Blain.Cart.obj).show('blind');
		
		// Update the subtotal for the order
		Blain.Cart.label.text('(' + data.TotalQty + ')');
		$("#lblTotalQty").text((data.TotalQty > 1) ? data.TotalQty + ' items' : '1 item');
		Blain.Cart.numPickupItems = data.NumPickupItems;
		Blain.Cart.numShipItems = data.NumShipItems;
		Blain.Cart.numItems = data.TotalQty;
		
		$("#lblSubtotal, #lblOrderSubtotal").text(data.Subtotal);
		Blain.Cart.obj.find("span.spinner").hide();
		
		// Handle cart error state
		if (Blain.Cart.errors.length > 0) {
			Blain.Cart.shipTaxLink.css('visibility', 'hidden');
			if (!Blain.Cart.hasErrors) Blain.Cart.errorHeader.show('blind');
			Blain.Cart.hasErrors = true;
			Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
		} else {
			Blain.Cart.shipTaxLink.css('visibility', '');
			if (Blain.Cart.hasErrors) Blain.Cart.errorHeader.hide('blind');
			Blain.Cart.hasErrors = false;
			Blain.Cart.checkoutBtns.removeClass('dis').unbind('click', false);
		}
		
		// Re-attach cart item events
		Blain.Cart.attachEvents();
	},
	
	// Confirm mixed cart
	confirmMixedOrder: function(mode, onconfirm) {
		$.trace('Confirming mixed order');
		var header = '',
			text = '';
		if (mode == 'ship') {
			header = "Are you sure you want this item shipped?";
			text = "You currently have other items in your shopping cart that are set for <b>Free In-Store Pickup</b>. We want to ensure all of your items are processed exactly the way you want them. This is just a reminder in case you did not intend to ship this item to your home.";
		} else {
			header = "Are you sure you want to pick this up at the store?";
			text = "You currently have other items in your shopping cart that are set <b>to ship</b>. We want to ensure all of your items are processed exactly the way you want them. This is just a reminder in case you did not intend to pick this item up at the store."
		}
		// Create and open dialog
		var dlg = $('<div id="mixedorder" title="Mixed-Delivery Order"><h3 align="center" class="red">' + header + '</h3>'
			+ '<p>' + text + '</p>'
			+ '<h5 align="center">Do you want to continue?</h5></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 500,
			height: 205,
			dialogClass: "notitle ctrbuttons",
			create: function() {
				dlg.find("a.btnclose").click(function(e) { e.preventDefault(); dlg.dialog("close"); });
			},
			buttons: {
				"Yes": function() {
					dlg.dialog("close");
					onconfirm();
				},
				"No": function() {
					dlg.dialog("close");
				}
			},
			close: function() { dlg.dialog("destroy").remove(); }
		});
	},
	
	// Displays a promotional discount
	displayPromotion: function(id) {
		// Displays a promotion in a dialog popup
		var divPromo = $('<div id="promodetails" title="Promotion Details"><span class="spinner" /> One moment please...</div>'),
			showError = function() {
				divPromo.empty().html('<h3>Sorry, but we could not get details on this promotion</h3><p>Either the promotion is no longer valid, or some other error occured. We apologize for the inconvenience</p>');
			};
		divPromo.dialog({
			modal: true,
			closeOnEscape: true,
			resizable: false,
			width: 600,
			height: 360,
			dialogClass: 'ctrbuttons',
			buttons: { "Close Window": function() { divPromo.dialog("close"); } },
			close: function() { divPromo.dialog("destroy").remove(); }
		});
		$.ajax({
			async: true,
			type: "GET",
			url: "/ajax/webstore.aspx",
			dataType: "json",
			data: { a: "gdd", did: id},
			success: function (data, status, xhr) {
				if (data.StrVal == "0") showError();
				else {
					var htmlstr = '<h3>' + data.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</h3>';
					if (data.Expires != "") htmlstr += '<p>' + data.Expires.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</p>'
					htmlstr += '<div class="fineprint">' + data.FinePrint.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g, '<br />') + '</div>';
					divPromo.empty().html(htmlstr);
				}
			},
			error: showError
		});
	},
	
	// Displays a BOGO-style promo deal discount
	displayPromoDeal: function(promo, deal) {
		// Displays a promotion in a dialog popup
		var divPromoDeal = $('<div id="promodetails" title="Special Offer Details"><span class="spinner" /> One moment please...</div>'),
			showError = function() {
				divPromoDeal.empty().html('<h3>Sorry, but we could not get details on this special offer</h3><p>Either the promotion is no longer valid, or some other error occured. We apologize for the inconvenience</p>');
			};
		divPromoDeal.dialog({
			modal: true,
			closeOnEscape: true,
			resizable: false,
			width: 600,
			height: 200,
			dialogClass: 'ctrbuttons',
			buttons: {
				"View Qualifying Products": function() { location.href = '/catalog/promo_deal.aspx?pn=' + encodeURIComponent(promo) + '&dn=' + encodeURIComponent(deal) }, 
				"Close Window": function() { divPromoDeal.dialog("close"); }
			},
			close: function() { divPromoDeal.dialog("destroy").remove(); }
		});
		$.ajax({
			async: true,
			type: "GET",
			url: "/ajax/webstore.aspx",
			dataType: "json",
			data: { a: "gpd", pn: promo, dn: deal },
			success: function (data, status, xhr) {
				if (data.StrVal == "0") showError();
				else {
					var htmlstr = '<h3>' + data.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</h3>'
						+ '<p>Valid ' + data.ValidDates.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</p></div>';
					divPromoDeal.empty().html(htmlstr);
				}
			},
			error: showError
		});
	},
	
	// Opens the ship/tax estimation popup
	openShipTaxCalc: function() {
		// Create and open dialog
		var dlg = $('<div id="estshiptax" title="Estimate Sales Tax &amp; Shipping">'
			+ '<iframe id="ifShipTax" name="ifShipTax" src="' + location.protocol + '//' + Blain.cDom + '/cart/shiptax_iframe.aspx" runat="server" class="ifcontent ifshiptax" scrolling="no" frameborder="0"></iframe>'
			+ '<div id="divEstShipTaxCheckout"><a href="/checkout/" class="iconbutton-red checkoutbtn gocheckout">Secure Checkout</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="closelink">Not Yet - Close Window</a></div><div id="divCustomQuoteBtns" style="display:none"><a href="/cart/custom-request.aspx" class="button-red btnlg">Yes, Please!</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="closelink">No Thanks - Close Window</a></form></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 650,
			height: 520,
			close: function() { dlg.dialog("destroy").remove() }
		}).find("a.closelink").click(function() { dlg.dialog("close") });
	
		// Track virtual pageview in Google Analytics
		$.gaPageview('/cart/shiptax.aspx');
	},
	
	// Opens the ship/tax estimation popup
	openNoEconInfo: function() {
		// Create and open dialog
		var dlg = $('<div id="noeconship" title="Economy Shipping">'
			+ '<h3>Why isn\'t Economy Shipping available?</h3>'
			+ '<iframe id="ifShipTax" name="ifShipTax" src="' + location.protocol + '//' + Blain.cDom + '/cart/noecon_iframe.aspx" runat="server" class="ifcontent ifnoecon" scrolling="no" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 550,
			height: 300,
			dialogClass: 'ctrbuttons',
			buttons: { "Close Window": function() { dlg.dialog("close"); } },
			close: function() { dlg.dialog("destroy").remove() }
		});
	
		// Track virtual pageview in Google Analytics
		$.gaPageview('/cart/noecon.aspx');
	},

	// Attaches cart items events pertaining to promos and store selection
	attachEvents: function() {
		Blain.Cart.obj.find("a.promolink").unbind().click(function(e) {
			e.preventDefault();
			var elem = $(this);
			if (elem.data("blain-did")) Blain.Cart.displayPromotion(elem.data("blain-did"));
			else if (elem.data("blain-promonum") && elem.data("blain-dealnum")) Blain.Cart.displayPromoDeal(elem.data("blain-promonum"), elem.data("blain-dealnum"));
		});
		Blain.Cart.obj.find("a.storeselect").unbind().click(function(e) {
			e.preventDefault();
			Blain.Cart.checkoutBtns.addClass('dis').bind('click', false);
			Blain.Stores.openNewSelector();
		});	
		Blain.Cart.obj.find("a.storeinfo").unbind().click(function(e) {
			e.preventDefault();
			location.href = this.getAttribute('href');
		});
	}
}


/**************** CHECKOUT METHODS ********************/

Blain.Checkout = {
	init: function() {
		
		// Receipt page event
		if ($id("frmReceipt")) {
			$("#cbCreateAccount").click(function(e) {
				if (this.checked) {
					txtGuestPassword.removeAttr('disabled');
					txtGuestVerifyPassword.removeAttr('disabled').select();
				} else {
					txtGuestPassword.attr('disabled', 'disabled');
					txtGuestVerifyPassword.attr('disabled', 'disabled');
				}
			});
		}
		
		// Gift card and CVV popup events
		$("#hlGiftCard").click(function(e) {
			e.preventDefault();
			Blain.Checkout.openGiftCardHelp();
		});
		$("#hlCVV").click(function(e) {
			e.preventDefault();
			Blain.Checkout.openCVVHelp();
		});
		
		// Return at this point if there's no checkout form detected
		if (!$id("frmCheckout") && !$id("frmLogin") && !$id("frmGuestInfo") && !$id("frmCustomerInfo")
			&& !$id("frmShipMethod") && !$id("frmEditAddress") && !$id("frmNewAddress") && !$id("frmCustomerPayment") && !$id("frmGuestPayment")
			&& !$id("payment_confirmation") && !$id("frmPLCC") && !$id("frmVerifyCreditCard") && !$id("frmEditCreditCard") && !$id("frmConfirm") ) return; // (old/new)
		
		// Declare common variables
		var trUpdatingTotals = $("#trUpdatingTotals"),
			trTotals = $("#trSalesTax, #trShipping, #trOrderTotal"),
			lblSubtotal = ($id("ucCheckoutCart_lblSubtotal")) ? $("#ucCheckoutCart_lblSubtotal") : $("#lblSubtotal"), // (old/new)
			trDiscounts = ($id("ucCheckoutCart_trDiscounts")) ? $("#ucCheckoutCart_trDiscounts") : $("#trDiscounts"), // (old/new)
			lblDiscounts = ($id("ucCheckoutCart_lblDiscounts")) ? $("#ucCheckoutCart_lblDiscounts") : $("#lblDiscounts"), // (old/new)
			lblShipMethod = ($id("ucCheckoutCart_lblShipMethod")) ? $("#ucCheckoutCart_lblShipMethod") : $("#lblShipMethod"), // (old/new)
			lblSalesTax = ($id("ucCheckoutCart_lblSalesTax")) ? $("#ucCheckoutCart_lblSalesTax") : $("#lblSalesTax"), // (old/new)
			lblShipping = ($id("ucCheckoutCart_lblShipping")) ? $("#ucCheckoutCart_lblShipping") : $("#lblShipping"), // (old/new)
			lblGrandTotal = ($id("ucCheckoutCart_lblGrandTotal")) ? $("#ucCheckoutCart_lblGrandTotal") : $("#lblGrandTotal"), // (old/new)
			txtGuestPassword = $("#txtGuestPassword"),
			txtGuestVerifyPassword = $("#txtGuestVerifyPassword"),
			cbBlainCardPromo = $id("cbBlainCardPromo"),
			hdnShipFirstName = $("#hdnShipFirstName"),
			hdnShipLastName = $("#hdnShipLastName"),
			hdnShipCompany = $("#hdnShipCompany"),
			hdnShipAddress1 = $("#hdnShipAddress1"),
			hdnShipAddress2 = $("#hdnShipAddress2"),
			hdnShipCity = $("#hdnShipCity"),
			hdnShipState = $("#hdnShipState"),
			hdnShipZip = $("#hdnShipZip"),
			divCheckoutCart = $("#divCheckoutCart"),
			promoLinkHandler = function(e) {
				e.preventDefault();
				var elem = $(this);
				if (elem.data("blain-did")) Blain.Cart.displayPromotion(elem.data("blain-did"));
				else if (elem.data("blain-promonum") && elem.data("blain-dealnum")) Blain.Cart.displayPromoDeal(elem.data("blain-promonum"), elem.data("blain-dealnum"));
			};
		
		// Login events (old/new)
		if ($id("pnLogin") || $id("frmLogin")) {
			var lblPasswordNo = $("#lblPasswordNo"),
				divPasswordYes = $("#divPasswordYes"),
				txtPassword = $("#txtPassword");
		
			$("#rblPassword_0").click(function() {
				if (this.checked) {
					divPasswordYes.show();
					lblPasswordNo.hide();
					txtPassword.select();
				}
			});
			$("#rblPassword_1").click(function(e) {
				if (this.checked) {
					divPasswordYes.hide();
					lblPasswordNo.show();
				}
			});
		}
		
		// Guest shipping events (old)
		if ($id("pnGuestShipping")) {
			var pnLoginDialog = $("#pnLoginDialog"),
				autoDisplay = pnLoginDialog.hasClass('cologin-auto'),
				btnGoLogin = $("#btnGoLogin");
				txtGuestShippingEmail = $("#txtGuestShippingEmail"),
				txtLoginDialogEmail = $("#txtLoginDialogEmail");
			pnLoginDialog.dialog({
				autoOpen: autoDisplay,
				modal: true,
				resizable: false,
				closeOnEscape: true,
				dialogClass: 'cologin',
				width: 500,
				height: 300,
				open: function(type,data) {
					pnLoginDialog.parent().appendTo("#frmCheckout");
					if (txtLoginDialogEmail.val() == "" && txtGuestShippingEmail.val() != "") {
						txtLoginDialogEmail.val(txtGuestShippingEmail.val());
						txtLoginDialogPassword.focus();
					} else if (txtLoginDialogEmail.val() != "") txtLoginDialogPassword.focus();
					else txtLoginDialogEmail.focus();
				}
			});
			btnGoLogin.click(function(e) {
				e.preventDefault();
				pnLoginDialog.dialog("open");
			});
			$("#hlGuestContinue").click(function(e) {
				e.preventDefault();
				pnLoginDialog.dialog("close");
			});
			
			$("#hlLoginDialogRecover").click(function() {
				var email = (txtLoginDialogEmail.length == 0) ? "" : txtLoginDialogEmail.val(),
					url = $(this).attr('href');
				if (email.isEmailAddress()) url += "?email=" + encodeURIComponent(email);
				location.href = url;
				return false;
			});
		}
		
		// Customer shipping methods (old)
		if ($id("pnCustomerShipping")) {
			$("#btnDeleteDefaultAddress, #btnDeleteOtherAddress").click(function(e) {
				return confirm('Are you sure you want to remove this from your address book?');
			});
		}
		
		// Customer shipping methods (new)
		if ($id("frmCustomerInfo")) {
			$("a.deladdr").click(function(e) {
				return confirm('Are you sure you want to remove this from your address book?');
			});
		}
		
		// Validator for new credit cards (new)
		if ($id("frmNewCreditCard")) {
			$("#card_expiry_date").splitExpDate();
			var frmNewCreditCard = $("#frmNewCreditCard"),
				ddlCardType = $("#card_type"),
				txtCardNum = $("#card_number"),
				ddlExpMonth = $("#card_expiry_month"),
				ddlExpYear = $("#card_expiry_year"),
				hdnExpDate = $("#card_expiry_date"),
				txtCVV = $("#card_cvn"),
				divSaveCard = $("#divSaveCard"),
				cbSaveCard = $("#cbSaveCard"),
				hdnSaveCard = $("#hdnSaveCard"),
				divPartialContainer = $("div.partial_payment_container"),
				cbPartial = $("#cbPartial"),
				divPartialPayment = $("#divPartialPayment"),
				txtPartialAmount = $("#txtPartialAmount"),
				hdnPaymentAmount = $("#hdnPaymentAmount"),
				cbUseShipAddress = $("#cbUseShipAddress"),
				txtBillToFirstName = $("#bill_to_forename"),
				txtBillToLastName = $("#bill_to_surname"),
				txtBillToCompany = $("#bill_to_company_name"),
				txtBillToAddress1 = $("#bill_to_address_line1"),
				txtBillToAddress2 = $("#bill_to_address_line2"),
				txtBillToCity = $("#bill_to_address_city"),
				ddlBillToState = $("#bill_to_address_state"),
				txtBillToZip = $("#bill_to_address_postal_code"),
				vsCreditCard = $("#vsCreditCard"),
				fvCardType = $("#fvCardType"),
				fvCardNum = $("#fvCardNum"),
				fvCardExp = $("#fvCardExp"),
				fvCVV = $("#fvCVV"),
				fvPartialAmount = $("#fvPartialAmount"),
				fvBillToFirstName = $("#fvBillToFirstName"),
				fvBillToLastName = $("#fvBillToLastName"),
				fvBillToAddress1 = $("#fvBillToAddress1"),
				fvBillToCity = $("#fvBillToCity"),
				fvBillToState = $("#fvBillToState"),
				fvBillToZip = $("#fvBillToZip"),
				ulCreditCardErrors = $("#ulCreditCardErrors"),
				hdnAmount = $("#amount"),
				hdnSignature = $("#signature"),
				formSubmitted = false,
				
				partialAmountAdded = function () {
					if (txtPartialAmount.val() > 0) hdnPaymentAmount.val(txtPartialAmount.val());
					else hdnPaymentAmount.val(hdnPaymentAmount.attr("data-blain-origamt"));
				},
				toggleSaveCard = function () {
					if (cbSaveCard.is(':checked')) hdnSaveCard.val("on");
					else hdnSaveCard.val("off");
				},
				toggleAmt = function() {
					if (ddlCardType.val() == "001") {
						hdnAmount.val('0.00');
						hdnSignature.val(hdnSignature.attr('data-blain-sig2'));
					} else {
						hdnAmount.val('1.00');
						hdnSignature.val(hdnSignature.attr('data-blain-sig1'));
					}
				},
				changedExpirationDate = function () {
					hdnExpDate.val(ddlExpMonth.val() + "-" + ddlExpYear.val());
				},
				togglePartialPayment = function() {
					if (cbPartial.is(':checked')) {
						divPartialPayment.show();
						txtPartialAmount.focus();
					} else {
						divPartialPayment.hide();
						hdnPaymentAmount.val(hdnPaymentAmount.attr("data-blain-origamt"));
					}
				},
				toggleUseShipAddress = function() {
					var enabled = true;
					if (cbUseShipAddress.is(':checked')) {
						enabled = false;
						txtBillToFirstName.val(hdnShipFirstName.val()).attr('disabled', 'disabled');
						txtBillToLastName.val(hdnShipLastName.val()).attr('disabled', 'disabled');
						txtBillToCompany.val(hdnShipCompany.val()).attr('disabled', 'disabled');
						txtBillToAddress1.val(hdnShipAddress1.val()).attr('disabled', 'disabled');
						txtBillToAddress2.val(hdnShipAddress2.val()).attr('disabled', 'disabled');
						txtBillToCity.val(hdnShipCity.val()).attr('disabled', 'disabled');
						ddlBillToState.val(hdnShipState.val()).attr('disabled', 'disabled');
						txtBillToZip.val(hdnShipZip.val()).attr('disabled', 'disabled');
					} else {
						txtBillToFirstName.removeAttr('disabled');
						txtBillToLastName.removeAttr('disabled');
						txtBillToCompany.removeAttr('disabled');
						txtBillToAddress1.removeAttr('disabled');
						txtBillToAddress2.removeAttr('disabled');
						txtBillToCity.removeAttr('disabled');
						ddlBillToState.removeAttr('disabled');
						txtBillToZip.removeAttr('disabled');
					}
				},
				
				submitForm = function(e) {
					var errorList = getFormErrors();
					
					// Render the error list
					if (formSubmitted) {
						// Button must have been double-clicked
						return false;
					} else if (errorList.length > 0) {
						formIsValid = false;
						var htmlstr = '';
						for (var x = 0, len = errorList.length; x < len; x++) htmlstr += '<li>' + errorList[x].htmlEncode() + '</li>';
						ulCreditCardErrors.html(htmlstr);
						vsCreditCard.show();
						return false;
					} else {
						//$("input.ccbtn")
						vsCreditCard.hide();
						txtBillToFirstName.removeAttr('disabled');
						txtBillToLastName.removeAttr('disabled');
						txtBillToCompany.removeAttr('disabled');
						txtBillToAddress1.removeAttr('disabled');
						txtBillToAddress2.removeAttr('disabled');
						txtBillToCity.removeAttr('disabled');
						ddlBillToState.removeAttr('disabled');
						txtBillToZip.removeAttr('disabled');
						var refnum = $('#reference_number').val(),
							transuuid = $('#transaction_uuid').val(),
							posturl = $('#override_custom_receipt_page').val(),
							orderid = $('#merchant_defined_data3').val();
						formSubmitted = true;
						$.ajax({
							type: 'POST',
							url: "/ajax/webstore.aspx",
							data: { a: "sopp", rn: refnum, tuuid: transuuid, pbu: posturl, o: orderid },
							async: false,
							timeout: 2000
						});
						return true;
					}
				},
				
				validateForm = function(e) {
					var field=e.target||e.srcElement;
					getFormErrors(field);
				},
				
				getFormErrors = function() {
					var field = (arguments.length > 0) ? arguments[0].getAttribute("name") : "",
						errorList = [];
					
					// Validate card type
					if (field == ddlCardType.attr('name') || field == "") {
						if (ddlCardType.val().trim() == "") {
							errorList.push("Card Type is required.");
							fvCardType.css('visibility', 'visible');
						} else fvCardType.css('visibility', 'hidden');
						if (txtCardNum.val().trim() != "") {
							if (!FormValidation.isValidCardNum(ddlCardType.val().trim(), txtCardNum.val())) fvCardNum.css('visibility', 'visible');
							else fvCardNum.css('visibility', 'hidden');
						}
					}
					
					// Validate card number
					if (field == txtCardNum.attr('name') || field == "") {
						if (txtCardNum.val().trim() == "") {
							errorList.push("Card Number is required.");
							fvCardNum.css('visibility', 'visible');
						} else if (!FormValidation.isValidCardNum(ddlCardType.val().trim(), txtCardNum.val())) {
							errorList.push("Card Number is not valid for the selected card type. Double-check the card type you selected, and the card number.");
							fvCardNum.css('visibility', 'visible');
						} else fvCardNum.css('visibility', 'hidden');
						if (ddlCardType.val().trim() == "") fvCardType.css('visibility', 'visible');
						else fvCardType.css('visibility', 'hidden');
					}
					
					
					// Validate expiration date
					if (field == ddlExpMonth.attr('name') || field == ddlExpYear.attr('name') || field == "") {
						if (field == ddlExpMonth.attr('name') && ddlExpYear.val() == "") return;
						if (!FormValidation.isValidExpDate(ddlExpMonth.val(),ddlExpYear.val()) || ddlExpMonth.val() == "") {
							errorList.push("Expiration Date is required, and cannot be in the past.");
							fvCardExp.css('visibility', 'visible');
						} else fvCardExp.css('visibility', 'hidden');
					}
					
					// Validate CVV
					if (field == txtCVV.attr('name') || field == "") {
						if (txtCVV.val().trim() == "") {
							errorList.push("Security Code is required.");
							fvCVV.css('visibility', 'visible');
						} else if (!txtCVV.val().match(/^\d{3,4}$/)) {
							errorList.push("Security Code must be a 3 or 4 digit number.");
							fvCVV.css('visibility', 'visible');
						} else fvCVV.css('visibility', 'hidden');
					}
					
					// Validate partial payment
					if (field == txtPartialAmount.attr('name') || field == "") {
						if (cbPartial.is(':checked')) {
							if (!txtPartialAmount.val().trim().isCurrency()) {
								errorList.push("For partial payments, please enter a valid amount in dollars and cents.");
								fvPartialAmount.css('visibility', 'visible');
							} else if (parseFloat(txtPartialAmount.val().trim()) > parseFloat(hdnPaymentAmount.attr('data-blain-origamt'))) {
								errorList.push("For partial payments, the amount provided should not be greater than the total/remaining amount due.");
								fvPartialAmount.css('visibility', 'visible');
							} else fvPartialAmount.css('visibility', 'hidden');
						} else fvPartialAmount.css('visibility', 'hidden');
					}
					
					// Validate billing address
					if (!cbUseShipAddress.is(':checked')) {
						// Validate first name
						if (field == txtBillToFirstName.attr('name') || field == "") {
							if (txtBillToFirstName.val().trim() == "") {
								errorList.push("First Name is required.");
								fvBillToFirstName.css('visibility', 'visible');
							} else fvBillToFirstName.css('visibility', 'hidden');
						}
						
						// Validate last name
						if (field == txtBillToLastName.attr('name') || field == "") {
							if (txtBillToLastName.val().trim() == "") {
								errorList.push("Last Name is required.");
								fvBillToLastName.css('visibility', 'visible');
							} else fvBillToLastName.css('visibility', 'hidden');
						}
						
						// Validate address 1
						if (field == txtBillToAddress1.attr('name') || field == "") {
							if (txtBillToAddress1.val().trim() == "") {
								errorList.push("Address Line 1 is required.");
								fvBillToAddress1.css('visibility', 'visible');
							} else fvBillToAddress1.css('visibility', 'hidden');
						}
						
						// Validate city
						if (field == txtBillToCity.attr('name') || field == "") {
							if (txtBillToCity.val().trim() == "") {
								errorList.push("City is required.");
								fvBillToCity.css('visibility', 'visible');
							} else fvBillToCity.css('visibility', 'hidden');
						}
						
						// Validate state
						if (field == ddlBillToState.attr('name') || field == "") {
							if (ddlBillToState.val().trim() == "") {
								errorList.push("State is required.");
								fvBillToState.css('visibility', 'visible');
							} else fvBillToState.css('visibility', 'hidden');
						}
						
						// Validate zip
						if (field == txtBillToZip.attr('name') || field == "") {
							if (txtBillToZip.val().trim() == "") {
								errorList.push("Zip Code is required.");
								fvBillToZip.css('visibility', 'visible');
							} else if (!txtBillToZip.val().match(/^\d{5}(-\d{4})?$/)) {
								errorList.push("Zip Code must be a valid 5-digit or 9-digit (xxxxx-xxxx) zip.");
								fvBillToZip.css('visibility', 'visible');
							} else fvBillToZip.css('visibility', 'hidden');
						}
					} else {
						fvBillToFirstName.css('visibility', 'hidden');
						fvBillToLastName.css('visibility', 'hidden');
						fvBillToAddress1.css('visibility', 'hidden');
						fvBillToCity.css('visibility', 'hidden');
						fvBillToState.css('visibility', 'hidden');
						fvBillToAddress1.css('visibility', 'hidden');
						fvBillToCity.css('visibility', 'hidden');
						fvBillToState.css('visibility', 'hidden');
						fvBillToZip.css('visibility', 'hidden');
					}
					
					return errorList;
				};
			
			
			// Only show save card option to customers with JS enabled for silent post
			divSaveCard.show();
			divPartialContainer.show();
			
			// Set up event handlers
			ddlCardType.change(toggleAmt);
			ddlExpMonth.change(changedExpirationDate);
			ddlExpYear.change(changedExpirationDate);
			txtPartialAmount.change(partialAmountAdded);
			cbPartial.click(togglePartialPayment);
			cbSaveCard.click(toggleSaveCard);
			cbUseShipAddress.click(toggleUseShipAddress);
			frmNewCreditCard.bind('submit', submitForm);
			frmNewCreditCard.bind('change', validateForm);
			
			// Trigger methods by default
			changedExpirationDate();
			togglePartialPayment();
			toggleAmt();
			toggleSaveCard();
			toggleUseShipAddress();
		}
		
		// Validator for new credit cards (new)
		if ($id("frmEditCreditCard")) {
			$("#card_expiry_date").splitExpDate();
			var frmEditCreditCard = $("#frmEditCreditCard"),
				ddlCardType = $("#card_type"),
				txtCardNum = $("#card_number"),
				ddlExpMonth = $("#card_expiry_month"),
				ddlExpYear = $("#card_expiry_year"),
				hdnExpDate = $("#card_expiry_date"),
				txtCVV = $("#card_cvn"),
				divDefaultCard = $("#divDefaultCard"),
				cbDefaultCard = $("#cbDefaultCard"),
				hdnDefaultCard = $("#hdnDefaultCard"),
				txtBillToFirstName = $("#bill_to_forename"),
				txtBillToLastName = $("#bill_to_surname"),
				txtBillToCompany = $("#bill_to_company_name"),
				txtBillToAddress1 = $("#bill_to_address_line1"),
				txtBillToAddress2 = $("#bill_to_address_line2"),
				txtBillToCity = $("#bill_to_address_city"),
				ddlBillToState = $("#bill_to_address_state"),
				txtBillToZip = $("#bill_to_address_postal_code"),
				vsCreditCard = $("#vsCreditCard"),
				fvCardType = $("#fvCardType"),
				fvCardNum = $("#fvCardNum"),
				fvCardExp = $("#fvCardExp"),
				fvCVV = $("#fvCVV"),
				fvBillToFirstName = $("#fvBillToFirstName"),
				fvBillToLastName = $("#fvBillToLastName"),
				fvBillToAddress1 = $("#fvBillToAddress1"),
				fvBillToCity = $("#fvBillToCity"),
				fvBillToState = $("#fvBillToState"),
				fvBillToZip = $("#fvBillToZip"),
				ulCreditCardErrors = $("#ulCreditCardErrors"),
				formSubmitted = false,
				
				toggleDefaultCard = function () {
					if (cbDefaultCard.is(':checked')) hdnDefaultCard.val("on");
					else hdnDefaultCard.val("off");
				},
				changedExpirationDate = function () {
					hdnExpDate.val(ddlExpMonth.val() + "-" + ddlExpYear.val());
				},
				
				submitForm = function(e) {
					var errorList = getFormErrors();
					
					// Render the error list
					if (formSubmitted) return false;
					else if (errorList.length > 0) {
						formIsValid = false;
						var htmlstr = '';
						for (var x = 0, len = errorList.length; x < len; x++) htmlstr += '<li>' + errorList[x].htmlEncode() + '</li>';
						ulCreditCardErrors.html(htmlstr);
						vsCreditCard.show();
						return false;
					} else {
						vsCreditCard.hide();
						formSubmitted = true;
						return true;
					}
				},
				
				validateForm = function(e) {
					var field=e.target||e.srcElement;
					getFormErrors(field);
				},
				
				getFormErrors = function() {
					var field = (arguments.length > 0) ? arguments[0].getAttribute("name") : "",
						errorList = [];
					
					// Validate card type
					if (field == ddlCardType.attr('name') || field == "") {
						if (ddlCardType.val().trim() == "") {
							errorList.push("Card Type is required.");
							fvCardType.css('visibility', 'visible');
						} else fvCardType.css('visibility', 'hidden');
						if (txtCardNum.val().trim() != "") {
							if (!FormValidation.isValidCardNum(ddlCardType.val().trim(), txtCardNum.val())) fvCardNum.css('visibility', 'visible');
							else fvCardNum.css('visibility', 'hidden');
						}
					}
					
					// Validate card number
					if (field == txtCardNum.attr('name') || field == "") {
						if (txtCardNum.val().trim() != "" && !FormValidation.isValidCardNum(ddlCardType.val().trim(), txtCardNum.val()) && txtCardNum.val().trim().indexOf('*') == -1) {
							errorList.push("Card Number is not valid for the selected card type. Double-check the card type you selected, and the card number.");
							fvCardNum.css('visibility', 'visible');
						} else fvCardNum.css('visibility', 'hidden');
						if (ddlCardType.val().trim() == "") fvCardType.css('visibility', 'visible');
						else fvCardType.css('visibility', 'hidden');
					}
					
					// Validate expiration date
					if (field == ddlExpMonth.attr('name') || field == ddlExpYear.attr('name') || field == "") {
						if (field == ddlExpMonth.attr('name') && ddlExpYear.val() == "") return;
						if (!FormValidation.isValidExpDate(ddlExpMonth.val(),ddlExpYear.val()) || ddlExpMonth.val() == "") {
							errorList.push("Expiration Date is required, and cannot be in the past.");
							fvCardExp.css('visibility', 'visible');
						} else fvCardExp.css('visibility', 'hidden');
					}
					
					// Validate CVV
					if (field == txtCVV.attr('name') || field == "") {
						if (txtCardNum.val().trim() != "" && txtCVV.val().trim() == "") {
							errorList.push("Security Code is required, if your card number has also changed.");
							fvCVV.css('visibility', 'visible');
						} else if (txtCVV.val().trim() != "" && !txtCVV.val().match(/^\d{3,4}$/)) {
							errorList.push("Security Code must be a 3 or 4 digit number.");
							fvCVV.css('visibility', 'visible');
						} else fvCVV.css('visibility', 'hidden');
					}
					
					// Validate first name
					if (field == txtBillToFirstName.attr('name') || field == "") {
						if (txtBillToFirstName.val().trim() == "") {
							errorList.push("First Name is required.");
							fvBillToFirstName.css('visibility', 'visible');
						} else fvBillToFirstName.css('visibility', 'hidden');
					}
					
					// Validate last name
					if (field == txtBillToLastName.attr('name') || field == "") {
						if (txtBillToLastName.val().trim() == "") {
							errorList.push("Last Name is required.");
							fvBillToLastName.css('visibility', 'visible');
						} else fvBillToLastName.css('visibility', 'hidden');
					}
					
					// Validate address 1
					if (field == txtBillToAddress1.attr('name') || field == "") {
						if (txtBillToAddress1.val().trim() == "") {
							errorList.push("Address Line 1 is required.");
							fvBillToAddress1.css('visibility', 'visible');
						} else fvBillToAddress1.css('visibility', 'hidden');
					}
					
					// Validate city
					if (field == txtBillToCity.attr('name') || field == "") {
						if (txtBillToCity.val().trim() == "") {
							errorList.push("City is required.");
							fvBillToCity.css('visibility', 'visible');
						} else fvBillToCity.css('visibility', 'hidden');
					}
					
					// Validate state
					if (field == ddlBillToState.attr('name') || field == "") {
						if (ddlBillToState.val().trim() == "") {
							errorList.push("State is required.");
							fvBillToState.css('visibility', 'visible');
						} else fvBillToState.css('visibility', 'hidden');
					}
					
					// Validate zip
					if (field == txtBillToZip.attr('name') || field == "") {
						if (txtBillToZip.val().trim() == "") {
							errorList.push("Zip Code is required.");
							fvBillToZip.css('visibility', 'visible');
						} else if (!txtBillToZip.val().match(/^\d{5}(-\d{4})?$/)) {
							errorList.push("Zip Code must be a valid 5-digit or 9-digit (xxxxx-xxxx) zip.");
							fvBillToZip.css('visibility', 'visible');
						} else fvBillToZip.css('visibility', 'hidden');
					}
					
					return errorList;
				};
			
			
			// Only show save card option to customers with JS enabled for silent post
			divDefaultCard.show();
			
			// Set up event handlers
			ddlExpMonth.change(changedExpirationDate);
			ddlExpYear.change(changedExpirationDate);
			frmEditCreditCard.bind('submit', submitForm);
			frmEditCreditCard.bind('change', validateForm);
			
			// Trigger methods by default
			changedExpirationDate();
		}
		
		// Validator for verifying credit cards (new)
		if ($id("frmVerifyCreditCard")) {
			$("#card_expiry_date").splitExpDate();
			var frmVerifyCreditCard = $("#frmVerifyCreditCard"),
				hdnCardType = $("#card_type"),
				txtCardNum = $("#card_number"),
				ddlExpMonth = $("#card_expiry_month"),
				ddlExpYear = $("#card_expiry_year"),
				hdnExpDate = $("#card_expiry_date"),
				txtCVV = $("#card_cvn"),
				vsCreditCard = $("#vsCreditCard"),
				fvCardNum = $("#fvCardNum"),
				fvCardExp = $("#fvCardExp"),
				fvCVV = $("#fvCVV"),
				ulCreditCardErrors = $("#ulCreditCardErrors"),
				formSubmitted = false,
				
				changedExpirationDate = function () {
					hdnExpDate.val(ddlExpMonth.val() + "-" + ddlExpYear.val());
				},
				
				submitForm = function(e) {
					var errorList = getFormErrors();
					
					// Render the error list
					if (formSubmitted) return false;
					else if (errorList.length > 0) {
						formIsValid = false;
						var htmlstr = '';
						for (var x = 0, len = errorList.length; x < len; x++) htmlstr += '<li>' + errorList[x].htmlEncode() + '</li>';
						ulCreditCardErrors.html(htmlstr);
						vsCreditCard.show();
						return false;
					} else {
						vsCreditCard.hide();
						formSubmitted = true;
						return true;
					}
				},
				
				validateForm = function(e) {
					var field=e.target||e.srcElement;
					getFormErrors(field);
				},
				
				getFormErrors = function() {
					var field = (arguments.length > 0) ? arguments[0].getAttribute("name") : "",
						errorList = [];
					
					// Validate card number
					if (field == txtCardNum.attr('name') || field == "") {
						if (txtCardNum.val().trim() == "") {
							errorList.push("Card Number is required.");
							fvCardNum.css('visibility', 'visible');
						} else if (!FormValidation.isValidCardNum(hdnCardType.val().trim(), txtCardNum.val())) {
							errorList.push("Card Number is not valid for the selected card type. Double-check the card type you selected, and the card number.");
							fvCardNum.css('visibility', 'visible');
						} else fvCardNum.css('visibility', 'hidden');
					}
					
					
					// Validate expiration date
					if (field == ddlExpMonth.attr('name') || field == ddlExpYear.attr('name') || field == "") {
						if (field == ddlExpMonth.attr('name') && ddlExpYear.val() == "") return;
						if (!FormValidation.isValidExpDate(ddlExpMonth.val(),ddlExpYear.val()) || ddlExpMonth.val() == "") {
							errorList.push("Expiration Date is required, and cannot be in the past.");
							fvCardExp.css('visibility', 'visible');
						} else fvCardExp.css('visibility', 'hidden');
					}
					
					// Validate CVV
					if (field == txtCVV.attr('name') || field == "") {
						if (txtCVV.val().trim() == "") {
							errorList.push("Security Code is required.");
							fvCVV.css('visibility', 'visible');
						} else if (!txtCVV.val().match(/^\d{3,4}$/)) {
							errorList.push("Security Code must be a 3 or 4 digit number.");
							fvCVV.css('visibility', 'visible');
						} else fvCVV.css('visibility', 'hidden');
					}
					
					return errorList;
				};
			
			// Set up event handlers
			ddlExpMonth.change(changedExpirationDate);
			ddlExpYear.change(changedExpirationDate);
			frmVerifyCreditCard.bind('submit', submitForm);
			frmVerifyCreditCard.bind('change', validateForm);
			
			// Trigger methods by default
			changedExpirationDate();
			txtCardNum.select();
		}
			
		// Customer payment events (new)
		if ($id("pnPaymentForms")) {
			var rbStoredCard = $("#rbStoredCard"),
				rbCreditCard = $("#rbCreditCard"),
				rbPayPal = $("#rbPayPal"),
				rbBlainCard = $("#rbBlainCard"),
				rbGiftCard = $("#rbGiftCard"),
				divStoredCard = $("#divStoredCard"),
				divCreditCard = $("#divCreditCard"),
				divPayPal = $("#divPayPal"),
				divBlainCard = $("#divBlainCard"),
				divGiftCard = $("#divGiftCard"),
				cbDefaultPartial = $("#cbDefaultPartial"),
				txtDefaultPartialAmount = $("#txtDefaultPartialAmount"),
				cbOtherPartial = $("#cbOtherPartial"),
				txtOtherPartialAmount = $("#txtOtherPartialAmount"),
				divDefaultPartial = $("#divDefaultPartial"),
				divOtherPartial = $("#divOtherPartial"),
				togglePaymentMethod = function() {
					if (divStoredCard.length > 0) {
						if (rbStoredCard.is(':checked')) divStoredCard.show();
						else divStoredCard.hide();
					}
					if (rbCreditCard.is(':checked')) divCreditCard.show();
					else divCreditCard.hide();
					if (rbPayPal.is(':checked')) divPayPal.show();
					else divPayPal.hide();
					if (rbBlainCard.is(':checked')) divBlainCard.show();
					else divBlainCard.hide();
					if (rbGiftCard.is(':checked')) divGiftCard.show();
					else divGiftCard.hide();
					/*
					divCreditCard.hide();
					divPayPal.hide();
					divBlainCard.hide();
					divGiftCard.hide();
					if (divStoredCard.length > 0) divStoredCard.hide();
					if (rbStoredCard.is(':checked')) divStoredCard.show();
					else if (rbCreditCard.is(':checked')) divCreditCard.show();
					else if (rbPayPal.is(':checked')) divPayPal.show();
					else if (rbBlainCard.is(':checked')) divBlainCard.show();
					else if (rbGiftCard.is(':checked')) divGiftCard.show();
					*/
				},
				toggleDefaultPartialPayment = function() {
					if (divStoredCard.length > 0) {
						if (cbDefaultPartial.is(':checked')) divDefaultPartial.show();
						else {
							divDefaultPartial.hide();
							txtDefaultPartialAmount.val('');
						}
					}
				},
				toggleOtherPartialPayment = function() {
					if (divStoredCard.length > 0) {
						if (cbOtherPartial.is(':checked')) divOtherPartial.show();
						else {
							divOtherPartial.hide();
							txtOtherPartialAmount.val('');
						}
					}
				};
				
			// Assign methods to controls
			rbStoredCard.click(togglePaymentMethod);
			rbCreditCard.click(togglePaymentMethod);
			rbPayPal.click(togglePaymentMethod);
			rbBlainCard.click(togglePaymentMethod);
			rbGiftCard.click(togglePaymentMethod);
			cbDefaultPartial.click(toggleDefaultPartialPayment);
			cbOtherPartial.click(toggleOtherPartialPayment);
			
			// Trigger methods by default
			togglePaymentMethod();
			toggleDefaultPartialPayment();
			toggleOtherPartialPayment();
			
			
			$("a.delcard").click(function(e) {
				return confirm('Are you sure you want to remove this stored credit card?');
			});
		}
			
		// Customer payment events (old)
		if ($id("pnCustomerPayment")) {
			var rbStoredCard = $("#rbCustomerStoredCard"),
				rbCreditCard = $("#rbCustomerCreditCard"),
				rbPayPal = $("#rbCustomerPayPal"),
				rbBlainCard = $("#rbCustomerBlainCard"),
				rbGiftCard = $("#rbCustomerGiftCard"),
				divStoredCard = $("#divCustomerStoredCard"),
				divCreditCard = $("#divCustomerCreditCard"),
				divPayPal = $("#divCustomerPayPal"),
				divBlainCard = $("#divCustomerBlainCard"),
				divGiftCard = $("#divCustomerGiftCard"),
				cbDefaultPartial = $("#cbCustomerDefaultPartial"),
				cbOtherPartial = $("#cbCustomerOtherPartial"),
				cbPartial = $("#cbCustomerPartial"),
				divDefaultPartial = $("#divCustomerDefaultPartial"),
				divOtherPartial = $("#divCustomerOtherPartial"),
				divPartial = $("#divCustomerPartial"),
				txtBillToFirstName = $("#txtCustomerBillToFirstName"),
				txtBillToLastName = $("#txtCustomerBillToLastName"),
				txtBillToCompany = $("#txtCustomerBillToCompany"),
				txtBillToAddress1 = $("#txtCustomerBillToAddress1"),
				txtBillToAddress2 = $("#txtCustomerBillToAddress2"),
				txtBillToCity = $("#txtCustomerBillToCity"),
				ddlBillToState = $("#ddlCustomerBillToState"),
				txtBillToZip = $("#txtCustomerBillToZip"),
				cbUseShipAddress = $("#cbCustomerUseShipAddress"),
				togglePaymentMethod = function() {
					divStoredCard.hide();
					divCreditCard.hide();
					divPayPal.hide();
					divBlainCard.hide();
					divGiftCard.hide();
					if (rbStoredCard.is(':checked')) divStoredCard.show();
					else if (rbCreditCard.is(':checked')) divCreditCard.show();
					else if (rbPayPal.is(':checked')) divPayPal.show();
					else if (rbBlainCard.is(':checked')) divBlainCard.show();
					else if (rbGiftCard.is(':checked')) divGiftCard.show();
				},
				toggleDefaultPartialPayment = function() {
					if (cbDefaultPartial.is(':checked')) divDefaultPartial.show();
					else divDefaultPartial.hide();
				},
				toggleOtherPartialPayment = function() {
					if (cbOtherPartial.is(':checked')) divOtherPartial.show();
					else divOtherPartial.hide();
				},
				togglePartialPayment = function() {
					if (cbPartial.is(':checked')) divPartial.show();
					else divPartial.hide();
				},
				toggleUseShipAddress = function() {
					var enabled = true;
					if (cbUseShipAddress.is(':checked')) {
						enabled = false;
						txtBillToFirstName.val(hdnShipFirstName.val()).attr('disabled', 'disabled');
						txtBillToLastName.val(hdnShipLastName.val()).attr('disabled', 'disabled');
						txtBillToCompany.val(hdnShipCompany.val()).attr('disabled', 'disabled');
						txtBillToAddress1.val(hdnShipAddress1.val()).attr('disabled', 'disabled');
						txtBillToAddress2.val(hdnShipAddress2.val()).attr('disabled', 'disabled');
						txtBillToCity.val(hdnShipCity.val()).attr('disabled', 'disabled');
						ddlBillToState.val(hdnShipState.val()).attr('disabled', 'disabled');
						txtBillToZip.val(hdnShipZip.val()).attr('disabled', 'disabled');
					} else {
						txtBillToFirstName.removeAttr('disabled');
						txtBillToLastName.removeAttr('disabled');
						txtBillToCompany.removeAttr('disabled');
						txtBillToAddress1.removeAttr('disabled');
						txtBillToAddress2.removeAttr('disabled');
						txtBillToCity.removeAttr('disabled');
						ddlBillToState.removeAttr('disabled');
						txtBillToZip.removeAttr('disabled');
					}
					$id("rfvCustomerBillToFirstName").enabled = enabled;
					$id("rfvCustomerBillToLastName").enabled = enabled;
					$id("rfvCustomerBillToAddress1").enabled = enabled;
					$id("rfvCustomerBillToCity").enabled = enabled;
					$id("rfvCustomerBillToState").enabled = enabled;
					$id("rfvCustomerBillToZip").enabled = enabled;
					$id("revCustomerBillToZip").enabled = enabled;
				};
			// Assign methods to controls
			rbStoredCard.click(togglePaymentMethod);
			rbCreditCard.click(togglePaymentMethod);
			rbPayPal.click(togglePaymentMethod);
			rbBlainCard.click(togglePaymentMethod);
			rbGiftCard.click(togglePaymentMethod);
			cbDefaultPartial.click(toggleDefaultPartialPayment);
			cbOtherPartial.click(toggleOtherPartialPayment);
			cbPartial.click(togglePartialPayment);
			cbUseShipAddress.click(toggleUseShipAddress);
			
			// Trigger methods by default
			togglePaymentMethod();
			toggleDefaultPartialPayment();
			toggleOtherPartialPayment();
			togglePartialPayment();
			toggleUseShipAddress();
		}
		
		// Guest payment events (old)
		if ($id("pnGuestPayment")) {
			// Declare variables
			var rbCreditCard = $("#rbGuestCreditCard"),
				rbPayPal = $("#rbGuestPayPal"),
				rbBlainCard = $("#rbGuestBlainCard"),
				rbGiftCard = $("#rbGuestGiftCard"),
				divCreditCard = $("#divGuestCreditCard"),
				divPayPal = $("#divGuestPayPal"),
				divBlainCard = $("#divGuestBlainCard"),
				divGiftCard = $("#divGuestGiftCard"),
				cbPartial = $("#cbGuestPartial"),
				divPartial = $("#divGuestPartial"),
				txtBillToFirstName = $("#txtGuestBillToFirstName"),
				txtBillToLastName = $("#txtGuestBillToLastName"),
				txtBillToCompany = $("#txtGuestBillToCompany"),
				txtBillToAddress1 = $("#txtGuestBillToAddress1"),
				txtBillToAddress2 = $("#txtGuestBillToAddress2"),
				txtBillToCity = $("#txtGuestBillToCity"),
				ddlBillToState = $("#ddlGuestBillToState"),
				txtBillToZip = $("#txtGuestBillToZip"),
				cbUseShipAddress = $("#cbGuestUseShipAddress"),
				togglePaymentMethod = function() {
					divCreditCard.hide();
					divPayPal.hide();
					divBlainCard.hide();
					divGiftCard.hide();
					if (rbCreditCard.is(':checked')) divCreditCard.show();
					else if (rbPayPal.is(':checked')) divPayPal.show();
					else if (rbBlainCard.is(':checked')) divBlainCard.show();
					else if (rbGiftCard.is(':checked')) divGiftCard.show();
				},
				togglePartialPayment = function() {
					if (cbPartial.is(':checked')) divPartial.show();
					else divPartial.hide();
				},
				toggleUseShipAddress = function() {
					var enabled = true;
					if (cbUseShipAddress.is(':checked')) {
						enabled = false;
						txtBillToFirstName.val(hdnShipFirstName.val()).attr('disabled', 'disabled');
						txtBillToLastName.val(hdnShipLastName.val()).attr('disabled', 'disabled');
						txtBillToCompany.val(hdnShipCompany.val()).attr('disabled', 'disabled');
						txtBillToAddress1.val(hdnShipAddress1.val()).attr('disabled', 'disabled');
						txtBillToAddress2.val(hdnShipAddress2.val()).attr('disabled', 'disabled');
						txtBillToCity.val(hdnShipCity.val()).attr('disabled', 'disabled');
						ddlBillToState.val(hdnShipState.val()).attr('disabled', 'disabled');
						txtBillToZip.val(hdnShipZip.val()).attr('disabled', 'disabled');
					} else {
						txtBillToFirstName.removeAttr('disabled');
						txtBillToLastName.removeAttr('disabled');
						txtBillToCompany.removeAttr('disabled');
						txtBillToAddress1.removeAttr('disabled');
						txtBillToAddress2.removeAttr('disabled');
						txtBillToCity.removeAttr('disabled');
						ddlBillToState.removeAttr('disabled');
						txtBillToZip.removeAttr('disabled');
					}
					$id("rfvGuestBillToFirstName").enabled = enabled;
					$id("rfvGuestBillToLastName").enabled = enabled;
					$id("rfvGuestBillToAddress1").enabled = enabled;
					$id("rfvGuestBillToCity").enabled = enabled;
					$id("rfvGuestBillToState").enabled = enabled;
					$id("rfvGuestBillToZip").enabled = enabled;
					$id("revGuestBillToZip").enabled = enabled;
				};
			// Assign methods to controls
			rbCreditCard.click(togglePaymentMethod);
			rbPayPal.click(togglePaymentMethod);
			rbBlainCard.click(togglePaymentMethod);
			rbGiftCard.click(togglePaymentMethod);
			cbPartial.click(togglePartialPayment);
			cbUseShipAddress.click(toggleUseShipAddress);
			
			// Trigger toggle methods by default
			togglePaymentMethod();
			togglePartialPayment();
			toggleUseShipAddress();
		}
		
		// Confirmation page events (old)
		if ($id("pnConfirm")) {
			$("#btnPlaceOrderNow").click(function(e) {
				if (cbBlainCardPromo) {
					if (!cbBlainCardPromo.checked) {
						e.preventDefault();
						$.msgDialog("Credit Card Agreement", "You must check the checkbox agreeing to the terms of the Blain's Farm & Fleet Credit Card Promotion.");
						return false;
					}
				}
				// Create and open progress dialog
				$('<div id="placeorder" title="Please Wait" class="text-lg"><span class="spinner"></span> Placing order...</div>').dialog({
					modal: true,
					resizable: false,
					closeOnEscape: false,
					width: 175,
					height: 36,
					dialogClass: 'notitle ctrbuttons noscroll nowrap'
				});
			});
			
			$("#btnPlaceOrderNow").hide();
			$("#divPleaseWait").show();
			setTimeout(function() {
				$("#btnPlaceOrderNow").show();
				$("#divPleaseWait").hide();
			}, 1000);
		}
		
		// Confirmation page events (new)
		if ($id("frmConfirm")) {
			$("#btnPlaceOrderNow").click(function(e) {
				// Create and open progress dialog
				$('<div id="placeorder" title="Please Wait" class="text-lg"><span class="spinner"></span> Placing order...</div>').dialog({
					modal: true,
					resizable: false,
					closeOnEscape: false,
					width: 175,
					height: 36,
					dialogClass: 'notitle ctrbuttons noscroll nowrap'
				});
			});
			
			$("#btnPlaceOrderNow").hide();
			$("#divPleaseWait").show();
			setTimeout(function() {
				$("#btnPlaceOrderNow").show();
				$("#divPleaseWait").hide();
			}, 1000);
		}
		
		// Auto-submit private label credit card forms (new)
		if ($id("frmPLCC")) {
			$("#divPLCCSubmit").show();
			$id("frmPLCC").submit();
		}
		
		// Promo link events
		$("#divCheckoutCart, #divConfirmCart").find("a.promolink").unbind().click(promoLinkHandler);
		
		// Handle changing of shipping selection
		$("#rbEconomyShipping, #rbStandardShipping, #rbPriorityShipping").click(function() {
			var shipmethod = $(this).val(),
				btnShipMethodContinue = $("#btnShipMethodContinue");
			$.ajax({
				async: true,
				type: "POST",
				url: "/ajax/webstore.aspx",
				dataType: "json",
				data: { a: "cts", o: $id("hdnOrderID").value, sm: shipmethod },
				beforeSend: function() {
					trUpdatingTotals.show();
					btnShipMethodContinue.addClass('dis').bind('click', false).attr('value', 'Please wait. Recalculating...');
				},
				complete: function() {
					trUpdatingTotals.hide();
					btnShipMethodContinue.removeClass('dis').unbind('click', false).attr('value', 'Continue to Next Step');
				},
				success: function(data) {
					// Update applicable discounts
					var html = '';
					divCheckoutCart.find("div.checkout-discount").remove();
					if (data.Discounts) {
						for (x = 0, len = data.Discounts.length; x < len; x++) {
							r = data.Discounts[x];
							html += '<div id="dcheckout_' + r.ID + '" data-blain-rowid="' + r.ID + '" class="checkout-discount">'
								+ '<div class="ditem"><b>' + r.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;')
								+ '</b> (<a href="promotion.aspx?did=' + r.DiscountID + '" target="_blank" data-blain-did="' + r.DiscountID + '" class="promolink">Details</a>)</div></div>';
						}
					}
					$(html).appendTo(divCheckoutCart).find("a.promolink").unbind().click(promoLinkHandler);
					
					// Update order summary
					if (parseFloat(data.GrandTotal.replace('$', '')) > 0) {
						trTotals.show();
						if (parseFloat(data.OrderDiscounts.replace('$', '')) > 0) {
							trDiscounts.show();
							lblDiscounts.text(data.OrderDiscounts);
						} else trDiscounts.hide();

						lblShipMethod.text(data.ShipMethodDescription);
						lblSalesTax.text(data.SalesTax);
						lblShipping.text(data.TotalShipping);
						lblGrandTotal.text(data.GrandTotal);
						$.gaEvent(data.CourierMethod, data.GrandTotal.replace('$', ''), data.TotalShipping.replace('$', ''));
					} else trTotals.hide();
				},
				error: function(xhr, status, error) {
					if (xhr.status > 0 && error != "") {
						$.gaEvent('Checkout', 'Shipping Method Change AJAX Error', error);
						$.msgDialog("Checkout Error", error);
					}
				}
			});
		});
		
		// Checkout promo code events
		if ($id("lblShipMethodPromoCode") || $id("lblCustomerStoredCardPromoCode") || $id("lblCustomerCreditCardPromoCode") || $id("lblCustomerBlainCardPromoCode") || $id("lblCustomerGiftCardPromoCode") ||
			$id("lblGuestCreditCardPromoCode") || $id("lblGuestBlainCardPromoCode") || $id("lblGuestGiftCardAddPromoCode") ||
			$id("lblStoredCardPromoCode") || $id("lblCreditCardPromoCode") || $id("lblPayPalPromoCode") || $id("lblBlainCardPromoCode") || $id("lblGiftCardPromoCode")) {
			
			// Declare jQuery objects
			var lblEconomyShippingPrice = $("#lblEconomyShippingPrice"),
				hEconomyShippingPromo = $("#hEconomyShippingPromo"),
				lblEconomyShippingTimespan = $("#lblEconomyShippingTimespan"),
				lblStandardShippingPrice = $("#lblStandardShippingPrice"),
				hStandardShippingPromo = $("#hStandardShippingPromo"),
				lblStandardShippingTimespan = $("#lblStandardShippingTimespan"),
				lblPriorityShippingPrice = $("#lblPriorityShippingPrice"),
				hPriorityShippingPromo = $("#hPriorityShippingPromo"),
				lblPriorityShippingTimespan = $("#lblPriorityShippingTimespan"),
				lblGroundFreightPrice = $("#lblGroundFreightPrice"),
				lblGroundFreightTimespan = $("#lblGroundFreightTimespan"),
				
				// Add promo code form dialog box
				divAddPromoCode = $('<div title="Promotional Code" class="checkout-addpromo">'
					+ '<label for="txtPopupPromoCode">Enter promotional code:</label>'
					+ '<div><input type="text" id="txtPopupPromoCode" name="txtPopupPromoCode" class="textbox" maxlength="10" />'
					+ '<span id="lblPopupPromoInvalidText" style="display: none;">Promo code is invalid</span></div>'
					+ '<span id="lblPromoSpinner" class="spinner" style="display: none" />'
					+ '<span id="lblPromoInvalidIcon" class="field-error" style="display: none;" />'
					+ '<h6>Promotional code? How do I get one of those?</h6>'
					+ '<p class="text-sm light" style="margin: 0;">Subscribers to our E-Alerts will periodically receive promotional codes and special offers via email. '
					+ '<a href="/promotions/newsletter.aspx" target="_blank">Sign up today!</a></p></div>'),
				
				// Delete promo code confirmation dialog box	
				divDelPromoCode = $('<div title="Promotional Code" class="checkout-delpromo">'
					+ '<p>Are you sure you wish to remove the promotional code from this order?</p>'
					+ '<p id="pPopupDelPromoCode" class="light" style="margin: 0; display: none;">'
					+ '<span class="spinner"></span> '
					+ 'Please wait a moment</p></div>'),
			
				// Function for updating order data and/or shipping options
				updateCheckoutOrderData = function(data, shipopts) {
					var vLTLShipping = parseFloat(data.LTLShipping);
					if (shipopts) {
						var vEconomyShipping = data.ShipOptions.EconomyShipping,
							vStandardShipping = data.ShipOptions.StandardShipping,
							vPriorityShipping = data.ShipOptions.PriorityShipping,
							vGroundFreight = data.ShipOptions.GroundFreight,
							promo;
						// Update economy shipping options
						if (vEconomyShipping) {
							lblEconomyShippingPrice.text(vEconomyShipping.Rate);
							lblEconomyShippingTimespan.text('Estimated Arrival: ' + vEconomyShipping.EstimatedArrivalRange);
							promo = vEconomyShipping.ShippingPromo.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;');
							if (promo != "" && vLTLShipping > 0) promo += '*<br /><span class="text-sm">* Excludes items requiring special ground freight</span>';
							if (promo != "") hEconomyShippingPromo.html(promo).show();
							else hEconomyShippingPromo.hide();
						}
						// Update standard shipping options
						if (vStandardShipping) {
							lblStandardShippingPrice.text(vStandardShipping.Rate);
							lblStandardShippingTimespan.text('Estimated Arrival: ' + vStandardShipping.EstimatedArrivalRange);
							promo = vStandardShipping.ShippingPromo.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;');
							if (promo != "" && vLTLShipping > 0) promo += '*<br /><span class="text-sm">* Excludes items requiring special ground freight</span>';
							if (promo != "") hStandardShippingPromo.html(promo).show();
							else hStandardShippingPromo.hide();
						}
						// Update priority shipping options
						if (vPriorityShipping) {
							lblPriorityShippingPrice.text(vPriorityShipping.Rate);
							lblPriorityShippingTimespan.text('Estimated Arrival: ' + vPriorityShipping.EstimatedArrivalRange);
							promo = vPriorityShipping.ShippingPromo.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;');
							if (promo != "" && vLTLShipping > 0) promo += '*<br /><span class="text-sm">* Excluding items requiring special ground freight</span>';
							if (promo != "") hPriorityShippingPromo.html(promo).show();
							else hPriorityShippingPromo.hide();
						}
						// Update ground freight shipping options
						if (vGroundFreight) {
							lblGroundFreightPrice.text(vPriorityShipping.Rate);
							lblGroundFreightTimespan.text('Estimated Arrival: ' + vPriorityShipping.EstimatedArrivalRange);
						}
					}
					
					// Update products
					var html = '', htmlstr, r, lblQualifier;
					if (data.Products) {
						for (var x = 0, len = data.Products.length; x < len; x++) {
							r = data.Products[x];
							lblQualifier = $("#lblQualifier_P_" + r.ID);
							lblTotalDiscount = $("#lblTotalDiscount_P_" + r.ID);
							lblLineTotal = $("#lblLineTotal_P_" + r.ID);
							htmlstr = '';
							if (r.DiscountID >= 0) {
								if (r.DiscountID > 0) htmlstr = '<span class="tiny-yes">Qualifies for promotion '
									+ '(<a href="promotion.aspx?did=' + r.DiscountID + '" class="promolink" data-blain-did="' + r.DiscountID + '">Details</a>)</span>';
								else htmlstr = '<span class="tiny-no">Does not qualify for promotion</span>';
							}
							lblQualifier.empty().html(htmlstr).find("a.promolink").unbind().click(promoLinkHandler);
							lblTotalDiscount.text((parseFloat(r.TotalDiscount.replace('$', '')) > 0) ? "Discounts: -" + r.TotalDiscount : "");
							lblLineTotal.text(r.LineTotal);
						}
					}
					// Update applicable discounts
					divCheckoutCart.find("div.checkout-discount, div.checkout-discountteaser").remove();
					if (data.Discounts) {
						for (var x = 0, len = data.Discounts.length; x < len; x++) {
							r = data.Discounts[x];
							html += '<div id="dcheckout_' + r.ID + '" data-blain-rowid="' + r.ID + '" class="checkout-discount">'
								+ '<div class="ditem"><b>' + r.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</b> '
								+ '(<a href="promotion.aspx?did=' + r.DiscountID + '" target="_blank" data-blain-did="' + r.DiscountID + '" class="promolink">Details</a>)</div></div>';
						}
					}
					// Update discount teasers
					if (data.DiscountTeasers) {
						for (var x = 0, len = data.DiscountTeasers.length; x < len; x++) {
							r = data.DiscountTeasers[x];
							html += '<div id="dtcheckout_' + r.ID + '" data-blain-rowid="' + r.ID + '" class="checkout-discountteaser">'
								+ '<div class="dtitem"><a href="/cart/">Return to your cart</a> and add ' + ((r.AmountShort == '$0.00') ? '' : '<b>' + r.AmountShort + '</b> in ')
								+ 'qualifying products to get <b>' + r.Description.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</b> '
								+ '(<a href="promotion.aspx?did=' + r.ID + '" target="_blank" data-blain-did="' + r.ID + '" class="promolink">Details</a>)</div></div>';
						}
					}
					$(html).appendTo(divCheckoutCart).find("a.promolink").unbind().click(promoLinkHandler);
					
					// Update order summary
					lblSubtotal.text(data.Subtotal);
					if (parseFloat(data.GrandTotal.replace('$', '')) > 0) {
						trTotals.show();
						if (parseFloat(data.OrderDiscounts.replace('$', '')) > 0) {
							trDiscounts.show();
							lblDiscounts.text(data.OrderDiscounts);
						} else trDiscounts.hide();
						lblShipMethod.text(data.ShipMethodDescription);
						lblSalesTax.text(data.SalesTax);
						lblShipping.text(data.TotalShipping);
						lblGrandTotal.text(data.GrandTotal);
						$('#hdnOrderBalance').val(data.GrandTotal.replace('$', ''));
						$('#hdnPaymentAmount').attr("data-blain-origamt", data.GrandTotal.replace('$', ''));
						$.gaEvent(data.CourierMethod, data.GrandTotal.replace('$', ''), data.TotalShipping.replace('$', ''));
					} else trTotals.hide();
					
				},
				
				// Ajax call to add promotional code
				addPromoCode = function(hlAdd, hlDel, lbl, shipopts) {
					var lblPromoSpinner = $("#lblPromoSpinner"),
						lblPromoInvalidIcon = $("#lblPromoInvalidIcon"),
						lblPopupPromoInvalidText = $("#lblPopupPromoInvalidText"),
						txtPopupPromoCode = $id("txtPopupPromoCode"),
						promocode = txtPopupPromoCode.value.trim();
					if (promocode == "") {
						lblPromoInvalidIcon.show();
						lblPopupPromoInvalidText.show();
						txtPopupPromoCode.focus();
						return;
					}
					$.ajax({
						async: true,
						type: "POST",
						url: "/ajax/webstore.aspx",
						dataType: "json",
						data: { a: "ucpc", o: $id("hdnOrderID").value, pc: promocode, shpopt: (shipopts) ? "1" : "0" },
						success: function (data, status, xhr) {
							if (data.StrVal == "0") {
								lblPromoInvalidIcon.show();
								lblPopupPromoInvalidText.show();
								txtPopupPromoCode.select();
								$.gaEvent('Promotional Discount', 'Tried Invalid Promo Code', promocode);
							} else {
								lbl.html('Promotional code: <b>' + promocode.replace(/& /g,'&amp; ').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</b> -');
								hlAdd.hide();
								hlDel.show();
								updateCheckoutOrderData(data, shipopts);
								divAddPromoCode.dialog("close");
								$.gaEvent('Promotional Discount', 'Set Promo Code', promocode);
							}
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Checkout', 'Add Promo Code AJAX Error', error);
								$.msgDialog("Promo Code Error", error);
							}
						},
						beforeSend: function() {
							lblPromoSpinner.show();
							lblPromoInvalidIcon.hide();
							lblPopupPromoInvalidText.hide();
						},
						complete: function(xhr, status) { lblPromoSpinner.hide(); }
					});
				},
				
				// Ajax call to delete promotional code
				delPromoCode = function(hlAdd, hlDel, lbl, shipopts) {
					var pUpdate = $("#pPopupDelPromoCode");
					$.ajax({
						async: true,
						type: "POST",
						url: "/ajax/webstore.aspx",
						dataType: "json",
						data: { a: "ucpc", o: $id("hdnOrderID").value, pc: "", shpopt: (shipopts) ? "1" : "0" },
						success: function (data, status, xhr) {
							lbl.html('Have a promotional code?');
							hlAdd.show();
							hlDel.hide();
							updateCheckoutOrderData(data, shipopts);
							divDelPromoCode.dialog("close");
							$.gaEvent('Promotional Discount', 'Removed Promo Code', '');
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Checkout', 'Delete Promo Code AJAX Error', error);
								$.msgDialog("Promo Code Error", error);
							}
						},
						beforeSend: function() { pUpdate.show(); },
						complete: function(xhr, status) { pUpdate.hide(); }
					});
				},
				addPromoCodeDialog = function(elem, shipopts) {
					var hlAdd = $(elem),
						hlDel = hlAdd.next("a"),
						lbl = hlAdd.prev("span");
					$("#txtPopupPromoCode").val("");
					divAddPromoCode.dialog({
						modal: true,
						resizable: false,
						closeOnEscape: true,
						width: 350,
						height: 220,
						buttons: {
							"OK": function() { addPromoCode(hlAdd, hlDel, lbl, shipopts); },
							"Cancel": function() { divAddPromoCode.dialog("close"); }
						},
						open: function() {
							$id('txtPopupPromoCode').value = '';
						},
						close: function() { divAddPromoCode.dialog("destroy").remove(); }
					}).keyup(function(e) {
						if (e.keyCode == 13) addPromoCode(hlAdd, hlDel, lbl, shipopts);
					});
				},
				delPromoCodeDialog = function(elem, shipopts) {
					var hlDel = $(elem),
						hlAdd = hlDel.prev("a"),
						lbl = hlAdd.prev("span");
					divDelPromoCode.dialog({
						modal: true,
						resizable: false,
						closeOnEscape: true,
						width: 330,
						height: 200,
						buttons: {
							"Yes": function() { delPromoCode(hlAdd, hlDel, lbl, shipopts); },
							"No": function() { divDelPromoCode.dialog("close"); }
						},
						close: function() { divDelPromoCode.dialog("destroy").remove(); }
					}).keyup(function(e) {
						if (e.keyCode == 13) delPromoCode(hlAdd, hlDel, lbl, shipopts);
					});
				};
				
			// Link click handlers
			$("#hlShipMethodAddPromoCode").click(function(e) {
				e.preventDefault();
				addPromoCodeDialog(this, true);
			});
			$("#hlAddPromoCode").click(function(e) {
				e.preventDefault();
				addPromoCodeDialog(this, true);
			});
			$("#hlCustomerStoredCardAddPromoCode, #hlCustomerCreditCardAddPromoCode, #hlCustomerBlainCardAddPromoCode, #hlCustomerGiftCardAddPromoCode, #hlGuestCreditCardAddPromoCode, #hlGuestBlainCardAddPromoCode, #hlGuestGiftCardAddPromoCode, #hlStoredCardAddPromoCode, #hlCreditCardAddPromoCode, #hlPayPalAddPromoCode, #hlBlainCardAddPromoCode, #hlGiftCardAddPromoCode").click(function(e) {
				e.preventDefault();
				addPromoCodeDialog(this, false);
			});
			$("#hlShipMethodDelPromoCode").click(function(e) {
				e.preventDefault();
				delPromoCodeDialog(this, true);
			});
			$("#hlDelPromoCode").click(function(e) {
				e.preventDefault();
				delPromoCodeDialog(this, true);
			});
			$("#hlCustomerStoredCardDelPromoCode, #hlCustomerCreditCardDelPromoCode, #hlCustomerBlainCardDelPromoCode, #hlCustomerGiftCardDelPromoCode, #hlGuestCreditCardDelPromoCode, #hlGuestBlainCardDelPromoCode, #hlGuestGiftCardDelPromoCode, #hlStoredCardDelPromoCode, #hlCreditCardDelPromoCode, #hlPayPalDelPromoCode, #hlBlainCardDelPromoCode, #hlGiftCardDelPromoCode").click(function(e) {
				e.preventDefault();
				delPromoCodeDialog(this, false);
			});
		}
	},
	
	openGiftCardHelp: function() {
		// Create and open dialog
		var dlg = $('<div id="gchelp" title="Gift Card Help">'
			+ '<h3>Where can I find the Gift Card Number and PIN?</h3>'
			+ '<iframe id="ifGiftCard" name="ifGiftCard" src="' + location.protocol + '//' + Blain.cDom + '/cart/gift_card_iframe.aspx" runat="server" class="ifcontent ifgiftcard" scrolling="no" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 750,
			height: 320,
			dialogClass: 'ctrbuttons',
			buttons: { "Close Window": function() { dlg.dialog("close"); } },
			close: function() { dlg.dialog("destroy").remove() }
		});
	
		// Track virtual pageview in Google Analytics
		$.gaPageview('/cart/gift_card.aspx');
	},
	
	openCVVHelp: function() {
		// Create and open dialog
		var dlg = $('<div id="gchelp" title="Credit Card Help">'
			+ '<h3>What is the card security code?</h3>'
			+ '<iframe id="ifCVV" name="ifCVV" src="' + location.protocol + '//' + Blain.cDom + '/cart/cvv_iframe.aspx" runat="server" class="ifcontent ifcvv" scrolling="no" frameborder="0"></iframe></div>');
		dlg.dialog({
			modal: true,
			resizable: false,
			closeOnEscape: true,
			width: 550,
			height: 390,
			dialogClass: 'ctrbuttons',
			buttons: { "Close Window": function() { dlg.dialog("close"); } },
			close: function() { dlg.dialog("destroy").remove() }
		});
	
		// Track virtual pageview in Google Analytics
		$.gaPageview('/cart/cvv.aspx');
	},
	
	// Promo code validator
	validatePromoCode: function(sender, e) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/ajax/webstore.aspx",
			dataType: "json",
			data: { a: "vpc", o: $("#hdnOrderID").val(), pc: e.Value},
			success: function (data, status, xhr) {
				if (data.StrVal == "0") e.IsValid = false;
				else e.IsValid = true;
			},
			error: function(xhr, status, error) {
				if (xhr.status > 0 && error != "") {
					$.gaEvent('Shopping Cart', 'Remove Item AJAX Error', error);
					$.msgDialog("Shopping Cart Error", error);
				}
			}
		});
	},
	
	// Checkout password validators
	validatePassword: function(sender, e) {
		var rbPasswordYes = $id("rblPassword_0");
		if (rbPasswordYes.checked) {
			if (e.Value.length > 0) e.IsValid = true;
			else e.IsValid = false;
		} else e.IsValid = true;
	},
	validateNewPassword: function(sender, e) {
		if (e.Value.length >= 5) e.IsValid = true;
		else e.IsValid = false;
	},
	validateVerifyPassword: function(sender, e) {
	    var txtPassword = $id("txtPassword");
	    if (!txtPassword) txtPassword = $id("txtGuestPassword");
		if (txtPassword.value != e.Value) e.IsValid = false;
	},
	
	// PLCC validators
	validatePLCCAcctNum: function(sender, e) {
		e.IsValid = (e.Value.substring(0, 6) != "601920");
	},
	validatePLCCFirstName: function(sender, e) {
		if (e.Value.length == 0) e.IsValid = false;
		else if (/([^A-Za-z\s]|\s{2})/.test(e.Value)) e.IsValid = false;
		else e.IsValid = true;
	},
	validatePLCCLastName: function(sender, e) {
		if (e.Value.length == 0) e.IsValid = false;
		else if (/([^A-Za-z'\-\s]|\s{2})/.test(e.Value)) e.IsValid = false;
		else e.IsValid = true;
	},
	validatePLCCAddress: function(sender, e) {
		if (e.Value.length == 0) e.IsValid = false;
		else if (/([^A-Za-z0-9\/\.'\-#\s]|\s{2})/.test(e.Value)) e.IsValid = false;
		else e.IsValid = true;
	},
	validatePLCCCity: function(sender, e) {
		if (e.Value.length == 0) e.IsValid = false;
		else if (/([^A-Za-z\s]|\s{2})/.test(e.Value)) e.IsValid = false;
		else e.IsValid = true;
	},
	validatePLCCPhone: function(sender, e) {
		if (e.Value.length == 0) e.IsValid = false;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value);
	},
	
	// Mobile phone validators
	validateGuestMobilePhone: function(sender, e) {
		if (!$("#cbGuestSMS").is(':checked')) e.IsValid = true;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value.trim());
	},
	validateCustomerMobilePhone: function(sender, e) {
		if (!$("#cbCustomerSMS").is(':checked')) e.IsValid = true;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value.trim());
	},
	validateNewMobilePhone: function(sender, e) {
		if (!$("#cbNewSMS").is(':checked')) e.IsValid = true;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value.trim());
	},
	validatePayPalMobilePhone: function(sender, e) {
		if (!$("#cbPayPalSMS").is(':checked')) e.IsValid = true;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value.trim());
	},
	validateMobilePhone: function(sender, e) {
		if (!$("#cbSMS").is(':checked')) e.IsValid = true;
		else e.IsValid = /^\d{3}(-)?\d{3}(-)?\d{4}$/.test(e.Value.trim());
	},

	// State/zip validators
	validateNewStateZip: function(sender, e) {
		var ddlState = $id("ddlNewShippingState");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},
	validateEditStateZip: function(sender, e) {
		var ddlState = $id("ddlEditShippingState");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},
	validateGuestStateZip: function(sender, e) {
		var ddlState = $id("ddlGuestShippingState");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},
	validateStateZip: function(sender, e) {
		var ddlState = $id("ddlShipState");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},

	// Partial amount validators
	customerDefaultPartialPaymentValidation: function(sender, e) { // old
		var cbPartial = $id("cbCustomerDefaultPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	customerOtherPartialPaymentValidation: function(sender, e) { //old
		var cbPartial = $id("cbCustomerOtherPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	customerPartialPaymentValidation: function(sender, e) { // old
		var cbPartial = $id("cbCustomerPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	defaultPartialPaymentValidation: function(sender, e) { // new
		var cbPartial = $id("cbDefaultPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	otherPartialPaymentValidation: function(sender, e) { // new
		var cbPartial = $id("cbOtherPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	guestPartialPaymentValidation: function(sender, e) { // old
		var cbPartial = $id("cbGuestPartial");
		if (cbPartial.checked) {
			if (e.Value.length == 0) e.IsValid = false;
			else FormValidation.isCurrency(sender, e);
		} else e.IsValid = true;
	},
	partialPaymentAmount: function(sender, e) { // old/new
		var hdnOrderBalance = $id("hdnOrderBalance");
		if (isNaN(hdnOrderBalance.value) || isNaN(e.Value)) {
			e.IsValid = false;
			return;
		}
		OrderBalance = parseFloat(hdnOrderBalance.value);
		var Amount = parseFloat(e.Value);
		if (Amount > OrderBalance || Amount <= 0) e.IsValid = false;
		else e.IsValid = true;
	},

	// Credit card validators
	validateEditCVV: function(sender, e) { //old
		var txtCardNum = $id("txtEditCardNum");
		var pattern = /^\d{3,4}$/;
		if (txtCardNum.value.indexOf("*") == 0) e.IsValid = true;
		else if (txtCardNum.value.length == 0) e.IsValid = false;
		else e.IsValid = pattern.test(e.Value);
	},

	// Gift card validators
	validateCustomerGiftCard: function(sender, e) {
		var txtGiftCardNum = $id("txtCustomerGiftCardNum");
		if (e.Value.length == 0 || txtGiftCardNum.value.length == 0) e.IsValid = false;
		else e.IsValid = FormValidation.validateGiftCard($id("hdnOrderID").value, txtGiftCardNum.value, e.Value);
	},
	validateGuestGiftCard: function(sender, e) {
		var txtGiftCardNum = $id("txtGuestGiftCardNum");
		if (e.Value.length == 0 || txtGiftCardNum.value.length == 0) e.IsValid = false;
		else e.IsValid = FormValidation.validateGiftCard($id("hdnOrderID").value, txtGiftCardNum.value, e.Value);
	},
	validateGiftCard: function(sender, e) {
		var txtGiftCardNum = $id("txtGiftCardNum");
		if (e.Value.length == 0 || txtGiftCardNum.value.length == 0) e.IsValid = false;
		else e.IsValid = FormValidation.validateGiftCard($id("hdnOrderID").value, txtGiftCardNum.value, e.Value);
	}
}


/**************** PLCC METHODS ********************/

Blain.PLCC = {
	// Submits an application
	submitApp: function() {
		var form = document.getElementById("frmApplicationTermsCond");
		if (form) form.submit();
	},

	// Initiates auth on PLCC
	initAuth: function() {
		var order = $("#lblPLCC").data('blain-oid');
		// Redirect to submit location
		setTimeout(function() { location.href = 'purchase_submit.aspx' + ((order > 0) ? '?oid=' + order : ''); }, 0);
	},

	// Initiates purchase on PLCC
	initPurchase: function() {
		// Get the form from the parent frame
		var parentForm = parent.document.forms[0],
			thisForm = document.forms[0],
			baseURL = location.protocol + "//" + location.host;
		if (parentForm && thisForm) {
			thisForm.homeUrl.value = baseURL;
			thisForm.merchantId.value = parentForm.hdnMerchantID.value;
			thisForm.shopperId.value = parentForm.hdnOrderID.value;
			thisForm.clientTransactionId.value = parentForm.hdnTransID.value;
			thisForm.purchaseNotificationUrl.value = baseURL + thisForm.purchaseNotificationUrl.value;
			thisForm.creditApplyNotificationUrl.value = baseURL + thisForm.creditApplyNotificationUrl.value;
			thisForm.clientSuccessfulPurchaseUrl.value = parentForm.hdnSuccessfulPurchaseUrl.value;
			thisForm.clientUnsuccessPurchaseUrl.value = parentForm.hdnUnsuccessPurchaseUrl.value;
			thisForm.clientSuccessfulApplyUrl.value = baseURL + thisForm.clientSuccessfulApplyUrl.value;
			thisForm.clientUnsuccessApplyUrl.value = parentForm.hdnUnsuccessApplyUrl.value;
			thisForm.billToFirstName.value = parentForm.hdnFirstName.value;
			thisForm.billToLastName.value = parentForm.hdnLastName.value;
			thisForm.billToAddress1.value = parentForm.hdnAddress1.value;
			thisForm.billToAddress2.value = parentForm.hdnAddress2.value;
			thisForm.billToCity.value = parentForm.hdnCity.value;
			thisForm.billToState.value = parentForm.hdnState.value;
			thisForm.billToZipCode.value = parentForm.hdnZip.value;
			thisForm.billToHomePhone.value = parentForm.hdnPhone.value;
			thisForm.transactionAmount.value = parentForm.hdnAmount.value;
			thisForm.billToAccountNumber.value = parentForm.hdnStoreAcctNum.value;
			if (parentForm.hdnPromoCode.value.length > 0) thisForm.promoCode.value = parentForm.hdnPromoCode.value;
			setTimeout(function() { thisForm.submit(); }, 0);
		}
	},
	
	// Init PLCC functions
	init: function() {
		if ($id("lblPLCC")) Blain.PLCC.initAuth();
		if ($id("frmStoreCC")) Blain.PLCC.initPurchase();
		$("#btnPLCCApply").click(function(e) {
			$.gaEvent('PLCC', 'Online Application', 'Credit Card Page Clickthrough');
		});
	}
}


/**************** CAREERS METHODS ********************/

Blain.Careers = {
	
	init: function() {
		// Search form event handlers
		if ($id("frmFindJob")) {
			var frmFindJob = $("#frmFindJob"),
				jobk = $("#jobk"),
				jobl = $("#jobl"),
				searchval = jobk.val().trim();
			// Search form event listeners
			if (searchval == '') jobk.val('Search by Keyword').addClass('light');
			else if (searchval = 'Search by Keyword') jobk.addClass('light');
			frmFindJob.bind('submit', function() {
				searchval = jobk.val().trim();
				var FormValid = false;
				if (jobl.val() != '') FormValid = true;
				if (searchval != '' && searchval != "Search by Keyword") FormValid = true;
				if (FormValid) {
					if (searchval == 'Search by Keyword') jobk.val("");
					return true;
				} else {
					$.msgDialog("Job Search Form", "Please select a location or enter a keyword");
					return false;
				}
			});
			jobk.bind('focus', function() {
				if (this.value == 'Search by Keyword') jobk.val('').removeClass('light');
			}).bind('blur', function() {
				if (this.value == '') jobk.val('Search by Keyword').addClass('light');
			});
			jobl.change(function() {
				if (jobl.val() != '') frmFindJob.submit();
			});
		}
	}
}


/**************** GIFT CARD METHODS ********************/

Blain.GiftCards = {
	
	// Declare properties
	

	// Initializes the item selection form for gift cards
	init: function() {
		if ($id("frmGiftCard")) {
			var urlCardStyle = Blain.assetPrefix + '/uploads/gift_card/card_styles/',
				urlEnvelopeStyle = Blain.assetPrefix + '/uploads/gift_card/envelope_styles/',
				rbECard = $("#rbECard"),
				rbMailCard = $("#rbMailCard"),
				divECard = $("#divECard"),
				divMailCard = $("#divMailCard"),
				ddlECardStyle = $("#ddlECardStyle"),
				ddlMailCardStyle = $("#ddlMailCardStyle"),
				ddlEnvelopeStyle = $("#ddlEnvelopeStyle"),
				divMailRecipient = $("#divMailRecipient"),
				lblEProgress = $("#lblEProgress"),
				lblMailProgress = $("#lblMailProgress"),
				imgEnvStyle = $id("imgEnvStyle"),
				imgProgress = $id("imgProgress"),
				imgECardStyle = $id("imgECardStyle"),
				imgMailCardStyle = $id("imgMailCardStyle"),
				txtECardAmount = $("#txtECardAmount"),
				txtECardFirstName = $("#txtECardFirstName"),
				txtECardLastName = $("#txtECardLastName"),
				txtECardCompany = $("#txtECardCompany"),
				txtECardMessage = $("#txtECardMessage"),
				txtMailCardAmount = $("#txtMailCardAmount"),
				txtMailCardFirstName = $("#txtMailCardFirstName"),
				txtMailCardLastName = $("#txtMailCardLastName"),
				txtMailCardCompany = $("#txtMailCardCompany"),
				txtMailCardMessage = $("#txtMailCardMessage"),
				changeType = function() {
					if (rbMailCard.is(':checked')) {
						divECard.hide();
						divMailCard.show();
					} else {
						divECard.show();
						divMailCard.hide();
					}
				},
				setCardStyle = function() {
					var val;
					if (rbECard.is(':checked')) {
						val = ddlECardStyle.val();
						ddlMailCardStyle.val(val);
					} else {
						val = ddlMailCardStyle.val();
						ddlECardStyle.val(val);
					}
					// Load new e-card image
					if (imgECardStyle) {
						var newEImg = new Image();
						newEImg.src = urlCardStyle + val + "_ecard_preview.jpg";
						if (newEImg.complete) imgECardStyle.src = newEImg.src;
						else {
							lblEProgress.css('visibility', '');
							newEImg.onload = function() {
								imgECardStyle.src = newEImg.src;
								$(lblEProgress).css('visibility', 'hidden');
							}
						}
					}
					// Load new physical card image
					var newMailImg = new Image();
					newMailImg.src = urlCardStyle + val + ".jpg";
					if (newMailImg.complete) imgMailCardStyle.src = newMailImg.src;
					else {
						lblMailProgress.css('visibility', '');
						newMailImg.onload = function() {
							imgMailCardStyle.src = newMailImg.src;
							lblMailProgress.css('visibility', 'hidden');
						}
					}
				},
				setEnvelopeStyle = function() {
					var val = ddlEnvelopeStyle.val(),
						newEnvImg = new Image();
					newEnvImg.src = urlEnvelopeStyle + val + ".jpg"
					if (newEnvImg.complete) imgEnvStyle.src = newEnvImg.src;
					else {
						lblMailProgress.css('visibility', '');
						newEnvImg.onload = function() {
							imgEnvStyle.src = newEnvImg.src;
							lblMailProgress.css('visibility', 'hidden');
						}
					}
				},
				setRecipientMode = function() {
					if ($("#rblRecipient input:radio:checked").val() == "O") divMailRecipient.show();
					else divMailRecipient.hide();
				};
			
			
			rbECard.click(changeType);
			rbMailCard.click(changeType);
			ddlECardStyle.change(setCardStyle);
			ddlMailCardStyle.change(setCardStyle);
			ddlEnvelopeStyle.change(setEnvelopeStyle);
			$("#rblRecipient input:radio").click(setRecipientMode);
			setCardStyle();
			if ($id("divCardType")) changeType();
			setRecipientMode();
			// Setup change scripts for shared fields
			txtECardAmount.change(function() { txtMailCardAmount.val(this.value); });
			txtECardFirstName.change(function() { txtMailCardFirstName.val(this.value); });
			txtECardLastName.change(function() { txtMailCardLastName.val(this.value); });
			txtECardCompany.change(function() { txtMailCardCompany.val(this.value); });
			txtECardMessage.change(function() { txtMailCardMessage.val(this.value); });
			txtMailCardAmount.change(function() { txtECardAmount.val(this.value); });
			txtMailCardFirstName.change(function() { txtECardFirstName.val(this.value); });
			txtMailCardLastName.change(function() { txtECardLastName.val(this.value); });
			txtMailCardCompany.change(function() { txtECardCompany.val(this.value); });
			txtMailCardMessage.change(function() { txtECardMessage.val(this.value); });
		}
	}
}


/**************** GIFT REGISTRY METHODS ********************/
Blain.GiftReg = {
	init: function() {
		// Find registry form validation
		if ($id("frmFindRegistry")) {
			var lblGRF = $("#lblGRF"),
				lblGRL = $("#lblGRL"),
				txtGRF = $("#grf"),
				txtGRL = $("#grl");
			$("#frmFindRegistry").submit(function(e) {
				var flen = txtGRF.val().trim().length,
					llen = txtGRL.val().trim().length;
				if (flen < 2) lblGRF.css('visibility', '');
				else lblGRF.css('visibility', 'hidden');
				if (llen < 2) lblGRL.css('visibility', '');
				else lblGRL.css('visibility', 'hidden');
				if (flen < 2 || llen < 2) return false;
				else return true;
			});
		}
		
		// Edit registry profile events
		if ($id("frmEditRegistry")) {
			var cbSame = $("#cbSame"),
				txtFirstName_2 = $("#txtFirstName_2"),
				txtLastName_2 = $("#txtLastName_2"),
				txtAddress1_1 = $("#txtAddress1_1"),
				txtAddress2_1 = $("#txtAddress2_1"),
				txtCity_1 = $("#txtCity_1"),
				ddlState_1 = $("#ddlState_1"),
				txtZip_1 = $("#txtZip_1"),
				txtAddress1_2 = $("#txtAddress1_2"),
				txtAddress2_2 = $("#txtAddress2_2"),
				txtCity_2 = $("#txtCity_2"),
				ddlState_2 = $("#ddlState_2"),
				txtZip_2 = $("#txtZip_2"),
				setCoRegistrantAddress = function() {
					if (cbSame.is(':checked')) {
						txtAddress1_2.val(txtAddress1_1.val()).attr('disabled', 'disabled');
						txtAddress2_2.val(txtAddress2_1.val()).attr('disabled', 'disabled');
						txtCity_2.val(txtCity_1.val()).attr('disabled', 'disabled');
						ddlState_2.val(ddlState_1.val()).attr('disabled', 'disabled');
						txtZip_2.val(txtZip_1.val()).attr('disabled', 'disabled');
					} else {
						txtAddress1_2.removeAttr('disabled');
						txtAddress2_2.removeAttr('disabled');
						txtCity_2.removeAttr('disabled');
						ddlState_2.removeAttr('disabled');
						txtZip_2.removeAttr('disabled');
					}
				};
			cbSame.click(setCoRegistrantAddress);
			txtAddress1_1.change(setCoRegistrantAddress);
			txtAddress2_1.change(setCoRegistrantAddress);
			txtCity_1.change(setCoRegistrantAddress);
			ddlState_1.change(setCoRegistrantAddress);
			txtZip_1.change(setCoRegistrantAddress);
			setCoRegistrantAddress();
		}
	},

	// State/zip validators
	validatePrimaryStateZip: function(sender, e) {
		var ddlState = $id("ddlState_1");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},
	validateSecondaryStateZip: function(sender, e) {
		var ddlState = $id("ddlState_2");
		if (ddlState.value != "") e.IsValid = FormValidation.validateStateZip(ddlState.value, e.Value);
		else e.IsValid = true;
	},

	// Custom validator for the co-regisrant email address
	validateSecondaryEmail: function(source, e) {
		var txtEmail_2 = document.getElementById("txtEmail_2");
		if (e.Value != txtEmail_2.value) e.IsValid = false;
		else e.IsValid = true;
		return;
	}
}

/**************** MODELING METHODS ********************/
Blain.Modeling = {
	init: function() {
		$("#mthumbs a").click(function(e) {
			e.preventDefault();
			var elem = $(this),
				imgref = elem.attr('href').replace('image.aspx?imgref=', '');
			// Create and open dialog
			var dlg = $('<div id="modimg" title="Modeling Gallery Image">'
				+ '<div align="center"><img src="images/' + imgref + '" alt="(image)" /></div>');
			dlg.dialog({
				modal: true,
				resizable: false,
				closeOnEscape: true,
				width: 750,
				height: 550,
				dialogClass: 'ctrbuttons',
				buttons: {
					"<": function() {
						if (elem.parent().prev().length > 0) elem = elem.parent().prev().find('a');
						else elem = elem.parent().parent().find('li').last().find('a');
						imgref = elem.attr('href').replace('image.aspx?imgref=', '');
						dlg.find('img').attr('src', 'images/' + imgref);
					},
					"Close Window": function() { dlg.dialog("close"); },
					">": function() {
						if (elem.parent().next().length > 0) elem = elem.parent().next().find('a');
						else elem = elem.parent().parent().find('li').first().find('a');
						imgref = elem.attr('href').replace('image.aspx?imgref=', '');
						dlg.find('img').attr('src', 'images/' + imgref);
					}
				},
				open: function() {
					$(this).parent().find('button:nth-child(2)').focus();
				},
				close: function() { dlg.dialog("destroy").remove() }
			});
	
			// Track virtual pageview in Google Analytics
			$.gaPageview('/modeling/gallery/image.aspx?imgref=' + imgref);
		
		});
	}
}

/**************** TIRES METHODS ********************/
Blain.Tires = {
	ajaxURL: "/ajax/tires.aspx",
	
	init: function() {
		// Event handlers for vehicle lookup or tires
		if ($id("frmTires") || $id("frmAutoQuote")) {
			$("#frmTires").submit(function() { return false });
			
			var ddlYear = $("#ddlYear"),
				ddlMake = $("#ddlMake"),
				ddlModel = $("#ddlModel"),
				ddlStyle = $("#ddlStyle"),
				ddlWidth = $("#ddlWidth"),
				ddlRatio = $("#ddlRatio"),
				ddlRim = $("#ddlRim"),
				ven1 = $("#vb1"),
				ven2 = $("#vb2"),
				ven3 = $("#vb3"),
				ven4 = $("#vb4"),
				ven5 = $("#vb5"),
				val, x, len;
			
			// Vehicle-based lookup
			ddlYear.change(function() {
				if (this.selectedIndex > 0) {
					var thisval = this.value;
					$.ajax({
						async: true,
						url: Blain.Tires.ajaxURL,
						dataType: "json",
						data: {a: "gvma", vy: thisval },
						success: function (data, status, xhr) {
							ddlMake.empty();
							$('<option/>').attr('value', '').text('Select Make').appendTo(ddlMake);
							for (var x = 0, len = data.ListItem.length; x < len; x++) {
								val = data.ListItem[x];
								$('<option/>').attr('value', val).text(val).appendTo(ddlMake);
							}
							ddlMake.removeAttr('disabled');
							ddlModel.attr('disabled', 'disabled');
							ddlStyle.attr('disabled', 'disabled');
							$.gaEvent('Tire Lookup', 'Vehicle Year', thisval);
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Tire Lookup', 'Vehicle Year AJAX Error', error);
								$.msgDialog("Tire Lookup Error", error);
							}
						}
					});
				} else {
					ddlMake.attr('disabled', 'disabled');
					ddlModel.attr('disabled', 'disabled');
					ddlStyle.attr('disabled', 'disabled');
				}
			});
			if (!Cookie.get("vt")) ddlYear.val('');
			ddlMake.change(function() {
				if (this.selectedIndex > 0) {
					var thisval = this.value;
					$.ajax({
						async: true,
						url: Blain.Tires.ajaxURL,
						dataType: "json",
						data: {a: "gvmo", vy: ddlYear.val(), vma: thisval },
						success: function (data, status, xhr) {
							ddlModel.empty();
							$('<option/>').attr('value', '').text('Select Model').appendTo(ddlModel);
							for (x = 0, len = data.ListItem.length; x < len; x++) {
								val = data.ListItem[x];
								$('<option/>').attr('value', val).text(val).appendTo(ddlModel);
							}
							ddlModel.removeAttr('disabled');
							ddlStyle.attr('disabled', 'disabled');
							$.gaEvent('Tire Lookup', 'Vehicle Make', thisval);
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Tire Lookup', 'Vehicle Make AJAX Error', error);
								$.msgDialog("Tire Lookup Error", error);
							}
						}
					});
				} else {
					ddlModel.attr('disabled', 'disabled');
					ddlStyle.attr('disabled', 'disabled');
				}
			});
			if (!Cookie.get("vt")) ddlMake.val('').attr('disabled', 'disabled');
			ddlModel.change(function() {
				if (this.selectedIndex > 0) {
					var thisval = this.value;
					$.ajax({
						async: true,
						url: Blain.Tires.ajaxURL,
						dataType: "json",
						data: {a: "gvs", vy: ddlYear.val(), vma: ddlMake.val(), vmo: thisval },
						success: function (data, status, xhr) {
							ddlStyle.empty();
							$('<option/>').attr('value', '').text('Select Trim').appendTo(ddlStyle);
							for (x = 0, len = data.ListItem.length; x < len; x++) {
								val = data.ListItem[x];
								$('<option/>').attr('value', val).text(val).appendTo(ddlStyle);
							}
							ddlStyle.removeAttr('disabled');
							$.gaEvent('Tire Lookup', 'Vehicle Model', thisval);
						},
						error: function(xhr, status, error) {
							if (xhr.status > 0 && error != "") {
								$.gaEvent('Tire Lookup', 'Vehicle Model AJAX Error', error);
								$.msgDialog("Tire Lookup Error", error);
							}
						}
					});
				} else ddlStyle.attr('disabled', 'disabled');
			});
			if (!Cookie.get("vt")) {
				ddlModel.val('').attr('disabled', 'disabled');
				ddlStyle.val('').attr('disabled', 'disabled');
			}
			
			// Event handlers for tire lookup form only
			if ($id("frmTires")) {
			    ddlStyle.change(function () {
			        var vens = "";
					if ($id("vb1")) {
						if (ven1.val().length > 0) vens = vens + "&vb=" + encodeURIComponent(ven1.val());
						if (ven2.val().length > 0) vens = vens + "&vb2=" + encodeURIComponent(ven2.val());
						if (ven3.val().length > 0) vens = vens + "&vb3=" + encodeURIComponent(ven3.val());
						if (ven4.val().length > 0) vens = vens + "&vb4=" + encodeURIComponent(ven4.val());
						if (ven5.val().length > 0) vens = vens + "&vb5=" + encodeURIComponent(ven5.val());
					}
					if (vens.length == 0) {
						if (this.selectedIndex > 0) {
							var thisval = this.value;
							$.gaEvent('Tire Lookup', 'Vehicle Trim', thisval);
							// Go to tire listing based on vehicle
							location.href = '/tires/list.aspx?vy=' + encodeURIComponent(ddlYear.val()) + '&vma=' + encodeURIComponent(ddlMake.val()) + '&vmo=' + encodeURIComponent(ddlModel.val()) + '&vs=' + encodeURIComponent(thisval);
						}
					}
			        else
			        {
			            if (this.selectedIndex > 0) {
			                var thisval = this.value;
			                $.gaEvent('Tire Lookup', 'Vehicle Trim', thisval);
			                // Go to tire listing based on vehicle
			                location.href = '/tires/list.aspx?vy=' + encodeURIComponent(ddlYear.val()) + '&vma=' + encodeURIComponent(ddlMake.val()) + '&vmo=' + encodeURIComponent(ddlModel.val()) + '&vs=' + encodeURIComponent(thisval) + vens;
			            }
			        }
				});
				
				// Size-based lookup
				ddlWidth.change(function() {
					if (this.selectedIndex > 0) {
						var thisval = this.value;
						$.ajax({
							async: true,
							url: Blain.Tires.ajaxURL,
							dataType: "json",
							data: {a: "gtr", tw: this.value },
							success: function (data, status, xhr) {
								ddlRatio.empty();
								$('<option/>').attr('value', '').text('Select Ratio').appendTo(ddlRatio);
								for (x = 0, len = data.ListItem.length; x < len; x++) {
									val = data.ListItem[x];
									$('<option/>').attr('value', val).text(val).appendTo(ddlRatio);
								}
								ddlRatio.removeAttr('disabled');
								ddlRim.attr('disabled', 'disabled');
								$.gaEvent('Tire Lookup', 'Section Width', thisval);
							},
							error: function(xhr, status, error) {
								if (xhr.status > 0 && error != "") {
									$.gaEvent('Tire Lookup', 'Tire Width AJAX Error', error);
									$.msgDialog("Tire Lookup Error", error);
								}
							}
						});
					} else {
						ddlRatio.attr('disabled', 'disabled');
						ddlRim.attr('disabled', 'disabled');
					}
				}).val('');
				ddlRatio.change(function() {
					if (this.selectedIndex > 0) {
						var thisval = this.value;
						$.ajax({
							async: true,
							url: Blain.Tires.ajaxURL,
							dataType: "json",
							data: {a: "gts", tw: ddlWidth.val(), tr: this.value },
							success: function (data, status, xhr) {
								ddlRim.empty();
								$('<option/>').attr('value', '').text('Select Rim Size').appendTo(ddlRim);
								for (x = 0, len = data.ListItem.length; x < len; x++) {
									val = data.ListItem[x];
									$('<option/>').attr('value', val).text(val).appendTo(ddlRim);
								}
								ddlRim.removeAttr('disabled');
								$.gaEvent('Tire Lookup', 'Aspect Ratio', thisval);
							},
							error: function(xhr, status, error) {
								if (xhr.status > 0 && error != "") {
									$.gaEvent('Tire Lookup', 'Tire Ratio AJAX Error', error);
									$.msgDialog("Tire Lookup Error", error);
								}
							}
						});
					} else ddlRim.attr('disabled', 'disabled');
				}).val('').attr('disabled', 'disabled');
			    ddlRim.change(function () {
			        var vens = "";
					if ($id("vb1")) {
			       		if (ven1.val().length>0) vens = vens + "&vb=" + encodeURIComponent(ven1.val());
			       		if (ven2.val().length > 0) vens = vens + "&vb2=" + encodeURIComponent(ven2.val());
			       		if (ven3.val().length > 0) vens = vens + "&vb3=" + encodeURIComponent(ven3.val());
			        	if (ven4.val().length > 0) vens = vens + "&vb4=" + encodeURIComponent(ven4.val());
			        	if (ven5.val().length > 0) vens = vens + "&vb5=" + encodeURIComponent(ven5.val());
					}
			        if (vens.length > 0) {
			            if (this.selectedIndex > 0) {
			                var thisval = this.value;
			                $.gaEvent('Tire Lookup', 'Vehicle Trim', thisval);
			                // Go to tire listing based on vehicle
			                location.href = '/tires/list.aspx?tw=' + encodeURIComponent(ddlWidth.val()) + '&tr=' + encodeURIComponent(ddlRatio.val()) + '&trs=' + encodeURIComponent(thisval) + vens;
                        }
			        }
			        else {
			            if (this.selectedIndex > 0) {
			                var thisval = this.value;
			                $.gaEvent('Tire Lookup', 'Rim Size', thisval);
			                var size = ddlWidth.val() + "||" + ddlRatio.val() + "||" + thisval;
			                // Go to tire listing based on vehicle
			                location.href = '/tires/list.aspx?tw=' + encodeURIComponent(ddlWidth.val()) + '&tr=' + encodeURIComponent(ddlRatio.val()) + '&trs=' + encodeURIComponent(thisval);
			            }
			        }
				}).val('').attr('disabled', 'disabled');
			}
			
			if ($id("frmAutoQuote")) {
				window.scrollTo(0, 0);
				// Contact method form handler
				var rblContactMethod = $("#rblContactMethod input"),
					divEmailFields = $("#divAQEmail, #divAQVerifyEmail, #divAQNewsletter"),
					divPhoneFields = $("#divAQDayPhone, #divAQEvePhone"),
					cvEmail = $id("cvEmail"),
					rfvVerifyEmail = $id("rfvVerifyEmail"),
					cvVerifyEmail = $id("cvVerifyEmail"),
					cvDayPhone = $id("cvDayPhone"),
					cvEvePhone = $id("cvEvePhone"),
					form = rblContactMethod[0].form,
						toggleContactMethod = function() {
							if (form.rblContactMethod[0].checked) {
								divEmailFields.show();
								divPhoneFields.hide();
								cvEmail.enabled = true;
								rfvVerifyEmail.enabled = true;
								cvVerifyEmail.enabled = true;
								cvDayPhone.enabled = false;
								cvEvePhone.enabled = false;
							} else {
								divEmailFields.hide();
								divPhoneFields.show();
								cvEmail.enabled = false;
								rfvVerifyEmail.enabled = false;
								cvVerifyEmail.enabled = false;
								cvDayPhone.enabled = true;
								cvEvePhone.enabled = true;
							}
						};
				rblContactMethod.on('click.toggglecontact', function(e) { toggleContactMethod(); });
				toggleContactMethod();
			}
		}
		
		if ($id("frmEcomFilter")) {
			$("#eco").click(function() { this.form.submit() });
		}
	}
}

/**************** PROJECT METHODS ********************/
Blain.Projects = {
	init: function() {
		$("#olInst a").click(function(e) {
			e.preventDefault();
			var elem,
				imgurl = $(this).data('blain-imgurl');
			// Create and open dialog
			var dlg = $('<div id="projimg" title="Project Image">'
				+ '<div align="center"><img src="' + imgurl + '" alt="(image)" /></div>');
			dlg.dialog({
				modal: true,
				resizable: false,
				closeOnEscape: true,
				width: 400,
				height: 400,
				dialogClass: 'ctrbuttons',
				buttons: { "Close Window": function() { dlg.dialog("close"); } },
				close: function() { dlg.dialog("destroy").remove() }
			});
	
			// Track virtual pageview in Google Analytics
			$.gaPageview(this.getAttribute('href'));
		
		});
	}
}

/**************** PROMOTIONS METHODS ********************/
Blain.Promotions = {
	getSalesFlyerList: function(num) {
		// Trigger change to sales flyer list
		$.ajax({
			url: "/ajax/stores.aspx",
			data: { a: "sf", n: num },
			dataType: "JSON",
			beforeSend: function() {
				$("#salesflyers").html('<p><span class="spinner"></span> Updating Sales Flyers for your area...</p>');
			},
			success: function(data, status, xhr) {
				if (data.FlyerHTML != "") $("#salesflyers").html(data.FlyerHTML);
				if (data.ThumbCSS != "") {
					// Insert new CSS styles
					var style = $tag("head")[0].getElementsByTagName("style")[0];
					if (!style) {
						style = document.createElement("style");
						$tag("head")[0].appendChild(style);
					}
					if (style.styleSheet) {
						var css = data.ThumbCSS;
						if (data.Thumb2xCSS != "") css += hidpi_query + " {" + data.Thumb2xCSS + "}";
						style.styleSheet.cssText = style.innerHTML + css;
					} else {
						style.appendChild(document.createTextNode(data.ThumbCSS));
						if (data.Thumb2xCSS != "") style.appendChild(document.createTextNode(hidpi_query + " {" + data.Thumb2xCSS + "}"));
					}
				}
			},
			error: function(xhr, status, error) {
				$("#salesflyers").html('<p class="red"><b>Sorry, but an error occurred updating the list of sales flyers.</b> Please refresh the page to fix this problem');
				$.gaError('Sales Flyer List', 'AJAX Error', xhr.status, error);
			}
		});
	},
	
	init: function() {
		var frmFindRebate = $("#frmFindRebate"),
			rdept = $("#rdept");
		rdept.change(function(e) {
			if (rdept.val() != '') frmFindRebate.submit(); 
		});
		frmFindRebate.submit(function(e) {
			if (rdept.val() == '') {
				$.msgDialog('No department selected', 'Please select a department.');
				return false;
			} else return true;
		});
		$("#frmPageJump_top select, #frmPageJump_bottom select").change(function(e) {
			this.form.submit();
		});
		
		$("#hlFlyerPrint").click(function() { window.print(); });
		
		if ($id("hlFlyerEmail")) {
			addthis_config = {
				username: "farmandfleet",
				//ui_cobrand: "Blain's Farm & Fleet",
				data_ga_property: "UA-193719-1",
				data_track_clickback: true,
				data_track_addressbar: true
			};
			addthis_share = {
				url: self.location.href.replace(self.location.hash, '') + ((self.location.href.indexOf("?") != -1) ? "&src=refer" : "?src=refer"),
				title: $('title').text().replace(" | Blain's Farm & Fleet Sales Flyers", ""),
				email_template: 'blain_flyer'
			};
			addthis.init();
		}
		
		$("#hlChangeStore").click(function(e) {
			e.preventDefault();
			Blain.Stores.openNewSelector();
		});	
	}
}


// DOM ready handler
$(function() {
	$.trace('DOM is ready');
	// Bust out of frames
	//if (!$('body').hasClass('iframe') && top.location != location) top.location.href = document.location.href;
	
	// A/B test code to swich to new product list treatment
	
	// Declare common variables
	var ua = navigator.userAgent;
	
	// Set cookie for HiDPI displays
	if (Blain.hiRes) Cookie.set("HiDPI", "1", new Date(new Date().getTime() + (10 * 365 * 1000 * 60 * 60 * 24)), "/", Blain.cDom);
	else if (Cookie.get("HiDPI") == "1") Cookie.set("HiDPI", null, Blain.Stores.nullExp, "/", Blain.cDom);
	
	// Set up date pickers
	$(".datepicker").datepicker({showAnim:'slideDown',dateFormat:'m/d/yy',buttonImage:Blain.imagePrefix + '/images/interface/calendar.gif',duration:'fast',showOn:'both',buttonImageOnly:true,buttonText:'Select date',showOtherMonths:true,selectOtherMonths:true});
	
	// Setup common input filters
	$("input.intfield, input.zipcode").filter_input({ regex: /[0-9]/, suppressEnter: false });
	$("input.zip4").keypress(FormValidation.formatZipCode);
	$("input.phnum").keypress(FormValidation.formatPhoneNumber);
	
	// Fix label tapping in iOS devices
	if (ua.match(/(iPhone|iPod|iPad)/i)) {
		$('label[for]').click(function () {
			var el = $(this).attr('for');
			if ($('#' + el + '[type=radio], #' + el + '[type=checkbox]').attr('selected', !$('#' + el).attr('selected'))) return;
			else $('#' + el)[0].focus();
		});
	}
	
	// Setup character limit fields
	$("input[data-blain-charlimit], textarea[data-blain-charlimit]").keypress(function(e) {
		var elem = $(this),
			charlimit = elem.data('blain-charlimit'),
			curlength = elem.val().length,
			remaining = charlimit - curlength;
		if (remaining <= 0) return false;
	}).keyup(function(e) {
		var elem = $(this),
			charlimit = elem.data('blain-charlimit'),
			curlength = elem.val().length,
			remaining = charlimit - curlength,
			helper = elem.siblings('span.helper');
		if (remaining < 0) {
			var overage = Math.abs(remaining);
			elem.val(elem.val().substr(0, curlength - overage));
			remaining += overage; 
		}
		if (remaining <= 0) helper.addClass('red');
		else helper.removeClass('red');
		helper.text(remaining + ((remaining==1) ? ' character' : ' characters') + ' remaining');
	});
	
	// Home page carousel
	$("#hpcarousel").tinycarousel({display: 5});//.removeClass('preload');
	
	// Set up all page events
	Blain.Stores.init();
	Blain.Catalog.init();
	Blain.EAlerts.init();
	Blain.Customers.init();
	Blain.Cart.init();
	Blain.Checkout.init();
	Blain.PLCC.init();
	Blain.Careers.init();
	Blain.GiftCards.init();
	Blain.GiftReg.init();
	Blain.Modeling.init();
	Blain.Tires.init();
	Blain.Projects.init();
	Blain.Promotions.init();
	Blain.StorePage.init();
	Blain.StoreRegion.init();
	Blain.StoresAll.init();
	Blain.HS.init();
	
	$.trace('DOM ready events finished');
});

// Window onload handler
$(window).load(function() {
	
	// Initialize HawkSearch autocomplete
	Blain.HS.initAutoComplete();
	
	// Format read-review link, if present
	$("div.pr-snippet-read-reviews > a").click(function(e) {
		e.preventDefault();
		Blain.Catalog.showReviewTab();
	});
	
	// Change link on write-review link, if present
	$("div.pr-snippet-write-review > a, div.pr-snippet-write-first-review > a").click(function(e) {
		e.preventDefault();
		window.open($(this).attr('href').replace('http://www.farmandfleet.com', ''), 'Write Review');
	});
	
	// Enable display of social icons
	$("#socialicons, #socialicons2").css('visibility', '');
});