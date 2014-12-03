
var elation=new function(selector,parent,first){if(typeof selector=='string'&&typeof elation.find=='function')
elation.find(selector,parent,first);this.extend=function(name,func,clobber){var ptr=this,parts=name.split("."),i;for(i=0;i<parts.length-1;i++){if(typeof ptr[parts[i]]=='undefined')
ptr[parts[i]]={};ptr=ptr[parts[i]];}
if(typeof ptr[parts[i]]=='undefined'||clobber==true){ptr[parts[i]]=func;}else{console.log("elation: tried to clobber existing component '"+name+"'");}}}
if(!window.console){window.console={};window.console.log=function(txt){if(elation.utils.logging)
elation.utils.logging(txt);}}else{}
elation.extend('utils.logging',function(txt){if(elation.debug&&typeof elation.debug.log!='undefined')
elation.debug.log(txt);else{if(!elation.utils.logging.prelog)
elation.utils.logging.prelog=[];elation.utils.logging.prelog.push(txt);}});elation.extend("checkhash",new function(){var init=function(){this.timer=setInterval(function(){try{if(elation.search&&elation.search.backbutton){elation.search.backbutton.check();}}catch(e){}},500);}
this.fetch=function(url,callback){elation.ajax.Queue({url:url,callback:[this,callback]});}
if(typeof $TF!='undefined'){$TF(document).ready(function(){setTimeout(function(){init();},500);});}});elation.extend("component",new function(){this.namespace="elation";this.attrs={componenttype:'component',componentname:'name',componentargs:'args',componentinit:'initialized',componentreinit:'reinitialize'};this.registry=[];this.init=function(root){var argsattr=this.namespace+':'+this.attrs.componentargs;if(typeof root=='undefined'){root=document;}
if(false&&document.evaluate){if(document.createNSResolver){var nsresolver=document.createNSResolver(document.documentElement);}else{var nsresolver=function(prefix){var ns={'xhtml':'http://www.w3.org/1999/xhtml','elation':'http://www.ajaxelation.com/xmlns'};return ns[prefix]||null;}}
var selector="//*";var result=document.evaluate(selector,root,nsresolver,XPathResult.ANY_TYPE,null);var elements=[];var element;while(element=result.iterateNext()){elements.push(element);}}else if(typeof $TF!='undefined'){try{var elements=$TF("["+this.namespace+"\\:"+this.attrs.componenttype+"]",root);}catch(e){var elements=[];}}else{var elements=[];}
for(var i=0;i<elements.length;i++){var element=elements[i];var componentid=this.parseid(element);if(componentid.type){var componentinitialized=element.getAttribute(this.namespace+':'+this.attrs.componentinit)||false;if(!componentinitialized){var componentreinit=element.getAttribute(this.namespace+':'+this.attrs.componentreinit)||false;if(!componentreinit)
element.setAttribute(this.namespace+':'+this.attrs.componentinit,1);var componentargs={},j;if(element.children){for(j=0;j<element.children.length;j++){if(element.children[j].nodeName==argsattr.toUpperCase()||element.children[j].nodeName=="args"){var argtext=element.children[j].textContent||element.children[j].innerText;try{componentargs=JSON.parse(argtext);element.removeChild(element.children[j]);if(componentargs==null){componentargs={};}
break;}catch(e){console.log("Could not parse "+argsattr+": "+argtext);}}}}
for(j=0;j<element.attributes.length;j++){if(element.attributes[j].nodeName.substring(0,argsattr.length+1)==argsattr+'.'){elation.utils.arrayset(componentargs,element.attributes[j].nodeName.substring(argsattr.length+1),element.attributes[j].value);}}
elation.component.create(componentid.name,componentid.type,element,componentargs);}}}}
this.add=function(name,classdef){var el=function(name,container,args){if(!name&&name!==0)
name=el.objcount;if(!el.obj[name]){el.obj[name]=new el.fn.init(name,container,args);container.setAttribute(elation.component.namespace+':'+elation.component.attrs.componentname,name);el.objcount++;}
return el.obj[name];};el.objcount=0;el.obj={};el.fn=(typeof classdef=='function'?new classdef:classdef);if(!el.fn.init)el.fn.init=function(name,container,args){this.name=name;this.container=container;this.args=args;}
el.fn.init.prototype=el.fn;elation.extend(name,el);}
this.create=function(name,type,container,args){var componentclass=elation.utils.arrayget(elation,type);if(typeof componentclass=='function'){return componentclass.call(componentclass,name,container,args);}
console.log("elation: tried to instantiate unknown component type '"+type+"' named '"+name+"'",componentclass);}
this.parseid=function(element){var componentid={type:element.getAttribute(this.namespace+':'+this.attrs.componenttype),name:element.getAttribute(this.namespace+':'+this.attrs.componentname)||element.id}
return componentid;}
this.fetch=function(type,name){if(!elation.utils.isNull(type)&&elation.utils.iselement(type)){var id=this.parseid(type);}else{var id={type:type,name:name};}
if(id.type&&id.name){var componentclass=elation.utils.arrayget(elation,id.type);return componentclass(id.name);}}});elation.extend('onloads',new function(){this.done=false;this.reset=function(){this.onloads=[];this.priority={'0':[],'1':[],'2':[],'3':[],'4':[]};}
this.add=function(expr,priority){var priority=priority||2;if(!this.priority[priority])
this.priority[priority]=[];this.priority[priority].push(this.onloads.length);this.onloads.push(expr);if(this.done)this.execute();}
this.init=function(){this.timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){elation.onloads.execute();}},10);if(document.addEventListener){document.addEventListener("DOMContentLoaded",elation.onloads.execute,false);return;}
window.onload=elation.onloads.execute;}
this.execute=function(){elation.onloads.done=true;if(elation.onloads.timer)clearInterval(elation.onloads.timer);var script='';var expr,level;for(level in elation.onloads.priority){var group=elation.onloads.priority[level];for(var i=0;i<group.length;i++){expr=elation.onloads.onloads[group[i]];if(typeof expr=='function'){expr();}else if(typeof expr=='string'){script+=expr+(expr.charAt(expr.length-1)!=';'?';':'');}else{console.log('[onloads] execute - UNKNOWN TYPE ERROR');}}}
eval(script);elation.onloads.reset();}
this.reset();});elation.extend("bind",function(ctx,fn){if(typeof fn=='function'){return(typeof fn.bind=='function'?fn.bind(ctx):function(){fn.apply(ctx,arguments);});}else if(typeof ctx=='function'){return ctx;}});elation.extend("html.window.width",function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;});elation.extend("html.window.height",function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;});elation.extend("html.dimensions",function(element,ignore_size){if(typeof element!='object'||element===window){var width=elation.html.window.width(),height=elation.html.window.height();return{0:width,1:height,x:0,y:0,w:width,h:height,s:elation.html.getscroll()};}
var width=ignore_size?0:element.offsetWidth,height=ignore_size?0:element.offsetHeight,left=element.offsetLeft,top=element.offsetTop,scrollleft=element.scrollLeft||0,scrolltop=element.scrollTop||0,id=element.id||'';try{while(element=element.offsetParent){top+=element.offsetTop-element.scrollTop;left+=element.offsetLeft-element.scrollLeft;}}catch(e){console.log('html.dimensions: '+e.message);}
if(elation.browser.type=='safari')
top+=elation.html.getscroll(1);return{0:left,1:top,x:left,y:top,w:width,h:height,s:[scrollleft,scrolltop]};});elation.extend("html.size",function(obj){return[obj.offsetWidth,obj.offsetHeight];});elation.extend("html.position",function(obj){var curleft=curtop=0;if(obj.offsetParent){curleft=obj.offsetLeft;curtop=obj.offsetTop;while(obj=obj.offsetParent){curleft+=obj.offsetLeft;curtop+=obj.offsetTop;}}
return[curleft,curtop];});elation.extend('html.preloader',function(elements,args){this.elements=elements;this.args=args||{timeout:2000,callback:false};this.index=0;this.init=function(){for(var i=0;i<this.elements.length;i++){if(this.elements[i].complete)
this.index++;else
elation.events.add(this.elements[i],'load',this);}
if(!this.validate())
(function(self){self.timer=setTimeout(function(){if(!self.items){console.log('2s timeout reached, forcing load.');self.done();}},self.args.timeout||2000);})(this);}
this.load=function(event,target){elation.events.fire('preloader_load',this);this.validate(true);}
this.validate=function(increment){if(increment)this.index++;if(this.index==this.elements.length){this.done();return true;}
return false;}
this.done=function(){(function(self){setTimeout(function(){elation.events.fire('preloader_done',self);},1);})(this);if(typeof this.args.callback=='function')
this.args.callback();clearTimeout(this.timer);}
this.handleEvent=function(event){var event=event||window.event,target=elation.events.getTarget(event),type=event.type=='DOMMouseScroll'?'mousewheel':event.type;if(typeof this[type]=='function')
return this[type](event,target);}
this.init();});elation.extend("html.hasclass",function(element,className){if(element&&element.className){var re=new RegExp("(^| )"+className+"( |$)","g");return element.className.match(re);}});elation.extend("html.addclass",function(element,className){if(element&&!elation.html.hasclass(element,className)){element.className+=(element.className?" ":"")+className;}});elation.extend("html.removeclass",function(element,className){var re=new RegExp("(^| )"+className+"( |$)","g");if(element&&element.className&&element.className.match(re)){element.className=element.className.replace(re," ");}});elation.extend("html.toggleclass",function(element,className){if(this.hasclass(element,className))
this.removeclass(element,className)
else
this.addclass(element,className);});elation.extend("html.hasClass",elation.html.hasclass);elation.extend("html.addClass",elation.html.addclass);elation.extend("html.removeClass",elation.html.removeclass);elation.extend("html.toggleClass",elation.html.toggleclass);elation.extend('html.create',function(parms,classname,style,additional,append,before){if(typeof parms=='object')
var tag=parms.tag||'div',id=parms.id,classname=parms.classname,style=parms.style,additional=parms.attributes,append=parms.append,before=parms.before;var element=document.createElement(tag||parms);if(id)
element.id=id;if(classname)
element.className=classname;if(style)
for(var property in style)
element.style[property]=style[property];if(additional)
for(var property in additional)
element[property]=additional[property];if(append)
if(before)
append.insertBefore(element,before);else
append.appendChild(element);return element;});elation.extend('html.getscroll',function(shpadoinkle){if(elation.iphone&&elation.iphone.scrollcontent)
var pos=[0,0];else if(typeof pageYOffset!='undefined')
var pos=[pageXOffset,pageYOffset];else
var QuirksObj=document.body,DoctypeObj=document.documentElement,element=(DoctypeObj.clientHeight)?DoctypeObj:QuirksObj,pos=[element.scrollLeft,element.scrollTop];switch(shpadoinkle){case 0:return pos[0];case 1:return pos[1];default:return[pos[0],pos[1]];}});elation.extend("html.get_scroll",elation.html.getscroll);elation.extend("html.getScroll",elation.html.getscroll);elation.extend("html.styleget",function(el,styles){if(typeof styles=='string'){styles=[styles];}
var ret={};var computed=window.getComputedStyle(el,null);for(var k=0;k<styles.length;k++){for(var i=computed.length;i--;){var property=elation.utils.camelize(computed[i]);if(property.indexOf(styles[k])>-1){ret[property]=computed[property];}}}
return ret;});elation.extend("html.stylecopy",function(dst,src,styles){if(typeof styles=='string'){styles=[styles];}
var computed=window.getComputedStyle(src,null);for(var k=0;k<styles.length;k++){for(var i=computed.length;i--;){var property=elation.utils.camelize(computed[i]);if(property.indexOf(styles[k])>-1){dst.style[property]=computed[property];}}}});elation.extend("utils.iniframe",function(){try{return window.self!==window.top;}catch(e){return true;}});elation.extend("utils.camelize",function(text){return text.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():'';});});elation.extend("utils.isElement",function(obj){try{return obj instanceof HTMLElement;}
catch(e){return(typeof obj==="object")&&(obj.nodeType===1)&&(typeof obj.style==="object")&&(typeof obj.ownerDocument==="object");}});elation.extend("utils.encodeURLParams",function(obj){var value,ret='';if(typeof obj=="string"){ret=obj;}else{var flattened=elation.utils.flattenURLParams(obj);for(var key in flattened){if(typeof flattened[key]!='undefined'){ret+=(ret!=''?'&':'')+key+'='+encodeURIComponent(flattened[key]);}}}
return ret;});elation.extend("utils.decodeURLParams",function(parms){var value,ret={};if(typeof parms=="object"){ret=parms;}else if(parms){var properties=parms.split('&');for(var i=0;i<properties.length;i++){var property=properties[i],split=property.split('='),key=split[0],value=split[1];ret[key]=value;}}
return ret;});elation.extend("utils.flattenURLParams",function(obj,prefix){var ret={};for(var k in obj){var key=(prefix?prefix+'['+k+']':k);if(typeof obj[k]=='object'){var flattened=elation.utils.flattenURLParams(obj[k],key);elation.utils.merge(flattened,ret);}else{ret[key]=obj[k];}}
return ret;});elation.extend("utils.parseURL",function(str){var ret={uri:str,args:{}};var hashparts=str.split('#');var parts=hashparts[0].split("?");if(parts[0]){var fileparts=parts[0].split(/:\/\//,2);if(fileparts[1]){ret.scheme=fileparts[0];if(fileparts[1][0]=='/'){ret.host=document.location.host;ret.path=fileparts[1];}else{var pathparts=fileparts[1].split("/");ret.host=pathparts.shift();ret.path='/'+pathparts.join("/");}}else{ret.scheme=document.location.protocol.slice(0,-1);ret.host=document.location.host;ret.path=fileparts[0];}}
if(parts[1]){var args=parts[1].split("&");ret.args={};for(var i=0;i<args.length;i++){var argparts=args[i].split("=",2);ret.args[argparts[0]]=decodeURIComponent(argparts[1]);}}
if(hashparts[1]){var hashargs=hashparts[1].split("&");ret.hashargs={};for(var i=0;i<hashargs.length;i++){var hashargparts=hashargs[i].split("=",2);ret.hashargs[hashargparts[0]]=decodeURIComponent(hashargparts[1]);}}
return ret;});elation.extend("utils.makeURL",function(obj){var argstr=elation.utils.encodeURLParams(obj.args);return obj.scheme+"://"+obj.host+obj.path+(argstr?'?'+argstr:'');});elation.extend("utils.friendlyurl",new function(){this.encodemap={"_":"//","/":"_","+":"&&","&":"+","-":"~"," ":"-","\"":"%22","'":"%27"};this.decodemap={};(function(self){var keys=[];for(var k in self.encodemap){keys.unshift(k);}
for(var i=0;i<keys.length;i++){self.decodemap[self.encodemap[keys[i]]]=keys[i];}})(this)
this.encode=function(str){var ret=str;if(typeof str=='string'){for(var k in this.encodemap){ret=ret.replace(elation.utils.regexp.get(k,"g",true),this.encodemap[k]);}}
return ret;}
this.decode=function(str){var ret=str;if(typeof str=='string'){for(var k in this.decodemap){ret=ret.replace(elation.utils.regexp.get(k,'g',true),this.decodemap[k]);}}
return ret;}});elation.extend("utils.merge",function(entities,mergeto){if(typeof entities=='object'){if(typeof mergeto=='undefined'||mergeto===null)mergeto={};for(var i in entities){if(entities[i]!==null){if(entities[i]instanceof Array){if(mergeto[i]instanceof Array){mergeto[i]=mergeto[i].concat(entities[i]);}else{mergeto[i]=entities[i];}}else if(entities[i]instanceof Object){if(mergeto[i]instanceof Object){elation.utils.merge(entities[i],mergeto[i]);}else{mergeto[i]=entities[i];}}else{mergeto[i]=entities[i];}}}}
return mergeto;});elation.extend("utils.array_merge",function(){var args=Array.prototype.slice.call(arguments),argl=args.length,arg,retObj={},k='',argil=0,j=0,i=0,ct=0,toStr=Object.prototype.toString,retArr=true;for(i=0;i<argl;i++){if(toStr.call(args[i])!=='[object Array]'){retArr=false;break;}}
if(retArr){retArr=[];for(i=0;i<argl;i++){retArr=retArr.concat(args[i]);}
return retArr;}
for(i=0,ct=0;i<argl;i++){arg=args[i];if(toStr.call(arg)==='[object Array]'){for(j=0,argil=arg.length;j<argil;j++){retObj[ct++]=arg[j];}}
else{for(k in arg){if(arg.hasOwnProperty(k)){if(parseInt(k,10)+''===k){retObj[ct++]=arg[k];}
else{retObj[k]=arg[k];}}}}}
return retObj;});elation.extend("utils.array_merge_recursive",function(arr1,arr2){var idx='';if(arr1&&Object.prototype.toString.call(arr1)==='[object Array]'&&arr2&&Object.prototype.toString.call(arr2)==='[object Array]'){for(idx in arr2){arr1.push(arr2[idx]);}}else if((arr1&&(arr1 instanceof Object))&&(arr2&&(arr2 instanceof Object))){for(idx in arr2){if(idx in arr1){if(typeof arr1[idx]==='object'&&typeof arr2==='object'){arr1[idx]=elation.utils.array_merge(arr1[idx],arr2[idx]);}else{arr1[idx]=arr2[idx];}}else{arr1[idx]=arr2[idx];}}}
return arr1;});elation.extend("utils.arrayset",function(obj,element,value){var ptr=obj;var x=element.split(".");for(var i=0;i<x.length-1;i++){if(ptr==null||(typeof ptr[x[i]]!='array'&&typeof ptr[x[i]]!='object'&&i!=x.length-1)){ptr[x[i]]={};}
ptr=ptr[x[i]];}
if(typeof ptr=="object"){ptr[x[x.length-1]]=value;}});elation.extend("utils.arrayget",function(obj,name){var ptr=obj;var x=name.split(".");for(var i=0;i<x.length;i++){if(ptr==null||(typeof ptr[x[i]]!='array'&&typeof ptr[x[i]]!='object'&&i!=x.length-1)){ptr=null;break;}
ptr=ptr[x[i]];}
return(typeof ptr=="undefined"?null:ptr);});elation.extend("utils.arraymin",function(array){var value=ret=0;for(var i=total=0;i<array.length;i++){value=array[i];if(ret==0||value<ret)
ret=value;}
return ret;});elation.extend("utils.arraymax",function(array){var value=ret=0;for(var i=total=0;i<array.length;i++){value=array[i];if(value>ret)ret=value;}
return ret;});elation.extend("utils.arrayavg",function(array){return(elation.utils.arraysum(array)/array.length);});elation.extend("utils.arraysum",function(array){for(var i=total=0;i<array.length;i++)
total+=array[i];return total;});elation.extend("utils.isnode",function(obj){return(typeof Node==="object"?obj instanceof Node:typeof obj==="object"&&typeof obj.nodeType==="number"&&typeof obj.nodeName==="string");});elation.extend("utils.iselement",function(obj){return(typeof HTMLElement==="object"?obj instanceof HTMLElement:typeof obj==="object"&&obj.nodeType===1&&typeof obj.nodeName==="string");});elation.extend("utils.isTrue",function(obj){if(obj==true||obj=='true')
return true;return false;});elation.extend("utils.isNull",function(obj){if(obj==null||typeof obj=='undefined')
return true;return false;});elation.extend("utils.isEmpty",function(obj){if(obj!==null&&obj!==""&&obj!==0&&typeof obj!=="undefined"&&obj!==false)
return false;return true;});elation.extend("utils.isEmptyObj",function(obj){for(var key in obj){if(obj.hasOwnProperty(key))
return false;}
return true;});elation.extend("utils.isArray",function(obj){var objclass=Object.prototype.toString.call(obj),allow={'[object Array]':true,'[object NodeList]':true,'[object HTMLCollection]':true};if(elation.browser.type=='msie'&&objclass=='[object Object]'){return!elation.utils.isNull(elation.utils.arrayget(obj,'length'));}else{return allow[objclass]||false;}});elation.extend("utils.getFirstChild",function(obj,tag,className){for(var i=0;i<obj.childNodes.length;i++)
if(obj.childNodes[i].nodeName==tag.toUpperCase())
if(className&&elation.html.hasclass(obj,className))
return obj.childNodes[i];else if(!className)
return obj.childNodes[i];return null;});elation.extend("utils.getLastChild",function(obj,tag,className){for(var i=obj.childNodes.length-1;i>=0;i--)
if(obj.childNodes[i].nodeName==tag.toUpperCase())
if(className&&elation.html.hasclass(obj,className))
return obj.childNodes[i];else if(!className)
return obj.childNodes[i];return null;});elation.extend("utils.getAll",function(obj,tag,className){var ret=[],all=obj.getElementsByTagName(tag);for(var i=0;i<all.length;i++)
if(className&&elation.html.hasclass(all[i],className))
ret.push(all[i]);else if(!className)
ret.push(all[i]);return ret;});elation.extend("utils.getOnly",function(obj,tag,className){if(!obj||!tag)
return;var ret=[];for(var i=0;el=obj.childNodes[i];i++)
if(el.nodeName==tag.toUpperCase()){if(className&&elation.html.hasclass(el,className))
ret.push(el);else if(!className)
ret.push(el);}
return ret;});elation.extend("utils.getParent",function(element,tag,classname,all_occurrences){var ret=[];if(typeof classname!='string'&&elation.utils.isTrue(classname))
all_occurances=true;while(element&&element.nodeName!='BODY'){if(element.nodeName==tag.toUpperCase()&&(!classname||elation.html.hasclass(element,classname))){if(all_occurrences)
ret.push(element);else
return element;}
element=element.parentNode;}
return(ret.length==0?false:ret);});elation.extend("utils.isin",function(parent,element){if(!parent||!element)
return false;while(!elation.utils.isNull(element)&&element!=parent&&element!=document.body)
element=element.parentNode;return(parent==element);});elation.extend("utils.indexOf",function(array,object){if(typeof array=='string')
array=array.split("");for(var i=0;i<array.length;i++){if(array[i]===object){return i;}}
return-1;});elation.extend("utils.nativeValidate",function(object){var ret={};for(var key in object){if(typeof object[key]!='function'&&typeof object[key]!='object')
ret[key]=object[key];}
return ret;});elation.extend("utils.stringify",function(parms){var value,ret='';for(var key in parms){value=parms[key];ret+=key+'='+value+'&';}
return ret.substr(0,ret.length-1);});elation.extend("utils.htmlentities",function(string,quote_style){var histogram={},symbol='',tmp_str='',entity='';tmp_str=string.toString();if(false===(histogram=elation.utils.get_html_translation_table('HTML_ENTITIES',quote_style))){return false;}
for(symbol in histogram){entity=histogram[symbol];tmp_str=tmp_str.split(symbol).join(entity);}
return tmp_str;});elation.extend("utils.get_html_translation_table",function(table,quote_style){var entities={},histogram={},decimal=0,symbol='';var constMappingTable={},constMappingQuoteStyle={};var useTable={},useQuoteStyle={};useTable=(table?table.toUpperCase():'HTML_SPECIALCHARS');useQuoteStyle=(quote_style?quote_style.toUpperCase():'ENT_COMPAT');constMappingTable[0]='HTML_SPECIALCHARS';constMappingTable[1]='HTML_ENTITIES';constMappingQuoteStyle[0]='ENT_NOQUOTES';constMappingQuoteStyle[2]='ENT_COMPAT';constMappingQuoteStyle[3]='ENT_QUOTES';if(!isNaN(useTable)){useTable=constMappingTable[useTable];}
if(!isNaN(useQuoteStyle)){useQuoteStyle=constMappingQuoteStyle[useQuoteStyle];}
if(useTable=='HTML_SPECIALCHARS'){entities['38']='&amp;';if(useQuoteStyle!='ENT_NOQUOTES'){entities['34']='&quot;';}
if(useQuoteStyle=='ENT_QUOTES'){entities['39']='&#039;';}
entities['60']='&lt;';entities['62']='&gt;';}else if(useTable=='HTML_ENTITIES'){entities['38']='&amp;';if(useQuoteStyle!='ENT_NOQUOTES'){entities['34']='&quot;';}
if(useQuoteStyle=='ENT_QUOTES'){entities['39']='&#039;';}
entities['60']='&lt;';entities['62']='&gt;';entities['160']='&nbsp;';entities['161']='&iexcl;';entities['162']='&cent;';entities['163']='&pound;';entities['164']='&curren;';entities['165']='&yen;';entities['166']='&brvbar;';entities['167']='&sect;';entities['168']='&uml;';entities['169']='&copy;';entities['170']='&ordf;';entities['171']='&laquo;';entities['172']='&not;';entities['173']='&shy;';entities['174']='&reg;';entities['175']='&macr;';entities['176']='&deg;';entities['177']='&plusmn;';entities['178']='&sup2;';entities['179']='&sup3;';entities['180']='&acute;';entities['181']='&micro;';entities['182']='&para;';entities['183']='&middot;';entities['184']='&cedil;';entities['185']='&sup1;';entities['186']='&ordm;';entities['187']='&raquo;';entities['188']='&frac14;';entities['189']='&frac12;';entities['190']='&frac34;';entities['191']='&iquest;';entities['192']='&Agrave;';entities['193']='&Aacute;';entities['194']='&Acirc;';entities['195']='&Atilde;';entities['196']='&Auml;';entities['197']='&Aring;';entities['198']='&AElig;';entities['199']='&Ccedil;';entities['200']='&Egrave;';entities['201']='&Eacute;';entities['202']='&Ecirc;';entities['203']='&Euml;';entities['204']='&Igrave;';entities['205']='&Iacute;';entities['206']='&Icirc;';entities['207']='&Iuml;';entities['208']='&ETH;';entities['209']='&Ntilde;';entities['210']='&Ograve;';entities['211']='&Oacute;';entities['212']='&Ocirc;';entities['213']='&Otilde;';entities['214']='&Ouml;';entities['215']='&times;';entities['216']='&Oslash;';entities['217']='&Ugrave;';entities['218']='&Uacute;';entities['219']='&Ucirc;';entities['220']='&Uuml;';entities['221']='&Yacute;';entities['222']='&THORN;';entities['223']='&szlig;';entities['224']='&agrave;';entities['225']='&aacute;';entities['226']='&acirc;';entities['227']='&atilde;';entities['228']='&auml;';entities['229']='&aring;';entities['230']='&aelig;';entities['231']='&ccedil;';entities['232']='&egrave;';entities['233']='&eacute;';entities['234']='&ecirc;';entities['235']='&euml;';entities['236']='&igrave;';entities['237']='&iacute;';entities['238']='&icirc;';entities['239']='&iuml;';entities['240']='&eth;';entities['241']='&ntilde;';entities['242']='&ograve;';entities['243']='&oacute;';entities['244']='&ocirc;';entities['245']='&otilde;';entities['246']='&ouml;';entities['247']='&divide;';entities['248']='&oslash;';entities['249']='&ugrave;';entities['250']='&uacute;';entities['251']='&ucirc;';entities['252']='&uuml;';entities['253']='&yacute;';entities['254']='&thorn;';entities['255']='&yuml;';}else{throw Error("Table: "+useTable+' not supported');return false;}
for(decimal in entities){symbol=String.fromCharCode(decimal);histogram[symbol]=entities[decimal];}
return histogram;});if(typeof window.JSON=='undefined'){window.JSON=function(){function f(n){return n<10?'0'+n:n;}Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}return'\\u'+('0000'+(+(a.charCodeAt(0))).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}return{stringify:function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+(+(a.charCodeAt(0))).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');}};}();}
elation.extend('JSON',new function(){this.parse=function(text){return this.JSON(['decode','parse'],text);}
this.stringify=function(text,ignore_errors){return this.JSON(['encode','stringify'],text,ignore_errors);}
this.JSON=function(parms,text,ignore_errors){if(typeof text!='string'&&elation.utils.isEmptyObj(text))
return;var key=(typeof JSON[parms[0]]=='function'?parms[0]:parms[1]);if(typeof JSON[key]=='function'){return JSON[key](text,(ignore_errors?function(key,value){console.log(key,value,typeof(value));if(typeof key=='object'){return'object not copied';}
else{return value;}}:null));}}});elation.extend('cookie',{set:function(parms,value,expires,domain,secure,path,date){name=parms.name||parms;expires=parms.expires||expires||'';domain=parms.domain||domain||'';secure=parms.secure||secure||'';path=parms.path||path||'/';date=parms.date||new Date();if(date instanceof Date)
date=date.getDate()+"/"+(date.getMonth()+1)+"/"+(date.getFullYear()+1);var curCookie=name+"="+escape(value)+"; expires="+date+" 00:00:00"+
((path)?"; path="+path:"")+
((domain)?"; domain="+domain:"")+
((secure)?"; secure":"");document.cookie=curCookie;return curCookie;},get:function(name){var theCookies=document.cookie.split(/[; ]+/);for(var i=0;i<theCookies.length;i++){var aName=theCookies[i].substring(0,elation.utils.indexOf(theCookies[i],'='));if(aName==name)
return theCookies[i];}}});elation.extend("url",function(hash){this.hash={};var hash=hash||window.location.hash;if(hash)
hash=hash.split('#')[1].split('&');for(var i=0;i<hash.length;i++){var parm=hash[i].split('=');this.hash[parm[0]]=parm[1];}
return this.hash;});elation.extend("id",function(id){return elation.find(id,true);});elation.extend("find",function(selectors,parent,first){this.findCore=function(selectors,oparent){if(!selectors)
return;var selectors=selectors.split(','),elements=[],selector,section,tag,tags,classname,isParent,parent,parents;for(var s=0;s<selectors.length;s++){parent=oparent||document.getElementsByTagName('BODY')[0];parents=[parent];section=selectors[s].split(' ');for(var p=0;parent=parents[p];p++){for(var q=0;q<section.length;q++){isParent=(q=section.length-1);id=section[q].split('#');selector=section[q].split('.');tag=selector[0]||'*';tags=parent.getElementsByTagName(tag);classname=selector.length>1?selector[1]:false;if(id.length>1){elements.push(document.getElementById(id[1]));continue;}
for(var i=0;i<tags.length;i++){if(classname){if(elation.html.hasclass(tags[i],classname))
if(isParent)
parents.push(tags[i]);else
elements.push(tags[i]);}else
if(isParent)
parents.push(tags[i]);else
elements.push(tags[i]);}}}}
return elements;}
var result;if(elation.utils.isTrue(parent)){first=true;parent=null;}
if(document.querySelectorAll)
result=(parent&&(typeof parent.length=='undefined'||parent.length!=0))?parent.querySelectorAll(selectors):document.querySelectorAll(selectors);else
result=this.findCore(selectors,parent);if(first&&(typeof result=='object'||typeof result=='function'))
if(result.length>0)
result=result[0];else
result=null;return result;});elation.extend('file.get',function(type,file,func){if(!type||!file)
return false;var head=document.getElementsByTagName("HEAD")[0],element=document.createElement((type=='javascript'?"SCRIPT":"LINK"));if(type=='javascript'){element.type="text/javascript";element.src=file;}else{element.type="text/css";element.rel="stylesheet";element.href=file;}
if(func)
element.onload=func;head.appendChild(element);return element;});elation.extend('file.batch',function(){this.callbacks=[];this.files=[];this.add=function(url,type,component){if(typeof url=='string'){var dependency=elation.file.dependencies.add(url,this,type,component)
if(dependency)
this.files.push(dependency);}}
this.callback=function(script){this.callbacks.push(script);this.done(true);}
this.done=function(url){if(url)
for(var i=0;i<this.files.length;i++)
if(!this.files[i].loaded&&this.files[i].type!='css')
return;for(var i=0;i<this.callbacks.length;i++)
switch(typeof this.callbacks[i]){case"string":eval(this.callbacks[i]);break;case"function":this.callbacks[i]();break;}
this.callbacks=[];}});elation.extend('file.dependencies',new function(){this.host='';this.files={};this.registered={javascript:{},css:{}};this.waiting={javascript:{},css:{}};this.register=function(sFile,check,type){var type=type||'javascript',registered=this.registered[type],waiting=this.waiting[type];if(registered[sFile])
return;if(typeof check=='undefined')
check=true;registered[sFile]=true;if(waiting[sFile]){var url=waiting[sFile],file=this.files[url],components=this.getComponents(url);delete waiting[sFile];this.checkWaiting(file,components,type);}}
this.registerMany=function(components,type){for(var k in components)
if(components.hasOwnProperty(k)&&components[k].length>0)
for(var i=0;i<components[k].length;i++)
if(components[k][i]!=null)
this.register(k+'.'+components[k][i],false,type);}
this.checkWaiting=function(file,components,type){var type=type||'javascript',waiting=this.waiting[type],flag=true;for(var i=0;i<components.length;i++){if(waiting[components[i]]){flag=false;break;}}
if(flag)
this.done(file);}
this.getComponents=function(url){var ret=[],url=url.split('?'),page=url[0],parms=url.length>1?url[1].split('&'):[];for(var i=0;i<parms.length;i++){var parm=parms[i].split('='),files=parm[1].split('+');for(var f=0;f<files.length;f++){file=parm[0]+'.'+files[f];ret.push(file);}}
return ret;}
this.wait=function(url,type){var type=type||'javascript',registered=this.registered[type],waiting=this.waiting[type],components=this.getComponents(url);for(var i=0;i<components.length;i++)
if(!registered[components[i]])
waiting[components[i]]=true;url=this.url(waiting);for(var key in waiting)
waiting[key]='/'+(type=='css'?'css':'scripts')+'/main'+url;return url;}
this.url=function(oParms){var parms={},ret='';for(var key in oParms){parm=key.split('.');if(!parms[parm[0]])
parms[parm[0]]=[];parms[parm[0]].push(parm[1]);}
for(var key in parms){ret+=(ret==''?'?':'&')+key+'=';for(var i=0;i<parms[key].length;i++){ret+=parms[key][i]+(i==parms[key].length-1?'':'+');}}
if(ret.indexOf("=")<0)
ret='';return ret;}
this.done=function(oFile){if(typeof oFile!='undefined'){oFile.loaded=true;if(oFile.batch)
oFile.batch.done(oFile.url);}}
this.add=function(url,batch,type,component){var file=this.files[url]||{},type=type||'javascript';if(!elation.utils.isNull(file.url)){if(batch){batch.done(url);return file;}}
if(component||type=='css'){url=this.wait(url,type);if(url)
url='/'+(type=='css'?'css':'scripts')+'/main'+url;else
return false;}
file.batch=batch;file.loaded=false;file.url=url;file.type=type;file.element=elation.file.get(type,this.host+url,((component)?null:(function(self){self.done(file);})(this)));this.files[url]=file;return file;}});elation.extend('ui.gradient',function(element,first,last){switch(elation.browser.type){case"msie":element.style.filter="progid:DXImageTransform.Microsoft.gradient(startColorstr='"+first+"', endColorstr='"+last+"')";break;case"safari":element.style.cssText="background:-webkit-gradient(linear, left top, left bottom, from("+first+"), to("+last+"));";break;case"firefox":element.style.cssText="background:-moz-linear-gradient(top, "+first+", "+last+");";break;}});elation.extend('ui.getCaretPosition',function(oField){var iCaretPos=0;if(document.selection){oField.focus();var oSel=document.selection.createRange();oSel.moveStart('character',-oField.value.length);iCaretPos=oSel.text.length;}
else if(oField.selectionStart||oField.selectionStart=='0')
iCaretPos=oField.selectionStart;return iCaretPos;});elation.extend('ui.setCaretPosition',function(oField,iCaretPos){if(document.selection){oField.focus();var oSel=document.selection.createRange();oSel.moveStart('character',-oField.value.length);oSel.moveStart('character',iCaretPos);oSel.moveEnd('character',0);oSel.select();}
else if(oField.selectionStart||oField.selectionStart=='0'){oField.selectionStart=iCaretPos;oField.selectionEnd=iCaretPos;oField.focus();}});elation.extend('ui.combobox',function(parent,callback){this.visible=false;this.parent=parent;this.callback=callback;this.init=function(){var selects=elation.find("select.tf_search_input_sub_navigation",this.parent),select,dim,combobox,label,button,ul,lis,img,option,actions,options;for(var i=0;i<selects.length;i++){select=selects[i];options=[];combobox=this.combobox=elation.html.create({tag:'div',classname:'tf_combobox',append:select.parentNode,before:select});label=this.label=elation.html.create({tag:'div',classname:'tf_combobox_label',append:combobox});button=this.button=elation.html.create({tag:'div',classname:'tf_combobox_button',append:combobox});img=elation.html.create({tag:'div',classname:'tf_combobox_image',append:button});ul=this.ul=elation.html.create({tag:'ul',classname:'tf_combobox_options',append:combobox});label.innerHTML=select.options[select.selectedIndex].innerHTML;for(var s=0;s<select.options.length;s++){option=select.options[s];li=elation.html.create({tag:'li',classname:'tf_combobox_option',append:ul,attributes:{innerHTML:option.innerHTML}});options.push({li:li,label:option.innerHTML,value:option.value});}
this.options=options;this.actions=actions;this.ul.style.display='block';this.height=this.ul.offsetHeight;this.ul.style.display='none';elation.events.add(combobox,'click',this);select.parentNode.removeChild(select);}}
this.show=function(){this.visible=true;elation.html.addclass(this.button,'selected');$TF(this.ul).css({display:'block',height:0}).animate({height:this.height+'px'},150,"easein");}
this.hide=function(){this.visible=false;elation.html.removeclass(this.button,'selected');(function(self){$TF(self.ul).animate({height:0},200,"easeout",function(){self.ul.style.display='none';});})(this);}
this.toggle=function(target){this.visible?this.hide():this.show();if(target.nodeName=='LI')
this.callback(target,this);}
this.handleEvent=function(event){var type=event.type||window.event,target=event.target||event.srcElement;switch(type){case'click':this.toggle(target);break;case'mouseover':break;case'mouseout':break;}}
this.init();});elation.extend('ui.infoboxes.infobox_stores',function(){$TF.get("/facebook/stores_match.html",function(html){elation.ui.lightbox.show(html);});});elation.extend('ui.infoboxes.tell_more_friends',function(){var callback=window.location.href;return elation.ui.lightbox.get("/facebook/tell_more_friends.snip","callback="+encodeURIComponent(callback));});elation.extend('ui.infoboxes.infobox_privacy_settings',function(){return elation.ui.lightbox.get("/user/privacy_settings.html");});elation.extend('ui.infoboxes.twitter_form',function(){var form=document.getElementById('tf_share_twitter'),item=elation.results.activeitem(),infobox=elation.ui.infobox.get('product_infocard'),href=window.location.href.split('#')[0],query=elation.searches.tf_search_examplesearch.args.query,shortHREF='';if(query){var message="\n\nI've searched for "+query+" on @TheFind. Look at these great products I found!";}else{var message="\n\nTake a look at these great results at TheFind.com";}
if(item&&infobox&&infobox.visible){href+='&ddkey='+item.ddkey;}
function setMessage(args){if(shortHREF){href=shortHREF;}
if(item&&infobox&&infobox.visible){message="I'm looking at "+item.title+", "+href+" on @TheFind.";form.msg.innerHTML=message;}
else{form.msg.innerHTML=href+message;}}
$TF.ajax({url:'/utils/shorturl.js',data:'url='+encodeURIComponent(href),dataType:'json',type:'GET',timeout:5000,success:function(data,textStatus){shortHREF=data.data.shorturl;setMessage();},error:function(XMLHttpRequest,textStatus,errorThrown){setMessage();}});});elation.extend('ui.infoboxes.email_form',function(args){var args=args||{},data=elation.user.user,to=document.getElementById('myfindsSendEmailToEmail'),from=document.getElementById('myfindsSendEmailFromEmail'),name=document.getElementById('myfindsSendEmailFromName'),msg=document.getElementById('myfindsSendEmailMessage'),url=window.location.href.split('#')[0]
sep=url.split('?').length>1?'&':'?';if(from&&data.email)
from.value=data.email;if(name&&data.nickname)
name.value=data.nickname;if(args.message){msg.value=args.message;}else if(msg){if(elation.utils.arrayget(args,"isproduct")){msg.value="I just discovered this product on TheFind and wanted to share it with you.\n\n"+url+sep+"ddkey="+elation.utils.arrayget(args,'ddkey')+"\n\n";}
else{msg.value="I just discovered these products on TheFind and wanted to share them with you.\n\n"+url+"\n\nCheck them out!";}}
if(to)
to.focus();});elation.extend('data',new function(){this.add=function(name,data){if(!this[name])
this[name]=[];for(var i=0;i<data.length;i++)
this[name].push(data[i]);}
this.find=function(name,path,value,get_all){if(elation.utils.isNull(this[name]))
return false;var ret=[];for(var i=0;i<this[name].length;i++){var item=this[name][i],property=elation.utils.arrayget(item,path);if(property==value)
ret.push(item);}
return(ret.length==0?false:get_all?ret:ret[0]);}});elation.extend('ui.hover',function(){this.init=function(element,mouseover,mouseout,alternate,click){if(!element||!mouseover||!mouseout)
return;this.element=element;this.mouseover=mouseover;this.mouseout=mouseout;this.click=click;this.alternate=alternate||element;elation.events.add(element,"mouseover,mouseout",this);if(click)
elation.events.add(this.alternate,"click",this);}
this.handleEvent=function(event){var event=this.event=event||window.event,target=this.target=event.target||event.srcElement,related=this.related=elation.events.getRelated(event);if(this.checkRelated(target,related))
return;switch(event.type){case"mouseover":this.mouseover();break;case"mouseout":this.mouseout();break;case"click":this.click();break;}}
this.checkRelated=function(target,related){while(!elation.utils.isNull(related)){if(related==this.element)
return true;related=related.parentNode;}
return false;}});elation.extend("utils.escapeHTML",function(str){var div=document.createElement('div');var text=document.createTextNode(str);div.appendChild(text);return div.innerHTML;});elation.extend('log.size',function(result_view_id,iFrame_visible,width,height){if(typeof result_view_id=='undefined')
result_view_id='';if(window.innerWidth)
var tr_width=window.innerWidth,tr_height=window.innerHeight;else
if(document.body.offsetWidth)
var tr_width=document.body.offsetWidth,tr_height=document.body.offsetHeight;if(elation.ajax){var url='/page/sizelog?width='+tr_width+'&height='+tr_height+'&result_view_id='+result_view_id+
(iFrame_visible?'&g_width='+width+'&g_height='+height:'');elation.ajax.Get(url);}});var tr_size=function(id){var bottom_ads=elation.id('#google-afs-google_pla_bottom');elation.log.interval=0;if(bottom_ads){var iframe=elation.utils.getOnly(bottom_ads,'iframe'),iframe=iframe.length>0?iframe[0]:false;$TF(document).ready(function(){elation.log.timer=setInterval(function(){var visible=iframe?iframe.style.visibility:false;elation.log.interval++;if(visible=='visible'||elation.log.interval>10||!iframe){clearInterval(elation.log.timer);var width=iframe?iframe.offsetWidth:0,height=iframe?iframe.offsetHeight:0;elation.log.size(id,(visible=='visible'&&height>10),width,height);}},250);});}else{elation.log.size(id);}};function any(){var arg;for(var i=0;i<arguments.length;i++){if(((arg=arguments[i])!==null)&&(arg!=="")&&(typeof arg!=="undefined"))return arg;}
return null;}
elation.extend('timing',function(boolSetOnInit){this.log=this.set;this.enabled=true;this.init=function(){this.l=[];this.i=0;}
this.set=function(boolClear){if(!this.enabled)
return;if(boolClear)
this.init();var i=this.i,l=this.l;l[i]=new Date();l[i].ms=(l[i].getSeconds()*1000)+l[i].getMilliseconds();this.i++;}
this.get=function(log){if(log)
this.set();var l=this.l,diff=l[l.length-1]-l[0];return diff;}
this.print=function(strLabel,boolSetBeforePrint,boolUseAlert){if(!this.enabled)
return;if(boolSetBeforePrint)
this.set();var l=this.l,prefix=strLabel?strLabel:'timing',times='',debug='';for(var i=0;i<this.i;i++)
if(i>0)
times+=(l[i]-l[(i-1)])+'ms, ';if(i==2)
debug=prefix+': '+(l[l.length-1]-l[0])+'ms';else
debug=prefix+': '+times+'total('+(l[l.length-1]-l[0])+'ms)';if(boolUseAlert)
alert(debug);else
console.log(debug);return l[l.length-1]-l[0];}
if(boolSetOnInit)
this.set(true);});elation.extend("utils.regexp",new function(){this.specialchars=['/','.','*','+','?','|','(',')','[',']','{','}','\\'];this.cache={'__regexp_escape':new RegExp('(\\'+this.specialchars.join('|\\')+')','g')}
this.escape=function(text){return text.replace(this.cache['__regexp_escape'],'\\$1');}
this.get=function(regstr,modifiers,escape){var regid=regstr+'|'+modifiers+(escape?'|escaped':'');if(!this.cache[regid]){this.cache[regid]=new RegExp((escape?elation.utils.regexp.escape(regstr):regstr),modifiers);}
return this.cache[regid];}});
elation.extend("events",{events:{},fire:function(type,data,target,element,fn){if(typeof type=='object'){data=elation.utils.arrayget(type,'data')||data;target=elation.utils.arrayget(type,'target')||target;element=elation.utils.arrayget(type,'element')||element;fn=elation.utils.arrayget(type,'fn')||fn;type=elation.utils.arrayget(type,'type');}
if(!type)
return false;var list=this.events[type],original_events=[],events=[],event;if(!list){this.events[type]=[];return;}
for(var i=0;i<list.length;i++){event=list[i];if(fn||element){if((fn&&event.origin==fn)||(element&&event.target==element)){original_events.push(event);}else{continue;}}else{original_events.push(event);}}
for(var i=0;i<original_events.length;i++){var eventObj=original_events[i];var event={type:type,target:(target?target:eventObj.target),data:(data?data:null),origin:eventObj.origin,custom_event:eventObj.custom_event,preventDefault:eventObj.preventDefault,cancelBubble:eventObj.cancelBubble,stopPropogation:eventObj.stopPropogation};if(!event.origin)
continue;if(typeof event.origin=='function'){event.origin(event);}else if(typeof event.origin.handleEvent!='undefined'){event.origin.handleEvent(event);}
events.push(event);}
return events;},register:function(types,fn,element){var types=types.split(','),type;for(var i=0;i<types.length;i++){type=types[i];if(!this.events[type])
if(fn||element)
this._register(element,type,fn);else
this.events[type]=[];}},unregister:function(element,type,fn){if(typeof element=='string'){var type=element,element=null;}
var events=this.events[type];if(element&&fn){for(var i in events){var item=events[i],target=item.target,origin=item.origin;if(element==target&&origin==fn)
events.splice(i,1);}}else if(element){for(var i in events){var item=events[i],target=item.target;if(element==target){events.splice(i,1);}}}else if(fn){for(var i in events){var item=events[i],origin=item.origin;if(origin==fn){events.splice(i,1);}}}else if(type){delete this.events[type];}},_register:function(element,type,fn,custom_event_name){if(custom_event_name)
custom_event_name=custom_event_name.replace('.','_');var event={type:type,target:element,origin:fn,custom_event:custom_event_name,preventDefault:function(){return;},cancelBubble:function(){return;},stopPropogation:function(){return;}};if(custom_event_name){if(!elation.events.events[custom_event_name])
elation.events.events[custom_event_name]=[];}
if(!elation.events.events[type])
elation.events.events[type]=[];elation.events.events[type].push(event);},add:function(elements,types,fn,custom_event_name){if(custom_event_name)
custom_event_name=custom_event_name.replace('.','_');if(!types||!fn||typeof types!="string")
return;var elements=elation.utils.isNull(elements)?[{}]:!elation.utils.isArray(elements)||elements==window?[elements]:elements,types=types.split(',');if(typeof fn=="string"){fn=(function(func){return function(ev){eval(func);};})(fn);}
for(var e=0;e<elements.length;e++){var element=elements[e];if(typeof element!='object')
continue;for(var i=0;i<types.length;i++){var type=types[i];elation.events._register(element,type,fn,custom_event_name);if(!element)
continue;if("addEventListener"in element){if(type=='mousewheel'&&elation.browser.type!='safari')
type='DOMMouseScroll';if(typeof fn=="object"&&fn.handleEvent){element[type+fn]=function(e){if(custom_event_name)
elation.events.fire({type:custom_event_name,data:fn});fn.handleEvent(e);}
element.addEventListener(type,element[(type+fn)],false);}else{element.addEventListener(type,fn,false);}}else if(element.attachEvent){if(typeof fn=="object"&&fn.handleEvent){element[type+fn]=function(){if(custom_event_name)
elation.events.fire({type:custom_event_name,data:fn});fn.handleEvent(elation.events.fix(window.event));}}else{element["e"+type+fn]=fn;element[type+fn]=function(){if(typeof element["e"+type+fn]=='function')
element["e"+type+fn](elation.events.fix(window.event));}}
element.attachEvent("on"+type,element[type+fn]);}}}
return this;},remove:function(elements,types,fn){if(!elements||!types||!fn||typeof types!="string")
return;var elements=(!elation.utils.isNull(elements.nodeName)||elements==window)?[elements]:elements,types=types.split(',');for(var e=0;e<elements.length;e++){var element=elements[e];if(typeof element!='object')
continue;for(var i=0;i<types.length;i++){var type=types[i];if(element.removeEventListener){if(typeof fn=="object"&&fn.handleEvent){element.removeEventListener(type,element[type+fn],false);delete element[type+fn];}else{element.removeEventListener(type,fn,false);}}else if(element.detachEvent){if(typeof element[type+fn]=="function")
element.detachEvent("on"+type,element[type+fn]);element[type+fn]=null;element["e"+type+fn]=null;}}}
return this;},fix:function(event){this.preventDefault=function(){this.returnValue=false;}
this.stopPropagation=function(){this.cancelBubble=true;}
event.preventDefault=this.preventDefault;event.stopPropagation=this.stopPropagation;return event;},getTarget:function(event){return window.event?event.srcElement:event.target;},getRelated:function(event){var reltg;if(event.relatedTarget){reltg=event.relatedTarget;}else{if(event.type=="mouseover")
reltg=event.fromElement;else if(event.type=="mouseout")
reltg=event.toElement;else
reltg=document;}
return reltg;},getEventTarget:function(event,parentClassName){var target;if(!event)
var event=window.event;if(event.target)
target=event.target;else if(event.srcElement)
target=event.srcElement;if(target.nodeType==3)
target=target.parentNode;if(parentClassName){var classUp,classDown;if(parentClassName.indexOf(">")){var classes=parentClassName.split(">",2);classDown=classes[0];classUp=classes[1];}else{classDown=parentClassName;}
while(!elation.html.hasclass(target,classDown)&&target.parentNode){target=target.parentNode;}
if(classUp){var elements;elements=elation.find("."+classUp,target);if(elements.length>0){target=elements[0];}}}
return target;},isTransition:function(ev,parent){var tg=this.getTarget(ev),reltg=this.getRelated(ev);return(elation.utils.isin(parent,tg)&&!elation.utils.isin(parent,reltg));},coords:function(event){var ttypes=['touchstart','touchmove','touchend'];if(elation.utils.indexOf(ttypes,event.type)>=0){var prop=event.type=='touchend'?'changedTouches':'touches',c={x:event[prop][0].pageX,y:event[prop][0].pageY};}else{var c={x:(event.pageX||(event.clientX+document.body.scrollLeft)),y:(event.pageY||(event.clientY+document.body.scrollTop))};}
return c;}});
elation.extend("browser",new function(){this.checkIt=function(string){this.place=detect.indexOf(string)+1;this.tmpstring=string;return this.place;}
var detect=navigator.userAgent.toLowerCase();if(this.checkIt('konqueror')){this.type="Konqueror";this.OS="Linux";}
else if(this.checkIt('iphone'))this.type="iphone"
else if(this.checkIt('android'))this.type="android"
else if(this.checkIt('safari'))this.type="safari"
else if(this.checkIt('omniweb'))this.type="omniweb"
else if(this.checkIt('opera'))this.type="opera"
else if(this.checkIt('webtv'))this.type="webtv";else if(this.checkIt('icab'))this.type="icab"
else if(this.checkIt('msie'))this.type="msie"
else if(this.checkIt('firefox'))this.type="firefox"
else if(!this.checkIt('compatible')){this.type="netscape"
this.version=detect.charAt(8);}
else this.type="unknown";if(!this.version)this.version=detect.charAt(this.place+this.tmpstring.length);if(!this.OS){if(this.checkIt('linux'))this.OS="linux";else if(this.checkIt('x11'))this.OS="unix";else if(this.checkIt('mac'))this.OS="mac"
else if(this.checkIt('win'))this.OS="windows"
else this.OS="unknown";}});if(typeof window.console=='undefined'){console=new function(){this.log=function(str){}}}
elation.extend("ajax",new function(){this.Queue=function(obj){if(elation.utils.arrayget(obj,'args'))
obj.args=(typeof FormData!='undefined'&&obj.args instanceof FormData?obj.args:elation.utils.encodeURLParams(obj.args));if(obj.constructor.toString().indexOf("Array")!=-1){for(var i=0;i<obj.length;i++){if(!obj[i].method)obj[i].method="GET";this.urlqueue.push(obj[i]);}}else{if(!obj.method)obj.method="GET";this.urlqueue.push(obj);}
if(this.xmlhttpReady())
this.Go();}
this.get=function(url,params,args){this.Get(url,params,args);}
this.post=function(form,params,args){this.Post(form,params,args);}
this.Get=function(url,params,args){if(params&&!(typeof FormData!='undefined'&&params instanceof FormData)){switch(typeof params){case'object':params=elation.utils.encodeURLParams(params);default:if(params[0]=='?'||params[0]=='&')
params=params.substr(1);url+=(url.indexOf('?')<0?'?':'&')+params;}}
var req=this.parseURL(url);this.ProcessRequest(req,args);}
this.Post=function(form,params,args){var req=this.parseForm(form);this.ProcessRequest(req,args);}
this.Inject=function(targetid,url,params,args){if(!args)
args={};args.callback=function(html){var destination=document.getElementById(targetid);if(destination)
destination.innerHTML=html;}
this.Get(url,params,args);}
this.ProcessRequest=function(req,args){if(typeof args!='undefined'){req.history=args.history||false;if(args.callback)
req.callback=args.callback;if(args.failurecallback)
req.failurecallback=args.failurecallback;if(args.timeout)
req.timeout=args.timeout;if(args.timeoutcallback)
req.timeoutcallback=args.timeoutcallback;}
this.Queue(req);}
this.Go=function(){if(this.urlqueue.length>0){ajaxlibobj=this.urlqueue.shift();if(!this._go(ajaxlibobj))
this.urlqueue.unshift(ajaxlibobj);}}
this.parseURL=function(turl){var ret=new Object();ret.method="GET";var url=new String(turl);if(url.indexOf("?")>0){ret.url=url.substr(0,url.indexOf("?"));ret.args=url.substr(url.indexOf("?")+1);}else{ret.url=url;ret.args="";}
return ret;}
this.parseForm=function(form){var ret=new Object();ret.method=(form.getAttribute("method")?form.getAttribute("method").toUpperCase():"GET");ret.url=form.getAttribute("action");ret.args="";for(var i=0;i<form.elements.length;i++){element=form.elements[i];var name=new String(element.name);if(name.length>0&&name!="undefined"&&element.value!="undefined"&&!element.disabled){if(element.type=="checkbox"){ret.args+="&"+escape(name)+"="+(element.checked?(element.getAttribute("value")?escape(element.value):1):0);}else if(element.type=="radio"){if(element.checked){ret.args+="&"+escape(name)+"="+escape(element.value);}}else{ret.args+="&"+escape(name)+"="+escape(element.value).replace(/\+/g,"%2B");}}}
return ret;}
this.xmlhttpReady=function(){if(this.xmlhttp.readyState>0&&this.xmlhttp.readyState<4){return false;}
return true;}
this.processResponse=function(responses,nobj){if(typeof ajaxlibobj=='undefined'){ajaxlibobj=nobj;}
if((typeof elation.search!='undefined'&&typeof elation.search.backbutton!='undefined')&&(typeof search!='undefined'&&search.urlhash)&&(typeof ajaxlibobj!='undefined'&&ajaxlibobj.url==''&&!elation.utils.isTrue(ajaxlibobj.ignore))){elation.search.backbutton.add(responses,ajaxlibobj);}
var common={inlinescripts:[],data:{},dependencies:{}};for(var i=0;i<responses.length;i++){var type=responses[i].type||'xhtml';if(typeof this.responsehandlers[type]=='function'){this.responsehandlers[type](responses[i],common);}else{console.log('No handler for type '+type);}}
var cssparms='',javascriptparms='';for(var key in common.dependencies.css){if(common.dependencies.css.hasOwnProperty(key)){if(common.dependencies.css[key].length>0){cssparms+=key+'='+common.dependencies.css[key].join('+')+'&';}}}
for(var key in common.dependencies.javascript){if(common.dependencies.javascript.hasOwnProperty(key)){if(common.dependencies.javascript[key].length>0){javascriptparms+=key+'='+common.dependencies.javascript[key].join('+')+'&';}}}
var batch=new elation.file.batch();if(cssparms.length>0)
batch.add('/css/main?'+cssparms.substr(0,cssparms.length-1),'css');if(javascriptparms.length>0)
batch.add('/scripts/main?'+javascriptparms.substr(0,javascriptparms.length-1),null,true);common.inlinescripts.push("elation.component.init();");var execute_scripts=function(){if(common.inlinescripts.length>0){var script_text='';for(var i=0;i<common.inlinescripts.length;i++){if(!common.inlinescripts[i]||typeof common.inlinescripts[i]=='undefined')
continue;else
script_text+=common.inlinescripts[i]+'\n';}
try{eval(script_text);}catch(e){try{batch.callback(script_text);}catch(e){console.log('-!- ajaxlib inlinescript warning: '+e.message);}}}}
execute_scripts();if(typeof ajaxlibobj!='undefined'&&ajaxlibobj.callback){try{elation.ajax.executeCallback(ajaxlibobj.callback,common.data);}catch(e){batch.callback(function(){elation.ajax.executeCallback(ajaxlibobj.callback,common.data);});}}}
var register_inline_scripts=function(common,element){var scripts=element.getElementsByTagName("SCRIPT");if(scripts.length>0){for(var i=0;i<scripts.length;i++){if(typeof scripts[i].text=='string'){common.inlinescripts.push(scripts[i].text);}else if(scripts[i].src){console.log('elation.ajax: found inline script with src parameter');}}}}
this.responsehandlers={'infobox':function(response,common){var content=response['_content'],name=response['name'],infobox;if(name&&content){infobox=elation.ui.infobox.get(name);if(infobox){infobox.ajax_continue(content);register_inline_scripts(common,infobox.elements.container);}}},'notify':function(response,common){var content=response['_content'],name=response['name'],infobox;elation.ui.notify.show(name,content);},'xhtml':function(response,common){if(response['target']&&response['_content']){var targetel=document.getElementById(response['target']);if(targetel){if(response['append']==1||response['append']=='true'){targetel.innerHTML+=response['_content'];}else{var infobox=elation.ui.infobox.target(targetel);if(infobox){infobox.animate_inject(response['_content'],targetel);}else if(targetel){try{targetel.innerHTML=response['_content'];}catch(e){console.log('ajaxlib injection error: '+e.message);}}}
register_inline_scripts(common,targetel);if(elation.ui&&elation.ui.infobox&&infobox&&infobox.args.reposition){common.inlinescripts.push("elation.ui.infobox.position('"+infobox.name+"', true);");}}}},'javascript':function(response,common){if(response['_content']){common.inlinescripts.push(response['_content']);}},'data':function(response,common){if(response['name']&&response['_content']){common.data[response['name']]=elation.JSON.parse(response['_content']);if(response['name']=='infobox.content'){var text=elation.JSON.parse(response['_content']),div=document.createElement('div');div.innerHTML=text;register_inline_scripts(common,div);var infobox=elation.ui.infobox.getCurrent();if(infobox&&infobox.args.reposition)
common.inlinescripts.push("elation.ui.infobox.position('"+infobox.name+"', true);");}}},'dependency':function(response,common){if(response['deptype']=='component'&&response['name']){var name=response['name'].split('.',2);if(name[0]&&response['subtypes']){var subtypes=response['subtypes'].split(',');for(var i=0;i<subtypes.length;i++){if(!common.dependencies[subtypes[i]])
common.dependencies[subtypes[i]]=[];if(!common.dependencies[subtypes[i]][name[0]])
common.dependencies[subtypes[i]][name[0]]=[];common.dependencies[subtypes[i]][name[0]].push(name[1]);}}}},'debug':function(response,common){if(response['_content']){var debugcontainer=document.getElementById('tf_debug_tab_logger');if(debugcontainer){debugcontainer.innerHTML+=response['_content'];}
if(typeof tf_debugconsole!='undefined')
tf_debugconsole.scrollToBottom();}},'args':function(response,common){},'options':function(response,common){},'tracking':function(response,common){}}
this.translateXML=function(dom){var ret=[];if(dom&&dom.childNodes){for(var i=0;i<dom.childNodes.length;i++){var res=dom.childNodes.item(i);if(res.nodeType==1){var newres={};for(var j=0;j<res.attributes.length;j++){newres[res.attributes[j].nodeName]=res.attributes[j].nodeValue;}
newres['_content']=(res.firstChild?res.firstChild.nodeValue:false);ret.push(newres);}}}
return ret;}
this._go=function(ajaxlibobj){var docroot=this.docroot;var xmlhttp=this.xmlhttp;var processResponse=this.processResponse;var timeouttimer=false;if(ajaxlibobj.history){this.setHistory(ajaxlibobj.args);if(this.iframe){this.iframe.src="/ajax-blank.htm?"+ajaxlibobj.args+"#"+ajaxlibobj.url;return;}}
if(!ajaxlibobj.cache&&!(typeof FormData!='undefined'&&ajaxlibobj.args instanceof FormData)){ajaxlibobj.args=(ajaxlibobj.args&&ajaxlibobj.args.length>0?ajaxlibobj.args+"&":"")+"_ajaxlibreqid="+(parseInt(new Date().getTime().toString().substring(0,10))+parseFloat(Math.random()));}
if(ajaxlibobj.timeout&&ajaxlibobj.timeoutcallback){timeouttimer=window.setTimeout(function(){ajaxlibobj.failurecallback=false;xmlhttp.abort();ajaxlibobj.timeoutcallback();},ajaxlibobj.timeout||5000);}
readystatechange=function(){if(xmlhttp.readyState==4){if(timeouttimer)
window.clearTimeout(timeouttimer);if(xmlhttp.status==200){if(xmlhttp.responseXML){var dom=xmlhttp.responseXML.firstChild;var results=[];if(typeof dom!='undefined'||dom!=null){processResponse.call(elation.ajax,elation.ajax.translateXML(dom),ajaxlibobj);}
if(ajaxlibobj.callback){try{elation.ajax.executeCallback(ajaxlibobj.callback,xmlhttp.responseText);}catch(e){console.log('ajax callback execution delayed: '+e.message);setTimeout(function(){elation.ajax.executeCallback(ajaxlibobj.callback,xmlhttp.responseText);},1000);}}}else if(xmlhttp.responseText){if(ajaxlibobj.callback){elation.ajax.executeCallback(ajaxlibobj.callback,xmlhttp.responseText);}}}else{if(ajaxlibobj.failurecallback){elation.ajax.executeCallback(ajaxlibobj.failurecallback);}}
setTimeout('elation.ajax.Go()',0);}}
try{switch(ajaxlibobj.method.toUpperCase()){case"POST":xmlhttp.open(ajaxlibobj.method,ajaxlibobj.url,true);if(typeof ajaxlibobj.contenttype=='undefined'){xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}else if(ajaxlibobj.contenttype!==false){xmlhttp.setRequestHeader('Content-Type',ajaxlibobj.contenttype);}
xmlhttp.setRequestHeader("X-Ajax","1");xmlhttp.onreadystatechange=readystatechange;if(ajaxlibobj.progress){xmlhttp.upload.onprogress=ajaxlibobj.progress;}
xmlhttp.send(ajaxlibobj.args);break;case"SCRIPT":var url=(ajaxlibobj.url.match(/^https?:/)?ajaxlibobj.url:this.host+ajaxlibobj.url);if(ajaxlibobj.args)url+='?'+elation.utils.encodeURLParams(ajaxlibobj.args);elation.file.get('javascript',url);break;case"IMAGE":var url=(ajaxlibobj.url.match(/^https?:/)?ajaxlibobj.url:this.host+ajaxlibobj.url),url=(ajaxlibobj.args?url+'?'+ajaxlibobj.args:url),img=elation.html.create({tag:'img',style:{visibility:'hidden',position:'absolute'},attributes:{src:url},append:document.body});elation.events.add(img,'load,error',function(event){document.body.removeChild(img);});break;default:xmlhttp.open(ajaxlibobj.method,ajaxlibobj.url+"?"+ajaxlibobj.args,true);xmlhttp.setRequestHeader("X-Ajax","1");xmlhttp.onreadystatechange=readystatechange;xmlhttp.send(null);break;}}catch(e){if(typeof console!='undefined'){console.log(e.stack);}
if(ajaxlibobj.failurecallback){elation.ajax.executeCallback(ajaxlibobj.failurecallback,e);}
return false;}
return true;}
this.setHistory=function(hash){this.docroot.location.hash=hash;this.lasthash=this.docroot.location.hash;}
this.checkHistory=function(){if(this.docroot.location.hash!=this.lasthash){this.processHash(this.docroot.location.hash);this.lasthash=this.docroot.location.hash;}}
this.processHash=function(hash){return false;var url=String(document.location);var url=elation.utils.parseURL(document.location.href);url.hash="";var hashparts=hash.split("&");for(var i=0;i<hashparts.length;i++){var argparts=hashparts[i].split("=");url.args[argparts[0]]=url.args[argparts[1]];}}
this.setLoader=function(target,img,text){if(!text)text="";if(e=document.getElementById(target)){e.innerHTML='<div style="text-align: center;">'+text+'<img src="'+img+'" alt="Loading..." /></div>';}}
this.getHTTPObject=function(){if(!this.xmlhttp){var xmlhttp=false;if(typeof ActiveXObject!='undefined'){try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(E){xmlhttp=false;}}}
if(!xmlhttp&&typeof XMLHttpRequest!="undefined"){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
this.xmlhttp=xmlhttp;}
return this.xmlhttp;}
this.getIFRAMEObject=function(iframeID){if(!this.iframe){return;var iframe,iframeDocument;if(document.createElement){try{var tempIFrame=document.createElement('iframe');tempIFrame.setAttribute('id',iframeID);tempIFrame.style.border='0px';tempIFrame.style.width='0px';tempIFrame.style.height='0px';iframe=document.body.appendChild(tempIFrame);if(document.frames){iframe=document.frames[iframeID];}}catch(ex){var iframeHTML='\<iframe id="'+iframeID+'"';iframeHTML+=' style="border:0px; width:0px; height:0px;"';iframeHTML+='><\/iframe>';document.body.innerHTML+=iframeHTML;iframe=new Object();iframe.document=new Object();iframe.document.location=new Object();iframe.document.location.iframe=document.getElementById(iframeID);iframe.document.location.replace=function(location){this.iframe.src=location;}}}
this.iframe=document.getElementById(iframeID);}
return this.iframe;}
this.executeCallback=function(){var args=[];for(var i=0;i<arguments.length;i++)
args[i]=arguments[i];var callback=args.shift();if(callback){if(callback.constructor.toString().indexOf("Array")!=-1&&callback.length==2){callback[1].apply(callback[0],args);}else{callback.apply(this,args);}}}
this.link=function(link,history){this.Get(link,null,{history:history});return false;}
this.form=function(form,history){this.Post(form,null,{history:history});return false;}
this.getHTTPObject();if(elation.browser.type=="msie"){this.getIFRAMEObject("hiddeniframe");}
this.lasthash="";this.urlqueue=new Array();this.docroot=document;this.host=document.location.protocol+'//'+document.location.host;});function ajaxLink(ajaxlib,link,history){elation.ajax.link(link,history);return false;}
function ajaxForm(ajaxlib,form,history){elation.ajax.form(form,history);return false;}
ajaxlib=elation.ajax;
elation.extend("upfront",new function(){this.initialized={};this.elements=[];this.init=function(classname,claimid){this.classname=classname;var elements=elation.find("A."+this.classname);if(elements.length>0){this.setResourceHostname(elements[0].href);(function(self,claimid){for(var i=0;i<elements.length;i++){if(!self.elementInitialized(elements[i])){self.elements.push(elements[i]);elation.events.add(elements[i],'click',function(ev){if(typeof elation.ui.infobox=='undefined'||!self.initialized[claimid]){var urlargs="claimid="+claimid;if(self.resourcehost&&!self.resourcehost.match(/upfront\.thefind\.com/)){urlargs+="&resourcehost="+encodeURIComponent(self.resourcehost);}
elation.ajax.Queue({method:"SCRIPT",url:"/upfront/badge.json",args:urlargs,callback:function(html){if(typeof html['infobox.content']!='undefined')
html=html['infobox.content'];self.initPopup(claimid,html);elation.ui.infobox.show("upfront_badge_"+claimid);}});}else{elation.ui.infobox.show("upfront_badge_"+claimid);}
ev.preventDefault();return false;});}}})(elation.upfront,claimid);}}
this.setResourceHostname=function(url){var re=new RegExp('^(http(?:s)?\://)([^/]+)','i');var scheme=(document.location.protocol||"http:")+"//";var hostname="upfront.thefind.com";var m=url.match(re);if(m){if(m[2]&&m[2]!="www.thefind.com")
hostname=m[2].toString();}
this.resourcehost=scheme+hostname;;elation.ajax.host=this.resourcehost;elation.file.dependencies.host=this.resourcehost;}
this.initPopup=function(claimid,content){if(!this.initialized[claimid]){if(elation.tplmgr&&elation.ui.infobox){this.initialized[claimid]=true;elation.tplmgr.Create('upfront.badge.border','<div id="tf_upfront_badge">(%$content)</div>');elation.tplmgr.Create('upfront.badge.closebutton','<div class="tf_upfront_badge_closebutton"><a href="#" class="tf_utils_infobox_close" onclick="elation.ui.infobox.hide(\'(%$name)\'); return false">X</a></div>');elation.tplmgr.Create('upfront.badge.content.'+claimid,content);elation.ui.infobox.add("upfront_badge_"+claimid,{ajax:false,event:'click',absolute:true,center:true,reposition:true,resizeclose:false,lightbox:false,width:'50em',border:'upfront.badge.border',titlebar:'upfront.badge.closebutton',content:'upfront.badge.content.'+claimid,scollTop:true,tail:false,bgcolor:'#fff',font:'Arial, sans-serif',ajaxmethod:'SCRIPT'},{claimid:claimid},'upfront.badge.content.'+claimid);}}}
this.elementInitialized=function(element){for(var i=0;i<this.elements.length;i++){if(this.elements[i]==element)
return true;}
return false;}});thefind={upfront:elation.upfront}
var scripts=document.getElementsByTagName("script");for(var i=0;i<scripts.length;i++){if(scripts[i].src.indexOf('upfront-badgeinit')!=-1){var src=scripts[i].innerHTML;if(src.length>0)
eval(src);break;}}
elation.extend("tplmgr",new function(){this.templates={};this.Create=function(tplname,tplstr){if(!this.templates[tplname]){this.SetTemplate(tplname,tplstr);}}
this.GetTemplate=function(tplname,tplobj){var ret="[Couldn't find template: '"+tplname+"']";if(typeof this.templates[tplname]!='undefined')
ret=this.templates[tplname].Map(tplobj);else
console.log('Template not found: '+tplname+' '+this.templates[tplname]);return ret;}
this.SetTemplate=function(tplname,tplstr){this.templates[tplname]=new elation.jstemplate(tplstr,this);}
this.HasTemplate=function(tplname){return(typeof this.templates[tplname]!='undefined');}
this.SetFunction=function(tplname,funcname,funcptr){var ret=false;if(typeof this.templates[tplname]!='undefined'){this.templates[tplname].tplfuncs[funcname]=funcptr;ret=true;}
return ret;}});elation.extend("jstemplate",function(tplstr,tplmgr){this.tplstr=tplstr;this.tplmgr=tplmgr;this.tplfuncs={};this.tplmodifiers={};this.state={};this._re=new RegExp(/\(%([^\)]+)\)/g);this.Map=function(obj){var ret=this.tplstr;var replaces=[];var allmatches=this.getMatches();for(var matchnum=0;matchnum<allmatches.length;matchnum++){var matches=allmatches[matchnum];var replace={key:matches[0]};if(matches[1].substr(0,1)=='$'){var varname=matches[1].substr(1);var modifiers=[];var i=matches[1].indexOf('|');if(i>0){modifiers=varname.substr(i).split(/\|/g);varname=varname.substr(0,i-1);}
replace.value=this.getObjectProperty(obj,varname);for(var i=0;i<modifiers.length;i++){var modname=modifiers[i];var modargs=[];var pos=modname.indexOf(':');if(pos>0){modargs=modname.substr(pos+1);modname=modname.substr(0,pos);}
if(typeof this.tplmodifiers[modname]=='function'){replace.value=this.tplmodifiers[modname](replace.value,modargs);}}}else{var action=matches[1];var args='';var i=action.indexOf(' ');if(i>0){var argsstr=action.substr(i+1);action=action.substr(0,i);args=this.parseActionArgs(argsstr);}
if(typeof this.tplfuncs[action]=='function'){replace.value=this.tplfuncs[action](this,obj,args);}else{replace.value="[jstpl error: no such function '"+action+"']";}}
replaces.push(replace);}
for(var i=0;i<replaces.length;i++){ret=ret.replace(replaces[i].key,(typeof replaces[i].value!='undefined'?replaces[i].value:''));}
ret=ret.replace(/\n/g,'\uffff').replace(/\(%\*.*?\*%\)/g,"").replace(/\uffff/g,'\n');return ret;}
this.getMatches=function(){if(!this._matches){this._matches=[];var match;while(match=this._re.exec(this.tplstr)){this._matches.push(match);}}
return this._matches;}
this.tplfuncs['printpre']=function(tpl,obj,args){var ret;if(tpl.tplmgr){var tplobj=tpl.getObjectProperty(obj,args.obj);console.log(tplobj);}
return ret;}
this.tplfuncs['if']=function(tpl,obj,args){var ret="(%*";var result=false;if(typeof args.istrue!='undefined'){var objval=tpl.getObjectProperty(obj,args.istrue);if(typeof objval!='undefined'&&objval){result=true;}}
if(typeof args.isfalse!='undefined'){var objval=tpl.getObjectProperty(obj,args.isfalse);if(typeof objval!='undefined'&&!objval){result=true;}}
if(typeof args.empty!='undefined'){var objval=tpl.getObjectProperty(obj,args.empty);if(typeof objval=='undefined'||objval==null){result=true;}}
if(typeof args.notempty!='undefined'){var objval=tpl.getObjectProperty(obj,args.notempty);if(typeof objval!='undefined'&&objval!=null&&objval!==''&&objval!==false){result=true;}}
if(typeof args.strcmp!='undefined'){var objval=tpl.getObjectProperty(obj,args.strcmp);var argval=args.strval;var equality=args.equality;if(equality=='true'){if(typeof objval!='undefined'&&(objval==argval)){result=true;}}else if(equality=='false'){result=true;if(typeof objval!='undefined'&&(objval==argval)){result=false;}}}
if(result){tpl.state['if']=true;ret="";}
return ret;}
this.tplfuncs['/if']=function(tpl,obj,args){var ret='*%)';if(tpl.state['if']){tpl.state['if']=false;ret='';}
return ret;}
this.tplmodifiers['number_format']=function(tplvar,args){var ret=parseFloat(tplvar);return(!isNaN(ret)?ret.toFixed(2):0);}
this.tplmodifiers['escape']=function(tplvar,args){if(args=="js"){tplvar=escape(tplvar);}else if(args=="html"){tplvar=elation.utils.escapeHTML(tplvar);}else if(args=="url"){tplvar=encodeURIComponent(tplvar).replace(/%20/g,"+");}
return tplvar;}
this.tplmodifiers['friendlyurl']=function(tplvar,args){var utils=new TFHtmlUtils();return utils.FriendlyURLEncode(tplvar);}
this.getObjectProperty=function(obj,key){var ret;if(typeof obj!='undefined'&&obj!=null&&typeof key=='string'){var thispart=key;var nextpart;var i=key.indexOf('\.');if(i>0){thispart=key.substr(0,i);nextpart=key.substr(i+1);}
var objtype=typeof obj[thispart];if(objtype=='object'&&nextpart){ret=this.getObjectProperty(obj[thispart],nextpart);}else if(objtype!='undefined'){ret=obj[thispart];}}
return ret;}
this.parseActionArgs=function(argsstr){var ret={};var tmpdiv=document.createElement("DIV");tmpdiv.innerHTML="<div "+argsstr+"></div>";if(tmpdiv.firstChild){for(var i=0;i<tmpdiv.firstChild.attributes.length;i++){if(tmpdiv.firstChild.attributes[i].specified){ret[tmpdiv.firstChild.attributes[i].name]=tmpdiv.firstChild.attributes[i].value;}}}
return ret;}});
elation.extend('ui.infobox',new function(){this.order=[];this.infoboxes=[];this.infomap={};this.group={};this.add=function(name,args,data,content,parent){var current=this.get(name),args=args||{},group;args.data=args.data||data;args.content=args.content||content;args.parent=args.parent||parent;if(current&&current.visible){if(args.parent){if(current.args.activecss)
elation.html.addclass(args.parent,current.args.activecss);current.parent=args.parent;current.position();}
(function(self){current.args.hide_callback=function(){self._add(name,args);};})(this);}else{return this._add(name,args);}}
this._add=function(name,args){var infobox=new elation.ui.window(name,args),group=elation.utils.arrayget(args,'group');this.infomap[name]=this.infoboxes.length;this.infoboxes.push(infobox);if(group)
this.grouping(group,infobox);return infobox;}
this.grouping=function(name,infobox){if(typeof this.group[name]=='undefined')
this.group[name]=[];this.group[name].push(infobox);}
this.show=function(infobox,content,parent,ignore_current,tail_anchor,noreposition,modal,data,animate){if(typeof content=='object'&&!elation.utils.isNull(content)){var parent=parent||content.parent,ignore_current=ignore_current||content.ignore_current,tail_anchor=tail_anchor||content.tail_anchor,noreposition=noreposition||content.noreposition,modal=modal||content.modal,data=data||content.data,content=content.content;}
var infobox=this.get(infobox);if(infobox){if(!ignore_current)
this.current=infobox;infobox.show(content,parent,tail_anchor,noreposition,modal,data,animate);}}
this.hide=function(infobox,no_animation){var infobox=this.get(infobox);this.current=false;if(infobox.visible)
infobox.hide(no_animation);}
this.hideAll=function(){for(var i=0;i<this.infoboxes.length;i++)
if(this.infoboxes[i].visible)
this.hide(this.infoboxes[i]);}
this.toggle=function(infobox){var infobox=this.get(infobox);this.current=infobox;infobox.toggle();}
this.remove=function(infobox){var index=this.infomap[infobox];if(this.current==this.infoboxes[index])
delete this.current;this.infoboxes.splice(index,1);delete this.infomap[infobox];}
this.nuke=function(infobox){console.log('no action performed',infobox);}
this.position=function(infobox,ignore_tail){var infobox=this.get(infobox);infobox.position(ignore_tail);}
this.find=function(element){var infoboxes=[],results=[];for(var i=0;i<this.infoboxes.length;i++)
if(this.infoboxes[i].visible)
infoboxes.push(this.infoboxes[i]);for(var i=0;i<infoboxes.length;i++)
if(infoboxes[i].is_inside(element))
return infoboxes[i];return false;}
this.get=function(infobox){if(infobox=='_current')
return this.getCurrent();switch(typeof infobox){case'string':var index=this.infomap[infobox];if(index>=0)
infobox=this.infoboxes[index];else
infobox=false;break;case'object':break;default:infobox=false;break;}
return infobox;}
this.getCurrent=function(){var infobox;for(var i=this.order.length-1;i>=0;i--){infobox=this.order[i];if(infobox&&infobox.visible)
return infobox;}
return false;}
this.target=function(target,type){var original=target,infobox,alternate,parent,i;for(var i=0;i<this.infoboxes.length;i++){infobox=this.infoboxes[i];parent=infobox.parent;target=original;alternate=infobox.alternate||infobox.elements.container;while(target){if(target==infobox.elements.container&&type=='click')
return false;if(parent==target||alternate==target)
return infobox;target=target.parentNode;}}
return false;}
this.is_inside=function(infobox,element){var infobox=this.infoboxes[this.infomap[infobox]]||infobox,container=typeof infobox=='object'?infobox.elements.container:null;if(!infobox||!container)
return;while(element){if(element==container||element==infobox.parent)
return true;element=element.parentNode;}
return false;}
return this;});elation.extend('ui.window',function(name,args){this.name=name||"tf_infobox";this.args=args||{};this.init=function(){var args=this.args;this.data=args.data;this.content=args.content||"";this.parent=document.getElementById(args.parent)||args.parent||false;this.childWidth=(this.parent&&this.parent.firstChild)?this.parent.firstChild.offsetWidth:0;var defaults={event:false,titlebar:false,vertical:false,nocache:false,sticky:false,absolute:false,fixed:false,width:false,minheight:false,height:false,loading:false,bgcolor:false,font:false,activecss:false,classname:false,center:false,resize:false,moveable:false,zindex:1001,delay:false,tailcss:'tf_infobox_tail',tailsrc:this.args.tailcss,tailfiletype:'png',position:true,label:"",id:'tf_infobox_'+this.name,border:"ui.infobox",animate:true,animation:"contract",animation_time:200,hideonclick:false,killscroll:false,ajaxmethod:"GET",fullscreen:false,resizeclose:false,show_callback:false,hide_callback:false,continue_callback:false,donthidecurrent:false,margin:0,reposition:true,prevent_default:true,tail:true,lightbox:false,modal:false,justify:"center",marginleft:0,append:false,respawn_delay:false,ajaxdelay:0,closebtn:'ui/close_x.png',bodyclass:false}
this.visible=false;for(var key in defaults)
if(elation.utils.isNull(args[key]))
args[key]=defaults[key]
if(elation.browser.type=='msie')
args.animation='none'
if(args.scrollTop)
this.scrollTop();if(args.label&&!args.titlebar)
args.titlebar=true;var elements=this.elements={};elements.container=document.createElement('DIV');elements.container.id=args.id;if(elation.utils.isTrue(args.lightbox))
args.lightbox='tf_infobox_lightbox';if(args.classname)
elements.container.className=args.classname;elements.container.style.position=args.fixed?"fixed":"absolute";if(args.zindex!=0)
elements.container.style.zIndex=args.zindex;if(args.font)
this.elements.container.style.fontFamily=args.font;if(elation.utils.isTrue(args.tail)){var tag=args.tailsrc=='div'?'DIV':'IMG';elements.tail=document.createElement(tag);elements.tail.className=args.tailcss;elements.tail.style.zIndex=args.zindex;if(typeof args.tailsrc!='undefined'&&args.tailsrc!='div')
elements.tail.src=args.tailsrc;if(args.bgcolor)
elements.tail.style.backgroundColor=args.bgcolor;}
if(elation.utils.isTrue(args.titlebar))
args.titlebar="ui.infobox_titlebar";if(args.tooltip)
this.alternate=elements.container
var obj=(args.event=="mouseout")?this.alternate=elements.container:this.parent?this.parent:null;if(args.event&&obj)
elation.events.add(obj,args.event,this);if(args.event=="mouseover")
elation.events.add([(this.parent||obj),this.elements.container],"mouseout",this);if(args.killscroll)
elation.events.add(obj,"mousewheel",this);if(args.resizeclose||args.resize)
elation.events.add(window,"resize",this);if(args.animation)
elation.html.addclass(this.elements.container,'animation_'+args.animation+'_init');if(args.lightbox){(function(self){elation.onloads.add(function(){self.lightbox=document.getElementById('#tf_lightbox_shade')||self.create_lightbox();});})(this);}
return this;}
this.handleEvent=function(event){var event=event||window.event,target=event.target||event.srcElement,mapping={mouseout:'toggle',mouseover:'toggle',click:'toggle',DOMMouseScroll:'mousewheel',touchstart:'mousedown',touchmove:'mousemove',touchend:'mouseup'};this[(mapping[event.type]||event.type)](target,event);if(this.killscroll){event.preventDefault();this.killscroll=false;}}
this.mousewheel=function(target,event){if(target.id=="tf_lightbox_shade")
this.killscroll=true;return false;}
this.mousedown=function(target,event){var infobox=elation.ui.infobox.find(target),hasClass=elation.html.hasclass,parent=target.parentNode;if(elation.utils.arrayget(target,'id')=='tf_lightbox_shade'){event.stopPropagation();event.preventDefault();}
if(hasClass(target,'ac_results')||hasClass(parent,'ac_results'))
return;if(infobox&&target==this.parent&&infobox.visible){return;}
if(!infobox){return elation.ui.infobox.hideAll();}
var excluded=['IMG','A','P','H1','H2','H3','EM','STRONG','SPAN','LABEL','TEXTAREA','INPUT'];this.mouse=elation.events.coords(event);if(this.dragging)
return;if(elation.iphone)
elation.events.add(this.elements.container,"touchmove,touchend",this);else
elation.events.add(document,"mousemove,mouseup",this);if(this.args.moveable){this.dragging=true;}}
this.mousemove=function(target,event){if(this.args.moveable){var mouse=elation.events.coords(event),diff={y:0,x:0};if(!this.mouse)
this.mouse={y:mouse.y,x:mouse.x};diff.y=-(this.mouse.y-mouse.y);diff.x=-(this.mouse.x-mouse.x);this.position(null,[diff.y,diff.x]);this.mouse=mouse;}}
this.mouseup=function(target,event){if(this.args.moveable){var container=this.elements.container;if(elation.iphone)
elation.events.remove(this.elements.container,"touchmove,touchend",this);else
elation.events.remove(document,"mousemove,mouseup",this);this.dragging=false;}}
this.resize=function(target,event){if(!this.visible)
return;if(this.args.resizeclose)
this.hide();else if(this.args.resize)
this.position();}
this.is_inside=function(element){var container=this.elements.container;if(!container)
return false;while(element){if(element==container)
return 1;if(element==this.parent)
return 2;element=element.parentNode;}
return 0;}
this.toggle=function(target,event){if(event.type=='mouseover'||event.type=='mouseout'){if(this.is_inside(elation.events.getRelated(event)))
return;}else{if(this.is_inside(target)===1)
return;}
this.visible?this.hide():this.show();event.preventDefault();event.stopPropagation();}
this.create_lightbox=function(){var lightbox=elation.id('#tf_lightbox_shade');if(!lightbox)
lightbox=document.createElement('div');lightbox.id='tf_lightbox_shade';document.body.appendChild(lightbox);return lightbox;}
this.show=function(content,parent,tail_anchor,noreposition,modal,data,animate){elation.ui.infobox.order.push(this);if(!data)
data=this.data;if(this.args.delay&&!this.delay_timer){this.visible=true;(function(self){self.delay_timer=setTimeout(function(){self.show(content,parent,tail_anchor,noreposition);},self.args.delay);})(this);return;}
elation.events.fire('popup_preshow',this);delete this.delay_timer;if(this.respawn_delay)
return;if(content){this.elements.content='';if(this.args.titlebar){if(this.args.lightbox=='tf_signin_lightbox'){fireCloseEvent="elation.events.fire('login_popup_close', this)";}else{fireCloseEvent=null;}
this.elements.content=this.template(elation.tplmgr,this.args.titlebar,{name:this.name,label:this.args.label,closebtn:this.args.closebtn,closeLoginEvent:fireCloseEvent});}
this.elements.content+=content;}
if(parent)
this.parent=parent;if(tail_anchor)
this.elements.tail_anchor=tail_anchor;if(this.args.sticky)
this.sticky=true;if(!this.elements.content||this.args.nocache){if(this.args.titlebar){this.elements.content=this.template(elation.tplmgr,this.args.titlebar,{name:this.name,label:this.args.label,closebtn:this.args.closebtn});}else
this.elements.content='';if(this.args.ajax){this.ajax(this.content,data);var oldcontent=this.elements.content;this.elements.content+=this.args.loading?this.template(elation.tplmgr,this.args.loading):'<p id="tf_ajax_spinner" align="center"><img src="/images/ui/ajax-loading-bar.gif"></p>';}else{this.ajax_continue(this.template(elation.tplmgr,this.content,this.data));}}
if(this.args.border=='div'){if(!this.elements.content&&this.content)
this.elements.content=this.content;this.elements.border=this.elements.content;}else{this.elements.border=this.template(elation.tplmgr,this.args.border,this.elements);}
if(this.args.lightbox&&this.lightbox){elation.html.addclass(this.lightbox,this.args.lightbox);if(args.killscroll){$TF(document).on('touchmove',function(e){e.preventDefault();});$TF('body').on('touchstart','.scrollable',function(e){if(e.currentTarget.scrollTop===0){e.currentTarget.scrollTop=1;}else if(e.currentTarget.scrollHeight===e.currentTarget.scrollTop+e.currentTarget.offsetHeight){e.currentTarget.scrollTop-=1;}});$TF('body').on('touchmove','.scrollable',function(e){e.stopPropagation();});}}
if(!animate)
this.elements.container.style.visibility='hidden';if(this.args.bodyclass)
elation.html.addClass(document.body,this.args.bodyclass);if(this.args.absolute)
document.body.appendChild(this.elements.container);else if(this.args.append){this.args.append.insertBefore(this.elements.container,this.args.append.firstChild);}else
this.parent.insertBefore(this.elements.container,this.parent.firstChild);if(animate)
this.animate_inject(this.elements.border);else
this.elements.container.innerHTML=this.elements.border;this.execute_scripts(this.elements.container);if(this.args.show_callback&&!noreposition)
this.args.show_callback();if(oldcontent)
this.elements.content=oldcontent;if(this.args.activecss)
elation.html.addclass(this.parent,this.args.activecss);if(!noreposition)
this.position();(function(self){setTimeout(function(){self.elements.container.style.visibility='visible';if(self.args.animation&&self.args.animation!='none'){elation.html.addclass(self.elements.container,'animation_'+self.args.animation);if(elation.browser.type=='msie'&&typeof $TF!='undefined')
$TF(self.elements.container).css({opacity:0}).animate({opacity:1},self.args.animation_time,'easeout');}},1);})(this);var modal=modal||this.args.modal;if((this.args.lightbox&&!modal)||(this.args.hideonclick&&!modal)){elation.events.add(document.body,'mousedown,touchstart',this);}
if(modal){var closebtn=elation.find('div.tf_infobox_popup_titlebar',this.elements.container,true);elation.events.remove(document.body,'mousedown,touchstart',this);if(closebtn)
closebtn.style.display='none';}
elation.events.fire('popup_show',this);this.visible=true;return this.elements.container;}
this.animate_inject=function(content,target,noanimate){var target=target||this.elements.container,container=this.elements.container;if(elation.browser.type=='msie'||this.args.animation=='none'||noanimate){target.innerHTML=content;return this.position();}
var px=function(){return(elation.browser.type=='safari'?'':'px');},transform=function(el,transition,transform){switch(elation.browser.type){case'firefox':el.style.MozTransition=(transition?'-moz-':'')+(transition?transition:'');el.style.MozTransformOrigin=transform?'center':'';el.style.MozTransform=transform?transform:'';break;case'safari':el.style.webkitTransition=(transition?'-webkit-':'')+(transition?transition:'');el.style.webkitTransformOrigin=transform?'center':'';el.style.webkitTransform=transform?transform:'';break;}},getOffset=function(self,before,after){var x=0,y=0;if(!self.args.fixed)
var y=before.y-((after.y+(after.h/2))-(before.h/2)),x=before.x-((after.x+(after.w/2))-(before.w/2));return{x:x,y:y};},inject=function(self,complex_border){var element=complex_border?elation.utils.getFirstChild(container,'div'):container,before=elation.html.dimensions(element);target.innerHTML=content;self.position();var element=complex_border?elation.utils.getFirstChild(container,'div'):container,after=elation.utils.arrayget(self.position(),'dimensions.container')||elation.html.dimensions(container),scaled_width=before.w/after.w,scaled_height=before.h/after.h,offset=getOffset(self,before,after);elation.html.addclass(container,'animation_'+self.args.animation+'_transition');transform(element,'transform 0s linear','matrix('+scaled_width+',0,0,'+scaled_height+','+offset.x+px()+','+offset.y+px()+')');setTimeout(function(){transform(element,'transform 150ms ease','matrix(1,0,0,1,0,0)');},1);setTimeout(function(){transform(element);},500);};switch(this.args.border){case'ui.infobox':inject(this,true);break;default:inject(this);}}
this.ajax_continue=function(response){if(typeof response["infobox.content"]!='undefined')
response=response["infobox.content"];if(typeof response=='string'){if(this.args.titlebar){this.elements.content=this.template(elation.tplmgr,this.args.titlebar,{name:this.name,label:this.args.label,closebtn:this.args.closebtn});this.elements.content+=response;}else{this.elements.content=response;}
if(this.args.border=='div'){this.elements.border=this.elements.content;}else{this.elements.border=this.template(elation.tplmgr,this.args.border,this.elements);}
if(elation.browser.type!='msie'&&this.args.animate)
this.animate_inject(this.elements.border);else
this.elements.container.innerHTML=this.elements.border;var spinner=document.getElementById('tf_ajax_spinner');if(spinner){spinner.parentNode.removeChild(spinner);}
if(this.args.reposition)
(function(self){setTimeout(function(){self.position(true);},100);})(this);}
if(this.args.reposition)
this.position();if(this.args.continue_callback)
this.args.continue_callback();}
this.hide=function(no_animation){if(this.delay_timer){this.visible=false;clearTimeout(this.delay_timer);delete this.delay_timer;return;}
if(!this.visible)
return;elation.events.fire('popup_hide',this);var self=this,remove_func=function(){try{if(self.args.absolute){document.body.removeChild(self.elements.container);}else if(self.args.append){self.args.append.removeChild(self.elements.container);}else{self.parent.removeChild(self.elements.container);}}catch(e){console.log('Notice: unable to hide elation.ui.window['+self.name+'] - '+e.message);}};if(this.args.animation&&this.args.animation!='none'&&!no_animation){elation.html.removeclass(this.elements.container,'animation_'+this.args.animation);elation.html.removeclass(this.elements.container,'animation_'+this.args.animation+'_transition');if(elation.browser.type=='msie'&&typeof $TF!='undefined'){$TF(this.elements.container).css({opacity:1}).animate({opacity:0},this.args.animation_time,'easein',(function(){remove_func();}));}else{setTimeout(function(){remove_func();},this.args.animation_time);}}else{remove_func();}
delete this.mouse;delete this.current;if(this.args.hide_callback)
this.args.hide_callback();if(this.animation)
this.animation=false;if(this.args.bodyclass)
elation.html.removeClass(document.body,this.args.bodyclass);if(this.args.fullscreen)
document.body.style.overflow='';if(this.args.sticky)
this.sticky=false;if(this.args.activecss)
elation.html.removeclass(this.parent,this.args.activecss);if(this.args.lightbox&&this.lightbox||this.args.hideonclick){elation.events.remove(document.body,'mousedown,touchstart',this);elation.html.removeclass(this.lightbox,this.args.lightbox);var divs=elation.find('#tf_header,#tf_container');for(var i=0;i<divs.length;i++)
elation.html.removeclass(divs[i],'tf_blur_effect');if(this.args.killscroll){$TF(document).off('touchmove');$TF('body').off('touchmove touchstart','.scrollable');}}
if(this.args.respawn_delay)
(function(self){self.respawn_delay=setTimeout(function(){clearTimeout(self.respawn_delay);delete self.respawn_delay;},self.args.respawn_delay);})(this);this.visible=false;}
this.position=function(it,of){if(!this.args.position)
return;var c=this.elements.container;if(this.args.width)
c.style.width=this.args.width;var args=this.args,p=this.parent,ie=elation.browser.type=='msie',ie7=ie&&elation.browser.version<=7,d=elation.html.dimensions,dw=d(window),dp=d(p),dc=d(c),to=0,left,top,width,height;if(elation.utils.isNull(this.paddingTop)||elation.utils.isNull(this.paddingLeft)){this.paddingTop=(c.offsetTop-p.offsetTop)||0;this.paddingLeft=(c.offsetLeft-p.offsetLeft)||0;}
if(args.centerparent){top=dp.y-25;left=dp.x-8;height='auto';width=dp.w+5;}else if(args.notification){var st=elation.browser.type=='safari'&&elation.browser.version==6?elation.html.getscroll(1):0;c.style.position='fixed';c.style.bottom=(0+-st)+'px';c.style.right='0';c.style.top='';c.style.left='';return;}else if(args.fullscreen){var st=elation.browser.type!='safari'?elation.html.getscroll(1):0,top=st;left=this.animation?0:dw.w;}else if(elation.utils.isTrue(args.center)){var st=args.fixed?0:elation.html.getscroll(1);if(true||args.fixed){c.style.position='fixed';c.style.marginLeft=-(dc.w>>1)+'px';c.style.marginTop=-(dc.h>>1)+'px';c.style.top='50%';c.style.left='50%';return;}else{top=(dw.h>>1)-(dc.h>>1)+st;left=(dw.w>>1)-(dc.w>>1);if(top<5)
top=5;if(top<st)
top=st+parseInt(args.margin);}}else if(elation.utils.isTrue(args.vertical)){if(args.absolute){var st=st||elation.html.getscroll(1),lm=parseInt(args.marginleft),im=parseInt(args.margin);if(args.fixed)
top=(dw.h/2)-(dc.h/2);else
top=((dp.y+(dp.h>>1))>(dw.h>>1))?dp.y-dc.h-im:dp.y+dp.h+im;switch(args.justify){case"left":left=dp.x+lm;break;case"right":left=dp.x+dp.w-dc.w+lm;break;default:left=((dp.x+(dp.w>>1))-(dc.w>>1))+lm;}
if(args.scrollTop)
top+=st;if(left<5)
left=5;if((left+dc.w)>dw.w)
left=dw.w-dc.w;}else{var st=st||elation.html.getscroll(1),im=parseInt(args.margin);if(args.scrollTop)
top=((dp.y+st+(dp.h>>1))>(dw.y+st+(dw.h>>1)))?-(dc.h+this.paddingTop)-args.margin:(dp.h-this.paddingTop)-args.margin;else
top=((dp.y-st+(dp.h>>1))>(dw.y+(dw.h>>1)))?-(dc.h+this.paddingTop)-args.margin:(dp.h-this.paddingTop)-args.margin;left=-((dc.w-dp.w)>>1);if((dp.x+left)<0)
left=left-(to=(dp.x+left)-0);if(((dp.x+left+20)+dc.w)>dw.w)
left=-((dp.x+dc.w)-dw.w+(ie?14:17));}
if(ie7&&this.childWidth){top+=1;left-=this.childWidth;}}else{if(args.absolute){var st=st||elation.html.getscroll(1),lm=parseInt(args.marginleft),im=parseInt(args.margin),ta=this.elements.tail_anchor;left=((dp.x+(dp.w>>1))>(dw.w>>1))?dp.x-dc.w-lm:dp.x+dp.w+lm;switch(args.justify){case"top":top=dp.y+im;break;case"bottom":top=dp.y+dp.h-dc.w+im;break;default:top=((dp.y+(dp.h/2))-(dc.h/2))+im;}
if(ie7&&args.scrollTop)
top+=st;if(top+dc.h>dw.h+st)
top-=(top+dc.h)-(dw.h+st);if(top<st)
top+=st-top;if(args.fixed)
if(fo=document.getElementById(args.fixed))
if(fo.style.position=="fixed")
top+=st;if(ta){var is=ie7?st:0,dt=d(ta),hh=dt.h/1,ys=dt.y+is+hh,ty=dt.y+(dt.h/4)+is;this.anchor_dim=dt;left=(dt.x+(dt.w>>1)>dw.w>>1)?dt.x-dc.w-im:dt.x+dt.w+im;if(top>ty)
top=ty;if(top+dc.h<ys)
top=ys-dc.h;}
if(args.alignment=='center'){left=(dw.w/2)-(dc.w/2);}}else{top=-(dc.h>>1);left=((dp.x+(dp.w>>1))>(dw.w>>1))?-dc.w:dp.w;if((dp.y+top)<0)
top=0;}}
var sp=this.setPosition(c,top,left,of,(height||dw.h),width);if(args.tailsrc=='div')
to=left;if(elation.utils.isTrue(args.tail)&&(!elation.utils.isTrue(args.center)&&!elation.utils.isTrue(args.fullscreen)))
this.tail(c,dc,dp,dw,to);dc.x=sp.x;dc.y=sp.y;vars={x:left,y:top,offset:of,dimensions:{container:dc,parent:dp,window:dw},container:c,parent:p};this.position_data=vars;elation.events.fire('popup_position',this,this.elements.container);return vars;}
this.setPosition=function(c,top,left,of,height,width){if(of){top+=of[0];left+=of[1];}
if(this.args.centerparent){if(!height)height='auto';if(width)c.style.width=width+'px';c.style.top=top+'px';c.style.left=left+'px';c.style.height=height+(typeof height=='string'?'':'px');}else if(this.args.fullscreen){document.body.style.overflow='hidden';c.style.top=top+'px';c.style.left=left+'px';c.style.height=height+'px';c.style.width='100%';if(!this.animation&&typeof $TF!='undefined'){this.animation=true;$TF(c).animate({left:0});}}else if(this.args.absolute){c.style.top=top+'px';c.style.left=left+'px';}else{c.style.marginTop=top+'px';c.style.marginLeft=left+'px';}
this.y=top;this.x=left;return{x:this.x,y:this.y};}
this.tail=function(c,dc,dp,dw,to,it){var args=this.args,img=this.elements.tail,ts=args.tailsrc,tc=args.tailcss,p=this.parent,d=elation.html.dimensions,dw=d(window),dp=d(this.elements.tail_anchor||p),dc=d(c),top,left;if(args.vertical){var iw=img.offsetWidth,ih=img.offsetHeight;if((dp.y+(dp.h>>1))>(dw.h>>1)){this.set_tail_class(img,tc,'down');if(args.tooltip){top=dc.h-5;left=((dp.x+(dp.w/2))<(dw.w/2))?5:dc.w-26;}else{top=dc.h-10;left=(dc.w>>1);}}else{this.set_tail_class(img,tc,'up');if(args.tooltip){top=-(ih?ih:14)-7;left=(dc.w>>1)-17;}else{top=-ih;left=(dc.w>>1)-(iw>>1)-9+to;}}
if(ts=='div'){img.style.width=dp.w-2+'px';left=Math.abs(to+1);top+=7;}}else{if((dp.x+(dp.w>>1))>(dw.w>>1)){this.set_tail_class(img,tc,'right');top=dp.y-dc.y+(dp.h>>1)-(16>>1);left=dc.w-(this.name!="product_infocard"?2:11);}else{this.set_tail_class(img,tc,'left');top=dp.y-dc.y+(dp.h>>1)-(16>>1);left='';}
if(args.absolute&&args.fixed)
if(fo=document.getElementById(this.args.fixed))
if(fo.style.position=="fixed")
top+=elation.html.getscroll(1);}
if(!args.absolute&&elation.browser.type=='msie'&&elation.browser.version<=7&&this.childWidth)
left-=this.childWidth;if(!(!args.vertical&&it))
img.style.marginTop=(top)?(top+'px'):'';if(!(args.vertical&&it))
img.style.marginLeft=(left)?(left+'px'):'';this.elements.container.insertBefore(img,this.elements.container.firstChild);}
this.set_tail_class=function(img,ts,o){var classes=['left','right','up','down'];for(var i=0;i<classes.length;i++)
if(classes[i]!=o)
elation.html.removeclass(img,ts+'_'+classes[i]);if(!elation.html.hasclass(img,ts+'_'+o))
elation.html.addclass(img,ts+'_'+o);if(img.tagName=='IMG')
img.src=args.tailsrc+'_'+o+'.'+args.tailfiletype;}
this.execute_scripts=function(element){var scripts=element.getElementsByTagName("SCRIPT");if(scripts.length>0){for(var j=0;j<scripts.length;j++){if(typeof scripts[j].text=='string'){var text=scripts[j].text;try{eval(text);}
catch(e){}}}}}
this.scrollTop=function(){var element=this.parent;while(element&&element.nodeName!='BODY'&&element.nodeName!='#document'&&typeof element!='string'){var computed=window.getComputedStyle?window.getComputedStyle(element,null):element.currentStyle;if(typeof window.getComputedStyle!='undefined')
var position=computed?computed.getPropertyValue("position"):'static';else
var position=computed?computed.position:'static';if(position=="fixed"){this.args.scrollTop=true;return;}
if(element.parentNode)
element=element.parentNode;else
break;}
this.args.scrollTop=false;}
this.ajax=function(url,data){(function(self){setTimeout(function(){ajaxlib.Queue({method:self.args.ajaxmethod,url:url,args:elation.utils.encodeURLParams(data),callback:function(html){if(url.substr(url.length-5)=='.snip'){self.ajax_continue(html);self.execute_scripts(self.elements.container);}}});},self.args.ajaxdelay||0);})(this);}
this.template=function(tplmgr,name,vars){vars=vars||{};var template;if(tplmgr.HasTemplate(name))
template=tplmgr.GetTemplate(name,vars);return template||'';}
this.init();return this;});elation.extend('ui.infobox_harness',function(type,args){this.type=type;this.args=args;this.init=function(){if(!elation.ui.infobox.get(this.type))
elation.ui.infobox.add(this.type,this.args);}
this.show=function(html,modal,animate){var html=html?html:"<div id='tf_lightbox_content'>"+"<div class='tf_user_login_selector'>"+"<h2>Please Wait...</h2><span>"+"<img src='/images/ui/ajax-loading-bar.gif' />"+"</span></div></div>";elation.ui.infobox.show(this.type,html,null,null,null,null,modal,null,animate);return false;}
this.get=function(url,parms,modal){this.show();var that=this;$TF.ajax({url:url,data:parms,success:function(response){elation.ui[that.type].show(response,modal,true);}});return false;}
this.hide=function(){infobox=elation.ui.infobox.get(this.type);if(infobox.visible)
elation.ui.infobox.hide(infobox);return false;}
this.visible=function(){infobox=elation.ui.infobox.get(this.type);return infobox.visible;}
this.init();});elation.extend('ui.lightbox',new elation.ui.infobox_harness('lightbox',{id:'tf_lightbox',border:"ui.lightbox",titlebar:true,absolute:true,lightbox:"tf_signin_lightbox",moveable:true,tail:false,center:true}));elation.extend('ui.notify',new function(){this.init=function(){elation.ui.infobox.add('notify',{id:'tf_notify',border:"div",tail:false,titlebar:true,animation:'sweepdown',animation_time:200,absolute:true,center:true,notification:true});}
this.show=function(name,content,delay,className){var name=name?name:'info';var delay=typeof delay!=='undefined'?delay:3500;var className='tf_notify_container '+(className||'');var html='<table class="'+className+'"><tr><td><img src="/images/ui/notify/'+name+'.png"></img></td><td>'+content+'</span></td></tr></table>';var infobox=elation.ui.infobox.get('notify');elation.ui.infobox.show('notify',html,null,null,null,null,null,null,infobox.visible);if(this.timer)
clearTimeout(this.timer);this.timer=setTimeout(function(){elation.ui.notify.hide();},delay);}
this.hide=function(){delete this.timer;elation.ui.infobox.hide('notify');}
this.init();});function showLightBox(){return elation.ui.lightbox.show();}
function hideLightBox(){return elation.ui.lightbox.hide();}
if(typeof elation!='undefined' && elation.file && elation.file.dependencies) { elation.file.dependencies.registerMany({"utils":["elation","events","browser","ajaxlib"],"upfront":["badgeinit"],"tplmgr":["tplmgr"],"ui":["infobox"]}); }