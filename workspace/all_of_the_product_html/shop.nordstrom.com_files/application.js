(function(){var a;
TFCApp={getRunMode:function(){return a
},RunModes:{dev:1,test:2,staging:3,prod:4},Constants:{RequestParameter:{UserCookie:"userCookie",Gender:"gender",Category:"category",IPS:"ips",FirstName:"firstName",OrderId:"orderid",StyleId:"styleid",StoreEmbedded:"storeEmbedded",Placement:"placement",ServiceMode:"serviceMode",UserId:"userid",DeviceType:"deviceType",MailboxId:"mailboxId",Locale:"locale",StoreRegistered:"storeRegistered",ProfileTarget:"profileTarget",OriginWidget:"originWidget"},CookieName:{UserCookie:"_tfcUserCookie",MailboxId:"_tfcMailboxId",UserVisit:"tfcUserVisit",UserSettings:"tfcUserSettings"},DeviceType:{Mobile:"mobile",Desktop:"desktop"}},analytics:{},component:{},tips:{},utility:{}};
a=(TFCApp.RunModes.prod||TFCApp.RunModes.dev)
})();
(function(f,m){var d,h,b,c,i,g,e,k,j,l,a;
d=(function(){var o,p=Object.prototype.toString,n=/^(?:body|html)$/i;
o={};
m.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(r,q){o["[object "+q+"]"]=q.toLowerCase()
});
return{_getWindow:function(q){return this.isWindow(q)?q:q.nodeType===9?q.defaultView||q.parentWindow:false
},_scroll:function(q,t,v,u,s){var r=this._getWindow(q);
if(t===undefined){return r?(v in r)?r[v]:r.document.documentElement[u]:q[u]
}if(r){r.scrollTo(!s?t:this.scrollLeft(q),s?t:this.scrollTop(q))
}else{q[u]=t
}},isWindow:function(q){return q!=null&&q==q.window
},position:function(u){var s=u[0],r=this.offsetParent(u),t=u.offset(),q=n.test(r[0].nodeName)?{top:0,left:0}:r.offset();
t.top-=parseFloat(m.css(s,"marginTop"))||0;
t.left-=parseFloat(m.css(s,"marginLeft"))||0;
q.top+=parseFloat(m.css(r[0],"borderTopWidth"))||0;
q.left+=parseFloat(m.css(r[0],"borderLeftWidth"))||0;
return{top:t.top-q.top,left:t.left-q.left}
},offsetParent:function(q){return q.map(function(){var r=this.offsetParent||document.body;
while(r&&(!n.test(r.nodeName)&&m.css(r,"position")==="static")){r=r.offsetParent
}return r||document.body
})
},scrollLeft:function(q,r){this._scroll(q,r,"pageXOffset","scrollLeft")
},scrollTop:function(q,r){this._scroll(q,r,"pageYOffset","scrollTop",true)
},type:function(q){return q==null?String(q):o[p.call(q)]||"object"
}}
})();
(function(){function o(s){var r,q;
if(s===undefined){return undefined
}r=s.split(".");
q=[];
m.each(r,function(t,u){q.push(parseInt(u))
});
return q
}function n(t,s){var q=new Array(t),r;
for(r=0;
r<t;
++r){q[r]=s
}return q
}function p(x,w){var u=x||n(w.length,0),t=w||n(x.length,Infinity),v,s=Math.max(u.length,t.length),r,q;
for(v=0;
v<s;
++v){r=u[v]||0;
q=t[v]||0;
if(r<q){return true
}else{if(r>q){return false
}}}return true
}h=function(q,s){var u=o(m.fn.jquery),r=o(q),t=o(s);
return p(r,u)&&p(u,t)
}
})();
c=function(q,o){var n=q.css(o),p=n?parseInt(n.replace("px","")):NaN;
return isNaN(p)?0:p
};
i=function(p,o){var n;
for(n in p){if(o(n,p[n])===false){break
}}return p
};
g=function(q){var n=c(q,"paddingLeft"),o=q.width(),p=c(q,"paddingRight");
return(n+o+p)
};
e=function(n){return(f.ExtLibs.type(n)==="array")
};
k=function(n){return(n&&f.ExtLibs.type(n)==="object"&&n.constructor===Object)
};
j=function(t){var p=c(t,"borderTopWidth"),q=c(t,"paddingTop"),n=t.height(),r=c(t,"fontSize"),s=c(t,"paddingBottom"),o=c(t,"borderBottomWidth");
if(r>n){n=r
}return(p+q+n+s+o)
};
l=function(n,s){var r=s?c(n,"marginLeft"):0,u=c(n,"borderLeftWidth"),q=c(n,"paddingLeft"),o=n.width(),p=c(n,"paddingRight"),v=c(n,"borderRightWidth"),t=s?c(n,"marginRight"):0;
return(r+u+q+o+p+v+t)
};
b=function(n){if(h(undefined,"1.4")&&!n){return m(" ")
}else{return m.apply(m,arguments)
}};
b.each=function(o,n){if(h(undefined,"1.2.6")){return i(o,n)
}else{return m.each(o,n)
}};
b.innerWidth=function(n){return m.fn.innerWidth?n.innerWidth():g(n)
};
b.isArray=function(n){return m.isArray?m.isArray(n):e(n)
};
b.isFunction=function(n){if(h(undefined,"1.2.6")){return this.type(n)==="function"
}else{return m.isFunction(n)
}};
b.isPlainObject=function(n){return m.isPlainObject?m.isPlainObject(n):k(n)
};
b.jqVersion=h;
b.outerHeight=function(n){return m.fn.outerHeight?n.outerHeight():j(n)
};
b.outerWidth=function(p,o){var n=o?o:false;
return m.fn.outerWidth?p.outerWidth(n):l(p,n)
};
b.position=function(n){return m.fn.position?n.position():d.position(n)
};
b.scrollTop=function(n,o){return m.fn.scrollTop?m(n).scrollTop(o):d.scrollTop(n,o)
};
b.type=function(n){return m.type?m.type(n):d.type(n)
};
f.ExtLibs=b
})(TFCApp,jQuery);
var TFCApp=TFCApp||{};
(function(){TFCApp.bind=function(c,b){if(typeof(c)!=="function"){throw"Cannot bind to non-function"
}var a=Array.prototype.slice.call(arguments,2);
return function(){var d=Array.prototype.slice.call(arguments);
return c.apply(b,a.concat(d))
}
}
})();
(function(i){var h=false,l=/xyz/.test(function(){xyz
})?/\b_super\b/:/.*/,n,d;
function e(){function o(){}return o
}function k(p){function o(){var q,r;
if(!h){q=new p();
if(q._constructor){q._constructor.apply(q,arguments)
}for(r in q){if(r.charAt(0)!=="_"&&typeof(q[r])==="function"&&r!=="constructor"){this[r]=i.bind(q[r],q)
}}}}return o
}function m(q,s,o){var r,p;
h=true;
r=new s();
h=false;
if(o){for(p in o.prototype){if(o.prototype.hasOwnProperty(p)){r[p]=o.prototype[p]
}}}for(p in q){if(q.hasOwnProperty(p)){r[p]=(o&&typeof(q[p])==="function"&&typeof(o.prototype[p])==="function"&&l.test(q[p]))?c(q[p],o.prototype[p]):q[p]
}}return r
}function g(o){var p;
h=true;
p=new o();
h=false;
return p
}function f(p){var r,q,o;
if(p&&typeof p==="string"&&p!==""){r=p.split(".");
q=window;
for(o=0;
o<r.length;
o++){if(r[o]===""){throw ("Invalid name space["+p+"]")
}q=q[r[o]]=q[r[o]]||{}
}return true
}return false
}function b(){var o=arguments.callee.caller.name;
if(o===undefined||o===""){o="[anonymous]"
}else{o='"'+o+'"'
}throw"Unimplemented abstract function "+o
}function c(p,o){return function(){var q,r=this._super;
this._super=o;
q=p.apply(this,arguments);
this._super=r;
return q
}
}function j(p,q){var r,s,o;
o=this;
s=e();
r=k(s);
r.prototype=g(o);
r.prototype.constructor=r;
s.prototype=m(q,r,p);
s.prototype.constructor=s;
r.extend=i.bind(j,r,s);
r.isSubClassOf=a;
return r
}function a(o){return this.prototype instanceof o
}n=e();
d=k(n);
n.prototype=m({destroy:function(){var p,o=this;
for(p in o){if(o.hasOwnProperty(p)){delete o[p]
}}}},d,null);
n.prototype.constructor=n;
d.createNameSpace=f;
d.unimplemented=b;
d.extend=i.bind(j,d,n);
d.isSubClassOf=a;
i.Class=d
})(TFCApp);
(function(g){var a=1,i=2,b=3,f=4,e=5,h=6,j=!!window.console;
function d(m,o,n,k,l){if(j&&c.level<=n){(console[m])(o+"  ["+k+"] "+l)
}}var c={getLogger:function(k){return{trace:g.bind(d,null,"log","TRACE",a,k),debug:g.bind(d,null,"log","DEBUG",i,k),info:g.bind(d,null,"info","INFO",b,k),warn:g.bind(d,null,"warn","WARN",f,k),error:g.bind(d,null,"error","ERROR",e,k)}
},level:(g.getRunMode()===g.RunModes.prod?h:e)};
g.utility.Logger=c
})(TFCApp);
(function(b){var a={analytics:{},component:{},utility:{},manager:{},view:{}};
window.TFPApp=a
})(TFCApp);
(function(e,c){var d=e.ExtLibs,a=e.util={},b=e.utility.Logger.getLogger("TFCUtil");
a.stringify=function(f){var g;
if(f instanceof c){g="jQuery"
}else{if(d.type(f)==="array"){g="["+c.map(f,function(h){return a.stringify(h)
}).join(", ")+"]"
}else{if(d.type(f)==="object"){g="";
a.each(f,function(h,i){g+=","+h+":"+a.stringify(i)
});
return"{"+g.substring(1)+"}"
}else{if(d.type(f)==="function"){g="function"
}else{g=String(f)
}}}}return g
};
a.stringToBool=function(f){return(f==="true")
};
a.createElement=function(f,h){if(d.type(f)==="string"&&(c.trim(f)!=="")){var j=c.trim(f),g=d(document.createElement(j)),i=(d.type(h)==="object")?h:{};
a.each(i,function(k,m){var l=m;
if((k.toLowerCase()==="class")&&(d.type(m)==="array")){l=m.join(" ")
}g.attr(k,l)
});
return g
}else{return d()
}};
a.loadScript=function(f){c.ajax({url:f.url,dataType:"script",success:f.success,error:f.error,cache:(d.type(f.cache)==="boolean"?f.cache:true)})
};
a.getCookie=function(g){var f=null;
a.each(document.cookie.split("; "),function(k,m){var h=m.indexOf(g);
if(h>-1){var l=m.indexOf("=",h)+1;
var j=m.length;
if((l>0)&&(l<j)){f=m.substring(l,j);
return false
}}});
return f
};
a.setCookie=function(j,h){var g,i,k,f;
if(d.type(j)==="object"&&d.type(j.name)==="string"&&d.type(j.value)==="string"){if(h){a.deleteCookie({name:j.name,domain:""})
}g=j.name+"="+j.value;
i=(typeof(j.domain)==="string"?j.domain:a.parseParentDomain());
if(a.isNonZeroLengthString(i)&&i!=="localhost"){g+=";domain="+i
}k=a.isNonZeroLengthString(j.path)?j.path:"/";
g+=";path="+k;
f=parseInt(j.maxAge);
if(!isNaN(f)){g+=";max-age="+f;
if(f<=0){g+=";expires=Thu, 01 Jan 1970 00:00:00 GMT"
}}document.cookie=g
}};
a.deleteCookie=function(f){if(d.type(f)==="object"){a.setCookie({name:f.name,value:"",domain:f.domain,path:f.path,maxAge:0})
}};
(function(){var f,h,g;
f="\\[]{}()+*?!=^$,.-|:";
h="\\"+f.split("").join("\\");
g=new RegExp("(["+h+"])","g");
a.regexSafe=function(i){return i.replace(g,"\\$1")
};
f=h=null
})();
a.parseOrigin=function(f){return f.replace(/^\s*([^:]+:\/\/[^\/\?\#]*).*$/,"$1")
};
a.parseParentDomain=function(f){var h,g;
f=f||document.location.href;
h=a.parseOrigin(f).replace(/^[^:]+:\/\/\/?([^:]*)(:[0-9]+)?$/,"$1");
if(h===f){b.error("Could not parse domain from URL "+f);
return f
}g=/[^\.]+\.([^\.]{2}\.)?[^\.]+$/.exec(h);
if(!g){b.error("Could not parse parent domain from domain "+h);
return h
}return g[0]
};
a.isNonZeroLengthString=function(f){return((typeof(f)==="string")&&(f.length>0))
};
a.appendQueryParameter=function(f,g,h){var i=f.indexOf("?")>-1?"&":"?";
if(a.isNonZeroLengthString(h)){f+=i+g+"="+h
}return f
};
a.chooseUri=function(f,g){return(("https:"===document.location.protocol)?f:g)
};
a.each=function(h,g){var f=d.isArray(h);
return d.each(h,function(i,j){if(f||h.hasOwnProperty(i)){return g(i,j)
}})
};
a.parseHtml=function(f){if(d.jqVersion("1.9")){return d(c.parseHTML(c.trim(f)))
}else{return d(f)
}};
a.isIE7=function(){return(d("<!--[if IE 7]>x<![endif]-->").text()==="x")
}
})(TFCApp,jQuery);
var TFCApp=TFCApp||{};
TFCApp.FitRecUtil={deparam:function(e){var d={},g=e.split("&");
for(var c=0,a=g.length;
c<a;
c++){var h=g[c].split("="),b,f;
if(h.length==2){b=decodeURIComponent(h[0]);
f=decodeURIComponent(h[1]);
d[b]=f
}}return d
},isIE7:(TFCApp.ExtLibs("<!--[if IE 7]>x<![endif]-->").text()==="x"),isIE8:(TFCApp.ExtLibs("<!--[if IE 8]>x<![endif]-->").text()==="x"),isMobileSafari:/mobile.+safari/i.test(navigator.userAgent),isIOS6_1_3:/OS 6_1_3/.test(navigator.userAgent),isIPad:/ipad/i.test(navigator.userAgent),animateFitScore:function(l,b,c,d){var h=c||500,k=this.fitDescription(b,d),e=TFCApp.ExtLibs(".tfc-fitrec-result",l),g=TFCApp.ExtLibs(".tfc-fit-score-description",e),j=TFCApp.ExtLibs(".tfc-fit-score",e),i=TFCApp.ExtLibs(".tfc-fit-score-background",e),f=TFCApp.ExtLibs(".tfc-fit-score-foreground",i),a=(TFCApp.ExtLibs.innerWidth(i)/5)*b;
g.text("");
j.text("");
f.css("width","");
if(this.recommended(b)){e.removeClass("not-recommended")
}else{e.addClass("not-recommended")
}f.animate({width:a},h,function(){setTimeout(function(){g.text(k)
},1);
j.animate({opacity:1},(h/2))
})
},exists:function(a){return a!=="undefined"&&a!=null?true:false
},fitDescription:function(b,a){switch(parseFloat(b)){case 5:case 4.5:case 4:return a["message.excellent.fit"];
case 3.5:case 3:return a["message.good.fit"];
case 2.5:case 2:case 1.5:case 1:case 0.5:case 0:return a["message.not.recommended"];
default:return""
}},logAnalytics:function(a,c,d){try{if(this.exists(a.googleAnalyticsKey)&&a.googleAnalyticsKey!=""){var b=jQuery,h=window._gaq||[];
if(!window._gaq){window._gaq=h
}if(a.profileDeviceType===TFCApp.Constants.DeviceType.Mobile){d="/mobile"+d
}h.push(["tfcTracker._setAccount",a.googleAnalyticsKey]);
h.push(["tfcTracker._setDomainName","none"]);
h.push(["tfcTracker._setAllowLinker",true]);
h.push(["tfcTracker._setCustomVar",1,"StoreTLA",a.storeKey,3]);
h.push(["tfcTracker._setCustomVar",2,"UXVersion",a.uxMarketingVersion,3]);
h.push(["tfcTracker._setCustomVar",3,"StoreVersion",a.storeMarketingVersion,3]);
h.push(["tfcTracker._setCustomVar",4,"TFPUserProfileComplete",c.isInitialProfileComplete,3]);
h.push(["tfcTracker._trackPageview",d]);
if(typeof _gat==="undefined"){var i=document.createElement("script"),j=document.getElementsByTagName("script")[0],g=TFCApp.ExtLibs("script#google-analytics");
if(g.length>0){g.remove();
j=document.getElementsByTagName("script")[0]
}i.async=true;
i.id="google-analytics";
i.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";
i.type="text/javascript";
j.parentNode.insertBefore(i,j)
}}}catch(f){try{console.log("Google analytics failed["+f+"]")
}catch(e){}}},recommended:function(a){return((typeof a!="undefined")&&(parseFloat(a)>=3))
},evalTemplate:function(a,d){var b,c,g="img[src]";
if(typeof(d)!=="boolean"){d=false
}if(typeof(a)==="string"){try{b=TFCApp.util.parseHtml(a)
}catch(f){}}if(b===undefined){b=TFCApp.ExtLibs()
}if(d){c=b.filter(g);
b.each(function(e,h){c=c.add(g,h)
});
c.each(function(j,h){var e=new Image();
e.src=TFCApp.ExtLibs(h).attr("src")
})
}return b
}};
(function(d,b){var c=function(e,f){if(arguments.length){this._constructor(e,f)
}};
var a=TFCApp.Class.extend({nameSpace:"plugin",name:"base",options:{},initialize:function(e){if(e){this.options=d.extend(true,this.options,e)
}this._initialize()
},option:function(e,f){if(typeof e==="string"){if(typeof f==="undefined"){return this.options[e]
}this.options[e]=f
}},_constructor:function(e,f){d.data(f,this.name,this);
this.element=d(f);
this.options=d.extend(true,{},this.options,e);
this._create();
this._initialize()
},_create:function(){},_destroy:function(){d.removeData(element,this.name)
},_initialize:function(){}});
b.plugin=function(h,f){var e,g=f||a;
if(typeof h._constructor!="undefined"){throw"Plugin construct method should never be overridden"
}TFCApp.Class.createNameSpace("TFCApp.plugin."+h.nameSpace+"."+h.name);
e=b.plugin[h.nameSpace][h.name]=g.extend(h);
d.fn[h.name]=function(k){var j=this,i;
k=k?k:{};
if(typeof k==="object"){this.each(function(){var l=d.data(this,h.name);
if(l){l.initialize(k)
}else{d.data(this,h.name,new e(k,this))
}})
}else{if(typeof k==="string"){if(k.charAt(0)=="_"){return j
}i=Array.prototype.slice.call(arguments,1);
this.each(function(){var l=d.data(this,h.name);
if(l&&d.isFunction(l[k])){var m=l[k].apply(l,i);
if(m!==undefined){j=m;
return false
}}})
}}return j
}
}
})(jQuery,TFCApp);
var TFCApp=TFCApp||{};
(function(){TFCApp.Signal=TFCApp.Class.extend({_constructor:function(){this._slots=[]
},listen:function(a){if(typeof(a)==="function"){this._slots.push(a)
}else{throw"Slot passed into Signal.listen must be a function"
}},trigger:function(){for(var a=0;
a<this._slots.length;
++a){this._slots[a].apply(null,arguments)
}},_slots:null})
})();
(function(h,n){var k,b,a,i,m,c,e,d,l,j,g=h.ExtLibs,f=h.util;
a=h.Class.extend({_constructor:function(p,q,o){this._type=p;
this.__not=!!q;
this.__optional=!!o
},not:function(){return new (this._class())(this._type,!this.__not,this.__optional)
},optional:function(){return new (this._class())(this._type,this.__not,true)
},test:function(o){return(this.__optional&&o===undefined)||(this.__not&&!this._test(o))||(!this.__not&&this._test(o))
},_test:function(o){h.Class.unimplemented()
},expected:function(){var o=(this.__not?"not ":"")+this._expected();
return(this.__optional?"optional("+o+")":o)
},_expected:function(){h.Class.unimplemented()
},_class:function(){h.Class.unimplemented()
},_type:null,__not:null,__optional:null});
i=a.extend({_test:function(o){return(g.type(o)===this._type)
},_expected:function(){return this._type
},_class:function(){return i
}});
e=i.extend({_constructor:function(p,q,o){this._super("number",q,o)
},_class:function(){return e
},fromString:function(p){b(k.String);
var o=parseFloat(p);
return(isFinite(o)?o:undefined)
}});
d=e.extend({_test:function(o){return(this._super(o)&&(o%1===0))
},_expected:function(){return"integer"
},_class:function(){return d
},fromString:function(p){b(k.String);
var o=this._super(p);
return(this._test(o)?o:undefined)
}});
l=i.extend({_constructor:function(p,q,o){this._super("boolean",q,o)
},_class:function(){return l
},fromString:function(o){b(k.String);
switch(o){case"true":return true;
case"false":return false
}return undefined
}});
j=i.extend({_constructor:function(p,q,o){this._super("string",q,o)
},_class:function(){return j
},fromString:function(o){b(k.String);
return o
}});
m=i.extend({_constructor:function(p,q,o){var r=g.isPlainObject(p);
if(r){f.each(p,function(u,s){if(!(s instanceof a)){r=false;
return false
}})
}if(!r){throw"ObjectType type argument must be a plain object with Type values"
}this._super(p,q,o)
},_test:function(o){var p=g.isPlainObject(o);
if(p){f.each(this._type,function(r,q){if(!q.test(o[r])){p=false;
return false
}})
}return p
},_expected:function(){var o=n.map(this._type,function(q,p){return p+":"+q.expected()
}).join(", ");
return"{"+o+"}"
},_class:function(){return m
}});
c=a.extend({_constructor:function(p,q,o){if(!g.isFunction(p)){throw"InstanceType type argument must be a function/constructor"
}this._super(p,q,o)
},_test:function(o){return(o instanceof this._type)
},_expected:function(){return"instance of "+(this._type.name||"anonymous")
},_class:function(){return c
}});
k={Null:new i("null"),Boolean:new l(),Number:new e(),Integer:new d(),String:new j(),Function:new i("function"),Array:new i("array"),PlainObject:new m({}),Object:function(o){return new m(o)
},Instance:function(o){return new c(o)
}};
b=function(){var o=arguments.callee.caller,q=o.arguments,p=o.name||"anonymous";
f.each(arguments,function(s,t){var r=q[s];
if(!(t instanceof a)){throw"Invalid argument passed to TFCApp.checkArgs"
}else{if(!t.test(r)){throw"Invalid argument passed to function ["+p+"] - expected type ["+t.expected()+"] but got ["+h.util.stringify(r)+"]"
}}})
};
h.type=k;
h.checkArgs=b
})(TFCApp,jQuery);
/*!
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,c,d,f){var i,g,e=0,a=100,h=!!d.postMessage;
function b(){var j,l,k=/^#?tfc\!([^\!]+)\!(.*)$/.exec(f.location.hash);
if(k){j=k[1];
l=k[2];
if(j in g){(g[j]).trigger({origin:j,data:l})
}f.location.hash=""
}}c.postMessage=function(n,p,o){var m,l,k;
if(!p){return
}n=typeof n==="string"?n:$.param(n);
o=o||parent;
if(h){o.postMessage(n,c.util.parseOrigin(p))
}else{if(p){function j(){m=c.util.parseOrigin(f.location.href);
o.location=p.replace(/#.*$/,"")+"#tfc!"+m+"!"+n
}l=(new Date()).getTime();
k=e+a;
if(k>l){e=k;
setTimeout(j,k-l)
}else{e=l;
j()
}}}};
c.receiveMessage=function(m,l){var k,j;
if(!$.isFunction(m)||typeof(l)!=="string"){return
}if(h){k=function(n){if(n.origin!==l){return false
}m(n)
};
if(d.addEventListener){d.addEventListener("message",k,false)
}else{d.attachEvent("onmessage",k)
}}else{if(i===undefined){g={};
i=setInterval(b,a)
}j=g[l]=(g[l]||(new c.Signal()));
j.listen(m)
}}
})(jQuery,TFCApp,window,document);
(function(b){var a=b.Class.extend({setFirstPartyCookie:function(){b.Class.unimplemented()
}});
b.CookieHelper=a
})(TFCApp);
(function(a){a.KeyCodes={Enter:13}
})(TFCApp);
(function(c,b){function a(d){return this.keyup(function(f){if(f.which===c.KeyCodes.Enter){d.call(this,f)
}})
}b.fn.tfc_keyupenter=a
})(TFCApp,jQuery);
(function(i,o){var l=i.component,g=i.ExtLibs,e="tfc-button",n="next",j="disabled",b="selected",a="click",c="isclick",d="data-value",h="tfc_buttonclick";
var f={enable:function(p){g(p).removeClass(j)
},disable:function(p){g(p).addClass(j)
},select:function(p){g(p).addClass(b)
},deselect:function(p){g(p).removeClass(b)
},handleClick:function(p,q){if(!g(p).hasClass(j)){q()
}},initEvents:function(p){g(p).tfc_keyupenter(function(){g(this).click()
}).mousedown(function(){var q=g(this);
if(q.is(":focus")){q.addClass(a)
}else{q.data(c,true)
}}).focus(function(){var q=g(this);
if(q.data(c)){q.addClass(a);
q.removeData(c)
}else{q.removeClass(a)
}})
},isSelected:function(p){return g(p).hasClass(b)
},getDataValue:function(p){var q=g(p).attr(d);
return q?q:null
},getButtons:function(p){return g("."+e,p)
},getSelectedButtons:function(p){return g("."+e+"."+b,p)
},getNextButtons:function(p){return g("."+e+"."+n,p)
}};
function k(){var p=g(this);
f.handleClick(p,function(){p.trigger(h)
})
}function m(p){return this.each(function(){var q=g(this);
q.bind(h,p);
if(!q.data(h)){q.click(k).data(h,true)
}})
}o.fn[h]=m;
l.button=f
})(TFCApp,jQuery);
(function(i,l){var e="tfc-message-dialog",h="message",b="title",m="hide-title",g="close-button",d="yes-button",a="no-button",c="button-label",f=i.ExtLibs,k=i.type;
var j=i.Class.extend({_constructor:function(n){i.checkArgs(k.Object({button:k.PlainObject,$dialog:k.Instance(l).optional()}));
this._button=n.button;
f(i.bind(this._handleDomReady,this,n.$dialog))
},_handleDomReady:function(p){var r=i.bind(this._hideDialog,this),q,n,o,s;
this._$dialog=p=(p||f("body > ."+e));
if(p.length!==1||!p.hasClass(e)){throw"Invalid dialog element in TFCApp.component.MessageDialog"
}q=this._getCloseButton();
n=this._getYesButton();
o=this._getNoButton();
s=q.add(n).add(o);
s.tfc_buttonclick(r);
this._button.initEvents(s)
},showError:function(n){this._show(n,"error");
this._getCloseButton().focus()
},showConfirmationWithTitle:function(A,x,v,s,z){var n=this._getYesButton(),u=this._getNoButton(),p=f("."+c,n),w=f("."+c,u),t=p.html(),y=w.html(),q,o;
function r(C,D){function B(){if(l.isFunction(D)){D.apply(this,arguments)
}n.unbind("tfc_buttonclick",q);
u.unbind("tfc_buttonclick",o);
p.html(t);
w.html(y)
}C.tfc_buttonclick(B);
return B
}q=r(n,v.yes);
o=r(u,v.no);
if(s){p.html(s)
}if(z){w.html(z)
}this._showWithTitle(A,x,"confirmation");
u.focus()
},showConfirmation:function(o,n){this.showConfirmationWithTitle(o,"",n)
},_showWithTitle:function(q,r,o){var n=this._getMessage(),p=this._getTitle();
if(!r){o+=(" "+m)
}p.text(r);
n.text(q);
this._$dialog.attr("class",e).addClass(o).show()
},_show:function(o,n){this._showWithTitle(o,"",n)
},_hideDialog:function(){this._$dialog.hide()
},_getMessage:function(){return f("."+h,this._$dialog)
},_getTitle:function(){return f("."+b,this._$dialog)
},_getCloseButton:function(){return this._button.getButtons(this._$dialog).filter("."+g)
},_getYesButton:function(){return this._button.getButtons(this._$dialog).filter("."+d)
},_getNoButton:function(){return this._button.getButtons(this._$dialog).filter("."+a)
},_button:null,_$dialog:null});
j.getMessageDialog=function(n){i.checkArgs(k.Instance(l));
var o=f("."+e,n);
return(o.length===1?o:undefined)
};
i.component.MessageDialog=j
})(TFCApp,jQuery);
(function(d){var a=d.util,c=d.Constants.CookieName.MailboxId;
var b=d.Class.extend({_constructor:function(){this._tempId=this.getPersistentId()
},getPersistentId:function(){return a.getCookie(c)
},getTempId:function(){return this._tempId
},setTempId:function(e){if(e){this._tempId=e
}a.deleteCookie({name:c})
},save:function(){a.setCookie({name:c,value:this._tempId},true)
},_tempId:null});
d.MailboxHelper=b
})(TFCApp);
(function(a,d){var c=d.ExtLibs;
var b=function(e){var h=d.Attributes,m=d.Constants,i=d.util,k=h.getUserId(),l=d.util.getCookie(m.CookieName.UserCookie),f=i.chooseUri(e.serviceSecureURI,e.serviceURI),j=f+"/fitrec/"+e.storeKey+"/logout",g;
j=i.appendQueryParameter(j,m.RequestParameter.ServiceMode,e.serviceMode);
j=i.appendQueryParameter(j,m.RequestParameter.UserCookie,l);
j=i.appendQueryParameter(j,m.RequestParameter.UserId,k);
g=function(){tfc.calculate()
};
d.util.loadScript({url:j,cache:false,success:g,error:g})
};
d.FitRecService=function(g,q){var h,l=d.FitRecUtil,r=[],t=d.Constants,u=new d.MailboxHelper(),i=new d.UserVisitTracker(),k=new d.UserSettings(),n=false,m=[],v=true,s=d.utility.Logger.getLogger("FitRecService");
g.logOutOfTrueFit=d.bind(b,null,g);
g.mailboxHelper=u;
g.userVisitTracker=i;
g.userSettings=k;
(function(){function w(y,z,x){d.util.each(x,function(C,F){var B=y[C],D=c.type(B),A=c.type(F),E;
if(D!==A){s.error("Attempted to update config with an invalid type (key="+C+",oldType="+D+",newType="+A+")")
}else{if(A==="object"){w(B,z[C],F)
}else{if(C in z){E=z[C];
if(E===true||E(B,F)){y[C]=F
}else{s.error("Attempted to update config with an invalid value (key="+C+",oldValue="+B+",newValue="+F+")")
}}else{s.error("Attempted to update config setting that does not allow updating (key="+C+")")
}}}})
}d.updateConfig=d.bind(w,null,g,{tipConfig:{eventLevel:function(x,y){return d.tips.TipEventLevel[y]<=d.tips.TipEventLevel[x]
},pageLoads:true,hideDelay:true}})
})();
function f(y,w,x){if(w!==undefined){d.util.each(w,function(A,z){if(p(x.widget,y)==-1){x.widget.push(y)
}if(x[A]==undefined||x[A]==null){x[A]=z
}else{x[A]=x[A].concat(z)
}})
}return x
}function p(y,w){for(var z=0;
z<y.length;
z++){if(y[z]===w){return z
}}return -1
}function j(z){var B=new Array();
o:for(var A=0,D=z.length;
A<D;
A++){for(var w=0,C=B.length;
w<C;
w++){if(B[w]==z[A]){continue o
}}B[B.length]=z[A]
}return B
}if(!l.exists(g.profileURI)||!l.exists(g.serviceURI)||!l.exists(g.storeKey)){throw"Invalid TFC configuration entered."
}if(!(q instanceof d.analytics.AnalyticsManager)){throw"Analytics manager passed in must be of the type TFCApp.analytics.AnalyticsManager."
}d.util.each(d.widget,function(x,w){if(a.isFunction(w)&&w.isSubClassOf&&w.isSubClassOf(d.widget.BaseWidget)&&!w.isAbstract){r.push(new w(g))
}});
function e(){var w=m.shift();
n=false;
if(w!==undefined){tfc.calculate.apply(tfc,w)
}}a(window).bind("popstate",function(x){var w=x.originalEvent;
if(w.state&&w.state.tfcReload){tfc.calculate();
if(history&&history.state&&history.replaceState){history.replaceState(a.extend({},history.state,{tfcReload:false}))
}}});
this.calculate=function(L){var G,D,A,C={widget:[]},B=r,F={};
if(n){m.push(arguments);
return
}n=true;
A="/fitrec/"+g.storeKey+"/fit?javascriptIntegrated=true";
G=d.util.getCookie(t.CookieName.UserCookie);
if(c.type(G)==="string"){A+="&"+t.RequestParameter.UserCookie+"="+G
}D=u.getPersistentId();
if(c.type(D)==="string"){A+="&"+t.RequestParameter.MailboxId+"="+D
}var M=g.serviceMode;
if(c.type(M)==="string"){A+="&"+t.RequestParameter.ServiceMode+"="+M
}var J=d.Attributes.getLocaleId(L);
if(c.type(J)==="string"&&J!==""){A+="&"+t.RequestParameter.Locale+"="+J
}if(L){B=[];
d.util.each(r,function(O,P){d.util.each(L,function(Q,S){var R=P.widgetName||P.getWidgetName();
if(c(S).hasClass(R)){if(typeof F[R]=="undefined"){F[R]=[];
B.push(P)
}F[R].push(S)
}})
})
}var K=false;
d.util.each(B,function(O,Q){var P=Q.widgetName||Q.getWidgetName();
K=K||Q.isVisible();
C=f(P,Q.preCall(F[P]),C)
});
if(C.widget.length>0){d.util.each(C,function(Q,P){if(P instanceof Array){var R=j(P);
for(var O=0;
O<R.length;
O++){A+="&"+Q+"="+encodeURIComponent(R[O])
}}});
var z=d.util.chooseUri(g.serviceSecureURI,g.serviceURI);
var y=(g.uxVersion==="")?"0.0":g.uxVersion;
var x=(g.storeVersion==="")?"0.0":g.storeVersion;
var H=(c.type(J)==="string"&&J!=="")?"/"+J:"";
var I="/fitresources/"+g.storeKey+"/"+y+"/"+x+"/"+g.widgetDeviceType+H+"/templates.js";
var w=z+I;
var E=!this.templatesHelper.templates||J!=this.templatesHelper.locale;
if(E&&K){this.templatesHelper.init(J);
d.util.loadScript({url:w,cache:true})
}else{if(E&&!K){this.templatesHelper.init(null);
this.templatesHelper.setTemplates({})
}else{this.templatesHelper.reprocessTemplates()
}}var N=z+A;
d.util.loadScript({url:N,cache:false,error:e})
}};
this.event=function(y,w,x){d.util.each(r,function(z,B){var A=B.widgetName||B.getWidgetName();
if(A==y){B.event(w,x)
}})
};
this.templatesHelper={templates:null,callback:null,locale:null,init:function(w){this.templates=null;
this.callback=null;
this.locale=w
},reprocessTemplates:function(){this.callback=null;
if(this.templates){this.setTemplates(this.templates)
}},onTemplatesReady:function(w){if(this.templates){w(this.templates)
}else{this.callback=w
}},setTemplates:function(w){this.templates=w;
d.util.each(r,function(x,y){if(!y.templates){y.setTemplates(w)
}});
if(this.callback){this.callback(this.templates)
}}};
this.processTemplates=function(w){this.templatesHelper.setTemplates(w.templates)
};
this.process=function(w){this.templatesHelper.onTemplatesReady(function(x){var y=[];
u.setTempId(w.mailboxId);
d.util.each(r,function(A,C){var B=C.widgetName||C.getWidgetName();
if(l.exists(w[B])){var z=w[B];
z.tfpUser=w.tfpUser;
z.extraClasses=w.extraClasses;
C.postCall(z);
l.logAnalytics(g,w.tfpUser,"/fit/"+B);
q.handlePageLoad({pageName:B});
y.push(C.getWidgetName())
}});
if(v){i.trackVisits(y);
v=false
}e()
})
};
this.getProfileUrl=function(B){var x=g.profileURI+"/truefitprofile/"+g.storeKey+"/",C=d.util.getCookie(t.CookieName.UserCookie),D,A;
if(typeof(B)!=="object"){B={}
}function z(E){return((typeof(E)==="string")&&(E.length>0))
}function y(E,F){if(z(F)){x+="&"+E+"="+encodeURIComponent(F);
return true
}return false
}A=B.userId;
if(z(A)){x+=A
}else{D=d.Attributes.getUserId();
if(z(D)){x+=D
}}x+="?_="+(new Date()).getTime();
y(t.RequestParameter.UserCookie,C);
y(t.RequestParameter.DeviceType,g.profileDeviceType);
if(g.profileDeviceType===t.DeviceType.Mobile){y(t.RequestParameter.MailboxId,u.getTempId())
}y(t.RequestParameter.Gender,B.gender);
y(t.RequestParameter.Category,B.category);
y(t.RequestParameter.IPS,B.ips);
y(t.RequestParameter.FirstName,B.firstName);
y(t.RequestParameter.Placement,B.placement);
y(t.RequestParameter.ServiceMode,g.serviceMode);
y(t.RequestParameter.Locale,this.templatesHelper.locale);
y(t.RequestParameter.StoreRegistered,B.registered);
y(t.RequestParameter.ProfileTarget,B.profileTarget);
y(t.RequestParameter.OriginWidget,B.originWidget);
if(!y(t.RequestParameter.StyleId,B.styleId)){var w="."+d.widget.CatalogFitRecs.WIDGET_NAME+",."+d.widget.FitDetailsPrimary.WIDGET_NAME+",."+d.widget.ProductFitRecs.WIDGET_NAME;
c(w).each(function(){y(t.RequestParameter.StyleId,c(this).attr("id"))
})
}x+="#"+document.URL;
return x
};
this._fitrecs=function(){return h
};
this._widgets=r
}
})(jQuery,TFCApp);
TFCApp.Attributes={logger:TFCApp.utility.Logger.getLogger("Attributes"),FIRST_NAME:"data-x-firstname",GENDER:"data-gender",IPS:"data-ips",LOCALE:"data-locale",STYLE_ID:"data-styleid",USERID:"data-userid",USER_ID:"data-user-id",STORE_REGISTERED:"data-registered",PROFILE_TARGET:"data-profile-target",evaluateAttribute:function(g,e,f){var d,b=this.logger;
f=(TFCApp.getRunMode()!==TFCApp.RunModes.prod)&&f;
for(var c=0;
c<e.length;
c++){var a=e[c];
d=g.attr(a);
if((g.length>0)&&!((d==undefined)||(d==""))){if(f){g.each(function(){var h=TFCApp.ExtLibs(this).attr(a);
if(d!==h){b.error("All "+a+" values are not the same. Expected: "+d+", but got: "+h)
}})
}return d
}}return""
},getUserId:function(a){if(typeof a=="undefined"){a=TFCApp.ExtLibs("*["+this.USERID+"],*["+this.USER_ID+"]")
}return this.evaluateAttribute(a,[this.USERID,this.USER_ID],true)
},getLocaleId:function(a){if(typeof a=="undefined"||!a.attr){a=TFCApp.ExtLibs("*["+this.LOCALE+"]")
}return this.evaluateAttribute(a,[this.LOCALE],true)
}};
(function(c){var b=c.util;
var a=c.CookieHelper.extend({setFirstPartyCookie:function(d){b.setCookie(d,true)
}});
c.FitRecCookieHelper=a
})(TFCApp);
(function(c,e){var d=e.ExtLibs,a=e.utility.Logger.getLogger("True Fit Widget");
var b=e.Class.extend({abstractOnly:true,context:null,eventHash:null,internalOnly:false,templates:null,widgetName:null,isVisible:function(){e.Class.unimplemented()
},event:function(g,j){var i;
if(!this.internalOnly){if(typeof g==="string"){if(c.isFunction(j)){if(!(g in this.eventHash)){this.eventHash[g]=new e.Signal()
}this.eventHash[g].listen(j)
}else{i=this.eventHash[g];
if(i){var h=Array.prototype.slice.call(arguments,1);
try{i.trigger.apply(i,h)
}catch(f){a.error("Exception was thrown by retailer code when processing the ("+this.widgetName+","+g+") event: "+f)
}}}}}},getWidgetName:function(){return this.widgetName
},preCall:function(j){var f=this,h=e.Attributes,g={},i=e.Constants.RequestParameter,k=this._getNodesForPreCall(j);
if(k.length>0){g[this.widgetName]="true"
}k.each(function(){var l=d(this);
f._addParam(l,h.STORE_REGISTERED,i.StoreRegistered,g);
f._addParam(l,h.USER_ID,i.UserId,g);
f._addParam(l,h.USERID,i.UserId,g)
});
return g
},postCall:function(f){e.Class.unimplemented()
},setTemplates:function(f){if(f&&f[this.widgetName]){this.templates=f[this.widgetName]
}else{this.templates={}
}},_constructor:function(f){this.context=f;
this.eventHash={}
},_addParam:function(f,j,h,g){var i;
e.checkArgs(e.type.Instance(c),e.type.String,e.type.String,e.type.Instance(Object));
i=f.attr(j);
if(i){if(g[h]){g[h].push(i)
}else{g[h]=[i]
}}},_getNodesForPreCall:function(f){var g;
if(this.internalOnly){g=d(f)
}else{g=(f&&f.length>0)?d(f):this._getNodes()
}return g
},_getNodes:function(){return d("."+this.widgetName)
}});
e.widget=function(h,f){var g=f||b;
e.checkArgs(e.type.Object({abstractOnly:e.type.Boolean.optional(),name:e.type.String,nameSpace:e.type.String,widgetName:e.type.String}),e.type.Function.optional());
if(!h.widgetName||h.widgetName===""){throw"Widget name required and cannot be an empty string"
}e.Class.createNameSpace("TFCApp.widget."+h.nameSpace);
e.widget[h.name]=e.widget[h.nameSpace][h.name]=g.extend(h);
e.widget[h.name].isAbstract=!!h.abstractOnly;
e.widget[h.name].WIDGET_NAME=h.widgetName;
return e.widget[h.name]
};
e.widget.BaseWidget=b;
e.widget.BaseWidget.isAbstract=true
})(jQuery,TFCApp);
(function(b,c){var a=c.Class.extend({_constructor:function(d){this._sessionId=d
},show:function(f,h,g,d){if(h===undefined){h="tfpNotices"
}if(g===undefined){g=820
}if(d===undefined){d=600
}var e=window.open(f+(this._sessionId?";jsessionid="+this._sessionId:""),h,"menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=0,dependent=0,width="+g+",height="+d+",left=100,top=100");
return e
},_sessionId:null});
b.component.NoticePopup=a
})(TFPApp,TFCApp);
(function(d){var b=d.analytics,c=d.ExtLibs;
function a(e){if(c.type(e)!=="string"){throw"Event name must be a string"
}return{eventName:e}
}b.AnalyticsEvent=a
})(TFCApp);
(function(h){var b=h.analytics,d=h.ExtLibs,f=h.util,i=h.type,j=h.utility.Logger.getLogger("AnalyticsEngine");
function e(p,l,o){var n=null;
var m=p[l];
if(d.type(m)==="function"){n=m(o||{})
}else{if(m!==null&&m!==undefined){n=m
}}return n
}var g={};
var a={Loading:1,Success:2,Failure:3};
function c(n,l){if(l===a.Failure){j.error("Analytics script failed to load ["+n+"]")
}var m=g[n];
m.status=l;
m.signal.trigger(l);
delete m.signal
}var k=h.Class.extend({_constructor:function(m,l){var n;
h.checkArgs(i.Object({config:i.Object(l).optional(),enabled:i.Boolean.optional(),pages:i.PlainObject.optional(),events:i.PlainObject.optional()}));
this._config=m.config||{};
this._enableRecordings=(i.Boolean.test(m.enabled)?m.enabled:(h.getRunMode()===h.RunModes.prod));
this._pages=m.pages||{};
this._events=m.events||{};
this._queue=[];
this._scriptStatus=a.Loading;
this._onLoad=new h.Signal();
n=null;
if(this._enableRecordings){n=f.chooseUri(this._getSecureScriptUrl(),this._getScriptUrl())
}this._loadScript(n)
},_loadScript:function(n){if(n===null){setTimeout(h.bind(this._onScriptLoad,this,a.Success),1);
return
}var l,m;
if(n in g){l=g[n];
if(l.status!==a.Loading){setTimeout(h.bind(this._onScriptLoad,this,l.status),1)
}else{g[n].signal.listen(h.bind(this._onScriptLoad,this))
}}else{l=g[n]={status:a.Loading,signal:new h.Signal()};
l.signal.listen(h.bind(this._onScriptLoad,this));
m={url:n,success:h.bind(c,null,n,a.Success),error:h.bind(c,null,n,a.Failure)};
setTimeout(h.bind(h.util.loadScript,h.util,m),1)
}},_onScriptLoad:function(l){this._scriptStatus=l;
this._initEngine();
this._processQueue();
this._onLoad.trigger();
this._onLoad=null
},_processQueue:function(){if(this._scriptStatus===a.Success){h.util.each(this._queue,function(l,m){m()
})
}this._queue=null
},_initEngineImpl:function(){h.Class.unimplemented()
},_initEngine:function(){if(this._scriptStatus===a.Success&&this._enableRecordings){this._initEngineImpl()
}},_getEngineName:function(){h.Class.unimplemented()
},_getScriptUrl:function(){h.Class.unimplemented()
},_getSecureScriptUrl:function(){h.Class.unimplemented()
},_sendPageViewImpl:function(l){h.Class.unimplemented()
},_sendEventImpl:function(l){h.Class.unimplemented()
},_logRecording:function(l,m){var n;
if(this._enableRecordings){n="enabled"
}else{n="disabled"
}j.info(this._getEngineName()+"["+n+","+h.util.stringify(this._config)+"] -> "+l+"("+h.util.stringify(m)+")")
},_sendPageView:function(l){this._logRecording("PageView",l);
if(this._enableRecordings){this._sendPageViewImpl(l)
}},_sendEvent:function(l){this._logRecording("Event",l);
if(this._enableRecordings){this._sendEventImpl(l)
}},_lookupPageAnalytics:function(l,m){return e(this._pages,l,m)
},_lookupEventAnalytics:function(l,m){return e(this._events,l,m)
},_processWhenReady:function(l){if(this._scriptStatus===a.Success){l()
}else{if(this._scriptStatus===a.Loading){this._queue.push(l)
}}},pageView:function(l,n){var m=this._lookupPageAnalytics(l,n);
if(m!==null){this._processWhenReady(h.bind(this._sendPageView,this,m))
}},event:function(l,n){var m=this._lookupEventAnalytics(l,n);
if(m!==null){this._processWhenReady(h.bind(this._sendEvent,this,m))
}},onLoad:function(l){if(this._scriptStatus===a.Loading){this._onLoad.listen(l)
}else{l()
}},_config:null,_pages:null,_events:null,_queue:null,_onLoad:null,_scriptStatus:null,_enableRecordings:null});
b.AnalyticsEngine=k
})(TFCApp);
(function(e,d){var a=e.analytics,c=["BodyShapeDescriptionPage","ClosetItemMoreDetailPage"];
var b=e.Class.extend({_constructor:function(){this._engines=[];
this._lastPageName=null
},addEngine:function(f){if(f instanceof a.AnalyticsEngine){if(d.inArray(f,this._engines)===-1){this._engines.push(f)
}else{throw"Cannot add the same engine twice"
}}else{throw"Analytics engine must have type AnalyticsEngine"
}},handlePageLoad:function(g){var f=g.pageName;
if(f===this._lastPageName&&d.inArray(f,c)>=0){return
}this._lastPageName=f;
e.util.each(this._engines,function(h,j){j.pageView(f,g)
})
},handleEvent:function(g){var f=g.eventName;
e.util.each(this._engines,function(h,j){j.event(f,g)
})
},_engines:null,_lastPageName:null});
a.AnalyticsManager=b
})(TFCApp,jQuery);
(function(h,f){var e="optimizely",c=h.analytics,g=h.ExtLibs,d=h.type;
window[e]=window[e]||[];
var b={id:d.String,scriptUrl:d.String.optional(),targets:d.Array};
var a=c.AnalyticsEngine.extend({isActive:function(){return this._active
},_constructor:function(i){this._super(i,b);
this._id=this._config.id;
this._targets=this._config.targets
},_initEngineImpl:function(){if(h.getRunMode()===h.RunModes.dev){window[e].push(["log"])
}},_getEngineName:function(){return"A/B Testing"
},_getScriptUrl:function(){var i=this._config.scriptUrl;
return i?("http://"+i):null
},_getSecureScriptUrl:function(){var i=this._config.scriptUrl;
return i?("https://"+i):null
},_sendPageViewImpl:function(j){var i=this;
g(this._targets).each(function(l,k){if(k===j){i._activate()
}})
},_activate:function(){this._active=true;
window[e].push(["activate",this._id]);
this._active=false
},_active:null,_id:null,_targets:null});
c.ABTestingEngine=a
})(TFCApp,jQuery);
(function(e,f){var c=f.type,d=f.analytics,a,b={totalABTests:c.Integer};
a=d.AnalyticsEngine.extend({_constructor:function(g){this._super(g,b);
this._pageViewQueue=[];
this._loadedABTests=0;
this._totalABTests=this._config.totalABTests
},_initEngineImpl:function(){},_getEngineName:function(){return"ABTestCompleteEngine"
},_getScriptUrl:function(){return null
},_getSecureScriptUrl:function(){return null
},_sendPageViewImpl:function(g){if(this._loadedABTests===this._totalABTests){f.abTestComplete.trigger(g)
}else{this._pageViewQueue.push(g)
}},_sendEventImpl:function(){},incrementLoadedABTests:function(){if(++this._loadedABTests===this._totalABTests){e.each(this._pageViewQueue,function(g,h){f.abTestComplete.trigger(h)
});
this._pageViewQueue=null
}},_loadedABTests:null,_totalABTests:null,_pageViewQueue:null});
f.analytics.ABTestInterface=f.Class.extend({getEngines:function(){return this._engines.concat([this._abTestCompleteEngine])
},isActive:function(){var g=false;
f.util.each(this._engines,function(h,j){if(j.isActive()){g=true;
return false
}});
return g
},_getPageNames:function(){f.Class.unimplemented()
},_constructor:function(h){var g={},i=[],j;
f.util.each(this._getPageNames(),function(l,k){g[k]=k
});
f.util.each(h,function(k,m){var l=new d.ABTestingEngine({enabled:true,config:{id:m.id,scriptUrl:m.scriptUrl,targets:m.targets},pages:g});
i.push(l)
});
this._engines=i;
this._abTestCompleteEngine=j=new a({enabled:true,pages:g,config:{totalABTests:i.length}});
e.each(i,function(k,l){l.onLoad(f.bind(j.incrementLoadedABTests,j))
})
},_engines:null,_abTestCompleteEngine:null});
f.abTestComplete=new f.Signal()
})(jQuery,TFCApp);
(function(b,c){var a=c.analytics;
a.WidgetABTest=a.ABTestInterface.extend({_getPageNames:function(){var d=[],e;
c.util.each(c.widget,function(g,f){if(b.isFunction(f)&&f.isSubClassOf&&f.isSubClassOf(c.widget.BaseWidget)){e=f.WIDGET_NAME;
d.push(e)
}});
return d
}})
})(jQuery,TFCApp);
(function(f,c){var a=f.util,b=f.type,e=f.FitRecUtil;
var d=f.Class.extend({_constructor:function(g){f.checkArgs(b.Object({name:b.String,maxAge:b.Integer.optional(),types:b.PlainObject}));
this.__name=g.name;
this.__maxAge=g.maxAge;
this._data=this._read(g.types)
},_read:function(h){var g=a.getCookie(this.__name),i=(g?e.deparam(g):{}),j={};
f.util.each(i,function(m,n){var l=(h[m]||h._),k;
if(l){k=l.fromString(n);
if(k!==undefined){j[m]=k
}}});
return j
},_save:function(){a.setCookie({name:this.__name,value:c.param(this._data),maxAge:this.__maxAge},true)
},_data:null,__name:null,__maxAge:null});
f.CookieData=d
})(TFCApp,jQuery);
(function(g){var d={WidgetTipsAutomaticShown:"widget.tips.automatic.shown",WidgetTipsAutomaticXout:"widget.tips.automatic.xout",WidgetTipsRolloverXout:"widget.tips.rollover.xout"},f=31536000,c=g.type,b={},a={},e;
b[d.WidgetTipsAutomaticShown]={type:c.Boolean,defval:false};
b[d.WidgetTipsAutomaticXout]={type:c.Boolean,defval:false};
b[d.WidgetTipsRolloverXout]={type:c.Boolean,defval:false};
g.util.each(b,function(h,i){a[h]=i.type
});
e=g.CookieData.extend({_constructor:function(){this._super({name:g.Constants.CookieName.UserSettings,maxAge:f,types:a})
},get:function(i){g.checkArgs(c.String);
var j=this._data[i],k=a[i],h=b[i].defval;
if(h===undefined){throw"Attempt to retrieve a user setting that does not exist"
}return k.test(j)?j:h
},set:function(h,i){var j=a[h];
if(!j){throw"Attempt to save a user setting that does not exist"
}g.checkArgs(c.String,j);
this._data[h]=i;
this._save()
}});
e.keys=d;
g.UserSettings=e
})(TFCApp);
(function(d){var b=d.type,a=d.util;
var c=d.CookieData.extend({_constructor:function(){this._super({name:d.Constants.CookieName.UserVisit,types:{_:b.Integer}})
},getVisits:function(e){d.checkArgs(b.String);
return this._data[e]||0
},trackVisits:function(g){d.checkArgs(b.Array);
var e=this,f=this._data;
a.each(g,function(h,j){f[j]=e.getVisits(j)+1
});
this._save()
}});
d.UserVisitTracker=c
})(TFCApp);
(function(a){a.tips.TipEventLevel={automatic:3,rollover:2,click:1,off:0}
})(TFCApp);
(function(c,l){var d=c.ExtLibs,b=c.tips,e=c.type,p=c.UserSettings.keys,j="tfc-tip-click-open",r="tfc-tip-click-close",o="tfc-tip-rollover-open",k,i,a,g,h,m,q,f;
k=c.Class.extend({_constructor:function(s){c.checkArgs(e.Object({tipConfig:e.PlainObject,userSettings:e.Instance(c.UserSettings),userVisitTracker:e.Instance(c.UserVisitTracker),widgetName:e.String}));
this._options=s
},getEventLevel:function(){c.Class.unimplemented()
},_isEnabled:function(){c.Class.unimplemented()
},_beforeTipOpen:function(){},_bindEvents:function(u,t,s){c.Class.unimplemented()
},bindEvents:function(v,u,s){c.checkArgs(e.Instance(l),e.Function);
var t=this;
this._unbindEvents=this._bindEvents(v,u,function(w){if(t._isEnabled()){t._beforeTipOpen();
s(w)
}})
},unbindEvents:function(){if(this._unbindEvents){this._unbindEvents();
this._unbindEvents=null
}},_options:null,_unbindEvents:null});
i=k.extend({getEventLevel:function(){return b.TipEventLevel.click
},_isEnabled:function(){return true
},_bindEvents:function(w,u,t){var s=d("."+j,w);
function v(){u();
t([new m()])
}s.bind("click",v);
return function(){s.unbind("click",v)
}
}});
a=k.extend({getEventLevel:function(){return b.TipEventLevel.rollover
},_isEnabled:function(){return true
},_bindEvents:function(s,y,x){var A=d("."+o,s),z=d("."+j,s),B=this._options,t=new f({beforeTipClose:w});
function u(){t.unbindEvents();
y()
}function w(){z.unbind("click",u)
}function v(){z.bind("click",u);
x([new m({beforeTipClose:function(){B.userSettings.set(p.WidgetTipsRolloverXout,true);
w()
}}),t])
}A.bind("mouseenter",v);
return function(){A.unbind("mouseenter",v)
}
}});
g=k.extend({getEventLevel:function(){return b.TipEventLevel.automatic
},_isEnabled:function(){var s=this._options,t=s.userSettings;
return !t.get(p.WidgetTipsAutomaticShown)&&s.userVisitTracker.getVisits(s.widgetName)>=s.tipConfig.pageLoads
},_beforeTipOpen:function(){this._options.userSettings.set(p.WidgetTipsAutomaticShown,true)
},_bindEvents:function(s,A,y){var C=true,E=this._options,u=new q({hideDelay:E.tipConfig.hideDelay,beforeTipClose:x}),B=d("."+j,s),t=c.bind(u.disableClose,u),z=c.bind(u.enableClose,u),D;
function v(){u.unbindEvents();
A()
}function x(){B.unbind("click",v);
s.unbind("mouseenter",t);
s.unbind("mouseleave",z)
}function w(){B.bind("click",v);
s.bind("mouseenter",t);
s.bind("mouseleave",z);
y([new m({beforeTipClose:function(){E.userSettings.set(p.WidgetTipsAutomaticXout,true);
x()
}}),u])
}if(!this._eventInitializedOnce){this._eventInitializedOnce=true;
D=setTimeout(function(){d(function(){if(C){w()
}})
},1);
return function(){clearTimeout(D);
C=false
}
}},_eventInitializedOnce:false});
h=c.Class.extend({_constructor:function(s){c.checkArgs(e.Object({beforeTipClose:e.Function.optional()}).optional());
this._beforeTipCloseOption=(s&&s.beforeTipClose)
},bindEvents:function(v,u,t){c.checkArgs(e.Instance(l),e.Instance(l),e.Function);
var s=this;
this._unbindEvents=this._bindEvents(v,u,function(){s._beforeTipClose();
t()
})
},_beforeTipClose:function(){if(this._beforeTipCloseOption){this._beforeTipCloseOption()
}},_bindEvents:function(u,t,s){c.Class.unimplemented()
},unbindEvents:function(){if(this._unbindEvents){this._unbindEvents();
this._unbindEvents=null
}},_unbindEvents:null,_beforeTipCloseOption:null});
m=h.extend({_constructor:function(s){this._super(s);
c.checkArgs(e.Object({selector:e.String.optional()}).optional());
this._selector=((s&&s.selector)||("."+r))
},_bindEvents:function(w,v,u){var s=this._selector,t=d(s,w);
t.bind("click",u);
return function(){t.unbind("click",u)
}
},_selector:null});
q=h.extend({_constructor:function(s){this._super(s);
c.checkArgs(e.Object({hideDelay:e.Integer}));
this._hideDelay=s.hideDelay*1000;
this._enabled=true
},_bindEvents:function(w,v,t){var s=this,u=setTimeout(function(){if(s._enabled){t()
}else{s._onEnable=t
}},this._hideDelay);
return function(){clearTimeout(u)
}
},disableClose:function(){this._enabled=false
},enableClose:function(){this._enabled=true;
if(this._onEnable){this._onEnable();
this._onEnable=null
}},_hideDelay:null,_enabled:null,_onEnable:null});
function n(u,v,t){var z=u.offset(),x=z.left,w=z.top,y=d.outerWidth(u),s=d.outerHeight(u);
return(x<=v&&v<=x+y)&&(w<=t&&t<=w+s)
}f=h.extend({_bindEvents:function(v,u,s){function t(w){var y=w.pageX,x=w.pageY;
if(!(n(v,y,x)||n(u,y,x))){s()
}}v.bind("mouseleave",t);
return function(){v.unbind("mouseleave",t)
}
}});
b.PageLoadTipOpenTrigger=g;
b.MouseOverTipOpenTrigger=a;
b.ClickTipOpenTrigger=i;
b.ClickTipCloseTrigger=m
})(TFCApp,jQuery);
(function(o,c){var e="WidgetWithTips",k="main",g="tfc-widget-with-tips",l="tfc-tip",f="tfc-tip-enabled",a="tfc-tip-show-more",m="tfc-tip-click-show-more",s="tfc-tip-click-show-less",i="tfc-fitrec-result",n="tfc-tip-hide-prompt",r=15,h=c.ExtLibs,d=c.util,b=c.tips,j=c.type,q=c.UserSettings.keys;
function p(z,y){var B=z.offset(),x=B.left,D=h.outerWidth(z),t=h(window).width(),u=t-(x+D),A=r-x,w=r-u,C=parseInt(z.css("left"))||0;
function v(H,F,G,E,I){if(H+F<0){if(H>0){z.css(I,G+H)
}else{if(F>0){z.css(I,G-F)
}else{z.css(I,G-Math.min(-H,G-E))
}}}else{z.css(I,G+(H-F)/2)
}}y=j.Number.test(y)?y:C;
v(A,w,C,y,"left");
return y
}c.widget({abstractOnly:true,name:e,nameSpace:k,widgetName:g,isVisible:function(){return true
},_initTip:function(x){var w=h("."+l,x),u=this,v=true;
c.abTestComplete.listen(function(y){if(v&&y===u.getWidgetName()){v=false;
u._initTipOpenTriggers(x)
}});
function t(B){var A=w.height(),z=(B?"addClass":"removeClass"),y=(w[z])(a).height();
w.css("height",A);
w.animate({height:y,top:h.position(w).top+(A-y)},{duration:400,complete:function(){w.css("height","")
}}).css("overflow","visible")
}h("."+m,w).click(c.bind(t,null,true));
h("."+s,w).click(c.bind(t,null,false))
},_initTipOpenTriggers:function(t){var v=h("."+l,t),z=h("."+i,t),y=b.TipEventLevel[this.context.tipConfig.eventLevel],w=this.context.userSettings,C=o.extend({widgetName:this.getWidgetName()},this.context),u,x,A,B;
if(y&&(w.get(q.WidgetTipsAutomaticXout)||w.get(q.WidgetTipsRolloverXout))){y=b.TipEventLevel.click
}if(this.context.widgetDeviceType===c.Constants.DeviceType.Mobile){y=b.TipEventLevel.off
}A=(y?"addClass":"removeClass");
(z[A])(f);
if(v.length>0){B=[new b.PageLoadTipOpenTrigger(C),new b.MouseOverTipOpenTrigger(C),new b.ClickTipOpenTrigger(C)];
u=c.bind(this._launchTip,this,t,v,B);
x=c.bind(z.addClass,z,n);
d.each(B,function(D,E){if(y>=E.getEventLevel()){E.bindEvents(t,x,u)
}})
}},_launchTip:function(u,y,w,A){var B=new c.Signal(),z=c.bind(this._closeTip,this,u,y,A,B),v=h(window),x,t;
d.each(w,function(C,D){D.unbindEvents()
});
A.push(new b.ClickTipCloseTrigger({selector:".tfc-fitrec-register"}));
d.each(A,function(D,C){C.bindEvents(u,y,z)
});
y.hide().fadeIn(400);
y.css("top",-h.outerHeight(y));
x=p(y);
t=c.bind(p,null,y,x);
v.bind("resize",t);
B.listen(function(){v.unbind("resize",t)
})
},_closeTip:function(x,w,v,u){var t=this;
u.trigger();
d.each(v,function(z,y){y.unbindEvents()
});
w.fadeOut(400,function(){h("."+i,x).removeClass(n);
w.removeClass(a);
w.css("left","").css("top","");
t._initTipOpenTriggers(x)
})
}})
})(jQuery,TFCApp);
(function(p,a){var C={LogOut:"logout",OpenDialog:"opendialog",MoreInfo:"moreinfo",OpenRegistration:"openreg",Render:"render"};
var t={Error:"error",IncompleteGarment:"incompletegarment",IncompleteProfile:"incompleteprofile",InvalidDepartment:"invaliddepartment",InvalidGender:"invalidgender",NoUser:"nouser",NoStyle:"nostyle",NoStyleNoUser:"nostylenouser",Success:"success"};
var B={AnonymousNotRecommended:"anonymousnotrecommended",AnonymousRecommended:"anonymousrecommended",Error:"error",IncompleteGarment:"incompletegarment",IncompleteProfile:"incompleteprofile",InvalidDepartment:"invaliddepartment",InvalidGender:"invalidgender",NoUser:"nouser",NoStyle:"nostyle",NoStyleNoUser:"nostylenouser",NotRecommended:"notrecommended",Recommended:"recommended",RecommendedGarmentUserSizeOnly:"garmentusersizeonly",RecommendedGarmentSizeOnly:"garmentsizeonly",RecommendedUserSizeOnly:"usersizeonly"};
var x=C.OpenDialog,y=C.MoreInfo,D=C.OpenRegistration,o=C.Render,h="open-registration",A="tfc-fitrec-register",b="FitRecs",l="main",g="tfc-fitrec-base",j="tfc-fitrec-result",i=a.ExtLibs,e=a.FitRecUtil,r=a.Attributes,w=a.Signal,c=["id","status","score","priority","size","advice","recommended"],q=["isAuthenticated","isInitialProfileComplete","isLoggedOut","isUserAvailable"];
function k(F,E){return{ips:F.attr(r.IPS),profileTarget:F.attr(r.PROFILE_TARGET),firstName:E.attr(r.FIRST_NAME),gender:E.attr(r.GENDER),registered:E.attr(r.STORE_REGISTERED),styleId:E.attr(r.STYLE_ID)}
}function v(F,E){F(E)
}function z(G,F){var E={};
a.util.each(G,function(H,I){if(p.inArray(H,F)>=0){E[H]=I
}});
return E
}function s(E){return z(E,c)
}function u(E){return z(E,q)
}function f(E){return{fitRecommendations:p.map(E.fitRecommendations,s),tfpUser:u(E.tfpUser)}
}function n(F,E,G){return{element:F,fitRecommendation:s(E),response:G}
}function d(F){var E=i("."+a.widget.FitDetailsPopup.WIDGET_NAME,F);
if((E.length>0)&&(E.css("display")==="block")){E.attr("id",F.attr(r.STYLE_ID));
E.attr(r.FIRST_NAME,F.attr(r.FIRST_NAME));
E.attr(r.GENDER,F.attr(r.GENDER));
E.attr(r.USER_ID,F.attr(r.USER_ID));
tfc.calculate(E.get())
}}function m(F,E){F.stopPropagation();
d(E);
E.jqmShow();
return false
}a.widget({abstractOnly:true,$modalDialog:null,name:b,nameSpace:l,widgetName:g,isVisible:function(){return true
},event:function(E,F){if(E===y){E=x
}this._super(E,F)
},preCall:function(G){var F="style",E=this._super(G),H=this._getNodesForPreCall(G);
H.each(function(I){if(this.id!=""){if(E[F]==undefined||E[F]==null){E[F]=[]
}E[F].push(this.id)
}});
return E
},postCall:function(F){var I=F.fitRecommendations,G=F.extraClasses.join(" "),H={},K=f(F),E=this,L=E._getNodes(),J=false;
a.util.each(I,function(N,M){H[M.id]=M;
if(M.status===t.NoUser){J=true
}});
if(J){e.logAnalytics(E.context,F.tfpUser,"/fit/"+E.widgetName+"/nouser")
}L.each(function(M,N){E._renderResult(i(N),H[N.id],F,K,G)
});
E.event(o,{widgets:L.get(),response:K})
},setTemplates:function(E){this._super(E);
this.$modalDialog=e.evalTemplate(this.templates.dialog);
this.$modalDialog.hide()
},_initModal:function(G,F){var H=i("body"),E=this;
i("."+h,G).click(function(){G.jqmHide();
E.event(D,F)
});
i("."+A,G).click(function(){G.jqmHide();
v(E.context.launchAccountWindow,k(i(this),G))
});
G.jqm({modal:false,closeClass:"close-dialog",overlay:2,overlayClass:E.widgetName+"-dialog-overlay",toTop:true,onHide:function(I){I.o.remove();
I.w.remove()
}});
H.append(G)
},_renderResult:function(Q,F,H,E,R){var P=this,K,O,I,G;
if(typeof(F)!=="object"){return
}function J(){P.event(C.LogOut);
P.context.logOutOfTrueFit()
}I={"message.excellent.fit":H.excellentFitMessage,"message.good.fit":H.goodFitMessage,"message.not.recommended":H.notRecommendedMessage};
G=n(Q,F,E);
K=e.evalTemplate(P.templates[F.templateName]);
Q.html(K);
i("."+j,Q).addClass(R);
i(".turn-off-true-fit",Q).click(J);
i(".dialog-trigger",Q).click(function(S){var aa=Q.attr(r.FIRST_NAME),Y=Q.attr(r.GENDER),V=r.getUserId(Q),Z=P.$modalDialog.clone(),W=i(".dialog-body",Z),T=a.component.MessageDialog.getMessageDialog(Z),U=null;
if(T){U=new a.component.MessageDialog({$dialog:T,button:a.component.button})
}function X(){J();
Z.jqmHide()
}i(".turn-off-true-fit",Z).click(function(){if(U){U.showConfirmationWithTitle(H.turnOffMessage,H.turnOffTitle,{yes:X},H.turnOffYesHtml,H.turnOffNoHtml)
}else{X()
}});
i("."+j,Z).addClass(R);
Z.attr(r.FIRST_NAME,aa);
Z.attr(r.GENDER,Y);
Z.attr(r.STYLE_ID,F.id);
Z.attr(r.USER_ID,V);
a.util.each(B,function(ac,ab){W.removeClass(ab)
});
W.addClass(F.templateName);
P.event(x,G);
P._initModal(Z,G);
return m(S,Z)
});
O=p.trim(Q.attr(r.FIRST_NAME));
if(O.length>0){i(".tfc-first-name",Q).html(O)
}i("."+h,Q).click(function(){P.event(D,G)
});
i("."+A,Q).click(function(){v(P.context.launchAccountWindow,k(i(this),Q))
});
if((F.templateName===B.AnonymousNotRecommended)||(F.templateName===B.AnonymousRecommended)||(F.templateName===B.NotRecommended)||(F.templateName===B.Recommended)){var L=i(".tfc-fitrec-fit-detail[id="+F.id+"]");
e.animateFitScore(Q,F.score,300,I);
i(".tfc-size",Q).text(F.size);
if(F.advice.length>0){var N=i(".advice",Q);
N.text(F.advice);
N.show()
}if(L.length>0){var M=i(".view-fit-details",Q);
M.click(function(){i.scrollTop(window,L.offset().top)
});
M.show()
}}else{if((F.templateName===B.RecommendedGarmentUserSizeOnly)||(F.templateName===B.RecommendedGarmentSizeOnly)||(F.templateName===B.RecommendedUserSizeOnly)){i(".tfc-size",Q).text(F.size)
}}this._initTip(Q);
P.event(F.status,G)
}},a.widget.WidgetWithTips);
a.FitRecs=a.widget.FitRecs;
a.FitRecs.Event=C;
a.FitRecs.Status=t;
a.FitRecs.TemplateName=B
})(jQuery,TFCApp);
(function(k,f){var a="FitAccount",g="main",i="tfc-fitrec-account",j="tfc-fitrec-register",c="create",h="render",e=f.ExtLibs,b=f.FitRecUtil;
function d(l,o,p){var q=f.Attributes,n=l.attr(q.FIRST_NAME),m=l.attr(q.GENDER),s=l.attr(q.STORE_REGISTERED),r=f.bind(p,null,{firstName:n,gender:m,registered:s});
l.contents().remove();
l.html(b.evalTemplate(o));
e("."+j,l).click(r)
}f.widget({abstractOnly:false,currTemplateName:null,initialized:false,name:a,nameSpace:g,widgetName:i,isVisible:function(){return true
},preCall:function(n){var l=this,m=this._super(n),o=this._getNodesForPreCall();
return m
},setTemplates:function(m){var l=this;
l._super(m);
if(!this.initialized){this._getNodes().each(function(){d(e(this),l.templates[c],l.context.launchAccountWindow)
})
}},postCall:function(m){var l=this,p=this._getNodes(),n=m.status,o;
if(!this.initialized||n!==this.currTemplateName){o=this.templates[n];
p.each(function(){d(e(this),o,l.context.launchAccountWindow)
});
this.initialized=true;
this.currTemplateName=n
}this.event(h,{widgets:p.get(),response:m})
}})
})(jQuery,TFCApp);
(function(l,g){var a="FitDetails",h="main",i="loading",j="tfc-fitrec-fit-detail-base",f="Inseam",e=g.ExtLibs,c=g.FitRecs.Status,k=g.Attributes,b=g.FitRecUtil,d;
d=function(u,x,v,o){var r=e(".advice",u),t=e("table.fit-detail-grid",u);
var s=e("div.fit-detail-grid-wrapper");
s.removeClass("show-advice-message");
r.hide();
e(".nav li",u).each(function(y){e(this).removeClass("active");
if(y==v){e(this).addClass("active")
}});
e(".viewing-size",u).text(x.data[v].size);
if(v==1){e(".viewing-size-label").addClass("viewing-true-fit-size-label");
e(".viewing-size").addClass("viewing-true-fit-size")
}else{e(".viewing-size-label").removeClass("viewing-true-fit-size-label");
e(".viewing-size").removeClass("viewing-true-fit-size")
}var w=e("tbody > tr",t);
w.each(function(y){e(w[y]).hide()
});
var q=0;
g.util.each(x.data[v].mpScore,function(){++q
});
t.removeClass("one-row two-rows three-rows four-rows five-rows");
switch(q){case 1:t.addClass("one-row");
break;
case 2:t.addClass("two-rows");
break;
case 3:t.addClass("three-rows");
break;
case 4:t.addClass("four-rows");
break;
case 5:t.addClass("five-rows");
break
}var n=false;
var m=x.data.length>0&&x.data[v].mpScore&&x.data[v].mpScore.hasOwnProperty(f);
var p=0;
g.util.each(x.data[v].mpScore,function(y,z){var A=x.data[v].mpLabels[y];
if(p<5){e(w[p]).show();
e(".tfc-label",w[p]).html(A.label);
e(".tfc-legend.tfc-low",w[p]).html(A.lowLabel);
e(".tfc-legend.tfc-high",w[p]).html(A.highLabel);
e(".scale",w[p]).each(function(E){var F=e(this);
F.removeClass("active");
if(E==z){F.addClass("active");
var D=x.data[v].advice!="";
if(!n){n=D
}if(/inseam|length/i.test(y)&&D){var C=e.position(F),B=e.outerWidth(r),G=e.outerHeight(F),J=e.outerWidth(F,true),H=C.top+G,I=C.left+(J/2)-(B/2);
r.html(x.data[v].advice);
r.css("left",I+"px").css("top",H+"px");
r.show()
}}})
}p=p+1
});
if(!m&&n){s.addClass("show-advice-message")
}if(p>=5){w.addClass("short")
}else{w.removeClass("short")
}b.animateFitScore(e(u),x.data[v].score,300,o)
};
g.FitDetails=g.widget({abstractOnly:true,name:a,nameSpace:h,widgetName:j,isVisible:function(){return true
},$nodes:null,_constructor:function(m){this.$nodes=e();
this._super(m)
},setTemplates:function(n){var m=this;
m._super(n);
var p=m.$nodes,o=b.evalTemplate(m.templates[i]);
if(p.length>0&&o.length>0){p.each(function(q){e(this).html(o)
})
}this.$nodes=e()
},preCall:function(p){var o="detailStyle",m=this,n=m._super(p),q=this.$nodes=m._getNodesForPreCall(p);
if(q.length>0){q.each(function(r){if(this.id!=""){if(n[o]==undefined||n[o]==null){n[o]=[]
}n[o].push(this.id)
}})
}return n
},postCall:function(n){var r=n.fitDetails,o=n.extraClasses?n.extraClasses.join(" "):"",q={},m=this;
var s=[];
s["message.excellent.fit"]=n.excellentFitMessage;
s["message.good.fit"]=n.goodFitMessage;
s["message.not.recommended"]=n.notRecommendedMessage;
s["message.size.up"]=n.sizeUpMessage;
s["message.size.down"]=n.sizeDownMessage;
s["message.snug"]=n.snugMessage;
s["message.loose"]=n.looseMessage;
s["message.short"]=n.shortMessage;
s["message.long"]=n.longMessage;
for(var p=0;
p<r.length;
p++){q[r[p].id]=r[p]
}e("."+this.widgetName).each(function(v,t){var A=e(t),B=q[t.id],x=1,y,z,u,w;
if(typeof B=="undefined"){return
}w=b.evalTemplate(m.templates[B.data[1].status]);
w.addClass(o);
A.html(w);
e(".turn-off-true-fit",A).click(function(){m.event("logout");
m.context.logOutOfTrueFit()
});
y=l.trim(A.attr(g.Attributes.FIRST_NAME));
if(y.length>0){e(".tfc-first-name",A).html(y)
}if(B.data[x].status==c.Success){e(".nav li",A).each(function(D){var E=e(this);
var C=B.data[D].size;
if(!b.recommended(B.data[D].score)){E.addClass("not-recommended")
}if(B.data[D].status==c.Success){e(".tfc-size",E).html(C);
E.click(function(){d(A,B,D,s)
})
}else{E.addClass("disabled");
if(D==0){E.html(s["message.size.down"])
}else{if(D==2){E.html(s["message.size.up"])
}else{E.html("")
}}}});
z=e(".size-down",A);
u=e(".size-up",A);
if(B.data[0].status!=c.Success){z.addClass("disabled")
}if(B.data[2].status!=c.Success){u.addClass("disabled")
}u.click(function(){if(!u.hasClass("disabled")){x+=1;
z.removeClass("disabled");
u.removeClass("go-to-true-fit-size");
u.removeClass("go-to-nearest-size");
d(A,B,x,s);
if((x==2)||(B.data[(x+1)].status!=c.Success)){u.addClass("disabled")
}if(x==2){if(b.recommended(B.data[1].score)){z.addClass("go-to-true-fit-size")
}else{z.addClass("go-to-nearest-size")
}}}});
z.click(function(){if(!z.hasClass("disabled")){x-=1;
z.removeClass("go-to-true-fit-size");
z.removeClass("go-to-nearest-size");
u.removeClass("disabled");
d(A,B,x,s);
if((x==0)||(B.data[(x-1)].status!=c.Success)){z.addClass("disabled")
}if(x==0){if(b.recommended(B.data[1].score)){u.addClass("go-to-true-fit-size")
}else{u.addClass("go-to-nearest-size")
}}}});
d(A,B,x,s)
}e(".tfc-fitrec-register",A).click(function(D){var C=e(this);
m.context.launchAccountWindow({firstName:A.attr(k.FIRST_NAME),gender:A.attr(k.GENDER),ips:C.attr(k.IPS),registered:C.attr(k.STORE_REGISTERED),styleId:A.attr("id")})
})
});
m.event("render",{widgets:e("."+this.widgetName).get(),response:n})
}})
})(jQuery,TFCApp);
(function(d){var b="FitDetailsPrimary",a="main",c="tfc-fitrec-fit-detail";
d.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:c},d.widget.FitDetails)
})(TFCApp);
(function(d){var b="FitDetailsPopup",a="main",c="tfc-fitrec-fit-detail-popup";
d.widget({abstractOnly:false,internalOnly:true,name:b,nameSpace:a,widgetName:c},d.widget.FitDetails)
})(TFCApp);
(function(b,n){var t="tfc-fitrec-register-content",q="tfc-fitrec-register-content-wrapper",e="tfc-fitrec-register-loading",p="tfc-fitrec-register-overlay",j="tfc-fitrec-register-primary-wrapper",r="isInitialProfileComplete",l="isManagingProfile",c="FitProfile",h="main",f="tfc-fitrec-register",v="tfc-fitrec-register-dialog",m="profile-url",k=document.location.hash||"",i=/^#?\d+&tfcmessage&/,o=b.Attributes,x=b.Constants,g=b.ExtLibs,d=b.FitRecUtil,a=b.util;
var w={Close:"close",Complete:"complete",Cookie:"cookie",LogOut:"logout",Log:"log",Open:"open",PageLoad:"pageload",Previous:"previous",Render:"render",Update:"update"};
function u(D,z,A){var C=g("#"+v),B=tfc.getProfileUrl(n.extend({placement:"standalone"},A)),y;
if(D===x.DeviceType.Mobile){z.save();
if(history&&history.replaceState){y=history.state||{};
history.replaceState(n.extend({},y,{tfcReload:true}))
}document.location.href=B
}else{C.data(m,B);
C.jqmShow()
}}var s=b.widget({abstractOnly:false,name:c,nameSpace:h,widgetName:f,isVisible:function(){return true
},$loadingTemplate:null,$modalDialog:null,initialized:false,scrollTop:0,heightToggleIntervalId:undefined,preCall:function(A){var y=this,B=y._getNodesForPreCall(A),z=y._super(A);
if(!y.initialized){B.click(function(D){var C=g(D.target);
y.context.launchAccountWindow({ips:C.attr(o.IPS),firstName:C.attr(o.FIRST_NAME),gender:C.attr(o.GENDER),registered:C.attr(o.STORE_REGISTERED),originWidget:y.widgetName})
})
}return z
},postCall:function(z){var y=this;
if(!y.initialized){y.event(w.Render,{widgets:y._getNodes(),response:z});
y.initialized=true
}},setTemplates:function(z){var y=this;
y._super(z);
if(n("#"+v).length===0){y.$loadingTemplate=d.evalTemplate(y.templates.loading,true);
y.$modalDialog=d.evalTemplate(y.templates.dialog);
y.$modalDialog.hide();
g("body").append(y.$modalDialog);
y.$modalDialog.jqm({modal:true,toTop:true,onShow:b.bind(y._dialogOnOpen,y),opacity:40,overlayClass:p})
}},_constructor:function(z){var y=this,B=(i.test(k))?k.replace(i,""):undefined;
y._super(z);
if(B){var A=B.split("|")[0];
parent.parent.tfc.event("tfc-fitrec-register",A)
}z.launchAccountWindow=b.bind(u,null,z.profileDeviceType,z.mailboxHelper);
b.receiveMessage(function(F){var E=F.data.split("|"),C=E[0],D={};
if((C===w.Cookie)||(C===w.Complete)||(C===w.Log)||(C===w.PageLoad)){if(E.length>1){D=d.deparam(E[1])
}y._receiveMessage(C,D)
}else{y._receiveMessage(E[0],E)
}},y.context.profileURI)
},_dialogClose:function(){var y=this,B=g("#"+v),D=g("#"+e),z=g("#"+j,B),A=g("iframe",B);
D.remove();
A.removeAttr("src");
var C=function(){A.remove();
B.jqmHide();
z.show()
};
B.css("left","");
B.css("top","");
if(d.isIE7||d.isIE8){z.hide();
C()
}else{z.fadeOut(300,function(){C()
})
}if(y.heightToggleIntervalId!==undefined){clearInterval(y.heightToggleIntervalId);
y.heightToggleIntervalId=undefined
}g.scrollTop(window,y.scrollTop);
tfc.calculate()
},_dialogOnOpen:function(A){var G=this,F=g(A.w),E=g("#"+j,F),z=g("#"+q,F),y=g("#"+t,F),C=g("iframe",y),H=g(A.o),B=g("#"+v).data(m),D=g("#"+e);
H.animate({opacity:"0.4"},300);
if((D.length==0)&&(G.$loadingTemplate.length>0)){if(d.isIE7||d.isIE8){G.$loadingTemplate.addClass("ie")
}g(document.body).append(G.$loadingTemplate);
D=g("#"+e)
}F.css("left","-3000px");
F.css("top","-3000px");
C.remove();
C=g(document.createElement("iframe"));
C.attr("id","tfc-fitrec-register-iframe");
C.attr("name","tfc-fitrec-register-iframe");
C.attr("scrolling","no");
C.attr("allowtransparency","true");
C.attr("frameborder","0");
C.load(function(){var J=g(window).height(),M=F.height(),S=z.offset(),L=C.offset(),K="",P="",I=true,N=C.height();
if(z.is(":visible")){var O=function(T){return(T<0)?(T*-1):T
};
if(M>J){var R=O(S.top)-O(L.top),Q=M-J;
if(Q>0){P=((Q>R)?R:Q)*-1
}}E.hide();
F.css("left",K);
F.css("top",P);
if(d.isIE7||d.isIE8){E.show()
}else{E.fadeIn(300)
}G.scrollTop=g.scrollTop(window);
g.scrollTop(window,0);
D.remove();
if(C.attr("src")&&d.isIPad&&d.isMobileSafari&&d.isIOS6_1_3){G.heightToggleIntervalId=setInterval(function(){C.css("height",(I?N+5:N));
I=!I
},1000)
}}});
y.html("").append(C);
C.attr("src",B);
F.show();
F.removeData(m)
},_receiveMessage:function(z,A){var y=this;
switch(z){case w.Close:y._dialogClose();
y.event(w.Close,{data:[]});
break;
case w.Complete:y.event(w.Complete,{placement:A.placement,isCredentialSaved:a.stringToBool(A.isCredentialSaved),tfpUser:{isAuthenticated:A.isAuthenticated,isInitialProfileComplete:A.isInitialProfileComplete,isLoggedOut:A.isLoggedOut,isUserAvailable:A.isUserAvailable,gender:A.gender}});
break;
case w.Open:y.event(w.Open,{data:A});
break;
case w.PageLoad:A[r]=a.stringToBool(A[r]);
A[l]=a.stringToBool(A[l]);
y.event(w.PageLoad,A);
break;
case w.Previous:y.event(w.Previous,{data:A});
break;
case w.Update:y.event(w.Update,{data:A});
break;
case w.Cookie:if(g.type(A)==="object"){a.setCookie(A,true)
}break;
case w.Log:y.event(w.Log,{message:A.message.replace(/\+/g," ")});
break;
case w.LogOut:y.event(w.LogOut);
break
}}});
s.WIDGET_NAME=f;
b.widget.FitProfile=s
})(TFCApp,jQuery);
(function(a){a.widget.FitProfile.IPS={LOGIN:"login",NEW_PROFILE:"newprofile",UPDATE_PROFILE:"profile",UNKNOWN:"unknown",WELCOME:"welcome"}
})(TFCApp);
(function(c,e){var b="CatalogFitRecs",a="main",d="tfc-fitrec-catalog";
e.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d},e.widget.FitRecs)
})(jQuery,TFCApp);
(function(c,e){var b="ProductFitRecs",a="main",d="tfc-fitrec-product";
e.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d},e.widget.FitRecs)
})(jQuery,TFCApp);
(function(g){var d="OrderNotify",a="main",e="tfc-order-notify",b="data-orderid",f=g.ExtLibs,c=g.Constants.RequestParameter;
g.widget({abstractOnly:false,context:null,name:d,nameSpace:a,widgetName:e,isVisible:function(){return false
},preCall:function(j){var h=this,i=this._super(j),k=this._getNodesForPreCall(j);
k.each(function(){h._addParam(f(this),b,c.OrderId,i)
});
return i
},_constructor:function(h){this.context=h
}})
})(TFCApp);
(function(c,f){var b="SetUserId",d="tfc-set-userid",a="main",e=f.ExtLibs;
f.widget.SetUserId=f.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d,isVisible:function(){return false
},preCall:function(g){return this._super(g)
},postCall:function(g){this.event("render",{widgets:e("."+this.widgetName).get(),response:g})
}})
})(jQuery,TFCApp);
(function(e,f,d){var b=new f.analytics.AnalyticsManager(),c=tfcManager.configuration.experiments||[],a;
f.cookieHelper=new f.FitRecCookieHelper();
d.noticePopup=new d.component.NoticePopup();
window.tfc=new f.FitRecService(tfcManager.configuration,b);
a=f.experiment=new f.analytics.WidgetABTest(c);
f.util.each(a.getEngines(),function(g,h){b.addEngine(h)
});
if(tfcManager.configuration.profileDeviceType===f.Constants.DeviceType.Mobile){e(window).bind("pageshow",function(g){if(g.originalEvent&&g.originalEvent.persisted){tfc.calculate()
}})
}})(jQuery,TFCApp,TFPApp);
