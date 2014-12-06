/* Listak LLC Business Intelligence (c)  */
/* Build Date 12/2/2014 5:17:54 AM */
/* Version v1 - Tue, 25 Nov 2014 14:48:00 GMT */

var _protocol = ("https:" == document.location.protocol) ? "https://" : "http://";



(function() {
    if (!window.jQuery) {
        var jq = document.createElement('script');
        jq.src = _protocol + 'ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
        jq.onload = jq.onreadystatechange = function() { if(window.jQuery && typeof (jq) !== 'undefined' && (!jq.readyState || /loaded|complete/.test(jq.readyState))) { jQuery.noConflict(); jq.onload = jq.readystatechange = null; jq=undefined; } };
        document.documentElement.children[0].appendChild(jq);
    }
})();


function _Utilities(){this.Protocol=null;this.AsyncManager=new AsyncManager();var _checkedCookieDomain=false;var _cookieDomain=null;var setupCallbackFunction=function(cb){var $callbackName='ltkCallback'+(Math.ceil(Math.random()*8999)+1000);window[$callbackName]=function(){try{cb.apply(this,arguments);}catch(ex){_ltk_util.submitException(ex,'Callback');}
try{window[$callbackName]=undefined;delete window[$callbackName];}
catch(ex){}};return $callbackName;};var __constructor=function(that){that.Protocol=(("https:"==document.location.protocol)?"https://":"http://");}(this);_Utilities.prototype.isValidCookieDomain=function(){if(!_checkedCookieDomain){if(window.location.host.toLowerCase().indexOf("localhost")>-1){_cookieDomain=null;}
else{var rdhRESM=window.location.host.match(/([\.]*[^\.]+\.(co\.uk|com|net|biz|org|co\.nz|info|jp|edu|mx|com\.br|es|ca|pro|co|au|de|com\.au|fr|eu)$)|(^localhost$)/gi);if(rdhRESM){if(rdhRESM[0].indexOf(".")!=0){_cookieDomain="."+rdhRESM[0];}
else{_cookieDomain=rdhRESM[0];}}else{_cookieDomain=undefined;}}
_checkedCookieDomain=true;}
return _cookieDomain!==undefined;};_Utilities.prototype.getCookieDomain=function(){return this.isValidCookieDomain()?_cookieDomain:window.location.host;};_Utilities.prototype.getCookie=function(c_name){c_name=_ltk_util.trim(c_name);if(document.cookie.length>0){c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));}}
return"";};_Utilities.prototype.setCookie=function(n,v,e,d,p,s){var cookieValues=[_ltk_util.trim(n)+"="+encodeURIComponent(v)];if(typeof e!=='undefined'&&e!=null){var _exd=e;if(!(e instanceof Date)){_exd=new Date();_exd.setDate(_exd.getDate()+e);}
cookieValues.push("expires="+_exd.toGMTString());}
if(typeof d!=='undefined'&&d!=null)
cookieValues.push("domain="+d);if(typeof p!=='undefined'&&p!=null)
cookieValues.push("path="+p);if(typeof s!=='undefined'&&s)
cookieValues.push("secure");var myCookie=cookieValues.join("; ");document.cookie=myCookie;};_Utilities.prototype.cookiesEnabled=function(){var _dt=new Date();_dt.setSeconds(_dt.getSeconds()+180);_ltk_util.setCookie("checkCookies","enabled",_dt,null,"/",null);var _enabled=_ltk_util.getCookie("checkCookies")=="enabled";if(_enabled)
_ltk_util.setCookie("checkCookies","enabled",new Date(1970,1,1,0,0,0),null,"/",null);return _enabled;};_Utilities.prototype.getJSONWithCallback=function(url,callback){var $url=url;if(url.indexOf('callback=?')!=-1){$url=url.replace('callback=?','callback='+setupCallbackFunction(callback));}
else if(url.indexOf('callback=')==-1){var $index=url.indexOf('?');if($index!=-1){$url=url.substring(0,$index+1)+'callback='+setupCallbackFunction(callback)+'&'+url.substring($index+1);}
else{$url=url+'?callback='+setupCallbackFunction(callback);}}
var req=document.createElement('script');req.src=$url;req.type='text/javascript';req.async=true;var el=document.getElementsByTagName('script')[0];el.parentNode.insertBefore(req,el);};_Utilities.prototype.submitException=function(ex,info){this.AsyncManager.StartAsyncCall('submitException',function(){try{_ltk.Exception.Submit(ex,info);}
catch(ex){}},this,['_ltk']);};_Utilities.prototype.querySelectorAll=(function(){function qsaIE(element,selector){var head=element.documentElement.firstChild;var styleTag=element.createElement("STYLE");head.appendChild(styleTag);element.arrayOfSelectorNodes=[];styleTag.styleSheet.cssText=selector+"{x:expression(document.arrayOfSelectorNodes.push(this))}";window.scrollBy(1,0);head.removeChild(styleTag);window.scrollBy(-1,0);return element.arrayOfSelectorNodes;}
function qsaCurrent(element,selector){return element.querySelectorAll(selector);}
return document.querySelectorAll?qsaCurrent:qsaIE;})();_Utilities.prototype.trim=function(string){if(string){if(!String.prototype.trim)
return string.replace(/^\s+|\s+$/g,'');else
return string.trim();}};_Utilities.prototype.extend=function extend(a,b){for(var key in b)
if(b.hasOwnProperty(key))
a[key]=b[key];return a;};_Utilities.prototype.getQuerystringValue=function(name){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(results==null)
return"";else
return results[1];}}
var _ltk_util=new _Utilities();var jQueryLoadCall=_ltk_util.AsyncManager.StartAsyncCall('jQuery');var _jQueryLoadInterval=setInterval(function(){if(!window.jQuery){return;}
clearInterval(_jQueryLoadInterval);_ltk_util.AsyncManager.CallComplete('jQuery');},100);var ltkLoadCall=_ltk_util.AsyncManager.StartAsyncCall('_ltk');var _ltkLoadInterval=setInterval(function(){if(!window._ltk){return;}
clearInterval(_ltkLoadInterval);_ltk_util.AsyncManager.CallComplete('_ltk');},100);LTK.prototype.cookie=function(key,value,options){if(arguments.length>1&&String(value)!=="[object Object]"){options=_ltk_util.extend({},options);if(value===null||value===undefined){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var result,decode=options.raw?function(s){return s;}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;};LTK.prototype.isValidEmail=function(email){var watermarkFilter=new Array();var isWatermark=false;var emailFilter=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;watermarkFilter=["user@example.com","email@example.com","customer@example.com","user@domain.com","email@domain.com","customer@domain.com"];for(var i=0;i<watermarkFilter.length;i++){if(watermarkFilter[i]===email)
isWatermark=true;}
if(!emailFilter.test(email)||isWatermark)
return false;else
return true;};if(!LTK.prototype.browser){ua=navigator.userAgent.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];matched={browser:match[1]||"",version:match[2]||"0"};browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}
if(browser.chrome){browser.webkit=true;}else if(browser.webkit){browser.safari=true;}
LTK.prototype.browser=browser;if(typeof _ltk!='undefined')
_ltk.browser=browser;}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){var i,pivot=(fromIndex)?fromIndex:0,length;if(!this){throw new TypeError();}
length=this.length;if(length===0||pivot>=length){return-1;}
if(pivot<0){pivot=length-Math.abs(pivot);}
for(i=pivot;i<length;i++){if(this[i]===searchElement){return i;}}
return-1;};}
if(!Array.prototype.filter){Array.prototype.filter=function(filter,that){var other=[],v;for(var i=0,n=this.length;i<n;i++)
if(i in this&&filter.call(that,v=this[i],i,this))
other.push(v);return other;};}
if(typeof JSON!=='object'){JSON={};}
(function(){'use strict';function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf();};}
var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());




