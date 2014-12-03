/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function(window,undefined){var rootjQuery,readyList,document=window.document,location=window.location,navigator=window.navigator,_jQuery=window.jQuery,_$=window.$,core_push=Array.prototype.push,core_slice=Array.prototype.slice,core_indexOf=Array.prototype.indexOf,core_toString=Object.prototype.toString,core_hasOwn=Object.prototype.hasOwnProperty,core_trim=String.prototype.trim,jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery)
},core_pnum=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,core_rnotwhite=/\S/,core_rspace=/\s+/,rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,rquickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,rvalidchars=/^[\],:{}\s]*$/,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rvalidescape=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,rvalidtokens=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi,fcamelCase=function(all,letter){return(letter+"").toUpperCase()
},DOMContentLoaded=function(){if(document.addEventListener){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
jQuery.ready()
}else{if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);
jQuery.ready()
}}},class2type={};
jQuery.fn=jQuery.prototype={constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem,ret,doc;
if(!selector){return this
}if(selector.nodeType){this.context=this[0]=selector;
this.length=1;
return this
}if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null]
}else{match=rquickExpr.exec(selector)
}if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;
doc=(context&&context.nodeType?context.ownerDocument||context:document);
selector=jQuery.parseHTML(match[1],doc,true);
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){this.attr.call(selector,context,true)
}return jQuery.merge(this,selector)
}else{elem=document.getElementById(match[2]);
if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector)
}this.length=1;
this[0]=elem
}this.context=document;
this.selector=selector;
return this
}}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)
}else{return this.constructor(context).find(selector)
}}}else{if(jQuery.isFunction(selector)){return rootjQuery.ready(selector)
}}if(selector.selector!==undefined){this.selector=selector.selector;
this.context=selector.context
}return jQuery.makeArray(selector,this)
},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length
},toArray:function(){return core_slice.call(this)
},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num])
},pushStack:function(elems,name,selector){var ret=jQuery.merge(this.constructor(),elems);
ret.prevObject=this;
ret.context=this.context;
if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector
}else{if(name){ret.selector=this.selector+"."+name+"("+selector+")"
}}return ret
},each:function(callback,args){return jQuery.each(this,callback,args)
},ready:function(fn){jQuery.ready.promise().done(fn);
return this
},eq:function(i){i=+i;
return i===-1?this.slice(i):this.slice(i,i+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(core_slice.apply(this,arguments),"slice",core_slice.call(arguments).join(","))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},end:function(){return this.prevObject||this.constructor(null)
},push:core_push,sort:[].sort,splice:[].splice};
jQuery.fn.init.prototype=jQuery.fn;
jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;
if(typeof target==="boolean"){deep=target;
target=arguments[1]||{};
i=2
}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}
}if(length===i){target=this;
--i
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(name in options){src=target[name];
copy=options[name];
if(target===copy){continue
}if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[]
}else{clone=src&&jQuery.isPlainObject(src)?src:{}
}target[name]=jQuery.extend(deep,clone,copy)
}else{if(copy!==undefined){target[name]=copy
}}}}}return target
};
jQuery.extend({noConflict:function(deep){if(window.$===jQuery){window.$=_$
}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery
}return jQuery
},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++
}else{jQuery.ready(true)
}},ready:function(wait){if(wait===true?--jQuery.readyWait:jQuery.isReady){return
}if(!document.body){return setTimeout(jQuery.ready,1)
}jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){return
}readyList.resolveWith(document,[jQuery]);
if(jQuery.fn.trigger){jQuery(document).trigger("ready").off("ready")
}},isFunction:function(obj){return jQuery.type(obj)==="function"
},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array"
},isWindow:function(obj){return obj!=null&&obj==obj.window
},isNumeric:function(obj){return !isNaN(parseFloat(obj))&&isFinite(obj)
},type:function(obj){return obj==null?String(obj):class2type[core_toString.call(obj)]||"object"
},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false
}try{if(obj.constructor&&!core_hasOwn.call(obj,"constructor")&&!core_hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false
}}catch(e){return false
}var key;
for(key in obj){}return key===undefined||core_hasOwn.call(obj,key)
},isEmptyObject:function(obj){var name;
for(name in obj){return false
}return true
},error:function(msg){throw new Error(msg)
},parseHTML:function(data,context,scripts){var parsed;
if(!data||typeof data!=="string"){return null
}if(typeof context==="boolean"){scripts=context;
context=0
}context=context||document;
if((parsed=rsingleTag.exec(data))){return[context.createElement(parsed[1])]
}parsed=jQuery.buildFragment([data],context,scripts?null:[]);
return jQuery.merge([],(parsed.cacheable?jQuery.clone(parsed.fragment):parsed.fragment).childNodes)
},parseJSON:function(data){if(!data||typeof data!=="string"){return null
}data=jQuery.trim(data);
if(window.JSON&&window.JSON.parse){return window.JSON.parse(data)
}if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))()
}jQuery.error("Invalid JSON: "+data)
},parseXML:function(data){var xml,tmp;
if(!data||typeof data!=="string"){return null
}try{if(window.DOMParser){tmp=new DOMParser();
xml=tmp.parseFromString(data,"text/xml")
}else{xml=new ActiveXObject("Microsoft.XMLDOM");
xml.async="false";
xml.loadXML(data)
}}catch(e){xml=undefined
}if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data)
}return xml
},noop:function(){},globalEval:function(data){if(data&&core_rnotwhite.test(data)){(window.execScript||function(data){window["eval"].call(window,data)
})(data)
}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)
},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase()
},each:function(obj,callback,args){var name,i=0,length=obj.length,isObj=length===undefined||jQuery.isFunction(obj);
if(args){if(isObj){for(name in obj){if(callback.apply(obj[name],args)===false){break
}}}else{for(;
i<length;
){if(callback.apply(obj[i++],args)===false){break
}}}}else{if(isObj){for(name in obj){if(callback.call(obj[name],name,obj[name])===false){break
}}}else{for(;
i<length;
){if(callback.call(obj[i],i,obj[i++])===false){break
}}}}return obj
},trim:core_trim&&!core_trim.call("\uFEFF\xA0")?function(text){return text==null?"":core_trim.call(text)
}:function(text){return text==null?"":(text+"").replace(rtrim,"")
},makeArray:function(arr,results){var type,ret=results||[];
if(arr!=null){type=jQuery.type(arr);
if(arr.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(arr)){core_push.call(ret,arr)
}else{jQuery.merge(ret,arr)
}}return ret
},inArray:function(elem,arr,i){var len;
if(arr){if(core_indexOf){return core_indexOf.call(arr,elem,i)
}len=arr.length;
i=i?i<0?Math.max(0,len+i):i:0;
for(;
i<len;
i++){if(i in arr&&arr[i]===elem){return i
}}}return -1
},merge:function(first,second){var l=second.length,i=first.length,j=0;
if(typeof l==="number"){for(;
j<l;
j++){first[i++]=second[j]
}}else{while(second[j]!==undefined){first[i++]=second[j++]
}}first.length=i;
return first
},grep:function(elems,callback,inv){var retVal,ret=[],i=0,length=elems.length;
inv=!!inv;
for(;
i<length;
i++){retVal=!!callback(elems[i],i);
if(inv!==retVal){ret.push(elems[i])
}}return ret
},map:function(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));
if(isArray){for(;
i<length;
i++){value=callback(elems[i],i,arg);
if(value!=null){ret[ret.length]=value
}}}else{for(key in elems){value=callback(elems[key],key,arg);
if(value!=null){ret[ret.length]=value
}}}return ret.concat.apply([],ret)
},guid:1,proxy:function(fn,context){var tmp,args,proxy;
if(typeof context==="string"){tmp=fn[context];
context=fn;
fn=tmp
}if(!jQuery.isFunction(fn)){return undefined
}args=core_slice.call(arguments,2);
proxy=function(){return fn.apply(context,args.concat(core_slice.call(arguments)))
};
proxy.guid=fn.guid=fn.guid||jQuery.guid++;
return proxy
},access:function(elems,fn,key,value,chainable,emptyGet,pass){var exec,bulk=key==null,i=0,length=elems.length;
if(key&&typeof key==="object"){for(i in key){jQuery.access(elems,fn,i,key[i],1,emptyGet,value)
}chainable=1
}else{if(value!==undefined){exec=pass===undefined&&jQuery.isFunction(value);
if(bulk){if(exec){exec=fn;
fn=function(elem,key,value){return exec.call(jQuery(elem),value)
}
}else{fn.call(elems,value);
fn=null
}}if(fn){for(;
i<length;
i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)
}}chainable=1
}}return chainable?elems:bulk?fn.call(elems):length?fn(elems[0],key):emptyGet
},now:function(){return(new Date()).getTime()
}});
jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred();
if(document.readyState==="complete"){setTimeout(jQuery.ready,1)
}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
window.addEventListener("load",jQuery.ready,false)
}else{document.attachEvent("onreadystatechange",DOMContentLoaded);
window.attachEvent("onload",jQuery.ready);
var top=false;
try{top=window.frameElement==null&&document.documentElement
}catch(e){}if(top&&top.doScroll){(function doScrollCheck(){if(!jQuery.isReady){try{top.doScroll("left")
}catch(e){return setTimeout(doScrollCheck,50)
}jQuery.ready()
}})()
}}}}return readyList.promise(obj)
};
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()
});
rootjQuery=jQuery(document);
var optionsCache={};
function createOptions(options){var object=optionsCache[options]={};
jQuery.each(options.split(core_rspace),function(_,flag){object[flag]=true
});
return object
}jQuery.Callbacks=function(options){options=typeof options==="string"?(optionsCache[options]||createOptions(options)):jQuery.extend({},options);
var memory,fired,firing,firingStart,firingLength,firingIndex,list=[],stack=!options.once&&[],fire=function(data){memory=options.memory&&data;
fired=true;
firingIndex=firingStart||0;
firingStart=0;
firingLength=list.length;
firing=true;
for(;
list&&firingIndex<firingLength;
firingIndex++){if(list[firingIndex].apply(data[0],data[1])===false&&options.stopOnFalse){memory=false;
break
}}firing=false;
if(list){if(stack){if(stack.length){fire(stack.shift())
}}else{if(memory){list=[]
}else{self.disable()
}}}},self={add:function(){if(list){var start=list.length;
(function add(args){jQuery.each(args,function(_,arg){var type=jQuery.type(arg);
if(type==="function"){if(!options.unique||!self.has(arg)){list.push(arg)
}}else{if(arg&&arg.length&&type!=="string"){add(arg)
}}})
})(arguments);
if(firing){firingLength=list.length
}else{if(memory){firingStart=start;
fire(memory)
}}}return this
},remove:function(){if(list){jQuery.each(arguments,function(_,arg){var index;
while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);
if(firing){if(index<=firingLength){firingLength--
}if(index<=firingIndex){firingIndex--
}}}})
}return this
},has:function(fn){return jQuery.inArray(fn,list)>-1
},empty:function(){list=[];
return this
},disable:function(){list=stack=memory=undefined;
return this
},disabled:function(){return !list
},lock:function(){stack=undefined;
if(!memory){self.disable()
}return this
},locked:function(){return !stack
},fireWith:function(context,args){args=args||[];
args=[context,args.slice?args.slice():args];
if(list&&(!fired||stack)){if(firing){stack.push(args)
}else{fire(args)
}}return this
},fire:function(){self.fireWith(this,arguments);
return this
},fired:function(){return !!fired
}};
return self
};
jQuery.extend({Deferred:function(func){var tuples=[["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],state="pending",promise={state:function(){return state
},always:function(){deferred.done(arguments).fail(arguments);
return this
},then:function(){var fns=arguments;
return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var action=tuple[0],fn=fns[i];
deferred[tuple[1]](jQuery.isFunction(fn)?function(){var returned=fn.apply(this,arguments);
if(returned&&jQuery.isFunction(returned.promise)){returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
}else{newDefer[action+"With"](this===deferred?newDefer:this,[returned])
}}:newDefer[action])
});
fns=null
}).promise()
},promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise
}},deferred={};
promise.pipe=promise.then;
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3];
promise[tuple[1]]=list.add;
if(stateString){list.add(function(){state=stateString
},tuples[i^1][2].disable,tuples[2][2].lock)
}deferred[tuple[0]]=list.fire;
deferred[tuple[0]+"With"]=list.fireWith
});
promise.promise(deferred);
if(func){func.call(deferred,deferred)
}return deferred
},when:function(subordinate){var i=0,resolveValues=core_slice.call(arguments),length=resolveValues.length,remaining=length!==1||(subordinate&&jQuery.isFunction(subordinate.promise))?length:0,deferred=remaining===1?subordinate:jQuery.Deferred(),updateFunc=function(i,contexts,values){return function(value){contexts[i]=this;
values[i]=arguments.length>1?core_slice.call(arguments):value;
if(values===progressValues){deferred.notifyWith(contexts,values)
}else{if(!(--remaining)){deferred.resolveWith(contexts,values)
}}}
},progressValues,progressContexts,resolveContexts;
if(length>1){progressValues=new Array(length);
progressContexts=new Array(length);
resolveContexts=new Array(length);
for(;
i<length;
i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues))
}else{--remaining
}}}if(!remaining){deferred.resolveWith(resolveContexts,resolveValues)
}return deferred.promise()
}});
jQuery.support=(function(){var support,all,a,select,opt,input,fragment,eventName,i,isSupported,clickFn,div=document.createElement("div");
div.setAttribute("className","t");
div.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
all=div.getElementsByTagName("*");
a=div.getElementsByTagName("a")[0];
if(!all||!a||!all.length){return{}
}select=document.createElement("select");
opt=select.appendChild(document.createElement("option"));
input=div.getElementsByTagName("input")[0];
a.style.cssText="top:1px;float:left;opacity:.5";
support={leadingWhitespace:(div.firstChild.nodeType===3),tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.5/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:div.className!=="t",enctype:!!document.createElement("form").enctype,html5Clone:document.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",boxModel:(document.compatMode==="CSS1Compat"),submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,boxSizingReliable:true,pixelPosition:false};
input.checked=true;
support.noCloneChecked=input.cloneNode(true).checked;
select.disabled=true;
support.optDisabled=!opt.disabled;
try{delete div.test
}catch(e){support.deleteExpando=false
}if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",clickFn=function(){support.noCloneEvent=false
});
div.cloneNode(true).fireEvent("onclick");
div.detachEvent("onclick",clickFn)
}input=document.createElement("input");
input.value="t";
input.setAttribute("type","radio");
support.radioValue=input.value==="t";
input.setAttribute("checked","checked");
input.setAttribute("name","t");
div.appendChild(input);
fragment=document.createDocumentFragment();
fragment.appendChild(div.lastChild);
support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;
support.appendChecked=input.checked;
fragment.removeChild(input);
fragment.appendChild(div);
if(div.attachEvent){for(i in {submit:true,change:true,focusin:true}){eventName="on"+i;
isSupported=(eventName in div);
if(!isSupported){div.setAttribute(eventName,"return;");
isSupported=(typeof div[eventName]==="function")
}support[i+"Bubbles"]=isSupported
}}jQuery(function(){var container,div,tds,marginDiv,divReset="padding:0;margin:0;border:0;display:block;overflow:hidden;",body=document.getElementsByTagName("body")[0];
if(!body){return
}container=document.createElement("div");
container.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
body.insertBefore(container,body.firstChild);
div=document.createElement("div");
container.appendChild(div);
div.innerHTML="<table><tr><td></td><td>t</td></tr></table>";
tds=div.getElementsByTagName("td");
tds[0].style.cssText="padding:0;margin:0;border:0;display:none";
isSupported=(tds[0].offsetHeight===0);
tds[0].style.display="";
tds[1].style.display="none";
support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);
div.innerHTML="";
div.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
support.boxSizing=(div.offsetWidth===4);
support.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==1);
if(window.getComputedStyle){support.pixelPosition=(window.getComputedStyle(div,null)||{}).top!=="1%";
support.boxSizingReliable=(window.getComputedStyle(div,null)||{width:"4px"}).width==="4px";
marginDiv=document.createElement("div");
marginDiv.style.cssText=div.style.cssText=divReset;
marginDiv.style.marginRight=marginDiv.style.width="0";
div.style.width="1px";
div.appendChild(marginDiv);
support.reliableMarginRight=!parseFloat((window.getComputedStyle(marginDiv,null)||{}).marginRight)
}if(typeof div.style.zoom!=="undefined"){div.innerHTML="";
div.style.cssText=divReset+"width:1px;padding:1px;display:inline;zoom:1";
support.inlineBlockNeedsLayout=(div.offsetWidth===3);
div.style.display="block";
div.style.overflow="visible";
div.innerHTML="<div></div>";
div.firstChild.style.width="5px";
support.shrinkWrapBlocks=(div.offsetWidth!==3);
container.style.zoom=1
}body.removeChild(container);
container=div=tds=marginDiv=null
});
fragment.removeChild(div);
all=a=select=opt=input=fragment=div=null;
return support
})();
var rbrace=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,rmultiDash=/([A-Z])/g;
jQuery.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];
return !!elem&&!isEmptyDataObject(elem)
},data:function(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return
}var thisCache,ret,internalKey=jQuery.expando,getByName=typeof name==="string",isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[internalKey]:elem[internalKey]&&internalKey;
if((!id||!cache[id]||(!pvt&&!cache[id].data))&&getByName&&data===undefined){return
}if(!id){if(isNode){elem[internalKey]=id=jQuery.deletedIds.pop()||jQuery.guid++
}else{id=internalKey
}}if(!cache[id]){cache[id]={};
if(!isNode){cache[id].toJSON=jQuery.noop
}}if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id]=jQuery.extend(cache[id],name)
}else{cache[id].data=jQuery.extend(cache[id].data,name)
}}thisCache=cache[id];
if(!pvt){if(!thisCache.data){thisCache.data={}
}thisCache=thisCache.data
}if(data!==undefined){thisCache[jQuery.camelCase(name)]=data
}if(getByName){ret=thisCache[name];
if(ret==null){ret=thisCache[jQuery.camelCase(name)]
}}else{ret=thisCache
}return ret
},removeData:function(elem,name,pvt){if(!jQuery.acceptData(elem)){return
}var thisCache,i,l,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:jQuery.expando;
if(!cache[id]){return
}if(name){thisCache=pvt?cache[id]:cache[id].data;
if(thisCache){if(!jQuery.isArray(name)){if(name in thisCache){name=[name]
}else{name=jQuery.camelCase(name);
if(name in thisCache){name=[name]
}else{name=name.split(" ")
}}}for(i=0,l=name.length;
i<l;
i++){delete thisCache[name[i]]
}if(!(pvt?isEmptyDataObject:jQuery.isEmptyObject)(thisCache)){return
}}}if(!pvt){delete cache[id].data;
if(!isEmptyDataObject(cache[id])){return
}}if(isNode){jQuery.cleanData([elem],true)
}else{if(jQuery.support.deleteExpando||cache!=cache.window){delete cache[id]
}else{cache[id]=null
}}},_data:function(elem,name,data){return jQuery.data(elem,name,data,true)
},acceptData:function(elem){var noData=elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()];
return !noData||noData!==true&&elem.getAttribute("classid")===noData
}});
jQuery.fn.extend({data:function(key,value){var parts,part,attr,name,l,elem=this[0],i=0,data=null;
if(key===undefined){if(this.length){data=jQuery.data(elem);
if(elem.nodeType===1&&!jQuery._data(elem,"parsedAttrs")){attr=elem.attributes;
for(l=attr.length;
i<l;
i++){name=attr[i].name;
if(!name.indexOf("data-")){name=jQuery.camelCase(name.substring(5));
dataAttr(elem,name,data[name])
}}jQuery._data(elem,"parsedAttrs",true)
}}return data
}if(typeof key==="object"){return this.each(function(){jQuery.data(this,key)
})
}parts=key.split(".",2);
parts[1]=parts[1]?"."+parts[1]:"";
part=parts[1]+"!";
return jQuery.access(this,function(value){if(value===undefined){data=this.triggerHandler("getData"+part,[parts[0]]);
if(data===undefined&&elem){data=jQuery.data(elem,key);
data=dataAttr(elem,key,data)
}return data===undefined&&parts[1]?this.data(parts[0]):data
}parts[1]=value;
this.each(function(){var self=jQuery(this);
self.triggerHandler("setData"+part,parts);
jQuery.data(this,key,value);
self.triggerHandler("changeData"+part,parts)
})
},null,value,arguments.length>1,null,false)
},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})
}});
function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();
data=elem.getAttribute(name);
if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data
}catch(e){}jQuery.data(elem,key,data)
}else{data=undefined
}}return data
}function isEmptyDataObject(obj){var name;
for(name in obj){if(name==="data"&&jQuery.isEmptyObject(obj[name])){continue
}if(name!=="toJSON"){return false
}}return true
}jQuery.extend({queue:function(elem,type,data){var queue;
if(elem){type=(type||"fx")+"queue";
queue=jQuery._data(elem,type);
if(data){if(!queue||jQuery.isArray(data)){queue=jQuery._data(elem,type,jQuery.makeArray(data))
}else{queue.push(data)
}}return queue||[]
}},dequeue:function(elem,type){type=type||"fx";
var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type)
};
if(fn==="inprogress"){fn=queue.shift();
startLength--
}if(fn){if(type==="fx"){queue.unshift("inprogress")
}delete hooks.stop;
fn.call(elem,next,hooks)
}if(!startLength&&hooks){hooks.empty.fire()
}},_queueHooks:function(elem,type){var key=type+"queueHooks";
return jQuery._data(elem,key)||jQuery._data(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){jQuery.removeData(elem,type+"queue",true);
jQuery.removeData(elem,key,true)
})})
}});
jQuery.fn.extend({queue:function(type,data){var setter=2;
if(typeof type!=="string"){data=type;
type="fx";
setter--
}if(arguments.length<setter){return jQuery.queue(this[0],type)
}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);
jQuery._queueHooks(this,type);
if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)
}})
},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)
})
},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";
return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);
hooks.stop=function(){clearTimeout(timeout)
}
})
},clearQueue:function(type){return this.queue(type||"fx",[])
},promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(!(--count)){defer.resolveWith(elements,[elements])
}};
if(typeof type!=="string"){obj=type;
type=undefined
}type=type||"fx";
while(i--){tmp=jQuery._data(elements[i],type+"queueHooks");
if(tmp&&tmp.empty){count++;
tmp.empty.add(resolve)
}}resolve();
return defer.promise(obj)
}});
var nodeHook,boolHook,fixSpecified,rclass=/[\t\r\n]/g,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea|)$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,getSetAttribute=jQuery.support.getSetAttribute;
jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,jQuery.attr,name,value,arguments.length>1)
},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name)
})
},prop:function(name,value){return jQuery.access(this,jQuery.prop,name,value,arguments.length>1)
},removeProp:function(name){name=jQuery.propFix[name]||name;
return this.each(function(){try{this[name]=undefined;
delete this[name]
}catch(e){}})
},addClass:function(value){var classNames,i,l,elem,setClass,c,cl;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className))
})
}if(value&&typeof value==="string"){classNames=value.split(core_rspace);
for(i=0,l=this.length;
i<l;
i++){elem=this[i];
if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value
}else{setClass=" "+elem.className+" ";
for(c=0,cl=classNames.length;
c<cl;
c++){if(setClass.indexOf(" "+classNames[c]+" ")<0){setClass+=classNames[c]+" "
}}elem.className=jQuery.trim(setClass)
}}}}return this
},removeClass:function(value){var removes,className,elem,c,cl,i,l;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className))
})
}if((value&&typeof value==="string")||value===undefined){removes=(value||"").split(core_rspace);
for(i=0,l=this.length;
i<l;
i++){elem=this[i];
if(elem.nodeType===1&&elem.className){className=(" "+elem.className+" ").replace(rclass," ");
for(c=0,cl=removes.length;
c<cl;
c++){while(className.indexOf(" "+removes[c]+" ")>=0){className=className.replace(" "+removes[c]+" "," ")
}}elem.className=value?jQuery.trim(className):""
}}}return this
},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";
if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal)
})
}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(core_rspace);
while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);
self[state?"addClass":"removeClass"](className)
}}else{if(type==="undefined"||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className)
}this.className=this.className||value===false?"":jQuery._data(this,"__className__")||""
}}})
},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;
for(;
i<l;
i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>=0){return true
}}return false
},val:function(value){var hooks,ret,isFunction,elem=this[0];
if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret
}ret=elem.value;
return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret
}return
}isFunction=jQuery.isFunction(value);
return this.each(function(i){var val,self=jQuery(this);
if(this.nodeType!==1){return
}if(isFunction){val=value.call(this,i,self.val())
}else{val=value
}if(val==null){val=""
}else{if(typeof val==="number"){val+=""
}else{if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+""
})
}}}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];
if(!hooks||!("set" in hooks)||hooks.set(this,val,"value")===undefined){this.value=val
}})
}});
jQuery.extend({valHooks:{option:{get:function(elem){var val=elem.attributes.value;
return !val||val.specified?elem.value:elem.text
}},select:{get:function(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one"||index<0,values=one?null:[],max=one?index+1:options.length,i=index<0?max:one?index:0;
for(;
i<max;
i++){option=options[i];
if((option.selected||i===index)&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();
if(one){return value
}values.push(value)
}}return values
},set:function(elem,value){var values=jQuery.makeArray(value);
jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0
});
if(!values.length){elem.selectedIndex=-1
}return values
}}},attrFn:{},attr:function(elem,name,value,pass){var ret,hooks,notxml,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return
}if(pass&&jQuery.isFunction(jQuery.fn[name])){return jQuery(elem)[name](value)
}if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value)
}notxml=nType!==1||!jQuery.isXMLDoc(elem);
if(notxml){name=name.toLowerCase();
hooks=jQuery.attrHooks[name]||(rboolean.test(name)?boolHook:nodeHook)
}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);
return
}else{if(hooks&&"set" in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret
}else{elem.setAttribute(name,value+"");
return value
}}}else{if(hooks&&"get" in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret
}else{ret=elem.getAttribute(name);
return ret===null?undefined:ret
}}},removeAttr:function(elem,value){var propName,attrNames,name,isBool,i=0;
if(value&&elem.nodeType===1){attrNames=value.split(core_rspace);
for(;
i<attrNames.length;
i++){name=attrNames[i];
if(name){propName=jQuery.propFix[name]||name;
isBool=rboolean.test(name);
if(!isBool){jQuery.attr(elem,name,"")
}elem.removeAttribute(getSetAttribute?name:propName);
if(isBool&&propName in elem){elem[propName]=false
}}}}},attrHooks:{type:{set:function(elem,value){if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed")
}else{if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;
elem.setAttribute("type",value);
if(val){elem.value=val
}return value
}}}},value:{get:function(elem,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.get(elem,name)
}return name in elem?elem.value:null
},set:function(elem,value,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.set(elem,value,name)
}elem.value=value
}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return
}notxml=nType!==1||!jQuery.isXMLDoc(elem);
if(notxml){name=jQuery.propFix[name]||name;
hooks=jQuery.propHooks[name]
}if(value!==undefined){if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret
}else{return(elem[name]=value)
}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret
}else{return elem[name]
}}},propHooks:{tabIndex:{get:function(elem){var attributeNode=elem.getAttributeNode("tabindex");
return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined
}}}});
boolHook={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);
return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined
},set:function(elem,value,name){var propName;
if(value===false){jQuery.removeAttr(elem,name)
}else{propName=jQuery.propFix[name]||name;
if(propName in elem){elem[propName]=true
}elem.setAttribute(name,name.toLowerCase())
}return name
}};
if(!getSetAttribute){fixSpecified={name:true,id:true,coords:true};
nodeHook=jQuery.valHooks.button={get:function(elem,name){var ret;
ret=elem.getAttributeNode(name);
return ret&&(fixSpecified[name]?ret.value!=="":ret.specified)?ret.value:undefined
},set:function(elem,value,name){var ret=elem.getAttributeNode(name);
if(!ret){ret=document.createAttribute(name);
elem.setAttributeNode(ret)
}return(ret.value=value+"")
}};
jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");
return value
}}})
});
jQuery.attrHooks.contenteditable={get:nodeHook.get,set:function(elem,value,name){if(value===""){value="false"
}nodeHook.set(elem,value,name)
}}
}if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function(elem){var ret=elem.getAttribute(name,2);
return ret===null?undefined:ret
}})
})
}if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText.toLowerCase()||undefined
},set:function(elem,value){return(elem.style.cssText=value+"")
}}
}if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function(elem){var parent=elem.parentNode;
if(parent){parent.selectedIndex;
if(parent.parentNode){parent.parentNode.selectedIndex
}}return null
}})
}if(!jQuery.support.enctype){jQuery.propFix.enctype="encoding"
}if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function(elem){return elem.getAttribute("value")===null?"on":elem.value
}}
})
}jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0)
}}})
});
var rformElems=/^(?:textarea|input|select)$/i,rtypenamespace=/^([^\.]*|)(?:\.(.+)|)$/,rhoverHack=/(?:^|\s)hover(\.\S+|)\b/,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,hoverHack=function(events){return jQuery.event.special.hover?events:events.replace(rhoverHack,"mouseenter$1 mouseleave$1")
};
jQuery.event={add:function(elem,types,handler,data,selector){var elemData,eventHandle,events,t,tns,type,namespaces,handleObj,handleObjIn,handlers,special;
if(elem.nodeType===3||elem.nodeType===8||!types||!handler||!(elemData=jQuery._data(elem))){return
}if(handler.handler){handleObjIn=handler;
handler=handleObjIn.handler;
selector=handleObjIn.selector
}if(!handler.guid){handler.guid=jQuery.guid++
}events=elemData.events;
if(!events){elemData.events=events={}
}eventHandle=elemData.handle;
if(!eventHandle){elemData.handle=eventHandle=function(e){return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.dispatch.apply(eventHandle.elem,arguments):undefined
};
eventHandle.elem=elem
}types=jQuery.trim(hoverHack(types)).split(" ");
for(t=0;
t<types.length;
t++){tns=rtypenamespace.exec(types[t])||[];
type=tns[1];
namespaces=(tns[2]||"").split(".").sort();
special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
special=jQuery.event.special[type]||{};
handleObj=jQuery.extend({type:type,origType:tns[1],data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);
handlers=events[type];
if(!handlers){handlers=events[type]=[];
handlers.delegateCount=0;
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle)
}}}}if(special.add){special.add.call(elem,handleObj);
if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid
}}if(selector){handlers.splice(handlers.delegateCount++,0,handleObj)
}else{handlers.push(handleObj)
}jQuery.event.global[type]=true
}elem=null
},global:{},remove:function(elem,types,handler,selector,mappedTypes){var t,tns,type,origType,namespaces,origCount,j,events,special,eventType,handleObj,elemData=jQuery.hasData(elem)&&jQuery._data(elem);
if(!elemData||!(events=elemData.events)){return
}types=jQuery.trim(hoverHack(types||"")).split(" ");
for(t=0;
t<types.length;
t++){tns=rtypenamespace.exec(types[t])||[];
type=origType=tns[1];
namespaces=tns[2];
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true)
}continue
}special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
eventType=events[type]||[];
origCount=eventType.length;
namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
for(j=0;
j<eventType.length;
j++){handleObj=eventType[j];
if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!namespaces||namespaces.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){eventType.splice(j--,1);
if(handleObj.selector){eventType.delegateCount--
}if(special.remove){special.remove.call(elem,handleObj)
}}}if(eventType.length===0&&origCount!==eventType.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle)
}delete events[type]
}}if(jQuery.isEmptyObject(events)){delete elemData.handle;
jQuery.removeData(elem,"events",true)
}},customEvent:{getData:true,setData:true,changeData:true},trigger:function(event,data,elem,onlyHandlers){if(elem&&(elem.nodeType===3||elem.nodeType===8)){return
}var cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType,type=event.type||event,namespaces=[];
if(rfocusMorph.test(type+jQuery.event.triggered)){return
}if(type.indexOf("!")>=0){type=type.slice(0,-1);
exclusive=true
}if(type.indexOf(".")>=0){namespaces=type.split(".");
type=namespaces.shift();
namespaces.sort()
}if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){return
}event=typeof event==="object"?event[jQuery.expando]?event:new jQuery.Event(type,event):new jQuery.Event(type);
event.type=type;
event.isTrigger=true;
event.exclusive=exclusive;
event.namespace=namespaces.join(".");
event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
ontype=type.indexOf(":")<0?"on"+type:"";
if(!elem){cache=jQuery.cache;
for(i in cache){if(cache[i].events&&cache[i].events[type]){jQuery.event.trigger(event,data,cache[i].handle.elem,true)
}}return
}event.result=undefined;
if(!event.target){event.target=elem
}data=data!=null?jQuery.makeArray(data):[];
data.unshift(event);
special=jQuery.event.special[type]||{};
if(special.trigger&&special.trigger.apply(elem,data)===false){return
}eventPath=[[elem,special.bindType||type]];
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;
cur=rfocusMorph.test(bubbleType+type)?elem:elem.parentNode;
for(old=elem;
cur;
cur=cur.parentNode){eventPath.push([cur,bubbleType]);
old=cur
}if(old===(elem.ownerDocument||document)){eventPath.push([old.defaultView||old.parentWindow||window,bubbleType])
}}for(i=0;
i<eventPath.length&&!event.isPropagationStopped();
i++){cur=eventPath[i][0];
event.type=eventPath[i][1];
handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");
if(handle){handle.apply(cur,data)
}handle=ontype&&cur[ontype];
if(handle&&jQuery.acceptData(cur)&&handle.apply&&handle.apply(cur,data)===false){event.preventDefault()
}}event.type=type;
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(elem.ownerDocument,data)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){if(ontype&&elem[type]&&((type!=="focus"&&type!=="blur")||event.target.offsetWidth!==0)&&!jQuery.isWindow(elem)){old=elem[ontype];
if(old){elem[ontype]=null
}jQuery.event.triggered=type;
elem[type]();
jQuery.event.triggered=undefined;
if(old){elem[ontype]=old
}}}}return event.result
},dispatch:function(event){event=jQuery.event.fix(event||window.event);
var i,j,cur,ret,selMatch,matched,matches,handleObj,sel,related,handlers=((jQuery._data(this,"events")||{})[event.type]||[]),delegateCount=handlers.delegateCount,args=core_slice.call(arguments),run_all=!event.exclusive&&!event.namespace,special=jQuery.event.special[event.type]||{},handlerQueue=[];
args[0]=event;
event.delegateTarget=this;
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return
}if(delegateCount&&!(event.button&&event.type==="click")){for(cur=event.target;
cur!=this;
cur=cur.parentNode||this){if(cur.disabled!==true||event.type!=="click"){selMatch={};
matches=[];
for(i=0;
i<delegateCount;
i++){handleObj=handlers[i];
sel=handleObj.selector;
if(selMatch[sel]===undefined){selMatch[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>=0:jQuery.find(sel,this,null,[cur]).length
}if(selMatch[sel]){matches.push(handleObj)
}}if(matches.length){handlerQueue.push({elem:cur,matches:matches})
}}}}if(handlers.length>delegateCount){handlerQueue.push({elem:this,matches:handlers.slice(delegateCount)})
}for(i=0;
i<handlerQueue.length&&!event.isPropagationStopped();
i++){matched=handlerQueue[i];
event.currentTarget=matched.elem;
for(j=0;
j<matched.matches.length&&!event.isImmediatePropagationStopped();
j++){handleObj=matched.matches[j];
if(run_all||(!event.namespace&&!handleObj.namespace)||event.namespace_re&&event.namespace_re.test(handleObj.namespace)){event.data=handleObj.data;
event.handleObj=handleObj;
ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);
if(ret!==undefined){event.result=ret;
if(ret===false){event.preventDefault();
event.stopPropagation()
}}}}}if(special.postDispatch){special.postDispatch.call(this,event)
}return event.result
},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode
}return event
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(event,original){var eventDoc,doc,body,button=original.button,fromElement=original.fromElement;
if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;
doc=eventDoc.documentElement;
body=eventDoc.body;
event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(!event.relatedTarget&&fromElement){event.relatedTarget=fromElement===event.target?original.toElement:fromElement
}if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)))
}return event
}},fix:function(event){if(event[jQuery.expando]){return event
}var i,prop,originalEvent=event,fixHook=jQuery.event.fixHooks[event.type]||{},copy=fixHook.props?this.props.concat(fixHook.props):this.props;
event=jQuery.Event(originalEvent);
for(i=copy.length;
i;
){prop=copy[--i];
event[prop]=originalEvent[prop]
}if(!event.target){event.target=originalEvent.srcElement||document
}if(event.target.nodeType===3){event.target=event.target.parentNode
}event.metaKey=!!event.metaKey;
return fixHook.filter?fixHook.filter(event,originalEvent):event
},special:{load:{noBubble:true},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle
}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null
}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});
if(bubble){jQuery.event.trigger(e,null,elem)
}else{jQuery.event.dispatch.call(elem,e)
}if(e.isDefaultPrevented()){event.preventDefault()
}}};
jQuery.event.handle=jQuery.event.dispatch;
jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false)
}}:function(elem,type,handle){var name="on"+type;
if(elem.detachEvent){if(typeof elem[name]==="undefined"){elem[name]=null
}elem.detachEvent(name,handle)
}};
jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props)
}if(src&&src.type){this.originalEvent=src;
this.type=src.type;
this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse
}else{this.type=src
}if(props){jQuery.extend(this,props)
}this.timeStamp=src&&src.timeStamp||jQuery.now();
this[jQuery.expando]=true
};
function returnFalse(){return false
}function returnTrue(){return true
}jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;
var e=this.originalEvent;
if(!e){return
}if(e.preventDefault){e.preventDefault()
}else{e.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=returnTrue;
var e=this.originalEvent;
if(!e){return
}if(e.stopPropagation){e.stopPropagation()
}e.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation()
},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj,selector=handleObj.selector;
if(!related||(related!==target&&!jQuery.contains(target,related))){event.type=handleObj.origType;
ret=handleObj.handler.apply(this,arguments);
event.type=fix
}return ret
}}
});
if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(){if(jQuery.nodeName(this,"form")){return false
}jQuery.event.add(this,"click._submit keypress._submit",function(e){var elem=e.target,form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;
if(form&&!jQuery._data(form,"_submit_attached")){jQuery.event.add(form,"submit._submit",function(event){event._submit_bubble=true
});
jQuery._data(form,"_submit_attached",true)
}})
},postDispatch:function(event){if(event._submit_bubble){delete event._submit_bubble;
if(this.parentNode&&!event.isTrigger){jQuery.event.simulate("submit",this.parentNode,event,true)
}}},teardown:function(){if(jQuery.nodeName(this,"form")){return false
}jQuery.event.remove(this,"._submit")
}}
}if(!jQuery.support.changeBubbles){jQuery.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){jQuery.event.add(this,"propertychange._change",function(event){if(event.originalEvent.propertyName==="checked"){this._just_changed=true
}});
jQuery.event.add(this,"click._change",function(event){if(this._just_changed&&!event.isTrigger){this._just_changed=false
}jQuery.event.simulate("change",this,event,true)
})
}return false
}jQuery.event.add(this,"beforeactivate._change",function(e){var elem=e.target;
if(rformElems.test(elem.nodeName)&&!jQuery._data(elem,"_change_attached")){jQuery.event.add(elem,"change._change",function(event){if(this.parentNode&&!event.isSimulated&&!event.isTrigger){jQuery.event.simulate("change",this.parentNode,event,true)
}});
jQuery._data(elem,"_change_attached",true)
}})
},handle:function(event){var elem=event.target;
if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){return event.handleObj.handler.apply(this,arguments)
}},teardown:function(){jQuery.event.remove(this,"._change");
return !rformElems.test(this.nodeName)
}}
}if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0,handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true)
};
jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true)
}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true)
}}}
})
}jQuery.fn.extend({on:function(types,selector,data,fn,one){var origFn,type;
if(typeof types==="object"){if(typeof selector!=="string"){data=data||selector;
selector=undefined
}for(type in types){this.on(type,selector,data,types[type],one)
}return this
}if(data==null&&fn==null){fn=selector;
data=selector=undefined
}else{if(fn==null){if(typeof selector==="string"){fn=data;
data=undefined
}else{fn=data;
data=selector;
selector=undefined
}}}if(fn===false){fn=returnFalse
}else{if(!fn){return this
}}if(one===1){origFn=fn;
fn=function(event){jQuery().off(event);
return origFn.apply(this,arguments)
};
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++)
}return this.each(function(){jQuery.event.add(this,types,fn,data,selector)
})
},one:function(types,selector,data,fn){return this.on(types,selector,data,fn,1)
},off:function(types,selector,fn){var handleObj,type;
if(types&&types.preventDefault&&types.handleObj){handleObj=types.handleObj;
jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);
return this
}if(typeof types==="object"){for(type in types){this.off(type,selector,types[type])
}return this
}if(selector===false||typeof selector==="function"){fn=selector;
selector=undefined
}if(fn===false){fn=returnFalse
}return this.each(function(){jQuery.event.remove(this,types,fn,selector)
})
},bind:function(types,data,fn){return this.on(types,null,data,fn)
},unbind:function(types,fn){return this.off(types,null,fn)
},live:function(types,data,fn){jQuery(this.context).on(types,this.selector,data,fn);
return this
},die:function(types,fn){jQuery(this.context).off(types,this.selector||"**",fn);
return this
},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn)
},undelegate:function(selector,types,fn){return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn)
},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)
})
},triggerHandler:function(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true)
}},toggle:function(fn){var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;
jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);
event.preventDefault();
return args[lastToggle].apply(this,arguments)||false
};
toggler.guid=guid;
while(i<args.length){args[i++].guid=guid
}return this.click(toggler)
},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)
}});
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;
data=null
}return arguments.length>0?this.on(name,null,data,fn):this.trigger(name)
};
if(rkeyEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.keyHooks
}if(rmouseEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.mouseHooks
}});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function(window,undefined){var cachedruns,assertGetIdNotName,Expr,getText,isXML,contains,compile,sortOrder,hasDuplicate,outermostContext,baseHasDuplicate=true,strundefined="undefined",expando=("sizcache"+Math.random()).replace(".",""),Token=String,document=window.document,docElem=document.documentElement,dirruns=0,done=0,pop=[].pop,push=[].push,slice=[].slice,indexOf=[].indexOf||function(elem){var i=0,len=this.length;
for(;
i<len;
i++){if(this[i]===elem){return i
}}return -1
},markFunction=function(fn,value){fn[expando]=value==null||value;
return fn
},createCache=function(){var cache={},keys=[];
return markFunction(function(key,value){if(keys.push(key)>Expr.cacheLength){delete cache[keys.shift()]
}return(cache[key+" "]=value)
},cache)
},classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),operators="([*^$|!~]?=)",attributes="\\["+whitespace+"*("+characterEncoding+")"+whitespace+"*(?:"+operators+whitespace+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+identifier+")|)|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+attributes+")|[^:]|\\\\.)*|.*))\\)|)",pos=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([\\x20\\t\\r\\n\\f>+~])"+whitespace+"*"),rpseudo=new RegExp(pseudos),rquickExpr=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,rnot=/^:not/,rsibling=/[\x20\t\r\n\f]*[+~]/,rendsWithNot=/:not\($/,rheader=/h\d/i,rinputs=/input|select|textarea|button/i,rbackslash=/\\(?!\\)/g,matchExpr={ID:new RegExp("^#("+characterEncoding+")"),CLASS:new RegExp("^\\.("+characterEncoding+")"),NAME:new RegExp("^\\[name=['\"]?("+characterEncoding+")['\"]?\\]"),TAG:new RegExp("^("+characterEncoding.replace("w","w*")+")"),ATTR:new RegExp("^"+attributes),PSEUDO:new RegExp("^"+pseudos),POS:new RegExp(pos,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),needsContext:new RegExp("^"+whitespace+"*[>+~]|"+pos,"i")},assert=function(fn){var div=document.createElement("div");
try{return fn(div)
}catch(e){return false
}finally{div=null
}},assertTagNameNoComments=assert(function(div){div.appendChild(document.createComment(""));
return !div.getElementsByTagName("*").length
}),assertHrefNotNormalized=assert(function(div){div.innerHTML="<a href='#'></a>";
return div.firstChild&&typeof div.firstChild.getAttribute!==strundefined&&div.firstChild.getAttribute("href")==="#"
}),assertAttributes=assert(function(div){div.innerHTML="<select></select>";
var type=typeof div.lastChild.getAttribute("multiple");
return type!=="boolean"&&type!=="string"
}),assertUsableClassName=assert(function(div){div.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!div.getElementsByClassName||!div.getElementsByClassName("e").length){return false
}div.lastChild.className="e";
return div.getElementsByClassName("e").length===2
}),assertUsableName=assert(function(div){div.id=expando+0;
div.innerHTML="<a name='"+expando+"'></a><div name='"+expando+"'></div>";
docElem.insertBefore(div,docElem.firstChild);
var pass=document.getElementsByName&&document.getElementsByName(expando).length===2+document.getElementsByName(expando+0).length;
assertGetIdNotName=!document.getElementById(expando);
docElem.removeChild(div);
return pass
});
try{slice.call(docElem.childNodes,0)[0].nodeType
}catch(e){slice=function(i){var elem,results=[];
for(;
(elem=this[i]);
i++){results.push(elem)
}return results
}
}function Sizzle(selector,context,results,seed){results=results||[];
context=context||document;
var match,elem,xml,m,nodeType=context.nodeType;
if(!selector||typeof selector!=="string"){return results
}if(nodeType!==1&&nodeType!==9){return[]
}xml=isXML(context);
if(!xml&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);
if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);
return results
}}else{return results
}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);
return results
}}}else{if(match[2]){push.apply(results,slice.call(context.getElementsByTagName(selector),0));
return results
}else{if((m=match[3])&&assertUsableClassName&&context.getElementsByClassName){push.apply(results,slice.call(context.getElementsByClassName(m),0));
return results
}}}}}return select(selector.replace(rtrim,"$1"),context,results,seed,xml)
}Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements)
};
Sizzle.matchesSelector=function(elem,expr){return Sizzle(expr,null,null,[elem]).length>0
};
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type===type
}
}function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&elem.type===type
}
}function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;
return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;
while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j])
}}})
})
}getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;
if(nodeType){if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent
}else{for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){ret+=getText(elem)
}}}else{if(nodeType===3||nodeType===4){return elem.nodeValue
}}}else{for(;
(node=elem[i]);
i++){ret+=getText(node)
}}return ret
};
isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false
};
contains=Sizzle.contains=docElem.contains?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;
return a===bup||!!(bup&&bup.nodeType===1&&adown.contains&&adown.contains(bup))
}:docElem.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)
}:function(a,b){while((b=b.parentNode)){if(b===a){return true
}}return false
};
Sizzle.attr=function(elem,name){var val,xml=isXML(elem);
if(!xml){name=name.toLowerCase()
}if((val=Expr.attrHandle[name])){return val(elem)
}if(xml||assertAttributes){return elem.getAttribute(name)
}val=elem.getAttributeNode(name);
return val?typeof elem[name]==="boolean"?elem[name]?name:null:val.specified?val.value:null:null
};
Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:assertHrefNotNormalized?{}:{href:function(elem){return elem.getAttribute("href",2)
},type:function(elem){return elem.getAttribute("type")
}},find:{ID:assertGetIdNotName?function(id,context,xml){if(typeof context.getElementById!==strundefined&&!xml){var m=context.getElementById(id);
return m&&m.parentNode?[m]:[]
}}:function(id,context,xml){if(typeof context.getElementById!==strundefined&&!xml){var m=context.getElementById(id);
return m?m.id===id||typeof m.getAttributeNode!==strundefined&&m.getAttributeNode("id").value===id?[m]:undefined:[]
}},TAG:assertTagNameNoComments?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag)
}}:function(tag,context){var results=context.getElementsByTagName(tag);
if(tag==="*"){var elem,tmp=[],i=0;
for(;
(elem=results[i]);
i++){if(elem.nodeType===1){tmp.push(elem)
}}return tmp
}return results
},NAME:assertUsableName&&function(tag,context){if(typeof context.getElementsByName!==strundefined){return context.getElementsByName(name)
}},CLASS:assertUsableClassName&&function(className,context,xml){if(typeof context.getElementsByClassName!==strundefined&&!xml){return context.getElementsByClassName(className)
}}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(match){match[1]=match[1].replace(rbackslash,"");
match[3]=(match[4]||match[5]||"").replace(rbackslash,"");
if(match[2]==="~="){match[3]=" "+match[3]+" "
}return match.slice(0,4)
},CHILD:function(match){match[1]=match[1].toLowerCase();
if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0])
}match[3]=+(match[3]?match[4]+(match[5]||1):2*(match[2]==="even"||match[2]==="odd"));
match[4]=+((match[6]+match[7])||match[2]==="odd")
}else{if(match[2]){Sizzle.error(match[0])
}}return match
},PSEUDO:function(match){var unquoted,excess;
if(matchExpr.CHILD.test(match[0])){return null
}if(match[3]){match[2]=match[3]
}else{if((unquoted=match[4])){if(rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){unquoted=unquoted.slice(0,excess);
match[0]=match[0].slice(0,excess)
}match[2]=unquoted
}}return match.slice(0,3)
}},filter:{ID:assertGetIdNotName?function(id){id=id.replace(rbackslash,"");
return function(elem){return elem.getAttribute("id")===id
}
}:function(id){id=id.replace(rbackslash,"");
return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");
return node&&node.value===id
}
},TAG:function(nodeName){if(nodeName==="*"){return function(){return true
}
}nodeName=nodeName.replace(rbackslash,"").toLowerCase();
return function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName
}
},CLASS:function(className){var pattern=classCache[expando][className+" "];
return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(elem.className||(typeof elem.getAttribute!==strundefined&&elem.getAttribute("class"))||"")
})
},ATTR:function(name,operator,check){return function(elem,context){var result=Sizzle.attr(elem,name);
if(result==null){return operator==="!="
}if(!operator){return true
}result+="";
return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.substr(result.length-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.substr(0,check.length+1)===check+"-":false
}
},CHILD:function(type,argument,first,last){if(type==="nth"){return function(elem){var node,diff,parent=elem.parentNode;
if(first===1&&last===0){return true
}if(parent){diff=0;
for(node=parent.firstChild;
node;
node=node.nextSibling){if(node.nodeType===1){diff++;
if(elem===node){break
}}}}diff-=last;
return diff===first||(diff%first===0&&diff/first>=0)
}
}return function(elem){var node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type==="first"){return true
}node=elem;
case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true
}}
},PSEUDO:function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);
if(fn[expando]){return fn(argument)
}if(fn.length>1){args=[pseudo,pseudo,"",argument];
return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;
while(i--){idx=indexOf.call(seed,matched[i]);
seed[idx]=!(matches[idx]=matched[i])
}}):function(elem){return fn(elem,0,args)
}
}return fn
}},pseudos:{not:markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));
return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;
while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem)
}}}):function(elem,context,xml){input[0]=elem;
matcher(input,null,xml,results);
return !results.pop()
}
}),has:markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0
}
}),contains:markFunction(function(text){return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1
}
}),enabled:function(elem){return elem.disabled===false
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){var nodeName=elem.nodeName.toLowerCase();
return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected)
},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex
}return elem.selected===true
},parent:function(elem){return !Expr.pseudos.empty(elem)
},empty:function(elem){var nodeType;
elem=elem.firstChild;
while(elem){if(elem.nodeName>"@"||(nodeType=elem.nodeType)===3||nodeType===4){return false
}elem=elem.nextSibling
}return true
},header:function(elem){return rheader.test(elem.nodeName)
},text:function(elem){var type,attr;
return elem.nodeName.toLowerCase()==="input"&&(type=elem.type)==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()===type)
},radio:createInputPseudo("radio"),checkbox:createInputPseudo("checkbox"),file:createInputPseudo("file"),password:createInputPseudo("password"),image:createInputPseudo("image"),submit:createButtonPseudo("submit"),reset:createButtonPseudo("reset"),button:function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type==="button"||name==="button"
},input:function(elem){return rinputs.test(elem.nodeName)
},focus:function(elem){var doc=elem.ownerDocument;
return elem===doc.activeElement&&(!doc.hasFocus||doc.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex)
},active:function(elem){return elem===elem.ownerDocument.activeElement
},first:createPositionalPseudo(function(){return[0]
}),last:createPositionalPseudo(function(matchIndexes,length){return[length-1]
}),eq:createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument]
}),even:createPositionalPseudo(function(matchIndexes,length){for(var i=0;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),odd:createPositionalPseudo(function(matchIndexes,length){for(var i=1;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),lt:createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;
--i>=0;
){matchIndexes.push(i)
}return matchIndexes
}),gt:createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;
++i<length;
){matchIndexes.push(i)
}return matchIndexes
})}};
function siblingCheck(a,b,ret){if(a===b){return ret
}var cur=a.nextSibling;
while(cur){if(cur===b){return -1
}cur=cur.nextSibling
}return 1
}sortOrder=docElem.compareDocumentPosition?function(a,b){if(a===b){hasDuplicate=true;
return 0
}return(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1
}:function(a,b){if(a===b){hasDuplicate=true;
return 0
}else{if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex
}}var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;
if(aup===bup){return siblingCheck(a,b)
}else{if(!aup){return -1
}else{if(!bup){return 1
}}}while(cur){ap.unshift(cur);
cur=cur.parentNode
}cur=bup;
while(cur){bp.unshift(cur);
cur=cur.parentNode
}al=ap.length;
bl=bp.length;
for(var i=0;
i<al&&i<bl;
i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i])
}}return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1)
};
[0,0].sort(sortOrder);
baseHasDuplicate=!hasDuplicate;
Sizzle.uniqueSort=function(results){var elem,duplicates=[],i=1,j=0;
hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);
if(hasDuplicate){for(;
(elem=results[i]);
i++){if(elem===results[i-1]){j=duplicates.push(i)
}}while(j--){results.splice(duplicates[j],1)
}}return results
};
Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg)
};
function tokenize(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[expando][selector+" "];
if(cached){return parseOnly?0:cached.slice(0)
}soFar=selector;
groups=[];
preFilters=Expr.preFilter;
while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar
}groups.push(tokens=[])
}matched=false;
if((match=rcombinators.exec(soFar))){tokens.push(matched=new Token(match.shift()));
soFar=soFar.slice(matched.length);
matched.type=match[0].replace(rtrim," ")
}for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){tokens.push(matched=new Token(match.shift()));
soFar=soFar.slice(matched.length);
matched.type=type;
matched.matches=match
}}if(!matched){break
}}return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0)
}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&combinator.dir==="parentNode",doneName=done++;
return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){return matcher(elem,context,xml)
}}}:function(elem,context,xml){if(!xml){var cache,dirkey=dirruns+" "+doneName+" ",cachedkey=dirkey+cachedruns;
while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){if((cache=elem[expando])===cachedkey){return elem.sizset
}else{if(typeof cache==="string"&&cache.indexOf(dirkey)===0){if(elem.sizset){return elem
}}else{elem[expando]=cachedkey;
if(matcher(elem,context,xml)){elem.sizset=true;
return elem
}elem.sizset=false
}}}}}else{while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){if(matcher(elem,context,xml)){return elem
}}}}}
}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;
while(i--){if(!matchers[i](elem,context,xml)){return false
}}return true
}:matchers[0]
}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;
for(;
i<len;
i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);
if(mapped){map.push(i)
}}}}return newUnmatched
}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter)
}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector)
}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;
if(matcher){matcher(matcherIn,matcherOut,context,xml)
}if(postFilter){temp=condense(matcherOut,postMap);
postFilter(temp,[],context,xml);
i=temp.length;
while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem)
}}}if(seed){if(postFinder||preFilter){if(postFinder){temp=[];
i=matcherOut.length;
while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem))
}}postFinder(null,(matcherOut=[]),temp,xml)
}i=matcherOut.length;
while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem)
}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);
if(postFinder){postFinder(null,results,matcherOut,xml)
}else{push.apply(results,matcherOut)
}}})
}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext
},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1
},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml))
}];
for(;
i<len;
i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)]
}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);
if(matcher[expando]){j=++i;
for(;
j<len;
j++){if(Expr.relative[tokens[j].type]){break
}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&tokens.slice(0,i-1).join("").replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&tokens.join(""))
}matchers.push(matcher)
}}return elementMatcher(matchers)
}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,expandContext){var elem,j,matcher,setMatched=[],matchedCount=0,i="0",unmatched=seed&&[],outermost=expandContext!=null,contextBackup=outermostContext,elems=seed||byElement&&Expr.find.TAG("*",expandContext&&context.parentNode||context),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.E);
if(outermost){outermostContext=context!==document&&context;
cachedruns=superMatcher.el
}for(;
(elem=elems[i])!=null;
i++){if(byElement&&elem){for(j=0;
(matcher=elementMatchers[j]);
j++){if(matcher(elem,context,xml)){results.push(elem);
break
}}if(outermost){dirruns=dirrunsUnique;
cachedruns=++superMatcher.el
}}if(bySet){if((elem=!matcher&&elem)){matchedCount--
}if(seed){unmatched.push(elem)
}}}matchedCount+=i;
if(bySet&&i!==matchedCount){for(j=0;
(matcher=setMatchers[j]);
j++){matcher(unmatched,setMatched,context,xml)
}if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results)
}}}setMatched=condense(setMatched)
}push.apply(results,setMatched);
if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results)
}}if(outermost){dirruns=dirrunsUnique;
outermostContext=contextBackup
}return unmatched
};
superMatcher.el=0;
return bySet?markFunction(superMatcher):superMatcher
}compile=Sizzle.compile=function(selector,group){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[expando][selector+" "];
if(!cached){if(!group){group=tokenize(selector)
}i=group.length;
while(i--){cached=matcherFromTokens(group[i]);
if(cached[expando]){setMatchers.push(cached)
}else{elementMatchers.push(cached)
}}cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers))
}return cached
};
function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;
for(;
i<len;
i++){Sizzle(selector,contexts[i],results)
}return results
}function select(selector,context,results,seed,xml){var i,tokens,token,type,find,match=tokenize(selector),j=match.length;
if(!seed){if(match.length===1){tokens=match[0]=match[0].slice(0);
if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&!xml&&Expr.relative[tokens[1].type]){context=Expr.find.ID(token.matches[0].replace(rbackslash,""),context,xml)[0];
if(!context){return results
}selector=selector.slice(tokens.shift().length)
}for(i=matchExpr.POS.test(selector)?-1:tokens.length-1;
i>=0;
i--){token=tokens[i];
if(Expr.relative[(type=token.type)]){break
}if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(rbackslash,""),rsibling.test(tokens[0].type)&&context.parentNode||context,xml))){tokens.splice(i,1);
selector=seed.length&&tokens.join("");
if(!selector){push.apply(results,slice.call(seed,0));
return results
}break
}}}}}compile(selector,match)(seed,context,xml,results,rsibling.test(selector));
return results
}if(document.querySelectorAll){(function(){var disconnectedMatch,oldSelect=select,rescape=/'|\\/g,rattributeQuotes=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,rbuggyQSA=[":focus"],rbuggyMatches=[":active"],matches=docElem.matchesSelector||docElem.mozMatchesSelector||docElem.webkitMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector;
assert(function(div){div.innerHTML="<select><option selected=''></option></select>";
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked")
}});
assert(function(div){div.innerHTML="<p test=''></p>";
if(div.querySelectorAll("[test^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:\"\"|'')")
}div.innerHTML="<input type='hidden'/>";
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled")
}});
rbuggyQSA=new RegExp(rbuggyQSA.join("|"));
select=function(selector,context,results,seed,xml){if(!seed&&!xml&&!rbuggyQSA.test(selector)){var groups,i,old=true,nid=expando,newContext=context,newSelector=context.nodeType===9&&selector;
if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);
if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&")
}else{context.setAttribute("id",nid)
}nid="[id='"+nid+"'] ";
i=groups.length;
while(i--){groups[i]=nid+groups[i].join("")
}newContext=rsibling.test(selector)&&context.parentNode||context;
newSelector=groups.join(",")
}if(newSelector){try{push.apply(results,slice.call(newContext.querySelectorAll(newSelector),0));
return results
}catch(qsaError){}finally{if(!old){context.removeAttribute("id")
}}}}return oldSelect(selector,context,results,seed,xml)
};
if(matches){assert(function(div){disconnectedMatch=matches.call(div,"div");
try{matches.call(div,"[test!='']:sizzle");
rbuggyMatches.push("!=",pseudos)
}catch(e){}});
rbuggyMatches=new RegExp(rbuggyMatches.join("|"));
Sizzle.matchesSelector=function(elem,expr){expr=expr.replace(rattributeQuotes,"='$1']");
if(!isXML(elem)&&!rbuggyMatches.test(expr)&&!rbuggyQSA.test(expr)){try{var ret=matches.call(elem,expr);
if(ret||disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret
}}catch(e){}}return Sizzle(expr,null,null,[elem]).length>0
}
}})()
}Expr.pseudos.nth=Expr.pseudos.eq;
function setFilters(){}Expr.filters=setFilters.prototype=Expr.pseudos;
Expr.setFilters=new setFilters();
Sizzle.attr=jQuery.attr;
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.pseudos;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains
})(window);
var runtil=/Until$/,rparentsprev=/^(?:parents|prev(?:Until|All))/,isSimple=/^.[^:#\[\.,]*$/,rneedsContext=jQuery.expr.match.needsContext,guaranteedUnique={children:true,contents:true,next:true,prev:true};
jQuery.fn.extend({find:function(selector){var i,l,length,n,r,ret,self=this;
if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;
i<l;
i++){if(jQuery.contains(self[i],this)){return true
}}})
}ret=this.pushStack("","find",selector);
for(i=0,l=this.length;
i<l;
i++){length=ret.length;
jQuery.find(selector,this[i],ret);
if(i>0){for(n=length;
n<ret.length;
n++){for(r=0;
r<length;
r++){if(ret[r]===ret[n]){ret.splice(n--,1);
break
}}}}}return ret
},has:function(target){var i,targets=jQuery(target,this),len=targets.length;
return this.filter(function(){for(i=0;
i<len;
i++){if(jQuery.contains(this,targets[i])){return true
}}})
},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector)
},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector)
},is:function(selector){return !!selector&&(typeof selector==="string"?rneedsContext.test(selector)?jQuery(selector,this.context).index(this[0])>=0:jQuery.filter(selector,this).length>0:this.filter(selector).length>0)
},closest:function(selectors,context){var cur,i=0,l=this.length,ret=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;
for(;
i<l;
i++){cur=this[i];
while(cur&&cur.ownerDocument&&cur!==context&&cur.nodeType!==11){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);
break
}cur=cur.parentNode
}}ret=ret.length>1?jQuery.unique(ret):ret;
return this.pushStack(ret,"closest",selectors)
},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1
}if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem))
}return jQuery.inArray(elem.jquery?elem[0]:elem,this)
},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);
return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all))
},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector))
}});
jQuery.fn.andSelf=jQuery.fn.addBack;
function isDisconnected(node){return !node||!node.parentNode||node.parentNode.nodeType===11
}function sibling(cur,dir){do{cur=cur[dir]
}while(cur&&cur.nodeType!==1);
return cur
}jQuery.each({parent:function(elem){var parent=elem.parentNode;
return parent&&parent.nodeType!==11?parent:null
},parents:function(elem){return jQuery.dir(elem,"parentNode")
},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until)
},next:function(elem){return sibling(elem,"nextSibling")
},prev:function(elem){return sibling(elem,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")
},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until)
},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until)
},siblings:function(elem){return jQuery.sibling((elem.parentNode||{}).firstChild,elem)
},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.merge([],elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);
if(!runtil.test(name)){selector=until
}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret)
}ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;
if(this.length>1&&rparentsprev.test(name)){ret=ret.reverse()
}return this.pushStack(ret,name,core_slice.call(arguments).join(","))
}
});
jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")"
}return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems)
},dir:function(elem,dir,until){var matched=[],cur=elem[dir];
while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur)
}cur=cur[dir]
}return matched
},sibling:function(n,elem){var r=[];
for(;
n;
n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n)
}}return r
}});
function winnow(elements,qualifier,keep){qualifier=qualifier||0;
if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);
return retVal===keep
})
}else{if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep
})
}else{if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1
});
if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep)
}else{qualifier=jQuery.filter(qualifier,filtered)
}}}}return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep
})
}function createSafeFragment(document){var list=nodeNames.split("|"),safeFrag=document.createDocumentFragment();
if(safeFrag.createElement){while(list.length){safeFrag.createElement(list.pop())
}}return safeFrag
}var nodeNames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rinlinejQuery=/ jQuery\d+="(?:null|\d+)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style|link)/i,rnocache=/<(?:script|object|embed|option|style)/i,rnoshimcache=new RegExp("<(?:"+nodeNames+")[\\s/>]","i"),rcheckableType=/^(?:checkbox|radio)$/,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},safeFragment=createSafeFragment(document),fragmentDiv=safeFragment.appendChild(document.createElement("div"));
wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;
if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"X<div>","</div>"]
}jQuery.fn.extend({text:function(value){return jQuery.access(this,function(value){return value===undefined?jQuery.text(this):this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(value))
},null,value,arguments.length)
},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i))
})
}if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){wrap.insertBefore(this[0])
}wrap.map(function(){var elem=this;
while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild
}return elem
}).append(this)
}return this
},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i))
})
}return this.each(function(){var self=jQuery(this),contents=self.contents();
if(contents.length){contents.wrapAll(html)
}else{self.append(html)
}})
},wrap:function(html){var isFunction=jQuery.isFunction(html);
return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html)
})
},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)
}}).end()
},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1||this.nodeType===11){this.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1||this.nodeType===11){this.insertBefore(elem,this.firstChild)
}})
},before:function(){if(!isDisconnected(this[0])){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this)
})
}if(arguments.length){var set=jQuery.clean(arguments);
return this.pushStack(jQuery.merge(set,this),"before",this.selector)
}},after:function(){if(!isDisconnected(this[0])){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})
}if(arguments.length){var set=jQuery.clean(arguments);
return this.pushStack(jQuery.merge(this,set),"after",this.selector)
}},remove:function(selector,keepData){var elem,i=0;
for(;
(elem=this[i])!=null;
i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));
jQuery.cleanData([elem])
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}}return this
},empty:function(){var elem,i=0;
for(;
(elem=this[i])!=null;
i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"))
}while(elem.firstChild){elem.removeChild(elem.firstChild)
}}return this
},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;
deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;
return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents)
})
},html:function(value){return jQuery.access(this,function(value){var elem=this[0]||{},i=0,l=this.length;
if(value===undefined){return elem.nodeType===1?elem.innerHTML.replace(rinlinejQuery,""):undefined
}if(typeof value==="string"&&!rnoInnerhtml.test(value)&&(jQuery.support.htmlSerialize||!rnoshimcache.test(value))&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");
try{for(;
i<l;
i++){elem=this[i]||{};
if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));
elem.innerHTML=value
}}elem=0
}catch(e){}}if(elem){this.empty().append(value)
}},null,value,arguments.length)
},replaceWith:function(value){if(!isDisconnected(this[0])){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old))
})
}if(typeof value!=="string"){value=jQuery(value).detach()
}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;
jQuery(this).remove();
if(next){jQuery(next).before(value)
}else{jQuery(parent).append(value)
}})
}return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this
},detach:function(selector){return this.remove(selector,true)
},domManip:function(args,table,callback){args=[].concat.apply([],args);
var results,first,fragment,iNoClone,i=0,value=args[0],scripts=[],l=this.length;
if(!jQuery.support.checkClone&&l>1&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback)
})
}if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
args[0]=value.call(this,i,table?self.html():undefined);
self.domManip(args,table,callback)
})
}if(this[0]){results=jQuery.buildFragment(args,this,scripts);
fragment=results.fragment;
first=fragment.firstChild;
if(fragment.childNodes.length===1){fragment=first
}if(first){table=table&&jQuery.nodeName(first,"tr");
for(iNoClone=results.cacheable||l-1;
i<l;
i++){callback.call(table&&jQuery.nodeName(this[i],"table")?findOrAppend(this[i],"tbody"):this[i],i===iNoClone?fragment:jQuery.clone(fragment,true,true))
}}fragment=first=null;
if(scripts.length){jQuery.each(scripts,function(i,elem){if(elem.src){if(jQuery.ajax){jQuery.ajax({url:elem.src,type:"GET",dataType:"script",async:false,global:false,"throws":true})
}else{jQuery.error("no ajax")
}}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,""))
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}})
}}return this
}});
function findOrAppend(elem,tag){return elem.getElementsByTagName(tag)[0]||elem.appendChild(elem.ownerDocument.createElement(tag))
}function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return
}var type,i,l,oldData=jQuery._data(src),curData=jQuery._data(dest,oldData),events=oldData.events;
if(events){delete curData.handle;
curData.events={};
for(type in events){for(i=0,l=events[type].length;
i<l;
i++){jQuery.event.add(dest,type,events[type][i])
}}}if(curData.data){curData.data=jQuery.extend({},curData.data)
}}function cloneFixAttributes(src,dest){var nodeName;
if(dest.nodeType!==1){return
}if(dest.clearAttributes){dest.clearAttributes()
}if(dest.mergeAttributes){dest.mergeAttributes(src)
}nodeName=dest.nodeName.toLowerCase();
if(nodeName==="object"){if(dest.parentNode){dest.outerHTML=src.outerHTML
}if(jQuery.support.html5Clone&&(src.innerHTML&&!jQuery.trim(dest.innerHTML))){dest.innerHTML=src.innerHTML
}}else{if(nodeName==="input"&&rcheckableType.test(src.type)){dest.defaultChecked=dest.checked=src.checked;
if(dest.value!==src.value){dest.value=src.value
}}else{if(nodeName==="option"){dest.selected=src.defaultSelected
}else{if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue
}else{if(nodeName==="script"&&dest.text!==src.text){dest.text=src.text
}}}}}dest.removeAttribute(jQuery.expando)
}jQuery.buildFragment=function(args,context,scripts){var fragment,cacheable,cachehit,first=args[0];
context=context||document;
context=!context.nodeType&&context[0]||context;
context=context.ownerDocument||context;
if(args.length===1&&typeof first==="string"&&first.length<512&&context===document&&first.charAt(0)==="<"&&!rnocache.test(first)&&(jQuery.support.checkClone||!rchecked.test(first))&&(jQuery.support.html5Clone||!rnoshimcache.test(first))){cacheable=true;
fragment=jQuery.fragments[first];
cachehit=fragment!==undefined
}if(!fragment){fragment=context.createDocumentFragment();
jQuery.clean(args,context,fragment,scripts);
if(cacheable){jQuery.fragments[first]=cachehit&&fragment
}}return{fragment:fragment,cacheable:cacheable}
};
jQuery.fragments={};
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,i=0,ret=[],insert=jQuery(selector),l=insert.length,parent=this.length===1&&this[0].parentNode;
if((parent==null||parent&&parent.nodeType===11&&parent.childNodes.length===1)&&l===1){insert[original](this[0]);
return this
}else{for(;
i<l;
i++){elems=(i>0?this.clone(true):this).get();
jQuery(insert[i])[original](elems);
ret=ret.concat(elems)
}return this.pushStack(ret,name,insert.selector)
}}
});
function getAll(elem){if(typeof elem.getElementsByTagName!=="undefined"){return elem.getElementsByTagName("*")
}else{if(typeof elem.querySelectorAll!=="undefined"){return elem.querySelectorAll("*")
}else{return[]
}}}function fixDefaultChecked(elem){if(rcheckableType.test(elem.type)){elem.defaultChecked=elem.checked
}}jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var srcElements,destElements,i,clone;
if(jQuery.support.html5Clone||jQuery.isXMLDoc(elem)||!rnoshimcache.test("<"+elem.nodeName+">")){clone=elem.cloneNode(true)
}else{fragmentDiv.innerHTML=elem.outerHTML;
fragmentDiv.removeChild(clone=fragmentDiv.firstChild)
}if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){cloneFixAttributes(elem,clone);
srcElements=getAll(elem);
destElements=getAll(clone);
for(i=0;
srcElements[i];
++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i])
}}}if(dataAndEvents){cloneCopyEvent(elem,clone);
if(deepDataAndEvents){srcElements=getAll(elem);
destElements=getAll(clone);
for(i=0;
srcElements[i];
++i){cloneCopyEvent(srcElements[i],destElements[i])
}}}srcElements=destElements=null;
return clone
},clean:function(elems,context,fragment,scripts){var i,j,elem,tag,wrap,depth,div,hasBody,tbody,len,handleScript,jsTags,safe=context===document&&safeFragment,ret=[];
if(!context||typeof context.createDocumentFragment==="undefined"){context=document
}for(i=0;
(elem=elems[i])!=null;
i++){if(typeof elem==="number"){elem+=""
}if(!elem){continue
}if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem)
}else{safe=safe||createSafeFragment(context);
div=context.createElement("div");
safe.appendChild(div);
elem=elem.replace(rxhtmlTag,"<$1></$2>");
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();
wrap=wrapMap[tag]||wrapMap._default;
depth=wrap[0];
div.innerHTML=wrap[1]+elem+wrap[2];
while(depth--){div=div.lastChild
}if(!jQuery.support.tbody){hasBody=rtbody.test(elem);
tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];
for(j=tbody.length-1;
j>=0;
--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}}if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)
}elem=div.childNodes;
div.parentNode.removeChild(div)
}}if(elem.nodeType){ret.push(elem)
}else{jQuery.merge(ret,elem)
}}if(div){elem=div=safe=null
}if(!jQuery.support.appendChecked){for(i=0;
(elem=ret[i])!=null;
i++){if(jQuery.nodeName(elem,"input")){fixDefaultChecked(elem)
}else{if(typeof elem.getElementsByTagName!=="undefined"){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked)
}}}}if(fragment){handleScript=function(elem){if(!elem.type||rscriptType.test(elem.type)){return scripts?scripts.push(elem.parentNode?elem.parentNode.removeChild(elem):elem):fragment.appendChild(elem)
}};
for(i=0;
(elem=ret[i])!=null;
i++){if(!(jQuery.nodeName(elem,"script")&&handleScript(elem))){fragment.appendChild(elem);
if(typeof elem.getElementsByTagName!=="undefined"){jsTags=jQuery.grep(jQuery.merge([],elem.getElementsByTagName("script")),handleScript);
ret.splice.apply(ret,[i+1,0].concat(jsTags));
i+=jsTags.length
}}}}return ret
},cleanData:function(elems,acceptData){var data,id,elem,type,i=0,internalKey=jQuery.expando,cache=jQuery.cache,deleteExpando=jQuery.support.deleteExpando,special=jQuery.event.special;
for(;
(elem=elems[i])!=null;
i++){if(acceptData||jQuery.acceptData(elem)){id=elem[internalKey];
data=id&&cache[id];
if(data){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type)
}else{jQuery.removeEvent(elem,type,data.handle)
}}}if(cache[id]){delete cache[id];
if(deleteExpando){delete elem[internalKey]
}else{if(elem.removeAttribute){elem.removeAttribute(internalKey)
}else{elem[internalKey]=null
}}jQuery.deletedIds.push(id)
}}}}}});
(function(){var matched,browser;
jQuery.uaMatch=function(ua){ua=ua.toLowerCase();
var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"}
};
matched=jQuery.uaMatch(navigator.userAgent);
browser={};
if(matched.browser){browser[matched.browser]=true;
browser.version=matched.version
}if(browser.chrome){browser.webkit=true
}else{if(browser.webkit){browser.safari=true
}}jQuery.browser=browser;
jQuery.sub=function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context)
}jQuery.extend(true,jQuerySub,this);
jQuerySub.superclass=this;
jQuerySub.fn=jQuerySub.prototype=this();
jQuerySub.fn.constructor=jQuerySub;
jQuerySub.sub=this.sub;
jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context)
}return jQuery.fn.init.call(this,selector,context,rootjQuerySub)
};
jQuerySub.fn.init.prototype=jQuerySub.fn;
var rootjQuerySub=jQuerySub(document);
return jQuerySub
}
})();
var curCSS,iframe,iframeDoc,ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rposition=/^(top|right|bottom|left)$/,rdisplayswap=/^(none|table(?!-c[ea]).+)/,rmargin=/^margin/,rnumsplit=new RegExp("^("+core_pnum+")(.*)$","i"),rnumnonpx=new RegExp("^("+core_pnum+")(?!px)[a-z%]+$","i"),rrelNum=new RegExp("^([-+])=("+core_pnum+")","i"),elemdisplay={BODY:"block"},cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:0,fontWeight:400},cssExpand=["Top","Right","Bottom","Left"],cssPrefixes=["Webkit","O","Moz","ms"],eventsToggle=jQuery.fn.toggle;
function vendorPropName(style,name){if(name in style){return name
}var capName=name.charAt(0).toUpperCase()+name.slice(1),origName=name,i=cssPrefixes.length;
while(i--){name=cssPrefixes[i]+capName;
if(name in style){return name
}}return origName
}function isHidden(elem,el){elem=el||elem;
return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem)
}function showHide(elements,show){var elem,display,values=[],index=0,length=elements.length;
for(;
index<length;
index++){elem=elements[index];
if(!elem.style){continue
}values[index]=jQuery._data(elem,"olddisplay");
if(show){if(!values[index]&&elem.style.display==="none"){elem.style.display=""
}if(elem.style.display===""&&isHidden(elem)){values[index]=jQuery._data(elem,"olddisplay",css_defaultDisplay(elem.nodeName))
}}else{display=curCSS(elem,"display");
if(!values[index]&&display!=="none"){jQuery._data(elem,"olddisplay",display)
}}}for(index=0;
index<length;
index++){elem=elements[index];
if(!elem.style){continue
}if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none"
}}return elements
}jQuery.fn.extend({css:function(name,value){return jQuery.access(this,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name)
},name,value,arguments.length>1)
},show:function(){return showHide(this,true)
},hide:function(){return showHide(this)
},toggle:function(state,fn2){var bool=typeof state==="boolean";
if(jQuery.isFunction(state)&&jQuery.isFunction(fn2)){return eventsToggle.apply(this,arguments)
}return this.each(function(){if(bool?state:isHidden(this)){jQuery(this).show()
}else{jQuery(this).hide()
}})
}});
jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity");
return ret===""?"1":ret
}}}},cssNumber:{fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return
}var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(style,origName));
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(value!==undefined){type=typeof value;
if(type==="string"&&(ret=rrelNum.exec(value))){value=(ret[1]+1)*ret[2]+parseFloat(jQuery.css(elem,name));
type="number"
}if(value==null||type==="number"&&isNaN(value)){return
}if(type==="number"&&!jQuery.cssNumber[origName]){value+="px"
}if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value,extra))!==undefined){try{style[name]=value
}catch(e){}}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret
}return style[name]
}},css:function(elem,name,numeric,extra){var val,num,hooks,origName=jQuery.camelCase(name);
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(elem.style,origName));
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(hooks&&"get" in hooks){val=hooks.get(elem,true,extra)
}if(val===undefined){val=curCSS(elem,name)
}if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name]
}if(numeric||extra!==undefined){num=parseFloat(val);
return numeric||jQuery.isNumeric(num)?num||0:val
}return val
},swap:function(elem,options,callback){var ret,name,old={};
for(name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}ret=callback.call(elem);
for(name in options){elem.style[name]=old[name]
}return ret
}});
if(window.getComputedStyle){curCSS=function(elem,name){var ret,width,minWidth,maxWidth,computed=window.getComputedStyle(elem,null),style=elem.style;
if(computed){ret=computed.getPropertyValue(name)||computed[name];
if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name)
}if(rnumnonpx.test(ret)&&rmargin.test(name)){width=style.width;
minWidth=style.minWidth;
maxWidth=style.maxWidth;
style.minWidth=style.maxWidth=style.width=ret;
ret=computed.width;
style.width=width;
style.minWidth=minWidth;
style.maxWidth=maxWidth
}}return ret
}
}else{if(document.documentElement.currentStyle){curCSS=function(elem,name){var left,rsLeft,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;
if(ret==null&&style&&style[name]){ret=style[name]
}if(rnumnonpx.test(ret)&&!rposition.test(name)){left=style.left;
rsLeft=elem.runtimeStyle&&elem.runtimeStyle.left;
if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left
}style.left=name==="fontSize"?"1em":ret;
ret=style.pixelLeft+"px";
style.left=left;
if(rsLeft){elem.runtimeStyle.left=rsLeft
}}return ret===""?"auto":ret
}
}}function setPositiveNumber(elem,value,subtract){var matches=rnumsplit.exec(value);
return matches?Math.max(0,matches[1]-(subtract||0))+(matches[2]||"px"):value
}function augmentWidthOrHeight(elem,name,extra,isBorderBox){var i=extra===(isBorderBox?"border":"content")?4:name==="width"?1:0,val=0;
for(;
i<4;
i+=2){if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true)
}if(isBorderBox){if(extra==="content"){val-=parseFloat(curCSS(elem,"padding"+cssExpand[i]))||0
}if(extra!=="margin"){val-=parseFloat(curCSS(elem,"border"+cssExpand[i]+"Width"))||0
}}else{val+=parseFloat(curCSS(elem,"padding"+cssExpand[i]))||0;
if(extra!=="padding"){val+=parseFloat(curCSS(elem,"border"+cssExpand[i]+"Width"))||0
}}}return val
}function getWidthOrHeight(elem,name,extra){var val=name==="width"?elem.offsetWidth:elem.offsetHeight,valueIsBorderBox=true,isBorderBox=jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing")==="border-box";
if(val<=0||val==null){val=curCSS(elem,name);
if(val<0||val==null){val=elem.style[name]
}if(rnumnonpx.test(val)){return val
}valueIsBorderBox=isBorderBox&&(jQuery.support.boxSizingReliable||val===elem.style[name]);
val=parseFloat(val)||0
}return(val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox))+"px"
}function css_defaultDisplay(nodeName){if(elemdisplay[nodeName]){return elemdisplay[nodeName]
}var elem=jQuery("<"+nodeName+">").appendTo(document.body),display=elem.css("display");
elem.remove();
if(display==="none"||display===""){iframe=document.body.appendChild(iframe||jQuery.extend(document.createElement("iframe"),{frameBorder:0,width:0,height:0}));
if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;
iframeDoc.write("<!doctype html><html><body>");
iframeDoc.close()
}elem=iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
display=curCSS(elem,"display");
document.body.removeChild(iframe)
}elemdisplay[nodeName]=display;
return display
}jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed){if(elem.offsetWidth===0&&rdisplayswap.test(curCSS(elem,"display"))){return jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra)
})
}else{return getWidthOrHeight(elem,name,extra)
}}},set:function(elem,value,extra){return setPositiveNumber(elem,value,extra?augmentWidthOrHeight(elem,name,extra,jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing")==="border-box"):0)
}}
});
if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":computed?"1":""
},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",filter=currentStyle&&currentStyle.filter||style.filter||"";
style.zoom=1;
if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""&&style.removeAttribute){style.removeAttribute("filter");
if(currentStyle&&!currentStyle.filter){return
}}style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity
}}
}jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){return jQuery.swap(elem,{display:"inline-block"},function(){if(computed){return curCSS(elem,"marginRight")
}})
}}
}if(!jQuery.support.pixelPosition&&jQuery.fn.position){jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]={get:function(elem,computed){if(computed){var ret=curCSS(elem,prop);
return rnumnonpx.test(ret)?jQuery(elem).position()[prop]+"px":ret
}}}
})
}});
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){return(elem.offsetWidth===0&&elem.offsetHeight===0)||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||curCSS(elem,"display"))==="none")
};
jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)
}
}jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i,parts=typeof value==="string"?value.split(" "):[value],expanded={};
for(i=0;
i<4;
i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0]
}return expanded
}};
if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber
}});
var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rselectTextarea=/^(?:select|textarea)/i;
jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}):{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}).get()
}});
jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,value){value=jQuery.isFunction(value)?value():(value==null?"":value);
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)
};
if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional
}if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value)
})
}else{for(prefix in a){buildParams(prefix,a[prefix],traditional,add)
}}return s.join("&").replace(r20,"+")
};
function buildParams(prefix,obj,traditional,add){var name;
if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v)
}else{buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add)
}})
}else{if(!traditional&&jQuery.type(obj)==="object"){for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add)
}}else{add(prefix,obj)
}}}var ajaxLocParts,ajaxLocation,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,_load=jQuery.fn.load,prefilters={},transports={},allTypes=["*/"]+["*"];
try{ajaxLocation=location.href
}catch(e){ajaxLocation=document.createElement("a");
ajaxLocation.href="";
ajaxLocation=ajaxLocation.href
}ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];
function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;
dataTypeExpression="*"
}var dataType,list,placeBefore,dataTypes=dataTypeExpression.toLowerCase().split(core_rspace),i=0,length=dataTypes.length;
if(jQuery.isFunction(func)){for(;
i<length;
i++){dataType=dataTypes[i];
placeBefore=/^\+/.test(dataType);
if(placeBefore){dataType=dataType.substr(1)||"*"
}list=structure[dataType]=structure[dataType]||[];
list[placeBefore?"unshift":"push"](func)
}}}
}function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType,inspected){dataType=dataType||options.dataTypes[0];
inspected=inspected||{};
inspected[dataType]=true;
var selection,list=structure[dataType],i=0,length=list?list.length:0,executeOnly=(structure===prefilters);
for(;
i<length&&(executeOnly||!selection);
i++){selection=list[i](options,originalOptions,jqXHR);
if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined
}else{options.dataTypes.unshift(selection);
selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected)
}}}if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected)
}return selection
}function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};
for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key]
}}if(deep){jQuery.extend(true,target,deep)
}}jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments)
}if(!this.length){return this
}var selector,type,response,self=this,off=url.indexOf(" ");
if(off>=0){selector=url.slice(off,url.length);
url=url.slice(0,off)
}if(jQuery.isFunction(params)){callback=params;
params=undefined
}else{if(params&&typeof params==="object"){type="POST"
}}jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(jqXHR,status){if(callback){self.each(callback,response||[jqXHR.responseText,status,jqXHR])
}}}).done(function(responseText){response=arguments;
self.html(selector?jQuery("<div>").append(responseText.replace(rscript,"")).find(selector):responseText)
});
return this
};
jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.on(o,f)
}
});
jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;
data=undefined
}return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type})
}
});
jQuery.extend({getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},ajaxSetup:function(target,settings){if(settings){ajaxExtend(target,jQuery.ajaxSettings)
}else{settings=target;
target=jQuery.ajaxSettings
}ajaxExtend(target,settings);
return target
},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":window.String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;
url=undefined
}options=options||{};
var ifModifiedKey,responseHeadersString,responseHeaders,transport,timeoutTimer,parts,fireGlobals,i,s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},requestHeaders={},requestHeadersNames={},state=0,strAbort="canceled",jqXHR={readyState:0,setRequestHeader:function(name,value){if(!state){var lname=name.toLowerCase();
name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;
requestHeaders[name]=value
}return this
},getAllResponseHeaders:function(){return state===2?responseHeadersString:null
},getResponseHeader:function(key){var match;
if(state===2){if(!responseHeaders){responseHeaders={};
while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2]
}}match=responseHeaders[key.toLowerCase()]
}return match===undefined?null:match
},overrideMimeType:function(type){if(!state){s.mimeType=type
}return this
},abort:function(statusText){statusText=statusText||strAbort;
if(transport){transport.abort(statusText)
}done(0,statusText);
return this
}};
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;
if(state===2){return
}state=2;
if(timeoutTimer){clearTimeout(timeoutTimer)
}transport=undefined;
responseHeadersString=headers||"";
jqXHR.readyState=status>0?4:0;
if(responses){response=ajaxHandleResponses(s,jqXHR,responses)
}if(status>=200&&status<300||status===304){if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");
if(modified){jQuery.lastModified[ifModifiedKey]=modified
}modified=jqXHR.getResponseHeader("Etag");
if(modified){jQuery.etag[ifModifiedKey]=modified
}}if(status===304){statusText="notmodified";
isSuccess=true
}else{isSuccess=ajaxConvert(s,response);
statusText=isSuccess.state;
success=isSuccess.data;
error=isSuccess.error;
isSuccess=!error
}}else{error=statusText;
if(!statusText||status){statusText="error";
if(status<0){status=0
}}}jqXHR.status=status;
jqXHR.statusText=(nativeStatusText||statusText)+"";
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR])
}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error])
}jqXHR.statusCode(statusCode);
statusCode=undefined;
if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error])
}completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);
if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);
if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop")
}}}deferred.promise(jqXHR);
jqXHR.success=jqXHR.done;
jqXHR.error=jqXHR.fail;
jqXHR.complete=completeDeferred.add;
jqXHR.statusCode=function(map){if(map){var tmp;
if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]]
}}else{tmp=map[jqXHR.status];
jqXHR.always(tmp)
}}return this
};
s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(core_rspace);
if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());
s.crossDomain=!!(parts&&(parts[1]!==ajaxLocParts[1]||parts[2]!==ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))))
}if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)
}inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);
if(state===2){return jqXHR
}fireGlobals=s.global;
s.type=s.type.toUpperCase();
s.hasContent=!rnoContent.test(s.type);
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart")
}if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;
delete s.data
}ifModifiedKey=s.url;
if(s.cache===false){var ts=jQuery.now(),ret=s.url.replace(rts,"$1_="+ts);
s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")
}}if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;
if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey])
}if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey])
}}jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i])
}if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){return jqXHR.abort()
}strAbort="abort";
for(i in {success:1,error:1,complete:1}){jqXHR[i](s[i])
}transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);
if(!transport){done(-1,"No Transport")
}else{jqXHR.readyState=1;
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s])
}if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout")
},s.timeout)
}try{state=1;
transport.send(requestHeaders,done)
}catch(e){if(state<2){done(-1,e)
}else{throw e
}}}return jqXHR
},active:0,lastModified:{},etag:{}});
function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields;
for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type]
}}while(dataTypes[0]==="*"){dataTypes.shift();
if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type")
}}if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);
break
}}}if(dataTypes[0] in responses){finalDataType=dataTypes[0]
}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;
break
}if(!firstDataType){firstDataType=type
}}finalDataType=finalDataType||firstDataType
}if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType)
}return responses[finalDataType]
}}function ajaxConvert(s,response){var conv,conv2,current,tmp,dataTypes=s.dataTypes.slice(),prev=dataTypes[0],converters={},i=0;
if(s.dataFilter){response=s.dataFilter(response,s.dataType)
}if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv]
}}for(;
(current=dataTypes[++i]);
){if(current!=="*"){if(prev!=="*"&&prev!==current){conv=converters[prev+" "+current]||converters["* "+current];
if(!conv){for(conv2 in converters){tmp=conv2.split(" ");
if(tmp[1]===current){conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];
if(conv){if(conv===true){conv=converters[conv2]
}else{if(converters[conv2]!==true){current=tmp[0];
dataTypes.splice(i--,0,current)
}}break
}}}}if(conv!==true){if(conv&&s["throws"]){response=conv(response)
}else{try{response=conv(response)
}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current}
}}}}prev=current
}}return{state:"success",data:response}
}var oldCallbacks=[],rquestion=/\?/,rjsonp=/(=)\?(?=&|$)|\?\?/,nonce=jQuery.now();
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||(jQuery.expando+"_"+(nonce++));
this[callback]=true;
return callback
}});
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,data=s.data,url=s.url,hasCallback=s.jsonp!==false,replaceInUrl=hasCallback&&rjsonp.test(url),replaceInData=hasCallback&&!replaceInUrl&&typeof data==="string"&&!(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&rjsonp.test(data);
if(s.dataTypes[0]==="jsonp"||replaceInUrl||replaceInData){callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;
overwritten=window[callbackName];
if(replaceInUrl){s.url=url.replace(rjsonp,"$1"+callbackName)
}else{if(replaceInData){s.data=data.replace(rjsonp,"$1"+callbackName)
}else{if(hasCallback){s.url+=(rquestion.test(url)?"&":"?")+s.jsonp+"="+callbackName
}}}s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called")
}return responseContainer[0]
};
s.dataTypes[0]="json";
window[callbackName]=function(){responseContainer=arguments
};
jqXHR.always(function(){window[callbackName]=overwritten;
if(s[callbackName]){s.jsonpCallback=originalSettings.jsonpCallback;
oldCallbacks.push(callbackName)
}if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0])
}responseContainer=overwritten=undefined
});
return"script"
}});
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(text){jQuery.globalEval(text);
return text
}}});
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false
}if(s.crossDomain){s.type="GET";
s.global=false
}});
jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
return{send:function(_,callback){script=document.createElement("script");
script.async="async";
if(s.scriptCharset){script.charset=s.scriptCharset
}script.src=s.url;
script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;
if(head&&script.parentNode){head.removeChild(script)
}script=undefined;
if(!isAbort){callback(200,"success")
}}};
head.insertBefore(script,head.firstChild)
},abort:function(){if(script){script.onload(0,1)
}}}
}});
var xhrCallbacks,xhrOnUnloadAbort=window.ActiveXObject?function(){for(var key in xhrCallbacks){xhrCallbacks[key](0,1)
}}:false,xhrId=0;
function createStandardXHR(){try{return new window.XMLHttpRequest()
}catch(e){}}function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(e){}}jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return !this.isLocal&&createStandardXHR()||createActiveXHR()
}:createStandardXHR;
(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&("withCredentials" in xhr)})
})(jQuery.ajaxSettings.xhr());
if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;
return{send:function(headers,complete){var handle,i,xhr=s.xhr();
if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password)
}else{xhr.open(s.type,s.url,s.async)
}if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i]
}}if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType)
}if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest"
}try{for(i in headers){xhr.setRequestHeader(i,headers[i])
}}catch(_){}xhr.send((s.hasContent&&s.data)||null);
callback=function(_,isAbort){var status,statusText,responseHeaders,responses,xml;
try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;
if(handle){xhr.onreadystatechange=jQuery.noop;
if(xhrOnUnloadAbort){delete xhrCallbacks[handle]
}}if(isAbort){if(xhr.readyState!==4){xhr.abort()
}}else{status=xhr.status;
responseHeaders=xhr.getAllResponseHeaders();
responses={};
xml=xhr.responseXML;
if(xml&&xml.documentElement){responses.xml=xml
}try{responses.text=xhr.responseText
}catch(e){}try{statusText=xhr.statusText
}catch(e){statusText=""
}if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404
}else{if(status===1223){status=204
}}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException)
}}if(responses){complete(status,statusText,responses,responseHeaders)
}};
if(!s.async){callback()
}else{if(xhr.readyState===4){setTimeout(callback,0)
}else{handle=++xhrId;
if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};
jQuery(window).unload(xhrOnUnloadAbort)
}xhrCallbacks[handle]=callback
}xhr.onreadystatechange=callback
}}},abort:function(){if(callback){callback(0,1)
}}}
}})
}var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([-+])=|)("+core_pnum+")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(prop,value){var end,unit,tween=this.createTween(prop,value),parts=rfxnum.exec(value),target=tween.cur(),start=+target||0,scale=1,maxIterations=20;
if(parts){end=+parts[2];
unit=parts[3]||(jQuery.cssNumber[prop]?"":"px");
if(unit!=="px"&&start){start=jQuery.css(tween.elem,prop,true)||end||1;
do{scale=scale||".5";
start=start/scale;
jQuery.style(tween.elem,prop,start+unit)
}while(scale!==(scale=tween.cur()/target)&&scale!==1&&--maxIterations)
}tween.unit=unit;
tween.start=start;
tween.end=parts[1]?start+(parts[1]+1)*end:end
}return tween
}]};
function createFxNow(){setTimeout(function(){fxNow=undefined
},0);
return(fxNow=jQuery.now())
}function createTweens(animation,props){jQuery.each(props,function(prop,value){var collection=(tweeners[prop]||[]).concat(tweeners["*"]),index=0,length=collection.length;
for(;
index<length;
index++){if(collection[index].call(animation,prop,value)){return
}}})
}function Animation(elem,properties,options){var result,index=0,tweenerIndex=0,length=animationPrefilters.length,deferred=jQuery.Deferred().always(function(){delete tick.elem
}),tick=function(){var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;
for(;
index<length;
index++){animation.tweens[index].run(percent)
}deferred.notifyWith(elem,[animation,percent,remaining]);
if(percent<1&&length){return remaining
}else{deferred.resolveWith(elem,[animation]);
return false
}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{}},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end,easing){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);
animation.tweens.push(tween);
return tween
},stop:function(gotoEnd){var index=0,length=gotoEnd?animation.tweens.length:0;
for(;
index<length;
index++){animation.tweens[index].run(1)
}if(gotoEnd){deferred.resolveWith(elem,[animation,gotoEnd])
}else{deferred.rejectWith(elem,[animation,gotoEnd])
}return this
}}),props=animation.props;
propFilter(props,animation.opts.specialEasing);
for(;
index<length;
index++){result=animationPrefilters[index].call(animation,elem,props,animation.opts);
if(result){return result
}}createTweens(animation,props);
if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation)
}jQuery.fx.timer(jQuery.extend(tick,{anim:animation,queue:animation.opts.queue,elem:elem}));
return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
}function propFilter(props,specialEasing){var index,name,easing,value,hooks;
for(index in props){name=jQuery.camelCase(index);
easing=specialEasing[name];
value=props[index];
if(jQuery.isArray(value)){easing=value[1];
value=props[index]=value[0]
}if(index!==name){props[name]=value;
delete props[index]
}hooks=jQuery.cssHooks[name];
if(hooks&&"expand" in hooks){value=hooks.expand(value);
delete props[name];
for(index in value){if(!(index in props)){props[index]=value[index];
specialEasing[index]=easing
}}}else{specialEasing[name]=easing
}}}jQuery.Animation=jQuery.extend(Animation,{tweener:function(props,callback){if(jQuery.isFunction(props)){callback=props;
props=["*"]
}else{props=props.split(" ")
}var prop,index=0,length=props.length;
for(;
index<length;
index++){prop=props[index];
tweeners[prop]=tweeners[prop]||[];
tweeners[prop].unshift(callback)
}},prefilter:function(callback,prepend){if(prepend){animationPrefilters.unshift(callback)
}else{animationPrefilters.push(callback)
}}});
function defaultPrefilter(elem,props,opts){var index,prop,value,length,dataShow,toggle,tween,hooks,oldfire,anim=this,style=elem.style,orig={},handled=[],hidden=elem.nodeType&&isHidden(elem);
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");
if(hooks.unqueued==null){hooks.unqueued=0;
oldfire=hooks.empty.fire;
hooks.empty.fire=function(){if(!hooks.unqueued){oldfire()
}}
}hooks.unqueued++;
anim.always(function(){anim.always(function(){hooks.unqueued--;
if(!jQuery.queue(elem,"fx").length){hooks.empty.fire()
}})
})
}if(elem.nodeType===1&&("height" in props||"width" in props)){opts.overflow=[style.overflow,style.overflowX,style.overflowY];
if(jQuery.css(elem,"display")==="inline"&&jQuery.css(elem,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout||css_defaultDisplay(elem.nodeName)==="inline"){style.display="inline-block"
}else{style.zoom=1
}}}if(opts.overflow){style.overflow="hidden";
if(!jQuery.support.shrinkWrapBlocks){anim.done(function(){style.overflow=opts.overflow[0];
style.overflowX=opts.overflow[1];
style.overflowY=opts.overflow[2]
})
}}for(index in props){value=props[index];
if(rfxtypes.exec(value)){delete props[index];
toggle=toggle||value==="toggle";
if(value===(hidden?"hide":"show")){continue
}handled.push(index)
}}length=handled.length;
if(length){dataShow=jQuery._data(elem,"fxshow")||jQuery._data(elem,"fxshow",{});
if("hidden" in dataShow){hidden=dataShow.hidden
}if(toggle){dataShow.hidden=!hidden
}if(hidden){jQuery(elem).show()
}else{anim.done(function(){jQuery(elem).hide()
})
}anim.done(function(){var prop;
jQuery.removeData(elem,"fxshow",true);
for(prop in orig){jQuery.style(elem,prop,orig[prop])
}});
for(index=0;
index<length;
index++){prop=handled[index];
tween=anim.createTween(prop,hidden?dataShow[prop]:0);
orig[prop]=dataShow[prop]||jQuery.style(elem,prop);
if(!(prop in dataShow)){dataShow[prop]=tween.start;
if(hidden){tween.end=tween.start;
tween.start=prop==="width"||prop==="height"?1:0
}}}}}function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing)
}jQuery.Tween=Tween;
Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem;
this.prop=prop;
this.easing=easing||"swing";
this.options=options;
this.start=this.now=this.cur();
this.end=end;
this.unit=unit||(jQuery.cssNumber[prop]?"":"px")
},cur:function(){var hooks=Tween.propHooks[this.prop];
return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this)
},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];
if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration)
}else{this.pos=eased=percent
}this.now=(this.end-this.start)*eased+this.start;
if(this.options.step){this.options.step.call(this.elem,this.now,this)
}if(hooks&&hooks.set){hooks.set(this)
}else{Tween.propHooks._default.set(this)
}return this
}};
Tween.prototype.init.prototype=Tween.prototype;
Tween.propHooks={_default:{get:function(tween){var result;
if(tween.elem[tween.prop]!=null&&(!tween.elem.style||tween.elem.style[tween.prop]==null)){return tween.elem[tween.prop]
}result=jQuery.css(tween.elem,tween.prop,false,"");
return !result||result==="auto"?0:result
},set:function(tween){if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween)
}else{if(tween.elem.style&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit)
}else{tween.elem[tween.prop]=tween.now
}}}}};
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now
}}};
jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];
jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"||(!i&&jQuery.isFunction(speed)&&jQuery.isFunction(easing))?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback)
}
});
jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){return this.filter(isHidden).css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)
},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){var anim=Animation(this,jQuery.extend({},prop),optall);
if(empty){anim.stop(true)
}};
return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation)
},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;
delete hooks.stop;
stop(gotoEnd)
};
if(typeof type!=="string"){gotoEnd=clearQueue;
clearQueue=type;
type=undefined
}if(clearQueue&&type!==false){this.queue(type||"fx",[])
}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=jQuery._data(this);
if(index){if(data[index]&&data[index].stop){stopQueue(data[index])
}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index])
}}}for(index=timers.length;
index--;
){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);
dequeue=false;
timers.splice(index,1)
}}if(dequeue||!gotoEnd){jQuery.dequeue(this,type)
}})
}});
function genFx(type,includeWidth){var which,attrs={height:type},i=0;
includeWidth=includeWidth?1:0;
for(;
i<4;
i+=2-includeWidth){which=cssExpand[i];
attrs["margin"+which]=attrs["padding"+which]=type
}if(includeWidth){attrs.opacity=attrs.width=type
}return attrs
}jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)
}
});
jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
if(opt.queue==null||opt.queue===true){opt.queue="fx"
}opt.old=opt.complete;
opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this)
}if(opt.queue){jQuery.dequeue(this,opt.queue)
}};
return opt
};
jQuery.easing={linear:function(p){return p
},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2
}};
jQuery.timers=[];
jQuery.fx=Tween.prototype.init;
jQuery.fx.tick=function(){var timer,timers=jQuery.timers,i=0;
fxNow=jQuery.now();
for(;
i<timers.length;
i++){timer=timers[i];
if(!timer()&&timers[i]===timer){timers.splice(i--,1)
}}if(!timers.length){jQuery.fx.stop()
}fxNow=undefined
};
jQuery.fx.timer=function(timer){if(timer()&&jQuery.timers.push(timer)&&!timerId){timerId=setInterval(jQuery.fx.tick,jQuery.fx.interval)
}};
jQuery.fx.interval=13;
jQuery.fx.stop=function(){clearInterval(timerId);
timerId=null
};
jQuery.fx.speeds={slow:600,fast:200,_default:400};
jQuery.fx.step={};
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem
}).length
}
}var rroot=/^(?:body|html)$/i;
jQuery.fn.offset=function(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i)
})
}var docElem,body,win,clientTop,clientLeft,scrollTop,scrollLeft,box={top:0,left:0},elem=this[0],doc=elem&&elem.ownerDocument;
if(!doc){return
}if((body=doc.body)===elem){return jQuery.offset.bodyOffset(elem)
}docElem=doc.documentElement;
if(!jQuery.contains(docElem,elem)){return box
}if(typeof elem.getBoundingClientRect!=="undefined"){box=elem.getBoundingClientRect()
}win=getWindow(doc);
clientTop=docElem.clientTop||body.clientTop||0;
clientLeft=docElem.clientLeft||body.clientLeft||0;
scrollTop=win.pageYOffset||docElem.scrollTop;
scrollLeft=win.pageXOffset||docElem.scrollLeft;
return{top:box.top+scrollTop-clientTop,left:box.left+scrollLeft-clientLeft}
};
jQuery.offset={bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;
if(jQuery.support.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0
}return{top:top,left:left}
},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");
if(position==="static"){elem.style.position="relative"
}var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;
if(calculatePosition){curPosition=curElem.position();
curTop=curPosition.top;
curLeft=curPosition.left
}else{curTop=parseFloat(curCSSTop)||0;
curLeft=parseFloat(curCSSLeft)||0
}if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)
}if(options.top!=null){props.top=(options.top-curOffset.top)+curTop
}if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft
}if("using" in options){options.using.call(elem,props)
}else{curElem.css(props)
}}};
jQuery.fn.extend({position:function(){if(!this[0]){return
}var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();
offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;
offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;
parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;
parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}
},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;
while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent
}return offsetParent||document.body
})
}});
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top=/Y/.test(prop);
jQuery.fn[method]=function(val){return jQuery.access(this,function(elem,method,val){var win=getWindow(elem);
if(val===undefined){return win?(prop in win)?win[prop]:win.document.documentElement[method]:elem[method]
}if(win){win.scrollTo(!top?val:jQuery(win).scrollLeft(),top?val:jQuery(win).scrollTop())
}else{elem[method]=val
}},method,val,arguments.length,null)
}
});
function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false
}jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");
return jQuery.access(this,function(elem,type,value){var doc;
if(jQuery.isWindow(elem)){return elem.document.documentElement["client"+name]
}if(elem.nodeType===9){doc=elem.documentElement;
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name])
}return value===undefined?jQuery.css(elem,type,value,extra):jQuery.style(elem,type,value,extra)
},type,chainable?margin:undefined,chainable,null)
}
})
});
window.jQuery=window.$=jQuery;
if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return jQuery
})
}})(window);
/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
(function(){function a(){}function b(a,b){for(var c=a.length;
c--;
){if(a[c].listener===b){return c
}}return -1
}function c(a){return function(){return this[a].apply(this,arguments)
}
}var d=a.prototype,e=this,f=e.EventEmitter;
d.getListeners=function(a){var b,c,d=this._getEvents();
if("object"==typeof a){b={};
for(c in d){d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])
}}else{b=d[a]||(d[a]=[])
}return b
},d.flattenListeners=function(a){var b,c=[];
for(b=0;
b<a.length;
b+=1){c.push(a[b].listener)
}return c
},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);
return c instanceof Array&&(b={},b[a]=c),b||c
},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;
for(d in e){e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1})
}return this
},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})
},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this
},d.defineEvents=function(a){for(var b=0;
b<a.length;
b+=1){this.defineEvent(a[b])
}return this
},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);
for(e in f){f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1))
}return this
},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)
},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)
},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;
if("object"!=typeof b||b instanceof RegExp){for(d=c.length;
d--;
){f.call(this,b,c[d])
}}else{for(d in b){b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e))
}}return this
},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();
if("string"===c){delete d[a]
}else{if("object"===c){for(b in d){d.hasOwnProperty(b)&&a.test(b)&&delete d[b]
}}else{delete this._events
}}return this
},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);
for(e in g){if(g.hasOwnProperty(e)){for(d=g[e].length;
d--;
){c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener)
}}}return this
},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);
return this.emitEvent(a,b)
},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this
},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0
},d._getEvents=function(){return this._events||(this._events={})
},a.noConflict=function(){return e.EventEmitter=f,a
},"function"==typeof define&&define.amd?define(function(){return a
}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a
}).call(this),
/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */
function(a){var b=document.documentElement,c=function(){};
b.addEventListener?c=function(a,b,c){a.addEventListener(b,c,!1)
}:b.attachEvent&&(c=function(b,c,d){b[c+d]=d.handleEvent?function(){var b=a.event;
b.target=b.target||b.srcElement,d.handleEvent.call(d,b)
}:function(){var c=a.event;
c.target=c.target||c.srcElement,d.call(b,c)
},b.attachEvent("on"+c,b[c+d])
});
var d=function(){};
b.removeEventListener?d=function(a,b,c){a.removeEventListener(b,c,!1)
}:b.detachEvent&&(d=function(a,b,c){a.detachEvent("on"+b,a[b+c]);
try{delete a[b+c]
}catch(d){a[b+c]=void 0
}});
var e={bind:c,unbind:d};
"function"==typeof define&&define.amd?define(e):a.eventie=e
}(this),
/*!
 * imagesLoaded v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */
function(a){function b(a,b){for(var c in b){a[c]=b[c]
}return a
}function c(a){return"[object Array]"===i.call(a)
}function d(a){var b=[];
if(c(a)){b=a
}else{if("number"==typeof a.length){for(var d=0,e=a.length;
e>d;
d++){b.push(a[d])
}}else{b.push(a)
}}return b
}function e(a,c){function e(a,c,g){if(!(this instanceof e)){return new e(a,c)
}"string"==typeof a&&(a=document.querySelectorAll(a)),this.elements=d(a),this.options=b({},this.options),"function"==typeof c?g=c:b(this.options,c),g&&this.on("always",g),this.getImages(),f&&(this.jqDeferred=new f.Deferred);
var h=this;
setTimeout(function(){h.check()
})
}function i(a){this.img=a
}e.prototype=new a,e.prototype.options={},e.prototype.getImages=function(){this.images=[];
for(var a=0,b=this.elements.length;
b>a;
a++){var c=this.elements[a];
"IMG"===c.nodeName&&this.addImage(c);
for(var d=c.querySelectorAll("img"),e=0,f=d.length;
f>e;
e++){var g=d[e];
this.addImage(g)
}}},e.prototype.addImage=function(a){var b=new i(a);
this.images.push(b)
},e.prototype.check=function(){function a(a,e){return b.options.debug&&h&&g.log("confirm",a,e),b.progress(a),c++,c===d&&b.complete(),!0
}var b=this,c=0,d=this.images.length;
if(this.hasAnyBroken=!1,!d){return this.complete(),void 0
}for(var e=0;
d>e;
e++){var f=this.images[e];
f.on("confirm",a),f.check()
}},e.prototype.progress=function(a){this.hasAnyBroken=this.hasAnyBroken||!a.isLoaded,this.emit("progress",this,a),this.jqDeferred&&this.jqDeferred.notify(this,a)
},e.prototype.complete=function(){var a=this.hasAnyBroken?"fail":"done";
if(this.isComplete=!0,this.emit(a,this),this.emit("always",this),this.jqDeferred){var b=this.hasAnyBroken?"reject":"resolve";
this.jqDeferred[b](this)
}},f&&(f.fn.imagesLoaded=function(a,b){var c=new e(this,a,b);
return c.jqDeferred.promise(f(this))
});
var j={};
return i.prototype=new a,i.prototype.check=function(){var a=j[this.img.src];
if(a){return this.useCached(a),void 0
}if(j[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth){return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0
}var b=this.proxyImage=new Image;
c.bind(b,"load",this),c.bind(b,"error",this),b.src=this.img.src
},i.prototype.useCached=function(a){if(a.isConfirmed){this.confirm(a.isLoaded,"cached was confirmed")
}else{var b=this;
a.on("confirm",function(a){return b.confirm(a.isLoaded,"cache emitted confirmed"),!0
})
}},i.prototype.confirm=function(a,b){this.isConfirmed=!0,this.isLoaded=a,this.emit("confirm",this,b)
},i.prototype.handleEvent=function(a){var b="on"+a.type;
this[b]&&this[b](a)
},i.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()
},i.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()
},i.prototype.unbindProxyEvents=function(){c.unbind(this.proxyImage,"load",this),c.unbind(this.proxyImage,"error",this)
},e
}var f=a.jQuery,g=a.console,h="undefined"!=typeof g,i=Object.prototype.toString;
"function"==typeof define&&define.amd?define(["eventEmitter","eventie"],e):a.imagesLoaded=e(a.EventEmitter,a.eventie)
}(window);
(function(window,document,undefined){(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)
}else{if(jQuery&&!jQuery.fn.qtip){factory(jQuery)
}}}(function($){var TRUE=true,FALSE=false,NULL=null,X="x",Y="y",WIDTH="width",HEIGHT="height",TOP="top",LEFT="left",BOTTOM="bottom",RIGHT="right",CENTER="center",FLIP="flip",FLIPINVERT="flipinvert",SHIFT="shift",QTIP,PROTOTYPE,CORNER,CHECKS,PLUGINS={},NAMESPACE="qtip",ATTR_HAS="data-hasqtip",ATTR_ID="data-qtip-id",WIDGET=["ui-widget","ui-tooltip"],SELECTOR="."+NAMESPACE,INACTIVE_EVENTS="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),CLASS_FIXED=NAMESPACE+"-fixed",CLASS_DEFAULT=NAMESPACE+"-default",CLASS_FOCUS=NAMESPACE+"-focus",CLASS_HOVER=NAMESPACE+"-hover",CLASS_DISABLED=NAMESPACE+"-disabled",replaceSuffix="_replacedByqTip",oldtitle="oldtitle",trackingBound,BROWSER={ie:(function(){var v=3,div=document.createElement("div");
while((div.innerHTML="<!--[if gt IE "+(++v)+"]><i></i><![endif]-->")){if(!div.getElementsByTagName("i")[0]){break
}}return v>4?v:NaN
}()),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||FALSE};
function QTip(target,options,id,attr){this.id=id;
this.target=target;
this.tooltip=NULL;
this.elements={target:target};
this._id=NAMESPACE+"-"+id;
this.timers={img:{}};
this.options=options;
this.plugins={};
this.cache={event:{},target:$(),disabled:FALSE,attr:attr,onTooltip:FALSE,lastClass:""};
this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=FALSE
}PROTOTYPE=QTip.prototype;
PROTOTYPE._when=function(deferreds){return $.when.apply($,deferreds)
};
PROTOTYPE.render=function(show){if(this.rendered||this.destroyed){return this
}var self=this,options=this.options,cache=this.cache,elements=this.elements,text=options.content.text,title=options.content.title,button=options.content.button,posOptions=options.position,namespace="."+this._id+" ",deferreds=[],tooltip;
$.attr(this.target[0],"aria-describedby",this._id);
this.tooltip=elements.tooltip=tooltip=$("<div/>",{id:this._id,"class":[NAMESPACE,CLASS_DEFAULT,options.style.classes,NAMESPACE+"-pos-"+options.position.my.abbrev()].join(" "),width:options.style.width||"",height:options.style.height||"",tracking:posOptions.target==="mouse"&&posOptions.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":FALSE,"aria-describedby":this._id+"-content","aria-hidden":TRUE}).toggleClass(CLASS_DISABLED,this.disabled).attr(ATTR_ID,this.id).data(NAMESPACE,this).appendTo(posOptions.container).append(elements.content=$("<div />",{"class":NAMESPACE+"-content",id:this._id+"-content","aria-atomic":TRUE}));
this.rendered=-1;
this.positioning=TRUE;
if(title){this._createTitle();
if(!$.isFunction(title)){deferreds.push(this._updateTitle(title,FALSE))
}}if(button){this._createButton()
}if(!$.isFunction(text)){deferreds.push(this._updateContent(text,FALSE))
}this.rendered=TRUE;
this._setWidget();
$.each(PLUGINS,function(name){var instance;
if(this.initialize==="render"&&(instance=this(self))){self.plugins[name]=instance
}});
this._unassignEvents();
this._assignEvents();
this._when(deferreds).then(function(){self._trigger("render");
self.positioning=FALSE;
if(!self.hiddenDuringWait&&(options.show.ready||show)){self.toggle(TRUE,cache.event,FALSE)
}self.hiddenDuringWait=FALSE
});
QTIP.api[this.id]=this;
return this
};
PROTOTYPE.destroy=function(immediate){if(this.destroyed){return this.target
}function process(){if(this.destroyed){return
}this.destroyed=TRUE;
var target=this.target,title=target.attr(oldtitle);
if(this.rendered){this.tooltip.stop(1,0).find("*").remove().end().remove()
}$.each(this.plugins,function(name){this.destroy&&this.destroy()
});
clearTimeout(this.timers.show);
clearTimeout(this.timers.hide);
this._unassignEvents();
target.removeData(NAMESPACE).removeAttr(ATTR_ID).removeAttr(ATTR_HAS).removeAttr("aria-describedby");
if(this.options.suppress&&title){target.attr("title",title).removeAttr(oldtitle)
}this._unbind(target);
this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=NULL;
delete QTIP.api[this.id]
}if((immediate!==TRUE||this.triggering==="hide")&&this.rendered){this.tooltip.one("tooltiphidden",$.proxy(process,this));
!this.triggering&&this.hide()
}else{process.call(this)
}return this.target
};
function invalidOpt(a){return a===NULL||$.type(a)!=="object"
}function invalidContent(c){return !($.isFunction(c)||(c&&c.attr)||c.length||($.type(c)==="object"&&(c.jquery||c.then)))
}function sanitizeOptions(opts){var content,text,ajax,once;
if(invalidOpt(opts)){return FALSE
}if(invalidOpt(opts.metadata)){opts.metadata={type:opts.metadata}
}if("content" in opts){content=opts.content;
if(invalidOpt(content)||content.jquery||content.done){content=opts.content={text:(text=invalidContent(content)?FALSE:content)}
}else{text=content.text
}if("ajax" in content){ajax=content.ajax;
once=ajax&&ajax.once!==FALSE;
delete content.ajax;
content.text=function(event,api){var loading=text||$(this).attr(api.options.content.attr)||"Loading...",deferred=$.ajax($.extend({},ajax,{context:api})).then(ajax.success,NULL,ajax.error).then(function(content){if(content&&once){api.set("content.text",content)
}return content
},function(xhr,status,error){if(api.destroyed||xhr.status===0){return
}api.set("content.text",status+": "+error)
});
return !once?(api.set("content.text",loading),deferred):loading
}
}if("title" in content){if(!invalidOpt(content.title)){content.button=content.title.button;
content.title=content.title.text
}if(invalidContent(content.title||FALSE)){content.title=FALSE
}}}if("position" in opts&&invalidOpt(opts.position)){opts.position={my:opts.position,at:opts.position}
}if("show" in opts&&invalidOpt(opts.show)){opts.show=opts.show.jquery?{target:opts.show}:opts.show===TRUE?{ready:TRUE}:{event:opts.show}
}if("hide" in opts&&invalidOpt(opts.hide)){opts.hide=opts.hide.jquery?{target:opts.hide}:{event:opts.hide}
}if("style" in opts&&invalidOpt(opts.style)){opts.style={classes:opts.style}
}$.each(PLUGINS,function(){this.sanitize&&this.sanitize(opts)
});
return opts
}CHECKS=PROTOTYPE.checks={builtin:{"^id$":function(obj,o,v,prev){var id=v===TRUE?QTIP.nextid:v,new_id=NAMESPACE+"-"+id;
if(id!==FALSE&&id.length>0&&!$("#"+new_id).length){this._id=new_id;
if(this.rendered){this.tooltip[0].id=this._id;
this.elements.content[0].id=this._id+"-content";
this.elements.title[0].id=this._id+"-title"
}}else{obj[o]=prev
}},"^prerender":function(obj,o,v){v&&!this.rendered&&this.render(this.options.show.ready)
},"^content.text$":function(obj,o,v){this._updateContent(v)
},"^content.attr$":function(obj,o,v,prev){if(this.options.content.text===this.target.attr(prev)){this._updateContent(this.target.attr(v))
}},"^content.title$":function(obj,o,v){if(!v){return this._removeTitle()
}v&&!this.elements.title&&this._createTitle();
this._updateTitle(v)
},"^content.button$":function(obj,o,v){this._updateButton(v)
},"^content.title.(text|button)$":function(obj,o,v){this.set("content."+o,v)
},"^position.(my|at)$":function(obj,o,v){"string"===typeof v&&(obj[o]=new CORNER(v,o==="at"))
},"^position.container$":function(obj,o,v){this.rendered&&this.tooltip.appendTo(v)
},"^show.ready$":function(obj,o,v){v&&(!this.rendered&&this.render(TRUE)||this.toggle(TRUE))
},"^style.classes$":function(obj,o,v,p){this.rendered&&this.tooltip.removeClass(p).addClass(v)
},"^style.(width|height)":function(obj,o,v){this.rendered&&this.tooltip.css(o,v)
},"^style.widget|content.title":function(){this.rendered&&this._setWidget()
},"^style.def":function(obj,o,v){this.rendered&&this.tooltip.toggleClass(CLASS_DEFAULT,!!v)
},"^events.(render|show|move|hide|focus|blur)$":function(obj,o,v){this.rendered&&this.tooltip[($.isFunction(v)?"":"un")+"bind"]("tooltip"+o,v)
},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(!this.rendered){return
}var posOptions=this.options.position;
this.tooltip.attr("tracking",posOptions.target==="mouse"&&posOptions.adjust.mouse);
this._unassignEvents();
this._assignEvents()
}}};
function convertNotation(options,notation){var i=0,obj,option=options,levels=notation.split(".");
while(option=option[levels[i++]]){if(i<levels.length){obj=option
}}return[obj||options,levels.pop()]
}PROTOTYPE.get=function(notation){if(this.destroyed){return this
}var o=convertNotation(this.options,notation.toLowerCase()),result=o[0][o[1]];
return result.precedance?result.string():result
};
function setCallback(notation,args){var category,rule,match;
for(category in this.checks){for(rule in this.checks[category]){if(match=(new RegExp(rule,"i")).exec(notation)){args.push(match);
if(category==="builtin"||this.plugins[category]){this.checks[category][rule].apply(this.plugins[category]||this,args)
}}}}}var rmove=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,rrender=/^prerender|show\.ready/i;
PROTOTYPE.set=function(option,value){if(this.destroyed){return this
}var rendered=this.rendered,reposition=FALSE,options=this.options,checks=this.checks,name;
if("string"===typeof option){name=option;
option={};
option[name]=value
}else{option=$.extend({},option)
}$.each(option,function(notation,value){if(rendered&&rrender.test(notation)){delete option[notation];
return
}var obj=convertNotation(options,notation.toLowerCase()),previous;
previous=obj[0][obj[1]];
obj[0][obj[1]]=value&&value.nodeType?$(value):value;
reposition=rmove.test(notation)||reposition;
option[notation]=[obj[0],obj[1],value,previous]
});
sanitizeOptions(options);
this.positioning=TRUE;
$.each(option,$.proxy(setCallback,this));
this.positioning=FALSE;
if(this.rendered&&this.tooltip[0].offsetWidth>0&&reposition){this.reposition(options.position.target==="mouse"?NULL:this.cache.event)
}return this
};
PROTOTYPE._update=function(content,element,reposition){var self=this,cache=this.cache;
if(!this.rendered||!content){return FALSE
}if($.isFunction(content)){content=content.call(this.elements.target,cache.event,this)||""
}if($.isFunction(content.then)){cache.waiting=TRUE;
return content.then(function(c){cache.waiting=FALSE;
return self._update(c,element)
},NULL,function(e){return self._update(e,element)
})
}if(content===FALSE||(!content&&content!=="")){return FALSE
}if(content.jquery&&content.length>0){element.empty().append(content.css({display:"block",visibility:"visible"}))
}else{element.html(content)
}return this._waitForContent(element).then(function(images){if(images.images&&images.images.length&&self.rendered&&self.tooltip[0].offsetWidth>0){self.reposition(cache.event,!images.length)
}})
};
PROTOTYPE._waitForContent=function(element){var cache=this.cache;
cache.waiting=TRUE;
return($.fn.imagesLoaded?element.imagesLoaded():$.Deferred().resolve([])).done(function(){cache.waiting=FALSE
}).promise()
};
PROTOTYPE._updateContent=function(content,reposition){this._update(content,this.elements.content,reposition)
};
PROTOTYPE._updateTitle=function(content,reposition){if(this._update(content,this.elements.title,reposition)===FALSE){this._removeTitle(FALSE)
}};
PROTOTYPE._createTitle=function(){var elements=this.elements,id=this._id+"-title";
if(elements.titlebar){this._removeTitle()
}elements.titlebar=$("<div />",{"class":NAMESPACE+"-titlebar "+(this.options.style.widget?createWidgetClass("header"):"")}).append(elements.title=$("<div />",{id:id,"class":NAMESPACE+"-title","aria-atomic":TRUE})).insertBefore(elements.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(event){$(this).toggleClass("ui-state-active ui-state-focus",event.type.substr(-4)==="down")
}).delegate(".qtip-close","mouseover mouseout",function(event){$(this).toggleClass("ui-state-hover",event.type==="mouseover")
});
if(this.options.content.button){this._createButton()
}};
PROTOTYPE._removeTitle=function(reposition){var elements=this.elements;
if(elements.title){elements.titlebar.remove();
elements.titlebar=elements.title=elements.button=NULL;
if(reposition!==FALSE){this.reposition()
}}};
PROTOTYPE.reposition=function(event,effect){if(!this.rendered||this.positioning||this.destroyed){return this
}this.positioning=TRUE;
var cache=this.cache,tooltip=this.tooltip,posOptions=this.options.position,target=posOptions.target,my=posOptions.my,at=posOptions.at,viewport=posOptions.viewport,container=posOptions.container,adjust=posOptions.adjust,method=adjust.method.split(" "),tooltipWidth=tooltip.outerWidth(FALSE),tooltipHeight=tooltip.outerHeight(FALSE),targetWidth=0,targetHeight=0,type=tooltip.css("position"),position={left:0,top:0},visible=tooltip[0].offsetWidth>0,isScroll=event&&event.type==="scroll",win=$(window),doc=container[0].ownerDocument,mouse=this.mouse,pluginCalculations,offset;
if($.isArray(target)&&target.length===2){at={x:LEFT,y:TOP};
position={left:target[0],top:target[1]}
}else{if(target==="mouse"){at={x:LEFT,y:TOP};
if(mouse&&mouse.pageX&&(adjust.mouse||!event||!event.pageX)){event=mouse
}else{if(!event||!event.pageX){if((!adjust.mouse||this.options.show.distance)&&cache.origin&&cache.origin.pageX){event=cache.origin
}else{if(!event||(event&&(event.type==="resize"||event.type==="scroll"))){event=cache.event
}}}}if(type!=="static"){position=container.offset()
}if(doc.body.offsetWidth!==(window.innerWidth||doc.documentElement.clientWidth)){offset=$(document.body).offset()
}position={left:event.pageX-position.left+(offset&&offset.left||0),top:event.pageY-position.top+(offset&&offset.top||0)};
if(adjust.mouse&&isScroll&&mouse){position.left-=(mouse.scrollX||0)-win.scrollLeft();
position.top-=(mouse.scrollY||0)-win.scrollTop()
}}else{if(target==="event"){if(event&&event.target&&event.type!=="scroll"&&event.type!=="resize"){cache.target=$(event.target)
}else{if(!event.target){cache.target=this.elements.target
}}}else{if(target!=="event"){cache.target=$(target.jquery?target:this.elements.target)
}}target=cache.target;
target=$(target).eq(0);
if(target.length===0){return this
}else{if(target[0]===document||target[0]===window){targetWidth=BROWSER.iOS?window.innerWidth:target.width();
targetHeight=BROWSER.iOS?window.innerHeight:target.height();
if(target[0]===window){position={top:(viewport||target).scrollTop(),left:(viewport||target).scrollLeft()}
}}else{if(PLUGINS.imagemap&&target.is("area")){pluginCalculations=PLUGINS.imagemap(this,target,at,PLUGINS.viewport?method:FALSE)
}else{if(PLUGINS.svg&&target&&target[0].ownerSVGElement){pluginCalculations=PLUGINS.svg(this,target,at,PLUGINS.viewport?method:FALSE)
}else{targetWidth=target.outerWidth(FALSE);
targetHeight=target.outerHeight(FALSE);
position=target.offset()
}}}}if(pluginCalculations){targetWidth=pluginCalculations.width;
targetHeight=pluginCalculations.height;
offset=pluginCalculations.offset;
position=pluginCalculations.position
}position=this.reposition.offset(target,position,container);
if((BROWSER.iOS>3.1&&BROWSER.iOS<4.1)||(BROWSER.iOS>=4.3&&BROWSER.iOS<4.33)||(!BROWSER.iOS&&type==="fixed")){position.left-=win.scrollLeft();
position.top-=win.scrollTop()
}if(!pluginCalculations||(pluginCalculations&&pluginCalculations.adjustable!==FALSE)){position.left+=at.x===RIGHT?targetWidth:at.x===CENTER?targetWidth/2:0;
position.top+=at.y===BOTTOM?targetHeight:at.y===CENTER?targetHeight/2:0
}}}position.left+=adjust.x+(my.x===RIGHT?-tooltipWidth:my.x===CENTER?-tooltipWidth/2:0);
position.top+=adjust.y+(my.y===BOTTOM?-tooltipHeight:my.y===CENTER?-tooltipHeight/2:0);
if(PLUGINS.viewport){position.adjusted=PLUGINS.viewport(this,position,posOptions,targetWidth,targetHeight,tooltipWidth,tooltipHeight);
if(offset&&position.adjusted.left){position.left+=offset.left
}if(offset&&position.adjusted.top){position.top+=offset.top
}}else{position.adjusted={left:0,top:0}
}if(!this._trigger("move",[position,viewport.elem||viewport],event)){return this
}delete position.adjusted;
if(effect===FALSE||!visible||isNaN(position.left)||isNaN(position.top)||target==="mouse"||!$.isFunction(posOptions.effect)){tooltip.css(position)
}else{if($.isFunction(posOptions.effect)){posOptions.effect.call(tooltip,this,$.extend({},position));
tooltip.queue(function(next){$(this).css({opacity:"",height:""});
if(BROWSER.ie){this.style.removeAttribute("filter")
}next()
})
}}this.positioning=FALSE;
return this
};
PROTOTYPE.reposition.offset=function(elem,pos,container){if(!container[0]){return pos
}var ownerDocument=$(elem[0].ownerDocument),quirks=!!BROWSER.ie&&document.compatMode!=="CSS1Compat",parent=container[0],scrolled,position,parentOffset,overflow;
function scroll(e,i){pos.left+=i*e.scrollLeft();
pos.top+=i*e.scrollTop()
}do{if((position=$.css(parent,"position"))!=="static"){if(position==="fixed"){parentOffset=parent.getBoundingClientRect();
scroll(ownerDocument,-1)
}else{parentOffset=$(parent).position();
parentOffset.left+=(parseFloat($.css(parent,"borderLeftWidth"))||0);
parentOffset.top+=(parseFloat($.css(parent,"borderTopWidth"))||0)
}pos.left-=parentOffset.left+(parseFloat($.css(parent,"marginLeft"))||0);
pos.top-=parentOffset.top+(parseFloat($.css(parent,"marginTop"))||0);
if(!scrolled&&(overflow=$.css(parent,"overflow"))!=="hidden"&&overflow!=="visible"){scrolled=$(parent)
}}}while((parent=parent.offsetParent));
if(scrolled&&(scrolled[0]!==ownerDocument[0]||quirks)){scroll(scrolled,1)
}return pos
};
var C=(CORNER=PROTOTYPE.reposition.Corner=function(corner,forceY){corner=(""+corner).replace(/([A-Z])/," $1").replace(/middle/gi,CENTER).toLowerCase();
this.x=(corner.match(/left|right/i)||corner.match(/center/)||["inherit"])[0].toLowerCase();
this.y=(corner.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();
this.forceY=!!forceY;
var f=corner.charAt(0);
this.precedance=(f==="t"||f==="b"?Y:X)
}).prototype;
C.invert=function(z,center){this[z]=this[z]===LEFT?RIGHT:this[z]===RIGHT?LEFT:center||this[z]
};
C.string=function(){var x=this.x,y=this.y;
return x===y?x:this.precedance===Y||(this.forceY&&y!=="center")?y+" "+x:x+" "+y
};
C.abbrev=function(){var result=this.string().split(" ");
return result[0].charAt(0)+(result[1]&&result[1].charAt(0)||"")
};
C.clone=function(){return new CORNER(this.string(),this.forceY)
};
PROTOTYPE.toggle=function(state,event){var cache=this.cache,options=this.options,tooltip=this.tooltip;
if(event){if((/over|enter/).test(event.type)&&(/out|leave/).test(cache.event.type)&&options.show.target.add(event.target).length===options.show.target.length&&tooltip.has(event.relatedTarget).length){return this
}cache.event=cloneEvent(event)
}this.waiting&&!state&&(this.hiddenDuringWait=TRUE);
if(!this.rendered){return state?this.render(1):this
}else{if(this.destroyed||this.disabled){return this
}}var type=state?"show":"hide",opts=this.options[type],otherOpts=this.options[!state?"show":"hide"],posOptions=this.options.position,contentOptions=this.options.content,width=this.tooltip.css("width"),visible=this.tooltip.is(":visible"),animate=state||opts.target.length===1,sameTarget=!event||opts.target.length<2||cache.target[0]===event.target,identicalState,allow,showEvent,delay,after;
if((typeof state).search("boolean|number")){state=!visible
}identicalState=!tooltip.is(":animated")&&visible===state&&sameTarget;
allow=!identicalState?!!this._trigger(type,[90]):NULL;
if(this.destroyed){return this
}if(allow!==FALSE&&state){this.focus(event)
}if(!allow||identicalState){return this
}$.attr(tooltip[0],"aria-hidden",!!!state);
if(state){cache.origin=cloneEvent(this.mouse);
if($.isFunction(contentOptions.text)){this._updateContent(contentOptions.text,FALSE)
}if($.isFunction(contentOptions.title)){this._updateTitle(contentOptions.title,FALSE)
}if(!trackingBound&&posOptions.target==="mouse"&&posOptions.adjust.mouse){$(document).bind("mousemove."+NAMESPACE,this._storeMouse);
trackingBound=TRUE
}if(!width){tooltip.css("width",tooltip.outerWidth(FALSE))
}this.reposition(event,arguments[2]);
if(!width){tooltip.css("width","")
}if(!!opts.solo){(typeof opts.solo==="string"?$(opts.solo):$(SELECTOR,opts.solo)).not(tooltip).not(opts.target).qtip("hide",$.Event("tooltipsolo"))
}}else{clearTimeout(this.timers.show);
delete cache.origin;
if(trackingBound&&!$(SELECTOR+'[tracking="true"]:visible',opts.solo).not(tooltip).length){$(document).unbind("mousemove."+NAMESPACE);
trackingBound=FALSE
}this.blur(event)
}after=$.proxy(function(){if(state){if(BROWSER.ie){tooltip[0].style.removeAttribute("filter")
}tooltip.css("overflow","");
if("string"===typeof opts.autofocus){$(this.options.show.autofocus,tooltip).focus()
}this.options.show.target.trigger("qtip-"+this.id+"-inactive")
}else{tooltip.css({display:"",visibility:"",opacity:"",left:"",top:""})
}this._trigger(state?"visible":"hidden")
},this);
if(opts.effect===FALSE||animate===FALSE){tooltip[type]();
after()
}else{if($.isFunction(opts.effect)){tooltip.stop(1,1);
opts.effect.call(tooltip,this);
tooltip.queue("fx",function(n){after();
n()
})
}else{tooltip.fadeTo(90,state?1:0,after)
}}if(state){opts.target.trigger("qtip-"+this.id+"-inactive")
}return this
};
PROTOTYPE.show=function(event){return this.toggle(TRUE,event)
};
PROTOTYPE.hide=function(event){return this.toggle(FALSE,event)
};
PROTOTYPE.focus=function(event){if(!this.rendered||this.destroyed){return this
}var qtips=$(SELECTOR),tooltip=this.tooltip,curIndex=parseInt(tooltip[0].style.zIndex,10),newIndex=QTIP.zindex+qtips.length,focusedElem;
if(!tooltip.hasClass(CLASS_FOCUS)){if(this._trigger("focus",[newIndex],event)){if(curIndex!==newIndex){qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex=this.style.zIndex-1
}});
qtips.filter("."+CLASS_FOCUS).qtip("blur",event)
}tooltip.addClass(CLASS_FOCUS)[0].style.zIndex=newIndex
}}return this
};
PROTOTYPE.blur=function(event){if(!this.rendered||this.destroyed){return this
}this.tooltip.removeClass(CLASS_FOCUS);
this._trigger("blur",[this.tooltip.css("zIndex")],event);
return this
};
PROTOTYPE.disable=function(state){if(this.destroyed){return this
}if(state==="toggle"){state=!(this.rendered?this.tooltip.hasClass(CLASS_DISABLED):this.disabled)
}else{if("boolean"!==typeof state){state=TRUE
}}if(this.rendered){this.tooltip.toggleClass(CLASS_DISABLED,state).attr("aria-disabled",state)
}this.disabled=!!state;
return this
};
PROTOTYPE.enable=function(){return this.disable(FALSE)
};
PROTOTYPE._createButton=function(){var self=this,elements=this.elements,tooltip=elements.tooltip,button=this.options.content.button,isString=typeof button==="string",close=isString?button:"Close tooltip";
if(elements.button){elements.button.remove()
}if(button.jquery){elements.button=button
}else{elements.button=$("<a />",{"class":"qtip-close "+(this.options.style.widget?"":NAMESPACE+"-icon"),title:close,"aria-label":close}).prepend($("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"}))
}elements.button.appendTo(elements.titlebar||tooltip).attr("role","button").click(function(event){if(!tooltip.hasClass(CLASS_DISABLED)){self.hide(event)
}return FALSE
})
};
PROTOTYPE._updateButton=function(button){if(!this.rendered){return FALSE
}var elem=this.elements.button;
if(button){this._createButton()
}else{elem.remove()
}};
function createWidgetClass(cls){return WIDGET.concat("").join(cls?"-"+cls+" ":" ")
}PROTOTYPE._setWidget=function(){var on=this.options.style.widget,elements=this.elements,tooltip=elements.tooltip,disabled=tooltip.hasClass(CLASS_DISABLED);
tooltip.removeClass(CLASS_DISABLED);
CLASS_DISABLED=on?"ui-state-disabled":"qtip-disabled";
tooltip.toggleClass(CLASS_DISABLED,disabled);
tooltip.toggleClass("ui-helper-reset "+createWidgetClass(),on).toggleClass(CLASS_DEFAULT,this.options.style.def&&!on);
if(elements.content){elements.content.toggleClass(createWidgetClass("content"),on)
}if(elements.titlebar){elements.titlebar.toggleClass(createWidgetClass("header"),on)
}if(elements.button){elements.button.toggleClass(NAMESPACE+"-icon",!on)
}};
function cloneEvent(event){return event&&{type:event.type,pageX:event.pageX,pageY:event.pageY,target:event.target,relatedTarget:event.relatedTarget,scrollX:event.scrollX||window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft,scrollY:event.scrollY||window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop}||{}
}function delay(callback,duration){if(duration>0){return setTimeout($.proxy(callback,this),duration)
}else{callback.call(this)
}}function showMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)){return FALSE
}clearTimeout(this.timers.show);
clearTimeout(this.timers.hide);
this.timers.show=delay.call(this,function(){this.toggle(TRUE,event)
},this.options.show.delay)
}function hideMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)){return FALSE
}var relatedTarget=$(event.relatedTarget),ontoTooltip=relatedTarget.closest(SELECTOR)[0]===this.tooltip[0],ontoTarget=relatedTarget[0]===this.options.show.target[0];
clearTimeout(this.timers.show);
clearTimeout(this.timers.hide);
if(this!==relatedTarget[0]&&(this.options.position.target==="mouse"&&ontoTooltip)||(this.options.hide.fixed&&((/mouse(out|leave|move)/).test(event.type)&&(ontoTooltip||ontoTarget)))){try{event.preventDefault();
event.stopImmediatePropagation()
}catch(e){}return
}this.timers.hide=delay.call(this,function(){this.toggle(FALSE,event)
},this.options.hide.delay,this)
}function inactiveMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)||!this.options.hide.inactive){return FALSE
}clearTimeout(this.timers.inactive);
this.timers.inactive=delay.call(this,function(){this.hide(event)
},this.options.hide.inactive)
}function repositionMethod(event){if(this.rendered&&this.tooltip[0].offsetWidth>0){this.reposition(event)
}}PROTOTYPE._storeMouse=function(event){(this.mouse=cloneEvent(event)).type="mousemove"
};
PROTOTYPE._bind=function(targets,events,method,suffix,context){var ns="."+this._id+(suffix?"-"+suffix:"");
events.length&&$(targets).bind((events.split?events:events.join(ns+" "))+ns,$.proxy(method,context||this))
};
PROTOTYPE._unbind=function(targets,suffix){$(targets).unbind("."+this._id+(suffix?"-"+suffix:""))
};
var ns="."+NAMESPACE;
function delegate(selector,events,method){$(document.body).delegate(selector,(events.split?events:events.join(ns+" "))+ns,function(){var api=QTIP.api[$.attr(this,ATTR_ID)];
api&&!api.disabled&&method.apply(api,arguments)
})
}$(function(){delegate(SELECTOR,["mouseenter","mouseleave"],function(event){var state=event.type==="mouseenter",tooltip=$(event.currentTarget),target=$(event.relatedTarget||event.target),options=this.options;
if(state){this.focus(event);
tooltip.hasClass(CLASS_FIXED)&&!tooltip.hasClass(CLASS_DISABLED)&&clearTimeout(this.timers.hide)
}else{if(options.position.target==="mouse"&&options.hide.event&&options.show.target&&!target.closest(options.show.target[0]).length){this.hide(event)
}}tooltip.toggleClass(CLASS_HOVER,state)
});
delegate("["+ATTR_ID+"]",INACTIVE_EVENTS,inactiveMethod)
});
PROTOTYPE._trigger=function(type,args,event){var callback=$.Event("tooltip"+type);
callback.originalEvent=(event&&$.extend({},event))||this.cache.event||NULL;
this.triggering=type;
this.tooltip.trigger(callback,[this].concat(args||[]));
this.triggering=FALSE;
return !callback.isDefaultPrevented()
};
PROTOTYPE._bindEvents=function(showEvents,hideEvents,showTarget,hideTarget,showMethod,hideMethod){if(hideTarget.add(showTarget).length===hideTarget.length){var toggleEvents=[];
hideEvents=$.map(hideEvents,function(type){var showIndex=$.inArray(type,showEvents);
if(showIndex>-1){toggleEvents.push(showEvents.splice(showIndex,1)[0]);
return
}return type
});
toggleEvents.length&&this._bind(showTarget,toggleEvents,function(event){var state=this.rendered?this.tooltip[0].offsetWidth>0:false;
(state?hideMethod:showMethod).call(this,event)
})
}this._bind(showTarget,showEvents,showMethod);
this._bind(hideTarget,hideEvents,hideMethod)
};
PROTOTYPE._assignInitialEvents=function(event){var options=this.options,showTarget=options.show.target,hideTarget=options.hide.target,showEvents=options.show.event?$.trim(""+options.show.event).split(" "):[],hideEvents=options.hide.event?$.trim(""+options.hide.event).split(" "):[];
if(/mouse(over|enter)/i.test(options.show.event)&&!/mouse(out|leave)/i.test(options.hide.event)){hideEvents.push("mouseleave")
}this._bind(showTarget,"mousemove",function(event){this._storeMouse(event);
this.cache.onTarget=TRUE
});
function hoverIntent(event){if(this.disabled||this.destroyed){return FALSE
}this.cache.event=cloneEvent(event);
this.cache.target=event?$(event.target):[undefined];
clearTimeout(this.timers.show);
this.timers.show=delay.call(this,function(){this.render(typeof event==="object"||options.show.ready)
},options.show.delay)
}this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,hoverIntent,function(){clearTimeout(this.timers.show)
});
if(options.show.ready||options.prerender){hoverIntent.call(this,event)
}};
PROTOTYPE._assignEvents=function(){var self=this,options=this.options,posOptions=options.position,tooltip=this.tooltip,showTarget=options.show.target,hideTarget=options.hide.target,containerTarget=posOptions.container,viewportTarget=posOptions.viewport,documentTarget=$(document),bodyTarget=$(document.body),windowTarget=$(window),showEvents=options.show.event?$.trim(""+options.show.event).split(" "):[],hideEvents=options.hide.event?$.trim(""+options.hide.event).split(" "):[];
$.each(options.events,function(name,callback){self._bind(tooltip,name==="toggle"?["tooltipshow","tooltiphide"]:["tooltip"+name],callback,null,tooltip)
});
if(/mouse(out|leave)/i.test(options.hide.event)&&options.hide.leave==="window"){this._bind(documentTarget,["mouseout","blur"],function(event){if(!/select|option/.test(event.target.nodeName)&&!event.relatedTarget){this.hide(event)
}})
}if(options.hide.fixed){hideTarget=hideTarget.add(tooltip.addClass(CLASS_FIXED))
}else{if(/mouse(over|enter)/i.test(options.show.event)){this._bind(hideTarget,"mouseleave",function(){clearTimeout(this.timers.show)
})
}}if((""+options.hide.event).indexOf("unfocus")>-1){this._bind(containerTarget.closest("html"),["mousedown","touchstart"],function(event){var elem=$(event.target),enabled=this.rendered&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0,isAncestor=elem.parents(SELECTOR).filter(this.tooltip[0]).length>0;
if(elem[0]!==this.target[0]&&elem[0]!==this.tooltip[0]&&!isAncestor&&!this.target.has(elem[0]).length&&enabled){this.hide(event)
}})
}if("number"===typeof options.hide.inactive){this._bind(showTarget,"qtip-"+this.id+"-inactive",inactiveMethod);
this._bind(hideTarget.add(tooltip),QTIP.inactiveEvents,inactiveMethod,"-inactive")
}this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,showMethod,hideMethod);
this._bind(showTarget.add(tooltip),"mousemove",function(event){if("number"===typeof options.hide.distance){var origin=this.cache.origin||{},limit=this.options.hide.distance,abs=Math.abs;
if(abs(event.pageX-origin.pageX)>=limit||abs(event.pageY-origin.pageY)>=limit){this.hide(event)
}}this._storeMouse(event)
});
if(posOptions.target==="mouse"){if(posOptions.adjust.mouse){if(options.hide.event){this._bind(showTarget,["mouseenter","mouseleave"],function(event){this.cache.onTarget=event.type==="mouseenter"
})
}this._bind(documentTarget,"mousemove",function(event){if(this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0){this.reposition(event)
}})
}}if(posOptions.adjust.resize||viewportTarget.length){this._bind($.event.special.resize?viewportTarget:windowTarget,"resize",repositionMethod)
}if(posOptions.adjust.scroll){this._bind(windowTarget.add(posOptions.container),"scroll",repositionMethod)
}};
PROTOTYPE._unassignEvents=function(){var targets=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],window,document];
this._unbind($([]).pushStack($.grep(targets,function(i){return typeof i==="object"
})))
};
function init(elem,id,opts){var obj,posOptions,attr,config,title,docBody=$(document.body),newTarget=elem[0]===document?docBody:elem,metadata=(elem.metadata)?elem.metadata(opts.metadata):NULL,metadata5=opts.metadata.type==="html5"&&metadata?metadata[opts.metadata.name]:NULL,html5=elem.data(opts.metadata.name||"qtipopts");
try{html5=typeof html5==="string"?$.parseJSON(html5):html5
}catch(e){}config=$.extend(TRUE,{},QTIP.defaults,opts,typeof html5==="object"?sanitizeOptions(html5):NULL,sanitizeOptions(metadata5||metadata));
posOptions=config.position;
config.id=id;
if("boolean"===typeof config.content.text){attr=elem.attr(config.content.attr);
if(config.content.attr!==FALSE&&attr){config.content.text=attr
}else{return FALSE
}}if(!posOptions.container.length){posOptions.container=docBody
}if(posOptions.target===FALSE){posOptions.target=newTarget
}if(config.show.target===FALSE){config.show.target=newTarget
}if(config.show.solo===TRUE){config.show.solo=posOptions.container.closest("body")
}if(config.hide.target===FALSE){config.hide.target=newTarget
}if(config.position.viewport===TRUE){config.position.viewport=posOptions.container
}posOptions.container=posOptions.container.eq(0);
posOptions.at=new CORNER(posOptions.at,TRUE);
posOptions.my=new CORNER(posOptions.my);
if(elem.data(NAMESPACE)){if(config.overwrite){elem.qtip("destroy",true)
}else{if(config.overwrite===FALSE){return FALSE
}}}elem.attr(ATTR_HAS,id);
if(config.suppress&&(title=elem.attr("title"))){elem.removeAttr("title").attr(oldtitle,title).attr("title","")
}obj=new QTip(elem,config,id,!!attr);
elem.data(NAMESPACE,obj);
elem.one("remove.qtip-"+id+" removeqtip.qtip-"+id,function(){var api;
if((api=$(this).data(NAMESPACE))){api.destroy(true)
}});
return obj
}QTIP=$.fn.qtip=function(options,notation,newValue){var command=(""+options).toLowerCase(),returned=NULL,args=$.makeArray(arguments).slice(1),event=args[args.length-1],opts=this[0]?$.data(this[0],NAMESPACE):NULL;
if((!arguments.length&&opts)||command==="api"){return opts
}else{if("string"===typeof options){this.each(function(){var api=$.data(this,NAMESPACE);
if(!api){return TRUE
}if(event&&event.timeStamp){api.cache.event=event
}if(notation&&(command==="option"||command==="options")){if(newValue!==undefined||$.isPlainObject(notation)){api.set(notation,newValue)
}else{returned=api.get(notation);
return FALSE
}}else{if(api[command]){api[command].apply(api,args)
}}});
return returned!==NULL?returned:this
}else{if("object"===typeof options||!arguments.length){opts=sanitizeOptions($.extend(TRUE,{},options));
return this.each(function(i){var api,id;
id=$.isArray(opts.id)?opts.id[i]:opts.id;
id=!id||id===FALSE||id.length<1||QTIP.api[id]?QTIP.nextid++:id;
api=init($(this),id,opts);
if(api===FALSE){return TRUE
}else{QTIP.api[id]=api
}$.each(PLUGINS,function(){if(this.initialize==="initialize"){this(api)
}});
api._assignInitialEvents(event)
})
}}}};
$.qtip=QTip;
QTIP.api={};
$.each({attr:function(attr,val){if(this.length){var self=this[0],title="title",api=$.data(self,"qtip");
if(attr===title&&api&&"object"===typeof api&&api.options.suppress){if(arguments.length<2){return $.attr(self,oldtitle)
}if(api&&api.options.content.attr===title&&api.cache.attr){api.set("content.text",val)
}return this.attr(oldtitle,val)
}}return $.fn["attr"+replaceSuffix].apply(this,arguments)
},clone:function(keepData){var titles=$([]),title="title",elems=$.fn["clone"+replaceSuffix].apply(this,arguments);
if(!keepData){elems.filter("["+oldtitle+"]").attr("title",function(){return $.attr(this,oldtitle)
}).removeAttr(oldtitle)
}return elems
}},function(name,func){if(!func||$.fn[name+replaceSuffix]){return TRUE
}var old=$.fn[name+replaceSuffix]=$.fn[name];
$.fn[name]=function(){return func.apply(this,arguments)||old.apply(this,arguments)
}
});
if(!$.ui){$["cleanData"+replaceSuffix]=$.cleanData;
$.cleanData=function(elems){for(var i=0,elem;
(elem=$(elems[i])).length;
i++){if(elem.attr(ATTR_HAS)){try{elem.triggerHandler("removeqtip")
}catch(e){}}}$["cleanData"+replaceSuffix].apply(this,arguments)
}
}QTIP.version="2.2.0";
QTIP.nextid=0;
QTIP.inactiveEvents=INACTIVE_EVENTS;
QTIP.zindex=15000;
QTIP.defaults={prerender:FALSE,id:FALSE,overwrite:TRUE,suppress:TRUE,content:{text:TRUE,attr:"title",title:FALSE,button:FALSE},position:{my:"top left",at:"bottom right",target:FALSE,container:FALSE,viewport:FALSE,adjust:{x:0,y:0,mouse:TRUE,scroll:TRUE,resize:TRUE,method:"flipinvert flipinvert"},effect:function(api,pos,viewport){$(this).animate(pos,{duration:200,queue:FALSE})
}},show:{target:FALSE,event:"mouseenter",effect:TRUE,delay:90,solo:FALSE,ready:FALSE,autofocus:FALSE},hide:{target:FALSE,event:"mouseleave",effect:TRUE,delay:0,fixed:FALSE,inactive:FALSE,leave:"window",distance:FALSE},style:{classes:"",widget:FALSE,width:FALSE,height:FALSE,def:TRUE},events:{render:NULL,move:NULL,show:NULL,hide:NULL,toggle:NULL,visible:NULL,hidden:NULL,focus:NULL,blur:NULL}};
var TIP,TIPNS=".qtip-tip",MARGIN="margin",BORDER="border",COLOR="color",BG_COLOR="background-color",TRANSPARENT="transparent",IMPORTANT=" !important",HASCANVAS=!!document.createElement("canvas").getContext,INVALID=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;
function camel(s){return s.charAt(0).toUpperCase()+s.slice(1)
}var cssProps={},cssPrefixes=["Webkit","O","Moz","ms"];
function vendorCss(elem,prop){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+" "+cssPrefixes.join(ucProp+" ")+ucProp).split(" "),cur,val,i=0;
if(cssProps[prop]){return elem.css(cssProps[prop])
}while((cur=props[i++])){if((val=elem.css(cur))!==undefined){return cssProps[prop]=cur,val
}}}function intCss(elem,prop){return Math.ceil(parseFloat(vendorCss(elem,prop)))
}if(!HASCANVAS){var createVML=function(tag,props,style){return"<qtipvml:"+tag+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(props||"")+' style="behavior: url(#default#VML); '+(style||"")+'" />'
}
}else{var PIXEL_RATIO=window.devicePixelRatio||1,BACKING_STORE_RATIO=(function(){var context=document.createElement("canvas").getContext("2d");
return context.backingStorePixelRatio||context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||1
}()),SCALE=PIXEL_RATIO/BACKING_STORE_RATIO
}function Tip(qtip,options){this._ns="tip";
this.options=options;
this.offset=options.offset;
this.size=[options.width,options.height];
this.init((this.qtip=qtip))
}$.extend(Tip.prototype,{init:function(qtip){var context,tip;
tip=this.element=qtip.elements.tip=$("<div />",{"class":NAMESPACE+"-tip"}).prependTo(qtip.tooltip);
if(HASCANVAS){context=$("<canvas />").appendTo(this.element)[0].getContext("2d");
context.lineJoin="miter";
context.miterLimit=100000;
context.save()
}else{context=createVML("shape",'coordorigin="0,0"',"position:absolute;");
this.element.html(context+context);
qtip._bind($("*",tip).add(tip),["click","mousedown"],function(event){event.stopPropagation()
},this._ns)
}qtip._bind(qtip.tooltip,"tooltipmove",this.reposition,this._ns,this);
this.create()
},_swapDimensions:function(){this.size[0]=this.options.height;
this.size[1]=this.options.width
},_resetDimensions:function(){this.size[0]=this.options.width;
this.size[1]=this.options.height
},_useTitle:function(corner){var titlebar=this.qtip.elements.titlebar;
return titlebar&&(corner.y===TOP||(corner.y===CENTER&&this.element.position().top+(this.size[1]/2)+this.options.offset<titlebar.outerHeight(TRUE)))
},_parseCorner:function(corner){var my=this.qtip.options.position.my;
if(corner===FALSE||my===FALSE){corner=FALSE
}else{if(corner===TRUE){corner=new CORNER(my.string())
}else{if(!corner.string){corner=new CORNER(corner);
corner.fixed=TRUE
}}}return corner
},_parseWidth:function(corner,side,use){var elements=this.qtip.elements,prop=BORDER+camel(side)+"Width";
return(use?intCss(use,prop):(intCss(elements.content,prop)||intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop)))||0
},_parseRadius:function(corner){var elements=this.qtip.elements,prop=BORDER+camel(corner.y)+camel(corner.x)+"Radius";
return BROWSER.ie<9?0:intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop)||0
},_invalidColour:function(elem,prop,compare){var val=elem.css(prop);
return !val||(compare&&val===elem.css(compare))||INVALID.test(val)?FALSE:val
},_parseColours:function(corner){var elements=this.qtip.elements,tip=this.element.css("cssText",""),borderSide=BORDER+camel(corner[corner.precedance])+camel(COLOR),colorElem=this._useTitle(corner)&&elements.titlebar||elements.content,css=this._invalidColour,color=[];
color[0]=css(tip,BG_COLOR)||css(colorElem,BG_COLOR)||css(elements.content,BG_COLOR)||css(elements.tooltip,BG_COLOR)||tip.css(BG_COLOR);
color[1]=css(tip,borderSide,COLOR)||css(colorElem,borderSide,COLOR)||css(elements.content,borderSide,COLOR)||css(elements.tooltip,borderSide,COLOR)||elements.tooltip.css(borderSide);
$("*",tip).add(tip).css("cssText",BG_COLOR+":"+TRANSPARENT+IMPORTANT+";"+BORDER+":0"+IMPORTANT+";");
return color
},_calculateSize:function(corner){var y=corner.precedance===Y,width=this.options.width,height=this.options.height,isCenter=corner.abbrev()==="c",base=(y?width:height)*(isCenter?0.5:1),pow=Math.pow,round=Math.round,bigHyp,ratio,result,smallHyp=Math.sqrt(pow(base,2)+pow(height,2)),hyp=[(this.border/base)*smallHyp,(this.border/height)*smallHyp];
hyp[2]=Math.sqrt(pow(hyp[0],2)-pow(this.border,2));
hyp[3]=Math.sqrt(pow(hyp[1],2)-pow(this.border,2));
bigHyp=smallHyp+hyp[2]+hyp[3]+(isCenter?0:hyp[0]);
ratio=bigHyp/smallHyp;
result=[round(ratio*width),round(ratio*height)];
return y?result:result.reverse()
},_calculateTip:function(corner,size,scale){scale=scale||1;
size=size||this.size;
var width=size[0]*scale,height=size[1]*scale,width2=Math.ceil(width/2),height2=Math.ceil(height/2),tips={br:[0,0,width,height,width,0],bl:[0,0,width,0,0,height],tr:[0,height,width,0,width,height],tl:[0,0,0,height,width,height],tc:[0,height,width2,0,width,height],bc:[0,0,width,0,width2,height],rc:[0,0,width,height2,0,height],lc:[width,0,width,height,0,height2]};
tips.lt=tips.br;
tips.rt=tips.bl;
tips.lb=tips.tr;
tips.rb=tips.tl;
return tips[corner.abbrev()]
},_drawCoords:function(context,coords){context.beginPath();
context.moveTo(coords[0],coords[1]);
context.lineTo(coords[2],coords[3]);
context.lineTo(coords[4],coords[5]);
context.closePath()
},create:function(){var c=this.corner=(HASCANVAS||BROWSER.ie)&&this._parseCorner(this.options.corner);
if((this.enabled=!!this.corner&&this.corner.abbrev()!=="c")){this.qtip.cache.corner=c.clone();
this.update()
}this.element.toggle(this.enabled);
return this.corner
},update:function(corner,position){if(!this.enabled){return this
}var elements=this.qtip.elements,tip=this.element,inner=tip.children(),options=this.options,curSize=this.size,mimic=options.mimic,round=Math.round,color,precedance,context,coords,bigCoords,translate,newSize,border,BACKING_STORE_RATIO;
if(!corner){corner=this.qtip.cache.corner||this.corner
}if(mimic===FALSE){mimic=corner
}else{mimic=new CORNER(mimic);
mimic.precedance=corner.precedance;
if(mimic.x==="inherit"){mimic.x=corner.x
}else{if(mimic.y==="inherit"){mimic.y=corner.y
}else{if(mimic.x===mimic.y){mimic[corner.precedance]=corner[corner.precedance]
}}}}precedance=mimic.precedance;
if(corner.precedance===X){this._swapDimensions()
}else{this._resetDimensions()
}color=this.color=this._parseColours(corner);
if(color[1]!==TRANSPARENT){border=this.border=this._parseWidth(corner,corner[corner.precedance]);
if(options.border&&border<1&&!INVALID.test(color[1])){color[0]=color[1]
}this.border=border=options.border!==TRUE?options.border:border
}else{this.border=border=0
}newSize=this.size=this._calculateSize(corner);
tip.css({width:newSize[0],height:newSize[1],lineHeight:newSize[1]+"px"});
if(corner.precedance===Y){translate=[round(mimic.x===LEFT?border:mimic.x===RIGHT?newSize[0]-curSize[0]-border:(newSize[0]-curSize[0])/2),round(mimic.y===TOP?newSize[1]-curSize[1]:0)]
}else{translate=[round(mimic.x===LEFT?newSize[0]-curSize[0]:0),round(mimic.y===TOP?border:mimic.y===BOTTOM?newSize[1]-curSize[1]-border:(newSize[1]-curSize[1])/2)]
}if(HASCANVAS){context=inner[0].getContext("2d");
context.restore();
context.save();
context.clearRect(0,0,6000,6000);
coords=this._calculateTip(mimic,curSize,SCALE);
bigCoords=this._calculateTip(mimic,this.size,SCALE);
inner.attr(WIDTH,newSize[0]*SCALE).attr(HEIGHT,newSize[1]*SCALE);
inner.css(WIDTH,newSize[0]).css(HEIGHT,newSize[1]);
this._drawCoords(context,bigCoords);
context.fillStyle=color[1];
context.fill();
context.translate(translate[0]*SCALE,translate[1]*SCALE);
this._drawCoords(context,coords);
context.fillStyle=color[0];
context.fill()
}else{coords=this._calculateTip(mimic);
coords="m"+coords[0]+","+coords[1]+" l"+coords[2]+","+coords[3]+" "+coords[4]+","+coords[5]+" xe";
translate[2]=border&&/^(r|b)/i.test(corner.string())?BROWSER.ie===8?2:1:0;
inner.css({coordsize:(newSize[0]+border)+" "+(newSize[1]+border),antialias:""+(mimic.string().indexOf(CENTER)>-1),left:translate[0]-(translate[2]*Number(precedance===X)),top:translate[1]-(translate[2]*Number(precedance===Y)),width:newSize[0]+border,height:newSize[1]+border}).each(function(i){var $this=$(this);
$this[$this.prop?"prop":"attr"]({coordsize:(newSize[0]+border)+" "+(newSize[1]+border),path:coords,fillcolor:color[0],filled:!!i,stroked:!i}).toggle(!!(border||i));
!i&&$this.html(createVML("stroke",'weight="'+(border*2)+'px" color="'+color[1]+'" miterlimit="1000" joinstyle="miter"'))
})
}window.opera&&setTimeout(function(){elements.tip.css({display:"inline-block",visibility:"visible"})
},1);
if(position!==FALSE){this.calculate(corner,newSize)
}},calculate:function(corner,size){if(!this.enabled){return FALSE
}var self=this,elements=this.qtip.elements,tip=this.element,userOffset=this.options.offset,isWidget=elements.tooltip.hasClass("ui-widget"),position={},precedance,corners;
corner=corner||this.corner;
precedance=corner.precedance;
size=size||this._calculateSize(corner);
corners=[corner.x,corner.y];
if(precedance===X){corners.reverse()
}$.each(corners,function(i,side){var b,bc,br;
if(side===CENTER){b=precedance===Y?LEFT:TOP;
position[b]="50%";
position[MARGIN+"-"+b]=-Math.round(size[precedance===Y?0:1]/2)+userOffset
}else{b=self._parseWidth(corner,side,elements.tooltip);
bc=self._parseWidth(corner,side,elements.content);
br=self._parseRadius(corner);
position[side]=Math.max(-self.border,i?bc:(userOffset+(br>b?br:-b)))
}});
position[corner[precedance]]-=size[precedance===X?0:1];
tip.css({margin:"",top:"",bottom:"",left:"",right:""}).css(position);
return position
},reposition:function(event,api,pos,viewport){if(!this.enabled){return
}var cache=api.cache,newCorner=this.corner.clone(),adjust=pos.adjusted,method=api.options.position.adjust.method.split(" "),horizontal=method[0],vertical=method[1]||method[0],shift={left:FALSE,top:FALSE,x:0,y:0},offset,css={},props;
function shiftflip(direction,precedance,popposite,side,opposite){if(direction===SHIFT&&newCorner.precedance===precedance&&adjust[side]&&newCorner[popposite]!==CENTER){newCorner.precedance=newCorner.precedance===X?Y:X
}else{if(direction!==SHIFT&&adjust[side]){newCorner[precedance]=newCorner[precedance]===CENTER?(adjust[side]>0?side:opposite):(newCorner[precedance]===side?opposite:side)
}}}function shiftonly(xy,side,opposite){if(newCorner[xy]===CENTER){css[MARGIN+"-"+side]=shift[xy]=offset[MARGIN+"-"+side]-adjust[side]
}else{props=offset[opposite]!==undefined?[adjust[side],-offset[side]]:[-adjust[side],offset[side]];
if((shift[xy]=Math.max(props[0],props[1]))>props[0]){pos[side]-=adjust[side];
shift[side]=FALSE
}css[offset[opposite]!==undefined?opposite:side]=shift[xy]
}}if(this.corner.fixed!==TRUE){shiftflip(horizontal,X,Y,LEFT,RIGHT);
shiftflip(vertical,Y,X,TOP,BOTTOM);
if(newCorner.string()!==cache.corner.string()&&(cache.cornerTop!==adjust.top||cache.cornerLeft!==adjust.left)){this.update(newCorner,FALSE)
}}offset=this.calculate(newCorner);
if(offset.right!==undefined){offset.left=-offset.right
}if(offset.bottom!==undefined){offset.top=-offset.bottom
}offset.user=this.offset;
if(shift.left=(horizontal===SHIFT&&!!adjust.left)){shiftonly(X,LEFT,RIGHT)
}if(shift.top=(vertical===SHIFT&&!!adjust.top)){shiftonly(Y,TOP,BOTTOM)
}this.element.css(css).toggle(!((shift.x&&shift.y)||(newCorner.x===CENTER&&shift.y)||(newCorner.y===CENTER&&shift.x)));
pos.left-=offset.left.charAt?offset.user:horizontal!==SHIFT||shift.top||!shift.left&&!shift.top?offset.left+this.border:0;
pos.top-=offset.top.charAt?offset.user:vertical!==SHIFT||shift.left||!shift.left&&!shift.top?offset.top+this.border:0;
cache.cornerLeft=adjust.left;
cache.cornerTop=adjust.top;
cache.corner=newCorner.clone()
},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns);
if(this.qtip.elements.tip){this.qtip.elements.tip.find("*").remove().end().remove()
}}});
TIP=PLUGINS.tip=function(api){return new Tip(api,api.options.style.tip)
};
TIP.initialize="render";
TIP.sanitize=function(options){if(options.style&&"tip" in options.style){var opts=options.style.tip;
if(typeof opts!=="object"){opts=options.style.tip={corner:opts}
}if(!(/string|boolean/i).test(typeof opts.corner)){opts.corner=TRUE
}}};
CHECKS.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create();
this.qtip.reposition()
},"^style.tip.(height|width)$":function(obj){this.size=[obj.width,obj.height];
this.update();
this.qtip.reposition()
},"^content.title|style.(classes|widget)$":function(){this.update()
}};
$.extend(TRUE,QTIP.defaults,{style:{tip:{corner:TRUE,mimic:FALSE,width:6,height:6,border:TRUE,offset:0}}});
PLUGINS.viewport=function(api,position,posOptions,targetWidth,targetHeight,elemWidth,elemHeight){var target=posOptions.target,tooltip=api.elements.tooltip,my=posOptions.my,at=posOptions.at,adjust=posOptions.adjust,method=adjust.method.split(" "),methodX=method[0],methodY=method[1]||method[0],viewport=posOptions.viewport,container=posOptions.container,cache=api.cache,adjusted={left:0,top:0},fixed,newMy,newClass,containerOffset,containerStatic,viewportWidth,viewportHeight,viewportScroll,viewportOffset;
if(!viewport.jquery||target[0]===window||target[0]===document.body||adjust.method==="none"){return adjusted
}containerOffset=container.offset()||adjusted;
containerStatic=container.css("position")==="static";
fixed=tooltip.css("position")==="fixed";
viewportWidth=viewport[0]===window?viewport.width():viewport.outerWidth(FALSE);
viewportHeight=viewport[0]===window?viewport.height():viewport.outerHeight(FALSE);
viewportScroll={left:fixed?0:viewport.scrollLeft(),top:fixed?0:viewport.scrollTop()};
viewportOffset=viewport.offset()||adjusted;
function calculate(side,otherSide,type,adjust,side1,side2,lengthName,targetLength,elemLength){var initialPos=position[side1],mySide=my[side],atSide=at[side],isShift=type===SHIFT,myLength=mySide===side1?elemLength:mySide===side2?-elemLength:-elemLength/2,atLength=atSide===side1?targetLength:atSide===side2?-targetLength:-targetLength/2,sideOffset=viewportScroll[side1]+viewportOffset[side1]-(containerStatic?0:containerOffset[side1]),overflow1=sideOffset-initialPos,overflow2=initialPos+elemLength-(lengthName===WIDTH?viewportWidth:viewportHeight)-sideOffset,offset=myLength-(my.precedance===side||mySide===my[otherSide]?atLength:0)-(atSide===CENTER?targetLength/2:0);
if(isShift){offset=(mySide===side1?1:-1)*myLength;
position[side1]+=overflow1>0?overflow1:overflow2>0?-overflow2:0;
position[side1]=Math.max(-containerOffset[side1]+viewportOffset[side1],initialPos-offset,Math.min(Math.max(-containerOffset[side1]+viewportOffset[side1]+(lengthName===WIDTH?viewportWidth:viewportHeight),initialPos+offset),position[side1],mySide==="center"?initialPos-myLength:1000000000))
}else{adjust*=(type===FLIPINVERT?2:0);
if(overflow1>0&&(mySide!==side1||overflow2>0)){position[side1]-=offset+adjust;
newMy.invert(side,side1)
}else{if(overflow2>0&&(mySide!==side2||overflow1>0)){position[side1]-=(mySide===CENTER?-offset:offset)+adjust;
newMy.invert(side,side2)
}}if(position[side1]<viewportScroll&&-position[side1]>overflow2){position[side1]=initialPos;
newMy=my.clone()
}}return position[side1]-initialPos
}if(methodX!=="shift"||methodY!=="shift"){newMy=my.clone()
}adjusted={left:methodX!=="none"?calculate(X,Y,methodX,adjust.x,LEFT,RIGHT,WIDTH,targetWidth,elemWidth):0,top:methodY!=="none"?calculate(Y,X,methodY,adjust.y,TOP,BOTTOM,HEIGHT,targetHeight,elemHeight):0};
if(newMy&&cache.lastClass!==(newClass=NAMESPACE+"-pos-"+newMy.abbrev())){tooltip.removeClass(api.cache.lastClass).addClass((api.cache.lastClass=newClass))
}return adjusted
}
}))
}(window,document));
function openWindow(winUrl,winWidth,winHeight){openWindow(winUrl,winWidth,winHeight,"no")
}function openWindow(winUrl,winWidth,winHeight,resize){var winAttr="width="+winWidth+",height="+winHeight+",directories=no,status=no,menubar=no,resizable="+resize+",toolbar=no,location=no,scrollbars=yes";
window.open(winUrl,"text",winAttr)
};
$(document).ready(function(){if(typeof(mybuys)!="undefined"){mybuys.setOneclkSignupAsImg("");
mybuys.setOneclkButtonAlt("");
mybuys.setOneclkSignupAsLink("Get Product Alerts")
}});
var deviceAgent=navigator.userAgent.toLowerCase();
var isTouchDevice=!!(deviceAgent.match(/(iphone|ipod|ipad)/)||deviceAgent.match(/(android)/)||deviceAgent.match(/(iemobile)/)||deviceAgent.match(/iphone/i)||deviceAgent.match(/ipad/i)||deviceAgent.match(/ipod/i)||deviceAgent.match(/blackberry/i)||deviceAgent.match(/bada/i));
$(document).ready(function(){if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
}
}if(!($.blockUI==undefined)){$.blockUI.defaults.css={};
$.blockUI.defaults.overlayCSS={}
}initShowOnParentHover();
if(!navigator||!navigator.platform||!navigator.platform.match(/^(iPad|iPod|iPhone)$/)){$(".navMenu > li, .navMenu > li > ul > li").hoverIntent({over:function(){$(this).addClass("sfhover")
},out:function(){$(this).removeClass("sfhover")
},sensitivity:12,interval:75})
}$(".newWindow").click(function(){openWindow(this.href);
return false
});
$(".autoSubmit").bind("change",function(){$(this).parents("form").submit()
});
$("a.submitForm").bind("click",function(){if(this.target==null){$(this).parents("form").submit()
}else{$(this.target).click()
}return false
});
$(".orderItemChkBox").click(function(){$.blockUI({message:"Updating your cart..."});
$(this).next().trigger("click")
});
$(".initFocus").focus();
$(".tab").click(function(){$(".tab").addClass("inactive").removeClass("active");
$(this).addClass("active").removeClass("inactive");
var links=$(this).find("a");
if(links.length>0){$(links[0]).blur()
}$(".tabContent").each(function(){$(this).hide()
});
$("#"+this.id+"Content").show()
});
var countdown={init:function(){countdown.remaining=countdown.max-$(countdown.obj).val().length;
if(countdown.remaining<0){$(countdown.obj).val($(countdown.obj).val().substring(0,countdown.max))
}$(countdown.obj).next().find(".remaining").html(countdown.remaining)
},max:null,remaining:null,obj:null};
$(".countdown").each(function(){$(this).focus(function(){var c=$(this).attr("class");
countdown.max=parseInt(c.match(/limit_[0-9]{1,}_/)[0].match(/[0-9]{1,}/)[0]);
countdown.obj=this;
iCount=setInterval(countdown.init,1000)
}).blur(function(){countdown.init();
clearInterval(iCount)
})
});
$("textarea :not(.countdown)").bind("keyup blur",function(){var maxLength=$(this).attr("maxlength");
if(maxLength!=null){currentLength=this.value.length;
remainingCharacters=(maxLength-currentLength);
if(currentLength>=maxLength){this.value=this.value.substr(0,maxLength)
}}});
maxLength=60;
function checkTextLength(textField){currentLength=textField.value.length;
remainingCharacters=(maxLength-currentLength);
if(currentLength>=maxLength){textField.value=textField.value.substr(0,maxLength)
}}$(".itemQty").submitFromEnter("#addToCartButton");
$(".sellableItems td input").click(function(){$(this).select()
});
function handleDefaultValue(e){if($(e).val().trim()==""){$(e).val($(e).data("default-value"))
}}$(document).on("blur",".itemQty",function(){handleDefaultValue(this)
}).on("focus",".itemQty",function(){if($(this).val().trim()==$(this).data("default-value")){$(this).val("")
}}).val(function(){return $(this).data("default-value")
});
$(".itemQty").each(function(){handleDefaultValue(this)
});
var pastingText=false;
var pressedKeys=[];
var PC_CTRL_KEY=17;
var MAC_COM_KEY=91;
var KEY_V=86;
var KEY_A=65;
var KEY_C=67;
var KEY_X=88;
var KEY_LEFT=37;
var KEY_RIGHT=39;
var KEY_DEL=46;
var KEY_BS=8;
var KEY_TAB=9;
var KEY_ENT=13;
$(document).on("keyup",".numericOnly",function(e){var keyCode=e.which;
pressedKeys[keyCode]=false;
if(pastingText){this.value=$(this).val().replace(/\D/g,"");
pressedKeys=[];
pastingText=false
}});
$(document).on("keydown",".numericOnly",function(e){var keyCode=e.which;
pressedKeys[keyCode]=true;
if(keyCode==KEY_V&&(pressedKeys[PC_CTRL_KEY]||pressedKeys[91]||pressedKeys[93]||pressedKeys[224])){pastingText=true;
return true
}if((pressedKeys[KEY_A]||pressedKeys[KEY_V]||pressedKeys[KEY_C]||pressedKeys[KEY_X])&&(pressedKeys[PC_CTRL_KEY]||pressedKeys[MAC_COM_KEY])){return true
}if(pressedKeys[KEY_DEL]||pressedKeys[KEY_BS]||pressedKeys[KEY_LEFT]||pressedKeys[KEY_RIGHT]||pressedKeys[KEY_ENT]||pressedKeys[KEY_TAB]){return true
}if((keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105)){return true
}return false
});
$("#addToCartButton").click(function(){var params=$(this.form).serializeArray();
params.push({name:"ajax",value:true},{name:this.name,value:this.value});
$("#addToCartButton").hide();
$("#addToCartProcessing").show();
$.post(this.form.action,params,function(data){if(validateResponse(data)){showAddToCartModal(data);
resetQuantityInputs();
$(".giftRegistryCheckbox").each(function(){$(this).attr("checked",false)
});
$(".registryIdInput").each(function(){$(this).val("")
});
$("#addToCartButton").show();
$("#addToCartProcessing").hide()
}});
$("#orderId").val(null);
return false
});
ajaxGetHandler(ajaxGetHandler);
$("#quantityDiscountModal").on("hidden.bs.modal",function(e){$(this).removeData("modal")
});
$(".quantityInput").submitFromEnter("#updateQuantity");
$("#updateQuantity").bind("click",function(){$.blockUI({message:"Updating your cart..."})
});
$("input[name='isStorePickup']").click(function(){if($(this).val()=="true"){$("#hiddenMethodInput").val("pickup");
$("#changeMethod").submit()
}else{$("#hiddenMethodInput").attr("disabled","disabled");
$("#changeMethod").submit()
}});
$("input[name='shipMethod']").click(function(){$.blockUI({message:"Updating your cart..."});
$("#hiddenMethodInput").val($(this).val());
$("#changeMethod").submit()
});
$(".tab").click(function(){if(this.id=="singleTab"){$(".currentTab").val("1");
$(".shipEntireOrderCheckbox").removeAttr("disabled");
$(".defaultShipEntireOrderCheckbox").attr("checked","checked");
$(".shipEntireOrder").removeClass("disabled")
}if(this.id=="multipleTab"){$(".currentTab").val("2");
$(".shipEntireOrderCheckbox").attr("disabled",true).removeAttr("checked");
$(".defaultShipEntireOrderCheckbox").removeAttr("checked");
$(".shipEntireOrder").addClass("disabled")
}});
$(".tab").filter(".active").click();
$(".methodsContainer input:radio").click(function(){displayDeliveryInstructions(this)
});
$(".methodsContainer input:radio:checked").each(function(){$(this).click()
});
$(".methodsContainer select.daySelect").bind("change blur keyup",function(){var selectedKey=$("option:selected",$(this))[0].value;
var fgId=$(this).attr("fgId");
var options=fgTimeSlots[fgId][selectedKey];
var timeSelect=$(".timeSelect-"+fgId);
timeSelect.empty();
if(options!=null){for(var i=0;
i<options.length;
i++){timeSelect.append($("<option>",{value:options[i].key}).text(options[i].value))
}}});
$(".addNewNumber").click(function(){var p=$(this).parent().parent().parent();
if(p.find(".addingNewPhone").val()=="true"){p.find(".addingNewPhone").val("false")
}else{p.find(".addingNewPhone").val("true")
}p.find(".existingPhoneSelect").find("select option:first").attr("selected","selected").parent("select");
p.find(".newPhoneInput").toggle();
p.find(".existingPhoneSelect").toggle();
return false
});
$(".preventDoubleSubmit").preventDoubleSubmit();
$(".hover-menu").hoverIntent({sensitivity:1,interval:50,over:function(){$(".hover-items",this).fadeIn(200)
},timeout:1000,out:function(){$(".hover-items",this).fadeOut(200)
}});
$(".wishlist .addToCartLink").one("click",function(){this.href=this.href+"&quantity="+$(this).parent().prev().find(".quantityInput").val()
});
$(window).on("beforeunload",function(){window.unloading=true
});
$("img[data-mouseover-src]").each(function(){var element=$(this);
element.data("mouseout-src",element.attr("src"));
element.mouseover(function(){if(!window.unloading){element.attr("src",element.data("mouseover-src"))
}}).mouseout(function(){if(!window.unloading){element.attr("src",element.data("mouseout-src"))
}})
});
$("#navigationLocationSearchForm").submit(function(){_gaq.push(["_setCustomVar",3,"Zip Code",$("#navigationZipCode").val(),1])
});
$(".registerUserForm").submit(function(){_gaq.push(["_setCustomVar",3,"Zip Code",$("#zipCode").val(),1])
});
$("body").click(function(event){if($(event.target).parents(".mbitem").size()==1){_gaq.push(["_trackEvent","MyBy","RecommendProducts","selectProductRecommendation"])
}});
$("#wishlist-menu a").on("click touchend",function(e){e.preventDefault();
addItemToWishList($(this).data("list-id"))
});
if(!isTouchDevice){$("#wishlist-menu").addClass("hoverMenu")
}else{$("body").on("touchstart",function(e){$(".bubbletip").each(function(){if(!$(this).is(e.target)&&$(this).has(e.target).length===0&&$(".bubbletip").has(e.target).length===0){$(this).trigger("hideTip")
}});
$('[data-toggle="tooltip"]').each(function(){if(!$(this).is(e.target)&&$(this).has(e.target).length===0&&$(".tooltip").has(e.target).length===0){$(this).tooltip("hide")
}});
$('[data-toggle="header-menu"]').each(function(){if(!$(this).is(e.target)&&$(this).has(e.target).length===0&&$(this).find(".headerDropDown").has(e.target).length===0){$(this).find(".headerDropDown").removeClass("show")
}});
$('[data-toggle="locationButton"]').each(function(){if(!$(this).is(e.target)&&$(this).has(e.target).length===0&&$(this).find(".locationButton").has(e.target).length===0&&$("#navigationLocationSearchForm").has(e.target).length===0){$("#navigationLocationSearchForm").removeClass("show")
}})
});
$("#navigationLocationSearchForm").remove()
}if(!supportsSvg()){var i=document.getElementsByTagName("img"),j,y,el;
for(j=i.length;
j--;
){el=i[j];
y=el.src;
if(y.match(/svg$/)){if(el.classList){el.classList.add("no-svg")
}else{el.className+=" no-svg"
}el.src=y.slice(0,-3)+"png"
}}}$("image").error(function(){$(this).hide()
});
$(".qtip-bubble").each(function(){var isTopLeft=$(this).data("top-left")===true;
$(this).qtip({show:{event:"hover touchstart"},hide:"unfocus mouseout",content:{text:$($(this).data("text")).html()},style:{classes:"qtip qtip-light qtip-rounded qtip-shadow small-text qtip-border-line-height"},position:{my:"bottom "+(isTopLeft?"right":"left"),at:"top "+(isTopLeft?"left":"right")}})
})
});
$.fn.preventDoubleSubmit=function(){$(this).submit(function(){if(this.beenSubmitted){return false
}else{this.beenSubmitted=true
}})
};
$.fn.submitFromEnter=function(targetSelector){$(this).keypress(function(e){if(e.keyCode==13){$(targetSelector).click();
return false
}})
};
function showAddToCartModal(data){$("#addToCartModalContentContainer").html(data);
$("#cartQuantity").html($("#newTotalQuantity").html());
$("#cartQuantity").show();
var modal=$("#addToCartModal");
if(modal.hasClass("modal")){modal.modal();
modal.find(".modal-header h3").html($("#newModalTitle").html());
modal.find(".jqmClose").click(function(e){e.preventDefault();
modal.modal("hide")
})
}else{modal.jqmShow();
$("#theTitle").html($("#newModalTitle").html())
}}function displayDeliveryInstructions(clickedElem){var parentContainer=$(clickedElem).parents(".methodsContainer");
if($(clickedElem).val()=="delivery"){$(".dayTimeContainer",parentContainer).show();
$(".dayTimeContainer textarea, .dayTimeContainer select").removeAttr("disabled")
}else{$(".dayTimeContainer",parentContainer).hide();
$(".dayTimeContainer textarea, .dayTimeContainer select").attr("disabled",true)
}}function openWindow(winUrl,w,h){var winAttr="resizable=1,toolbar=yes,location=yes,scrollbars=yes";
if(w>0&&h>0){winAttr+=",width="+w+",height="+h
}window.open(winUrl,"text",winAttr)
}function positionModal(h){h.w.css("top",$(window).scrollTop()+10).prependTo("body>.bodyContent").show()
}function removeModal(h){h.w.hide();
if(h.o){h.o.remove()
}if(typeof(jwplayer)!="undefined"&&jwplayer()!=undefined){if(jwplayer().getState()=="PLAYING"){jwplayer().stop()
}}}function ajaxGetHandler(callback){$("a.ajaxGet").click(function(){$(this.target).load(this.href,callback);
return false
})
}function printCart(){_gaq.push(["_trackPageview","/links/shoppingcart/print"]);
self.print()
}function validateResponse(data){var ajaxErrorRedirect=$("#ajaxErrorRedirect",$(data));
if(ajaxErrorRedirect.length>0){window.location=ajaxErrorRedirect.text();
return false
}return true
}function resetQuantityInputs(){$(".giftWrapCheckbox").removeAttr("checked")
}function resetTimeslots(){$(".methodsContainer select.daySelect option[selected]").removeAttr("selected");
$(".methodsContainer select.daySelect :first-child").attr("selected","selected");
$(".methodsContainer .timeOptions select").attr("disabled","disabled");
$(".methodsContainer .timeOptions").each(function(){$("select:first",this).removeAttr("disabled").show()
});
$(".methodsContainer .timeOptions select option").removeAttr("selected");
$(".methodsContainer .timeOptions select :first-child").attr("selected","selected")
}function addItemToWishList(pWishListId){if(pWishListId==null){$("#wishListSubmitButton").click();
return false
}$("#orderId").val(pWishListId);
$("#addToCartButton").click();
return false
}function addItemToRegistry(pRegistryId){$("#registry-menu").hide();
$("#addToRegistryProcessing").show();
$.ajax({type:"POST",url:"/giftregistry/addToGiftRegistry.htm",data:$("form#addToCart").serialize()+"&giftRegistryId="+pRegistryId,cache:false,success:function(data,textStatus,jqXHR){if(validateResponse(data)){if(pRegistryId==0){window.location="/giftregistry/index.htm"
}else{showAddToCartModal(data);
resetQuantityInputs();
$("#registry-menu").show();
$("#addToRegistryProcessing").hide()
}}}});
return false
}function addCSpaceItemToRegistry(pRegistryId){$("#addToCartButton").hide();
$("#addToCartProcessing").show();
$.ajax({type:"POST",url:"/giftregistry/addCSpaceToGiftRegistry.htm",data:$("form#addToCart").serialize()+"&giftRegistryId="+pRegistryId,cache:false,success:function(data,textStatus,jqXHR){if(validateResponse(data)){showAddToCartModal(data);
resetQuantityInputs();
$("#addToCartButton").show();
$("#addToCartProcessing").hide()
}}});
return false
}function initShowOnParentHover(){$(".showOnParentHover").each(function(){var that=$(this);
if(!isTouchDevice){that.parent().hoverIntent({over:function(){that.addClass("show")
},out:function(){that.removeClass("show")
},sensitivity:12,interval:75})
}else{if(!$(this).hasClass("hide-on-touch-enabled")){that.parent().children("a").bind("click",function(e){e.preventDefault();
$(".show").removeClass("show");
that.addClass("show")
})
}}});
if(isTouchDevice){$(".shop-menu-link").on("touchstart",function(){$(".shop-menu-link.active").removeClass("active");
$(this).addClass("active")
}).removeClass("no-touch");
$(".header-menu-link").on("touchstart",function(){if($(this).data("active")){window.location.href=$(this).attr("href")
}else{$(".header-menu-link").each(function(){$(this).data("active",false)
});
$(this).data("active",true)
}})
}}function supportsSvg(){return !!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect
};
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};
cfg=$.extend(cfg,g?{over:f,out:g}:f);
var cX,cY,pX,pY;
var track=function(ev){cX=ev.pageX;
cY=ev.pageY
};
var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);
ob.hoverIntent_s=1;
return cfg.over.apply(ob,[ev])
}else{pX=cX;
pY=cY;
ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)
},cfg.interval)
}};
var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
ob.hoverIntent_s=0;
return cfg.out.apply(ob,[ev])
};
var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;
while(p&&p!=this){try{p=p.parentNode
}catch(e){p=this
}}if(p==this){return false
}var ev=jQuery.extend({},e);
var ob=this;
if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)
}if(e.type=="mouseover"){pX=ev.pageX;
pY=ev.pageY;
$(ob).bind("mousemove",track);
if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)
},cfg.interval)
}}else{$(ob).unbind("mousemove",track);
if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)
},cfg.timeout)
}}};
return this.mouseover(handleHover).mouseout(handleHover)
}
})(jQuery);
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};
var d=document.createElement("div");
var q={};
function b(v){if(v in d.style){return v
}var u=["Moz","Webkit","O","ms"];
var r=v.charAt(0).toUpperCase()+v.substr(1);
if(v in d.style){return v
}for(var t=0;
t<u.length;
++t){var s=u[t]+r;
if(s in d.style){return s
}}}function e(){d.style[q.transform]="";
d.style[q.transform]="rotateY(90deg)";
return d.style[q.transform]!==""
}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
q.transition=b("transition");
q.transitionDelay=b("transitionDelay");
q.transform=b("transform");
q.transformOrigin=b("transformOrigin");
q.transform3d=e();
var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};
var f=q.transitionEnd=i[q.transition]||null;
for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]
}}d=null;
k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};
k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()
},set:function(s,r){var t=r;
if(!(t instanceof j)){t=new j(t)
}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)
}else{s.style[q.transform]=t.toString()
}k(s).data("transform",t)
}};
k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};
if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]
},set:function(r,s){r.style[q.transformOrigin]=s
}};
k.cssHooks.transition={get:function(r){return r.style[q.transition]
},set:function(r,s){r.style[q.transition]=s
}}
}n("scale");
n("translate");
n("rotate");
n("rotateX");
n("rotateY");
n("rotate3d");
n("perspective");
n("skewX");
n("skewY");
n("x",true);
n("y",true);
function j(r){if(typeof r==="string"){this.parse(r)
}return this
}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];
r.unshift(t);
j.prototype.set.apply(this,r)
},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);
if(this.setter[s]){this.setter[s].apply(this,r)
}else{this[s]=r.join(",")
}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)
}else{return this[r]||0
}},setter:{rotate:function(r){this.rotate=o(r,"deg")
},rotateX:function(r){this.rotateX=o(r,"deg")
},rotateY:function(r){this.rotateY=o(r,"deg")
},scale:function(r,s){if(s===undefined){s=r
}this.scale=r+","+s
},skewX:function(r){this.skewX=o(r,"deg")
},skewY:function(r){this.skewY=o(r,"deg")
},perspective:function(r){this.perspective=o(r,"px")
},x:function(r){this.set("translate",r,null)
},y:function(r){this.set("translate",null,r)
},translate:function(r,s){if(this._translateX===undefined){this._translateX=0
}if(this._translateY===undefined){this._translateY=0
}if(r!==null&&r!==undefined){this._translateX=o(r,"px")
}if(s!==null&&s!==undefined){this._translateY=o(s,"px")
}this.translate=this._translateX+","+this._translateY
}},getter:{x:function(){return this._translateX||0
},y:function(){return this._translateY||0
},scale:function(){var r=(this.scale||"1,1").split(",");
if(r[0]){r[0]=parseFloat(r[0])
}if(r[1]){r[1]=parseFloat(r[1])
}return(r[0]===r[1])?r[0]:r
},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");
for(var r=0;
r<=3;
++r){if(t[r]){t[r]=parseFloat(t[r])
}}if(t[3]){t[3]=o(t[3],"deg")
}return t
}},parse:function(s){var r=this;
s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)
})
},toString:function(t){var s=[];
for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue
}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")
}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")
}else{s.push(r+"("+this[r]+")")
}}}}}return s.join(" ")
}};
function m(s,r,t){if(r===true){s.queue(t)
}else{if(r){s.queue(r,t)
}else{t()
}}}function h(s){var r=[];
k.each(s,function(t){t=k.camelCase(t);
t=k.transit.propertyMap[t]||k.cssProps[t]||t;
t=c(t);
if(k.inArray(t,r)===-1){r.push(t)
}});
return r
}function g(s,v,x,r){var t=h(s);
if(k.cssEase[x]){x=k.cssEase[x]
}var w=""+l(v)+" "+x;
if(parseInt(r,10)>0){w+=" "+l(r)
}var u=[];
k.each(t,function(z,y){u.push(y+" "+w)
});
return u.join(", ")
}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;
var u=0;
var w=true;
if(typeof s==="function"){C=s;
s=undefined
}if(typeof y==="function"){C=y;
y=undefined
}if(typeof z.easing!=="undefined"){y=z.easing;
delete z.easing
}if(typeof z.duration!=="undefined"){s=z.duration;
delete z.duration
}if(typeof z.complete!=="undefined"){C=z.complete;
delete z.complete
}if(typeof z.queue!=="undefined"){w=z.queue;
delete z.queue
}if(typeof z.delay!=="undefined"){u=z.delay;
delete z.delay
}if(typeof s==="undefined"){s=k.fx.speeds._default
}if(typeof y==="undefined"){y=k.cssEase._default
}s=l(s);
var E=g(z,s,y,u);
var B=k.transit.enabled&&q.transition;
var t=B?(parseInt(s,10)+parseInt(u,10)):0;
if(t===0){var A=function(F){D.css(z);
if(C){C.apply(D)
}if(F){F()
}};
m(D,w,A);
return D
}var x={};
var r=function(H){var G=false;
var F=function(){if(G){D.unbind(f,F)
}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)
})
}if(typeof C==="function"){C.apply(D)
}if(typeof H==="function"){H()
}};
if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;
D.bind(f,F)
}else{window.setTimeout(F,t)
}D.each(function(){if(t>0){this.style[q.transition]=E
}k(this).css(z)
})
};
var v=function(F){this.offsetWidth;
r(F)
};
m(D,w,v);
return this
};
function n(s,r){if(!r){k.cssNumber[s]=true
}k.transit.propertyMap[s]=q.transform;
k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");
return u.get(s)
},set:function(v,w){var u=k(v).css("transit:transform");
u.setFromString(s,w);
k(v).css({"transit:transform":u})
}}
}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()
})
}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s
}else{return""+s+r
}}function l(s){var r=s;
if(k.fx.speeds[r]){r=k.fx.speeds[r]
}return o(r,"ms")
}k.transit.getTransitionValue=g
})(jQuery);
jQuery.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};
if(value===null){value="";
options.expires=-1
}var expires="";
if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;
if(typeof options.expires=="number"){date=new Date();
date.setTime(date.getTime()+(options.expires*24*60*60*1000))
}else{date=options.expires
}expires="; expires="+date.toUTCString()
}var path=options.path?"; path="+(options.path):"";
var domain=options.domain?"; domain="+(options.domain):"";
var secure=options.secure?"; secure":"";
document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")
}else{var cookieValue=null;
if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");
for(var i=0;
i<cookies.length;
i++){var cookie=jQuery.trim(cookies[i]);
if(cookie.substring(0,name.length+1)==(name+"=")){cookieValue=decodeURIComponent(cookie.substring(name.length+1));
break
}}}return cookieValue
}};
(function($){$.fn.jqm=function(o){var p={overlay:50,overlayClass:"jqmOverlay",closeClass:"jqmClose",trigger:".jqModal",ajax:F,ajaxText:"",target:F,modal:F,toTop:F,onShow:F,onHide:F,onLoad:F};
return this.each(function(){if(this._jqm){return H[this._jqm].c=$.extend({},H[this._jqm].c,o)
}s++;
this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass("jqmID"+s),s:s};
if(p.trigger){$(this).jqmAddTrigger(p.trigger)
}})
};
$.fn.jqmAddClose=function(e){return hs(this,e,"jqmHide")
};
$.fn.jqmAddTrigger=function(e){return hs(this,e,"jqmShow")
};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;
$.jqm.open(this._jqm,t)
})
};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;
$.jqm.close(this._jqm,t)
})
};
$.jqm={hash:{},open:function(s,t){var h=H[s],c=h.c,cc="."+c.closeClass,z=(parseInt(h.w.css("z-index"))),z=(z>0)?z:3000,o=$("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":z-1,opacity:c.overlay/100});
if(h.a){return F
}h.t=t;
h.a=true;
h.w.css("z-index",z);
if(c.modal){if(!A[0]){L("bind")
}A.push(s)
}else{if(c.overlay>0){h.w.jqmAddClose(o)
}else{o=F
}}h.o=(o)?o.addClass(c.overlayClass).prependTo("body"):F;
if(ie6){$("html,body").css({height:"100%",width:"100%"});
if(o){o=o.css({position:"absolute"})[0];
for(var y in {Top:1,Left:1}){o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'")
}}}if(c.ajax){var r=c.target||h.w,u=c.ajax,r=(typeof r=="string")?$(r,h.w):$(r),u=(u.substr(0,1)=="@")?$(t).attr(u.substring(1)):u;
r.html(c.ajaxText).load(u,function(){if(c.onLoad){c.onLoad.call(this,h)
}if(cc){h.w.jqmAddClose($(cc,h.w))
}e(h)
})
}else{if(cc){h.w.jqmAddClose($(cc,h.w))
}}if(c.toTop&&h.o){h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o)
}(c.onShow)?c.onShow(h):h.w.show();
e(h);
return F
},close:function(s){var h=H[s];
if(!h.a){return F
}h.a=F;
if(A[0]){A.pop();
if(!A[0]){L("unbind")
}}if(h.c.toTop&&h.o){$("#jqmP"+h.w[0]._jqm).after(h.w).remove()
}if(h.c.onHide){h.c.onHide(h)
}else{h.w.hide();
if(h.o){h.o.remove()
}}return F
},params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version=="6.0"),F=false,i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),e=function(h){if(ie6){if(h.o){h.o.html('<p style="width:100%;height:100%"/>').prepend(i)
}else{if(!$("iframe.jqm",h.w)[0]){h.w.prepend(i)
}}}f(h)
},f=function(h){try{$(":input:visible",h.w)[0].focus()
}catch(_){}},L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m)
},m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents(".jqmID"+h.s)[0]);
if(r){f(h)
}return !r
},hs=function(w,t,c){return w.each(function(){var s=this._jqm;
$(t).each(function(){if(!this[c]){this[c]=[];
$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1}){for(var s in this[i]){if(H[this[i][s]]){H[this[i][s]].w[i](this)
}}}return F
})
}this[c].push(s)
})
})
}
})(jQuery);
(function($){$.fn.jqDrag=function(h){return i(this,h,"d")
};
$.fn.jqResize=function(h){return i(this,h,"r")
};
$.jqDnR={dnr:{},e:0,drag:function(v){if(M.k=="d"){E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY})
}else{E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)})
}return false
},stop:function(){E.css("opacity",M.o);
$(document).unbind("mousemove",J.drag).unbind("mouseup",J.stop)
}};
var J=$.jqDnR,M=J.dnr,E=J.e,i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
h.bind("mousedown",{e:e,k:k},function(v){var d=v.data,p={};
E=d.e;
if(E.css("position")!="relative"){try{E.position(p)
}catch(e){}}M={X:p.left||f("left")||0,Y:p.top||f("top")||0,W:f("width")||E[0].scrollWidth||0,H:f("height")||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css("opacity")};
E.css({opacity:0.8});
$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
return false
})
})
},f=function(k){return parseInt(E.css(k))||false
}
})(jQuery);
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999 (13-NOV-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
(function($,undefined){var ver="2.9999";
if($.support==undefined){$.support={opacity:!($.browser.msie)}
}function debug(s){$.fn.cycle.debug&&log(s)
}function log(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "))
}$.expr[":"].paused=function(el){return el.cyclePause
};
$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};
if(this.length===0&&options!="stop"){if(!$.isReady&&o.s){log("DOM not ready, queuing slideshow");
$(function(){$(o.s,o.c).cycle(options,arg2)
});
return this
}log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this
}return this.each(function(){var opts=handleArguments(this,options,arg2);
if(opts===false){return
}opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;
if(this.cycleTimeout){clearTimeout(this.cycleTimeout)
}this.cycleTimeout=this.cyclePause=0;
var $cont=$(this);
var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();
var els=$slides.get();
var opts2=buildOptions($cont,$slides,els,opts,o);
if(opts2===false){return
}if(els.length<2){log("terminating; too few slides: "+els.length);
return
}var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.backwards);
if(startTime){startTime+=(opts2.delay||0);
if(startTime<10){startTime=10
}debug("first timeout: "+startTime);
this.cycleTimeout=setTimeout(function(){go(els,opts2,0,!opts.backwards)
},startTime)
}})
};
function triggerPause(cont,byHover,onPager){var opts=$(cont).data("cycle.opts");
var paused=!!cont.cyclePause;
if(paused&&opts.paused){opts.paused(cont,opts,byHover,onPager)
}else{if(!paused&&opts.resumed){opts.resumed(cont,opts,byHover,onPager)
}}}function handleArguments(cont,options,arg2){if(cont.cycleStop==undefined){cont.cycleStop=0
}if(options===undefined||options===null){options={}
}if(options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");
if(!opts){return false
}cont.cycleStop++;
if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout)
}cont.cycleTimeout=0;
opts.elements&&$(opts.elements).stop();
$(cont).removeData("cycle.opts");
if(options=="destroy"){destroy(opts)
}return false;
case"toggle":cont.cyclePause=(cont.cyclePause===1)?0:1;
checkInstantResume(cont.cyclePause,arg2,cont);
triggerPause(cont);
return false;
case"pause":cont.cyclePause=1;
triggerPause(cont);
return false;
case"resume":cont.cyclePause=0;
checkInstantResume(false,arg2,cont);
triggerPause(cont);
return false;
case"prev":case"next":var opts=$(cont).data("cycle.opts");
if(!opts){log('options not found, "prev/next" ignored');
return false
}$.fn.cycle[options](opts);
return false;
default:options={fx:options}
}return options
}else{if(options.constructor==Number){var num=options;
options=$(cont).data("cycle.opts");
if(!options){log("options not found, can not advance slide");
return false
}if(num<0||num>=options.elements.length){log("invalid slide index: "+num);
return false
}options.nextSlide=num;
if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);
cont.cycleTimeout=0
}if(typeof arg2=="string"){options.oneTimeFx=arg2
}go(options.elements,options,1,num>=options.currSlide);
return false
}}return options;
function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data("cycle.opts");
if(!options){log("options not found, can not resume");
return false
}if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);
cont.cycleTimeout=0
}go(options.elements,options,1,!options.backwards)
}}}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute("filter")
}catch(smother){}}}function destroy(opts){if(opts.next){$(opts.next).unbind(opts.prevNextEvent)
}if(opts.prev){$(opts.prev).unbind(opts.prevNextEvent)
}if(opts.pager||opts.pagerAnchorBuilder){$.each(opts.pagerAnchors||[],function(){this.unbind().remove()
})
}opts.pagerAnchors=null;
if(opts.destroy){opts.destroy(opts)
}}function buildOptions($cont,$slides,els,options,o){var startingSlideSpecified;
var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});
var meta=$.isFunction($cont.data)?$cont.data(opts.metaAttr):null;
if(meta){opts=$.extend(opts,meta)
}if(opts.autostop){opts.countdown=opts.autostopCount||els.length
}var cont=$cont[0];
$cont.data("cycle.opts",opts);
opts.$cont=$cont;
opts.stopCount=cont.cycleStop;
opts.elements=els;
opts.before=opts.before?[opts.before]:[];
opts.after=opts.after?[opts.after]:[];
if(!$.support.opacity&&opts.cleartype){opts.after.push(function(){removeFilter(this,opts)
})
}if(opts.continuous){opts.after.push(function(){go(els,opts,0,!opts.backwards)
})
}saveOriginalOpts(opts);
if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($slides)
}if($cont.css("position")=="static"){$cont.css("position","relative")
}if(opts.width){$cont.width(opts.width)
}if(opts.height&&opts.height!="auto"){$cont.height(opts.height)
}if(opts.startingSlide!=undefined){opts.startingSlide=parseInt(opts.startingSlide,10);
if(opts.startingSlide>=els.length||opts.startSlide<0){opts.startingSlide=0
}else{startingSlideSpecified=true
}}else{if(opts.backwards){opts.startingSlide=els.length-1
}else{opts.startingSlide=0
}}if(opts.random){opts.randomMap=[];
for(var i=0;
i<els.length;
i++){opts.randomMap.push(i)
}opts.randomMap.sort(function(a,b){return Math.random()-0.5
});
if(startingSlideSpecified){for(var cnt=0;
cnt<els.length;
cnt++){if(opts.startingSlide==opts.randomMap[cnt]){opts.randomIndex=cnt
}}}else{opts.randomIndex=1;
opts.startingSlide=opts.randomMap[1]
}}else{if(opts.startingSlide>=els.length){opts.startingSlide=0
}}opts.currSlide=opts.startingSlide||0;
var first=opts.startingSlide;
$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;
if(opts.backwards){z=first?i<=first?els.length+(i-first):first-i:els.length-i
}else{z=first?i>=first?els.length-(i-first):first-i:els.length-i
}$(this).css("z-index",z)
});
$(els[first]).css("opacity",1).show();
removeFilter(els[first],opts);
if(opts.fit){if(!opts.aspect){if(opts.width){$slides.width(opts.width)
}if(opts.height&&opts.height!="auto"){$slides.height(opts.height)
}}else{$slides.each(function(){var $slide=$(this);
var ratio=(opts.aspect===true)?$slide.width()/$slide.height():opts.aspect;
if(opts.width&&$slide.width()!=opts.width){$slide.width(opts.width);
$slide.height(opts.width/ratio)
}if(opts.height&&$slide.height()<opts.height){$slide.height(opts.height);
$slide.width(opts.height*ratio)
}})
}}if(opts.center&&((!opts.fit)||opts.aspect)){$slides.each(function(){var $slide=$(this);
$slide.css({"margin-left":opts.width?((opts.width-$slide.width())/2)+"px":0,"margin-top":opts.height?((opts.height-$slide.height())/2)+"px":0})
})
}if(opts.center&&!opts.fit&&!opts.slideResize){$slides.each(function(){var $slide=$(this);
$slide.css({"margin-left":opts.width?((opts.width-$slide.width())/2)+"px":0,"margin-top":opts.height?((opts.height-$slide.height())/2)+"px":0})
})
}var reshape=opts.containerResize&&!$cont.innerHeight();
if(reshape){var maxw=0,maxh=0;
for(var j=0;
j<els.length;
j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();
if(!w){w=e.offsetWidth||e.width||$e.attr("width")
}if(!h){h=e.offsetHeight||e.height||$e.attr("height")
}maxw=w>maxw?w:maxw;
maxh=h>maxh?h:maxh
}if(maxw>0&&maxh>0){$cont.css({width:maxw+"px",height:maxh+"px"})
}}var pauseFlag=false;
if(opts.pause){$cont.hover(function(){pauseFlag=true;
this.cyclePause++;
triggerPause(cont,true)
},function(){pauseFlag&&this.cyclePause--;
triggerPause(cont,true)
})
}if(supportMultiTransitions(opts)===false){return false
}var requeue=false;
options.requeueAttempts=options.requeueAttempts||0;
$slides.each(function(){var $el=$(this);
this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr("height")||0);
this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr("width")||0);
if($el.is("img")){var loadingIE=($.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);
var loadingFF=($.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);
var loadingOp=($.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);
var loadingOther=(this.cycleH==0&&this.cycleW==0&&!this.complete);
if(loadingIE||loadingFF||loadingOp||loadingOther){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);
setTimeout(function(){$(o.s,o.c).cycle(options)
},opts.requeueTimeout);
requeue=true;
return false
}else{log("could not determine size of image: "+this.src,this.cycleW,this.cycleH)
}}}return true
});
if(requeue){return false
}opts.cssBefore=opts.cssBefore||{};
opts.cssAfter=opts.cssAfter||{};
opts.cssFirst=opts.cssFirst||{};
opts.animIn=opts.animIn||{};
opts.animOut=opts.animOut||{};
$slides.not(":eq("+first+")").css(opts.cssBefore);
$($slides[first]).css(opts.cssFirst);
if(opts.timeout){opts.timeout=parseInt(opts.timeout,10);
if(opts.speed.constructor==String){opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed,10)
}if(!opts.sync){opts.speed=opts.speed/2
}var buffer=opts.fx=="none"?0:opts.fx=="shuffle"?500:250;
while((opts.timeout-opts.speed)<buffer){opts.timeout+=opts.speed
}}if(opts.easing){opts.easeIn=opts.easeOut=opts.easing
}if(!opts.speedIn){opts.speedIn=opts.speed
}if(!opts.speedOut){opts.speedOut=opts.speed
}opts.slideCount=els.length;
opts.currSlide=opts.lastSlide=first;
if(opts.random){if(++opts.randomIndex==els.length){opts.randomIndex=0
}opts.nextSlide=opts.randomMap[opts.randomIndex]
}else{if(opts.backwards){opts.nextSlide=opts.startingSlide==0?(els.length-1):opts.startingSlide-1
}else{opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1
}}if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];
if($.isFunction(init)){init($cont,$slides,opts)
}else{if(opts.fx!="custom"&&!opts.multiFx){log("unknown transition: "+opts.fx,"; slideshow terminating");
return false
}}}var e0=$slides[first];
if(!opts.skipInitializationCallbacks){if(opts.before.length){opts.before[0].apply(e0,[e0,e0,opts,true])
}if(opts.after.length){opts.after[0].apply(e0,[e0,e0,opts,true])
}}if(opts.next){$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)
})
}if(opts.prev){$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)
})
}if(opts.pager||opts.pagerAnchorBuilder){buildPager(els,opts)
}exposeAddSlide(opts,els);
return opts
}function saveOriginalOpts(opts){opts.original={before:[],after:[]};
opts.original.cssBefore=$.extend({},opts.cssBefore);
opts.original.cssAfter=$.extend({},opts.cssAfter);
opts.original.animIn=$.extend({},opts.animIn);
opts.original.animOut=$.extend({},opts.animOut);
$.each(opts.before,function(){opts.original.before.push(this)
});
$.each(opts.after,function(){opts.original.after.push(this)
})
}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;
if(opts.fx.indexOf(",")>0){opts.multiFx=true;
opts.fxs=opts.fx.replace(/\s*/g,"").split(",");
for(i=0;
i<opts.fxs.length;
i++){var fx=opts.fxs[i];
tx=txs[fx];
if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log("discarding unknown transition: ",fx);
opts.fxs.splice(i,1);
i--
}}if(!opts.fxs.length){log("No valid transitions named; slideshow terminating.");
return false
}}else{if(opts.fx=="all"){opts.multiFx=true;
opts.fxs=[];
for(p in txs){tx=txs[p];
if(txs.hasOwnProperty(p)&&$.isFunction(tx)){opts.fxs.push(p)
}}}}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;
for(i=0;
i<r1;
i++){var r2=Math.floor(Math.random()*opts.fxs.length);
opts.fxs.push(opts.fxs.splice(r2,1)[0])
}debug("randomized fx sequence: ",opts.fxs)
}return true
}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];
if(!opts.autostopCount){opts.countdown++
}els[prepend?"unshift":"push"](s);
if(opts.els){opts.els[prepend?"unshift":"push"](s)
}opts.slideCount=els.length;
if(opts.random){opts.randomMap.push(opts.slideCount-1);
opts.randomMap.sort(function(a,b){return Math.random()-0.5
})
}$s.css("position","absolute");
$s[prepend?"prependTo":"appendTo"](opts.$cont);
if(prepend){opts.currSlide++;
opts.nextSlide++
}if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($s)
}if(opts.fit&&opts.width){$s.width(opts.width)
}if(opts.fit&&opts.height&&opts.height!="auto"){$s.height(opts.height)
}s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();
s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();
$s.css(opts.cssBefore);
if(opts.pager||opts.pagerAnchorBuilder){$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts)
}if($.isFunction(opts.onAddSlide)){opts.onAddSlide($s)
}else{$s.hide()
}}
}$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;
opts.before=[];
opts.after=[];
opts.cssBefore=$.extend({},opts.original.cssBefore);
opts.cssAfter=$.extend({},opts.original.cssAfter);
opts.animIn=$.extend({},opts.original.animIn);
opts.animOut=$.extend({},opts.original.animOut);
opts.fxFn=null;
$.each(opts.original.before,function(){opts.before.push(this)
});
$.each(opts.original.after,function(){opts.after.push(this)
});
var init=$.fn.cycle.transitions[fx];
if($.isFunction(init)){init(opts.$cont,$(opts.elements),opts)
}};
function go(els,opts,manual,fwd){if(manual&&opts.busy&&opts.manualTrump){debug("manualTrump in go(), stopping active transition");
$(els).stop(true,true);
opts.busy=0
}if(opts.busy){debug("transition active, ignoring new tx request");
return
}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];
if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual){return
}if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end){opts.end(opts)
}return
}var changed=false;
if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;
var fx=opts.fx;
curr.cycleH=curr.cycleH||$(curr).height();
curr.cycleW=curr.cycleW||$(curr).width();
next.cycleH=next.cycleH||$(next).height();
next.cycleW=next.cycleW||$(next).width();
if(opts.multiFx){if(fwd&&(opts.lastFx==undefined||++opts.lastFx>=opts.fxs.length)){opts.lastFx=0
}else{if(!fwd&&(opts.lastFx==undefined||--opts.lastFx<0)){opts.lastFx=opts.fxs.length-1
}}fx=opts.fxs[opts.lastFx]
}if(opts.oneTimeFx){fx=opts.oneTimeFx;
opts.oneTimeFx=null
}$.fn.cycle.resetState(opts,fx);
if(opts.before.length){$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount){return
}o.apply(next,[curr,next,opts,fwd])
})
}var after=function(){opts.busy=0;
$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount){return
}o.apply(next,[curr,next,opts,fwd])
});
if(!p.cycleStop){queueNext()
}};
debug("tx firing("+fx+"); currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide);
opts.busy=1;
if(opts.fxFn){opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent)
}else{if($.isFunction($.fn.cycle[opts.fx])){$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent)
}else{$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent)
}}}else{queueNext()
}if(changed||opts.nextSlide==opts.currSlide){opts.lastSlide=opts.currSlide;
if(opts.random){opts.currSlide=opts.nextSlide;
if(++opts.randomIndex==els.length){opts.randomIndex=0;
opts.randomMap.sort(function(a,b){return Math.random()-0.5
})
}opts.nextSlide=opts.randomMap[opts.randomIndex];
if(opts.nextSlide==opts.currSlide){opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1
}}else{if(opts.backwards){var roll=(opts.nextSlide-1)<0;
if(roll&&opts.bounce){opts.backwards=!opts.backwards;
opts.nextSlide=1;
opts.currSlide=0
}else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;
opts.currSlide=roll?0:opts.nextSlide+1
}}else{var roll=(opts.nextSlide+1)==els.length;
if(roll&&opts.bounce){opts.backwards=!opts.backwards;
opts.nextSlide=els.length-2;
opts.currSlide=els.length-1
}else{opts.nextSlide=roll?0:opts.nextSlide+1;
opts.currSlide=roll?els.length-1:opts.nextSlide-1
}}}}if(changed&&opts.pager){opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass)
}function queueNext(){var ms=0,timeout=opts.timeout;
if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);
if(opts.fx=="shuffle"){ms-=opts.speedOut
}}else{if(opts.continuous&&p.cyclePause){ms=10
}}if(ms>0){p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.backwards)
},ms)
}}}$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName)
})
};
function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);
while(opts.fx!="none"&&(t-opts.speed)<250){t+=opts.speed
}debug("calculated timeout: "+t+"; speed: "+opts.speed);
if(t!==false){return t
}}return opts.timeout
}$.fn.cycle.next=function(opts){advance(opts,1)
};
$.fn.cycle.prev=function(opts){advance(opts,0)
};
function advance(opts,moveForward){var val=moveForward?1:-1;
var els=opts.elements;
var p=opts.$cont[0],timeout=p.cycleTimeout;
if(timeout){clearTimeout(timeout);
p.cycleTimeout=0
}if(opts.random&&val<0){opts.randomIndex--;
if(--opts.randomIndex==-2){opts.randomIndex=els.length-2
}else{if(opts.randomIndex==-1){opts.randomIndex=els.length-1
}}opts.nextSlide=opts.randomMap[opts.randomIndex]
}else{if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex]
}else{opts.nextSlide=opts.currSlide+val;
if(opts.nextSlide<0){if(opts.nowrap){return false
}opts.nextSlide=els.length-1
}else{if(opts.nextSlide>=els.length){if(opts.nowrap){return false
}opts.nextSlide=0
}}}}var cb=opts.onPrevNextEvent||opts.prevNextClick;
if($.isFunction(cb)){cb(val>0,opts.nextSlide,els[opts.nextSlide])
}go(els,opts,1,moveForward);
return false
}function buildPager(els,opts){var $p=$(opts.pager);
$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts)
});
opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass)
}$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;
if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);
debug("pagerAnchorBuilder("+i+", el) returned: "+a)
}else{a='<a href="#">'+(i+1)+"</a>"
}if(!a){return
}var $a=$(a);
if($a.parents("body").length===0){var arr=[];
if($p.length>1){$p.each(function(){var $clone=$a.clone(true);
$(this).append($clone);
arr.push($clone[0])
});
$a=$(arr)
}else{$a.appendTo($p)
}}opts.pagerAnchors=opts.pagerAnchors||[];
opts.pagerAnchors.push($a);
var pagerFn=function(e){e.preventDefault();
opts.nextSlide=i;
var p=opts.$cont[0],timeout=p.cycleTimeout;
if(timeout){clearTimeout(timeout);
p.cycleTimeout=0
}var cb=opts.onPagerEvent||opts.pagerClick;
if($.isFunction(cb)){cb(opts.nextSlide,els[opts.nextSlide])
}go(els,opts,1,opts.currSlide<i)
};
if(/mouseenter|mouseover/i.test(opts.pagerEvent)){$a.hover(pagerFn,function(){})
}else{$a.bind(opts.pagerEvent,pagerFn)
}if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble){$a.bind("click.cycle",function(){return false
})
}var cont=opts.$cont[0];
var pauseFlag=false;
if(opts.pauseOnPagerHover){$a.hover(function(){pauseFlag=true;
cont.cyclePause++;
triggerPause(cont,true,true)
},function(){pauseFlag&&cont.cyclePause--;
triggerPause(cont,true,true)
})
}};
$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;
if(fwd){hops=c>l?c-l:opts.slideCount-l
}else{hops=c<l?l-c:l+opts.slideCount-c
}return hops
};
function clearTypeFix($slides){debug("applying clearType background-color hack");
function hex(s){s=parseInt(s,10).toString(16);
return s.length<2?"0"+s:s
}function getBg(e){for(;
e&&e.nodeName.toLowerCase()!="html";
e=e.parentNode){var v=$.css(e,"background-color");
if(v&&v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);
return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2])
}if(v&&v!="transparent"){return v
}}return"#ffffff"
}$slides.each(function(){$(this).css("background-color",getBg(this))
})
}$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();
if(typeof opts.cssBefore.opacity=="undefined"){opts.cssBefore.opacity=1
}opts.cssBefore.display="block";
if(opts.slideResize&&w!==false&&next.cycleW>0){opts.cssBefore.width=next.cycleW
}if(opts.slideResize&&h!==false&&next.cycleH>0){opts.cssBefore.height=next.cycleH
}opts.cssAfter=opts.cssAfter||{};
opts.cssAfter.display="none";
$(curr).css("zIndex",opts.slideCount+(rev===true?1:0));
$(next).css("zIndex",opts.slideCount+(rev===true?0:1))
};
$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);
var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut;
$n.css(opts.cssBefore);
if(speedOverride){if(typeof speedOverride=="number"){speedIn=speedOut=speedOverride
}else{speedIn=speedOut=1
}easeIn=easeOut=null
}var fn=function(){$n.animate(opts.animIn,speedIn,easeIn,function(){cb()
})
};
$l.animate(opts.animOut,speedOut,easeOut,function(){$l.css(opts.cssAfter);
if(!opts.sync){fn()
}});
if(opts.sync){fn()
}};
$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0);
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);
opts.cssBefore.opacity=0
});
opts.animIn={opacity:1};
opts.animOut={opacity:0};
opts.cssBefore={top:0,left:0}
}};
$.fn.cycle.ver=function(){return ver
};
$.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,aspect:false,autostop:0,autostopCount:0,backwards:false,before:null,center:null,cleartype:!$.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:false,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:undefined,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null,width:null}
})(jQuery);
/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.cycle.transitions.none=function($cont,$slides,opts){opts.fxFn=function(curr,next,opts,after){$(next).show();
$(curr).hide();
after()
}
};
$.fn.cycle.transitions.fadeout=function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css({display:"block",opacity:1});
opts.before.push(function(curr,next,opts,w,h,rev){$(curr).css("zIndex",opts.slideCount+(!rev===true?1:0));
$(next).css("zIndex",opts.slideCount+(!rev===true?0:1))
});
opts.animIn.opacity=1;
opts.animOut.opacity=0;
opts.cssBefore.opacity=1;
opts.cssBefore.display="block";
opts.cssAfter.zIndex=0
};
$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css("overflow","hidden");
opts.before.push($.fn.cycle.commonReset);
var h=$cont.height();
opts.cssBefore.top=h;
opts.cssBefore.left=0;
opts.cssFirst.top=0;
opts.animIn.top=0;
opts.animOut.top=-h
};
$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css("overflow","hidden");
opts.before.push($.fn.cycle.commonReset);
var h=$cont.height();
opts.cssFirst.top=0;
opts.cssBefore.top=-h;
opts.cssBefore.left=0;
opts.animIn.top=0;
opts.animOut.top=h
};
$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css("overflow","hidden");
opts.before.push($.fn.cycle.commonReset);
var w=$cont.width();
opts.cssFirst.left=0;
opts.cssBefore.left=w;
opts.cssBefore.top=0;
opts.animIn.left=0;
opts.animOut.left=0-w
};
$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css("overflow","hidden");
opts.before.push($.fn.cycle.commonReset);
var w=$cont.width();
opts.cssFirst.left=0;
opts.cssBefore.left=-w;
opts.cssBefore.top=0;
opts.animIn.left=0;
opts.animOut.left=w
};
$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css("overflow","hidden").width();
opts.before.push(function(curr,next,opts,fwd){if(opts.rev){fwd=!fwd
}$.fn.cycle.commonReset(curr,next,opts);
opts.cssBefore.left=fwd?(next.cycleW-1):(1-next.cycleW);
opts.animOut.left=fwd?-curr.cycleW:curr.cycleW
});
opts.cssFirst.left=0;
opts.cssBefore.top=0;
opts.animIn.left=0;
opts.animOut.top=0
};
$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css("overflow","hidden");
opts.before.push(function(curr,next,opts,fwd){if(opts.rev){fwd=!fwd
}$.fn.cycle.commonReset(curr,next,opts);
opts.cssBefore.top=fwd?(1-next.cycleH):(next.cycleH-1);
opts.animOut.top=fwd?curr.cycleH:-curr.cycleH
});
opts.cssFirst.top=0;
opts.cssBefore.left=0;
opts.animIn.top=0;
opts.animOut.left=0
};
$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();
$.fn.cycle.commonReset(curr,next,opts,false,true);
opts.animIn.width=next.cycleW
});
opts.cssBefore.left=0;
opts.cssBefore.top=0;
opts.cssBefore.width=0;
opts.animIn.width="show";
opts.animOut.width=0
};
$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();
$.fn.cycle.commonReset(curr,next,opts,true,false);
opts.animIn.height=next.cycleH
});
opts.cssBefore.left=0;
opts.cssBefore.top=0;
opts.cssBefore.height=0;
opts.animIn.height="show";
opts.animOut.height=0
};
$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var i,w=$cont.css("overflow","visible").width();
$slides.css({left:0,top:0});
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true)
});
if(!opts.speedAdjusted){opts.speed=opts.speed/2;
opts.speedAdjusted=true
}opts.random=0;
opts.shuffle=opts.shuffle||{left:-w,top:15};
opts.els=[];
for(i=0;
i<$slides.length;
i++){opts.els.push($slides[i])
}for(i=0;
i<opts.currSlide;
i++){opts.els.push(opts.els.shift())
}opts.fxFn=function(curr,next,opts,cb,fwd){if(opts.rev){fwd=!fwd
}var $el=fwd?$(curr):$(next);
$(next).css(opts.cssBefore);
var count=opts.slideCount;
$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){var hops=$.fn.cycle.hopsFromLast(opts,fwd);
for(var k=0;
k<hops;
k++){fwd?opts.els.push(opts.els.shift()):opts.els.unshift(opts.els.pop())
}if(fwd){for(var i=0,len=opts.els.length;
i<len;
i++){$(opts.els[i]).css("z-index",len-i+count)
}}else{var z=$(curr).css("z-index");
$el.css("z-index",parseInt(z,10)+1+count)
}$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();
if(cb){cb()
}})
})
};
$.extend(opts.cssBefore,{display:"block",opacity:1,top:0,left:0})
};
$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);
opts.cssBefore.top=next.cycleH;
opts.animIn.height=next.cycleH;
opts.animOut.width=next.cycleW
});
opts.cssFirst.top=0;
opts.cssBefore.left=0;
opts.cssBefore.height=0;
opts.animIn.top=0;
opts.animOut.height=0
};
$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);
opts.animIn.height=next.cycleH;
opts.animOut.top=curr.cycleH
});
opts.cssFirst.top=0;
opts.cssBefore.left=0;
opts.cssBefore.top=0;
opts.cssBefore.height=0;
opts.animOut.height=0
};
$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);
opts.cssBefore.left=next.cycleW;
opts.animIn.width=next.cycleW
});
opts.cssBefore.top=0;
opts.cssBefore.width=0;
opts.animIn.left=0;
opts.animOut.width=0
};
$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);
opts.animIn.width=next.cycleW;
opts.animOut.left=curr.cycleW
});
$.extend(opts.cssBefore,{top:0,left:0,width:0});
opts.animIn.left=0;
opts.animOut.width=0
};
$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false,true);
opts.cssBefore.top=next.cycleH/2;
opts.cssBefore.left=next.cycleW/2;
$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH});
$.extend(opts.animOut,{width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2})
});
opts.cssFirst.top=0;
opts.cssFirst.left=0;
opts.cssBefore.width=0;
opts.cssBefore.height=0
};
$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false);
opts.cssBefore.left=next.cycleW/2;
opts.cssBefore.top=next.cycleH/2;
$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH})
});
opts.cssBefore.width=0;
opts.cssBefore.height=0;
opts.animOut.opacity=0
};
$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);
opts.animIn.width=next.cycleW;
opts.animOut.left=curr.cycleW
});
opts.cssBefore.left=w;
opts.cssBefore.top=0;
opts.animIn.left=0;
opts.animOut.left=w
};
$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);
opts.animIn.height=next.cycleH;
opts.animOut.top=curr.cycleH
});
opts.cssBefore.top=h;
opts.cssBefore.left=0;
opts.animIn.top=0;
opts.animOut.top=h
};
$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();
var w=$cont.width();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);
opts.animIn.height=next.cycleH;
opts.animOut.top=curr.cycleH
});
opts.cssBefore.top=h;
opts.cssBefore.left=w;
opts.animIn.top=0;
opts.animIn.left=0;
opts.animOut.top=h;
opts.animOut.left=w
};
$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);
opts.cssBefore.left=this.cycleW/2;
opts.animIn.left=0;
opts.animIn.width=this.cycleW;
opts.animOut.left=0
});
opts.cssBefore.top=0;
opts.cssBefore.width=0
};
$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);
opts.cssBefore.top=this.cycleH/2;
opts.animIn.top=0;
opts.animIn.height=this.cycleH;
opts.animOut.top=0
});
opts.cssBefore.height=0;
opts.cssBefore.left=0
};
$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true,true);
opts.cssBefore.left=next.cycleW/2;
opts.animIn.left=0;
opts.animIn.width=this.cycleW;
opts.animOut.left=curr.cycleW/2;
opts.animOut.width=0
});
opts.cssBefore.top=0;
opts.cssBefore.width=0
};
$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false,true);
opts.cssBefore.top=next.cycleH/2;
opts.animIn.top=0;
opts.animIn.height=next.cycleH;
opts.animOut.top=curr.cycleH/2;
opts.animOut.height=0
});
opts.cssBefore.height=0;
opts.cssBefore.left=0
};
$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||"left";
var w=$cont.css("overflow","hidden").width();
var h=$cont.height();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);
if(d=="right"){opts.cssBefore.left=-w
}else{if(d=="up"){opts.cssBefore.top=h
}else{if(d=="down"){opts.cssBefore.top=-h
}else{opts.cssBefore.left=w
}}}});
opts.animIn.left=0;
opts.animIn.top=0;
opts.cssBefore.top=0;
opts.cssBefore.left=0
};
$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||"left";
var w=$cont.css("overflow","hidden").width();
var h=$cont.height();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);
if(d=="right"){opts.animOut.left=w
}else{if(d=="up"){opts.animOut.top=-h
}else{if(d=="down"){opts.animOut.top=h
}else{opts.animOut.left=-w
}}}});
opts.animIn.left=0;
opts.animIn.top=0;
opts.cssBefore.top=0;
opts.cssBefore.left=0
};
$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css("overflow","visible").width();
var h=$cont.height();
opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);
if(!opts.animOut.left&&!opts.animOut.top){$.extend(opts.animOut,{left:w*2,top:-h/2,opacity:0})
}else{opts.animOut.opacity=0
}});
opts.cssBefore.left=0;
opts.cssBefore.top=0;
opts.animIn.left=0
};
$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();
var h=$cont.height();
opts.cssBefore=opts.cssBefore||{};
var clip;
if(opts.clip){if(/l2r/.test(opts.clip)){clip="rect(0px 0px "+h+"px 0px)"
}else{if(/r2l/.test(opts.clip)){clip="rect(0px "+w+"px "+h+"px "+w+"px)"
}else{if(/t2b/.test(opts.clip)){clip="rect(0px "+w+"px 0px 0px)"
}else{if(/b2t/.test(opts.clip)){clip="rect("+h+"px "+w+"px "+h+"px 0px)"
}else{if(/zoom/.test(opts.clip)){var top=parseInt(h/2,10);
var left=parseInt(w/2,10);
clip="rect("+top+"px "+left+"px "+top+"px "+left+"px)"
}}}}}}opts.cssBefore.clip=opts.cssBefore.clip||clip||"rect(0px 0px 0px 0px)";
var d=opts.cssBefore.clip.match(/(\d+)/g);
var t=parseInt(d[0],10),r=parseInt(d[1],10),b=parseInt(d[2],10),l=parseInt(d[3],10);
opts.before.push(function(curr,next,opts){if(curr==next){return
}var $curr=$(curr),$next=$(next);
$.fn.cycle.commonReset(curr,next,opts,true,true,false);
opts.cssAfter.display="block";
var step=1,count=parseInt((opts.speedIn/13),10)-1;
(function f(){var tt=t?t-parseInt(step*(t/count),10):0;
var ll=l?l-parseInt(step*(l/count),10):0;
var bb=b<h?b+parseInt(step*((h-b)/count||1),10):h;
var rr=r<w?r+parseInt(step*((w-r)/count||1),10):w;
$next.css({clip:"rect("+tt+"px "+rr+"px "+bb+"px "+ll+"px)"});
(step++<=count)?setTimeout(f,13):$curr.css("display","none")
})()
});
$.extend(opts.cssBefore,{display:"block",opacity:1,top:0,left:0});
opts.animIn={left:0};
opts.animOut={left:0}
}
})(jQuery);
(function($,undefined){$.ajaxPrefilter(function(options,origOptions,jqXHR){if(options.iframe){options.originalURL=options.url;
return"iframe"
}});
$.ajaxTransport("iframe",function(options,origOptions,jqXHR){var form=null,iframe=null,name="iframe-"+$.now(),files=$(options.files).filter(":file:enabled"),markers=null,accepts=null;
function cleanUp(){files.each(function(i,file){var $file=$(file);
$file.data("clone").replaceWith($file)
});
form.remove();
iframe.one("load",function(){iframe.remove()
});
iframe.attr("src","javascript:false;")
}options.dataTypes.shift();
options.data=origOptions.data;
if(files.length){form=$("<form enctype='multipart/form-data' method='post'></form>").hide().attr({action:options.originalURL,target:name});
if(typeof(options.data)==="string"&&options.data.length>0){$.error("data must not be serialized")
}$.each(options.data||{},function(name,value){if($.isPlainObject(value)){name=value.name;
value=value.value
}$("<input type='hidden' />").attr({name:name,value:value}).appendTo(form)
});
$("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(form);
if(options.dataTypes[0]&&options.accepts[options.dataTypes[0]]){accepts=options.accepts[options.dataTypes[0]]+(options.dataTypes[0]!=="*"?", */*; q=0.01":"")
}else{accepts=options.accepts["*"]
}$("<input type='hidden' name='X-HTTP-Accept'>").attr("value",accepts).appendTo(form);
markers=files.after(function(idx){var $this=$(this),$clone=$this.clone().prop("disabled",true);
$this.data("clone",$clone);
return $clone
}).next();
files.appendTo(form);
return{send:function(headers,completeCallback){iframe=$("<iframe src='javascript:false;' name='"+name+"' id='"+name+"' style='display:none'></iframe>");
iframe.one("load",function(){iframe.one("load",function(){var doc=this.contentWindow?this.contentWindow.document:(this.contentDocument?this.contentDocument:this.document),root=doc.documentElement?doc.documentElement:doc.body,textarea=root.getElementsByTagName("textarea")[0],type=textarea&&textarea.getAttribute("data-type")||null,status=textarea&&textarea.getAttribute("data-status")||200,statusText=textarea&&textarea.getAttribute("data-statusText")||"OK",content={html:root.innerHTML,text:type?textarea.value:root?(root.textContent||root.innerText):null};
cleanUp();
completeCallback(status,statusText,content,type?("Content-Type: "+type):null)
});
form[0].submit()
});
$("body").append(form,iframe)
},abort:function(){if(iframe!==null){iframe.unbind("load").attr("src","javascript:false;");
cleanUp()
}}}
}})
})(jQuery);
if(typeof com=="undefined"){com=new Object()
}if(typeof com.containerstore=="undefined"){com.containerstore=new Object()
}com.containerstore.GoogleAnalyticsEvent=function(category,action,label,value){this.category=category;
this.action=action;
this.label=label;
this.value=null;
if(value!=null){this.value=parseInt(value)
}};
com.containerstore.GoogleAnalyticsEvent.prototype.toString=function(){return"["+this.category+"]["+this.action+"] "+this.label+" ("+this.value+")"
};
com.containerstore.GoogleAnalyticsEvent.prototype.fireOffEvent=function(){_gaq.push(["_trackEvent",this.category,this.action,this.label,this.value])
};
com.containerstore.SimpleEventTracker=function(category){this.category=category
};
com.containerstore.SimpleEventTracker.prototype.captureEvent=function(action,label,value){var gaEvent=new com.containerstore.GoogleAnalyticsEvent(this.category,action,label,value);
gaEvent.fireOffEvent()
};
var registrationEventTracker=new com.containerstore.SimpleEventTracker("Registration");
var chatEventTracker=new com.containerstore.SimpleEventTracker("Live Chat");
function captureChatClick(eventLabel){chatEventTracker.captureEvent("Clicked",eventLabel,null)
}function openChatWindow(chatSource,sourceUrl,salesForceOrgId){captureChatClick(chatSource);
if(typeof sourceUrl=="undefined"){var path=window.location.href
}else{var path=window.location.protocol+window.location.hostname+sourceUrl
}liveagent.startChat(salesForceOrgId)
}$(document).ready(function(){$(".liveChat").each(function(){var myTitle=this.title;
this.title="";
$(this).data("chat-source",myTitle)
});
$(".liveChat").click(function(){openChatWindow($(this).data("chat-source"),$(this).data("source-url"),$(this).data("salesforce-orgid"))
})
});
var OOo={Browser:function(){var b=navigator.userAgent,a="[object Opera]"==Object.prototype.toString.call(window.opera),a={IE:!!window.attachEvent&&!a,IE11:!!navigator.userAgent.match(/Trident.*rv[ :]*11\./),Opera:a,WebKit:-1<b.indexOf("AppleWebKit/"),Chrome:-1<b.indexOf("Chrome"),Gecko:-1<b.indexOf("Gecko")&&-1===b.indexOf("KHTML"),MobileSafari:/Apple.*Mobile.*Safari/.test(b),PalmPre:-1<b.indexOf("Pre/"),BlackBerry:-1<b.indexOf("BlackBerry"),Fennec:-1<b.indexOf("Fennec"),IEMobile:-1<b.indexOf("IEMobile"),OperaMobile:-1<b.search(/Opera (?:Mobi|Mini)/)},c=0,f=!1;
a.IE||a.IE11?a.IE11?c=11:(c=/msie.(\d+\.\d.)/i,c=b.match(c)[1]):a.Gecko?(c=/gecko.(\d+)/i,c=b.match(c)[1]):a.WebKit?(c=/applewebkit\/(\d+)/i,c=b.match(c)[1]):a.Opera?(c=/opera.(\d\.\d+)/i,c=b.match(c)[1]):f=!0;
a.isMobile=a.MobileSafari||a.PalmPre||a.BlackBerry||a.Fennec||a.IEMobile||a.OperaMobile;
a.Version=parseFloat(c);
a.isModern=!(f||a.IE&&6>a.Version||a.Opera&&8>a.Version||"gecko"==a.Gecko&&20041107>a.Version);
return a
}(),Cache:{},instanceCount:0};
if(!OnlineOpinion){var OnlineOpinion=OOo
}(function(){function b(a,b){for(var d in b){a[d]=b[d]
}return a
}function a(a){var b=[],d;
for(d in a){b.push(d+"="+(encodeURIComponent(a[d])||""))
}return b.join("&")
}b(OOo,{extend:b,toQueryString:a,addEventListener:function(a,b,d,e){a.addEventListener?a.addEventListener(b,d,e):a.attachEvent&&a.attachEvent("on"+b,d)
},$:function(a){return document.getElementById(a)
},appendOOForm:function(b,f){var d=document,e=d.createElement("form"),h=d.createElement("input");
e.style.display="none";
e.method="post";
e.target=f||"OnlineOpinion";
e.action=b.onPageCard?"https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r="+location.href:"https://secure.opinionlab.com/ccc01/comment_card_d.asp";
h.name="params";
var g=a(b.metrics),g=g+("&custom_var="+b.tealeafId+"|"+b.clickTalePID+"/"+b.clickTaleUID+"/"+b.clickTaleSID);
b.legacyVariables&&(g+="|"+b.legacyVariables);
"OnPage"==b.metrics.type&&(g+="|iframe");
g+="&_rev=2";
b.customVariables&&(g+="&customVars="+encodeURIComponent(OOo.serialize(b.customVariables)));
h.value=g;
e.appendChild(h);
d.body.appendChild(e);
return e
},removeEventListener:function(a,b,d,e){a.removeEventListener?a.removeEventListener(b,d,e):a.detachEvent&&a.detachEvent("on"+b,d)
},createMetrics:function(){return{width:screen.width,height:screen.height,referer:location.href,prev:document.referrer,time1:(new Date).getTime(),time2:null,currentURL:location.href,ocodeVersion:"5.1.7"}
}})
})();
(function(){function b(a){if(!a){return null
}switch(typeof a){case"number":case"boolean":case"function":return a;
case"string":return"'"+a+"'";
case"object":var c;
if(a.constructor===Array||"undefined"!==typeof a.callee){c="[";
var f,d=a.length;
for(f=0;
f<d-1;
f++){c+=b(a[f])+","
}c+=b(a[f])+"]"
}else{c="{";
for(f in a){c+=f+":"+b(a[f])+","
}c=c.replace(/\,$/,"")+"}"
}return c;
default:return null
}}OOo.extend(OOo,{serialize:b})
})();
(function(){OOo.extend(OOo,{checkTunnel:function(b,a){var c=location.pathname,f;
if(-1!=c.search(b[0])){return OOo.createCookie(a,0),!1
}if(OOo.readCookie(a)){f=parseInt(OOo.readCookie(a));
if(-1!=c.search(b[f+1])&&f+1!=b.length-1){return OOo.createCookie(a,f+1),!1
}if(-1!=c.search(b[f])){return !1
}if(f+1==b.length-1){return !0
}OOo.eraseCookie(a)
}return !1
}})
})();
(function(){function b(a){for(var b="",d=7;
0<=d;
d--){b+="0123456789abcdef".charAt(a>>4*d&15)
}return b
}function a(a,b){var d=(a&65535)+(b&65535);
return(a>>16)+(b>>16)+(d>>16)<<16|d&65535
}OOo.extend(OOo,{sha1:function(c){for(var f=(c.length+8>>6)+1,d=Array(16*f),e=0;
e<16*f;
e++){d[e]=0
}for(e=0;
e<c.length;
e++){d[e>>2]|=c.charCodeAt(e)<<24-e%4*8
}d[e>>2]|=128<<24-e%4*8;
d[16*f-1]=8*c.length;
c=Array(80);
for(var f=1732584193,e=-271733879,h=-1732584194,g=271733878,k=-1009589776,p,r,s,t,q,m,n=0;
n<d.length;
n+=16){p=f;
r=e;
s=h;
t=g;
q=k;
for(var l=0;
80>l;
l++){16>l?c[l]=d[n+l]:(m=c[l-3]^c[l-8]^c[l-14]^c[l-16],c[l]=m<<1|m>>>31);
m=f<<5|f>>>27;
var u;
u=20>l?e&h|~e&g:40>l?e^h^g:60>l?e&h|e&g|h&g:e^h^g;
m=a(a(m,u),a(a(k,c[l]),20>l?1518500249:40>l?1859775393:60>l?-1894007588:-899497514));
k=g;
g=h;
h=e<<30|e>>>2;
e=f;
f=m
}f=a(f,p);
e=a(e,r);
h=a(h,s);
g=a(g,t);
k=a(k,q)
}return b(f)+b(e)+b(h)+b(g)+b(k)
}})
})();
(function(){OOo.extend(OOo,{checkAbandonment:function(b){var a=b.cookieName||"oo_abandon",c=OOo.readCookie(a),f=b.startPage,d=b.endPage;
b=b.middle;
if(c){if(-1!=location.pathname.indexOf(d)){return OOo.eraseCookie(a),!1
}if(-1!=location.pathname.search(b)){return !1
}OOo.eraseCookie(a);
return !0
}-1!=location.pathname.indexOf(f)&&OOo.createCookie(a);
return !1
}})
})();
(function(){OOo.extend(OOo,{checkThirdPartyCookies:function(b){for(var a=b.length-1;
0<=a;
a--){if(b[a].read&&((cookieValue=OOo.readCookie(b[a].name))&&cookieValue==b[a].value||"undefined"==typeof b[a].value&&OOo.readCookie(b[a].name))){return !0
}}return !1
},setThirdPartyCookies:function(b){for(var a=b.length-1;
0<=a;
a--){b[a].set&&OOo.createCookie(b[a].name,b[a].value,b[a].expiration)
}}})
})();
OOo.extend(Function.prototype,function(){function b(b){if(2>arguments.length&&"undefined"===typeof arguments[0]){return this
}var f=this,d=a.call(arguments,1);
return function(){for(var e=d,h=arguments,e=a.call(e,0),g=e.length,k=h.length;
k--;
){e[g+k]=h[k]
}return f.apply(b,e)
}
}if("undefined"==typeof Prototype){var a=Array.prototype.slice;
return{bind:b}
}}());
(function(){function b(b,f,d){var e="",e="";
d&&(e=new Date,e.setTime(e.getTime()+1000*d),e="; expires="+e.toGMTString());
document.cookie=b+"="+f+e+"; path=/; domain="+a+";"
}var a=location.host.split(".").reverse(),a="."+a[1]+"."+a[0];
OOo.extend(OOo,{createCookie:b,readCookie:function(a){a+="=";
for(var b=document.cookie.split(";"),d,e=0;
e<b.length;
e++){for(d=b[e];
" "==d.charAt(0);
){d=d.substring(1,d.length)
}if(0===d.indexOf(a)){return d.substring(a.length,d.length)
}}return null
},eraseCookie:function(a){b(a,"",-1)
}})
})();
OOo.Ocode=function(b){if(!(!OOo.Browser.isModern||b.disableMobile&&OOo.Browser.isMobile||b.disableNoniOS&&OOo.Browser.isMobile&&-1!=navigator.userAgent.search("Android"))){OOo.instanceCount++;
this.options={tealeafCookieName:"TLTSID"};
OOo.extend(this.options,b);
b=this.options;
var a=b.referrerRewrite;
if(!b.cookie||!this.matchUrl()){if(!b.thirdPartyCookies||!OOo.checkThirdPartyCookies(b.thirdPartyCookies)){if(!b.abandonment||OOo.checkAbandonment(b.abandonment)){if(!b.tunnel||OOo.checkTunnel(b.tunnel.path,b.tunnel.cookieName)){b.events&&b.events.onSingleClick&&(this.singProbability=Math.random()<1-b.events.onSingleClick/100),b.tealeafId=OOo.readCookie(b.tealeafCookieName),this.frameName=b.onPageCard?"OnlineOpinion"+OOo.instanceCount:"OnlineOpinion",b.metrics=OOo.createMetrics(),a&&(b.metrics.referer=a.searchPattern?window.location.href.replace(a.searchPattern,a.replacePattern):a.replacePattern),b.events&&(this.setupEvents(),(b.events.disableLinks||b.events.disableFormElements)&&this.setupDisableElements()),b.floating?this.floating():b.bar?this.bar():b.tab&&this.tab()
}}}}}};
OOo.Ocode.prototype={show:function(b){var a=this.options;
if(!(this.interruptShow||!a.floating&&a.events&&this.singProbability)){a.events&&a.events.onSingleClick&&(this.singProbability=!0);
a.cookie&&this.tagUrl();
if(a.thirdPartyCookies){if(OOo.checkThirdPartyCookies(a.thirdPartyCookies)){return
}OOo.setThirdPartyCookies(a.thirdPartyCookies)
}this.floatingLogo&&a.disappearOnClick&&(this.floatingLogo.style.display="none");
"string"==typeof b&&(a.metrics.trigger=b);
a.clickTalePID&&"function"==typeof ClickTale&&(a.clickTaleUID=ClickTaleGetUID(),a.clickTaleSID=ClickTaleGetSID());
a.onPageCard?this.setupOnPageCC():this.launchOOPopup()
}},tagUrl:function(){if(!this.matchUrl()){var b=this.options.cookie,a="page"==b.type?location.href:location.hostname,c=OOo.readCookie(b.name||"oo_r")||"";
OOo.createCookie(b.name||"oo_r",c+OOo.sha1(a),b.expiration)
}},matchUrl:function(){var b="page"==this.options.cookie.type?location.href:location.hostname,a=OOo.readCookie(this.options.cookie.name||"oo_r");
return a?-1!=a.search(OOo.sha1(b)):!1
}};
(function(){OOo.extend(OOo.Ocode.prototype,{launchOOPopup:function(){var b=this.options,a=b.newWindowSize||[545,325],c=[parseInt((b.metrics.height-a[1])/2),parseInt((b.metrics.width-a[0])/2)],b=this.options;
b.metrics.time2=(new Date).getTime();
b.metrics.type="Popup";
b=OOo.appendOOForm(b);
window.open("","OnlineOpinion","location=no,status=no,width="+a[0]+",height="+a[1]+",top="+c[0]+",left="+c[1])&&b.submit()
}})
})();
(function(){function b(a){a=a.target||a.srcElement;
for(var b=this.options.events,d=a.parentNode,e=0;
d&&("A"!=a.nodeName||"INPUT"!=a.nodeName)&&5!=e;
){"A"==d.nodeName&&(a=d),d=d.parentNode,e++
}!b.disableFormElements||"INPUT"!=a.tagName||"submit"!=a.type&&"image"!=a.type||(this.interruptShow=!0);
"A"==a.nodeName&&"http"==a.href.substr(0,4)&&-1!=a.href.search(b.disableLinks)&&(this.interruptShow=!0)
}function a(a){this.interruptShow=!0
}OOo.extend(OOo.Ocode.prototype,{setupEvents:function(){for(var a=this.options.events,b=[!1,!1],d=["onExit","onEntry"],e=OOo.Browser.Opera?"unload":"beforeunload",h,g=d.length-1;
0<=g;
g--){if(h=d[g],a[h] instanceof Array){h=a[h];
for(var k=h.length;
k--&&!b[g];
){-1!=window.location.href.search(h[k].url)&&Math.random()>=1-h[k].p/100&&(b[g]=!0)
}}else{a[h]&&Math.random()>=1-a[h]/100&&(b[g]=!0)
}}b[0]&&OOo.addEventListener(window,e,this.show.bind(this,"onExit"),!1);
b[1]&&(a.delayEntry?window.setTimeout(function(){this.show()
}.bind(this,"onEntry"),1000*a.delayEntry):this.show("onEntry"))
},setupDisableElements:function(){OOo.addEventListener(document.body,"mousedown",b.bind(this));
if(this.options.events.disableFormElements){for(var c=document.getElementsByTagName("form"),f=c.length-1;
0<=f;
f--){OOo.addEventListener(c[f],"submit",a.bind(this))
}}}})
})();
OOo.extend(OOo.Ocode.prototype,{floating:function(){var b=document,a=this.floatingLogo=document.createElement("div"),c=b.createElement("div"),f=b.createElement("div"),d=b.createElement("div"),e=b.createElement("span"),h=this.options.floating,g=OOo.$(h.contentId),k=!1,p=h.id;
p&&(a.id=p);
a.className="oo_feedback_float";
f.className="oo_transparent";
c.className="olUp";
d.className="olOver";
c.tabIndex=0;
c.onkeyup=function(a){13==(a||window.event).keyCode&&this.show()
}.bind(this);
c.innerHTML=h.caption||"Feedback";
a.appendChild(c);
e.innerHTML=h.hoverCaption||"Click here to<br>rate this page";
d.appendChild(e);
a.appendChild(d);
a.appendChild(f);
if(OOo.Browser.IE&&7>OOo.Browser.Version){a.style.position="absolute";
a.style.bottom="";
OOo.addEventListener(window,"scroll",r,!1);
OOo.addEventListener(window,"resize",r,!1);
var r=function(c){a.style.top=b.documentElement.scrollTop+document.documentElement.clientHeight-a.clientHeight+"px"
},k=!0
}else{if(OOo.Browser.MobileSafari){var s=window.innerHeight,t;
a.style.bottom=null;
a.style.top=pageYOffset+window.innerHeight-60+"px";
OOo.addEventListener(window,"scroll",function(b){t=pageYOffset-(s-window.innerHeight);
a.style.webkitTransform="translateY("+t+"px)"
},!1)
}}if(h.position&&h.position.search(/Content/)&&g){var q=this.spacer=b.createElement("div"),m=OOo.Browser.WebKit?b.body:b.documentElement,n;
q.id="oo_feedback_fl_spacer";
q.style.left=g.offsetLeft+g.offsetWidth+"px";
b.body.appendChild(q);
switch(h.position){case"rightOfContent":n=function(b){a.style.left=g.offsetLeft+g.offsetWidth-m.scrollLeft+"px";
k&&(n=null)
};
break;
case"fixedPreserveContent":n=function(c){c=k?0:m.scrollLeft;
(OOo.Browser.IE?b.body.clientWidth:window.innerWidth)<=g.offsetLeft+g.offsetWidth+a.offsetWidth+parseInt("10px")?a.style.left=g.offsetLeft+g.offsetWidth-c+"px":(a.style.left="",a.style.right="10px")
};
break;
case"fixedContentMax":n=function(c){(OOo.Browser.IE?b.body.clientWidth:window.innerWidth)<=g.offsetLeft+g.offsetWidth+a.offsetWidth+parseInt("10px")?(a.style.left="",a.style.right="10px",c&&"scroll"==c.type&&k&&(a.style.left=b.documentElement.clientWidth+m.scrollLeft-105+"px")):(a.style.left=g.offsetLeft+g.offsetWidth-m.scrollLeft+"px",a.style.right="")
}
}n();
OOo.addEventListener(window,"scroll",n,!1);
OOo.addEventListener(window,"resize",n,!1);
OOo.addEventListener(window,"resize",function(a){q.style.left=g.offsetLeft+g.offsetWidth+"px"
},!1)
}else{a.style.right="10px"
}OOo.addEventListener(a,"click",this.show.bind(this,"Floating"),!1);
OOo.addEventListener(a,"touchstart",this.show.bind(this,"Floating"),!1);
b.body.appendChild(a);
OOo.Browser.IE&&7>OOo.Browser.Version&&(a.style.top=b.documentElement.clientHeight-a.clientHeight+"px",f.style.height=a.clientHeight+"px")
},removeFloatingLogo:function(){document.body.removeChild(this.floatingLogo);
this.spacer&&document.body.removeChild(this.spacer)
}});
OOo.extend(OOo.Ocode.prototype,{bar:function(){var b=document,a=this.floatingLogo=b.createElement("div"),c=b.createElement("span");
a.id="oo_bar";
c.innerHTML=this.options.bar.caption||"Feedback";
a.appendChild(c);
a.tabIndex=0;
a.onkeyup=function(a){13==(a||window.event).keyCode&&this.show()
}.bind(this);
OOo.addEventListener(a,"click",this.show.bind(this,"Bar"));
document.body.className+=1>document.body.className?"oo_bar":" oo_bar";
document.body.appendChild(a);
if(OOo.Browser.IE){var f;
f="CSS1Compat"==b.compatMode?function(c){c&&"resize"==c.type&&setTimeout(f,50);
a.style.top=b.documentElement.scrollTop+document.documentElement.clientHeight-a.clientHeight-1+"px";
a.style.width=Math.max(b.documentElement.clientWidth,b.body.offsetWidth)+"px"
}:function(c){a.style.top=b.body.scrollTop+document.body.clientHeight-a.clientHeight-1+"px";
a.style.width=Math.max(b.documentElement.clientWidth,b.body.offsetWidth)-22+"px"
};
a.style.position="absolute";
OOo.addEventListener(window,"scroll",f,!1);
OOo.addEventListener(window,"resize",f,!1);
f()
}else{if(OOo.Browser.MobileSafari){var d=window.innerHeight,e;
a.style.bottom=null;
a.style.top=pageYOffset+window.innerHeight-22+"px";
OOo.addEventListener(window,"scroll",function(b){e=pageYOffset-(d-window.innerHeight);
a.style.webkitTransform="translateY("+e+"px)"
},!1)
}}}});
OOo.extend(OOo.Ocode.prototype,{tab:function(){var b=document,a=this.floatingLogo=b.createElement("div"),c=b.createElement("a"),f=b.createElement("span"),d=this.options.tab;
a.id="oo_tab";
a.className="oo_tab_"+(d.position||"right");
OOo.Browser.IE&&7>OOo.Browser.Version?(a.style.position="absolute","right"==d.position&&(a.className+=" oo_tab_ie_right")):OOo.Browser.MobileSafari&&(a.style.top=pageYOffset+window.innerHeight/2+"px",OOo.addEventListener(window,"scroll",function(b){a.style.top=pageYOffset+window.innerHeight/2+"px"
},!1));
c.href="javascript:void(0)";
c.title=d.title||"Feedback";
a.tabIndex=0;
a.onkeyup=function(a){13==(a||window.event).keyCode&&this.show()
}.bind(this);
c.appendChild(f);
a.appendChild(c);
OOo.addEventListener(a,"click",this.show.bind(this,"Tab"),!1);
b.body.appendChild(a)
}});
OOo.extend(OOo.Ocode.prototype,{setupOnPageCC:function(){function b(b){if(!(b&&"https://secure.opinionlab.com"!=b.origin||!b&&"OL="!=location.hash.substr(1,3))){var c=b?b.data:location.hash.slice(4),e=parseInt(c),h=document;
b||(location.hash="");
0<e?n||(n=!0,b=window.innerHeight||h.documentElement.clientHeight,e>b&&(e=b-40,p.style.width="555px"),p.style.height=e+"px",OOo.Browser.IE&&7>OOo.Browser.Version&&(g.style.height=d.offsetHeight+"px"),d.style.visibility="visible",f.className="no_loading"):"submitted"==c&&a()
}}function a(){f.style.display="none";
f.className="";
c.body.removeChild(d);
window.postMessage?OOo.removeEventListener(window,"message",m):window.clearInterval(q);
n=!1
}var c=document,f=OOo.Cache.overlay||c.createElement("div"),d=this.wrapper=c.createElement("div"),e=c.createElement("a"),h=c.createElement("div"),g=c.createElement("span"),k=this.frameName,p=c.createElement(OOo.Browser.IE?'<iframe name="'+k+'">':"iframe"),r=c.createDocumentFragment(),s=this.options,t=s.onPageCard,q,m,n=!1;
s.metrics.type="OnPage";
OOo.Cache.overlay=f;
f.id="oo_overlay";
f.style.display="block";
f.className="";
h.className="iwrapper";
d.className="oo_cc_wrapper";
e.className="oo_cc_close";
e.href="javascript:void(0)";
e.title=t.closeTitle||"Close Feedback Card";
d.style.visibility="hidden";
if(OOo.Browser.IE){if(window.XMLHttpRequest){var l=c.createElement("div"),u=c.createElement("div"),w=c.createElement("div"),v=c.createElement("div");
v.className="oo_shadows";
l.className="oo_body";
u.className="oo_top";
w.className="oo_bottom";
v.appendChild(l);
v.appendChild(u);
v.appendChild(w);
h.appendChild(v)
}else{f.style.position="absolute",f.style.width=Math.max(c.documentElement.clientWidth,c.body.offsetWidth)+"px",f.style.height=Math.max(c.documentElement.clientHeight,c.body.offsetHeight)+"px",d.style.position="absolute"
}}OOo.addEventListener(e,"click",a);
t.closeWithOverlay&&!OOo.Browser.isMobile&&(d.appendChild(g),g.onclick=a,f.onclick=a);
p.src="https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp";
p.name=k;
h.appendChild(e);
h.appendChild(p);
d.appendChild(h);
r.appendChild(d);
r.appendChild(f);
c.body.appendChild(r);
m=b.bind(this);
window.postMessage?OOo.addEventListener(window,"message",m):q=setInterval(b.bind(this),500);
e=OOo.appendOOForm(s,k);
s.metrics.time2=(new Date).getTime();
e.submit()
}});
OOo.Invitation=function(b){this.options={tunnelCookie:"oo_inv_tunnel",repromptTime:604800,responseRate:50,repromptCookie:"oo_inv_reprompt",promptMarkup:"oo_inv_prompt.html",promptStyles:"oo_inverstitial_style.css",percentageCookie:"oo_inv_percent",pagesHitCookie:"oo_inv_hit",popupType:"popunder",promptDelay:0,neverShowAgainButton:!1,loadPopupInBackground:!1,tealeafCookieName:"TLTSID"};
this.popupShown=!1;
OOo.extend(this.options,b);
var a=this.options;
b=parseInt(OOo.readCookie(a.pagesHitCookie))||0;
OOo.Invitation.friendlyDomains=a.friendlyDomains||null;
-1!=location.search.search("evs")&&(a.loadPopupInBackground=!0,this.launchPopup(),OOo.createCookie(a.repromptCookie,1,-1==a.repromptTime?0:a.repromptTime));
setTimeout(function(){a.area&&-1==location.href.search(a.area)&&window.oo_inv_monitor&&(this.options.popupType="popup",this.launchPopup())
}.bind(this),1000);
if(!(OOo.readCookie(a.repromptCookie)||a.thirdPartyCookies&&OOo.checkThirdPartyCookies(a.thirdPartyCookies))){OOo.readCookie(a.percentageCookie)||OOo.createCookie(a.percentageCookie,Math.random()>1-a.responseRate/100?"1":"0");
if("undefined"!=typeof a.promptTrigger){if(a.promptTrigger instanceof RegExp){if(!window.location.href.match(a.promptTrigger)){return
}}else{if(a.promptTrigger instanceof Array&&!OOo.checkTunnel(a.promptTrigger,a.tunnelCookie)){return
}}}b++;
OOo.createCookie(a.pagesHitCookie,b);
a.pagesHit&&b<a.pagesHit||(OOo.eraseCookie(a.tunnelCookie),"1"==OOo.readCookie(a.percentageCookie)&&window.setTimeout(function(){OOo.createCookie(a.repromptCookie,1,a.repromptTime);
this.getPrompt()
}.bind(this),1000*a.promptDelay))
}};
OOo.Invitation.prototype={getPrompt:function(){var b=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),a=this;
document.createElement("link");
b.onreadystatechange=function(){4==b.readyState&&a.showPrompt(b.responseText)
};
b.open("GET",this.options.pathToAssets+this.options.promptMarkup,!0);
b.send(null)
},showPrompt:function(b){var a=document,c=a.createElement("div"),f=OOo.Cache.overlay||a.createElement("div"),d;
d=this.options;
f.id="oo_overlay";
c.id="oo_container";
c.style.visibility="hidden";
c.innerHTML=b;
c.appendChild(f);
a.body.appendChild(c);
d.companyLogo&&(b=new Image,b.src=d.companyLogo,OOo.$("oo_company_logo").appendChild(b));
OOo.addEventListener(OOo.$("oo_launch_prompt"),"click",this.launchPopup.bind(this),!1);
d.neverShowAgainButton&&(d=OOo.$("oo_never_show"),d.style.visibility="visible",OOo.addEventListener(d,"click",this.killPrompt.bind(this),!1));
OOo.Browser.IE&&!window.XMLHttpRequest&&(f.style.position="absolute",f.style.width=Math.max(document.documentElement.clientWidth,document.body.offsetWidth)+"px",f.style.height=Math.max(document.documentElement.clientHeight,document.body.offsetHeight)+"px",c.style.position="absolute");
c.style.visibility="visible";
f.className="no_loading"
},launchPopup:function(){if(!this.popupShown){this.popupShown=!0;
var b=this.options,a="popup"==b.popupType?"https://secure.opinionlab.com/ccc01/comment_card.asp?":b.pathToAssets+"oo_inv_monitor.html?",c,f=b.asm?[555,500]:[545,200],d=OOo.readCookie(b.teleafId);
c=OOo.createMetrics();
f=b.newWindowSize||f;
b.referrerRewrite&&(c.referer=b.referrerRewrite.searchPattern?window.location.href.replace(b.referrerRewrite.searchPattern,b.referrerRewrite.replacePattern):b.referrerRewrite.replacePattern);
b.thirdPartyCookies&&OOo.setThirdPartyCookies(b.thirdPartyCookies);
c=OOo.toQueryString(c)+"&type=Invitation";
b.customVariables&&(c+="&customVars="+encodeURIComponent(OOo.serialize(b.customVariables)));
c+="&custom_var="+d;
b.clickTalePID&&ClickTaleGetUID&&ClickTaleGetSID&&(c+="|"+[b.clickTalePID,ClickTaleGetUID(),ClickTaleGetSID()].join("/"));
a=window.open(a+c,"OnlineOpinionInvitation","location=no,status=no,width="+f[0]+",height="+f[1]);
!b.loadPopupInBackground&&OOo.$("oo_container")&&OOo.Invitation.hidePrompt();
"popunder"==b.popupType?OOo.Browser.Chrome?(alert(b.chromeMainWinPrompt||"Please fill out the form behind this window when you are finished."),a.window.prompt=b.chromeSurveyPrompt):(a.blur(),window.focus()):window.oo_inv_monitor&&(window.blur(),a.focus())
}},killPrompt:function(){OOo.createCookie(this.options.repromptCookie,1,1825);
OOo.Invitation.hidePrompt()
}};
OOo.extend(OOo.Invitation,{hidePrompt:function(){OOo.$("oo_container").style.display="none"
}});
var oo_feedback=null;
$(document).ready(function(){try{if($(window).width()>=1175){var oo_floating=new OnlineOpinion.Ocode({floating:{id:"oo_feedback_float",position:"fixedContentMax",contentId:"bodyContentContainer"},cookie:{name:"oo_r",type:"page",expiration:3600},customVariables:{cust:cust,custEmail:custEmail,tealeafId:tealeafId},disappearOnClick:true})
}oo_feedback=new OnlineOpinion.Ocode({customVariables:{cust:cust,custEmail:custEmail,tealeafId:tealeafId}})
}catch(e){console.log(e)
}});
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1
},g="gecko",w="webkit",s="safari",o="opera",m="mobile",h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?("ie ie"+RegExp.$1):is("firefox/2")?g+" ff2":is("firefox/3.5")?g+" ff3 ff3_5":is("firefox/3.6")?g+" ff3 ff3_6":is("firefox/3")?g+" ff3":is("gecko/")?g:is("opera")?o+(/version\/(\d+)/.test(ua)?" "+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?" "+o+RegExp.$2:"")):is("konqueror")?"konqueror":is("blackberry")?m+" blackberry":is("android")?m+" android":is("chrome")?w+" chrome":is("iron")?w+" iron":is("applewebkit/")?w+" "+s+(/version\/(\d+)/.test(ua)?" "+s+RegExp.$1:""):is("mozilla/")?g:"",is("j2me")?m+" j2me":is("iphone")?m+" iphone":is("ipod")?m+" ipod":is("ipad")?m+" ipad":is("mac")?"mac":is("darwin")?"mac":is("webtv")?"webtv":is("win")?"win"+(is("windows nt 6.0")?" vista":""):is("freebsd")?"freebsd":(is("x11")||is("linux"))?"linux":"","js"];
c=b.join(" ");
h.className+=" "+c;
return c
}css_browser_selector(navigator.userAgent);
/*!
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function(window){var i,support,cachedruns,Expr,getText,isXML,compile,outermostContext,sortInput,hasDuplicate,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+-(new Date()),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true
}return 0
},strundefined=typeof undefined,MAX_NEGATIVE=1<<31,hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,indexOf=arr.indexOf||function(elem){var i=0,len=this.length;
for(;
i<len;
i++){if(this[i]===elem){return i
}}return -1
},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),attributes="\\["+whitespace+"*("+characterEncoding+")"+whitespace+"*(?:([*^$|!~]?=)"+whitespace+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+identifier+")|)|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+attributes.replace(3,8)+")*)|.*)\\)|)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={ID:new RegExp("^#("+characterEncoding+")"),CLASS:new RegExp("^\\.("+characterEncoding+")"),TAG:new RegExp("^("+characterEncoding.replace("w","w*")+")"),ATTR:new RegExp("^"+attributes),PSEUDO:new RegExp("^"+pseudos),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),bool:new RegExp("^(?:"+booleans+")$","i"),needsContext:new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g,runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-65536;
return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+65536):String.fromCharCode(high>>10|55296,high&1023|56320)
};
try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);
arr[preferredDoc.childNodes.length].nodeType
}catch(e){push={apply:arr.length?function(target,els){push_native.apply(target,slice.call(els))
}:function(target,els){var j=target.length,i=0;
while((target[j++]=els[i++])){}target.length=j-1
}}
}function Sizzle(selector,context,results,seed){var match,elem,m,nodeType,i,groups,old,nid,newContext,newSelector;
if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context)
}context=context||document;
results=results||[];
if(!selector||typeof selector!=="string"){return results
}if((nodeType=context.nodeType)!==1&&nodeType!==9){return[]
}if(documentIsHTML&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);
if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);
return results
}}else{return results
}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);
return results
}}}else{if(match[2]){push.apply(results,context.getElementsByTagName(selector));
return results
}else{if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));
return results
}}}}if(support.qsa&&(!rbuggyQSA||!rbuggyQSA.test(selector))){nid=old=expando;
newContext=context;
newSelector=nodeType===9&&selector;
if(nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);
if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&")
}else{context.setAttribute("id",nid)
}nid="[id='"+nid+"'] ";
i=groups.length;
while(i--){groups[i]=nid+toSelector(groups[i])
}newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;
newSelector=groups.join(",")
}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));
return results
}catch(qsaError){}finally{if(!old){context.removeAttribute("id")
}}}}}return select(selector.replace(rtrim,"$1"),context,results,seed)
}function createCache(){var keys=[];
function cache(key,value){if(keys.push(key+" ")>Expr.cacheLength){delete cache[keys.shift()]
}return(cache[key+" "]=value)
}return cache
}function markFunction(fn){fn[expando]=true;
return fn
}function assert(fn){var div=document.createElement("div");
try{return !!fn(div)
}catch(e){return false
}finally{if(div.parentNode){div.parentNode.removeChild(div)
}div=null
}}function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;
while(i--){Expr.attrHandle[arr[i]]=handler
}}function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-(~a.sourceIndex||MAX_NEGATIVE);
if(diff){return diff
}if(cur){while((cur=cur.nextSibling)){if(cur===b){return -1
}}}return a?1:-1
}function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type===type
}
}function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&elem.type===type
}
}function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;
return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;
while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j])
}}})
})
}function testContext(context){return context&&typeof context.getElementsByTagName!==strundefined&&context
}support=Sizzle.support={};
isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false
};
setDocument=Sizzle.setDocument=function(node){var hasCompare,doc=node?node.ownerDocument||node:preferredDoc,parent=doc.defaultView;
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document
}document=doc;
docElem=doc.documentElement;
documentIsHTML=!isXML(doc);
if(parent&&parent.attachEvent&&parent!==parent.top){parent.attachEvent("onbeforeunload",function(){setDocument()
})
}support.attributes=assert(function(div){div.className="i";
return !div.getAttribute("className")
});
support.getElementsByTagName=assert(function(div){div.appendChild(doc.createComment(""));
return !div.getElementsByTagName("*").length
});
support.getElementsByClassName=rnative.test(doc.getElementsByClassName)&&assert(function(div){div.innerHTML="<div class='a'></div><div class='a i'></div>";
div.firstChild.className="i";
return div.getElementsByClassName("i").length===2
});
support.getById=assert(function(div){docElem.appendChild(div).id=expando;
return !doc.getElementsByName||!doc.getElementsByName(expando).length
});
if(support.getById){Expr.find.ID=function(id,context){if(typeof context.getElementById!==strundefined&&documentIsHTML){var m=context.getElementById(id);
return m&&m.parentNode?[m]:[]
}};
Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);
return function(elem){return elem.getAttribute("id")===attrId
}
}
}else{delete Expr.find.ID;
Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);
return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");
return node&&node.value===attrId
}
}
}Expr.find.TAG=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag)
}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);
if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem)
}}return tmp
}return results
};
Expr.find.CLASS=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!==strundefined&&documentIsHTML){return context.getElementsByClassName(className)
}};
rbuggyMatches=[];
rbuggyQSA=[];
if((support.qsa=rnative.test(doc.querySelectorAll))){assert(function(div){div.innerHTML="<select><option selected=''></option></select>";
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")")
}if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked")
}});
assert(function(div){var input=doc.createElement("input");
input.setAttribute("type","hidden");
div.appendChild(input).setAttribute("t","");
if(div.querySelectorAll("[t^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")")
}if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled")
}div.querySelectorAll("*,:x");
rbuggyQSA.push(",.*:")
})
}if((support.matchesSelector=rnative.test((matches=docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(div){support.disconnectedMatch=matches.call(div,"div");
matches.call(div,"[s!='']:x");
rbuggyMatches.push("!=",pseudos)
})
}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));
rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));
hasCompare=rnative.test(docElem.compareDocumentPosition);
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;
return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16))
}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true
}}}return false
};
sortOrder=hasCompare?function(a,b){if(a===b){hasDuplicate=true;
return 0
}var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;
if(compare){return compare
}compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;
if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a===doc||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return -1
}if(b===doc||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1
}return sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0
}return compare&4?-1:1
}:function(a,b){if(a===b){hasDuplicate=true;
return 0
}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];
if(!aup||!bup){return a===doc?-1:b===doc?1:aup?-1:bup?1:sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0
}else{if(aup===bup){return siblingCheck(a,b)
}}cur=a;
while((cur=cur.parentNode)){ap.unshift(cur)
}cur=b;
while((cur=cur.parentNode)){bp.unshift(cur)
}while(ap[i]===bp[i]){i++
}return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0
};
return doc
};
Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements)
};
Sizzle.matchesSelector=function(elem,expr){if((elem.ownerDocument||elem)!==document){setDocument(elem)
}expr=expr.replace(rattributeQuotes,"='$1']");
if(support.matchesSelector&&documentIsHTML&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);
if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret
}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0
};
Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!==document){setDocument(context)
}return contains(context,elem)
};
Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!==document){setDocument(elem)
}var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;
return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null
};
Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg)
};
Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;
hasDuplicate=!support.detectDuplicates;
sortInput=!support.sortStable&&results.slice(0);
results.sort(sortOrder);
if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i)
}}while(j--){results.splice(duplicates[j],1)
}}sortInput=null;
return results
};
getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;
if(!nodeType){while((node=elem[i++])){ret+=getText(node)
}}else{if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent
}else{for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){ret+=getText(elem)
}}}else{if(nodeType===3||nodeType===4){return elem.nodeValue
}}}return ret
};
Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(match){match[1]=match[1].replace(runescape,funescape);
match[3]=(match[4]||match[5]||"").replace(runescape,funescape);
if(match[2]==="~="){match[3]=" "+match[3]+" "
}return match.slice(0,4)
},CHILD:function(match){match[1]=match[1].toLowerCase();
if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0])
}match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));
match[5]=+((match[7]+match[8])||match[3]==="odd")
}else{if(match[3]){Sizzle.error(match[0])
}}return match
},PSEUDO:function(match){var excess,unquoted=!match[5]&&match[2];
if(matchExpr.CHILD.test(match[0])){return null
}if(match[3]&&match[4]!==undefined){match[2]=match[4]
}else{if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);
match[2]=unquoted.slice(0,excess)
}}return match.slice(0,3)
}},filter:{TAG:function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();
return nodeNameSelector==="*"?function(){return true
}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName
}
},CLASS:function(className){var pattern=classCache[className+" "];
return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!==strundefined&&elem.getAttribute("class")||"")
})
},ATTR:function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);
if(result==null){return operator==="!="
}if(!operator){return true
}result+="";
return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false
}
},CHILD:function(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";
return first===1&&last===0?function(elem){return !!elem.parentNode
}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType;
if(parent){if(simple){while(dir){node=elem;
while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false
}}start=dir=type==="only"&&!start&&"nextSibling"
}return true
}start=[forward?parent.firstChild:parent.lastChild];
if(forward&&useCache){outerCache=parent[expando]||(parent[expando]={});
cache=outerCache[type]||[];
nodeIndex=cache[0]===dirruns&&cache[1];
diff=cache[0]===dirruns&&cache[2];
node=nodeIndex&&parent.childNodes[nodeIndex];
while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];
break
}}}else{if(useCache&&(cache=(elem[expando]||(elem[expando]={}))[type])&&cache[0]===dirruns){diff=cache[1]
}else{while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){(node[expando]||(node[expando]={}))[type]=[dirruns,diff]
}if(node===elem){break
}}}}}diff-=last;
return diff===first||(diff%first===0&&diff/first>=0)
}}
},PSEUDO:function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);
if(fn[expando]){return fn(argument)
}if(fn.length>1){args=[pseudo,pseudo,"",argument];
return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;
while(i--){idx=indexOf.call(seed,matched[i]);
seed[idx]=!(matches[idx]=matched[i])
}}):function(elem){return fn(elem,0,args)
}
}return fn
}},pseudos:{not:markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));
return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;
while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem)
}}}):function(elem,context,xml){input[0]=elem;
matcher(input,null,xml,results);
return !results.pop()
}
}),has:markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0
}
}),contains:markFunction(function(text){return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1
}
}),lang:markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang)
}lang=lang.replace(runescape,funescape).toLowerCase();
return function(elem){var elemLang;
do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();
return elemLang===lang||elemLang.indexOf(lang+"-")===0
}}while((elem=elem.parentNode)&&elem.nodeType===1);
return false
}
}),target:function(elem){var hash=window.location&&window.location.hash;
return hash&&hash.slice(1)===elem.id
},root:function(elem){return elem===docElem
},focus:function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex)
},enabled:function(elem){return elem.disabled===false
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){var nodeName=elem.nodeName.toLowerCase();
return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected)
},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex
}return elem.selected===true
},empty:function(elem){for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){if(elem.nodeType<6){return false
}}return true
},parent:function(elem){return !Expr.pseudos.empty(elem)
},header:function(elem){return rheader.test(elem.nodeName)
},input:function(elem){return rinputs.test(elem.nodeName)
},button:function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&elem.type==="button"||name==="button"
},text:function(elem){var attr;
return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text")
},first:createPositionalPseudo(function(){return[0]
}),last:createPositionalPseudo(function(matchIndexes,length){return[length-1]
}),eq:createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument]
}),even:createPositionalPseudo(function(matchIndexes,length){var i=0;
for(;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),odd:createPositionalPseudo(function(matchIndexes,length){var i=1;
for(;
i<length;
i+=2){matchIndexes.push(i)
}return matchIndexes
}),lt:createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;
for(;
--i>=0;
){matchIndexes.push(i)
}return matchIndexes
}),gt:createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;
for(;
++i<length;
){matchIndexes.push(i)
}return matchIndexes
})}};
Expr.pseudos.nth=Expr.pseudos.eq;
for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i)
}for(i in {submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i)
}function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;
Expr.setFilters=new setFilters();
function tokenize(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];
if(cached){return parseOnly?0:cached.slice(0)
}soFar=selector;
groups=[];
preFilters=Expr.preFilter;
while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar
}groups.push((tokens=[]))
}matched=false;
if((match=rcombinators.exec(soFar))){matched=match.shift();
tokens.push({value:matched,type:match[0].replace(rtrim," ")});
soFar=soFar.slice(matched.length)
}for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();
tokens.push({value:matched,type:type,matches:match});
soFar=soFar.slice(matched.length)
}}if(!matched){break
}}return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0)
}function toSelector(tokens){var i=0,len=tokens.length,selector="";
for(;
i<len;
i++){selector+=tokens[i].value
}return selector
}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;
return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml)
}}}:function(elem,context,xml){var data,cache,outerCache,dirkey=dirruns+" "+doneName;
if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true
}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});
if((cache=outerCache[dir])&&cache[0]===dirkey){if((data=cache[1])===true||data===cachedruns){return data===true
}}else{cache=outerCache[dir]=[dirkey];
cache[1]=matcher(elem,context,xml)||cachedruns;
if(cache[1]===true){return true
}}}}}}
}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;
while(i--){if(!matchers[i](elem,context,xml)){return false
}}return true
}:matchers[0]
}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;
for(;
i<len;
i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);
if(mapped){map.push(i)
}}}}return newUnmatched
}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter)
}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector)
}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;
if(matcher){matcher(matcherIn,matcherOut,context,xml)
}if(postFilter){temp=condense(matcherOut,postMap);
postFilter(temp,[],context,xml);
i=temp.length;
while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem)
}}}if(seed){if(postFinder||preFilter){if(postFinder){temp=[];
i=matcherOut.length;
while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem))
}}postFinder(null,(matcherOut=[]),temp,xml)
}i=matcherOut.length;
while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem)
}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);
if(postFinder){postFinder(null,results,matcherOut,xml)
}else{push.apply(results,matcherOut)
}}})
}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext
},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1
},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml))
}];
for(;
i<len;
i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)]
}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);
if(matcher[expando]){j=++i;
for(;
j<len;
j++){if(Expr.relative[tokens[j].type]){break
}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens))
}matchers.push(matcher)
}}return elementMatcher(matchers)
}function matcherFromGroupMatchers(elementMatchers,setMatchers){var matcherCachedRuns=0,bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,elems=seed||byElement&&Expr.find.TAG("*",outermost),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1),len=elems.length;
if(outermost){outermostContext=context!==document&&context;
cachedruns=matcherCachedRuns
}for(;
i!==len&&(elem=elems[i])!=null;
i++){if(byElement&&elem){j=0;
while((matcher=elementMatchers[j++])){if(matcher(elem,context,xml)){results.push(elem);
break
}}if(outermost){dirruns=dirrunsUnique;
cachedruns=++matcherCachedRuns
}}if(bySet){if((elem=!matcher&&elem)){matchedCount--
}if(seed){unmatched.push(elem)
}}}matchedCount+=i;
if(bySet&&i!==matchedCount){j=0;
while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml)
}if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results)
}}}setMatched=condense(setMatched)
}push.apply(results,setMatched);
if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results)
}}if(outermost){dirruns=dirrunsUnique;
outermostContext=contextBackup
}return unmatched
};
return bySet?markFunction(superMatcher):superMatcher
}compile=Sizzle.compile=function(selector,group){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];
if(!cached){if(!group){group=tokenize(selector)
}i=group.length;
while(i--){cached=matcherFromTokens(group[i]);
if(cached[expando]){setMatchers.push(cached)
}else{elementMatchers.push(cached)
}}cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers))
}return cached
};
function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;
for(;
i<len;
i++){Sizzle(selector,contexts[i],results)
}return results
}function select(selector,context,results,seed){var i,tokens,token,type,find,match=tokenize(selector);
if(!seed){if(match.length===1){tokens=match[0]=match[0].slice(0);
if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find.ID(token.matches[0].replace(runescape,funescape),context)||[])[0];
if(!context){return results
}selector=selector.slice(tokens.shift().value.length)
}i=matchExpr.needsContext.test(selector)?0:tokens.length;
while(i--){token=tokens[i];
if(Expr.relative[(type=token.type)]){break
}if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){tokens.splice(i,1);
selector=seed.length&&toSelector(tokens);
if(!selector){push.apply(results,seed);
return results
}break
}}}}}compile(selector,match)(seed,context,!documentIsHTML,results,rsibling.test(selector)&&testContext(context.parentNode)||context);
return results
}support.sortStable=expando.split("").sort(sortOrder).join("")===expando;
support.detectDuplicates=!!hasDuplicate;
setDocument();
support.sortDetached=assert(function(div1){return div1.compareDocumentPosition(document.createElement("div"))&1
});
if(!assert(function(div){div.innerHTML="<a href='#'></a>";
return div.firstChild.getAttribute("href")==="#"
})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2)
}})
}if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";
div.firstChild.setAttribute("value","");
return div.firstChild.getAttribute("value")===""
})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue
}})
}if(!assert(function(div){return div.getAttribute("disabled")==null
})){addHandle(booleans,function(elem,name,isXML){var val;
if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null
}})
}if(typeof define==="function"&&define.amd){define(function(){return Sizzle
})
}else{if(typeof module!=="undefined"&&module.exports){module.exports=Sizzle
}else{window.Sizzle=Sizzle
}}})(window);
/*!
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corp. 2013
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 * @version 3.0.1.1068
 * @flags w3c,NDEBUG
 */
var TLT=(function(){function n(z,t,u,A){var B=null,y=TLT.getService("queue"),x=TLT.getModule("replay"),v=null,w=window.location,C=w.origin||null;
if(!t||typeof t!=="string"){return
}if(!u||typeof u!=="string"){u=""
}if(!C){C=(w.protocol||"")+"//"+(w.host||"")
}B={type:2,screenview:{type:z,name:t,url:w.pathname,host:C,referrer:u}};
if(z==="LOAD"){v={type:"screenview_load"}
}else{if(z==="UNLOAD"){v={type:"screenview_unload"}
}}if(v&&x){x.onevent(v)
}if(z==="LOAD"||z==="UNLOAD"){y.post("",B,"DEFAULT")
}}var q=(new Date()).getTime(),r={},a={},d=false,e=null,k=(function(){var u,w=[];
function v(B){var A=p.getService("browser"),x=p.getCoreConfig().framesBlacklist,z,y;
u=u||[];
B=B||null;
if(typeof x!=="undefined"&&x.length>0){for(y=0;
y<x.length;
y+=1){z=A.queryAll(x[y],B);
if(z&&z.length>0){u=u.concat(z)
}}w=w.concat(A.queryAll("iframe",B))
}}function t(x){if(p.utils.indexOf(w,x)<0){v(x.ownerDocument)
}return p.utils.indexOf(u,x)>-1
}t.clearCache=function(){u=null
};
return t
}()),l=null,f={config:["getConfig","updateConfig","getCoreConfig","updateCoreConfig","getModuleConfig","updateModuleConfig","getServiceConfig","updateServiceConfig"],queue:["post","setAutoFlush","flushAll"],browserBase:["processDOMEvent"]},o=(function(){var t={};
return{normalizeModuleEvents:function(x,v,A,u){var z=false,w=false,y=p.getService("browser");
A=A||p._getLocalTop();
u=u||A.document;
t[x]={loadFired:false,pageHideFired:false};
p.utils.forEach(v,function(B){switch(B.name){case"load":z=true;
v.push(p.utils.mixin(p.utils.mixin({},B),{name:"pageshow"}));
break;
case"unload":w=true;
v.push(p.utils.mixin(p.utils.mixin({},B),{name:"pagehide"}));
v.push(p.utils.mixin(p.utils.mixin({},B),{name:"beforeunload"}));
break;
case"change":if(p.utils.isLegacyIE&&p.getFlavor()==="w3c"){v.push(p.utils.mixin(p.utils.mixin({},B),{name:"propertychange"}))
}break
}});
if(!z&&!w){delete t[x];
return
}t[x].silentLoad=!z;
t[x].silentUnload=!w;
if(!z){v.push({name:"load",target:A})
}if(!w){v.push({name:"unload",target:A})
}},canPublish:function(u,w){var v;
if(t.hasOwnProperty(u)===false){return true
}v=t[u];
switch(w.type){case"load":v.pageHideFired=false;
v.loadFired=true;
return !v.silentLoad;
case"pageshow":v.pageHideFired=false;
w.type="load";
return !v.loadFired&&!v.silentLoad;
case"pagehide":w.type="unload";
v.loadFired=false;
v.pageHideFired=true;
return !v.silentUnload;
case"unload":case"beforeunload":w.type="unload";
v.loadFired=false;
return !v.pageHideFired&&!v.silentUnload
}return true
},isUnload:function(u){return typeof u==="object"?(u.type==="unload"||u.type==="beforeunload"||u.type==="pagehide"):false
}}
}()),b={},g=function(){},i=null,j=true,m=null,h=false,s=false,c=navigator.userAgent.indexOf("iPhone")>-1||navigator.userAgent.indexOf("iPod")>-1||navigator.userAgent.indexOf("iPad")>-1,p={getStartTime:function(){return q
},init:function(u,v){var t;
i=v;
if(!j){throw"init must only be called once!"
}j=false;
t=function(w){w=w||window.event||{};
if(document.addEventListener||w.type==="load"||document.readyState==="complete"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",t,false);
window.removeEventListener("load",t,false)
}else{document.detachEvent("onreadystatechange",t);
window.detachEvent("onload",t)
}g(u,v)
}};
if(document.readyState==="complete"){setTimeout(t)
}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",t,false);
window.addEventListener("load",t,false)
}else{document.attachEvent("onreadystatechange",t);
window.attachEvent("onload",t)
}}},isInitialized:function(){return d
},getState:function(){return e
},destroy:function(u){var t="",w="",z=null,A=null,x=null,v=null,B=false;
if(j){return false
}this.stopAll();
if(!u){v=this.getService("browser");
for(t in b){if(b.hasOwnProperty(t)&&v!==null){w=t.split("|")[0];
z=b[t].target;
B=b[t].delegateTarget||undefined;
v.unsubscribe(w,z,this._publishEvent,B)
}}}for(A in a){if(a.hasOwnProperty(A)){x=a[A].instance;
if(x&&typeof x.destroy==="function"){x.destroy()
}a[A].instance=null
}}k.clearCache();
b={};
d=false;
j=true;
e="destroyed";
if(typeof i==="function"){try{i("destroyed")
}catch(y){}}},_updateModules:function(w){var v=this.getCoreConfig(),u=this.getService("browser"),y=null,t=null;
if(v&&u&&v.modules){try{for(t in v.modules){if(v.modules.hasOwnProperty(t)){y=v.modules[t];
if(r.hasOwnProperty(t)){if(y.enabled===false){this.stop(t)
}else{this.start(t)
}if(y.events&&u!==null){this._registerModuleEvents(t,y.events,w)
}}else{if(u.loadScript){u.loadScript(v.moduleBase+t+".js")
}}}}this._registerModuleEvents.clearCache()
}catch(x){p.destroy();
return false
}}else{return false
}return true
},rebind:function(t){p._updateModules(t)
},getSessionData:function(){var x=null,u=null,v,w,t=p.getCoreConfig();
if(!t||!t.sessionDataEnabled){return null
}u=t.sessionData||{};
v=u.sessionQueryName;
if(v){w=p.utils.getQueryStringValue(v,u.sessionQueryDelim)
}else{v=u.sessionCookieName||"TLTSID";
w=p.utils.getCookieValue(v)
}if(v&&w){x=x||{};
x.tltSCN=v;
x.tltSCV=w;
x.tltSCVNeedsHashing=!!u.sessionValueNeedsHashing
}return x
},logCustomEvent:function(w,u){var v=null,t=this.getService("queue");
if(!w||typeof w!=="string"){w="CUSTOM"
}u=u||{};
v={type:5,customEvent:{name:w,data:u}};
t.post("",v,"DEFAULT")
},logExceptionEvent:function(x,v,u){var w=null,t=this.getService("queue");
if(!x||typeof x!=="string"){return
}v=v||"";
u=u||"";
w={type:6,exception:{description:x,url:v,line:u}};
t.post("",w,"DEFAULT")
},logScreenviewLoad:function(v,u,t){n("LOAD",v,u,t)
},logScreenviewUnload:function(t){n("UNLOAD",t)
},_hasSameOrigin:function(t){try{return t.document.location.host===document.location.host&&t.document.location.protocol===document.location.protocol
}catch(u){}return false
},_registerModuleEvents:(function(){var v,w=function(A,z,y){if(A==="window"){return z
}if(A==="document"){return y
}return A
};
function x(y,E,H){var G=p.getService("browserBase"),B=p.getService("browser"),F=p.utils.getDocument(H),A=p._getLocalTop(),z=p.utils.isIFrameDescendant(H),D,C;
H=H||F;
o.normalizeModuleEvents(y,E,A,F);
if(z){D=G.ElementData.prototype.examineID(H).id;
if(typeof D==="string"){D=D.slice(0,D.length-1);
for(C in b){if(b.hasOwnProperty(C)&&C.indexOf(D)!==-1){delete b[C]
}}}}p.utils.forEach(E,function(I){var L=w(I.target,A,F)||F,K=w(I.delegateTarget,A,F),J="";
if(I.recurseFrames!==true&&z){return
}if(typeof L==="string"){if(I.delegateTarget&&p.getFlavor()==="jQuery"){J=p._buildToken4delegateTarget(I.name,L,I.delegateTarget);
if(!b.hasOwnProperty(J)){b[J]=[y];
b[J].target=L;
b[J].delegateTarget=K;
B.subscribe(I.name,L,p._publishEvent,K,J)
}else{b[J].push(y)
}}else{p.utils.forEach(B.queryAll(L,H),function(M){var N=v.get(M);
if(!N){N=G.ElementData.prototype.examineID(M);
v.set(M,N)
}J=I.name+"|"+N.id+N.type;
if(p.utils.indexOf(b[J],y)!==-1){return
}b[J]=b[J]||[];
b[J].push(y);
b[J].target=M;
B.subscribe(I.name,M,p._publishEvent)
})
}}else{J=p._buildToken4bubbleTarget(I.name,L,typeof I.target==="undefined");
if(!b.hasOwnProperty(J)){b[J]=[y];
B.subscribe(I.name,L,p._publishEvent)
}else{if(p.utils.indexOf(b[J],y)===-1){b[J].push(y)
}}}if(J!==""){if(typeof L!=="string"){b[J].target=L
}}})
}function u(y){var z=p.utils.getIFrameWindow(y);
return z&&p._hasSameOrigin(z)&&z.document&&z.document.readyState==="complete"
}function t(z,F,G){G=G||p._getLocalTop().document;
v=v||new p.utils.WeakMap();
x(z,F,G);
if(z!=="performance"){var D=null,y=null,A=p.getService("browser"),E=A.queryAll("iframe, frame",G),C,B;
for(C=0,B=E.length;
C<B;
C+=1){D=E[C];
if(k(D)){continue
}if(u(D)){y=p.utils.getIFrameWindow(D);
p._registerModuleEvents(z,F,y.document)
}(function(J,H,K){var I=null,L={moduleName:J,moduleEvents:H,hIFrame:K,_registerModuleEventsDelayed:function(){var M=null;
if(!k(K)){M=p.utils.getIFrameWindow(K);
if(p._hasSameOrigin(M)){p._registerModuleEvents(J,H,M.document)
}}}};
p.utils.addEventListener(K,"load",function(){L._registerModuleEventsDelayed()
});
if(p.utils.isLegacyIE){I=p.utils.getIFrameWindow(K);
if(I&&I.document){p.utils.addEventListener(I.document,"readystatechange",function(){L._registerModuleEventsDelayed()
})
}}}(z,F,D))
}}}t.clearCache=function(){if(v){v.clear();
v=null
}};
return t
}()),_buildToken4currentTarget:function(u){var v=u.nativeEvent?u.nativeEvent.currentTarget:null,t=v?this.getService("browserBase").ElementData.prototype.examineID(v):{id:u.target.id,type:u.target.idType};
return u.type+"|"+t.id+t.type
},_buildToken4delegateTarget:function(t,v,u){return t+"|"+v+"|"+u
},_buildToken4bubbleTarget:function(u,B,A,F){var y=p._getLocalTop(),t,v=p.getService("browser"),G=function(H){var I=null;
if(p._hasSameOrigin(t.parent)){p.utils.forEach(v.queryAll("iframe, frame",t.parent.document),function(J){var K=null;
if(!k(J)){K=p.utils.getIFrameWindow(J);
if(p._hasSameOrigin(K)&&K.document===H){I=J
}}})
}return I
},C=p.utils.getDocument(B),E=this.getService("browserBase"),D=null,x,w=u,z;
if(C){t=C.defaultView||C.parentWindow
}if(B===window||B===window.window){w+="|null-2|window"
}else{if(A&&t&&p._hasSameOrigin(t.parent)&&typeof C!=="undefined"&&y.document!==C){D=G(C);
if(D){x=E.ElementData.prototype.examineID(D);
w+="|"+x.xPath+"-2"
}}else{if(F&&F!==document&&p.getFlavor()==="jQuery"){w+="|null-2|"+p.utils.getTagName(B)+"|"+p.utils.getTagName(F)
}else{w+="|null-2|document"
}}}return w
},_reinitConfig:function(){p._updateModules()
},_handleTouchStart:function(v){var u,t;
if(c){return false
}if(m===null){m=v;
return true
}for(u=0;
u<m.nativeEvent.touches.length;
u+=1){for(t=0;
t<v.nativeEvent.touches.length;
t+=1){if(m.nativeEvent.touches[u]===v.nativeEvent.touches[t]){return true
}}}p._prepNonIosTouchEnd();
m=v;
return true
},_handleTouchMove:function(t){if(c){return
}m=t
},_handleTouchScroll:function(t){if(c){return false
}if(m!==null&&t.type==="scroll"){m.target.position.x=t.target.position.x;
m.target.position.y=t.target.position.y;
h=true
}return true
},_prepNonIosTouchEnd:function(){var t=false;
if(m!==null){m.type="touchend";
m.nativeEvent.type="touchend";
p._publishEvent(m);
if(h){m.type="scroll";
m.nativeEvent.type="scroll";
s=true;
p._publishEvent(m)
}t=true
}m=null;
h=false;
s=false;
return t
},_publishEvent:function(t){var u=null,x=null,y=(t.delegateTarget&&t.data)?t.data:p._buildToken4currentTarget(t),z=null,A,B,C,w=null,D=false,E=false,v=p.getService("browser"),F=t.delegateTarget||null;
if((t.type==="load"||t.type==="pageshow")&&!t.nativeEvent.customLoad){return
}if(c&&(t.type==="touchstart"||t.type==="touchmove")){return
}if(m!==null&&t.type!=="touchstart"&&t.type!=="touchmove"&&t.type!=="scroll"&&t.type!=="touchend"){p._prepNonIosTouchEnd()
}else{if(t.type==="touchstart"){p._handleTouchStart(t);
return
}if(t.type==="touchmove"){p._handleTouchMove(t);
return
}if(m!==null&&t.type==="scroll"&&!s){p._handleTouchScroll(t);
return
}if(h){y="scroll|null-2|window"
}}if(p.utils.isIE){if(t.type==="click"){l=t.target.element
}if(t.type==="beforeunload"){D=false;
p.utils.forEach(p.getCoreConfig().ieExcludedLinks,function(H){var I,G,J=v.queryAll(H);
for(I=0,G=J?J.length:0;
I<G;
I+=1){if(typeof J[I]!==undefined&&J[I]===l){D=true;
return
}}});
if(D){return
}}}if(o.isUnload(t)){e="unloading"
}if(t.type==="change"&&p.utils.isLegacyIE&&p.getFlavor()==="w3c"&&(t.target.element.type==="checkbox"||t.target.element.type==="radio")){return
}if(t.type==="propertychange"){if(t.nativeEvent.propertyName==="checked"&&(t.target.element.type==="checkbox"||(t.target.element.type==="radio"&&t.target.element.checked))){t.type=t.target.type="change"
}else{return
}}if(!b.hasOwnProperty(y)){if(t.hasOwnProperty("nativeEvent")){C=t.nativeEvent.currentTarget||t.nativeEvent.target
}y=p._buildToken4bubbleTarget(t.type,C,true,F)
}if(b.hasOwnProperty(y)){z=b[y];
for(A=0,B=z.length;
A<B;
A+=1){u=z[A];
x=p.getModule(u);
w=p.utils.mixin({},t);
if(x&&p.isStarted(u)&&typeof x.onevent==="function"){E=o.canPublish(u,w);
if(E){x.onevent(w)
}}}}if(w&&w.type==="unload"&&E){TLT.destroy()
}},_getLocalTop:function(){return window.window
},addModule:function(t,u){r[t]={creator:u,instance:null,context:null,messages:[]};
if(this.isInitialized()){this.start(t)
}},getModule:function(t){if(r[t]&&r[t].instance){return r[t].instance
}return null
},removeModule:function(t){this.stop(t);
delete r[t]
},isStarted:function(t){return r.hasOwnProperty(t)&&r[t].instance!==null
},start:function(u){var v=r[u],t=null;
if(v&&v.instance===null){v.context=new TLT.ModuleContext(u,this);
t=v.instance=v.creator(v.context);
if(typeof t.init==="function"){t.init()
}}},startAll:function(){var t=null;
for(t in r){if(r.hasOwnProperty(t)){this.start(t)
}}},stop:function(u){var v=r[u],t=null;
if(v&&v.instance!==null){t=v.instance;
if(typeof t.destroy==="function"){t.destroy()
}v.instance=v.context=null
}},stopAll:function(){var t=null;
for(t in r){if(r.hasOwnProperty(t)){this.stop(t)
}}},addService:function(u,t){a[u]={creator:t,instance:null}
},getService:function(t){if(a.hasOwnProperty(t)){if(!a[t].instance){try{a[t].instance=a[t].creator(this);
if(typeof a[t].instance.init==="function"){a[t].instance.init()
}}catch(u){return null
}if(typeof a[t].instance.getServiceName!=="function"){a[t].instance.getServiceName=function(){return t
}
}}return a[t].instance
}return null
},removeService:function(t){delete a[t]
},broadcast:function(w){var v=0,t=0,x=null,u=null;
if(w&&typeof w==="object"){for(x in r){if(r.hasOwnProperty(x)){u=r[x];
if(p.utils.indexOf(u.messages,w.type)>-1){if(typeof u.instance.onmessage==="function"){u.instance.onmessage(w)
}}}}}},listen:function(t,v){var u=null;
if(this.isStarted(t)){u=r[t];
if(p.utils.indexOf(u.messages,v)===-1){u.messages.push(v)
}}},fail:function(v,u,t){v="UIC FAILED. "+v;
try{p.destroy(!!t)
}finally{p.utils.clog(v);
throw new p.UICError(v,u)
}},UICError:(function(){function t(u,v){this.message=u;
this.code=v
}t.prototype=new Error();
t.prototype.name="UICError";
t.prototype.constructor=t;
return t
}()),getFlavor:function(){return"w3c"
}};
g=function(v,A){var z,x,t,u,w;
if(d){p.utils.clog("TLT.init() called more than once. Ignoring.");
return
}z=p.getService("config");
z.updateConfig(v);
if(!p._updateModules()){if(e!=="destroyed"){p.destroy()
}return
}if(z.subscribe){z.subscribe("configupdated",p._reinitConfig)
}d=true;
e="loaded";
x={type:"load",target:window.window,srcElement:window.window,currentTarget:window.window,bubbles:true,cancelBubble:false,cancelable:true,timeStamp:+new Date(),customLoad:true};
u=p.getService("browserBase");
t=new u.WebEvent(x);
p._publishEvent(t);
if(typeof i==="function"){try{i("initialized")
}catch(y){}}};
(function(){var u=null,v,t;
for(u in f){if(f.hasOwnProperty(u)){for(v=0,t=f[u].length;
v<t;
v+=1){(function(x,w){p[w]=function(){var y=this.getService(x);
if(y){return y[w].apply(y,arguments)
}}
}(u,f[u][v]))
}}}}());
return p
}());
(function(){var c=(function(){var d=window.navigator.userAgent.toLowerCase();
return(d.indexOf("msie")!==-1)
}()),b=(function(){var d=!!window.performance;
return(c&&(!d||document.documentMode<9))
}()),a={isIE:c,isLegacyIE:b,indexOf:function(g,f){var e,d;
if(g&&g instanceof Array){for(e=0,d=g.length;
e<d;
e+=1){if(g[e]===f){return e
}}}return -1
},forEach:function(h,g,f){var e,d;
if(!h||!h.length||!g||!g.call){return
}for(e=0,d=h.length;
e<d;
e+=1){g.call(f,h[e],e,h)
}},some:function(h,g){var e,d,f=false;
for(e=0,d=h.length;
e<d;
e+=1){f=g(h[e],e,h);
if(f){return f
}}return f
},convertToArray:function(f){var g=0,e=f.length,d=[];
while(g<e){d.push(f[g]);
g+=1
}return d
},isUndefOrNull:function(d){return typeof d==="undefined"||d===null
},mixin:function(h){var g,f,e,d;
for(e=1,d=arguments.length;
e<d;
e+=1){f=arguments[e];
for(g in f){if(Object.prototype.hasOwnProperty.call(f,g)){h[g]=f[g]
}}}return h
},extend:function(d,e,f){var g="";
for(g in f){if(Object.prototype.hasOwnProperty.call(f,g)){if(d&&Object.prototype.toString.call(f[g])==="[object Object]"){if(typeof e[g]==="undefined"){e[g]={}
}a.extend(d,e[g],f[g])
}else{e[g]=f[g]
}}}return e
},clone:function(e){var f,d;
if(null===e||"object"!==typeof e){return e
}if(e instanceof Object){f=(Object.prototype.toString.call(e)==="[object Array]")?[]:{};
for(d in e){if(Object.prototype.hasOwnProperty.call(e,d)){f[d]=a.clone(e[d])
}}return f
}},createObject:(function(){var d=null,e=null;
if(typeof Object.create==="function"){d=Object.create
}else{e=function(){};
d=function(f){if(typeof f!=="object"&&typeof f!=="function"){throw new TypeError("Object prototype need to be an object!")
}e.prototype=f;
return new e()
}
}return d
}()),access:function(j,g){var h=g||window,e,f,d;
if(typeof j!=="string"||(typeof h!=="object"&&h!==null)){return
}e=j.split(".");
for(f=0,d=e.length;
f<d;
f+=1){if(f===0&&e[f]==="window"){continue
}if(!Object.prototype.hasOwnProperty.call(h,e[f])){return
}h=h[e[f]];
if(f<(d-1)&&!(h instanceof Object)){return
}}return h
},isNumeric:function(d){return !isNaN(d+1-1)
},isUpperCase:function(d){return d===d.toUpperCase()&&d!==d.toLowerCase()
},isLowerCase:function(d){return d===d.toLowerCase()&&d!==d.toUpperCase()
},getDocument:function(d){if(d.nodeType!==9){return(!a.isUndefOrNull(d.ownerDocument))?(d.ownerDocument):(d.document)
}return d
},getWindow:function(e){if(e.self!==e){var d=a.getDocument(e);
return(!a.isUndefOrNull(d.defaultView))?(d.defaultView):(d.parentWindow)
}return e
},getIFrameWindow:function(g){var d=null;
if(!g){return d
}try{d=g.contentWindow||(g.contentDocument?g.contentDocument.parentWindow:null)
}catch(f){}return d
},getTagName:function(d){if(d===document){return"document"
}if(d===window||d===window.window){return"window"
}if(typeof d==="string"){return d.toLowerCase()
}if(typeof d==="object"&&!a.isUndefOrNull(d)&&typeof d.tagName==="string"){return d.tagName.toLowerCase()
}return""
},isIFrameDescendant:function(d){return a.getWindow(d)!=TLT._getLocalTop()
},getOrientationMode:function(d){var e="INVALID";
if(typeof d!=="number"){return e
}switch(d){case 0:case 180:case 360:e="PORTRAIT";
break;
case 90:case -90:case 270:e="LANDSCAPE";
break;
default:e="UNKNOWN";
break
}return e
},clog:(function(d){return function(){}
}(window)),trim:function(d){if(!d||!d.toString){return d
}return d.toString().replace(/^\s+|\s+$/g,"")
},ltrim:function(d){if(!d||!d.toString){return d
}return d.toString().replace(/^\s+/,"")
},rtrim:function(d){if(!d||!d.toString){return d
}return d.toString().replace(/\s+$/,"")
},getCookieValue:function(l,n){var h,j,g,m,f=null,d;
try{n=n||document.cookie;
if(!l||!l.toString){return null
}l+="=";
d=l.length;
m=n.split(";");
for(h=0,j=m.length;
h<j;
h+=1){g=m[h];
g=a.ltrim(g);
if(g.indexOf(l)===0){f=g.substring(d,g.length);
break
}}}catch(k){}return f
},getQueryStringValue:function(k,n,d){var h,g,o,f=null,l;
try{d=d||window.location.search;
o=d.length;
if(!k||!k.toString||!o){return null
}n=n||"&";
d=n+d.substring(1);
k=n+k+"=";
h=d.indexOf(k);
if(h!==-1){l=h+k.length;
g=d.indexOf(n,l);
if(g===-1){g=o
}f=decodeURIComponent(d.substring(l,g))
}}catch(m){}return f
},addEventListener:(function(){if(window.addEventListener){return function(e,d,f){e.addEventListener(d,f,false)
}
}return function(e,d,f){e.attachEvent("on"+d,f)
}
}()),WeakMap:(function(){function d(h,g){var f,e;
h=h||[];
for(f=0,e=h.length;
f<e;
f+=1){if(h[f][0]===g){return f
}}return -1
}return function(){var e=[];
this.set=function(g,h){var f=d(e,g);
e[f>-1?f:e.length]=[g,h]
};
this.get=function(g){var f=e[d(e,g)];
return(f?f[1]:undefined)
};
this.clear=function(){e=[]
};
this.has=function(f){return(d(e,f)>=0)
};
this.remove=function(g){var f=d(e,g);
if(f>=0){e.splice(f,1)
}};
this["delete"]=this.remove
}
}())};
if(typeof TLT==="undefined"||!TLT){window.TLT={}
}TLT.utils=a
}());
(function(){TLT.EventTarget=function(){this._handlers={}
};
TLT.EventTarget.prototype={constructor:TLT.EventTarget,publish:function(c,f){var d=0,a=0,b=this._handlers[c],e={type:c,data:f};
if(typeof b!=="undefined"){for(a=b.length;
d<a;
d+=1){b[d](e)
}}},subscribe:function(a,b){if(!this._handlers.hasOwnProperty(a)){this._handlers[a]=[]
}this._handlers[a].push(b)
},unsubscribe:function(c,e){var d=0,a=0,b=this._handlers[c];
if(b){for(a=b.length;
d<a;
d+=1){if(b[d]===e){b.splice(d,1);
return
}}}}}
}());
TLT.ModuleContext=(function(){var a=["broadcast","getConfig:getModuleConfig","listen","post","getStartTime"];
return function(f,d){var h={},g=0,b=a.length,j=null,e=null,c=null;
for(g=0;
g<b;
g+=1){j=a[g].split(":");
if(j.length>1){c=j[0];
e=j[1]
}else{c=j[0];
e=j[0]
}h[c]=(function(i){return function(){var k=d.utils.convertToArray(arguments);
k.unshift(f);
return d[i].apply(d,k)
}
}(e))
}h.utils=d.utils;
return h
}
}());
TLT.addService("config",function(a){function d(f,e){a.utils.extend(true,f,e);
c.publish("configupdated",c.getConfig())
}var b={core:{},modules:{},services:{}},c=a.utils.extend(false,a.utils.createObject(new TLT.EventTarget()),{getConfig:function(){return b
},updateConfig:function(e){d(b,e)
},getCoreConfig:function(){return b.core
},updateCoreConfig:function(e){d(b.core,e)
},getServiceConfig:function(e){return b.services[e]||null
},updateServiceConfig:function(f,e){if(typeof b.services[f]==="undefined"){b.services[f]={}
}d(b.services[f],e)
},getModuleConfig:function(e){return b.modules[e]||null
},updateModuleConfig:function(f,e){if(typeof b.modules[f]==="undefined"){b.modules[f]={}
}d(b.modules[f],e)
},destroy:function(){b={core:{},modules:{},services:{}}
}});
return c
});
TLT.addService("queue",function(o){var w=null,e=o.getService("ajax"),j=o.getService("browser"),h=o.getService("serializer"),u=o.getService("config"),f=o.getService("message"),m=null,v={},b=true,l=false,i=(function(){var B={};
function E(F){return typeof B[F]!=="undefined"
}function x(F,G){if(!E(F)){B[F]={data:[],queueId:F,url:G.url,threshold:G.threshold,serializer:G.serializer,crossDomainEnabled:!!G.crossDomainEnabled,crossDomainIFrame:G.crossDomainIFrame}
}return B[F]
}function z(F){if(E(F)){delete B[F]
}}function C(F){if(E(F)){return B[F]
}return null
}function A(G){var F=C(G);
if(F!==null){F.data=[]
}}function D(F){var G=null;
if(E(F)){G=C(F).data;
A(F)
}return G
}function y(I,J){var G=null,F=null,K=window.tlBridge,H=window.iOSJSONShuttle;
if((typeof K!=="undefined")&&(typeof K.addMessage==="function")){F=h.serialize(J);
K.addMessage(F)
}else{if((typeof H!=="undefined")&&(typeof H==="function")){F=h.serialize(J);
H(F)
}else{if(E(I)){G=C(I);
return G.data.push(J)
}}}return 0
}return{SEND_HEADER_ONCE:-1,SEND_HEADER_ALWAYS:-2,exists:E,add:x,remove:z,get:C,clear:A,flush:D,push:y}
}());
function a(){}function k(){return window.location.pathname
}function r(x,F){var A=i.flush(x),C=A!==null?A.length:0,B=i.get(x),y={"Content-Type":"application/json","X-Tealeaf":"device (UIC) Lib/3.0.1.1068","X-TealeafType":"GUI","X-TeaLeaf-Page-Url":k()},G=B.serializer||"json",z,E=null;
A=f.wrapMessages(A);
if(C){if(B.crossDomainEnabled){E=o.utils.getIFrameWindow(B.crossDomainIFrame);
if(!E){return
}z={request:{url:B.url,async:!F,headers:y,data:h.serialize(A,G)}};
if(!o.utils.isIE&&typeof window.postMessage==="function"){E.postMessage(z,B.crossDomainIFrame.src)
}else{try{E.sendMessage(z)
}catch(D){return
}}}else{e.sendRequest({oncomplete:a,url:B.url,async:!F,headers:y,data:h.serialize(A,G)})
}}}function d(z){var x=null,y=0;
for(y=0;
y<w.length;
y+=1){x=w[y];
r(x.qid,z)
}return true
}function g(x,z){var y=i.push(x,f.createMessage(z));
if(y>=i.get(x).threshold&&b&&o.getState()!=="unloading"){r(x)
}}function c(z){var y=null,B="",A=0,x=0;
for(A=0;
A<w.length;
A+=1){y=w[A];
if(y&&y.modules){for(x=0;
x<y.modules.length;
x+=1){B=y.modules[x];
if(B===z){return y.qid
}}}}return m.qid
}function s(z,x){v[z]=window.setTimeout(function y(){r(z);
v[z]=window.setTimeout(y,x)
},x)
}function q(){var x=0;
for(x in v){if(v.hasOwnProperty(x)){window.clearTimeout(v[x]);
delete v[x]
}}v={}
}function p(x){}function n(y){w=y;
var x=null,z,A=null;
for(z in w){if(w.hasOwnProperty(z)){A=null;
x=w[z];
if(x.qid==="DEFAULT"){m=x
}if(x.crossDomainEnabled){A=j.query(x.crossDomainFrameSelector);
if(!A){o.fail("Cross domain iframe not found")
}}i.add(x.qid,{url:x.endpoint,threshold:x.maxEvents,serializer:x.serializer,timerInterval:x.timerInterval||0,crossDomainEnabled:x.crossDomainEnabled||false,crossDomainIFrame:A});
if(typeof x.timerInterval!=="undefined"&&x.timerInterval>0){s(x.qid,x.timerInterval)
}}}u.subscribe("configupdated",p);
l=true
}function t(){if(b){d(true)
}u.unsubscribe("configupdated",p);
q();
w=null;
m=null;
l=false
}return{init:function(){if(!l){n(u.getServiceConfig("queue")||{})
}else{}},destroy:function(){t()
},_getQueue:function(x){return i.get(x).data
},setAutoFlush:function(x){if(x===1){b=true
}else{b=false
}},flush:function(x){if(!i.exists(x)){throw new Error("Queue: "+x+" does not exist!")
}r(x)
},flushAll:function(x){return d(!!x)
},post:function(y,z,x){x=x||c(y);
if(!i.exists(x)){throw new Error("Queue: "+x+" does not exist!")
}g(x,z)
}}
});
TLT.addService("browserBase",function(r){var v={OPTGROUP:true,OPTION:true,NOBR:true},d={},w=r.getService("config"),t,x,e,a,c,n=false;
function h(){w=r.getService("config");
t=r.getService("serializer");
x=r.getService("config").getServiceConfig("browser")||{};
e=x.hasOwnProperty("blacklist")?x.blacklist:[];
a=x.hasOwnProperty("customid")?x.customid:[]
}function m(){h();
w.subscribe("configupdated",h);
n=true
}function u(){w.unsubscribe("configupdated",h);
n=false
}function q(D){var B,A,C;
if(!D||!D.id||typeof D.id!=="string"){return false
}for(B=0,A=e.length;
B<A;
B+=1){if(typeof e[B]==="string"){if(D.id===e[B]){return false
}}else{if(typeof e[B]==="object"){C=new RegExp(e[B].regex,e[B].flags);
if(C.test(D.id)){return false
}}}}return true
}c=(function(){var B={NOBR:true,P:true};
function C(F){var I,G,H=false,L=null,D=null,M=null,K=[],J=true,E=r._getLocalTop();
while(J){J=false;
if(!r.utils.isUndefOrNull(F)){if(!r.utils.isUndefOrNull(F.tagName)){if(B.hasOwnProperty(F.tagName)){F=F.parentNode
}}for(H=q(F);
F!==document&&!H;
H=q(F)){M=F.parentNode;
if(!M){D=r.utils.getWindow(F);
M=(D!==E)?D.frameElement:document
}L=M.firstChild;
if(typeof L==="undefined"){return K
}for(G=0;
L;
L=L.nextSibling){if(L.nodeType===1&&L.tagName===F.tagName){if(L===F){K[K.length]=[F.tagName,G];
break
}G+=1
}}F=M
}if(H){K[K.length]=[F.id];
if(r.utils.isIFrameDescendant(F)){J=true;
F=r.utils.getWindow(F).frameElement
}}}}return K
}return function A(F){var D=C(F),G=[],E=D.length;
if(E<1){return"null"
}while(E){E-=1;
if(D[E].length>1){G[G.length]='["'+D[E][0]+'",'+D[E][1]+"]"
}else{G[G.length]="["+t.serialize(D[E][0],"json")+"]"
}}return("["+G.join(",")+"]")
}
}());
function o(A){return A&&typeof A.originalEvent!=="undefined"&&typeof A.isDefaultPrevented!=="undefined"&&!A.isSimulated
}function k(A){if(!A){return null
}if(A.type&&A.type.indexOf("touch")===0){if(o(A)){A=A.originalEvent
}if(A.type==="touchstart"){A=A.touches[A.touches.length-1]
}else{if(A.type==="touchend"){A=A.changedTouches[0]
}}}return A
}function j(B){var D=B||window.event,C=document.documentElement,A=document.body;
if(o(D)){D=D.originalEvent
}if(typeof B==="undefined"||typeof D.target==="undefined"){D.target=D.srcElement||window.window;
D.timeStamp=Number(new Date());
if(D.pageX===null||typeof D.pageX==="undefined"){D.pageX=D.clientX+((C&&C.scrollLeft)||(A&&A.scrollLeft)||0)-((C&&C.clientLeft)||(A&&A.clientLeft)||0);
D.pageY=D.clientY+((C&&C.scrollTop)||(A&&A.scrollTop)||0)-((C&&C.clientTop)||(A&&A.clientTop)||0)
}D.preventDefault=function(){this.returnValue=false
};
D.stopPropagation=function(){this.cancelBubble=true
}
}return D
}function p(B){var A=null;
if(!B){return null
}if(B.srcElement){A=B.srcElement
}else{A=B.target;
if(!A){A=B.explicitOriginalTarget
}if(!A){A=B.originalTarget
}}if(!A&&B.type.indexOf("touch")===0){A=k(B).target
}while(A&&v[A.tagName]){A=A.parentNode
}if(!A&&B.srcElement===null){A=window.window
}return A
}function g(B){var E=0,D=0,C=document.documentElement,A=document.body;
B=k(B);
if(B!==null){if(B.pageX&&B.pageY&&B.pageX>0&&B.pageY>0){E=B.pageX;
D=B.pageY
}else{if(B.clientX&&B.clientY){E=B.clientX+((C&&C.scrollLeft)||(A&&A.scrollLeft)||0)-((C&&C.clientLeft)||(A&&A.clientLeft)||0);
D=B.clientY+((C&&C.scrollTop)||(A&&A.scrollTop)||0)-((C&&C.clientTop)||(A&&A.clientTop)||0)
}}}return{x:E,y:D}
}d.xpath=function(H,J){var F=t.parse(H),A,G=null,D,C,B,E,I;
J=typeof J!=="undefined"?J:document;
A=J;
if(!F){return null
}for(D=0,E=F.length;
D<E&&A;
D+=1){G=F[D];
if(G.length===1){A=J.getElementById(G[0])
}else{for(C=0,B=-1,I=A.childNodes.length;
C<I;
C+=1){if(A.childNodes[C].nodeType===1&&A.childNodes[C].tagName.toUpperCase()===G[0]){B+=1;
if(B===G[1]){A=A.childNodes[C];
break
}}}if(B===-1){return null
}}}return A===J||!A?null:A
};
function y(A,B){this.x=A||0;
this.y=B||0
}function s(B,A){this.width=B||0;
this.height=A||0
}function b(B,C){var E,A,D;
C=p(B);
E=this.examineID(C);
A=this.examineType(C,B);
D=this.examinePosition(B,C);
this.element=C;
this.id=E.id;
this.idType=E.type;
this.type=A.type;
this.subType=A.subType;
this.state=this.examineState(C);
this.position=new y(D.x,D.y);
this.size=new s(D.width,D.height);
this.xPath=E.xPath;
this.name=E.name
}b.HTML_ID=-1;
b.XPATH_ID=-2;
b.ATTRIBUTE_ID=-3;
b.prototype.examineID=function(G){var C,I,J,A,B,E=a.length,D;
try{J=c(G)
}catch(F){}B=G.name;
try{if(!r.utils.isIFrameDescendant(G)){if(q(G)){C=G.id;
I=b.HTML_ID
}else{if(a.length&&G.attributes){while(E){E-=1;
D=G.attributes[a[E]];
if(typeof D!=="undefined"){C=a[E]+"="+(D.value||D);
I=b.ATTRIBUTE_ID
}}}}}}catch(H){}if(!C){C=J;
I=b.XPATH_ID
}return{id:C,type:I,xPath:J,name:B}
};
b.prototype.examineType=function(B,A){var C="";
if(A.type==="change"){if(B.tagName==="TEXTAREA"||(B.tagName==="INPUT"&&B.type==="text")){C="textChange"
}else{C="valueChange"
}}else{C=A.type
}return{type:A.type,subType:C}
};
b.prototype.examineState=function(G){var A={a:["innerText","href"],input:{range:["maxValue:max","value"],checkbox:["value","checked"],radio:["value","checked"],image:["src"]},select:["value"],button:["value","innerText"],textarea:["value"]},B=typeof G.tagName!=="undefined"?G.tagName.toLowerCase():"",H=A[B]||null,C=null,J=null,D=0,F=0,E=null,I="";
if(H!==null){if(Object.prototype.toString.call(H)==="[object Object]"){H=H[G.type]||["value"]
}J={};
for(I in H){if(H.hasOwnProperty(I)){if(H[I].indexOf(":")!==-1){E=H[I].split(":");
J[E[0]]=G[E[1]]
}else{if(H[I]==="innerText"){J[H[I]]=G.innerText||G.textContent
}else{J[H[I]]=G[H[I]]
}}}}}if(B==="select"&&G.options&&!isNaN(G.selectedIndex)){J.index=G.selectedIndex;
if(J.index>=0&&J.index<G.options.length){C=G.options[G.selectedIndex];
J.value=C.getAttribute("value")||C.getAttribute("label")||C.text||C.innerText;
J.text=C.text||C.innerText
}}return J
};
function l(){var B=1,C,E,A;
if(document.body.getBoundingClientRect){try{C=document.body.getBoundingClientRect()
}catch(D){r.utils.clog("getBoundingClientRect failed.",D);
return B
}E=C.right-C.left;
A=document.body.offsetWidth;
B=Math.round((E/A)*100)/100
}return B
}function f(B){var D,A,C;
if(typeof B==="undefined"||B===null||!B.getBoundingClientRect){return{x:0,y:0,width:0,height:0}
}try{D=B.getBoundingClientRect()
}catch(E){r.utils.clog("getBoundingClientRect failed.",E);
return{x:0,y:0,width:0,height:0}
}A={x:D.left,y:D.top,width:D.right-D.left,height:D.bottom-D.top};
if(r.utils.isIE){A.x-=document.documentElement.clientLeft;
A.y-=document.documentElement.clientTop;
C=l();
if(C!==1){A.x=Math.round(A.x/C);
A.y=Math.round(A.y/C);
A.width=Math.round(A.width/C);
A.height=Math.round(A.height/C)
}}return A
}b.prototype.examinePosition=function(B,C){var D=g(B),A=f(C);
A.x=D.x!==0&&D.y!==0?Math.round(Math.abs(D.x-A.x)):A.width/2;
A.y=D.x!==0&&D.y!==0?Math.round(Math.abs(D.y-A.y)):A.height/2;
return A
};
function i(A){var B;
this.data=A.data||null;
this.delegateTarget=A.delegateTarget||null;
A=j(A);
B=g(A);
this.custom=false;
this.nativeEvent=this.custom===true?null:A;
this.position=new y(B.x,B.y);
this.target=new b(A,A.target);
this.timestamp=(new Date()).getTime();
this.type=A.type;
switch(this.type){case"focusin":this.type="focus";
break;
case"focusout":this.type="blur";
break;
default:break
}}function z(A){r._publishEvent(new i(A))
}return{init:function(){if(!n){m()
}else{}},destroy:function(){u()
},WebEvent:i,ElementData:b,processDOMEvent:z,queryDom:d}
});
TLT.addService("browser",function(core){var configService=core.getService("config"),browserBaseService=core.getService("browserBase"),ajaxService=core.getService("ajax"),addEventListener=null,removeEventListener=null,serviceConfig=configService.getServiceConfig("browser")||{},useCapture=(serviceConfig.useCapture===true),isInitialized=false,errorCodes={NO_QUERY_SELECTOR:"NOQUERYSELECTOR"},wrapWebEvent=function(handler){return function(event){handler(new browserBaseService.WebEvent(event))
}
},loadScript=function(url){var fjs=document.getElementsByTagName("script")[0],js=document.createElement("script");
js.src=url;
fjs.parentNode.insertBefore(js,fjs)
},queryDom={list2Array:function(nodeList){var len=nodeList.length,result=[],i;
if(typeof nodeList.length==="undefined"){return[nodeList]
}for(i=0;
i<len;
i+=1){result[i]=nodeList[i]
}return result
},find:function(query,scope,type){type=type||"css";
return this.list2Array(this[type](query,scope))
},css:function(query,scope){var self=this,message=null,bodyEl=document.getElementsByTagName("body")[0],bConfig=configService.getServiceConfig("browser")||{},sizzleURL=bConfig.sizzleURL||null,jQuery=bConfig.hasOwnProperty("jQueryObject")?core.utils.access(bConfig.jQueryObject):window.jQuery,sizzle=bConfig.hasOwnProperty("sizzleObject")?core.utils.access(bConfig.sizzleObject):window.Sizzle;
if(typeof document.querySelectorAll==="undefined"){self.css=function(query,scope){scope=scope||document;
return self.Sizzle(query,scope)
};
if(typeof self.Sizzle==="undefined"){if(sizzleURL){message={type:"GET",url:sizzleURL,async:false,oncomplete:function(result){function define(definition){self.Sizzle=definition()
}define.amd=true;
eval(result.responseText)
}};
ajaxService.sendRequest(message)
}else{try{if(bodyEl===sizzle("html > body",document)[0]){self.Sizzle=sizzle
}}catch(e){try{if(bodyEl===jQuery(document).find("html > body").get()[0]){self.Sizzle=function(query,scope){return jQuery(scope).find(query).get()
}
}}catch(ex){core.fail("Sizzle was not found",errorCodes.NO_QUERY_SELECTOR)
}}}}}else{self.css=function(query,scope){scope=scope||document;
return scope.querySelectorAll(query)
}
}return self.css(query,scope)
}},handlerMappings=(function(){var data=new core.utils.WeakMap();
return{add:function(originalHandler){var handlers=data.get(originalHandler)||[wrapWebEvent(originalHandler),0];
handlers[1]+=1;
data.set(originalHandler,handlers);
return handlers[0]
},find:function(originalHandler){var handlers=data.get(originalHandler);
return handlers?handlers[0]:null
},remove:function(originalHandler){var handlers=data.get(originalHandler);
if(handlers){handlers[1]-=1;
if(handlers[1]<=0){data.remove(originalHandler)
}}}}
}());
function initBrowserServiceW3C(){queryDom.xpath=browserBaseService.queryDom.xpath;
if(typeof document.addEventListener==="function"){addEventListener=function(target,eventName,handler){target.addEventListener(eventName,handler,useCapture)
};
removeEventListener=function(target,eventName,handler){target.removeEventListener(eventName,handler,useCapture)
}
}else{if(typeof document.attachEvent!=="undefined"){addEventListener=function(target,eventName,handler){target.attachEvent("on"+eventName,handler)
};
removeEventListener=function(target,eventName,handler){target.detachEvent("on"+eventName,handler)
}
}else{throw new Error("Unsupported browser")
}}isInitialized=true
}return{init:function(){if(!isInitialized){initBrowserServiceW3C()
}else{}},destroy:function(){isInitialized=false
},getServiceName:function(){return"W3C"
},query:function(query,scope,type){return queryDom.find(query,scope,type)[0]||null
},queryAll:function(query,scope,type){return queryDom.find(query,scope,type)
},loadScript:function(url){loadScript(url)
},subscribe:function(eventName,target,handler){var wrappedHandler=handlerMappings.add(handler);
addEventListener(target,eventName,wrappedHandler)
},unsubscribe:function(eventName,target,handler){var wrappedHandler=handlerMappings.find(handler);
if(wrappedHandler){try{removeEventListener(target,eventName,wrappedHandler)
}catch(e){}handlerMappings.remove(handler)
}}}
});
TLT.addService("ajax",function(b){var a,e=function(j){var i="",h=[];
for(i in j){if(j.hasOwnProperty(i)){h.push([i,j[i]])
}}return h
},d=false;
function c(k){k=k.split("\n");
var m={},j=0,h=k.length,l=null;
for(j=0;
j<h;
j+=1){l=k[j].split(": ");
m[l[0]]=l[1]
}return m
}function g(q){var p=a(),j=[["X-Requested-With","XMLHttpRequest"]],o=0,k=typeof q.async!=="boolean"?true:q.async,m="",n=null,l,h;
if(q.headers){j=j.concat(e(q.headers))
}if(q.contentType){j.push(["Content-Type",q.contentType])
}p.open(q.type.toUpperCase(),q.url,k);
for(l=0,h=j.length;
l<h;
l+=1){m=j[l];
if(m[0]&&m[1]){p.setRequestHeader(m[0],m[1])
}}p.onreadystatechange=n=function(){if(p.readyState===4){p.onreadystatechange=n=function(){};
if(q.timeout){window.clearTimeout(o)
}q.oncomplete({headers:c(p.getAllResponseHeaders()),responseText:(p.responseText||null),statusCode:p.status,success:(p.status===200)});
p=null
}};
p.send(q.data||null);
n();
if(q.timeout){o=window.setTimeout(function(){if(!p){return
}p.onreadystatechange=function(){};
if(p.readyState!==4){p.abort()
}p=null
},q.timeout)
}}function f(){if(typeof window.XMLHttpRequest!=="undefined"){a=function(){return new XMLHttpRequest()
}
}else{a=function(){return new ActiveXObject("Microsoft.XMLHTTP")
}
}d=true
}return{init:function(){if(!d){f()
}},destroy:function(){d=false
},sendRequest:function(h){h.type=h.type||"POST";
g(h)
}}
});
TLT.addService("message",function(C){var y=null,i=0,f=0,A=new Date(),e=new Date(),m=C.getService("browserBase"),B=C.getService("browser"),F=C.getService("config"),G=F.getServiceConfig("message")||{},x=window.location.href,l="TODO",n="ID"+e.getHours()+"H"+e.getMinutes()+"M"+e.getSeconds()+"S"+e.getMilliseconds()+"R"+Math.random(),H=G.hasOwnProperty("privacy")?G.privacy:[],h={},q={lower:"x",upper:"X",numeric:"9",symbol:"@"},g=navigator.userAgent.indexOf("iPhone")>-1||navigator.userAgent.indexOf("iPod")>-1||navigator.userAgent.indexOf("iPad")>-1,z=window.devicePixelRatio||1,s=window.screen?window.screen.width:0,r=window.screen?window.screen.height:0,j=window.orientation||0,d=g?s:s<=320?s:s/z,D=g?r:s<=320?r:r/z,c=(window.screen===null?0:window.screen.height-window.screen.availHeight),p=window.innerWidth||document.documentElement.clientWidth,t=window.innerHeight||document.documentElement.clientHeight,w=false;
function a(J){var I="";
this.type=J.type;
this.offset=(new Date()).getTime()-A.getTime();
if((J.type===2)||(y===null)){y=new Date()
}this.screenviewOffset=(new Date()).getTime()-y.getTime();
this.count=(f+=1);
this.fromWeb=true;
for(I in J){if(J.hasOwnProperty(I)){this[I]=J[I]
}}}h.PVC_MASK_EMPTY=function(I){return""
};
h.PVC_MASK_BASIC=function(J){var I="XXXXX";
if(typeof J!=="string"){return""
}return(J.length?I:"")
};
h.PVC_MASK_TYPE=function(M){var J,L=0,I=0,K="";
if(typeof M!=="string"){return K
}J=M.split("");
for(L=0,I=J.length;
L<I;
L+=1){if(C.utils.isNumeric(J[L])){K+=q.numeric
}else{if(C.utils.isUpperCase(J[L])){K+=q.upper
}else{if(C.utils.isLowerCase(J[L])){K+=q.lower
}else{K+=q.symbol
}}}}return K
};
h.PVC_MASK_EMPTY.maskType=1;
h.PVC_MASK_BASIC.maskType=2;
h.PVC_MASK_TYPE.maskType=3;
h.PVC_MASK_CUSTOM={maskType:4};
function v(I,K){var J=h.PVC_MASK_BASIC;
if(I.maskType===h.PVC_MASK_EMPTY.maskType){J=h.PVC_MASK_EMPTY
}else{if(I.maskType===h.PVC_MASK_BASIC.maskType){J=h.PVC_MASK_BASIC
}else{if(I.maskType===h.PVC_MASK_TYPE.maskType){J=h.PVC_MASK_TYPE
}else{if(I.maskType===h.PVC_MASK_CUSTOM.maskType){if(typeof I.maskFunction==="string"){J=C.utils.access(I.maskFunction)
}else{J=I.maskFunction
}if(typeof J!=="function"){J=h.PVC_MASK_BASIC
}}}}}if(typeof K.target.prevState!=="undefined"&&K.target.prevState.hasOwnProperty("value")){K.target.prevState.value=J(K.target.prevState.value)
}if(typeof K.target.currState!=="undefined"&&K.target.currState.hasOwnProperty("value")){K.target.currState.value=J(K.target.currState.value)
}}function u(O,P){var M,L,Q,I,K,R,N,J;
for(M=0,N=O.length;
M<N;
M+=1){J=O[M];
if(typeof J==="string"){Q=B.queryAll(J);
for(L=0,I=Q?Q.length:0;
L<I;
L+=1){if(Q[L]){K=m.ElementData.prototype.examineID(Q[L]);
if(K.type===P.idType&&K.id===P.id){return true
}}}}else{if(J.id&&J.idType&&P.idType.toString()===J.idType.toString()){switch(typeof J.id){case"string":if(J.id===P.id){return true
}break;
case"object":R=new RegExp(J.id.regex,J.id.flags);
if(R.test(P.id)){return true
}break
}}}}return false
}function b(L){var K,I,J;
if(!L||!L.hasOwnProperty("target")){return L
}for(K=0,I=H.length;
K<I;
K+=1){J=H[K];
if(u(J.targets,L.target)){v(J,L);
break
}}return L
}function k(){F=C.getService("config");
G=F.getServiceConfig("message")||{};
H=G.hasOwnProperty("privacy")?G.privacy:[]
}function o(){if(F.subscribe){F.subscribe("configupdated",k)
}w=true
}function E(){F.unsubscribe("configupdated",k);
w=false
}return{init:function(){if(!w){o()
}else{}},destroy:function(){E()
},createMessage:function(I){if(typeof I.type==="undefined"){throw new TypeError("Invalid queueEvent given!")
}return b(new a(I))
},wrapMessages:function(J){var I={messageVersion:"2.2.0.0",serialNumber:(i+=1),sessions:[{id:n,startTime:e.getTime(),timezoneOffset:e.getTimezoneOffset(),messages:J,clientEnvironment:{webEnvironment:{libVersion:"3.0.1.1068",page:x,windowId:l,screen:{devicePixelRatio:z,deviceOriginalWidth:g?s*z:s,deviceOriginalHeight:g?r*z:r,deviceWidth:d,deviceHeight:D,deviceToolbarHeight:c,width:p,height:t,orientation:j}}}}]},K=I.sessions[0].clientEnvironment.webEnvironment.screen;
K.orientationMode=C.utils.getOrientationMode(K.orientation);
return I
}}
});
TLT.addService("serializer",function(core){function serializeToJSON(obj){var str,key,len=0;
if(typeof obj!=="object"||obj===null){switch(typeof obj){case"function":case"undefined":return"null";
case"string":return'"'+obj.replace(/\"/g,'\\"')+'"';
default:return String(obj)
}}else{if(Object.prototype.toString.call(obj)==="[object Array]"){str="[";
for(key=0,len=obj.length;
key<len;
key+=1){if(Object.prototype.hasOwnProperty.call(obj,key)){str+=serializeToJSON(obj[key])+","
}}}else{str="{";
for(key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){str=str.concat('"',key,'":',serializeToJSON(obj[key]),",");
len+=1
}}}}if(len>0){str=str.substring(0,str.length-1)
}str+=String.fromCharCode(str.charCodeAt(0)+2);
return str
}var configService=core.getService("config"),serialize={},parse={},defaultSerializers={json:(function(){if(typeof window.JSON!=="undefined"){return{serialize:window.JSON.stringify,parse:window.JSON.parse}
}return{serialize:serializeToJSON,parse:function(data){return eval("("+data+")")
}}
}())},updateConfig=null,isInitialized=false;
function addObjectIfExist(paths,rootObj,propertyName){var i,len,obj;
paths=paths||[];
for(i=0,len=paths.length;
i<len;
i+=1){obj=paths[i];
if(typeof obj==="string"){obj=core.utils.access(obj)
}if(typeof obj==="function"){rootObj[propertyName]=obj;
break
}}}function initSerializerService(config){var format;
for(format in config){if(config.hasOwnProperty(format)){addObjectIfExist(config[format].stringifiers,serialize,format);
addObjectIfExist(config[format].parsers,parse,format)
}}if(!(config.json&&config.json.hasOwnProperty("defaultToBuiltin"))||config.json.defaultToBuiltin===true){serialize.json=serialize.json||defaultSerializers.json.serialize;
parse.json=parse.json||defaultSerializers.json.parse
}if(typeof serialize.json!=="function"||typeof parse.json!=="function"){core.fail("JSON parser and/or serializer not provided in the UIC config. Can't continue.")
}if(configService.subscribe){configService.subscribe("configupdated",updateConfig)
}isInitialized=true
}function destroy(){serialize={};
parse={};
configService.unsubscribe("configupdated",updateConfig);
isInitialized=false
}updateConfig=function(){configService=core.getService("config");
initSerializerService(configService.getServiceConfig("serializer")||{})
};
return{init:function(){if(!isInitialized){initSerializerService(configService.getServiceConfig("serializer")||{})
}else{}},destroy:function(){destroy()
},parse:function(data,type){type=type||"json";
return parse[type](data)
},serialize:function(data,type){type=type||"json";
return serialize[type](data)
}}
});
if(TLT&&typeof TLT.addModule==="function"){TLT.addModule("overstat",function(b){var i={},f=null,a=250,e=100;
function g(j){b.post(j)
}function d(m,l){var k,j;
if(!m||typeof m!=="object"){return null
}j=l.split(".");
for(k=0;
k<j.length;
k+=1){if((typeof m==="undefined")||(m[j[k]]===null)){return null
}m=m[j[k]]
}return m
}function h(){var k=b.getConfig()||{},j=k.hoverThreshold;
j=typeof j!=="number"?a:(j<e?e:j);
return j
}function c(m,l){var p=null,k=d(m,"target.id"),n=0,o=null,j=null;
if(!k){return
}if(f===null){f=h()
}if(m.type==="mouseover"){i[k]=i[k]||{clickOccurred:false};
i[k].timestamp=m.timestamp;
return
}p=i[k];
if(!p||!p.timestamp){return
}n=Math.abs(m.timestamp-p.timestamp);
if(m.type==="mouseout"){delete p.timestamp;
p.clickOccurred=false;
if(n>=f){o={type:4,event:{type:m.type,tlEvent:"hover"},target:{id:d(m,"target.id"),idType:d(m,"target.idType"),currState:{hoverTime:n}}};
g(o)
}return
}if(m.type==="click"&&n>=f&&!p.clickOccurred){p.clickOccurred=true;
o={type:4,event:{type:m.type,tlEvent:"hoverToClick"},target:{id:d(m,"target.id"),idType:d(m,"target.idType"),currState:{hoverTime:n}}};
g(o);
return
}}return{init:function(){},destroy:function(){},onevent:function(j){if(typeof j!=="object"||!j.type){return
}switch(j.type){case"mouseover":c(j);
break;
case"mouseout":c(j);
break;
case"click":c(j);
break;
default:break
}},onmessage:function(j){}}
})
}else{}if(TLT&&typeof TLT.addModule==="function"){TLT.addModule("performance",function(f){var h={loadReceived:false,unloadReceived:false,perfEventSent:false},g=0;
function b(j,i){if(typeof j!=="string"){return false
}if(!i||typeof i!=="object"){return false
}return(i[j]===true)
}function e(k,i){var m=0,j={},n="",l=0;
if(!k||typeof k!=="object"||!k.navigationStart){return{}
}m=k.navigationStart;
for(n in k){if(Object.prototype.hasOwnProperty.call(k,n)||typeof k[n]==="number"){if(!b(n,i)){l=k[n];
if(typeof l==="number"&&l){j[n]=l-m
}else{j[n]=l
}}}}return j
}function d(l){var m=0,k,j,i=f.utils;
if(l){k=(l.responseEnd>0&&l.responseEnd<l.domLoading)?l.responseEnd:l.domLoading;
j=l.loadEventStart;
if(i.isNumeric(k)&&i.isNumeric(j)&&j>k){m=j-k
}}return m
}function c(j){var i=f.getStartTime();
if(j.timestamp>i&&!g){g=j.timestamp-i
}}function a(m){var k=f.getConfig()||{},j="UNKNOWN",n={type:7,performance:{}},i,o,l;
if(!m||h.perfEventSent){return
}o=m.performance||{};
l=o.timing;
i=o.navigation;
if(l){n.performance.timing=e(l,k.filter);
n.performance.timing.renderTime=d(l)
}else{if(k.calculateRenderTime){n.performance.timing={renderTime:g,calculated:true}
}else{return
}}if(i){switch(i.type){case 0:j="NAVIGATE";
break;
case 1:j="RELOAD";
break;
case 2:j="BACKFORWARD";
break;
default:j="UNKNOWN";
break
}n.performance.navigation={type:j,redirectCount:i.redirectCount}
}f.post(n);
h.perfEventSent=true
}return{init:function(){},destroy:function(){},onevent:function(i){if(typeof i!=="object"||!i.type){return
}switch(i.type){case"load":h.loadReceived=true;
c(i);
break;
case"unload":h.unloadReceived=true;
if(!h.perfEventSent){a(window)
}break;
default:break
}},onmessage:function(i){}}
})
}else{}TLT.addModule("replay",function(ag){var A={"input:radio":"radioButton","input:checkbox":"checkBox","input:text":"textBox","input:password":"textBox","input:file":"fileInput","input:button":"button","input:submit":"submitButton","input:reset":"resetButton","input:image":"image","input:color":"color","input:date":"date","input:datetime":"datetime","input:datetime-local":"datetime-local","input:number":"number","input:email":"email","input:tel":"tel","input:search":"search","input:url":"url","input:time":"time","input:week":"week","input:month":"month","textarea:":"textBox","select:":"selectList","button:":"button","a:":"link"},K=window.orientation||0,ad={scale:0,timestamp:0},Y={},B=window.location.hash,F=null,e=[],Z=0,ab=null,z=null,k=0,T="",x="",O=(new Date()).getTime(),j=0,Q=null,ae=null,P=null,W=0,u=0,ac=null,t={inFocus:false},L=null,y=navigator.userAgent.indexOf("iPhone")>-1||navigator.userAgent.indexOf("iPod")>-1||navigator.userAgent.indexOf("iPad")>-1,p=window.devicePixelRatio||1,o=(window.screen===null?0:window.screen.width),E=(window.screen===null?0:window.screen.height),U=(window.screen===null?0:window.screen.height-window.screen.availHeight),J=ag.getConfig(),R;
function I(ak,aj){var ai,ah;
if(!ak||typeof ak!=="object"){return null
}ah=aj.split(".");
for(ai=0;
ai<ah.length;
ai+=1){if((typeof ak==="undefined")||(ak[ah[ai]]===null)){return null
}ak=ak[ah[ai]]
}return ak
}function g(ai){var ah=[];
ai=ai.parentNode;
while(ai){ah.push(ai);
ai=ai.parentNode
}return ah
}function v(ah){return ag.utils.some(ah,function(ai){if(ai.tagName==="A"||ai.tagName==="BUTTON"){return ai
}return null
})
}function m(ah){var ai=ah.type;
if(typeof ai==="string"){ai=ai.toLowerCase()
}else{ai="unknown"
}if(ai==="blur"){ai="focusout"
}return ai
}function X(ap){var aj,ai=I(ap,"webEvent.target.element.tagName"),ak=ai.toLowerCase()==="input"?I(ap,"webEvent.target.element.type"):"",ah=A[ai.toLowerCase()+":"+ak]||ai,am=g(I(ap,"webEvent.target.element")),ao=null,al=I(ap,"webEvent.target.position.relXY"),an=I(ap,"webEvent.target.subtype");
aj={type:4,target:{id:ap.id||"",idType:I(ap,"webEvent.target.idType"),name:I(ap,"webEvent.target.name"),tlType:ah,type:ai,subType:ak,position:{width:I(ap,"webEvent.target.element.offsetWidth"),height:I(ap,"webEvent.target.element.offsetHeight")},currState:ap.currState||null},event:{tlEvent:m(I(ap,"webEvent")),type:I(ap,"webEvent.target.type")}};
if(al){aj.target.position.relXY=al
}if(typeof ap.dwell==="number"&&ap.dwell>0){aj.target.dwell=ap.dwell
}if(typeof ap.visitedCount==="number"){aj.target.visitedCount=ap.visitedCount
}if(typeof ap.prevState!=="undefined"){aj.prevState=ap.prevState
}if(typeof an!=="undefined"){aj.event.subType=an
}aj.target.name=I(ap,"webEvent.target.name");
ao=v(am);
aj.target.isParentLink=!!ao;
if(ao){if(ao.href){aj.target.currState=aj.target.currState||{};
aj.target.currState.href=aj.target.currState.href||ao.href
}if(ao.value){aj.target.currState=aj.target.currState||{};
aj.target.currState.value=aj.target.currState.value||ao.value
}if(ao.innerText||ao.textContent){aj.target.currState=aj.target.currState||{};
aj.target.currState.innerText=aj.target.currState.innerText||ao.innerText||ao.textContent
}}return aj
}function C(ah){ag.post(ah)
}function H(al){var aj=0,ah,am=al.length,ao,an,ak,ap={mouseout:true,mouseover:true},ai=[];
for(aj=0;
aj<am;
aj+=1){ao=al[aj];
if(!ao){continue
}if(ap[ao.event.type]){ai.push(ao)
}else{for(ah=aj+1;
ah<am&&al[ah];
ah+=1){if(!ap[al[ah].event.type]){break
}}if(ah<am){an=al[ah];
if(an&&ao.target.id===an.target.id&&ao.event.type!==an.event.type){if(ao.event.type==="click"){ak=ao;
ao=an;
an=ak
}if(an.event.type==="click"){ao.target.position=an.target.position;
aj+=1
}else{if(an.event.type==="blur"){ao.target.dwell=an.target.dwell;
ao.target.visitedCount=an.target.visitedCount;
ao.focusInOffset=an.focusInOffset;
ao.target.position=an.target.position;
aj+=1
}}al[ah]=null;
al[aj]=ao
}}ai.push(al[aj])
}}for(ao=ai.shift();
ao;
ao=ai.shift()){ag.post(ao)
}al.splice(0,al.length)
}if(typeof window.onerror!=="function"){window.onerror=function(ak,aj,ah){var ai=null;
if(typeof ak!=="string"){return
}ah=ah||-1;
ai={type:6,exception:{description:ak,url:aj,line:ah}};
k+=1;
ag.post(ai)
}
}function n(ai,ah){t=ah;
t.inFocus=true;
if(typeof Y[ai]==="undefined"){Y[ai]={}
}Y[ai].focus=t.dwellStart=Number(new Date());
Y[ai].focusInOffset=P?t.dwellStart-Number(P):-1;
Y[ai].prevState=I(ah,"target.state");
Y[ai].visitedCount=Y[ai].visitedCount+1||1
}function V(ah,ai){e.push(X({webEvent:ah,id:ai,currState:I(ah,"target.state")}))
}function q(aj){var ah=false,ai="|button|image|submit|reset|checkbox|radio|",ak=null;
if(typeof aj!=="object"||!aj.type){return ah
}switch(aj.type){case"INPUT":ak="|"+(aj.subType||"")+"|";
if(ai.indexOf(ak.toLowerCase())===-1){ah=false
}else{ah=true
}break;
case"TEXTAREA":ah=false;
break;
default:ah=true;
break
}return ah
}function d(aj,ai){var ah;
if(typeof aj==="undefined"||aj===null||typeof ai==="undefined"||ai===null){return
}t.inFocus=false;
if(typeof Y[aj]!=="undefined"&&Y[aj].hasOwnProperty("focus")){Y[aj].dwell=Number(new Date())-Y[aj].focus
}else{Y[aj]={};
Y[aj].dwell=0
}if(e.length===0){ai.type=ai.target.type="blur";
V(ai,aj)
}ah=e[e.length-1];
if(ah){ah.target.dwell=Y[aj].dwell;
ah.focusInOffset=Y[aj].focusInOffset;
ah.target.visitedCount=Y[aj].visitedCount;
if(ah.event.type==="click"&&!q(ah.target)){ah.event.type="blur";
ah.event.tlEvent="focusout"
}}H(e)
}function l(aj,ai){var ah=false;
if(e.length>0&&e[e.length-1]&&e[e.length-1].target.id!==aj&&ai.type!=="scroll"&&ai.type!=="resize"&&ai.type!=="mouseout"&&ai.type!=="mouseover"&&(e[e.length-1].target.tlType!=="textBox"&&e[e.length-1].target.tlType!=="selectList")){d(e[e.length-1].target.id,e[e.length-1]);
ah=true
}return ah
}function c(ai,ah){if(typeof Y[ai]!=="undefined"&&!Y[ai].hasOwnProperty("focus")){n(ai,ah)
}V(ah,ai);
if(typeof Y[ai]!=="undefined"&&typeof Y[ai].prevState!=="undefined"){if(e[e.length-1].target.tlType==="textBox"||e[e.length-1].target.tlType==="selectList"){e[e.length-1].target.prevState=Y[ai].prevState
}}}function D(aj){var ai=aj.target.position.x,an=aj.target.position.y,ak=aj.target.size.width,ah=aj.target.size.height,am=Math.abs(ai/ak).toFixed(1),al=Math.abs(an/ah).toFixed(1);
am=am>1||am<0?0.5:am;
al=al>1||al<0?0.5:al;
return am+","+al
}function b(al,aj){var ai,ah=true,ak=0;
if(aj.target.element.tagName==="SELECT"&&L&&L.target.id===al){L=null;
return
}if(!t.inFocus){n(al,aj)
}ak=e.length;
if(ak&&I(e[ak-1],"event.type")!=="change"){c(al,aj)
}ai=D(aj);
ak=e.length;
if(aj.position.x===0&&aj.position.y===0&&ak&&I(e[ak-1],"target.tlType")==="radioButton"){ah=false
}else{aj.target.position.relXY=ai
}if(ak&&I(e[ak-1],"target.id")===al){if(ah){e[ak-1].target.position.relXY=ai
}}else{V(aj,al)
}L=aj
}function aa(){var ah=window.orientation||0;
return ah
}function a(ai){var ah=aa(),aj={type:4,event:{type:"orientationchange"},target:{prevState:{orientation:K,orientationMode:ag.utils.getOrientationMode(K)},currState:{orientation:ah,orientationMode:ag.utils.getOrientationMode(ah)}}};
C(aj);
K=ah
}function af(ai){var ah=false;
if(!ai){return ah
}ah=(ad.scale===ai.scale&&Math.abs((new Date()).getTime()-ad.timestamp)<500);
return ah
}function i(ah){ad.scale=ah.scale;
ad.rotation=ah.rotation;
ad.timestamp=(new Date()).getTime()
}function N(aj){var ah,ai="INVALID";
if(typeof aj==="undefined"||aj===null){return ai
}ah=Number(aj);
if(isNaN(ah)){ai="INVALID"
}else{if(ah<1){ai="CLOSE"
}else{if(ah>1){ai="OPEN"
}else{ai="NONE"
}}}return ai
}function h(aj){var ai={},ak=I(aj,"nativeEvent.rotation")||0,al=I(aj,"nativeEvent.scale")||1,ah=null,am={type:4,event:{type:"touchend"},target:{id:I(aj,"target.id"),idType:I(aj,"target.idType")}};
if((y&&(!al||al===1))||(!y&&aj.nativeEvent.touches.length<=1)){return
}ah={rotation:ak?ak.toFixed(2):0,scale:al?al.toFixed(2):1};
ah.pinch=N(ah.scale);
if(af(ah)){return
}if(ad&&ad.timestamp){ai.rotation=ad.rotation;
ai.scale=ad.scale;
ai.pinch=N(ai.scale)
}if(I(ai,"scale")){am.target.prevState=ai
}am.target.currState=ah;
C(am);
i(ah)
}function S(ai){var ah={type:1,clientState:{pageWidth:document.width||(document.documentElement===null?0:document.documentElement.offsetWidth),pageHeight:Math.max((typeof document.height==="undefined"?0:document.height),(typeof document.documentElement==="undefined"?0:document.documentElement.offsetHeight),(typeof document.documentElement==="undefined"?0:document.documentElement.scrollHeight)),viewPortWidth:window.innerWidth||document.documentElement.clientWidth,viewPortHeight:window.innerHeight||document.documentElement.clientHeight,viewPortX:window.pageXOffset||(document.body===null?0:document.body.scrollLeft),viewPortY:window.pageYOffset||(document.body===null?0:document.body.scrollTop),deviceOrientation:window.orientation||0,event:I(ai,"type")}},aj=1,ak=1;
if(Math.abs(ah.clientState.deviceOrientation)===90){if(y){aj=E-U
}else{aj=o<=320?E-U:((E/p)-U)
}}else{if(y){aj=o+U
}else{aj=o<=320?o-U:((o/p)-U)
}}ak=(ah.clientState.viewPortWidth===0?1:aj/ah.clientState.viewPortWidth);
ah.clientState.deviceScale=ak-0.02;
ah.clientState.deviceScale=ah.clientState.deviceScale.toFixed(3);
ah.clientState.viewTime=ae===null?0:(new Date()).getTime()-ae.getTime();
if(ai.type==="scroll"&&Z<=0){W=z.clientState.viewPortX;
u=z.clientState.viewPortY
}if(ai.type==="scroll"){ah.clientState.viewPortXStart=W;
ah.clientState.viewPortYStart=u
}ab=ag.utils.clone(ah);
return ah
}function w(){if(ab!==null&&ab.clientState.event!=="load"){if(ab.clientState.event==="scroll"){delete ab.clientState.viewPortXStart;
delete ab.clientState.viewPortYStart
}ab.clientState.event="attention";
ab.clientState.viewTime=P===null?0:(new Date()).getTime()-P.getTime();
C(ab);
P=new Date();
return true
}return false
}function r(ah){if((ah.clientState.event==="scroll")&&(ah.clientState.viewPortXStart===ah.clientState.viewPortX)&&(ah.clientState.viewPortYStart===ah.clientState.viewPortY)){return false
}return true
}function G(ai){var ah=ac===null?0:(new Date()).getTime()-ac.getTime();
if(ab!==null&&(ai.type!==ab.clientState.event||ah>=1000)){if(r(ab)){C(ab);
if(ab.clientState.event!=="touchend"){z=ag.utils.clone(ab)
}}ab=null;
ae=null;
Z=0;
return true
}if(ab!==null&&(Z===1&&ah>=1000)&&(ab.clientState.event==="resize"||ab.clientState.event==="scroll"||ab.clientState.event==="orientationchange"||ai.type==="screenview_load")){w()
}return false
}function f(ar,ak){var ao=["type","target.id"],aj=null,al,an,am=true,ap=10,ai=0,aq=0,ah=0;
if(!ar||!ak||typeof ar!=="object"||typeof ak!=="object"){am=false
}for(al=0,an=ao.length;
am&&al<an;
al+=1){aj=ao[al];
if(I(ar,aj)!==I(ak,aj)){am=false;
break
}}if(am){aq=I(ar,"timestamp");
ah=I(ak,"timestamp");
if(!(isNaN(aq)&&isNaN(ah))){ai=Math.abs(I(ar,"timestamp")-I(ak,"timestamp"));
if(isNaN(ai)||ai>ap){am=false
}}}return am
}function M(){var ah=window.location.hash;
if(ah===B){return
}if(B){TLT.logScreenviewUnload(B)
}if(ah){TLT.logScreenviewLoad(ah)
}B=ah
}function s(ah){var ai={type:4,event:{type:ah.type},target:{id:I(ah,"target.id"),idType:I(ah,"target.idType")}};
C(ai)
}return{init:function(){},destroy:function(){d(F)
},onevent:function(ah){var aj=null,ai=null;
if(typeof ah!=="object"||!ah.type){return
}if(f(ah,Q)){Q=ah;
return
}Q=ah;
aj=I(ah,"target.id");
if(Object.prototype.toString.call(Y[aj])!=="[object Object]"){Y[aj]={}
}G(ah);
l(aj,ah);
ac=new Date();
switch(ah.type){case"hashchange":M();
break;
case"focus":ai=n(aj,ah);
break;
case"blur":ai=d(aj,ah);
break;
case"click":ai=b(aj,ah);
break;
case"change":ai=c(aj,ah);
break;
case"orientationchange":ai=a(ah);
break;
case"touchend":ai=h(ah);
ai=S(ah);
break;
case"load":TLT.logScreenviewLoad("root");
ai=S(ah);
P=new Date();
break;
case"screenview_load":P=new Date();
break;
case"screenview_unload":break;
case"resize":case"scroll":if(ae===null&&Z<=0){ae=new Date()
}ai=S(ah);
if(r(ai)){ai=null
}else{Z+=1
}break;
case"unload":if(e!==null){H(e)
}ai=S(ah);
w();
C(ai);
TLT.logScreenviewUnload("root");
break;
default:s(ah);
break
}F=aj;
return ai
},onmessage:function(){}}
});
(function(){var changeTarget;
if(TLT.getFlavor()==="w3c"&&TLT.utils.isLegacyIE){changeTarget="input, select, textarea, button"
}window.TLT.init({core:{moduleBase:"intermediate/modules/",modules:{overstat:{events:[{name:"click",recurseFrames:true},{name:"mouseover",recurseFrames:true},{name:"mouseout",recurseFrames:true}]},performance:{events:[{name:"load",target:window},{name:"unload",target:window}]},replay:{events:[{name:"change",target:changeTarget,recurseFrames:true},{name:"mousedown",recurseFrames:true},{name:"mouseup",recurseFrames:true},{name:"click",recurseFrames:true},{name:"hashchange",target:window},{name:"focus",target:"input, select, textarea, button",recurseFrames:true},{name:"blur",target:"input, select, textarea, button",recurseFrames:true},{name:"load",target:window},{name:"unload",target:window},{name:"resize",target:window},{name:"scroll",target:window},{name:"orientationchange",target:window},{name:"touchstart"},{name:"touchmove"},{name:"touchend"}]}},sessionDataEnabled:false,sessionData:{sessionValueNeedsHashing:true,sessionQueryName:"sessionID",sessionQueryDelim:";",sessionCookieName:"jsessionid"},framesBlacklist:["#iframe1"]},services:{queue:[{qid:"DEFAULT",endpoint:"/utility/tealeaf/tealeafTarget.html",maxEvents:20,timerinterval:30,serializer:"json"}],message:{privacy:[{targets:["input[type=password]"],maskType:3},{targets:[{id:"creditCardNumber",idType:"-1"}],maskType:3}]},serializer:{json:{defaultToBuiltin:true,parsers:["JSON.parse"],stringifiers:["JSON.stringify"]}},browser:{sizzleObject:"window.Sizzle",jQueryObject:"window.jQuery"}},modules:{overstat:{hoverThreshold:1000},performance:{calculateRenderTime:true,filter:{navigationStart:true,unloadEventStart:true,unloadEventEnd:true,redirectStart:true,redirectEnd:true,fetchStart:true,domainLookupStart:true,domainLookupEnd:true,connectStart:true,connectEnd:true,secureConnectionStart:true,requestStart:true,responseStart:true,responseEnd:true,domLoading:true,domInteractive:true,domContentLoadedEventStart:true,domContentLoadedEventEnd:true,domComplete:true,loadEventStart:true,loadEventEnd:true}}}})
}());
if(typeof jwplayer=="undefined"){var jwplayer=function(a){if(jwplayer.api){return jwplayer.api.selectPlayer(a)
}};
var $jw=jwplayer;
jwplayer.version="5.10.2295 (Licensed version)";
jwplayer.vid=document.createElement("video");
jwplayer.audio=document.createElement("audio");
jwplayer.source=document.createElement("source");
(function(b){b.utils=function(){};
b.utils.typeOf=function(d){var c=typeof d;
if(c==="object"){if(d){if(d instanceof Array){c="array"
}}else{c="null"
}}return c
};
b.utils.extend=function(){var c=b.utils.extend["arguments"];
if(c.length>1){for(var e=1;
e<c.length;
e++){for(var d in c[e]){c[0][d]=c[e][d]
}}return c[0]
}return null
};
b.utils.clone=function(f){var c;
var d=b.utils.clone["arguments"];
if(d.length==1){switch(b.utils.typeOf(d[0])){case"object":c={};
for(var e in d[0]){c[e]=b.utils.clone(d[0][e])
}break;
case"array":c=[];
for(var e in d[0]){c[e]=b.utils.clone(d[0][e])
}break;
default:return d[0];
break
}}return c
};
b.utils.extension=function(c){if(!c){return""
}c=c.substring(c.lastIndexOf("/")+1,c.length);
c=c.split("?")[0];
if(c.lastIndexOf(".")>-1){return c.substr(c.lastIndexOf(".")+1,c.length).toLowerCase()
}return
};
b.utils.html=function(c,d){c.innerHTML=d
};
b.utils.wrap=function(c,d){if(c.parentNode){c.parentNode.replaceChild(d,c)
}d.appendChild(c)
};
b.utils.ajax=function(g,f,c){var e;
if(window.XMLHttpRequest){e=new XMLHttpRequest()
}else{e=new ActiveXObject("Microsoft.XMLHTTP")
}e.onreadystatechange=function(){if(e.readyState===4){if(e.status===200){if(f){if(!b.utils.exists(e.responseXML)){try{if(window.DOMParser){var h=(new DOMParser()).parseFromString(e.responseText,"text/xml");
if(h){e=b.utils.extend({},e,{responseXML:h})
}}else{h=new ActiveXObject("Microsoft.XMLDOM");
h.async="false";
h.loadXML(e.responseText);
e=b.utils.extend({},e,{responseXML:h})
}}catch(j){if(c){c(g)
}}}f(e)
}}else{if(c){c(g)
}}}};
try{e.open("GET",g,true);
e.send(null)
}catch(d){if(c){c(g)
}}return e
};
b.utils.load=function(d,e,c){d.onreadystatechange=function(){if(d.readyState===4){if(d.status===200){if(e){e()
}}else{if(c){c()
}}}}
};
b.utils.find=function(d,c){return d.getElementsByTagName(c)
};
b.utils.append=function(c,d){c.appendChild(d)
};
b.utils.isIE=function(){return((!+"\v1")||(typeof window.ActiveXObject!="undefined"))
};
b.utils.userAgentMatch=function(d){var c=navigator.userAgent.toLowerCase();
return(c.match(d)!==null)
};
b.utils.isIOS=function(){return b.utils.userAgentMatch(/iP(hone|ad|od)/i)
};
b.utils.isIPad=function(){return b.utils.userAgentMatch(/iPad/i)
};
b.utils.isIPod=function(){return b.utils.userAgentMatch(/iP(hone|od)/i)
};
b.utils.isAndroid=function(){return b.utils.userAgentMatch(/android/i)
};
b.utils.isLegacyAndroid=function(){return b.utils.userAgentMatch(/android 2.[012]/i)
};
b.utils.isBlackberry=function(){return b.utils.userAgentMatch(/blackberry/i)
};
b.utils.isMobile=function(){return b.utils.userAgentMatch(/(iP(hone|ad|od))|android/i)
};
b.utils.getFirstPlaylistItemFromConfig=function(c){var d={};
var e;
if(c.playlist&&c.playlist.length){e=c.playlist[0]
}else{e=c
}d.file=e.file;
d.levels=e.levels;
d.streamer=e.streamer;
d.playlistfile=e.playlistfile;
d.provider=e.provider;
if(!d.provider){if(d.file&&(d.file.toLowerCase().indexOf("youtube.com")>-1||d.file.toLowerCase().indexOf("youtu.be")>-1)){d.provider="youtube"
}if(d.streamer&&d.streamer.toLowerCase().indexOf("rtmp://")==0){d.provider="rtmp"
}if(e.type){d.provider=e.type.toLowerCase()
}}if(d.provider=="audio"){d.provider="sound"
}return d
};
b.utils.getOuterHTML=function(c){if(c.outerHTML){return c.outerHTML
}else{try{return new XMLSerializer().serializeToString(c)
}catch(d){return""
}}};
b.utils.setOuterHTML=function(f,e){if(f.outerHTML){f.outerHTML=e
}else{var g=document.createElement("div");
g.innerHTML=e;
var c=document.createRange();
c.selectNodeContents(g);
var d=c.extractContents();
f.parentNode.insertBefore(d,f);
f.parentNode.removeChild(f)
}};
b.utils.hasFlash=function(){if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]!="undefined"){return true
}if(typeof window.ActiveXObject!="undefined"){try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
return true
}catch(c){}}return false
};
b.utils.getPluginName=function(c){if(c.lastIndexOf("/")>=0){c=c.substring(c.lastIndexOf("/")+1,c.length)
}if(c.lastIndexOf("-")>=0){c=c.substring(0,c.lastIndexOf("-"))
}if(c.lastIndexOf(".swf")>=0){c=c.substring(0,c.lastIndexOf(".swf"))
}if(c.lastIndexOf(".js")>=0){c=c.substring(0,c.lastIndexOf(".js"))
}return c
};
b.utils.getPluginVersion=function(c){if(c.lastIndexOf("-")>=0){if(c.lastIndexOf(".js")>=0){return c.substring(c.lastIndexOf("-")+1,c.lastIndexOf(".js"))
}else{if(c.lastIndexOf(".swf")>=0){return c.substring(c.lastIndexOf("-")+1,c.lastIndexOf(".swf"))
}else{return c.substring(c.lastIndexOf("-")+1)
}}}return""
};
b.utils.getAbsolutePath=function(j,h){if(!b.utils.exists(h)){h=document.location.href
}if(!b.utils.exists(j)){return undefined
}if(a(j)){return j
}var k=h.substring(0,h.indexOf("://")+3);
var g=h.substring(k.length,h.indexOf("/",k.length+1));
var d;
if(j.indexOf("/")===0){d=j.split("/")
}else{var e=h.split("?")[0];
e=e.substring(k.length+g.length+1,e.lastIndexOf("/"));
d=e.split("/").concat(j.split("/"))
}var c=[];
for(var f=0;
f<d.length;
f++){if(!d[f]||!b.utils.exists(d[f])||d[f]=="."){continue
}else{if(d[f]==".."){c.pop()
}else{c.push(d[f])
}}}return k+g+"/"+c.join("/")
};
function a(d){if(!b.utils.exists(d)){return
}var e=d.indexOf("://");
var c=d.indexOf("?");
return(e>0&&(c<0||(c>e)))
}b.utils.pluginPathType={ABSOLUTE:"ABSOLUTE",RELATIVE:"RELATIVE",CDN:"CDN"};
b.utils.getPluginPathType=function(d){if(typeof d!="string"){return
}d=d.split("?")[0];
var e=d.indexOf("://");
if(e>0){return b.utils.pluginPathType.ABSOLUTE
}var c=d.indexOf("/");
var f=b.utils.extension(d);
if(e<0&&c<0&&(!f||!isNaN(f))){return b.utils.pluginPathType.CDN
}return b.utils.pluginPathType.RELATIVE
};
b.utils.mapEmpty=function(c){for(var d in c){return false
}return true
};
b.utils.mapLength=function(d){var c=0;
for(var e in d){c++
}return c
};
b.utils.log=function(d,c){if(typeof console!="undefined"&&typeof console.log!="undefined"){if(c){console.log(d,c)
}else{console.log(d)
}}};
b.utils.css=function(d,g,c){if(b.utils.exists(d)){for(var e in g){try{if(typeof g[e]==="undefined"){continue
}else{if(typeof g[e]=="number"&&!(e=="zIndex"||e=="opacity")){if(isNaN(g[e])){continue
}if(e.match(/color/i)){g[e]="#"+b.utils.strings.pad(g[e].toString(16),6)
}else{g[e]=Math.ceil(g[e])+"px"
}}}d.style[e]=g[e]
}catch(f){}}}};
b.utils.isYouTube=function(c){return(c.indexOf("youtube.com")>-1||c.indexOf("youtu.be")>-1)
};
b.utils.transform=function(e,d,c,g,h){if(!b.utils.exists(d)){d=1
}if(!b.utils.exists(c)){c=1
}if(!b.utils.exists(g)){g=0
}if(!b.utils.exists(h)){h=0
}if(d==1&&c==1&&g==0&&h==0){e.style.webkitTransform="";
e.style.MozTransform="";
e.style.OTransform=""
}else{var f="scale("+d+","+c+") translate("+g+"px,"+h+"px)";
e.style.webkitTransform=f;
e.style.MozTransform=f;
e.style.OTransform=f
}};
b.utils.stretch=function(k,q,p,g,n,h){if(typeof p=="undefined"||typeof g=="undefined"||typeof n=="undefined"||typeof h=="undefined"){return
}var d=p/n;
var f=g/h;
var m=0;
var l=0;
var e=false;
var c={};
if(q.parentElement){q.parentElement.style.overflow="hidden"
}b.utils.transform(q);
switch(k.toUpperCase()){case b.utils.stretching.NONE:c.width=n;
c.height=h;
c.top=(g-c.height)/2;
c.left=(p-c.width)/2;
break;
case b.utils.stretching.UNIFORM:if(d>f){c.width=n*f;
c.height=h*f;
if(c.width/p>0.95){e=true;
d=Math.ceil(100*p/c.width)/100;
f=1;
c.width=p
}}else{c.width=n*d;
c.height=h*d;
if(c.height/g>0.95){e=true;
d=1;
f=Math.ceil(100*g/c.height)/100;
c.height=g
}}c.top=(g-c.height)/2;
c.left=(p-c.width)/2;
break;
case b.utils.stretching.FILL:if(d>f){c.width=n*d;
c.height=h*d
}else{c.width=n*f;
c.height=h*f
}c.top=(g-c.height)/2;
c.left=(p-c.width)/2;
break;
case b.utils.stretching.EXACTFIT:c.width=n;
c.height=h;
var o=Math.round((n/2)*(1-1/d));
var j=Math.round((h/2)*(1-1/f));
e=true;
c.top=c.left=0;
break;
default:break
}if(e){b.utils.transform(q,d,f,o,j)
}b.utils.css(q,c)
};
b.utils.stretching={NONE:"NONE",FILL:"FILL",UNIFORM:"UNIFORM",EXACTFIT:"EXACTFIT"};
b.utils.deepReplaceKeyName=function(k,e,c){switch(b.utils.typeOf(k)){case"array":for(var g=0;
g<k.length;
g++){k[g]=b.utils.deepReplaceKeyName(k[g],e,c)
}break;
case"object":for(var f in k){var j,h;
if(e instanceof Array&&c instanceof Array){if(e.length!=c.length){continue
}else{j=e;
h=c
}}else{j=[e];
h=[c]
}var d=f;
for(var g=0;
g<j.length;
g++){d=d.replace(new RegExp(e[g],"g"),c[g])
}k[d]=b.utils.deepReplaceKeyName(k[f],e,c);
if(f!=d){delete k[f]
}}break
}return k
};
b.utils.isInArray=function(e,d){if(!(e)||!(e instanceof Array)){return false
}for(var c=0;
c<e.length;
c++){if(d===e[c]){return true
}}return false
};
b.utils.exists=function(c){switch(typeof(c)){case"string":return(c.length>0);
break;
case"object":return(c!==null);
case"undefined":return false
}return true
};
b.utils.empty=function(c){if(typeof c.hasChildNodes=="function"){while(c.hasChildNodes()){c.removeChild(c.firstChild)
}}};
b.utils.parseDimension=function(c){if(typeof c=="string"){if(c===""){return 0
}else{if(c.lastIndexOf("%")>-1){return c
}else{return parseInt(c.replace("px",""),10)
}}}return c
};
b.utils.getDimensions=function(c){if(c&&c.style){return{x:b.utils.parseDimension(c.style.left),y:b.utils.parseDimension(c.style.top),width:b.utils.parseDimension(c.style.width),height:b.utils.parseDimension(c.style.height)}
}else{return{}
}};
b.utils.getElementWidth=function(c){if(!c){return null
}else{if(c==document.body){return b.utils.parentNode(c).clientWidth
}else{if(c.clientWidth>0){return c.clientWidth
}else{if(c.style){return b.utils.parseDimension(c.style.width)
}else{return null
}}}}};
b.utils.getElementHeight=function(c){if(!c){return null
}else{if(c==document.body){return b.utils.parentNode(c).clientHeight
}else{if(c.clientHeight>0){return c.clientHeight
}else{if(c.style){return b.utils.parseDimension(c.style.height)
}else{return null
}}}}};
b.utils.timeFormat=function(c){str="00:00";
if(c>0){str=Math.floor(c/60)<10?"0"+Math.floor(c/60)+":":Math.floor(c/60)+":";
str+=Math.floor(c%60)<10?"0"+Math.floor(c%60):Math.floor(c%60)
}return str
};
b.utils.useNativeFullscreen=function(){return(navigator&&navigator.vendor&&navigator.vendor.indexOf("Apple")==0)
};
b.utils.parentNode=function(c){if(!c){return document.body
}else{if(c.parentNode){return c.parentNode
}else{if(c.parentElement){return c.parentElement
}else{return c
}}}};
b.utils.getBoundingClientRect=function(c){if(typeof c.getBoundingClientRect=="function"){return c.getBoundingClientRect()
}else{return{left:c.offsetLeft+document.body.scrollLeft,top:c.offsetTop+document.body.scrollTop,width:c.offsetWidth,height:c.offsetHeight}
}};
b.utils.translateEventResponse=function(e,c){var g=b.utils.extend({},c);
if(e==b.api.events.JWPLAYER_FULLSCREEN&&!g.fullscreen){g.fullscreen=g.message=="true"?true:false;
delete g.message
}else{if(typeof g.data=="object"){g=b.utils.extend(g,g.data);
delete g.data
}else{if(typeof g.metadata=="object"){b.utils.deepReplaceKeyName(g.metadata,["__dot__","__spc__","__dsh__"],["."," ","-"])
}}}var d=["position","duration","offset"];
for(var f in d){if(g[d[f]]){g[d[f]]=Math.round(g[d[f]]*1000)/1000
}}return g
};
b.utils.saveCookie=function(c,d){document.cookie="jwplayer."+c+"="+d+"; path=/"
};
b.utils.getCookies=function(){var f={};
var e=document.cookie.split("; ");
for(var d=0;
d<e.length;
d++){var c=e[d].split("=");
if(c[0].indexOf("jwplayer.")==0){f[c[0].substring(9,c[0].length)]=c[1]
}}return f
};
b.utils.readCookie=function(c){return b.utils.getCookies()[c]
}
})(jwplayer);
(function(a){a.events=function(){};
a.events.COMPLETE="COMPLETE";
a.events.ERROR="ERROR"
})(jwplayer);
(function(jwplayer){jwplayer.events.eventdispatcher=function(debug){var _debug=debug;
var _listeners;
var _globallisteners;
this.resetEventListeners=function(){_listeners={};
_globallisteners=[]
};
this.resetEventListeners();
this.addEventListener=function(type,listener,count){try{if(!jwplayer.utils.exists(_listeners[type])){_listeners[type]=[]
}if(typeof(listener)=="string"){eval("listener = "+listener)
}_listeners[type].push({listener:listener,count:count})
}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.removeEventListener=function(type,listener){if(!_listeners[type]){return
}try{for(var listenerIndex=0;
listenerIndex<_listeners[type].length;
listenerIndex++){if(_listeners[type][listenerIndex].listener.toString()==listener.toString()){_listeners[type].splice(listenerIndex,1);
break
}}}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.addGlobalListener=function(listener,count){try{if(typeof(listener)=="string"){eval("listener = "+listener)
}_globallisteners.push({listener:listener,count:count})
}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.removeGlobalListener=function(listener){if(!listener){return
}try{for(var globalListenerIndex=0;
globalListenerIndex<_globallisteners.length;
globalListenerIndex++){if(_globallisteners[globalListenerIndex].listener.toString()==listener.toString()){_globallisteners.splice(globalListenerIndex,1);
break
}}}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.sendEvent=function(type,data){if(!jwplayer.utils.exists(data)){data={}
}if(_debug){jwplayer.utils.log(type,data)
}if(typeof _listeners[type]!="undefined"){for(var listenerIndex=0;
listenerIndex<_listeners[type].length;
listenerIndex++){try{_listeners[type][listenerIndex].listener(data)
}catch(err){jwplayer.utils.log("There was an error while handling a listener: "+err.toString(),_listeners[type][listenerIndex].listener)
}if(_listeners[type][listenerIndex]){if(_listeners[type][listenerIndex].count===1){delete _listeners[type][listenerIndex]
}else{if(_listeners[type][listenerIndex].count>0){_listeners[type][listenerIndex].count=_listeners[type][listenerIndex].count-1
}}}}}for(var globalListenerIndex=0;
globalListenerIndex<_globallisteners.length;
globalListenerIndex++){try{_globallisteners[globalListenerIndex].listener(data)
}catch(err){jwplayer.utils.log("There was an error while handling a listener: "+err.toString(),_globallisteners[globalListenerIndex].listener)
}if(_globallisteners[globalListenerIndex]){if(_globallisteners[globalListenerIndex].count===1){delete _globallisteners[globalListenerIndex]
}else{if(_globallisteners[globalListenerIndex].count>0){_globallisteners[globalListenerIndex].count=_globallisteners[globalListenerIndex].count-1
}}}}}
}
})(jwplayer);
(function(a){var b={};
a.utils.animations=function(){};
a.utils.animations.transform=function(c,d){c.style.webkitTransform=d;
c.style.MozTransform=d;
c.style.OTransform=d;
c.style.msTransform=d
};
a.utils.animations.transformOrigin=function(c,d){c.style.webkitTransformOrigin=d;
c.style.MozTransformOrigin=d;
c.style.OTransformOrigin=d;
c.style.msTransformOrigin=d
};
a.utils.animations.rotate=function(c,d){a.utils.animations.transform(c,["rotate(",d,"deg)"].join(""))
};
a.utils.cancelAnimation=function(c){delete b[c.id]
};
a.utils.fadeTo=function(m,f,e,j,h,d){if(b[m.id]!=d&&a.utils.exists(d)){return
}if(m.style.opacity==f){return
}var c=new Date().getTime();
if(d>c){setTimeout(function(){a.utils.fadeTo(m,f,e,j,0,d)
},d-c)
}if(m.style.display=="none"){m.style.display="block"
}if(!a.utils.exists(j)){j=m.style.opacity===""?1:m.style.opacity
}if(m.style.opacity==f&&m.style.opacity!==""&&a.utils.exists(d)){if(f===0){m.style.display="none"
}return
}if(!a.utils.exists(d)){d=c;
b[m.id]=d
}if(!a.utils.exists(h)){h=0
}var k=(e>0)?((c-d)/(e*1000)):0;
k=k>1?1:k;
var l=f-j;
var g=j+(k*l);
if(g>1){g=1
}else{if(g<0){g=0
}}m.style.opacity=g;
if(h>0){b[m.id]=d+h*1000;
a.utils.fadeTo(m,f,e,j,0,b[m.id]);
return
}setTimeout(function(){a.utils.fadeTo(m,f,e,j,0,d)
},10)
}
})(jwplayer);
(function(a){a.utils.arrays=function(){};
a.utils.arrays.indexOf=function(c,d){for(var b=0;
b<c.length;
b++){if(c[b]==d){return b
}}return -1
};
a.utils.arrays.remove=function(c,d){var b=a.utils.arrays.indexOf(c,d);
if(b>-1){c.splice(b,1)
}}
})(jwplayer);
(function(a){a.utils.extensionmap={"3gp":{html5:"video/3gpp",flash:"video"},"3gpp":{html5:"video/3gpp"},"3g2":{html5:"video/3gpp2",flash:"video"},"3gpp2":{html5:"video/3gpp2"},flv:{flash:"video"},f4a:{html5:"audio/mp4"},f4b:{html5:"audio/mp4",flash:"video"},f4v:{html5:"video/mp4",flash:"video"},mov:{html5:"video/quicktime",flash:"video"},m4a:{html5:"audio/mp4",flash:"video"},m4b:{html5:"audio/mp4"},m4p:{html5:"audio/mp4"},m4v:{html5:"video/mp4",flash:"video"},mp4:{html5:"video/mp4",flash:"video"},rbs:{flash:"sound"},aac:{html5:"audio/aac",flash:"video"},mp3:{html5:"audio/mp3",flash:"sound"},ogg:{html5:"audio/ogg"},oga:{html5:"audio/ogg"},ogv:{html5:"video/ogg"},webm:{html5:"video/webm"},m3u8:{html5:"audio/x-mpegurl"},gif:{flash:"image"},jpeg:{flash:"image"},jpg:{flash:"image"},swf:{flash:"image"},png:{flash:"image"},wav:{html5:"audio/x-wav"}}
})(jwplayer);
(function(e){e.utils.mediaparser=function(){};
var g={element:{width:"width",height:"height",id:"id","class":"className",name:"name"},media:{src:"file",preload:"preload",autoplay:"autostart",loop:"repeat",controls:"controls"},source:{src:"file",type:"type",media:"media","data-jw-width":"width","data-jw-bitrate":"bitrate"},video:{poster:"image"}};
var f={};
e.utils.mediaparser.parseMedia=function(j){return d(j)
};
function c(k,j){if(!e.utils.exists(j)){j=g[k]
}else{e.utils.extend(j,g[k])
}return j
}function d(n,j){if(f[n.tagName.toLowerCase()]&&!e.utils.exists(j)){return f[n.tagName.toLowerCase()](n)
}else{j=c("element",j);
var o={};
for(var k in j){if(k!="length"){var m=n.getAttribute(k);
if(e.utils.exists(m)){o[j[k]]=m
}}}var l=n.style["#background-color"];
if(l&&!(l=="transparent"||l=="rgba(0, 0, 0, 0)")){o.screencolor=l
}return o
}}function h(n,k){k=c("media",k);
var l=[];
var j=e.utils.selectors("source",n);
for(var m in j){if(!isNaN(m)){l.push(a(j[m]))
}}var o=d(n,k);
if(e.utils.exists(o.file)){l[0]={file:o.file}
}o.levels=l;
return o
}function a(l,k){k=c("source",k);
var j=d(l,k);
j.width=j.width?j.width:0;
j.bitrate=j.bitrate?j.bitrate:0;
return j
}function b(l,k){k=c("video",k);
var j=h(l,k);
return j
}f.media=h;
f.audio=h;
f.source=a;
f.video=b
})(jwplayer);
(function(a){a.utils.loaderstatus={NEW:"NEW",LOADING:"LOADING",ERROR:"ERROR",COMPLETE:"COMPLETE"};
a.utils.scriptloader=function(c){var d=a.utils.loaderstatus.NEW;
var b=new a.events.eventdispatcher();
a.utils.extend(this,b);
this.load=function(){if(d==a.utils.loaderstatus.NEW){d=a.utils.loaderstatus.LOADING;
var e=document.createElement("script");
e.onload=function(f){d=a.utils.loaderstatus.COMPLETE;
b.sendEvent(a.events.COMPLETE)
};
e.onerror=function(f){d=a.utils.loaderstatus.ERROR;
b.sendEvent(a.events.ERROR)
};
e.onreadystatechange=function(){if(e.readyState=="loaded"||e.readyState=="complete"){d=a.utils.loaderstatus.COMPLETE;
b.sendEvent(a.events.COMPLETE)
}};
document.getElementsByTagName("head")[0].appendChild(e);
e.src=c
}};
this.getStatus=function(){return d
}
}
})(jwplayer);
(function(a){a.utils.selectors=function(b,e){if(!a.utils.exists(e)){e=document
}b=a.utils.strings.trim(b);
var c=b.charAt(0);
if(c=="#"){return e.getElementById(b.substr(1))
}else{if(c=="."){if(e.getElementsByClassName){return e.getElementsByClassName(b.substr(1))
}else{return a.utils.selectors.getElementsByTagAndClass("*",b.substr(1))
}}else{if(b.indexOf(".")>0){var d=b.split(".");
return a.utils.selectors.getElementsByTagAndClass(d[0],d[1])
}else{return e.getElementsByTagName(b)
}}}return null
};
a.utils.selectors.getElementsByTagAndClass=function(e,h,g){var j=[];
if(!a.utils.exists(g)){g=document
}var f=g.getElementsByTagName(e);
for(var d=0;
d<f.length;
d++){if(a.utils.exists(f[d].className)){var c=f[d].className.split(" ");
for(var b=0;
b<c.length;
b++){if(c[b]==h){j.push(f[d])
}}}}return j
}
})(jwplayer);
(function(a){a.utils.strings=function(){};
a.utils.strings.trim=function(b){return b.replace(/^\s*/,"").replace(/\s*$/,"")
};
a.utils.strings.pad=function(c,d,b){if(!b){b="0"
}while(c.length<d){c=b+c
}return c
};
a.utils.strings.serialize=function(b){if(b==null){return null
}else{if(b=="true"){return true
}else{if(b=="false"){return false
}else{if(isNaN(Number(b))||b.length>5||b.length==0){return b
}else{return Number(b)
}}}}};
a.utils.strings.seconds=function(d){d=d.replace(",",".");
var b=d.split(":");
var c=0;
if(d.substr(-1)=="s"){c=Number(d.substr(0,d.length-1))
}else{if(d.substr(-1)=="m"){c=Number(d.substr(0,d.length-1))*60
}else{if(d.substr(-1)=="h"){c=Number(d.substr(0,d.length-1))*3600
}else{if(b.length>1){c=Number(b[b.length-1]);
c+=Number(b[b.length-2])*60;
if(b.length==3){c+=Number(b[b.length-3])*3600
}}else{c=Number(d)
}}}}return c
};
a.utils.strings.xmlAttribute=function(b,c){for(var d=0;
d<b.attributes.length;
d++){if(b.attributes[d].name&&b.attributes[d].name.toLowerCase()==c.toLowerCase()){return b.attributes[d].value.toString()
}}return""
};
a.utils.strings.jsonToString=function(f){var h=h||{};
if(h&&h.stringify){return h.stringify(f)
}var c=typeof(f);
if(c!="object"||f===null){if(c=="string"){f='"'+f.replace(/"/g,'\\"')+'"'
}else{return String(f)
}}else{var g=[],b=(f&&f.constructor==Array);
for(var d in f){var e=f[d];
switch(typeof(e)){case"string":e='"'+e.replace(/"/g,'\\"')+'"';
break;
case"object":if(a.utils.exists(e)){e=a.utils.strings.jsonToString(e)
}break
}if(b){if(typeof(e)!="function"){g.push(String(e))
}}else{if(typeof(e)!="function"){g.push('"'+d+'":'+String(e))
}}}if(b){return"["+String(g)+"]"
}else{return"{"+String(g)+"}"
}}}
})(jwplayer);
(function(c){var d=new RegExp(/^(#|0x)[0-9a-fA-F]{3,6}/);
c.utils.typechecker=function(g,f){f=!c.utils.exists(f)?b(g):f;
return e(g,f)
};
function b(f){var g=["true","false","t","f"];
if(g.toString().indexOf(f.toLowerCase().replace(" ",""))>=0){return"boolean"
}else{if(d.test(f)){return"color"
}else{if(!isNaN(parseInt(f,10))&&parseInt(f,10).toString().length==f.length){return"integer"
}else{if(!isNaN(parseFloat(f))&&parseFloat(f).toString().length==f.length){return"float"
}}}}return"string"
}function e(g,f){if(!c.utils.exists(f)){return g
}switch(f){case"color":if(g.length>0){return a(g)
}return null;
case"integer":return parseInt(g,10);
case"float":return parseFloat(g);
case"boolean":if(g.toLowerCase()=="true"){return true
}else{if(g=="1"){return true
}}return false
}return g
}function a(f){switch(f.toLowerCase()){case"blue":return parseInt("0000FF",16);
case"green":return parseInt("00FF00",16);
case"red":return parseInt("FF0000",16);
case"cyan":return parseInt("00FFFF",16);
case"magenta":return parseInt("FF00FF",16);
case"yellow":return parseInt("FFFF00",16);
case"black":return parseInt("000000",16);
case"white":return parseInt("FFFFFF",16);
default:f=f.replace(/(#|0x)?([0-9A-F]{3,6})$/gi,"$2");
if(f.length==3){f=f.charAt(0)+f.charAt(0)+f.charAt(1)+f.charAt(1)+f.charAt(2)+f.charAt(2)
}return parseInt(f,16)
}return parseInt("000000",16)
}})(jwplayer);
(function(a){a.utils.parsers=function(){};
a.utils.parsers.localName=function(b){if(!b){return""
}else{if(b.localName){return b.localName
}else{if(b.baseName){return b.baseName
}else{return""
}}}};
a.utils.parsers.textContent=function(b){if(!b){return""
}else{if(b.textContent){return b.textContent
}else{if(b.text){return b.text
}else{return""
}}}}
})(jwplayer);
(function(a){a.utils.parsers.jwparser=function(){};
a.utils.parsers.jwparser.PREFIX="jwplayer";
a.utils.parsers.jwparser.parseEntry=function(c,d){for(var b=0;
b<c.childNodes.length;
b++){if(c.childNodes[b].prefix==a.utils.parsers.jwparser.PREFIX){d[a.utils.parsers.localName(c.childNodes[b])]=a.utils.strings.serialize(a.utils.parsers.textContent(c.childNodes[b]));
if(a.utils.parsers.localName(c.childNodes[b])=="file"&&d.levels){delete d.levels
}}if(!d.file&&String(d.link).toLowerCase().indexOf("youtube")>-1){d.file=d.link
}}return d
};
a.utils.parsers.jwparser.getProvider=function(c){if(c.type){return c.type
}else{if(c.file.indexOf("youtube.com/w")>-1||c.file.indexOf("youtube.com/v")>-1||c.file.indexOf("youtu.be/")>-1){return"youtube"
}else{if(c.streamer&&c.streamer.indexOf("rtmp")==0){return"rtmp"
}else{if(c.streamer&&c.streamer.indexOf("http")==0){return"http"
}else{var b=a.utils.strings.extension(c.file);
if(extensions.hasOwnProperty(b)){return extensions[b]
}}}}}return""
}
})(jwplayer);
(function(a){a.utils.parsers.mediaparser=function(){};
a.utils.parsers.mediaparser.PREFIX="media";
a.utils.parsers.mediaparser.parseGroup=function(d,f){var e=false;
for(var c=0;
c<d.childNodes.length;
c++){if(d.childNodes[c].prefix==a.utils.parsers.mediaparser.PREFIX){if(!a.utils.parsers.localName(d.childNodes[c])){continue
}switch(a.utils.parsers.localName(d.childNodes[c]).toLowerCase()){case"content":if(!e){f.file=a.utils.strings.xmlAttribute(d.childNodes[c],"url")
}if(a.utils.strings.xmlAttribute(d.childNodes[c],"duration")){f.duration=a.utils.strings.seconds(a.utils.strings.xmlAttribute(d.childNodes[c],"duration"))
}if(a.utils.strings.xmlAttribute(d.childNodes[c],"start")){f.start=a.utils.strings.seconds(a.utils.strings.xmlAttribute(d.childNodes[c],"start"))
}if(d.childNodes[c].childNodes&&d.childNodes[c].childNodes.length>0){f=a.utils.parsers.mediaparser.parseGroup(d.childNodes[c],f)
}if(a.utils.strings.xmlAttribute(d.childNodes[c],"width")||a.utils.strings.xmlAttribute(d.childNodes[c],"bitrate")||a.utils.strings.xmlAttribute(d.childNodes[c],"url")){if(!f.levels){f.levels=[]
}f.levels.push({width:a.utils.strings.xmlAttribute(d.childNodes[c],"width"),bitrate:a.utils.strings.xmlAttribute(d.childNodes[c],"bitrate"),file:a.utils.strings.xmlAttribute(d.childNodes[c],"url")})
}break;
case"title":f.title=a.utils.parsers.textContent(d.childNodes[c]);
break;
case"description":f.description=a.utils.parsers.textContent(d.childNodes[c]);
break;
case"keywords":f.tags=a.utils.parsers.textContent(d.childNodes[c]);
break;
case"thumbnail":f.image=a.utils.strings.xmlAttribute(d.childNodes[c],"url");
break;
case"credit":f.author=a.utils.parsers.textContent(d.childNodes[c]);
break;
case"player":var b=d.childNodes[c].url;
if(b.indexOf("youtube.com")>=0||b.indexOf("youtu.be")>=0){e=true;
f.file=a.utils.strings.xmlAttribute(d.childNodes[c],"url")
}break;
case"group":a.utils.parsers.mediaparser.parseGroup(d.childNodes[c],f);
break
}}}return f
}
})(jwplayer);
(function(b){b.utils.parsers.rssparser=function(){};
b.utils.parsers.rssparser.parse=function(f){var c=[];
for(var e=0;
e<f.childNodes.length;
e++){if(b.utils.parsers.localName(f.childNodes[e]).toLowerCase()=="channel"){for(var d=0;
d<f.childNodes[e].childNodes.length;
d++){if(b.utils.parsers.localName(f.childNodes[e].childNodes[d]).toLowerCase()=="item"){c.push(a(f.childNodes[e].childNodes[d]))
}}}}return c
};
function a(d){var e={};
for(var c=0;
c<d.childNodes.length;
c++){if(!b.utils.parsers.localName(d.childNodes[c])){continue
}switch(b.utils.parsers.localName(d.childNodes[c]).toLowerCase()){case"enclosure":e.file=b.utils.strings.xmlAttribute(d.childNodes[c],"url");
break;
case"title":e.title=b.utils.parsers.textContent(d.childNodes[c]);
break;
case"pubdate":e.date=b.utils.parsers.textContent(d.childNodes[c]);
break;
case"description":e.description=b.utils.parsers.textContent(d.childNodes[c]);
break;
case"link":e.link=b.utils.parsers.textContent(d.childNodes[c]);
break;
case"category":if(e.tags){e.tags+=b.utils.parsers.textContent(d.childNodes[c])
}else{e.tags=b.utils.parsers.textContent(d.childNodes[c])
}break
}}e=b.utils.parsers.mediaparser.parseGroup(d,e);
e=b.utils.parsers.jwparser.parseEntry(d,e);
return new b.html5.playlistitem(e)
}})(jwplayer);
(function(a){var c={};
var b={};
a.plugins=function(){};
a.plugins.loadPlugins=function(e,d){b[e]=new a.plugins.pluginloader(new a.plugins.model(c),d);
return b[e]
};
a.plugins.registerPlugin=function(h,f,e){var d=a.utils.getPluginName(h);
if(c[d]){c[d].registerPlugin(h,f,e)
}else{a.utils.log("A plugin ("+h+") was registered with the player that was not loaded. Please check your configuration.");
for(var g in b){b[g].pluginFailed()
}}}
})(jwplayer);
(function(a){a.plugins.model=function(b){this.addPlugin=function(c){var d=a.utils.getPluginName(c);
if(!b[d]){b[d]=new a.plugins.plugin(c)
}return b[d]
}
}
})(jwplayer);
(function(a){a.plugins.pluginmodes={FLASH:"FLASH",JAVASCRIPT:"JAVASCRIPT",HYBRID:"HYBRID"};
a.plugins.plugin=function(b){var d="http://lp.longtailvideo.com";
var j=a.utils.loaderstatus.NEW;
var k;
var h;
var l;
var c=new a.events.eventdispatcher();
a.utils.extend(this,c);
function e(){switch(a.utils.getPluginPathType(b)){case a.utils.pluginPathType.ABSOLUTE:return b;
case a.utils.pluginPathType.RELATIVE:return a.utils.getAbsolutePath(b,window.location.href);
case a.utils.pluginPathType.CDN:var o=a.utils.getPluginName(b);
var n=a.utils.getPluginVersion(b);
var m=(window.location.href.indexOf("https://")==0)?d.replace("http://","https://secure"):d;
return m+"/"+a.version.split(".")[0]+"/"+o+"/"+o+(n!==""?("-"+n):"")+".js"
}}function g(m){l=setTimeout(function(){j=a.utils.loaderstatus.COMPLETE;
c.sendEvent(a.events.COMPLETE)
},1000)
}function f(m){j=a.utils.loaderstatus.ERROR;
c.sendEvent(a.events.ERROR)
}this.load=function(){if(j==a.utils.loaderstatus.NEW){if(b.lastIndexOf(".swf")>0){k=b;
j=a.utils.loaderstatus.COMPLETE;
c.sendEvent(a.events.COMPLETE);
return
}j=a.utils.loaderstatus.LOADING;
var m=new a.utils.scriptloader(e());
m.addEventListener(a.events.COMPLETE,g);
m.addEventListener(a.events.ERROR,f);
m.load()
}};
this.registerPlugin=function(o,n,m){if(l){clearTimeout(l);
l=undefined
}if(n&&m){k=m;
h=n
}else{if(typeof n=="string"){k=n
}else{if(typeof n=="function"){h=n
}else{if(!n&&!m){k=o
}}}}j=a.utils.loaderstatus.COMPLETE;
c.sendEvent(a.events.COMPLETE)
};
this.getStatus=function(){return j
};
this.getPluginName=function(){return a.utils.getPluginName(b)
};
this.getFlashPath=function(){if(k){switch(a.utils.getPluginPathType(k)){case a.utils.pluginPathType.ABSOLUTE:return k;
case a.utils.pluginPathType.RELATIVE:if(b.lastIndexOf(".swf")>0){return a.utils.getAbsolutePath(k,window.location.href)
}return a.utils.getAbsolutePath(k,e());
case a.utils.pluginPathType.CDN:if(k.indexOf("-")>-1){return k+"h"
}return k+"-h"
}}return null
};
this.getJS=function(){return h
};
this.getPluginmode=function(){if(typeof k!="undefined"&&typeof h!="undefined"){return a.plugins.pluginmodes.HYBRID
}else{if(typeof k!="undefined"){return a.plugins.pluginmodes.FLASH
}else{if(typeof h!="undefined"){return a.plugins.pluginmodes.JAVASCRIPT
}}}};
this.getNewInstance=function(n,m,o){return new h(n,m,o)
};
this.getURL=function(){return b
}
}
})(jwplayer);
(function(a){a.plugins.pluginloader=function(h,e){var g={};
var k=a.utils.loaderstatus.NEW;
var d=false;
var b=false;
var c=new a.events.eventdispatcher();
a.utils.extend(this,c);
function f(){if(!b){b=true;
k=a.utils.loaderstatus.COMPLETE;
c.sendEvent(a.events.COMPLETE)
}}function j(){if(!b){var m=0;
for(plugin in g){var l=g[plugin].getStatus();
if(l==a.utils.loaderstatus.LOADING||l==a.utils.loaderstatus.NEW){m++
}}if(m==0){f()
}}}this.setupPlugins=function(n,l,s){var m={length:0,plugins:{}};
var p={length:0,plugins:{}};
for(var o in g){var q=g[o].getPluginName();
if(g[o].getFlashPath()){m.plugins[g[o].getFlashPath()]=l.plugins[o];
m.plugins[g[o].getFlashPath()].pluginmode=g[o].getPluginmode();
m.length++
}if(g[o].getJS()){var r=document.createElement("div");
r.id=n.id+"_"+q;
r.style.position="absolute";
r.style.zIndex=p.length+10;
p.plugins[q]=g[o].getNewInstance(n,l.plugins[o],r);
p.length++;
if(typeof p.plugins[q].resize!="undefined"){n.onReady(s(p.plugins[q],r,true));
n.onResize(s(p.plugins[q],r))
}}}n.plugins=p.plugins;
return m
};
this.load=function(){k=a.utils.loaderstatus.LOADING;
d=true;
for(var l in e){if(a.utils.exists(l)){g[l]=h.addPlugin(l);
g[l].addEventListener(a.events.COMPLETE,j);
g[l].addEventListener(a.events.ERROR,j)
}}for(l in g){g[l].load()
}d=false;
j()
};
this.pluginFailed=function(){f()
};
this.getStatus=function(){return k
}
}
})(jwplayer);
(function(b){var a=[];
b.api=function(d){this.container=d;
this.id=d.id;
var m={};
var t={};
var p={};
var c=[];
var g=undefined;
var k=false;
var h=[];
var r=undefined;
var o=b.utils.getOuterHTML(d);
var s={};
var j={};
this.getBuffer=function(){return this.callInternal("jwGetBuffer")
};
this.getContainer=function(){return this.container
};
function e(v,u){return function(A,w,x,y){if(v.renderingMode=="flash"||v.renderingMode=="html5"){var z;
if(w){j[A]=w;
z="jwplayer('"+v.id+"').callback('"+A+"')"
}else{if(!w&&j[A]){delete j[A]
}}g.jwDockSetButton(A,z,x,y)
}return u
}
}this.getPlugin=function(u){var w=this;
var v={};
if(u=="dock"){return b.utils.extend(v,{setButton:e(w,v),show:function(){w.callInternal("jwDockShow");
return v
},hide:function(){w.callInternal("jwDockHide");
return v
},onShow:function(x){w.componentListener("dock",b.api.events.JWPLAYER_COMPONENT_SHOW,x);
return v
},onHide:function(x){w.componentListener("dock",b.api.events.JWPLAYER_COMPONENT_HIDE,x);
return v
}})
}else{if(u=="controlbar"){return b.utils.extend(v,{show:function(){w.callInternal("jwControlbarShow");
return v
},hide:function(){w.callInternal("jwControlbarHide");
return v
},onShow:function(x){w.componentListener("controlbar",b.api.events.JWPLAYER_COMPONENT_SHOW,x);
return v
},onHide:function(x){w.componentListener("controlbar",b.api.events.JWPLAYER_COMPONENT_HIDE,x);
return v
}})
}else{if(u=="display"){return b.utils.extend(v,{show:function(){w.callInternal("jwDisplayShow");
return v
},hide:function(){w.callInternal("jwDisplayHide");
return v
},onShow:function(x){w.componentListener("display",b.api.events.JWPLAYER_COMPONENT_SHOW,x);
return v
},onHide:function(x){w.componentListener("display",b.api.events.JWPLAYER_COMPONENT_HIDE,x);
return v
}})
}else{return this.plugins[u]
}}}};
this.callback=function(u){if(j[u]){return j[u]()
}};
this.getDuration=function(){return this.callInternal("jwGetDuration")
};
this.getFullscreen=function(){return this.callInternal("jwGetFullscreen")
};
this.getHeight=function(){return this.callInternal("jwGetHeight")
};
this.getLockState=function(){return this.callInternal("jwGetLockState")
};
this.getMeta=function(){return this.getItemMeta()
};
this.getMute=function(){return this.callInternal("jwGetMute")
};
this.getPlaylist=function(){var v=this.callInternal("jwGetPlaylist");
if(this.renderingMode=="flash"){b.utils.deepReplaceKeyName(v,["__dot__","__spc__","__dsh__"],["."," ","-"])
}for(var u=0;
u<v.length;
u++){if(!b.utils.exists(v[u].index)){v[u].index=u
}}return v
};
this.getPlaylistItem=function(u){if(!b.utils.exists(u)){u=this.getCurrentItem()
}return this.getPlaylist()[u]
};
this.getPosition=function(){return this.callInternal("jwGetPosition")
};
this.getRenderingMode=function(){return this.renderingMode
};
this.getState=function(){return this.callInternal("jwGetState")
};
this.getVolume=function(){return this.callInternal("jwGetVolume")
};
this.getWidth=function(){return this.callInternal("jwGetWidth")
};
this.setFullscreen=function(u){if(!b.utils.exists(u)){this.callInternal("jwSetFullscreen",!this.callInternal("jwGetFullscreen"))
}else{this.callInternal("jwSetFullscreen",u)
}return this
};
this.setMute=function(u){if(!b.utils.exists(u)){this.callInternal("jwSetMute",!this.callInternal("jwGetMute"))
}else{this.callInternal("jwSetMute",u)
}return this
};
this.lock=function(){return this
};
this.unlock=function(){return this
};
this.load=function(u){this.callInternal("jwLoad",u);
return this
};
this.playlistItem=function(u){this.callInternal("jwPlaylistItem",u);
return this
};
this.playlistPrev=function(){this.callInternal("jwPlaylistPrev");
return this
};
this.playlistNext=function(){this.callInternal("jwPlaylistNext");
return this
};
this.resize=function(v,u){if(this.renderingMode=="html5"){g.jwResize(v,u)
}else{this.container.width=v;
this.container.height=u;
var w=document.getElementById(this.id+"_wrapper");
if(w){w.style.width=v+"px";
w.style.height=u+"px"
}}return this
};
this.play=function(u){if(typeof u=="undefined"){u=this.getState();
if(u==b.api.events.state.PLAYING||u==b.api.events.state.BUFFERING){this.callInternal("jwPause")
}else{this.callInternal("jwPlay")
}}else{this.callInternal("jwPlay",u)
}return this
};
this.pause=function(u){if(typeof u=="undefined"){u=this.getState();
if(u==b.api.events.state.PLAYING||u==b.api.events.state.BUFFERING){this.callInternal("jwPause")
}else{this.callInternal("jwPlay")
}}else{this.callInternal("jwPause",u)
}return this
};
this.stop=function(){this.callInternal("jwStop");
return this
};
this.seek=function(u){this.callInternal("jwSeek",u);
return this
};
this.setVolume=function(u){this.callInternal("jwSetVolume",u);
return this
};
this.loadInstream=function(v,u){r=new b.api.instream(this,g,v,u);
return r
};
this.onBufferChange=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER,u)
};
this.onBufferFull=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,u)
};
this.onError=function(u){return this.eventListener(b.api.events.JWPLAYER_ERROR,u)
};
this.onFullscreen=function(u){return this.eventListener(b.api.events.JWPLAYER_FULLSCREEN,u)
};
this.onMeta=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_META,u)
};
this.onMute=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_MUTE,u)
};
this.onPlaylist=function(u){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,u)
};
this.onPlaylistItem=function(u){return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,u)
};
this.onReady=function(u){return this.eventListener(b.api.events.API_READY,u)
};
this.onResize=function(u){return this.eventListener(b.api.events.JWPLAYER_RESIZE,u)
};
this.onComplete=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,u)
};
this.onSeek=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_SEEK,u)
};
this.onTime=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_TIME,u)
};
this.onVolume=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_VOLUME,u)
};
this.onBeforePlay=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BEFOREPLAY,u)
};
this.onBeforeComplete=function(u){return this.eventListener(b.api.events.JWPLAYER_MEDIA_BEFORECOMPLETE,u)
};
this.onBuffer=function(u){return this.stateListener(b.api.events.state.BUFFERING,u)
};
this.onPause=function(u){return this.stateListener(b.api.events.state.PAUSED,u)
};
this.onPlay=function(u){return this.stateListener(b.api.events.state.PLAYING,u)
};
this.onIdle=function(u){return this.stateListener(b.api.events.state.IDLE,u)
};
this.remove=function(){if(!k){throw"Cannot call remove() before player is ready";
return
}q(this)
};
function q(u){h=[];
if(b.utils.getOuterHTML(u.container)!=o){b.api.destroyPlayer(u.id,o)
}}this.setup=function(v){if(b.embed){var u=this.id;
q(this);
var w=b(u);
w.config=v;
return new b.embed(w)
}return this
};
this.registerPlugin=function(w,v,u){b.plugins.registerPlugin(w,v,u)
};
this.setPlayer=function(u,v){g=u;
this.renderingMode=v
};
this.stateListener=function(u,v){if(!t[u]){t[u]=[];
this.eventListener(b.api.events.JWPLAYER_PLAYER_STATE,f(u))
}t[u].push(v);
return this
};
this.detachMedia=function(){if(this.renderingMode=="html5"){return this.callInternal("jwDetachMedia")
}};
this.attachMedia=function(){if(this.renderingMode=="html5"){return this.callInternal("jwAttachMedia")
}};
function f(u){return function(w){var v=w.newstate,y=w.oldstate;
if(v==u){var x=t[v];
if(x){for(var z=0;
z<x.length;
z++){if(typeof x[z]=="function"){x[z].call(this,{oldstate:y,newstate:v})
}}}}}
}this.componentListener=function(u,v,w){if(!p[u]){p[u]={}
}if(!p[u][v]){p[u][v]=[];
this.eventListener(v,l(u,v))
}p[u][v].push(w);
return this
};
function l(u,v){return function(x){if(u==x.component){var w=p[u][v];
if(w){for(var y=0;
y<w.length;
y++){if(typeof w[y]=="function"){w[y].call(this,x)
}}}}}
}this.addInternalListener=function(u,v){try{u.jwAddEventListener(v,'function(dat) { jwplayer("'+this.id+'").dispatchEvent("'+v+'", dat); }')
}catch(w){b.utils.log("Could not add internal listener")
}};
this.eventListener=function(u,v){if(!m[u]){m[u]=[];
if(g&&k){this.addInternalListener(g,u)
}}m[u].push(v);
return this
};
this.dispatchEvent=function(w){if(m[w]){var v=_utils.translateEventResponse(w,arguments[1]);
for(var u=0;
u<m[w].length;
u++){if(typeof m[w][u]=="function"){m[w][u].call(this,v)
}}}};
this.dispatchInstreamEvent=function(u){if(r){r.dispatchEvent(u,arguments)
}};
this.callInternal=function(){if(k){var w=arguments[0],u=[];
for(var v=1;
v<arguments.length;
v++){u.push(arguments[v])
}if(typeof g!="undefined"&&typeof g[w]=="function"){if(u.length==2){return(g[w])(u[0],u[1])
}else{if(u.length==1){return(g[w])(u[0])
}else{return(g[w])()
}}}return null
}else{h.push(arguments)
}};
this.playerReady=function(v){k=true;
if(!g){this.setPlayer(document.getElementById(v.id))
}this.container=document.getElementById(this.id);
for(var u in m){this.addInternalListener(g,u)
}this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,function(w){s={}
});
this.eventListener(b.api.events.JWPLAYER_MEDIA_META,function(w){b.utils.extend(s,w.metadata)
});
this.dispatchEvent(b.api.events.API_READY);
while(h.length>0){this.callInternal.apply(this,h.shift())
}};
this.getItemMeta=function(){return s
};
this.getCurrentItem=function(){return this.callInternal("jwGetPlaylistIndex")
};
function n(w,y,x){var u=[];
if(!y){y=0
}if(!x){x=w.length-1
}for(var v=y;
v<=x;
v++){u.push(w[v])
}return u
}return this
};
b.api.selectPlayer=function(d){var c;
if(!b.utils.exists(d)){d=0
}if(d.nodeType){c=d
}else{if(typeof d=="string"){c=document.getElementById(d)
}}if(c){var e=b.api.playerById(c.id);
if(e){return e
}else{return b.api.addPlayer(new b.api(c))
}}else{if(typeof d=="number"){return b.getPlayers()[d]
}}return null
};
b.api.events={API_READY:"jwplayerAPIReady",JWPLAYER_READY:"jwplayerReady",JWPLAYER_FULLSCREEN:"jwplayerFullscreen",JWPLAYER_RESIZE:"jwplayerResize",JWPLAYER_ERROR:"jwplayerError",JWPLAYER_MEDIA_BEFOREPLAY:"jwplayerMediaBeforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"jwplayerMediaBeforeComplete",JWPLAYER_COMPONENT_SHOW:"jwplayerComponentShow",JWPLAYER_COMPONENT_HIDE:"jwplayerComponentHide",JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer",JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull",JWPLAYER_MEDIA_ERROR:"jwplayerMediaError",JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded",JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete",JWPLAYER_MEDIA_SEEK:"jwplayerMediaSeek",JWPLAYER_MEDIA_TIME:"jwplayerMediaTime",JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume",JWPLAYER_MEDIA_META:"jwplayerMediaMeta",JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute",JWPLAYER_PLAYER_STATE:"jwplayerPlayerState",JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded",JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem",JWPLAYER_INSTREAM_CLICK:"jwplayerInstreamClicked",JWPLAYER_INSTREAM_DESTROYED:"jwplayerInstreamDestroyed"};
b.api.events.state={BUFFERING:"BUFFERING",IDLE:"IDLE",PAUSED:"PAUSED",PLAYING:"PLAYING"};
b.api.playerById=function(d){for(var c=0;
c<a.length;
c++){if(a[c].id==d){return a[c]
}}return null
};
b.api.addPlayer=function(c){for(var d=0;
d<a.length;
d++){if(a[d]==c){return c
}}a.push(c);
return c
};
b.api.destroyPlayer=function(h,d){var g=-1;
for(var l=0;
l<a.length;
l++){if(a[l].id==h){g=l;
continue
}}if(g>=0){try{a[g].callInternal("jwDestroy")
}catch(k){}var c=document.getElementById(a[g].id);
if(document.getElementById(a[g].id+"_wrapper")){c=document.getElementById(a[g].id+"_wrapper")
}if(c){if(d){b.utils.setOuterHTML(c,d)
}else{var j=document.createElement("div");
var f=c.id;
if(c.id.indexOf("_wrapper")==c.id.length-8){newID=c.id.substring(0,c.id.length-8)
}j.setAttribute("id",f);
c.parentNode.replaceChild(j,c)
}}a.splice(g,1)
}return null
};
b.getPlayers=function(){return a.slice(0)
}
})(jwplayer);
var _userPlayerReady=(typeof playerReady=="function")?playerReady:undefined;
playerReady=function(b){var a=jwplayer.api.playerById(b.id);
if(a){a.playerReady(b)
}else{jwplayer.api.selectPlayer(b.id).playerReady(b)
}if(_userPlayerReady){_userPlayerReady.call(this,b)
}};
(function(a){a.api.instream=function(c,j,n,q){var h=c;
var b=j;
var g=n;
var k=q;
var e={};
var p={};
function f(){h.callInternal("jwLoadInstream",n,q)
}function m(r,s){b.jwInstreamAddEventListener(s,'function(dat) { jwplayer("'+h.id+'").dispatchInstreamEvent("'+s+'", dat); }')
}function d(r,s){if(!e[r]){e[r]=[];
m(b,r)
}e[r].push(s);
return this
}function o(r,s){if(!p[r]){p[r]=[];
d(a.api.events.JWPLAYER_PLAYER_STATE,l(r))
}p[r].push(s);
return this
}function l(r){return function(t){var s=t.newstate,v=t.oldstate;
if(s==r){var u=p[s];
if(u){for(var w=0;
w<u.length;
w++){if(typeof u[w]=="function"){u[w].call(this,{oldstate:v,newstate:s,type:t.type})
}}}}}
}this.dispatchEvent=function(u,t){if(e[u]){var s=_utils.translateEventResponse(u,t[1]);
for(var r=0;
r<e[u].length;
r++){if(typeof e[u][r]=="function"){e[u][r].call(this,s)
}}}};
this.onError=function(r){return d(a.api.events.JWPLAYER_ERROR,r)
};
this.onFullscreen=function(r){return d(a.api.events.JWPLAYER_FULLSCREEN,r)
};
this.onMeta=function(r){return d(a.api.events.JWPLAYER_MEDIA_META,r)
};
this.onMute=function(r){return d(a.api.events.JWPLAYER_MEDIA_MUTE,r)
};
this.onComplete=function(r){return d(a.api.events.JWPLAYER_MEDIA_COMPLETE,r)
};
this.onSeek=function(r){return d(a.api.events.JWPLAYER_MEDIA_SEEK,r)
};
this.onTime=function(r){return d(a.api.events.JWPLAYER_MEDIA_TIME,r)
};
this.onVolume=function(r){return d(a.api.events.JWPLAYER_MEDIA_VOLUME,r)
};
this.onBuffer=function(r){return o(a.api.events.state.BUFFERING,r)
};
this.onPause=function(r){return o(a.api.events.state.PAUSED,r)
};
this.onPlay=function(r){return o(a.api.events.state.PLAYING,r)
};
this.onIdle=function(r){return o(a.api.events.state.IDLE,r)
};
this.onInstreamClick=function(r){return d(a.api.events.JWPLAYER_INSTREAM_CLICK,r)
};
this.onInstreamDestroyed=function(r){return d(a.api.events.JWPLAYER_INSTREAM_DESTROYED,r)
};
this.play=function(r){b.jwInstreamPlay(r)
};
this.pause=function(r){b.jwInstreamPause(r)
};
this.seek=function(r){b.jwInstreamSeek(r)
};
this.destroy=function(){b.jwInstreamDestroy()
};
this.getState=function(){return b.jwInstreamGetState()
};
this.getDuration=function(){return b.jwInstreamGetDuration()
};
this.getPosition=function(){return b.jwInstreamGetPosition()
};
f()
}
})(jwplayer);
(function(a){var c=a.utils;
a.embed=function(h){var k={width:400,height:300,components:{controlbar:{position:"over"}}};
var g=c.mediaparser.parseMedia(h.container);
var f=new a.embed.config(c.extend(k,g,h.config),this);
var j=a.plugins.loadPlugins(h.id,f.plugins);
function d(n,m){for(var l in m){if(typeof n[l]=="function"){(n[l]).call(n,m[l])
}}}function e(){if(j.getStatus()==c.loaderstatus.COMPLETE){for(var n=0;
n<f.modes.length;
n++){if(f.modes[n].type&&a.embed[f.modes[n].type]){var p=f.modes[n].config;
var t=f;
if(p){t=c.extend(c.clone(f),p);
var s=["file","levels","playlist"];
for(var m=0;
m<s.length;
m++){var q=s[m];
if(c.exists(p[q])){for(var l=0;
l<s.length;
l++){if(l!=m){var o=s[l];
if(c.exists(t[o])&&!c.exists(p[o])){delete t[o]
}}}}}}var r=new a.embed[f.modes[n].type](document.getElementById(h.id),f.modes[n],t,j,h);
if(r.supportsConfig()){r.embed();
d(h,f.events);
return h
}}}c.log("No suitable players found");
new a.embed.logo(c.extend({hide:true},f.components.logo),"none",h.id)
}}j.addEventListener(a.events.COMPLETE,e);
j.addEventListener(a.events.ERROR,e);
j.load();
return h
};
function b(){if(!document.body){return setTimeout(b,15)
}var d=c.selectors.getElementsByTagAndClass("video","jwplayer");
for(var e=0;
e<d.length;
e++){var f=d[e];
if(f.id==""){f.id="jwplayer_"+Math.round(Math.random()*100000)
}a(f.id).setup({})
}}b()
})(jwplayer);
(function(e){var k=e.utils;
function h(m){var l=[{type:"flash",src:m?m:"/jwplayer/player.swf"},{type:"html5"},{type:"download"}];
if(k.isAndroid()){l[0]=l.splice(1,1,l[0])[0]
}return l
}var a={players:"modes",autoplay:"autostart"};
function b(o){var n=o.toLowerCase();
var m=["left","right","top","bottom"];
for(var l=0;
l<m.length;
l++){if(n==m[l]){return true
}}return false
}function c(m){var l=false;
l=(m instanceof Array)||(typeof m=="object"&&!m.position&&!m.size);
return l
}function j(l){if(typeof l=="string"){if(parseInt(l).toString()==l||l.toLowerCase().indexOf("px")>-1){return parseInt(l)
}}return l
}var g=["playlist","dock","controlbar","logo","display"];
function f(l){var o={};
switch(k.typeOf(l.plugins)){case"object":for(var n in l.plugins){o[k.getPluginName(n)]=n
}break;
case"string":var p=l.plugins.split(",");
for(var m=0;
m<p.length;
m++){o[k.getPluginName(p[m])]=p[m]
}break
}return o
}function d(p,o,n,l){if(k.typeOf(p[o])!="object"){p[o]={}
}var m=p[o][n];
if(k.typeOf(m)!="object"){p[o][n]=m={}
}if(l){if(o=="plugins"){var q=k.getPluginName(n);
m[l]=p[q+"."+l];
delete p[q+"."+l]
}else{m[l]=p[n+"."+l];
delete p[n+"."+l]
}}}e.embed.deserialize=function(m){var n=f(m);
for(var l in n){d(m,"plugins",n[l])
}for(var q in m){if(q.indexOf(".")>-1){var p=q.split(".");
var o=p[0];
var q=p[1];
if(k.isInArray(g,o)){d(m,"components",o,q)
}else{if(n[o]){d(m,"plugins",n[o],q)
}}}}return m
};
e.embed.config=function(l,v){var u=k.extend({},l);
var s;
if(c(u.playlist)){s=u.playlist;
delete u.playlist
}u=e.embed.deserialize(u);
u.height=j(u.height);
u.width=j(u.width);
if(typeof u.plugins=="string"){var m=u.plugins.split(",");
if(typeof u.plugins!="object"){u.plugins={}
}for(var q=0;
q<m.length;
q++){var r=k.getPluginName(m[q]);
if(typeof u[r]=="object"){u.plugins[m[q]]=u[r];
delete u[r]
}else{u.plugins[m[q]]={}
}}}for(var t=0;
t<g.length;
t++){var p=g[t];
if(k.exists(u[p])){if(typeof u[p]!="object"){if(!u.components[p]){u.components[p]={}
}if(p=="logo"){u.components[p].file=u[p]
}else{u.components[p].position=u[p]
}delete u[p]
}else{if(!u.components[p]){u.components[p]={}
}k.extend(u.components[p],u[p]);
delete u[p]
}}if(typeof u[p+"size"]!="undefined"){if(!u.components[p]){u.components[p]={}
}u.components[p].size=u[p+"size"];
delete u[p+"size"]
}}if(typeof u.icons!="undefined"){if(!u.components.display){u.components.display={}
}u.components.display.icons=u.icons;
delete u.icons
}for(var o in a){if(u[o]){if(!u[a[o]]){u[a[o]]=u[o]
}delete u[o]
}}var n;
if(u.flashplayer&&!u.modes){n=h(u.flashplayer);
delete u.flashplayer
}else{if(u.modes){if(typeof u.modes=="string"){n=h(u.modes)
}else{if(u.modes instanceof Array){n=u.modes
}else{if(typeof u.modes=="object"&&u.modes.type){n=[u.modes]
}}}delete u.modes
}else{n=h()
}}u.modes=n;
if(s){u.playlist=s
}return u
}
})(jwplayer);
(function(a){a.embed.download=function(c,g,b,d,f){this.embed=function(){var k=a.utils.extend({},b);
var q={};
var j=b.width?b.width:480;
if(typeof j!="number"){j=parseInt(j,10)
}var m=b.height?b.height:320;
if(typeof m!="number"){m=parseInt(m,10)
}var u,o,n;
var s={};
if(b.playlist&&b.playlist.length){s.file=b.playlist[0].file;
o=b.playlist[0].image;
s.levels=b.playlist[0].levels
}else{s.file=b.file;
o=b.image;
s.levels=b.levels
}if(s.file){u=s.file
}else{if(s.levels&&s.levels.length){u=s.levels[0].file
}}n=u?"pointer":"auto";
var l={display:{style:{cursor:n,width:j,height:m,backgroundColor:"#000",position:"relative",textDecoration:"none",border:"none",display:"block"}},display_icon:{style:{cursor:n,position:"absolute",display:u?"block":"none",top:0,left:0,border:0,margin:0,padding:0,zIndex:3,width:50,height:50,backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrs18ENgjAYhmFouDOCcQJGcARHgE10BDcgTOIosAGwQOuPwaQeuFRi2p/3Sb6EC5L3QCxZBgAAAOCorLW1zMn65TrlkH4NcV7QNcUQt7Gn7KIhxA+qNIR81spOGkL8oFJDyLJRdosqKDDkK+iX5+d7huzwM40xptMQMkjIOeRGo+VkEVvIPfTGIpKASfYIfT9iCHkHrBEzf4gcUQ56aEzuGK/mw0rHpy4AAACAf3kJMACBxjAQNRckhwAAAABJRU5ErkJggg==)"}},display_iconBackground:{style:{cursor:n,position:"absolute",display:u?"block":"none",top:((m-50)/2),left:((j-50)/2),border:0,width:50,height:50,margin:0,padding:0,zIndex:2,backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNrszwENADAIA7DhX8ENoBMZ5KR10EryckCJiIiIiIiIiIiIiIiIiIiIiIh8GmkRERERERERERERERERERERERGRHSPAAPlXH1phYpYaAAAAAElFTkSuQmCC)"}},display_image:{style:{width:j,height:m,display:o?"block":"none",position:"absolute",cursor:n,left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1,border:"none"}}};
var h=function(v,x,y){var w=document.createElement(v);
if(y){w.id=y
}else{w.id=c.id+"_jwplayer_"+x
}a.utils.css(w,l[x].style);
return w
};
q.display=h("a","display",c.id);
if(u){q.display.setAttribute("href",a.utils.getAbsolutePath(u))
}q.display_image=h("img","display_image");
q.display_image.setAttribute("alt","Click to download...");
if(o){q.display_image.setAttribute("src",a.utils.getAbsolutePath(o))
}if(true){q.display_icon=h("div","display_icon");
q.display_iconBackground=h("div","display_iconBackground");
q.display.appendChild(q.display_image);
q.display_iconBackground.appendChild(q.display_icon);
q.display.appendChild(q.display_iconBackground)
}_css=a.utils.css;
_hide=function(v){_css(v,{display:"none"})
};
function r(v){_imageWidth=q.display_image.naturalWidth;
_imageHeight=q.display_image.naturalHeight;
t()
}function t(){a.utils.stretch(a.utils.stretching.UNIFORM,q.display_image,j,m,_imageWidth,_imageHeight)
}q.display_image.onerror=function(v){_hide(q.display_image)
};
q.display_image.onload=r;
c.parentNode.replaceChild(q.display,c);
var p=(b.plugins&&b.plugins.logo)?b.plugins.logo:{};
q.display.appendChild(new a.embed.logo(b.components.logo,"download",c.id));
f.container=document.getElementById(f.id);
f.setPlayer(q.display,"download")
};
this.supportsConfig=function(){if(b){var j=a.utils.getFirstPlaylistItemFromConfig(b);
if(typeof j.file=="undefined"&&typeof j.levels=="undefined"){return true
}else{if(j.file){return e(j.file,j.provider,j.playlistfile)
}else{if(j.levels&&j.levels.length){for(var h=0;
h<j.levels.length;
h++){if(j.levels[h].file&&e(j.levels[h].file,j.provider,j.playlistfile)){return true
}}}}}}else{return true
}};
function e(j,l,h){if(h){return false
}var k=["image","sound","youtube","http"];
if(l&&(k.toString().indexOf(l)>-1)){return true
}if(!l||(l&&l=="video")){var m=a.utils.extension(j);
if(m&&a.utils.extensionmap[m]){return true
}}return false
}}
})(jwplayer);
(function(a){a.embed.flash=function(f,g,l,e,j){function m(o,n,p){var q=document.createElement("param");
q.setAttribute("name",n);
q.setAttribute("value",p);
o.appendChild(q)
}function k(o,p,n){return function(q){if(n){document.getElementById(j.id+"_wrapper").appendChild(p)
}var s=document.getElementById(j.id).getPluginConfig("display");
o.resize(s.width,s.height);
var r={left:s.x,top:s.y};
a.utils.css(p,r)
}
}function d(p){if(!p){return{}
}var r={};
for(var o in p){var n=p[o];
for(var q in n){r[o+"."+q]=n[q]
}}return r
}function h(q,p){if(q[p]){var s=q[p];
for(var o in s){var n=s[o];
if(typeof n=="string"){if(!q[o]){q[o]=n
}}else{for(var r in n){if(!q[o+"."+r]){q[o+"."+r]=n[r]
}}}}delete q[p]
}}function b(q){if(!q){return{}
}var t={},s=[];
for(var n in q){var p=a.utils.getPluginName(n);
var o=q[n];
s.push(n);
for(var r in o){t[p+"."+r]=o[r]
}}t.plugins=s.join(",");
return t
}function c(p){var n=p.netstreambasepath?"":"netstreambasepath="+encodeURIComponent(window.location.href.split("#")[0])+"&";
for(var o in p){if(typeof(p[o])=="object"){n+=o+"="+encodeURIComponent("[[JSON]]"+a.utils.strings.jsonToString(p[o]))+"&"
}else{n+=o+"="+encodeURIComponent(p[o])+"&"
}}return n.substring(0,n.length-1)
}this.embed=function(){l.id=j.id;
var A;
var r=a.utils.extend({},l);
var o=r.width;
var y=r.height;
if(f.id+"_wrapper"==f.parentNode.id){A=document.getElementById(f.id+"_wrapper")
}else{A=document.createElement("div");
A.id=f.id+"_wrapper";
a.utils.wrap(f,A);
a.utils.css(A,{position:"relative",width:o,height:y})
}var p=e.setupPlugins(j,r,k);
if(p.length>0){a.utils.extend(r,b(p.plugins))
}else{delete r.plugins
}var s=["height","width","modes","events"];
for(var v=0;
v<s.length;
v++){delete r[s[v]]
}var q="opaque";
if(r.wmode){q=r.wmode
}h(r,"components");
h(r,"providers");
if(typeof r["dock.position"]!="undefined"){if(r["dock.position"].toString().toLowerCase()=="false"){r.dock=r["dock.position"];
delete r["dock.position"]
}}var x=a.utils.getCookies();
for(var n in x){if(typeof(r[n])=="undefined"){r[n]=x[n]
}}var z="#000000";
var u;
if(a.utils.isIE()){var w='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" bgcolor="'+z+'" width="100%" height="100%" id="'+f.id+'" name="'+f.id+'" tabindex=0"">';
w+='<param name="movie" value="'+g.src+'">';
w+='<param name="allowfullscreen" value="true">';
w+='<param name="allowscriptaccess" value="always">';
w+='<param name="seamlesstabbing" value="true">';
w+='<param name="wmode" value="'+q+'">';
w+='<param name="flashvars" value="'+c(r)+'">';
w+="</object>";
a.utils.setOuterHTML(f,w);
u=document.getElementById(f.id)
}else{var t=document.createElement("object");
t.setAttribute("type","application/x-shockwave-flash");
t.setAttribute("data",g.src);
t.setAttribute("width","100%");
t.setAttribute("height","100%");
t.setAttribute("bgcolor","#000000");
t.setAttribute("id",f.id);
t.setAttribute("name",f.id);
t.setAttribute("tabindex",0);
m(t,"allowfullscreen","true");
m(t,"allowscriptaccess","always");
m(t,"seamlesstabbing","true");
m(t,"wmode",q);
m(t,"flashvars",c(r));
f.parentNode.replaceChild(t,f);
u=t
}j.container=u;
j.setPlayer(u,"flash")
};
this.supportsConfig=function(){if(a.utils.hasFlash()){if(l){var o=a.utils.getFirstPlaylistItemFromConfig(l);
if(typeof o.file=="undefined"&&typeof o.levels=="undefined"){return true
}else{if(o.file){return flashCanPlay(o.file,o.provider)
}else{if(o.levels&&o.levels.length){for(var n=0;
n<o.levels.length;
n++){if(o.levels[n].file&&flashCanPlay(o.levels[n].file,o.provider)){return true
}}}}}}else{return true
}}return false
};
flashCanPlay=function(n,p){var o=["video","http","sound","image"];
if(p&&(o.toString().indexOf(p)<0)){return true
}var q=a.utils.extension(n);
if(!q){return true
}if(a.utils.exists(a.utils.extensionmap[q])&&!a.utils.exists(a.utils.extensionmap[q].flash)){return false
}return true
}
}
})(jwplayer);
(function(a){a.embed.html5=function(c,g,b,d,f){function e(j,k,h){return function(l){var m=document.getElementById(c.id+"_displayarea");
if(h){m.appendChild(k)
}j.resize(m.clientWidth,m.clientHeight);
k.left=m.style.left;
k.top=m.style.top
}
}this.embed=function(){if(a.html5){d.setupPlugins(f,b,e);
c.innerHTML="";
var j=a.utils.extend({screencolor:"0x000000"},b);
var h=["plugins","modes","events"];
for(var k=0;
k<h.length;
k++){delete j[h[k]]
}if(j.levels&&!j.sources){j.sources=b.levels
}if(j.skin&&j.skin.toLowerCase().indexOf(".zip")>0){j.skin=j.skin.replace(/\.zip/i,".xml")
}var l=new (a.html5(c)).setup(j);
f.container=document.getElementById(f.id);
f.setPlayer(l,"html5")
}else{return null
}};
this.supportsConfig=function(){if(!!a.vid.canPlayType){if(b){var j=a.utils.getFirstPlaylistItemFromConfig(b);
if(typeof j.file=="undefined"&&typeof j.levels=="undefined"){return true
}else{if(j.file){return html5CanPlay(a.vid,j.file,j.provider,j.playlistfile)
}else{if(j.levels&&j.levels.length){for(var h=0;
h<j.levels.length;
h++){if(j.levels[h].file&&html5CanPlay(a.vid,j.levels[h].file,j.provider,j.playlistfile)){return true
}}}}}}else{return true
}}return false
};
html5CanPlay=function(k,j,l,h){if(h){return false
}if(l&&l=="youtube"){return true
}if(l&&l!="video"&&l!="http"&&l!="sound"){return false
}if(navigator.userAgent.match(/BlackBerry/i)!==null){return false
}var m=a.utils.extension(j);
if(!a.utils.exists(m)||!a.utils.exists(a.utils.extensionmap[m])){return true
}if(!a.utils.exists(a.utils.extensionmap[m].html5)){return false
}if(a.utils.isLegacyAndroid()&&m.match(/m4v|mp4/)){return true
}return browserCanPlay(k,a.utils.extensionmap[m].html5)
};
browserCanPlay=function(j,h){if(!h){return true
}if(j.canPlayType(h)){return true
}else{if(h=="audio/mp3"&&navigator.userAgent.match(/safari/i)){return j.canPlayType("audio/mpeg")
}else{return false
}}}
}
})(jwplayer);
(function(a){a.embed.logo=function(m,l,d){var j={prefix:"http://l.longtailvideo.com/"+l+"/",file:"",link:"",linktarget:"_top",margin:8,out:0.5,over:1,timeout:5,hide:false,position:"bottom-left"};
_css=a.utils.css;
var b;
var h;
k();
function k(){o();
c();
f()
}function o(){if(j.prefix){var q=a.version.split(/\W/).splice(0,2).join("/");
if(j.prefix.indexOf(q)<0){j.prefix+=q+"/"
}}h=a.utils.extend({},j,m)
}function p(){var s={border:"none",textDecoration:"none",position:"absolute",cursor:"pointer",zIndex:10};
s.display=h.hide?"none":"block";
var r=h.position.toLowerCase().split("-");
for(var q in r){s[r[q]]=h.margin
}return s
}function c(){b=document.createElement("img");
b.id=d+"_jwplayer_logo";
b.style.display="none";
b.onload=function(q){_css(b,p());
e()
};
if(!h.file){return
}if(h.file.indexOf("http://")===0){b.src=h.file
}else{b.src=h.prefix+h.file
}}if(!h.file){return
}function f(){if(h.link){b.onmouseover=g;
b.onmouseout=e;
b.onclick=n
}else{this.mouseEnabled=false
}}function n(q){if(typeof q!="undefined"){q.preventDefault();
q.stopPropagation()
}if(h.link){window.open(h.link,h.linktarget)
}return
}function e(q){if(h.link){b.style.opacity=h.out
}return
}function g(q){if(h.hide){b.style.opacity=h.over
}return
}return b
}
})(jwplayer);
(function(a){a.html5=function(b){var c=b;
this.setup=function(d){a.utils.extend(this,new a.html5.api(c,d));
return this
};
return this
}
})(jwplayer);
(function(a){var d=a.utils;
var b=d.css;
var c=d.isIOS();
a.html5.view=function(n,H,h){var m=n;
var y=H;
var j=h;
var R;
var g;
var t;
var o;
var F;
var P;
var O;
var E=false;
var x=false;
var A,N;
var f,S,u;
function L(){R=document.createElement("div");
R.id=y.id;
R.className=y.className;
_videowrapper=document.createElement("div");
_videowrapper.id=R.id+"_video_wrapper";
y.id=R.id+"_video";
b(R,{position:"relative",height:j.height,width:j.width,padding:0,backgroundColor:U(),zIndex:0});
function U(){if(m.skin.getComponentSettings("display")&&m.skin.getComponentSettings("display").backgroundcolor){return m.skin.getComponentSettings("display").backgroundcolor
}return parseInt("000000",16)
}b(y,{width:"100%",height:"100%",top:0,left:0,zIndex:1,margin:"auto",display:"block"});
b(_videowrapper,{overflow:"hidden",position:"absolute",top:0,left:0,bottom:0,right:0});
d.wrap(y,R);
d.wrap(y,_videowrapper);
o=document.createElement("div");
o.id=R.id+"_displayarea";
R.appendChild(o);
_instreamArea=document.createElement("div");
_instreamArea.id=R.id+"_instreamarea";
b(_instreamArea,{overflow:"hidden",position:"absolute",top:0,left:0,bottom:0,right:0,zIndex:100,background:"000000",display:"none"});
R.appendChild(_instreamArea)
}function K(){for(var U=0;
U<j.plugins.order.length;
U++){var V=j.plugins.order[U];
if(d.exists(j.plugins.object[V].getDisplayElement)){j.plugins.object[V].height=d.parseDimension(j.plugins.object[V].getDisplayElement().style.height);
j.plugins.object[V].width=d.parseDimension(j.plugins.object[V].getDisplayElement().style.width);
j.plugins.config[V].currentPosition=j.plugins.config[V].position
}}v()
}function s(U){x=j.fullscreen
}function p(U){if(S){return
}switch(U.newstate){case a.api.events.state.PLAYING:if(j.getMedia()&&j.getMedia().hasChrome()){o.style.display="none"
}break;
default:o.style.display="block";
break
}l()
}function v(V){var X=j.getMedia()?j.getMedia().getDisplayElement():null;
if(d.exists(X)){if(O!=X){if(O&&O.parentNode){O.parentNode.replaceChild(X,O)
}O=X
}for(var U=0;
U<j.plugins.order.length;
U++){var W=j.plugins.order[U];
if(d.exists(j.plugins.object[W].getDisplayElement)){j.plugins.config[W].currentPosition=j.plugins.config[W].position
}}}G(j.width,j.height)
}this.setup=function(){if(j&&j.getMedia()){y=j.getMedia().getDisplayElement()
}L();
K();
m.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,p);
m.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_LOADED,v);
m.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_BEFOREPLAY,s);
m.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_META,function(V){l()
});
var U;
if(d.exists(window.onresize)){U=window.onresize
}window.onresize=function(V){if(d.exists(U)){try{U(V)
}catch(X){}}if(m.jwGetFullscreen()){if(!B()){var W=d.getBoundingClientRect(document.body);
j.width=Math.abs(W.left)+Math.abs(W.right);
j.height=window.innerHeight;
G(j.width,j.height)
}}else{G(j.width,j.height)
}}
};
function M(U){switch(U.keyCode){case 27:if(m.jwGetFullscreen()){m.jwSetFullscreen(false)
}break;
case 32:if(m.jwGetState()!=a.api.events.state.IDLE&&m.jwGetState()!=a.api.events.state.PAUSED){m.jwPause()
}else{m.jwPlay()
}break
}}function G(U,ad){if(R.style.display=="none"){return
}var X=[].concat(j.plugins.order);
X.reverse();
F=X.length+2;
if(x&&B()){try{if(j.fullscreen&&!j.getMedia().getDisplayElement().webkitDisplayingFullscreen){j.fullscreen=false
}}catch(aa){}}if(!j.fullscreen){g=U;
t=ad;
if(typeof U=="string"&&U.indexOf("%")>0){g=d.getElementWidth(d.parentNode(R))*parseInt(U.replace("%"),"")/100
}else{g=U
}if(typeof ad=="string"&&ad.indexOf("%")>0){t=d.getElementHeight(d.parentNode(R))*parseInt(ad.replace("%"),"")/100
}else{t=ad
}var Y={top:0,bottom:0,left:0,right:0,width:g,height:t,position:"absolute"};
b(o,Y);
var ae={};
var ab;
try{ab=j.plugins.object.display.getDisplayElement()
}catch(aa){}if(ab){ae.width=d.parseDimension(ab.style.width);
ae.height=d.parseDimension(ab.style.height)
}var ac=d.extend({},Y,ae,{zIndex:_instreamArea.style.zIndex,display:_instreamArea.style.display});
b(_instreamArea,ac);
b(R,{height:t,width:g});
var Z=w(I,X);
if(Z.length>0){F+=Z.length;
var W=Z.indexOf("playlist"),V=Z.indexOf("controlbar");
if(W>=0&&V>=0){Z[W]=Z.splice(V,1,Z[W])[0]
}w(q,Z,true)
}A=d.getElementWidth(o);
N=d.getElementHeight(o)
}else{if(!B()&&!c){w(e,X,true)
}}l()
}var r;
function w(ab,X,Y){r=0;
var Z=[];
for(var W=0;
W<X.length;
W++){var aa=X[W];
if(d.exists(j.plugins.object[aa].getDisplayElement)){if(j.plugins.config[aa].currentPosition!=a.html5.view.positions.NONE){var U=ab(aa,F--);
if(!U){Z.push(aa)
}else{var V=U.width;
var ac=U.height;
if(Y){delete U.width;
delete U.height
}b(j.plugins.object[aa].getDisplayElement(),U);
j.plugins.object[aa].resize(V,ac)
}}else{b(j.plugins.object[aa].getDisplayElement(),{display:"none"})
}}}return Z
}function I(V,W){if(d.exists(j.plugins.object[V].getDisplayElement)){if(j.plugins.config[V].position&&T(j.plugins.config[V].position)){if(!d.exists(j.plugins.object[V].getDisplayElement().parentNode)){R.appendChild(j.plugins.object[V].getDisplayElement())
}var U=z(V);
U.zIndex=W;
return U
}}return false
}function q(U,V){if(!d.exists(j.plugins.object[U].getDisplayElement().parentNode)){o.appendChild(j.plugins.object[U].getDisplayElement())
}return{position:"absolute",width:(d.getElementWidth(o)-d.parseDimension(o.style.right)),height:(d.getElementHeight(o)-d.parseDimension(o.style.bottom)),zIndex:V}
}function e(U,V){return{position:"fixed",width:j.width,height:j.height,zIndex:V}
}var l=this.resizeMedia=function(){o.style.position="absolute";
var W=j.getMedia()?j.getMedia().getDisplayElement():u;
if(!W){return
}if(W&&W.tagName.toLowerCase()=="video"){if(!W.videoWidth||!W.videoHeight){W.style.width=o.style.width;
W.style.height=o.style.height;
return
}W.style.position="absolute";
d.fadeTo(W,1,0.25);
if(W.parentNode){W.parentNode.style.left=o.style.left;
W.parentNode.style.top=o.style.top
}if(j.fullscreen&&m.jwGetStretching()==a.utils.stretching.EXACTFIT&&!d.isMobile()){var U=document.createElement("div");
d.stretch(a.utils.stretching.UNIFORM,U,d.getElementWidth(o),d.getElementHeight(o),A,N);
d.stretch(a.utils.stretching.EXACTFIT,W,d.parseDimension(U.style.width),d.parseDimension(U.style.height),W.videoWidth?W.videoWidth:400,W.videoHeight?W.videoHeight:300);
b(W,{left:U.style.left,top:U.style.top})
}else{if(!c){d.stretch(m.jwGetStretching(),W,d.getElementWidth(o),d.getElementHeight(o),W.videoWidth?W.videoWidth:400,W.videoHeight?W.videoHeight:300)
}}}else{var V=j.plugins.object.display.getDisplayElement();
if(V){j.getMedia().resize(d.parseDimension(V.style.width),d.parseDimension(V.style.height))
}else{j.getMedia().resize(d.parseDimension(o.style.width),d.parseDimension(o.style.height))
}}};
var z=this.getComponentPosition=function(V){var W={position:"absolute",margin:0,padding:0,top:null};
var U=j.plugins.config[V].currentPosition.toLowerCase();
switch(U.toUpperCase()){case a.html5.view.positions.TOP:W.top=d.parseDimension(o.style.top);
W.left=d.parseDimension(o.style.left);
W.width=d.getElementWidth(o)-d.parseDimension(o.style.left)-d.parseDimension(o.style.right);
W.height=j.plugins.object[V].height;
o.style[U]=d.parseDimension(o.style[U])+j.plugins.object[V].height+"px";
o.style.height=d.getElementHeight(o)-W.height+"px";
break;
case a.html5.view.positions.RIGHT:W.top=d.parseDimension(o.style.top);
W.right=d.parseDimension(o.style.right);
W.width=j.plugins.object[V].width;
W.height=d.getElementHeight(o)-d.parseDimension(o.style.top)-d.parseDimension(o.style.bottom);
o.style.width=d.getElementWidth(o)-W.width+"px";
break;
case a.html5.view.positions.BOTTOM:W.left=d.parseDimension(o.style.left);
W.width=d.getElementWidth(o)-d.parseDimension(o.style.left)-d.parseDimension(o.style.right);
W.height=j.plugins.object[V].height;
W.bottom=d.parseDimension(o.style.bottom+r);
r+=W.height;
o.style.height=d.getElementHeight(o)-W.height+"px";
break;
case a.html5.view.positions.LEFT:W.top=d.parseDimension(o.style.top);
W.left=d.parseDimension(o.style.left);
W.width=j.plugins.object[V].width;
W.height=d.getElementHeight(o)-d.parseDimension(o.style.top)-d.parseDimension(o.style.bottom);
o.style[U]=d.parseDimension(o.style[U])+j.plugins.object[V].width+"px";
o.style.width=d.getElementWidth(o)-W.width+"px";
break;
default:break
}return W
};
this.resize=G;
var J,k,Q;
var C=this.fullscreen=function(W){if(c){return
}var Y;
try{Y=j.getMedia().getDisplayElement()
}catch(X){}if(W){k=j.width;
Q=j.height
}var aa={position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:2147483000},Z={position:"relative",height:k,width:Q,zIndex:0};
if(B()&&Y&&Y.webkitSupportsFullscreen){if(W&&!Y.webkitDisplayingFullscreen){try{b(Y,aa);
d.transform(Y);
J=o.style.display;
o.style.display="none";
Y.webkitEnterFullscreen()
}catch(V){}}else{if(!W){b(Y,Z);
l();
if(Y.webkitDisplayingFullscreen){try{Y.webkitExitFullscreen()
}catch(V){}}o.style.display=J
}}E=false
}else{if(W){document.onkeydown=M;
clearInterval(P);
var U=d.getBoundingClientRect(document.body);
j.width=Math.abs(U.left)+Math.abs(U.right);
j.height=window.innerHeight;
b(R,aa);
aa.zIndex=1;
if(j.getMedia()&&j.getMedia().getDisplayElement()){b(j.getMedia().getDisplayElement(),aa)
}aa.zIndex=2;
b(o,aa);
E=true
}else{document.onkeydown="";
j.width=g;
j.height=t;
b(R,Z);
E=false
}G(j.width,j.height)
}};
function T(U){return([a.html5.view.positions.TOP,a.html5.view.positions.RIGHT,a.html5.view.positions.BOTTOM,a.html5.view.positions.LEFT].toString().indexOf(U.toUpperCase())>-1)
}function B(){if(m.jwGetState()!=a.api.events.state.IDLE&&!E&&(j.getMedia()&&j.getMedia().getDisplayElement()&&j.getMedia().getDisplayElement().webkitSupportsFullscreen)&&d.useNativeFullscreen()){return true
}return false
}this.setupInstream=function(U,V){d.css(_instreamArea,{display:"block",position:"absolute"});
o.style.display="none";
_instreamArea.appendChild(U);
u=V;
S=true
};
var D=this.destroyInstream=function(){_instreamArea.style.display="none";
_instreamArea.innerHTML="";
o.style.display="block";
u=null;
S=false;
G(j.width,j.height)
}
};
a.html5.view.positions={TOP:"TOP",RIGHT:"RIGHT",BOTTOM:"BOTTOM",LEFT:"LEFT",OVER:"OVER",NONE:"NONE"}
})(jwplayer);
(function(a){var b={backgroundcolor:"",margin:10,font:"Arial,sans-serif",fontsize:10,fontcolor:parseInt("000000",16),fontstyle:"normal",fontweight:"bold",buttoncolor:parseInt("ffffff",16),position:a.html5.view.positions.BOTTOM,idlehide:false,hideplaylistcontrols:false,forcenextprev:false,layout:{left:{position:"left",elements:[{name:"play",type:"button"},{name:"divider",type:"divider"},{name:"prev",type:"button"},{name:"divider",type:"divider"},{name:"next",type:"button"},{name:"divider",type:"divider"},{name:"elapsed",type:"text"}]},center:{position:"center",elements:[{name:"time",type:"slider"}]},right:{position:"right",elements:[{name:"duration",type:"text"},{name:"blank",type:"button"},{name:"divider",type:"divider"},{name:"mute",type:"button"},{name:"volume",type:"slider"},{name:"divider",type:"divider"},{name:"fullscreen",type:"button"}]}}};
_utils=a.utils;
_css=_utils.css;
_hide=function(c){_css(c,{display:"none"})
};
_show=function(c){_css(c,{display:"block"})
};
a.html5.controlbar=function(m,Y){window.controlbar=this;
var l=m;
var D=_utils.extend({},b,l.skin.getComponentSettings("controlbar"),Y);
if(D.position==a.html5.view.positions.NONE||typeof a.html5.view.positions[D.position]=="undefined"){return
}if(_utils.mapLength(l.skin.getComponentLayout("controlbar"))>0){D.layout=l.skin.getComponentLayout("controlbar")
}var ag;
var R;
var af;
var E;
var w="none";
var h;
var k;
var ah;
var g;
var f;
var z;
var S={};
var q=false;
var c={};
var Q=-1;
var ac;
var j=false;
var p;
var d;
var V=false;
var G=false;
var H;
var aa=new a.html5.eventdispatcher();
_utils.extend(this,aa);
function K(){if(!ac){ac=l.skin.getSkinElement("controlbar","background");
if(!ac){ac={width:0,height:0,src:null}
}}return ac
}function O(){af=0;
E=0;
R=0;
if(!q){var ap={height:K().height,backgroundColor:D.backgroundcolor};
ag=document.createElement("div");
ag.id=l.id+"_jwplayer_controlbar";
_css(ag,ap)
}var ao=(l.skin.getSkinElement("controlbar","capLeft"));
var an=(l.skin.getSkinElement("controlbar","capRight"));
if(ao){y("capLeft","left",false,ag)
}ad("background",ag,{position:"absolute",height:K().height,left:(ao?ao.width:0),zIndex:0},"img");
if(K().src){S.background.src=K().src
}ad("elements",ag,{position:"relative",height:K().height,zIndex:1});
if(an){y("capRight","right",false,ag)
}}this.getDisplayElement=function(){return ag
};
this.resize=function(ap,an){T();
_utils.cancelAnimation(ag);
f=ap;
z=an;
if(G!=l.jwGetFullscreen()){G=l.jwGetFullscreen();
if(!G){Z()
}d=undefined
}var ao=x();
J({id:l.id,duration:ah,position:k});
v({id:l.id,bufferPercent:g});
return ao
};
this.show=function(){if(j){j=false;
_show(ag);
W()
}};
this.hide=function(){if(!j){j=true;
_hide(ag);
ae()
}};
function r(){var ao=["timeSlider","volumeSlider","timeSliderRail","volumeSliderRail"];
for(var ap in ao){var an=ao[ap];
if(typeof S[an]!="undefined"){c[an]=_utils.getBoundingClientRect(S[an])
}}}var e;
function Z(an){if(j){return
}clearTimeout(p);
if(D.position==a.html5.view.positions.OVER||l.jwGetFullscreen()){switch(l.jwGetState()){case a.api.events.state.PAUSED:case a.api.events.state.IDLE:if(ag&&ag.style.opacity<1&&(!D.idlehide||_utils.exists(an))){e=false;
setTimeout(function(){if(!e){X()
}},100)
}if(D.idlehide){p=setTimeout(function(){A()
},2000)
}break;
default:e=true;
if(an){X()
}p=setTimeout(function(){A()
},2000);
break
}}else{X()
}}function A(){if(!j){ae();
if(ag.style.opacity==1){_utils.cancelAnimation(ag);
_utils.fadeTo(ag,0,0.1,1,0)
}}}function X(){if(!j){W();
if(ag.style.opacity==0){_utils.cancelAnimation(ag);
_utils.fadeTo(ag,1,0.1,0,0)
}}}function I(an){return function(){if(V&&d!=an){d=an;
aa.sendEvent(an,{component:"controlbar",boundingRect:P()})
}}
}var W=I(a.api.events.JWPLAYER_COMPONENT_SHOW);
var ae=I(a.api.events.JWPLAYER_COMPONENT_HIDE);
function P(){if(D.position==a.html5.view.positions.OVER||l.jwGetFullscreen()){return _utils.getDimensions(ag)
}else{return{x:0,y:0,width:0,height:0}
}}function ad(ar,aq,ap,an){var ao;
if(!q){if(!an){an="div"
}ao=document.createElement(an);
S[ar]=ao;
ao.id=ag.id+"_"+ar;
aq.appendChild(ao)
}else{ao=document.getElementById(ag.id+"_"+ar)
}if(_utils.exists(ap)){_css(ao,ap)
}return ao
}function N(){if(l.jwGetHeight()<=40){D.layout=_utils.clone(D.layout);
for(var an=0;
an<D.layout.left.elements.length;
an++){if(D.layout.left.elements[an].name=="fullscreen"){D.layout.left.elements.splice(an,1)
}}for(an=0;
an<D.layout.right.elements.length;
an++){if(D.layout.right.elements[an].name=="fullscreen"){D.layout.right.elements.splice(an,1)
}}o()
}am(D.layout.left);
am(D.layout.center);
am(D.layout.right)
}function am(aq,an){var ar=aq.position=="right"?"right":"left";
var ap=_utils.extend([],aq.elements);
if(_utils.exists(an)){ap.reverse()
}var aq=ad(aq.position+"Group",S.elements,{"float":"left",styleFloat:"left",cssFloat:"left",height:"100%"});
for(var ao=0;
ao<ap.length;
ao++){C(ap[ao],ar,aq)
}}function L(){return R++
}function C(ar,au,aw){var aq,ao,ap,an,ax;
if(!aw){aw=S.elements
}if(ar.type=="divider"){y("divider"+L(),au,true,aw,undefined,ar.width,ar.element);
return
}switch(ar.name){case"play":y("playButton",au,false,aw);
y("pauseButton",au,true,aw);
U("playButton","jwPlay");
U("pauseButton","jwPause");
break;
case"prev":y("prevButton",au,true,aw);
U("prevButton","jwPlaylistPrev");
break;
case"stop":y("stopButton",au,true,aw);
U("stopButton","jwStop");
break;
case"next":y("nextButton",au,true,aw);
U("nextButton","jwPlaylistNext");
break;
case"elapsed":y("elapsedText",au,true,aw,null,null,l.skin.getSkinElement("controlbar","elapsedBackground"));
break;
case"time":ao=!_utils.exists(l.skin.getSkinElement("controlbar","timeSliderCapLeft"))?0:l.skin.getSkinElement("controlbar","timeSliderCapLeft").width;
ap=!_utils.exists(l.skin.getSkinElement("controlbar","timeSliderCapRight"))?0:l.skin.getSkinElement("controlbar","timeSliderCapRight").width;
aq=au=="left"?ao:ap;
ax={height:K().height,position:"relative","float":"left",styleFloat:"left",cssFloat:"left"};
var at=ad("timeSlider",aw,ax);
y("timeSliderCapLeft",au,true,at,"relative");
y("timeSliderRail",au,false,at,"relative");
y("timeSliderBuffer",au,false,at,"absolute");
y("timeSliderProgress",au,false,at,"absolute");
y("timeSliderThumb",au,false,at,"absolute");
y("timeSliderCapRight",au,true,at,"relative");
ab("time");
break;
case"fullscreen":y("fullscreenButton",au,false,aw);
y("normalscreenButton",au,true,aw);
U("fullscreenButton","jwSetFullscreen",true);
U("normalscreenButton","jwSetFullscreen",false);
break;
case"volume":ao=!_utils.exists(l.skin.getSkinElement("controlbar","volumeSliderCapLeft"))?0:l.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;
ap=!_utils.exists(l.skin.getSkinElement("controlbar","volumeSliderCapRight"))?0:l.skin.getSkinElement("controlbar","volumeSliderCapRight").width;
aq=au=="left"?ao:ap;
an=l.skin.getSkinElement("controlbar","volumeSliderRail").width+ao+ap;
ax={height:K().height,position:"relative",width:an,"float":"left",styleFloat:"left",cssFloat:"left"};
var av=ad("volumeSlider",aw,ax);
y("volumeSliderCapLeft",au,false,av,"relative");
y("volumeSliderRail",au,false,av,"relative");
y("volumeSliderProgress",au,false,av,"absolute");
y("volumeSliderThumb",au,false,av,"absolute");
y("volumeSliderCapRight",au,false,av,"relative");
ab("volume");
break;
case"mute":y("muteButton",au,false,aw);
y("unmuteButton",au,true,aw);
U("muteButton","jwSetMute",true);
U("unmuteButton","jwSetMute",false);
break;
case"duration":y("durationText",au,true,aw,null,null,l.skin.getSkinElement("controlbar","durationBackground"));
break
}}function y(aq,au,ao,ax,ar,an,ap){if(_utils.exists(l.skin.getSkinElement("controlbar",aq))||aq.indexOf("Text")>0||aq.indexOf("divider")===0){var at={height:"100%",position:ar?ar:"relative",display:"block","float":"left",styleFloat:"left",cssFloat:"left"};
if((aq.indexOf("next")===0||aq.indexOf("prev")===0)&&(l.jwGetPlaylist().length<2||D.hideplaylistcontrols.toString()=="true")){if(D.forcenextprev.toString()!="true"){ao=false;
at.display="none"
}}var ay;
if(aq.indexOf("Text")>0){aq.innerhtml="00:00";
at.font=D.fontsize+"px/"+(K().height+1)+"px "+D.font;
at.color=D.fontcolor;
at.textAlign="center";
at.fontWeight=D.fontweight;
at.fontStyle=D.fontstyle;
at.cursor="default";
if(ap){at.background="url("+ap.src+") no-repeat center";
at.backgroundSize="100% "+K().height+"px"
}at.padding="0 5px"
}else{if(aq.indexOf("divider")===0){if(an){if(!isNaN(parseInt(an))){ay=parseInt(an)
}}else{if(ap){var av=l.skin.getSkinElement("controlbar",ap);
if(av){at.background="url("+av.src+") repeat-x center left";
ay=av.width
}}else{at.background="url("+l.skin.getSkinElement("controlbar","divider").src+") repeat-x center left";
ay=l.skin.getSkinElement("controlbar","divider").width
}}}else{at.background="url("+l.skin.getSkinElement("controlbar",aq).src+") repeat-x center left";
ay=l.skin.getSkinElement("controlbar",aq).width
}}if(au=="left"){if(ao){af+=ay
}}else{if(au=="right"){if(ao){E+=ay
}}}if(_utils.typeOf(ax)=="undefined"){ax=S.elements
}at.width=ay;
if(q){_css(S[aq],at)
}else{var aw=ad(aq,ax,at);
if(_utils.exists(l.skin.getSkinElement("controlbar",aq+"Over"))){aw.onmouseover=function(az){aw.style.backgroundImage=["url(",l.skin.getSkinElement("controlbar",aq+"Over").src,")"].join("")
};
aw.onmouseout=function(az){aw.style.backgroundImage=["url(",l.skin.getSkinElement("controlbar",aq).src,")"].join("")
}
}if(aq.indexOf("divider")==0){aw.setAttribute("class","divider")
}aw.innerHTML="&nbsp;"
}}}function F(){l.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,B);
l.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM,t);
l.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_BUFFER,v);
l.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,s);
l.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_TIME,J);
l.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,al);
l.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_VOLUME,n);
l.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_COMPLETE,M)
}function B(){if(!D.hideplaylistcontrols){if(l.jwGetPlaylist().length>1||D.forcenextprev.toString()=="true"){_show(S.nextButton);
_show(S.prevButton)
}else{_hide(S.nextButton);
_hide(S.prevButton)
}x();
ai()
}}function t(an){ah=l.jwGetPlaylist()[an.index].duration;
Q=-1;
J({id:l.id,duration:ah,position:0});
v({id:l.id,bufferProgress:0})
}function ai(){J({id:l.id,duration:l.jwGetDuration(),position:0});
v({id:l.id,bufferProgress:0});
al({id:l.id,mute:l.jwGetMute()});
s({id:l.id,newstate:a.api.events.state.IDLE});
n({id:l.id,volume:l.jwGetVolume()})
}function U(ap,aq,ao){if(q){return
}if(_utils.exists(l.skin.getSkinElement("controlbar",ap))){var an=S[ap];
if(_utils.exists(an)){_css(an,{cursor:"pointer"});
if(aq=="fullscreen"){an.onmouseup=function(ar){ar.stopPropagation();
l.jwSetFullscreen(!l.jwGetFullscreen())
}
}else{an.onmouseup=function(ar){ar.stopPropagation();
if(_utils.exists(ao)){l[aq](ao)
}else{l[aq]()
}}
}}}}function ab(an){if(q){return
}var ao=S[an+"Slider"];
_css(S.elements,{cursor:"pointer"});
_css(ao,{cursor:"pointer"});
ao.onmousedown=function(ap){w=an
};
ao.onmouseup=function(ap){ap.stopPropagation();
ak(ap.pageX)
};
ao.onmousemove=function(ap){if(w=="time"){h=true;
var aq=ap.pageX-c[an+"Slider"].left-window.pageXOffset;
_css(S[w+"SliderThumb"],{left:aq})
}}
}function ak(ao){h=false;
var an;
if(w=="time"){an=ao-c.timeSliderRail.left+window.pageXOffset;
var aq=an/c.timeSliderRail.width*ah;
if(aq<0){aq=0
}else{if(aq>ah){aq=ah-3
}}if(l.jwGetState()==a.api.events.state.PAUSED||l.jwGetState()==a.api.events.state.IDLE){l.jwPlay()
}l.jwSeek(aq)
}else{if(w=="volume"){an=ao-c.volumeSliderRail.left-window.pageXOffset;
var ap=Math.round(an/c.volumeSliderRail.width*100);
if(ap<10){ap=0
}else{if(ap>100){ap=100
}}if(l.jwGetMute()){l.jwSetMute(false)
}l.jwSetVolume(ap)
}}w="none"
}function v(ao){if(_utils.exists(ao.bufferPercent)){g=ao.bufferPercent
}if(c.timeSliderRail){var aq=l.skin.getSkinElement("controlbar","timeSliderCapLeft");
var ap=c.timeSliderRail.width;
var an=isNaN(Math.round(ap*g/100))?0:Math.round(ap*g/100);
_css(S.timeSliderBuffer,{width:an,left:aq?aq.width:0})
}}function al(an){if(an.mute){_hide(S.muteButton);
_show(S.unmuteButton);
_hide(S.volumeSliderProgress)
}else{_show(S.muteButton);
_hide(S.unmuteButton);
_show(S.volumeSliderProgress)
}}function s(an){if(an.newstate==a.api.events.state.BUFFERING||an.newstate==a.api.events.state.PLAYING){_show(S.pauseButton);
_hide(S.playButton)
}else{_hide(S.pauseButton);
_show(S.playButton)
}Z();
if(an.newstate==a.api.events.state.IDLE){_hide(S.timeSliderBuffer);
_hide(S.timeSliderProgress);
_hide(S.timeSliderThumb);
J({id:l.id,duration:l.jwGetDuration(),position:0})
}else{_show(S.timeSliderBuffer);
if(an.newstate!=a.api.events.state.BUFFERING){_show(S.timeSliderProgress);
_show(S.timeSliderThumb)
}}}function M(an){v({bufferPercent:0});
J(_utils.extend(an,{position:0,duration:ah}))
}function J(at){if(_utils.exists(at.position)){k=at.position
}var ao=false;
if(_utils.exists(at.duration)&&at.duration!=ah){ah=at.duration;
ao=true
}var aq=(k===ah===0)?0:k/ah;
var av=c.timeSliderRail;
if(av){var ap=isNaN(Math.round(av.width*aq))?0:Math.round(av.width*aq);
var au=l.skin.getSkinElement("controlbar","timeSliderCapLeft");
var ar=ap+(au?au.width:0);
if(S.timeSliderProgress){_css(S.timeSliderProgress,{width:ap,left:au?au.width:0});
if(!h){if(S.timeSliderThumb){S.timeSliderThumb.style.left=ar+"px"
}}}}if(S.durationText){S.durationText.innerHTML=_utils.timeFormat(ah)
}if(S.elapsedText){var an=_utils.timeFormat(k);
S.elapsedText.innerHTML=an;
if(Q!=an.length){ao=true;
Q=an.length
}}if(ao){x()
}}function o(){var an=S.elements.childNodes;
var at,aq;
for(var ap=0;
ap<an.length;
ap++){var ar=an[ap].childNodes;
for(var ao in ar){if(isNaN(parseInt(ao,10))){continue
}if(ar[ao].id.indexOf(ag.id+"_divider")===0&&aq&&aq.id.indexOf(ag.id+"_divider")===0&&ar[ao].style.backgroundImage==aq.style.backgroundImage){ar[ao].style.display="none"
}else{if(ar[ao].id.indexOf(ag.id+"_divider")===0&&at&&at.style.display!="none"){ar[ao].style.display="block"
}}if(ar[ao].style.display!="none"){aq=ar[ao]
}at=ar[ao]
}}}function aj(){if(l.jwGetFullscreen()){_show(S.normalscreenButton);
_hide(S.fullscreenButton)
}else{_hide(S.normalscreenButton);
_show(S.fullscreenButton)
}if(l.jwGetState()==a.api.events.state.BUFFERING||l.jwGetState()==a.api.events.state.PLAYING){_show(S.pauseButton);
_hide(S.playButton)
}else{_hide(S.pauseButton);
_show(S.playButton)
}if(l.jwGetMute()==true){_hide(S.muteButton);
_show(S.unmuteButton);
_hide(S.volumeSliderProgress)
}else{_show(S.muteButton);
_hide(S.unmuteButton);
_show(S.volumeSliderProgress)
}}function x(){o();
aj();
var ap={width:f};
var ax={"float":"left",styleFloat:"left",cssFloat:"left"};
if(D.position==a.html5.view.positions.OVER||l.jwGetFullscreen()){ap.left=D.margin;
ap.width-=2*D.margin;
ap.top=z-K().height-D.margin;
ap.height=K().height
}var ar=l.skin.getSkinElement("controlbar","capLeft");
var av=l.skin.getSkinElement("controlbar","capRight");
ax.width=ap.width-(ar?ar.width:0)-(av?av.width:0);
var aq=_utils.getBoundingClientRect(S.leftGroup).width;
var au=_utils.getBoundingClientRect(S.rightGroup).width;
var at=ax.width-aq-au-1;
var ao=at;
var an=l.skin.getSkinElement("controlbar","timeSliderCapLeft");
var aw=l.skin.getSkinElement("controlbar","timeSliderCapRight");
if(_utils.exists(an)){ao-=an.width
}if(_utils.exists(aw)){ao-=aw.width
}S.timeSlider.style.width=at+"px";
S.timeSliderRail.style.width=ao+"px";
_css(ag,ap);
_css(S.elements,ax);
_css(S.background,ax);
r();
return ap
}function n(at){if(_utils.exists(S.volumeSliderRail)){var ap=isNaN(at.volume/100)?1:at.volume/100;
var aq=_utils.parseDimension(S.volumeSliderRail.style.width);
var an=isNaN(Math.round(aq*ap))?0:Math.round(aq*ap);
var au=_utils.parseDimension(S.volumeSliderRail.style.right);
var ao=(!_utils.exists(l.skin.getSkinElement("controlbar","volumeSliderCapLeft")))?0:l.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;
_css(S.volumeSliderProgress,{width:an,left:ao});
if(S.volumeSliderThumb){var ar=(an-Math.round(_utils.parseDimension(S.volumeSliderThumb.style.width)/2));
ar=Math.min(Math.max(ar,0),aq-_utils.parseDimension(S.volumeSliderThumb.style.width));
_css(S.volumeSliderThumb,{left:ar})
}if(_utils.exists(S.volumeSliderCapLeft)){_css(S.volumeSliderCapLeft,{left:0})
}}}function T(){try{var ao=(l.id.indexOf("_instream")>0?l.id.replace("_instream",""):l.id);
H=document.getElementById(ao);
H.addEventListener("mousemove",Z)
}catch(an){_utils.log("Could not add mouse listeners to controlbar: "+an)
}}function u(){O();
N();
r();
q=true;
F();
D.idlehide=(D.idlehide.toString().toLowerCase()=="true");
if(D.position==a.html5.view.positions.OVER&&D.idlehide){ag.style.opacity=0;
V=true
}else{ag.style.opacity=1;
setTimeout((function(){V=true;
W()
}),1)
}T();
ai()
}u();
return this
}
})(jwplayer);
(function(b){var a=["width","height","state","playlist","item","position","buffer","duration","volume","mute","fullscreen"];
var c=b.utils;
b.html5.controller=function(o,K,f,h){var n=o,m=f,j=h,y=K,M=true,G=-1,A=false,d=false,P,C=[],q=false;
var D=(c.exists(m.config.debug)&&(m.config.debug.toString().toLowerCase()=="console")),N=new b.html5.eventdispatcher(y.id,D);
c.extend(this,N);
function L(T){if(q){N.sendEvent(T.type,T)
}else{C.push(T)
}}function s(T){if(!q){q=true;
N.sendEvent(b.api.events.JWPLAYER_READY,T);
if(b.utils.exists(window.playerReady)){playerReady(T)
}if(b.utils.exists(window[f.config.playerReady])){window[f.config.playerReady](T)
}while(C.length>0){var V=C.shift();
N.sendEvent(V.type,V)
}if(f.config.autostart&&!b.utils.isIOS()){O()
}while(x.length>0){var U=x.shift();
B(U.method,U.arguments)
}}}m.addGlobalListener(L);
m.addEventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL,function(){m.getMedia().play()
});
m.addEventListener(b.api.events.JWPLAYER_MEDIA_TIME,function(T){if(T.position>=m.playlist[m.item].start&&G>=0){m.playlist[m.item].start=G;
G=-1
}});
m.addEventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE,function(T){setTimeout(E,25)
});
m.addEventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,O);
m.addEventListener(b.api.events.JWPLAYER_FULLSCREEN,p);
function F(){try{P=F;
if(!A){A=true;
N.sendEvent(b.api.events.JWPLAYER_MEDIA_BEFOREPLAY);
A=false;
if(d){d=false;
P=null;
return
}}v(m.item);
if(m.playlist[m.item].levels[0].file.length>0){if(M||m.state==b.api.events.state.IDLE){m.getMedia().load(m.playlist[m.item]);
M=false
}else{if(m.state==b.api.events.state.PAUSED){m.getMedia().play()
}}}return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T);
P=null
}return false
}function e(){try{if(m.playlist[m.item].levels[0].file.length>0){switch(m.state){case b.api.events.state.PLAYING:case b.api.events.state.BUFFERING:if(m.getMedia()){m.getMedia().pause()
}break;
default:if(A){d=true
}}}return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function z(T){try{if(m.playlist[m.item].levels[0].file.length>0){if(typeof T!="number"){T=parseFloat(T)
}switch(m.state){case b.api.events.state.IDLE:if(G<0){G=m.playlist[m.item].start;
m.playlist[m.item].start=T
}if(!A){F()
}break;
case b.api.events.state.PLAYING:case b.api.events.state.PAUSED:case b.api.events.state.BUFFERING:m.seek(T);
break
}}return true
}catch(U){N.sendEvent(b.api.events.JWPLAYER_ERROR,U)
}return false
}function w(T){P=null;
if(!c.exists(T)){T=true
}try{if((m.state!=b.api.events.state.IDLE||T)&&m.getMedia()){m.getMedia().stop(T)
}if(A){d=true
}return true
}catch(U){N.sendEvent(b.api.events.JWPLAYER_ERROR,U)
}return false
}function k(){try{if(m.playlist[m.item].levels[0].file.length>0){if(m.config.shuffle){v(S())
}else{if(m.item+1==m.playlist.length){v(0)
}else{v(m.item+1)
}}}if(m.state!=b.api.events.state.IDLE){var U=m.state;
m.state=b.api.events.state.IDLE;
N.sendEvent(b.api.events.JWPLAYER_PLAYER_STATE,{oldstate:U,newstate:b.api.events.state.IDLE})
}F();
return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function I(){try{if(m.playlist[m.item].levels[0].file.length>0){if(m.config.shuffle){v(S())
}else{if(m.item===0){v(m.playlist.length-1)
}else{v(m.item-1)
}}}if(m.state!=b.api.events.state.IDLE){var U=m.state;
m.state=b.api.events.state.IDLE;
N.sendEvent(b.api.events.JWPLAYER_PLAYER_STATE,{oldstate:U,newstate:b.api.events.state.IDLE})
}F();
return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function S(){var T=null;
if(m.playlist.length>1){while(!c.exists(T)){T=Math.floor(Math.random()*m.playlist.length);
if(T==m.item){T=null
}}}else{T=0
}return T
}function H(U){if(!m.playlist||!m.playlist[U]){return false
}try{if(m.playlist[U].levels[0].file.length>0){var V=m.state;
if(V!==b.api.events.state.IDLE){if(m.playlist[m.item]&&m.playlist[m.item].provider==m.playlist[U].provider){w(false)
}else{w()
}}v(U);
F()
}return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function v(T){if(!m.playlist[T]){return
}m.setActiveMediaProvider(m.playlist[T]);
if(m.item!=T){m.item=T;
M=true;
N.sendEvent(b.api.events.JWPLAYER_PLAYLIST_ITEM,{index:T})
}}function g(U){try{v(m.item);
var V=m.getMedia();
switch(typeof(U)){case"number":V.volume(U);
break;
case"string":V.volume(parseInt(U,10));
break
}m.setVolume(U);
return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function r(U){try{v(m.item);
var V=m.getMedia();
if(typeof U=="undefined"){V.mute(!m.mute);
m.setMute(!m.mute)
}else{if(U.toString().toLowerCase()=="true"){V.mute(true);
m.setMute(true)
}else{V.mute(false);
m.setMute(false)
}}return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function J(U,T){try{m.width=U;
m.height=T;
j.resize(U,T);
N.sendEvent(b.api.events.JWPLAYER_RESIZE,{width:m.width,height:m.height});
return true
}catch(V){N.sendEvent(b.api.events.JWPLAYER_ERROR,V)
}return false
}function u(U,V){try{if(typeof U=="undefined"){U=!m.fullscreen
}if(typeof V=="undefined"){V=true
}if(U!=m.fullscreen){m.fullscreen=(U.toString().toLowerCase()=="true");
j.fullscreen(m.fullscreen);
if(V){N.sendEvent(b.api.events.JWPLAYER_FULLSCREEN,{fullscreen:m.fullscreen})
}N.sendEvent(b.api.events.JWPLAYER_RESIZE,{width:m.width,height:m.height})
}return true
}catch(T){N.sendEvent(b.api.events.JWPLAYER_ERROR,T)
}return false
}function R(T){try{w();
if(A){d=false
}m.loadPlaylist(T);
if(m.playlist[m.item].provider){v(m.item);
if(m.config.autostart.toString().toLowerCase()=="true"&&!c.isIOS()&&!A){F()
}return true
}else{return false
}}catch(U){N.sendEvent(b.api.events.JWPLAYER_ERROR,U)
}return false
}function O(T){if(!c.isIOS()){v(m.item);
if(m.config.autostart.toString().toLowerCase()=="true"&&!c.isIOS()){F()
}}}function p(T){u(T.fullscreen,false)
}function t(){try{return m.getMedia().detachMedia()
}catch(T){return null
}}function l(){try{var T=m.getMedia().attachMedia();
if(typeof P=="function"){P()
}}catch(U){return null
}}b.html5.controller.repeatoptions={LIST:"LIST",ALWAYS:"ALWAYS",SINGLE:"SINGLE",NONE:"NONE"};
function E(){if(m.state!=b.api.events.state.IDLE){return
}P=E;
switch(m.config.repeat.toUpperCase()){case b.html5.controller.repeatoptions.SINGLE:F();
break;
case b.html5.controller.repeatoptions.ALWAYS:if(m.item==m.playlist.length-1&&!m.config.shuffle){H(0)
}else{k()
}break;
case b.html5.controller.repeatoptions.LIST:if(m.item==m.playlist.length-1&&!m.config.shuffle){w();
v(0)
}else{k()
}break;
default:w();
break
}}var x=[];
function Q(T){return function(){if(q){B(T,arguments)
}else{x.push({method:T,arguments:arguments})
}}
}function B(V,U){var T=[];
for(i=0;
i<U.length;
i++){T.push(U[i])
}V.apply(this,T)
}this.play=Q(F);
this.pause=Q(e);
this.seek=Q(z);
this.stop=Q(w);
this.next=Q(k);
this.prev=Q(I);
this.item=Q(H);
this.setVolume=Q(g);
this.setMute=Q(r);
this.resize=Q(J);
this.setFullscreen=Q(u);
this.load=Q(R);
this.playerReady=s;
this.detachMedia=t;
this.attachMedia=l;
this.beforePlay=function(){return A
};
this.destroy=function(){if(m.getMedia()){m.getMedia().destroy()
}}
}
})(jwplayer);
(function(a){a.html5.defaultSkin=function(){this.text='<?xml version="1.0" ?><skin author="LongTail Video" name="Five" version="1.1"><components><component name="controlbar"><settings><setting name="margin" value="20"/><setting name="fontsize" value="11"/><setting name="fontcolor" value="0x000000"/></settings><layout><group position="left"><button name="play"/><divider name="divider"/><button name="prev"/><divider name="divider"/><button name="next"/><divider name="divider"/><text name="elapsed"/></group><group position="center"><slider name="time"/></group><group position="right"><text name="duration"/><divider name="divider"/><button name="blank"/><divider name="divider"/><button name="mute"/><slider name="volume"/><divider name="divider"/><button name="fullscreen"/></group></layout><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAElJREFUOI3t1LERACAMQlFgGvcfxNIhHMK4gsUvUviOmgtNsiAZkBSEKxKEnCYkkQrJn/YwbUNiSDDYRZaQRDaShv+oX9GBZEIuK+8hXVLs+/YAAAAASUVORK5CYII="/><element name="blankButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAYCAYAAAAyJzegAAAAFElEQVQYV2P8//8/AzpgHBUc7oIAGZdH0RjKN8EAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAQElEQVQIWz3LsRGAMADDQJ0XB5bMINABZ9GENGrszxhjT2WLSqxEJG2JQrTMdV2q5LpOAvyRaVmsi7WdeZ/7+AAaOTq7BVrfOQAAAABJRU5ErkJggg=="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAQElEQVQIWz3LsRGAMADDQJ0XB5bMINABZ9GENGrszxhjT2WLSqxEJG2JQrTMdV2q5LpOAvyRaVmsi7WdeZ/7+AAaOTq7BVrfOQAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADhJREFUCB0FwcENgEAAw7Aq+893g8APUILNOQcbFRktVGqUVFRkWNz3xTa2sUaLNUosKlRUvvf5AdbWOTtzmzyWAAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAANUlEQVR42u2RsQkAAAjD/NTTPaW6dXLrINJA1kBpGPMAjDWmOgp1HFQXx+b1KOefO4oxY57R73YnVYCQUCQAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAIUlEQVQ4jWNgGAWjYOiD/0gYG3/U0FFDB4Oho2AUDAYAAEwiL9HrpdMVAAAAAElFTkSuQmCC"/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAQklEQVQ4y2NgGAWjYOiD/1AMA/JAfB5NjCJD/YH4PRaLyDa0H4lNNUP/DxlD59PCUBCIp3ZEwYA+NZLUKBgFgwEAAN+HLX9sB8u8AAAAAElFTkSuQmCC"/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAQElEQVQ4y2NgGAWjYOiD/0B8Hojl0cT+U2ooCL8HYn9qGwrD/bQw9P+QMXQ+tSMqnpoRBUpS+tRMUqNgFAwGAADxZy1/mHvFnAAAAABJRU5ErkJggg=="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAOElEQVRIDe3BwQkAIRADwAhhw/nU/kWwUK+KPITMABFh19Y+F0acY8CJvX9wYpXgRElwolSIiMf9ZWEDhtwurFsAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAN0lEQVRIDe3BwQkAMQwDMBcc55mRe9zi7RR+FCwBEWG39vcfGHFm4MTuhhMlwYlVBSdKhYh43AW/LQMKm1spzwAAAABJRU5ErkJggg=="/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIElEQVRIiWNgGAWjYBTQBfynMR61YCRYMApGwSigMQAAiVWPcbq6UkIAAAAASUVORK5CYII="/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAYCAYAAAA/OUfnAAAAO0lEQVQYlWP4//8/Awwz0JgDBP/BeN6Cxf/hnI2btiI4u/fsQ3AOHjqK4Jw4eQbBOX/hEoKDYjSd/AMA4cS4mfLsorgAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAJklEQVQ4y2NgGAUjDcwH4v/kaPxPikZkxcNVI9mBQ5XoGAWDFwAAsKAXKQQmfbUAAAAASUVORK5CYII="/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAMklEQVQ4y2NgGAWDHPyntub5xBr6Hwv/Pzk2/yfVG/8psRFE25Oq8T+tQnsIaB4FVAcAi2YVysVY52AAAAAASUVORK5CYII="/><element name="volumeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAACmpqampqbBXAu8AAAAAnRSTlMAgJsrThgAAAArSURBVAhbY2AgErBAyA4I2QEhOyBkB4TsYOhAoaCCUCUwDTDtMMNgRuMHAFB5FoGH5T0UAAAAAElFTkSuQmCC"/><element name="volumeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAAnRSTlMAgJsrThgAAAArSURBVAhbY2AgErBAyA4I2QEhOyBkB4TsYOhAoaCCUCUwDTDtMMNgRuMHAFB5FoGH5T0UAAAAAElFTkSuQmCC"/><element name="volumeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAYCAYAAAAyJzegAAAAFElEQVQYV2P8//8/AzpgHBUc7oIAGZdH0RjKN8EAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAQklEQVRIiWNgGAWjYMiD/0iYFDmSLbDHImdPLQtgBpEiR7Zl2NijAA5oEkT/0Whi5UiyAJ8BVMsHNMtoo2AUDAIAAGdcIN3IDNXoAAAAAElFTkSuQmCC"/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAP0lEQVRIx2NgGAWjYMiD/1RSQ5QB/wmIUWzJfzx8qhj+n4DYCAY0DyJ7PBbYU8sHMEvwiZFtODXUjIJRMJgBACpWIN2ZxdPTAAAAAElFTkSuQmCC"/></elements></component><component name="display"><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlOZpuml+rYAAAASSURBVBhXY2AYJuA/GBwY6jQAyDyoK8QcL4QAAAAASUVORK5CYII="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAiUlEQVR42u3XSw2AMBREURwgAQlIQAISKgUpSEFKJeCg5b0E0kWBTVcD9ySTsL0Jn9IBAAAA+K2UUrBlW/Rr5ZDoIeeuoFkxJD9ss03aIXXQqB9SttoG7ZA6qNcOKdttiwcJh9RB+iFl4SshkRBuLR72+9cvH0SOKI2HRo7x/Fi1/uoCAAAAwLsD8ki99IlO2dQAAAAASUVORK5CYII="/><element name="muteIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAVUlEQVR42u3WMQrAIAxAUW/g/SdvGmvpoOBeSHgPsjj5QTANAACARCJilIhYM0tEvJM+Ik3Id9E957kQIb+F3OdCPC0hPkQriqWx9hp/x/QGAABQyAPLB22VGrpLDgAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA/0lEQVR42u2U0QmEMBAF7cASLMESUoIlpARLSCkpwRJSgiWkhOvAXD4WsgRkyaG5DbyB+Yvg8KITAAAAAAAYk+u61mwk15EjPtlEfihmqIiZR1Qx80ghjgdUuiHXGHSVsoag0x6x8DUoyjD5KovmEJ9NTDMRPIT0mtdIUkjlonuNohO+Ha99DTmkuGgKCTcvebAzx82ZoCWC3/3aIMWSRucaxcjORSFY4xpFdjYJGp1rFGcyCYZ/RVh6AUnfcNZ2zih3/mGj1jVCdiNDwyrq1rA/xMdeEXvDVdnYc1vDc3uPkDObXrlaxbNHSOohQhr/WOeLEWfWTgAAAAAAADzNF9sHJ7PJ57MlAAAAAElFTkSuQmCC"/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACBklEQVR42u3Zv0sCYRzH8USTzOsHHEWGkC1HgaDgkktGDjUYtDQ01RDSljQ1BLU02+rk1NTm2NLq4Nx/0L/h9fnCd3j4cnZe1/U8xiO8h3uurufF0/3COd/3/0UWYiEWYiEWYiGJQ+J8xuPxKhXjEMZANinjIZhkGuVRNioE4wVURo4JkHm0xKWmhRAc1bh1EyCUw5BcBIjHiApKa4CErko6DEJwuRo6IRKzyJD8FJAyI3Zp2zRImiBcRhlfo5RtlxCcE3CcDNpGrhYIT2IhAJKilO0VRmzJ32fAMTpBTS0QMfGwlcuKMRftE0DJ0wCJdcOsCkBdXP3Mh9CEFUBTPS9mDZJBG6io4aqVzMdCokCw9H3kT6j/C/9iDdSeUMNC7DkyyxAs/Rk6Qss8FPWRZgdVtUH4DjxEn1zxh+/zj1wHlf4MQhNGrwqA6sY40U8JonRJwEQh+AO3AvCG6gHv4U7IY4krxkroWoAOkoQMGfCBrgIm+YBGqPENpIJ66CJg3x66Y0gnSUidAEEnNr9jjLiWMn5DiWP0OC/oAsCgkq43xBdGDMQr7YASP/vEkHvdl1+JOCcEV5sC4hGEOzTlPuKgd0b0xD4JkRcOgnRRTjdErkYhAsQVq6IdUuPJtmk7BCL3t/h88cx91pKQkI/pkDx6pmYTIjEoxiHsN1YWYiEWYiEWknhflZ5IErA5nr8AAAAASUVORK5CYII="/></elements></component><component name="dock"><settings><setting name="fontcolor" value="0xffffff"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlOZpuml+rYAAAASSURBVBhXY2AYJuA/GBwY6jQAyDyoK8QcL4QAAAAASUVORK5CYII="/></elements></component><component name="playlist"><settings><setting name="backgroundcolor" value="0xe8e8e8"/></settings><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUaN7t2MENwCAMBEEe9N8wSKYC/D8YV7CyJoRkVtVImxkZPQInMxoP0XiIxkM0HsGbjjSNBx544IEHHnjggUe/6UQeey0PIh7XTftGxKPj4eXCtLsHHh+ZxkO0Iw8PR55Ni8ZD9Hu/EAoP0dc5RRg9qeRjVF8AAAAASUVORK5CYII="/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAYAAADnCQYGAAAAFUlEQVQokWP8//8/A7UB46ihI9hQAKt6FPPXhVGHAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAKElEQVQ4y2P4//8/Az68bNmy/+iYkB6GUUNHDR01dNTQUUNHDaXcUABUDOKhcxnsSwAAAABJRU5ErkJggg=="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAJUlEQVQ4T2P4//8/Ay4MBP9xYbz6Rg0dNXTU0FFDRw0dNZRyQwHH4NBa7GJsXAAAAABJRU5ErkJggg=="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAYAAADnCQYGAAAAFUlEQVQokWP8//8/A7UB46ihI9hQAKt6FPPXhVGHAAAAAElFTkSuQmCC"/></elements></component></components></skin>';
this.xml=null;
if(window.DOMParser){parser=new DOMParser();
this.xml=parser.parseFromString(this.text,"text/xml")
}else{this.xml=new ActiveXObject("Microsoft.XMLDOM");
this.xml.async="false";
this.xml.loadXML(this.text)
}return this
}
})(jwplayer);
(function(a){_utils=a.utils;
_css=_utils.css;
_hide=function(b){_css(b,{display:"none"})
};
_show=function(b){_css(b,{display:"block"})
};
a.html5.display=function(k,K){var j={icons:true,showmute:false};
var X=_utils.extend({},j,K);
var h=k;
var W={};
var e;
var w;
var z;
var T;
var u;
var M;
var E;
var N=!_utils.exists(h.skin.getComponentSettings("display").bufferrotation)?15:parseInt(h.skin.getComponentSettings("display").bufferrotation,10);
var s=!_utils.exists(h.skin.getComponentSettings("display").bufferinterval)?100:parseInt(h.skin.getComponentSettings("display").bufferinterval,10);
var D=-1;
var v=a.api.events.state.IDLE;
var O=true;
var d;
var C=false,V=true;
var p="";
var g=false;
var o=false;
var m;
var y,R;
var L=new a.html5.eventdispatcher();
_utils.extend(this,L);
var H={display:{style:{cursor:"pointer",top:0,left:0,overflow:"hidden"},click:n},display_icon:{style:{cursor:"pointer",position:"absolute",top:((h.skin.getSkinElement("display","background").height-h.skin.getSkinElement("display","playIcon").height)/2),left:((h.skin.getSkinElement("display","background").width-h.skin.getSkinElement("display","playIcon").width)/2),border:0,margin:0,padding:0,zIndex:3,display:"none"}},display_iconBackground:{style:{cursor:"pointer",position:"absolute",top:((w-h.skin.getSkinElement("display","background").height)/2),left:((e-h.skin.getSkinElement("display","background").width)/2),border:0,backgroundImage:(["url(",h.skin.getSkinElement("display","background").src,")"]).join(""),width:h.skin.getSkinElement("display","background").width,height:h.skin.getSkinElement("display","background").height,margin:0,padding:0,zIndex:2,display:"none"}},display_image:{style:{display:"none",width:e,height:w,position:"absolute",cursor:"pointer",left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1}},display_text:{style:{zIndex:4,position:"relative",opacity:0.8,backgroundColor:parseInt("000000",16),color:parseInt("ffffff",16),textAlign:"center",fontFamily:"Arial,sans-serif",padding:"0 5px",fontSize:14}}};
h.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,q);
h.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE,q);
h.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,P);
h.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM,q);
h.jwAddEventListener(a.api.events.JWPLAYER_ERROR,r);
Q();
function Q(){W.display=G("div","display");
W.display_text=G("div","display_text");
W.display.appendChild(W.display_text);
W.display_image=G("img","display_image");
W.display_image.onerror=function(Y){_hide(W.display_image)
};
W.display_image.onload=B;
W.display_icon=G("div","display_icon");
W.display_iconBackground=G("div","display_iconBackground");
W.display.appendChild(W.display_image);
W.display_iconBackground.appendChild(W.display_icon);
W.display.appendChild(W.display_iconBackground);
f();
setTimeout((function(){o=true;
if(X.icons.toString()=="true"){J()
}}),1)
}this.getDisplayElement=function(){return W.display
};
this.resize=function(Z,Y){if(h.jwGetFullscreen()&&_utils.isMobile()){return
}_css(W.display,{width:Z,height:Y});
_css(W.display_text,{width:(Z-10),top:((Y-_utils.getBoundingClientRect(W.display_text).height)/2)});
_css(W.display_iconBackground,{top:((Y-h.skin.getSkinElement("display","background").height)/2),left:((Z-h.skin.getSkinElement("display","background").width)/2)});
if(e!=Z||w!=Y){e=Z;
w=Y;
d=undefined;
J()
}if(!h.jwGetFullscreen()){y=Z;
R=Y
}c();
q({})
};
this.show=function(){if(g){g=false;
t(h.jwGetState())
}};
this.hide=function(){if(!g){F();
g=true
}};
function B(Y){z=W.display_image.naturalWidth;
T=W.display_image.naturalHeight;
c();
if(h.jwGetState()==a.api.events.state.IDLE||h.jwGetPlaylist()[h.jwGetPlaylistIndex()].provider=="sound"){_css(W.display_image,{display:"block",opacity:0});
_utils.fadeTo(W.display_image,1,0.1)
}C=false
}function c(){if(h.jwGetFullscreen()&&h.jwGetStretching()==a.utils.stretching.EXACTFIT){var Y=document.createElement("div");
_utils.stretch(a.utils.stretching.UNIFORM,Y,e,w,y,R);
_utils.stretch(a.utils.stretching.EXACTFIT,W.display_image,_utils.parseDimension(Y.style.width),_utils.parseDimension(Y.style.height),z,T);
_css(W.display_image,{left:Y.style.left,top:Y.style.top})
}else{_utils.stretch(h.jwGetStretching(),W.display_image,e,w,z,T)
}}function G(Y,aa){var Z=document.createElement(Y);
Z.id=h.id+"_jwplayer_"+aa;
_css(Z,H[aa].style);
return Z
}function f(){for(var Y in W){if(_utils.exists(H[Y].click)){W[Y].onclick=H[Y].click
}}}function n(Y){if(typeof Y.preventDefault!="undefined"){Y.preventDefault()
}else{Y.returnValue=false
}if(typeof m=="function"){m(Y);
return
}else{if(h.jwGetState()!=a.api.events.state.PLAYING){h.jwPlay()
}else{h.jwPause()
}}}function U(Y){if(E){F();
return
}W.display_icon.style.backgroundImage=(["url(",h.skin.getSkinElement("display",Y).src,")"]).join("");
_css(W.display_icon,{width:h.skin.getSkinElement("display",Y).width,height:h.skin.getSkinElement("display",Y).height,top:(h.skin.getSkinElement("display","background").height-h.skin.getSkinElement("display",Y).height)/2,left:(h.skin.getSkinElement("display","background").width-h.skin.getSkinElement("display",Y).width)/2});
b();
if(_utils.exists(h.skin.getSkinElement("display",Y+"Over"))){W.display_icon.onmouseover=function(Z){W.display_icon.style.backgroundImage=["url(",h.skin.getSkinElement("display",Y+"Over").src,")"].join("")
};
W.display_icon.onmouseout=function(Z){W.display_icon.style.backgroundImage=["url(",h.skin.getSkinElement("display",Y).src,")"].join("")
}
}else{W.display_icon.onmouseover=null;
W.display_icon.onmouseout=null
}}function F(){if(X.icons.toString()=="true"){_hide(W.display_icon);
_hide(W.display_iconBackground);
S()
}}function b(){if(!g&&X.icons.toString()=="true"){_show(W.display_icon);
_show(W.display_iconBackground);
J()
}}function r(Y){E=true;
F();
W.display_text.innerHTML=Y.message;
_show(W.display_text);
W.display_text.style.top=((w-_utils.getBoundingClientRect(W.display_text).height)/2)+"px"
}function I(){V=false;
W.display_image.style.display="none"
}function P(){v=""
}function q(Y){if((Y.type==a.api.events.JWPLAYER_PLAYER_STATE||Y.type==a.api.events.JWPLAYER_PLAYLIST_ITEM)&&E){E=false;
_hide(W.display_text)
}var Z=h.jwGetState();
if(Z==v){return
}v=Z;
if(D>=0){clearTimeout(D)
}if(O||h.jwGetState()==a.api.events.state.PLAYING||h.jwGetState()==a.api.events.state.PAUSED){t(h.jwGetState())
}else{D=setTimeout(l(h.jwGetState()),500)
}}function l(Y){return(function(){t(Y)
})
}function t(Y){if(_utils.exists(M)){clearInterval(M);
M=null;
_utils.animations.rotate(W.display_icon,0)
}switch(Y){case a.api.events.state.BUFFERING:if(_utils.isIPod()){I();
F()
}else{if(h.jwGetPlaylist()[h.jwGetPlaylistIndex()].provider=="sound"){x()
}u=0;
M=setInterval(function(){u+=N;
_utils.animations.rotate(W.display_icon,u%360)
},s);
U("bufferIcon");
O=true
}break;
case a.api.events.state.PAUSED:if(!_utils.isIPod()){if(h.jwGetPlaylist()[h.jwGetPlaylistIndex()].provider!="sound"){_css(W.display_image,{background:"transparent no-repeat center center"})
}U("playIcon");
O=true
}break;
case a.api.events.state.IDLE:if(h.jwGetPlaylist()[h.jwGetPlaylistIndex()]&&h.jwGetPlaylist()[h.jwGetPlaylistIndex()].image){x()
}else{I()
}U("playIcon");
O=true;
break;
default:if(h.jwGetPlaylist()[h.jwGetPlaylistIndex()]&&h.jwGetPlaylist()[h.jwGetPlaylistIndex()].provider=="sound"){if(_utils.isIPod()){I();
O=false
}else{x()
}}else{I();
O=false
}if(h.jwGetMute()&&X.showmute){U("muteIcon")
}else{F()
}break
}D=-1
}function x(){if(h.jwGetPlaylist()[h.jwGetPlaylistIndex()]){var Y=h.jwGetPlaylist()[h.jwGetPlaylistIndex()].image;
if(Y){if(Y!=p){p=Y;
C=true;
W.display_image.src=_utils.getAbsolutePath(Y)
}else{if(!(C||V)){V=true;
W.display_image.style.opacity=0;
W.display_image.style.display="block";
_utils.fadeTo(W.display_image,1,0.1)
}}}}}function A(Y){return function(){if(!o){return
}if(!g&&d!=Y){d=Y;
L.sendEvent(Y,{component:"display",boundingRect:_utils.getDimensions(W.display_iconBackground)})
}}
}var J=A(a.api.events.JWPLAYER_COMPONENT_SHOW);
var S=A(a.api.events.JWPLAYER_COMPONENT_HIDE);
this.setAlternateClickHandler=function(Y){m=Y
};
this.revertAlternateClickHandler=function(){m=undefined
};
return this
}
})(jwplayer);
(function(a){var c=a.utils;
var b=c.css;
a.html5.dock=function(w,D){function x(){return{align:a.html5.view.positions.RIGHT}
}var n=c.extend({},x(),D);
if(n.align=="FALSE"){return
}var j={};
var A=[];
var k;
var F;
var f=false;
var C=false;
var g={x:0,y:0,width:0,height:0};
var z;
var o;
var y;
var m=new a.html5.eventdispatcher();
c.extend(this,m);
var r=document.createElement("div");
r.id=w.id+"_jwplayer_dock";
r.style.opacity=1;
p();
w.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,q);
this.getDisplayElement=function(){return r
};
this.setButton=function(K,H,I,J){if(!H&&j[K]){c.arrays.remove(A,K);
r.removeChild(j[K].div);
delete j[K]
}else{if(H){if(!j[K]){j[K]={}
}j[K].handler=H;
j[K].outGraphic=I;
j[K].overGraphic=J;
if(!j[K].div){A.push(K);
j[K].div=document.createElement("div");
j[K].div.style.position="absolute";
r.appendChild(j[K].div);
j[K].div.appendChild(document.createElement("div"));
j[K].div.childNodes[0].style.position="relative";
j[K].div.childNodes[0].style.width="100%";
j[K].div.childNodes[0].style.height="100%";
j[K].div.childNodes[0].style.zIndex=10;
j[K].div.childNodes[0].style.cursor="pointer";
j[K].div.appendChild(document.createElement("img"));
j[K].div.childNodes[1].style.position="absolute";
j[K].div.childNodes[1].style.left=0;
j[K].div.childNodes[1].style.top=0;
if(w.skin.getSkinElement("dock","button")){j[K].div.childNodes[1].src=w.skin.getSkinElement("dock","button").src
}j[K].div.childNodes[1].style.zIndex=9;
j[K].div.childNodes[1].style.cursor="pointer";
j[K].div.onmouseover=function(){if(j[K].overGraphic){j[K].div.childNodes[0].style.background=h(j[K].overGraphic)
}if(w.skin.getSkinElement("dock","buttonOver")){j[K].div.childNodes[1].src=w.skin.getSkinElement("dock","buttonOver").src
}};
j[K].div.onmouseout=function(){if(j[K].outGraphic){j[K].div.childNodes[0].style.background=h(j[K].outGraphic)
}if(w.skin.getSkinElement("dock","button")){j[K].div.childNodes[1].src=w.skin.getSkinElement("dock","button").src
}};
if(w.skin.getSkinElement("dock","button")){j[K].div.childNodes[1].src=w.skin.getSkinElement("dock","button").src
}}if(j[K].outGraphic){j[K].div.childNodes[0].style.background=h(j[K].outGraphic)
}else{if(j[K].overGraphic){j[K].div.childNodes[0].style.background=h(j[K].overGraphic)
}}if(H){j[K].div.onclick=function(L){L.preventDefault();
a(w.id).callback(K);
if(j[K].overGraphic){j[K].div.childNodes[0].style.background=h(j[K].overGraphic)
}if(w.skin.getSkinElement("dock","button")){j[K].div.childNodes[1].src=w.skin.getSkinElement("dock","button").src
}}
}}}l(k,F)
};
function h(H){return"url("+H+") no-repeat center center"
}function t(H){}function l(H,T){p();
if(A.length>0){var I=10;
var S=I;
var P=-1;
var Q=w.skin.getSkinElement("dock","button").height;
var O=w.skin.getSkinElement("dock","button").width;
var M=H-O-I;
var R,L;
if(n.align==a.html5.view.positions.LEFT){P=1;
M=I
}for(var J=0;
J<A.length;
J++){var U=Math.floor(S/T);
if((S+Q+I)>((U+1)*T)){S=((U+1)*T)+I;
U=Math.floor(S/T)
}var K=j[A[J]].div;
K.style.top=(S%T)+"px";
K.style.left=(M+(w.skin.getSkinElement("dock","button").width+I)*U*P)+"px";
var N={x:c.parseDimension(K.style.left),y:c.parseDimension(K.style.top),width:O,height:Q};
if(!R||(N.x<=R.x&&N.y<=R.y)){R=N
}if(!L||(N.x>=L.x&&N.y>=L.y)){L=N
}K.style.width=O+"px";
K.style.height=Q+"px";
S+=w.skin.getSkinElement("dock","button").height+I
}g={x:R.x,y:R.y,width:L.x-R.x+L.width,height:R.y-L.y+L.height}
}if(C!=w.jwGetFullscreen()||k!=H||F!=T){k=H;
F=T;
C=w.jwGetFullscreen();
z=undefined;
setTimeout(s,1)
}}function d(H){return function(){if(!f&&z!=H&&A.length>0){z=H;
m.sendEvent(H,{component:"dock",boundingRect:g})
}}
}function q(H){if(c.isMobile()){if(H.newstate==a.api.events.state.IDLE){v()
}else{e()
}}else{B()
}}function B(H){if(f){return
}clearTimeout(y);
if(D.position==a.html5.view.positions.OVER||w.jwGetFullscreen()){switch(w.jwGetState()){case a.api.events.state.PAUSED:case a.api.events.state.IDLE:if(r&&r.style.opacity<1&&(!D.idlehide||c.exists(H))){E()
}if(D.idlehide){y=setTimeout(function(){u()
},2000)
}break;
default:if(c.exists(H)){E()
}y=setTimeout(function(){u()
},2000);
break
}}else{E()
}}var s=d(a.api.events.JWPLAYER_COMPONENT_SHOW);
var G=d(a.api.events.JWPLAYER_COMPONENT_HIDE);
this.resize=l;
var v=function(){b(r,{display:"block"});
if(f){f=false;
s()
}};
var e=function(){b(r,{display:"none"});
if(!f){G();
f=true
}};
function u(){if(!f){G();
if(r.style.opacity==1){c.cancelAnimation(r);
c.fadeTo(r,0,0.1,1,0)
}}}function E(){if(!f){s();
if(r.style.opacity==0){c.cancelAnimation(r);
c.fadeTo(r,1,0.1,0,0)
}}}function p(){try{o=document.getElementById(w.id);
o.addEventListener("mousemove",B)
}catch(H){c.log("Could not add mouse listeners to dock: "+H)
}}this.hide=e;
this.show=v;
return this
}
})(jwplayer);
(function(a){a.html5.eventdispatcher=function(d,b){var c=new a.events.eventdispatcher(b);
a.utils.extend(this,c);
this.sendEvent=function(e,f){if(!a.utils.exists(f)){f={}
}a.utils.extend(f,{id:d,version:a.version,type:e});
c.sendEvent(e,f)
}
}
})(jwplayer);
(function(a){var b=a.utils;
a.html5.instream=function(y,m,x,z){var t={controlbarseekable:"always",controlbarpausable:true,controlbarstoppable:true,playlistclickable:true};
var v,A,C=y,E=m,j=x,w=z,r,H,o,G,e,f,g,l,q,h=false,k,d,n=this;
this.load=function(M,K){c();
h=true;
A=b.extend(t,K);
v=a.html5.playlistitem(M);
F();
d=document.createElement("div");
d.id=n.id+"_instream_container";
w.detachMedia();
r=g.getDisplayElement();
f=E.playlist[E.item];
e=C.jwGetState();
if(e==a.api.events.state.BUFFERING||e==a.api.events.state.PLAYING){r.pause()
}H=r.src?r.src:r.currentSrc;
o=r.innerHTML;
G=r.currentTime;
q=new a.html5.display(n,b.extend({},E.plugins.config.display));
q.setAlternateClickHandler(function(N){if(_fakemodel.state==a.api.events.state.PAUSED){n.jwInstreamPlay()
}else{D(a.api.events.JWPLAYER_INSTREAM_CLICK,N)
}});
d.appendChild(q.getDisplayElement());
if(!b.isMobile()){l=new a.html5.controlbar(n,b.extend({},E.plugins.config.controlbar,{}));
if(E.plugins.config.controlbar.position==a.html5.view.positions.OVER){d.appendChild(l.getDisplayElement())
}else{var L=E.plugins.object.controlbar.getDisplayElement().parentNode;
L.appendChild(l.getDisplayElement())
}}j.setupInstream(d,r);
p();
g.load(v)
};
this.jwInstreamDestroy=function(K){if(!h){return
}h=false;
if(e!=a.api.events.state.IDLE){g.load(f,false);
g.stop(false)
}else{g.stop(true)
}g.detachMedia();
j.destroyInstream();
if(l){try{l.getDisplayElement().parentNode.removeChild(l.getDisplayElement())
}catch(L){}}D(a.api.events.JWPLAYER_INSTREAM_DESTROYED,{reason:(K?"complete":"destroyed")},true);
w.attachMedia();
if(e==a.api.events.state.BUFFERING||e==a.api.events.state.PLAYING){r.play();
if(E.playlist[E.item]==f){E.getMedia().seek(G)
}}return
};
this.jwInstreamAddEventListener=function(K,L){k.addEventListener(K,L)
};
this.jwInstreamRemoveEventListener=function(K,L){k.removeEventListener(K,L)
};
this.jwInstreamPlay=function(){if(!h){return
}g.play(true)
};
this.jwInstreamPause=function(){if(!h){return
}g.pause(true)
};
this.jwInstreamSeek=function(K){if(!h){return
}g.seek(K)
};
this.jwInstreamGetState=function(){if(!h){return undefined
}return _fakemodel.state
};
this.jwInstreamGetPosition=function(){if(!h){return undefined
}return _fakemodel.position
};
this.jwInstreamGetDuration=function(){if(!h){return undefined
}return _fakemodel.duration
};
this.playlistClickable=function(){return(!h||A.playlistclickable.toString().toLowerCase()=="true")
};
function s(){_fakemodel=new a.html5.model(this,E.getMedia()?E.getMedia().getDisplayElement():E.container,E);
k=new a.html5.eventdispatcher();
C.jwAddEventListener(a.api.events.JWPLAYER_RESIZE,p);
C.jwAddEventListener(a.api.events.JWPLAYER_FULLSCREEN,p)
}function c(){_fakemodel.setMute(E.mute);
_fakemodel.setVolume(E.volume)
}function F(){if(!g){g=new a.html5.mediavideo(_fakemodel,E.getMedia()?E.getMedia().getDisplayElement():E.container);
g.addGlobalListener(I);
g.addEventListener(a.api.events.JWPLAYER_MEDIA_META,J);
g.addEventListener(a.api.events.JWPLAYER_MEDIA_COMPLETE,u);
g.addEventListener(a.api.events.JWPLAYER_MEDIA_BUFFER_FULL,B)
}g.attachMedia()
}function I(K){if(h){D(K.type,K)
}}function B(K){if(h){g.play()
}}function u(K){if(h){setTimeout(function(){n.jwInstreamDestroy(true)
},10)
}}function J(K){if(K.metadata.width&&K.metadata.height){j.resizeMedia()
}}function D(K,L,M){if(h||M){k.sendEvent(K,L)
}}function p(){var K=E.plugins.object.display.getDisplayElement().style;
if(l){var L=E.plugins.object.controlbar.getDisplayElement().style;
l.resize(b.parseDimension(K.width),b.parseDimension(K.height));
_css(l.getDisplayElement(),b.extend({},L,{zIndex:1001,opacity:1}))
}if(q){q.resize(b.parseDimension(K.width),b.parseDimension(K.height));
_css(q.getDisplayElement(),b.extend({},K,{zIndex:1000}))
}if(j){j.resizeMedia()
}}this.jwPlay=function(K){if(A.controlbarpausable.toString().toLowerCase()=="true"){this.jwInstreamPlay()
}};
this.jwPause=function(K){if(A.controlbarpausable.toString().toLowerCase()=="true"){this.jwInstreamPause()
}};
this.jwStop=function(){if(A.controlbarstoppable.toString().toLowerCase()=="true"){this.jwInstreamDestroy();
C.jwStop()
}};
this.jwSeek=function(K){switch(A.controlbarseekable.toLowerCase()){case"always":this.jwInstreamSeek(K);
break;
case"backwards":if(_fakemodel.position>K){this.jwInstreamSeek(K)
}break
}};
this.jwGetPosition=function(){};
this.jwGetDuration=function(){};
this.jwGetWidth=C.jwGetWidth;
this.jwGetHeight=C.jwGetHeight;
this.jwGetFullscreen=C.jwGetFullscreen;
this.jwSetFullscreen=C.jwSetFullscreen;
this.jwGetVolume=function(){return E.volume
};
this.jwSetVolume=function(K){g.volume(K);
C.jwSetVolume(K)
};
this.jwGetMute=function(){return E.mute
};
this.jwSetMute=function(K){g.mute(K);
C.jwSetMute(K)
};
this.jwGetState=function(){return _fakemodel.state
};
this.jwGetPlaylist=function(){return[v]
};
this.jwGetPlaylistIndex=function(){return 0
};
this.jwGetStretching=function(){return E.config.stretching
};
this.jwAddEventListener=function(L,K){k.addEventListener(L,K)
};
this.jwRemoveEventListener=function(L,K){k.removeEventListener(L,K)
};
this.skin=C.skin;
this.id=C.id+"_instream";
s();
return this
}
})(jwplayer);
(function(a){var b={prefix:"",file:"",link:"",linktarget:"_top",margin:8,out:0.5,over:1,timeout:5,hide:true,position:"bottom-left"};
_css=a.utils.css;
a.html5.logo=function(n,r){var q=n;
var u;
var d;
var t;
var h=false;
g();
function g(){o();
q.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,j);
c();
l()
}function o(){if(b.prefix){var v=n.version.split(/\W/).splice(0,2).join("/");
if(b.prefix.indexOf(v)<0){b.prefix+=v+"/"
}}if(r.position==a.html5.view.positions.OVER){r.position=b.position
}try{if(window.location.href.indexOf("https")==0){b.prefix=b.prefix.replace("http://l.longtailvideo.com","https://securel.longtailvideo.com")
}}catch(w){}d=a.utils.extend({},b,r)
}function c(){t=document.createElement("img");
t.id=q.id+"_jwplayer_logo";
t.style.display="none";
t.onload=function(v){_css(t,k());
p()
};
if(!d.file){return
}if(d.file.indexOf("/")>=0){t.src=d.file
}else{t.src=d.prefix+d.file
}}if(!d.file){return
}this.resize=function(w,v){};
this.getDisplayElement=function(){return t
};
function l(){if(d.link){t.onmouseover=f;
t.onmouseout=p;
t.onclick=s
}else{this.mouseEnabled=false
}}function s(v){if(typeof v!="undefined"){v.stopPropagation()
}if(!h){return
}q.jwPause();
q.jwSetFullscreen(false);
if(d.link){window.open(d.link,d.linktarget)
}return
}function p(v){if(d.link&&h){t.style.opacity=d.out
}return
}function f(v){if(h){t.style.opacity=d.over
}return
}function k(){var x={textDecoration:"none",position:"absolute",cursor:"pointer"};
x.display=(d.hide.toString()=="true"&&!h)?"none":"block";
var w=d.position.toLowerCase().split("-");
for(var v in w){x[w[v]]=parseInt(d.margin)
}return x
}function m(){if(d.hide.toString()=="true"){t.style.display="block";
t.style.opacity=0;
a.utils.fadeTo(t,d.out,0.1,parseFloat(t.style.opacity));
u=setTimeout(function(){e()
},d.timeout*1000)
}h=true
}function e(){h=false;
if(d.hide.toString()=="true"){a.utils.fadeTo(t,0,0.1,parseFloat(t.style.opacity))
}}function j(v){if(v.newstate==a.api.events.state.BUFFERING){clearTimeout(u);
m()
}}return this
}
})(jwplayer);
(function(b){var d={ended:b.api.events.state.IDLE,playing:b.api.events.state.PLAYING,pause:b.api.events.state.PAUSED,buffering:b.api.events.state.BUFFERING};
var f=b.utils;
var a=f.isMobile();
var g,e;
var c={};
b.html5.mediavideo=function(k,I){var M={abort:A,canplay:r,canplaythrough:r,durationchange:w,emptied:A,ended:r,error:q,loadeddata:w,loadedmetadata:w,loadstart:r,pause:r,play:A,playing:r,progress:G,ratechange:A,seeked:r,seeking:r,stalled:r,suspend:r,timeupdate:Q,volumechange:n,waiting:r,canshowcurrentframe:A,dataunavailable:A,empty:A,load:j,loadedfirstframe:A,webkitfullscreenchange:m};
var E={};
var N=new b.html5.eventdispatcher();
f.extend(this,N);
var l=k,D=I,o,h,F,W,H,P,O=false,v=false,z=false,L,J,T;
U();
this.load=function(Y,Z){if(typeof Z=="undefined"){Z=true
}if(!v){return
}W=Y;
z=(W.duration>0);
l.duration=W.duration;
f.empty(o);
o.style.display="block";
o.style.opacity=1;
if(g&&e){o.style.width=g;
o.style.height=e;
g=_previousHieght=0
}T=0;
s(Y.levels);
if(Y.levels&&Y.levels.length>0){if(Y.levels.length==1||f.isIOS()){o.src=Y.levels[0].file
}else{if(o.src){o.removeAttribute("src")
}for(var X=0;
X<Y.levels.length;
X++){var aa=o.ownerDocument.createElement("source");
aa.src=Y.levels[X].file;
o.appendChild(aa);
T++
}}}else{o.src=Y.file
}o.volume=l.volume/100;
o.muted=l.mute;
if(a){S()
}L=J=F=false;
l.buffer=0;
if(!f.exists(Y.start)){Y.start=0
}P=(Y.start>0)?Y.start:-1;
u(b.api.events.JWPLAYER_MEDIA_LOADED);
if((!a&&Y.levels.length==1)||!O){o.load()
}O=false;
if(Z){y(b.api.events.state.BUFFERING);
u(b.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:0});
C()
}if(o.videoWidth>0&&o.videoHeight>0){w()
}};
this.play=function(){if(!v){return
}C();
if(J){y(b.api.events.state.PLAYING)
}else{o.load();
y(b.api.events.state.BUFFERING)
}o.play()
};
this.pause=function(){if(!v){return
}o.pause();
y(b.api.events.state.PAUSED)
};
this.seek=function(X){if(!v){return
}if(!F&&o.readyState>0){if(!(l.duration<=0||isNaN(l.duration))&&!(l.position<=0||isNaN(l.position))){o.currentTime=X;
o.play()
}}else{P=X
}};
var B=this.stop=function(X){if(!v){return
}if(!f.exists(X)){X=true
}t();
if(X){J=false;
var Y=navigator.userAgent;
if(o.webkitSupportsFullscreen){try{o.webkitExitFullscreen()
}catch(Z){}}o.style.opacity=0;
x();
if(f.isIE()){o.src=""
}else{o.removeAttribute("src")
}f.empty(o);
o.load();
O=true
}if(f.isIPod()){g=o.style.width;
e=o.style.height;
o.style.width=0;
o.style.height=0
}else{if(f.isIPad()){o.style.display="none";
try{o.webkitExitFullscreen()
}catch(aa){}}}y(b.api.events.state.IDLE)
};
this.fullscreen=function(X){if(X===true){this.resize("100%","100%")
}else{this.resize(l.config.width,l.config.height)
}};
this.resize=function(Y,X){};
this.volume=function(X){if(!a){o.volume=X/100;
u(b.api.events.JWPLAYER_MEDIA_VOLUME,{volume:(X/100)})
}};
this.mute=function(X){if(!a){o.muted=X;
u(b.api.events.JWPLAYER_MEDIA_MUTE,{mute:X})
}};
this.getDisplayElement=function(){return o
};
this.hasChrome=function(){return a&&(h==b.api.events.state.PLAYING)
};
this.detachMedia=function(){v=false;
return this.getDisplayElement()
};
this.attachMedia=function(){v=true
};
this.destroy=function(){if(o&&o.parentNode){t();
for(var X in M){o.removeEventListener(X,K(X,M[X]),true)
}f.empty(o);
D=o.parentNode;
o.parentNode.removeChild(o);
delete c[l.id];
o=null
}};
function K(Y,X){if(E[Y]){return E[Y]
}else{E[Y]=function(Z){if(f.exists(Z.target.parentNode)){X(Z)
}};
return E[Y]
}}function U(){h=b.api.events.state.IDLE;
v=true;
o=p();
o.setAttribute("x-webkit-airplay","allow");
if(D.parentNode){o.id=D.id;
D.parentNode.replaceChild(o,D)
}}function p(){var X=c[l.id];
if(!X){if(D.tagName.toLowerCase()=="video"){X=D
}else{X=document.createElement("video")
}c[l.id]=X;
if(!X.id){X.id=D.id
}}for(var Y in M){X.addEventListener(Y,K(Y,M[Y]),true)
}return X
}function y(X){if(X==b.api.events.state.PAUSED&&h==b.api.events.state.IDLE){return
}if(a){switch(X){case b.api.events.state.PLAYING:S();
break;
case b.api.events.state.BUFFERING:case b.api.events.state.PAUSED:x();
break
}}if(h!=X){var Y=h;
l.state=h=X;
u(b.api.events.JWPLAYER_PLAYER_STATE,{oldstate:Y,newstate:X})
}}function A(X){}function n(X){var Y=Math.round(o.volume*100);
u(b.api.events.JWPLAYER_MEDIA_VOLUME,{volume:Y},true);
u(b.api.events.JWPLAYER_MEDIA_MUTE,{mute:o.muted},true)
}function G(Z){if(!v){return
}var Y;
if(f.exists(Z)&&Z.lengthComputable&&Z.total){Y=Z.loaded/Z.total*100
}else{if(f.exists(o.buffered)&&(o.buffered.length>0)){var X=o.buffered.length-1;
if(X>=0){Y=o.buffered.end(X)/o.duration*100
}}}if(f.useNativeFullscreen()&&f.exists(o.webkitDisplayingFullscreen)){if(l.fullscreen!=o.webkitDisplayingFullscreen){u(b.api.events.JWPLAYER_FULLSCREEN,{fullscreen:o.webkitDisplayingFullscreen},true)
}}if(J===false&&h==b.api.events.state.BUFFERING){u(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL);
J=true
}if(!L){if(Y==100){L=true
}if(f.exists(Y)&&(Y>l.buffer)){l.buffer=Math.round(Y);
u(b.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:Math.round(Y)})
}}}function Q(Y){if(!v){return
}if(f.exists(Y)&&f.exists(Y.target)){if(z>0){if(!isNaN(Y.target.duration)&&(isNaN(l.duration)||l.duration<1)){if(Y.target.duration==Infinity){l.duration=0
}else{l.duration=Math.round(Y.target.duration*10)/10
}}}if(!F&&o.readyState>0){y(b.api.events.state.PLAYING)
}if(h==b.api.events.state.PLAYING){if(o.readyState>0&&(P>-1||!F)){F=true;
try{if(o.currentTime!=P&&P>-1){o.currentTime=P;
P=-1
}}catch(X){}o.volume=l.volume/100;
o.muted=l.mute
}l.position=l.duration>0?(Math.round(Y.target.currentTime*10)/10):0;
u(b.api.events.JWPLAYER_MEDIA_TIME,{position:l.position,duration:l.duration});
if(l.position>=l.duration&&(l.position>0||l.duration>0)){R();
return
}}}G(Y)
}function j(X){}function r(X){if(!v){return
}if(g&&e){o.style.width=g;
o.style.height=e;
g=_previousHieght=0
}if(d[X.type]){if(X.type=="ended"){R()
}else{y(d[X.type])
}}}function w(Y){if(!v){return
}var X=Math.round(o.duration*10)/10;
var Z={height:o.videoHeight,width:o.videoWidth,duration:X};
if(!z){if((l.duration<X||isNaN(l.duration))&&o.duration!=Infinity){l.duration=X
}}u(b.api.events.JWPLAYER_MEDIA_META,{metadata:Z})
}function q(Z){if(!v){return
}if(h==b.api.events.state.IDLE){return
}var Y="There was an error: ";
if((Z.target.error&&Z.target.tagName.toLowerCase()=="video")||Z.target.parentNode.error&&Z.target.parentNode.tagName.toLowerCase()=="video"){var X=!f.exists(Z.target.error)?Z.target.parentNode.error:Z.target.error;
switch(X.code){case X.MEDIA_ERR_ABORTED:f.log("User aborted the video playback.");
return;
case X.MEDIA_ERR_NETWORK:Y="A network error caused the video download to fail part-way: ";
break;
case X.MEDIA_ERR_DECODE:Y="The video playback was aborted due to a corruption problem or because the video used features your browser did not support: ";
break;
case X.MEDIA_ERR_SRC_NOT_SUPPORTED:Y="The video could not be loaded, either because the server or network failed or because the format is not supported: ";
break;
default:Y="An unknown error occurred: ";
break
}}else{if(Z.target.tagName.toLowerCase()=="source"){T--;
if(T>0){return
}if(f.userAgentMatch(/firefox/i)){f.log("The video could not be loaded, either because the server or network failed or because the format is not supported.");
B(false);
return
}else{Y="The video could not be loaded, either because the server or network failed or because the format is not supported: "
}}else{f.log("An unknown error occurred.  Continuing...");
return
}}B(false);
Y+=V();
_error=true;
u(b.api.events.JWPLAYER_ERROR,{message:Y});
return
}function V(){var Z="";
for(var Y in W.levels){var X=W.levels[Y];
var aa=D.ownerDocument.createElement("source");
Z+=b.utils.getAbsolutePath(X.file);
if(Y<(W.levels.length-1)){Z+=", "
}}return Z
}function C(){if(!f.exists(H)){H=setInterval(function(){G()
},100)
}}function t(){clearInterval(H);
H=null
}function R(){if(h==b.api.events.state.PLAYING){B(false);
u(b.api.events.JWPLAYER_MEDIA_BEFORECOMPLETE);
u(b.api.events.JWPLAYER_MEDIA_COMPLETE)
}}function m(X){if(f.exists(o.webkitDisplayingFullscreen)){if(l.fullscreen&&!o.webkitDisplayingFullscreen){u(b.api.events.JWPLAYER_FULLSCREEN,{fullscreen:false},true)
}}}function s(Z){if(Z.length>0&&f.userAgentMatch(/Safari/i)&&!f.userAgentMatch(/Chrome/i)){var X=-1;
for(var Y=0;
Y<Z.length;
Y++){switch(f.extension(Z[Y].file)){case"mp4":if(X<0){X=Y
}break;
case"webm":Z.splice(Y,1);
break
}}if(X>0){var aa=Z.splice(X,1)[0];
Z.unshift(aa)
}}}function S(){setTimeout(function(){o.setAttribute("controls","controls")
},100)
}function x(){setTimeout(function(){o.removeAttribute("controls")
},250)
}function u(X,Z,Y){if(v||Y){if(Z){N.sendEvent(X,Z)
}else{N.sendEvent(X)
}}}}
})(jwplayer);
(function(a){var c={ended:a.api.events.state.IDLE,playing:a.api.events.state.PLAYING,pause:a.api.events.state.PAUSED,buffering:a.api.events.state.BUFFERING};
var b=a.utils.css;
a.html5.mediayoutube=function(j,e){var f=new a.html5.eventdispatcher();
a.utils.extend(this,f);
var l=j;
var h=document.getElementById(e.id);
var g=a.api.events.state.IDLE;
var n,m;
function k(p){if(g!=p){var q=g;
l.state=p;
g=p;
f.sendEvent(a.api.events.JWPLAYER_PLAYER_STATE,{oldstate:q,newstate:p})
}}this.getDisplayElement=this.detachMedia=function(){return h
};
this.attachMedia=function(){};
this.play=function(){if(g==a.api.events.state.IDLE){f.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:100});
f.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER_FULL);
k(a.api.events.state.PLAYING)
}else{if(g==a.api.events.state.PAUSED){k(a.api.events.state.PLAYING)
}}};
this.pause=function(){k(a.api.events.state.PAUSED)
};
this.seek=function(p){};
this.stop=function(p){if(!_utils.exists(p)){p=true
}l.position=0;
k(a.api.events.state.IDLE);
if(p){b(h,{display:"none"})
}};
this.volume=function(p){l.setVolume(p);
f.sendEvent(a.api.events.JWPLAYER_MEDIA_VOLUME,{volume:Math.round(p)})
};
this.mute=function(p){h.muted=p;
f.sendEvent(a.api.events.JWPLAYER_MEDIA_MUTE,{mute:p})
};
this.resize=function(q,p){if(q*p>0&&n){n.width=m.width=q;
n.height=m.height=p
}};
this.fullscreen=function(p){if(p===true){this.resize("100%","100%")
}else{this.resize(l.config.width,l.config.height)
}};
this.load=function(p){o(p);
b(n,{display:"block"});
k(a.api.events.state.BUFFERING);
f.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:0});
f.sendEvent(a.api.events.JWPLAYER_MEDIA_LOADED);
this.play()
};
this.hasChrome=function(){return(g!=a.api.events.state.IDLE)
};
function o(v){var s=v.levels[0].file;
s=["http://www.youtube.com/v/",d(s),"&amp;hl=en_US&amp;fs=1&autoplay=1"].join("");
n=document.createElement("object");
n.id=h.id;
n.style.position="absolute";
var u={movie:s,allowfullscreen:"true",allowscriptaccess:"always"};
for(var p in u){var t=document.createElement("param");
t.name=p;
t.value=u[p];
n.appendChild(t)
}m=document.createElement("embed");
n.appendChild(m);
var q={src:s,type:"application/x-shockwave-flash",allowfullscreen:"true",allowscriptaccess:"always",width:n.width,height:n.height};
for(var r in q){m.setAttribute(r,q[r])
}n.appendChild(m);
n.style.zIndex=2147483000;
if(h!=n&&h.parentNode){h.parentNode.replaceChild(n,h)
}h=n
}function d(q){var p=q.split(/\?|\#\!/);
var s="";
for(var r=0;
r<p.length;
r++){if(p[r].substr(0,2)=="v="){s=p[r].substr(2)
}}if(s==""){if(q.indexOf("/v/")>=0){s=q.substr(q.indexOf("/v/")+3)
}else{if(q.indexOf("youtu.be")>=0){s=q.substr(q.indexOf("youtu.be/")+9)
}else{s=q
}}}if(s.indexOf("?")>-1){s=s.substr(0,s.indexOf("?"))
}if(s.indexOf("&")>-1){s=s.substr(0,s.indexOf("&"))
}return s
}this.embed=m;
return this
}
})(jwplayer);
(function(jwplayer){var _configurableStateVariables=["width","height","start","duration","volume","mute","fullscreen","item","plugins","stretching"];
var _utils=jwplayer.utils;
jwplayer.html5.model=function(api,container,options){var _api=api;
var _container=container;
var _cookies=_utils.getCookies();
var _model={id:_container.id,playlist:[],state:jwplayer.api.events.state.IDLE,position:0,buffer:0,container:_container,config:{width:480,height:320,item:-1,skin:undefined,file:undefined,image:undefined,start:0,duration:0,bufferlength:5,volume:_cookies.volume?_cookies.volume:90,mute:_cookies.mute&&_cookies.mute.toString().toLowerCase()=="true"?true:false,fullscreen:false,repeat:"",stretching:jwplayer.utils.stretching.UNIFORM,autostart:false,debug:undefined,screencolor:undefined}};
var _media;
var _eventDispatcher=new jwplayer.html5.eventdispatcher();
var _components=["display","logo","controlbar","playlist","dock"];
jwplayer.utils.extend(_model,_eventDispatcher);
for(var option in options){if(typeof options[option]=="string"){var type=/color$/.test(option)?"color":null;
options[option]=jwplayer.utils.typechecker(options[option],type)
}var config=_model.config;
var path=option.split(".");
for(var edge in path){if(edge==path.length-1){config[path[edge]]=options[option]
}else{if(!jwplayer.utils.exists(config[path[edge]])){config[path[edge]]={}
}config=config[path[edge]]
}}}for(var index in _configurableStateVariables){var configurableStateVariable=_configurableStateVariables[index];
_model[configurableStateVariable]=_model.config[configurableStateVariable]
}var pluginorder=_components.concat([]);
if(jwplayer.utils.exists(_model.plugins)){if(typeof _model.plugins=="string"){var userplugins=_model.plugins.split(",");
for(var userplugin in userplugins){if(typeof userplugins[userplugin]=="string"){pluginorder.push(userplugins[userplugin].replace(/^\s+|\s+$/g,""))
}}}}if(jwplayer.utils.isMobile()){pluginorder=["display","logo","dock","playlist"];
if(!jwplayer.utils.exists(_model.config.repeat)){_model.config.repeat="list"
}}else{if(_model.config.chromeless){pluginorder=["logo","dock","playlist"];
if(!jwplayer.utils.exists(_model.config.repeat)){_model.config.repeat="list"
}}}_model.plugins={order:pluginorder,config:{},object:{}};
if(typeof _model.config.components!="undefined"){for(var component in _model.config.components){_model.plugins.config[component]=_model.config.components[component]
}}var playlistVisible=false;
for(var pluginIndex in _model.plugins.order){var pluginName=_model.plugins.order[pluginIndex];
var pluginConfig=!jwplayer.utils.exists(_model.plugins.config[pluginName])?{}:_model.plugins.config[pluginName];
_model.plugins.config[pluginName]=!jwplayer.utils.exists(_model.plugins.config[pluginName])?pluginConfig:jwplayer.utils.extend(_model.plugins.config[pluginName],pluginConfig);
if(!jwplayer.utils.exists(_model.plugins.config[pluginName].position)){if(pluginName=="playlist"){_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.NONE
}else{_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.OVER
}}else{if(pluginName=="playlist"){playlistVisible=true
}_model.plugins.config[pluginName].position=_model.plugins.config[pluginName].position.toString().toUpperCase()
}}if(_model.plugins.config.controlbar&&playlistVisible){_model.plugins.config.controlbar.hideplaylistcontrols=true
}if(typeof _model.plugins.config.dock!="undefined"){if(typeof _model.plugins.config.dock!="object"){var position=_model.plugins.config.dock.toString().toUpperCase();
_model.plugins.config.dock={position:position}
}if(typeof _model.plugins.config.dock.position!="undefined"){_model.plugins.config.dock.align=_model.plugins.config.dock.position;
_model.plugins.config.dock.position=jwplayer.html5.view.positions.OVER
}if(typeof _model.plugins.config.dock.idlehide=="undefined"){try{_model.plugins.config.dock.idlehide=_model.plugins.config.controlbar.idlehide
}catch(e){}}}function _loadExternal(playlistfile){var loader=new jwplayer.html5.playlistloader();
loader.addEventListener(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED,function(evt){_model.playlist=new jwplayer.html5.playlist(evt);
_loadComplete(true)
});
loader.addEventListener(jwplayer.api.events.JWPLAYER_ERROR,function(evt){_model.playlist=new jwplayer.html5.playlist({playlist:[]});
_loadComplete(false)
});
loader.load(playlistfile)
}function _loadComplete(){if(_model.config.shuffle){_model.item=_getShuffleItem()
}else{if(_model.config.item>=_model.playlist.length){_model.config.item=_model.playlist.length-1
}else{if(_model.config.item<0){_model.config.item=0
}}_model.item=_model.config.item
}_model.position=0;
_model.duration=_model.playlist.length>0?_model.playlist[_model.item].duration:0;
_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED,{playlist:_model.playlist});
_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_ITEM,{index:_model.item})
}_model.loadPlaylist=function(arg){var input;
if(typeof arg=="string"){if(arg.indexOf("[")==0||arg.indexOf("{")=="0"){try{input=eval(arg)
}catch(err){input=arg
}}else{input=arg
}}else{input=arg
}var config;
switch(jwplayer.utils.typeOf(input)){case"object":config=input;
break;
case"array":config={playlist:input};
break;
default:config={file:input};
break
}_model.playlist=new jwplayer.html5.playlist(config);
_model.item=_model.config.item>=0?_model.config.item:0;
if(!_model.playlist[0].provider&&_model.playlist[0].file){_loadExternal(_model.playlist[0].file)
}else{_loadComplete()
}};
function _getShuffleItem(){var result=null;
if(_model.playlist.length>1){while(!jwplayer.utils.exists(result)){result=Math.floor(Math.random()*_model.playlist.length);
if(result==_model.item){result=null
}}}else{result=0
}return result
}function forward(evt){switch(evt.type){case jwplayer.api.events.JWPLAYER_MEDIA_LOADED:_container=_media.getDisplayElement();
break;
case jwplayer.api.events.JWPLAYER_MEDIA_MUTE:this.mute=evt.mute;
break;
case jwplayer.api.events.JWPLAYER_MEDIA_VOLUME:this.volume=evt.volume;
break
}_eventDispatcher.sendEvent(evt.type,evt)
}var _mediaProviders={};
_model.setActiveMediaProvider=function(playlistItem){if(playlistItem.provider=="audio"){playlistItem.provider="sound"
}var provider=playlistItem.provider;
var current=_media?_media.getDisplayElement():null;
if(provider=="sound"||provider=="http"||provider==""){provider="video"
}if(!jwplayer.utils.exists(_mediaProviders[provider])){switch(provider){case"video":_media=new jwplayer.html5.mediavideo(_model,current?current:_container);
break;
case"youtube":_media=new jwplayer.html5.mediayoutube(_model,current?current:_container);
break
}if(!jwplayer.utils.exists(_media)){return false
}_media.addGlobalListener(forward);
_mediaProviders[provider]=_media
}else{if(_media!=_mediaProviders[provider]){if(_media){_media.stop()
}_media=_mediaProviders[provider]
}}return true
};
_model.getMedia=function(){return _media
};
_model.seek=function(pos){_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_MEDIA_SEEK,{position:_model.position,offset:pos});
return _media.seek(pos)
};
_model.setVolume=function(newVol){_utils.saveCookie("volume",newVol);
_model.volume=newVol
};
_model.setMute=function(state){_utils.saveCookie("mute",state);
_model.mute=state
};
_model.setupPlugins=function(){if(!jwplayer.utils.exists(_model.plugins)||!jwplayer.utils.exists(_model.plugins.order)||_model.plugins.order.length==0){jwplayer.utils.log("No plugins to set up");
return _model
}for(var i=0;
i<_model.plugins.order.length;
i++){try{var pluginName=_model.plugins.order[i];
if(jwplayer.utils.exists(jwplayer.html5[pluginName])){if(pluginName=="playlist"){_model.plugins.object[pluginName]=new jwplayer.html5.playlistcomponent(_api,_model.plugins.config[pluginName])
}else{_model.plugins.object[pluginName]=new jwplayer.html5[pluginName](_api,_model.plugins.config[pluginName])
}}else{_model.plugins.order.splice(plugin,plugin+1)
}if(typeof _model.plugins.object[pluginName].addGlobalListener=="function"){_model.plugins.object[pluginName].addGlobalListener(forward)
}}catch(err){jwplayer.utils.log("Could not setup "+pluginName)
}}};
return _model
}
})(jwplayer);
(function(a){a.html5.playlist=function(b){var d=[];
if(b.playlist&&b.playlist instanceof Array&&b.playlist.length>0){for(var c in b.playlist){if(!isNaN(parseInt(c))){d.push(new a.html5.playlistitem(b.playlist[c]))
}}}else{d.push(new a.html5.playlistitem(b))
}return d
}
})(jwplayer);
(function(a){var c={size:180,position:a.html5.view.positions.NONE,itemheight:60,thumbs:true,fontcolor:"#000000",overcolor:"",activecolor:"",backgroundcolor:"#f8f8f8",font:"_sans",fontsize:"",fontstyle:"",fontweight:""};
var b={_sans:"Arial, Helvetica, sans-serif",_serif:"Times, Times New Roman, serif",_typewriter:"Courier New, Courier, monospace"};
_utils=a.utils;
_css=_utils.css;
_hide=function(d){_css(d,{display:"none"})
};
_show=function(d){_css(d,{display:"block"})
};
a.html5.playlistcomponent=function(r,C){var x=r;
var e=a.utils.extend({},c,x.skin.getComponentSettings("playlist"),C);
if(e.position==a.html5.view.positions.NONE||typeof a.html5.view.positions[e.position]=="undefined"){return
}var y;
var l;
var D;
var d;
var g;
var f;
var k=-1;
var h={background:undefined,item:undefined,itemOver:undefined,itemImage:undefined,itemActive:undefined};
this.getDisplayElement=function(){return y
};
this.resize=function(G,E){l=G;
D=E;
if(x.jwGetFullscreen()){_hide(y)
}else{var F={display:"block",width:l,height:D};
_css(y,F)
}};
this.show=function(){_show(y)
};
this.hide=function(){_hide(y)
};
function j(){y=document.createElement("div");
y.id=x.id+"_jwplayer_playlistcomponent";
y.style.overflow="hidden";
switch(e.position){case a.html5.view.positions.RIGHT:case a.html5.view.positions.LEFT:y.style.width=e.size+"px";
break;
case a.html5.view.positions.TOP:case a.html5.view.positions.BOTTOM:y.style.height=e.size+"px";
break
}B();
if(h.item){e.itemheight=h.item.height
}y.style.backgroundColor="#C6C6C6";
x.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,s);
x.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM,v);
x.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE,m)
}function p(){var E=document.createElement("ul");
_css(E,{width:y.style.width,minWidth:y.style.width,height:y.style.height,backgroundColor:e.backgroundcolor,backgroundImage:h.background?"url("+h.background.src+")":"",color:e.fontcolor,listStyle:"none",margin:0,padding:0,fontFamily:b[e.font]?b[e.font]:b._sans,fontSize:(e.fontsize?e.fontsize:11)+"px",fontStyle:e.fontstyle,fontWeight:e.fontweight,overflowY:"auto"});
return E
}function z(E){return function(){var F=f.getElementsByClassName("item")[E];
var G=e.fontcolor;
var H=h.item?"url("+h.item.src+")":"";
if(E==x.jwGetPlaylistIndex()){if(e.activecolor!==""){G=e.activecolor
}if(h.itemActive){H="url("+h.itemActive.src+")"
}}_css(F,{color:e.overcolor!==""?e.overcolor:G,backgroundImage:h.itemOver?"url("+h.itemOver.src+")":H})
}
}function o(E){return function(){var F=f.getElementsByClassName("item")[E];
var G=e.fontcolor;
var H=h.item?"url("+h.item.src+")":"";
if(E==x.jwGetPlaylistIndex()){if(e.activecolor!==""){G=e.activecolor
}if(h.itemActive){H="url("+h.itemActive.src+")"
}}_css(F,{color:G,backgroundImage:H})
}
}function q(J){var Q=d[J];
var P=document.createElement("li");
P.className="item";
_css(P,{height:e.itemheight,display:"block",cursor:"pointer",backgroundImage:h.item?"url("+h.item.src+")":"",backgroundSize:"100% "+e.itemheight+"px"});
P.onmouseover=z(J);
P.onmouseout=o(J);
var K=document.createElement("div");
var G=new Image();
var L=0;
var M=0;
var N=0;
if(w()&&(Q.image||Q["playlist.image"]||h.itemImage)){G.className="image";
if(h.itemImage){L=(e.itemheight-h.itemImage.height)/2;
M=h.itemImage.width;
N=h.itemImage.height
}else{M=e.itemheight*4/3;
N=e.itemheight
}_css(K,{height:N,width:M,"float":"left",styleFloat:"left",cssFloat:"left",margin:"0 5px 0 0",background:"black",overflow:"hidden",margin:L+"px",position:"relative"});
_css(G,{position:"relative"});
K.appendChild(G);
G.onload=function(){a.utils.stretch(a.utils.stretching.FILL,G,M,N,this.naturalWidth,this.naturalHeight)
};
if(Q["playlist.image"]){G.src=Q["playlist.image"]
}else{if(Q.image){G.src=Q.image
}else{if(h.itemImage){G.src=h.itemImage.src
}}}P.appendChild(K)
}var F=l-M-L*2;
if(D<e.itemheight*d.length){F-=15
}var E=document.createElement("div");
_css(E,{position:"relative",height:"100%",overflow:"hidden"});
var H=document.createElement("span");
if(Q.duration>0){H.className="duration";
_css(H,{fontSize:(e.fontsize?e.fontsize:11)+"px",fontWeight:(e.fontweight?e.fontweight:"bold"),width:"40px",height:e.fontsize?e.fontsize+10:20,lineHeight:24,"float":"right",styleFloat:"right",cssFloat:"right"});
H.innerHTML=_utils.timeFormat(Q.duration);
E.appendChild(H)
}var O=document.createElement("span");
O.className="title";
_css(O,{padding:"5px 5px 0 "+(L?0:"5px"),height:e.fontsize?e.fontsize+10:20,lineHeight:e.fontsize?e.fontsize+10:20,overflow:"hidden","float":"left",styleFloat:"left",cssFloat:"left",width:((Q.duration>0)?F-50:F)-10+"px",fontSize:(e.fontsize?e.fontsize:13)+"px",fontWeight:(e.fontweight?e.fontweight:"bold")});
O.innerHTML=Q?Q.title:"";
E.appendChild(O);
if(Q.description){var I=document.createElement("span");
I.className="description";
_css(I,{display:"block","float":"left",styleFloat:"left",cssFloat:"left",margin:0,paddingLeft:O.style.paddingLeft,paddingRight:O.style.paddingRight,lineHeight:(e.fontsize?e.fontsize+4:16)+"px",overflow:"hidden",position:"relative"});
I.innerHTML=Q.description;
E.appendChild(I)
}P.appendChild(E);
return P
}function s(F){y.innerHTML="";
d=t();
if(!d){return
}items=[];
f=p();
for(var G=0;
G<d.length;
G++){var E=q(G);
E.onclick=A(G);
f.appendChild(E);
items.push(E)
}k=x.jwGetPlaylistIndex();
o(k)();
y.appendChild(f);
if(_utils.isIOS()&&window.iScroll){f.style.height=e.itemheight*d.length+"px";
var H=new iScroll(y.id)
}}function t(){var F=x.jwGetPlaylist();
var G=[];
for(var E=0;
E<F.length;
E++){if(!F[E]["ova.hidden"]){G.push(F[E])
}}return G
}function A(E){return function(){x.jwPlaylistItem(E);
x.jwPlay(true)
}
}function n(){f.scrollTop=x.jwGetPlaylistIndex()*e.itemheight
}function w(){return e.thumbs.toString().toLowerCase()=="true"
}function v(E){if(k>=0){o(k)();
k=E.index
}o(E.index)();
n()
}function m(){if(e.position==a.html5.view.positions.OVER){switch(x.jwGetState()){case a.api.events.state.IDLE:_show(y);
break;
default:_hide(y);
break
}}}function B(){for(var E in h){h[E]=u(E)
}}function u(E){return x.skin.getSkinElement("playlist",E)
}j();
return this
}
})(jwplayer);
(function(b){b.html5.playlistitem=function(d){var e={author:"",date:"",description:"",image:"",link:"",mediaid:"",tags:"",title:"",provider:"",file:"",streamer:"",duration:-1,start:0,currentLevel:-1,levels:[]};
var c=b.utils.extend({},e,d);
if(c.type){c.provider=c.type;
delete c.type
}if(c.levels.length===0){c.levels[0]=new b.html5.playlistitemlevel(c)
}if(!c.provider){c.provider=a(c.levels[0])
}else{c.provider=c.provider.toLowerCase()
}return c
};
function a(e){if(b.utils.isYouTube(e.file)){return"youtube"
}else{var f=b.utils.extension(e.file);
var c;
if(f&&b.utils.extensionmap[f]){if(f=="m3u8"){return"video"
}c=b.utils.extensionmap[f].html5
}else{if(e.type){c=e.type
}}if(c){var d=c.split("/")[0];
if(d=="audio"){return"sound"
}else{if(d=="video"){return d
}}}}return""
}})(jwplayer);
(function(a){a.html5.playlistitemlevel=function(b){var d={file:"",streamer:"",bitrate:0,width:0};
for(var c in d){if(a.utils.exists(b[c])){d[c]=b[c]
}}return d
}
})(jwplayer);
(function(a){a.html5.playlistloader=function(){var c=new a.html5.eventdispatcher();
a.utils.extend(this,c);
this.load=function(e){a.utils.ajax(e,d,b)
};
function d(g){var f=[];
try{var f=a.utils.parsers.rssparser.parse(g.responseXML.firstChild);
c.sendEvent(a.api.events.JWPLAYER_PLAYLIST_LOADED,{playlist:new a.html5.playlist({playlist:f})})
}catch(h){b("Could not parse the playlist")
}}function b(e){c.sendEvent(a.api.events.JWPLAYER_ERROR,{message:e?e:"Could not load playlist an unknown reason."})
}}
})(jwplayer);
(function(a){a.html5.skin=function(){var b={};
var c=false;
this.load=function(d,e){new a.html5.skinloader(d,function(f){c=true;
b=f;
e()
},function(){new a.html5.skinloader("",function(f){c=true;
b=f;
e()
})
})
};
this.getSkinElement=function(d,e){if(c){try{return b[d].elements[e]
}catch(f){a.utils.log("No such skin component / element: ",[d,e])
}}return null
};
this.getComponentSettings=function(d){if(c&&b&&b[d]){return b[d].settings
}return null
};
this.getComponentLayout=function(d){if(c){return b[d].layout
}return null
}
}
})(jwplayer);
(function(a){a.html5.skinloader=function(f,p,k){var o={};
var c=p;
var l=k;
var e=true;
var j;
var n=f;
var s=false;
function m(){if(typeof n!="string"||n===""){d(a.html5.defaultSkin().xml)
}else{a.utils.ajax(a.utils.getAbsolutePath(n),function(t){try{if(a.utils.exists(t.responseXML)){d(t.responseXML);
return
}}catch(u){h()
}d(a.html5.defaultSkin().xml)
},function(t){d(a.html5.defaultSkin().xml)
})
}}function d(y){var E=y.getElementsByTagName("component");
if(E.length===0){return
}for(var H=0;
H<E.length;
H++){var C=E[H].getAttribute("name");
var B={settings:{},elements:{},layout:{}};
o[C]=B;
var G=E[H].getElementsByTagName("elements")[0].getElementsByTagName("element");
for(var F=0;
F<G.length;
F++){b(G[F],C)
}var z=E[H].getElementsByTagName("settings")[0];
if(z&&z.childNodes.length>0){var K=z.getElementsByTagName("setting");
for(var P=0;
P<K.length;
P++){var Q=K[P].getAttribute("name");
var I=K[P].getAttribute("value");
var x=/color$/.test(Q)?"color":null;
o[C].settings[Q]=a.utils.typechecker(I,x)
}}var L=E[H].getElementsByTagName("layout")[0];
if(L&&L.childNodes.length>0){var M=L.getElementsByTagName("group");
for(var w=0;
w<M.length;
w++){var A=M[w];
o[C].layout[A.getAttribute("position")]={elements:[]};
for(var O=0;
O<A.attributes.length;
O++){var D=A.attributes[O];
o[C].layout[A.getAttribute("position")][D.name]=D.value
}var N=A.getElementsByTagName("*");
for(var v=0;
v<N.length;
v++){var t=N[v];
o[C].layout[A.getAttribute("position")].elements.push({type:t.tagName});
for(var u=0;
u<t.attributes.length;
u++){var J=t.attributes[u];
o[C].layout[A.getAttribute("position")].elements[v][J.name]=J.value
}if(!a.utils.exists(o[C].layout[A.getAttribute("position")].elements[v].name)){o[C].layout[A.getAttribute("position")].elements[v].name=t.tagName
}}}}e=false;
r()
}}function r(){clearInterval(j);
if(!s){j=setInterval(function(){q()
},100)
}}function b(y,x){var w=new Image();
var t=y.getAttribute("name");
var v=y.getAttribute("src");
var A;
if(v.indexOf("data:image/png;base64,")===0){A=v
}else{var u=a.utils.getAbsolutePath(n);
var z=u.substr(0,u.lastIndexOf("/"));
A=[z,x,v].join("/")
}o[x].elements[t]={height:0,width:0,src:"",ready:false,image:w};
w.onload=function(B){g(w,t,x)
};
w.onerror=function(B){s=true;
r();
l()
};
w.src=A
}function h(){for(var u in o){var w=o[u];
for(var t in w.elements){var x=w.elements[t];
var v=x.image;
v.onload=null;
v.onerror=null;
delete x.image;
delete w.elements[t]
}delete o[u]
}}function q(){for(var t in o){if(t!="properties"){for(var u in o[t].elements){if(!o[t].elements[u].ready){return
}}}}if(e===false){clearInterval(j);
c(o)
}}function g(t,v,u){if(o[u]&&o[u].elements[v]){o[u].elements[v].height=t.height;
o[u].elements[v].width=t.width;
o[u].elements[v].src=t.src;
o[u].elements[v].ready=true;
r()
}else{a.utils.log("Loaded an image for a missing element: "+u+"."+v)
}}m()
}
})(jwplayer);
(function(a){a.html5.api=function(c,p){var n={};
var g=document.createElement("div");
c.parentNode.replaceChild(g,c);
g.id=c.id;
n.version=a.version;
n.id=g.id;
var m=new a.html5.model(n,g,p);
var k=new a.html5.view(n,g,m);
var l=new a.html5.controller(n,g,m,k);
n.skin=new a.html5.skin();
n.jwPlay=function(q){if(typeof q=="undefined"){f()
}else{if(q.toString().toLowerCase()=="true"){l.play()
}else{l.pause()
}}};
n.jwPause=function(q){if(typeof q=="undefined"){f()
}else{if(q.toString().toLowerCase()=="true"){l.pause()
}else{l.play()
}}};
function f(){if(m.state==a.api.events.state.PLAYING||m.state==a.api.events.state.BUFFERING){l.pause()
}else{l.play()
}}n.jwStop=l.stop;
n.jwSeek=l.seek;
n.jwPlaylistItem=function(q){if(d){if(d.playlistClickable()){d.jwInstreamDestroy();
return l.item(q)
}}else{return l.item(q)
}};
n.jwPlaylistNext=l.next;
n.jwPlaylistPrev=l.prev;
n.jwResize=l.resize;
n.jwLoad=l.load;
n.jwDetachMedia=l.detachMedia;
n.jwAttachMedia=l.attachMedia;
function j(q){return function(){return m[q]
}
}function e(q,s,r){return function(){var t=m.plugins.object[q];
if(t&&t[s]&&typeof t[s]=="function"){t[s].apply(t,r)
}}
}n.jwGetPlaylistIndex=j("item");
n.jwGetPosition=j("position");
n.jwGetDuration=j("duration");
n.jwGetBuffer=j("buffer");
n.jwGetWidth=j("width");
n.jwGetHeight=j("height");
n.jwGetFullscreen=j("fullscreen");
n.jwSetFullscreen=l.setFullscreen;
n.jwGetVolume=j("volume");
n.jwSetVolume=l.setVolume;
n.jwGetMute=j("mute");
n.jwSetMute=l.setMute;
n.jwGetStretching=function(){return m.stretching.toUpperCase()
};
n.jwGetState=j("state");
n.jwGetVersion=function(){return n.version
};
n.jwGetPlaylist=function(){return m.playlist
};
n.jwAddEventListener=l.addEventListener;
n.jwRemoveEventListener=l.removeEventListener;
n.jwSendEvent=l.sendEvent;
n.jwDockSetButton=function(t,q,r,s){if(m.plugins.object.dock&&m.plugins.object.dock.setButton){m.plugins.object.dock.setButton(t,q,r,s)
}};
n.jwControlbarShow=e("controlbar","show");
n.jwControlbarHide=e("controlbar","hide");
n.jwDockShow=e("dock","show");
n.jwDockHide=e("dock","hide");
n.jwDisplayShow=e("display","show");
n.jwDisplayHide=e("display","hide");
var d;
n.jwLoadInstream=function(r,q){if(!d){d=new a.html5.instream(n,m,k,l)
}setTimeout(function(){d.load(r,q)
},10)
};
n.jwInstreamDestroy=function(){if(d){d.jwInstreamDestroy()
}};
n.jwInstreamAddEventListener=o("jwInstreamAddEventListener");
n.jwInstreamRemoveEventListener=o("jwInstreamRemoveEventListener");
n.jwInstreamGetState=o("jwInstreamGetState");
n.jwInstreamGetDuration=o("jwInstreamGetDuration");
n.jwInstreamGetPosition=o("jwInstreamGetPosition");
n.jwInstreamPlay=o("jwInstreamPlay");
n.jwInstreamPause=o("jwInstreamPause");
n.jwInstreamSeek=o("jwInstreamSeek");
function o(q){return function(){if(d&&typeof d[q]=="function"){return d[q].apply(this,arguments)
}else{_utils.log("Could not call instream method - instream API not initialized")
}}
}n.jwDestroy=function(){l.destroy()
};
n.jwGetLevel=function(){};
n.jwGetBandwidth=function(){};
n.jwGetLockState=function(){};
n.jwLock=function(){};
n.jwUnlock=function(){};
function b(){if(m.config.playlistfile){m.addEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,h);
m.loadPlaylist(m.config.playlistfile)
}else{if(typeof m.config.playlist=="string"){m.addEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,h);
m.loadPlaylist(m.config.playlist)
}else{m.loadPlaylist(m.config);
setTimeout(h,25)
}}}function h(q){m.removeEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED,h);
m.setupPlugins();
k.setup();
var q={id:n.id,version:n.version};
l.playerReady(q)
}if(m.config.chromeless&&!a.utils.isIOS()){b()
}else{n.skin.load(m.config.skin,b)
}return n
}
})(jwplayer)
};
if(typeof com=="undefined"){com=new Object()
}if(typeof com.containerstore=="undefined"){com.containerstore=new Object()
}if(typeof com.containerstore.video=="undefined"){com.containerstore.video=new Object()
}var videoTracking;
var trackingCategory;
function initializeVideoTracking(player,category){trackingCategory=category;
if(videoTracking==undefined){videoTracking=new com.containerstore.video.VideoTracking()
}player.onPlaylist(function(event){videoTracking.resetStatistics()
});
player.onPlay(function(event){videoTracking.onPlay(this)
});
player.onPause(function(event){videoTracking.onPause(this)
});
player.onComplete(function(event){videoTracking.onComplete(this)
});
player.onError(function(event){videoTracking.onError(this,event.message)
});
player.onTime(function(event){if(videoTracking.previousPosition==-1){videoTracking.previousPosition=event.position
}else{var currentPosition=event.position;
if(currentPosition<videoTracking.previousPosition){videoTracking.onSeek(videoTracking.previousPosition,currentPosition)
}else{var difference=currentPosition-videoTracking.previousPosition;
if(difference>1){videoTracking.onSeek(videoTracking.previousPosition,currentPosition)
}}videoTracking.previousPosition=currentPosition
}})
}com.containerstore.video.VideoTracking=function(){var videoUrl;
var videoDuration;
var videoStartTime;
var totalSecondsWatched=0;
var positionInVideo=-1;
var currentSegment;
var segmentsViewed=new Array();
this.resetStatistics=function(){videoUrl=undefined;
videoDuration=undefined;
videoStartTime=undefined;
totalSecondsWatched=0;
positionInVideo=-1;
currentSegment=undefined;
segmentsViewed=new Array()
};
this.onPlay=function(player){videoStartTime=(new Date()).getTime();
videoUrl=player.getPlaylistItem()["file"];
videoDuration=player.getMeta()["duration"];
this.startView(player.getPosition());
trackVideoPlay(videoUrl)
};
this.onPause=function(player){this.endView(player.getPosition());
trackVideoSecondsWatched(videoUrl,this.calculatePercentageSecondsWatched());
trackVideoPercentageWatched(videoUrl,this.calculatePercentageVideoWatched())
};
this.onSeek=function(previousPosition,newPosition){this.endView(previousPosition);
this.startView(newPosition)
};
this.onComplete=function(player){this.endView(player.getPosition());
trackVideoSecondsWatched(videoUrl,this.calculatePercentageSecondsWatched());
trackVideoPercentageWatched(videoUrl,this.calculatePercentageVideoWatched());
trackVideoComplete(videoUrl);
this.resetStatistics()
};
this.onError=function(player,errorMessage){trackVideoError(player.getPlaylistItem()["file"],errorMessage)
};
this.addSegmentView=function(segment){if(segment.getDuration()==0){return
}for(idx=0;
idx<segmentsViewed.length;
idx++){if(segmentsViewed[idx].contains(segment)){return
}if(segmentsViewed[idx].containsPoint(segment.getStart())){segmentsViewed[idx].setEnd(segment.getStart())
}else{if(segmentsViewed[idx].containsPoint(segment.getEnd())){segmentsViewed[idx].setStart(segment.getEnd())
}}}segmentsViewed[segmentsViewed.length]=segment
};
this.startView=function(position){currentSegment=new com.containerstore.video.SegmentView(position)
};
this.endView=function(position){currentSegment.setEnd(position);
this.addSegmentView(currentSegment)
};
this.calculatePercentageSecondsWatched=function(){var currentTime=(new Date()).getTime();
totalSecondsWatched+=(currentTime-videoStartTime)/1000;
return Math.round((totalSecondsWatched/videoDuration)*100)
};
this.calculatePercentageVideoWatched=function(){var totalViewingTime=0;
for(idx=0;
idx<segmentsViewed.length;
idx++){totalViewingTime+=segmentsViewed[idx].getDuration()
}return Math.round((totalViewingTime/videoDuration)*100)
};
this.printRanges=function(){for(idx=0;
idx<segmentsViewed.length;
idx++){$("#debug").html($("#debug").html()+"<br>"+segmentsViewed[idx].toString())
}}
};
com.containerstore.video.SegmentView=function(startPosition){var start=startPosition;
var end;
this.setStart=function(startPosition){start=startPosition
};
this.getStart=function(){return start
};
this.setEnd=function(endPosition){end=endPosition
};
this.getEnd=function(){return end
};
this.getDuration=function(){return end-start
};
this.contains=function(that){return start<=that.start&&end>=that.end
};
this.containsPoint=function(position){return((start<=position)&&(position<=end))
};
this.toString=function(){return"SegmentView[start="+start+",end="+end+",duration="+this.getDuration()+"]"
}
};
function trackVideoPlay(videoUrl){trackEvent("Video Play",videoUrl,null)
}function trackVideoSecondsWatched(videoUrl,percentageSecondsWatched){trackEvent("Video Seconds Watched",videoUrl,percentageSecondsWatched)
}function trackVideoPercentageWatched(videoUrl,percentageWatched){trackEvent("Video Percentage Watched",videoUrl,percentageWatched)
}function trackVideoComplete(videoUrl){trackEvent("Video Complete",videoUrl,null)
}function trackVideoError(videoUrl,errorMessage){trackEvent("Video Error ["+errorMessage+"]",videoUrl,null)
}function trackEvent(action,label,value){_gaq.push(["_trackEvent",trackingCategory,action,label,value])
};
/*
 RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/

var requirejs,require,define;(function(ca){function G(e){return"[object Function]"===M.call(e)}function H(e){return"[object Array]"===M.call(e)}function v(e,t){if(e){var n;for(n=0;n<e.length&&(!e[n]||!t(e[n],n,e));n+=1);}}function U(e,t){if(e){var n;for(n=e.length-1;-1<n&&(!e[n]||!t(e[n],n,e));n-=1);}}function s(e,t){return ga.call(e,t)}function j(e,t){return s(e,t)&&e[t]}function B(e,t){for(var n in e)if(s(e,n)&&t(e[n],n))break}function V(e,t,n,r){return t&&B(t,function(t,i){if(n||!s(e,i))r&&"object"==typeof t&&t&&!H(t)&&!G(t)&&!(t instanceof RegExp)?(e[i]||(e[i]={}),V(e[i],t,n,r)):e[i]=t}),e}function t(e,t){return function(){return t.apply(e,arguments)}}function da(e){throw e}function ea(e){if(!e)return e;var t=ca;return v(e.split("."),function(e){t=t[e]}),t}function C(e,t,n,r){return t=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e),t.requireType=e,t.requireModules=r,n&&(t.originalError=n),t}function ha(e){function n(e,t,n){var r,i,s,o,u,a,f,l=t&&t.split("/");i=l;var c=k.map,h=c&&c["*"];if(e&&"."===e.charAt(0))if(t){i=l.slice(0,l.length-1),e=e.split("/"),t=e.length-1,k.nodeIdCompat&&R.test(e[t])&&(e[t]=e[t].replace(R,"")),i=e=i.concat(e),o=i.length;for(t=0;t<o;t++)if(s=i[t],"."===s)i.splice(t,1),t-=1;else if(".."===s){if(1===t&&(".."===i[2]||".."===i[0]))break;0<t&&(i.splice(t-1,2),t-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if(n&&c&&(l||h)){i=e.split("/"),t=i.length;e:for(;0<t;t-=1){o=i.slice(0,t).join("/");if(l)for(s=l.length;0<s;s-=1)if(n=j(c,l.slice(0,s).join("/")))if(n=j(n,o)){r=n,u=t;break e}!a&&h&&j(h,o)&&(a=j(h,o),f=t)}!r&&a&&(r=a,u=f),r&&(i.splice(0,u,r),e=i.join("/"))}return(r=j(k.pkgs,e))?r:e}function r(e){z&&v(document.getElementsByTagName("script"),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===x.contextName)return t.parentNode.removeChild(t),!0})}function i(e){var t=j(k.paths,e);if(t&&H(t)&&1<t.length)return t.shift(),x.require.undef(e),x.require([e]),!0}function o(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function u(e,t,r,i){var s,u,a=null,f=t?t.name:null,l=e,c=!0,h="";return e||(c=!1,e="_@r"+(q+=1)),e=o(e),a=e[0],e=e[1],a&&(a=n(a,f,i),u=j(D,a)),e&&(a?h=u&&u.normalize?u.normalize(e,function(e){return n(e,f,i)}):n(e,f,i):(h=n(e,f,i),e=o(h),a=e[0],h=e[1],r=!0,s=x.nameToUrl(h))),r=a&&!u&&!r?"_unnormalized"+(W+=1):"",{prefix:a,name:h,parentMap:t,unnormalized:!!r,url:s,originalName:l,isDefine:c,id:(a?a+"!"+h:h)+r}}function a(e){var t=e.id,n=j(L,t);return n||(n=L[t]=new x.Module(e)),n}function f(e,t,n){var r=e.id,i=j(L,r);s(D,r)&&(!i||i.defineEmitComplete)?"defined"===t&&n(D[r]):(i=a(e),i.error&&"error"===t)?n(i.error):i.on(t,n)}function l(e,t){var n=e.requireModules,r=!1;t?t(e):(v(n,function(t){if(t=j(L,t))t.error=e,t.events.error&&(r=!0,t.emit("error",e))}),!r)&&h.onError(e)}function c(){S.length&&(ia.apply(_,[_.length,0].concat(S)),S=[])}function p(e){delete L[e],delete A[e]}function d(e,t,n){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,v(e.depMaps,function(r,i){var s=r.id,o=j(L,s);o&&!e.depMatched[i]&&!n[s]&&(j(t,s)?(e.defineDep(i,D[s]),e.check()):d(o,t,n))}),n[r]=!0)}function m(){var e,t,n=(e=1e3*k.waitSeconds)&&x.startTime+e<(new Date).getTime(),s=[],o=[],u=!1,a=!0;if(!w){w=!0,B(A,function(e){var f=e.map,l=f.id;if(e.enabled&&(f.isDefine||o.push(e),!e.error))if(!e.inited&&n)i(l)?u=t=!0:(s.push(l),r(l));else if(!e.inited&&e.fetched&&f.isDefine&&(u=!0,!f.prefix))return a=!1});if(n&&s.length)return e=C("timeout","Load timeout for modules: "+s,null,s),e.contextName=x.contextName,l(e);a&&v(o,function(e){d(e,{},{})}),(!n||t)&&u&&(z||fa)&&!N&&(N=setTimeout(function(){N=0,m()},50)),w=!1}}function g(e){s(D,e[0])||a(u(e[0],null,!0)).init(e[1],e[2])}function y(e){var e=e.currentTarget||e.srcElement,t=x.onScriptLoad;return e.detachEvent&&!Z?e.detachEvent("onreadystatechange",t):e.removeEventListener("load",t,!1),t=x.onScriptError,(!e.detachEvent||Z)&&e.removeEventListener("error",t,!1),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function b(){var e;for(c();_.length;){e=_.shift();if(null===e[0])return l(C("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));g(e)}}var w,E,x,T,N,k={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},L={},A={},M={},_=[],D={},F={},I={},q=1,W=1;return T={require:function(e){return e.require?e.require:e.require=x.makeRequire(e.map)},exports:function(e){e.usingExports=!0;if(e.map.isDefine)return e.exports?D[e.map.id]=e.exports:e.exports=D[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return j(k.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},E=function(e){this.events=j(M,e.id)||{},this.map=e,this.shim=j(k.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},E.prototype={init:function(e,n,r,i){i=i||{},this.inited||(this.factory=n,r?this.on("error",r):this.events.error&&(r=t(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=r,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,x.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();x.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;F[e]||(F[e]=!0,x.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,n=this.map.id;t=this.depExports;var r=this.exports,i=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(i)){if(this.events.error&&this.map.isDefine||h.onError!==da)try{r=x.execCb(n,i,t,r)}catch(s){e=s}else r=x.execCb(n,i,t,r);this.map.isDefine&&void 0===r&&((t=this.module)?r=t.exports:this.usingExports&&(r=this.exports));if(e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",l(this.error=e)}else r=i;this.exports=r,this.map.isDefine&&!this.ignore&&(D[n]=r,h.onResourceLoad)&&h.onResourceLoad(x,this.map,this.depMaps),p(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,r=e.id,i=u(e.prefix);this.depMaps.push(i),f(i,"defined",t(this,function(i){var o,c;c=j(I,this.map.id);var d=this.map.name,v=this.map.parentMap?this.map.parentMap.name:null,m=x.makeRequire(e.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(i.normalize&&(d=i.normalize(d,function(e){return n(e,v,!0)})||""),i=u(e.prefix+"!"+d,this.map.parentMap),f(i,"defined",t(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),c=j(L,i.id))this.depMaps.push(i),this.events.error&&c.on("error",t(this,function(e){this.emit("error",e)})),c.enable()}else c?(this.map.url=x.nameToUrl(c),this.load()):(o=t(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),o.error=t(this,function(e){this.inited=!0,this.error=e,e.requireModules=[r],B(L,function(e){0===e.map.id.indexOf(r+"_unnormalized")&&p(e.map.id)}),l(e)}),o.fromText=t(this,function(t,n){var i=e.name,f=u(i),c=O;n&&(t=n),c&&(O=!1),a(f),s(k.config,r)&&(k.config[i]=k.config[r]);try{h.exec(t)}catch(p){return l(C("fromtexteval","fromText eval for "+r+" failed: "+p,p,[r]))}c&&(O=!0),this.depMaps.push(f),x.completeLoad(i),m([i],o)}),i.load(e.name,m,o,k))})),x.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){A[this.map.id]=this,this.enabling=this.enabled=!0,v(this.depMaps,t(this,function(e,n){var r,i;if("string"==typeof e){e=u(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[n]=e;if(r=j(T,e.id)){this.depExports[n]=r(this);return}this.depCount+=1,f(e,"defined",t(this,function(e){this.defineDep(n,e),this.check()})),this.errback&&f(e,"error",t(this,this.errback))}r=e.id,i=L[r],!s(T,r)&&i&&!i.enabled&&x.enable(e,this)})),B(this.pluginMaps,t(this,function(e){var t=j(L,e.id);t&&!t.enabled&&x.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){v(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},x={config:k,contextName:e,registry:L,defined:D,urlFetched:F,defQueue:_,Module:E,makeModuleMap:u,nextTick:h.nextTick,onError:l,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=k.shim,n={paths:!0,bundles:!0,config:!0,map:!0};B(e,function(e,t){n[t]?(k[t]||(k[t]={}),V(k[t],e,!0,!0)):k[t]=e}),e.bundles&&B(e.bundles,function(e,t){v(e,function(e){e!==t&&(I[e]=t)})}),e.shim&&(B(e.shim,function(e,n){H(e)&&(e={deps:e}),(e.exports||e.init)&&!e.exportsFn&&(e.exportsFn=x.makeShimExports(e)),t[n]=e}),k.shim=t),e.packages&&v(e.packages,function(e){var t,e="string"==typeof e?{name:e}:e;t=e.name,e.location&&(k.paths[t]=e.location),k.pkgs[t]=e.name+"/"+(e.main||"main").replace(ja,"").replace(R,"")}),B(L,function(e,t){!e.inited&&!e.map.unnormalized&&(e.map=u(t))}),(e.deps||e.callback)&&x.require(e.deps||[],e.callback)},makeShimExports:function(e){return function(){var t;return e.init&&(t=e.init.apply(ca,arguments)),t||e.exports&&ea(e.exports)}},makeRequire:function(t,i){function o(n,r,f){var c,p;return i.enableBuildCallback&&r&&G(r)&&(r.__requireJsBuild=!0),"string"==typeof n?G(r)?l(C("requireargs","Invalid require call"),f):t&&s(T,n)?T[n](L[t.id]):h.get?h.get(x,n,t,o):(c=u(n,t,!1,!0),c=c.id,s(D,c)?D[c]:l(C("notloaded",'Module name "'+c+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(b(),x.nextTick(function(){b(),p=a(u(null,t)),p.skipMap=i.skipMap,p.init(n,r,f,{enabled:!0}),m()}),o)}return i=i||{},V(o,{isBrowser:z,toUrl:function(e){var r,i=e.lastIndexOf("."),s=e.split("/")[0];return-1!==i&&("."!==s&&".."!==s||1<i)&&(r=e.substring(i,e.length),e=e.substring(0,i)),x.nameToUrl(n(e,t&&t.id,!0),r,!0)},defined:function(e){return s(D,u(e,t,!1,!0).id)},specified:function(e){return e=u(e,t,!1,!0).id,s(D,e)||s(L,e)}}),t||(o.undef=function(e){c();var n=u(e,t,!0),i=j(L,e);r(e),delete D[e],delete F[n.url],delete M[e],U(_,function(t,n){t[0]===e&&_.splice(n,1)}),i&&(i.events.defined&&(M[e]=i.events),p(e))}),o},enable:function(e){j(L,e.id)&&a(e).enable()},completeLoad:function(e){var t,n,r=j(k.shim,e)||{},o=r.exports;for(c();_.length;){n=_.shift();if(null===n[0]){n[0]=e;if(t)break;t=!0}else n[0]===e&&(t=!0);g(n)}n=j(L,e);if(!t&&!s(D,e)&&n&&!n.inited){if(k.enforceDefine&&(!o||!ea(o)))return i(e)?void 0:l(C("nodefine","No define call for "+e,null,[e]));g([e,r.deps||[],r.exportsFn])}m()},nameToUrl:function(e,t,n){var r,i,s;(r=j(k.pkgs,e))&&(e=r);if(r=j(I,e))return x.nameToUrl(r,t,n);if(h.jsExtRegExp.test(e))r=e+(t||"");else{r=k.paths,e=e.split("/");for(i=e.length;0<i;i-=1)if(s=e.slice(0,i).join("/"),s=j(r,s)){H(s)&&(s=s[0]),e.splice(0,i,s);break}r=e.join("/"),r+=t||(/^data\:|\?/.test(r)||n?"":".js"),r=("/"===r.charAt(0)||r.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+r}return k.urlArgs?r+((-1===r.indexOf("?")?"?":"&")+k.urlArgs):r},load:function(e,t){h.load(x,e,t)},execCb:function(e,t,n,r){return t.apply(r,n)},onScriptLoad:function(e){if("load"===e.type||ka.test((e.currentTarget||e.srcElement).readyState))P=null,e=y(e),x.completeLoad(e.id)},onScriptError:function(e){var t=y(e);if(!i(t.id))return l(C("scripterror","Script error for: "+t.id,e,[t.id]))}},x.require=x.makeRequire(),x}var h,x,y,D,K,E,P,L,q,Q,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,R=/\.js$/,ja=/^\.\//;x=Object.prototype;var M=x.toString,ga=x.hasOwnProperty,ia=Array.prototype.splice,z="undefined"!=typeof window&&"undefined"!=typeof navigator&&!!window.document,fa=!z&&"undefined"!=typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Z="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),F={},r={},S=[],O=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(G(requirejs))return;r=requirejs,requirejs=void 0}"undefined"!=typeof require&&!G(require)&&(r=require,require=void 0),h=requirejs=function(e,t,n,r){var i,s="_";return!H(e)&&"string"!=typeof e&&(i=e,H(t)?(e=t,t=n,n=r):e=[]),i&&i.context&&(s=i.context),(r=j(F,s))||(r=F[s]=h.s.newContext(s)),i&&r.configure(i),r.require(e,t,n)},h.config=function(e){return h(e)},h.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=h),h.version="2.1.11",h.jsExtRegExp=/^\/|:|\?|\.js$/,h.isBrowser=z,x=h.s={contexts:F,newContext:ha},h({}),v(["toUrl","undef","defined","specified"],function(e){h[e]=function(){var t=F._;return t.require[e].apply(t,arguments)}}),z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])&&(y=x.head=D.parentNode),h.onError=da,h.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},h.load=function(e,t,n){var r=e&&e.config||{};if(z)return r=h.createNode(r,t,n),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),r.attachEvent&&!(r.attachEvent.toString&&0>r.attachEvent.toString().indexOf("[native code"))&&!Z?(O=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)):(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)),r.src=n,L=r,D?y.insertBefore(r,D):y.appendChild(r),L=null,r;if(fa)try{importScripts(n),e.completeLoad(t)}catch(i){e.onError(C("importscripts","importScripts failed for "+t+" at "+n,i,[t]))}},z&&!r.skipDataMain&&U(document.getElementsByTagName("script"),function(e){y||(y=e.parentNode);if(K=e.getAttribute("data-main"))return q=K,r.baseUrl||(E=q.split("/"),q=E.pop(),Q=E.length?E.join("/")+"/":"./",r.baseUrl=Q),q=q.replace(R,""),h.jsExtRegExp.test(q)&&(q=K),r.deps=r.deps?r.deps.concat(q):[q],!0}),define=function(e,t,n){var r,i;"string"!=typeof e&&(n=t,t=e,e=null),H(t)||(n=t,t=null),!t&&G(n)&&(t=[],n.length&&(n.toString().replace(la,"").replace(ma,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t))),O&&((r=L)||(P&&"interactive"===P.readyState||U(document.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return P=e}),r=P),r&&(e||(e=r.getAttribute("data-requiremodule")),i=F[r.getAttribute("data-requirecontext")])),(i?i.defQueue:S).push([e,t,n])},define.amd={jQuery:!0},h.exec=function(b){return eval(b)},h(r)}})(this),define("lib/require",function(){});var requireProjectVersion="PROJECT_VERSION",requireExtraBaseUrl="";requireProjectVersion.indexOf("PROJECT")==0&&(requireProjectVersion=(new Date).getTime(),requireExtraBaseUrl="/source");var tcsRequire=require.config({baseUrl:"/scripts/"+requireProjectVersion+"/core"+requireExtraBaseUrl,paths:{"jquery.hoverIntent":"/scripts/plugins/jquery.hoverIntent","jquery.transit":"/scripts/plugins/jquery.transit.min","jquery.validate":"/scripts/plugins/jquery.validate.min",spin:"lib/spin"}});define("jquery",[],function(){return jQuery}),define("lib/config",function(){});
