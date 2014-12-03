/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();
/*

GLOBAL JQUERY PLUGIN INCLUDES


*/


/**
 * jCache - A client cache plugin for jQuery
 * Should come in handy when data needs to be cached in client to improve performance.
 * Author:  Phan Van An
 *          phoenixheart@gmail.com
 *          http://www.skidvn.com
 * License : Read jQuery's license

Usage:
    1.  Include this plugin into your web document after jQuery:
        <script type="text/javascript" src="js/jquery.jcache.js"></script>
    2.  [OPTIONAL] Set the max cached item number, for example 20
        $.jCache.maxSize = 20;
    3.  Start playing around with it:
        - Put an item into cache: $.jCache.setItem(theKey, the Value);
        - Retrieve an item from cache: var theValue = $.jCache.getItem(theKey);
        - ...
 */
(function (jQuery){
    this.version = '(beta)(0.0.1)';

    /**
     * The maximum items this cache should hold.
     * If the cache is going to be overload, oldest item will be deleted (FIFO).
     * Since the cached object is retained inside browser's state,
     * a too big value on a too big web apps may affect system memory.
     * Default is 10.
     */
    this.maxSize = 10;

    /**
     * An array to keep track of the cache keys
     */
    this.keys = new Array();

    /**
     * Number of currently cached items
     */
    this.cache_length = 0;

    /**
     * An associated array to contain the cached items
     */
    this.items = new Array();

    /*
     * @desc    Puts an item into the cache
     *
     * @param   string Key of the item
     * @param   string Value of the item
     * @return  string Value of the item
     */
    this.setItem = function(pKey, pValue)
    {
        if (typeof(pValue) != 'undefined')
        {
            if (typeof(this.items[pKey]) == 'undefined')
            {
                this.cache_length++;
            }

            this.keys.push(pKey);
            this.items[pKey] = pValue;

            if (this.cache_length > this.maxSize)
            {
                this.removeOldestItem();
            }
        }

        return pValue;
    }

    /*
     * @desc    Removes an item from the cache using its key
     * @param   string Key of the item
     */
    this.removeItem = function(pKey)
    {
        var tmp;
        if (typeof(this.items[pKey]) != 'undefined')
        {
            this.cache_length--;
            var tmp = this.items[pKey];
            delete this.items[pKey];
        }

        return tmp;
    }

    /*
     * @desc    Retrieves an item from the cache by its key
     *
     * @param   string Key of the item
     * @return  string Value of the item
     */
    this.getItem = function(pKey)
    {
        return this.items[pKey];
    }

    /*
     * @desc    Indicates if the cache has an item specified by its key
     * @param   string Key of the item
     * @return  boolean TRUE or FALSE
     */
    this.hasItem = function(pKey)
    {
        return typeof(this.items[pKey]) != 'undefined';
    }

    /**
     * @desc    Removes the oldest cached item from the cache
     */
    this.removeOldestItem = function()
    {
        this.removeItem(this.keys.shift());
    }

    /**
     * @desc    Clears the cache
     * @return  Number of items cleared
     */
    this.clear = function()
    {
        var tmp = this.cache_length;
        this.keys = new Array();
        this.cache_length = 0;
        this.items = new Array();
        return tmp;
    }

    jQuery.jCache = this;
    return jQuery;
})(jQuery);


/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Version: 07/06/2008 +r13
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);
/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $Version: 2007.08.19 +r2
 */

(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.fn.jqResize=function(h){return i(this,h,'r');};
$.jqDnR={dnr:{},e:0,
drag:function(v){
 if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
 else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
  return false;},
stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
};
var J=$.jqDnR,M=J.dnr,E=J.e,
i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
 // attempt utilization of dimensions plugin to fix IE issues
 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};
 E.css({opacity:1});$().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
 return false;
 });
});},
f=function(k){return parseInt(E.css(k))||false;};
})(jQuery);




/*
Clear Text Plugin.  Removes value from text input boxes onFocus, replaces value onBlur.
*/

$.fn.search = function() {
    return this.focus(function() {
        if( this.value == this.defaultValue ) {
            this.value = "";
        }
    }).blur(function() {
        if( !this.value.length ) {
            this.value = this.defaultValue;
        }
    });
};



/*
 * jQuery UI @VERSION
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;(function($) {

$.ui = {
    plugin: {
        add: function(module, option, set) {
            var proto = $.ui[module].prototype;
            for(var i in set) {
                proto.plugins[i] = proto.plugins[i] || [];
                proto.plugins[i].push([option, set[i]]);
            }
        },
        call: function(instance, name, args) {
            var set = instance.plugins[name];
            if(!set) { return; }

            for (var i = 0; i < set.length; i++) {
                if (instance.options[set[i][0]]) {
                    set[i][1].apply(instance.element, args);
                }
            }
        }
    },
    cssCache: {},
    css: function(name) {
        if ($.ui.cssCache[name]) { return $.ui.cssCache[name]; }
        var tmp = $('<div class="ui-gen">').addClass(name).css({position:'absolute', top:'-5000px', left:'-5000px', display:'block'}).appendTo('body');

        //if (!$.browser.safari)
            //tmp.appendTo('body');

        //Opera and Safari set width and height to 0px instead of auto
        //Safari returns rgba(0,0,0,0) when bgcolor is not set
        $.ui.cssCache[name] = !!(
            (!(/auto|default/).test(tmp.css('cursor')) || (/^[1-9]/).test(tmp.css('height')) || (/^[1-9]/).test(tmp.css('width')) ||
            !(/none/).test(tmp.css('backgroundImage')) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor')))
        );
        try { $('body').get(0).removeChild(tmp.get(0)); } catch(e){}
        return $.ui.cssCache[name];
    },
    disableSelection: function(el) {
        $(el).attr('unselectable', 'on').css('MozUserSelect', 'none');
    },
    enableSelection: function(el) {
        $(el).attr('unselectable', 'off').css('MozUserSelect', '');
    },
    hasScroll: function(e, a) {
        var scroll = /top/.test(a||"top") ? 'scrollTop' : 'scrollLeft', has = false;
        if (e[scroll] > 0) return true; e[scroll] = 1;
        has = e[scroll] > 0 ? true : false; e[scroll] = 0;
        return has;
    }
};


/** jQuery core modifications and additions **/

var _remove = $.fn.remove;
$.fn.remove = function() {
    $("*", this).add(this).triggerHandler("remove");
    return _remove.apply(this, arguments );
};

// $.widget is a factory to create jQuery plugins
// taking some boilerplate code out of the plugin code
// created by Scott Gonz�lez and J�rn Zaefferer
function getter(namespace, plugin, method) {
    var methods = $[namespace][plugin].getter || [];
    methods = (typeof methods == "string" ? methods.split(/,?\s+/) : methods);
    return ($.inArray(method, methods) != -1);
}

$.widget = function(name, prototype) {
    var namespace = name.split(".")[0];
    name = name.split(".")[1];

    // create plugin method
    $.fn[name] = function(options) {
        var isMethodCall = (typeof options == 'string'),
            args = Array.prototype.slice.call(arguments, 1);

        if (isMethodCall && getter(namespace, name, options)) {
            var instance = $.data(this[0], name);
            return (instance ? instance[options].apply(instance, args)
                : undefined);
        }

        return this.each(function() {
            var instance = $.data(this, name);
            if (isMethodCall && instance && $.isFunction(instance[options])) {
                instance[options].apply(instance, args);
            } else if (!isMethodCall) {
                $.data(this, name, new $[namespace][name](this, options));
            }
        });
    };

    // create widget constructor
    $[namespace][name] = function(element, options) {
        var self = this;

        this.widgetName = name;
        this.widgetBaseClass = namespace + '-' + name;

        this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, options);
        this.element = $(element)
            .bind('setData.' + name, function(e, key, value) {
                return self.setData(key, value);
            })
            .bind('getData.' + name, function(e, key) {
                return self.getData(key);
            })
            .bind('remove', function() {
                return self.destroy();
            });
        this.init();
    };

    // add widget prototype
    $[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
};

$.widget.prototype = {
    init: function() {},
    destroy: function() {
        this.element.removeData(this.widgetName);
    },

    getData: function(key) {
        return this.options[key];
    },
    setData: function(key, value) {
        this.options[key] = value;

        if (key == 'disabled') {
            this.element[value ? 'addClass' : 'removeClass'](
                this.widgetBaseClass + '-disabled');
        }
    },

    enable: function() {
        this.setData('disabled', false);
    },
    disable: function() {
        this.setData('disabled', true);
    }
};

$.widget.defaults = {
    disabled: false
};


/** Mouse Interaction Plugin **/