function AsyncManager(){this.Calls=[];AsyncManager.prototype.StartAsyncCall=function(callName,delegate,delegateObject,callsToWaitFor,timeoutInMilliseconds){try{var call=new AsyncCall(callName,delegate,delegateObject,callsToWaitFor,this);this.Calls.push(call);if(delegate===undefined){call.InProgress=true;}else{if(timeoutInMilliseconds!==undefined){var startTimeout=function(call){setTimeout(function(){if(!call.InProgress){call.InProgress=true;call.Delegate.call(call.DelegateObject||this);call.Complete();}},timeoutInMilliseconds);};startTimeout(call);}
this.CheckWait(call);}
return call;}
catch(ex){_ltk_util.submitException(ex,'AsyncManager.StartAsyncCall');return null;}};AsyncManager.prototype.CallComplete=function(callName){try{for(var c=0;c<this.Calls.length;c++){if(this.Calls[c].Name==callName){this.Calls[c].InProgress=false;this.Calls[c].IsComplete=true;this.Calls.splice(c,1);break;}}
this.CheckAllWaits();}
catch(ex){_ltk_util.submitException(ex,'AsyncManager.CallComplete');return null;}};AsyncManager.prototype.IsCallQueued=function(callName){for(var c=0;c<this.Calls.length;c++){if(this.Calls[c].Name==callName){return true;}}
return false;};AsyncManager.prototype.CheckWait=function(call){if(call.InProgress){return;}
var keepWaiting=false;for(var n=0;n<call.CallsToWaitFor.length;n++){if(this.IsCallQueued(call.CallsToWaitFor[n])){keepWaiting=true;break;}}
if(!keepWaiting){call.InProgress=true;var execute=function(call){setTimeout(function(){call.Delegate.call(call.DelegateObject||this);call.Complete();},0);};execute(call);}};AsyncManager.prototype.CheckAllWaits=function(){for(var c=0;c<this.Calls.length;c++){this.CheckWait(this.Calls[c]);}};}
function AsyncCall(callName,delegate,obj,callsToWaitFor,manager){this.Name=callName;this.Delegate=delegate;this.DelegateObject=obj;this.CallsToWaitFor=callsToWaitFor;this.InProgress=false;this.IsComplete=false;AsyncCall.prototype.Complete=function(){manager.CallComplete(this.Name);};}


LTK.prototype.moduleList = ['PCO', 'SCA', 'PPE', 'LCG', 'BIS', 'BNA'];

