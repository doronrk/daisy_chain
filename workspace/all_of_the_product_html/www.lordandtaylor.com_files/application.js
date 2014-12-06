window.tfcJQuery=window.tfcJQuery||window.jQuery;
(function(){var a;
TFCApp={getRunMode:function(){return a
},RunModes:{dev:1,test:2,staging:3,prod:4},Constants:{RequestParameter:{UserCookie:"userCookie",Gender:"gender",Category:"category",IPS:"ips",FirstName:"firstName",OrderId:"orderid",DetailStyleId:"detailstyleid",StyleId:"styleid",StoreEmbedded:"storeEmbedded",Placement:"placement",ServiceMode:"serviceMode",UserId:"userid",DeviceType:"deviceType",MailboxId:"mailboxId",Locale:"locale",StoreRegistered:"storeRegistered",OriginWidget:"originWidget",Container:"container",SaveProfilePrompt:"saveProfilePrompt",SessionParams:"sessionParams",SessionParamOverrides:"sessionParamOverrides"},CookieName:{UserCookie:"_tfcUserCookie",MailboxId:"_tfcMailboxId",UserVisit:"tfcUserVisit",UserSettings:"tfcUserSettings"},DeviceType:{Mobile:"mobile",Desktop:"desktop"},IPS:{FitDetails:"fitdetails"},Container:{AccountWindow:"accountwindow",Tip:"tip"},Message:{Open:"open",Close:"close",Update:"update",Complete:"complete",PageLoad:"pageload",Cookie:"cookie",SessionParams:"sessionparams",SessionParamsMaxAge:"sessionparamsmaxage",LogOut:"logout",Resize:"resize",Estimate:"estimate",Refresh:"refresh",TrackVisit:"trackvisit",Register:"register"}},analytics:{},component:{},tips:{},utility:{}};
a=(TFCApp.RunModes.prod||TFCApp.RunModes.dev)
})();
(function(g,m){var e,i,c,d,h,f,k,j,l,a,b;
e=(function(){var o,p=Object.prototype.toString,n=/^(?:body|html)$/i;
o={};
(function(){var s,q,r="Boolean Number String Function Array Date RegExp Object".split(" ");
for(s=0;
s<r.length;
++s){q=r[s];
o["[object "+q+"]"]=q.toLowerCase()
}})();
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
i=(function(){function o(s){var r,q;
if(s===undefined){return undefined
}r=s.split(".");
q=[];
c.each(r,function(t,u){q.push(parseInt(u))
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
}return function(q,s){var u=o(m.fn.jquery),r=o(q),t=o(s);
return p(r,u)&&p(u,t)
}
})();
d=function(q,o){var n=q.css(o),p=n?parseInt(n.replace("px","")):NaN;
return isNaN(p)?0:p
};
h=function(q){var n=d(q,"paddingLeft"),o=q.width(),p=d(q,"paddingRight");
return(n+o+p)
};
f=function(n){return(c.type(n)==="array")
};
k=function(n){return(n&&c.type(n)==="object"&&n.constructor===Object)
};
j=function(n,s){var p=s?d(n,"marginTop"):0,o=d(n,"borderTopWidth"),v=d(n,"paddingTop"),u=n.height(),w=d(n,"fontSize"),q=d(n,"paddingBottom"),r=d(n,"borderBottomWidth"),t=s?d(n,"marginBottom"):0;
if(w>u){u=w
}return(p+o+v+u+q+r+t)
};
l=function(n,s){var r=s?d(n,"marginLeft"):0,u=d(n,"borderLeftWidth"),q=d(n,"paddingLeft"),o=n.width(),p=d(n,"paddingRight"),v=d(n,"borderRightWidth"),t=s?d(n,"marginRight"):0;
return(r+u+q+o+p+v+t)
};
c=function(n){if(i(undefined,"1.4")&&!n){return m(" ")
}else{return m.apply(m,arguments)
}};
c.each=function(q,p){var o,n=c.isArray(q);
if(n){for(o=0;
o<q.length;
++o){if(p(o,q[o])===false){break
}}}else{for(o in q){if(Object.prototype.hasOwnProperty.call(q,o)){if(p(o,q[o])===false){break
}}}}return q
};
c.innerWidth=function(n){return m.fn.innerWidth?n.innerWidth():h(n)
};
c.isArray=function(n){return m.isArray?m.isArray(n):f(n)
};
c.isFunction=function(n){if(i(undefined,"1.2.6")){return this.type(n)==="function"
}else{return m.isFunction(n)
}};
c.isPlainObject=function(n){return m.isPlainObject?m.isPlainObject(n):k(n)
};
c.outerHeight=function(p,o){var n=o?o:false;
return m.fn.outerHeight?p.outerHeight(n):j(p,n)
};
c.outerWidth=function(p,o){var n=o?o:false;
return m.fn.outerWidth?p.outerWidth(n):l(p,n)
};
c.position=function(n){return m.fn.position?n.position():e.position(n)
};
c.scrollTop=function(n,o){return m.fn.scrollTop?m(n).scrollTop(o):e.scrollTop(n,o)
};
c.type=function(n){return m.type?m.type(n):e.type(n)
};
c.parseHtml=function(n){if(i("1.9")){return c(m.parseHTML(m.trim(n)))
}else{return c(n)
}};
c._jqVersion=i;
g.extLibs=c
})(TFCApp,tfcJQuery);
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
(function(h,n){var k,b,a,i,m,c,e,d,l,j,g,f=h.extLibs;
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
i=a.extend({_test:function(o){return(f.type(o)===this._type)
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
m=i.extend({_constructor:function(p,q,o){var r=f.isPlainObject(p);
if(r){f.each(p,function(u,s){if(!(s instanceof a)){r=false;
return false
}})
}if(!r){throw"ObjectType type argument must be a plain object with Type values"
}this._super(p,q,o)
},_test:function(o){var p=f.isPlainObject(o);
if(p){f.each(this._type,function(r,q){if(!q.test(o[r])){p=false;
return false
}})
}return p
},_expected:function(){var o=n.map(this._type,function(q,p){return p+":"+q.expected()
}).join(", ");
return"{"+o+"}"
},_class:function(){return m
}});
c=a.extend({_constructor:function(p,q,o){if(!f.isFunction(p)){throw"InstanceType type argument must be a function/constructor"
}this._super(p,q,o)
},_test:function(o){return(o instanceof this._type)
},_expected:function(){return"instance of "+(this._type.name||"anonymous")
},_class:function(){return c
}});
g=a.extend({_test:function(o){return true
},_expected:function(){return"any"
},_class:function(){return g
}});
k={Any:new g(),Null:new i("null"),Boolean:new l(),Number:new e(),Integer:new d(),String:new j(),Function:new i("function"),Array:new i("array"),PlainObject:new m({}),Object:function(o){return new m(o)
},Instance:function(o){return new c(o)
}};
b=function(){var o=arguments.callee.caller,q=o.arguments,p=o.name||"anonymous";
f.each(arguments,function(s,t){var r=q[s];
if(!(t instanceof a)){throw"Invalid argument passed to TFCApp.checkArgs"
}else{if(!t.test(r)){throw"Invalid argument passed to function ["+p+"] - expected type ["+t.expected()+"] but got ["+r+"]"
}}})
};
h.type=k;
h.checkArgs=b
})(TFCApp,tfcJQuery);
(function(f,d){var e=f.extLibs,c=f.type,a=f.util={},b=f.utility.Logger.getLogger("TFCUtil");
a.stringify=function(g){var h;
if(g instanceof d){h="jQuery"
}else{if(e.type(g)==="array"){h="["+d.map(g,function(i){return a.stringify(i)
}).join(", ")+"]"
}else{if(e.type(g)==="object"){h="";
e.each(g,function(i,j){h+=","+i+":"+a.stringify(j)
});
return"{"+h.substring(1)+"}"
}else{if(e.type(g)==="function"){h="function"
}else{h=String(g)
}}}}return h
};
a.stringToBool=function(g){return(g==="true")
};
a.stringStartsWith=function(h,g){return h.lastIndexOf(g,0)===0
};
a.stringEndsWith=function(h,g){return h.indexOf(g,h.length-g.length)>=0
};
a.filter=function(i,h){var g={};
e.each(i,function(j,k){if(h(j,k)){g[j]=k
}});
return g
};
a.createElement=function(g,i){if(e.type(g)==="string"&&(d.trim(g)!=="")){var k=d.trim(g),h=e(document.createElement(k)),j=(e.type(i)==="object")?i:{};
e.each(j,function(l,n){var m=n;
if((l.toLowerCase()==="class")&&(e.type(n)==="array")){m=n.join(" ")
}h.attr(l,m)
});
return h
}else{return e()
}};
a.loadScript=function(g){d.ajax({url:g.url,dataType:"script",success:g.success,error:g.error,cache:(e.type(g.cache)==="boolean"?g.cache:true)})
};
a.getCookie=function(h){var g=null;
e.each(document.cookie.split("; "),function(l,n){var j=n.indexOf(h);
if(j>-1){var m=n.indexOf("=",j)+1;
var k=n.length;
if((m>0)&&(m<k)){g=n.substring(m,k);
return false
}}});
return g
};
a.setCookie=function(k,i){var h,j,l,g;
if(e.type(k)==="object"&&e.type(k.name)==="string"&&e.type(k.value)==="string"){if(i){a.deleteCookie({name:k.name,domain:""})
}h=k.name+"="+k.value;
j=(typeof(k.domain)==="string"?k.domain:a.parseParentDomain());
if(a.isNonZeroLengthString(j)&&j!=="localhost"){h+=";domain="+j
}l=a.isNonZeroLengthString(k.path)?k.path:"/";
h+=";path="+l;
g=parseInt(k.maxAge);
if(!isNaN(g)){h+=";max-age="+g;
if(g<=0){h+=";expires=Thu, 01 Jan 1970 00:00:00 GMT"
}}document.cookie=h
}};
a.deleteCookie=function(g){if(e.type(g)==="object"){a.setCookie({name:g.name,value:"",domain:g.domain,path:g.path,maxAge:0})
}};
(function(){var g,i,h;
g="\\[]{}()+*?!=^$,.-|:";
i="\\"+g.split("").join("\\");
h=new RegExp("(["+i+"])","g");
a.regexSafe=function(j){return j.replace(h,"\\$1")
};
g=i=null
})();
a.parseOrigin=function(g){return g.replace(/^\s*([^:]+:\/\/[^\/\?\#]*).*$/,"$1")
};
a.parseParentDomain=function(g){var i,h;
g=g||document.location.href;
i=a.parseOrigin(g).replace(/^[^:]+:\/\/\/?([^:]*)(:[0-9]+)?$/,"$1");
if(i===g){b.error("Could not parse domain from URL "+g);
return g
}h=/[^\.]+\.([^\.]{2}\.)?[^\.]+$/.exec(i);
if(!h){b.error("Could not parse parent domain from domain "+i);
return i
}return h[0]
};
a.isNonZeroLengthString=function(g){return((typeof(g)==="string")&&(g.length>0))
};
a.appendQueryParameter=function(g,h,i){var j=g.indexOf("?")>-1?"&":"?";
if(a.isNonZeroLengthString(i)){g+=j+h+"="+i
}return g
};
a.chooseUri=function(g,h){return(("https:"===document.location.protocol)?g:h)
};
a.arrayToPairs=function(g){var h={};
e.each(g,function(j,i){h[i]=i
});
return h
};
a.param=function(h){f.checkArgs(c.PlainObject);
var g=[];
e.each(h,function(j,i){if(c.Boolean.test(i)||c.Number.test(i)||c.String.test(i)){g.push(encodeURIComponent(j)+"="+encodeURIComponent(i))
}else{throw"Invalid type passed to param function, key="+j+", value="+i
}});
return g.join("&")
};
a.deparam=function(m){var k,g,p,j,o,h={},n=m.split("&");
for(k=0,g=n.length;
k<g;
++k){p=n[k].split("=",2);
if(p.length===2){j=decodeURIComponent(p[0]);
o=decodeURIComponent(p[1]);
h[j]=o
}}return h
};
a.getAttributes=function(g){var h={};
e.each(g.get(0).attributes,function(k,j){h[j.nodeName]=j.nodeValue
});
return h
};
a.keyToPrintableCharacter=function(i){var h=String.fromCharCode(i),g=h.charCodeAt(0);
return(g>=32&&g<=126?h:"")
};
a.arrayIndexOf=function(g,i){var h=-1;
e.each(g,function(j,k){if(k===i){h=j;
return false
}});
return h
};
a.getQueryParams=function(g){var j,h,l,k={};
h=(g.split("?",2)[1]||"").split("&");
for(j=0;
j<h.length;
++j){l=h[j].split("=",2);
if(l.length===2){k[l[0]]=l[1]
}}return k
};
a.getLocationWithoutHash=function(){return document.location.href.split("#",2)[0]
};
a.getLocationHash=function(){return/^[^#]+#?(.*)$/.exec(document.location.href)[1]
};
a.setLocationHash=function(g){document.location.href=document.location.href.replace(/#.*$/,"")+"#"+g
};
a.isMobileSafari=/mobile.+safari/i.test(navigator.userAgent)
})(TFCApp,tfcJQuery);
var TFCApp=TFCApp||{};
TFCApp.FitRecUtil={isIE7:(TFCApp.extLibs("<!--[if IE 7]>x<![endif]-->").text()==="x"),isIE8:(TFCApp.extLibs("<!--[if IE 8]>x<![endif]-->").text()==="x"),isIOS6_1_3:/OS 6_1_3/.test(navigator.userAgent),isIPad:/ipad/i.test(navigator.userAgent),animateFitScore:function(l,b,c,d){var h=c||500,k=this.fitDescription(b,d),e=TFCApp.extLibs(".tfc-fitrec-result",l),g=TFCApp.extLibs(".tfc-fit-score-description",e),j=TFCApp.extLibs(".tfc-fit-score",e),i=TFCApp.extLibs(".tfc-fit-score-background",e),f=TFCApp.extLibs(".tfc-fit-score-foreground",i),a=(TFCApp.extLibs.innerWidth(i)/5)*b;
g.text("");
j.text("");
f.css("width","");
if(this.recommended(b)){e.removeClass("tfc-not-recommended")
}else{e.addClass("tfc-not-recommended")
}f.animate({width:a},h,function(){setTimeout(function(){g.text(k);
e.hide().show(0)
},1);
j.animate({opacity:1},(h/2))
})
},exists:function(a){return a!=="undefined"&&a!=null?true:false
},fitDescription:function(b,a){switch(parseFloat(b)){case 5:case 4.5:case 4:return a["message.excellent.fit"];
case 3.5:case 3:return a["message.good.fit"];
case 2.5:case 2:case 1.5:case 1:case 0.5:case 0:return a["message.not.recommended"];
default:return""
}},logAnalytics:function(a,b,c){try{if(this.exists(a.googleAnalyticsKey)&&a.googleAnalyticsKey!=""){var g=window._gaq||[];
if(!window._gaq){window._gaq=g
}if(a.profileDeviceType===TFCApp.Constants.DeviceType.Mobile){c="/mobile"+c
}g.push(["tfcTracker._setAccount",a.googleAnalyticsKey]);
g.push(["tfcTracker._setDomainName","none"]);
g.push(["tfcTracker._setAllowLinker",true]);
g.push(["tfcTracker._setCustomVar",1,"StoreTLA",a.storeKey,3]);
g.push(["tfcTracker._setCustomVar",2,"UXVersion",a.uxMarketingVersion,3]);
g.push(["tfcTracker._setCustomVar",3,"StoreVersion",a.storeMarketingVersion,3]);
g.push(["tfcTracker._setCustomVar",4,"TFPUserProfileComplete",b.isInitialProfileComplete,3]);
g.push(["tfcTracker._trackPageview",c]);
if(typeof _gat==="undefined"){var h=document.createElement("script"),i=document.getElementsByTagName("script")[0],f=TFCApp.extLibs("script#google-analytics");
if(f.length>0){f.remove();
i=document.getElementsByTagName("script")[0]
}h.async=true;
h.id="google-analytics";
h.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";
h.type="text/javascript";
i.parentNode.insertBefore(h,i)
}}}catch(e){try{console.log("Google analytics failed["+e+"]")
}catch(d){}}},recommended:function(a){return((typeof a!="undefined")&&(parseFloat(a)>=3))
},evalTemplate:function(a,d){var b,c,g="img[src]";
if(typeof(d)!=="boolean"){d=false
}if(typeof(a)==="string"){try{b=TFCApp.extLibs.parseHtml(a)
}catch(f){}}if(b===undefined){b=TFCApp.extLibs()
}if(d){c=b.filter(g);
b.each(function(e,h){c=c.add(g,h)
});
c.each(function(j,h){var e=new Image();
e.src=TFCApp.extLibs(h).attr("src")
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
})(tfcJQuery,TFCApp);
var TFCApp=TFCApp||{};
(function(){TFCApp.Signal=TFCApp.Class.extend({_constructor:function(){this._slots=[]
},listen:function(a){if(typeof(a)==="function"){this._slots.push(a)
}else{throw"Slot passed into Signal.listen must be a function"
}},unlisten:function(e){var c,a,b,d=this._slots;
if(typeof(e)==="function"){for(c=0,a=d.length;
c<a;
++c){if(d[c]===e){b=c;
break
}}d.splice(b,1)
}else{throw"Slot passed into Signal.unlisten must be a function"
}},trigger:function(){for(var a=0;
a<this._slots.length;
++a){this._slots[a].apply(null,arguments)
}},_slots:null})
})();
/*!
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(f,g,j){var p,l,h=0,b=100,m=1,d=f.util,i=f.type,o=!!g.postMessage,k;
function e(r,q){return r+"|"+q
}function a(r){var q=r.data===undefined?"":d.param(r.data);
return d.param({swid:r.sourceWindowId,msg:r.message,data:q})
}function n(r){var q=d.deparam(r);
return{sourceWindowId:q.swid,message:q.msg,data:q.data===""?undefined:d.deparam(q.data)}
}function c(){var r,q,u,s,t=/^tfc!([^!]+)!(.*)$/.exec(d.getLocationHash());
if(t){r=t[1];
q=n(t[2]);
u=e(r,q.sourceWindowId);
s=e(r,k.globalWindowId());
if(l){if(u in l){(l[u]).trigger(q.message,q.data)
}if(s in l){(l[s]).trigger(q.message,q.data)
}}d.setLocationHash("")
}}k={postMessage:function(q,s,w,y,u){f.checkArgs(i.Any,i.String,i.String,i.String,i.PlainObject.optional());
if(!s||!w){return
}var x,v,z,t=a({sourceWindowId:w,message:y,data:u});
if(o){q.postMessage(t,d.parseOrigin(s))
}else{function r(){x=d.parseOrigin(j.location.href);
q.location=s.replace(/#.*$/,"")+"#tfc!"+x+"!"+t
}v=(new Date()).getTime();
z=h+b;
if(z>v){h=z;
setTimeout(r,z-v)
}else{h=v;
r()
}}},receiveMessage:function(v,u,r){f.checkArgs(i.Function,i.String,i.String);
var t,q,s;
if(o){t=function(x){var w;
if(x.origin!==u){return false
}w=n(x.data);
if(w.sourceWindowId!==r&&k.globalWindowId()!==r){return false
}v(w.message,w.data)
};
if(g.addEventListener){g.addEventListener("message",t,false)
}else{g.attachEvent("onmessage",t)
}}else{s=e(u,r);
if(p===undefined){l={};
p=setInterval(c,b)
}q=l[s]=(l[s]||(new f.Signal()));
q.listen(v)
}},generateWindowHash:function(q){f.checkArgs(i.String);
return"#"+q+"!"+j.URL
},parseWindowHash:function(){var q=/^([^!]+)!(.*)$/.exec(d.getLocationHash()),r=q&&q[1],s=q&&q[2];
return{sourceWindowId:r||"",targetUrl:s||""}
},globalWindowId:function(){return"*"
},accountWindowId:function(){return"R"
},nextWindowId:function(){return(m++).toString()
}};
f.postMessageManager=k
})(TFCApp,window,document);
/*!
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 03/01/2009 +r14
 */
(function(c){c.fn.tfc_jqm=function(k){var f={overlay:50,overlayClass:"tfc_jqmOverlay",closeClass:"tfc_jqmClose",trigger:".tfc_jqModal",ajax:i,ajaxText:"",target:i,modal:i,toTop:i,onShow:i,onHide:i,onLoad:i};
return this.each(function(){if(this._tfc_jqm){return h[this._tfc_jqm].c=c.extend({},h[this._tfc_jqm].c,k)
}j++;
this._tfc_jqm=j;
h[j]={c:c.extend(f,c.tfc_jqm.params,k),a:i,w:c(this).addClass("tfc_jqmID"+j),s:j};
if(f.trigger){c(this).tfc_jqmAddTrigger(f.trigger)
}})
};
c.fn.tfc_jqmAddClose=function(f){return g(this,f,"tfc_jqmHide")
};
c.fn.tfc_jqmAddTrigger=function(f){return g(this,f,"tfc_jqmShow")
};
c.fn.tfc_jqmShow=function(f){return this.each(function(){f=f||window.event;
c.tfc_jqm.open(this._tfc_jqm,f)
})
};
c.fn.tfc_jqmHide=function(f){return this.each(function(){f=f||window.event;
c.tfc_jqm.close(this._tfc_jqm,f)
})
};
c.tfc_jqm={hash:{},open:function(w,v){var m=h[w],n=m.c,l="."+n.closeClass,p=(parseInt(m.w.css("z-index"))),p=(p>0)?p:3000,k=c("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":p-1,opacity:n.overlay/100});
if(m.a){return i
}m.t=v;
m.a=true;
m.w.css("z-index",p);
if(n.modal){if(!a[0]){e("bind")
}a.push(w)
}else{if(n.overlay>0){m.w.tfc_jqmAddClose(k)
}else{k=i
}}m.o=(k)?k.addClass(n.overlayClass).prependTo("body"):i;
if(n.ajax){var f=n.target||m.w,q=n.ajax,f=(typeof f=="string")?c(f,m.w):c(f),q=(q.substr(0,1)=="@")?c(v).attr(q.substring(1)):q;
f.html(n.ajaxText).load(q,function(){if(n.onLoad){n.onLoad.call(this,m)
}if(l){m.w.tfc_jqmAddClose(c(l,m.w))
}d(m)
})
}else{if(l){m.w.tfc_jqmAddClose(c(l,m.w))
}}if(n.toTop&&m.o){m.w.before('<span id="tfc_jqmP'+m.w[0]._tfc_jqm+'"></span>').insertAfter(m.o)
}(n.onShow)?n.onShow(m):m.w.show();
d(m);
return i
},close:function(k){var f=h[k];
if(!f.a){return i
}f.a=i;
if(a[0]){a.pop();
if(!a[0]){e("unbind")
}}if(f.c.toTop&&f.o){c("#tfc_jqmP"+f.w[0]._tfc_jqm).after(f.w).remove()
}if(f.c.onHide){f.c.onHide(f)
}else{f.w.hide();
if(f.o){f.o.remove()
}}return i
},params:{}};
var j=0,h=c.tfc_jqm.hash,a=[],i=false,d=function(k){try{c(":input:visible",k.w)[0].focus()
}catch(f){}},e=function(f){c()[f]("keypress",b)[f]("keydown",b)[f]("mousedown",b)
},b=function(l){var f=h[a[a.length-1]],k=(!c(l.target).parents(".tfc_jqmID"+f.s)[0]);
if(k){d(f)
}return !k
},g=function(f,k,l){return f.each(function(){var m=this._tfc_jqm;
c(k).each(function(){if(!this[l]){this[l]=[];
c(this).click(function(){for(var n in {tfc_jqmShow:1,tfc_jqmHide:1}){for(var o in this[n]){if(h[this[n][o]]){h[this[n][o]].w[n](this)
}}}return i
})
}this[l].push(m)
})
})
}
})(tfcJQuery);
(function(b){var a=b.Class.extend({setFirstPartyCookie:function(){b.Class.unimplemented()
},setSessionParams:function(){b.Class.unimplemented()
},setSessionParamsMaxAge:function(){b.Class.unimplemented()
}});
b.CookieHelper=a
})(TFCApp);
(function(a){a.KeyCodes={Enter:13,Escape:27,Up:38,Down:40}
})(TFCApp);
(function(a){a.UserVisitKey={SaveProfile:"SaveProfile"}
})(TFCApp);
(function(d,b){var a=history&&("state" in history)&&("replaceState" in history);
var c={setState:function(e,f){var g;
if(a){g={};
g[e]=f;
history.replaceState(b.extend({},history.state||{},g),"")
}},clearState:function(e){var f;
if(a&&history.state){f=history.state;
delete f[e];
history.replaceState(b.extend({},f),"")
}},getState:function(e){if(a&&history.state&&e in history.state){return history.state[e]
}return null
}};
d.StateManager=c
})(TFCApp,tfcJQuery);
(function(c,b){function a(d){return this.keyup(function(f){if(f.which===c.KeyCodes.Enter){d.call(this,f)
}})
}b.fn.tfc_keyupenter=a
})(TFCApp,tfcJQuery);
(function(i,p){var m=i.component,g=i.extLibs,e="tfc-button",l="prev",o="next",j="disabled",b="selected",a="click",c="isclick",d="data-value",h="tfc_buttonclick";
var f={enable:function(q){g(q).removeClass(j)
},disable:function(q){g(q).addClass(j)
},setEnabled:function(r,q){this[q?"enable":"disable"](r)
},select:function(q){g(q).addClass(b)
},deselect:function(q){g(q).removeClass(b)
},handleClick:function(q,r){if(!g(q).hasClass(j)){return r()
}},initEvents:function(q){g(q).tfc_keyupenter(function(){g(this).click()
}).mousedown(function(){var r=g(this);
if(r.is(":focus")){r.addClass(a)
}else{r.data(c,true)
}}).focus(function(){var r=g(this);
if(r.data(c)){r.addClass(a);
r.removeData(c)
}else{r.removeClass(a)
}})
},isSelected:function(q){return g(q).hasClass(b)
},getDataValue:function(q){var r=g(q).attr(d);
return r?r:null
},getButtons:function(q){return g("."+e,q)
},getSelectedButtons:function(q){return g("."+e+"."+b,q)
},getPrevButtons:function(q){return g("."+e+"."+l,q)
},getNextButtons:function(q){return g("."+e+"."+o,q)
},hasAction:function(q){return !!g(q).attr("onclick")
}};
function k(q,s){var r=g(this);
f.handleClick(this,function(){r.trigger(h,p.extend({clickEvent:q},s))
})
}function n(q){return this.each(function(){var r=g(this);
r.bind(h,q);
if(!r.data(h)){r.click(k).data(h,true)
}})
}p.fn[h]=n;
m.button=f
})(TFCApp,tfcJQuery);
(function(i,l){var e="tfc-message-dialog",h="tfc-message",b="tfc-title",m="tfc-hide-title",g="tfc-close-button",d="tfc-yes-button",a="tfc-no-button",c="tfc-button-label",f=i.extLibs,k=i.type;
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
},showError:function(n){this._show(n,"tfc-error");
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
}this._showWithTitle(A,x,"tfc-confirmation");
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
})(TFCApp,tfcJQuery);
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
(function(i,d){var b=d.extLibs,e=d.type,c=d.util,f=d.postMessageManager,h=d.Constants;
var g=function(m){var j=d.Attributes,l=j.getUserId(),p=c.getCookie(h.CookieName.UserCookie),n=c.chooseUri(m.serviceSecureURI,m.serviceURI),q=n+"/fitrec/"+m.storeKey+"/logout",k;
q=c.appendQueryParameter(q,h.RequestParameter.ServiceMode,m.serviceMode);
q=c.appendQueryParameter(q,h.RequestParameter.UserCookie,p);
q=c.appendQueryParameter(q,h.RequestParameter.UserId,l);
k=function(){tfc.calculate()
};
c.loadScript({url:q,cache:false,success:k,error:k})
};
function a(){var k=c.getQueryParams(c.getLocationWithoutHash()),j=null;
b.each(k,function(l,m){if(c.stringStartsWith(l,"tfc-")){j=j||{};
j[l.substr(4)]=m
}});
return j
}d.FitRecService=function(r,u,k){var t,n=d.FitRecUtil,w=[],v=d.cookieHelper,x=new d.MailboxHelper(),s=new d.UserVisitTracker(),j=false,p=[],q=true,C=d.utility.Logger.getLogger("FitRecService");
r.logOutOfTrueFit=d.bind(g,null,r);
r.mailboxHelper=x;
r.userVisitTracker=s;
r.userSettings=k;
(function(){function D(F,G,E){b.each(E,function(J,M){var I=F[J],K=b.type(I),H=b.type(M),L;
if(K!==H){C.error("Attempted to update config with an invalid type (key="+J+",oldType="+K+",newType="+H+")")
}else{if(H==="object"){D(I,G[J],M)
}else{if(J in G){L=G[J];
if(L===true||L(I,M)){F[J]=M
}else{C.error("Attempted to update config with an invalid value (key="+J+",oldValue="+I+",newValue="+M+")")
}}else{C.error("Attempted to update config setting that does not allow updating (key="+J+")")
}}}})
}d.updateConfig=d.bind(D,null,r,{tipConfig:{eventLevel:function(E,F){return d.tips.TipEventLevel[F]<=d.tips.TipEventLevel[E]
},pageLoads:true,hideDelay:true}})
})();
f.receiveMessage(function(D,E){if(e.PlainObject.test(E)){switch(D){case h.Message.Cookie:v.setFirstPartyCookie(E);
break;
case h.Message.SessionParams:v.setSessionParams(E.sessionParams);
break;
case h.Message.SessionParamsMaxAge:v.setSessionParamsMaxAge("maxAge" in E?parseInt(E.maxAge):null);
break
}}},r.profileURI,f.globalWindowId());
function A(F,D,E){if(D!==undefined){b.each(D,function(H,G){if(l(E.widget,F)==-1){E.widget.push(F)
}if(E[H]==undefined||E[H]==null){E[H]=G
}else{E[H]=E[H].concat(G)
}})
}return E
}function l(E,D){for(var F=0;
F<E.length;
F++){if(E[F]===D){return F
}}return -1
}function m(E){var G=new Array();
o:for(var F=0,I=E.length;
F<I;
F++){for(var D=0,H=G.length;
D<H;
D++){if(G[D]==E[F]){continue o
}}G[G.length]=E[F]
}return G
}if(!n.exists(r.profileURI)||!n.exists(r.serviceURI)||!n.exists(r.storeKey)){throw"Invalid TFC configuration entered."
}if(!(u instanceof d.analytics.AnalyticsManager)){throw"Analytics manager passed in must be of the type TFCApp.analytics.AnalyticsManager."
}b.each(d.widget,function(E,D){if(i.isFunction(D)&&D.isSubClassOf&&D.isSubClassOf(d.widget.BaseWidget)&&!D.isAbstract){w.push(new D(r))
}});
function y(){var D=p.shift();
j=false;
if(D!==undefined){tfc.calculate.apply(tfc,D)
}}this.calculate=function(U,V){var O,M,T,Y=!!d.StateManager.getState("tfcLoaded"),K,H,J={widget:[]},I=w,N={};
if(V&&Y){return
}d.StateManager.setState("tfcLoaded",true);
if(j){p.push(arguments);
return
}j=true;
H="/fitrec/"+r.storeKey+"/fit?javascriptIntegrated=true";
O=c.getCookie(h.CookieName.UserCookie);
if(b.type(O)==="string"){H+="&"+h.RequestParameter.UserCookie+"="+O
}M=k.get(d.UserSettings.keys.SessionParams);
if(b.type(M)==="string"){H+="&"+h.RequestParameter.SessionParams+"="+encodeURIComponent(M)
}T=a();
if(T){H+="&"+h.RequestParameter.SessionParamOverrides+"="+encodeURIComponent(i.param(T))
}K=x.getPersistentId();
if(b.type(K)==="string"){H+="&"+h.RequestParameter.MailboxId+"="+K
}var W=r.serviceMode;
if(b.type(W)==="string"){H+="&"+h.RequestParameter.ServiceMode+"="+W
}var R=d.Attributes.getLocaleId(U);
if(b.type(R)==="string"&&R!==""){H+="&"+h.RequestParameter.Locale+"="+R
}if(U){I=[];
b.each(w,function(Z,aa){b.each(U,function(ab,ad){var ac=aa.widgetName||aa.getWidgetName();
if(b(ad).hasClass(ac)){if(typeof N[ac]=="undefined"){N[ac]=[];
I.push(aa)
}N[ac].push(ad)
}})
})
}var S=false;
b.each(I,function(Z,ab){var aa=ab.widgetName||ab.getWidgetName();
S=S||ab.isVisible();
J=A(aa,ab.preCall(N[aa]),J)
});
if(J.widget.length>0){b.each(J,function(ab,aa){if(aa instanceof Array){var ac=m(aa);
for(var Z=0;
Z<ac.length;
Z++){H+="&"+ab+"="+encodeURIComponent(ac[Z])
}}});
var G=c.chooseUri(r.serviceSecureURI,r.serviceURI);
var F=(r.uxVersion==="")?"0.0":r.uxVersion;
var E=(r.storeVersion==="")?"0.0":r.storeVersion;
var Q=(b.type(R)==="string"&&R!=="")?"/"+R:"";
var P="/fitresources/"+r.storeKey+"/"+F+"/"+E+"/"+r.widgetDeviceType+Q+"/templates.js";
var D=G+P;
var L=!this.templatesHelper.templates||R!=this.templatesHelper.locale;
if(L&&S){this.templatesHelper.init(R);
c.loadScript({url:D,cache:true})
}else{if(L&&!S){this.templatesHelper.init(null);
this.templatesHelper.setTemplates({})
}else{this.templatesHelper.reprocessTemplates()
}}var X=G+H;
c.loadScript({url:X,cache:false,error:y})
}};
this.event=function(F,D,E){b.each(w,function(G,I){var H=I.widgetName||I.getWidgetName();
if(H==F){I.event(D,E)
}})
};
this.templatesHelper={templates:null,callback:null,locale:null,init:function(D){this.templates=null;
this.callback=null;
this.locale=D
},reprocessTemplates:function(){this.callback=null;
if(this.templates){this.setTemplates(this.templates)
}},onTemplatesReady:function(D){if(this.templates){D(this.templates)
}else{this.callback=D
}},setTemplates:function(D){this.templates=D;
b.each(w,function(E,F){if(!F.templates){F.setTemplates(D)
}});
if(this.callback){this.callback(this.templates)
}}};
this.processTemplates=function(D){this.templatesHelper.setTemplates(D.templates)
};
this.process=function(D){this.templatesHelper.onTemplatesReady(function(E){var F=[];
x.setTempId(D.mailboxId);
b.each(w,function(H,J){var I=J.widgetName||J.getWidgetName();
if(n.exists(D[I])){var G=D[I];
G.tfpUser=D.tfpUser;
G.extraClasses=D.extraClasses;
G.userFlags=D.userFlags;
J.postCall(G);
n.logAnalytics(r,D.tfpUser,"/fit/"+I);
u.handlePageLoad({pageName:I});
F.push(J.getWidgetName())
}});
if(D.visitKeys){s.trackVisits(D.visitKeys)
}if(q){s.trackVisits(F);
q=false
}y()
})
};
function B(D){return((typeof(D)==="string")&&(D.length>0))
}function z(F,E){var D;
if(B(F)){D=F
}else{D=E
}return D
}this.getProfileUrl=function(J){var E=r.profileURI+"/truefitprofile/"+r.storeKey+"/",K=c.getCookie(h.CookieName.UserCookie),G=d.UserVisitKey,L,M,D,I;
if(typeof(J)!=="object"){J={}
}function F(N,O){if(B(O)){E+="&"+N+"="+encodeURIComponent(O);
return true
}return false
}L=z(J.container,h.Container.AccountWindow);
M=z(J.windowId,f.accountWindowId());
if(L===h.Container.AccountWindow&&M!==f.accountWindowId()){throw"Called getProfileUrl for the account window, and the window ID was invalid"
}else{if(L!==h.Container.AccountWindow&&M===f.accountWindowId()){throw"Called getProfileUrl for a window that is not the account window, and the window ID was invalid"
}}I=J.userId;
if(B(I)){E+=I
}else{D=d.Attributes.getUserId();
if(B(D)){E+=D
}}E+="?_="+(new Date()).getTime();
F(h.RequestParameter.SaveProfilePrompt,(s.getVisits(G.SaveProfile)>0)?"false":"");
F(h.RequestParameter.UserCookie,K);
F(h.RequestParameter.DeviceType,r.widgetDeviceType);
if(r.profileDeviceType===h.DeviceType.Mobile){F(h.RequestParameter.MailboxId,x.getTempId())
}F(h.RequestParameter.Gender,J.gender);
F(h.RequestParameter.Category,J.category);
F(h.RequestParameter.IPS,J.ips);
F(h.RequestParameter.FirstName,J.firstName);
F(h.RequestParameter.Placement,J.placement);
F(h.RequestParameter.ServiceMode,r.serviceMode);
F(h.RequestParameter.Locale,this.templatesHelper.locale);
F(h.RequestParameter.StoreRegistered,J.registered);
F(h.RequestParameter.OriginWidget,J.originWidget);
F(h.RequestParameter.Container,L);
F(h.RequestParameter.SessionParams,k.get(d.UserSettings.keys.SessionParams));
if(!F(h.RequestParameter.DetailStyleId,J.styleId)){var H="."+d.widget.CatalogFitRecs.WIDGET_NAME+",."+d.widget.ProductFitRecs.WIDGET_NAME;
b(H).each(function(){F(h.RequestParameter.StyleId,b(this).attr("id"))
})
}E+=f.generateWindowHash(M);
return E
};
this._fitrecs=function(){return t
};
this._widgets=w
}
})(tfcJQuery,TFCApp);
TFCApp.Attributes={logger:TFCApp.utility.Logger.getLogger("Attributes"),FIRST_NAME:"data-x-firstname",GENDER:"data-gender",IPS:"data-ips",LOCALE:"data-locale",STYLE_ID:"data-styleid",USERID:"data-userid",USER_ID:"data-user-id",STORE_REGISTERED:"data-registered",evaluateAttribute:function(g,e,f){var d,b=this.logger;
f=(TFCApp.getRunMode()!==TFCApp.RunModes.prod)&&f;
for(var c=0;
c<e.length;
c++){var a=e[c];
d=g.attr(a);
if((g.length>0)&&!((d==undefined)||(d==""))){if(f){g.each(function(){var h=TFCApp.extLibs(this).attr(a);
if(d!==h){b.error("All "+a+" values are not the same. Expected: "+d+", but got: "+h)
}})
}return d
}}return""
},getUserId:function(a){if(typeof a=="undefined"){a=TFCApp.extLibs("*["+this.USERID+"],*["+this.USER_ID+"]")
}return this.evaluateAttribute(a,[this.USERID,this.USER_ID],true)
},getLocaleId:function(a){if(typeof a=="undefined"||!a.attr){a=TFCApp.extLibs("*["+this.LOCALE+"]")
}return this.evaluateAttribute(a,[this.LOCALE],true)
}};
(function(c){var b=c.util;
var a=c.CookieHelper.extend({_constructor:function(d){this._userSettings=d
},setFirstPartyCookie:function(d){b.setCookie(d,true)
},setSessionParams:function(d){this._userSettings.set(c.UserSettings.keys.SessionParams,d)
},setSessionParamsMaxAge:function(d){this._userSettings.setMaxAge(d)
},_userSettings:null});
c.FitRecCookieHelper=a
})(TFCApp);
(function(c,e){var d=e.extLibs,a=e.utility.Logger.getLogger("True Fit Widget");
var b=e.Class.extend({abstractOnly:true,context:null,eventHash:null,templates:null,widgetName:null,isVisible:function(){e.Class.unimplemented()
},event:function(g,j){var i;
if(typeof g==="string"){if(c.isFunction(j)){if(!(g in this.eventHash)){this.eventHash[g]=new e.Signal()
}this.eventHash[g].listen(j)
}else{i=this.eventHash[g];
if(i){var h=Array.prototype.slice.call(arguments,1);
try{i.trigger.apply(i,h)
}catch(f){a.error("Exception was thrown by retailer code when processing the ("+this.widgetName+","+g+") event: "+f)
}}}}},getWidgetName:function(){return this.widgetName
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
}}},_getNodesForPreCall:function(f){return(f&&f.length>0)?d(f):this._getNodes()
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
})(tfcJQuery,TFCApp);
(function(b,c){var a=c.Class.extend({_constructor:function(f,d,e){this._sessionId=f;
this._contextKey=d;
this._contextVal=e
},show:function(h,i,g,d){var f=this._contextKey,j=this._contextVal,e=h+(this._sessionId?";jsessionid="+this._sessionId:"")+(f&&j?"?"+f+"="+j:"");
if(i===undefined){i="tfpNotices"
}if(g===undefined){g=820
}if(d===undefined){d=600
}return window.open(e,i,"menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=0,dependent=0,width="+g+",height="+d+",left=100,top=100")
},_sessionId:null,_contextKey:null,_contextVal:null});
b.component.NoticePopup=a
})(TFPApp,TFCApp);
(function(e,d){var c=e.analytics,b=e.type;
function a(f,g){e.checkArgs(b.String,b.PlainObject.optional());
return d.extend({eventName:f},g)
}c.AnalyticsEvent=a
})(TFCApp,tfcJQuery);
(function(h){var b=h.analytics,d=h.extLibs,f=h.util,i=h.type,j=h.utility.Logger.getLogger("AnalyticsEngine");
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
},_processQueue:function(){if(this._scriptStatus===a.Success){d.each(this._queue,function(l,m){m()
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
(function(f,d){var a=f.analytics,e=f.extLibs,c=["BodyShapeDescriptionPage","ClosetItemMoreDetailElement"];
var b=f.Class.extend({_constructor:function(){this._engines=[];
this._lastPageName=null
},addEngine:function(g){if(g instanceof a.AnalyticsEngine){if(d.inArray(g,this._engines)===-1){this._engines.push(g)
}else{throw"Cannot add the same engine twice"
}}else{throw"Analytics engine must have type AnalyticsEngine"
}},handlePageLoad:function(h){var g=h.pageName;
if(g===this._lastPageName&&d.inArray(g,c)>=0){return
}this._lastPageName=g;
e.each(this._engines,function(j,k){k.pageView(g,h)
})
},handleEvent:function(h){var g=h.eventName;
e.each(this._engines,function(j,k){k.event(g,h)
})
},_engines:null,_lastPageName:null});
a.AnalyticsManager=b
})(TFCApp,tfcJQuery);
(function(h,f){var e="optimizely",c=h.analytics,g=h.extLibs,d=h.type;
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
})(TFCApp,tfcJQuery);
(function(e,g){var c=g.type,f=g.extLibs,d=g.analytics,a,b={totalABTests:c.Integer};
a=d.AnalyticsEngine.extend({_constructor:function(h){this._super(h,b);
this._pageViewQueue=[];
this._loadedABTests=0;
this._totalABTests=this._config.totalABTests
},_initEngineImpl:function(){},_getEngineName:function(){return"ABTestCompleteEngine"
},_getScriptUrl:function(){return null
},_getSecureScriptUrl:function(){return null
},_sendPageViewImpl:function(h){if(this._loadedABTests===this._totalABTests){g.abTestComplete.trigger(h)
}else{this._pageViewQueue.push(h)
}},_sendEventImpl:function(){},incrementLoadedABTests:function(){if(++this._loadedABTests===this._totalABTests){f.each(this._pageViewQueue,function(h,j){g.abTestComplete.trigger(j)
});
this._pageViewQueue=null
}},_loadedABTests:null,_totalABTests:null,_pageViewQueue:null});
g.analytics.ABTestInterface=g.Class.extend({getEngines:function(){return this._engines.concat([this._abTestCompleteEngine])
},isActive:function(){var h=false;
f.each(this._engines,function(j,k){if(k.isActive()){h=true;
return false
}});
return h
},_getPageNames:function(){g.Class.unimplemented()
},_constructor:function(i){var h={},j=[],k;
f.each(this._getPageNames(),function(m,l){h[l]=l
});
f.each(i,function(l,n){var m=new d.ABTestingEngine({enabled:true,config:{id:n.id,scriptUrl:n.scriptUrl,targets:n.targets},pages:h});
j.push(m)
});
this._engines=j;
this._abTestCompleteEngine=k=new a({enabled:true,pages:h,config:{totalABTests:j.length}});
f.each(j,function(l,m){m.onLoad(g.bind(k.incrementLoadedABTests,k))
})
},_engines:null,_abTestCompleteEngine:null});
g.abTestComplete=new g.Signal()
})(tfcJQuery,TFCApp);
(function(b,d){var a=d.analytics,c=d.extLibs;
a.WidgetABTest=a.ABTestInterface.extend({_getPageNames:function(){var e=[],f;
c.each(d.widget,function(h,g){if(b.isFunction(g)&&g.isSubClassOf&&g.isSubClassOf(d.widget.BaseWidget)){f=g.WIDGET_NAME;
e.push(f)
}});
return e
}})
})(tfcJQuery,TFCApp);
(function(f){var a=f.util,c=f.type,e=f.extLibs,b=f.utility.Logger.getLogger("CookieData");
var d=f.Class.extend({_constructor:function(g){f.checkArgs(c.Object({name:c.String,types:c.PlainObject}));
if(!(c.Integer.test(g.maxAge)||c.Null.test(g.maxAge)||g.maxAge===undefined)){throw"maxAge argument must be an integer (specified age), null (session cookie), or undefined (must call setMaxAge before saving data)"
}this.__name=g.name;
this.__maxAge=g.maxAge;
this._data=this._read(g.types)
},setMaxAge:function(g){if(!(c.Integer.test(g)||c.Null.test(g))){throw"maxAge argument must be an integer (specified age) or null (session cookie)"
}this.__maxAge=g;
this._save()
},_read:function(h){var g=a.getCookie(this.__name),i=(g?a.deparam(g):{}),j={};
e.each(i,function(m,n){var l=(h[m]||h._),k;
if(l){k=l.fromString(n);
if(k!==undefined){j[m]=k
}}});
return j
},_save:function(){if(this.__maxAge===undefined){b.error("Attempted to save cookie data without a max age")
}else{a.setCookie({name:this.__name,value:a.param(this._data),maxAge:this.__maxAge},true)
}},_data:null,__name:null,__maxAge:undefined});
f.CookieData=d
})(TFCApp);
(function(g){var f=g.extLibs,d={WidgetTipsAutomaticShown:"widget.tips.automatic.shown",WidgetTipsAutomaticXout:"widget.tips.automatic.xout",WidgetTipsRolloverXout:"widget.tips.rollover.xout",SessionParams:"session.params"},c=g.type,b={},a={},e;
b[d.WidgetTipsAutomaticShown]={type:c.Boolean,defval:false};
b[d.WidgetTipsAutomaticXout]={type:c.Boolean,defval:false};
b[d.WidgetTipsRolloverXout]={type:c.Boolean,defval:false};
b[d.SessionParams]={type:c.String,defval:""};
f.each(b,function(h,i){a[h]=i.type
});
e=g.CookieData.extend({_constructor:function(){this._super({name:g.Constants.CookieName.UserSettings,types:a})
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
(function(d){var a=d.type,c=d.extLibs;
var b=d.CookieData.extend({_constructor:function(){this._super({name:d.Constants.CookieName.UserVisit,maxAge:null,types:{_:a.Integer}})
},getVisits:function(e){d.checkArgs(a.String);
return this._data[e]||0
},trackVisits:function(g){d.checkArgs(a.Array);
var e=this,f=this._data;
c.each(g,function(j,h){f[h]=e.getVisits(h)+1
});
this._save()
}});
d.UserVisitTracker=b
})(TFCApp);
(function(a){a.tips.TipEventLevel={automatic:3,rollover:2,click:1,off:0}
})(TFCApp);
(function(l,p){var f=l.extLibs,m=l.tips,n=l.type,o=l.UserSettings.keys,c,g,b,i,d,a,h,k,j;
c=l.Class.extend({_constructor:function(q){l.checkArgs(n.Object({tipConfig:n.PlainObject,userSettings:n.Instance(l.UserSettings),userVisitTracker:n.Instance(l.UserVisitTracker),widgetName:n.String,receiveMessageSignal:n.Instance(l.Signal).optional()}));
this._options=q
},getEventLevel:function(){l.Class.unimplemented()
},_isEnabled:function(){l.Class.unimplemented()
},_beforeTipOpen:function(){},_bindEvents:function(q){l.Class.unimplemented()
},bindEvents:function(r){l.checkArgs(n.Object({$widget:n.Instance(p),hidePrompt:n.Function,handleOpen:n.Function,$tipClickOpen:n.Instance(p),$tipRolloverOpen:n.Instance(p)}));
var q=this;
this._unbindEvents=this._bindEvents({$widget:r.$widget,hidePrompt:r.hidePrompt,handleOpen:function(s,t){if(q._isEnabled()){q._beforeTipOpen();
r.handleOpen(s,t)
}},$tipClickOpen:r.$tipClickOpen,$tipRolloverOpen:r.$tipRolloverOpen})
},unbindEvents:function(){if(this._unbindEvents){this._unbindEvents();
this._unbindEvents=null
}},_options:null,_unbindEvents:null});
g=c.extend({getEventLevel:function(){return m.TipEventLevel.click
},_isEnabled:function(){return true
},_bindEvents:function(r){var t=this,q=r.$tipClickOpen;
function s(){var u=f(this);
r.hidePrompt();
r.handleOpen([new a({receiveMessageSignal:t._options.receiveMessageSignal})],{ips:u.attr(l.Attributes.IPS)})
}q.bind("click",s);
return function(){q.unbind("click",s)
}
}});
b=c.extend({getEventLevel:function(){return m.TipEventLevel.rollover
},_isEnabled:function(){return true
},_bindEvents:function(v){var w=this,x=v.$tipRolloverOpen,u=v.$tipClickOpen,y=this._options,q=new k({beforeTipClose:t});
function r(){q.unbindEvents();
v.hidePrompt()
}function t(){u.unbind("click",r)
}function s(){u.bind("click",r);
v.handleOpen([new a({receiveMessageSignal:w._options.receiveMessageSignal,beforeTipClose:function(){y.userSettings.set(o.WidgetTipsRolloverXout,true);
t()
}}),q])
}x.bind("mouseenter",s);
return function(){x.unbind("mouseenter",s)
}
}});
i=c.extend({getEventLevel:function(){return m.TipEventLevel.automatic
},_isEnabled:function(){var q=this._options,r=q.userSettings;
return !r.get(o.WidgetTipsAutomaticShown)&&q.userVisitTracker.getVisits(q.widgetName)>=q.tipConfig.pageLoads
},_beforeTipOpen:function(){this._options.userSettings.set(o.WidgetTipsAutomaticShown,true)
},_bindEvents:function(z){var A=this,y=true,C=this._options,q=z.$widget,s=new h({hideDelay:C.tipConfig.hideDelay,beforeTipClose:v}),x=z.$tipClickOpen,r=l.bind(s.disableClose,s),w=l.bind(s.enableClose,s),B;
function t(){s.unbindEvents();
z.hidePrompt()
}function v(){x.unbind("click",t);
q.unbind("mouseenter",r);
q.unbind("mouseleave",w)
}function u(){x.bind("click",t);
q.bind("mouseenter",r);
q.bind("mouseleave",w);
z.handleOpen([new a({receiveMessageSignal:A._options.receiveMessageSignal,beforeTipClose:function(){C.userSettings.set(o.WidgetTipsAutomaticXout,true);
v()
}}),s])
}if(!this._eventInitializedOnce){this._eventInitializedOnce=true;
B=setTimeout(function(){f(function(){if(y){u()
}})
},1);
return function(){clearTimeout(B);
y=false
}
}},_eventInitializedOnce:false});
d=l.Class.extend({_constructor:function(q){l.checkArgs(n.Object({beforeTipClose:n.Function.optional(),receiveMessageSignal:n.Instance(l.Signal).optional()}).optional());
this._options=q
},bindEvents:function(r){l.checkArgs(n.Object({$widget:n.Instance(p),$tip:n.Instance(p),handleClose:n.Function,$tipClickClose:n.Instance(p)}));
var q=this;
this._unbindEvents=this._bindEvents({$widget:r.$widget,$tip:r.$tip,$tipClickClose:r.$tipClickClose,handleClose:function(){q._beforeTipClose();
r.handleClose()
}})
},_beforeTipClose:function(){var r=this._options,q=r&&r.beforeTipClose;
if(q){q()
}},_bindEvents:function(q){l.Class.unimplemented()
},unbindEvents:function(){if(this._unbindEvents){this._unbindEvents();
this._unbindEvents=null
}},_unbindEvents:null,_options:null});
a=d.extend({_constructor:function(q){this._super(q);
l.checkArgs(n.Object({selector:n.String.optional()}).optional())
},_bindEvents:function(u){var t=this._options,q=t&&t.selector,w=t&&t.receiveMessageSignal,v=u.handleClose,s=w&&!q,r=q?f(q,u.$widget):u.$tipClickClose;
function x(y){if(y==="close"){v()
}}if(s){w.listen(x)
}r.bind("click",v);
return function(){if(s){w.unlisten(x)
}r.unbind("click",v)
}
}});
h=d.extend({_constructor:function(q){this._super(q);
l.checkArgs(n.Object({hideDelay:n.Integer}));
this._hideDelay=q.hideDelay*1000;
this._enabled=true
},_bindEvents:function(r){var q=this,s=r.handleClose,t=setTimeout(function(){if(q._enabled){s()
}else{q._onEnable=s
}},this._hideDelay);
return function(){clearTimeout(t)
}
},disableClose:function(){this._enabled=false
},enableClose:function(){this._enabled=true;
if(this._onEnable){this._onEnable();
this._onEnable=null
}},_hideDelay:null,_enabled:null,_onEnable:null});
function e(s,t,r){var x=s.offset(),v=x.left,u=x.top,w=f.outerWidth(s),q=f.outerHeight(s);
return(v<t&&t<v+w)&&(u<r&&r<u+q)
}k=d.extend({_bindEvents:function(r){var s=null,v=r.$widget;
function u(){if(s!==null){clearTimeout(s);
s=null
}}function t(w){var y=w.pageX,x=w.pageY;
if(!(e(v,y,x)||e(r.$tip,y,x))){s=setTimeout(r.handleClose,250)
}}function q(){u()
}v.bind("mouseleave",t).bind("mouseenter",q);
return function(){v.unbind("mouseleave",t).unbind("mouseenter",q);
u()
}
}});
j=d.extend({_constructor:function(q){this._super(q);
l.checkArgs(n.Object({signal:n.Instance(l.Signal)}))
},_bindEvents:function(q){var s=this._options.signal,r=q.handleClose;
s.listen(r);
return function(){s.unlisten(r)
}
}});
m.PageLoadTipOpenTrigger=i;
m.MouseOverTipOpenTrigger=b;
m.ClickTipOpenTrigger=g;
m.ClickTipCloseTrigger=a;
m.SignalTipCloseTrigger=j
})(TFCApp,tfcJQuery);
(function(w,B){var b="WidgetWithTips",e="main",X="tfc-widget-with-tips",d="tfc-tip",I="tfc-tip-iframe",O="tfc-tip-iframe-loaded",x="tfc-tip-enabled",L="tfc-gsa-tip-enabled",A="tfc-tip-show-more",m="tfc-tip-click-show-more",Y="tfc-tip-click-show-less",Z="tfc-fitrec-result",r="tfc-tip-hide-prompt",u="tfc-tip-window-id",J="tfc-tip-receive-message-signal",y="tfc-tip-handle-estimation",k="tfc-tip-ab-test-setup",i="tfc-tip-click-open",V="tfc-tip-click-close",p="tfc-tip-rollover-open",R="tfc-large",ad="data-tip-id",f="data-general-size-advice",N="data-max-event-level",D=400,c=15,v="above",U="below",ab="right",T="small",E="large",q=B.extLibs,l=B.util,Q=B.tips,ae=B.type,K=B.Attributes,G=B.UserSettings.keys,g=B.Constants.Message;
function o(ah,ag,af){switch(af){case U:ag.css("top",ag.position().top+q.outerHeight(ah));
break;
case ab:ag.css("left",ag.position().left+q.outerWidth(ah));
break
}}function C(ao,ar,am){var ak=(ar===v||ar===U),ap=ak?"left":"top",aj=q(window),al=ao.offset()[ap]-aj[ak?"scrollLeft":"scrollTop"](),at=q[ak?"outerWidth":"outerHeight"](ao),ag=aj[ak?"width":"height"](),af=ag-(al+at),an=c-al,ai=c-af,aq=parseInt(ao.css(ap))||0;
function ah(ax,av,aw,au,ay){if(ax+av<0){if(ax>0){ao.css(ay,aw+ax)
}else{if(av>0){ao.css(ay,aw-av)
}else{ao.css(ay,aw-Math.min(-ax,aw-au))
}}}else{ao.css(ay,aw+(ax-av)/2)
}}am=ae.Number.test(am)?am:aq;
ah(an,ai,aq,am,ap);
return am
}function h(aj,ai){var ah=aj.height(),ag=(ai?"addClass":"removeClass"),af=(aj[ag])(A).height();
aj.css("height",ah);
aj.animate({height:af},{duration:D,complete:function(){aj.css("height","")
}}).css("overflow","visible")
}function M(ag,af){var ah=P(ag);
ah.animate({height:af},{duration:D})
}function H(ai,af,ag){var ah=j(ai);
if(af===g.Open){ah.addClass(O)
}else{if(af===g.Resize){M(ah,ag.height)
}else{if(af===g.Refresh){ah.stop(false,true);
tfc.calculate()
}else{if(af===g.Estimate){ai.data(y)()
}else{if(af===g.Update){this.event("update")
}else{if(af===g.Register){this._launchRegSignal.trigger();
this.context.launchAccountWindow(ag)
}}}}}}}function j(af){return q("."+d,af)
}function P(af){return q("."+I,af)
}function W(ag,af){return af?ag.filter("["+ad+'="'+af+'"]'):ag
}function S(ag,af){return W(q("."+i,ag),af)
}function aa(ag,af,ai){var ah=q("."+V,ag).filter(function(ak,aj){var al=q(aj).parents("."+d).length>0;
return(ai&&al)||(!ai&&!al)
});
return W(ah,af)
}function a(ag,af){return W(q("."+p,ag),af)
}function z(af){return af.attr(ad)
}function t(af){return l.stringToBool(af.attr(f)||"")
}function ac(af){var ag=af.attr(N);
return ag===undefined?null:Q.TipEventLevel[ag]
}function n(af){return af.hasClass(R)?E:T
}function F(af){function ag(ah){if(ah.length!==ah.filter("["+ad+"]").length){throw ad+" must be defined on every tip trigger because there are multiple tips for this widget."
}}ag(S(af));
ag(aa(af,undefined,false));
ag(a(af))
}function s(af){return af?r+"-"+af:r
}B.widget({abstractOnly:true,name:b,nameSpace:e,widgetName:X,_profileURI:null,isVisible:function(){return true
},_constructor:function(af){this._super(af);
this._profileURI=af.profileURI
},_initTip:function(am,af,ai){var al=j(am),aj=P(al).length,ah=this,ak=am.data(J),ag;
am.data(y,ai);
if(!ak){if(aj===1){ag=B.postMessageManager.nextWindowId();
ak=new B.Signal();
am.data(u,ag).data(J,ak);
ak.listen(B.bind(H,this,am));
B.postMessageManager.receiveMessage(B.bind(ak.trigger,ak),ah._profileURI,ag)
}else{if(aj>1){throw"Multiple secure tips for the same widget are not supported"
}}}if(!am.data(k)){am.data(k,true);
B.abTestComplete.listen(function(an){if(an===ah.getWidgetName()){ah._initAllTips(am,af)
}})
}this._launchRegSignal=new B.Signal();
al.each(function(an,ao){var ap=q(ao);
q("."+m,ap).click(B.bind(h,null,ap,true));
q("."+Y,ap).click(B.bind(h,null,ap,false))
})
},_initAllTips:function(al,af){var ak=j(al),ah=Q.TipEventLevel[this.context.tipConfig.eventLevel],ai=Q.TipEventLevel[af?"click":"off"],ag=w.extend({widgetName:this.getWidgetName(),receiveMessageSignal:al.data(J)},this.context),aj=ak.length>1;
if(aj){F(al)
}this._initTipOpenTriggers(al,ag,ai,ah,[],ak,w())
},_initTipOpenTriggers:function(af,at,ag,ai,ap,an,aq,al){var am=this,ah=[],ao=q("."+Z,af),ak=this.context.userSettings,ar=this.context.widgetDeviceType===B.Constants.DeviceType.Mobile,aj=B.bind(am._initTipOpenTriggers,am,af,at,ag,ai,ah,an);
q.each(ap,function(au,av){av.unbindEvents()
});
if(ai&&(ak.get(G.WidgetTipsAutomaticXout)||ak.get(G.WidgetTipsRolloverXout))){ai=Q.TipEventLevel.click
}if(ar){ai=ag=Q.TipEventLevel.off
}ao.toggleClass(x,!!ai);
ao.toggleClass(L,!!ag);
an.not(aq).each(function(aB,aF){var aA=q(aF),ay,av,aE,aD,aG,ax,az,aw,au=t(aA),aC=au?ag:ai,aH=ac(aA);
if(aH!==null&&aC>aH){aC=aH
}if(!aC){return
}av=z(aA);
aE=am.context.tipConfig.placement[n(aA)];
ay=P(aA);
aD=S(af,av);
aG=a(af,av);
aA.addClass("tfc-"+aE);
aw=[new Q.PageLoadTipOpenTrigger(at),new Q.MouseOverTipOpenTrigger(at),new Q.ClickTipOpenTrigger(at)];
q.each(aw,function(aJ,aI){ah.push(aI)
});
ax=function(aI,aJ){al&&al.trigger();
am._launchTip(af,aA,ay,aj,aE,aI,aJ)
};
az=B.bind(ao.addClass,ao,s(av));
q.each(aw,function(aI,aL){var aJ=aL.getEventLevel(),aK=aJ===Q.TipEventLevel.rollover&&l.isMobileSafari;
if(aC>=aL.getEventLevel()&&!aK){aL.bindEvents({$widget:af,hidePrompt:az,handleOpen:ax,$tipClickOpen:aD,$tipRolloverOpen:aG})
}})
});
return aj
},_launchTip:function(af,ak,ai,aj,ap,aq,ao){var am=this,an=aa(af,z(ak),false).add(aa(af,undefined,true)),ar=new B.Signal(),al=new Q.SignalTipCloseTrigger({signal:ar}),ah=new Q.SignalTipCloseTrigger({signal:am._launchRegSignal}),ag;
ag=aj(ak,ar);
aq.push(new Q.ClickTipCloseTrigger({selector:".tfc-fitrec-register"}));
aq.push(al);
aq.push(ah);
q.each(aq,function(av,au){var at=au===al,aw=function(){am._closeTip(af,ak,aq);
if(!at){ag(q())
}};
au.bindEvents({$widget:af,$tip:ak,$tipClickClose:an,handleClose:aw})
});
if(ai.length){ai.attr("src","").attr("src",tfc.getProfileUrl(w.extend({windowId:af.data(u),container:B.Constants.Container.Tip,styleId:af.attr(K.STYLE_ID)},ao)))
}ak.hide().fadeIn(D);
o(af,ak,ap);
C(ak,ap);
this.event("tipopen")
},_closeTip:function(ah,ag,af){q.each(af,function(aj,ai){ai.unbindEvents()
});
ag.fadeOut(D,function(){q("."+Z,ah).removeClass(s(z(ag)));
ag.removeClass(A).removeClass(O);
ag.css("left","").css("top","");
P(ag).css("height","")
});
this.event("tipclose")
},_launchRegSignal:null})
})(tfcJQuery,TFCApp);
(function(o,t){var Q=t.type,g=t.util;
var D={LogOut:"logout",OpenDialog:"opendialog",MoreInfo:"moreinfo",OpenRegistration:"openreg",Render:"render"};
var b={EstimationInProgress:"estimationinprogress",Error:"error",IncompleteGarment:"incompletegarment",IncompleteProfile:"incompleteprofile",InvalidDepartment:"invaliddepartment",InvalidGender:"invalidgender",NoUser:"nouser",NoStyle:"nostyle",NoStyleNoUser:"nostylenouser",Success:"success"};
var F={AnonymousNotRecommended:"anonymousnotrecommended",AnonymousRecommended:"anonymousrecommended",EstimationInProgress:"estimationinprogress",Error:"error",IncompleteGarment:"incompletegarment",IncompleteProfile:"incompleteprofile",InvalidDepartment:"invaliddepartment",InvalidGender:"invalidgender",NoUser:"nouser",NoStyle:"nostyle",NoStyleNoUser:"nostylenouser",NotRecommended:"notrecommended",Recommended:"recommended",RecommendedGarmentUserSizeOnly:"garmentusersizeonly",RecommendedGarmentSizeOnly:"garmentsizeonly",RecommendedUserSizeOnly:"usersizeonly"};
var B=D.OpenDialog,I=D.MoreInfo,h=D.OpenRegistration,J=D.Render,p="tfc-open-registration",P="tfc-fitrec-retry",d="tfc-retry-fitrec-inprogress",q="tfc-fitrec-register",a="FitRecs",c="main",K="tfc-fitrec-base",n="tfc-fitrec-result",A="tfc-text-dialog-result",z="tfc-close-text-dialog-trigger",j="tfc-open-text-dialog-trigger",r="tfc-text-dialog-overlay",N="tfc-cfg-overlay",H="tfc-turn-off-true-fit",y="tfc-gsa-enabled",C="tfc-gsa-available",l=t.extLibs,k=t.FitRecUtil,x=t.Attributes,s=["id","status","score","priority","size","advice","recommended"],G=["isAuthenticated","isInitialProfileComplete","isLoggedOut","isUserAvailable","isCredentialSaved"];
function i(R){return l("."+n,R)
}function M(R){return l("."+A,R)
}function m(S,R){return{ips:S.attr(x.IPS),firstName:R.attr(x.FIRST_NAME),gender:R.attr(x.GENDER),registered:R.attr(x.STORE_REGISTERED),styleId:R.attr(x.STYLE_ID)}
}function v(U,T,S,R){if(T.ips===t.Constants.IPS.FitDetails){R.event(B,S)
}U(T)
}function O(R){i(R).addClass(d);
tfc.calculate()
}function E(T,S){var R={};
l.each(T,function(U,V){if(o.inArray(U,S)>=0){R[U]=V
}});
return R
}function e(R){return E(R,s)
}function w(R){return E(R,G)
}function u(R){return{fitRecommendations:o.map(R.fitRecommendations,e),tfpUser:w(R.tfpUser)}
}function L(S,R,T){return{element:S,fitRecommendation:e(R),response:T}
}function f(S,R){S.stopPropagation();
R.tfc_jqmShow();
return false
}t.widget({abstractOnly:true,name:a,nameSpace:c,widgetName:K,retryTimeoutId:null,isVisible:function(){return true
},event:function(R,S){if(R===I){R=B
}this._super(R,S)
},preCall:function(T){var S="style",R=this._super(T),U=this._getNodesForPreCall(T);
if(this.retryTimeoutId){clearTimeout(this.retryTimeoutId)
}U.each(function(V){if(this.id!=""){if(R[S]==undefined||R[S]==null){R[S]=[]
}R[S].push(this.id)
}});
return R
},postCall:function(V){var W=V.fitRecommendations,Z=V.extraClasses.join(" "),U={},T=u(V),Y=this,S=Y._getNodes(),X=false,R=[];
l.each(W,function(ab,aa){U[aa.id]=aa;
if(aa.status===b.NoUser){X=true
}});
if(X){k.logAnalytics(Y.context,V.tfpUser,"/fit/"+Y.widgetName+"/nouser")
}S.each(function(aa,ab){Y._renderResultFitCall(l(ab),U[ab.id],V,T,Z,R)
});
if(R.length>0){this.retryTimeoutId=setTimeout(function(){O(S)
},5000)
}Y.event(J,{widgets:S.get(),response:T})
},setTemplates:function(R){this._super(R)
},_initModal:function(U,T,S){var V=l("body"),R=this;
l("."+p,U).click(function(){U.tfc_jqmHide();
R.event(h,T)
});
l("."+q,U).click(function(){U.tfc_jqmHide();
v(R.context.launchAccountWindow,m(l(this),S),T,R)
});
U.tfc_jqm({modal:false,closeClass:z,overlay:2,overlayClass:r+" "+N,toTop:true,onHide:function(W){W.o.remove();
W.w.remove()
}});
V.append(U)
},_renderResultCommon:function(R,S){var T;
i(R).addClass(S);
T=o.trim(R.attr(x.FIRST_NAME));
if(T.length>0){l(".tfc-first-name",R).html(T)
}},_renderResultTipEstimation:function(R,S){t.checkArgs(Q.Instance(o),Q.String);
var T=this.templates[F.EstimationInProgress];
M(R).remove();
i(R).replaceWith(k.evalTemplate(T).addClass(d)).remove();
this._renderResultCommon(R,S)
},_renderResultFitCall:function(af,T,Z,S,ah,ad){t.checkArgs(Q.Instance(o),Q.PlainObject.optional(),Q.Object({userFlags:Q.Object({generalSizeAdviceEnabled:Q.Boolean})}),Q.PlainObject,Q.String,Q.Array);
if(!Q.PlainObject.test(T)){return
}var ae=this,ag,U,aa,Y,X,ac,W,V;
function R(aj,ak){var ai=ae.templates;
if(ak){return o.map(ai,function(am,al){if(g.stringStartsWith(al,aj)&&g.stringEndsWith(al,ak)){return am
}return null
}).join("")
}else{if(aj in ai){return ai[aj]
}else{return""
}}}function ab(){ae.event(D.LogOut);
ae.context.logOutOfTrueFit()
}ac=Z.userFlags.generalSizeAdviceEnabled;
V=T.generalSizeAdvice;
W=!!V;
ag=T.templateName;
U=R(ag+"-text-dialog");
aa=R(ag,"-tip");
Y=ae.templates[ag];
X=L(af,T,S);
af.html(k.evalTemplate(U+aa+Y)).attr(x.STYLE_ID,T.id);
o("."+A,af).addClass(ah);
l("."+H,af).click(ab);
l("."+j,af).click(function(al){var aj=o("."+A,af).clone(),am=t.component.MessageDialog.getMessageDialog(aj),ak=null;
if(am){ak=new t.component.MessageDialog({$dialog:am,button:t.component.button})
}function ai(){ab();
aj.tfc_jqmHide()
}l("."+H,aj).unbind("click").click(function(){if(ak){ak.showConfirmationWithTitle(Z.turnOffMessage,Z.turnOffTitle,{yes:ai},Z.turnOffYesHtml,Z.turnOffNoHtml)
}else{ai()
}});
i(aj).addClass(ah);
ae.event(B,X);
ae._initModal(aj,X,af);
return f(al,aj)
});
l("."+p,af).click(function(){ae.event(h,X)
});
l("."+q,af).click(function(){v(ae.context.launchAccountWindow,m(l(this),af),X,ae)
});
ae._renderResultCommon(af,ah);
if((ag===F.AnonymousNotRecommended)||(ag===F.AnonymousRecommended)||(ag===F.NotRecommended)||(ag===F.Recommended)){k.animateFitScore(af,T.score,300,{"message.excellent.fit":Z.excellentFitMessage,"message.good.fit":Z.goodFitMessage,"message.not.recommended":Z.notRecommendedMessage});
l(".tfc-size",af).text(T.size)
}else{if((ag===F.RecommendedGarmentUserSizeOnly)||(ag===F.RecommendedGarmentSizeOnly)||(ag===F.RecommendedUserSizeOnly)){l(".tfc-size",af).text(T.size)
}else{if(ag===F.EstimationInProgress){ad.push(af);
l("."+P,af).click(function(){O(af)
})
}}}i(af).toggleClass(y,ac);
i(af).toggleClass(C,W);
W&&i(af).addClass("tfc-"+V);
ae._initTip(af,ac,t.bind(ae._renderResultTipEstimation,ae,af,ah));
ae.event(T.status,X)
}},t.widget.WidgetWithTips);
t.FitRecs=t.widget.FitRecs;
t.FitRecs.Event=D;
t.FitRecs.Status=b;
t.FitRecs.TemplateName=F
})(tfcJQuery,TFCApp);
(function(k,f){var a="FitAccount",g="main",i="tfc-fitrec-account",j="tfc-fitrec-register",c="create",h="render",e=f.extLibs,b=f.FitRecUtil;
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
})(tfcJQuery,TFCApp);
(function(c,p){var v="tfc-fitrec-register-content",s="tfc-fitrec-register-content-wrapper",f="tfc-fitrec-register-loading",r="tfc-fitrec-register-overlay",l="tfc-cfg-overlay",k="tfc-fitrec-register-primary-wrapper",t="isInitialProfileComplete",n="isManagingProfile",d="FitProfile",i="main",g="tfc-fitrec-register",x="tfc-fitrec-register-dialog",o="profile-url",m=document.location.hash||"",j=/^#?\d+&tfcmessage&/,q=c.Attributes,z=c.Constants,h=c.extLibs,e=c.FitRecUtil,b=c.util,a=z.Message;
var y={Close:"close",Complete:"complete",LogOut:"logout",Open:"open",PageLoad:"pageload",Render:"render",Update:"update"};
function w(E,A,B){var D=h("#"+x),C=tfc.getProfileUrl(p.extend({container:c.Constants.Container.AccountWindow,placement:"standalone"},B));
if(E===z.DeviceType.Mobile){A.save();
c.StateManager.clearState("tfcLoaded");
document.location.href=C
}else{D.data(o,C);
D.tfc_jqmShow()
}}var u=c.widget({abstractOnly:false,name:d,nameSpace:i,widgetName:g,isVisible:function(){return true
},$loadingTemplate:null,$modalDialog:null,initialized:false,scrollTop:0,heightToggleIntervalId:undefined,preCall:function(C){var A=this,D=A._getNodesForPreCall(C),B=A._super(C);
if(!A.initialized){D.click(function(F){var E=h(F.target);
A.context.launchAccountWindow({ips:E.attr(q.IPS),firstName:E.attr(q.FIRST_NAME),gender:E.attr(q.GENDER),registered:E.attr(q.STORE_REGISTERED),originWidget:A.widgetName})
})
}return B
},postCall:function(B){var A=this;
if(!A.initialized){A.event(y.Render,{widgets:A._getNodes(),response:B});
A.initialized=true
}},setTemplates:function(B){var A=this;
A._super(B);
if(p("#"+x).length===0){A.$loadingTemplate=e.evalTemplate(A.templates.loading,true);
A.$modalDialog=e.evalTemplate(A.templates.dialog);
A.$modalDialog.hide();
h("body").append(A.$modalDialog);
A.$modalDialog.tfc_jqm({modal:true,toTop:true,onShow:c.bind(A._dialogOnOpen,A),overlayClass:r+" "+l})
}},_constructor:function(B){var A=this,D=(j.test(m))?m.replace(j,""):undefined;
A._super(B);
if(D){var C=D.split("|")[0];
parent.parent.tfc.event("tfc-fitrec-register",C)
}B.launchAccountWindow=c.bind(w,null,B.profileDeviceType,B.mailboxHelper);
c.postMessageManager.receiveMessage(c.bind(A._receiveMessage,A),A.context.profileURI,c.postMessageManager.accountWindowId())
},_dialogClose:function(){var A=this,D=h("#"+x),F=h("#"+f),B=h("#"+k,D),C=h("iframe",D);
F.remove();
C.removeAttr("src");
var E=function(){C.remove();
D.tfc_jqmHide();
B.show()
};
D.css("left","");
D.css("top","");
if(e.isIE7||e.isIE8){B.hide();
E()
}else{B.fadeOut(300,function(){E()
})
}if(A.heightToggleIntervalId!==undefined){clearInterval(A.heightToggleIntervalId);
A.heightToggleIntervalId=undefined
}h.scrollTop(window,A.scrollTop);
tfc.calculate()
},_dialogOnOpen:function(C){var I=this,H=h(C.w),G=h("#"+k,H),B=h("#"+s,H),A=h("#"+v,H),E=h("iframe",A),D=h("#"+x).data(o),F=h("#"+f);
if((F.length==0)&&(I.$loadingTemplate.length>0)){if(e.isIE7||e.isIE8){I.$loadingTemplate.addClass("tfc-ie")
}h(document.body).append(I.$loadingTemplate);
F=h("#"+f)
}H.css("left","-3000px");
H.css("top","-3000px");
E.remove();
E=h(document.createElement("iframe"));
E.attr("id","tfc-fitrec-register-iframe");
E.attr("name","tfc-fitrec-register-iframe");
E.attr("scrolling","no");
E.attr("allowtransparency","true");
E.attr("frameborder","0");
E.load(function(){var K=h(window).height(),N=H.height(),T=B.offset(),M=E.offset(),L="",Q="",J=true,O=E.height();
if(B.is(":visible")){var P=function(U){return(U<0)?(U*-1):U
};
if(N>K){var S=P(T.top)-P(M.top),R=N-K;
if(R>0){Q=((R>S)?S:R)*-1
}}G.hide();
H.css("left",L);
H.css("top",Q);
if(e.isIE7||e.isIE8){G.show()
}else{G.fadeIn(300)
}I.scrollTop=h.scrollTop(window);
h.scrollTop(window,0);
F.remove();
if(E.attr("src")&&e.isIPad&&b.isMobileSafari&&e.isIOS6_1_3){I.heightToggleIntervalId=setInterval(function(){E.css("height",(J?O+5:O));
J=!J
},1000)
}}});
A.html("").append(E);
E.attr("src",D);
H.show();
H.removeData(o)
},_receiveMessage:function(B,C){var A=this;
switch(B){case a.Close:A._dialogClose();
A.event(y.Close,{data:[]});
break;
case a.Complete:C.isCredentialSaved=b.stringToBool(C.isCredentialSaved);
A.event(y.Complete,C);
break;
case a.Open:A.event(y.Open,{data:C});
break;
case a.PageLoad:C[t]=b.stringToBool(C[t]);
C[n]=b.stringToBool(C[n]);
A.event(y.PageLoad,C);
break;
case a.Update:A.event(y.Update,{data:C});
break;
case a.LogOut:A.event(y.LogOut);
break;
case a.TrackVisit:A.context.userVisitTracker.trackVisits([C.visitKey]);
break
}}});
u.WIDGET_NAME=g;
c.widget.FitProfile=u
})(TFCApp,tfcJQuery);
(function(c,e){var b="CatalogFitRecs",a="main",d="tfc-fitrec-catalog";
e.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d},e.widget.FitRecs)
})(tfcJQuery,TFCApp);
(function(c,e){var b="ProductFitRecs",a="main",d="tfc-fitrec-product";
e.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d},e.widget.FitRecs)
})(tfcJQuery,TFCApp);
(function(g){var d="OrderNotify",a="main",e="tfc-order-notify",b="data-orderid",f=g.extLibs,c=g.Constants.RequestParameter;
g.widget({abstractOnly:false,context:null,name:d,nameSpace:a,widgetName:e,isVisible:function(){return false
},preCall:function(j){var h=this,i=this._super(j),k=this._getNodesForPreCall(j);
k.each(function(){h._addParam(f(this),b,c.OrderId,i)
});
return i
},_constructor:function(h){this.context=h
}})
})(TFCApp);
(function(c,f){var b="SetUserId",d="tfc-set-userid",a="main",e=f.extLibs;
f.widget.SetUserId=f.widget({abstractOnly:false,name:b,nameSpace:a,widgetName:d,isVisible:function(){return false
},preCall:function(g){return this._super(g)
},postCall:function(g){this.event("render",{widgets:e("."+this.widgetName).get(),response:g})
}})
})(tfcJQuery,TFCApp);
(function(b,c,a){b(function(){var h=c.extLibs,e=new c.analytics.AnalyticsManager(),g=new c.UserSettings(),f=tfcManager.configuration.experiments||[],d;
c.cookieHelper=new c.FitRecCookieHelper(g);
a.noticePopup=new a.component.NoticePopup();
window.tfc=new c.FitRecService(tfcManager.configuration,e,g);
d=c.experiment=new c.analytics.WidgetABTest(f);
h.each(d.getEngines(),function(j,k){e.addEngine(k)
});
c.StateManager.clearState("tfcLoaded");
b(window).bind("popstate",function(){tfc.calculate(undefined,true)
});
tfc.calculate(undefined,true)
})
})(tfcJQuery,TFCApp,TFPApp);