$.ui.mouse = {
    mouseInit: function() {
        var self = this;

        this.element.bind('mousedown.'+this.widgetName, function(e) {
            return self.mouseDown(e);
        });

        // Prevent text selection in IE
        if ($.browser.msie) {
            this._mouseUnselectable = this.element.attr('unselectable');
            this.element.attr('unselectable', 'on');
        }

        this.started = false;
    },

    // TODO: make sure destroying one instance of mouse doesn't mess with
    // other instances of mouse
    mouseDestroy: function() {
        this.element.unbind('.'+this.widgetName);

        // Restore text selection in IE
        ($.browser.msie
            && this.element.attr('unselectable', this._mouseUnselectable));
    },

    mouseDown: function(e) {
        // we may have missed mouseup (out of window)
        (this._mouseStarted && this.mouseUp(e));

        this._mouseDownEvent = e;

        var self = this,
            btnIsLeft = (e.which == 1),
            elIsCancel = (typeof this.options.cancel == "string" ? $(e.target).parents().add(e.target).filter(this.options.cancel).length : false);
        if (!btnIsLeft || elIsCancel || !this.mouseCapture(e)) {
            return true;
        }

        this._mouseDelayMet = !this.options.delay;
        if (!this._mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(function() {
                self._mouseDelayMet = true;
            }, this.options.delay);
        }

        if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
            this._mouseStarted = (this.mouseStart(e) !== false);
            if (!this._mouseStarted) {
                e.preventDefault();
                return true;
            }
        }

        // these delegates are required to keep context
        this._mouseMoveDelegate = function(e) {
            return self.mouseMove(e);
        };
        this._mouseUpDelegate = function(e) {
            return self.mouseUp(e);
        };
        $(document)
            .bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
            .bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

        return false;
    },

    mouseMove: function(e) {
        // IE mouseup check - mouseup happened when mouse was out of window
        if ($.browser.msie && !e.button) {
            return this.mouseUp(e);
        }

        if (this._mouseStarted) {
            this.mouseDrag(e);
            return false;
        }

        if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
            this._mouseStarted =
                (this.mouseStart(this._mouseDownEvent, e) !== false);
            (this._mouseStarted ? this.mouseDrag(e) : this.mouseUp(e));
        }

        return !this._mouseStarted;
    },

    mouseUp: function(e) {
        $(document)
            .unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
            .unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

        if (this._mouseStarted) {
            this._mouseStarted = false;
            this.mouseStop(e);
        }

        return false;
    },

    mouseDistanceMet: function(e) {
        return (Math.max(
                Math.abs(this._mouseDownEvent.pageX - e.pageX),
                Math.abs(this._mouseDownEvent.pageY - e.pageY)
            ) >= this.options.distance
        );
    },

    mouseDelayMet: function(e) {
        return this._mouseDelayMet;
    },

    // These are placeholder methods, to be overriden by extending plugin
    mouseStart: function(e) {},
    mouseDrag: function(e) {},
    mouseStop: function(e) {},
    mouseCapture: function(e) { return true; }
};

$.ui.mouse.defaults = {
    cancel: null,
    distance: 1,
    delay: 0
};

})(jQuery);
/*
 * jQuery UI Tabs
 *
 * Copyright (c) 2007, 2008 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *  ui.core.js
 */