function LTK(){this.Session=new _Session();this.SCA=new SessionTracker();this.Order=new _Order();this.Items=new Array();this.Products=new Array();this.Customer=new _Customer();this.Client=new _Client();this.TRKT=new _TRKT();this.Subscriber=new _LTKSubscriber();this.Assembler=new _Assembler();this.Click=new _LTKClick();this.Exception=new _LTKException();this.TransactionIDs=new Array();this.Alerts=new _Alerts();

LTK.prototype.Submit=function(){try{this.TRKT.T=this.GetCookie("_trkt");this.TRKT.Event='t';this.Order.SetSessionID();this.PostData();}
catch(ex){this.Exception.Submit(ex,'Submit and Post Data');}}
LTK.prototype.PostData=function(uid){_ltk_util.AsyncManager.StartAsyncCall('submitConversion',function(){try
{this.Assembler.QueryHeader="ctid="+this.Client.CTID+(this.Client.DebugMode?"&debugmode=true":"")+"&uid="+this.uuidCompact()+"&gsid="+_ltk.Session.GlobalID;this.Assembler.AddObject(this.Order);this.Assembler.AddObject(this.TRKT);this.Assembler.AddObject(this.Customer);this.Assembler.AddArrayObject(this.Items);this.Assembler.AddArrayObject(this.Products);this.Assembler.Flush();}
catch(ex){this.Exception.Submit(ex,'Posting Data');}},this,[_ltk.Session.GlobalIDAsyncCallName]);}
LTK.prototype.RandomString=function(length){var text="";var possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var i=0;i<length;i++)
text+=possible.charAt(Math.floor(Math.random()*possible.length));return text;}
LTK.prototype.uuidCompact=function(){var id=this.generateUUID();try{this.TransactionIDs.push(id);}
catch(ex){}
return id;};LTK.prototype.generateUUID=function(){var id='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16);}).toUpperCase();return id;};LTK.prototype.GetCookie=function(sName){var sRE="(?:; )?"+sName+"=([^;]*);?";var oRE=new RegExp(sRE);if(oRE.test(document.cookie)){return decodeURIComponent(RegExp["$1"]);}else{return null;}}}
function _Order(){this._type='o';this.UID=null;this.OrderNumber=null;this.OrderTotal=null;this.TaxTotal=null;this.ShippingTotal=null;this.HandlingTotal=null;this.ItemTotal=null;this.Currency=null;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this.SessionID=null;this.Source=null;this._varmap={'_type':'_t','UID':'uid','OrderNumber':'on','OrderTotal':'ot','TaxTotal':'tt','ShippingTotal':'st','HandlingTotal':'ht','ItemTotal':'it','Currency':'c','Meta1':'m1','Meta2':'m2','Meta3':'m3','Meta4':'m4','Meta5':'m5','SessionID':'s','Source':'sr'};_Order.prototype.SetSessionID=function(){try{if(this.OrderNumber!=null)
this.SessionID=_ltk.SCA.sessionID;}
catch(ex){_ltk.Exception.Submit(ex,'OrderSetSession');}}
_Order.prototype.SetCustomer=function(email,firstname,lastname){_ltk.Customer.Email=email;_ltk.Customer.FirstName=firstname;_ltk.Customer.LastName=lastname;}
_Order.prototype.Submit=function(){_ltk.Submit();}
_Order.prototype.AddItem=function(id,quantity,price){try{var _item=new this.Item(id,quantity,price);_ltk.Items.push(_item);}
catch(ex){_ltk.Exception.Submit(ex,'Add Item');}}
_Order.prototype.AddItemEx=function(item){try{_ltk.Items.push(item);}
catch(ex){_ltk.Exception.Submit(ex,'Add Item Ex');}}
_Order.prototype.Item=function(id,quantity,price){this._type='i';this.UID=null;this.ID=id;this.Name=null;this.Quantity=quantity;this.Price=price;this.RowID=null;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this._varmap={'_type':'_t','UID':'uid','ID':'id','Name':'n','Quantity':'q','Price':'p','RowID':'ri','Meta1':'m1','Meta2':'m2','Meta3':'m3','Meta4':'m4','Meta5':'m5'};}}
function _TRKT(){this._type='tt';this.UID=null;this.T=null;this.Event=null;this._varmap={'_type':'_t','UID':'uid','T':'t','Event':'e'};}
function _Product(id,_name,price,imageUrl,itemUrl,description,masterSku,reviewProductID){this._type='p';this.UID=null;this.ID=id;this.Name=_name;this.Price=price;this.ImageUrl=imageUrl;this.ItemUrl=itemUrl;this.Description=description;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this.MasterSku=typeof masterSku=="undefined"?null:masterSku;this.ReviewProductID=typeof reviewProductID=="undefined"?null:reviewProductID;this.Discontinued=null;this._varmap={'_type':'_t','UID':'uid','ID':'id','Name':'n','Price':'p','ImageUrl':'imu','ItemUrl':'itu','Description':'d','Meta1':'m1','Meta2':'m2','Meta3':'m3','Meta4':'m4','Meta5':'m5','MasterSku':'ms','ReviewProductID':'rpi','Discontinued':'ds'};_Product.prototype.Add=function(){try{_ltk.Products.push(this);}
catch(ex){_ltk.Exception.Submit(ex,'Add Product');}}}
function _Customer(){this._type='c';this.UID=null;this.Email=null;this.FirstName=null;this.LastName=null;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this._varmap={'_type':'_t','UID':'uid','Email':'e','FirstName':'fn','LastName':'ln','Meta1':'m1','Meta2':'m2','Meta3':'m3','Meta4':'m4','Meta5':'m5'};}
function _Client(){this.CTID=null;this.DebugMode=false;}
function _Assembler(){this.QueryHeader=null;this.QueryMode=0;this.EndPointArray=['s1.listrakbi.com/t','s2.listrakbi.com/t'];this.EndPointPath='/T.ashx';this.EndPointIndex=0;this.EnumIndex=0;this.MaxLength=950;this.Query='';this._protocol=(("https:"==document.location.protocol)?"https://":"http://");_Assembler.prototype.Reset=function(){this.Query='';if(this.QueryMode==0){this.EnumIndex=0;}}
_Assembler.prototype.Append=function(obj){var q=this.BuildQuery(obj);var tq=this.Query+q;if(tq.length>this.MaxLength){this.Flush();q=this.BuildQuery(obj);}
this.Query+=q;if(this.QueryMode==0||obj._isIndexable){this.EnumIndex++;}}
_Assembler.prototype.Flush=function(){if(this.Query!=''){var src=this._protocol+this.EndPointArray[this.EndPointIndex]+this.EndPointPath+'?'+this.QueryHeader+this.Query;var img=new Image();img.height=1;img.width=1;img.src=src;this.IncrementEndPointIndex();this.Reset();}}
_Assembler.prototype.IncrementEndPointIndex=function(){this.EndPointIndex++;if(this.EndPointIndex==this.EndPointArray.length)
this.EndPointIndex=0;}
_Assembler.prototype.BuildQuery=function(obj){var i=-1;var query='';for(var key in obj){if(key=="_varmap"||typeof obj[key]=='function')continue;i++;if(typeof obj[key]=='undefined'||obj[key]==null||typeof obj._varmap[key]=='undefined'||obj[key]=='')continue;query+="&"+obj._varmap[key]+(this.QueryMode==0||obj._isIndexable?"_"+this.EnumIndex:"")+"="+encodeURIComponent(obj[key]);}
return query;}
_Assembler.prototype.AddObject=function(obj){if(typeof obj=='undefined'||obj==null||!this.HasValue(obj)||typeof(obj._varmap)=='undefined')return;this.Append(obj);}
_Assembler.prototype.AddArrayObject=function(obj){if(typeof obj=='undefined'||obj==null)return;for(var k in obj){this.AddObject(obj[k]);}}
_Assembler.prototype.HasValue=function(obj){if(typeof obj=='undefined'||obj==null)return false;if(typeof obj._varmap=='undefined'||obj._varmap==null)return false;var valueFound=false;for(var key in obj){if(key=="_varmap"||typeof obj[key]=='function'||key=='_type')continue;if(typeof obj[key]=='undefined'||obj[key]==null||typeof obj._varmap[key]=='undefined')continue;valueFound=true;}
return valueFound;}}
function _LTKException(){_LTKException.prototype.Submit=function(ex,info){var _endpoint='s1.listrakbi.com/t';var _protocol=(("https:"==document.location.protocol)?"https://":"http://");if(ex==null)return;var src=_protocol+_endpoint+'/EX.ashx?'+
((_ltk.Client.CTID==null)?'':'ctid='+_ltk.Client.CTID+'&')+'uid='+_ltk.uuidCompact()+'&'+'n='+encodeURIComponent(ex.name)+'&'+'m='+encodeURIComponent(ex.message)+'&'+
((info==null)?'':'i='+encodeURIComponent(info)+'&')+'h='+encodeURIComponent(document.location.href);var img=new Image();img.height=1;img.width=1;img.src=src;}}


function _LTKClick(){this._endpoint='s1.listrakbi.com/t';this._protocol=(("https:"==document.location.protocol)?"https://":"http://");this._rootHost=null;_LTKClick.prototype.SetCookie=function(n,v,e,d,p,s){var exd=new Date();exd.setDate(exd.getDate()+e);document.cookie=n+"="+encodeURIComponent(v)+
((e==null)?"":"; expires="+exd.toGMTString())+
((d==null&&d!="")?"":"; domain="+d)+
((p==null)?"":"; path="+p)+
((s)?"; secure":"");}
_LTKClick.prototype.Submit=function(){try{var hRES=/([\.]*[^\.]+\.(co\.uk|com|net|biz|org|co\.nz|info|jp|edu|mx|com\.br|es|ca|pro|co|au|de|com\.au|fr|eu)$)|(^localhost$)/gi;var hRE=new RegExp(hRES);var trkRES=/[?&]*trk_[^=&]+=/gi;var trkRE=new RegExp(trkRES);var hostfound=true;var hREMatch=document.location.host.match(hRE);var trkREMatch=document.location.search.match(trkRE);if(hREMatch){this._roothost=hREMatch[0];if(this._roothost.indexOf(".")!=0)this._roothost="."+this._roothost;}else hostfound=false;if(hostfound&&trkREMatch){this.SetCookie("_trkt",'0',365,this._roothost,"/",null);this.ScriptPostData(this._protocol+this._endpoint+'/CT.ashx?'+((_ltk.Client.CTID==null)?'':'ctid='+_ltk.Client.CTID+'&')+((_ltk.Client.DebugMode)?'debugmode=true&':'')+'uid='+_ltk.uuidCompact()+'&_t_0=cp&e_0=c&q_0='+encodeURIComponent(document.location.search)+'&_version=1');}}
catch(ex){_ltk.Exception.Submit(ex,'Submit Click');}}
_LTKClick.prototype.ScriptPostData=function(url){var script=document.createElement("script");script.setAttribute("src",url);script.setAttribute("type","text/javascript");document.body.appendChild(script);}
_LTKClick.prototype.CallBack=function(data){try{this.SetCookie("_trkt",data.token,365,this._roothost,"/",null);if(window.jQuery&&_ltk.browser.safari){jQuery("body").append('<iframe id="ctidf" name="ctidf" style="display:none;"></iframe><form id="ctidfr" enctype="application/x-www-form-urlencoded" action="'+this._protocol+this._endpoint+'/CTIDF.ashx" target="ctidf" action="post"><input type="hidden" name="trkt" id="trkt" value="'+data.token+'"/><input type="hidden" name="hctid" id="hctid" value="'+_ltk.Client.CTID+'"/></form>');jQuery("#ctidfr").submit();}}
catch(ex){_ltk.Exception.Submit(ex,'Click Callback');}}}


function _LTKSubscriber(){this.List=null;this.Settings=null;this.Email=null;this.UpdatedEmail=null;this.Profile=new _Profile();this._endpoint='s1.listrakbi.com/t';this._protocol=("https:"==document.location.protocol)?"https://":"http://";_LTKSubscriber.prototype.Submit=function(){var q='ctid='+_ltk.Client.CTID+'&uid='+_ltk.uuidCompact()+'&_t_0=s'+
(this.Email==null?'':'&e_0='+encodeURIComponent(this.Email))+
(this.UpdatedEmail==null?'':'&u_0='+encodeURIComponent(this.UpdatedEmail))+
(this.List==null?'':'&l_0='+encodeURIComponent(this.List))+
(this.Settings==null?'':'&s_0='+encodeURIComponent(this.Settings));if(this.Profile.Items.length>0){for(var i in this.Profile.Items){var p=this.Profile.Items[i];if(p.AttributeID!=null&&p.Value!=null){q+='&'+encodeURIComponent(p.AttributeID)+'_0='+encodeURIComponent(p.Value);}}}
var loc=this._protocol+this._endpoint+'/S.ashx?'+q;var img=new Image();img.width=1;img.height=1;img.src=loc;var subCookie=_ltk_util.getCookie("ltk-subscribed");if(subCookie){subCookie=subCookie.split(",");if(subCookie.indexOf(this.List)==-1)
subCookie.push(this.List);}
else{subCookie=new Array();subCookie.push(this.List);}
var _dt=new Date();_dt.setMonth(_dt.getMonth()+120);_ltk_util.setCookie("ltk-subscribed",subCookie,_dt,_ltk_util.getCookieDomain(),"/",null)}}
function _Profile(){this.Items=new Array();_Profile.prototype.Add=function(attr_id,value){var p=new _ProfileItem();p.AttributeID=attr_id;p.Value=value;this.Items.push(p);}}
function _ProfileItem(){this.AttributeID=null;this.Value=null;}

var _ltkwmt = '';
function isWatermark(wmt) {
    if(!_ltkwmt || _ltkwmt.length == 0) {
        return false;
    }
    if(_ltkwmt.indexOf(wmt) >= 0) { 
        return true; 
    }
    else { return false; }
}


function SessionTracker(){this.Assembler=new _Assembler();this.userData=new UserData;this.items=new Array();this.domain=null;this.sessionID;this.tid;this.clearCart=false;this.debug=false;this.FirstName=null;this.LastName=null;this.Email=null;this.Stage=null;this.OrderNumber=null;this.Total=null;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this.Token=null;this.CartLink=null;this.Source=null;this.trkt=null;this._varmap={'_type':'_st','Email':'e','FirstName':'fn','LastName':'ln','Meta1':'sm1','Meta2':'sm2','Meta3':'sm3','Meta4':'sm4','Meta5':'sm5','Stage':'st','OrderNumber':'on','Total':'tt','Token':'tk','Source':'sr','CartLink':'cl','NewCustomer':'nc','clearCart':'cc'};function UserData(){this._varmap={};}
SessionTracker.prototype.Load=function(trackerID){try{_ltk_util.AsyncManager.StartAsyncCall('scaGetTemplate');var sid=this.getCookie("STSID"+trackerID);this.tid=trackerID;this.trkt=this.getCookie("_trkt");this.debug=this.getCookie("STSD"+trackerID)=="1"?true:false;if(location.search.indexOf('__std=1')>0){this.debug=true;}
else if(location.search.indexOf('__std=0')>0){this.debug=false;}
_ltk_util.getJSONWithCallback(_protocol+"sca1.listrakbi.com/Handlers/GetTemplate.ashx?gsid="+_ltk.Session.GlobalID+"&_sid="+sid+"&_tid="+trackerID+"&_t="+new Date().valueOf()+"&callback=?",function(data){try{_ltk.SCA.domain=getCookieDomain();_ltk.SCA.sessionID=data.sessionID;_ltk.SCA.setCookie("STSD"+trackerID,_ltk.SCA.debug?"1":"0",365,_ltk.SCA.domain);_ltk.SCA.setCookie("STSID"+trackerID,data.sessionID,365,_ltk.SCA.domain);_ltk_util.AsyncManager.CallComplete('scaGetTemplate');if(_ltk.browser.safari){_ltk_util.AsyncManager.StartAsyncCall('scaGetTemplate-initSafari',function(){jQuery().ready(function(){try{jQuery("body").append('<iframe id="ifscasidframe" name="ifscasidframe" style="display:none;"></iframe>'+'<form id="ifscasidform" enctype="application/x-www-form-urlencoded" action="'+_protocol+'sca1.listrakbi.com/Handlers/CTID.ashx" target="ifscasidframe" action="post">'+'<input type="hidden" name="gsid" id="gsid" value="'+_ltk.Session.GlobalID+'"/>'+'<input type="hidden" name="ifscasid" id="ifscasid" value="'+_ltk.SCA.sessionID+'"/>'+'<input type="hidden" name="a" id="a" value="s"/>'+'<input type="hidden" name="tid" id="tid" value="'+_ltk.SCA.tid+'"/>'+'</form>');jQuery("#ifscasidform").submit();}
catch(ex){_ltk.Exception.Submit(ex,'ifscasid');}});},this,['jQuery']);}}
catch(ex){_ltk.Exception.Submit(ex,'GetTemplate Callback');}});}
catch(ex){_ltk.Exception.Submit(ex,'Load');}}
SessionTracker.prototype.SetSessionID=function(sessionID){_ltk_util.AsyncManager.StartAsyncCall('scaSetSessionID',function(){_ltk_util.setCookie("STSID"+this.tid,sessionID,365,_ltk_util.getCookieDomain());this.sessionID=sessionID;},this,['scaGetTemplate']);}
SessionTracker.prototype.SetCustomer=function(email,firstname,lastname){if(email){this.Email=email;}
if(firstname){this.FirstName=firstname;}
if(lastname){this.LastName=lastname;}}
SessionTracker.prototype.CaptureEmail=function(id){if(typeof id=="undefined"||id==""){return;}
try{_ltk_util.AsyncManager.StartAsyncCall('setupEmailCapture-'+id,function(){try{var _sl=jQuery("[id='"+id+"']");if(_sl.length==0){_sl=jQuery("input[name='"+id+"']");}
if(_sl.length){_sl.change(function(){if(jQuery(this).val().length>0&&!isWatermark(jQuery(this).val())&&_ltk.isValidEmail(jQuery(this).val())){_ltk.SCA.Update("email",jQuery(this).val());}});if(jQuery(_sl).val().length>0&&!isWatermark(jQuery(_sl).val())&&_ltk.isValidEmail(jQuery(_sl).val())){_ltk.SCA.Update("email",jQuery(_sl).val());}}}
catch(ex){_ltk.Exception.Submit(ex,'CaptureEmail');}},this,['jQuery']);}
catch(ex){_ltk.Exception.Submit(ex,'Init CaptureEmail');}}
SessionTracker.prototype.AddItem=function(sku,quantity,price,name){this.items.push(new SCAItem(sku,quantity,price,name));}
SessionTracker.prototype.AddItemWithLinks=function(sku,quantity,price,name,imageurl,linkurl){try{var _ni=new SCAItem(sku,quantity,price,name);_ni.ImageUrl=imageurl;_ni.LinkUrl=linkurl;this.items.push(_ni);}
catch(ex){_ltk.Exception.Submit(ex,'Add Item With Links');}}
SessionTracker.prototype.AddItemEx=function(item){this.items.push(item);}
SessionTracker.prototype.Update=function(k,v){try{_ltk_util.AsyncManager.StartAsyncCall('Update-'+k,function(){try{var _uimg=new Image();jQuery(_uimg).error(function(e){_ltk.Exception.Submit({name:"ex"},'Update Image');});_uimg.src=_protocol+'sca1.listrakbi.com/Handlers/Update.ashx?gsid='+_ltk.Session.GlobalID+'&_sid='+_ltk.SCA.sessionID+'&_uid='+_ltk.uuidCompact()+'&_tid='+_ltk.SCA.tid+"&"+k+"="+v+"&_t="+new Date().valueOf();}
catch(ex){_ltk.Exception.Submit(ex,'Update');}},this,['scaGetTemplate','scaSetSessionID',_ltk.Session.GlobalIDAsyncCallName]);}
catch(ex){_ltk.Exception.Submit(ex,'Init Update');}}
SessionTracker.prototype.SetData=function(k,v){if(v){this.userData[k.toLowerCase()]=v;if(!this.userData._varmap[k])this.userData._varmap[k]=k;}}
SessionTracker.prototype.ClearCart=function(){this.clearCart=true;this.Submit();}
SessionTracker.prototype.Submit=function(){try{_ltk_util.AsyncManager.StartAsyncCall('scaSubmit',function(){try{if(typeof this.sessionID=="undefined"){return;}
if(this.getCookie("_trkt")!=""){this.Token=this.getCookie("_trkt");}
this.Assembler=new _Assembler();this.Assembler.QueryMode=1;this.Assembler.EndPointArray=['sca1.listrakbi.com/','sca2.listrakbi.com/'];this.Assembler.EndPointPath='Handlers/Set.ashx';this.Assembler.QueryHeader='gsid='+_ltk.Session.GlobalID+'&_sid='+this.sessionID+'&_tid='+this.tid+'&_uid='+_ltk.uuidCompact();this.Assembler.AddObject(this);if(this.OrderNumber==null){this.Assembler.AddArrayObject(this.items);}
if(this.userData){this.Assembler.AddObject(this.userData);}
this.Assembler.Flush();if(this.OrderNumber!=null){_ltk.SCA.setCookie("STSID"+this.tid,"",-1,this.domain);try{if(window.jQuery&&_ltk.browser.safari){jQuery("body").append('<iframe id="ifscasidframec" name="ifscasidframec" style="display:none;"></iframe>'+'<form id="ifscasidformc" enctype="application/x-www-form-urlencoded" action="'+_protocol+'sca1.listrakbi.com/Handlers/CTID.ashx" target="ifscasidframec" action="post">'+'<input type="hidden" name="gsid" id="gsid" value="'+_ltk.Session.GlobalID+'"/>'+'<input type="hidden" name="ifscasid" id="ifscasid" value="'+_ltk.SCA.sessionID+'"/>'+'<input type="hidden" name="a" id="a" value="c"/>'+'<input type="hidden" name="tid" id="tid" value="'+_ltk.SCA.tid+'"/>'+'</form>');jQuery("#ifscasidformc").submit();}}
catch(ex){_ltk.Exception.Submit(ex,'ifscasidc');}}
this.Reset();}
catch(ex){_ltk.Exception.Submit('Submit');}},this,['scaGetTemplate','scaSetSessionID',_ltk.Session.GlobalIDAsyncCallName]);}
catch(ex){_ltk.Exception.Submit(ex,'Init Submit');}}
SessionTracker.prototype.getCookie=function(c_name){return _ltk_util.getCookie(c_name);}
SessionTracker.prototype.setCookie=function(c_name,value,expiredays,domain){_ltk_util.setCookie(c_name,value,expiredays,domain,'/');}
SessionTracker.prototype.Reset=function(){this.items=new Array();this.clearCart=false;}}
function SCAItem(sku,quantity,price,name){this.Sku=sku;this.Quantity=quantity;this.Price=price;this.Name=name;this.ImageUrl=null;this.LinkUrl=null;this.Size=null;this.Meta1=null;this.Meta2=null;this.Meta3=null;this.Meta4=null;this.Meta5=null;this._isIndexable=true;this._varmap={'_type':'_i','Sku':'s','Quantity':'q','Price':'p','Name':'n','ImageUrl':'iu','LinkUrl':'lu','Size':'sz','Meta1':'m1','Meta2':'m2','Meta3':'m3','Meta4':'m4','Meta5':'m5'};}
function getCookieDomain(){return _ltk_util.getCookieDomain();}


(function(){function ActivityTracker(){var activityArray=new Array(),recentlyViewedCookie="ltk-recentlyViewed",sessionViewedCookie="ltk-sessionViewed";function Identifiers(){this.SessionID=null;this.TrackingToken=null;this.ContactPID=null;this._varmap={'SessionID':'sid','TrackingToken':'trkt','ContactPID':'cpid'};}
function Activity(){this._type='at';this._isIndexable=true;this.Type=null;this.Key=null;this.Data=null;this._varmap={'_type':'_t','Type':'t','Key':'k','Data':'d'};}
function AddActivity(Type,Key,Data){var _activity=new Activity;_activity.Type=Type;_activity.Key=Key;if(typeof Data=="object"&&Data!=null){_activity.Data=JSON.stringify(Data);}
activityArray.push(_activity);}
function SetSkusCookie(cookieName,sku,isSessionCookie){var skus=GetSkusCookie(cookieName),_dt=null,skuLocation=-1;if(!skus)
skus=[];skuLocation=skus.indexOf(sku.toString());if(skuLocation>=0)
skus.splice(skuLocation,1);if(skus.length==25)
skus.shift();skus.push(sku);if(!isSessionCookie){_dt=new Date();_dt.setMonth(_dt.getMonth()+120);}
_ltk_util.setCookie(cookieName,skus,_dt,_ltk_util.getCookieDomain(),"/",null);}
function GetSkusCookie(cookieName){var skus=_ltk_util.getCookie(cookieName);if(skus)
skus=skus.split(",");return skus;}
this.AddProductBrowse=function(Sku,Data){if(typeof Sku=="string"){Sku=Sku.trim();if(Sku.length>0){AddActivity("ProductBrowse",Sku,Data);SetSkusCookie(recentlyViewedCookie,Sku,false);SetSkusCookie(sessionViewedCookie,Sku,true);}}};this.AddPageBrowse=function(Page,Data){var a=null;if(typeof Page=="object"&&typeof Data=="undefined"){Data=Page;Page=null;}
if(typeof Page=="undefined"||Page==null){a=document.createElement('a');a.href=window.location;Page=a.pathname;}
if(typeof Page=="string"){Page=Page.trim();if(Page.length>0){AddActivity("PageBrowse",Page,Data);}}};this.Submit=function(){if('False'.toLowerCase()!='true'||activityArray.length<1)
return;_ltk_util.AsyncManager.StartAsyncCall('submitActivity',function(){var assembler=null,identifiers=null;try{identifiers=new Identifiers();identifiers.TrackingToken=_ltk.GetCookie("_trkt");identifiers.ContactPID=_ltk.Session.ContactPID;identifiers.SessionID=_ltk.SCA.SessionID;if(identifiers.SessionID==null)
identifiers.SessionID=_ltk.GetCookie("STSID");assembler=new _Assembler();assembler.QueryMode=1;assembler.EndPointArray=new Array();assembler.EndPointArray.push('at1.listrakbi.com');assembler.EndPointPath='/Handlers/Set.ashx';assembler.QueryHeader='ctid=Z54tyR6S6u2x&uid='+_ltk.uuidCompact()+'&gsid='+_ltk.Session.GlobalID;assembler.AddObject(identifiers);assembler.AddArrayObject(activityArray);assembler.Flush();activityArray.length=0;}
catch(ex){_ltk.Exception.Submit(ex,'Submit');}},this,[_ltk.Session.GlobalIDAsyncCallName,'clickSubmit','scaGetTemplate']);};this.GetRecentlyViewedSkus=function(){return GetSkusCookie(recentlyViewedCookie);};this.GetSessionViewedSkus=function(){return GetSkusCookie(sessionViewedCookie);};}
LTK.prototype.Activity=new ActivityTracker();})();


function _Alerts(){this.Assembler=new _Assembler();this.Alert=new Array();this.MerchantTrackingID='';this._varmap={};}
function Alert(){this._type='al';this._isIndexable=true;this.Email='';this.Sku='';this.AlertCode='';this._varmap={'_type':'_t','Email':'e','Sku':'s','AlertCode':'ac'};}
_Alerts.prototype.AddAlert=function(Email,Sku,AlertCode){var _alert=new Alert;_alert.Email=Email;_alert.Sku=Sku;_alert.AlertCode=AlertCode;this.Alert.push(_alert);}
_Alerts.prototype.AddAlertEx=function(Alert){this.Alert.push(Alert);}
_Alerts.prototype.Load=function(){this.MerchantTrackingID='Z54tyR6S6u2x';}
_Alerts.prototype.Submit=function(){try{this.Load();this.Assembler=new _Assembler();this.Assembler.QueryMode=1;this.Assembler.EndPointArray=new Array();this.Assembler.EndPointArray.push('al1.listrakbi.com');this.Assembler.EndPointPath='/Handlers/Set.ashx';this.Assembler.QueryHeader='ctid='+this.MerchantTrackingID+'&uid='+_ltk.uuidCompact();this.Assembler.AddObject(this);this.Assembler.AddArrayObject(this.Alert);this.Assembler.Flush();this.Alert.length=0;}
catch(ex){_ltk.Exception.Submit(ex,'Submit');}}


function _Session(){this.GlobalID=null;this.GlobalIDAsyncCallName="getGlobalSessionID";this.ContactPID=null;var __construct=function(that){var gsid=_ltk_util.getCookie("_gsid");var gsidCall=_ltk_util.AsyncManager.StartAsyncCall(that.GlobalIDAsyncCallName);if(gsid!=null&&gsid!=""){that.GlobalID=gsid;gsidCall.Complete();}
else{try{_ltk_util.getJSONWithCallback(_ltk_util.Protocol+"s1.listrakbi.com/t/GSID.ashx",function(data){try{var _dt=new Date();_dt.setMonth(_dt.getMonth()+120);_ltk_util.setCookie("_gsid",data.gsid,_dt,_ltk_util.getCookieDomain(),"/",null);that.GlobalID=data.gsid;}
catch(ex){_ltk_util.submitException(ex,'GetGSID Callback');}
_ltk_util.AsyncManager.CallComplete(that.GlobalIDAsyncCallName);});}
catch(ex){_ltk_util.submitException(ex,'GetGSID');gsidCall.Complete();}}
var trk_contact=document.location.href.match(/[?&]trk_contact=([^&]*)/i);if(trk_contact!=null&&trk_contact.length>1){var _dt=new Date();_dt.setMonth(_dt.getMonth()+120);_ltk_util.setCookie("_cpid",trk_contact[1],_dt,_ltk_util.getCookieDomain(),"/",null);that.ContactPID=trk_contact[1];}
else{var cpid_cookie=_ltk_util.getCookie("_cpid");if(cpid_cookie)
that.ContactPID=cpid_cookie;}}(this);};

if(typeof _ltk == "undefined")
{
    var _ltk = new LTK();
    _ltk.Client.CTID = "Z54tyR6S6u2x";
    
    
    }

















var ltk_js_script_live = null;
var ltk_js_script_test = null;

if(typeof(ltk_js_script_test) == 'function' && /ltkjstestmode/gi.test(document.location.href))
{
    try
    {
        ltk_js_script_test();
    }
    catch(err)
    {
        _ltk.Exception.Submit(err, "JS Test Snippet exception");
    }
}
else if(typeof(ltk_js_script_live) == 'function')
{
    try
    {
        ltk_js_script_live();
    }
    catch(err)
    {
        _ltk.Exception.Submit(err, "JS Live Snippet exception");
    }
}

if (document.dispatchEvent)
{
    var customEvent = document.createEvent('Event');
    customEvent.initEvent('ltkAsyncListener', false, false);
    document.dispatchEvent(customEvent);
}
else if (document.fireEvent)
{
    document.documentElement.ltkAsyncProperty += 1;
}