(function($) {

$.widget("ui.tabs", {
    init: function() {
        this.options.event += '.tabs'; // namespace event

        // create tabs
        this.tabify(true);
    },
    setData: function(key, value) {
        if ((/^selected/).test(key))
            this.select(value);
        else {
            this.options[key] = value;
            this.tabify();
        }
    },
    length: function() {
        return this.$tabs.length;
    },
    tabId: function(a) {
        return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')
            || this.options.idPrefix + $.data(a);
    },
    ui: function(tab, panel) {
        return {
            options: this.options,
            tab: tab,
            panel: panel,
            index: this.$tabs.index(tab)
        };
    },
    tabify: function(init) {

        this.$lis = $('li:has(a[href])', this.element);
        this.$tabs = this.$lis.map(function() { return $('a', this)[0]; });
        this.$panels = $([]);

        var self = this, o = this.options;

        this.$tabs.each(function(i, a) {
            // inline tab
            if (a.hash && a.hash.replace('#', '')) // Safari 2 reports '#' for an empty hash
                self.$panels = self.$panels.add(a.hash);
            // remote tab
            else if ($(a).attr('href') != '#') { // prevent loading the page itself if href is just "#"
                $.data(a, 'href.tabs', a.href); // required for restore on destroy
                $.data(a, 'load.tabs', a.href); // mutable
                var id = self.tabId(a);
                a.href = '#' + id;
                var $panel = $('#' + id);
                if (!$panel.length) {
                    $panel = $(o.panelTemplate).attr('id', id).addClass(o.panelClass)
                        .insertAfter( self.$panels[i - 1] || self.element );
                    $panel.data('destroy.tabs', true);
                }
                self.$panels = self.$panels.add( $panel );
            }
            // invalid tab href
            else
                o.disabled.push(i + 1);
        });

        if (init) {

            // attach necessary classes for styling if not present
            this.element.addClass(o.navClass);
            this.$panels.each(function() {
                var $this = $(this);
                $this.addClass(o.panelClass);
            });

            // Selected tab
            // use "selected" option or try to retrieve:
            // 1. from fragment identifier in url
            // 2. from cookie
            // 3. from selected class attribute on <li>
            if (o.selected === undefined) {
                if (location.hash) {
                    this.$tabs.each(function(i, a) {
                        if (a.hash == location.hash) {
                            o.selected = i;
                            // prevent page scroll to fragment
                            if ($.browser.msie || $.browser.opera) { // && !o.remote
                                var $toShow = $(location.hash), toShowId = $toShow.attr('id');
                                $toShow.attr('id', '');
                                setTimeout(function() {
                                    $toShow.attr('id', toShowId); // restore id
                                }, 500);
                            }
                            scrollTo(0, 0);
                            return false; // break
                        }
                    });
                }
                else if (o.cookie) {
                    var index = parseInt($.cookie('ui-tabs' + $.data(self.element)),10);
                    if (index && self.$tabs[index])
                        o.selected = index;
                }
                else if (self.$lis.filter('.' + o.selectedClass).length)
                    o.selected = self.$lis.index( self.$lis.filter('.' + o.selectedClass)[0] );
            }
            o.selected = o.selected === null || o.selected !== undefined ? o.selected : 0; // first tab selected by default

            // Take disabling tabs via class attribute from HTML
            // into account and update option properly.
            // A selected tab cannot become disabled.
            o.disabled = $.unique(o.disabled.concat(
                $.map(this.$lis.filter('.' + o.disabledClass),
                    function(n, i) { return self.$lis.index(n); } )
            )).sort();
            if ($.inArray(o.selected, o.disabled) != -1)
                o.disabled.splice($.inArray(o.selected, o.disabled), 1);

            // highlight selected tab
            this.$panels.addClass(o.hideClass);
            this.$lis.removeClass(o.selectedClass);
            if (o.selected !== null) {
                this.$panels.eq(o.selected).show().removeClass(o.hideClass); // use show and remove class to show in any case no matter how it has been hidden before
                this.$lis.eq(o.selected).addClass(o.selectedClass);

                // seems to be expected behavior that the show callback is fired
                var onShow = function() {
                    $(self.element).triggerHandler('tabsshow',
                        [self.fakeEvent('tabsshow'), self.ui(self.$tabs[o.selected], self.$panels[o.selected])], o.show);
                };

                // load if remote tab
                if ($.data(this.$tabs[o.selected], 'load.tabs'))
                    this.load(o.selected, onShow);
                // just trigger show event
                else
                    onShow();

            }

            // clean up to avoid memory leaks in certain versions of IE 6
            $(window).bind('unload', function() {
                self.$tabs.unbind('.tabs');
                self.$lis = self.$tabs = self.$panels = null;
            });

        }

        // disable tabs
        for (var i = 0, li; li = this.$lis[i]; i++)
            $(li)[$.inArray(i, o.disabled) != -1 && !$(li).hasClass(o.selectedClass) ? 'addClass' : 'removeClass'](o.disabledClass);

        // reset cache if switching from cached to not cached
        if (o.cache === false)
            this.$tabs.removeData('cache.tabs');

        // set up animations
        var hideFx, showFx, baseFx = { 'min-width': 0, duration: 1 }, baseDuration = 'normal';
        if (o.fx && o.fx.constructor == Array)
            hideFx = o.fx[0] || baseFx, showFx = o.fx[1] || baseFx;
        else
            hideFx = showFx = o.fx || baseFx;

        // reset some styles to maintain print style sheets etc.
        var resetCSS = { display: '', overflow: '', height: '' };
        if (!$.browser.msie) // not in IE to prevent ClearType font issue
            resetCSS.opacity = '';

        // Hide a tab, animation prevents browser scrolling to fragment,
        // $show is optional.
        function hideTab(clicked, $hide, $show) {
            $hide.animate(hideFx, hideFx.duration || baseDuration, function() { //
                $hide.addClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
                if ($.browser.msie && hideFx.opacity)
                    $hide[0].style.filter = '';
                if ($show)
                    showTab(clicked, $show, $hide);
            });
        }

        // Show a tab, animation prevents browser scrolling to fragment,
        // $hide is optional.
        function showTab(clicked, $show, $hide) {
            if (showFx === baseFx)
                $show.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab panels
            $show.animate(showFx, showFx.duration || baseDuration, function() {
                $show.removeClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
                if ($.browser.msie && showFx.opacity)
                    $show[0].style.filter = '';

                // callback
                $(self.element).triggerHandler('tabsshow',
                    [self.fakeEvent('tabsshow'), self.ui(clicked, $show[0])], o.show);

            });
        }

        // switch a tab
        function switchTab(clicked, $li, $hide, $show) {
            /*if (o.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
                $.ajaxHistory.update(clicked.hash);
            }*/
            $li.addClass(o.selectedClass)
                .siblings().removeClass(o.selectedClass);
            hideTab(clicked, $hide, $show);
        }

        // attach tab event handler, unbind to avoid duplicates from former tabifying...
        this.$tabs.unbind('.tabs').bind(o.event, function() {

            //var trueClick = e.clientX; // add to history only if true click occured, not a triggered click
            var $li = $(this).parents('li:eq(0)'),
                $hide = self.$panels.filter(':visible'),
                $show = $(this.hash);

            // If tab is already selected and not unselectable or tab disabled or
            // or is already loading or click callback returns false stop here.
            // Check if click handler returns false last so that it is not executed
            // for a disabled or loading tab!
            if (($li.hasClass(o.selectedClass) && !o.unselect)
                || $li.hasClass(o.disabledClass)
                || $(this).hasClass(o.loadingClass)
                || $(self.element).triggerHandler('tabsselect', [self.fakeEvent('tabsselect'), self.ui(this, $show[0])], o.select) === false
                ) {
                this.blur();
                return false;
            }

            self.options.selected = self.$tabs.index(this);

            // if tab may be closed
            if (o.unselect) {
                if ($li.hasClass(o.selectedClass)) {
                    self.options.selected = null;
                    $li.removeClass(o.selectedClass);
                    self.$panels.stop();
                    hideTab(this, $hide);
                    this.blur();
                    return false;
                } else if (!$hide.length) {
                    self.$panels.stop();
                    var a = this;
                    self.load(self.$tabs.index(this), function() {
                        $li.addClass(o.selectedClass).addClass(o.unselectClass);
                        showTab(a, $show);
                    });
                    this.blur();
                    return false;
                }
            }

            if (o.cookie)
                $.cookie('ui-tabs' + $.data(self.element), self.options.selected, o.cookie);

            // stop possibly running animations
            self.$panels.stop();

            // show new tab
            if ($show.length) {

                // prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
                /*if ($.browser.msie && o.bookmarkable) {
                    var showId = this.hash.replace('#', '');
                    $show.attr('id', '');
                    setTimeout(function() {
                        $show.attr('id', showId); // restore id
                    }, 0);
                }*/

                var a = this;
                self.load(self.$tabs.index(this), $hide.length ?
                    function() {
                        switchTab(a, $li, $hide, $show);
                    } :
                    function() {
                        $li.addClass(o.selectedClass);
                        showTab(a, $show);
                    }
                );

                // Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
                /*var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
                var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
                setTimeout(function() {
                    scrollTo(scrollX, scrollY);
                }, 0);*/

            } else
                throw 'jQuery UI Tabs: Mismatching fragment identifier.';

            // Prevent IE from keeping other link focussed when using the back button
            // and remove dotted border from clicked link. This is controlled in modern
            // browsers via CSS, also blur removes focus from address bar in Firefox
            // which can become a usability and annoying problem with tabsRotate.
            if ($.browser.msie)
                this.blur();

            //return o.bookmarkable && !!trueClick; // convert trueClick == undefined to Boolean required in IE
            return false;

        });

        // disable click if event is configured to something else
        if (!(/^click/).test(o.event))
            this.$tabs.bind('click.tabs', function() { return false; });

    },
    add: function(url, label, index) {
        if (index == undefined)
            index = this.$tabs.length; // append by default

        var o = this.options;
        var $li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label));
        $li.data('destroy.tabs', true);

        var id = url.indexOf('#') == 0 ? url.replace('#', '') : this.tabId( $('a:first-child', $li)[0] );

        // try to find an existing element before creating a new one
        var $panel = $('#' + id);
        if (!$panel.length) {
            $panel = $(o.panelTemplate).attr('id', id)
                .addClass(o.hideClass)
                .data('destroy.tabs', true);
        }
        $panel.addClass(o.panelClass);
        if (index >= this.$lis.length) {
            $li.appendTo(this.element);
            $panel.appendTo(this.element[0].parentNode);
        } else {
            $li.insertBefore(this.$lis[index]);
            $panel.insertBefore(this.$panels[index]);
        }

        o.disabled = $.map(o.disabled,
            function(n, i) { return n >= index ? ++n : n });

        this.tabify();

        if (this.$tabs.length == 1) {
            $li.addClass(o.selectedClass);
            $panel.removeClass(o.hideClass);
            var href = $.data(this.$tabs[0], 'load.tabs');
            if (href)
                this.load(index, href);
        }

        // callback
        this.element.triggerHandler('tabsadd',
            [this.fakeEvent('tabsadd'), this.ui(this.$tabs[index], this.$panels[index])], o.add
        );
    },
    remove: function(index) {
        var o = this.options, $li = this.$lis.eq(index).remove(),
            $panel = this.$panels.eq(index).remove();

        // If selected tab was removed focus tab to the right or
        // in case the last tab was removed the tab to the left.
        if ($li.hasClass(o.selectedClass) && this.$tabs.length > 1)
            this.select(index + (index + 1 < this.$tabs.length ? 1 : -1));

        o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
            function(n, i) { return n >= index ? --n : n });

        this.tabify();

        // callback
        this.element.triggerHandler('tabsremove',
            [this.fakeEvent('tabsremove'), this.ui($li.find('a')[0], $panel[0])], o.remove
        );
    },
    enable: function(index) {
        var o = this.options;
        if ($.inArray(index, o.disabled) == -1)
            return;

        var $li = this.$lis.eq(index).removeClass(o.disabledClass);
        if ($.browser.safari) { // fix disappearing tab (that used opacity indicating disabling) after enabling in Safari 2...
            $li.css('display', 'inline-block');
            setTimeout(function() {
                $li.css('display', 'block');
            }, 0);
        }

        o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

        // callback
        this.element.triggerHandler('tabsenable',
            [this.fakeEvent('tabsenable'), this.ui(this.$tabs[index], this.$panels[index])], o.enable
        );

    },
    disable: function(index) {
        var self = this, o = this.options;
        if (index != o.selected) { // cannot disable already selected tab
            this.$lis.eq(index).addClass(o.disabledClass);

            o.disabled.push(index);
            o.disabled.sort();

            // callback
            this.element.triggerHandler('tabsdisable',
                [this.fakeEvent('tabsdisable'), this.ui(this.$tabs[index], this.$panels[index])], o.disable
            );
        }
    },
    select: function(index) {
        if (typeof index == 'string')
            index = this.$tabs.index( this.$tabs.filter('[href$=' + index + ']')[0] );
        this.$tabs.eq(index).trigger(this.options.event);
    },
    load: function(index, callback) { // callback is for internal usage only

        var self = this, o = this.options, $a = this.$tabs.eq(index), a = $a[0],
                bypassCache = callback == undefined || callback === false, url = $a.data('load.tabs');

        callback = callback || function() {};

        // no remote or from cache - just finish with callback
        if (!url || !bypassCache && $.data(a, 'cache.tabs')) {
            callback();
            return;
        }

        // load remote from here on

        var inner = function(parent) {
            var $parent = $(parent), $inner = $parent.find('*:last');
            return $inner.length && $inner.is(':not(img)') && $inner || $parent;
        };
        var cleanup = function() {
            self.$tabs.filter('.' + o.loadingClass).removeClass(o.loadingClass)
                        .each(function() {
                            if (o.spinner)
                                inner(this).parent().html(inner(this).data('label.tabs'));
                        });
            self.xhr = null;
        };

        if (o.spinner) {
            var label = inner(a).html();
            inner(a).wrapInner('<em></em>')
                .find('em').data('label.tabs', label).html(o.spinner);
        }

        var ajaxOptions = $.extend({}, o.ajaxOptions, {
            url: url,
            success: function(r, s) {
                $(a.hash).html(r);
                cleanup();

                if (o.cache)
                    $.data(a, 'cache.tabs', true); // if loaded once do not load them again

                // callbacks
                $(self.element).triggerHandler('tabsload',
                    [self.fakeEvent('tabsload'), self.ui(self.$tabs[index], self.$panels[index])], o.load
                );
                o.ajaxOptions.success && o.ajaxOptions.success(r, s);

                // This callback is required because the switch has to take
                // place after loading has completed. Call last in order to
                // fire load before show callback...
                callback();
            }
        });
        if (this.xhr) {
            // terminate pending requests from other tabs and restore tab label
            this.xhr.abort();
            cleanup();
        }
        $a.addClass(o.loadingClass);
        setTimeout(function() { // timeout is again required in IE, "wait" for id being restored
            self.xhr = $.ajax(ajaxOptions);
        }, 0);

    },
    url: function(index, url) {
        this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs', url);
    },
    destroy: function() {
        var o = this.options;
        this.element.unbind('.tabs')
            .removeClass(o.navClass).removeData('tabs');
        this.$tabs.each(function() {
            var href = $.data(this, 'href.tabs');
            if (href)
                this.href = href;
            var $this = $(this).unbind('.tabs');
            $.each(['href', 'load', 'cache'], function(i, prefix) {
                $this.removeData(prefix + '.tabs');
            });
        });
        this.$lis.add(this.$panels).each(function() {
            if ($.data(this, 'destroy.tabs'))
                $(this).remove();
            else
                $(this).removeClass([o.selectedClass, o.unselectClass,
                    o.disabledClass, o.panelClass, o.hideClass].join(' '));
        });
    },
    fakeEvent: function(type) {
        return $.event.fix({
            type: type,
            target: this.element[0]
        });
    }
});

$.ui.tabs.defaults = {
    // basic setup
    unselect: false,
    event: 'click',
    disabled: [],
    cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
    // TODO history: false,

    // Ajax
    spinner: 'Loading&#8230;',
    cache: false,
    idPrefix: 'ui-tabs-',
    ajaxOptions: {},

    // animations
    fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }

    // templates
    tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
    panelTemplate: '<div></div>',

    // CSS classes
    navClass: 'ui-tabs-nav',
    selectedClass: 'ui-tabs-selected',
    unselectClass: 'ui-tabs-unselect',
    disabledClass: 'ui-tabs-disabled',
    panelClass: 'ui-tabs-panel',
    hideClass: 'ui-tabs-hide',
    loadingClass: 'ui-tabs-loading'
};

$.ui.tabs.getter = "length";

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend($.ui.tabs.prototype, {
    rotation: null,
    rotate: function(ms, continuing) {

        continuing = continuing || false;

        var self = this, t = this.options.selected;

        function start() {
            self.rotation = setInterval(function() {
                t = ++t < self.$tabs.length ? t : 0;
                self.select(t);
            }, ms);
        }

        function stop(e) {
            if (!e || e.clientX) { // only in case of a true click
                clearInterval(self.rotation);
            }
        }

        // start interval
        if (ms) {
            start();
            if (!continuing)
                this.$tabs.bind(this.options.event, stop);
            else
                this.$tabs.bind(this.options.event, function() {
                    stop();
                    t = self.options.selected;
                    start();
                });
        }
        // stop interval
        else {
            stop();
            this.$tabs.unbind(this.options.event, stop);
        }
    }
});

})(jQuery);

//End Jquery UI========================================================================================================
//End Jquery UI========================================================================================================
//End Jquery UI========================================================================================================
//End Jquery UI========================================================================================================
//End Jquery UI========================================================================================================


/*
 * jQuery validation plug-in 1.4
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 J�rn Zaefferer
 *
 * $Id: jquery.validate.js 5788 2008-07-13 15:04:50Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
    // http://docs.jquery.com/Plugins/Validation/validate
    validate: function( options ) {

        // if nothing is selected, return nothing; can't chain anyway
        if (!this.length) {
            options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
            return;
        }

        // check if a validator for this form was already created
        var validator = $.data(this[0], 'validator');
        if ( validator ) {
            return validator;
        }

        validator = new $.validator( options, this[0] );
        $.data(this[0], 'validator', validator);

        if ( validator.settings.onsubmit ) {

            // allow suppresing validation by adding a cancel class to the submit button
            this.find("input, button").filter(".cancel").click(function() {
                validator.cancelSubmit = true;
            });

            // validate the form on submit
            this.submit( function( event ) {
                if ( validator.settings.debug )
                    // prevent form submit to be able to see console output
                    event.preventDefault();

                function handle() {
                    if ( validator.settings.submitHandler ) {
                        validator.settings.submitHandler.call( validator, validator.currentForm );
                        return false;
                    }
                    return true;
                }

                // prevent submit for invalid forms or custom submit handlers
                if ( validator.cancelSubmit ) {
                    validator.cancelSubmit = false;
                    return handle();
                }
                if ( validator.form() ) {
                    if ( validator.pendingRequest ) {
                        validator.formSubmitted = true;
                        return false;
                    }
                    return handle();
                } else {
                    validator.focusInvalid();
                    return false;
                }
            });
        }

        return validator;
    },
    // http://docs.jquery.com/Plugins/Validation/valid
    valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = false;
            var validator = $(this[0].form).validate();
            this.each(function() {
                valid |= validator.element(this);
            });
            return valid;
        }
    },
    // attributes: space seperated list of attributes to retrieve and remove
    removeAttrs: function(attributes) {
        var result = {},
            $element = this;
        $.each(attributes.split(/\s/), function() {
            result[this] = $element.attr(this);
            $element.removeAttr(this);
        });
        return result;
    },
    // http://docs.jquery.com/Plugins/Validation/rules
    rules: function(command, argument) {
        var element = this[0];

        if (command) {
            var staticRules = $.data(element.form, 'validator').settings.rules;
            var existingRules = $.validator.staticRules(element);
            switch(command) {
            case "add":
                $.extend(existingRules, $.validator.normalizeRule(argument));
                staticRules[element.name] = existingRules;
                break;
            case "remove":
                if (!argument) {
                    delete staticRules[element.name];
                    return existingRules;
                }
                var filtered = {};
                $.each(argument.split(/\s/), function(index, method) {
                    filtered[method] = existingRules[method];
                    delete existingRules[method];
                });
                return filtered;
            }
        }

        var data = $.validator.normalizeRules(
        $.extend(
            {},
            $.validator.metadataRules(element),
            $.validator.classRules(element),
            $.validator.attributeRules(element),
            $.validator.staticRules(element)
        ), element);

        // make sure required is at front
        if (data.required) {
            var param = data.required;
            delete data.required;
            data = $.extend({required: param}, data);
        }

        return data;
    },
    // destructive add
    push: function( t ) {
        return this.setArray( this.add(t).get() );
    }
});

// Custom selectors
$.extend($.expr[":"], {
    // http://docs.jquery.com/Plugins/Validation/blank
    blank: function(a) {return !$.trim(a.value);},
    // http://docs.jquery.com/Plugins/Validation/filled
    filled: function(a) {return !!$.trim(a.value);},
    // http://docs.jquery.com/Plugins/Validation/unchecked
    unchecked: function(a) {return !a.checked;}
});


$.format = function(source, params) {
    if ( arguments.length == 1 )
        return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply( this, args );
        };
    if ( arguments.length > 2 && params.constructor != Array  ) {
        params = $.makeArray(arguments).slice(1);
    }
    if ( params.constructor != Array ) {
        params = [ params ];
    }
    $.each(params, function(i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};

// constructor for validator
$.validator = function( options, form ) {
    this.settings = $.extend( {}, $.validator.defaults, options );
    this.currentForm = form;
    this.init();
};

$.extend($.validator, {

    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        errorElement: "label",
        focusInvalid: true,
        errorContainer: $( [] ),
        errorLabelContainer: $( [] ),
        onsubmit: true,
        ignore: [],
        onfocusin: function(element) {
            this.lastActive = element;

            // hide error label and remove error class on focus if enabled
            if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
                this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass );
                this.errorsFor(element).hide();
            }
        },
        onfocusout: function(element) {
            if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                this.element(element);
            }
        },
        onkeyup: function(element) {
            if ( element.name in this.submitted || element == this.lastElement ) {
                this.element(element);
            }
        },
        onclick: function(element) {
            if ( element.name in this.submitted )
                this.element(element);
        },
        highlight: function( element, errorClass ) {
            $( element ).addClass( errorClass );
        },
        unhighlight: function( element, errorClass ) {
            $( element ).removeClass( errorClass );
        }
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
    setDefaults: function(settings) {
        $.extend( $.validator.defaults, settings );
    },

    messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        dateDE: "Bitte geben Sie ein g�ltiges Datum ein.",
        number: "Please enter a valid number.",
        numberDE: "Bitte geben Sie eine Nummer ein.",
        digits: "Please enter only digits",
        creditcard: "Please enter a valid credit card.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.format("Please enter no more than {0} characters."),
        minlength: $.format("Please enter at least {0} characters."),
        rangelength: $.format("Please enter a value between {0} and {1} characters long."),
        range: $.format("Please enter a value between {0} and {1}."),
        max: $.format("Please enter a value less than or equal to {0}."),
        min: $.format("Please enter a value greater than or equal to {0}.")
    },

    autoCreateRanges: false,

    prototype: {

        init: function() {
            this.labelContainer = $(this.settings.errorLabelContainer);
            this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
            this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = (this.groups = {});
            $.each(this.settings.groups, function(key, value) {
                $.each(value.split(/\s/), function(index, name) {
                    groups[name] = key;
                });
            });
            var rules = this.settings.rules;
            $.each(rules, function(key, value) {
                rules[key] = $.validator.normalizeRule(value);
            });

            function delegate(event) {
                var validator = $.data(this[0].form, "validator");
                validator.settings["on" + event.type] && validator.settings["on" + event.type].call(validator, this[0] );
            }
            $(this.currentForm)
                .delegate("focusin focusout keyup", ":text, :password, :file, select, textarea", delegate)
                .delegate("click", ":radio, :checkbox", delegate);
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/form
        form: function() {
            this.checkForm();
            $.extend(this.submitted, this.errorMap);
            this.invalid = $.extend({}, this.errorMap);
            if (!this.valid())
                $(this.currentForm).triggerHandler("invalid-form.validate", [this]);
            this.showErrors();
            return this.valid();
        },

        checkForm: function() {
            this.prepareForm();
            for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                this.check( elements[i] );
            }
            return this.valid();
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/element
        element: function( element ) {
            element = this.clean( element );
            this.lastElement = element;
            this.prepareElement( element );
            this.currentElements = $(element);
            var result = this.check( element );
            if ( result ) {
                delete this.invalid[element.name];
            } else {
                this.invalid[element.name] = true;
            }
            if ( !this.numberOfInvalids() ) {
                // Hide error containers on last error
                this.toHide.push( this.containers );
            }
            this.showErrors();
            return result;
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/showErrors
        showErrors: function(errors) {
            if(errors) {
                // add items to error list and map
                $.extend( this.errorMap, errors );
                this.errorList = [];
                for ( var name in errors ) {
                    this.errorList.push({
                        message: errors[name],
                        element: this.findByName(name)[0]
                    });
                }
                // remove items from success list
                this.successList = $.grep( this.successList, function(element) {
                    return !(element.name in errors);
                });
            }
            this.settings.showErrors
                ? this.settings.showErrors.call( this, this.errorMap, this.errorList )
                : this.defaultShowErrors();
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/resetForm
        resetForm: function() {
            if ( $.fn.resetForm )
                $( this.currentForm ).resetForm();
            this.submitted = {};
            this.prepareForm();
            this.hideErrors();
            this.elements().removeClass( this.settings.errorClass );
        },

        numberOfInvalids: function() {
            return this.objectLength(this.invalid);
        },

        objectLength: function( obj ) {
            var count = 0;
            for ( var i in obj )
                count++;
            return count;
        },

        hideErrors: function() {
            this.addWrapper( this.toHide ).hide();
        },

        valid: function() {
            return this.size() == 0;
        },

        size: function() {
            return this.errorList.length;
        },

        focusInvalid: function() {
            if( this.settings.focusInvalid ) {
                try {
                    $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus();
                } catch(e) { /* ignore IE throwing errors when focusing hidden elements */ }
            }
        },

        findLastActive: function() {
            var lastActive = this.lastActive;
            return lastActive && $.grep(this.errorList, function(n) {
                return n.element.name == lastActive.name;
            }).length == 1 && lastActive;
        },

        elements: function() {
            var validator = this,
                rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            // workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
            return $([]).add(this.currentForm.elements)
            .filter(":input")
            .not(":submit, :reset, :image, [disabled]")
            .not( this.settings.ignore )
            .filter(function() {
                !this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

                // select only the first element for each name, and only those with rules specified
                if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
                    return false;

                rulesCache[this.name] = true;
                return true;
            });
        },

        clean: function( selector ) {
            return $( selector )[0];
        },

        errors: function() {
            return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
        },

        reset: function() {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $([]);
            this.toHide = $([]);
            this.formSubmitted = false;
            this.currentElements = $([]);
        },

        prepareForm: function() {
            this.reset();
            this.toHide = this.errors().push( this.containers );
        },

        prepareElement: function( element ) {
            this.reset();
            this.toHide = this.errorsFor(element);
        },

        check: function( element ) {
            element = this.clean( element );

            // if radio/checkbox, validate first element in group instead
            if (this.checkable(element)) {
                element = this.findByName( element.name )[0];
            }

            var rules = $(element).rules();
            var dependencyMismatch = false;
            for( method in rules ) {
                var rule = { method: method, parameters: rules[method] };
                try {
                    var result = $.validator.methods[method].call( this, $.trim(element.value), element, rule.parameters );

                    // if a method indicates that the field is optional and therefore valid,
                    // don't mark it as valid when there are no other rules
                    if ( result == "dependency-mismatch" ) {
                        dependencyMismatch = true;
                        continue;
                    }
                    dependencyMismatch = false;

                    if ( result == "pending" ) {
                        this.toHide = this.toHide.not( this.errorsFor(element) );
                        return;
                    }

                    if( !result ) {
                        this.formatAndAdd( element, rule );
                        return false;
                    }
                } catch(e) {
                    this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
                         + ", check the '" + rule.method + "' method");
                    throw e;
                }
            }
            if (dependencyMismatch)
                return;
            if ( this.objectLength(rules) )
                this.successList.push(element);
            return true;
        },

        // return the custom message for the given element and validation method
        // specified in the element's "messages" metadata
        customMetaMessage: function(element, method) {
            if (!$.metadata)
                return;

            var meta = this.settings.meta
                ? $(element).metadata()[this.settings.meta]
                : $(element).metadata();

            return meta.messages && meta.messages[method];
        },

        // return the custom message for the given element name and validation method
        customMessage: function( name, method ) {
            var m = this.settings.messages[name];
            return m && (m.constructor == String
                ? m
                : m[method]);
        },

        // return the first defined argument, allowing empty strings
        findDefined: function() {
            for(var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined)
                    return arguments[i];
            }
            return undefined;
        },

        defaultMessage: function( element, method) {
            return this.findDefined(
                this.customMessage( element.name, method ),
                this.customMetaMessage( element, method ),
                // title is never undefined, so handle empty string as undefined
                element.title || undefined,
                $.validator.messages[method],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
        },

        formatAndAdd: function( element, rule ) {
            var message = this.defaultMessage( element, rule.method );
            if ( typeof message == "function" )
                message = message.call(this, rule.parameters, element);
            this.errorList.push({
                message: message,
                element: element
            });
            this.errorMap[element.name] = message;
            this.submitted[element.name] = message;
        },

        addWrapper: function(toToggle) {
            if ( this.settings.wrapper )
                toToggle.push( toToggle.parents( this.settings.wrapper ) );
            return toToggle;
        },

        defaultShowErrors: function() {
            for ( var i = 0; this.errorList[i]; i++ ) {
                var error = this.errorList[i];
                this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass );
                this.showLabel( error.element, error.message );
            }
            if( this.errorList.length ) {
                this.toShow.push( this.containers );
            }
            if (this.settings.success) {
                for ( var i = 0; this.successList[i]; i++ ) {
                    this.showLabel( this.successList[i] );
                }
            }
            if (this.settings.unhighlight) {
                for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
                    this.settings.unhighlight.call( this, elements[i], this.settings.errorClass );
                }
            }
            this.toHide = this.toHide.not( this.toShow );
            this.hideErrors();
            this.addWrapper( this.toShow ).show();
        },

        validElements: function() {
            return this.currentElements.not(this.invalidElements());
        },

        invalidElements: function() {
            return $(this.errorList).map(function() {
                return this.element;
            });
        },

        showLabel: function(element, message) {
            var label = this.errorsFor( element );
            if ( label.length ) {
                // refresh error/success class
                label.removeClass().addClass( this.settings.errorClass );

                // check if we have a generated label, replace the message then
                label.attr("generated") && label.html(message);
            } else {
                // create label
                label = $("<" + this.settings.errorElement + "/>")
                    .attr({"for":  this.idOrName(element), generated: true})
                    .addClass(this.settings.errorClass)
                    .html(message || "");
                if ( this.settings.wrapper ) {
                    // make sure the element is visible, even in IE
                    // actually showing the wrapped element is handled elsewhere
                    label = label.hide().show().wrap("<" + this.settings.wrapper + ">").parent();
                }
                if ( !this.labelContainer.append(label).length )
                    this.settings.errorPlacement
                        ? this.settings.errorPlacement(label, $(element) )
                        : label.insertAfter(element);
            }
            if ( !message && this.settings.success ) {
                label.text("");
                typeof this.settings.success == "string"
                    ? label.addClass( this.settings.success )
                    : this.settings.success( label );
            }
            this.toShow.push(label);
        },

        errorsFor: function(element) {
            return this.errors().filter("[@for='" + this.idOrName(element) + "']");
        },

        idOrName: function(element) {
            return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
        },

        checkable: function( element ) {
            return /radio|checkbox/i.test(element.type);
        },

        findByName: function( name ) {
            // select by name and filter by form for performance over form.find("[name=...]")
            var form = this.currentForm;
            return $(document.getElementsByName(name)).map(function(index, element) {
                return element.form == form && element.name == name && element  || null;
            });
        },

        getLength: function(value, element) {
            switch( element.nodeName.toLowerCase() ) {
            case 'select':
                return $("option:selected", element).length;
            case 'input':
                if( this.checkable( element) )
                    return this.findByName(element.name).filter(':checked').length;
            }
            return value.length;
        },

        depend: function(param, element) {
            return this.dependTypes[typeof param]
                ? this.dependTypes[typeof param](param, element)
                : true;
        },

        dependTypes: {
            "boolean": function(param, element) {
                return param;
            },
            "string": function(param, element) {
                return !!$(param, element.form).length;
            },
            "function": function(param, element) {
                return param(element);
            }
        },

        optional: function(element) {
            return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
        },

        startRequest: function(element) {
            if (!this.pending[element.name]) {
                this.pendingRequest++;
                this.pending[element.name] = true;
            }
        },

        stopRequest: function(element, valid) {
            this.pendingRequest--;
            // sometimes synchronization fails, make pendingRequest is never < 0
            if (this.pendingRequest < 0)
                this.pendingRequest = 0;
            delete this.pending[element.name];
            if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
                $(this.currentForm).submit();
            }
        },

        previousValue: function(element) {
            return $.data(element, "previousValue") || $.data(element, "previousValue", previous = {
                old: null,
                valid: true,
                message: this.defaultMessage( element, "remote" )
            });
        }

    },

    classRuleSettings: {
        required: {required: true},
        email: {email: true},
        url: {url: true},
        date: {date: true},
        dateISO: {dateISO: true},
        dateDE: {dateDE: true},
        number: {number: true},
        numberDE: {numberDE: true},
        digits: {digits: true},
        creditcard: {creditcard: true}
    },

    addClassRules: function(className, rules) {
        className.constructor == String ?
            this.classRuleSettings[className] = rules :
            $.extend(this.classRuleSettings, className);
    },

    classRules: function(element) {
        var rules = {};
        var classes = $(element).attr('class');
        classes && $.each(classes.split(' '), function() {
            if (this in $.validator.classRuleSettings) {
                $.extend(rules, $.validator.classRuleSettings[this]);
            }
        });
        return rules;
    },

    attributeRules: function(element) {
        var rules = {};
        var $element = $(element);

        for (method in $.validator.methods) {
            var value = $element.attr(method);
            if (value) {
                rules[method] = value;
            }
        }

        // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
        if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
            delete rules.maxlength;
        }

        return rules;
    },

    metadataRules: function(element) {
        if (!$.metadata) return {};

        var meta = $.data(element.form, 'validator').settings.meta;
        return meta ?
            $(element).metadata()[meta] :
            $(element).metadata();
    },

    staticRules: function(element) {
        var rules = {};
        var validator = $.data(element.form, 'validator');
        if (validator.settings.rules) {
            rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
        }
        return rules;
    },

    normalizeRules: function(rules, element) {
        // handle dependency check
        $.each(rules, function(prop, val) {
            // ignore rule when param is explicitly false, eg. required:false
            if (val === false) {
                delete rules[prop];
                return;
            }
            if (val.param || val.depends) {
                var keepRule = true;
                switch (typeof val.depends) {
                    case "string":
                        keepRule = !!$(val.depends, element.form).length;
                        break;
                    case "function":
                        keepRule = val.depends.call(element, element);
                        break;
                }
                if (keepRule) {
                    rules[prop] = val.param !== undefined ? val.param : true;
                } else {
                    delete rules[prop];
                }
            }
        });

        // evaluate parameters
        $.each(rules, function(rule, parameter) {
            rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
        });

        // clean number parameters
        $.each(['minlength', 'maxlength', 'min', 'max'], function() {
            if (rules[this]) {
                rules[this] = Number(rules[this]);
            }
        });
        $.each(['rangelength', 'range'], function() {
            if (rules[this]) {
                rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
            }
        });

        if ($.validator.autoCreateRanges) {
            // auto-create ranges
            if (rules.min && rules.max) {
                rules.range = [rules.min, rules.max];
                delete rules.min;
                delete rules.max;
            }
            if (rules.minlength && rules.maxlength) {
                rules.rangelength = [rules.minlength, rules.maxlength];
                delete rules.minlength;
                delete rules.maxlength;
            }
        }

        // To support custom messages in metadata ignore rule methods titled "messages"
        if (rules.messages) {
            delete rules.messages
        }

        return rules;
    },

    // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
    normalizeRule: function(data) {
        if( typeof data == "string" ) {
            var transformed = {};
            $.each(data.split(/\s/), function() {
                transformed[this] = true;
            });
            data = transformed;
        }
        return data;
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/addMethod
    addMethod: function(name, method, message) {
        $.validator.methods[name] = method;
        $.validator.messages[name] = message;
        if (method.length < 3) {
            $.validator.addClassRules(name, $.validator.normalizeRule(name));
        }
    },

    methods: {

        // http://docs.jquery.com/Plugins/Validation/Methods/required
        required: function(value, element, param) {
            // check if dependency is met
            if ( !this.depend(param, element) )
                return "dependency-mismatch";
            switch( element.nodeName.toLowerCase() ) {
            case 'select':
                var options = $("option:selected", element);
                return options.length > 0 && ( element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
            case 'input':
                if ( this.checkable(element) )
                    return this.getLength(value, element) > 0;
            default:
                return value.length > 0;
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/remote
        remote: function(value, element, param) {
            if ( this.optional(element) )
                return "dependency-mismatch";

            var previous = this.previousValue(element);

            if (!this.settings.messages[element.name] )
                this.settings.messages[element.name] = {};
            this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;

            if ( previous.old !== value ) {
                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax({
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                        if ( !response ) {
                            var errors = {};
                            errors[element.name] =  response || validator.defaultMessage( element, "remote" );
                            validator.showErrors(errors);
                        } else {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            validator.showErrors();
                        }
                        previous.valid = response;
                        validator.stopRequest(element, response);
                    }
                });
                return "pending";
            } else if( this.pending[element.name] ) {
                return "pending";
            }
            return previous.valid;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/minlength
        minlength: function(value, element, param) {
            return this.optional(element) || this.getLength(value, element) >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
        maxlength: function(value, element, param) {
            return this.optional(element) || this.getLength(value, element) <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
        rangelength: function(value, element, param) {
            var length = this.getLength(value, element);
            return this.optional(element) || ( length >= param[0] && length <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/min
        min: function( value, element, param ) {
            return this.optional(element) || value >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/max
        max: function( value, element, param ) {
            return this.optional(element) || value <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/range
        range: function( value, element, param ) {
            return this.optional(element) || ( value >= param[0] && value <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/email
        email: function(value, element) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
            return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(element.value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/url
        url: function(value, element) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
            return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(element.value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/date
        date: function(value, element) {
            return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/dateISO
        dateISO: function(value, element) {
            return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/dateDE
        dateDE: function(value, element) {
            return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/number
        number: function(value, element) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/numberDE
        numberDE: function(value, element) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/digits
        digits: function(value, element) {
            return this.optional(element) || /^\d+$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
        // based on http://en.wikipedia.org/wiki/Luhn
        creditcard: function(value, element) {
            if ( this.optional(element) )
                return "dependency-mismatch";
            // accept only digits and dashes
            if (/[^0-9-]+/.test(value))
                return false;
            var nCheck = 0,
                nDigit = 0,
                bEven = false;

            value = value.replace(/\D/g, "");

            for (n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n);
                var nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9)
                        nDigit -= 9;
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) == 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/accept
        accept: function(value, element, param) {
            param = typeof param == "string" ? param : "png|jpe?g|gif";
            return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
        equalTo: function(value, element, param) {
            return value == $(param).val();
        }

    }

});

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
    var ajax = $.ajax;
    var pendingRequests = {};
    $.ajax = function(settings) {
        // create settings for compatibility with ajaxSetup
        settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
        var port = settings.port;
        if (settings.mode == "abort") {
            if ( pendingRequests[port] ) {
                pendingRequests[port].abort();
            }
            return (pendingRequests[port] = ajax.apply(this, arguments));
        }
        return ajax.apply(this, arguments);
    };
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;(function($) {
    $.each({
        focus: 'focusin',
        blur: 'focusout'
    }, function( original, fix ){
        $.event.special[fix] = {
            setup:function() {
                if ( $.browser.msie ) return false;
                this.addEventListener( original, $.event.special[fix].handler, true );
            },
            teardown:function() {
                if ( $.browser.msie ) return false;
                this.removeEventListener( original,
                $.event.special[fix].handler, true );
            },
            handler: function(e) {
                arguments[0] = $.event.fix(e);
                arguments[0].type = fix;
                return $.event.handle.apply(this, arguments);
            }
        };
    });
    $.extend($.fn, {
        delegate: function(type, delegate, handler) {
            return this.bind(type, function(event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        },
        triggerEvent: function(type, target) {
            return this.triggerHandler(type, [$.event.fix({ type: type, target: target })]);
        }
    })
})(jQuery);


/*
    CUSTOM:
    This customizes the default validator functions specificially for Talbots,
    if you update this plugin please copy these to the bottom of the new include
*/

$.validator.defaults.unhighlight = function(element, errorClass){
    $(element).parent().removeClass(errorClass);
    $(element).parent().children(".errorFlag").remove()
}
$.validator.defaults.highlight = function(element, errorClass){
    $(element).parent().addClass(errorClass);
    if( $(element).parent().children(".errorFlag").length < 1){
        //calculate offset of the error flag
        var offset = {
            top: $(element)[0].offsetTop + 2,
            left:  $(element)[0].offsetLeft +  $(element)[0].offsetWidth + 2
        }
        $(element).after("<img class='errorFlag' src='/images/icons/icn_error.gif' style='top:"+ offset.top +"px; left:"+ offset.left +"px'>")
    }

}
$.validator.defaults.wrapper= "li";
$.validator.defaults.errorClass= "errorInput";
$.validator.defaults.errorContainer= "#formErrors";
$.validator.defaults.errorLabelContainer= "#formErrors ul";

//End Jquery Validate======================================================================================
//End Jquery Validate======================================================================================
//End Jquery Validate======================================================================================
//End Jquery Validate======================================================================================
/*
//
Written by Eric Webster
Super Popup: when using this function on multiple links across a site its best to define a 'type' with your options
if you are defining a popup on a single page you can pass in the options you want as object arguments.
*/

function f_clientWidth() {
    return f_filterResults (
        window.innerWidth ? window.innerWidth : 0,
        document.documentElement ? document.documentElement.clientWidth : 0,
        document.body ? document.body.clientWidth : 0
    );
}

function f_clientHeight() {
    return f_filterResults (
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
function superPopup(args){
    var url, type, directories, location, menubar, resizable, scrollbars, status, toolbar, top, left, width, height, winName;

    // URL is the only required field.
    if (args.url) { url = args.url;} else { alert('Error: Link URL Missing');};

    if (args.type) { type = args.type;};

    // test to see if we have set a window option on the function or in a profile above, if not then set the value to be a default.
    // option = (if it was passed in as an argument)? use that value : [IF NOT] use this default value;
    directories = (args.directories)? args.directories : directories = "no";
    location = (args.location)? args.location : location = "no";
    menubar = (args.menubar)? args.menubar : menubar = "no";
    resizable = (args.resizable)? args.resizable : resizable = "no";
    scrollbars = (args.scrollbars)? args.scrollbars : scrollbars = "auto";
    status = (args.status)? args.status : status = "yes";
    toolbar = (args.toolbar)? args.toolbar : toolbar = "no";
    top = (args.top)? args.top : top = "50";
    left = (args.left)? args.left : left = "50";
    width = (args.width)? args.width : width = "250";
    height = (args.height)? args.height : height = "400";
    winName = (args.winName)? args.winName : winName = "popup";

    // type will set some basic options to make the function cleaner -- otherwise all values can be set
    if(type == "_blank"){   //used to generate a window the same size as the previous
        var windowWidth = f_clientWidth();
        var windowHeight = f_clientWidth();

        //used to generate original "window names"
        var randomNumber = Math.floor(Math.random()*100000);
        winName="blank" + randomNumber; width=windowWidth; height=windowHeight;
        scrollbars="yes"; menubar="yes"; toolbar="yes"; directories="yes";
        location="yes"; top="0"; left="0";
    }
    if(type == "findInStore"){
        height="500";
        width="580";
        scrollbars="1";
    }
    if(type == "sizeChart"){
        height="505";
        width="770";
        scrollbars="1";
    }
    if(type == "zoom"){
        height="516";
        width="634";
    }
    if(type == "directions"){
        height="516";
        width="634";
        scrollbars="1";
    }

    // build our complete window options statement
    windowOptions = "width=" + width + ", height=" + height + ", directories=" + directories + ", location=" + location + ", menubar=" + menubar + ", resizable=" + resizable + ", scrollbars=" + scrollbars + ", toolbar=" + toolbar + ", status=" + status + ", toolbar=" + toolbar + ", top=" + top + ", left=" + left + "";

    var newWindow = window.open(url,winName,windowOptions);

    if (newWindow == null){
        //alert('A popup containing important information was blocked by your browser. Please enable popups for this site in order to view this information.');
        return true;
    } else {
        if (window.focus && newWindow) { newWindow.focus() }
    }
}
/*
// End Super Popup:
*/

/*
 * Autotab - jQuery plugin 1.0
 * http://dev.lousyllama.com/auto-tab
 *
 * Copyright (c) 2008 Matthew Miller
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revised: 2008/05/22 01:23:25
 */

(function($) {

$.fn.autotab = function(options) {
    var defaults = {
        format: 'all',          // text, numeric, alphanumeric, all
        maxlength: 2147483647,  // Defaults to maxlength value
        uppercase: false,       // Converts a string to UPPERCASE
        lowercase: false,       // Converts a string to lowecase
        nospace: false,     // Remove spaces in the user input
        target: null,           // Where to auto tab to
        previous: null          // Backwards auto tab when all data is backspaced
    };

    $.extend(defaults, options);

    var check_element = function(name) {
        var val = null;
        var check_id = $('#' + name)[0];
        var check_name = $('input[name=' + name + ']')[0];

        if(check_id != undefined)
            val = $(check_id);
        else if(check_name != undefined)
            val = $(check_name);

        return val;
    };

    var key = function(e) {
        if(!e)
            e = window.event;

        return e.keyCode;
    };

    // Sets targets to element based on the name or ID passed
    if(typeof defaults.target == 'string')
        defaults.target = check_element(defaults.target);

    if(typeof defaults.previous == 'string')
        defaults.previous = check_element(defaults.previous);

    var maxlength = $(this).attr('maxlength');

    // Each text field has a maximum character limit of 2147483647

    // defaults.maxlength has not changed and maxlength was specified
    if(defaults.maxlength == 2147483647 && maxlength != 2147483647)
        defaults.maxlength = maxlength;
    // defaults.maxlength overrides maxlength
    else if(defaults.maxlength > 0)
        $(this).attr('maxlength', defaults.maxlength)
    // defaults.maxlength and maxlength have not been specified
    // A target cannot be used since there is no defined maxlength
    else
        defaults.target = null;

    // IE does not recognize the backspace key
    // with keypress in a blank input box
    if($.browser.msie)
    {
        this.keydown(function(e) {
            if(key(e) == 8)
            {
                var val = this.value;

                if(val.length == 0 && defaults.previous)
                    defaults.previous.focus();
            }
        });
    }

    return this.keypress(function(e) {
        if(key(e) == 8)
        {
            var val = this.value;

            if(val.length == 0 && defaults.previous)
                defaults.previous.focus();
        }
    }).keyup(function(e) {
        var val = this.value;

        switch(defaults.format)
        {
            case 'text':
                var pattern = new RegExp('[0-9]+', 'g');
                var val = val.replace(pattern, '');
                break;

            case 'alpha':
                var pattern = new RegExp('[^a-zA-Z]+', 'g');
                var val = val.replace(pattern, '');
                break;

            case 'number':
            case 'numeric':
                var pattern = new RegExp('[^0-9]+', 'g');
                var val = val.replace(pattern, '');
                break;

            case 'alphanumeric':
                var pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
                var val = val.replace(pattern, '');
                break;

            case 'all':
            default:
                break;
        }

        if(defaults.nospace)
        {
            pattern = new RegExp('[ ]+', 'g');
            val = val.replace(pattern, '');
        }

        if(defaults.uppercase)
            val = val.toUpperCase();

        if(defaults.lowercase)
            val = val.toLowerCase();

        this.value = val;

        /**
         * Do not auto tab when the following keys are pressed
         * 8:   Backspace
         * 9:   Tab
         * 16:  Shift
         * 17:  Ctrl
         * 18:  Alt
         * 19:  Pause Break
         * 20:  Caps Lock
         * 27:  Esc
         * 33:  Page Up
         * 34:  Page Down
         * 35:  End
         * 36:  Home
         * 37:  Left Arrow
         * 38:  Up Arrow
         * 39:  Right Arrow
         * 40:  Down Arroww
         * 45:  Insert
         * 46:  Delete
         * 144: Num Lock
         * 145: Scroll Lock
         */
        var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];
        var string = keys.toString();

        if(string.indexOf(key(e)) == -1 && val.length == defaults.maxlength && defaults.target)
            defaults.target.focus();
    });
};

})(jQuery);
//END AUTO TAB
/*
 * jQuery JSON Plugin
 * version: 1.0 (2008-04-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris technically wrote this plugin, but it is based somewhat
 * on the JSON.org website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.  I really just cleaned it up.
 *
 * It is also based heavily on MochiKit's serializeJSON, which is
 * copywrited 2005 by Bob Ippolito.
 */

(function($) {
    function toIntegersAtLease(n)
    // Format integers to have at least two digits.
    {
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function(date)
    // Yes, it polutes the Date namespace, but we'll allow it here, as
    // it's damned usefull.
    {
        return this.getUTCFullYear()   + '-' +
             toIntegersAtLease(this.getUTCMonth()) + '-' +
             toIntegersAtLease(this.getUTCDate());
    };

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };

    $.quoteString = function(string)
    // Places quotes around a string, inteligently.
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    {
        if (escapeable.test(string))
        {
            return '"' + string.replace(escapeable, function (a)
            {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

    $.toJSON = function(o, compact)
    {
        var type = typeof(o);

        if (type == "undefined")
            return "undefined";
        else if (type == "number" || type == "boolean")
            return o + "";
        else if (o === null)
            return "null";

        // Is it a string?
        if (type == "string")
        {
            return $.quoteString(o);
        }

        // Does it have a .toJSON function?
        if (type == "object" && typeof o.toJSON == "function")
            return o.toJSON(compact);

        // Is it an array?
        if (type != "function" && typeof(o.length) == "number")
        {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push( $.toJSON(o[i], compact) );
            }
            if (compact)
                return "[" + ret.join(",") + "]";
            else
                return "[" + ret.join(", ") + "]";
        }

        // If it's a function, we have to warn somebody!
        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }

        // It's probably an object, then.
        var ret = [];
        for (var k in o) {
            var name;
            type = typeof(k);

            if (type == "number")
                name = '"' + k + '"';
            else if (type == "string")
                name = $.quoteString(k);
            else
                continue;  //skip non-string or number keys

            var val = $.toJSON(o[k], compact);
            if (typeof(val) != "string") {
                // skip non-serializable values
                continue;
            }

            if (compact)
                ret.push(name + ":" + val);
            else
                ret.push(name + ": " + val);
        }
        return "{" + ret.join(", ") + "}";
    };

    $.compactJSON = function(o)
    {
        return $.toJSON(o, true);
    };

    $.evalJSON = function(src)
    // Evals JSON that we know to be safe.
    {
        return eval("(" + src + ")");
    };

    $.secureEvalJSON = function(src)
    // Evals JSON in a way that is *more* secure.
    {
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
})(jQuery);

/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 9/11/2008
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Tested with jQuery 1.2.6. On FF 2/3, IE 6/7, Opera 9.2/5 and Safari 3. on Windows.
 *
 * @author Ariel Flesler
 * @version 1.4
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *    The different options for target are:
 *      - A number position (will be applied to all axes).
 *      - A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *      - A jQuery/DOM element ( logically, child of the element to scroll )
 *      - A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *      - A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *   @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *   @option {Number} duration The OVERALL length of the animation.
 *   @option {String} easing The easing method for the animation.
 *   @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *   @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *   @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *   @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *   @option {Function} onAfter Function to be called after the scrolling ends.
 *   @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *          $('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *              alert('scrolled!!');
 *          }});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){

    var $scrollTo = $.scrollTo = function( target, duration, settings ){
        $(window).scrollTo( target, duration, settings );
    };

    $scrollTo.defaults = {
        axis:'y',
        duration:1
    };

    // Returns the element that needs to be animated to scroll the window.
    // Kept for backwards compatibility (specially for localScroll & serialScroll)
    $scrollTo.window = function( scope ){
        return $(window).scrollable();
    };

    // Hack, hack, hack... stay away!
    // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
    $.fn.scrollable = function(){
        return this.map(function(){
            // Just store it, we might need it
            var win = this.parentWindow || this.defaultView,
                // If it's a document, get its iframe or the window if it's THE document
                elem = this.nodeName == '#document' ? win.frameElement || win : this,
                // Get the corresponding document
                doc = elem.contentDocument || (elem.contentWindow || elem).document,
                isWin = elem.setInterval;

            return elem.nodeName == 'IFRAME' || isWin && $.browser.safari ? doc.body
                : isWin ? doc.documentElement
                : this;
        });
    };

    $.fn.scrollTo = function( target, duration, settings ){
        if( typeof duration == 'object' ){
            settings = duration;
            duration = 0;
        }
        if( typeof settings == 'function' )
            settings = { onAfter:settings };

        settings = $.extend( {}, $scrollTo.defaults, settings );
        // Speed is still recognized for backwards compatibility
        duration = duration || settings.speed || settings.duration;
        // Make sure the settings are given right
        settings.queue = settings.queue && settings.axis.length > 1;

        if( settings.queue )
            // Let's keep the overall duration
            duration /= 2;
        settings.offset = both( settings.offset );
        settings.over = both( settings.over );

        return this.scrollable().each(function(){
            var elem = this,
                $elem = $(elem),
                targ = target, toff, attr = {},
                win = $elem.is('html,body');

            switch( typeof targ ){
                // A number will pass the regex
                case 'number':
                case 'string':
                    if( /^([+-]=)?\d+(px)?$/.test(targ) ){
                        targ = both( targ );
                        // We are done
                        break;
                    }
                    // Relative selector, no break!
                    targ = $(targ,this);
                case 'object':
                    // DOMElement / jQuery
                    if( targ.is || targ.style )
                        // Get the real position of the target
                        toff = (targ = $(targ)).offset();
            }
            $.each( settings.axis.split(''), function( i, axis ){
                var Pos = axis == 'x' ? 'Left' : 'Top',
                    pos = Pos.toLowerCase(),
                    key = 'scroll' + Pos,
                    old = elem[key],
                    Dim = axis == 'x' ? 'Width' : 'Height',
                    dim = Dim.toLowerCase();

                if( toff ){// jQuery / DOMElement
                    attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

                    // If it's a dom element, reduce the margin
                    if( settings.margin ){
                        attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
                        attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
                    }

                    attr[key] += settings.offset[pos] || 0;

                    if( settings.over[pos] )
                        // Scroll to a fraction of its width/height
                        attr[key] += targ[dim]() * settings.over[pos];
                }else
                    attr[key] = targ[pos];

                // Number or 'number'
                if( /^\d+$/.test(attr[key]) )
                    // Check the limits
                    attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max(Dim) );

                // Queueing axes
                if( !i && settings.queue ){
                    // Don't waste time animating, if there's no need.
                    if( old != attr[key] )
                        // Intermediate animation
                        animate( settings.onAfterFirst );
                    // Don't animate this axis again in the next iteration.
                    delete attr[key];
                }
            });
            animate( settings.onAfter );

            function animate( callback ){
                $elem.animate( attr, duration, settings.easing, callback && function(){
                    callback.call(this, target, settings);
                });
            };
            function max( Dim ){
                var attr ='scroll'+Dim,
                    doc = elem.ownerDocument;

                return win
                        ? Math.max( doc.documentElement[attr], doc.body[attr]  )
                        : elem[attr];
            };
        }).end();
    };

    function both( val ){
        return typeof val == 'object' ? val : { top:val, left:val };
    };

})( jQuery );

//END SCROLLTO.js

/**
 * jQuery.serialScroll
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/20/2008
 *
 * @projectDescription Animated scrolling of series.
 * @author Ariel Flesler
 * @version 1.2.1
 *
 * @id jQuery.serialScroll
 * @id jQuery.fn.serialScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 *
 * Notes:
 *  - The plugin requires jQuery.ScrollTo.
 *  - The hash of settings, is passed to jQuery.ScrollTo, so its settings can be used as well.
 */
;(function( $ ){

    var $serialScroll = $.serialScroll = function( settings ){
        $.scrollTo.window().serialScroll( settings );
    };

    //Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
    //@see http://flesler.webs/jQuery.ScrollTo/
    $serialScroll.defaults = {//the defaults are public and can be overriden.
        duration:1000, //how long to animate.
        axis:'x', //which of top and left should be scrolled
        event:'click', //on which event to react.
        start:0, //first element (zero-based index)
        step:1, //how many elements to scroll on each action
        lock:true,//ignore events if already animating
        cycle:true, //cycle endlessly ( constant velocity )
        constant:true //use contant speed ?
        /*
        navigation:null,//if specified, it's a selector a collection of items to navigate the container
        target:null, //if specified, it's a selector to the element to be scrolled.
        interval:0, //it's the number of milliseconds to automatically go to the next
        lazy:false,//go find the elements each time (allows AJAX or JS content, or reordering)
        stop:false, //stop any previous animations to avoid queueing
        force:false,//force the scroll to the first element on start ?
        jump: false,//if true, when the event is triggered on an element, the pane scrolls to it
        items:null, //selector to the items (relative to the matched elements)
        prev:null, //selector to the 'prev' button
        next:null, //selector to the 'next' button
        onBefore: function(){}, //function called before scrolling, if it returns false, the event is ignored
        exclude:0 //exclude the last x elements, so we cannot scroll past the end
        */
    };

    $.fn.serialScroll = function( settings ){
        settings = $.extend( {}, $serialScroll.defaults, settings );
        var event = settings.event, //this one is just to get shorter code when compressed
            step = settings.step, // idem
            lazy = settings.lazy;//idem

        return this.each(function(){
            var
                context = settings.target ? this : document, //if a target is specified, then everything's relative to 'this'.
                $pane = $(settings.target || this, context),//the element to be scrolled (will carry all the events)
                pane = $pane[0], //will be reused, save it into a variable
                items = settings.items, //will hold a lazy list of elements
                active = settings.start, //active index
                auto = settings.interval, //boolean, do auto or not
                nav = settings.navigation, //save it now to make the code shorter
                timer; //holds the interval id

            if( !lazy )//if not lazy, go get the items now
                items = getItems();

            if( settings.force )
                jump( {}, active );//generate an initial call

            // Button binding, optionall
            $(settings.prev||[], context).bind( event, -step, move );
            $(settings.next||[], context).bind( event, step, move );

            // Custom events bound to the container
            if( !pane.ssbound )//don't bind more than once
                $pane
                    .bind('prev.serialScroll', -step, move ) //you can trigger with just 'prev'
                    .bind('next.serialScroll', step, move ) //for example: $(container).trigger('next');
                    .bind('goto.serialScroll', jump ); //for example: $(container).trigger('goto', [4] );
            if( auto )
                $pane
                    .bind('start.serialScroll', function(e){
                        if( !auto ){
                            clear();
                            auto = true;
                            next();
                        }
                     })
                    .bind('stop.serialScroll', function(){//stop a current animation
                        clear();
                        auto = false;
                    });
            $pane.bind('notify.serialScroll', function(e, elem){//let serialScroll know that the index changed externally
                var i = index(elem);
                if( i > -1 )
                    active = i;
            });
            pane.ssbound = true;//avoid many bindings

            if( settings.jump )//can't use jump if using lazy items and a non-bubbling event
                (lazy ? $pane : getItems()).bind( event, function( e ){
                    jump( e, index(e.target) );
                });

            if( nav )
                nav = $(nav, context).bind(event, function( e ){
                    e.data = Math.round(getItems().length / nav.length) * nav.index(this);
                    jump( e, this );
                });

            function move( e ){
                e.data += active;
                jump( e, this );
            };
            function jump( e, button ){
                if( !isNaN(button) ){//initial or special call from the outside $(container).trigger('goto',[index]);
                    e.data = button;
                    button = pane;
                }

                var
                    pos = e.data, n,
                    real = e.type, //is a real event triggering ?
                    $items = settings.exclude ? getItems().slice(0,-settings.exclude) : getItems(),//handle a possible exclude
                    limit = $items.length,
                    elem = $items[pos],
                    duration = settings.duration;

                if( real )//real event object
                    e.preventDefault();

                if( auto ){
                    clear();//clear any possible automatic scrolling.
                    timer = setTimeout( next, settings.interval );
                }

                if( !elem ){ //exceeded the limits
                    n = pos < 0 ? 0 : limit - 1;
                    if( active != n )//we exceeded for the first time
                        pos = n;
                    else if( !settings.cycle )//this is a bad case
                        return;
                    else
                        pos = limit - n - 1;//invert, go to the other side
                    elem = $items[pos];
                }

                if( !elem || real && active == pos || //could happen, save some CPU cycles in vain
                    settings.lock && $pane.is(':animated') || //no animations while busy
                    real && settings.onBefore && //callback returns false ?
                    settings.onBefore.call(button, e, elem, $pane, getItems(), pos) === false ) return;

                if( settings.stop )
                    $pane.queue('fx',[]).stop();//remove all its animations

                if( settings.constant )
                    duration = Math.abs(duration/step * (active - pos ));//keep constant velocity

                $pane
                    .scrollTo( elem, duration, settings )//do scroll
                    .trigger('notify.serialScroll',[pos]);//in case serialScroll was called on this elem more than once.
            };
            function next(){//I'll use the namespace to avoid conflicts
                $pane.trigger('next.serialScroll');
            };
            function clear(){
                clearTimeout(timer);
            };
            function getItems(){
                return $( items, pane );
            };
            function index( elem ){
                if( !isNaN(elem) ) return elem;//number
                var $items = getItems(), i;
                while(( i = $items.index(elem)) == -1 && elem != pane )//see if it matches or one of its ancestors
                    elem = elem.parentNode;
                return i;
            };
        });
    };

})( jQuery );

//END SERIAL SCROLL.JS


/*

flashInjection V 0.1
Author: Eric Webster
History:

*/

jQuery.fn.flashInjection = function(settings) {

    settings = jQuery.extend({
    }, settings);


    settings.flashContainer = $(this).attr("id");
    if(settings.XHTMLcontentContainer){
        settings.XHTMLcontent = $(settings.XHTMLcontentContainer).xhtml();

        //this function is exposed so that Flash can read the content on the XHTML page.
        jQuery.fn.getContent = function() {
            return settings.XHTMLcontent;
        }
    }
    if(!settings.flashID){
        settings.flashID = "flashReplaced";
    }
    // possibly remove whitespace and newline from the content
    // var strSingleLineText = MediaCenter.XHTMLcontent.replace(new RegExp( "\\n", "g" ), "");
    //If Javascript is available remove the '#jsMessage' LI content node to reflect that the only remaing requirement is flash.
    $("#jsMessage").remove();
    $("#"+settings.flashContainer).css({
        width: settings.flashWidth,
        height:settings.flashHeight
    })



    /* THIS IS A GENERIC FLASH OBJECT THAT IS BEING INITALIZED*/
    var fO = new SWFObject(settings.flashSource, settings.flashID, "100%", "100%", settings.flashVersion);
    for(i in settings.flashParams){
        fO.addParam(i, settings.flashParams[i]);
    }
    for(i in settings.flashVars){
        fO.addVariable(i, settings.flashVars[i]);
    }
    fO.write(settings.flashContainer);

}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="SameDomain";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
