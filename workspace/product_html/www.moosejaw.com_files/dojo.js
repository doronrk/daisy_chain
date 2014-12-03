/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 8617 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"||(djConfig["useXDomain"]&&dojo.render.html.opera)){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
if(djConfig["modulePaths"]){
for(var param in djConfig["modulePaths"]){
dojo.registerModulePath(param,djConfig["modulePaths"][param]);
}
}
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated=["ROOT","es-es","es","it-it","pt-br","de","fr-fr","zh-cn","pt","en-us","zh","fr","zh-tw","it","en-gb","xx","de-de","ko-kr","ja-jp","ko","en","ja"];
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _9f=document.location.toString();
var _a0=_9f.split("?",2);
if(_a0.length>1){
var _a1=_a0[1];
var _a2=_a1.split("&");
for(var x in _a2){
var sp=_a2[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _a6=document.getElementsByTagName("script");
var _a7=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_a6.length;i++){
var src=_a6[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_a7);
if(m){
var _ab=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_ab+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_ab;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_ab;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _b3=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_b3>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_b3+6,_b3+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _b5=window["document"];
var tdi=_b5["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _b9=null;
var _ba=null;
try{
_b9=new XMLHttpRequest();
}
catch(e){
}
if(!_b9){
for(var i=0;i<3;++i){
var _bc=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_b9=new ActiveXObject(_bc);
}
catch(e){
_ba=e;
}
if(_b9){
dojo.hostenv._XMLHTTP_PROGIDS=[_bc];
break;
}
}
}
if(!_b9){
return dojo.raise("XMLHTTP not available",_ba);
}
return _b9;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_be,_bf){
if(!_be){
this._blockAsync=true;
}
var _c0=this.getXmlhttpObject();
function isDocumentOk(_c1){
var _c2=_c1["status"];
return Boolean((!_c2)||((200<=_c2)&&(300>_c2))||(_c2==304));
}
if(_be){
var _c3=this,_c4=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_c0.onreadystatechange=function(){
if(_c4){
gbl.clearTimeout(_c4);
_c4=null;
}
if(_c3._blockAsync||(xhr&&xhr._blockAsync)){
_c4=gbl.setTimeout(function(){
_c0.onreadystatechange.apply(this);
},10);
}else{
if(4==_c0.readyState){
if(isDocumentOk(_c0)){
_be(_c0.responseText);
}
}
}
};
}
_c0.open("GET",uri,_be?true:false);
try{
_c0.send(null);
if(_be){
return null;
}
if(!isDocumentOk(_c0)){
var err=Error("Unable to load "+uri+" status:"+_c0.status);
err.status=_c0.status;
err.responseText=_c0.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_bf)&&(!_be)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _c0.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_c8){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_c8);
}else{
try{
var _c9=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_c9){
_c9=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_c8));
_c9.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_c8+"</div>");
}
catch(e2){
window.status=_c8;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_cb,_cc,fp){
var _ce=_cb["on"+_cc]||function(){
};
_cb["on"+_cc]=function(){
fp.apply(_cb,arguments);
_ce.apply(_cb,arguments);
};
return true;
}
dojo.hostenv._djInitFired=false;
function dj_load_init(e){
dojo.hostenv._djInitFired=true;
var _d0=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_d0!="domcontentloaded"&&_d0!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _d1=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_d1();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_d1);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&(djConfig["enableMozDomContentLoaded"]===true))){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var _d3=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_d3=_d3.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_d3=_d3.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_d3.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _d4=new dojo.xml.Parse();
if(_d3.length>0){
for(var x=0;x<_d3.length;x++){
var _d6=document.getElementById(_d3[x]);
if(!_d6){
continue;
}
var _d7=_d4.parseElement(_d6,null,true);
dojo.widget.getParser().createComponents(_d7);
}
}else{
if(djConfig.parseWidgets){
var _d7=_d4.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_d7);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_dc,_dd){
dj_currentContext=_dc;
dj_currentDocument=_dd;
};
dojo._fireCallback=function(_de,_df,_e0){
if((_df)&&((typeof _de=="string")||(_de instanceof String))){
_de=_df[_de];
}
return (_df?_de.apply(_df,_e0||[]):_de());
};
dojo.withGlobal=function(_e1,_e2,_e3,_e4){
var _e5;
var _e6=dj_currentContext;
var _e7=dj_currentDocument;
try{
dojo.setContext(_e1,_e1.document);
_e5=dojo._fireCallback(_e2,_e3,_e4);
}
finally{
dojo.setContext(_e6,_e7);
}
return _e5;
};
dojo.withDoc=function(_e8,_e9,_ea,_eb){
var _ec;
var _ed=dj_currentDocument;
try{
dj_currentDocument=_e8;
_ec=dojo._fireCallback(_e9,_ea,_eb);
}
finally{
dj_currentDocument=_ed;
}
return _ec;
};
}
dojo.requireIf((djConfig["isDebug"]||djConfig["debugAtAllCosts"]),"dojo.debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&!djConfig["useXDomain"],"dojo.browser_debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&djConfig["useXDomain"],"dojo.browser_debug_xd");
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_ee,_ef){
if(!dojo.lang.isFunction(_ef)){
dojo.raise("dojo.inherits: superclass argument ["+_ef+"] must be a function (subclass: ["+_ee+"']");
}
_ee.prototype=new _ef();
_ee.prototype.constructor=_ee;
_ee.superclass=_ef.prototype;
_ee["super"]=_ef.prototype;
};
dojo.lang._mixin=function(obj,_f1){
var _f2={};
for(var x in _f1){
if((typeof _f2[x]=="undefined")||(_f2[x]!=_f1[x])){
obj[x]=_f1[x];
}
}
if(dojo.render.html.ie&&(typeof (_f1["toString"])=="function")&&(_f1["toString"]!=obj["toString"])&&(_f1["toString"]!=_f2["toString"])){
obj.toString=_f1.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_f5){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_f8,_f9){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_f8.prototype,arguments[i]);
}
return _f8;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_fc,_fd,_fe,_ff){
if(!dojo.lang.isArrayLike(_fc)&&dojo.lang.isArrayLike(_fd)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_fc;
_fc=_fd;
_fd=temp;
}
var _101=dojo.lang.isString(_fc);
if(_101){
_fc=_fc.split("");
}
if(_ff){
var step=-1;
var i=_fc.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_fc.length;
}
if(_fe){
while(i!=end){
if(_fc[i]===_fd){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_fc[i]==_fd){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_105,_106,_107){
return dojo.lang.find(_105,_106,_107,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_108,_109){
return dojo.lang.find(_108,_109)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.animation.AnimationEvent");
dojo.deprecated("dojo.animation.AnimationEvent is slated for removal in 0.5; use dojo.lfx.* instead.","0.5");
dojo.animation.AnimationEvent=function(_114,type,_116,_117,_118,_119,_11a,_11b,fps){
this.type=type;
this.animation=_114;
this.coords=_116;
this.x=_116[0];
this.y=_116[1];
this.z=_116[2];
this.startTime=_117;
this.currentTime=_118;
this.endTime=_119;
this.duration=_11a;
this.percent=_11b;
this.fps=fps;
};
dojo.extend(dojo.animation.AnimationEvent,{coordsAsInts:function(){
var _11d=new Array(this.coords.length);
for(var i=0;i<this.coords.length;i++){
_11d[i]=Math.round(this.coords[i]);
}
return _11d;
}});
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_11f,_120){
var args=[];
for(var x=2;x<arguments.length;x++){
args.push(arguments[x]);
}
var fcn=(dojo.lang.isString(_120)?_11f[_120]:_120)||function(){
};
return function(){
var ta=args.concat([]);
for(var x=0;x<arguments.length;x++){
ta.push(arguments[x]);
}
return fcn.apply(_11f,ta);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_126,_127,_128){
var nso=(_127||dojo.lang.anon);
if((_128)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_126){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_126;
return ret;
};
dojo.lang.forward=function(_12c){
return function(){
return this[_12c].apply(this,arguments);
};
};
dojo.lang.curry=function(_12d,func){
var _12f=[];
_12d=_12d||dj_global;
if(dojo.lang.isString(func)){
func=_12d[func];
}
for(var x=2;x<arguments.length;x++){
_12f.push(arguments[x]);
}
var _131=(func["__preJoinArity"]||func.length)-_12f.length;
function gather(_132,_133,_134){
var _135=_134;
var _136=_133.slice(0);
for(var x=0;x<_132.length;x++){
_136.push(_132[x]);
}
_134=_134-_132.length;
if(_134<=0){
var res=func.apply(_12d,_136);
_134=_135;
return res;
}else{
return function(){
return gather(arguments,_136,_134);
};
}
}
return gather([],_12f,_131);
};
dojo.lang.curryArguments=function(_139,func,args,_13c){
var _13d=[];
var x=_13c||0;
for(x=_13c;x<args.length;x++){
_13d.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_139,func].concat(_13d));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_143,_144){
if(!farr.length){
if(typeof _144=="function"){
_144();
}
return;
}
if((typeof _143=="undefined")&&(typeof cb=="number")){
_143=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_143){
_143=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_143,_144);
},_143);
};
dojo.provide("dojo.math");
dojo.math.degToRad=function(x){
return (x*Math.PI)/180;
};
dojo.math.radToDeg=function(x){
return (x*180)/Math.PI;
};
dojo.math.factorial=function(n){
if(n<1){
return 0;
}
var _148=1;
for(var i=1;i<=n;i++){
_148*=i;
}
return _148;
};
dojo.math.permutations=function(n,k){
if(n==0||k==0){
return 1;
}
return (dojo.math.factorial(n)/dojo.math.factorial(n-k));
};
dojo.math.combinations=function(n,r){
if(n==0||r==0){
return 1;
}
return (dojo.math.factorial(n)/(dojo.math.factorial(n-r)*dojo.math.factorial(r)));
};
dojo.math.bernstein=function(t,n,i){
return (dojo.math.combinations(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i));
};
dojo.math.gaussianRandom=function(){
var k=2;
do{
var i=2*Math.random()-1;
var j=2*Math.random()-1;
k=i*i+j*j;
}while(k>=1);
k=Math.sqrt((-2*Math.log(k))/k);
return i*k;
};
dojo.math.mean=function(){
var _154=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0;
for(var i=0;i<_154.length;i++){
mean+=_154[i];
}
return mean/_154.length;
};
dojo.math.round=function(_157,_158){
if(!_158){
var _159=1;
}else{
var _159=Math.pow(10,_158);
}
return Math.round(_157*_159)/_159;
};
dojo.math.sd=dojo.math.standardDeviation=function(){
var _15a=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
return Math.sqrt(dojo.math.variance(_15a));
};
dojo.math.variance=function(){
var _15b=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0,_15d=0;
for(var i=0;i<_15b.length;i++){
mean+=_15b[i];
_15d+=Math.pow(_15b[i],2);
}
return (_15d/_15b.length)-Math.pow(mean/_15b.length,2);
};
dojo.math.range=function(a,b,step){
if(arguments.length<2){
b=a;
a=0;
}
if(arguments.length<3){
step=1;
}
var _162=[];
if(step>0){
for(var i=a;i<b;i+=step){
_162.push(i);
}
}else{
if(step<0){
for(var i=a;i>b;i+=step){
_162.push(i);
}
}else{
throw new Error("dojo.math.range: step must be non-zero");
}
}
return _162;
};
dojo.provide("dojo.math.curves");
dojo.math.curves={Line:function(_164,end){
this.start=_164;
this.end=end;
this.dimensions=_164.length;
for(var i=0;i<_164.length;i++){
_164[i]=Number(_164[i]);
}
for(var i=0;i<end.length;i++){
end[i]=Number(end[i]);
}
this.getValue=function(n){
var _168=new Array(this.dimensions);
for(var i=0;i<this.dimensions;i++){
_168[i]=((this.end[i]-this.start[i])*n)+this.start[i];
}
return _168;
};
return this;
},Bezier:function(pnts){
this.getValue=function(step){
if(step>=1){
return this.p[this.p.length-1];
}
if(step<=0){
return this.p[0];
}
var _16c=new Array(this.p[0].length);
for(var k=0;j<this.p[0].length;k++){
_16c[k]=0;
}
for(var j=0;j<this.p[0].length;j++){
var C=0;
var D=0;
for(var i=0;i<this.p.length;i++){
C+=this.p[i][j]*this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,i);
}
for(var l=0;l<this.p.length;l++){
D+=this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,l);
}
_16c[j]=C/D;
}
return _16c;
};
this.p=pnts;
return this;
},CatmullRom:function(pnts,c){
this.getValue=function(step){
var _176=step*(this.p.length-1);
var node=Math.floor(_176);
var _178=_176-node;
var i0=node-1;
if(i0<0){
i0=0;
}
var i=node;
var i1=node+1;
if(i1>=this.p.length){
i1=this.p.length-1;
}
var i2=node+2;
if(i2>=this.p.length){
i2=this.p.length-1;
}
var u=_178;
var u2=_178*_178;
var u3=_178*_178*_178;
var _180=new Array(this.p[0].length);
for(var k=0;k<this.p[0].length;k++){
var x1=(-this.c*this.p[i0][k])+((2-this.c)*this.p[i][k])+((this.c-2)*this.p[i1][k])+(this.c*this.p[i2][k]);
var x2=(2*this.c*this.p[i0][k])+((this.c-3)*this.p[i][k])+((3-2*this.c)*this.p[i1][k])+(-this.c*this.p[i2][k]);
var x3=(-this.c*this.p[i0][k])+(this.c*this.p[i1][k]);
var x4=this.p[i][k];
_180[k]=x1*u3+x2*u2+x3*u+x4;
}
return _180;
};
if(!c){
this.c=0.7;
}else{
this.c=c;
}
this.p=pnts;
return this;
},Arc:function(_186,end,ccw){
var _189=dojo.math.points.midpoint(_186,end);
var _18a=dojo.math.points.translate(dojo.math.points.invert(_189),_186);
var rad=Math.sqrt(Math.pow(_18a[0],2)+Math.pow(_18a[1],2));
var _18c=dojo.math.radToDeg(Math.atan(_18a[1]/_18a[0]));
if(_18a[0]<0){
_18c-=90;
}else{
_18c+=90;
}
dojo.math.curves.CenteredArc.call(this,_189,rad,_18c,_18c+(ccw?-180:180));
},CenteredArc:function(_18d,_18e,_18f,end){
this.center=_18d;
this.radius=_18e;
this.start=_18f||0;
this.end=end;
this.getValue=function(n){
var _192=new Array(2);
var _193=dojo.math.degToRad(this.start+((this.end-this.start)*n));
_192[0]=this.center[0]+this.radius*Math.sin(_193);
_192[1]=this.center[1]-this.radius*Math.cos(_193);
return _192;
};
return this;
},Circle:function(_194,_195){
dojo.math.curves.CenteredArc.call(this,_194,_195,0,360);
return this;
},Path:function(){
var _196=[];
var _197=[];
var _198=[];
var _199=0;
this.add=function(_19a,_19b){
if(_19b<0){
dojo.raise("dojo.math.curves.Path.add: weight cannot be less than 0");
}
_196.push(_19a);
_197.push(_19b);
_199+=_19b;
computeRanges();
};
this.remove=function(_19c){
for(var i=0;i<_196.length;i++){
if(_196[i]==_19c){
_196.splice(i,1);
_199-=_197.splice(i,1)[0];
break;
}
}
computeRanges();
};
this.removeAll=function(){
_196=[];
_197=[];
_199=0;
};
this.getValue=function(n){
var _19f=false,_1a0=0;
for(var i=0;i<_198.length;i++){
var r=_198[i];
if(n>=r[0]&&n<r[1]){
var subN=(n-r[0])/r[2];
_1a0=_196[i].getValue(subN);
_19f=true;
break;
}
}
if(!_19f){
_1a0=_196[_196.length-1].getValue(1);
}
for(var j=0;j<i;j++){
_1a0=dojo.math.points.translate(_1a0,_196[j].getValue(1));
}
return _1a0;
};
function computeRanges(){
var _1a5=0;
for(var i=0;i<_197.length;i++){
var end=_1a5+_197[i]/_199;
var len=end-_1a5;
_198[i]=[_1a5,end,len];
_1a5=end;
}
}
return this;
}};
dojo.provide("dojo.animation.Animation");
dojo.deprecated("dojo.animation.Animation is slated for removal in 0.5; use dojo.lfx.* instead.","0.5");
dojo.animation.Animation=function(_1a9,_1aa,_1ab,_1ac,rate){
if(dojo.lang.isArray(_1a9)){
_1a9=new dojo.math.curves.Line(_1a9[0],_1a9[1]);
}
this.curve=_1a9;
this.duration=_1aa;
this.repeatCount=_1ac||0;
this.rate=rate||25;
if(_1ab){
if(dojo.lang.isFunction(_1ab.getValue)){
this.accel=_1ab;
}else{
var i=0.35*_1ab+0.5;
this.accel=new dojo.math.curves.CatmullRom([[0],[i],[1]],0.45);
}
}
};
dojo.lang.extend(dojo.animation.Animation,{curve:null,duration:0,repeatCount:0,accel:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,handler:null,_animSequence:null,_startTime:null,_endTime:null,_lastFrame:null,_timer:null,_percent:0,_active:false,_paused:false,_startRepeatCount:0,play:function(_1af){
if(_1af){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return;
}
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._lastFrame=this._startTime;
var e=new dojo.animation.AnimationEvent(this,null,this.curve.getValue(this._percent),this._startTime,this._startTime,this._endTime,this.duration,this._percent,0);
this._active=true;
this._paused=false;
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
e.type="begin";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
e.type="play";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPlay=="function"){
this.onPlay(e);
}
if(this._animSequence){
this._animSequence._setCurrent(this);
}
this._cycle();
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return;
}
this._paused=true;
var e=new dojo.animation.AnimationEvent(this,"pause",this.curve.getValue(this._percent),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent,0);
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPause=="function"){
this.onPause(e);
}
},playPause:function(){
if(!this._active||this._paused){
this.play();
}else{
this.pause();
}
},gotoPercent:function(pct,_1b3){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_1b3){
this.play();
}
},stop:function(_1b4){
clearTimeout(this._timer);
var step=this._percent/100;
if(_1b4){
step=1;
}
var e=new dojo.animation.AnimationEvent(this,"stop",this.curve.getValue(step),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent);
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onStop=="function"){
this.onStop(e);
}
this._active=false;
this._paused=false;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
var fps=1000/(curr-this._lastFrame);
this._lastFrame=curr;
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if(this.accel&&this.accel.getValue){
step=this.accel.getValue(step);
}
var e=new dojo.animation.AnimationEvent(this,"animate",this.curve.getValue(step),this._startTime,curr,this._endTime,this.duration,this._percent,Math.round(fps));
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onAnimate=="function"){
this.onAnimate(e);
}
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
e.type="end";
this._active=false;
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this.repeatCount--;
this.play(true);
}else{
if(this.repeatCount==-1){
this.play(true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
if(this._animSequence){
this._animSequence._playNext();
}
}
}
}
}
}});
dojo.provide("dojo.animation.AnimationSequence");
dojo.deprecated("dojo.animation.AnimationSequence is slated for removal in 0.5; use dojo.lfx.* instead.","0.5");
dojo.animation.AnimationSequence=function(_1bb){
this._anims=[];
this.repeatCount=_1bb||0;
};
dojo.lang.extend(dojo.animation.AnimationSequence,{repeatCount:0,_anims:[],_currAnim:-1,onBegin:null,onEnd:null,onNext:null,handler:null,add:function(){
for(var i=0;i<arguments.length;i++){
this._anims.push(arguments[i]);
arguments[i]._animSequence=this;
}
},remove:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._anims[i]._animSequence=null;
this._anims.splice(i,1);
break;
}
}
},removeAll:function(){
for(var i=0;i<this._anims.length;i++){
this._anims[i]._animSequence=null;
}
this._anims=[];
this._currAnim=-1;
},clear:function(){
this.removeAll();
},play:function(_1c0){
if(this._anims.length==0){
return;
}
if(_1c0||!this._anims[this._currAnim]){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
if(this._currAnim==0){
var e={type:"begin",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
this._anims[this._currAnim].play(_1c0);
}
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
}
},playPause:function(){
if(this._anims.length==0){
return;
}
if(this._currAnim==-1){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
this._anims[this._currAnim].playPause();
}
},stop:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].stop();
}
},status:function(){
if(this._anims[this._currAnim]){
return this._anims[this._currAnim].status();
}else{
return "stopped";
}
},_setCurrent:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._currAnim=i;
break;
}
}
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return;
}
this._currAnim++;
if(this._anims[this._currAnim]){
var e={type:"next",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onNext=="function"){
this.onNext(e);
}
this._anims[this._currAnim].play(true);
}else{
var e={type:"end",animation:this._anims[this._anims.length-1]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this._currAnim=0;
this.repeatCount--;
this._anims[this._currAnim].play(true);
}else{
if(this.repeatCount==-1){
this._currAnim=0;
this._anims[this._currAnim].play(true);
}else{
this._currAnim=-1;
}
}
}
}});
dojo.kwCompoundRequire({common:["dojo.animation.AnimationEvent","dojo.animation.Animation","dojo.animation.AnimationSequence"]});
dojo.provide("dojo.animation.*");
dojo.deprecated("dojo.Animation.* is slated for removal in 0.5; use dojo.lfx.* instead.","0.5");
dojo.provide("dojo.collections.Collections");
dojo.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
dojo.collections.Iterator=function(arr){
var a=arr;
var _1c9=0;
this.element=a[_1c9]||null;
this.atEnd=function(){
return (_1c9>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_1c9++];
return this.element;
};
this.map=function(fn,_1cb){
var s=_1cb||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_1c9=0;
this.element=a[_1c9];
};
};
dojo.collections.DictionaryIterator=function(obj){
var a=[];
var _1d1={};
for(var p in obj){
if(!_1d1[p]){
a.push(obj[p]);
}
}
var _1d3=0;
this.element=a[_1d3]||null;
this.atEnd=function(){
return (_1d3>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_1d3++];
return this.element;
};
this.map=function(fn,_1d5){
var s=_1d5||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_1d3=0;
this.element=a[_1d3];
};
};
dojo.provide("dojo.collections.ArrayList");
dojo.collections.ArrayList=function(arr){
var _1da=[];
if(arr){
_1da=_1da.concat(arr);
}
this.count=_1da.length;
this.add=function(obj){
_1da.push(obj);
this.count=_1da.length;
};
this.addRange=function(a){
if(a.getIterator){
var e=a.getIterator();
while(!e.atEnd()){
this.add(e.get());
}
this.count=_1da.length;
}else{
for(var i=0;i<a.length;i++){
_1da.push(a[i]);
}
this.count=_1da.length;
}
};
this.clear=function(){
_1da.splice(0,_1da.length);
this.count=0;
};
this.clone=function(){
return new dojo.collections.ArrayList(_1da);
};
this.contains=function(obj){
for(var i=0;i<_1da.length;i++){
if(_1da[i]==obj){
return true;
}
}
return false;
};
this.forEach=function(fn,_1e2){
var s=_1e2||dj_global;
if(Array.forEach){
Array.forEach(_1da,fn,s);
}else{
for(var i=0;i<_1da.length;i++){
fn.call(s,_1da[i],i,_1da);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(_1da);
};
this.indexOf=function(obj){
for(var i=0;i<_1da.length;i++){
if(_1da[i]==obj){
return i;
}
}
return -1;
};
this.insert=function(i,obj){
_1da.splice(i,0,obj);
this.count=_1da.length;
};
this.item=function(i){
return _1da[i];
};
this.remove=function(obj){
var i=this.indexOf(obj);
if(i>=0){
_1da.splice(i,1);
}
this.count=_1da.length;
};
this.removeAt=function(i){
_1da.splice(i,1);
this.count=_1da.length;
};
this.reverse=function(){
_1da.reverse();
};
this.sort=function(fn){
if(fn){
_1da.sort(fn);
}else{
_1da.sort();
}
};
this.setByIndex=function(i,obj){
_1da[i]=obj;
this.count=_1da.length;
};
this.toArray=function(){
return [].concat(_1da);
};
this.toString=function(_1f0){
return _1da.join((_1f0||","));
};
};
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_1f2){
var _1f3=window,_1f4=2;
if(!dojo.lang.isFunction(func)){
_1f3=func;
func=_1f2;
_1f2=arguments[2];
_1f4++;
}
if(dojo.lang.isString(func)){
func=_1f3[func];
}
var args=[];
for(var i=_1f4;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_1f3,args);
},_1f2);
};
dojo.lang.clearTimeout=function(_1f7){
dojo.global().clearTimeout(_1f7);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_200,_201,_202){
with(dojo.parseObjPath(_200,_201,_202)){
return dojo.evalProp(prop,obj,_202);
}
};
dojo.lang.setObjPathValue=function(_203,_204,_205,_206){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_206=true;
}
with(dojo.parseObjPath(_203,_205,_206)){
if(obj&&(_206||(prop in obj))){
obj[prop]=_204;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_207,_208,init,_20a){
if((dojo.lang.isFunction(_20a))||((!_20a)&&(!dojo.lang.isFunction(init)))){
var temp=_20a;
_20a=init;
init=temp;
}
var _20c=[];
if(dojo.lang.isArray(_208)){
_20c=_208;
_208=_20c.shift();
}
if(!init){
init=dojo.evalObjPath(_207,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_208?_208.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _208();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_20c;
for(var i=0,l=_20c.length;i<l;i++){
dojo.lang.extend(ctor,_20c[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_207;
if(dojo.lang.isArray(_20a)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_20a));
}else{
dojo.lang.extend(ctor,(_20a)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _211=dojo.parseObjPath(_207,null,true);
_211.obj[_211.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_217,_218,args){
var _21a,_21b=this.___proto;
this.___proto=_217;
try{
_21a=_217[_218].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_21b;
}
return _21a;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_22b){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_22b.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_22b[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_232){
},dropTargets:[],registerDropTarget:function(_233){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _238=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_238++;
break;
}
}
return _238==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_23c){
var _23d=dojo.lang.isString(arr);
if(_23d){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_23c)){
_23c=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_23c){
var _23e=obj;
obj=_23c;
_23c=_23e;
}
}
if(Array.map){
var _23f=Array.map(arr,_23c,obj);
}else{
var _23f=[];
for(var i=0;i<arr.length;++i){
_23f.push(_23c.call(obj,arr[i]));
}
}
if(_23d){
return _23f.join("");
}else{
return _23f;
}
},reduce:function(arr,_242,obj,_244){
var _245=_242;
if(arguments.length==2){
_244=_242;
_245=arr[0];
arr=arr.slice(1);
}else{
if(arguments.length==3){
if(dojo.lang.isFunction(obj)){
_244=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_244;
_244=obj;
obj=tmp;
}
}
}
var ob=obj||dj_global;
dojo.lang.map(arr,function(val){
_245=_244.call(ob,_245,val);
});
return _245;
},forEach:function(_249,_24a,_24b){
if(dojo.lang.isString(_249)){
_249=_249.split("");
}
if(Array.forEach){
Array.forEach(_249,_24a,_24b);
}else{
if(!_24b){
_24b=dj_global;
}
for(var i=0,l=_249.length;i<l;i++){
_24a.call(_24b,_249[i],i,_249);
}
}
},_everyOrSome:function(_24e,arr,_250,_251){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_24e?"every":"some"](arr,_250,_251);
}else{
if(!_251){
_251=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _254=_250.call(_251,arr[i],i,arr);
if(_24e&&!_254){
return false;
}else{
if((!_24e)&&(_254)){
return true;
}
}
}
return Boolean(_24e);
}
},every:function(arr,_256,_257){
return this._everyOrSome(true,arr,_256,_257);
},some:function(arr,_259,_25a){
return this._everyOrSome(false,arr,_259,_25a);
},filter:function(arr,_25c,_25d){
var _25e=dojo.lang.isString(arr);
if(_25e){
arr=arr.split("");
}
var _25f;
if(Array.filter){
_25f=Array.filter(arr,_25c,_25d);
}else{
if(!_25d){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_25d=dj_global;
}
_25f=[];
for(var i=0;i<arr.length;i++){
if(_25c.call(_25d,arr[i],i,arr)){
_25f.push(arr[i]);
}
}
}
if(_25e){
return _25f.join("");
}else{
return _25f;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_264,_265){
var _266=[];
for(var i=_265||0;i<_264.length;i++){
_266.push(_264[i]);
}
return _266;
}});
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_269){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false,maxCalls:-1};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _26c=dl.nameAnonFunc(args[2],ao.adviceObj,_269);
ao.adviceFunc=_26c;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _26c=dl.nameAnonFunc(args[0],ao.srcObj,_269);
ao.srcFunc=_26c;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _26c=dl.nameAnonFunc(args[1],dj_global,_269);
ao.srcFunc=_26c;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _26c=dl.nameAnonFunc(args[3],dj_global,_269);
ao.adviceObj=dj_global;
ao.adviceFunc=_26c;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
ao.maxCalls=(!isNaN(parseInt(args[11])))?args[11]:-1;
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _26c=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_269);
ao.aroundFunc=_26c;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.connect(ao);
}
ao.srcFunc="onkeypress";
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _26e={};
for(var x in ao){
_26e[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_26e.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_26e));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _276;
if((arguments.length==1)&&(typeof a1=="object")){
_276=a1;
}else{
_276={srcObj:a1,srcFunc:a2};
}
_276.adviceFunc=function(){
var _277=[];
for(var x=0;x<arguments.length;x++){
_277.push(arguments[x]);
}
dojo.debug("("+_276.srcObj+")."+_276.srcFunc,":",_277.join(", "));
};
this.kwConnect(_276);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this.connectRunOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.maxCalls=1;
return this.connect(ao);
};
this._kwConnectImpl=function(_27f,_280){
var fn=(_280)?"disconnect":"connect";
if(typeof _27f["srcFunc"]=="function"){
_27f.srcObj=_27f["srcObj"]||dj_global;
var _282=dojo.lang.nameAnonFunc(_27f.srcFunc,_27f.srcObj,true);
_27f.srcFunc=_282;
}
if(typeof _27f["adviceFunc"]=="function"){
_27f.adviceObj=_27f["adviceObj"]||dj_global;
var _282=dojo.lang.nameAnonFunc(_27f.adviceFunc,_27f.adviceObj,true);
_27f.adviceFunc=_282;
}
_27f.srcObj=_27f["srcObj"]||dj_global;
_27f.adviceObj=_27f["adviceObj"]||_27f["targetObj"]||dj_global;
_27f.adviceFunc=_27f["adviceFunc"]||_27f["targetFunc"];
return dojo.event[fn](_27f);
};
this.kwConnect=function(_283){
return this._kwConnectImpl(_283,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_286){
return this._kwConnectImpl(_286,true);
};
};
dojo.event.MethodInvocation=function(_287,obj,args){
this.jp_=_287;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_28f){
this.object=obj||dj_global;
this.methodname=_28f;
this.methodfunc=this.object[_28f];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_291){
if(!obj){
obj=dj_global;
}
var ofn=obj[_291];
if(!ofn){
ofn=obj[_291]=function(){
};
if(!obj[_291]){
dojo.raise("Cannot set do-nothing method on that object "+_291);
}
}else{
if((typeof ofn!="function")&&(!dojo.lang.isFunction(ofn))&&(!dojo.lang.isAlien(ofn))){
return null;
}
}
var _293=_291+"$joinpoint";
var _294=_291+"$joinpoint$method";
var _295=obj[_293];
if(!_295){
var _296=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_296=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_293,_294,_291]);
}
}
var _297=ofn.length;
obj[_294]=ofn;
_295=obj[_293]=new dojo.event.MethodJoinPoint(obj,_294);
if(!_296){
obj[_291]=function(){
return _295.run.apply(_295,arguments);
};
}else{
obj[_291]=function(){
var args=[];
if(!arguments.length){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _295.run.apply(_295,args);
};
}
obj[_291].__preJoinArity=_297;
}
return _295;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{squelch:false,unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _29d=[];
for(var x=0;x<args.length;x++){
_29d[x]=args[x];
}
var _29f=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _2a1=marr[0]||dj_global;
var _2a2=marr[1];
if(!_2a1[_2a2]){
dojo.raise("function \""+_2a2+"\" does not exist on \""+_2a1+"\"");
}
var _2a3=marr[2]||dj_global;
var _2a4=marr[3];
var msg=marr[6];
var _2a6=marr[7];
if(_2a6>-1){
if(_2a6==0){
return;
}
marr[7]--;
}
var _2a7;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _2a1[_2a2].apply(_2a1,to.args);
}};
to.args=_29d;
var _2a9=parseInt(marr[4]);
var _2aa=((!isNaN(_2a9))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _2ad=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_29f(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_2a4){
_2a3[_2a4].call(_2a3,to);
}else{
if((_2aa)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_2a1[_2a2].call(_2a1,to);
}else{
_2a1[_2a2].apply(_2a1,args);
}
},_2a9);
}else{
if(msg){
_2a1[_2a2].call(_2a1,to);
}else{
_2a1[_2a2].apply(_2a1,args);
}
}
}
};
var _2b0=function(){
if(this.squelch){
try{
return _29f.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _29f.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_2b0);
}
var _2b1;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_2b1=mi.proceed();
}else{
if(this.methodfunc){
_2b1=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_2b0);
}
return (this.methodfunc)?_2b1:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"],args["maxCalls"]);
},addAdvice:function(_2b6,_2b7,_2b8,_2b9,_2ba,_2bb,once,_2bd,rate,_2bf,_2c0){
var arr=this.getArr(_2ba);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_2b6,_2b7,_2b8,_2b9,_2bd,rate,_2bf,_2c0];
if(once){
if(this.hasAdvice(_2b6,_2b7,_2ba,arr)>=0){
return;
}
}
if(_2bb=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_2c3,_2c4,_2c5,arr){
if(!arr){
arr=this.getArr(_2c5);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _2c4=="object")?(new String(_2c4)).toString():_2c4;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_2c3)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_2cb,_2cc,_2cd,once){
var arr=this.getArr(_2cd);
var ind=this.hasAdvice(_2cb,_2cc,_2cd,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_2cb,_2cc,_2cd,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_2d1){
if(!this.topics[_2d1]){
this.topics[_2d1]=new this.TopicImpl(_2d1);
}
return this.topics[_2d1];
};
this.registerPublisher=function(_2d2,obj,_2d4){
var _2d2=this.getTopic(_2d2);
_2d2.registerPublisher(obj,_2d4);
};
this.subscribe=function(_2d5,obj,_2d7){
var _2d5=this.getTopic(_2d5);
_2d5.subscribe(obj,_2d7);
};
this.unsubscribe=function(_2d8,obj,_2da){
var _2d8=this.getTopic(_2d8);
_2d8.unsubscribe(obj,_2da);
};
this.destroy=function(_2db){
this.getTopic(_2db).destroy();
delete this.topics[_2db];
};
this.publishApply=function(_2dc,args){
var _2dc=this.getTopic(_2dc);
_2dc.sendMessage.apply(_2dc,args);
};
this.publish=function(_2de,_2df){
var _2de=this.getTopic(_2de);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_2de.sendMessage.apply(_2de,args);
};
};
dojo.event.topic.TopicImpl=function(_2e2){
this.topicName=_2e2;
this.subscribe=function(_2e3,_2e4){
var tf=_2e4||_2e3;
var to=(!_2e4)?dj_global:_2e3;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_2e7,_2e8){
var tf=(!_2e8)?_2e7:_2e8;
var to=(!_2e8)?null:_2e7;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_2eb){
this._getJoinPoint().squelch=_2eb;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_2ec,_2ed){
dojo.event.connect(_2ec,_2ed,this,"sendMessage");
};
this.sendMessage=function(_2ee){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_2f1){
var na;
var tna;
if(_2f1){
tna=_2f1.all||_2f1.getElementsByTagName("*");
na=[_2f1];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _2f5={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _2fa=0;
this.normalizedEventName=function(_2fb){
switch(_2fb){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _2fb;
break;
default:
var lcn=_2fb.toLowerCase();
return (lcn.indexOf("on")==0)?lcn.substr(2):lcn;
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_300){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_300.length;x++){
node.__clobberAttrs__.push(_300[x]);
}
};
this.removeListener=function(node,_303,fp,_305){
if(!_305){
var _305=false;
}
_303=dojo.event.browser.normalizedEventName(_303);
if(_303=="key"){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_305);
}
_303="keypress";
}
if(node.removeEventListener){
node.removeEventListener(_303,fp,_305);
}
};
this.addListener=function(node,_307,fp,_309,_30a){
if(!node){
return;
}
if(!_309){
var _309=false;
}
_307=dojo.event.browser.normalizedEventName(_307);
if(_307=="key"){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_309,_30a);
}
_307="keypress";
}
if(!_30a){
var _30b=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_309){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_30b=fp;
}
if(node.addEventListener){
node.addEventListener(_307,_30b,_309);
return _30b;
}else{
_307="on"+_307;
if(typeof node[_307]=="function"){
var _30e=node[_307];
node[_307]=function(e){
_30e(e);
return _30b(e);
};
}else{
node[_307]=_30b;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_307]);
}
return _30b;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_311,_312){
if(typeof _311!="function"){
dojo.raise("listener not a function: "+_311);
}
dojo.event.browser.currentEvent.currentTarget=_312;
return _311.call(_312,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_315){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _317=evt.keyCode;
if(_317>=65&&_317<=90&&evt.shiftKey==false){
_317+=32;
}
if(_317>=1&&_317<=26&&evt.ctrlKey){
_317+=96;
}
evt.key=String.fromCharCode(_317);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _317=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_317+=32;
}
evt.key=String.fromCharCode(_317);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_315?_315:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _319=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_319.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_319.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event.common","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _31c=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_31c.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_31e,_31f){
var node=_31e.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_31f&&node&&node.tagName&&node.tagName.toLowerCase()!=_31f.toLowerCase()){
node=dojo.dom.nextElement(node,_31f);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_321,_322){
var node=_321.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_322&&node&&node.tagName&&node.tagName.toLowerCase()!=_322.toLowerCase()){
node=dojo.dom.prevElement(node,_322);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_325){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_325&&_325.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_325);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_327){
if(!node){
return null;
}
if(_327){
_327=_327.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_327&&_327.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_327);
}
return node;
};
dojo.dom.moveChildren=function(_328,_329,trim){
var _32b=0;
if(trim){
while(_328.hasChildNodes()&&_328.firstChild.nodeType==dojo.dom.TEXT_NODE){
_328.removeChild(_328.firstChild);
}
while(_328.hasChildNodes()&&_328.lastChild.nodeType==dojo.dom.TEXT_NODE){
_328.removeChild(_328.lastChild);
}
}
while(_328.hasChildNodes()){
_329.appendChild(_328.firstChild);
_32b++;
}
return _32b;
};
dojo.dom.copyChildren=function(_32c,_32d,trim){
var _32f=_32c.cloneNode(true);
return this.moveChildren(_32f,_32d,trim);
};
dojo.dom.replaceChildren=function(node,_331){
var _332=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_332.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_331);
for(var i=0;i<_332.length;i++){
dojo.dom.destroyNode(_332[i]);
}
};
dojo.dom.removeChildren=function(node){
var _335=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _335;
};
dojo.dom.replaceNode=function(node,_337){
return node.parentNode.replaceChild(_337,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_33b,_33c){
var _33d=[];
var _33e=(_33b&&(_33b instanceof Function||typeof _33b=="function"));
while(node){
if(!_33e||_33b(node)){
_33d.push(node);
}
if(_33c&&_33d.length>0){
return _33d[0];
}
node=node.parentNode;
}
if(_33c){
return null;
}
return _33d;
};
dojo.dom.getAncestorsByTag=function(node,tag,_341){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_341);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_346,_347){
if(_347&&node){
node=node.parentNode;
}
while(node){
if(node==_346){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _34a=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _34b=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_34b.length;i++){
try{
doc=new ActiveXObject(_34b[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_34a.implementation)&&(_34a.implementation.createDocument)){
doc=_34a.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_34e){
if(!_34e){
_34e="text/xml";
}
if(!dj_undef("DOMParser")){
var _34f=new DOMParser();
return _34f.parseFromString(str,_34e);
}else{
if(!dj_undef("ActiveXObject")){
var _350=dojo.dom.createDocument();
if(_350){
_350.async=false;
_350.loadXML(str);
return _350;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _351=dojo.doc();
if(_351.createElement){
var tmp=_351.createElement("xml");
tmp.innerHTML=str;
if(_351.implementation&&_351.implementation.createDocument){
var _353=_351.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_353.importNode(tmp.childNodes.item(i),true);
}
return _353;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_356){
if(_356.firstChild){
_356.insertBefore(node,_356.firstChild);
}else{
_356.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_359){
if((_359!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _35a=ref.parentNode;
_35a.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_35d){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_35d!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_35d);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_361){
if((!node)||(!ref)||(!_361)){
return false;
}
switch(_361.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_363,_364){
var _365=_363.childNodes;
if(!_365.length||_365.length==_364){
_363.appendChild(node);
return true;
}
if(_364==0){
return dojo.dom.prependChild(node,_363);
}
return dojo.dom.insertAfter(node,_365[_364-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _368=dojo.doc();
dojo.dom.replaceChildren(node,_368.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _369="";
if(node==null){
return _369;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_369+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_369+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _369;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_36f,_370,_371){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_36f,_370,_371);
}else{
var _372=elem.ownerDocument;
var _373=_372.createNode(2,_370,_36f);
_373.nodeValue=_371;
elem.setAttributeNode(_373);
}
};
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _376=dojo.global();
var _377=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_377.documentElement.clientWidth;
h=_376.innerHeight;
}else{
if(!dojo.render.html.opera&&_376.innerWidth){
w=_376.innerWidth;
h=_376.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_377,"documentElement.clientWidth")){
var w2=_377.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_377.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _37b=dojo.global();
var _37c=dojo.doc();
var top=_37b.pageYOffset||_37c.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_37b.pageXOffset||_37c.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _381=dojo.doc();
var _382=dojo.byId(node);
type=type.toLowerCase();
while((_382)&&(_382.nodeName.toLowerCase()!=type)){
if(_382==(_381["body"]||_381["documentElement"])){
return null;
}
_382=_382.parentNode;
}
return _382;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _38a={x:0,y:0};
if(e.pageX||e.pageY){
_38a.x=e.pageX;
_38a.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_38a.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_38a.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _38a;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _38f=dojo.doc().createElement("script");
_38f.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_38f);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_392,_393,args,_395,_396){
dojo.deprecated("dojo.html."+_392,"replaced by dojo.html."+_393+"("+(_395?"node, {"+_395+": "+_395+"}":"")+")"+(_396?"."+_396:""),"0.5");
var _397=[];
if(_395){
var _398={};
_398[_395]=args[1];
_397.push(args[0]);
_397.push(_398);
}else{
_397=args;
}
var ret=dojo.html[_393].apply(dojo.html,args);
if(_396){
return ret[_396];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_39b,uri){
var loc=dojo.hostenv.getModuleSymbols(_39b).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _39e=loc.indexOf(":");
var _39f=loc.indexOf("/");
if(loc.charAt(0)!="/"&&(_39e==-1||_39e>_39f)){
loc=dojo.hostenv.getBaseScriptUri()+loc;
}
return new dojo.uri.Uri(loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _3a2=new dojo.uri.Uri(arguments[i].toString());
var _3a3=new dojo.uri.Uri(uri.toString());
if((_3a2.path=="")&&(_3a2.scheme==null)&&(_3a2.authority==null)&&(_3a2.query==null)){
if(_3a2.fragment!=null){
_3a3.fragment=_3a2.fragment;
}
_3a2=_3a3;
}else{
if(_3a2.scheme==null){
_3a2.scheme=_3a3.scheme;
if(_3a2.authority==null){
_3a2.authority=_3a3.authority;
if(_3a2.path.charAt(0)!="/"){
var path=_3a3.path.substring(0,_3a3.path.lastIndexOf("/")+1)+_3a2.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_3a2.path=segs.join("/");
}
}
}
}
uri="";
if(_3a2.scheme!=null){
uri+=_3a2.scheme+":";
}
if(_3a2.authority!=null){
uri+="//"+_3a2.authority;
}
uri+=_3a2.path;
if(_3a2.query!=null){
uri+="?"+_3a2.query;
}
if(_3a2.fragment!=null){
uri+="#"+_3a2.fragment;
}
}
this.uri=uri.toString();
var _3a7="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_3a7));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_3a7="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_3a7));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_3ae){
return (new RegExp("(^|\\s+)"+_3ae+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_3b0){
_3b0+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_3b0);
};
dojo.html.addClass=function(node,_3b2){
if(dojo.html.hasClass(node,_3b2)){
return false;
}
_3b2=(dojo.html.getClass(node)+" "+_3b2).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_3b2);
};
dojo.html.setClass=function(node,_3b4){
node=dojo.byId(node);
var cs=new String(_3b4);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_3b4);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_3b7,_3b8){
try{
if(!_3b8){
var _3b9=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_3b7+"(\\s+|$)"),"$1$2");
}else{
var _3b9=dojo.html.getClass(node).replace(_3b7,"");
}
dojo.html.setClass(node,_3b9);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_3bb,_3bc){
dojo.html.removeClass(node,_3bc);
dojo.html.addClass(node,_3bb);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_3bd,_3be,_3bf,_3c0,_3c1){
_3c1=false;
var _3c2=dojo.doc();
_3be=dojo.byId(_3be)||_3c2;
var _3c3=_3bd.split(/\s+/g);
var _3c4=[];
if(_3c0!=1&&_3c0!=2){
_3c0=0;
}
var _3c5=new RegExp("(\\s|^)(("+_3c3.join(")|(")+"))(\\s|$)");
var _3c6=_3c3.join(" ").length;
var _3c7=[];
if(!_3c1&&_3c2.evaluate){
var _3c8=".//"+(_3bf||"*")+"[contains(";
if(_3c0!=dojo.html.classMatchType.ContainsAny){
_3c8+="concat(' ',@class,' '), ' "+_3c3.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_3c0==2){
_3c8+=" and string-length(@class)="+_3c6+"]";
}else{
_3c8+="]";
}
}else{
_3c8+="concat(' ',@class,' '), ' "+_3c3.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _3c9=_3c2.evaluate(_3c8,_3be,null,XPathResult.ANY_TYPE,null);
var _3ca=_3c9.iterateNext();
while(_3ca){
try{
_3c7.push(_3ca);
_3ca=_3c9.iterateNext();
}
catch(e){
break;
}
}
return _3c7;
}else{
if(!_3bf){
_3bf="*";
}
_3c7=_3be.getElementsByTagName(_3bf);
var node,i=0;
outer:
while(node=_3c7[i++]){
var _3cd=dojo.html.getClasses(node);
if(_3cd.length==0){
continue outer;
}
var _3ce=0;
for(var j=0;j<_3cd.length;j++){
if(_3c5.test(_3cd[j])){
if(_3c0==dojo.html.classMatchType.ContainsAny){
_3c4.push(node);
continue outer;
}else{
_3ce++;
}
}else{
if(_3c0==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_3ce==_3c3.length){
if((_3c0==dojo.html.classMatchType.IsOnly)&&(_3ce==_3cd.length)){
_3c4.push(node);
}else{
if(_3c0==dojo.html.classMatchType.ContainsAll){
_3c4.push(node);
}
}
}
}
return _3c4;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_3d0){
var arr=_3d0.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_3d4){
return _3d4.replace(/([A-Z])/g,"-$1").toLowerCase();
};
if(dojo.render.html.ie){
dojo.html.getComputedStyle=function(node,_3d6,_3d7){
node=dojo.byId(node);
if(!node||!node.currentStyle){
return _3d7;
}
return node.currentStyle[dojo.html.toCamelCase(_3d6)];
};
dojo.html.getComputedStyles=function(node){
return node.currentStyle;
};
}else{
dojo.html.getComputedStyle=function(node,_3da,_3db){
node=dojo.byId(node);
if(!node||!node.style){
return _3db;
}
var s=document.defaultView.getComputedStyle(node,null);
return (s&&s[dojo.html.toCamelCase(_3da)])||"";
};
dojo.html.getComputedStyles=function(node){
return document.defaultView.getComputedStyle(node,null);
};
}
dojo.html.getStyleProperty=function(node,_3df){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_3df)]:undefined);
};
dojo.html.getStyle=function(node,_3e1){
var _3e2=dojo.html.getStyleProperty(node,_3e1);
return (_3e2?_3e2:dojo.html.getComputedStyle(node,_3e1));
};
dojo.html.setStyle=function(node,_3e4,_3e5){
node=dojo.byId(node);
if(node&&node.style){
var _3e6=dojo.html.toCamelCase(_3e4);
node.style[_3e6]=_3e5;
}
};
dojo.html.setStyleText=function(_3e7,text){
try{
_3e7.style.cssText=text;
}
catch(e){
_3e7.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_3e9,_3ea){
if(!_3ea.style.cssText){
_3e9.setAttribute("style",_3ea.getAttribute("style"));
}else{
_3e9.style.cssText=_3ea.style.cssText;
}
dojo.html.addClass(_3e9,dojo.html.getClass(_3ea));
};
dojo.html.getUnitValue=function(node,_3ec,_3ed){
var s=dojo.html.getComputedStyle(node,_3ec);
if((!s)||((s=="auto")&&(_3ed))){
return {value:0,units:"px"};
}
var _3ef=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_3ef){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_3ef[1]),units:_3ef[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
if(dojo.render.html.ie){
dojo.html.toPixelValue=function(_3f0,_3f1){
if(!_3f1){
return 0;
}
if(_3f1.slice(-2)=="px"){
return parseFloat(_3f1);
}
var _3f2=0;
with(_3f0){
var _3f3=style.left;
var _3f4=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_3f1||0;
_3f2=style.pixelLeft;
style.left=_3f3;
runtimeStyle.left=_3f4;
}
catch(e){
}
}
return _3f2;
};
}else{
dojo.html.toPixelValue=function(_3f5,_3f6){
return (_3f6&&(_3f6.slice(-2)=="px")?parseFloat(_3f6):0);
};
}
dojo.html.getPixelValue=function(node,_3f8,_3f9){
return dojo.html.toPixelValue(node,dojo.html.getComputedStyle(node,_3f8));
};
dojo.html.setPositivePixelValue=function(node,_3fb,_3fc){
if(isNaN(_3fc)){
return false;
}
node.style[_3fb]=Math.max(0,_3fc)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_3fd,_3fe,_3ff){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_3ff=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_3ff=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_3fd+" { "+_3fe+" }";
return dojo.html.styleSheet.insertRule(rule,_3ff);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_3fd,_3fe,_3ff);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_401){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_401){
_401=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_401);
}
}else{
if(document.styleSheets[0]){
if(!_401){
_401=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_401);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_404,_405){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _406=dojo.hostenv.getText(URI,false,_405);
if(_406===null){
return;
}
_406=dojo.html.fixPathsInCssText(_406,URI);
if(_404){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_406)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _40b=doc.getElementsByTagName("style");
for(var i=0;i<_40b.length;i++){
if(_40b[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _40c=dojo.html.insertCssText(_406,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_406,"nodeRef":_40c});
if(_40c&&djConfig.isDebug){
_40c.setAttribute("dbgHref",URI);
}
return _40c;
};
dojo.html.insertCssText=function(_40d,doc,URI){
if(!_40d){
return;
}
if(!doc){
doc=document;
}
if(URI){
_40d=dojo.html.fixPathsInCssText(_40d,URI);
}
var _410=doc.createElement("style");
_410.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_410);
}
if(_410.styleSheet){
var _412=function(){
try{
_410.styleSheet.cssText=_40d;
}
catch(e){
dojo.debug(e);
}
};
if(_410.styleSheet.disabled){
setTimeout(_412,10);
}else{
_412();
}
}else{
var _413=doc.createTextNode(_40d);
_410.appendChild(_413);
}
return _410;
};
dojo.html.fixPathsInCssText=function(_414,URI){
if(!_414||!URI){
return;
}
var _416,str="",url="",_419="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _41a=new RegExp("url\\(\\s*("+_419+")\\s*\\)");
var _41b=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_419+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _41c=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_419+")['\"]");
while(_416=_41c.exec(_414)){
url=_416[2].replace(regexTrim,"$2");
if(!_41b.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_414.substring(0,_416.index)+"AlphaImageLoader("+_416[1]+"src='"+url+"'";
_414=_414.substr(_416.index+_416[0].length);
}
_414=str+_414;
str="";
}
while(_416=_41a.exec(_414)){
url=_416[1].replace(regexTrim,"$2");
if(!_41b.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_414.substring(0,_416.index)+"url("+url+")";
_414=_414.substr(_416.index+_416[0].length);
}
return str+_414;
};
dojo.html.setActiveStyleSheet=function(_41d){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_41d){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _429={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _429){
if(_429[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_42c,_42d){
node=dojo.byId(node);
_42d(node,!_42c(node));
return _42c(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_432){
dojo.html[(_432?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_438){
dojo.html.setStyle(node,"display",((_438 instanceof String||typeof _438=="string")?_438:(_438?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_43c){
dojo.html.setStyle(node,"visibility",((_43c instanceof String||typeof _43c=="string")?_43c:(_43c?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_440,_441){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_441){
if(_440>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_440=0.999999;
}
}else{
if(_440<0){
_440=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_440*100+")";
}
}
node.style.filter="Alpha(Opacity="+_440*100+")";
}else{
if(h.moz){
node.style.opacity=_440;
node.style.MozOpacity=_440;
}else{
if(h.safari){
node.style.opacity=_440;
node.style.KhtmlOpacity=_440;
}else{
node.style.opacity=_440;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _44d=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_44d+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _44d;
};
dojo.html.setStyleAttributes=function(node,_450){
node=dojo.byId(node);
var _451=_450.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_451.length;i++){
var _453=_451[i].split(":");
var name=_453[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _455=_453[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_455);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_455});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_455});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_455});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_455});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_455;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_457,_458){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_458){
_458=bs.CONTENT_BOX;
}
var _45b=2;
var _45c;
switch(_458){
case bs.MARGIN_BOX:
_45c=3;
break;
case bs.BORDER_BOX:
_45c=2;
break;
case bs.PADDING_BOX:
default:
_45c=1;
break;
case bs.CONTENT_BOX:
_45c=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_45b=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _460;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_460=db;
}else{
_460=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _462=node;
do{
var n=_462["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_462["offsetTop"];
ret.y+=isNaN(m)?0:m;
_462=_462.offsetParent;
}while((_462!=_460)&&(_462!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_457){
var _465=dojo.html.getScroll();
ret.y+=_465.top;
ret.x+=_465.left;
}
var _466=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_45b>_45c){
for(var i=_45c;i<_45b;++i){
ret.y+=_466[i](node,"top");
ret.x+=_466[i](node,"left");
}
}else{
if(_45b<_45c){
for(var i=_45c;i>_45b;--i){
ret.y-=_466[i-1](node,"top");
ret.x-=_466[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_46a,_46b){
var _46c=0;
for(var x=0;x<_46a.length;x++){
_46c+=dojo.html.getPixelValue(node,_46a[x],_46b);
}
return _46c;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _479=dojo.html.getBorder(node);
return {width:pad.width+_479.width,height:pad.height+_479.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName.toLowerCase()!="img"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _47e;
if(!h.ie){
_47e=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_47e){
_47e=dojo.html.getStyle(node,"box-sizing");
}
}
return (_47e?_47e:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _483=dojo.html.getBorder(node);
return {width:box.width-_483.width,height:box.height-_483.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _485=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_485.width,height:node.offsetHeight-_485.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _488=0;
var _489=0;
var isbb=dojo.html.isBorderBox(node);
var _48b=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_488=args.width+_48b.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_488);
}
if(typeof args.height!="undefined"){
_489=args.height+_48b.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_489);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _48e=dojo.html.getBorderBox(node);
var _48f=dojo.html.getMargin(node);
return {width:_48e.width+_48f.width,height:_48e.height+_48f.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _492=0;
var _493=0;
var isbb=dojo.html.isBorderBox(node);
var _495=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _496=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_492=args.width-_495.width;
_492-=_496.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_492);
}
if(typeof args.height!="undefined"){
_493=args.height-_495.height;
_493-=_496.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_493);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_49b,_49c,_49d){
if(_49b instanceof Array||typeof _49b=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_49b.length<4){
_49b.push(0);
}
while(_49b.length>4){
_49b.pop();
}
var ret={left:_49b[0],top:_49b[1],width:_49b[2],height:_49b[3]};
}else{
if(!_49b.nodeType&&!(_49b instanceof String||typeof _49b=="string")&&("width" in _49b||"height" in _49b||"left" in _49b||"x" in _49b||"top" in _49b||"y" in _49b)){
var ret={left:_49b.left||_49b.x||0,top:_49b.top||_49b.y||0,width:_49b.width||0,height:_49b.height||0};
}else{
var node=dojo.byId(_49b);
var pos=dojo.html.abs(node,_49c,_49d);
var _4a1=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_4a1.width,height:_4a1.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_4a3){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_4a6){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_4a8){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_4aa){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_4ac){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_4ae){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_4b8){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_4ba){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],dropTargets:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _4be=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_4be;
this.dragSources[_4be]=ds;
ds.domNode.setAttribute(dp,_4be);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _4c1=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_4c1];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _4c4=dojo.lang.find(this.dropTargets,dt,true);
if(_4c4>=0){
this.dropTargets.splice(_4c4,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _4ca=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_4ca,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_4cd){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_4ce){
var ret=null;
if(!_4ce){
return;
}
if(this.currentDropTarget){
e.dragObject=_4ce;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_4ce.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_4ce.dragSource.onDragEnd(e);
}
catch(err){
var _4d1={};
for(var i in e){
if(i=="type"){
_4d1.type="mouseup";
continue;
}
_4d1[i]=e[i];
}
_4ce.dragSource.onDragEnd(_4d1);
}
},function(){
_4ce.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_4da){
var tn=_4da.domNode;
if(!tn||!_4da.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_4da]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_4e1){
if(!_4e1){
return;
}
var tdo=_4e1.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_4e1;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_4e3){
if(_4e3){
_4e3.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _4e6=this.findBestTarget(e);
if(_4e6.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_4e6.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_4e6.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _4e8=this;
var _4e9=new Object();
_4e9.target=null;
_4e9.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_4ea){
if(!_4e8.isInsideBox(e,_4ea)){
return true;
}
_4e9.target=_4ea[2];
_4e9.points=_4ea;
return Boolean(_4e8.nestedTargets);
});
return _4e9;
},isInsideBox:function(e,_4ec){
if((e.pageX>_4ec[0][0])&&(e.pageX<_4ec[1][0])&&(e.pageY>_4ec[0][1])&&(e.pageY<_4ec[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.kwCompoundRequire({common:["dojo.html.common","dojo.html.style"]});
dojo.provide("dojo.html.*");
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_4f1){
return dojo.html.getDocumentWindow(_4f1.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
if(win.document != undefined)
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _4f9=dojo.html.getCursorPosition(e);
with(dojo.html){
var _4fa=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _4fc=_4fa.x+(bb.width/2);
var _4fd=_4fa.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_4f9.x<_4fc?WEST:EAST)|(_4f9.y<_4fd?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_4fe,e){
_4fe=dojo.byId(_4fe);
var _500=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_4fe);
var _502=dojo.html.getAbsolutePosition(_4fe,true,dojo.html.boxSizing.BORDER_BOX);
var top=_502.y;
var _504=top+bb.height;
var left=_502.x;
var _506=left+bb.width;
return (_500.x>=left&&_500.x<=_506&&_500.y>=top&&_500.y<=_504);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _508="";
if(node==null){
return _508;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _50a="unknown";
try{
_50a=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_50a){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_508+="\n";
_508+=dojo.html.renderedTextContent(node.childNodes[i]);
_508+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_508+="\n";
}else{
_508+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _50c="unknown";
try{
_50c=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_50c){
case "capitalize":
var _50d=text.split(" ");
for(var i=0;i<_50d.length;i++){
_50d[i]=_50d[i].charAt(0).toUpperCase()+_50d[i].substring(1);
}
text=_50d.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_50c){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_508)){
text.replace(/^\s/,"");
}
break;
}
_508+=text;
break;
default:
break;
}
}
return _508;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _511="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_511="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_511="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_511="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _512=null;
switch(_511){
case "cell":
_512=tn.getElementsByTagName("tr")[0];
break;
case "row":
_512=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_512=tn.getElementsByTagName("table")[0];
break;
default:
_512=tn;
break;
}
var _513=[];
for(var x=0;x<_512.childNodes.length;x++){
_513.push(_512.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _513;
};
dojo.html.placeOnScreen=function(node,_516,_517,_518,_519,_51a,_51b){
if(_516 instanceof Array||typeof _516=="array"){
_51b=_51a;
_51a=_519;
_519=_518;
_518=_517;
_517=_516[1];
_516=_516[0];
}
if(_51a instanceof String||typeof _51a=="string"){
_51a=_51a.split(",");
}
if(!isNaN(_518)){
_518=[Number(_518),Number(_518)];
}else{
if(!(_518 instanceof Array||typeof _518=="array")){
_518=[0,0];
}
}
var _51c=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _51e=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_51e;
if(!(_51a instanceof Array||typeof _51a=="array")){
_51a=["TL"];
}
var _522,_523,_524=Infinity,_525;
for(var _526=0;_526<_51a.length;++_526){
var _527=_51a[_526];
var _528=true;
var tryX=_516-(_527.charAt(1)=="L"?0:w)+_518[0]*(_527.charAt(1)=="L"?1:-1);
var tryY=_517-(_527.charAt(0)=="T"?0:h)+_518[1]*(_527.charAt(0)=="T"?1:-1);
if(_519){
tryX-=_51c.x;
tryY-=_51c.y;
}
if(tryX<0){
tryX=0;
_528=false;
}
if(tryY<0){
tryY=0;
_528=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_528=false;
}else{
x=tryX;
}
x=Math.max(_518[0],x)+_51c.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_528=false;
}else{
y=tryY;
}
y=Math.max(_518[1],y)+_51c.y;
if(_528){
_522=x;
_523=y;
_524=0;
_525=_527;
break;
}else{
var dist=Math.pow(x-tryX-_51c.x,2)+Math.pow(y-tryY-_51c.y,2);
if(_524>dist){
_524=dist;
_522=x;
_523=y;
_525=_527;
}
}
}
if(!_51b){
node.style.left=_522+"px";
node.style.top=_523+"px";
}
return {left:_522,top:_523,x:_522,y:_523,dist:_524,corner:_525};
};
dojo.html.placeOnScreenPoint=function(node,_52f,_530,_531,_532){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_52f,_530,_531,_532,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_534,_535,_536,_537,_538){
var best,_53a=Infinity;
_534=dojo.byId(_534);
var _53b=_534.style.display;
_534.style.display="";
var mb=dojo.html.getElementBox(_534,_536);
var _53d=mb.width;
var _53e=mb.height;
var _53f=dojo.html.getAbsolutePosition(_534,true,_536);
_534.style.display=_53b;
for(var _540 in _537){
var pos,_542,_543;
var _544=_537[_540];
_542=_53f.x+(_540.charAt(1)=="L"?0:_53d);
_543=_53f.y+(_540.charAt(0)=="T"?0:_53e);
pos=dojo.html.placeOnScreen(node,_542,_543,_535,true,_544,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_53a>pos.dist){
_53a=pos.dist;
best=pos;
}
}
}
if(!_538){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _546=node.parentNode;
var _547=_546.scrollTop+dojo.html.getBorderBox(_546).height;
var _548=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_547<_548){
_546.scrollTop+=(_548-_547);
}else{
if(_546.scrollTop>node.offsetTop){
_546.scrollTop-=(_546.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _549=dojo.global();
var _54a=dojo.doc();
try{
if(_549["getSelection"]){
if(dojo.render.html.safari){
_549.getSelection().collapse();
}else{
_549.getSelection().removeAllRanges();
}
}else{
if(_54a.selection){
if(_54a.selection.empty){
_54a.selection.empty();
}else{
if(_54a.selection.clear){
_54a.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_54b){
_54b=dojo.byId(_54b)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_54b.style.MozUserSelect="none";
}else{
if(h.safari){
_54b.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_54b.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_54d){
_54d=dojo.byId(_54d)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_54d.style.MozUserSelect="";
}else{
if(h.safari){
_54d.style.KhtmlUserSelect="";
}else{
if(h.ie){
_54d.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_54f){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_550){
var _551=dojo.global();
var _552=dojo.doc();
_550=dojo.byId(_550);
if(_552["selection"]&&dojo.body()["createTextRange"]){
var _553=_550.createTextRange();
_553.moveStart("character",0);
_553.moveEnd("character",_550.value.length);
_553.select();
}else{
if(_551["getSelection"]){
var _554=_551.getSelection();
_550.setSelectionRange(0,_550.value.length);
}
}
_550.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _555=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _557=oSel.getRangeAt(0);
if(_557.startContainer==_557.endContainer&&(_557.endOffset-_557.startOffset)==1&&_557.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_555=dojo.html.selectionType.CONTROL;
}
}
return _555;
}
},isCollapsed:function(){
var _558=dojo.global();
var _559=dojo.doc();
if(_559["selection"]){
return _559.selection.createRange().text=="";
}else{
if(_558["getSelection"]){
var _55a=_558.getSelection();
if(dojo.lang.isString(_55a)){
return _55a=="";
}else{
return _55a.isCollapsed||_55a.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _55b=dojo.doc().selection.createRange();
if(_55b&&_55b.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _55c=dojo.global().getSelection();
return _55c.anchorNode.childNodes[_55c.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _55e=dojo.global().getSelection();
if(_55e){
var node=_55e.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _560=dojo.global().getSelection();
if(_560){
return _560.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _561=dojo.global().getSelection();
if(_561&&_561.rangeCount){
var frag=_561.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_564){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_565){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_56a){
var _56b=dojo.global();
var _56c=dojo.doc();
_56a=dojo.byId(_56a);
if(_56c.selection&&dojo.body().createTextRange){
try{
var _56d=dojo.body().createControlRange();
_56d.addElement(_56a);
_56d.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_56a);
}
}else{
if(_56b["getSelection"]){
var _56e=_56b.getSelection();
if(_56e["removeAllRanges"]){
var _56d=_56c.createRange();
_56d.selectNode(_56a);
_56e.removeAllRanges();
_56e.addRange(_56d);
}
}
}
},selectElementChildren:function(_56f){
var _570=dojo.global();
var _571=dojo.doc();
_56f=dojo.byId(_56f);
if(_571.selection&&dojo.body().createTextRange){
var _572=dojo.body().createTextRange();
_572.moveToElementText(_56f);
_572.select();
}else{
if(_570["getSelection"]){
var _573=_570.getSelection();
if(_573["setBaseAndExtent"]){
_573.setBaseAndExtent(_56f,0,_56f,_56f.innerText.length-1);
}else{
if(_573["selectAllChildren"]){
_573.selectAllChildren(_56f);
}
}
}
}
},getBookmark:function(){
var _574;
var _575=dojo.doc();
if(_575["selection"]){
var _576=_575.selection.createRange();
_574=_576.getBookmark();
}else{
var _577;
try{
_577=dojo.global().getSelection();
}
catch(e){
}
if(_577){
var _576=_577.getRangeAt(0);
_574=_576.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _574;
},moveToBookmark:function(_578){
var _579=dojo.doc();
if(_579["selection"]){
var _57a=_579.selection.createRange();
_57a.moveToBookmark(_578);
_57a.select();
}else{
var _57b;
try{
_57b=dojo.global().getSelection();
}
catch(e){
}
if(_57b&&_57b["removeAllRanges"]){
_57b.removeAllRanges();
_57b.addRange(_578);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_57c){
if(dojo.global()["getSelection"]){
var _57d=dojo.global().getSelection();
if(_57d.removeAllRanges){
if(_57c){
_57d.collapseToStart();
}else{
_57d.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_57c);
}
}else{
if(dojo.doc().selection){
var _57e=dojo.doc().selection.createRange();
_57e.collapse(_57c);
_57e.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _57f=dojo.doc().selection;
if(_57f.type.toUpperCase()!="NONE"){
_57f.clear();
}
return _57f;
}else{
var _57f=dojo.global().getSelection();
for(var i=0;i<_57f.rangeCount;i++){
_57f.getRangeAt(i).deleteContents();
}
return _57f;
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_581){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_581))||dojo.html.iframeContentDocument(_581).__parent__||(_581.name&&document.frames[_581.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_583){
var doc=_583.contentDocument||((_583.contentWindow)&&(_583.contentWindow.document))||((_583.name)&&(document.frames[_583.name])&&(document.frames[_583.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _587=dojo.html.getMarginBox(this.domNode);
if(_587.width==0||_587.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_587.width+"px";
this.iframe.style.height=_587.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _589=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_589.width+"px";
height=_589.height+"px";
left=_589.left+"px";
top=_589.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_591){
if(_591){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_592,_593){
var rgb=null;
if(dojo.lang.isArray(_592)){
rgb=_592;
}else{
if(_592 instanceof dojo.gfx.color.Color){
rgb=_592.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_592).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_593);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_597){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_597);
}
if(!_597){
_597=0;
}
_597=Math.min(Math.max(-1,_597),1);
_597=((_597+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_597));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_59c){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_59c));
};
dojo.gfx.color.extractRGB=function(_59d){
var hex="0123456789abcdef";
_59d=_59d.toLowerCase();
if(_59d.indexOf("rgb")==0){
var _59f=_59d.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_59f.splice(1,3);
return ret;
}else{
var _5a1=dojo.gfx.color.hex2rgb(_59d);
if(_5a1){
return _5a1;
}else{
return dojo.gfx.color.named[_59d]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _5a3="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_5a3+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_5a3.indexOf(rgb[i].charAt(0))*16+_5a3.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_5ac,end){
this.start=_5ac;
this.end=end;
if(dojo.lang.isArray(_5ac)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_5ac;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
if((dojo.render.html.khtml)&&(!dojo.render.html.safari)){
dojo.lfx.easeDefault=function(n){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
};
}else{
dojo.lfx.easeDefault=function(n){
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
};
}
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:10,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_5bc,_5bd){
if(!_5bd){
_5bd=_5bc;
_5bc=this;
}
_5bd=dojo.lang.hitch(_5bc,_5bd);
var _5be=this[evt]||function(){
};
this[evt]=function(){
var ret=_5be.apply(this,arguments);
_5bd.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_5c2){
this.repeatCount=_5c2;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_5c3,_5c4,_5c5,_5c6,_5c7,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_5c3)||(!_5c3&&_5c4.getValue)){
rate=_5c7;
_5c7=_5c6;
_5c6=_5c5;
_5c5=_5c4;
_5c4=_5c3;
_5c3=null;
}else{
if(_5c3.getValue||dojo.lang.isArray(_5c3)){
rate=_5c6;
_5c7=_5c5;
_5c6=_5c4;
_5c5=_5c3;
_5c4=null;
_5c3=null;
}
}
if(dojo.lang.isArray(_5c5)){
this.curve=new dojo.lfx.Line(_5c5[0],_5c5[1]);
}else{
this.curve=_5c5;
}
if(_5c4!=null&&_5c4>0){
this.duration=_5c4;
}
if(_5c7){
this.repeatCount=_5c7;
}
if(rate){
this.rate=rate;
}
if(_5c3){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_5c3[item]){
this.connect(item,_5c3[item]);
}
},this);
}
if(_5c6&&dojo.lang.isFunction(_5c6)){
this.easing=_5c6;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_5ca,_5cb){
if(_5cb){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_5ca>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_5cb);
}),_5ca);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _5cd=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_5cd]);
this.fire("onBegin",[_5cd]);
}
this.fire("handler",["play",_5cd]);
this.fire("onPlay",[_5cd]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _5ce=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_5ce]);
this.fire("onPause",[_5ce]);
return this;
},gotoPercent:function(pct,_5d0){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_5d0){
this.play();
}
return this;
},stop:function(_5d1){
clearTimeout(this._timer);
var step=this._percent/100;
if(_5d1){
step=1;
}
var _5d3=this.curve.getValue(step);
this.fire("handler",["stop",_5d3]);
this.fire("onStop",[_5d3]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _5d6=this.curve.getValue(step);
this.fire("handler",["animate",_5d6]);
this.fire("onAnimate",[_5d6]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_5d7){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _5d8=arguments;
if(_5d8.length==1&&(dojo.lang.isArray(_5d8[0])||dojo.lang.isArrayLike(_5d8[0]))){
_5d8=_5d8[0];
}
dojo.lang.forEach(_5d8,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_5da,_5db){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_5da>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_5db);
}),_5da);
return this;
}
if(_5db||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_5db);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_5dc){
this.fire("onStop");
this._animsCall("stop",_5dc);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_5dd){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _5e0=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_5dd](args);
},_5e0);
return this;
}});
dojo.lfx.Chain=function(_5e2){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _5e3=arguments;
if(_5e3.length==1&&(dojo.lang.isArray(_5e3[0])||dojo.lang.isArrayLike(_5e3[0]))){
_5e3=_5e3[0];
}
var _5e4=this;
dojo.lang.forEach(_5e3,function(anim,i,_5e7){
this._anims.push(anim);
if(i<_5e7.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_5e8,_5e9){
if(!this._anims.length){
return this;
}
if(_5e9||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _5ea=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_5e8>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_5e9);
}),_5e8);
return this;
}
if(_5ea){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_5ea.play(null,_5e9);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _5eb=this._anims[this._currAnim];
if(_5eb){
if(!_5eb._active||_5eb._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _5ec=this._anims[this._currAnim];
if(_5ec){
_5ec.stop();
this.fire("onStop",[this._currAnim]);
}
return _5ec;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_5ed){
var _5ee=arguments;
if(dojo.lang.isArray(arguments[0])){
_5ee=arguments[0];
}
if(_5ee.length==1){
return _5ee[0];
}
return new dojo.lfx.Combine(_5ee);
};
dojo.lfx.chain=function(_5ef){
var _5f0=arguments;
if(dojo.lang.isArray(arguments[0])){
_5f0=arguments[0];
}
if(_5f0.length==1){
return _5f0[0];
}
return new dojo.lfx.Chain(_5f0);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _5f2;
do{
_5f2=dojo.html.getStyle(node,"background-color");
if(_5f2.toLowerCase()=="rgba(0, 0, 0, 0)"){
_5f2="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_5f2));
if(_5f2=="transparent"){
_5f2=[255,255,255,0];
}else{
_5f2=dojo.gfx.color.extractRGB(_5f2);
}
return _5f2;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_5f3){
if(!_5f3){
return [];
}
if(dojo.lang.isArrayLike(_5f3)){
if(!_5f3.alreadyChecked){
var n=[];
dojo.lang.forEach(_5f3,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _5f3;
}
}else{
var n=[];
n.push(dojo.byId(_5f3));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_5f6,_5f7,_5f8,_5f9,_5fa){
_5f6=dojo.lfx.html._byId(_5f6);
var _5fb={"propertyMap":_5f7,"nodes":_5f6,"duration":_5f8,"easing":_5f9||dojo.lfx.easeDefault};
var _5fc=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _600 in pm){
pm[_600].property=_600;
parr.push(pm[_600]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _602=function(_603){
var _604=[];
dojo.lang.forEach(_603,function(c){
_604.push(Math.round(c));
});
return _604;
};
var _606=function(n,_608){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _608){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_608[s]);
}else{
n.style[s]=_608[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _60a=function(_60b){
this._properties=_60b;
this.diffs=new Array(_60b.length);
dojo.lang.forEach(_60b,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _612=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_612=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_612+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_612+=")";
}else{
_612=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_612;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_5fc(_5fb);
anim.curve=new _60a(_5fb.propertyMap);
},onAnimate:function(_615){
dojo.lang.forEach(_5fb.nodes,function(node){
_606(node,_615);
});
}},_5fb.duration,null,_5fb.easing);
if(_5fa){
for(var x in _5fa){
if(dojo.lang.isFunction(_5fa[x])){
anim.connect(x,anim,_5fa[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_618){
var _619=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_618)){
dojo.lang.forEach(_618,_619);
}else{
_619(_618);
}
};
dojo.lfx.html.fade=function(_61b,_61c,_61d,_61e,_61f){
_61b=dojo.lfx.html._byId(_61b);
var _620={property:"opacity"};
if(!dj_undef("start",_61c)){
_620.start=_61c.start;
}else{
_620.start=function(){
return dojo.html.getOpacity(_61b[0]);
};
}
if(!dj_undef("end",_61c)){
_620.end=_61c.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_61b,[_620],_61d,_61e);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_61b);
});
if(_61f){
anim.connect("onEnd",function(){
_61f(_61b,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_622,_623,_624,_625){
return dojo.lfx.html.fade(_622,{end:1},_623,_624,_625);
};
dojo.lfx.html.fadeOut=function(_626,_627,_628,_629){
return dojo.lfx.html.fade(_626,{end:0},_627,_628,_629);
};
dojo.lfx.html.fadeShow=function(_62a,_62b,_62c,_62d){
_62a=dojo.lfx.html._byId(_62a);
dojo.lang.forEach(_62a,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_62a,_62b,_62c,_62d);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_62a)){
dojo.lang.forEach(_62a,dojo.html.show);
}else{
dojo.html.show(_62a);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_630,_631,_632,_633){
var anim=dojo.lfx.html.fadeOut(_630,_631,_632,function(){
if(dojo.lang.isArrayLike(_630)){
dojo.lang.forEach(_630,dojo.html.hide);
}else{
dojo.html.hide(_630);
}
if(_633){
_633(_630,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_635,_636,_637,_638){
_635=dojo.lfx.html._byId(_635);
var _639=[];
dojo.lang.forEach(_635,function(node){
var _63b={};
var _63c,_63d,_63e;
with(node.style){
_63c=top;
_63d=left;
_63e=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _63f=dojo.html.getBorderBox(node).height;
with(node.style){
top=_63c;
left=_63d;
position=_63e;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _63f;
}}},_636,_637);
anim.connect("beforeBegin",function(){
_63b.overflow=node.style.overflow;
_63b.height=node.style.height;
with(node.style){
overflow="hidden";
height="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_63b.overflow;
height=_63b.height;
}
if(_638){
_638(node,anim);
}
});
_639.push(anim);
});
return dojo.lfx.combine(_639);
};
dojo.lfx.html.wipeOut=function(_641,_642,_643,_644){
_641=dojo.lfx.html._byId(_641);
var _645=[];
dojo.lang.forEach(_641,function(node){
var _647={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_642,_643,{"beforeBegin":function(){
_647.overflow=node.style.overflow;
_647.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_647.overflow;
height=_647.height;
}
if(_644){
_644(node,anim);
}
}});
_645.push(anim);
});
return dojo.lfx.combine(_645);
};
dojo.lfx.html.slideTo=function(_649,_64a,_64b,_64c,_64d){
_649=dojo.lfx.html._byId(_649);
var _64e=[];
var _64f=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_64a)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_64a={top:_64a[0],left:_64a[1]};
}
dojo.lang.forEach(_649,function(node){
var top=null;
var left=null;
var init=(function(){
var _654=node;
return function(){
var pos=_64f(_654,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_64f(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_64f(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_654,true);
dojo.html.setStyleAttributes(_654,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_64a.top||0)},"left":{start:left,end:(_64a.left||0)}},_64b,_64c,{"beforeBegin":init});
if(_64d){
anim.connect("onEnd",function(){
_64d(_649,anim);
});
}
_64e.push(anim);
});
return dojo.lfx.combine(_64e);
};
dojo.lfx.html.slideBy=function(_658,_659,_65a,_65b,_65c){
_658=dojo.lfx.html._byId(_658);
var _65d=[];
var _65e=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_659)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_659={top:_659[0],left:_659[1]};
}
dojo.lang.forEach(_658,function(node){
var top=null;
var left=null;
var init=(function(){
var _663=node;
return function(){
var pos=_65e(_663,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_65e(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_65e(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_663,true);
dojo.html.setStyleAttributes(_663,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_659.top||0)},"left":{start:left,end:left+(_659.left||0)}},_65a,_65b).connect("beforeBegin",init);
if(_65c){
anim.connect("onEnd",function(){
_65c(_658,anim);
});
}
_65d.push(anim);
});
return dojo.lfx.combine(_65d);
};
dojo.lfx.html.explode=function(_667,_668,_669,_66a,_66b){
var h=dojo.html;
_667=dojo.byId(_667);
_668=dojo.byId(_668);
var _66d=h.toCoordinateObject(_667,true);
var _66e=document.createElement("div");
h.copyStyle(_66e,_668);
if(_668.explodeClassName){
_66e.className=_668.explodeClassName;
}
with(_66e.style){
position="absolute";
display="none";
var _66f=h.getStyle(_667,"background-color");
backgroundColor=_66f?_66f.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_66e);
with(_668.style){
visibility="hidden";
display="block";
}
var _670=h.toCoordinateObject(_668,true);
with(_668.style){
display="none";
visibility="visible";
}
var _671={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_671[type]={start:_66d[type],end:_670[type]};
});
var anim=new dojo.lfx.propertyAnimation(_66e,_671,_669,_66a,{"beforeBegin":function(){
h.setDisplay(_66e,"block");
},"onEnd":function(){
h.setDisplay(_668,"block");
_66e.parentNode.removeChild(_66e);
}});
if(_66b){
anim.connect("onEnd",function(){
_66b(_668,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_674,end,_676,_677,_678){
var h=dojo.html;
_674=dojo.byId(_674);
end=dojo.byId(end);
var _67a=dojo.html.toCoordinateObject(_674,true);
var _67b=dojo.html.toCoordinateObject(end,true);
var _67c=document.createElement("div");
dojo.html.copyStyle(_67c,_674);
if(_674.explodeClassName){
_67c.className=_674.explodeClassName;
}
dojo.html.setOpacity(_67c,0.3);
with(_67c.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_674,"background-color").toLowerCase();
}
dojo.body().appendChild(_67c);
var _67d={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_67d[type]={start:_67a[type],end:_67b[type]};
});
var anim=new dojo.lfx.propertyAnimation(_67c,_67d,_676,_677,{"beforeBegin":function(){
dojo.html.hide(_674);
dojo.html.show(_67c);
},"onEnd":function(){
_67c.parentNode.removeChild(_67c);
}});
if(_678){
anim.connect("onEnd",function(){
_678(_674,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_680,_681,_682,_683,_684){
_680=dojo.lfx.html._byId(_680);
var _685=[];
dojo.lang.forEach(_680,function(node){
var _687=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _689=dojo.html.getStyle(node,"background-image");
var _68a=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_687.length>3){
_687.pop();
}
var rgb=new dojo.gfx.color.Color(_681);
var _68c=new dojo.gfx.color.Color(_687);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_68c}},_682,_683,{"beforeBegin":function(){
if(_689){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_689){
node.style.backgroundImage=_689;
}
if(_68a){
node.style.backgroundColor="transparent";
}
if(_684){
_684(node,anim);
}
}});
_685.push(anim);
});
return dojo.lfx.combine(_685);
};
dojo.lfx.html.unhighlight=function(_68e,_68f,_690,_691,_692){
_68e=dojo.lfx.html._byId(_68e);
var _693=[];
dojo.lang.forEach(_68e,function(node){
var _695=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_68f);
var _697=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_695,end:rgb}},_690,_691,{"beforeBegin":function(){
if(_697){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_695.toRgb().join(",")+")";
},"onEnd":function(){
if(_692){
_692(node,anim);
}
}});
_693.push(anim);
});
return dojo.lfx.combine(_693);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _699=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_699.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_699.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _699;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_69c){
this.constrainToContainer=true;
if(_69c){
this.constrainingContainer=_69c;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _6a6=doc.createElement("table");
if(isTr){
var _6a7=doc.createElement("tbody");
_6a6.appendChild(_6a7);
_6a7.appendChild(node);
}else{
_6a6.appendChild(node);
}
var _6a8=((isTr)?this.domNode:this.domNode.firstChild);
var _6a9=((isTr)?node:node.firstChild);
var _6aa=_6a8.childNodes;
var _6ab=_6a9.childNodes;
for(var i=0;i<_6aa.length;i++){
if((_6ab[i])&&(_6ab[i].style)){
_6ab[i].style.width=dojo.html.getContentBox(_6aa[i]).width+"px";
}
}
node=_6a6;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _6ad=document.createElement("div");
_6ad.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_6ad);
_6ad.appendChild(this.bgIframe.iframe);
node=_6ad;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _6af=dojo.html.getViewport();
var _6b0=_6af.width;
var _6b1=_6af.height;
var _6b2=dojo.html.getScroll().offset;
var x=_6b2.x;
var y=_6b2.y;
}else{
var _6b5=dojo.html.getContentBox(this.constrainingContainer);
_6b0=_6b5.width;
_6b1=_6b5.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_6b0-mb.width,maxY:y+_6b1-mb.height};
},updateDragOffset:function(){
var _6b7=dojo.html.getScroll().offset;
if(_6b7.y!=this.scrollOffset.y){
var diff=_6b7.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_6b7.y;
}
if(_6b7.x!=this.scrollOffset.x){
var diff=_6b7.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_6b7.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _6bf=dojo.html.getAbsolutePosition(this.dragClone,true);
var _6c0={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_6c0,300);
var _6c2=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_6c2.dragClone);
_6c2.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_6c4){
this.constrainToContainer=true;
if(_6c4){
this.constrainingContainer=_6c4;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_6c9;i<this.domNode.childNodes.length;i++){
_6c9=this.domNode.childNodes[i];
if(_6c9.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_6c9,true);
var _6cb=dojo.html.getBorderBox(_6c9);
this.childBoxes.push({top:pos.y,bottom:pos.y+_6cb.height,left:pos.x,right:pos.x+_6cb.width,height:_6cb.height,width:_6cb.width,node:_6c9});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_6ce;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_6d0){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _6d2=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _6d4=(dojo.html.gravity(this.childBoxes[0].node,e)&_6d2);
if(_6d4){
hide=true;
}
}else{
var _6d4=true;
}
}else{
var _6d5=this.childBoxes[i];
var _6d4=(dojo.html.gravity(_6d5.node,e)&_6d2);
if(_6d5.node===_6d0[0].dragSource.domNode){
hide=true;
}else{
var _6d6=_6d4?(i>0?this.childBoxes[i-1]:_6d5):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_6d5);
if(_6d6.node===_6d0[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_6d0,i,_6d4);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_6d8,_6d9,_6da){
var _6db=this.vertical?"left":"top";
var _6dc;
if(_6d9<0){
if(this.childBoxes.length){
_6dc=_6da?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_6db]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_6dc=this.childBoxes[_6d9];
}
if(_6dc){
this.dropIndicator.style[_6db]=(_6da?_6dc[_6db]:_6dc[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_6dc.height+"px";
this.dropIndicator.style.top=_6dc.top+"px";
}else{
this.dropIndicator.style.width=_6dc.width+"px";
this.dropIndicator.style.left=_6dc.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _6e0=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_6e0){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _6e1=this.childBoxes[i];
if(dojo.html.gravity(_6e1.node,e)&_6e0){
return this.insert(e,_6e1.node,"before");
}else{
return this.insert(e,_6e1.node,"after");
}
},insert:function(e,_6e3,_6e4){
var node=e.dragObject.domNode;
if(_6e4=="before"){
return dojo.html.insertBefore(node,_6e3);
}else{
if(_6e4=="after"){
return dojo.html.insertAfter(node,_6e3);
}else{
if(_6e4=="append"){
_6e3.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_6e7){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_6e7&&dojo.lang.isString(_6e7)){
_6e7=[_6e7];
}
this.acceptedTypes=_6e7||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.kwCompoundRequire({common:["dojo.dnd.DragAndDrop"],browser:["dojo.dnd.HtmlDragAndDrop"],dashboard:["dojo.dnd.HtmlDragAndDrop"]});
dojo.provide("dojo.dnd.*");
if(!this["dojo"]){
alert("\"dojo/__package__.js\" is now located at \"dojo/dojo.js\". Please update your includes accordingly");
}
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_6ee,_6ef){
var out="";
for(var i=0;i<_6ee;i++){
out+=str;
if(_6ef&&i<_6ee-1){
out+=_6ef;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_6fe,_6ff,_700){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_6fe){
this.mimetype=_6fe;
}
if(_6ff){
this.transport=_6ff;
}
if(arguments.length>=4){
this.changeUrl=_700;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,jsonFilter:function(_701){
if((this.mimetype=="text/json-comment-filtered")||(this.mimetype=="application/json-comment-filtered")){
var _702=_701.indexOf("/*");
var _703=_701.lastIndexOf("*/");
if((_702==-1)||(_703==-1)){
dojo.debug("your JSON wasn't comment filtered!");
return "";
}
return _701.substring(_702+2,_703);
}
dojo.debug("please consider using a mimetype of text/json-comment-filtered to avoid potential security issues with JSON endpoints");
return _701;
},load:function(type,data,_706,_707){
},error:function(type,_709,_70a,_70b){
},timeout:function(type,_70d,_70e,_70f){
},handle:function(type,data,_712,_713){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_714){
if(_714["url"]){
_714.url=_714.url.toString();
}
if(_714["formNode"]){
_714.formNode=dojo.byId(_714.formNode);
}
if(!_714["method"]&&_714["formNode"]&&_714["formNode"].method){
_714.method=_714["formNode"].method;
}
if(!_714["handle"]&&_714["handler"]){
_714.handle=_714.handler;
}
if(!_714["load"]&&_714["loaded"]){
_714.load=_714.loaded;
}
if(!_714["changeUrl"]&&_714["changeURL"]){
_714.changeUrl=_714.changeURL;
}
_714.encoding=dojo.lang.firstValued(_714["encoding"],djConfig["bindEncoding"],"");
_714.sendTransport=dojo.lang.firstValued(_714["sendTransport"],djConfig["ioSendTransport"],false);
var _715=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_714[fn]&&_715(_714[fn])){
continue;
}
if(_714["handle"]&&_715(_714["handle"])){
_714[fn]=_714.handle;
}
}
dojo.lang.mixin(this,_714);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_71c){
if(!(_71c instanceof dojo.io.Request)){
try{
_71c=new dojo.io.Request(_71c);
}
catch(e){
dojo.debug(e);
}
}
var _71d="";
if(_71c["transport"]){
_71d=_71c["transport"];
if(!this[_71d]){
dojo.io.sendBindError(_71c,"No dojo.io.bind() transport with name '"+_71c["transport"]+"'.");
return _71c;
}
if(!this[_71d].canHandle(_71c)){
dojo.io.sendBindError(_71c,"dojo.io.bind() transport with name '"+_71c["transport"]+"' cannot handle this type of request.");
return _71c;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_71c))){
_71d=tmp;
break;
}
}
if(_71d==""){
dojo.io.sendBindError(_71c,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _71c;
}
}
this[_71d].bind(_71c);
_71c.bindSuccess=true;
return _71c;
};
dojo.io.sendBindError=function(_720,_721){
if((typeof _720.error=="function"||typeof _720.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _722=new dojo.io.Error(_721);
setTimeout(function(){
_720[(typeof _720.error=="function")?"error":"handle"]("error",_722,null,_720);
},50);
}else{
dojo.raise(_721);
}
};
dojo.io.queueBind=function(_723){
if(!(_723 instanceof dojo.io.Request)){
try{
_723=new dojo.io.Request(_723);
}
catch(e){
dojo.debug(e);
}
}
var _724=_723.load;
_723.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_724.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _726=_723.error;
_723.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_726.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_723);
dojo.io._dispatchNextQueueBind();
return _723;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_729,last){
var enc=/utf/i.test(_729||"")?encodeURIComponent:dojo.string.encodeAscii;
var _72c=[];
var _72d=new Object();
for(var name in map){
var _72f=function(elt){
var val=enc(name)+"="+enc(elt);
_72c[(last==name)?"push":"unshift"](val);
};
if(!_72d[name]){
var _732=map[name];
if(dojo.lang.isArray(_732)){
dojo.lang.forEach(_732,_72f);
}else{
_72f(_732);
}
}
}
return _72c.join("&");
};
dojo.io.setIFrameSrc=function(_733,src,_735){
try{
var r=dojo.render.html;
if(!_735){
if(r.safari){
_733.location=src;
}else{
frames[_733.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_733.contentWindow.document;
}else{
if(r.safari){
idoc=_733.document;
}else{
idoc=_733.contentWindow;
}
}
if(!idoc){
_733.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_738,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _738.replace(/\%\{(\w+)\}/g,function(_73b,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _73e=str.split(" ");
for(var i=0;i<_73e.length;i++){
_73e[i]=_73e[i].charAt(0).toUpperCase()+_73e[i].substring(1);
}
return _73e.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _743=escape(str);
var _744,re=/%u([0-9A-F]{4})/i;
while((_744=_743.match(re))){
var num=Number("0x"+_744[1]);
var _747=escape("&#"+num+";");
ret+=_743.substring(0,_744.index)+_747;
_743=_743.substring(_744.index+_744[0].length);
}
ret+=_743.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_74c){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_74c){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_755){
if(_755){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_759,_75a){
if(_75a){
str=str.toLowerCase();
_759=_759.toLowerCase();
}
return str.indexOf(_759)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_760){
if(_760=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_760=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_762){
var _763=[];
for(var i=0,_765=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_762){
_763.push(str.substring(_765,i));
_765=i+1;
}
}
_763.push(str.substr(_765));
return _763;
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.undo.browser: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _76a=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_76c){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_76a.apply(this,[_76c]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _76d=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_76f){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_76d){
_76d.apply(this,[_76f]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_772){
if(!dojo.render.html.opera){
var _773=this._getUrlQuery(_772.href);
if(_773==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_773==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_773==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _774=this.historyStack.pop();
if(!_774){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_774);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _77b=url.split("?");
if(_77b.length<2){
return null;
}else{
return _77b[1];
}
},_loadIframeHistory:function(){
var url=(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _77e=false;
var _77f=node.getElementsByTagName("input");
dojo.lang.forEach(_77f,function(_780){
if(_77e){
return;
}
if(_780.getAttribute("type")=="file"){
_77e=true;
}
});
return _77e;
};
dojo.io.formHasFile=function(_781){
return dojo.io.checkChildrenForFile(_781);
};
dojo.io.updateNode=function(node,_783){
node=dojo.byId(node);
var args=_783;
if(dojo.lang.isString(_783)){
args={url:_783};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_78a,_78b,_78c){
if((!_78a)||(!_78a.tagName)||(!_78a.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_78c){
_78c=dojo.io.formFilter;
}
var enc=/utf/i.test(_78b||"")?encodeURIComponent:dojo.string.encodeAscii;
var _78e=[];
for(var i=0;i<_78a.elements.length;i++){
var elm=_78a.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_78c(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_78e.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_78e.push(name+"="+enc(elm.value));
}
}else{
_78e.push(name+"="+enc(elm.value));
}
}
}
var _794=_78a.getElementsByTagName("input");
for(var i=0;i<_794.length;i++){
var _795=_794[i];
if(_795.type.toLowerCase()=="image"&&_795.form==_78a&&_78c(_795)){
var name=enc(_795.name);
_78e.push(name+"="+enc(_795.value));
_78e.push(name+".x=0");
_78e.push(name+".y=0");
}
}
return _78e.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _79b=form.getElementsByTagName("input");
for(var i=0;i<_79b.length;i++){
var _79c=_79b[i];
if(_79c.type.toLowerCase()=="image"&&_79c.form==form){
this.connect(_79c,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _7a3=false;
if(node.disabled||!node.name){
_7a3=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_7a3=node==this.clickedButton;
}else{
_7a3=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _7a3;
},connect:function(_7a4,_7a5,_7a6){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_7a4,_7a5,this,_7a6);
}else{
var fcn=dojo.lang.hitch(this,_7a6);
_7a4[_7a5]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _7a9=this;
var _7aa={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_7ac,_7ad){
return url+"|"+_7ac+"|"+_7ad.toLowerCase();
}
function addToCache(url,_7af,_7b0,http){
_7aa[getCacheKey(url,_7af,_7b0)]=http;
}
function getFromCache(url,_7b3,_7b4){
return _7aa[getCacheKey(url,_7b3,_7b4)];
}
this.clearCache=function(){
_7aa={};
};
function doLoad(_7b5,http,url,_7b8,_7b9){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(http.status==1223)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_7b5.method.toLowerCase()=="head"){
var _7bb=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _7bb;
};
var _7bc=_7bb.split(/[\r\n]+/g);
for(var i=0;i<_7bc.length;i++){
var pair=_7bc[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_7b5.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_7b5.mimetype.substr(0,9)=="text/json"||_7b5.mimetype.substr(0,16)=="application/json"){
try{
ret=dj_eval("("+_7b5.jsonFilter(http.responseText)+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_7b5.mimetype=="application/xml")||(_7b5.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_7b9){
addToCache(url,_7b8,_7b5.method,http);
}
_7b5[(typeof _7b5.load=="function")?"load":"handle"]("load",ret,http,_7b5);
}else{
var _7bf=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_7b5[(typeof _7b5.error=="function")?"error":"handle"]("error",_7bf,http,_7b5);
}
}
function setHeaders(http,_7c1){
if(_7c1["headers"]){
for(var _7c2 in _7c1["headers"]){
if(_7c2.toLowerCase()=="content-type"&&!_7c1["contentType"]){
_7c1["contentType"]=_7c1["headers"][_7c2];
}else{
http.setRequestHeader(_7c2,_7c1["headers"][_7c2]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_7a9._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _7c6=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_7c6,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _7c7=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_7c8){
var mlc=_7c8["mimetype"].toLowerCase()||"";
return _7c7&&((dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript"],mlc))||(mlc.substr(0,9)=="text/json"||mlc.substr(0,16)=="application/json"))&&!(_7c8["formNode"]&&dojo.io.formHasFile(_7c8["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_7ca){
if(!_7ca["url"]){
if(!_7ca["formNode"]&&(_7ca["backButton"]||_7ca["back"]||_7ca["changeUrl"]||_7ca["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_7ca);
return true;
}
}
var url=_7ca.url;
var _7cc="";
if(_7ca["formNode"]){
var ta=_7ca.formNode.getAttribute("action");
if((ta)&&(!_7ca["url"])){
url=ta;
}
var tp=_7ca.formNode.getAttribute("method");
if((tp)&&(!_7ca["method"])){
_7ca.method=tp;
}
_7cc+=dojo.io.encodeForm(_7ca.formNode,_7ca.encoding,_7ca["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_7ca["file"]){
_7ca.method="post";
}
if(!_7ca["method"]){
_7ca.method="get";
}
if(_7ca.method.toLowerCase()=="get"){
_7ca.multipart=false;
}else{
if(_7ca["file"]){
_7ca.multipart=true;
}else{
if(!_7ca["multipart"]){
_7ca.multipart=false;
}
}
}
if(_7ca["backButton"]||_7ca["back"]||_7ca["changeUrl"]){
dojo.undo.browser.addToHistory(_7ca);
}
var _7cf=_7ca["content"]||{};
if(_7ca.sendTransport){
_7cf["dojo.transport"]="xmlhttp";
}
do{
if(_7ca.postContent){
_7cc=_7ca.postContent;
break;
}
if(_7cf){
_7cc+=dojo.io.argsFromMap(_7cf,_7ca.encoding);
}
if(_7ca.method.toLowerCase()=="get"||!_7ca.multipart){
break;
}
var t=[];
if(_7cc.length){
var q=_7cc.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_7ca.file){
if(dojo.lang.isArray(_7ca.file)){
for(var i=0;i<_7ca.file.length;++i){
var o=_7ca.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_7ca.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_7cc=t.join("\r\n");
}
}while(false);
var _7d5=_7ca["sync"]?false:true;
var _7d6=_7ca["preventCache"]||(this.preventCache==true&&_7ca["preventCache"]!=false);
var _7d7=_7ca["useCache"]==true||(this.useCache==true&&_7ca["useCache"]!=false);
if(!_7d6&&_7d7){
var _7d8=getFromCache(url,_7cc,_7ca.method);
if(_7d8){
doLoad(_7ca,_7d8,url,_7cc,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_7ca);
var _7da=false;
if(_7d5){
var _7db=this.inFlight.push({"req":_7ca,"http":http,"url":url,"query":_7cc,"useCache":_7d7,"startTime":_7ca.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_7a9._blockAsync=true;
}
if(_7ca.method.toLowerCase()=="post"){
if(!_7ca.user){
http.open("POST",url,_7d5);
}else{
http.open("POST",url,_7d5,_7ca.user,_7ca.password);
}
setHeaders(http,_7ca);
http.setRequestHeader("Content-Type",_7ca.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_7ca.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_7cc);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_7ca,{status:404},url,_7cc,_7d7);
}
}else{
var _7dc=url;
if(_7cc!=""){
_7dc+=(_7dc.indexOf("?")>-1?"&":"?")+_7cc;
}
if(_7d6){
_7dc+=(dojo.string.endsWithAny(_7dc,"?","&")?"":(_7dc.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_7ca.user){
http.open(_7ca.method.toUpperCase(),_7dc,_7d5);
}else{
http.open(_7ca.method.toUpperCase(),_7dc,_7d5,_7ca.user,_7ca.password);
}
setHeaders(http,_7ca);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_7ca,{status:404},url,_7cc,_7d7);
}
}
if(!_7d5){
doLoad(_7ca,http,url,_7cc,_7d7);
_7a9._blockAsync=false;
}
_7ca.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_7de,days,path,_7e1,_7e2){
var _7e3=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_7e3=d.toGMTString();
}
_7de=escape(_7de);
document.cookie=name+"="+_7de+";"+(_7e3!=-1?" expires="+_7e3+";":"")+(path?"path="+path:"")+(_7e1?"; domain="+_7e1:"")+(_7e2?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _7e7=document.cookie.substring(idx+name.length+1);
var end=_7e7.indexOf(";");
if(end==-1){
end=_7e7.length;
}
_7e7=_7e7.substring(0,end);
_7e7=unescape(_7e7);
return _7e7;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_7ee,_7ef,_7f0){
if(arguments.length==5){
_7f0=_7ee;
_7ee=null;
_7ef=null;
}
var _7f1=[],_7f2,_7f3="";
if(!_7f0){
_7f2=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_7f2){
_7f2={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _7f2[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_7f2[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _7f2){
_7f1.push(escape(prop)+"="+escape(_7f2[prop]));
}
_7f3=_7f1.join("&");
}
dojo.io.cookie.setCookie(name,_7f3,days,path,_7ee,_7ef);
};
dojo.io.cookie.getObjectCookie=function(name){
var _7f6=null,_7f7=dojo.io.cookie.getCookie(name);
if(_7f7){
_7f6={};
var _7f8=_7f7.split("&");
for(var i=0;i<_7f8.length;i++){
var pair=_7f8[i].split("=");
var _7fb=pair[1];
if(isNaN(_7fb)){
_7fb=unescape(pair[1]);
}
_7f6[unescape(pair[0])]=_7fb;
}
}
return _7f6;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _7fc=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_7fc=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io.common"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _7fe=false;
var _7ff=node.getElementsByTagName("input");
dojo.lang.forEach(_7ff,function(_800){
if(_7fe){
return;
}
if(_800.getAttribute("type")=="file"){
_7fe=true;
}
});
return _7fe;
};
dojo.io.formHasFile=function(_801){
return dojo.io.checkChildrenForFile(_801);
};
dojo.io.updateNode=function(node,_803){
node=dojo.byId(node);
var args=_803;
if(dojo.lang.isString(_803)){
args={url:_803};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_80a,_80b,_80c){
if((!_80a)||(!_80a.tagName)||(!_80a.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_80c){
_80c=dojo.io.formFilter;
}
var enc=/utf/i.test(_80b||"")?encodeURIComponent:dojo.string.encodeAscii;
var _80e=[];
for(var i=0;i<_80a.elements.length;i++){
var elm=_80a.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_80c(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_80e.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_80e.push(name+"="+enc(elm.value));
}
}else{
_80e.push(name+"="+enc(elm.value));
}
}
}
var _814=_80a.getElementsByTagName("input");
for(var i=0;i<_814.length;i++){
var _815=_814[i];
if(_815.type.toLowerCase()=="image"&&_815.form==_80a&&_80c(_815)){
var name=enc(_815.name);
_80e.push(name+"="+enc(_815.value));
_80e.push(name+".x=0");
_80e.push(name+".y=0");
}
}
return _80e.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _81b=form.getElementsByTagName("input");
for(var i=0;i<_81b.length;i++){
var _81c=_81b[i];
if(_81c.type.toLowerCase()=="image"&&_81c.form==form){
this.connect(_81c,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _823=false;
if(node.disabled||!node.name){
_823=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_823=node==this.clickedButton;
}else{
_823=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _823;
},connect:function(_824,_825,_826){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_824,_825,this,_826);
}else{
var fcn=dojo.lang.hitch(this,_826);
_824[_825]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _829=this;
var _82a={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_82c,_82d){
return url+"|"+_82c+"|"+_82d.toLowerCase();
}
function addToCache(url,_82f,_830,http){
_82a[getCacheKey(url,_82f,_830)]=http;
}
function getFromCache(url,_833,_834){
return _82a[getCacheKey(url,_833,_834)];
}
this.clearCache=function(){
_82a={};
};
function doLoad(_835,http,url,_838,_839){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(http.status==1223)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_835.method.toLowerCase()=="head"){
var _83b=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _83b;
};
var _83c=_83b.split(/[\r\n]+/g);
for(var i=0;i<_83c.length;i++){
var pair=_83c[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_835.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_835.mimetype.substr(0,9)=="text/json"||_835.mimetype.substr(0,16)=="application/json"){
try{
ret=dj_eval("("+_835.jsonFilter(http.responseText)+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_835.mimetype=="application/xml")||(_835.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_839){
addToCache(url,_838,_835.method,http);
}
_835[(typeof _835.load=="function")?"load":"handle"]("load",ret,http,_835);
}else{
var _83f=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_835[(typeof _835.error=="function")?"error":"handle"]("error",_83f,http,_835);
}
}
function setHeaders(http,_841){
if(_841["headers"]){
for(var _842 in _841["headers"]){
if(_842.toLowerCase()=="content-type"&&!_841["contentType"]){
_841["contentType"]=_841["headers"][_842];
}else{
http.setRequestHeader(_842,_841["headers"][_842]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_829._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _846=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_846,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _847=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_848){
var mlc=_848["mimetype"].toLowerCase()||"";
return _847&&((dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript"],mlc))||(mlc.substr(0,9)=="text/json"||mlc.substr(0,16)=="application/json"))&&!(_848["formNode"]&&dojo.io.formHasFile(_848["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_84a){
if(!_84a["url"]){
if(!_84a["formNode"]&&(_84a["backButton"]||_84a["back"]||_84a["changeUrl"]||_84a["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_84a);
return true;
}
}
var url=_84a.url;
var _84c="";
if(_84a["formNode"]){
var ta=_84a.formNode.getAttribute("action");
if((ta)&&(!_84a["url"])){
url=ta;
}
var tp=_84a.formNode.getAttribute("method");
if((tp)&&(!_84a["method"])){
_84a.method=tp;
}
_84c+=dojo.io.encodeForm(_84a.formNode,_84a.encoding,_84a["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_84a["file"]){
_84a.method="post";
}
if(!_84a["method"]){
_84a.method="get";
}
if(_84a.method.toLowerCase()=="get"){
_84a.multipart=false;
}else{
if(_84a["file"]){
_84a.multipart=true;
}else{
if(!_84a["multipart"]){
_84a.multipart=false;
}
}
}
if(_84a["backButton"]||_84a["back"]||_84a["changeUrl"]){
dojo.undo.browser.addToHistory(_84a);
}
var _84f=_84a["content"]||{};
if(_84a.sendTransport){
_84f["dojo.transport"]="xmlhttp";
}
do{
if(_84a.postContent){
_84c=_84a.postContent;
break;
}
if(_84f){
_84c+=dojo.io.argsFromMap(_84f,_84a.encoding);
}
if(_84a.method.toLowerCase()=="get"||!_84a.multipart){
break;
}
var t=[];
if(_84c.length){
var q=_84c.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_84a.file){
if(dojo.lang.isArray(_84a.file)){
for(var i=0;i<_84a.file.length;++i){
var o=_84a.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_84a.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_84c=t.join("\r\n");
}
}while(false);
var _855=_84a["sync"]?false:true;
var _856=_84a["preventCache"]||(this.preventCache==true&&_84a["preventCache"]!=false);
var _857=_84a["useCache"]==true||(this.useCache==true&&_84a["useCache"]!=false);
if(!_856&&_857){
var _858=getFromCache(url,_84c,_84a.method);
if(_858){
doLoad(_84a,_858,url,_84c,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_84a);
var _85a=false;
if(_855){
var _85b=this.inFlight.push({"req":_84a,"http":http,"url":url,"query":_84c,"useCache":_857,"startTime":_84a.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_829._blockAsync=true;
}
if(_84a.method.toLowerCase()=="post"){
if(!_84a.user){
http.open("POST",url,_855);
}else{
http.open("POST",url,_855,_84a.user,_84a.password);
}
setHeaders(http,_84a);
http.setRequestHeader("Content-Type",_84a.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_84a.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_84c);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_84a,{status:404},url,_84c,_857);
}
}else{
var _85c=url;
if(_84c!=""){
_85c+=(_85c.indexOf("?")>-1?"&":"?")+_84c;
}
if(_856){
_85c+=(dojo.string.endsWithAny(_85c,"?","&")?"":(_85c.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_84a.user){
http.open(_84a.method.toUpperCase(),_85c,_855);
}else{
http.open(_84a.method.toUpperCase(),_85c,_855,_84a.user,_84a.password);
}
setHeaders(http,_84a);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_84a,{status:404},url,_84c,_857);
}
}
if(!_855){
doLoad(_84a,http,url,_84c,_857);
_829._blockAsync=false;
}
_84a.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_85d){
this.pairs=[];
this.returnWrappers=_85d||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_85f,wrap,_861,_862){
var type=(_862)?"unshift":"push";
this.pairs[type]([name,_85f,wrap,_861]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_86a,wrap,_86c){
dojo.json.jsonRegistry.register(name,_86a,wrap,_86c);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _86f=typeof (o);
if(_86f=="undefined"){
return "undefined";
}else{
if((_86f=="number")||(_86f=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_86f=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _871;
if(typeof (o.__json__)=="function"){
_871=o.__json__();
if(o!==_871){
return me(_871);
}
}
if(typeof (o.json)=="function"){
_871=o.json();
if(o!==_871){
return me(_871);
}
}
if(_86f!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_871=dojo.json.jsonRegistry.match(o);
return me(_871);
}
catch(e){
}
if(_86f=="function"){
return null;
}
res=[];
for(var k in o){
var _876;
if(typeof (k)=="number"){
_876="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_876=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_876+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.lang.type");
dojo.lang.whatAmI=function(_877){
dojo.deprecated("dojo.lang.whatAmI","use dojo.lang.getType instead","0.5");
return dojo.lang.getType(_877);
};
dojo.lang.whatAmI.custom={};
dojo.lang.getType=function(_878){
try{
if(dojo.lang.isArray(_878)){
return "array";
}
if(dojo.lang.isFunction(_878)){
return "function";
}
if(dojo.lang.isString(_878)){
return "string";
}
if(dojo.lang.isNumber(_878)){
return "number";
}
if(dojo.lang.isBoolean(_878)){
return "boolean";
}
if(dojo.lang.isAlien(_878)){
return "alien";
}
if(dojo.lang.isUndefined(_878)){
return "undefined";
}
for(var name in dojo.lang.whatAmI.custom){
if(dojo.lang.whatAmI.custom[name](_878)){
return name;
}
}
if(dojo.lang.isObject(_878)){
return "object";
}
}
catch(e){
}
return "unknown";
};
dojo.lang.isNumeric=function(_87a){
return (!isNaN(_87a)&&isFinite(_87a)&&(_87a!=null)&&!dojo.lang.isBoolean(_87a)&&!dojo.lang.isArray(_87a)&&!/^\s*$/.test(_87a));
};
dojo.lang.isBuiltIn=function(_87b){
return (dojo.lang.isArray(_87b)||dojo.lang.isFunction(_87b)||dojo.lang.isString(_87b)||dojo.lang.isNumber(_87b)||dojo.lang.isBoolean(_87b)||(_87b==null)||(_87b instanceof Error)||(typeof _87b=="error"));
};
dojo.lang.isPureObject=function(_87c){
return ((_87c!=null)&&dojo.lang.isObject(_87c)&&_87c.constructor==Object);
};
dojo.lang.isOfType=function(_87d,type,_87f){
var _880=false;
if(_87f){
_880=_87f["optional"];
}
if(_880&&((_87d===null)||dojo.lang.isUndefined(_87d))){
return true;
}
if(dojo.lang.isArray(type)){
var _881=type;
for(var i in _881){
var _883=_881[i];
if(dojo.lang.isOfType(_87d,_883)){
return true;
}
}
return false;
}else{
if(dojo.lang.isString(type)){
type=type.toLowerCase();
}
switch(type){
case Array:
case "array":
return dojo.lang.isArray(_87d);
case Function:
case "function":
return dojo.lang.isFunction(_87d);
case String:
case "string":
return dojo.lang.isString(_87d);
case Number:
case "number":
return dojo.lang.isNumber(_87d);
case "numeric":
return dojo.lang.isNumeric(_87d);
case Boolean:
case "boolean":
return dojo.lang.isBoolean(_87d);
case Object:
case "object":
return dojo.lang.isObject(_87d);
case "pureobject":
return dojo.lang.isPureObject(_87d);
case "builtin":
return dojo.lang.isBuiltIn(_87d);
case "alien":
return dojo.lang.isAlien(_87d);
case "undefined":
return dojo.lang.isUndefined(_87d);
case null:
case "null":
return (_87d===null);
case "optional":
dojo.deprecated("dojo.lang.isOfType(value, [type, \"optional\"])","use dojo.lang.isOfType(value, type, {optional: true} ) instead","0.5");
return ((_87d===null)||dojo.lang.isUndefined(_87d));
default:
if(dojo.lang.isFunction(type)){
return (_87d instanceof type);
}else{
dojo.raise("dojo.lang.isOfType() was passed an invalid type");
}
}
}
dojo.raise("If we get here, it means a bug was introduced above.");
};
dojo.lang.getObject=function(str){
var _885=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_885[i++]];
}while(i<_885.length&&obj);
return (obj!=dj_global)?obj:null;
};
dojo.lang.doesObjectExist=function(str){
var _889=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_889[i++]];
}while(i<_889.length&&obj);
return (obj&&obj!=dj_global);
};
dojo.provide("dojo.lang.assert");
dojo.lang.assert=function(_88c,_88d){
if(!_88c){
var _88e="An assert statement failed.\n"+"The method dojo.lang.assert() was called with a 'false' value.\n";
if(_88d){
_88e+="Here's the assert message:\n"+_88d+"\n";
}
throw new Error(_88e);
}
};
dojo.lang.assertType=function(_88f,type,_891){
if(dojo.lang.isString(_891)){
dojo.deprecated("dojo.lang.assertType(value, type, \"message\")","use dojo.lang.assertType(value, type) instead","0.5");
}
if(!dojo.lang.isOfType(_88f,type,_891)){
if(!dojo.lang.assertType._errorMessage){
dojo.lang.assertType._errorMessage="Type mismatch: dojo.lang.assertType() failed.";
}
dojo.lang.assert(false,dojo.lang.assertType._errorMessage);
}
};
dojo.lang.assertValidKeywords=function(_892,_893,_894){
var key;
if(!_894){
if(!dojo.lang.assertValidKeywords._errorMessage){
dojo.lang.assertValidKeywords._errorMessage="In dojo.lang.assertValidKeywords(), found invalid keyword:";
}
_894=dojo.lang.assertValidKeywords._errorMessage;
}
if(dojo.lang.isArray(_893)){
for(key in _892){
if(!dojo.lang.inArray(_893,key)){
dojo.lang.assert(false,_894+" "+key);
}
}
}else{
for(key in _892){
if(!(key in _893)){
dojo.lang.assert(false,_894+" "+key);
}
}
}
};
dojo.provide("dojo.lang.repr");
dojo.lang.reprRegistry=new dojo.AdapterRegistry();
dojo.lang.registerRepr=function(name,_897,wrap,_899){
dojo.lang.reprRegistry.register(name,_897,wrap,_899);
};
dojo.lang.repr=function(obj){
if(typeof (obj)=="undefined"){
return "undefined";
}else{
if(obj===null){
return "null";
}
}
try{
if(typeof (obj["__repr__"])=="function"){
return obj["__repr__"]();
}else{
if((typeof (obj["repr"])=="function")&&(obj.repr!=arguments.callee)){
return obj["repr"]();
}
}
return dojo.lang.reprRegistry.match(obj);
}
catch(e){
if(typeof (obj.NAME)=="string"&&(obj.toString==Function.prototype.toString||obj.toString==Object.prototype.toString)){
return obj.NAME;
}
}
if(typeof (obj)=="function"){
obj=(obj+"").replace(/^\s+/,"");
var idx=obj.indexOf("{");
if(idx!=-1){
obj=obj.substr(0,idx)+"{...}";
}
}
return obj+"";
};
dojo.lang.reprArrayLike=function(arr){
try{
var na=dojo.lang.map(arr,dojo.lang.repr);
return "["+na.join(", ")+"]";
}
catch(e){
}
};
(function(){
var m=dojo.lang;
m.registerRepr("arrayLike",m.isArrayLike,m.reprArrayLike);
m.registerRepr("string",m.isString,m.reprString);
m.registerRepr("numbers",m.isNumber,m.reprNumber);
m.registerRepr("boolean",m.isBoolean,m.reprNumber);
})();
dojo.kwCompoundRequire({common:["dojo.lang.common","dojo.lang.assert","dojo.lang.array","dojo.lang.type","dojo.lang.func","dojo.lang.extras","dojo.lang.repr","dojo.lang.declare"]});
dojo.provide("dojo.lang.*");
dojo.provide("dojo.storage");
dojo.storage=new function(){
};
dojo.declare("dojo.storage",null,{SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",namespace:"default",onHideSettingsUI:null,initialize:function(){
dojo.unimplemented("dojo.storage.initialize");
},isAvailable:function(){
dojo.unimplemented("dojo.storage.isAvailable");
},put:function(key,_8a0,_8a1){
dojo.unimplemented("dojo.storage.put");
},get:function(key){
dojo.unimplemented("dojo.storage.get");
},hasKey:function(key){
return (this.get(key)!=null);
},getKeys:function(){
dojo.unimplemented("dojo.storage.getKeys");
},clear:function(){
dojo.unimplemented("dojo.storage.clear");
},remove:function(key){
dojo.unimplemented("dojo.storage.remove");
},isPermanent:function(){
dojo.unimplemented("dojo.storage.isPermanent");
},getMaximumSize:function(){
dojo.unimplemented("dojo.storage.getMaximumSize");
},hasSettingsUI:function(){
return false;
},showSettingsUI:function(){
dojo.unimplemented("dojo.storage.showSettingsUI");
},hideSettingsUI:function(){
dojo.unimplemented("dojo.storage.hideSettingsUI");
},getType:function(){
dojo.unimplemented("dojo.storage.getType");
},isValidKey:function(_8a5){
if((_8a5==null)||(typeof _8a5=="undefined")){
return false;
}
return /^[0-9A-Za-z_]*$/.test(_8a5);
}});
dojo.storage.manager=new function(){
this.currentProvider=null;
this.available=false;
this._initialized=false;
this._providers=[];
this.namespace="default";
this.initialize=function(){
this.autodetect();
};
this.register=function(name,_8a7){
this._providers[this._providers.length]=_8a7;
this._providers[name]=_8a7;
};
this.setProvider=function(_8a8){
};
this.autodetect=function(){
if(this._initialized==true){
return;
}
var _8a9=null;
for(var i=0;i<this._providers.length;i++){
_8a9=this._providers[i];
if(dojo.lang.isUndefined(djConfig["forceStorageProvider"])==false&&_8a9.getType()==djConfig["forceStorageProvider"]){
_8a9.isAvailable();
break;
}else{
if(dojo.lang.isUndefined(djConfig["forceStorageProvider"])==true&&_8a9.isAvailable()){
break;
}
}
}
if(_8a9==null){
this._initialized=true;
this.available=false;
this.currentProvider=null;
dojo.raise("No storage provider found for this platform");
}
this.currentProvider=_8a9;
for(var i in _8a9){
dojo.storage[i]=_8a9[i];
}
dojo.storage.manager=this;
dojo.storage.initialize();
this._initialized=true;
this.available=true;
};
this.isAvailable=function(){
return this.available;
};
this.isInitialized=function(){
if(this.currentProvider.getType()=="dojo.storage.browser.FlashStorageProvider"&&dojo.flash.ready==false){
return false;
}else{
return this._initialized;
}
};
this.supportsProvider=function(_8ab){
try{
var _8ac=eval("new "+_8ab+"()");
var _8ad=_8ac.isAvailable();
if(_8ad==null||typeof _8ad=="undefined"){
return false;
}
return _8ad;
}
catch(exception){
return false;
}
};
this.getProvider=function(){
return this.currentProvider;
};
this.loaded=function(){
};
};
dojo.provide("dojo.string.Builder");
dojo.string.Builder=function(str){
this.arrConcat=(dojo.render.html.capable&&dojo.render.html["ie"]);
var a=[];
var b="";
var _8b1=this.length=b.length;
if(this.arrConcat){
if(b.length>0){
a.push(b);
}
b="";
}
this.toString=this.valueOf=function(){
return (this.arrConcat)?a.join(""):b;
};
this.append=function(){
for(var x=0;x<arguments.length;x++){
var s=arguments[x];
if(dojo.lang.isArrayLike(s)){
this.append.apply(this,s);
}else{
if(this.arrConcat){
a.push(s);
}else{
b+=s;
}
_8b1+=s.length;
this.length=_8b1;
}
}
return this;
};
this.clear=function(){
a=[];
b="";
_8b1=this.length=0;
return this;
};
this.remove=function(f,l){
var s="";
if(this.arrConcat){
b=a.join("");
}
a=[];
if(f>0){
s=b.substring(0,(f-1));
}
b=s+b.substring(f+l);
_8b1=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.replace=function(o,n){
if(this.arrConcat){
b=a.join("");
}
a=[];
b=b.replace(o,n);
_8b1=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.insert=function(idx,s){
if(this.arrConcat){
b=a.join("");
}
a=[];
if(idx==0){
b=s+b;
}else{
var t=b.split("");
t.splice(idx,0,s);
b=t.join("");
}
_8b1=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.append.apply(this,arguments);
};
dojo.kwCompoundRequire({common:["dojo.string","dojo.string.common","dojo.string.extras","dojo.string.Builder"]});
dojo.provide("dojo.string.*");
dojo.kwCompoundRequire({common:[["dojo.uri.Uri",false,false]]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.flash");
dojo.flash=function(){
};
dojo.flash={flash6_version:null,flash8_version:null,ready:false,_visible:true,_loadedListeners:new Array(),_installingListeners:new Array(),setSwf:function(_8bc){
if(_8bc==null||dojo.lang.isUndefined(_8bc)){
return;
}
if(_8bc.flash6!=null&&!dojo.lang.isUndefined(_8bc.flash6)){
this.flash6_version=_8bc.flash6;
}
if(_8bc.flash8!=null&&!dojo.lang.isUndefined(_8bc.flash8)){
this.flash8_version=_8bc.flash8;
}
if(!dojo.lang.isUndefined(_8bc.visible)){
this._visible=_8bc.visible;
}
this._initialize();
},useFlash6:function(){
if(this.flash6_version==null){
return false;
}else{
if(this.flash6_version!=null&&dojo.flash.info.commVersion==6){
return true;
}else{
return false;
}
}
},useFlash8:function(){
if(this.flash8_version==null){
return false;
}else{
if(this.flash8_version!=null&&dojo.flash.info.commVersion==8){
return true;
}else{
return false;
}
}
},addLoadedListener:function(_8bd){
this._loadedListeners.push(_8bd);
},addInstallingListener:function(_8be){
this._installingListeners.push(_8be);
},loaded:function(){
dojo.flash.ready=true;
if(dojo.flash._loadedListeners.length>0){
for(var i=0;i<dojo.flash._loadedListeners.length;i++){
dojo.flash._loadedListeners[i].call(null);
}
}
},installing:function(){
if(dojo.flash._installingListeners.length>0){
for(var i=0;i<dojo.flash._installingListeners.length;i++){
dojo.flash._installingListeners[i].call(null);
}
}
},_initialize:function(){
var _8c1=new dojo.flash.Install();
dojo.flash.installer=_8c1;
if(_8c1.needed()==true){
_8c1.install();
}else{
dojo.flash.obj=new dojo.flash.Embed(this._visible);
dojo.flash.obj.write(dojo.flash.info.commVersion);
dojo.flash.comm=new dojo.flash.Communicator();
}
}};
dojo.flash.Info=function(){
if(dojo.render.html.ie){
document.writeln("<script language=\"VBScript\" type=\"text/vbscript\">");
document.writeln("Function VBGetSwfVer(i)");
document.writeln("  on error resume next");
document.writeln("  Dim swControl, swVersion");
document.writeln("  swVersion = 0");
document.writeln("  set swControl = CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" + CStr(i))");
document.writeln("  if (IsObject(swControl)) then");
document.writeln("    swVersion = swControl.GetVariable(\"$version\")");
document.writeln("  end if");
document.writeln("  VBGetSwfVer = swVersion");
document.writeln("End Function");
document.writeln("</script>");
}
this._detectVersion();
this._detectCommunicationVersion();
};
dojo.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:false,commVersion:6,installing:false,isVersionOrAbove:function(_8c2,_8c3,_8c4){
_8c4=parseFloat("."+_8c4);
if(this.versionMajor>=_8c2&&this.versionMinor>=_8c3&&this.versionRevision>=_8c4){
return true;
}else{
return false;
}
},_detectVersion:function(){
var _8c5;
for(var _8c6=25;_8c6>0;_8c6--){
if(dojo.render.html.ie){
_8c5=VBGetSwfVer(_8c6);
}else{
_8c5=this._JSFlashInfo(_8c6);
}
if(_8c5==-1){
this.capable=false;
return;
}else{
if(_8c5!=0){
var _8c7;
if(dojo.render.html.ie){
var _8c8=_8c5.split(" ");
var _8c9=_8c8[1];
_8c7=_8c9.split(",");
}else{
_8c7=_8c5.split(".");
}
this.versionMajor=_8c7[0];
this.versionMinor=_8c7[1];
this.versionRevision=_8c7[2];
var _8ca=this.versionMajor+"."+this.versionRevision;
this.version=parseFloat(_8ca);
this.capable=true;
break;
}
}
}
},_JSFlashInfo:function(_8cb){
if(navigator.plugins!=null&&navigator.plugins.length>0){
if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){
var _8cc=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var _8cd=navigator.plugins["Shockwave Flash"+_8cc].description;
var _8ce=_8cd.split(" ");
var _8cf=_8ce[2].split(".");
var _8d0=_8cf[0];
var _8d1=_8cf[1];
if(_8ce[3]!=""){
var _8d2=_8ce[3].split("r");
}else{
var _8d2=_8ce[4].split("r");
}
var _8d3=_8d2[1]>0?_8d2[1]:0;
var _8d4=_8d0+"."+_8d1+"."+_8d3;
return _8d4;
}
}
return -1;
},_detectCommunicationVersion:function(){
if(this.capable==false){
this.commVersion=null;
return;
}
if(typeof djConfig["forceFlashComm"]!="undefined"&&typeof djConfig["forceFlashComm"]!=null){
this.commVersion=djConfig["forceFlashComm"];
return;
}
if(dojo.render.html.safari==true||dojo.render.html.opera==true){
this.commVersion=8;
}else{
this.commVersion=6;
}
}};
dojo.flash.Embed=function(_8d5){
this._visible=_8d5;
};
dojo.flash.Embed.prototype={width:215,height:138,id:"flashObject",_visible:true,protocol:function(){
switch(window.location.protocol){
case "https:":
return "https";
break;
default:
return "http";
break;
}
},write:function(_8d6,_8d7){
if(dojo.lang.isUndefined(_8d7)){
_8d7=false;
}
var _8d8=new dojo.string.Builder();
_8d8.append("width: "+this.width+"px; ");
_8d8.append("height: "+this.height+"px; ");
if(this._visible==false){
_8d8.append("position: absolute; ");
_8d8.append("z-index: 10000; ");
_8d8.append("top: -1000px; ");
_8d8.append("left: -1000px; ");
}
_8d8=_8d8.toString();
var _8d9;
var _8da;
if(_8d6==6){
_8da=dojo.flash.flash6_version;
var _8db=djConfig.baseRelativePath;
_8da=_8da+"?baseRelativePath="+escape(_8db);
_8d9="<embed id=\""+this.id+"\" src=\""+_8da+"\" "+"    quality=\"high\" bgcolor=\"#ffffff\" "+"    width=\""+this.width+"\" height=\""+this.height+"\" "+"    name=\""+this.id+"\" "+"    align=\"middle\" allowScriptAccess=\"sameDomain\" "+"    type=\"application/x-shockwave-flash\" swLiveConnect=\"true\" "+"    pluginspage=\""+this.protocol()+"://www.macromedia.com/go/getflashplayer\">";
}else{
_8da=dojo.flash.flash8_version;
var _8dc=_8da;
var _8dd=_8da;
var _8db=djConfig.baseRelativePath;
if(_8d7){
var _8de=escape(window.location);
document.title=document.title.slice(0,47)+" - Flash Player Installation";
var _8df=escape(document.title);
_8dc+="?MMredirectURL="+_8de+"&MMplayerType=ActiveX"+"&MMdoctitle="+_8df+"&baseRelativePath="+escape(_8db);
_8dd+="?MMredirectURL="+_8de+"&MMplayerType=PlugIn"+"&baseRelativePath="+escape(_8db);
}
if(_8dd.indexOf("?")==-1){
_8dd+="?baseRelativePath="+escape(_8db);
}
_8d9="<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" "+"codebase=\""+this.protocol()+"://fpdownload.macromedia.com/pub/shockwave/cabs/flash/"+"swflash.cab#version=8,0,0,0\" "+"width=\""+this.width+"\" "+"height=\""+this.height+"\" "+"id=\""+this.id+"\" "+"align=\"middle\"> "+"<param name=\"allowScriptAccess\" value=\"sameDomain\" /> "+"<param name=\"movie\" value=\""+_8dc+"\" /> "+"<param name=\"quality\" value=\"high\" /> "+"<param name=\"bgcolor\" value=\"#ffffff\" /> "+"<embed src=\""+_8dd+"\" "+"quality=\"high\" "+"bgcolor=\"#ffffff\" "+"width=\""+this.width+"\" "+"height=\""+this.height+"\" "+"id=\""+this.id+"\" "+"name=\""+this.id+"\" "+"swLiveConnect=\"true\" "+"align=\"middle\" "+"allowScriptAccess=\"sameDomain\" "+"type=\"application/x-shockwave-flash\" "+"pluginspage=\""+this.protocol()+"://www.macromedia.com/go/getflashplayer\" />"+"</object>";
}
_8d9="<div id=\""+this.id+"Container\" style=\""+_8d8+"\"> "+_8d9+"</div>";
document.writeln(_8d9);
},get:function(){
return document.getElementById(this.id);
},setVisible:function(_8e0){
var _8e1=dojo.byId(this.id+"Container");
if(_8e0==true){
_8e1.style.visibility="visible";
}else{
_8e1.style.position="absolute";
_8e1.style.x="-1000px";
_8e1.style.y="-1000px";
_8e1.style.visibility="hidden";
}
},center:function(){
var _8e2=this.width;
var _8e3=this.height;
var _8e4=dojo.html.getScroll().offset;
var _8e5=dojo.html.getViewport();
var x=_8e4.x+(_8e5.width-_8e2)/2;
var y=_8e4.y+(_8e5.height-_8e3)/2;
var _8e8=dojo.byId(this.id+"Container");
_8e8.style.top=y+"px";
_8e8.style.left=x+"px";
}};
dojo.flash.Communicator=function(){
if(dojo.flash.useFlash6()){
this._writeFlash6();
}else{
if(dojo.flash.useFlash8()){
this._writeFlash8();
}
}
};
dojo.flash.Communicator.prototype={_writeFlash6:function(){
var id=dojo.flash.obj.id;
document.writeln("<script language=\"JavaScript\">");
document.writeln("  function "+id+"_DoFSCommand(command, args){ ");
document.writeln("    dojo.flash.comm._handleFSCommand(command, args); ");
document.writeln("}");
document.writeln("</script>");
if(dojo.render.html.ie){
document.writeln("<SCRIPT LANGUAGE=VBScript> ");
document.writeln("on error resume next ");
document.writeln("Sub "+id+"_FSCommand(ByVal command, ByVal args)");
document.writeln(" call "+id+"_DoFSCommand(command, args)");
document.writeln("end sub");
document.writeln("</SCRIPT> ");
}
},_writeFlash8:function(){
},_handleFSCommand:function(_8ea,args){
if(_8ea!=null&&!dojo.lang.isUndefined(_8ea)&&/^FSCommand:(.*)/.test(_8ea)==true){
_8ea=_8ea.match(/^FSCommand:(.*)/)[1];
}
if(_8ea=="addCallback"){
this._fscommandAddCallback(_8ea,args);
}else{
if(_8ea=="call"){
this._fscommandCall(_8ea,args);
}else{
if(_8ea=="fscommandReady"){
this._fscommandReady();
}
}
}
},_fscommandAddCallback:function(_8ec,args){
var _8ee=args;
var _8ef=function(){
return dojo.flash.comm._call(_8ee,arguments);
};
dojo.flash.comm[_8ee]=_8ef;
dojo.flash.obj.get().SetVariable("_succeeded",true);
},_fscommandCall:function(_8f0,args){
var _8f2=dojo.flash.obj.get();
var _8f3=args;
var _8f4=parseInt(_8f2.GetVariable("_numArgs"));
var _8f5=new Array();
for(var i=0;i<_8f4;i++){
var _8f7=_8f2.GetVariable("_"+i);
_8f5.push(_8f7);
}
var _8f8;
if(_8f3.indexOf(".")==-1){
_8f8=window[_8f3];
}else{
_8f8=eval(_8f3);
}
var _8f9=null;
if(!dojo.lang.isUndefined(_8f8)&&_8f8!=null){
_8f9=_8f8.apply(null,_8f5);
}
_8f2.SetVariable("_returnResult",_8f9);
},_fscommandReady:function(){
var _8fa=dojo.flash.obj.get();
_8fa.SetVariable("fscommandReady","true");
},_call:function(_8fb,args){
var _8fd=dojo.flash.obj.get();
_8fd.SetVariable("_functionName",_8fb);
_8fd.SetVariable("_numArgs",args.length);
for(var i=0;i<args.length;i++){
var _8ff=args[i];
_8ff=_8ff.replace(/\0/g,"\\0");
_8fd.SetVariable("_"+i,_8ff);
}
_8fd.TCallLabel("/_flashRunner","execute");
var _900=_8fd.GetVariable("_returnResult");
_900=_900.replace(/\\0/g,"\x00");
return _900;
},_addExternalInterfaceCallback:function(_901){
var _902=function(){
var _903=new Array(arguments.length);
for(var i=0;i<arguments.length;i++){
_903[i]=arguments[i];
}
return dojo.flash.comm._execFlash(_901,_903);
};
dojo.flash.comm[_901]=_902;
},_encodeData:function(data){
var _906=/\&([^;]*)\;/g;
data=data.replace(_906,"&amp;$1;");
data=data.replace(/</g,"&lt;");
data=data.replace(/>/g,"&gt;");
data=data.replace("\\","&custom_backslash;&custom_backslash;");
data=data.replace(/\n/g,"\\n");
data=data.replace(/\r/g,"\\r");
data=data.replace(/\f/g,"\\f");
data=data.replace(/\0/g,"\\0");
data=data.replace(/\'/g,"\\'");
data=data.replace(/\"/g,"\\\"");
return data;
},_decodeData:function(data){
if(data==null||typeof data=="undefined"){
return data;
}
data=data.replace(/\&custom_lt\;/g,"<");
data=data.replace(/\&custom_gt\;/g,">");
data=eval("\""+data+"\"");
return data;
},_chunkArgumentData:function(_908,_909){
var _90a=dojo.flash.obj.get();
var _90b=Math.ceil(_908.length/1024);
for(var i=0;i<_90b;i++){
var _90d=i*1024;
var _90e=i*1024+1024;
if(i==(_90b-1)){
_90e=i*1024+_908.length;
}
var _90f=_908.substring(_90d,_90e);
_90f=this._encodeData(_90f);
_90a.CallFunction("<invoke name=\"chunkArgumentData\" "+"returntype=\"javascript\">"+"<arguments>"+"<string>"+_90f+"</string>"+"<number>"+_909+"</number>"+"</arguments>"+"</invoke>");
}
},_chunkReturnData:function(){
var _910=dojo.flash.obj.get();
var _911=_910.getReturnLength();
var _912=new Array();
for(var i=0;i<_911;i++){
var _914=_910.CallFunction("<invoke name=\"chunkReturnData\" "+"returntype=\"javascript\">"+"<arguments>"+"<number>"+i+"</number>"+"</arguments>"+"</invoke>");
if(_914=="\"\""||_914=="''"){
_914="";
}else{
_914=_914.substring(1,_914.length-1);
}
_912.push(_914);
}
var _915=_912.join("");
return _915;
},_execFlash:function(_916,_917){
var _918=dojo.flash.obj.get();
_918.startExec();
_918.setNumberArguments(_917.length);
for(var i=0;i<_917.length;i++){
this._chunkArgumentData(_917[i],i);
}
_918.exec(_916);
var _91a=this._chunkReturnData();
_91a=this._decodeData(_91a);
_918.endExec();
return _91a;
}};
dojo.flash.Install=function(){
};
dojo.flash.Install.prototype={needed:function(){
if(dojo.flash.info.capable==false){
return true;
}
if(dojo.render.os.mac==true&&!dojo.flash.info.isVersionOrAbove(8,0,0)){
return true;
}
if(!dojo.flash.info.isVersionOrAbove(6,0,0)){
return true;
}
return false;
},install:function(){
dojo.flash.info.installing=true;
dojo.flash.installing();
if(dojo.flash.info.capable==false){
var _91b=new dojo.flash.Embed(false);
_91b.write(8);
}else{
if(dojo.flash.info.isVersionOrAbove(6,0,65)){
var _91b=new dojo.flash.Embed(false);
_91b.write(8,true);
_91b.setVisible(true);
_91b.center();
}else{
alert("This content requires a more recent version of the Macromedia "+" Flash Player.");
window.location.href=+dojo.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer";
}
}
},_onInstallStatus:function(msg){
if(msg=="Download.Complete"){
dojo.flash._initialize();
}else{
if(msg=="Download.Cancelled"){
alert("This content requires a more recent version of the Macromedia "+" Flash Player.");
window.location.href=dojo.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer";
}else{
if(msg=="Download.Failed"){
alert("There was an error downloading the Flash Player update. "+"Please try again later, or visit macromedia.com to download "+"the latest version of the Flash plugin.");
}
}
}
}};
dojo.flash.info=new dojo.flash.Info();
dojo.provide("dojo.storage.browser");
dojo.storage.browser.FileStorageProvider=function(){
};
dojo.inherits(dojo.storage.browser.FileStorageProvider,dojo.storage);
dojo.storage.browser.FileStorageProvider._KEY_INDEX_FILENAME="__dojoAllKeys";
dojo.storage.browser.FileStorageProvider._APPLET_ID="__dojoFileJavaObj";
dojo.lang.extend(dojo.storage.browser.FileStorageProvider,{namespace:"default",initialized:false,_available:null,_statusHandler:null,_keyIndex:new Array(),initialize:function(){
if(djConfig["disableFileStorage"]==true){
return;
}
this._loadKeyIndex();
this.initialized=true;
dojo.storage.manager.loaded();
},isAvailable:function(){
this._available=false;
var _91d=window.location.protocol;
if(_91d.indexOf("file")!=-1||_91d.indexOf("chrome")!=-1){
this._available=this._isAvailableXPCOM();
if(this._available==false){
this._available=this._isAvailableActiveX();
}
}
return this._available;
},put:function(key,_91f,_920){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
this._statusHandler=_920;
try{
this._save(key,_91f);
_920.call(null,dojo.storage.SUCCESS,key);
}
catch(e){
this._statusHandler.call(null,dojo.storage.FAILED,key,e.toString());
}
},get:function(key){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
var _922=this._load(key);
return _922;
},getKeys:function(){
return this._keyIndex;
},hasKey:function(key){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
this._loadKeyIndex();
var _924=false;
for(var i=0;i<this._keyIndex.length;i++){
if(this._keyIndex[i]==key){
_924=true;
}
}
return _924;
},clear:function(){
this._loadKeyIndex();
var _926=new Array();
for(var i=0;i<this._keyIndex.length;i++){
_926[_926.length]=new String(this._keyIndex[i]);
}
for(var i=0;i<_926.length;i++){
this.remove(_926[i]);
}
},remove:function(key){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
this._loadKeyIndex();
for(var i=0;i<this._keyIndex.length;i++){
if(this._keyIndex[i]==key){
this._keyIndex.splice(i,1);
break;
}
}
this._save(dojo.storage.browser.FileStorageProvider._KEY_INDEX_FILENAME,this._keyIndex,false);
var _92a=this._getPagePath()+key+".txt";
if(this._isAvailableXPCOM()){
this._removeXPCOM(_92a);
}else{
if(this._isAvailableActiveX()){
this._removeActiveX(_92a);
}
}
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return dojo.storage.SIZE_NO_LIMIT;
},hasSettingsUI:function(){
return false;
},showSettingsUI:function(){
dojo.raise(this.getType()+" does not support a storage settings user-interface");
},hideSettingsUI:function(){
dojo.raise(this.getType()+" does not support a storage settings user-interface");
},getType:function(){
return "dojo.storage.browser.FileStorageProvider";
},_save:function(key,_92c,_92d){
if(typeof _92d=="undefined"){
_92d=true;
}
if(dojo.lang.isString(_92c)==false){
_92c=dojo.json.serialize(_92c);
_92c="/* JavaScript */\n"+_92c+"\n\n";
}
var _92e=this._getPagePath()+key+".txt";
if(this._isAvailableXPCOM()){
this._saveFileXPCOM(_92e,_92c);
}else{
if(this._isAvailableActiveX()){
this._saveFileActiveX(_92e,_92c);
}
}
if(_92d){
this._updateKeyIndex(key);
}
},_load:function(key){
var _930=this._getPagePath()+key+".txt";
var _931=null;
if(this._isAvailableXPCOM()){
_931=this._loadFileXPCOM(_930);
}else{
if(this._isAvailableActiveX()){
_931=this._loadFileActiveX(_930);
}else{
if(this._isAvailableJava()){
_931=this._loadFileJava(_930);
}
}
}
if(_931==null){
return null;
}
if(!dojo.lang.isUndefined(_931)&&_931!=null&&/^\/\* JavaScript \*\//.test(_931)){
_931=dojo.json.evalJson(_931);
}
return _931;
},_updateKeyIndex:function(key){
this._loadKeyIndex();
var _933=false;
for(var i=0;i<this._keyIndex.length;i++){
if(this._keyIndex[i]==key){
_933=true;
break;
}
}
if(_933==false){
this._keyIndex[this._keyIndex.length]=key;
}
this._save(dojo.storage.browser.FileStorageProvider._KEY_INDEX_FILENAME,this._keyIndex,false);
},_loadKeyIndex:function(){
var _935=this._load(dojo.storage.browser.FileStorageProvider._KEY_INDEX_FILENAME);
if(_935==null){
this._keyIndex=new Array();
}else{
this._keyIndex=_935;
}
},_saveFileXPCOM:function(_936,_937){
try{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
var f=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
f.initWithPath(_936);
var _939=Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
_939.init(f,32|4|8,256+128,null);
_939.write(_937,_937.length);
_939.close();
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._saveFileXPCOM(): "+msg);
}
},_loadFileXPCOM:function(_93b){
try{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
var f=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
f.initWithPath(_93b);
if(f.exists()==false){
return null;
}
var inp=Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
inp.init(f,1,4,null);
var _93e=Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
_93e.init(inp);
var _93f=_93e.read(_93e.available());
return _93f;
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._loadFileXPCOM(): "+msg);
}
return null;
},_saveFileActiveX:function(_941,_942){
try{
var _943=new ActiveXObject("Scripting.FileSystemObject");
var f=_943.OpenTextFile(_941,2,true);
f.Write(_942);
f.Close();
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._saveFileActiveX(): "+msg);
}
},_loadFileActiveX:function(_946){
try{
var _947=new ActiveXObject("Scripting.FileSystemObject");
if(_947.FileExists(_946)==false){
return null;
}
var f=_947.OpenTextFile(_946,1);
var _949=f.ReadAll();
f.Close();
return _949;
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._loadFileActiveX(): "+msg);
}
},_saveFileJava:function(_94b,_94c){
try{
var _94d=dojo.byId(dojo.storage.browser.FileStorageProvider._APPLET_ID);
_94d.save(_94b,_94c);
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._saveFileJava(): "+msg);
}
},_loadFileJava:function(_94f){
try{
var _950=dojo.byId(dojo.storage.browser.FileStorageProvider._APPLET_ID);
var _951=_950.load(_94f);
return _951;
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._loadFileJava(): "+msg);
}
},_isAvailableActiveX:function(){
try{
if(window.ActiveXObject){
var _953=new window.ActiveXObject("Scripting.FileSystemObject");
return true;
}
}
catch(e){
dojo.debug(e);
}
return false;
},_isAvailableXPCOM:function(){
try{
if(window.Components){
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
return true;
}
}
catch(e){
dojo.debug(e);
}
return false;
},_isAvailableJava:function(){
try{
if(dojo.render.html.safari==true||dojo.render.html.opera==true()){
if(navigator.javaEnabled()==true){
return true;
}
}
}
catch(e){
dojo.debug(e);
}
return false;
},_getPagePath:function(){
var path=window.location.pathname;
if(/\.html?$/i.test(path)){
path=path.replace(/(?:\/|\\)?[^\.\/\\]*\.html?$/,"");
}
if(/^\/?[a-z]+\:/i.test(path)){
path=path.replace(/^\/?/,"");
path=path.replace(/\//g,"\\");
}else{
if(/^[\/\\]{2,3}[^\/]/.test(path)){
path=path.replace(/^[\/\\]{2,3}/,"");
path=path.replace(/\//g,"\\");
path="\\\\"+path;
}
}
if(/\/$/.test(path)==false&&/\\$/.test(path)==false){
if(/\//.test(path)){
path+="/";
}else{
path+="\\";
}
}
path=unescape(path);
return path;
},_removeXPCOM:function(_955){
try{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
var f=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
f.initWithPath(_955);
if(f.exists()==false||f.isDirectory()){
return;
}
if(f.isFile()){
f.remove(false);
}
}
catch(e){
dojo.raise("dojo.storage.browser.FileStorageProvider.remove(): "+e.toString());
}
},_removeActiveX:function(_957){
try{
var _958=new ActiveXObject("Scripting.FileSystemObject");
_958.DeleteFile(_957);
}
catch(e){
dojo.raise("dojo.storage.browser.FileStorageProvider.remove(): "+e.toString());
}
},_removeJava:function(_959){
try{
var _95a=dojo.byId(dojo.storage.browser.FileStorageProvider._APPLET_ID);
_95a.remove(_959);
}
catch(e){
var msg=e.toString();
if(e.name&&e.message){
msg=e.name+": "+e.message;
}
dojo.raise("dojo.storage.browser.FileStorageProvider._removeJava(): "+msg);
}
},_writeApplet:function(){
var _95c=dojo.uri.moduleUri("dojo","../DojoFileStorageProvider.jar").toString();
var tag="<applet "+"id='"+dojo.storage.browser.FileStorageProvider._APPLET_ID+"' "+"style='position: absolute; top: -500px; left: -500px; width: 1px; height: 1px;' "+"code='DojoFileStorageProvider.class' "+"archive='"+_95c+"' "+"width='1' "+"height='1' "+">"+"</applet>";
document.writeln(tag);
}});
dojo.storage.browser.WhatWGStorageProvider=function(){
};
dojo.inherits(dojo.storage.browser.WhatWGStorageProvider,dojo.storage);
dojo.lang.extend(dojo.storage.browser.WhatWGStorageProvider,{namespace:"default",initialized:false,_domain:null,_available:null,_statusHandler:null,initialize:function(){
if(djConfig["disableWhatWGStorage"]==true){
return;
}
this._domain=location.hostname;
this.initialized=true;
dojo.storage.manager.loaded();
},isAvailable:function(){
try{
var _95e=globalStorage[location.hostname];
}
catch(e){
this._available=false;
return this._available;
}
this._available=true;
return this._available;
},put:function(key,_960,_961){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
this._statusHandler=_961;
if(dojo.lang.isString(_960)){
_960="string:"+_960;
}else{
_960=dojo.json.serialize(_960);
}
window.addEventListener("storage",function(evt){
_961.call(null,dojo.storage.SUCCESS,key);
},false);
try{
var _963=globalStorage[this._domain];
_963.setItem(key,_960);
}
catch(e){
this._statusHandler.call(null,dojo.storage.FAILED,key,e.toString());
}
},get:function(key){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
var _965=globalStorage[this._domain];
var _966=_965.getItem(key);
if(_966==null){
return null;
}
_966=_966.value;
if(!dojo.lang.isUndefined(_966)&&_966!=null&&/^string:/.test(_966)){
_966=_966.substring("string:".length);
}else{
_966=dojo.json.evalJson(_966);
}
return _966;
},getKeys:function(){
var _967=globalStorage[this._domain];
var _968=new Array();
for(i=0;i<_967.length;i++){
_968[i]=_967.key(i);
}
return _968;
},clear:function(){
var _969=globalStorage[this._domain];
var keys=new Array();
for(var i=0;i<_969.length;i++){
keys[keys.length]=_969.key(i);
}
for(var i=0;i<keys.length;i++){
_969.removeItem(keys[i]);
}
},remove:function(key){
var _96d=globalStorage[this._domain];
_96d.removeItem(key);
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return dojo.storage.SIZE_NO_LIMIT;
},hasSettingsUI:function(){
return false;
},showSettingsUI:function(){
dojo.raise(this.getType()+" does not support a storage settings user-interface");
},hideSettingsUI:function(){
dojo.raise(this.getType()+" does not support a storage settings user-interface");
},getType:function(){
return "dojo.storage.browser.WhatWGProvider";
}});
dojo.storage.browser.FlashStorageProvider=function(){
};
dojo.inherits(dojo.storage.browser.FlashStorageProvider,dojo.storage);
dojo.lang.extend(dojo.storage.browser.FlashStorageProvider,{namespace:"default",initialized:false,_available:null,_statusHandler:null,initialize:function(){
if(djConfig["disableFlashStorage"]==true){
return;
}
var _96e=function(){
dojo.storage._flashLoaded();
};
dojo.flash.addLoadedListener(_96e);
var _96f=dojo.uri.moduleUri("dojo","../Storage_version6.swf").toString();
var _970=dojo.uri.moduleUri("dojo","../Storage_version8.swf").toString();
dojo.flash.setSwf({flash6:_96f,flash8:_970,visible:false});
},isAvailable:function(){
if(djConfig["disableFlashStorage"]==true){
this._available=false;
}else{
this._available=true;
}
return this._available;
},put:function(key,_972,_973){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
this._statusHandler=_973;
if(dojo.lang.isString(_972)){
_972="string:"+_972;
}else{
_972=dojo.json.serialize(_972);
}
dojo.flash.comm.put(key,_972,this.namespace);
},get:function(key){
if(this.isValidKey(key)==false){
dojo.raise("Invalid key given: "+key);
}
var _975=dojo.flash.comm.get(key,this.namespace);
if(_975==""){
return null;
}
if(!dojo.lang.isUndefined(_975)&&_975!=null&&/^string:/.test(_975)){
_975=_975.substring("string:".length);
}else{
_975=dojo.json.evalJson(_975);
}
return _975;
},getKeys:function(){
var _976=dojo.flash.comm.getKeys(this.namespace);
if(_976==""){
return [];
}
return _976.split(",");
},clear:function(){
dojo.flash.comm.clear(this.namespace);
},remove:function(key){
dojo.unimplemented("dojo.storage.browser.FlashStorageProvider.remove");
},isPermanent:function(){
return true;
},getMaximumSize:function(){
return dojo.storage.SIZE_NO_LIMIT;
},hasSettingsUI:function(){
return true;
},showSettingsUI:function(){
dojo.flash.comm.showSettings();
dojo.flash.obj.setVisible(true);
dojo.flash.obj.center();
},hideSettingsUI:function(){
dojo.flash.obj.setVisible(false);
if(dojo.storage.onHideSettingsUI!=null&&!dojo.lang.isUndefined(dojo.storage.onHideSettingsUI)){
dojo.storage.onHideSettingsUI.call(null);
}
},getType:function(){
return "dojo.storage.browser.FlashStorageProvider";
},_flashLoaded:function(){
this._initialized=true;
dojo.storage.manager.loaded();
},_onStatus:function(_978,key){
var ds=dojo.storage;
var dfo=dojo.flash.obj;
if(_978==ds.PENDING){
dfo.center();
dfo.setVisible(true);
}else{
dfo.setVisible(false);
}
if((!dj_undef("_statusHandler",ds))&&(ds._statusHandler!=null)){
ds._statusHandler.call(null,_978,key);
}
}});
dojo.storage.manager.register("dojo.storage.browser.FileStorageProvider",new dojo.storage.browser.FileStorageProvider());
dojo.storage.manager.register("dojo.storage.browser.WhatWGStorageProvider",new dojo.storage.browser.WhatWGStorageProvider());
dojo.storage.manager.register("dojo.storage.browser.FlashStorageProvider",new dojo.storage.browser.FlashStorageProvider());
dojo.storage.manager.initialize();
dojo.kwCompoundRequire({common:["dojo.storage"],browser:["dojo.storage.browser"]});
dojo.provide("dojo.storage.*");
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_97d,_97e,_97f){
if(!_97f||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_97d,_97e);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_986,_987){
this.name=name;
this.module=_986;
this.resolver=_987;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_989,_98a){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _98b=this.resolver(name,_989);
if((_98b)&&(!this._loaded[_98b])&&(!this._failed[_98b])){
var req=dojo.require;
req(_98b,false,true);
if(dojo.hostenv.findModule(_98b,false)){
this._loaded[_98b]=true;
}else{
if(!_98a){
dojo.raise("dojo.ns.Ns.resolve: module '"+_98b+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_98b]=true;
}
}
return Boolean(this._loaded[_98b]);
};
dojo.registerNamespace=function(name,_98e,_98f){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_991){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_991;
}
};
dojo.registerNamespaceManifest=function(_993,path,name,_996,_997){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_996,_997);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.namespaces.dojo");
(function(){
var map={html:{"accordioncontainer":"dojo.widget.AccordionContainer","animatedpng":"dojo.widget.AnimatedPng","button":"dojo.widget.Button","chart":"dojo.widget.Chart","checkbox":"dojo.widget.Checkbox","clock":"dojo.widget.Clock","colorpalette":"dojo.widget.ColorPalette","combobox":"dojo.widget.ComboBox","combobutton":"dojo.widget.Button","contentpane":"dojo.widget.ContentPane","currencytextbox":"dojo.widget.CurrencyTextbox","datepicker":"dojo.widget.DatePicker","datetextbox":"dojo.widget.DateTextbox","debugconsole":"dojo.widget.DebugConsole","dialog":"dojo.widget.Dialog","dropdownbutton":"dojo.widget.Button","dropdowndatepicker":"dojo.widget.DropdownDatePicker","dropdowntimepicker":"dojo.widget.DropdownTimePicker","emaillisttextbox":"dojo.widget.InternetTextbox","emailtextbox":"dojo.widget.InternetTextbox","editor":"dojo.widget.Editor","editor2":"dojo.widget.Editor2","filteringtable":"dojo.widget.FilteringTable","fisheyelist":"dojo.widget.FisheyeList","fisheyelistitem":"dojo.widget.FisheyeList","floatingpane":"dojo.widget.FloatingPane","modalfloatingpane":"dojo.widget.FloatingPane","form":"dojo.widget.Form","googlemap":"dojo.widget.GoogleMap","inlineeditbox":"dojo.widget.InlineEditBox","integerspinner":"dojo.widget.Spinner","integertextbox":"dojo.widget.IntegerTextbox","ipaddresstextbox":"dojo.widget.InternetTextbox","layoutcontainer":"dojo.widget.LayoutContainer","linkpane":"dojo.widget.LinkPane","popupmenu2":"dojo.widget.Menu2","menuitem2":"dojo.widget.Menu2","menuseparator2":"dojo.widget.Menu2","menubar2":"dojo.widget.Menu2","menubaritem2":"dojo.widget.Menu2","pagecontainer":"dojo.widget.PageContainer","pagecontroller":"dojo.widget.PageContainer","popupcontainer":"dojo.widget.PopupContainer","progressbar":"dojo.widget.ProgressBar","radiogroup":"dojo.widget.RadioGroup","realnumbertextbox":"dojo.widget.RealNumberTextbox","regexptextbox":"dojo.widget.RegexpTextbox","repeater":"dojo.widget.Repeater","resizabletextarea":"dojo.widget.ResizableTextarea","richtext":"dojo.widget.RichText","select":"dojo.widget.Select","show":"dojo.widget.Show","showaction":"dojo.widget.ShowAction","showslide":"dojo.widget.ShowSlide","slidervertical":"dojo.widget.Slider","sliderhorizontal":"dojo.widget.Slider","slider":"dojo.widget.Slider","slideshow":"dojo.widget.SlideShow","sortabletable":"dojo.widget.SortableTable","splitcontainer":"dojo.widget.SplitContainer","tabcontainer":"dojo.widget.TabContainer","tabcontroller":"dojo.widget.TabContainer","taskbar":"dojo.widget.TaskBar","textbox":"dojo.widget.Textbox","timepicker":"dojo.widget.TimePicker","timetextbox":"dojo.widget.DateTextbox","titlepane":"dojo.widget.TitlePane","toaster":"dojo.widget.Toaster","toggler":"dojo.widget.Toggler","toolbar":"dojo.widget.Toolbar","toolbarcontainer":"dojo.widget.Toolbar","toolbaritem":"dojo.widget.Toolbar","toolbarbuttongroup":"dojo.widget.Toolbar","toolbarbutton":"dojo.widget.Toolbar","toolbardialog":"dojo.widget.Toolbar","toolbarmenu":"dojo.widget.Toolbar","toolbarseparator":"dojo.widget.Toolbar","toolbarspace":"dojo.widget.Toolbar","toolbarselect":"dojo.widget.Toolbar","toolbarcolordialog":"dojo.widget.Toolbar","tooltip":"dojo.widget.Tooltip","tree":"dojo.widget.Tree","treebasiccontroller":"dojo.widget.TreeBasicController","treecontextmenu":"dojo.widget.TreeContextMenu","treedisablewrapextension":"dojo.widget.TreeDisableWrapExtension","treedociconextension":"dojo.widget.TreeDocIconExtension","treeeditor":"dojo.widget.TreeEditor","treeemphasizeonselect":"dojo.widget.TreeEmphasizeOnSelect","treeexpandtonodeonselect":"dojo.widget.TreeExpandToNodeOnSelect","treelinkextension":"dojo.widget.TreeLinkExtension","treeloadingcontroller":"dojo.widget.TreeLoadingController","treemenuitem":"dojo.widget.TreeContextMenu","treenode":"dojo.widget.TreeNode","treerpccontroller":"dojo.widget.TreeRPCController","treeselector":"dojo.widget.TreeSelector","treetoggleonselect":"dojo.widget.TreeToggleOnSelect","treev3":"dojo.widget.TreeV3","treebasiccontrollerv3":"dojo.widget.TreeBasicControllerV3","treecontextmenuv3":"dojo.widget.TreeContextMenuV3","treedndcontrollerv3":"dojo.widget.TreeDndControllerV3","treeloadingcontrollerv3":"dojo.widget.TreeLoadingControllerV3","treemenuitemv3":"dojo.widget.TreeContextMenuV3","treerpccontrollerv3":"dojo.widget.TreeRpcControllerV3","treeselectorv3":"dojo.widget.TreeSelectorV3","urltextbox":"dojo.widget.InternetTextbox","usphonenumbertextbox":"dojo.widget.UsTextbox","ussocialsecuritynumbertextbox":"dojo.widget.UsTextbox","usstatetextbox":"dojo.widget.UsTextbox","usziptextbox":"dojo.widget.UsTextbox","validationtextbox":"dojo.widget.ValidationTextbox","treeloadingcontroller":"dojo.widget.TreeLoadingController","wizardcontainer":"dojo.widget.Wizard","wizardpane":"dojo.widget.Wizard","yahoomap":"dojo.widget.YahooMap"},svg:{"chart":"dojo.widget.svg.Chart"},vml:{"chart":"dojo.widget.vml.Chart"}};
dojo.addDojoNamespaceMapping=function(_999,_99a){
map[_999]=_99a;
};
function dojoNamespaceResolver(name,_99c){
if(!_99c){
_99c="html";
}
if(!map[_99c]){
return null;
}
return map[_99c][name];
}
dojo.registerNamespaceResolver("dojo",dojoNamespaceResolver);
})();
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _9a0=getTagName(node);
if(!_9a0){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_9a0])){
return _9a0;
}
var p=_9a0.indexOf(":");
if(p>=0){
return _9a0;
}
if(_9a0.substr(0,5)=="dojo:"){
return _9a0;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"&&node.scopeName!=undefined){
return node.scopeName.toLowerCase()+":"+_9a0;
}
if(_9a0.substr(0,4)=="dojo"){
return "dojo:"+_9a0.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _9a3=node.className||node.getAttribute("class");
if((_9a3)&&(_9a3.indexOf)&&(_9a3.indexOf("dojo-")!=-1)){
var _9a4=_9a3.split(" ");
for(var x=0,c=_9a4.length;x<c;x++){
if(_9a4[x].slice(0,5)=="dojo-"){
return "dojo:"+_9a4[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_9a8,_9a9,_9aa){
var _9ab=getTagName(node);
if(isIE&&_9ab.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _9ad=true;
if(_9a9){
var _9ae=getDojoTagName(node);
_9ab=_9ae||_9ab;
_9ad=Boolean(_9ae);
}
var _9af={};
_9af[_9ab]=[];
var pos=_9ab.indexOf(":");
if(pos>0){
var ns=_9ab.substring(0,pos);
_9af["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_9ad=false;
}
}
if(_9ad){
var _9b2=this.parseAttributes(node);
for(var attr in _9b2){
if((!_9af[_9ab][attr])||(typeof _9af[_9ab][attr]!="array")){
_9af[_9ab][attr]=[];
}
_9af[_9ab][attr].push(_9b2[attr]);
}
_9af[_9ab].nodeRef=node;
_9af.tagName=_9ab;
_9af.index=_9aa||0;
}
var _9b3=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_9af[ctn]){
_9af[ctn]=[];
}
_9af[ctn].push(this.parseElement(tcn,true,_9a9,_9b3));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_9af[ctn][_9af[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_9b3++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_9af[_9ab].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _9af;
};
this.parseAttributes=function(node){
var _9b8={};
var atts=node.attributes;
var _9ba,i=0;
while((_9ba=atts[i++])){
if(isIE){
if(!_9ba){
continue;
}
if((typeof _9ba=="object")&&(typeof _9ba.nodeValue=="undefined")||(_9ba.nodeValue==null)||(_9ba.nodeValue=="")){
continue;
}
}
var nn=_9ba.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_9ba.nodeName;
_9b8[nn]={value:_9ba.nodeValue};
}
return _9b8;
};
};
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _9bd={};
var _9be=[];
this.getUniqueId=function(_9bf){
var _9c0;
do{
_9c0=_9bf+"_"+(_9bd[_9bf]!=undefined?++_9bd[_9bf]:_9bd[_9bf]=0);
}while(this.getWidgetById(_9c0));
return _9c0;
};
this.add=function(_9c1){
this.widgets.push(_9c1);
if(!_9c1.extraArgs["id"]){
_9c1.extraArgs["id"]=_9c1.extraArgs["ID"];
}
if(_9c1.widgetId==""){
if(_9c1["id"]){
_9c1.widgetId=_9c1["id"];
}else{
if(_9c1.extraArgs["id"]){
_9c1.widgetId=_9c1.extraArgs["id"];
}else{
_9c1.widgetId=this.getUniqueId(_9c1.ns+"_"+_9c1.widgetType);
}
}
}
if(this.widgetIds[_9c1.widgetId]){
dojo.debug("widget ID collision on ID: "+_9c1.widgetId);
}
this.widgetIds[_9c1.widgetId]=_9c1;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_9c3){
if(dojo.lang.isNumber(_9c3)){
var tw=this.widgets[_9c3].widgetId;
delete this.topWidgets[tw];
delete this.widgetIds[tw];
this.widgets.splice(_9c3,1);
}else{
this.removeById(_9c3);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _9ca=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_9ca(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_9cf,_9d0){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_9cf(x)){
ret.push(x);
if(_9d0){
return false;
}
}
return true;
});
return (_9d0?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _9d6={};
var _9d7=["dojo.widget"];
for(var i=0;i<_9d7.length;i++){
_9d7[_9d7[i]]=true;
}
this.registerWidgetPackage=function(_9d9){
if(!_9d7[_9d9]){
_9d7[_9d9]=true;
_9d7.push(_9d9);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_9d7,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_9db,_9dc,_9dd,ns){
var impl=this.getImplementationName(_9db,ns);
if(impl){
var ret=_9dc?new impl(_9dc):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _9e1 in dojo.render){
if(dojo.render[_9e1]["capable"]===true){
var _9e2=dojo.render[_9e1].prefixes;
for(var i=0;i<_9e2.length;i++){
_9be.push(_9e2[i].toLowerCase());
}
}
}
}
var _9e4=function(_9e5,_9e6){
if(!_9e6){
return null;
}
for(var i=0,l=_9be.length,_9e9;i<=l;i++){
_9e9=(i<l?_9e6[_9be[i]]:_9e6);
if(!_9e9){
continue;
}
for(var name in _9e9){
if(name.toLowerCase()==_9e5){
return _9e9[name];
}
}
}
return null;
};
var _9eb=function(_9ec,_9ed){
var _9ee=dojo.evalObjPath(_9ed,false);
return (_9ee?_9e4(_9ec,_9ee):null);
};
this.getImplementationName=function(_9ef,ns){
var _9f1=_9ef.toLowerCase();
ns=ns||"dojo";
var imps=_9d6[ns]||(_9d6[ns]={});
var impl=imps[_9f1];
if(impl){
return impl;
}
if(!_9be.length){
buildPrefixCache();
}
var _9f4=dojo.ns.get(ns);
if(!_9f4){
dojo.ns.register(ns,ns+".widget");
_9f4=dojo.ns.get(ns);
}
if(_9f4){
_9f4.resolve(_9ef);
}
impl=_9eb(_9f1,_9f4.module);
if(impl){
return (imps[_9f1]=impl);
}
_9f4=dojo.ns.require(ns);
if((_9f4)&&(_9f4.resolver)){
_9f4.resolve(_9ef);
impl=_9eb(_9f1,_9f4.module);
if(impl){
return (imps[_9f1]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_9ef+"\" in \""+_9f4.module+"\" registered to namespace \""+_9f4.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_9d7.length;i++){
impl=_9eb(_9f1,_9d7[i]);
if(impl){
return (imps[_9f1]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_9ef+"\" in \""+_9f4.module+"\" registered to namespace \""+_9f4.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _9f7=this.topWidgets[id];
if(_9f7.checkSize){
_9f7.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_9fc,_9fd){
dw[(_9fd||_9fc)]=h(_9fc);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _9ff=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _9ff[n];
}
return _9ff;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.moduleUri("dojo.widget","templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _a01=null;
if(window.getComputedStyle){
var _a02=getComputedStyle(div,"");
_a01=_a02.getPropertyValue("background-image");
}else{
_a01=div.currentStyle.backgroundImage;
}
var _a03=false;
if(_a01!=null&&(_a01=="none"||_a01=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_a04){
this.doAccessibleCheck=_a04;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _a06=this.children[i];
if(_a06.onResized){
_a06.onResized();
}
}
},create:function(args,_a08,_a09,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_a08,_a09);
this.mixInProperties(args,_a08,_a09);
this.postMixInProperties(args,_a08,_a09);
dojo.widget.manager.add(this);
this.buildRendering(args,_a08,_a09);
this.initialize(args,_a08,_a09);
this.postInitialize(args,_a08,_a09);
this.postCreate(args,_a08,_a09);
return this;
},destroy:function(_a0b){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_a0b);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _a0c;
var i=0;
while(this.children.length>i){
_a0c=this.children[i];
if(_a0c instanceof dojo.widget.Widget){
this.removeChild(_a0c);
_a0c.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_a0f){
var ret=[];
var _a11=dojo.lang.isFunction(type);
if(!_a11){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_a11){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_a0f){
ret=ret.concat(this.children[x].getChildrenOfType(type,_a0f));
}
}
return ret;
},getDescendants:function(){
var _a13=[];
var _a14=[this];
var elem;
while((elem=_a14.pop())){
_a13.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_a14.push(elem);
});
}
}
return _a13;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _a1b;
var _a1c=dojo.widget.lcArgsCache[this.widgetType];
if(_a1c==null){
_a1c={};
for(var y in this){
_a1c[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_a1c;
}
var _a1e={};
for(var x in args){
if(!this[x]){
var y=_a1c[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_a1e[x]){
continue;
}
_a1e[x]=true;
if((typeof this[x])!=(typeof _a1b)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _a20=args[x].split(";");
for(var y=0;y<_a20.length;y++){
var si=_a20[y].indexOf(":");
if((si!=-1)&&(_a20[y].length>si)){
this[x][_a20[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_a20[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_a24){
},initialize:function(args,frag,_a27){
return false;
},postInitialize:function(args,frag,_a2a){
return false;
},postCreate:function(args,frag,_a2d){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_a30){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_a31){
},addChild:function(_a32){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_a33){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_a33){
this.children.splice(x,1);
_a33.parent=null;
break;
}
}
return _a33;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_a38,_a39,_a3a){
var _a3b=_a39.parseProperties(_a38["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_a3c,_a3d,_a3e){
var _a3f=_a3d.parseProperties(_a3c["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_a42,_a43,_a44,_a45){
dojo.a11y.setAccessibleMode();
var _a46=type.split(":");
_a46=(_a46.length==2)?_a46[1]:type;
var _a47=_a45||_a42.parseProperties(frag[frag["ns"]+":"+_a46]);
var _a48=dojo.widget.manager.getImplementation(_a46,null,null,frag["ns"]);
if(!_a48){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_a48.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_a47["dojoinsertionindex"]=_a44;
var ret=_a48.create(_a47,frag,_a43,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_a4a,_a4b,_a4c,init,_a4e){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_a51,_a52,_a53,init,_a55){
var _a56=_a51.split(".");
var type=_a56.pop();
var regx="\\.("+(_a52?_a52+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_a51.search(new RegExp(regx));
_a56=(r<0?_a56.join("."):_a51.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_a56);
var pos=_a56.indexOf(".");
var _a5b=(pos>-1)?_a56.substring(0,pos):_a56;
_a55=(_a55)||{};
_a55.widgetType=type;
if((!init)&&(_a55["classConstructor"])){
init=_a55.classConstructor;
delete _a55.classConstructor;
}
dojo.declare(_a51,_a53,init,_a55);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_a5c){
this.propertySetsList=[];
this.fragment=_a5c;
this.createComponents=function(frag,_a5e){
var _a5f=[];
var _a60=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _a61=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_a61[ltn]){
_a60=true;
ret=_a61[ltn](frag,this,_a5e,frag.index);
_a5f.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_a5e,frag.index);
if(ret){
_a60=true;
_a5f.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_a60){
_a5f=_a5f.concat(this.createSubComponents(frag,_a5e));
}
return _a5f;
};
this.createSubComponents=function(_a66,_a67){
var frag,_a69=[];
for(var item in _a66){
frag=_a66[item];
if(frag&&typeof frag=="object"&&(frag!=_a66.nodeRef)&&(frag!=_a66.tagName)&&(!dojo.dom.isNode(frag))){
_a69=_a69.concat(this.createComponents(frag,_a67));
}
}
return _a69;
};
this.parsePropertySets=function(_a6b){
return [];
};
this.parseProperties=function(_a6c){
var _a6d={};
for(var item in _a6c){
if((_a6c[item]==_a6c.tagName)||(_a6c[item]==_a6c.nodeRef)){
}else{
var frag=_a6c[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _a70=this;
this.getDataProvider(_a70,frag[0].value);
_a6d.dataProvider=this.dataProvider;
}
_a6d[item]=frag[0].value;
var _a71=this.parseProperties(frag);
for(var _a72 in _a71){
_a6d[_a72]=_a71[_a72];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _a6d[item]!="boolean"){
_a6d[item]=true;
}
break;
}
}
}
return _a6d;
};
this.getDataProvider=function(_a73,_a74){
dojo.io.bind({url:_a74,load:function(type,_a76){
if(type=="load"){
_a73.dataProvider=_a76;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_a77){
for(var x=0;x<this.propertySetsList.length;x++){
if(_a77==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_a79){
var _a7a=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _a7e=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_a7e==cpcc[0].value)){
_a7a.push(cpl);
}
}
return _a7a;
};
this.getPropertySets=function(_a7f){
var ppl="dojo:propertyproviderlist";
var _a81=[];
var _a82=_a7f.tagName;
if(_a7f[ppl]){
var _a83=_a7f[ppl].value.split(" ");
for(var _a84 in _a83){
if((_a84.indexOf("..")==-1)&&(_a84.indexOf("://")==-1)){
var _a85=this.getPropertySetById(_a84);
if(_a85!=""){
_a81.push(_a85);
}
}else{
}
}
}
return this.getPropertySetsByType(_a82).concat(_a81);
};
this.createComponentFromScript=function(_a86,_a87,_a88,ns){
_a88.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_a87.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_a88,this,null,null,_a88)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_a88,this,null,null,_a88)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_a8d,_a8e,_a8f){
var _a90=false;
var _a91=(typeof name=="string");
if(_a91){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _a94=name.toLowerCase();
var _a95=ns+":"+_a94;
_a90=(dojo.byId(name)&&!dojo.widget.tags[_a95]);
}
if((arguments.length==1)&&(_a90||!_a91)){
var xp=new dojo.xml.Parse();
var tn=_a90?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_a98,name,_a9a,ns){
_a9a[_a95]={dojotype:[{value:_a94}],nodeRef:_a98,fastMixIn:true};
_a9a.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_a98,name,_a9a,ns);
}
_a8d=_a8d||{};
var _a9c=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_a8e){
_a9c=true;
_a8e=tn;
if(h){
dojo.body().appendChild(_a8e);
}
}else{
if(_a8f){
dojo.dom.insertAtPosition(tn,_a8e,_a8f);
}else{
tn=_a8e;
}
}
var _a9e=fromScript(tn,name.toLowerCase(),_a8d,ns);
if((!_a9e)||(!_a9e[0])||(typeof _a9e[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_a9c&&_a9e[0].domNode.parentNode){
_a9e[0].domNode.parentNode.removeChild(_a9e[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _a9e[0];
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),dojoWidgetModuleUri:dojo.uri.moduleUri("dojo.widget"),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_aa0,_aa1,_aa2){
var _aa3=_aa0||obj.templatePath;
var _aa4=dojo.widget._templateCache;
if(!_aa3&&!obj["widgetType"]){
do{
var _aa5="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_aa4[_aa5]);
obj.widgetType=_aa5;
}
var wt=_aa3?_aa3.toString():obj.widgetType;
var ts=_aa4[wt];
if(!ts){
_aa4[wt]={"string":null,"node":null};
if(_aa2){
ts={};
}else{
ts=_aa4[wt];
}
}
if((!obj.templateString)&&(!_aa2)){
obj.templateString=_aa1||ts["string"];
}
if(obj.templateString){
obj.templateString=this._sanitizeTemplateString(obj.templateString);
}
if((!obj.templateNode)&&(!_aa2)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_aa3)){
var _aa8=this._sanitizeTemplateString(dojo.hostenv.getText(_aa3));
obj.templateString=_aa8;
if(!_aa2){
_aa4[wt]["string"]=_aa8;
}
}
if((!ts["string"])&&(!_aa2)){
ts.string=obj.templateString;
}
};
dojo.widget._sanitizeTemplateString=function(_aa9){
if(_aa9){
_aa9=_aa9.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _aaa=_aa9.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_aaa){
_aa9=_aaa[1];
}
}else{
_aa9="";
}
return _aa9;
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_aae){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_aae);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_aae);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _ab5=true;
if(dojo.render.html.ie){
_ab5=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _ab5;
}};
dojo.widget.attachTemplateNodes=function(_ab6,_ab7,_ab8){
var _ab9=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_ab6){
_ab6=_ab7.domNode;
}
if(_ab6.nodeType!=_ab9){
return;
}
var _abb=_ab6.all||_ab6.getElementsByTagName("*");
var _abc=_ab7;
for(var x=-1;x<_abb.length;x++){
var _abe=(x==-1)?_ab6:_abb[x];
var _abf=[];
if(!_ab7.widgetsInTemplate||!_abe.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _ac1=_abe.getAttribute(this.attachProperties[y]);
if(_ac1){
_abf=_ac1.split(";");
for(var z=0;z<_abf.length;z++){
if(dojo.lang.isArray(_ab7[_abf[z]])){
_ab7[_abf[z]].push(_abe);
}else{
_ab7[_abf[z]]=_abe;
}
}
break;
}
}
var _ac3=_abe.getAttribute(this.eventAttachProperty);
if(_ac3){
var evts=_ac3.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _ac5=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _ac7=tevt.split(":");
tevt=trim(_ac7[0]);
_ac5=trim(_ac7[1]);
}
if(!_ac5){
_ac5=tevt;
}
var tf=function(){
var ntf=new String(_ac5);
return function(evt){
if(_abc[ntf]){
_abc[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_abe,tevt,tf,false,true);
}
}
for(var y=0;y<_ab8.length;y++){
var _acb=_abe.getAttribute(_ab8[y]);
if((_acb)&&(_acb.length)){
var _ac5=null;
var _acc=_ab8[y].substr(4);
_ac5=trim(_acb);
var _acd=[_ac5];
if(_ac5.indexOf(";")>=0){
_acd=dojo.lang.map(_ac5.split(";"),trim);
}
for(var z=0;z<_acd.length;z++){
if(!_acd[z].length){
continue;
}
var tf=function(){
var ntf=new String(_acd[z]);
return function(evt){
if(_abc[ntf]){
_abc[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_abe,_acc,tf,false,true);
}
}
}
}
var _ad0=_abe.getAttribute(this.templateProperty);
if(_ad0){
_ab7[_ad0]=_abe;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_abe.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_abe,wai.name,"role",val);
}else{
var _ad4=val.split("-");
dojo.widget.wai.setAttr(_abe,wai.name,_ad4[0],_ad4[1]);
}
}
},this);
var _ad5=_abe.getAttribute(this.onBuildProperty);
if(_ad5){
eval("var node = baseNode; var widget = targetObj; "+_ad5);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_add,_ade,pos,ref,_ae1){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_ae1==undefined){
_ae1=this.children.length;
}
this.addWidgetAsDirectChild(_add,_ade,pos,ref,_ae1);
this.registerChild(_add,_ae1);
}
return _add;
},addWidgetAsDirectChild:function(_ae2,_ae3,pos,ref,_ae6){
if((!this.containerNode)&&(!_ae3)){
this.containerNode=this.domNode;
}
var cn=(_ae3)?_ae3:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_ae6){
_ae6=0;
}
_ae2.domNode.setAttribute("dojoinsertionindex",_ae6);
if(!ref){
cn.appendChild(_ae2.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_ae2.domNode,ref.parentNode,_ae6);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_ae2.domNode);
}else{
dojo.dom.insertAtPosition(_ae2.domNode,cn,pos);
}
}
}
},registerChild:function(_ae8,_ae9){
_ae8.dojoInsertionIndex=_ae9;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_ae9){
idx=i;
}
}
this.children.splice(idx+1,0,_ae8);
_ae8.parent=this;
_ae8.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_ae8.widgetId];
},removeChild:function(_aec){
dojo.dom.removeNode(_aec.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_aec);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_af0){
var _af1=this.getFragNodeRef(frag);
if(_af0&&(_af0.snarfChildDomOutput||!_af1)){
_af0.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_af1);
}else{
if(_af1){
if(this.domNode&&(this.domNode!==_af1)){
this._sourceNodeRef=dojo.dom.replaceNode(_af1,this.domNode);
}
}
}
if(_af0){
_af0.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _af2=new dojo.xml.Parse();
var _af3;
var _af4=this.domNode.getElementsByTagName("*");
for(var i=0;i<_af4.length;i++){
if(_af4[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_af3=_af4[i];
}
if(_af4[i].getAttribute("dojoType")){
_af4[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_af3){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_af3);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _af7=_af2.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_af7,this);
var _af8=[];
var _af9=[this];
var w;
while((w=_af9.pop())){
for(var i=0;i<w.children.length;i++){
var _afb=w.children[i];
if(_afb._processedSubWidgets||!_afb.extraArgs["issubwidget"]){
continue;
}
_af8.push(_afb);
if(_afb.isContainer){
_af9.push(_afb);
}
}
}
for(var i=0;i<_af8.length;i++){
var _afc=_af8[i];
if(_afc._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_afc._processedSubWidgets=true;
if(_afc.extraArgs["dojoattachevent"]){
var evts=_afc.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _aff=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _b01=tevt.split(":");
tevt=dojo.string.trim(_b01[0]);
_aff=dojo.string.trim(_b01[1]);
}
if(!_aff){
_aff=tevt;
}
if(dojo.lang.isFunction(_afc[tevt])){
dojo.event.kwConnect({srcObj:_afc,srcFunc:tevt,targetObj:this,targetFunc:_aff});
}else{
alert(tevt+" is not a function in widget "+_afc);
}
}
}
if(_afc.extraArgs["dojoattachpoint"]){
this[_afc.extraArgs["dojoattachpoint"]]=_afc;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _b05=args["templateCssPath"]||this.templateCssPath;
if(_b05&&!dojo.widget._cssFiles[_b05.toString()]){
if((!this.templateCssString)&&(_b05)){
this.templateCssString=dojo.hostenv.getText(_b05);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_b05.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_b05);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _b08=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_b08);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_b08)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _b0a=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_b0a=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_b0a){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_b0a.length;i++){
var key=_b0a[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _b11;
if((kval)||(dojo.lang.isString(kval))){
_b11=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_b11.indexOf("\"")>-1){
_b11=_b11.replace("\"","&quot;");
}
tstr=tstr.replace(_b0a[i],_b11);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_b08){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_b0a)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_b0a){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_b13,_b14){
if(!_b13){
_b13=this.domNode;
}
if(!_b14){
_b14=this;
}
return dojo.widget.attachTemplateNodes(_b13,_b14,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_b16,_b17,_b18){
dojo.html.show(node);
if(dojo.lang.isFunction(_b18)){
_b18();
}
},hide:function(node,_b1a,_b1b,_b1c){
dojo.html.hide(node);
if(dojo.lang.isFunction(_b1c)){
_b1c();
}
}};
dojo.lfx.toggle.fade={show:function(node,_b1e,_b1f,_b20){
dojo.lfx.fadeShow(node,_b1e,_b1f,_b20).play();
},hide:function(node,_b22,_b23,_b24){
dojo.lfx.fadeHide(node,_b22,_b23,_b24).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_b26,_b27,_b28){
dojo.lfx.wipeIn(node,_b26,_b27,_b28).play();
},hide:function(node,_b2a,_b2b,_b2c){
dojo.lfx.wipeOut(node,_b2a,_b2b,_b2c).play();
}};
dojo.lfx.toggle.explode={show:function(node,_b2e,_b2f,_b30,_b31){
dojo.lfx.explode(_b31||{x:0,y:0,width:0,height:0},node,_b2e,_b2f,_b30).play();
},hide:function(node,_b33,_b34,_b35,_b36){
dojo.lfx.implode(node,_b36||{x:0,y:0,width:0,height:0},_b33,_b34,_b35).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_b3d){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_b3d&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _b41=w||wh.width;
var _b42=h||wh.height;
if(this.width==_b41&&this.height==_b42){
return false;
}
this.width=_b41;
this.height=_b42;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_b45){
if(_b45.checkSize){
_b45.checkSize();
}
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.Button");
dojo.widget.defineWidget("dojo.widget.Button",dojo.widget.HtmlWidget,{isContainer:true,caption:"",templateString:"<div dojoAttachPoint=\"buttonNode\" class=\"dojoButton\" style=\"position:relative;\" dojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick; onKey:onKey; onFocus;\">\r\n  <div class=\"dojoButtonContents\" align=center dojoAttachPoint=\"containerNode\" style=\"position:absolute;z-index:2;\"></div>\r\n  <img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;\">\r\n  <img dojoAttachPoint=\"centerImage\" style=\"position:absolute;z-index:1;\">\r\n  <img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n</div>\r\n",templateCssString:"/* ---- button --- */\r\n.dojoButton {\r\n\tpadding: 0 0 0 0;\r\n\tfont-size: 8pt;\r\n\twhite-space: nowrap;\r\n\tcursor: pointer;\r\n\tfont-family: Myriad, Tahoma, Verdana, sans-serif;\r\n}\r\n\r\n.dojoButton .dojoButtonContents {\r\n\tpadding: 2px 2px 2px 2px;\r\n\ttext-align: center;\t\t/* if icon and label are split across two lines, center icon */\r\n\tcolor: white;\r\n}\r\n\r\n.dojoButtonLeftPart .dojoButtonContents {\r\n\tpadding-right: 8px;\r\n}\r\n\r\n.dojoButtonDisabled {\r\n\tcursor: url(\"images/no.gif\"), default;\r\n}\r\n\r\n\r\n.dojoButtonContents img {\r\n\tvertical-align: middle;\t/* if icon and label are on same line, center them */\r\n}\r\n\r\n/* -------- colors ------------ */\r\n\r\n.dojoButtonHover .dojoButtonContents {\r\n}\r\n\r\n.dojoButtonDepressed .dojoButtonContents {\r\n\tcolor: #293a4b;\r\n}\r\n\r\n.dojoButtonDisabled .dojoButtonContents {\r\n\tcolor: #aaa;\r\n}\r\n\r\n\r\n/* ---------- drop down button specific ---------- */\r\n\r\n/* border between label and arrow (for drop down buttons */\r\n.dojoButton .border {\r\n\twidth: 1px;\r\n\tbackground: gray;\r\n}\r\n\r\n/* button arrow */\r\n.dojoButton .downArrow {\r\n\tpadding-left: 10px;\r\n\ttext-align: center;\r\n}\r\n\r\n.dojoButton.disabled .downArrow {\r\n\tcursor : default;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/ButtonTemplate.css"),inactiveImg:"templates/images/soriaButton-",activeImg:"templates/images/soriaActive-",pressedImg:"templates/images/soriaPressed-",disabledImg:"templates/images/soriaDisabled-",width2height:1/3,fillInTemplate:function(){
if(this.caption){
this.containerNode.appendChild(document.createTextNode(this.caption));
}
dojo.html.disableSelection(this.containerNode);
},postCreate:function(){
this._sizeMyself();
},_sizeMyself:function(){
if(this.domNode.parentNode){
var _b46=document.createElement("span");
dojo.html.insertBefore(_b46,this.domNode);
}
dojo.body().appendChild(this.domNode);
this._sizeMyselfHelper();
if(_b46){
dojo.html.insertBefore(this.domNode,_b46);
dojo.html.removeNode(_b46);
}
},_sizeMyselfHelper:function(){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _b48=this.height*this.width2height;
this.containerNode.style.left=_b48+"px";
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.height;
this.leftImage.width=this.rightImage.width=_b48+1;
this.centerImage.width=this.containerWidth;
this.centerImage.style.left=_b48+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
if(this.disabled){
dojo.html.prependClass(this.domNode,"dojoButtonDisabled");
this.domNode.removeAttribute("tabIndex");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
}else{
dojo.html.removeClass(this.domNode,"dojoButtonDisabled");
this.domNode.setAttribute("tabIndex","0");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
}
this.domNode.style.height=this.height+"px";
this.domNode.style.width=(this.containerWidth+2*_b48)+"px";
},onMouseOver:function(e){
if(this.disabled){
return;
}
if(!dojo.html.hasClass(this.buttonNode,"dojoButtonHover")){
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
}
this._setImage(this.activeImg);
},onMouseDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonDepressed");
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.pressedImg);
},onMouseUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.activeImg);
},onMouseOut:function(e){
if(this.disabled){
return;
}
if(e.toElement&&dojo.html.isDescendantOf(e.toElement,this.buttonNode)){
return;
}
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.inactiveImg);
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
},onFocus:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(menu){
dojo.event.connectOnce(this.domNode,"onblur",this,"onBlur");
}
},onBlur:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(!menu){
return;
}
if(menu.close&&menu.isShowingNow){
menu.close();
}
},buttonClick:function(e){
if(!this.disabled){
try{
this.domNode.focus();
}
catch(e2){
}
this.onClick(e);
}
},onClick:function(e){
},_setImage:function(_b55){
this.leftImage.src=dojo.uri.moduleUri("dojo.widget",_b55+"l.gif");
this.centerImage.src=dojo.uri.moduleUri("dojo.widget",_b55+"c.gif");
this.rightImage.src=dojo.uri.moduleUri("dojo.widget",_b55+"r.gif");
},_toggleMenu:function(_b56){
var menu=dojo.widget.getWidgetById(_b56);
if(!menu){
return;
}
if(menu.open&&!menu.isShowingNow){
var pos=dojo.html.getAbsolutePosition(this.domNode,false);
menu.open(pos.x,pos.y+this.height,this);
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}else{
if(menu.close&&menu.isShowingNow){
menu.close();
}else{
menu.toggle();
}
}
},setCaption:function(_b59){
this.caption=_b59;
this.containerNode.innerHTML=_b59;
this._sizeMyself();
},setDisabled:function(_b5a){
this.disabled=_b5a;
this._sizeMyself();
}});
dojo.widget.defineWidget("dojo.widget.DropDownButton",dojo.widget.Button,{menuId:"",downArrow:"templates/images/whiteDownArrow.gif",disabledDownArrow:"templates/images/whiteDownArrow.gif",fillInTemplate:function(){
dojo.widget.DropDownButton.superclass.fillInTemplate.apply(this,arguments);
this.arrow=document.createElement("img");
dojo.html.setClass(this.arrow,"downArrow");
dojo.widget.wai.setAttr(this.domNode,"waiState","haspopup",this.menuId);
},_sizeMyselfHelper:function(){
this.arrow.src=dojo.uri.moduleUri("dojo.widget",this.disabled?this.disabledDownArrow:this.downArrow);
this.containerNode.appendChild(this.arrow);
dojo.widget.DropDownButton.superclass._sizeMyselfHelper.call(this);
},onClick:function(e){
this._toggleMenu(this.menuId);
}});
dojo.widget.defineWidget("dojo.widget.ComboButton",dojo.widget.Button,{menuId:"",templateString:"<div class=\"dojoButton\" style=\"position:relative;top:0px;left:0px; text-align:none;\" dojoAttachEvent=\"onKey;onFocus\">\r\n\r\n\t<div dojoAttachPoint=\"buttonNode\" class=\"dojoButtonLeftPart\" style=\"position:absolute;left:0px;top:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick;\">\r\n\t\t<div class=\"dojoButtonContents\" dojoAttachPoint=\"containerNode\" style=\"position:absolute;top:0px;right:0px;z-index:2;\"></div>\r\n\t\t<img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;top:0px;\">\r\n\t\t<img dojoAttachPoint=\"centerImage\" style=\"position:absolute;right:0px;top:0px;z-index:1;\">\r\n\t</div>\r\n\r\n\t<div dojoAttachPoint=\"rightPart\" class=\"dojoButtonRightPart\" style=\"position:absolute;top:0px;right:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver:rightOver; onMouseOut:rightOut; onMouseDown:rightDown; onMouseUp:rightUp; onClick:rightClick;\">\r\n\t\t<img dojoAttachPoint=\"arrowBackgroundImage\" style=\"position:absolute;top:0px;left:0px;z-index:1;\">\r\n\t\t<img src=\"${dojoWidgetModuleUri}templates/images/whiteDownArrow.gif\"\r\n\t\t  \t\tstyle=\"z-index:2;position:absolute;left:3px;top:50%;\">\r\n\t\t<img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n\t</div>\r\n\r\n</div>\r\n",splitWidth:2,arrowWidth:5,_sizeMyselfHelper:function(e){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _b5e=this.height/3;
if(this.disabled){
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
this.domNode.removeAttribute("tabIndex");
}else{
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
this.domNode.setAttribute("tabIndex","0");
}
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.arrowBackgroundImage.height=this.height;
this.leftImage.width=_b5e+1;
this.centerImage.width=this.containerWidth;
this.buttonNode.style.height=this.height+"px";
this.buttonNode.style.width=_b5e+this.containerWidth+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
this.arrowBackgroundImage.width=this.arrowWidth;
this.rightImage.width=_b5e+1;
this.rightPart.style.height=this.height+"px";
this.rightPart.style.width=this.arrowWidth+_b5e+"px";
this._setImageR(this.disabled?this.disabledImg:this.inactiveImg);
this.domNode.style.height=this.height+"px";
var _b5f=this.containerWidth+this.splitWidth+this.arrowWidth+2*_b5e;
this.domNode.style.width=_b5f+"px";
},_setImage:function(_b60){
this.leftImage.src=dojo.uri.moduleUri("dojo.widget",_b60+"l.gif");
this.centerImage.src=dojo.uri.moduleUri("dojo.widget",_b60+"c.gif");
},rightOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.activeImg);
},rightDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonDepressed");
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.pressedImg);
},rightUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.activeImg);
},rightOut:function(e){
if(this.disabled){
return;
}
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.inactiveImg);
},rightClick:function(e){
if(this.disabled){
return;
}
try{
this.domNode.focus();
}
catch(e2){
}
this._toggleMenu(this.menuId);
},_setImageR:function(_b66){
this.arrowBackgroundImage.src=dojo.uri.moduleUri("dojo.widget",_b66+"c.gif");
this.rightImage.src=dojo.uri.moduleUri("dojo.widget",_b66+"r.gif");
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(e.key==e.KEY_DOWN_ARROW&&e.altKey){
this.rightDown(e);
this.rightClick(e);
dojo.lang.setTimeout(this,"rightUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
}
}
}});
dojo.provide("dojo.widget.html.stabile");
dojo.widget.html.stabile={_sqQuotables:new RegExp("([\\\\'])","g"),_depth:0,_recur:false,depthLimit:2};
dojo.widget.html.stabile.getState=function(id){
dojo.widget.html.stabile.setup();
return dojo.widget.html.stabile.widgetState[id];
};
dojo.widget.html.stabile.setState=function(id,_b6b,_b6c){
dojo.widget.html.stabile.setup();
dojo.widget.html.stabile.widgetState[id]=_b6b;
if(_b6c){
dojo.widget.html.stabile.commit(dojo.widget.html.stabile.widgetState);
}
};
dojo.widget.html.stabile.setup=function(){
if(!dojo.widget.html.stabile.widgetState){
var text=dojo.widget.html.stabile._getStorage().value;
dojo.widget.html.stabile.widgetState=text?dj_eval("("+text+")"):{};
}
};
dojo.widget.html.stabile.commit=function(_b6e){
dojo.widget.html.stabile._getStorage().value=dojo.widget.html.stabile.description(_b6e);
};
dojo.widget.html.stabile.description=function(v,_b70){
var _b71=dojo.widget.html.stabile._depth;
var _b72=function(){
return this.description(this,true);
};
try{
if(v===void (0)){
return "undefined";
}
if(v===null){
return "null";
}
if(typeof (v)=="boolean"||typeof (v)=="number"||v instanceof Boolean||v instanceof Number){
return v.toString();
}
if(typeof (v)=="string"||v instanceof String){
var v1=v.replace(dojo.widget.html.stabile._sqQuotables,"\\$1");
v1=v1.replace(/\n/g,"\\n");
v1=v1.replace(/\r/g,"\\r");
return "'"+v1+"'";
}
if(v instanceof Date){
return "new Date("+d.getFullYear+","+d.getMonth()+","+d.getDate()+")";
}
var d;
if(v instanceof Array||v.push){
if(_b71>=dojo.widget.html.stabile.depthLimit){
return "[ ... ]";
}
d="[";
var _b75=true;
dojo.widget.html.stabile._depth++;
for(var i=0;i<v.length;i++){
if(_b75){
_b75=false;
}else{
d+=",";
}
d+=arguments.callee(v[i],_b70);
}
return d+"]";
}
if(v.constructor==Object||v.toString==_b72){
if(_b71>=dojo.widget.html.stabile.depthLimit){
return "{ ... }";
}
if(typeof (v.hasOwnProperty)!="function"&&v.prototype){
throw new Error("description: "+v+" not supported by script engine");
}
var _b75=true;
d="{";
dojo.widget.html.stabile._depth++;
for(var key in v){
if(v[key]==void (0)||typeof (v[key])=="function"){
continue;
}
if(_b75){
_b75=false;
}else{
d+=", ";
}
var kd=key;
if(!kd.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)){
kd=arguments.callee(key,_b70);
}
d+=kd+": "+arguments.callee(v[key],_b70);
}
return d+"}";
}
if(_b70){
if(dojo.widget.html.stabile._recur){
var _b79=Object.prototype.toString;
return _b79.apply(v,[]);
}else{
dojo.widget.html.stabile._recur=true;
return v.toString();
}
}else{
throw new Error("Unknown type: "+v);
return "'unknown'";
}
}
finally{
dojo.widget.html.stabile._depth=_b71;
}
};
dojo.widget.html.stabile._getStorage=function(){
if(dojo.widget.html.stabile.dataField){
return dojo.widget.html.stabile.dataField;
}
var form=document.forms._dojo_form;
return dojo.widget.html.stabile.dataField=form?form.stabile:{value:""};
};
dojo.provide("dojo.widget.PopupContainer");
dojo.declare("dojo.widget.PopupContainerBase",null,function(){
this.queueOnAnimationFinish=[];
},{isShowingNow:false,currentSubpopup:null,beginZIndex:1000,parentPopup:null,parent:null,popupIndex:0,aroundBox:dojo.html.boxSizing.BORDER_BOX,openedForWindow:null,processKey:function(evt){
return false;
},applyPopupBasicStyle:function(){
with(this.domNode.style){
display="none";
position="absolute";
}
},aboutToShow:function(){
},open:function(x,y,_b7e,_b7f,_b80,_b81){
if(this.isShowingNow){
return;
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.open,arguments);
return;
}
this.aboutToShow();
var _b82=false,node,_b84;
if(typeof x=="object"){
node=x;
_b84=_b7f;
_b7f=_b7e;
_b7e=y;
_b82=true;
}
this.parent=_b7e;
dojo.body().appendChild(this.domNode);
_b7f=_b7f||_b7e["domNode"]||[];
var _b85=null;
this.isTopLevel=true;
while(_b7e){
if(_b7e!==this&&(_b7e.setOpenedSubpopup!=undefined&&_b7e.applyPopupBasicStyle!=undefined)){
_b85=_b7e;
this.isTopLevel=false;
_b85.setOpenedSubpopup(this);
break;
}
_b7e=_b7e.parent;
}
this.parentPopup=_b85;
this.popupIndex=_b85?_b85.popupIndex+1:1;
if(this.isTopLevel){
var _b86=dojo.html.isNode(_b7f)?_b7f:null;
dojo.widget.PopupManager.opened(this,_b86);
}
if(this.isTopLevel&&!dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
this._bookmark=dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.getBookmark);
}else{
this._bookmark=null;
}
if(_b7f instanceof Array){
_b7f={left:_b7f[0],top:_b7f[1],width:0,height:0};
}
with(this.domNode.style){
display="";
zIndex=this.beginZIndex+this.popupIndex;
}
if(_b82){
this.move(node,_b81,_b84);
}else{
this.move(x,y,_b81,_b80);
}
this.domNode.style.display="none";
this.explodeSrc=_b7f;
this.show();
this.isShowingNow=true;
},move:function(x,y,_b89,_b8a){
var _b8b=(typeof x=="object");
if(_b8b){
var _b8c=_b89;
var node=x;
_b89=y;
if(!_b8c){
_b8c={"BL":"TL","TL":"BL"};
}
dojo.html.placeOnScreenAroundElement(this.domNode,node,_b89,this.aroundBox,_b8c);
}else{
if(!_b8a){
_b8a="TL,TR,BL,BR";
}
dojo.html.placeOnScreen(this.domNode,x,y,_b89,true,_b8a);
}
},close:function(_b8e){
if(_b8e){
this.domNode.style.display="none";
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.close,[]);
return;
}
this.closeSubpopup(_b8e);
this.hide();
if(this.bgIframe){
this.bgIframe.hide();
this.bgIframe.size({left:0,top:0,width:0,height:0});
}
if(this.isTopLevel){
dojo.widget.PopupManager.closed(this);
}
this.isShowingNow=false;
if(this.parent){
setTimeout(dojo.lang.hitch(this,function(){
try{
if(this.parent["focus"]){
this.parent.focus();
}else{
this.parent.domNode.focus();
}
}
catch(e){
dojo.debug("No idea how to focus to parent",e);
}
}),10);
}
if(this._bookmark&&dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
if(this.openedForWindow){
this.openedForWindow.focus();
}
try{
dojo.withGlobal(this.openedForWindow||dojo.global(),"moveToBookmark",dojo.html.selection,[this._bookmark]);
}
catch(e){
}
}
this._bookmark=null;
},closeAll:function(_b8f){
if(this.parentPopup){
this.parentPopup.closeAll(_b8f);
}else{
this.close(_b8f);
}
},setOpenedSubpopup:function(_b90){
this.currentSubpopup=_b90;
},closeSubpopup:function(_b91){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(_b91);
this.currentSubpopup=null;
},onShow:function(){
dojo.widget.PopupContainer.superclass.onShow.apply(this,arguments);
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
if(dojo.render.html.ie){
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
}
this.processQueue();
},processQueue:function(){
if(!this.queueOnAnimationFinish.length){
return;
}
var func=this.queueOnAnimationFinish.shift();
var args=this.queueOnAnimationFinish.shift();
func.apply(this,args);
},onHide:function(){
dojo.widget.HtmlWidget.prototype.onHide.call(this);
if(this.openedSize){
with(this.domNode.style){
width=this.openedSize.w;
height=this.openedSize.h;
}
}
this.processQueue();
}});
dojo.widget.defineWidget("dojo.widget.PopupContainer",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase],{isContainer:true,fillInTemplate:function(){
this.applyPopupBasicStyle();
dojo.widget.PopupContainer.superclass.fillInTemplate.apply(this,arguments);
}});
dojo.widget.PopupManager=new function(){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
this.focusNode=null;
this.registeredWindows=[];
this.registerWin=function(win){
if(!win.__PopupManagerRegistered){
dojo.event.connect(win.document,"onmousedown",this,"onClick");
dojo.event.connect(win,"onscroll",this,"onClick");
dojo.event.connect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=true;
this.registeredWindows.push(win);
}
};
this.registerAllWindows=function(_b95){
if(!_b95){
_b95=dojo.html.getDocumentWindow(window.top&&window.top.document||window.document);
}
this.registerWin(_b95);
for(var i=0;i<_b95.frames.length;i++){
try{
var win=dojo.html.getDocumentWindow(_b95.frames[i].document);
if(win){
this.registerAllWindows(win);
}
}
catch(e){
}
}
};
this.unRegisterWin=function(win){
if(win.__PopupManagerRegistered){
dojo.event.disconnect(win.document,"onmousedown",this,"onClick");
dojo.event.disconnect(win,"onscroll",this,"onClick");
dojo.event.disconnect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=false;
}
};
this.unRegisterAllWindows=function(){
for(var i=0;i<this.registeredWindows.length;++i){
this.unRegisterWin(this.registeredWindows[i]);
}
this.registeredWindows=[];
};
dojo.addOnLoad(this,"registerAllWindows");
dojo.addOnUnload(this,"unRegisterAllWindows");
this.closed=function(menu){
if(this.currentMenu==menu){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
}
};
this.opened=function(menu,_b9c){
if(menu==this.currentMenu){
return;
}
if(this.currentMenu){
this.currentMenu.close();
}
this.currentMenu=menu;
this.currentFocusMenu=menu;
this.currentButton=_b9c;
};
this.setFocusedMenu=function(menu){
this.currentFocusMenu=menu;
};
this.onKey=function(e){
if(!e.key){
return;
}
if(!this.currentMenu||!this.currentMenu.isShowingNow){
return;
}
var m=this.currentFocusMenu;
while(m){
if(m.processKey(e)){
e.preventDefault();
e.stopPropagation();
break;
}
m=m.parentPopup||m.parentMenu;
}
},this.onClick=function(e){
if(!this.currentMenu){
return;
}
var _ba1=dojo.html.getScroll().offset;
var m=this.currentMenu;
while(m){
if(dojo.html.overElement(m.domNode,e)||dojo.html.isDescendantOf(e.target,m.domNode)){
return;
}
m=m.currentSubpopup;
}
if(this.currentButton&&dojo.html.overElement(this.currentButton,e)){
return;
}
this.currentMenu.closeAll(true);
};
};
dojo.provide("dojo.widget.ComboBox");
dojo.declare("dojo.widget.incrementalComboBoxDataProvider",null,function(_ba3){
this.searchUrl=_ba3.dataUrl;
this._cache={};
this._inFlight=false;
this._lastRequest=null;
this.allowCache=false;
},{_addToCache:function(_ba4,data){
if(this.allowCache){
this._cache[_ba4]=data;
}
},startSearch:function(_ba6,_ba7){
if(this._inFlight){
}
var tss=encodeURIComponent(_ba6);
var _ba9=dojo.string.substituteParams(this.searchUrl,{"searchString":tss});
var _baa=this;
var _bab=this._lastRequest=dojo.io.bind({url:_ba9,method:"get",mimetype:"text/json",load:function(type,data,evt){
_baa._inFlight=false;
if(!dojo.lang.isArray(data)){
var _baf=[];
for(var key in data){
_baf.push([data[key],key]);
}
data=_baf;
}
_baa._addToCache(_ba6,data);
if(_bab==_baa._lastRequest){
_ba7(data);
}
}});
this._inFlight=true;
}});
dojo.declare("dojo.widget.basicComboBoxDataProvider",null,function(_bb1,node){
this._data=[];
this.searchLimit=30;
this.searchType="STARTSTRING";
this.caseSensitive=false;
if(!dj_undef("dataUrl",_bb1)&&!dojo.string.isBlank(_bb1.dataUrl)){
this._getData(_bb1.dataUrl);
}else{
if((node)&&(node.nodeName.toLowerCase()=="select")){
var opts=node.getElementsByTagName("option");
var ol=opts.length;
var data=[];
for(var x=0;x<ol;x++){
var text=opts[x].textContent||opts[x].innerText||opts[x].innerHTML;
var _bb8=[String(text),String(opts[x].value)];
data.push(_bb8);
if(opts[x].selected){
_bb1.setAllValues(_bb8[0],_bb8[1]);
}
}
this.setData(data);
}
}
},{_getData:function(url){
dojo.io.bind({url:url,load:dojo.lang.hitch(this,function(type,data,evt){
if(!dojo.lang.isArray(data)){
var _bbd=[];
for(var key in data){
_bbd.push([data[key],key]);
}
data=_bbd;
}
this.setData(data);
}),mimetype:"text/json"});
},startSearch:function(_bbf,_bc0){
this._performSearch(_bbf,_bc0);
},_performSearch:function(_bc1,_bc2){
var st=this.searchType;
var ret=[];
if(!this.caseSensitive){
_bc1=_bc1.toLowerCase();
}
for(var x=0;x<this._data.length;x++){
if((this.searchLimit>0)&&(ret.length>=this.searchLimit)){
break;
}
var _bc6=new String((!this.caseSensitive)?this._data[x][0].toLowerCase():this._data[x][0]);
if(_bc6.length<_bc1.length){
continue;
}
if(st=="STARTSTRING"){
if(_bc1==_bc6.substr(0,_bc1.length)){
ret.push(this._data[x]);
}
}else{
if(st=="SUBSTRING"){
if(_bc6.indexOf(_bc1)>=0){
ret.push(this._data[x]);
}
}else{
if(st=="STARTWORD"){
var idx=_bc6.indexOf(_bc1);
if(idx==0){
ret.push(this._data[x]);
}
if(idx<=0){
continue;
}
var _bc8=false;
while(idx!=-1){
if(" ,/(".indexOf(_bc6.charAt(idx-1))!=-1){
_bc8=true;
break;
}
idx=_bc6.indexOf(_bc1,idx+1);
}
if(!_bc8){
continue;
}else{
ret.push(this._data[x]);
}
}
}
}
}
_bc2(ret);
},setData:function(_bc9){
this._data=_bc9;
}});
dojo.widget.defineWidget("dojo.widget.ComboBox",dojo.widget.HtmlWidget,{forceValidOption:false,searchType:"stringstart",dataProvider:null,autoComplete:true,searchDelay:100,dataUrl:"",fadeTime:200,maxListLength:8,mode:"local",selectedResult:null,dataProviderClass:"",buttonSrc:dojo.uri.moduleUri("dojo.widget","templates/images/combo_box_arrow.png"),dropdownToggle:"fade",templateString:"<span _=\"whitespace and CR's between tags adds &nbsp; in FF\"\r\n\tclass=\"dojoComboBoxOuter\"\r\n\t><input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \r\n\t\tdojoAttachPoint=\"comboBoxValue\"\r\n\t><input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \r\n\t\tdojoAttachPoint=\"comboBoxSelectionValue\"\r\n\t><input type=\"text\" autocomplete=\"off\" class=\"dojoComboBox\"\r\n\t\tdojoAttachEvent=\"key:_handleKeyEvents; keyUp: onKeyUp; compositionEnd; onResize;\"\r\n\t\tdojoAttachPoint=\"textInputNode\"\r\n\t><img hspace=\"0\"\r\n\t\tvspace=\"0\"\r\n\t\tclass=\"dojoComboBox\"\r\n\t\tdojoAttachPoint=\"downArrowNode\"\r\n\t\tdojoAttachEvent=\"onMouseUp: handleArrowClick; onResize;\"\r\n\t\tsrc=\"${this.buttonSrc}\"\r\n></span>\r\n",templateCssString:".dojoComboBoxOuter {\r\n\tborder: 0px !important;\r\n\tmargin: 0px !important;\r\n\tpadding: 0px !important;\r\n\tbackground: transparent !important;\r\n\twhite-space: nowrap !important;\r\n}\r\n\r\n.dojoComboBox {\r\n\tborder: 1px inset #afafaf;\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n\tvertical-align: middle !important;\r\n\tfloat: none !important;\r\n\tposition: static !important;\r\n\tdisplay: inline !important;\r\n}\r\n\r\n/* the input box */\r\ninput.dojoComboBox {\r\n\tborder-right-width: 0px !important; \r\n\tmargin-right: 0px !important;\r\n\tpadding-right: 0px !important;\r\n}\r\n\r\n/* the down arrow */\r\nimg.dojoComboBox {\r\n\tborder-left-width: 0px !important;\r\n\tpadding-left: 0px !important;\r\n\tmargin-left: 0px !important;\r\n}\r\n\r\n/* IE vertical-alignment calculations can be off by +-1 but these margins are collapsed away */\r\n.dj_ie img.dojoComboBox {\r\n\tmargin-top: 1px; \r\n\tmargin-bottom: 1px; \r\n}\r\n\r\n/* the drop down */\r\n.dojoComboBoxOptions {\r\n\tfont-family: Verdana, Helvetica, Garamond, sans-serif;\r\n\t/* font-size: 0.7em; */\r\n\tbackground-color: white;\r\n\tborder: 1px solid #afafaf;\r\n\tposition: absolute;\r\n\tz-index: 1000; \r\n\toverflow: auto;\r\n\tcursor: default;\r\n}\r\n\r\n.dojoComboBoxItem {\r\n\tpadding-left: 2px;\r\n\tpadding-top: 2px;\r\n\tmargin: 0px;\r\n}\r\n\r\n.dojoComboBoxItemEven {\r\n\tbackground-color: #f4f4f4;\r\n}\r\n\r\n.dojoComboBoxItemOdd {\r\n\tbackground-color: white;\r\n}\r\n\r\n.dojoComboBoxItemHighlight {\r\n\tbackground-color: #63709A;\r\n\tcolor: white;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/ComboBox.css"),setValue:function(_bca){
this.comboBoxValue.value=_bca;
if(this.textInputNode.value!=_bca){
this.textInputNode.value=_bca;
dojo.widget.html.stabile.setState(this.widgetId,this.getState(),true);
this.onValueChanged(_bca);
}
},onValueChanged:function(_bcb){
},getValue:function(){
return this.comboBoxValue.value;
},getState:function(){
return {value:this.getValue()};
},setState:function(_bcc){
this.setValue(_bcc.value);
},enable:function(){
this.disabled=false;
this.textInputNode.removeAttribute("disabled");
},disable:function(){
this.disabled=true;
this.textInputNode.setAttribute("disabled",true);
},_getCaretPos:function(_bcd){
if(dojo.lang.isNumber(_bcd.selectionStart)){
return _bcd.selectionStart;
}else{
if(dojo.render.html.ie){
var tr=document.selection.createRange().duplicate();
var ntr=_bcd.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
return 0;
}
}
}
},_setCaretPos:function(_bd0,_bd1){
_bd1=parseInt(_bd1);
this._setSelectedRange(_bd0,_bd1,_bd1);
},_setSelectedRange:function(_bd2,_bd3,end){
if(!end){
end=_bd2.value.length;
}
if(_bd2.setSelectionRange){
_bd2.focus();
_bd2.setSelectionRange(_bd3,end);
}else{
if(_bd2.createTextRange){
var _bd5=_bd2.createTextRange();
with(_bd5){
collapse(true);
moveEnd("character",end);
moveStart("character",_bd3);
select();
}
}else{
_bd2.value=_bd2.value;
_bd2.blur();
_bd2.focus();
var dist=parseInt(_bd2.value.length)-end;
var _bd7=String.fromCharCode(37);
var tcc=_bd7.charCodeAt(0);
for(var x=0;x<dist;x++){
var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
_bd2.dispatchEvent(te);
}
}
}
},_handleKeyEvents:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return;
}
this._prev_key_backspace=false;
this._prev_key_esc=false;
var k=dojo.event.browser.keys;
var _bdd=true;
switch(evt.key){
case k.KEY_DOWN_ARROW:
if(!this.popupWidget.isShowingNow){
this._startSearchFromInput();
}
this._highlightNextOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_UP_ARROW:
this._highlightPrevOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_TAB:
if(!this.autoComplete&&this.popupWidget.isShowingNow&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this._selectOption({"target":this._highlighted_option,"noHide":false});
this._setSelectedRange(this.textInputNode,this.textInputNode.value.length,null);
}else{
this._selectOption();
return;
}
break;
case k.KEY_ENTER:
if(this.popupWidget.isShowingNow){
dojo.event.browser.stopEvent(evt);
}
if(this.autoComplete){
this._selectOption();
return;
}
case " ":
if(this.popupWidget.isShowingNow&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this._selectOption();
this._hideResultList();
return;
}
break;
case k.KEY_ESCAPE:
this._hideResultList();
this._prev_key_esc=true;
return;
case k.KEY_BACKSPACE:
this._prev_key_backspace=true;
if(!this.textInputNode.value.length){
this.setAllValues("","");
this._hideResultList();
_bdd=false;
}
break;
case k.KEY_RIGHT_ARROW:
case k.KEY_LEFT_ARROW:
_bdd=false;
break;
default:
if(evt.charCode==0){
_bdd=false;
}
}
if(this.searchTimer){
clearTimeout(this.searchTimer);
}
if(_bdd){
this._blurOptionNode();
this.searchTimer=setTimeout(dojo.lang.hitch(this,this._startSearchFromInput),this.searchDelay);
}
},compositionEnd:function(evt){
evt.key=evt.keyCode;
this._handleKeyEvents(evt);
},onKeyUp:function(evt){
this.setValue(this.textInputNode.value);
},setSelectedValue:function(_be0){
this.comboBoxSelectionValue.value=_be0;
},setAllValues:function(_be1,_be2){
this.setSelectedValue(_be2);
this.setValue(_be1);
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.html.removeClass(this._highlighted_option,"dojoComboBoxItemHighlight");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
if((!this._highlighted_option)||!this._highlighted_option.parentNode){
this._focusOptionNode(this.optionsListNode.firstChild);
}else{
if(this._highlighted_option.nextSibling){
this._focusOptionNode(this._highlighted_option.nextSibling);
}
}
dojo.html.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
if(this._highlighted_option&&this._highlighted_option.previousSibling){
this._focusOptionNode(this._highlighted_option.previousSibling);
}else{
this._highlighted_option=null;
this._hideResultList();
return;
}
dojo.html.scrollIntoView(this._highlighted_option);
},_itemMouseOver:function(evt){
if(evt.target===this.optionsListNode){
return;
}
this._focusOptionNode(evt.target);
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
},_itemMouseOut:function(evt){
if(evt.target===this.optionsListNode){
return;
}
this._blurOptionNode();
},onResize:function(){
var _be6=dojo.html.getContentBox(this.textInputNode);
if(_be6.height<=0){
dojo.lang.setTimeout(this,"onResize",100);
return;
}
var _be7={width:_be6.height,height:_be6.height};
dojo.html.setContentBox(this.downArrowNode,_be7);
},fillInTemplate:function(args,frag){
dojo.html.applyBrowserClass(this.domNode);
var _bea=this.getFragNodeRef(frag);
if(!this.name&&_bea.name){
this.name=_bea.name;
}
this.comboBoxValue.name=this.name;
this.comboBoxSelectionValue.name=this.name+"_selected";
dojo.html.copyStyle(this.domNode,_bea);
dojo.html.copyStyle(this.textInputNode,_bea);
dojo.html.copyStyle(this.downArrowNode,_bea);
with(this.downArrowNode.style){
width="0px";
height="0px";
}
var _beb;
if(this.dataProviderClass){
if(typeof this.dataProviderClass=="string"){
_beb=dojo.evalObjPath(this.dataProviderClass);
}else{
_beb=this.dataProviderClass;
}
}else{
if(this.mode=="remote"){
_beb=dojo.widget.incrementalComboBoxDataProvider;
}else{
_beb=dojo.widget.basicComboBoxDataProvider;
}
}
this.dataProvider=new _beb(this,this.getFragNodeRef(frag));
this.popupWidget=new dojo.widget.createWidget("PopupContainer",{toggle:this.dropdownToggle,toggleDuration:this.toggleDuration});
dojo.event.connect(this,"destroy",this.popupWidget,"destroy");
this.optionsListNode=this.popupWidget.domNode;
this.domNode.appendChild(this.optionsListNode);
dojo.html.addClass(this.optionsListNode,"dojoComboBoxOptions");
dojo.event.connect(this.optionsListNode,"onclick",this,"_selectOption");
dojo.event.connect(this.optionsListNode,"onmouseover",this,"_onMouseOver");
dojo.event.connect(this.optionsListNode,"onmouseout",this,"_onMouseOut");
dojo.event.connect(this.optionsListNode,"onmouseover",this,"_itemMouseOver");
dojo.event.connect(this.optionsListNode,"onmouseout",this,"_itemMouseOut");
},_openResultList:function(_bec){
if(this.disabled){
return;
}
this._clearResultList();
if(!_bec.length){
this._hideResultList();
}
if((this.autoComplete)&&(_bec.length)&&(!this._prev_key_backspace)&&(this.textInputNode.value.length>0)){
var cpos=this._getCaretPos(this.textInputNode);
if((cpos+1)>this.textInputNode.value.length){
this.textInputNode.value+=_bec[0][0].substr(cpos);
this._setSelectedRange(this.textInputNode,cpos,this.textInputNode.value.length);
}
}
var even=true;
while(_bec.length){
var tr=_bec.shift();
if(tr){
var td=document.createElement("div");
td.appendChild(document.createTextNode(tr[0]));
td.setAttribute("resultName",tr[0]);
td.setAttribute("resultValue",tr[1]);
td.className="dojoComboBoxItem "+((even)?"dojoComboBoxItemEven":"dojoComboBoxItemOdd");
even=(!even);
this.optionsListNode.appendChild(td);
}
}
this._showResultList();
},_onFocusInput:function(){
this._hasFocus=true;
},_onBlurInput:function(){
this._hasFocus=false;
this._handleBlurTimer(true,500);
},_handleBlurTimer:function(_bf1,_bf2){
if(this.blurTimer&&(_bf1||_bf2)){
clearTimeout(this.blurTimer);
}
if(_bf2){
this.blurTimer=dojo.lang.setTimeout(this,"_checkBlurred",_bf2);
}
},_onMouseOver:function(evt){
if(!this._mouseover_list){
this._handleBlurTimer(true,0);
this._mouseover_list=true;
}
},_onMouseOut:function(evt){
var _bf5=evt.relatedTarget;
try{
if(!_bf5||_bf5.parentNode!=this.optionsListNode){
this._mouseover_list=false;
this._handleBlurTimer(true,100);
this._tryFocus();
}
}
catch(e){
}
},_isInputEqualToResult:function(_bf6){
var _bf7=this.textInputNode.value;
if(!this.dataProvider.caseSensitive){
_bf7=_bf7.toLowerCase();
_bf6=_bf6.toLowerCase();
}
return (_bf7==_bf6);
},_isValidOption:function(){
var tgt=dojo.html.firstElement(this.optionsListNode);
var _bf9=false;
while(!_bf9&&tgt){
if(this._isInputEqualToResult(tgt.getAttribute("resultName"))){
_bf9=true;
}else{
tgt=dojo.html.nextElement(tgt);
}
}
return _bf9;
},_checkBlurred:function(){
if(!this._hasFocus&&!this._mouseover_list){
this._hideResultList();
if(!this.textInputNode.value.length){
this.setAllValues("","");
return;
}
var _bfa=this._isValidOption();
if(this.forceValidOption&&!_bfa){
this.setAllValues("","");
return;
}
if(!_bfa){
this.setSelectedValue("");
}
}
},_selectOption:function(evt){
var tgt=null;
if(!evt){
evt={target:this._highlighted_option};
}
if(!dojo.html.isDescendantOf(evt.target,this.optionsListNode)){
if(!this.textInputNode.value.length){
return;
}
tgt=dojo.html.firstElement(this.optionsListNode);
if(!tgt||!this._isInputEqualToResult(tgt.getAttribute("resultName"))){
return;
}
}else{
tgt=evt.target;
}
while((tgt.nodeType!=1)||(!tgt.getAttribute("resultName"))){
tgt=tgt.parentNode;
if(tgt===dojo.body()){
return false;
}
}
this.selectedResult=[tgt.getAttribute("resultName"),tgt.getAttribute("resultValue")];
this.setAllValues(tgt.getAttribute("resultName"),tgt.getAttribute("resultValue"));
if(!evt.noHide){
this._hideResultList();
this._setSelectedRange(this.textInputNode,0,null);
}
this._tryFocus();
},_clearResultList:function(){
if(this.optionsListNode.innerHTML){
this.optionsListNode.innerHTML="";
}
},_hideResultList:function(){
this.popupWidget.close();
},_showResultList:function(){
var _bfd=this.optionsListNode.childNodes;
if(_bfd.length){
var _bfe=Math.min(_bfd.length,this.maxListLength);
with(this.optionsListNode.style){
display="";
if(_bfe==_bfd.length){
height="";
}else{
height=_bfe*dojo.html.getMarginBox(_bfd[0]).height+"px";
}
width=(dojo.html.getMarginBox(this.domNode).width-2)+"px";
}
this.popupWidget.open(this.domNode,this,this.downArrowNode);
}else{
this._hideResultList();
}
},handleArrowClick:function(){
this._handleBlurTimer(true,0);
this._tryFocus();
if(this.popupWidget.isShowingNow){
this._hideResultList();
}else{
this._startSearch("");
}
},_tryFocus:function(){
try{
this.textInputNode.focus();
}
catch(e){
}
},_startSearchFromInput:function(){
this._startSearch(this.textInputNode.value);
},_startSearch:function(key){
this.dataProvider.startSearch(key,dojo.lang.hitch(this,"_openResultList"));
},postCreate:function(){
this.onResize();
dojo.event.connect(this.textInputNode,"onblur",this,"_onBlurInput");
dojo.event.connect(this.textInputNode,"onfocus",this,"_onFocusInput");
if(this.disabled){
this.disable();
}
var s=dojo.widget.html.stabile.getState(this.widgetId);
if(s){
this.setState(s);
}
}});
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_c03){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_c07){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_c07));
},_cacheSetting:function(_c0d,_c0e){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_c0d[x])){
_c0d[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_c0d.useCache)){
_c0d.useCache=_c0e;
}
if(dojo.lang.isUndefined(_c0d.preventCache)){
_c0d.preventCache=!_c0e;
}
if(dojo.lang.isUndefined(_c0d.mimetype)){
_c0d.mimetype="text/html";
}
return _c0d;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_c13){
var st=this[_c13];
var err="";
var _c16=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_c16);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_c13]=[];
if(err.length){
var name=(_c13=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_c1d,obj,func){
if(typeof func=="undefined"){
_c1d.push(obj);
}else{
_c1d.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_c27,_c28){
if(!_c27){
_c27="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_c27](e);
if(e.returnValue){
switch(_c28){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _c2b=[],_c2c=[],tmp=[];
var _c2e=[],_c2f=[],attr=[],_c31=[];
var str="",path="",fix="",_c35="",tag="",_c37="";
if(!url){
url="./";
}
if(s){
var _c38=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_c2e=_c38.exec(s)){
_c2b.push(_c2e[1]);
s=s.substring(0,_c2e.index)+s.substr(_c2e.index+_c2e[0].length);
}
if(this.adjustPaths){
var _c39=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _c3a=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _c3b=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_c39.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_c35="";
while(attr=_c3a.exec(tag)){
path="";
_c37=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_c3b.exec(_c37)){
path=_c37;
}else{
path=(new dojo.uri.Uri(url,_c37).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_c37,url);
break;
default:
path=_c37;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_c35+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_c35+tag;
}
s=str+s;
}
_c38=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_c2e=_c38.exec(s)){
if(_c2e[1]&&_c2e[1].toLowerCase()=="style"){
_c31.push(dojo.html.fixPathsInCssText(_c2e[2],url));
}else{
if(attr=_c2e[3].match(/href=(['"]?)([^'">]*)\1/i)){
_c31.push({path:attr[2]});
}
}
s=s.substring(0,_c2e.index)+s.substr(_c2e.index+_c2e[0].length);
}
var _c38=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _c3c=/src=(['"]?)([^"']*)\1/i;
var _c3d=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _c3e=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _c3f=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_c2e=_c38.exec(s)){
if(this.executeScripts&&_c2e[1]){
if(attr=_c3c.exec(_c2e[1])){
if(_c3d.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_c2c.push({path:attr[2]});
}
}
}
if(_c2e[2]){
var sc=_c2e[2].replace(_c3e,"");
if(!sc){
continue;
}
while(tmp=_c3f.exec(sc)){
_c2f.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_c2c.push(sc);
}
}
s=s.substr(0,_c2e.index)+s.substr(_c2e.index+_c2e[0].length);
}
if(this.extractContent){
_c2e=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_c2e){
s=_c2e[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _c38=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _c41=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_c38.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_c41.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_c31,"titles":_c2b,"requires":_c2f,"scripts":_c2c,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _c47=this;
function asyncParse(){
if(_c47.executeScripts){
_c47._executeScripts(data.scripts);
}
if(_c47.parseContent){
var node=_c47.containerNode||_c47.domNode;
var _c49=new dojo.xml.Parse();
var frag=_c49.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_c47);
}
_c47.onResized();
_c47.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_c4b){
var fcn=dojo.lang.isFunction(_c4b)?_c4b:window[_c4b];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_c4b+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_c4e){
var self=this;
var tmp="",code="";
for(var i=0;i<_c4e.length;i++){
if(_c4e[i].path){
dojo.io.bind(this._cacheSetting({"url":_c4e[i].path,"load":function(type,_c54){
dojo.lang.hitch(self,tmp=";"+_c54);
},"error":function(type,_c56){
_c56.text=type+" downloading remote script";
self._handleDefaults.call(self,_c56,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_c4e[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,dWidth:100,dHeight:100,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _c5c=this;
setTimeout(function(){
_c5c._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_c5e){
if(arguments.length>=3){
_c5e=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_c5e=new dojo.gfx.color.Color(_c5e);
}
this.bg.style.backgroundColor=_c5e.toString();
return this.bgColor=_c5e;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _c60=dojo.html.getViewport();
var h=_c60.height;
var w=_c60.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _c63=dojo.html.getScroll().offset;
this.bg.style.top=_c63.y+"px";
this.bg.style.left=_c63.x+"px";
var _c60=dojo.html.getViewport();
if(_c60.width!=w){
this.bg.style.width=_c60.width+"px";
}
if(_c60.height!=h){
this.bg.style.height=_c60.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _c64=dojo.html.getScroll().offset;
var _c65=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_c64.x+(_c65.width-mb.width)/2;
var y=_c64.y+(_c65.height-mb.height)/2;
with(this.domNode.style){
left=x-(this.dWidth/2)+"px";
top=y-(this.dHeight/2)+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _c6b=dojo.html.getScroll().offset;
this.bg.style.top=_c6b.y+"px";
this.bg.style.left=_c6b.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templateString:"<div id=\"${this.widgetId}\" class=\"dojoDialog\" dojoattachpoint=\"wrapper\">\r\n\t<span dojoattachpoint=\"tabStartOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\"\ttabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabStart\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<div dojoattachpoint=\"containerNode\" style=\"position: relative; z-index: 2;\"></div>\r\n\t<span dojoattachpoint=\"tabEnd\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabEndOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n</div>\r\n",blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.widget.PageContainer");
dojo.widget.defineWidget("dojo.widget.PageContainer",dojo.widget.HtmlWidget,{isContainer:true,doLayout:true,templateString:"<div dojoAttachPoint='containerNode'></div>",selectedChild:"",fillInTemplate:function(args,frag){
var _c71=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_c71);
dojo.widget.PageContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
if(this.children.length){
dojo.lang.forEach(this.children,this._setupChild,this);
var _c74;
if(this.selectedChild){
this.selectChild(this.selectedChild);
}else{
for(var i=0;i<this.children.length;i++){
if(this.children[i].selected){
this.selectChild(this.children[i]);
break;
}
}
if(!this.selectedChildWidget){
this.selectChild(this.children[0]);
}
}
}
},addChild:function(_c76){
dojo.widget.PageContainer.superclass.addChild.apply(this,arguments);
this._setupChild(_c76);
this.onResized();
if(!this.selectedChildWidget){
this.selectChild(_c76);
}
},_setupChild:function(page){
page.hide();
page.domNode.style.position="relative";
dojo.event.topic.publish(this.widgetId+"-addChild",page);
},removeChild:function(page){
dojo.widget.PageContainer.superclass.removeChild.apply(this,arguments);
if(this._beingDestroyed){
return;
}
dojo.event.topic.publish(this.widgetId+"-removeChild",page);
this.onResized();
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this.children.length>0){
this.selectChild(this.children[0],true);
}
}
},selectChild:function(page,_c7a){
page=dojo.widget.byId(page);
this.correspondingPageButton=_c7a;
if(this.selectedChildWidget){
this._hideChild(this.selectedChildWidget);
}
this.selectedChildWidget=page;
this.selectedChild=page.widgetId;
this._showChild(page);
page.isFirstChild=(page==this.children[0]);
page.isLastChild=(page==this.children[this.children.length-1]);
dojo.event.topic.publish(this.widgetId+"-selectChild",page);
},forward:function(){
var _c7b=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_c7b+1]);
},back:function(){
var _c7c=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_c7c-1]);
},onResized:function(){
if(this.doLayout&&this.selectedChildWidget){
with(this.selectedChildWidget.domNode.style){
top=dojo.html.getPixelValue(this.containerNode,"padding-top",true);
left=dojo.html.getPixelValue(this.containerNode,"padding-left",true);
}
var _c7d=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_c7d.width,_c7d.height);
}
},_showChild:function(page){
if(this.doLayout){
var _c7f=dojo.html.getContentBox(this.containerNode);
page.resizeTo(_c7f.width,_c7f.height);
}
page.selected=true;
page.show();
},_hideChild:function(page){
page.selected=false;
page.hide();
},closeChild:function(page){
var _c82=page.onClose(this,page);
if(_c82){
this.removeChild(page);
page.destroy();
}
},destroy:function(){
this._beingDestroyed=true;
dojo.event.topic.destroy(this.widgetId+"-addChild");
dojo.event.topic.destroy(this.widgetId+"-removeChild");
dojo.event.topic.destroy(this.widgetId+"-selectChild");
dojo.widget.PageContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.PageController",dojo.widget.HtmlWidget,{templateString:"<span wairole='tablist' dojoAttachEvent='onKey'></span>",isContainer:true,containerId:"",buttonWidget:"PageButton","class":"dojoPageController",fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.wai.setAttr(this.domNode,"waiRole","role","tablist");
},postCreate:function(){
this.pane2button={};
var _c83=dojo.widget.byId(this.containerId);
if(_c83){
dojo.lang.forEach(_c83.children,this.onAddChild,this);
}
dojo.event.topic.subscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.subscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.subscribe(this.containerId+"-selectChild",this,"onSelectChild");
},destroy:function(){
dojo.event.topic.unsubscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.unsubscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.unsubscribe(this.containerId+"-selectChild",this,"onSelectChild");
dojo.widget.PageController.superclass.destroy.apply(this,arguments);
},onAddChild:function(page){
var _c85=dojo.widget.createWidget(this.buttonWidget,{label:page.label,closeButton:page.closable});
this.addChild(_c85);
this.domNode.appendChild(_c85.domNode);
this.pane2button[page]=_c85;
page.controlButton=_c85;
var _c86=this;
dojo.event.connect(_c85,"onClick",function(){
_c86.onButtonClick(page);
});
dojo.event.connect(_c85,"onCloseButtonClick",function(){
_c86.onCloseButtonClick(page);
});
},onRemoveChild:function(page){
if(this._currentChild==page){
this._currentChild=null;
}
var _c88=this.pane2button[page];
if(_c88){
_c88.destroy();
}
this.pane2button[page]=null;
},onSelectChild:function(page){
if(this._currentChild){
var _c8a=this.pane2button[this._currentChild];
_c8a.clearSelected();
}
var _c8b=this.pane2button[page];
_c8b.setSelected();
this._currentChild=page;
},onButtonClick:function(page){
var _c8d=dojo.widget.byId(this.containerId);
_c8d.selectChild(page,false,this);
},onCloseButtonClick:function(page){
var _c8f=dojo.widget.byId(this.containerId);
_c8f.closeChild(page);
},onKey:function(evt){
if((evt.keyCode==evt.KEY_RIGHT_ARROW)||(evt.keyCode==evt.KEY_LEFT_ARROW)){
var _c91=0;
var next=null;
var _c91=dojo.lang.find(this.children,this.pane2button[this._currentChild]);
if(evt.keyCode==evt.KEY_RIGHT_ARROW){
next=this.children[(_c91+1)%this.children.length];
}else{
next=this.children[(_c91+(this.children.length-1))%this.children.length];
}
dojo.event.browser.stopEvent(evt);
next.onClick();
}
}});
dojo.widget.defineWidget("dojo.widget.PageButton",dojo.widget.HtmlWidget,{templateString:"<span class='item'>"+"<span dojoAttachEvent='onClick' dojoAttachPoint='titleNode' class='selectButton'>${this.label}</span>"+"<span dojoAttachEvent='onClick:onCloseButtonClick' class='closeButton'>[X]</span>"+"</span>",label:"foo",closeButton:false,onClick:function(){
this.focus();
},onCloseButtonMouseOver:function(){
dojo.html.addClass(this.closeButtonNode,"closeHover");
},onCloseButtonMouseOut:function(){
dojo.html.removeClass(this.closeButtonNode,"closeHover");
},onCloseButtonClick:function(evt){
},setSelected:function(){
dojo.html.addClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","0");
},clearSelected:function(){
dojo.html.removeClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","-1");
},focus:function(){
if(this.titleNode.focus){
this.titleNode.focus();
}
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",selected:false,closable:false,onClose:function(){
return true;
}});
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_c94,_c95,_c96){
dojo.html.addClass(_c94,"dojoLayoutContainer");
_c95=dojo.lang.filter(_c95,function(_c97,idx){
_c97.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_c97.layoutAlign);
});
if(_c96&&_c96!="none"){
var rank=function(_c9a){
switch(_c9a.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_c96=="left-right")?2:3;
case "top":
case "bottom":
return (_c96=="left-right")?3:2;
default:
return 4;
}
};
_c95.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_c94,"padding-top",true),left:dojo.html.getPixelValue(_c94,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_c94));
dojo.lang.forEach(_c95,function(_c9e){
var elm=_c9e.domNode;
var pos=_c9e.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(_c9e.onResized){
_c9e.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(_c9e.resizeTo){
_c9e.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(_c9e.resizeTo){
_c9e.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.widget.TabContainer");
dojo.widget.defineWidget("dojo.widget.TabContainer",dojo.widget.PageContainer,{labelPosition:"top",closeButton:"none",templateString:null,templateString:"<div id=\"${this.widgetId}\" class=\"dojoTabContainer\">\r\n\t<div dojoAttachPoint=\"tablistNode\"></div>\r\n\t<div class=\"dojoTabPaneWrapper\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onKey\" waiRole=\"tabpanel\"></div>\r\n</div>\r\n",templateCssString:".dojoTabContainer {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabPaneWrapper {\r\n\tborder : 1px solid #6290d2;\r\n\t_zoom: 1; /* force IE6 layout mode so top border doesnt disappear */\r\n\tdisplay: block;\r\n\tclear: both;\r\n\toverflow: hidden;\r\n}\r\n\r\n.dojoTabLabels-top {\r\n\tposition : relative;\r\n\ttop : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-bottom : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\t/* so the bottom of the tab label will cover up the border of dojoTabPaneWrapper */\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-top .dojoTab {\r\n\tmargin-bottom: -1px;\r\n\t_margin-bottom: 0px; /* IE filter so top border lines up correctly */\r\n}\r\n\r\n.dojoTab {\r\n\tposition : relative;\r\n\tfloat : left;\r\n\tpadding-left : 9px;\r\n\tborder-bottom : 1px solid #6290d2;\r\n\tbackground : url(images/tab_left.gif) no-repeat left top;\r\n\tcursor: pointer;\r\n\twhite-space: nowrap;\r\n\tz-index: 3;\r\n}\r\n\r\n.dojoTab div {\r\n\tdisplay : block;\r\n\tpadding : 4px 15px 4px 6px;\r\n\tbackground : url(images/tab_top_right.gif) no-repeat right top;\r\n\tcolor : #333;\r\n\tfont-size : 90%;\r\n}\r\n\r\n.dojoTab .close {\r\n\tdisplay : inline-block;\r\n\theight : 12px;\r\n\twidth : 12px;\r\n\tpadding : 0 12px 0 0;\r\n\tmargin : 0 -10px 0 10px;\r\n\tcursor : default;\r\n\tfont-size: small;\r\n}\r\n\r\n.dojoTab .closeImage {\r\n\tbackground : url(images/tab_close.gif) no-repeat right top;\r\n}\r\n\r\n.dojoTab .closeHover {\r\n\tbackground-image : url(images/tab_close_h.gif);\r\n}\r\n\r\n.dojoTab.current {\r\n\tpadding-bottom : 1px;\r\n\tborder-bottom : 0;\r\n\tbackground-position : 0 -150px;\r\n}\r\n\r\n.dojoTab.current div {\r\n\tpadding-bottom : 5px;\r\n\tmargin-bottom : -1px;\r\n\tbackground-position : 100% -150px;\r\n}\r\n\r\n/* bottom tabs */\r\n\r\n.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n\tbottom : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-top : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab {\r\n\tborder-top :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_left.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab div {\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current {\r\n\tborder-top : 0;\r\n\tbackground : url(images/tab_bot_left_curr.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current div {\r\n\tpadding-top : 4px;\r\n\tbackground : url(images/tab_bot_right_curr.gif) no-repeat right bottom;\r\n}\r\n\r\n/* right-h tabs */\r\n\r\n.dojoTabLabels-right-h {\r\n\toverflow : visible;\r\n\tmargin-left : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab {\r\n\tpadding-left : 0;\r\n\tborder-left :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n\tfloat : none;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab div {\r\n\tpadding : 4px 15px 4px 15px;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab.current {\r\n\tborder-left :  0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n\r\n/* left-h tabs */\r\n\r\n.dojoTabLabels-left-h {\r\n\toverflow : visible;\r\n\tmargin-right : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab {\r\n\tborder-right :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tfloat : none;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat left top;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab.current {\r\n\tborder-right : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n\tpadding-bottom : 0;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat 0 -150px;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab div {\r\n\tbackground : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/TabContainer.css"),selectedTab:"",postMixInProperties:function(){
if(this.selectedTab){
dojo.deprecated("selectedTab deprecated, use selectedChild instead, will be removed in","0.5");
this.selectedChild=this.selectedTab;
}
if(this.closeButton!="none"){
dojo.deprecated("closeButton deprecated, use closable='true' on each child instead, will be removed in","0.5");
}
dojo.widget.TabContainer.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
this.tablist=dojo.widget.createWidget("TabController",{id:this.widgetId+"_tablist",labelPosition:this.labelPosition,doLayout:this.doLayout,containerId:this.widgetId},this.tablistNode);
dojo.widget.TabContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
dojo.widget.TabContainer.superclass.postCreate.apply(this,arguments);
this.onResized();
},_setupChild:function(tab){
if(this.closeButton=="tab"||this.closeButton=="pane"){
tab.closable=true;
}
dojo.html.addClass(tab.domNode,"dojoTabPane");
dojo.widget.TabContainer.superclass._setupChild.apply(this,arguments);
},onResized:function(){
if(!this.doLayout){
return;
}
var _ca6=this.labelPosition.replace(/-h/,"");
var _ca7=[{domNode:this.tablist.domNode,layoutAlign:_ca6},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_ca7);
if(this.selectedChildWidget){
var _ca8=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_ca8.width,_ca8.height);
}
},selectTab:function(tab,_caa){
dojo.deprecated("use selectChild() rather than selectTab(), selectTab() will be removed in","0.5");
this.selectChild(tab,_caa);
},onKey:function(e){
if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
var _cac=this.correspondingTabButton||this.selectedTabWidget.tabButton;
_cac.focus();
dojo.event.browser.stopEvent(e);
}else{
if(e.keyCode==e.KEY_DELETE&&e.altKey){
if(this.selectedChildWidget.closable){
this.closeChild(this.selectedChildWidget);
dojo.event.browser.stopEvent(e);
}
}
}
},destroy:function(){
this.tablist.destroy();
dojo.widget.TabContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabController",dojo.widget.PageController,{templateString:"<div wairole='tablist' dojoAttachEvent='onKey'></div>",labelPosition:"top",doLayout:true,"class":"",buttonWidget:"TabButton",postMixInProperties:function(){
if(!this["class"]){
this["class"]="dojoTabLabels-"+this.labelPosition+(this.doLayout?"":" dojoTabNoLayout");
}
dojo.widget.TabController.superclass.postMixInProperties.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabButton",dojo.widget.PageButton,{templateString:"<div class='dojoTab' dojoAttachEvent='onClick'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<span dojoAttachPoint='closeButtonNode' class='close closeImage' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onMouseOver:onCloseButtonMouseOver; onMouseOut:onCloseButtonMouseOut; onClick:onCloseButtonClick'></span>"+"</div>"+"</div>",postMixInProperties:function(){
this.closeButtonStyle=this.closeButton?"":"display: none";
dojo.widget.TabButton.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.titleNode);
dojo.widget.TabButton.superclass.fillInTemplate.apply(this,arguments);
},onCloseButtonClick:function(evt){
evt.stopPropagation();
dojo.widget.TabButton.superclass.onCloseButtonClick.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.a11y.TabButton",dojo.widget.TabButton,{imgPath:dojo.uri.moduleUri("dojo.widget","templates/images/tab_close.gif"),templateString:"<div class='dojoTab' dojoAttachEvent='onClick;onKey'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<img class='close' src='${this.imgPath}' alt='[x]' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onClick:onCloseButtonClick'>"+"</div>"+"</div>"});
dojo.provide("dojo.widget.TreeNode");
dojo.widget.defineWidget("dojo.widget.TreeNode",dojo.widget.HtmlWidget,function(){
this.actionsDisabled=[];
},{widgetType:"TreeNode",loadStates:{UNCHECKED:"UNCHECKED",LOADING:"LOADING",LOADED:"LOADED"},actions:{MOVE:"MOVE",REMOVE:"REMOVE",EDIT:"EDIT",ADDCHILD:"ADDCHILD"},isContainer:true,lockLevel:0,templateString:("<div class=\"dojoTreeNode\"> "+"<span treeNode=\"${this.widgetId}\" class=\"dojoTreeNodeLabel\" dojoAttachPoint=\"labelNode\"> "+"\t\t<span dojoAttachPoint=\"titleNode\" dojoAttachEvent=\"onClick: onTitleClick\" class=\"dojoTreeNodeLabelTitle\">${this.title}</span> "+"</span> "+"<span class=\"dojoTreeNodeAfterLabel\" dojoAttachPoint=\"afterLabelNode\">${this.afterLabel}</span> "+"<div dojoAttachPoint=\"containerNode\" style=\"display:none\"></div> "+"</div>").replace(/(>|<)\s+/g,"$1"),childIconSrc:"",childIconFolderSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/closed.gif"),childIconDocumentSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/document.gif"),childIcon:null,isTreeNode:true,objectId:"",afterLabel:"",afterLabelNode:null,expandIcon:null,title:"",object:"",isFolder:false,labelNode:null,titleNode:null,imgs:null,expandLevel:"",tree:null,depth:0,isExpanded:false,state:null,domNodeInitialized:false,isFirstChild:function(){
return this.getParentIndex()==0?true:false;
},isLastChild:function(){
return this.getParentIndex()==this.parent.children.length-1?true:false;
},lock:function(){
return this.tree.lock.apply(this,arguments);
},unlock:function(){
return this.tree.unlock.apply(this,arguments);
},isLocked:function(){
return this.tree.isLocked.apply(this,arguments);
},cleanLock:function(){
return this.tree.cleanLock.apply(this,arguments);
},actionIsDisabled:function(_cae){
var _caf=this;
var _cb0=false;
if(this.tree.strictFolders&&_cae==this.actions.ADDCHILD&&!this.isFolder){
_cb0=true;
}
if(dojo.lang.inArray(_caf.actionsDisabled,_cae)){
_cb0=true;
}
if(this.isLocked()){
_cb0=true;
}
return _cb0;
},getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId,index:this.getParentIndex(),isFolder:this.isFolder};
return info;
},initialize:function(args,frag){
this.state=this.loadStates.UNCHECKED;
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
this.expandLevel=parseInt(this.expandLevel);
},adjustDepth:function(_cb5){
for(var i=0;i<this.children.length;i++){
this.children[i].adjustDepth(_cb5);
}
this.depth+=_cb5;
if(_cb5>0){
for(var i=0;i<_cb5;i++){
var img=this.tree.makeBlankImg();
this.imgs.unshift(img);
dojo.html.insertBefore(this.imgs[0],this.domNode.firstChild);
}
}
if(_cb5<0){
for(var i=0;i<-_cb5;i++){
this.imgs.shift();
dojo.html.removeNode(this.domNode.firstChild);
}
}
},markLoading:function(){
this._markLoadingSavedIcon=this.expandIcon.src;
this.expandIcon.src=this.tree.expandIconSrcLoading;
},unMarkLoading:function(){
if(!this._markLoadingSavedIcon){
return;
}
var im=new Image();
im.src=this.tree.expandIconSrcLoading;
if(this.expandIcon.src==im.src){
this.expandIcon.src=this._markLoadingSavedIcon;
}
this._markLoadingSavedIcon=null;
},setFolder:function(){
dojo.event.connect(this.expandIcon,"onclick",this,"onTreeClick");
this.expandIcon.src=this.isExpanded?this.tree.expandIconSrcMinus:this.tree.expandIconSrcPlus;
this.isFolder=true;
},createDOMNode:function(tree,_cba){
this.tree=tree;
this.depth=_cba;
this.imgs=[];
for(var i=0;i<this.depth+1;i++){
var img=this.tree.makeBlankImg();
this.domNode.insertBefore(img,this.labelNode);
this.imgs.push(img);
}
this.expandIcon=this.imgs[this.imgs.length-1];
this.childIcon=this.tree.makeBlankImg();
this.imgs.push(this.childIcon);
dojo.html.insertBefore(this.childIcon,this.titleNode);
if(this.children.length||this.isFolder){
this.setFolder();
}else{
this.state=this.loadStates.LOADED;
}
dojo.event.connect(this.childIcon,"onclick",this,"onIconClick");
for(var i=0;i<this.children.length;i++){
this.children[i].parent=this;
var node=this.children[i].createDOMNode(this.tree,this.depth+1);
this.containerNode.appendChild(node);
}
if(this.children.length){
this.state=this.loadStates.LOADED;
}
this.updateIcons();
this.domNodeInitialized=true;
dojo.event.topic.publish(this.tree.eventNames.createDOMNode,{source:this});
return this.domNode;
},onTreeClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.treeClick,{source:this,event:e});
},onIconClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.iconClick,{source:this,event:e});
},onTitleClick:function(e){
dojo.event.topic.publish(this.tree.eventNames.titleClick,{source:this,event:e});
},markSelected:function(){
dojo.html.addClass(this.titleNode,"dojoTreeNodeLabelSelected");
},unMarkSelected:function(){
dojo.html.removeClass(this.titleNode,"dojoTreeNodeLabelSelected");
},updateExpandIcon:function(){
if(this.isFolder){
this.expandIcon.src=this.isExpanded?this.tree.expandIconSrcMinus:this.tree.expandIconSrcPlus;
}else{
this.expandIcon.src=this.tree.blankIconSrc;
}
},updateExpandGrid:function(){
if(this.tree.showGrid){
if(this.depth){
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcL:this.tree.gridIconSrcT);
}else{
if(this.isFirstChild()){
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcX:this.tree.gridIconSrcY);
}else{
this.setGridImage(-2,this.isLastChild()?this.tree.gridIconSrcL:this.tree.gridIconSrcT);
}
}
}else{
this.setGridImage(-2,this.tree.blankIconSrc);
}
},updateChildGrid:function(){
if((this.depth||this.tree.showRootGrid)&&this.tree.showGrid){
this.setGridImage(-1,(this.children.length&&this.isExpanded)?this.tree.gridIconSrcP:this.tree.gridIconSrcC);
}else{
if(this.tree.showGrid&&!this.tree.showRootGrid){
this.setGridImage(-1,(this.children.length&&this.isExpanded)?this.tree.gridIconSrcZ:this.tree.blankIconSrc);
}else{
this.setGridImage(-1,this.tree.blankIconSrc);
}
}
},updateParentGrid:function(){
var _cc1=this.parent;
for(var i=0;i<this.depth;i++){
var idx=this.imgs.length-(3+i);
var img=(this.tree.showGrid&&!_cc1.isLastChild())?this.tree.gridIconSrcV:this.tree.blankIconSrc;
this.setGridImage(idx,img);
_cc1=_cc1.parent;
}
},updateExpandGridColumn:function(){
if(!this.tree.showGrid){
return;
}
var _cc5=this;
var icon=this.isLastChild()?this.tree.blankIconSrc:this.tree.gridIconSrcV;
dojo.lang.forEach(_cc5.getDescendants(),function(node){
node.setGridImage(_cc5.depth,icon);
});
this.updateExpandGrid();
},updateIcons:function(){
this.imgs[0].style.display=this.tree.showRootGrid?"inline":"none";
this.buildChildIcon();
this.updateExpandGrid();
this.updateChildGrid();
this.updateParentGrid();
dojo.profile.stop("updateIcons");
},buildChildIcon:function(){
if(this.childIconSrc){
this.childIcon.src=this.childIconSrc;
}
this.childIcon.style.display=this.childIconSrc?"inline":"none";
},setGridImage:function(idx,src){
if(idx<0){
idx=this.imgs.length+idx;
}
this.imgs[idx].style.backgroundImage="url("+src+")";
},updateIconTree:function(){
this.tree.updateIconTree.call(this);
},expand:function(){
if(this.isExpanded){
return;
}
if(this.children.length){
this.showChildren();
}
this.isExpanded=true;
this.updateExpandIcon();
dojo.event.topic.publish(this.tree.eventNames.expand,{source:this});
},collapse:function(){
if(!this.isExpanded){
return;
}
this.hideChildren();
this.isExpanded=false;
this.updateExpandIcon();
dojo.event.topic.publish(this.tree.eventNames.collapse,{source:this});
},hideChildren:function(){
this.tree.toggleObj.hide(this.containerNode,this.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onHide"));
if(dojo.exists(dojo,"dnd.dragManager.dragObjects")&&dojo.dnd.dragManager.dragObjects.length){
dojo.dnd.dragManager.cacheTargetLocations();
}
},showChildren:function(){
this.tree.toggleObj.show(this.containerNode,this.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onShow"));
if(dojo.exists(dojo,"dnd.dragManager.dragObjects")&&dojo.dnd.dragManager.dragObjects.length){
dojo.dnd.dragManager.cacheTargetLocations();
}
},addChild:function(){
return this.tree.addChild.apply(this,arguments);
},doAddChild:function(){
return this.tree.doAddChild.apply(this,arguments);
},edit:function(_cca){
dojo.lang.mixin(this,_cca);
if(_cca.title){
this.titleNode.innerHTML=this.title;
}
if(_cca.afterLabel){
this.afterLabelNode.innerHTML=this.afterLabel;
}
if(_cca.childIconSrc){
this.buildChildIcon();
}
},removeNode:function(){
return this.tree.removeNode.apply(this,arguments);
},doRemoveNode:function(){
return this.tree.doRemoveNode.apply(this,arguments);
},toString:function(){
return "["+this.widgetType+" Tree:"+this.tree+" ID:"+this.widgetId+" Title:"+this.title+"]";
}});
dojo.provide("dojo.dnd.TreeDragAndDrop");
dojo.dnd.TreeDragSource=function(node,_ccc,type,_cce){
this.controller=_ccc;
this.treeNode=_cce;
dojo.dnd.HtmlDragSource.call(this,node,type);
};
dojo.inherits(dojo.dnd.TreeDragSource,dojo.dnd.HtmlDragSource);
dojo.lang.extend(dojo.dnd.TreeDragSource,{onDragStart:function(){
var _ccf=dojo.dnd.HtmlDragSource.prototype.onDragStart.call(this);
_ccf.treeNode=this.treeNode;
_ccf.onDragStart=dojo.lang.hitch(_ccf,function(e){
this.savedSelectedNode=this.treeNode.tree.selector.selectedNode;
if(this.savedSelectedNode){
this.savedSelectedNode.unMarkSelected();
}
var _cd1=dojo.dnd.HtmlDragObject.prototype.onDragStart.apply(this,arguments);
var _cd2=this.dragClone.getElementsByTagName("img");
for(var i=0;i<_cd2.length;i++){
_cd2.item(i).style.backgroundImage="url()";
}
return _cd1;
});
_ccf.onDragEnd=function(e){
if(this.savedSelectedNode){
this.savedSelectedNode.markSelected();
}
return dojo.dnd.HtmlDragObject.prototype.onDragEnd.apply(this,arguments);
};
return _ccf;
},onDragEnd:function(e){
var res=dojo.dnd.HtmlDragSource.prototype.onDragEnd.call(this,e);
return res;
}});
dojo.dnd.TreeDropTarget=function(_cd7,_cd8,type,_cda){
this.treeNode=_cda;
this.controller=_cd8;
dojo.dnd.HtmlDropTarget.apply(this,[_cd7,type]);
};
dojo.inherits(dojo.dnd.TreeDropTarget,dojo.dnd.HtmlDropTarget);
dojo.lang.extend(dojo.dnd.TreeDropTarget,{autoExpandDelay:1500,autoExpandTimer:null,position:null,indicatorStyle:"2px black solid",showIndicator:function(_cdb){
if(this.position==_cdb){
return;
}
this.hideIndicator();
this.position=_cdb;
if(_cdb=="before"){
this.treeNode.labelNode.style.borderTop=this.indicatorStyle;
}else{
if(_cdb=="after"){
this.treeNode.labelNode.style.borderBottom=this.indicatorStyle;
}else{
if(_cdb=="onto"){
this.treeNode.markSelected();
}
}
}
},hideIndicator:function(){
this.treeNode.labelNode.style.borderBottom="";
this.treeNode.labelNode.style.borderTop="";
this.treeNode.unMarkSelected();
this.position=null;
},onDragOver:function(e){
var _cdd=dojo.dnd.HtmlDropTarget.prototype.onDragOver.apply(this,arguments);
if(_cdd&&this.treeNode.isFolder&&!this.treeNode.isExpanded){
this.setAutoExpandTimer();
}
return _cdd;
},accepts:function(_cde){
var _cdf=dojo.dnd.HtmlDropTarget.prototype.accepts.apply(this,arguments);
if(!_cdf){
return false;
}
var _ce0=_cde[0].treeNode;
if(dojo.lang.isUndefined(_ce0)||!_ce0||!_ce0.isTreeNode){
dojo.raise("Source is not TreeNode or not found");
}
if(_ce0===this.treeNode){
return false;
}
return true;
},setAutoExpandTimer:function(){
var _ce1=this;
var _ce2=function(){
if(dojo.dnd.dragManager.currentDropTarget===_ce1){
_ce1.controller.expand(_ce1.treeNode);
}
};
this.autoExpandTimer=dojo.lang.setTimeout(_ce2,_ce1.autoExpandDelay);
},getDNDMode:function(){
return this.treeNode.tree.DNDMode;
},getAcceptPosition:function(e,_ce4){
var _ce5=this.getDNDMode();
if(_ce5&dojo.widget.Tree.prototype.DNDModes.ONTO&&!(!this.treeNode.actionIsDisabled(dojo.widget.TreeNode.prototype.actions.ADDCHILD)&&_ce4.parent!==this.treeNode&&this.controller.canMove(_ce4,this.treeNode))){
_ce5&=~dojo.widget.Tree.prototype.DNDModes.ONTO;
}
var _ce6=this.getPosition(e,_ce5);
if(_ce6=="onto"||(!this.isAdjacentNode(_ce4,_ce6)&&this.controller.canMove(_ce4,this.treeNode.parent))){
return _ce6;
}else{
return false;
}
},onDragOut:function(e){
this.clearAutoExpandTimer();
this.hideIndicator();
},clearAutoExpandTimer:function(){
if(this.autoExpandTimer){
clearTimeout(this.autoExpandTimer);
this.autoExpandTimer=null;
}
},onDragMove:function(e,_ce9){
var _cea=_ce9[0].treeNode;
var _ceb=this.getAcceptPosition(e,_cea);
if(_ceb){
this.showIndicator(_ceb);
}
},isAdjacentNode:function(_cec,_ced){
if(_cec===this.treeNode){
return true;
}
if(_cec.getNextSibling()===this.treeNode&&_ced=="before"){
return true;
}
if(_cec.getPreviousSibling()===this.treeNode&&_ced=="after"){
return true;
}
return false;
},getPosition:function(e,_cef){
var node=dojo.byId(this.treeNode.labelNode);
var _cf1=e.pageY||e.clientY+dojo.body().scrollTop;
var _cf2=dojo.html.getAbsolutePosition(node).y;
var _cf3=dojo.html.getBorderBox(node).height;
var relY=_cf1-_cf2;
var p=relY/_cf3;
var _cf6="";
if(_cef&dojo.widget.Tree.prototype.DNDModes.ONTO&&_cef&dojo.widget.Tree.prototype.DNDModes.BETWEEN){
if(p<=0.3){
_cf6="before";
}else{
if(p<=0.7){
_cf6="onto";
}else{
_cf6="after";
}
}
}else{
if(_cef&dojo.widget.Tree.prototype.DNDModes.BETWEEN){
if(p<=0.5){
_cf6="before";
}else{
_cf6="after";
}
}else{
if(_cef&dojo.widget.Tree.prototype.DNDModes.ONTO){
_cf6="onto";
}
}
}
return _cf6;
},getTargetParentIndex:function(_cf7,_cf8){
var _cf9=_cf8=="before"?this.treeNode.getParentIndex():this.treeNode.getParentIndex()+1;
if(this.treeNode.parent===_cf7.parent&&this.treeNode.getParentIndex()>_cf7.getParentIndex()){
_cf9--;
}
return _cf9;
},onDrop:function(e){
var _cfb=this.position;
this.onDragOut(e);
var _cfc=e.dragObject.treeNode;
if(!dojo.lang.isObject(_cfc)){
dojo.raise("TreeNode not found in dragObject");
}
if(_cfb=="onto"){
return this.controller.move(_cfc,this.treeNode,0);
}else{
var _cfd=this.getTargetParentIndex(_cfc,_cfb);
return this.controller.move(_cfc,this.treeNode.parent,_cfd);
}
}});
dojo.dnd.TreeDNDController=function(_cfe){
this.treeController=_cfe;
this.dragSources={};
this.dropTargets={};
};
dojo.lang.extend(dojo.dnd.TreeDNDController,{listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.subscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.subscribe(tree.eventNames.moveTo,this,"onMoveTo");
dojo.event.topic.subscribe(tree.eventNames.addChild,this,"onAddChild");
dojo.event.topic.subscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.unsubscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.unsubscribe(tree.eventNames.moveTo,this,"onMoveTo");
dojo.event.topic.unsubscribe(tree.eventNames.addChild,this,"onAddChild");
dojo.event.topic.unsubscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},onTreeDestroy:function(_d01){
this.unlistenTree(_d01.source);
},onCreateDOMNode:function(_d02){
this.registerDNDNode(_d02.source);
},onAddChild:function(_d03){
this.registerDNDNode(_d03.child);
},onMoveFrom:function(_d04){
var _d05=this;
dojo.lang.forEach(_d04.child.getDescendants(),function(node){
_d05.unregisterDNDNode(node);
});
},onMoveTo:function(_d07){
var _d08=this;
dojo.lang.forEach(_d07.child.getDescendants(),function(node){
_d08.registerDNDNode(node);
});
},registerDNDNode:function(node){
if(!node.tree.DNDMode){
return;
}
var _d0b=null;
var _d0c=null;
if(!node.actionIsDisabled(node.actions.MOVE)){
var _d0b=new dojo.dnd.TreeDragSource(node.labelNode,this,node.tree.widgetId,node);
this.dragSources[node.widgetId]=_d0b;
}
var _d0c=new dojo.dnd.TreeDropTarget(node.labelNode,this.treeController,node.tree.DNDAcceptTypes,node);
this.dropTargets[node.widgetId]=_d0c;
},unregisterDNDNode:function(node){
if(this.dragSources[node.widgetId]){
dojo.dnd.dragManager.unregisterDragSource(this.dragSources[node.widgetId]);
delete this.dragSources[node.widgetId];
}
if(this.dropTargets[node.widgetId]){
dojo.dnd.dragManager.unregisterDropTarget(this.dropTargets[node.widgetId]);
delete this.dropTargets[node.widgetId];
}
}});
dojo.provide("dojo.widget.TreeBasicController");
dojo.widget.defineWidget("dojo.widget.TreeBasicController",dojo.widget.HtmlWidget,{widgetType:"TreeBasicController",DNDController:"",dieWithTree:false,initialize:function(args,frag){
if(this.DNDController=="create"){
this.DNDController=new dojo.dnd.TreeDNDController(this);
}
},listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.subscribe(tree.eventNames.treeClick,this,"onTreeClick");
dojo.event.topic.subscribe(tree.eventNames.treeCreate,this,"onTreeCreate");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
if(this.DNDController){
this.DNDController.listenTree(tree);
}
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.createDOMNode,this,"onCreateDOMNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeClick,this,"onTreeClick");
dojo.event.topic.unsubscribe(tree.eventNames.treeCreate,this,"onTreeCreate");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
},onTreeDestroy:function(_d12){
var tree=_d12.source;
this.unlistenTree(tree);
if(this.dieWithTree){
this.destroy();
}
},onCreateDOMNode:function(_d14){
var node=_d14.source;
if(node.expandLevel>0){
this.expandToLevel(node,node.expandLevel);
}
},onTreeCreate:function(_d16){
var tree=_d16.source;
var _d18=this;
if(tree.expandLevel){
dojo.lang.forEach(tree.children,function(_d19){
_d18.expandToLevel(_d19,tree.expandLevel-1);
});
}
},expandToLevel:function(node,_d1b){
if(_d1b==0){
return;
}
var _d1c=node.children;
var _d1d=this;
var _d1e=function(node,_d20){
this.node=node;
this.expandLevel=_d20;
this.process=function(){
for(var i=0;i<this.node.children.length;i++){
var _d22=node.children[i];
_d1d.expandToLevel(_d22,this.expandLevel);
}
};
};
var h=new _d1e(node,_d1b-1);
this.expand(node,false,h,h.process);
},onTreeClick:function(_d24){
var node=_d24.source;
if(node.isLocked()){
return false;
}
if(node.isExpanded){
this.collapse(node);
}else{
this.expand(node);
}
},expand:function(node,sync,_d28,_d29){
node.expand();
if(_d29){
_d29.apply(_d28,[node]);
}
},collapse:function(node){
node.collapse();
},canMove:function(_d2b,_d2c){
if(_d2b.actionIsDisabled(_d2b.actions.MOVE)){
return false;
}
if(_d2b.parent!==_d2c&&_d2c.actionIsDisabled(_d2c.actions.ADDCHILD)){
return false;
}
var node=_d2c;
while(node.isTreeNode){
if(node===_d2b){
return false;
}
node=node.parent;
}
return true;
},move:function(_d2e,_d2f,_d30){
if(!this.canMove(_d2e,_d2f)){
return false;
}
var _d31=this.doMove(_d2e,_d2f,_d30);
if(!_d31){
return _d31;
}
if(_d2f.isTreeNode){
this.expand(_d2f);
}
return _d31;
},doMove:function(_d32,_d33,_d34){
_d32.tree.move(_d32,_d33,_d34);
return true;
},canRemoveNode:function(_d35){
if(_d35.actionIsDisabled(_d35.actions.REMOVE)){
return false;
}
return true;
},removeNode:function(node,_d37,_d38){
if(!this.canRemoveNode(node)){
return false;
}
return this.doRemoveNode(node,_d37,_d38);
},doRemoveNode:function(node,_d3a,_d3b){
node.tree.removeNode(node);
if(_d3b){
_d3b.apply(dojo.lang.isUndefined(_d3a)?this:_d3a,[node]);
}
},canCreateChild:function(_d3c,_d3d,data){
if(_d3c.actionIsDisabled(_d3c.actions.ADDCHILD)){
return false;
}
return true;
},createChild:function(_d3f,_d40,data,_d42,_d43){
if(!this.canCreateChild(_d3f,_d40,data)){
return false;
}
return this.doCreateChild.apply(this,arguments);
},doCreateChild:function(_d44,_d45,data,_d47,_d48){
var _d49=data.widgetType?data.widgetType:"TreeNode";
var _d4a=dojo.widget.createWidget(_d49,data);
_d44.addChild(_d4a,_d45);
this.expand(_d44);
if(_d48){
_d48.apply(_d47,[_d4a]);
}
return _d4a;
}});
dojo.provide("dojo.widget.TreeSelector");
dojo.widget.defineWidget("dojo.widget.TreeSelector",dojo.widget.HtmlWidget,function(){
this.eventNames={};
this.listenedTrees=[];
},{widgetType:"TreeSelector",selectedNode:null,dieWithTree:false,eventNamesDefault:{select:"select",destroy:"destroy",deselect:"deselect",dblselect:"dblselect"},initialize:function(){
for(var name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
},destroy:function(){
dojo.event.topic.publish(this.eventNames.destroy,{source:this});
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},listenTree:function(tree){
dojo.event.topic.subscribe(tree.eventNames.titleClick,this,"select");
dojo.event.topic.subscribe(tree.eventNames.iconClick,this,"select");
dojo.event.topic.subscribe(tree.eventNames.collapse,this,"onCollapse");
dojo.event.topic.subscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.subscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.subscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
this.listenedTrees.push(tree);
},unlistenTree:function(tree){
dojo.event.topic.unsubscribe(tree.eventNames.titleClick,this,"select");
dojo.event.topic.unsubscribe(tree.eventNames.iconClick,this,"select");
dojo.event.topic.unsubscribe(tree.eventNames.collapse,this,"onCollapse");
dojo.event.topic.unsubscribe(tree.eventNames.moveFrom,this,"onMoveFrom");
dojo.event.topic.unsubscribe(tree.eventNames.removeNode,this,"onRemoveNode");
dojo.event.topic.unsubscribe(tree.eventNames.treeDestroy,this,"onTreeDestroy");
for(var i=0;i<this.listenedTrees.length;i++){
if(this.listenedTrees[i]===tree){
this.listenedTrees.splice(i,1);
break;
}
}
},onTreeDestroy:function(_d4f){
this.unlistenTree(_d4f.source);
if(this.dieWithTree){
this.destroy();
}
},onCollapse:function(_d50){
if(!this.selectedNode){
return;
}
var node=_d50.source;
var _d52=this.selectedNode.parent;
while(_d52!==node&&_d52.isTreeNode){
_d52=_d52.parent;
}
if(_d52.isTreeNode){
this.deselect();
}
},select:function(_d53){
var node=_d53.source;
var e=_d53.event;
if(this.selectedNode===node){
if(e.ctrlKey||e.shiftKey||e.metaKey){
this.deselect();
return;
}
dojo.event.topic.publish(this.eventNames.dblselect,{node:node});
return;
}
if(this.selectedNode){
this.deselect();
}
this.doSelect(node);
dojo.event.topic.publish(this.eventNames.select,{node:node});
},onMoveFrom:function(_d56){
if(_d56.child!==this.selectedNode){
return;
}
if(!dojo.lang.inArray(this.listenedTrees,_d56.newTree)){
this.deselect();
}
},onRemoveNode:function(_d57){
if(_d57.child!==this.selectedNode){
return;
}
this.deselect();
},doSelect:function(node){
node.markSelected();
this.selectedNode=node;
},deselect:function(){
var node=this.selectedNode;
this.selectedNode=null;
node.unMarkSelected();
dojo.event.topic.publish(this.eventNames.deselect,{node:node});
}});
dojo.provide("dojo.widget.Tree");
dojo.widget.defineWidget("dojo.widget.Tree",dojo.widget.HtmlWidget,function(){
this.eventNames={};
this.tree=this;
this.DNDAcceptTypes=[];
this.actionsDisabled=[];
},{widgetType:"Tree",eventNamesDefault:{createDOMNode:"createDOMNode",treeCreate:"treeCreate",treeDestroy:"treeDestroy",treeClick:"treeClick",iconClick:"iconClick",titleClick:"titleClick",moveFrom:"moveFrom",moveTo:"moveTo",addChild:"addChild",removeNode:"removeNode",expand:"expand",collapse:"collapse"},isContainer:true,DNDMode:"off",lockLevel:0,strictFolders:true,DNDModes:{BETWEEN:1,ONTO:2},DNDAcceptTypes:"",templateCssString:"\r\n.dojoTree {\r\n\tfont: caption;\r\n\tfont-size: 11px;\r\n\tfont-weight: normal;\r\n\toverflow: auto;\r\n}\r\n\r\n\r\n.dojoTreeNodeLabelTitle {\r\n\tpadding-left: 2px;\r\n\tcolor: WindowText;\r\n}\r\n\r\n.dojoTreeNodeLabel {\r\n\tcursor:hand;\r\n\tcursor:pointer;\r\n}\r\n\r\n.dojoTreeNodeLabelTitle:hover {\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.dojoTreeNodeLabelSelected {\r\n\tbackground-color: Highlight;\r\n\tcolor: HighlightText;\r\n}\r\n\r\n.dojoTree div {\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.dojoTree img, .dojoTreeNodeLabel img {\r\n\tvertical-align: middle;\r\n}\r\n\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/Tree.css"),templateString:"<div class=\"dojoTree\"></div>",isExpanded:true,isTree:true,objectId:"",controller:"",selector:"",menu:"",expandLevel:"",blankIconSrc:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_blank.gif"),gridIconSrcT:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_t.gif"),gridIconSrcL:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_l.gif"),gridIconSrcV:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_v.gif"),gridIconSrcP:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_p.gif"),gridIconSrcC:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_c.gif"),gridIconSrcX:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_x.gif"),gridIconSrcY:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_y.gif"),gridIconSrcZ:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_grid_z.gif"),expandIconSrcPlus:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_expand_plus.gif"),expandIconSrcMinus:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_expand_minus.gif"),expandIconSrcLoading:dojo.uri.moduleUri("dojo.widget","templates/images/Tree/treenode_loading.gif"),iconWidth:18,iconHeight:18,showGrid:true,showRootGrid:true,actionIsDisabled:function(_d5a){
var _d5b=this;
return dojo.lang.inArray(_d5b.actionsDisabled,_d5a);
},actions:{ADDCHILD:"ADDCHILD"},getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId};
return info;
},initializeController:function(){
if(this.controller!="off"){
if(this.controller){
this.controller=dojo.widget.byId(this.controller);
}else{
this.controller=dojo.widget.createWidget("TreeBasicController",{DNDController:(this.DNDMode?"create":""),dieWithTree:true});
}
this.controller.listenTree(this);
}else{
this.controller=null;
}
},initializeSelector:function(){
if(this.selector!="off"){
if(this.selector){
this.selector=dojo.widget.byId(this.selector);
}else{
this.selector=dojo.widget.createWidget("TreeSelector",{dieWithTree:true});
}
this.selector.listenTree(this);
}else{
this.selector=null;
}
},initialize:function(args,frag){
var _d5f=this;
for(name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
if(this.DNDMode=="off"){
this.DNDMode=0;
}else{
if(this.DNDMode=="between"){
this.DNDMode=this.DNDModes.ONTO|this.DNDModes.BETWEEN;
}else{
if(this.DNDMode=="onto"){
this.DNDMode=this.DNDModes.ONTO;
}
}
}
this.expandLevel=parseInt(this.expandLevel);
this.initializeSelector();
this.initializeController();
if(this.menu){
this.menu=dojo.widget.byId(this.menu);
this.menu.listenTree(this);
}
this.containerNode=this.domNode;
},postCreate:function(){
this.createDOMNode();
},createDOMNode:function(){
dojo.html.disableSelection(this.domNode);
for(var i=0;i<this.children.length;i++){
this.children[i].parent=this;
var node=this.children[i].createDOMNode(this,0);
this.domNode.appendChild(node);
}
if(!this.showRootGrid){
for(var i=0;i<this.children.length;i++){
this.children[i].expand();
}
}
dojo.event.topic.publish(this.eventNames.treeCreate,{source:this});
},destroy:function(){
dojo.event.topic.publish(this.tree.eventNames.treeDestroy,{source:this});
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},addChild:function(_d63,_d64){
var _d65={child:_d63,index:_d64,parent:this,domNodeInitialized:_d63.domNodeInitialized};
this.doAddChild.apply(this,arguments);
dojo.event.topic.publish(this.tree.eventNames.addChild,_d65);
},doAddChild:function(_d66,_d67){
if(dojo.lang.isUndefined(_d67)){
_d67=this.children.length;
}
if(!_d66.isTreeNode){
dojo.raise("You can only add TreeNode widgets to a "+this.widgetType+" widget!");
return;
}
if(this.isTreeNode){
if(!this.isFolder){
this.setFolder();
}
}
var _d68=this;
dojo.lang.forEach(_d66.getDescendants(),function(elem){
elem.tree=_d68.tree;
});
_d66.parent=this;
if(this.isTreeNode){
this.state=this.loadStates.LOADED;
}
if(_d67<this.children.length){
dojo.html.insertBefore(_d66.domNode,this.children[_d67].domNode);
}else{
this.containerNode.appendChild(_d66.domNode);
if(this.isExpanded&&this.isTreeNode){
this.showChildren();
}
}
this.children.splice(_d67,0,_d66);
if(_d66.domNodeInitialized){
var d=this.isTreeNode?this.depth:-1;
_d66.adjustDepth(d-_d66.depth+1);
_d66.updateIconTree();
}else{
_d66.depth=this.isTreeNode?this.depth+1:0;
_d66.createDOMNode(_d66.tree,_d66.depth);
}
var _d6b=_d66.getPreviousSibling();
if(_d66.isLastChild()&&_d6b){
_d6b.updateExpandGridColumn();
}
},makeBlankImg:function(){
var img=document.createElement("img");
img.style.width=this.iconWidth+"px";
img.style.height=this.iconHeight+"px";
img.src=this.blankIconSrc;
img.style.verticalAlign="middle";
return img;
},updateIconTree:function(){
if(!this.isTree){
this.updateIcons();
}
for(var i=0;i<this.children.length;i++){
this.children[i].updateIconTree();
}
},toString:function(){
return "["+this.widgetType+" ID:"+this.widgetId+"]";
},move:function(_d6e,_d6f,_d70){
var _d71=_d6e.parent;
var _d72=_d6e.tree;
this.doMove.apply(this,arguments);
var _d6f=_d6e.parent;
var _d73=_d6e.tree;
var _d74={oldParent:_d71,oldTree:_d72,newParent:_d6f,newTree:_d73,child:_d6e};
dojo.event.topic.publish(_d72.eventNames.moveFrom,_d74);
dojo.event.topic.publish(_d73.eventNames.moveTo,_d74);
},doMove:function(_d75,_d76,_d77){
_d75.parent.doRemoveNode(_d75);
_d76.doAddChild(_d75,_d77);
},removeNode:function(_d78){
if(!_d78.parent){
return;
}
var _d79=_d78.tree;
var _d7a=_d78.parent;
var _d7b=this.doRemoveNode.apply(this,arguments);
dojo.event.topic.publish(this.tree.eventNames.removeNode,{child:_d7b,tree:_d79,parent:_d7a});
return _d7b;
},doRemoveNode:function(_d7c){
if(!_d7c.parent){
return;
}
var _d7d=_d7c.parent;
var _d7e=_d7d.children;
var _d7f=_d7c.getParentIndex();
if(_d7f<0){
dojo.raise("Couldn't find node "+_d7c+" for removal");
}
_d7e.splice(_d7f,1);
dojo.html.removeNode(_d7c.domNode);
if(_d7d.children.length==0&&!_d7d.isTree){
_d7d.containerNode.style.display="none";
}
if(_d7f==_d7e.length&&_d7f>0){
_d7e[_d7f-1].updateExpandGridColumn();
}
if(_d7d instanceof dojo.widget.Tree&&_d7f==0&&_d7e.length>0){
_d7e[0].updateExpandGrid();
}
_d7c.parent=_d7c.tree=null;
return _d7c;
},markLoading:function(){
},unMarkLoading:function(){
},lock:function(){
!this.lockLevel&&this.markLoading();
this.lockLevel++;
},unlock:function(){
if(!this.lockLevel){
dojo.raise("unlock: not locked");
}
this.lockLevel--;
!this.lockLevel&&this.unMarkLoading();
},isLocked:function(){
var node=this;
while(true){
if(node.lockLevel){
return true;
}
if(node instanceof dojo.widget.Tree){
break;
}
node=node.parent;
}
return false;
},flushLock:function(){
this.lockLevel=0;
this.unMarkLoading();
}});
dojo.provide("dojo.widget.Menu2");
dojo.declare("dojo.widget.MenuBase",null,function(){
this.eventNames={open:""};
},{isContainer:true,isMenu:true,eventNaming:"default",templateCssString:"\r\n.dojoPopupMenu2 {\r\n\tposition: absolute;\r\n\tborder: 1px solid #7298d0;\r\n\tbackground:#85aeec url(images/soriaMenuBg.gif) repeat-x bottom left !important;\r\n\tpadding: 1px;\r\n\tmargin-top: 1px;\r\n\tmargin-bottom: 1px;\r\n}\r\n\r\n.dojoMenuItem2{\r\n\twhite-space: nowrap;\r\n\tfont: menu;\r\n\tmargin: 0;\r\n}\r\n\r\n.dojoMenuItem2Hover {\r\n\tbackground-color: #D2E4FD;\r\n\tcursor:pointer;\r\n\tcursor:hand;\r\n}\r\n\r\n.dojoMenuItem2Icon {\r\n\tposition: relative;\r\n\tbackground-position: center center;\r\n\tbackground-repeat: no-repeat;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tpadding-right: 3px;\r\n}\r\n\r\n.dojoMenuItem2Label {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n}\r\n\r\n/* main label text */\r\n.dojoMenuItem2Label {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.dojoMenuItem2Accel {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n\tpadding-left: 3px;\r\n}\r\n\r\n.dojoMenuItem2Disabled .dojoMenuItem2Label,\r\n.dojoMenuItem2Disabled .dojoMenuItem2Accel {\r\n\tcolor: #607a9e;\r\n}\r\n\r\n.dojoMenuItem2Submenu {\r\n\tposition: relative;\r\n\tbackground-position: center center;\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-image: url(images/submenu_off.gif);\r\n\twidth: 5px;\r\n\theight: 9px;\r\n\tpadding-left: 3px;\r\n}\r\n.dojoMenuItem2Hover .dojoMenuItem2Submenu {\r\n\tbackground-image: url(images/submenu_on.gif);\r\n}\r\n\r\n.dojoMenuItem2Disabled .dojoMenuItem2Submenu {\r\n\tbackground-image: url(images/submenu_disabled.gif);\r\n}\r\n\r\n.dojoMenuSeparator2 {\r\n\tfont-size: 1px;\r\n\tmargin: 0;\r\n}\r\n\r\n.dojoMenuSeparator2Top {\r\n\theight: 50%;\r\n\tborder-bottom: 1px solid #7a98c4;\r\n\tmargin: 0px 2px;\r\n\tfont-size: 1px;\r\n}\r\n\r\n.dojoMenuSeparator2Bottom {\r\n\theight: 50%;\r\n\tborder-top: 1px solid #c9deff;\r\n\tmargin: 0px 2px;\r\n\tfont-size: 1px;\r\n}\r\n\r\n.dojoMenuBar2 {\r\n\tbackground:#85aeec url(images/soriaBarBg.gif) repeat-x top left;\r\n\t/*border-bottom:1px solid #6b9fec;*/\r\n\tpadding: 1px;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2 {\r\n\twhite-space: nowrap;\r\n\tfont: menu;\r\n\tmargin: 0;\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n\tz-index: 1;\r\n\tpadding: 3px 8px;\r\n\tdisplay: inline;/* needed in khtml to display correctly */\r\n\tdisplay: -moz-inline-box;/* needed in firefox */\r\n\tcursor:pointer;\r\n\tcursor:hand;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2Hover {\r\n\tbackground-color:#d2e4fd;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2Disabled span {\r\n\tcolor: #4f6582;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/Menu2.css"),submenuDelay:500,initialize:function(args,frag){
if(this.eventNaming=="default"){
for(var _d83 in this.eventNames){
this.eventNames[_d83]=this.widgetId+"/"+_d83;
}
}
},_moveToNext:function(evt){
this._highlightOption(1);
return true;
},_moveToPrevious:function(evt){
this._highlightOption(-1);
return true;
},_moveToParentMenu:function(evt){
if(this._highlighted_option&&this.parentMenu){
if(evt._menu2UpKeyProcessed){
return true;
}else{
this._highlighted_option.onUnhover();
this.closeSubmenu();
evt._menu2UpKeyProcessed=true;
}
}
return false;
},_moveToChildMenu:function(evt){
if(this._highlighted_option&&this._highlighted_option.submenuId){
this._highlighted_option._onClick(true);
return true;
}
return false;
},_selectCurrentItem:function(evt){
if(this._highlighted_option){
this._highlighted_option._onClick();
return true;
}
return false;
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToPrevious(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToParentMenu(evt);
break;
case " ":
case evt.KEY_ENTER:
if(rval=this._selectCurrentItem(evt)){
break;
}
case evt.KEY_ESCAPE:
case evt.KEY_TAB:
this.close(true);
rval=true;
break;
}
return rval;
},_findValidItem:function(dir,_d8c){
if(_d8c){
_d8c=dir>0?_d8c.getNextSibling():_d8c.getPreviousSibling();
}
for(var i=0;i<this.children.length;++i){
if(!_d8c){
_d8c=dir>0?this.children[0]:this.children[this.children.length-1];
}
if(_d8c.onHover&&_d8c.isShowing()){
return _d8c;
}
_d8c=dir>0?_d8c.getNextSibling():_d8c.getPreviousSibling();
}
},_highlightOption:function(dir){
var item;
if((!this._highlighted_option)){
item=this._findValidItem(dir);
}else{
item=this._findValidItem(dir,this._highlighted_option);
}
if(item){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
item.onHover();
dojo.html.scrollIntoView(item.domNode);
try{
var node=dojo.html.getElementsByClass("dojoMenuItem2Label",item.domNode)[0];
node.focus();
}
catch(e){
}
}
},onItemClick:function(item){
},closeSubmenu:function(_d92){
if(this.currentSubmenu==null){
return;
}
this.currentSubmenu.close(_d92);
this.currentSubmenu=null;
this.currentSubmenuTrigger.is_open=false;
this.currentSubmenuTrigger._closedSubmenu(_d92);
this.currentSubmenuTrigger=null;
}});
dojo.widget.defineWidget("dojo.widget.PopupMenu2",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase,dojo.widget.MenuBase],function(){
this.targetNodeIds=[];
},{templateString:"<table class=\"dojoPopupMenu2\" border=0 cellspacing=0 cellpadding=0 style=\"display: none; position: absolute;\">"+"<tbody dojoAttachPoint=\"containerNode\"></tbody>"+"</table>",submenuOverlap:5,contextMenuForWindow:false,parentMenu:null,postCreate:function(){
if(this.contextMenuForWindow){
var doc=dojo.body();
this.bindDomNode(doc);
}else{
if(this.targetNodeIds.length>0){
dojo.lang.forEach(this.targetNodeIds,this.bindDomNode,this);
}
}
this._subscribeSubitemsOnOpen();
},_subscribeSubitemsOnOpen:function(){
var _d94=this.getChildrenOfType(dojo.widget.MenuItem2);
for(var i=0;i<_d94.length;i++){
dojo.event.topic.subscribe(this.eventNames.open,_d94[i],"menuOpen");
}
},getTopOpenEvent:function(){
var menu=this;
while(menu.parentMenu){
menu=menu.parentMenu;
}
return menu.openEvent;
},bindDomNode:function(node){
node=dojo.byId(node);
var win=dojo.html.getElementWindow(node);
if(dojo.html.isTag(node,"iframe")=="iframe"){
win=dojo.html.iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body);
}
dojo.widget.Menu2.OperaAndKonqFixer.fixNode(node);
dojo.event.kwConnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
if(dojo.render.html.moz&&win.document.designMode.toLowerCase()=="on"){
dojo.event.browser.addListener(node,"contextmenu",dojo.lang.hitch(this,"onOpen"));
}
dojo.widget.PopupManager.registerWin(win);
},unBindDomNode:function(_d99){
var node=dojo.byId(_d99);
dojo.event.kwDisconnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
dojo.widget.Menu2.OperaAndKonqFixer.cleanNode(node);
},_openAsSubmenu:function(_d9b,_d9c,_d9d){
if(this.isShowingNow){
return;
}
this.parentMenu=_d9b;
this.open(_d9c,_d9b,_d9c,_d9d);
},close:function(_d9e){
if(this.animationInProgress){
dojo.widget.PopupContainerBase.prototype.close.call(this,_d9e);
return;
}
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
dojo.widget.PopupContainerBase.prototype.close.call(this,_d9e);
this.parentMenu=null;
},closeAll:function(_d9f){
if(this.parentMenu){
this.parentMenu.closeAll(_d9f);
}else{
this.close(_d9f);
}
},_openSubmenu:function(_da0,_da1){
_da0._openAsSubmenu(this,_da1.arrow,{"TR":"TL","TL":"TR"});
this.currentSubmenu=_da0;
this.currentSubmenuTrigger=_da1;
this.currentSubmenuTrigger.is_open=true;
},focus:function(){
if(this.currentSubmenuTrigger){
if(this.currentSubmenuTrigger.caption){
try{
this.currentSubmenuTrigger.caption.focus();
}
catch(e){
}
}else{
try{
this.currentSubmenuTrigger.domNode.focus();
}
catch(e){
}
}
}
},onOpen:function(e){
this.openEvent=e;
if(e["target"]){
this.openedForWindow=dojo.html.getElementWindow(e.target);
}else{
this.openedForWindow=null;
}
var x=e.pageX,y=e.pageY;
var win=dojo.html.getElementWindow(e.target);
var _da6=win._frameElement||win.frameElement;
if(_da6){
var cood=dojo.html.abs(_da6,true);
x+=cood.x-dojo.withGlobal(win,dojo.html.getScroll).left;
y+=cood.y-dojo.withGlobal(win,dojo.html.getScroll).top;
}
this.open(x,y,null,[x,y]);
dojo.event.browser.stopEvent(e);
}});
dojo.widget.defineWidget("dojo.widget.MenuItem2",dojo.widget.HtmlWidget,function(){
this.eventNames={engage:""};
},{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"<td><div class=\"${this.iconClass}\" style=\"${this.iconStyle}\"></div></td>"+"<td tabIndex=\"-1\" class=\"dojoMenuItem2Label\" dojoAttachPoint=\"caption\">${this.caption}</td>"+"<td class=\"dojoMenuItem2Accel\">${this.accelKey}</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\" dojoAttachPoint=\"arrow\"></div></td>"+"</tr>",is_hovering:false,hover_timer:null,is_open:false,topPosition:0,caption:"Untitled",accelKey:"",iconSrc:"",disabledClass:"dojoMenuItem2Disabled",iconClass:"dojoMenuItem2Icon",submenuId:"",eventNaming:"default",highlightClass:"dojoMenuItem2Hover",postMixInProperties:function(){
this.iconStyle="";
if(this.iconSrc){
if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.render.html.ie55||dojo.render.html.ie60)){
this.iconStyle="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='image')";
}else{
this.iconStyle="background-image: url("+this.iconSrc+")";
}
}
this.arrowDisplay=this.submenuId?"block":"none";
dojo.widget.MenuItem2.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.domNode);
if(this.disabled){
this.setDisabled(true);
}
if(this.eventNaming=="default"){
for(var _da8 in this.eventNames){
this.eventNames[_da8]=this.widgetId+"/"+_da8;
}
}
},onHover:function(){
this.onUnhover();
if(this.is_hovering){
return;
}
if(this.is_open){
return;
}
if(this.parent._highlighted_option){
this.parent._highlighted_option.onUnhover();
}
this.parent.closeSubmenu();
this.parent._highlighted_option=this;
dojo.widget.PopupManager.setFocusedMenu(this.parent);
this._highlightItem();
if(this.is_hovering){
this._stopSubmenuTimer();
}
this.is_hovering=true;
this._startSubmenuTimer();
},onUnhover:function(){
if(!this.is_open){
this._unhighlightItem();
}
this.is_hovering=false;
this.parent._highlighted_option=null;
if(this.parent.parentMenu){
dojo.widget.PopupManager.setFocusedMenu(this.parent.parentMenu);
}
this._stopSubmenuTimer();
},_onClick:function(_da9){
var _daa=false;
if(this.disabled){
return false;
}
if(this.submenuId){
if(!this.is_open){
this._stopSubmenuTimer();
this._openSubmenu();
}
_daa=true;
}else{
this.onUnhover();
this.parent.closeAll(true);
}
this.onClick();
dojo.event.topic.publish(this.eventNames.engage,this);
if(_daa&&_da9){
dojo.widget.getWidgetById(this.submenuId)._highlightOption(1);
}
return;
},onClick:function(){
this.parent.onItemClick(this);
},_highlightItem:function(){
dojo.html.addClass(this.domNode,this.highlightClass);
},_unhighlightItem:function(){
dojo.html.removeClass(this.domNode,this.highlightClass);
},_startSubmenuTimer:function(){
this._stopSubmenuTimer();
if(this.disabled){
return;
}
var self=this;
var _dac=function(){
return function(){
self._openSubmenu();
};
}();
this.hover_timer=dojo.lang.setTimeout(_dac,this.parent.submenuDelay);
},_stopSubmenuTimer:function(){
if(this.hover_timer){
dojo.lang.clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_openSubmenu:function(){
if(this.disabled){
return;
}
this.parent.closeSubmenu();
var _dad=dojo.widget.getWidgetById(this.submenuId);
if(_dad){
this.parent._openSubmenu(_dad,this);
}
},_closedSubmenu:function(){
this.onUnhover();
},setDisabled:function(_dae){
this.disabled=_dae;
if(this.disabled){
dojo.html.addClass(this.domNode,this.disabledClass);
}else{
dojo.html.removeClass(this.domNode,this.disabledClass);
}
},enable:function(){
this.setDisabled(false);
},disable:function(){
this.setDisabled(true);
},menuOpen:function(_daf){
}});
dojo.widget.defineWidget("dojo.widget.MenuSeparator2",dojo.widget.HtmlWidget,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=4>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>",postCreate:function(){
dojo.html.disableSelection(this.domNode);
}});
dojo.widget.defineWidget("dojo.widget.MenuBar2",[dojo.widget.HtmlWidget,dojo.widget.MenuBase],{menuOverlap:2,templateString:"<div class=\"dojoMenuBar2\" dojoAttachPoint=\"containerNode\" tabIndex=\"0\"></div>",close:function(_db0){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
this.closeSubmenu(_db0);
},closeAll:function(_db1){
this.close(_db1);
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToParentMenu(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToPrevious(evt);
break;
default:
rval=dojo.widget.MenuBar2.superclass.processKey.apply(this,arguments);
break;
}
return rval;
},postCreate:function(){
dojo.widget.MenuBar2.superclass.postCreate.apply(this,arguments);
this.isShowingNow=true;
},_openSubmenu:function(_db4,_db5){
_db4._openAsSubmenu(this,_db5.domNode,{"BL":"TL","TL":"BL"});
this.currentSubmenu=_db4;
this.currentSubmenuTrigger=_db5;
this.currentSubmenuTrigger.is_open=true;
}});
dojo.widget.defineWidget("dojo.widget.MenuBarItem2",dojo.widget.MenuItem2,{templateString:"<span class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">${this.caption}</span>"});
dojo.widget.Menu2.OperaAndKonqFixer=new function(){
var _db6=true;
var _db7=false;
if(!dojo.lang.isFunction(dojo.doc().oncontextmenu)){
dojo.doc().oncontextmenu=function(){
_db6=false;
_db7=true;
};
}
if(dojo.doc().createEvent){
try{
var e=dojo.doc().createEvent("MouseEvents");
e.initMouseEvent("contextmenu",1,1,dojo.global(),1,0,0,0,0,0,0,0,0,0,null);
dojo.doc().dispatchEvent(e);
}
catch(e){
}
}else{
_db6=false;
}
if(_db7){
delete dojo.doc().oncontextmenu;
}
this.fixNode=function(node){
if(_db6){
if(!dojo.lang.isFunction(node.oncontextmenu)){
node.oncontextmenu=function(e){
};
}
if(dojo.render.html.opera){
node._menufixer_opera=function(e){
if(e.ctrlKey){
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onclick",node,"_menufixer_opera");
}else{
node._menufixer_konq=function(e){
if(e.button==2){
e.preventDefault();
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onmousedown",node,"_menufixer_konq");
}
}
};
this.cleanNode=function(node){
if(_db6){
if(node._menufixer_opera){
dojo.event.disconnect(node,"onclick",node,"_menufixer_opera");
delete node._menufixer_opera;
}else{
if(node._menufixer_konq){
dojo.event.disconnect(node,"onmousedown",node,"_menufixer_konq");
delete node._menufixer_konq;
}
}
if(node.oncontextmenu){
delete node.oncontextmenu;
}
}
};
};
dojo.provide("dojo.i18n.common");
dojo.i18n.getLocalization=function(_dbe,_dbf,_dc0){
dojo.hostenv.preloadLocalizations();
_dc0=dojo.hostenv.normalizeLocale(_dc0);
var _dc1=_dc0.split("-");
var _dc2=[_dbe,"nls",_dbf].join(".");
var _dc3=dojo.hostenv.findModule(_dc2,true);
var _dc4;
for(var i=_dc1.length;i>0;i--){
var loc=_dc1.slice(0,i).join("_");
if(_dc3[loc]){
_dc4=_dc3[loc];
break;
}
}
if(!_dc4){
_dc4=_dc3.ROOT;
}
if(_dc4){
var _dc7=function(){
};
_dc7.prototype=_dc4;
return new _dc7();
}
dojo.raise("Bundle not found: "+_dbf+" in "+_dbe+" , locale="+_dc0);
};
dojo.i18n.isLTR=function(_dc8){
var lang=dojo.hostenv.normalizeLocale(_dc8).split("-")[0];
var RTL={ar:true,fa:true,he:true,ur:true,yi:true};
return !RTL[lang];
};
dojo.provide("wc.render.Context");
wc.render.contexts={};
wc.render.getContextById=function(id){
return wc.render.contexts[id];
};
wc.render.updateContext=function(id,_dcd){
wc.render.getContextById(id).update(_dcd);
};
wc.render.declareContext=function(id,_dcf,_dd0){
var _dd1=new wc.render.Context(id,_dcf,_dd0);
this.contexts[id]=_dd1;
return _dd1;
};
dojo.declare("wc.render.Context",null,{initializer:function(id,_dd3,_dd4){
this.id=id;
this.properties=_dd3?_dd3:{};
this.url=_dd4;
this.contextChangedEventName=id+"/RenderContextChanged";
},id:undefined,properties:undefined,url:undefined,contextChangedEventName:undefined,update:function(_dd5){
if(!this.properties){
this.properties={};
}
if(this.url){
var _dd6={};
for(var name in _dd5){
var _dd8=_dd5[name];
if(dojo.lang.isUndefined(_dd8)){
if(dojo.lang.isUndefined(_dd6.clear)){
_dd6.clear=[name];
}else{
_dd6.clear.push(name);
}
}else{
_dd6["set_"+name]=_dd8;
}
}
dojo.io.bind({url:this.url,mimetype:"text/json",content:_dd6,properties:this.properties,successEventName:this.contextChangedEventName,load:function(type,data,evt,_ddc){
if(dojo.lang.isArray(data.renderContextChanges)){
for(var i=0;i<data.renderContextChanges.length;i++){
var name=data.renderContextChanges[i];
_ddc.properties[name]=data[name];
}
}
dojo.event.topic.publish(this.successEventName,data);
},error:function(type,_de0){
var _de1=dojo.i18n.getLocalization("wc","common");
alert(_de1.communicationError);
}});
}else{
var data={renderContextChanges:[]};
for(var name in _dd5){
var _dd8=_dd5[name];
if(_dd8!=this.properties[name]){
data.renderContextChanges.push(name);
if(dojo.lang.isUndefined(_dd8)){
delete this.properties[name];
}else{
this.properties[name]=_dd8;
data[name]=_dd8;
}
}
}
dojo.event.topic.publish(this.contextChangedEventName,data);
}
}});
dojo.provide("wc.render.RefreshController");
wc.render.refreshControllers={};
wc.render.getRefreshControllerById=function(id){
return wc.render.refreshControllers[id];
};
wc.render.declareRefreshController=function(_de4){
var _de5=new wc.render.RefreshController(_de4);
this.refreshControllers[_de4.id]=_de5;
return _de5;
};
dojo.declare("wc.render.RefreshController",null,{initializer:function(_de6){
dojo.lang.mixin(this,_de6);
this.syncRCProperties();
if(dojo.lang.isFunction(this.renderContextChangedHandler)){
dojo.event.topic.subscribe(this.renderContext.contextChangedEventName,this,"renderContextChanged");
}
if(dojo.lang.isFunction(this.modelChangedHandler)){
dojo.event.topic.subscribe("modelChanged",this,"modelChanged");
}
this.widgets={};
},id:undefined,renderContext:undefined,url:undefined,mimetype:"text/html",renderContextChangedHandler:undefined,modelChangedHandler:undefined,postRefreshHandler:undefined,currentRCProperties:undefined,widgets:undefined,formId:undefined,addWidget:function(_de7){
if(this.widgets[_de7.widgetId]){
dojo.debug("RefreshController.addWidget: duplicate widget ID "+_de7.widgetId);
}
this.widgets[_de7.widgetId]=_de7;
},removeWidget:function(_de8){
if(typeof this.widgets=="undefined"){
dojo.debug("this.widgets in RefreshController#removeWidget(widget) is not defined yet. No deletion is needed");
return;
}
delete this.widgets[_de8.widgetId];
},syncRCProperties:function(){
if(this.renderContext){
var _de9={};
var rc=this.renderContext.properties;
for(var prop in rc){
_de9[prop]=rc[prop];
}
this.currentRCProperties=_de9;
}
},renderContextChanged:function(_dec){
for(var _ded in this.widgets){
this.renderContextChangedHandler(_dec,this.widgets[_ded]);
}
this.syncRCProperties();
},modelChanged:function(_dee){
for(var _def in this.widgets){
this.modelChangedHandler(_dee,this.widgets[_def]);
}
},refreshHandler:function(_df0,data){
_df0.setInnerHTML(data);
},refresh:function(_df2,_df3){
var _df4=null;
if(this.formId){
_df4=document.getElementById(this.formId);
}
dojo.io.bind({url:this.url,mimetype:this.mimetype,formNode:_df4,content:_df3,load:function(type,data,evt){
var _df8=_df2.controller;
_df8.refreshHandler(_df2,data);
if(_df8.postRefreshHandler!=null){
_df8.postRefreshHandler(_df2);
}
},error:function(type,_dfa){
var _dfb=dojo.i18n.getLocalization("wc","common");
alert(_dfb.communicationError);
}});
},testForChangedRC:function(_dfc){
var _dfd=false;
for(var i=0;i<_dfc.length;i++){
var prop=_dfc[i];
if(this.currentRCProperties[prop]!=this.renderContext.properties[prop]){
_dfd=true;
break;
}
}
return _dfd;
}});
dojo.provide("wc.render.common");
dojo.kwCompoundRequire({common:["wc.render.common"]});
dojo.provide("wc.render.*");
dojo.provide("wc.service.common");
wc.service.services={};
wc.service.getServiceById=function(id){
return wc.service.services[id];
};
wc.service.declare=function(_e01){
var _e02=new wc.service.Service(_e01);
this.register(_e02);
return _e02;
};
wc.service.register=function(_e03){
this.services[_e03.id]=_e03;
};
wc.service.invoke=function(_e04,_e05){
var _e06=this.getServiceById(_e04);
if(_e06){
_e06.invoke(_e05);
}else{
dojo.debug("Attempt to invoke an unregistered service: "+_e04);
}
};
dojo.declare("wc.service.Service",null,{initializer:function(_e07){
dojo.lang.mixin(this,_e07);
},id:undefined,actionId:undefined,url:undefined,formId:undefined,validateParameters:function(_e08){
return true;
},validateForm:function(_e09){
return true;
},successTest:function(_e0a){
return !_e0a.errorMessage&&!_e0a.errorMessageKey;
},successHandler:function(_e0b){
},failureHandler:function(_e0c){
var _e0d=_e0c.errorMessage;
if(_e0d){
alert(_e0d);
}else{
_e0d=_e0c.errorMessageKey;
if(_e0d){
alert(_e0d);
}else{
alert("Service request error.");
}
}
},invoke:function(_e0e){
var _e0f=true;
var _e10=null;
if(this.formId){
_e10=document.getElementById(this.formId);
}
if(_e10){
_e0f=this.validateForm(_e10);
}
if(_e0f){
_e0f=this.validateParameters(_e0e);
}
if(_e0f){
dojo.io.bind({url:this.url,mimetype:"text/json",formNode:_e10,content:_e0e,service:this,load:function(type,_e12,evt,_e14){
var _e15=_e14.service;
_e12.serviceId=_e15.id;
_e12.actionId=_e15.actionId;
dojo.debug("Service response:");
for(var prop in _e12){
dojo.debug("  "+prop+"="+_e12[prop]);
}
if(_e15.successTest(_e12)){
_e15.successHandler(_e12);
dojo.event.topic.publish("modelChanged",_e12);
if(_e15.actionId){
dojo.event.topic.publish("modelChanged/"+_e15.actionId,_e12);
}
}else{
_e15.failureHandler(_e12);
}
},error:function(type,_e18){
var _e19=dojo.i18n.getLocalization("wc","common");
alert(_e19.communicationError);
}});
}
}});
dojo.kwCompoundRequire({common:["wc.service.common"]});
dojo.provide("wc.service.*");
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("wc.widget.*");
dojo.widget.manager.registerWidgetPackage("wc.widget");
dojo.provide("dojo.widget.Tooltip");
dojo.widget.defineWidget("dojo.widget.Tooltip",[dojo.widget.ContentPane,dojo.widget.PopupContainerBase],{caption:"",showDelay:500,hideDelay:100,connectId:"",templateCssString:".dojoTooltip {\r\n\tborder: solid black 1px;\r\n\tbackground: beige;\r\n\tcolor: black;\r\n\tposition: absolute;\r\n\tfont-size: small;\r\n\tpadding: 2px 2px 2px 2px;\r\n\tz-index: 10;\r\n\tdisplay: block;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/TooltipTemplate.css"),fillInTemplate:function(args,frag){
if(this.caption!=""){
this.domNode.appendChild(document.createTextNode(this.caption));
}
this._connectNode=dojo.byId(this.connectId);
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,args,frag);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"dojoTooltip");
var _e1c=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_e1c);
this.applyPopupBasicStyle();
},postCreate:function(args,frag){
dojo.event.connect(this._connectNode,"onmouseover",this,"_onMouseOver");
dojo.widget.Tooltip.superclass.postCreate.call(this,args,frag);
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this._onHover(e);
},_onMouseMove:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(dojo.html.overElement(this._connectNode,e)||dojo.html.overElement(this.domNode,e)){
this._onHover(e);
}else{
this._onUnHover(e);
}
},_onHover:function(e){
if(this._hover){
return;
}
this._hover=true;
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
if(!this.isShowingNow&&!this._showTimer){
this._showTimer=setTimeout(dojo.lang.hitch(this,"open"),this.showDelay);
}
},_onUnHover:function(e){
if(!this._hover){
return;
}
this._hover=false;
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this.isShowingNow&&!this._hideTimer){
this._hideTimer=setTimeout(dojo.lang.hitch(this,"close"),this.hideDelay);
}
if(!this.isShowingNow){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
}
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,15]);
},close:function(){
if(this.isShowingNow){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
dojo.widget.PopupContainerBase.prototype.close.call(this);
}
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,15],"TL,TR,BL,BR");
},_loadedContent:function(){
if(this.isShowingNow){
this._position();
}
},checkSize:function(){
},uninitialize:function(){
this.close();
dojo.event.disconnect(this._connectNode,"onmouseover",this,"_onMouseOver");
}});
dojo.provide("wc.widget.ProductQuickView");
dojo.provide("wc.widget.BaseContent");
dojo.provide("wc.widget.ToolTipContent");
dojo.widget.defineWidget("wc.widget.ProductQuickView",dojo.widget.HtmlWidget,{templateString:"<div dojoAttachPoint=\"containerNode\">\r\n<table dojoAttachPoint=\"DAPProductQuickViewTable\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"pqv_table\">\r\n<tr> \r\n\t<td class=\"pqv_img_view\">\r\n\t\t<div dojoAttachPoint = \"DAPCatalogEntryContainer\" style=\"display:block;\">\r\n\t\t\t<a dojoAttachPoint = \"DAPCatalogEntryThumbnailImageLink\"  >\r\n\t\t\t\t<span>\r\n\t\t\t\t\t<img id = \"DAPCatalogEntryThumbnailImageConnectId\" dojoAttachPoint = \"DAPCatalogEntryThumbnailImage\"  alt=\"\" border=\"0\"/>\r\n\t\t\t\t</span>\r\n\t\t\t</a><div>\r\n\t\t\t<a dojoAttachPoint = \"DAPCatalogEntryNameLink\" >\r\n\t\t\t\t<span dojoAttachPoint = \"DAPCatalogEntryName\" class=\"pqv_productName\">\r\n\t\t\t\t</span>\r\n\t\t\t</a></div>\r\n\t\t\t<br/>\r\n\t\t\t<span dojoAttachPoint = \"DAPSKU\" class=\"pqv_text\"></span>\r\n\t\t\t<span dojoAttachPoint = \"DAPShortDescription\" class=\"pqv_text\"></span>\r\n\t\t\t<a dojoAttachPoint = \"DAPPriceImageLink\" ><img dojoAttachPoint = \"DAPPriceImage\"  alt='' width=\"1\" height=\"1\" border=\"0\" />\r\n\t\t\t</a>\r\n\t\t\t<span dojoAttachPoint = \"DAPPriceRange\" class=\"pqv_price\"></span>\r\n\t\t\t<span class=\"pqv_img_border\">\r\n\t\t\t\t\t<img dojoAttachPoint = \"DAPDiscountImage\"  border = \"0\"/>\r\n\t\t\t\t\t<a  dojoAttachPoint = \"DAPDiscountLink\"  class = \"pqv_discount\">\r\n\t\t\t\t\t<span dojoAttachPoint = \"DAPDiscountDetails\" class = \"pqv_discount\"></span>\r\n\t\t\t\t\t</a>\r\n\t\t\t</span>\r\n\t\t\t<span dojoAttachPoint = \"DAPAdditionalText\"></span>\r\n\t\t</div>\r\n\t</td>\r\n</tr>\r\n</table>\r\n</div>\r\n",templateCssString:"/**\r\n *-------------------------------------------------------------------\r\n * Licensed Materials - Property of IBM\r\n *\r\n * WebSphere Commerce\r\n *\r\n * (c) Copyright IBM Corp. 2007\r\n *\r\n * US Government Users Restricted Rights - Use, duplication or\r\n * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\r\n *\r\n *-------------------------------------------------------------------\r\n */\r\n \r\n\t.pqv_table {\r\n\t\tfont-family: Verdana, Arial,sans-serif; \r\n\t\tfont-size: 11px; \r\n\t\tcolor:#444444; \r\n\t\twidth: 100%;\r\n\t}\r\n\t.pqv_img_view {\r\n\t\ttext-align : center; \r\n\t\twidth:120px;\r\n\t\tdisplay:block;\r\n\t\tpadding-top:12px;\r\n\t\tpadding-bottom:10px;\r\n\t\tvertical-align:top;\r\n\t}\r\n\r\n\t.pqv_price {\r\n\t\tfont-size:  12px; \r\n\t\tcolor: #444444; \r\n\t\tfont-family: arial, helvetica, sans-serif; \r\n\t\ttext-align: right;\r\n\t}\r\n\r\n\t.pqv_discountPrice{\r\n\t\tfont-size:  9pt; \r\n\t\tcolor: #9B9B9B; \r\n\t\tfont-family: arial, helvetica, sans-serif;\r\n\t}\r\n\t.pqv_productName{\r\n\t\tfont-size:  11px; \r\n\t\tcolor: #427DBE; \r\n\t\tfont-family: Verdana, Arial,sans-serif;\r\n\t\tfont-weight: bold;\r\n\t}\r\n\t.pqv_discount {\r\n\t\tfont-family:Verdana,Arial,sans-serif; \r\n\t\tfont-size:11px; \r\n\t\tfont-weight:bold; \r\n\t\tcolor:#427DBE; \r\n\t\tvertical-align:middle;\r\n\t}\r\n\t.pqv_text{\r\n\t\tcolor:#174D8A;\r\n\t\tfont-size: 11px;\r\n\t}\r\n",templateCssPath:dojo.uri.dojoUri("wc/widget/templates/HtmlProductQuickView.css"),isContainer:true,widgetType:"ProductQuickView",identifier:"",defaultContent:false,dragAndDrop:true,dragSourceProperties:"",CatalogEntryThumbnailImageLink:"",CatalogEntryThumbnailImageSrc:"",CatalogEntryThumbnailImageAlt:"",CatalogEntryNameLink:"",CatalogEntryName:"",PriceImageLink:"",PriceImageSrc:"",PriceRange:"",SKU:"",ShortDescription:"",DiscountImage:"",DiscountLink:"",DiscountDetails:"",AdditionalText:"",catentryId:"",dragSourceType:"*",additionalProperties:"",DAPCatalogEntryContainer:null,DAPCatalogEntryThumbnailImageLink:null,DAPCatalogEntryThumbnailImage:null,DAPCatalogEntryNameLink:null,DAPCatalogEntryName:null,DAPPriceImageLink:null,DAPPriceImage:null,DAPPriceRange:null,DAPSKU:null,DAPShortDescription:null,DAPDiscountImage:null,DAPDiscountLink:null,DAPDiscountDetails:null,DAPAdditionalText:null,DAPProductQuickViewTable:null,fillInTemplate:function(){
if(this.defaultContent){
this.DAPCatalogEntryContainer.style.display="block";
this.DAPCatalogEntryThumbnailImageLink.href=this.CatalogEntryThumbnailImageLink;
this.DAPCatalogEntryThumbnailImage.src=this.CatalogEntryThumbnailImageSrc;
this.DAPCatalogEntryThumbnailImage.alt=this.CatalogEntryThumbnailImageAlt;
this.DAPCatalogEntryThumbnailImage.id=this.catentryId;
this.DAPCatalogEntryNameLink.href=this.CatalogEntryNameLink;
this.DAPCatalogEntryName.innerHTML=this.CatalogEntryName;
this.DAPPriceImageLink.href=this.PriceImageLink;
this.DAPPriceImage.src=this.PriceImageSrc;
this.DAPPriceRange.innerHTML=this.insertWithBreak(this.PriceRange);
this.DAPSKU.innerHTML=this.insertWithBreak(this.SKU);
this.DAPShortDescription.innerHTML=this.insertWithBreak(this.ShortDescription);
this.DAPDiscountImage.src=this.DiscountImage;
this.DAPDiscountLink.href=this.insertWithBreak(this.DiscountLink);
this.DAPDiscountDetails.innerHTML=this.insertWithBreak(this.DiscountDetails);
this.DAPAdditionalText.innerHTML=this.insertWithBreak(this.AdditionalText);
}else{
this.DAPCatalogEntryContainer.style.display="none";
dojo.dom.removeChildren(this.DAPProductQuickViewTable);
}
this.addDragDropFeature();
var _e23=new Array();
var _e24=new Array();
_e23=this.additionalProperties.split(",");
for(var i=0;i<_e23.length;i++){
_e24=_e23[i].split("=");
if(_e24.length==2){
this[_e24[0]]=_e24[1];
}
}
},insertWithBreak:function(_e26){
if(_e26!=""){
return _e26+"<br/><br/>";
}
return "";
},addDragDropFeature:function(){
if(this.dragAndDrop&&this.defaultContent){
var _e27=null;
_e27=this.DAPCatalogEntryThumbnailImageLink;
_e27.name=this.DAPCatalogEntryName.innerHTML;
_e27.price=this.DAPPriceRange.innerHTML;
_e27.catentryId=this.catentryId;
var _e28=new Array();
var _e29=new Array();
_e28=this.dragSourceProperties.split(",");
for(var i=0;i<_e28.length;i++){
_e29=_e28[i].split("=");
if(_e29.length==2){
_e27[_e29[0]]=_e29[1];
}
}
new dojo.dnd.HtmlDragSource(_e27,this.dragSourceType);
}
}});
dojo.widget.defineWidget("wc.widget.BaseContent",dojo.widget.HtmlWidget,{catentryId:"",dragSourceId:"",isContainer:true,widgetType:"BaseContent",dragSourceType:"*",dragSourceProperties:"",templateString:"",userInnerHtml:"",dragAndDrop:true,postCreate:function(){
if(this.userInnerHtml!=""){
this.domNode.innerHTML=this.userInnerHtml;
}
if(this.domNode.innerHTML!=null&&this.domNode.innerHTML!=""){
if(this.dragAndDrop){
var _e2b=null;
_e2b=dojo.byId(this.dragSourceId);
_e2b.catentryId=this.catentryId;
var _e2c=new Array();
var _e2d=new Array();
_e2c=this.dragSourceProperties.split(",");
for(var i=0;i<_e2c.length;i++){
_e2d=_e2c[i].split("=");
if(_e2d.length==2){
_e2b[_e2d[0]]=_e2d[1];
}
}
new dojo.dnd.HtmlDragSource(_e2b,this.dragSourceType);
}
}
}});
dojo.widget.defineWidget("wc.widget.ToolTipContent",dojo.widget.Tooltip,{connectId:"",userInnerHtml:"",templateCssString:"/**\r\n *-------------------------------------------------------------------\r\n * Licensed Materials - Property of IBM\r\n *\r\n * WebSphere Commerce\r\n *\r\n * (c) Copyright IBM Corp. 2007\r\n *\r\n * US Government Users Restricted Rights - Use, duplication or\r\n * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\r\n *\r\n *-------------------------------------------------------------------\r\n */\r\n \r\n.dojoTooltip {\r\n\tcolor: black;\r\n\tposition: absolute;\r\n\tz-index: 10;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("wc/widget/templates/HtmlProductQuickViewToolTip.css"),fillInTemplate:function(args,frag){
if(this.userInnerHtml!=""){
this.containerNode.innerHTML=this.userInnerHtml;
}
wc.widget.ToolTipContent.superclass.fillInTemplate.call(this,args,frag);
},_getPosition:function(_e31){
var pos={x:0,y:0};
if(!_e31.offsetParent){
return pos;
}
pos.x=_e31.offsetLeft;
pos.y=_e31.offsetTop;
while(_e31=_e31.offsetParent){
pos.x+=_e31.offsetLeft;
pos.y+=_e31.offsetTop;
}
return pos;
},_isOverElement:function(_e33,e){
_e33=dojo.byId(_e33);
if(e.target.tagName.toLowerCase()=="option"||e.target.tagName.toLowerCase()=="select"){
var _e35=this._getPosition(e.target.offsetParent);
dojo.debug("mouse  = ("+_e35.x+" , "+_e35.y+") ");
}else{
var _e35=dojo.html.getCursorPosition(e);
}
var bb=dojo.html.getBorderBox(_e33);
var _e37=dojo.html.getAbsolutePosition(_e33,true,dojo.html.boxSizing.BORDER_BOX);
var top=_e37.y;
var _e39=top+bb.height;
var left=_e37.x;
var _e3b=left+bb.width;
dojo.debug("**** left = "+left+", right = "+_e3b+", top = "+top+", bottom = "+_e39+" mouse: "+_e35.x+", "+_e35.y+") ");
dojo.debug("**** mouse x y = ("+_e35.x+", "+_e35.y+") ");
return (_e35.x>=left&&_e35.x<=_e3b&&_e35.y>=top&&_e35.y<=_e39);
},_onMouseMove:function(e){
this._mouse={x:e.pageX,y:e.pageY};
dojo.debug("mouse x = "+this._mouse.x+" y = "+this._mouse.y+" and target: "+e.target+" with coordinates: ("+this._getPosition(dojo.byId(e.target)).x+", "+this._getPosition(dojo.byId(e.target)).y+") ");
if(this._isOverElement(this._connectNode,e)||this._isOverElement(this.domNode,e)){
dojo.debug("on mouse on hover: {x = "+this._mouse.x+", y = "+this._mouse.y+" }");
this._onHover(e);
}else{
dojo.debug("on mousemove unhover "+e+" and target is: "+e.target+" unHovering with mouse = {x = "+this._mouse.x+", y = "+this._mouse.y+" }");
this._onUnHover(e);
}
}});
dojo.provide("dojo.dnd.HtmlDragMove");
dojo.declare("dojo.dnd.HtmlDragMoveSource",dojo.dnd.HtmlDragSource,{onDragStart:function(){
var _e3d=new dojo.dnd.HtmlDragMoveObject(this.dragObject,this.type);
if(this.constrainToContainer){
_e3d.constrainTo(this.constrainingContainer);
}
return _e3d;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragMoveSource(this.dragObjects[i]));
}
}});
dojo.declare("dojo.dnd.HtmlDragMoveObject",dojo.dnd.HtmlDragObject,{onDragStart:function(e){
dojo.html.clearSelection();
this.dragClone=this.domNode;
if(dojo.html.getComputedStyle(this.domNode,"position")!="absolute"){
this.domNode.style.position="relative";
}
var left=parseInt(dojo.html.getComputedStyle(this.domNode,"left"));
var top=parseInt(dojo.html.getComputedStyle(this.domNode,"top"));
this.dragStartPosition={x:isNaN(left)?0:left,y:isNaN(top)?0:top};
this.scrollOffset=dojo.html.getScroll().offset;
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.containingBlockPosition={x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
dojo.event.connect(this.domNode,"onclick",this,"_squelchOnClick");
},onDragEnd:function(e){
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.domNode.style.top=y+"px";
}
if(!this.disableX){
this.domNode.style.left=x+"px";
}
},_squelchOnClick:function(e){
dojo.event.browser.stopEvent(e);
dojo.event.disconnect(this.domNode,"onclick",this,"_squelchOnClick");
}});
dojo.provide("dojo.style");
dojo.kwCompoundRequire({browser:["dojo.html.style"]});
dojo.deprecated("dojo.style","replaced by dojo.html.style","0.5");
dojo.lang.mixin(dojo.style,dojo.html);
dojo.provide("dojo.experimental");
dojo.experimental=function(_e46,_e47){
var _e48="EXPERIMENTAL: "+_e46;
_e48+=" -- Not yet ready for use.  APIs subject to change without notice.";
if(_e47){
_e48+=" "+_e47;
}
dojo.debug(_e48);
};
dojo.provide("dojo.regexp");
dojo.evalObjPath("dojo.regexp.us",true);
dojo.regexp.tld=function(_e49){
_e49=(typeof _e49=="object")?_e49:{};
if(typeof _e49.allowCC!="boolean"){
_e49.allowCC=true;
}
if(typeof _e49.allowInfra!="boolean"){
_e49.allowInfra=true;
}
if(typeof _e49.allowGeneric!="boolean"){
_e49.allowGeneric=true;
}
var _e4a="arpa";
var _e4b="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var ccRE="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|"+"bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|"+"ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|"+"gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|"+"la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|"+"my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|"+"re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|"+"tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var a=[];
if(_e49.allowInfra){
a.push(_e4a);
}
if(_e49.allowGeneric){
a.push(_e4b);
}
if(_e49.allowCC){
a.push(ccRE);
}
var _e4e="";
if(a.length>0){
_e4e="("+a.join("|")+")";
}
return _e4e;
};
dojo.regexp.ipAddress=function(_e4f){
_e4f=(typeof _e4f=="object")?_e4f:{};
if(typeof _e4f.allowDottedDecimal!="boolean"){
_e4f.allowDottedDecimal=true;
}
if(typeof _e4f.allowDottedHex!="boolean"){
_e4f.allowDottedHex=true;
}
if(typeof _e4f.allowDottedOctal!="boolean"){
_e4f.allowDottedOctal=true;
}
if(typeof _e4f.allowDecimal!="boolean"){
_e4f.allowDecimal=true;
}
if(typeof _e4f.allowHex!="boolean"){
_e4f.allowHex=true;
}
if(typeof _e4f.allowIPv6!="boolean"){
_e4f.allowIPv6=true;
}
if(typeof _e4f.allowHybrid!="boolean"){
_e4f.allowHybrid=true;
}
var _e50="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var _e51="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var _e52="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var _e53="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|"+"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var _e54="0[xX]0*[\\da-fA-F]{1,8}";
var _e55="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var _e56="([\\da-fA-F]{1,4}\\:){6}"+"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var a=[];
if(_e4f.allowDottedDecimal){
a.push(_e50);
}
if(_e4f.allowDottedHex){
a.push(_e51);
}
if(_e4f.allowDottedOctal){
a.push(_e52);
}
if(_e4f.allowDecimal){
a.push(_e53);
}
if(_e4f.allowHex){
a.push(_e54);
}
if(_e4f.allowIPv6){
a.push(_e55);
}
if(_e4f.allowHybrid){
a.push(_e56);
}
var _e58="";
if(a.length>0){
_e58="("+a.join("|")+")";
}
return _e58;
};
dojo.regexp.host=function(_e59){
_e59=(typeof _e59=="object")?_e59:{};
if(typeof _e59.allowIP!="boolean"){
_e59.allowIP=true;
}
if(typeof _e59.allowLocal!="boolean"){
_e59.allowLocal=false;
}
if(typeof _e59.allowPort!="boolean"){
_e59.allowPort=true;
}
var _e5a="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojo.regexp.tld(_e59);
var _e5b=(_e59.allowPort)?"(\\:"+dojo.regexp.integer({signed:false})+")?":"";
var _e5c=_e5a;
if(_e59.allowIP){
_e5c+="|"+dojo.regexp.ipAddress(_e59);
}
if(_e59.allowLocal){
_e5c+="|localhost";
}
return "("+_e5c+")"+_e5b;
};
dojo.regexp.url=function(_e5d){
_e5d=(typeof _e5d=="object")?_e5d:{};
if(typeof _e5d.scheme=="undefined"){
_e5d.scheme=[true,false];
}
var _e5e=dojo.regexp.buildGroupRE(_e5d.scheme,function(q){
if(q){
return "(https?|ftps?)\\://";
}
return "";
});
var _e60="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return _e5e+dojo.regexp.host(_e5d)+_e60;
};
dojo.regexp.emailAddress=function(_e61){
_e61=(typeof _e61=="object")?_e61:{};
if(typeof _e61.allowCruft!="boolean"){
_e61.allowCruft=false;
}
_e61.allowPort=false;
var _e62="([\\da-z]+[-._+&'])*[\\da-z]+";
var _e63=_e62+"@"+dojo.regexp.host(_e61);
if(_e61.allowCruft){
_e63="<?(mailto\\:)?"+_e63+">?";
}
return _e63;
};
dojo.regexp.emailAddressList=function(_e64){
_e64=(typeof _e64=="object")?_e64:{};
if(typeof _e64.listSeparator!="string"){
_e64.listSeparator="\\s;,";
}
var _e65=dojo.regexp.emailAddress(_e64);
var _e66="("+_e65+"\\s*["+_e64.listSeparator+"]\\s*)*"+_e65+"\\s*["+_e64.listSeparator+"]?\\s*";
return _e66;
};
dojo.regexp.integer=function(_e67){
_e67=(typeof _e67=="object")?_e67:{};
if(typeof _e67.signed=="undefined"){
_e67.signed=[true,false];
}
if(typeof _e67.separator=="undefined"){
_e67.separator="";
}else{
if(typeof _e67.groupSize=="undefined"){
_e67.groupSize=3;
}
}
var _e68=dojo.regexp.buildGroupRE(_e67.signed,function(q){
return q?"[-+]":"";
});
var _e6a=dojo.regexp.buildGroupRE(_e67.separator,function(sep){
if(sep==""){
return "(0|[1-9]\\d*)";
}
var grp=_e67.groupSize,grp2=_e67.groupSize2;
if(typeof grp2!="undefined"){
var _e6e="(0|[1-9]\\d{0,"+(grp2-1)+"}(["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"("+_e6e+"|(0|[1-9]\\d{0,"+(grp-1)+"}))":_e6e;
}
return "(0|[1-9]\\d{0,"+(grp-1)+"}(["+sep+"]\\d{"+grp+"})*)";
});
return _e68+_e6a;
};
dojo.regexp.realNumber=function(_e6f){
_e6f=(typeof _e6f=="object")?_e6f:{};
if(typeof _e6f.places!="number"){
_e6f.places=Infinity;
}
if(typeof _e6f.decimal!="string"){
_e6f.decimal=".";
}
if(typeof _e6f.fractional=="undefined"){
_e6f.fractional=[true,false];
}
if(typeof _e6f.exponent=="undefined"){
_e6f.exponent=[true,false];
}
if(typeof _e6f.eSigned=="undefined"){
_e6f.eSigned=[true,false];
}
var _e70=dojo.regexp.integer(_e6f);
var _e71=dojo.regexp.buildGroupRE(_e6f.fractional,function(q){
var re="";
if(q&&(_e6f.places>0)){
re="\\"+_e6f.decimal;
if(_e6f.places==Infinity){
re="("+re+"\\d+)?";
}else{
re=re+"\\d{"+_e6f.places+"}";
}
}
return re;
});
var _e74=dojo.regexp.buildGroupRE(_e6f.exponent,function(q){
if(q){
return "([eE]"+dojo.regexp.integer({signed:_e6f.eSigned})+")";
}
return "";
});
return _e70+_e71+_e74;
};
dojo.regexp.currency=function(_e76){
_e76=(typeof _e76=="object")?_e76:{};
if(typeof _e76.signed=="undefined"){
_e76.signed=[true,false];
}
if(typeof _e76.symbol=="undefined"){
_e76.symbol="$";
}
if(typeof _e76.placement!="string"){
_e76.placement="before";
}
if(typeof _e76.signPlacement!="string"){
_e76.signPlacement="before";
}
if(typeof _e76.separator=="undefined"){
_e76.separator=",";
}
if(typeof _e76.fractional=="undefined"&&typeof _e76.cents!="undefined"){
dojo.deprecated("dojo.regexp.currency: flags.cents","use flags.fractional instead","0.5");
_e76.fractional=_e76.cents;
}
if(typeof _e76.decimal!="string"){
_e76.decimal=".";
}
var _e77=dojo.regexp.buildGroupRE(_e76.signed,function(q){
if(q){
return "[-+]";
}
return "";
});
var _e79=dojo.regexp.buildGroupRE(_e76.symbol,function(_e7a){
return "\\s?"+_e7a.replace(/([.$?*!=:|\\\/^])/g,"\\$1")+"\\s?";
});
switch(_e76.signPlacement){
case "before":
_e79=_e77+_e79;
break;
case "after":
_e79=_e79+_e77;
break;
}
var _e7b=_e76;
_e7b.signed=false;
_e7b.exponent=false;
var _e7c=dojo.regexp.realNumber(_e7b);
var _e7d;
switch(_e76.placement){
case "before":
_e7d=_e79+_e7c;
break;
case "after":
_e7d=_e7c+_e79;
break;
}
switch(_e76.signPlacement){
case "around":
_e7d="("+_e7d+"|"+"\\("+_e7d+"\\)"+")";
break;
case "begin":
_e7d=_e77+_e7d;
break;
case "end":
_e7d=_e7d+_e77;
break;
}
return _e7d;
};
dojo.regexp.us.state=function(_e7e){
_e7e=(typeof _e7e=="object")?_e7e:{};
if(typeof _e7e.allowTerritories!="boolean"){
_e7e.allowTerritories=true;
}
if(typeof _e7e.allowMilitary!="boolean"){
_e7e.allowMilitary=true;
}
var _e7f="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|"+"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var _e80="AS|FM|GU|MH|MP|PW|PR|VI";
var _e81="AA|AE|AP";
if(_e7e.allowTerritories){
_e7f+="|"+_e80;
}
if(_e7e.allowMilitary){
_e7f+="|"+_e81;
}
return "("+_e7f+")";
};
dojo.regexp.time=function(_e82){
dojo.deprecated("dojo.regexp.time","Use dojo.date.parse instead","0.5");
_e82=(typeof _e82=="object")?_e82:{};
if(typeof _e82.format=="undefined"){
_e82.format="h:mm:ss t";
}
if(typeof _e82.amSymbol!="string"){
_e82.amSymbol="AM";
}
if(typeof _e82.pmSymbol!="string"){
_e82.pmSymbol="PM";
}
var _e83=function(_e84){
_e84=_e84.replace(/([.$?*!=:|{}\(\)\[\]\\\/^])/g,"\\$1");
var amRE=_e82.amSymbol.replace(/([.$?*!=:|{}\(\)\[\]\\\/^])/g,"\\$1");
var pmRE=_e82.pmSymbol.replace(/([.$?*!=:|{}\(\)\[\]\\\/^])/g,"\\$1");
_e84=_e84.replace("hh","(0[1-9]|1[0-2])");
_e84=_e84.replace("h","([1-9]|1[0-2])");
_e84=_e84.replace("HH","([01][0-9]|2[0-3])");
_e84=_e84.replace("H","([0-9]|1[0-9]|2[0-3])");
_e84=_e84.replace("mm","([0-5][0-9])");
_e84=_e84.replace("m","([1-5][0-9]|[0-9])");
_e84=_e84.replace("ss","([0-5][0-9])");
_e84=_e84.replace("s","([1-5][0-9]|[0-9])");
_e84=_e84.replace("t","\\s?("+amRE+"|"+pmRE+")\\s?");
return _e84;
};
return dojo.regexp.buildGroupRE(_e82.format,_e83);
};
dojo.regexp.numberFormat=function(_e87){
_e87=(typeof _e87=="object")?_e87:{};
if(typeof _e87.format=="undefined"){
_e87.format="###-###-####";
}
var _e88=function(_e89){
_e89=_e89.replace(/([.$*!=:|{}\(\)\[\]\\\/^])/g,"\\$1");
_e89=_e89.replace(/\?/g,"\\d?");
_e89=_e89.replace(/#/g,"\\d");
return _e89;
};
return dojo.regexp.buildGroupRE(_e87.format,_e88);
};
dojo.regexp.buildGroupRE=function(a,re){
if(!(a instanceof Array)){
return re(a);
}
var b=[];
for(var i=0;i<a.length;i++){
b.push(re(a[i]));
}
return "("+b.join("|")+")";
};
dojo.provide("dojo.i18n.number");
dojo.experimental("dojo.i18n.number");
dojo.i18n.number.format=function(_e8e,_e8f,_e90){
_e8f=(typeof _e8f=="object")?_e8f:{};
var _e91=dojo.i18n.number._mapToLocalizedFormatData(dojo.i18n.number.FORMAT_TABLE,_e90);
if(typeof _e8f.separator=="undefined"){
_e8f.separator=_e91[1];
}
if(typeof _e8f.decimal=="undefined"){
_e8f.decimal=_e91[2];
}
if(typeof _e8f.groupSize=="undefined"){
_e8f.groupSize=_e91[3];
}
if(typeof _e8f.groupSize2=="undefined"){
_e8f.groupSize2=_e91[4];
}
if(typeof _e8f.round=="undefined"){
_e8f.round=true;
}
if(typeof _e8f.signed=="undefined"){
_e8f.signed=true;
}
var _e92=(_e8f.signed&&(_e8e<0))?"-":"";
_e8e=Math.abs(_e8e);
var _e93=String((((_e8f.places>0)||!_e8f.round)?Math.floor:Math.round)(_e8e));
function splitSubstrings(str,_e95){
for(var subs=[];str.length>=_e95;str=str.substr(0,str.length-_e95)){
subs.push(str.substr(-_e95));
}
if(str.length>0){
subs.push(str);
}
return subs.reverse();
}
if(_e8f.groupSize2&&(_e93.length>_e8f.groupSize)){
var _e97=splitSubstrings(_e93.substr(0,_e93.length-_e8f.groupSize),_e8f.groupSize2);
_e97.push(_e93.substr(-_e8f.groupSize));
_e92=_e92+_e97.join(_e8f.separator);
}else{
if(_e8f.groupSize){
_e92=_e92+splitSubstrings(_e93,_e8f.groupSize).join(_e8f.separator);
}else{
_e92=_e92+_e93;
}
}
if(_e8f.places>0){
var _e98=_e8e-Math.floor(_e8e);
_e98=(_e8f.round?Math.round:Math.floor)(_e98*Math.pow(10,_e8f.places));
_e92=_e92+_e8f.decimal+_e98;
}
return _e92;
};
dojo.i18n.number.parse=function(_e99,_e9a,_e9b){
_e9b=(typeof _e9b=="object")?_e9b:{};
var _e9c=dojo.i18n.number._mapToLocalizedFormatData(dojo.i18n.number.FORMAT_TABLE,_e9a);
if(typeof _e9b.separator=="undefined"){
_e9b.separator=_e9c[1];
}
if(typeof _e9b.decimal=="undefined"){
_e9b.decimal=_e9c[2];
}
if(typeof _e9b.groupSize=="undefined"){
_e9b.groupSize=_e9c[3];
}
if(typeof _e9b.groupSize2=="undefined"){
_e9b.groupSize2=_e9c[4];
}
if(typeof _e9b.validate=="undefined"){
_e9b.validate=true;
}
if(_e9b.validate&&!dojo.i18n.number.isReal(_e99,_e9a,_e9b)){
return Number.NaN;
}
var _e9d=_e99.split(_e9b.decimal);
if(_e9d.length>2){
return Number.NaN;
}
var _e9e=Number(_e9d[0].replace(new RegExp("\\"+_e9b.separator,"g"),""));
var _e9f=(_e9d.length==1)?0:Number(_e9d[1])/Math.pow(10,String(_e9d[1]).length);
return _e9e+_e9f;
};
dojo.i18n.number.isInteger=function(_ea0,_ea1,_ea2){
_ea2=(typeof _ea2=="object")?_ea2:{};
var _ea3=dojo.i18n.number._mapToLocalizedFormatData(dojo.i18n.number.FORMAT_TABLE,_ea1);
if(typeof _ea2.separator=="undefined"){
_ea2.separator=_ea3[1];
}else{
if(dojo.lang.isArray(_ea2.separator)&&_ea2.separator.length===0){
_ea2.separator=[_ea3[1],""];
}
}
if(typeof _ea2.groupSize=="undefined"){
_ea2.groupSize=_ea3[3];
}
if(typeof _ea2.groupSize2=="undefined"){
_ea2.groupSize2=_ea3[4];
}
var re=new RegExp("^"+dojo.regexp.integer(_ea2)+"$");
return re.test(_ea0);
};
dojo.i18n.number.isReal=function(_ea5,_ea6,_ea7){
_ea7=(typeof _ea7=="object")?_ea7:{};
var _ea8=dojo.i18n.number._mapToLocalizedFormatData(dojo.i18n.number.FORMAT_TABLE,_ea6);
if(typeof _ea7.separator=="undefined"){
_ea7.separator=_ea8[1];
}else{
if(dojo.lang.isArray(_ea7.separator)&&_ea7.separator.length===0){
_ea7.separator=[_ea8[1],""];
}
}
if(typeof _ea7.decimal=="undefined"){
_ea7.decimal=_ea8[2];
}
if(typeof _ea7.groupSize=="undefined"){
_ea7.groupSize=_ea8[3];
}
if(typeof _ea7.groupSize2=="undefined"){
_ea7.groupSize2=_ea8[4];
}
var re=new RegExp("^"+dojo.regexp.realNumber(_ea7)+"$");
return re.test(_ea5);
};
(function(){
dojo.i18n.number.FORMAT_TABLE={"ar-ae":["","",",",1],"ar-bh":["","",",",1],"ar-dz":["","",",",1],"ar-eg":["","",",",1],"ar-jo":["","",",",1],"ar-kw":["","",",",1],"ar-lb":["","",",",1],"ar-ma":["","",",",1],"ar-om":["","",",",1],"ar-qa":["","",",",1],"ar-sa":["","",",",1],"ar-sy":["","",",",1],"ar-tn":["","",",",1],"ar-ye":["","",",",1],"cs-cz":[".",".",",",3],"da-dk":[".",".",",",3],"de-at":[".",".",",",3],"de-de":[".",".",",",3],"de-lu":[".",".",",",3],"de-ch":["'","'",".",3],"el-gr":[".",".",",",3],"en-au":[",",",",".",3],"en-ca":[",",",",".",3],"en-gb":[",",",",".",3],"en-hk":[",",",",".",3],"en-ie":[",",",",".",3],"en-in":[",",",",".",3,2],"en-nz":[",",",",".",3],"en-us":[",",",",".",3],"en-za":[",",",",".",3],"es-ar":[".",".",",",3],"es-bo":[".",".",",",3],"es-cl":[".",".",",",3],"es-co":[".",".",",",3],"es-cr":[".",".",",",3],"es-do":[".",".",",",3],"es-ec":[".",".",",",3],"es-es":[".",".",",",3],"es-gt":[",",",",".",3],"es-hn":[",",",",".",3],"es-mx":[",",",",".",3],"es-ni":[",",",",".",3],"es-pa":[",",",",".",3],"es-pe":[",",",",".",3],"es-pr":[",",",",".",3],"es-py":[".",".",",",3],"es-sv":[",",",",".",3],"es-uy":[".",".",",",3],"es-ve":[".",".",",",3],"fi-fi":[" "," ",",",3],"fr-be":[".",".",",",3],"fr-ca":[" "," ",",",3],"fr-ch":[" "," ",".",3],"fr-fr":[" "," ",",",3],"fr-lu":[".",".",",",3],"he-il":[",",",",".",3],"hu-hu":[" "," ",",",3],"it-ch":[" "," ",".",3],"it-it":[".",".",",",3],"ja-jp":[",",",",".",3],"ko-kr":[",",",",".",3],"no-no":[".",".",",",3],"nl-be":[" "," ",",",3],"nl-nl":[".",".",",",3],"pl-pl":[".",".",",",3],"pt-br":[".",".",",",3],"pt-pt":[".",".","$",3],"ru-ru":[" "," ",",",3],"sv-se":["."," ",",",3],"tr-tr":[".",".",",",3],"zh-cn":[",",",",".",3],"zh-hk":[",",",",".",3],"zh-tw":[",",",",".",3],"*":[",",",",".",3]};
})();
dojo.i18n.number._mapToLocalizedFormatData=function(_eaa,_eab){
_eab=dojo.hostenv.normalizeLocale(_eab);
var data=_eaa[_eab];
if(typeof data=="undefined"){
data=_eaa["*"];
}
return data;
};
dojo.provide("dojo.i18n.currency");
dojo.experimental("dojo.i18n.currency");
dojo.i18n.currency.format=function(_ead,iso,_eaf,_eb0){
_eaf=(typeof _eaf=="object")?_eaf:{};
var _eb1=dojo.i18n.currency._mapToLocalizedFormatData(dojo.i18n.currency.FORMAT_TABLE,iso,_eb0);
if(typeof _eaf.places=="undefined"){
_eaf.places=_eb1.places;
}
if(typeof _eaf.places=="undefined"){
_eaf.places=2;
}
_eaf.signed=false;
var _eb2=dojo.i18n.number.format(_ead,_eaf,_eb0);
var sym=_eb1.symbol;
if(_eb1.adjSpace=="symbol"){
if(_eb1.placement=="after"){
sym=" "+sym;
}else{
sym=sym+" ";
}
}
if(_ead<0){
if(_eb1.signPlacement=="before"){
sym="-"+sym;
}else{
if(_eb1.signPlacement=="after"){
sym=sym+"-";
}
}
}
var spc=(_eb1.adjSpace=="number")?" ":"";
if(_eb1.placement=="after"){
_eb2=_eb2+spc+sym;
}else{
_eb2=sym+spc+_eb2;
}
if(_ead<0){
if(_eb1.signPlacement=="around"){
_eb2="("+_eb2+")";
}else{
if(_eb1.signPlacement=="end"){
_eb2=_eb2+"-";
}else{
if(!_eb1.signPlacement||_eb1.signPlacement=="begin"){
_eb2="-"+_eb2;
}
}
}
}
return _eb2;
};
dojo.i18n.currency.parse=function(_eb5,iso,_eb7,_eb8){
if(typeof _eb8.validate=="undefined"){
_eb8.validate=true;
}
if(_eb8.validate&&!dojo.i18n.number.isCurrency(_eb5,iso,_eb7,_eb8)){
return Number.NaN;
}
var sign=(_eb5.indexOf("-")!=-1);
var abs=abs.replace(/\-/,"");
var _ebb=dojo.i18n.currency._mapToLocalizedFormatData(dojo.i18n.currency.FORMAT_TABLE,iso,_eb7);
abs=abs.replace(new RegExp("\\"+_ebb.symbol),"");
var _ebc=dojo.i18n.number.parse(abs,_eb7,_eb8);
if(sign){
_ebc=_ebc*-1;
}
return _ebc;
};
dojo.i18n.currency.isCurrency=function(_ebd,iso,_ebf,_ec0){
_ec0=(typeof _ec0=="object")?_ec0:{};
var _ec1=dojo.i18n.number._mapToLocalizedFormatData(dojo.i18n.number.FORMAT_TABLE,_ebf);
if(typeof _ec0.separator=="undefined"){
_ec0.separator=_ec1[0];
}else{
if(dojo.lang.isArray(_ec0.separator)&&_ec0.separator.length==0){
_ec0.separator=[_ec1[0],""];
}
}
if(typeof _ec0.decimal=="undefined"){
_ec0.decimal=_ec1[2];
}
if(typeof _ec0.groupSize=="undefined"){
_ec0.groupSize=_ec1[3];
}
if(typeof _ec0.groupSize2=="undefined"){
_ec0.groupSize2=_ec1[4];
}
var _ec2=dojo.i18n.currency._mapToLocalizedFormatData(dojo.i18n.currency.FORMAT_TABLE,iso,_ebf);
if(typeof _ec0.places=="undefined"){
_ec0.places=_ec2.places;
}
if(typeof _ec0.places=="undefined"){
_ec0.places=2;
}
if(typeof _ec0.symbol=="undefined"){
_ec0.symbol=_ec2.symbol;
}else{
if(dojo.lang.isArray(_ec0.symbol)&&_ec0.symbol.length==0){
_ec0.symbol=[_ec2.symbol,""];
}
}
if(typeof _ec0.placement=="undefined"){
_ec0.placement=_ec2.placement;
}
var re=new RegExp("^"+dojo.regexp.currency(_ec0)+"$");
return re.test(_ebd);
};
dojo.i18n.currency._mapToLocalizedFormatData=function(_ec4,iso,_ec6){
var _ec7=dojo.i18n.currency.FORMAT_TABLE[iso];
if(!dojo.lang.isArray(_ec7)){
return _ec7;
}
return dojo.i18n.number._mapToLocalizedFormatData(_ec7[0],_ec6);
};
(function(){
var _ec8={symbol:"\u062c",placement:"after",htmlSymbol:"?"};
var euro={symbol:"\u20ac",placement:"before",adjSpace:"symbol",htmlSymbol:"&euro;"};
var _eca={symbol:"\u20ac",placement:"after",htmlSymbol:"&euro;"};
dojo.i18n.currency.FORMAT_TABLE={AED:{symbol:"\u062c",placement:"after"},ARS:{symbol:"$",signPlacement:"after"},ATS:{symbol:"\u20ac",adjSpace:"number",signPlacement:"after",htmlSymbol:"&euro;"},AUD:{symbol:"$"},BOB:{symbol:"$b"},BRL:{symbol:"R$",adjSpace:"symbol"},BEF:_eca,BHD:_ec8,CAD:[{"*":{symbol:"$"},"fr-ca":{symbol:"$",placement:"after",signPlacement:"around"}}],CHF:{symbol:"CHF",adjSpace:"symbol",signPlacement:"after"},CLP:{symbol:"$"},COP:{symbol:"$",signPlacement:"around"},CNY:{symbol:"\xa5",htmlSymbol:"&yen;"},CRC:{symbol:"\u20a1",signPlacement:"after",htmlSymbol:"?"},CZK:{symbol:"Kc",adjSpace:"symbol",signPlacement:"after"},DEM:_eca,DKK:{symbol:"kr.",adjSpace:"symbol",signPlacement:"after"},DOP:{symbol:"$"},DZD:_ec8,ECS:{symbol:"$",signPlacement:"after"},EGP:_ec8,ESP:_eca,EUR:euro,FIM:_eca,FRF:_eca,GBP:{symbol:"\xa3",htmlSymbol:"&pound;"},GRD:{symbol:"\u20ac",signPlacement:"end",htmlSymbol:"&euro;"},GTQ:{symbol:"Q",signPlacement:"after"},HKD:{symbol:"HK$"},HNL:{symbol:"L.",signPlacement:"end"},HUF:{symbol:"Ft",placement:"after",adjSpace:"symbol"},IEP:{symbol:"\u20ac",htmlSymbol:"&euro;"},ILS:{symbol:"\u05e9\"\u05d7",placement:"after",htmlSymbol:"?"},INR:{symbol:"Rs."},ITL:{symbol:"\u20ac",signPlacement:"after",htmlSymbol:"&euro;"},JOD:_ec8,JPY:{symbol:"\xa5",places:0,htmlSymbol:"&yen;"},KRW:{symbol:"\u20a9",places:0,htmlSymbol:"?"},KWD:_ec8,LBP:_ec8,LUF:_eca,MAD:_ec8,MXN:{symbol:"$",signPlacement:"around"},NIO:{symbol:"C$",adjSpace:"symbol",signPlacement:"after"},NLG:{symbol:"\u20ac",signPlacement:"end",htmlSymbol:"&euro;"},NOK:{symbol:"kr",adjSpace:"symbol",signPlacement:"after"},NZD:{symbol:"$"},OMR:_ec8,PAB:{symbol:"B/",adjSpace:"symbol",signPlacement:"after"},PEN:{symbol:"S/",signPlacement:"after"},PLN:{symbol:"z",placement:"after"},PTE:_eca,PYG:{symbol:"Gs.",signPlacement:"after"},QAR:_ec8,RUR:{symbol:"rub.",placement:"after"},SAR:_ec8,SEK:{symbol:"kr",placement:"after",adjSpace:"symbol"},SGD:{symbol:"$"},SVC:{symbol:"\u20a1",signPlacement:"after",adjSpace:"symbol"},SYP:_ec8,TND:_ec8,TRL:{symbol:"TL",placement:"after"},TWD:{symbol:"NT$"},USD:{symbol:"$"},UYU:{symbol:"$U",signplacement:"after",adjSpace:"symbol"},VEB:{symbol:"Bs",signplacement:"after",adjSpace:"symbol"},YER:_ec8,ZAR:{symbol:"R",signPlacement:"around"}};
})();
dojo.provide("wc.widget.RangeSlider");
wc.widget.RangeSlider=function(){
dojo.widget.HtmlWidget.call(this);
this.widgetType="RangeSlider";
this.isContainer=true;
this.templateCssString="/**\r\n *-------------------------------------------------------------------\r\n * Licensed Materials - Property of IBM\r\n *\r\n * WebSphere Commerce\r\n *\r\n * (c) Copyright IBM Corp. 2007\r\n *\r\n * US Government Users Restricted Rights - Use, duplication or\r\n * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\r\n *\r\n *-------------------------------------------------------------------\r\n */\r\n \r\n.rangeSelectorHandle { \r\n  color: #FF0000;\r\n  position: absolute; \r\n  width: 25px; \r\n  height: 25px;\r\n  cursor: pointer;\r\n  z-index: 10;\r\n}\r\n\r\n.rangeSelectorHandleHover { \r\n \r\n}\r\n\r\n.rangeSelectorBar { \r\n  width: 300px;\r\n  height: 25px;\r\n  cursor: pointer;\r\n  \r\n}\r\n\r\n.rangeSelectorTooltip{\r\n  position: absolute;\r\n  background-color: #ffffff;\r\n  border: solid 1px #000000;\r\n  padding: 2px 2px 2px 2px;\r\n  font-size: small;\r\n  z-index: 30;\r\n}\r\n";
this.templateCssPath="wc/widget/templates/RangeSlider.css";
this.templateString="<div class=\"rangeSelectorMain\">\r\n    <div id=\"${this.widgetId}_firstHandle\" class=\"rangeSelectorHandle\" dojoAttachPoint=\"firstHandle\" dojoAttachEvent=\"onMouseOver: onFirstMouseOver; onMouseOut: onFirstMouseOut;\"></div>\r\n    <div class=\"rangeSelectorEnd\"></div>\r\n    <div class=\"rangeSelectorBar\" dojoAttachPoint=\"rangeSelectorBar\"></div>\r\n    <div class=\"rangeSelectorEnd2\"></div>\r\n    <div id=\"${this.widgetId}_secondHandle\" class=\"rangeSelectorHandle\" dojoAttachPoint=\"secondHandle\" dojoAttachEvent=\"onMouseOver: onSecondMouseOver; onMouseOut: onSecondMouseOut;\"></div>\r\n\r\n\t<div id=\"${this.widgetId}_firstHandle_tooltip\" class=\"rangeSelectorTooltip\" dojoAttachPoint=\"firstTooltip\"></div>\r\n   \t<div id=\"${this.widgetId}_secondHandle_tooltip\" class=\"rangeSelectorTooltip\" dojoAttachPoint=\"secondTooltip\"></div>\r\n</div>\r\n";
this.firstHandle=null;
this.secondHandle=null;
this.rangeSelectorBar=null;
this.startRange=0;
this.totalRange=100;
this.defaultStart=0;
this.defaultEnd=0;
this.clickSelect=true;
this.snapToGrid=true;
this.activeDrag=true;
this.incrementValue=1;
this.decimalPoints=0;
this.showTooltip=true;
this.showTooltipAllTime=true;
this.ralativePositionFirst=[-1,-1];
this.ralativePositionSecond=[1,-1];
this.prefix="";
this.suffix="";
this.currencyCode="";
this.firstTooltip=null;
this.secondTooltip=null;
this.currentValue=new Object();
this.fillInTemplate=function(args,frag){
dojo.lang.setTimeout(this,"initWidget",0);
};
this.initWidget=function(){
//console.log("initWidget START");
this.pixelsOnSlider=dojo.style.getOuterWidth(this.rangeSelectorBar);
this.endRange=this.startRange+this.totalRange;
this.pixelsPerUnit=(this.pixelsOnSlider)/this.totalRange;
this.noOfDecimalUnits=(this.totalRange*(Math.pow(10,this.decimalPoints)))/this.incrementValue;
var x=Math.log(this.noOfDecimalUnits/this.pixelsOnSlider)*Math.LOG10E;
if(x>0){
dojo.debug("RangeSlider Widget: The whole range (along with decimal values) cannot be represented by the specified width of the widget. "+"Please set decimalPoints value to "+Math.floor(this.decimalPoints-x)+" or less, OR "+"Set the width of the widget to "+(this.noOfDecimalUnits)+" Pixels.");
dojo.debug("RangeSlider Widget: The decimalPoints value is set to "+Math.floor(this.decimalPoints-x)+" from its origional value "+this.decimalPoints);
this.decimalPoints=Math.floor(this.decimalPoints-x);
}
if(this.pixelsPerUnit<1){
dojo.debug("RangeSlider Widget: The whole range cannot be represented by the specified width of the widget. "+"Please decrese the range  by "+dojo.math.round((1-this.pixelsPerUnit)*this.totalRange)+" Units OR "+"Increase the width of the widget by "+dojo.math.round((1-this.pixelsPerUnit)*this.totalRange)+" Pixels.");
}
if(this.defaultStart<this.startRange||this.defaultStart>=this.endRange){
this.defaultStart=this.startRange;
}
if(this.defaultEnd>this.endRange||this.defaultEnd<=this.startRange){
this.defaultEnd=this.endRange;
}
this.currentValue.lower=this.defaultStart;
this.currentValue.upper=this.defaultEnd;
this.setupSlider(this.firstHandle,"first");
this.setupSlider(this.secondHandle,"second");
if(this.clickSelect){
dojo.event.connect(this.rangeSelectorBar,"onclick",this,"onSliderBarClick");
}
if(typeof window!="undefined"){
}
//console.log("initWidget END");
};
this.setupSlider=function(_ece,name){
//console.log("setupSlider ["+name+"] START");
this.handleMove=new dojo.widget.SliderDragMoveSource(_ece);
this.handleMove=new dojo.widget.SliderDragMoveSource(_ece);
this.handleMove.setParent(this);
dojo.event.connect(this.handleMove,"onDragMove",this,"onDragMove");
dojo.event.connect(this.handleMove,"onDragEnd",this,"onDragEnd");
dojo.event.connect(this.handleMove,"onClick",this,"onClick");
_ece.name=name;
this.startLimit=32-dojo.style.getOuterWidth(this.firstHandle)/2;
this.endLimit=this.startLimit+this.pixelsOnSlider;
var _ed0=[];
var _ed1;
if(name=="first"){
_ed0[0]=(this.ralativePositionFirst[0]<0)?(this.ralativePositionFirst[0]-20):(this.ralativePositionFirst[0]+dojo.style.getOuterWidth(this.firstHandle));
_ed0[1]=(this.ralativePositionFirst[1]<0)?(this.ralativePositionFirst[1]-15):(this.ralativePositionFirst[0]+dojo.style.getOuterHeight(this.firstHandle));
var _ed2=(this.currentValue.lower-this.startRange)*this.pixelsPerUnit+32-dojo.style.getOuterWidth(_ece)/2;
_ed2=24;
if(this.showTooltip){
_ece.tempHandle=this.firstTooltip;
dojo.style.hide(this.firstTooltip);
if(this.showTooltipAllTime){
dojo.style.show(this.firstTooltip);
}
}else{
dojo.style.hide(this.firstTooltip);
}
_ed1=52;
}else{
if(name=="second"){
_ed0[0]=(this.ralativePositionSecond[0]<0)?(this.ralativePositionSecond[0]-20):(this.ralativePositionSecond[0]+dojo.style.getOuterWidth(this.secondHandle));
_ed0[1]=(this.ralativePositionSecond[1]<0)?(this.ralativePositionSecond[1]-15):(this.ralativePositionSecond[0]+dojo.style.getOuterHeight(this.secondHandle));
var _ed2=(this.currentValue.upper-this.startRange)*this.pixelsPerUnit+(7+dojo.style.getOuterWidth(_ece)/2);
_ed2=151;
if(this.showTooltip){
_ece.tempHandle=this.secondTooltip;
dojo.style.hide(this.secondTooltip);
if(this.showTooltipAllTime){
dojo.style.show(this.secondTooltip);
}
}else{
dojo.style.hide(this.secondTooltip);
}
_ed1=90;
}else{
dojo.debug("RangeSlider Widget: Something is wrong with name:"+name+" in this.setupSlider(handle, name)");
}
}
if(this.snapToGrid){
_ed2=this.getPixelValue(this.getUnitValue(_ed2));
}
_ece.style.left=_ed2+"px";
_ece.style.top="-3px";
if(this.showTooltip){
_ece.tempHandle.style.position="absolute";
_ece.tempHandle.style.top=25+"px";
_ece.tempHandle.style.left=_ed2+"px";
}
this.valueChanged(name);
//console.log("setupSlider ["+name+"] END");
};
this.round=function(_ed3){
return dojo.math.round(_ed3,this.decimalPoints);
};
this.setUnitPosition=function(node,_ed5){
var _ed6=(_ed5-this.startRange)*this.pixelsPerUnit+this.startLimit;
this.setPixelPosition(node,_ed6);
};
this.setPixelPosition=function(node,_ed8){
//console.log("setPixelPosition ["+node.name+"] START");
this.currentHandle=node;
var _ed9=_ed8;
var _eda=this.getPixelValue(0)-5;
//console.log("setPixelPosition _startLimit: " + _eda);
var _edb=this.getPixelValue(this.totalRange)-16;
//console.log("setPixelPosition _endLimit: " + _edb);
var _edc=[];
if(node.name=="first"){
//_edb=dojo.style.getAbsolutePosition(this.secondHandle,true).x-80;
this.secondHandle.style.zIndex=10;
this.secondTooltip.style.zIndex=30;
this.firstHandle.style.zIndex=20;
this.firstTooltip.style.zIndex=40;
_edc[0]=(this.ralativePositionFirst[0]<0)?(this.ralativePositionFirst[0]-dojo.style.getOuterWidth(this.firstTooltip)):(this.ralativePositionFirst[0]+dojo.style.getOuterWidth(this.firstHandle));
_edc[1]=(this.ralativePositionFirst[1]<0)?(this.ralativePositionFirst[1]-dojo.style.getOuterHeight(this.firstTooltip)):(this.ralativePositionFirst[0]+dojo.style.getOuterHeight(this.firstHandle));
}else{
if(node.name=="second"){
//_eda=dojo.style.getAbsolutePosition(this.firstHandle,true).x-55;
_edb=dojo.style.getAbsolutePosition(this.secondHandle,true).x-80;
this.firstHandle.style.zIndex=10;
this.firstTooltip.style.zIndex=30;
this.secondHandle.style.zIndex=20;
this.secondTooltip.style.zIndex=40;
_edc[0]=(this.ralativePositionSecond[0]<0)?(this.ralativePositionSecond[0]-dojo.style.getOuterWidth(this.secondTooltip)):(this.ralativePositionSecond[0]+dojo.style.getOuterWidth(this.secondHandle));
_edc[1]=(this.ralativePositionSecond[1]<0)?(this.ralativePositionSecond[1]-dojo.style.getOuterHeight(this.secondTooltip)):(this.ralativePositionSecond[0]+dojo.style.getOuterHeight(this.secondHandle));
}else{
dojo.debug("RangeSlider Widget: Something is wrong with node.name:"+name+" in this.setPixelPosition(node,pixelValue)");
}
}
//console.log("setPixelPosition [" + _eda + "] <= [" + _ed9 + "] <= [" + _edb + "]");
if(_eda<=_ed9&&_ed9<=_edb){
if(this.snapToGrid&&!this.activeDrag){
_ed8=this.getPixelValue(this.getUnitValue(_ed8));
}
node.style.left=_ed8+"px";
dojo.style.show(node.tempHandle);
if(this.showTooltip){
node.tempHandle.style.position="absolute";
node.tempHandle.style.left=(_ed8)+"px";
node.tempHandle.style.top=25+"px";
}
this.valueChanged(node.name);
}
//console.log("setPixelPosition ["+node.name+"] END");
};
this.getUnitValue=function(_edd){
var _ede=this.startLimit;
//alert("this.startLimit: " + _ede);
var last=_edd;
//alert("this.startRange+(last-_ede): " + this.startRange+(last-_ede));
//alert("this.pixelsPerUnit: " + this.pixelsPerUnit);
var res=this.startRange+(last-_ede)/this.pixelsPerUnit;
//alert("res: " + res);
//alert("this.incrementValue: " + this.incrementValue);
var res=this.round(res/this.incrementValue)*this.incrementValue;
//alert("res2: " + res);
if(res<this.startRange){
res=this.startRange;
}
if(res>this.endRange){
res=this.endRange;
}
//alert("result: " + res);
return res;
};
this.getPixelValue=function(_ee1){
_ee1=this.round(_ee1/this.incrementValue)*this.incrementValue;
var _ee2=this.startLimit;
var last=_ee1*this.pixelsPerUnit;
var res=(_ee2+last);
if(res<this.startLimit){
res=this.startLimit;
}
if(res>this.endLimit){
res=this.endLimit;
}
return res;
};
this.getCloserSliderHandle=function(_ee5){
//console.log("getCloserSliderHandle START");
var _ee6=dojo.style.getAbsolutePosition(this.firstHandle,true).x+dojo.style.getOuterWidth(this.firstHandle)/2;
var _ee7=dojo.style.getAbsolutePosition(this.secondHandle,true).x+dojo.style.getOuterWidth(this.secondHandle)/2;
var _ee8=_ee5-_ee6;
var _ee9=_ee7-_ee5;
if(_ee8<=_ee9){
return this.firstHandle;
}else{
return this.secondHandle;
}
//console.log("getCloserSliderHandle END");
};
this.getCurrentValues=function(){
return this.currentValue;
};
this.valueChanged=function(_eea){
//console.log("valueChanged START");
var contentCtr = dojo.byId('content-inner');
//console.log("contentCtr: " + dojo.style.getAbsolutePosition(contentCtr,true).x);
if(_eea=="first"||_eea=="*"){
//console.log("Lowest Price: "+ this.defaultStart);
//console.log("dojo.style.getOuterWidth(this.firstHandle) " + dojo.style.getOuterWidth(this.firstHandle)); 	
//console.log("dojo.style.getAbsolutePosition(this.firstHandle,true).x :" + (dojo.style.getAbsolutePosition(this.firstHandle,true).x));
var _currentXPos = dojo.style.getAbsolutePosition(this.firstHandle,true).x;
//console.log("_currentXPos: " + _currentXPos);
var _marginEE = (dojo.style.getAbsolutePosition(contentCtr,true).x + dojo.style.getOuterWidth(this.firstHandle) + this.defaultStart);
//console.log("_marginEE: " + _marginEE);
var _currentPos = _currentXPos - _marginEE;
//console.log("_currentPos: " + _currentPos);
this.currentValue.lower=Math.floor(this.getUnitValue(_currentPos));
//console.log("this.currentValue.lower: "+this.currentValue.lower);
}
if(_eea=="second"||_eea=="*"){
//console.log("Highest Price: "+ this.defaultEnd);
//console.log("this.startRange "+ this.startRange);
//console.log("this.totalRange "+ this.totalRange);
//console.log("dojo.style.getOuterWidth(this.secondHandle) " + dojo.style.getOuterWidth(this.secondHandle));
//console.log("this.getUnitValue(dojo.style.getAbsolutePosition(this.secondHandle,true).x) :" + this.getUnitValue(dojo.style.getAbsolutePosition(this.secondHandle,true).x));
var _currentXPos = dojo.style.getAbsolutePosition(this.secondHandle,true).x;
//console.log("_currentXPos: " + _currentXPos);
var _marginEE = (dojo.style.getAbsolutePosition(contentCtr,true).x)+dojo.style.getOuterWidth(this.secondHandle);
//console.log("_marginEE: " + _marginEE);
//var _currentPos = this.getUnitValue(dojo.style.getAbsolutePosition(this.secondHandle,true).x);
var _currentPos = (_currentXPos+this.startRange) - _marginEE;
//console.log("_currentPos: " + _currentPos);
//this.currentValue.upper=this.round(this.getUnitValue(_currentPos));
this.currentValue.upper=Math.floor(this.getUnitValue(_currentPos));
//console.log("this.currentValue.upper: "+this.currentValue.upper);
}

var _eeb=this.currentValue.lower;
var _eec=this.currentValue.upper;
if(this.currencyCode!=null&&(this.currencyCode=="RWP"||this.currencyCode=="")){
_eeb="&nbsp;"+_eeb;
_eec="&nbsp;"+_eec;
}else{
if(this.currencyCode!=null&&this.currencyCode!=""){
_eeb=dojo.i18n.currency.format(_eeb,this.currencyCode,{places:0});
_eec=dojo.i18n.currency.format(_eec,this.currencyCode,{places:0});
}
}
if(this.showTooltip){
this.firstTooltip.innerHTML=this.prefix+_eeb+this.suffix;
this.secondTooltip.innerHTML=this.prefix+_eec+this.suffix;
}
this.onChange(this);
//console.log("valueChanged END");
};
this.onSliderBarClick=function(e){
//console.log("onSliderBarClick START");
var _eee=dojo.html.getScrollOffset().x+e.clientX;
var node=this.getCloserSliderHandle(_eee);
_eee=_eee-dojo.style.getOuterWidth(node)/2;
//console.log("pixelValue" + _eee);
this.setPixelPosition(node,_eee);
this.onChangeMade(this);
//console.log("onSliderBarClick END");
};
this.onDragEnd=function(e){
//console.log("onDragEnd START");
if(this.snapToGrid&&this.activeDrag&&this.currentHandle!==null){
var _ef1=this.getPixelValue(this.getUnitValue(dojo.style.getAbsolutePosition(this.currentHandle,true).x));
this.currentHandle.style.left=_ef1+"px";
}
if(!this.showTooltipAllTime){
dojo.style.hide(this.firstTooltip);
dojo.style.hide(this.secondTooltip);
}
this.onChangeMade(this);
//console.log("onDragEnd END");
};
this.onFirstMouseOver=function(){
if(!this.showTooltipAllTime){
dojo.style.show(this.firstTooltip);
}
dojo.html.addClass(this.firstHandle,"rangeSelectorHandleHover");
};
this.onFirstMouseOut=function(){
if(!this.showTooltipAllTime){
dojo.style.hide(this.firstTooltip);
}
dojo.html.removeClass(this.firstHandle,"rangeSelectorHandleHover");
};
this.onSecondMouseOver=function(){
if(!this.showTooltipAllTime){
dojo.style.show(this.secondTooltip);
}
dojo.html.addClass(this.secondHandle,"rangeSelectorHandleHover");
};
this.onSecondMouseOut=function(){
if(!this.showTooltipAllTime){
dojo.style.hide(this.secondTooltip);
}
dojo.html.removeClass(this.secondHandle,"rangeSelectorHandleHover");
};
this.onDragMove=function(e){
};
this.onClick=function(e){
};
this.onChange=function(e){
};
this.onChangeMade=function(e){
};
this.onWindowResized=function(){
this.setupSlider(this.firstHandle,"first");
this.setupSlider(this.secondHandle,"second");
};
};
dojo.inherits(wc.widget.RangeSlider,dojo.widget.HtmlWidget);
dojo.widget.tags.addParseTreeHandler("dojo:RangeSlider");
dojo.declare("dojo.widget.SliderDragMoveSource",dojo.dnd.HtmlDragMoveSource,{isDragInProgress:false,slider:null,onDragStart:function(e){
var _ef7=this.createDragMoveObject();
dojo.event.connect(_ef7,"onDragMove",this,"onDragMove");
return _ef7;
},onDragMove:function(e){
},createDragMoveObject:function(){
var _ef9=new dojo.widget.SliderDragMoveObject(this.dragObject,this.type);
_ef9.slider=this.slider;
if(this.dragClass){
_ef9.dragClass=this.dragClass;
}
return _ef9;
},setParent:function(_efa){
this.slider=_efa;
}});
dojo.declare("dojo.widget.SliderDragMoveObject",dojo.dnd.HtmlDragMoveObject,{slider:null,onDragMove:function(e){
//console.log("onDragMove START");
if(this.slider.isEnableX&&0==this.slider.valueSizeX){
this.slider.valueSizeX=(this.constraints.maxX-this.constraints.minX)/this.slider.valuesX;
}
if(this.slider.isEnableY&&0==this.slider.valueSizeY){
this.slider.valueSizeY=(this.constraints.maxY-this.constraints.minY)/this.slider.valuesY;
}
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
//console.log("x " + x);
this.slider.setPixelPosition(this.domNode,x);
//console.log("onDragMove END");
}});
dojo.provide("wc.widget.RefreshArea");
dojo.widget.defineWidget("wc.widget.RefreshArea",dojo.widget.HtmlWidget,{isContainer:true,controllerId:"",objectId:"",controller:null,initialize:function(){
this.controller=wc.render.getRefreshControllerById(this.controllerId);
if(!this.controller){
throw new Error("Could not locate RefreshController \""+this.controllerId+"\".");
}
this.controller.addWidget(this);
this.containerNode=this.domNode;
},destroy:function(){
this.controller.removeWidget(this);
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},refresh:function(_efe){
if(!_efe){
_efe={};
}
_efe.objectId=this.objectId;
this.controller.refresh(this,_efe);
},setInnerHTML:function(html){
this.destroyChildren();
this.containerNode.innerHTML=html;
var _f00=new dojo.xml.Parse();
var frag=_f00.parseElement(this.containerNode,null,true);
dojo.widget.getParser().createSubComponents(frag,this);
}});
dojo.provide("wc.widget.ScrollablePane");
dojo.require("dojo.event");
dojo.widget.defineWidget("wc.widget.ScrollablePane",dojo.widget.HtmlWidget,{identifier:"",widgetType:"ScrollablePane",isContainer:true,snarfChildDomOutput:true,templateString:"<div dojoAttachPoint=\"widgetContainer\" >\r\n\t<table>\r\n\t\t<tr>\r\n\t\t\t<td>\r\n\t\t\t\t<div dojoAttachPoint=\"moveBackwardContainer\">\r\n\t\t\t\t\t<div dojoAttachPoint=\"moveBackwardButton\" \r\n\t\t\t\t\t\t dojoAttachEvent=\"onClick: backward; onMouseOver: onBackwardMouseOver; onMouseOut: onBackwardMouseOut;\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\r\n\t\t\t<td>\r\n\t\t\t\t<div id=\"${this.widgetId}_container\" \r\n\t\t\t\t\tdojoAttachPoint=\"containerNode\" \r\n\t\t\t\t\tdojoAttachEvent=\"onMouseOver:onContainerMouseOver; onMouseOut:onContainerMouseOut;\">\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\r\n\t\t\t<td>\r\n\t\t\t\t<div dojoAttachPoint=\"moveForwardContainer\">\r\n\t\t\t\t\t<div dojoAttachPoint=\"moveForwardButton\" \r\n\t\t\t\t\tdojoAttachEvent=\"onClick: forward; onMouseOver: onForwardMouseOver; onMouseOut: onForwardMouseOut;\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n",elements:[],objectArray:[],elementCount:0,forwardAnimation:null,backwardAnimation:null,oldReference:0,direction:"forward",backwardLimit:0,forwardLimit:100,padding:10,pixelsToMove:-1,elementsToMove:1,duration:1500,repeatCount:-1,direction:"forward",acceleration:0,exitEffect:"clip fade",widgetDimension:-1,noElementToDisplay:-1,mouseOverTimeOut:2000,stopButtonId:"",isHorozontal:true,widgetContainer:null,moveBackwardContainer:null,moveForwardContainer:null,moveBackwardButton:null,moveForwardButton:null,containerNode:null,widgetContainerClass:"",moveBackwardButtonClass:"",containerNodeClass:"",moveForwardButtonClass:"",moveForwardButtonHoverClass:"",moveBackwardButtonHoverClass:"",scrollablePaneElementsClass:"",onForward:function(){
},onBackward:function(){
},isMouseOverNow:false,zIndex:999,translatedTextBundle:new Object(),fillInTemplate:function(args,frag){
dojo.html.disableSelection(this.widgetContainer);
dojo.html.addClass(this.widgetContainer,this.widgetContainerClass);
dojo.html.addClass(this.moveForwardButton,this.moveForwardButtonClass);
dojo.html.addClass(this.containerNode,this.containerNodeClass);
dojo.html.addClass(this.moveBackwardButton,this.moveBackwardButtonClass);
dojo.html.hide(this.widgetContainer);
this.objectArray=[];
var tmp=dojo.dom.getFirstChildElement(this.containerNode);
while(tmp){
var _f05=new Object();
_f05.domNode=tmp;
_f05.left=0;
_f05.top=0;
_f05.Width=0;
_f05.Height=0;
this.objectArray.push(_f05);
tmp=dojo.dom.getNextSiblingElement(tmp);
}
if(this.stopButtonId!=null&&this.stopButtonId!=""){
var _f06=dojo.byId(this.stopButtonId);
if(_f06!=null){
dojo.event.connect(_f06,"onclick",this,"playPause");
}
}
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
this.fadeEffect=false;
this.clipEffect=false;
this.hideEffect=false;
if(this.exitEffect.indexOf("fade")>-1){
this.fadeEffect=true;
}
if(this.exitEffect.indexOf("clip")>-1){
this.clipEffect=true;
}
if(this.exitEffect.indexOf("hide")>-1){
this.hideEffect=true;
}
if(this.objectArray!==null&&this.objectArray.length>0){
dojo.lang.setTimeout(this,"initWidget",0);
}
},initWidget:function(){
dojo.html.show(this.widgetContainer);
var _f07=this.getChildrenOfType(dojo.widget.HtmlWidget);
var _f08=0;
for(var i=0;i<this.objectArray.length;i++){
if(dojo.html.hasAttribute(this.objectArray[i]["domNode"],"dojoType")){
var _f0a=this.objectArray[i]["domNode"];
this.objectArray.splice(i,1);
var _f0b=new Object();
_f0b.domNode=_f07[_f08].domNode;
_f0b.left=0;
_f0b.top=0;
_f0b.Width=0;
_f0b.Height=0;
this.objectArray.splice(i,0,_f0b);
_f0a.parentNode.appendChild(_f07[_f08++].domNode);
dojo.dom.removeNode(_f0a);
}
}
if(this.isHorozontal){
this.axes="x";
this.pos="left";
this.dim="Width";
this._pos="top";
this._dim="Height";
}else{
this.axes="y";
this.pos="top";
this.dim="Height";
this._pos="left";
this._dim="Width";
}
this.left=this.getAbsolutePosition(this.widgetContainer,true).x;
this.top=this.getAbsolutePosition(this.widgetContainer,true).y;
var _f0c=0;
for(var i=0;i<this.objectArray.length;i++){
this.objectArray[i][this._dim]=this.getAbsoluteDimension(this.objectArray[i]["domNode"])[this.dim];
this.objectArray[i][this.dim]=this.getAbsoluteDimension(this.objectArray[i]["domNode"])[this._dim];
if(this.objectArray[i][this._dim]>_f0c){
_f0c=this.objectArray[i][this._dim];
}
}
if(this.noElementToDisplay==-1){
if(this.widgetDimension==-1){
this.widgetDimension=200;
}
}else{
this.widgetDimension=(this.noElementToDisplay*this.getAbsoluteDimension(this.objectArray[0]["domNode"])[this.dim])+((this.noElementToDisplay+1)*this.padding);
}
this.moveBackwardContainer.style.position="relative";
this.moveBackwardContainer.style.zIndex=this.zIndex;
this.moveBackwardContainer.style[this.pos]=0+"px";
this.moveBackwardContainer.style[this._pos]=(_f0c/2)-(this.getAbsoluteDimension(this.moveBackwardContainer)[this._dim]/2)+"px";
var _f0d=this.dim+":"+this.widgetDimension+"px";
dojo.html.setStyleAttributes(this.containerNode,_f0d);
var _f0e=this._dim+":"+_f0c+"px";
dojo.html.setStyleAttributes(this.widgetContainer,_f0e);
this.moveForwardContainer.style.position="relative";
this.moveForwardContainer.style.zIndex=this.zIndex;
this.moveForwardContainer.style[this.pos]=0+"px";
this.moveForwardContainer.style[this._pos]=(_f0c/2)-(this.getAbsoluteDimension(this.moveForwardContainer)[this._dim]/2)+"px";
this.backwardLimit=this.getAbsolutePosition(this.moveBackwardContainer,true)[this.axes]+this.getAbsoluteDimension(this.moveBackwardContainer)[this.dim]+this.padding;
this.forwardLimit=this.getAbsolutePosition(this.moveForwardContainer,true)[this.axes]-this.padding;
if(!(this.exitEffect.indexOf("clip")>-1)&&!(this.exitEffect.indexOf("hide")>-1)){
this.exitEffect=this.exitEffect+" clip";
}
dojo.html.addClass(this.objectArray[0]["domNode"],this.scrollablePaneElementsClass);
this.objectArray[0][this._pos]=this[this._pos]+(_f0c/2)-(this.objectArray[0][this._dim]/2);
this.objectArray[0][this.pos]=this.getAbsolutePosition(this.moveBackwardContainer,true)[this.axes]+this.getAbsoluteDimension(this.moveBackwardContainer)[this.dim]+this.padding;
this.objectArray[0]["domNode"].style.position="absolute";
this.objectArray[0]["domNode"].style[this.pos]=this.objectArray[0][this.pos]+"px";
this.objectArray[0]["domNode"].style[this._pos]=this.objectArray[0][this._pos]+"px";
this.elementCount=this.objectArray.length;
for(var i=1;i<this.elementCount;i++){
dojo.html.addClass(this.objectArray[i]["domNode"],this.scrollablePaneElementsClass);
this.objectArray[i][this._pos]=this[this._pos]+(_f0c/2)-(this.objectArray[i][this._dim]/2);
this.objectArray[i][this.pos]=this.getAbsolutePosition(this.objectArray[i-1]["domNode"],true)[this.axes]+this.objectArray[i-1][this.dim]+this.padding;
this.objectArray[i]["domNode"].style.position="absolute";
this.objectArray[i]["domNode"].style[this.pos]=this.objectArray[i][this.pos]+"px";
this.objectArray[i]["domNode"].style[this._pos]=this.objectArray[i][this._pos]+"px";
}
for(var i=0;i<this.elementCount;i++){
this.applyEffects(this.objectArray[i]);
}
if(this.repeatCount==-1){
if(this.direction=="forward"){
this.forward();
}else{
this.backward();
}
}
this.updatePlayPauseLabel();
},forward:function(){
if(this.backwardAnimation!=null&&(this.backwardAnimation.status()=="playing"||this.backwardAnimation.status()=="paused")){
this.backwardAnimation.stop();
}
if(this.forwardAnimation!=null&&(this.forwardAnimation.status()=="playing")){
this.forwardAnimation.gotoPercent(100,true);
this.forwardAnimation.stop();
for(var i=0;i<this.elementCount;i++){
this.applyEffects(this.objectArray[i]);
}
dojo.lang.setTimeout(this,"playAnimationOnTimeOut",this.mouseOverTimeOut);
}else{
if(this.pixelsToMove==-1){
if(this.elementsToMove<=1){
if(this.repeatCount==-1){
var _f10=this.forwardLimit-this.objectArray[this.getForwardElementIndex()][this.dim]-this.padding;
}else{
var _f10=this.getAbsolutePosition(this.objectArray[this.getForwardElementIndex()]["domNode"],true)[this.axes]-this.padding;
}
var end=this.forwardLimit;
}else{
var _f12=this.elementCount-1;
if(this.elementsToMove>=this.elementCount){
this.elementsToMove=this.elementCount-1;
}
if(this.repeatCount==-1){
var _f10=this.forwardLimit-this.padding;
}else{
var _f10=this.getAbsolutePosition(this.objectArray[this.getForwardElementIndex()]["domNode"],true)[this.axes]+this.objectArray[this.getForwardElementIndex()][this.dim];
}
for(var i=0;i<this.elementsToMove;i++){
if((this.getForwardElementIndex()-i)<0){
_f10=_f10-this.objectArray[_f12][this.dim]-this.padding;
_f12--;
}else{
_f10=_f10-this.objectArray[this.getForwardElementIndex()-i][this.dim]-this.padding;
}
var end=this.forwardLimit-this.padding/2;
}
}
}else{
var _f10=0;
var end=this.pixelsToMove;
}
if(this.isHorozontal){
var _f13=new dojo.math.curves.Line([_f10,0],[end,0]);
}else{
var _f13=new dojo.math.curves.Line([0,_f10],[0,end]);
}
this.oldReference=_f10;
this.oldReference_bak=_f10;
this.direction="forward";
this.forwardAnimation=new dojo.animation.Animation(_f13,this.duration,this.acceleration,this.repeatCount);
dojo.event.connect(this.forwardAnimation,"handler",this,"movementHandler");
this.currentAnimation=this.forwardAnimation;
this.forwardAnimation.playPause();
this.onForward();
}
},backward:function(){
if(this.forwardAnimation!=null&&(this.forwardAnimation.status()=="playing"||this.forwardAnimation.status()=="paused")){
this.forwardAnimation.stop();
}
if(this.backwardAnimation!=null&&(this.backwardAnimation.status()=="playing")){
this.backwardAnimation.gotoPercent(100,true);
this.backwardAnimation.stop();
for(var i=0;i<this.elementCount;i++){
this.applyEffects(this.objectArray[i]);
}
dojo.lang.setTimeout(this,"playAnimationOnTimeOut",this.mouseOverTimeOut);
}else{
if(this.pixelsToMove==-1){
if(this.elementsToMove==1){
if(this.repeatCount==-1){
var _f15=this.backwardLimit+this.objectArray[this.getBackwardElementIndex()][this.dim]+this.padding;
}else{
var _f15=this.getAbsolutePosition(this.objectArray[this.getBackwardElementIndex()]["domNode"],true)[this.axes]+this.objectArray[this.getBackwardElementIndex()][this.dim]+this.padding;
}
var end=this.backwardLimit;
}else{
var _f17=0;
if(this.repeatCount==-1){
var _f15=this.backwardLimit+this.padding;
}else{
var _f15=this.getAbsolutePosition(this.objectArray[this.getBackwardElementIndex()]["domNode"],true)[this.axes];
}
if(this.elementsToMove>=this.elementCount){
this.elementsToMove=this.elementCount-1;
}
for(var i=0;i<this.elementsToMove;i++){
if((this.getBackwardElementIndex()+i)>=this.elementCount){
_f15=_f15+this.objectArray[_f17][this.dim]+this.padding;
_f17++;
}else{
_f15=_f15+this.objectArray[this.getBackwardElementIndex()+i][this.dim]+this.padding;
}
var end=this.backwardLimit+this.padding/2;
}
}
}else{
var _f15=this.pixelsToMove;
var end=0;
}
if(this.isHorozontal){
var _f18=new dojo.math.curves.Line([_f15,0],[end,0]);
}else{
var _f18=new dojo.math.curves.Line([0,_f15],[0,end]);
}
this.oldReference=_f15;
this.oldReference_bak=_f15;
this.direction="backward";
this.backwardAnimation=new dojo.animation.Animation(_f18,this.duration,this.acceleration,this.repeatCount);
dojo.event.connect(this.backwardAnimation,"handler",this,"movementHandler");
this.currentAnimation=this.backwardAnimation;
this.backwardAnimation.playPause();
this.onBackward();
}
},playPause:function(_f19){
if(this.currentAnimation!=null){
this.currentAnimation.playPause();
this.updatePlayPauseLabel();
}
},updatePlayPauseLabel:function(){
if(this.stopButtonId!=null&&this.stopButtonId!=""){
var _f1a=document.getElementById(this.stopButtonId);
var _f1b="";
if(this.currentAnimation!=null&&this.currentAnimation.status()=="playing"){
_f1b=(this.translatedTextBundle["Pause"]!=null||this.translatedTextBundle["Pause"]!="")?this.translatedTextBundle["Pause"]:"Pause";
}
if(this.currentAnimation!=null&&this.currentAnimation.status()=="paused"){
_f1b=(this.translatedTextBundle["Play"]!=null||this.translatedTextBundle["Play"]!="")?this.translatedTextBundle["Play"]:"Play";
}
if(_f1a.innerHTML!=null){
_f1a.innerHTML=_f1b;
}
if(_f1a.value!=null){
_f1a.innerHTML=_f1b;
}
}
},movementHandler:function(e){
switch(e.type){
case "play":
var _f1d=this.objectArray[0];
var _f1e=this.objectArray[this.elementCount-1];
if(this.direction=="backward"){
if((_f1d[this.pos]+_f1d[this.dim])<this.backwardLimit){
_f1d[this.pos]=(_f1e[this.pos]+_f1e[this.dim])+this.padding;
this.objectArray.push(_f1d);
this.objectArray.splice(0,1);
}
}
if(this.direction=="forward"){
if(_f1e[this.pos]>this.forwardLimit){
_f1e[this.pos]=_f1d[this.pos]-_f1e[this.dim]-this.padding;
var temp=_f1e;
this.objectArray.splice(this.elementCount-1,1);
this.objectArray.splice(0,0,temp);
}
}
break;
case "pause":
break;
case "animate":
var _f20=e[this.axes];
var _f21=this.oldReference-_f20;
if(_f21!=0){
var i=this.elementCount-1;
do{
var _f23=this.objectArray[i];
_f23[this.pos]=_f23[this.pos]-_f21;
if(_f23[this.pos]<this.backwardLimit){
if((_f23[this.pos]+_f23[this.dim])>this.backwardLimit){
_f23["domNode"].style[this.pos]=_f23[this.pos]+"px";
this.applyEffects(_f23);
}
}else{
if((_f23[this.pos]+_f23[this.dim])>this.forwardLimit){
if(_f23[this.pos]<this.forwardLimit){
_f23["domNode"].style[this.pos]=_f23[this.pos]+"px";
this.applyEffects(_f23);
}
}else{
_f23["domNode"].style[this.pos]=_f23[this.pos]+"px";
}
}
}while(i--);
this.oldReference=_f20;
}
break;
case "end":
this.oldReference=this.oldReference_bak;
break;
}
},applyEffects:function(_f24){
var _f25=_f24["domNode"].style;
var _f26=false;
var _f27=this.backwardLimit;
if(_f24[this.pos]<_f27){
_f26=true;
if(this.hideEffect){
_f25.visibility="hidden";
}else{
if(this.clipEffect){
var clip=_f27-_f24[this.pos];
if(this.isHorozontal){
_f25.clip="rect(auto, auto, auto,"+clip+"px)";
}else{
_f25.clip="rect("+clip+"px, auto, auto, auto)";
}
}
}
}
var _f29=this.forwardLimit;
if((_f24[this.pos]+_f24[this.dim])>this.forwardLimit){
_f26=true;
if(this.hideEffect){
_f25.visibility="hidden";
}else{
if(this.clipEffect){
var clip=_f29-_f24[this.pos];
if(this.isHorozontal){
_f25.clip="rect(auto, "+clip+"px, auto, auto)";
}else{
_f25.clip="rect(auto, auto, "+clip+"px, auto)";
}
}
}
}
if(!_f26){
_f25.clip="rect(auto, auto, auto, auto)";
_f25.visibility="visible";
}
},onContainerMouseOver:function(){
this.isMouseOverNow=true;
if(this.currentAnimation!=null){
this.currentAnimation.pause();
}
},onContainerMouseOut:function(){
this.isMouseOverNow=false;
dojo.lang.setTimeout(this,"playAnimationOnContainerMouseOut",this.mouseOverTimeOut);
},playAnimationOnContainerMouseOut:function(){
if(this.currentAnimation!=null&&!this.isMouseOverNow){
if(this.currentAnimation.status()=="paused"){
this.currentAnimation.playPause();
}
}
},playAnimationOnTimeOut:function(){
if(this.currentAnimation!=null&&(this.currentAnimation.status()=="stopped")){
for(var i=0;i<this.elementCount;i++){
this.applyEffects(this.objectArray[i]);
}
this.currentAnimation.play();
}
},getAbsolutePosition:function(node,flag){
var _f2d=new Object();
_f2d.x=dojo.html.getAbsolutePosition(node,flag).left;
_f2d.y=dojo.html.getAbsolutePosition(node,flag).top;
return _f2d;
},getAbsoluteDimension:function(node){
var _f2f=new Object();
_f2f.Width=dojo.html.getOuterWidth(node);
_f2f.Height=dojo.html.getOuterHeight(node);
return _f2f;
},setAbsoluteDimension:function(node,_f31,dim){
if(dim=="Width"){
dojo.html.setOuterWidth(node,_f31);
}else{
if(dim=="Height"){
dojo.html.setOuterHeight(node,_f31);
}else{
alert("Parameter dim was not recognized!!");
}
}
},setAbsolutePosition:function(node,_f34,pos){
if(pos=="left"){
node.style.left=_f34+"px";
}else{
if(pos=="top"){
node.style.top=_f34+"px";
}else{
alert("Parameter pos was not recognized!!");
}
}
},getBackwardElementIndex:function(){
var _f36=0;
for(var i=this.elementCount-1;i>=0;i--){
if(this.backwardLimit<this.objectArray[i][this.pos]+this.objectArray[i][this.dim]){
_f36=i;
}
}
return _f36;
},getForwardElementIndex:function(){
var _f38=this.elementCount-1;
for(var i=0;i<this.elementCount;i++){
if(this.forwardLimit>this.objectArray[i][this.pos]){
_f38=i;
}
}
return _f38;
},onBackwardMouseOver:function(){
dojo.html.removeClass(this.moveBackwardButton,this.moveBackwardButtonClass);
dojo.html.addClass(this.moveBackwardButton,this.moveBackwardButtonHoverClass);
},onBackwardMouseOut:function(){
dojo.html.removeClass(this.moveBackwardButton,this.moveBackwardButtonHoverClass);
dojo.html.addClass(this.moveBackwardButton,this.moveBackwardButtonClass);
},onForwardMouseOver:function(){
dojo.html.removeClass(this.moveForwardButton,this.moveForwardButtonClass);
dojo.html.addClass(this.moveForwardButton,this.moveForwardButtonHoverClass);
},onForwardMouseOut:function(){
dojo.html.removeClass(this.moveForwardButton,this.moveForwardButtonHoverClass);
dojo.html.addClass(this.moveForwardButton,this.moveForwardButtonClass);
},onWindowResized:function(){
this.backwardLimit=this.getAbsolutePosition(this.moveBackwardContainer,true)[this.axes]+this.getAbsoluteDimension(this.moveBackwardContainer)[this.dim]+this.padding;
this.forwardLimit=this.getAbsolutePosition(this.moveForwardContainer,true)[this.axes]-this.padding;
for(var i=0;i<this.elementCount;i++){
this.applyEffects(this.objectArray[i]);
}
}});
dojo.provide("dojo.widget.AccordionContainer");
dojo.widget.defineWidget("dojo.widget.AccordionContainer",dojo.widget.HtmlWidget,{isContainer:true,labelNodeClass:"label",containerNodeClass:"accBody",duration:250,fillInTemplate:function(){
with(this.domNode.style){
if(position!="absolute"){
position="relative";
}
overflow="hidden";
}
},addChild:function(_f3b){
var _f3c=this._addChild(_f3b);
this._setSizes();
return _f3c;
},_addChild:function(_f3d){
if(_f3d.open){
dojo.deprecated("open parameter deprecated, use 'selected=true' instead will be removed in ","0.5");
dojo.debug(_f3d.widgetId+": open == "+_f3d.open);
_f3d.selected=true;
}
if(_f3d.widgetType!="AccordionPane"){
var _f3e=dojo.widget.createWidget("AccordionPane",{label:_f3d.label,selected:_f3d.selected,labelNodeClass:this.labelNodeClass,containerNodeClass:this.containerNodeClass,allowCollapse:this.allowCollapse});
_f3e.addChild(_f3d);
this.addWidgetAsDirectChild(_f3e);
this.registerChild(_f3e,this.children.length);
return _f3e;
}else{
dojo.html.addClass(_f3d.containerNode,this.containerNodeClass);
dojo.html.addClass(_f3d.labelNode,this.labelNodeClass);
this.addWidgetAsDirectChild(_f3d);
this.registerChild(_f3d,this.children.length);
return _f3d;
}
},postCreate:function(){
var _f3f=this.children;
this.children=[];
dojo.html.removeChildren(this.domNode);
dojo.lang.forEach(_f3f,dojo.lang.hitch(this,"_addChild"));
this._setSizes();
},removeChild:function(_f40){
dojo.widget.AccordionContainer.superclass.removeChild.call(this,_f40);
this._setSizes();
},onResized:function(){
this._setSizes();
},_setSizes:function(){
var _f41=0;
var _f42=0;
dojo.lang.forEach(this.children,function(_f43,idx){
_f41+=_f43.getLabelHeight();
if(_f43.selected){
_f42=idx;
}
});
var _f45=dojo.html.getContentBox(this.domNode);
var y=0;
dojo.lang.forEach(this.children,function(_f47,idx){
var _f49=_f47.getLabelHeight();
_f47.resizeTo(_f45.width,_f45.height-_f41+_f49);
_f47.domNode.style.zIndex=idx+1;
_f47.domNode.style.position="absolute";
_f47.domNode.style.top=y+"px";
y+=(idx==_f42)?dojo.html.getBorderBox(_f47.domNode).height:_f49;
});
},selectChild:function(page){
dojo.lang.forEach(this.children,function(_f4b){
_f4b.setSelected(_f4b==page);
});
var y=0;
var _f4d=[];
dojo.lang.forEach(this.children,function(_f4e,idx){
if(_f4e.domNode.style.top!=(y+"px")){
_f4d.push(dojo.lfx.html.slideTo(_f4e.domNode,{top:y,left:0},this.duration));
}
y+=_f4e.selected?dojo.html.getBorderBox(_f4e.domNode).height:_f4e.getLabelHeight();
},this);
dojo.lfx.combine(_f4d).play();
}});
dojo.widget.defineWidget("dojo.widget.AccordionPane",dojo.widget.HtmlWidget,{label:"","class":"dojoAccordionPane",labelNodeClass:"label",containerNodeClass:"accBody",selected:false,templateString:"<div dojoAttachPoint=\"domNode\">\r\n<div dojoAttachPoint=\"labelNode\" dojoAttachEvent=\"onclick: onLabelClick\" class=\"${this.labelNodeClass}\">${this.label}</div>\r\n<div dojoAttachPoint=\"containerNode\" style=\"overflow: hidden;\" class=\"${this.containerNodeClass}\"></div>\r\n</div>\r\n",templateCssString:".dojoAccordionPane .label {\r\n\tcolor: #000;\r\n\tfont-weight: bold;\r\n\tbackground: url(\"images/soriaAccordionOff.gif\") repeat-x top left #85aeec;\r\n\tborder:1px solid #d9d9d9;\r\n\tfont-size:0.9em;\r\n}\r\n\r\n.dojoAccordionPane-selected .label {\r\n\tbackground: url(\"images/soriaAccordionSelected.gif\") repeat-x top left #85aeec;\r\n\tborder:1px solid #84a3d1;\r\n}\r\n\r\n.dojoAccordionPane .label:hover {\r\n\tcursor: pointer;\r\n}\r\n\r\n.dojoAccordionPane .accBody {\r\n\tbackground: #fff;\r\n\toverflow: auto;\r\n\tborder:1px solid #84a3d1;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/AccordionPane.css"),isContainer:true,fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.AccordionPane.superclass.fillInTemplate.call(this);
dojo.html.disableSelection(this.labelNode);
this.setSelected(this.selected);
},setLabel:function(_f50){
this.labelNode.innerHTML=_f50;
},resizeTo:function(_f51,_f52){
dojo.html.setMarginBox(this.domNode,{width:_f51,height:_f52});
var _f53=[{domNode:this.labelNode,layoutAlign:"top"},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_f53);
var _f54=dojo.html.getContentBox(this.containerNode);
this.children[0].resizeTo(_f54.width,_f54.height);
},getLabelHeight:function(){
return dojo.html.getMarginBox(this.labelNode).height;
},onLabelClick:function(){
this.parent.selectChild(this);
},setSelected:function(_f55){
this.selected=_f55;
(_f55?dojo.html.addClass:dojo.html.removeClass)(this.domNode,this["class"]+"-selected");
var _f56=this.children[0];
if(_f56){
if(_f55){
if(!_f56.isShowing()){
_f56.show();
}else{
_f56.onShow();
}
}else{
_f56.onHide();
}
}
}});
dojo.lang.extend(dojo.widget.Widget,{open:false});
dojo.provide("wc.widget.WCAccordionContainer");
dojo.provide("wc.widget.WCAccordionPane");
dojo.provide("wc.widget.WCAccordionDropTarget");
dojo.provide("wc.widget.TitlePaneTemplate");
dojo.provide("wc.widget.ContentPaneTemplate");
dojo.widget.defineWidget("wc.widget.WCAccordionContainer",dojo.widget.AccordionContainer,{widgetType:"WCAccordionContainer",isContainer:true,labelNodeClass:"",labelNodeClass_Expanded:"",labelNodeClass_Collapsed:"",containerNodeClass:"",containerNodeClass_Collapsed:"",containerNodeClass_Expanded:"",bottomNodeClass:"",bottomNodeClass_Expanded:"",bottomNodeClass_Collapsed:"",_addChild:function(_f57){
var _f58=false;
var _f59=null;
var _f5a=null;
if(_f57.widgetType!="AccordionPane"&&_f57.widgetType!="WCAccordionPane"){
var _f5b=_f57.getChildrenOfType(dojo.widget.HtmlWidget);
dojo.lang.forEach(_f5b,function(node){
if(node.widgetType=="TitlePaneTemplate"){
_f57.label=node.domNode.innerHTML;
dojo.dom.removeNode(node.domNode);
}
if(node.widgetType=="ContentPaneTemplate"){
_f59=node;
_f59.setSelected(_f57.selected);
_f58=true;
}
});
var _f5d=_f57.labelNodeClass;
var _f5e=_f57.labelNodeClass_Expanded;
var _f5f=_f57.labelNodeClass_Collapsed;
var _f60=_f57.bottomNodeClass;
var _f61=_f57.bottomNodeClass_Expanded;
var _f62=_f57.bottomNodeClass_Collapsed;
var _f63=_f57.containerNodeClass;
var _f64=_f57.containerNodeClass_Expanded;
var _f65=_f57.containerNodeClass_Collapsed;
if(_f5d==""){
_f5d=this.labelNodeClass;
}
if(_f5e==""){
_f5e=this.labelNodeClass_Expanded;
}
if(_f5f==""){
_f5f=this.labelNodeClass_Collapsed;
}
if(_f60==""){
_f60=this.bottomNodeClass;
}
if(_f61==""){
_f61=this.bottomNodeClass_Expanded;
}
if(_f62==""){
_f62=this.bottomNodeClass_Collapsed;
}
if(_f63==""){
_f63=this.containerNodeClass;
}
if(_f64==""){
_f64=this.containerNodeClass_Expanded;
}
if(_f65==""){
_f65=this.containerNodeClass_Collapsed;
}
var _f66=dojo.widget.createWidget("WCAccordionPane",{label:_f57.label,selected:_f57.selected,allowCollapse:this.allowCollapse,acceptedTypes:_f57.acceptedTypes,dropEventHandler:_f57.dropEventHandler,labelNodeClass:_f5d,labelNodeClass_Expanded:_f5e,labelNodeClass_Collapsed:_f5f,containerNodeClass:_f63,bottomNodeClass:_f60,bottomNodeClass_Expanded:_f61,bottomNodeClass_Collapsed:_f62});
_f66.addChild(_f57);
this.addWidgetAsDirectChild(_f66);
this.registerChild(_f66,this.children.length);
_f5a=_f66;
}else{
if(_f57.widgetType=="WCAccordionPane"){
_f57.labelNodeClass=this.labelNodeClass;
_f57.labelNodeClass_Expanded=this.labelNodeClass_Expanded;
_f57.labelNodeClass_Collapsed=this.labelNodeClass_Collapsed;
_f57.bottomNodeClass=this.bottomNodeClass;
_f57.bottomNodeClass_Expanded=this.bottomNodeClass_Expanded;
_f57.bottomNodeClass_Collapsed=this.bottomNodeClass_Collapsed;
}
this.addWidgetAsDirectChild(_f57);
this.registerChild(_f57,this.children.length);
_f5a=_f57;
}
if(_f58){
_f5a.contentPaneTemplateNode=_f59;
}
return _f5a;
},_setSizes:function(){
var _f67=0;
var _f68=0;
dojo.lang.forEach(this.children,function(_f69,idx){
_f67+=_f69.getLabelHeight();
if(_f69.selected){
_f68=idx;
}
});
var _f6b=dojo.html.getContentBox(this.domNode);
dojo.lang.forEach(this.children,function(_f6c,idx){
var _f6e=_f6c.getLabelHeight();
var _f6f=_f6b.height-_f67+_f6e;
var _f70=(idx==_f68)?_f6f:_f6e;
_f6c.resizeTo(_f6b.width,_f6f);
dojo.html.setMarginBox(_f6c.domNode,{width:_f6b.width,height:_f70});
if(_f6c.contentPaneTemplateNode!=null){
var _f71=_f6b.height-_f67-_f6e;
dojo.html.setMarginBox(_f6c.contentPaneTemplateNode.domNode,{width:_f6b.width,height:_f71});
}
_f6c.domNode.style.zIndex=idx+1;
});
},selectChild:function(page){
var _f73=dojo.html.getInnerHeight(this.domNode.parentNode);
dojo.lang.forEach(this.children,function(_f74){
_f74.setSelected(_f74==page);
_f73=_f73-_f74.getLabelHeight();
});
var _f75=[];
var to=0;
var from=0;
dojo.lang.forEach(this.children,function(_f78,idx){
this.animationCallback=function(){
};
if(_f78!=null&&_f78.contentPaneTemplateNode!=null){
if(_f78.selected){
this.animationCallback=function(){
_f78.contentPaneTemplateNode.onShow();
};
}
_f78.contentPaneTemplateNode.onHide();
}
if(_f78.selected){
to=_f73+_f78.getLabelHeight();
from=dojo.html.getContentBox(_f78.domNode).height;
}else{
to=_f78.getLabelHeight();
from=dojo.html.getContentBox(_f78.domNode).height;
}
if(to!=from){
_f75.push(dojo.lfx.propertyAnimation(_f78.domNode,{"height":{start:from,end:to}},this.duration,null,{"onEnd":this.animationCallback}));
}
},this);
dojo.lfx.combine(_f75).play();
}});
dojo.widget.defineWidget("wc.widget.WCAccordionPane",dojo.widget.AccordionPane,{widgetType:"WCAccordionPane",labelNodeClass_Expanded:"",labelNodeClass_Collapsed:"",containerNodeClass:"",containerNodeClass_Collapsed:"",containerNodeClass_Expanded:"",bottomNodeClass:"",bottomNodeClass_Expanded:"",bottomNodeClass_Collapsed:"",bottomNode:null,templateString:"<div dojoAttachPoint=\"domNode\">\r\n\t<a dojoAttachEvent=\"onfocus: onLabelClick;\" tabindex=\"0\">\r\n\t\t<div dojoAttachPoint=\"labelNode\" dojoAttachEvent=\"onclick: onLabelClick;\" class=\"${this.labelNodeClass}\">${this.label}</div>\r\n\t</a>\r\n\t<div dojoAttachPoint=\"containerNode\" style=\"overflow: hidden;\" class=\"${this.containerNodeClass}\"></div>\r\n\t\t<div dojoAttachPoint=\"containerNode\" style=\"overflow: hidden;\" class=\"${this.containerNodeClass}\"></div>\r\n\t\t<a dojoAttachEvent=\"onfocus: onLabelClick;\" tabindex=\"0\">\r\n\t\t\t<div dojoAttachPoint=\"bottomNode\" ><br></div>\r\n\t\t</a>\r\n\t</div>\r\n</div>\r\n",dropTarget:null,acceptedTypes:[],dropEventHandler:function(e){
},contentPaneTemplateNode:null,fillInTemplate:function(){
dojo.event.kwConnect({type:"after",srcObj:this,srcFunc:"setSelected",targetObj:this,targetFunc:"setStyles"});
if(this.acceptedTypes.length>0&&this.dropEventHandler!==null){
this.dropTarget=new wc.widget.WCAccordionDropTarget(this.domNode,this.acceptedTypes);
this.dropTarget.setParentAccordion(this);
this.onDropEventHandler=this.dropEventHandler;
}
dojo.html.addClass(this.labelNode,this.labelNodeClass);
dojo.html.addClass(this.containerNode,this.containerNodeClass);
dojo.html.addClass(this.bottomNode,this.bottomNodeClass);
wc.widget.WCAccordionPane.superclass.fillInTemplate.call(this);
},postCreate:function(){
if(this.label){
this.labelNode.innerHTML=this.label;
}
},getLabelHeight:function(){
return dojo.html.getMarginBox(this.labelNode).height+dojo.html.getMarginBox(this.bottomNode).height;
},onDropEventHandler:function(e){
},setStyles:function(_f7c){
this.selected=_f7c;
dojo.html.addClass(this.bottomNode,this.bottomNodeClass);
dojo.html.addClass(this.labelNode,this.labelNodeClass);
if(this.selected){
if(this.labelNodeClass_Expanded!=""){
dojo.html.removeClass(this.labelNode,this.labelNodeClass);
dojo.html.removeClass(this.labelNode,this.labelNodeClass_Collapsed);
dojo.html.addClass(this.labelNode,this.labelNodeClass_Expanded);
}
if(this.bottomNodeClass_Expanded!=""){
dojo.html.removeClass(this.bottomNode,this.bottomNodeClass);
dojo.html.removeClass(this.bottomNode,this.bottomNodeClass_Collapsed);
dojo.html.addClass(this.bottomNode,this.bottomNodeClass_Expanded);
}
if(this.containerNodeClass_Expanded!=""){
dojo.html.removeClass(this.bottomNode,this.containerNodeClass);
dojo.html.removeClass(this.bottomNode,this.containerNodeClass_Collapsed);
dojo.html.addClass(this.bottomNode,this.containerNodeClass_Expanded);
}
}else{
if(this.labelNodeClass_Collapsed!=""){
dojo.html.removeClass(this.labelNode,this.labelNodeClass);
dojo.html.removeClass(this.labelNode,this.labelNodeClass_Expanded);
dojo.html.addClass(this.labelNode,this.labelNodeClass_Collapsed);
}
if(this.bottomNodeClass_Collapsed!=""){
dojo.html.removeClass(this.bottomNode,this.bottomNodeClass);
dojo.html.removeClass(this.bottomNode,this.bottomNodeClass_Expanded);
dojo.html.addClass(this.bottomNode,this.bottomNodeClass_Collapsed);
}
if(this.containerNodeClass_Collapsed!=""){
dojo.html.removeClass(this.bottomNode,this.containerNodeClass);
dojo.html.removeClass(this.bottomNode,this.containerNodeClass_Expanded);
dojo.html.addClass(this.bottomNode,this.containerNodeClass_Collapsed);
}
}
}});
dojo.widget.defineWidget("wc.widget.WCAccordionDropTarget",dojo.dnd.HtmlDropTarget,{parentAccordionPane:null,setParentAccordion:function(_f7d){
this.parentAccordionPane=_f7d;
},onDrop:function(e){
this.onDragOut(e);
this.parentAccordionPane.onDropEventHandler(e);
this.onDragOut(e);
return true;
},onDragOver:function(e){
if(this.accepts(e.dragObjects)){
if(!this.parentAccordionPane.selected){
this.parentAccordionPane.onLabelClick();
}
}
this.childBoxes=[];
for(var i=0,_f81;i<this.domNode.childNodes.length;i++){
_f81=this.domNode.childNodes[i];
if(_f81.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_f81,true);
var _f83=dojo.html.getBorderBox(_f81);
this.childBoxes.push({top:pos.y,bottom:pos.y+_f83.height,left:pos.x,right:pos.x+_f83.width,height:_f83.height,width:_f83.width,node:_f81});
}
var _f84=this.parentAccordionPane.containerNode.childNodes[this.parentAccordionPane.containerNode.childNodes.length-1];
this.scrollIntoView(_f84);
return true;
},scrollIntoView:function(node){
var _f86=node.parentNode;
var _f87=_f86.scrollTop+dojo.html.getInnerHeight(_f86);
var _f88=node.offsetTop+dojo.html.getOuterHeight(node);
if(_f87<_f88){
_f86.scrollTop+=(_f88-_f87);
}else{
if(_f86.scrollTop>node.offsetTop){
_f86.scrollTop-=(_f86.scrollTop-node.offsetTop);
}
}
}});
dojo.widget.defineWidget("wc.widget.TitlePaneTemplate",dojo.widget.HtmlWidget,{widgetType:"TitlePaneTemplate",isContainer:true});
dojo.widget.defineWidget("wc.widget.ContentPaneTemplate",dojo.widget.HtmlWidget,{widgetType:"ContentPaneTemplate",isContainer:true,selected:false,setSelected:function(_f89){
this.selected=_f89;
if(this.selected){
this.onShow();
}
},onShow:function(){
dojo.html.setStyle(this.domNode,"overflow-y","auto");
dojo.html.setStyle(this.domNode,"diaplay","block");
},onHide:function(){
dojo.html.setStyle(this.domNode,"overflow","hidden");
dojo.html.setStyle(this.domNode,"diaplay","none");
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",open:false,allowCollapse:false,acceptedTypes:[],labelNodeClass:"",labelNodeClass_Expanded:"",labelNodeClass_Collapsed:"",containerNodeClass:"",containerNodeClass_Collapsed:"",containerNodeClass_Expanded:"",bottomNodeClass:"",bottomNodeClass_Expanded:"",bottomNodeClass_Collapsed:"",dropEventHandler:function(e){
alert("dropEventHandler is not defined !!!");
}});
dojo.provide("wc.widget.MJComboBox");
dojo.declare("dojo.widget.incrementalComboBoxDataProvider",null,function(_f8b){
this.searchUrl=_f8b.dataUrl;
this._cache={};
this._inFlight=false;
this._lastRequest=null;
this.allowCache=false;
},{_addToCache:function(_f8c,data){
if(this.allowCache){
this._cache[_f8c]=data;
}
},startSearch:function(_f8e,_f8f){
if(this._inFlight){
}
var tss=encodeURIComponent(_f8e);
var _f91=dojo.string.substituteParams(this.searchUrl,{"searchString":tss});
var _f92=this;
var _f93=this._lastRequest=dojo.io.bind({url:_f91,method:"get",mimetype:"text/json",load:function(type,data,evt){
_f92._inFlight=false;
if(!dojo.lang.isArray(data)){
var _f97=[];
for(var key in data){
_f97.push([data[key],key]);
}
data=_f97;
}
_f92._addToCache(_f8e,data);
if(_f93==_f92._lastRequest){
_f8f(data);
}
}});
this._inFlight=true;
}});
dojo.declare("dojo.widget.basicComboBoxDataProvider",null,function(_f99,node){
this._data=[];
this.searchLimit=200;
this.searchType="STARTSTRING";
this.caseSensitive=false;
if(!dj_undef("dataUrl",_f99)&&!dojo.string.isBlank(_f99.dataUrl)){
this._getData(_f99.dataUrl);
}else{
if((node)&&(node.nodeName.toLowerCase()=="select")){
var opts=node.getElementsByTagName("option");
var ol=opts.length;
var data=[];
for(var x=0;x<ol;x++){
var text=opts[x].textContent||opts[x].innerText||opts[x].innerHTML;
var _fa0=[String(text),String(opts[x].value)];
data.push(_fa0);
if(opts[x].selected){
_f99.setAllValues(_fa0[0],_fa0[1]);
}
}
this.setData(data);
}
}
},{_getData:function(url){
dojo.io.bind({url:url,load:dojo.lang.hitch(this,function(type,data,evt){
if(!dojo.lang.isArray(data)){
var _fa5=[];
for(var key in data){
_fa5.push([data[key],key]);
}
data=_fa5;
}
this.setData(data);
}),mimetype:"text/json"});
},startSearch:function(_fa7,_fa8){
this._performSearch(_fa7,_fa8);
},_performSearch:function(_fa9,_faa){
var st=this.searchType;
var ret=[];
if(!this.caseSensitive){
_fa9=_fa9.toLowerCase();
}
for(var x=0;x<this._data.length;x++){
if((this.searchLimit>0)&&(ret.length>=this.searchLimit)){
break;
}
var _fae=new String((!this.caseSensitive)?this._data[x][0].toLowerCase():this._data[x][0]);
if(_fae.length<_fa9.length){
continue;
}
if(st=="STARTSTRING"){
if(_fa9==_fae.substr(0,_fa9.length)){
ret.push(this._data[x]);
}
}else{
if(st=="SUBSTRING"){
if(_fae.indexOf(_fa9)>=0){
ret.push(this._data[x]);
}
}else{
if(st=="STARTWORD"){
var idx=_fae.indexOf(_fa9);
if(idx==0){
ret.push(this._data[x]);
}
if(idx<=0){
continue;
}
var _fb0=false;
while(idx!=-1){
if(" ,/(".indexOf(_fae.charAt(idx-1))!=-1){
_fb0=true;
break;
}
idx=_fae.indexOf(_fa9,idx+1);
}
if(!_fb0){
continue;
}else{
ret.push(this._data[x]);
}
}
}
}
}
_faa(ret);
},setData:function(_fb1){
this._data=_fb1;
}});
dojo.widget.defineWidget("wc.widget.MJComboBox",dojo.widget.HtmlWidget,{forceValidOption:false,searchType:"stringstart",dataProvider:null,autoComplete:true,searchDelay:100,dataUrl:"",fadeTime:200,maxListLength:8,tabIndex:"1",mode:"local",selectedResult:null,dataProviderClass:"",buttonSrc:dojo.uri.dojoUri("src/widget/templates/images/combo_box_arrow.png"),dropdownToggle:"fade",maxSize:"10",divWidth:"0",doSplit:"false",templateString:"<span _=\"whitespace and CR's between tags adds &nbsp; in FF\"\r\n\tclass=\"dojoComboBoxOuter\"\r\n\t><input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \r\n\t\tdojoAttachPoint=\"comboBoxValue\"\r\n\t><input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \r\n\t\tdojoAttachPoint=\"comboBoxSelectionValue\"\r\n\t><input type=\"text\" autocomplete=\"off\" class=\"dojoComboBox\" \r\n\t\tdojoAttachEvent=\"key:_handleKeyEvents; keyUp: onKeyUp; compositionEnd; onResize; onKeyPress; \"\r\n\t\tdojoAttachPoint=\"textInputNode\"\r\n\t><img hspace=\"0\"\r\n\t\tvspace=\"0\"\r\n\t\tclass=\"dojoComboBox\"\r\n\t\tdojoAttachPoint=\"downArrowNode\"\r\n\t\tdojoAttachEvent=\"onMouseUp: handleArrowClick; onResize;\"\r\n\t\tsrc=\"${this.buttonSrc}\"\r\n\t\t\r\n></span>\r\n",templateCssString:".dojoComboBoxOuter {\r\n\tborder: 0px !important;\r\n\tmargin: 0px !important;\r\n\tpadding: 0px !important;\r\n\tbackground: transparent !important;\r\n\twhite-space: nowrap !important;\r\n}\r\n\r\n.dojoComboBox {\r\n\tborder: 1px inset #afafaf;\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n\tvertical-align: middle !important;\r\n\tfloat: none !important;\r\n\tposition: static !important;\r\n\tdisplay: inline !important;\r\n}\r\n\r\n/* the input box */\r\ninput.dojoComboBox {\r\n\tborder-right-width: 0px !important; \r\n\tpadding: 2px 0px 0px 4px;\r\n\theight: 15px;\r\n\t\r\n}\r\n\r\n/* the down arrow */\r\nimg.dojoComboBox {\r\n\tborder-left-width: 0px !important;\r\n\tpadding-left: 0px !important;\r\n\tmargin-left: 0px !important;\r\n}\r\n\r\n/* IE vertical-alignment calculations can be off by +-1 but these margins are collapsed away */\r\n.dj_ie img.dojoComboBox {\r\n\tmargin-top: 1px; \r\n\tmargin-bottom: 1px; \r\n}\r\n\r\n/* the drop down */\r\n.dojoComboBoxOptions {\r\n\tfont-family: Verdana, Helvetica, Garamond, sans-serif;\r\n\t/* font-size: 0.7em; */\r\n\tbackground-color: white;\r\n\tborder: 1px solid #afafaf;\r\n\tposition: absolute;\r\n\tz-index: 1000; \r\n\toverflow: auto;\r\n\tcursor: default;\r\n}\r\n\r\n.dojoComboBoxItem {\r\n\tpadding-left: 2px;\r\n\tpadding-top: 2px;\r\n\tmargin: 0px;\r\n}\r\n\r\n.dojoComboBoxItemEven {\r\n\tbackground-color: #f4f4f4;\r\n}\r\n\r\n.dojoComboBoxItemOdd {\r\n\tbackground-color: white;\r\n}\r\n\r\n.dojoComboBoxItemHighlight {\r\n\tbackground-color: #63709A;\r\n\tcolor: white;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("wc/widget/templates/MJComboBox.css"),selectedVal:"",setValue:function(_fb2){
// MJPRO-1468 : Fix for IE. Making sure that selectedVal is getting updated in widget.
dojo.widget.byId(this.widgetId).selectedVal=_fb2;
this.comboBoxValue.value=_fb2;
if(this.textInputNode.value!=_fb2){
this.textInputNode.value=_fb2;
dojo.widget.html.stabile.setState(this.widgetId,this.getState(),true);
this.onValueChanged(_fb2,this.comboBoxSelectionValue.value);
}
},onValueChanged:function(_fb3){
},getValue:function(){
return this.comboBoxValue.value;
},getState:function(){
return {value:this.getValue()};
},setState:function(_fb4){
this.setValue(_fb4.value);
},enable:function(){
this.disabled=false;
this.textInputNode.removeAttribute("disabled");
},disable:function(){
this.disabled=true;
this.textInputNode.setAttribute("disabled",true);
},_getCaretPos:function(_fb5){
if(dojo.lang.isNumber(_fb5.selectionStart)){
return _fb5.selectionStart;
}else{
if(dojo.render.html.ie){
var tr=document.selection.createRange().duplicate();
var ntr=_fb5.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
return 0;
}
}
}
},_setCaretPos:function(_fb8,_fb9){
_fb9=parseInt(_fb9);
this._setSelectedRange(_fb8,_fb9,_fb9);
},_setSelectedRange:function(_fba,_fbb,end){
if(!end){
end=_fba.value.length;
}
if(_fba.setSelectionRange){
_fba.focus();
_fba.setSelectionRange(_fbb,end);
}else{
if(_fba.createTextRange){
var _fbd=_fba.createTextRange();
with(_fbd){
collapse(true);
moveEnd("character",end);
moveStart("character",_fbb);
select();
}
}else{
_fba.value=_fba.value;
_fba.blur();
_fba.focus();
var dist=parseInt(_fba.value.length)-end;
var _fbf=String.fromCharCode(37);
var tcc=_fbf.charCodeAt(0);
for(var x=0;x<dist;x++){
var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
_fba.dispatchEvent(te);
}
}
}
},_handleKeyEvents:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return;
}
this._prev_key_backspace=false;
this._prev_key_esc=false;
var k=dojo.event.browser.keys;
var _fc5=true;
switch(evt.key){
case k.KEY_DOWN_ARROW:
if(!this.popupWidget.isShowingNow){
this._startSearchFromInput();
}
this._highlightNextOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_UP_ARROW:
this._highlightPrevOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_TAB:
if(!this.autoComplete&&this.popupWidget.isShowingNow&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this._selectOption({"target":this._highlighted_option,"noHide":false});
this._setSelectedRange(this.textInputNode,this.textInputNode.value.length,null);
}else{
this._selectOption();
return;
}
break;
case k.KEY_ENTER:
if(this.popupWidget.isShowingNow){
dojo.event.browser.stopEvent(evt);
}
if(this.autoComplete){
this._selectOption();
return;
}
case " ":
if(this.popupWidget.isShowingNow&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this._selectOption();
this._hideResultList();
return;
}
break;
case k.KEY_ESCAPE:
this._hideResultList();
this._prev_key_esc=true;
return;
case k.KEY_BACKSPACE:
this._prev_key_backspace=true;
if(!this.textInputNode.value.length){
this.setAllValues("","");
this._hideResultList();
_fc5=false;
}
break;
case k.KEY_RIGHT_ARROW:
case k.KEY_LEFT_ARROW:
_fc5=false;
break;
default:
if(evt.charCode==0){
_fc5=false;
}
}
if(this.searchTimer){
clearTimeout(this.searchTimer);
}
if(_fc5){
this._blurOptionNode();
this.searchTimer=setTimeout(dojo.lang.hitch(this,this._startSearchFromInput),this.searchDelay);
}
},compositionEnd:function(evt){
evt.key=evt.keyCode;
this._handleKeyEvents(evt);
},onKeyUp:function(evt){
this.setValue(this.textInputNode.value);
},onKeyPress:function(event){
	var unicode=event.keyCode? event.keyCode : event.charCode;
	if ( unicode == 46 || unicode == 8 ) {
       }
        else {
            // Ensure that it is a number and stop the keypress
            if (unicode < 48 || unicode > 57 ) {
                event.preventDefault(); 
            }  
        }
},setSelectedValue:function(_fc8){
this.comboBoxSelectionValue.value=_fc8;
},setAllValues:function(_fc9,_fca){
this.setSelectedValue(_fca);
this.setValue(_fc9);
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.html.removeClass(this._highlighted_option,"dojoComboBoxItemHighlight");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
if((!this._highlighted_option)||!this._highlighted_option.parentNode){
this._focusOptionNode(this.optionsListNode.firstChild);
}else{
if(this._highlighted_option.nextSibling){
this._focusOptionNode(this._highlighted_option.nextSibling);
}
}
dojo.html.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
if(this._highlighted_option&&this._highlighted_option.previousSibling){
this._focusOptionNode(this._highlighted_option.previousSibling);
}else{
this._highlighted_option=null;
this._hideResultList();
return;
}
dojo.html.scrollIntoView(this._highlighted_option);
},_itemMouseOver:function(evt){
if(evt.target===this.optionsListNode){
return;
}
this._focusOptionNode(evt.target);
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
},_itemMouseOut:function(evt){
if(evt.target===this.optionsListNode){
return;
}
this._blurOptionNode();
},onResize:function(){
var _fce=dojo.html.getContentBox(this.textInputNode);
if(_fce.height<=0){
dojo.lang.setTimeout(this,"onResize",100);
return;
}
var _fcf=_fce.height+2;
var _fd0={width:_fcf,height:_fcf};
dojo.html.setContentBox(this.downArrowNode,_fd0);
},fillInTemplate:function(args,frag){
dojo.html.applyBrowserClass(this.domNode);
var _fd3=this.getFragNodeRef(frag);
if(!this.name&&_fd3.name){
this.name=_fd3.name;
}
this.comboBoxValue.name=this.name;
this.comboBoxSelectionValue.name=this.name+"_selected";
this.textInputNode.size=parseInt(this.maxSize);
this.textInputNode.tabIndex=parseInt(this.tabIndex);
dojo.html.copyStyle(this.domNode,_fd3);
dojo.html.copyStyle(this.textInputNode,_fd3);
dojo.html.copyStyle(this.downArrowNode,_fd3);
with(this.downArrowNode.style){
width="0px";
height="0px";
}
var _fd4;
if(this.dataProviderClass){
if(typeof this.dataProviderClass=="string"){
_fd4=dojo.evalObjPath(this.dataProviderClass);
}else{
_fd4=this.dataProviderClass;
}
}else{
if(this.mode=="remote"){
_fd4=dojo.widget.incrementalComboBoxDataProvider;
}else{
_fd4=dojo.widget.basicComboBoxDataProvider;
}
}
this.dataProvider=new _fd4(this,this.getFragNodeRef(frag));
this.popupWidget=new dojo.widget.createWidget("PopupContainer",{toggle:this.dropdownToggle,toggleDuration:this.toggleDuration});
dojo.event.connect(this,"destroy",this.popupWidget,"destroy");
this.optionsListNode=this.popupWidget.domNode;
this.domNode.appendChild(this.optionsListNode);
dojo.html.addClass(this.optionsListNode,"dojoComboBoxOptions");
dojo.html.addClass(this.textInputNode,"dojoComboBox");
dojo.event.connect(this.optionsListNode,"onclick",this,"_selectOption");
dojo.event.connect(this.optionsListNode,"onmouseover",this,"_onMouseOver");
dojo.event.connect(this.optionsListNode,"onmouseout",this,"_onMouseOut");
dojo.event.connect(this.optionsListNode,"onmouseover",this,"_itemMouseOver");
dojo.event.connect(this.optionsListNode,"onmouseout",this,"_itemMouseOut");
},_openResultList:function(_fd5){
if(this.disabled){
return;
}
this._clearResultList();
if(!_fd5.length){
this._hideResultList();
}
if((this.autoComplete)&&(_fd5.length)&&(!this._prev_key_backspace)&&(this.textInputNode.value.length>0)){
var cpos=this._getCaretPos(this.textInputNode);
if((cpos+1)>this.textInputNode.value.length){
this.textInputNode.value+=_fd5[0][0].substr(cpos);
this._setSelectedRange(this.textInputNode,cpos,this.textInputNode.value.length);
}
}
var even=true;
while(_fd5.length){
var tr=_fd5.shift();
if(tr){
var td=document.createElement("div");
td.appendChild(document.createTextNode(tr[0]));
td.setAttribute("resultName",tr[0]);
td.setAttribute("resultValue",tr[1]);
td.className="dojoComboBoxItem "+((even)?"dojoComboBoxItemEven":"dojoComboBoxItemOdd");
even=(!even);
this.optionsListNode.appendChild(td);
}
}
this._showResultList();
},_onFocusInput:function(){
this._hasFocus=true;
},_onBlurInput:function(){
this._hasFocus=false;
this._handleBlurTimer(true,500);
},_handleBlurTimer:function(_fda,_fdb){
if(this.blurTimer&&(_fda||_fdb)){
clearTimeout(this.blurTimer);
}
if(_fdb){
this.blurTimer=dojo.lang.setTimeout(this,"_checkBlurred",_fdb);
}
},_onMouseOver:function(evt){
if(!this._mouseover_list){
this._handleBlurTimer(true,0);
this._mouseover_list=true;
}
},_onMouseOut:function(evt){
var _fde=evt.relatedTarget;
try{
if(!_fde||_fde.parentNode!=this.optionsListNode){
this._mouseover_list=false;
this._handleBlurTimer(true,100);
this._tryFocus();
}
}
catch(e){
}
},_isInputEqualToResult:function(_fdf){
var _fe0=this.textInputNode.value;
if(!this.dataProvider.caseSensitive){
_fe0=_fe0.toLowerCase();
_fdf=_fdf.toLowerCase();
}
return (_fe0==_fdf);
},_isValidOption:function(){
var tgt=dojo.html.firstElement(this.optionsListNode);
var _fe2=false;
while(!_fe2&&tgt){
if(this._isInputEqualToResult(tgt.getAttribute("resultName"))){
_fe2=true;
}else{
tgt=dojo.html.nextElement(tgt);
}
}
return _fe2;
},_checkBlurred:function(){
if(!this._hasFocus&&!this._mouseover_list){
this._hideResultList();
if(!this.textInputNode.value.length){
this.setAllValues("","");
return;
}
var _fe3=this._isValidOption();
if(this.forceValidOption&&!_fe3){
this.setAllValues("","");
return;
}
if(!_fe3){
this.setSelectedValue("");
}
}
},_selectOption:function(evt){
var tgt=null;
if(!evt){
evt={target:this._highlighted_option};
}
if(!dojo.html.isDescendantOf(evt.target,this.optionsListNode)){
if(!this.textInputNode.value.length){
return;
}
tgt=dojo.html.firstElement(this.optionsListNode);
if(!tgt||!this._isInputEqualToResult(tgt.getAttribute("resultName"))){
return;
}
}else{
tgt=evt.target;
}
while((tgt.nodeType!=1)||(!tgt.getAttribute("resultName"))){
tgt=tgt.parentNode;
if(tgt===dojo.body()){
return false;
}
}
var _fe6=tgt.getAttribute("resultName");
if(this.doSplit=="true"){
var _fe7=_fe6.split("|");
if(_fe7[1]){
_fe6=_fe7[0]+" | "+_fe7[1];
}
}
this.selectedResult=[_fe6,tgt.getAttribute("resultValue")];
this.selectedVal=tgt.getAttribute("resultValue");
this.setAllValues(_fe6,tgt.getAttribute("resultValue"));
if(!evt.noHide){
this._hideResultList();
this._setSelectedRange(this.textInputNode,0,null);
}
this._tryFocus();
},_clearResultList:function(){
if(this.optionsListNode.innerHTML){
this.optionsListNode.innerHTML="";
}
},_hideResultList:function(){
this.popupWidget.close();
},_showResultList:function(){
var _fe8=this.optionsListNode.childNodes;
if(_fe8.length){
var _fe9=Math.min(_fe8.length,this.maxListLength);
with(this.optionsListNode.style){
display="";
if(_fe9==_fe8.length){
height="";
}else{
height=_fe9*dojo.html.getMarginBox(_fe8[0]).height+"px";
}
width=(dojo.html.getMarginBox(this.domNode).width-2+parseInt(this.divWidth))+"px";
}
this.popupWidget.open(this.domNode,this,this.downArrowNode);
}else{
this._hideResultList();
}
},handleArrowClick:function(){
this._handleBlurTimer(true,0);
this._tryFocus();
if(this.popupWidget.isShowingNow){
this._hideResultList();
}else{
this._startSearch("");
}
},_tryFocus:function(){
try{
this.textInputNode.focus();
}
catch(e){
}
},_startSearchFromInput:function(){
this._startSearch(this.textInputNode.value);
},_startSearch:function(key){
this.dataProvider.startSearch(key,dojo.lang.hitch(this,"_openResultList"));
},postCreate:function(){
this.onResize();
dojo.event.connect(this.textInputNode,"onblur",this,"_onBlurInput");
dojo.event.connect(this.textInputNode,"onfocus",this,"_onFocusInput");
if(this.disabled){
this.disable();
}
var s=dojo.widget.html.stabile.getState(this.widgetId);
if(s){
this.setState(s);
}
}});
dojo.provide("wc.widget.MJBlockbox");
dojo.widget.defineWidget("wc.widget.MJBlockbox",dojo.widget.HtmlWidget,{templateString:"<span style=\"display: inline-block;\" tabIndex=\"${this.tabIndex}\" waiRole=\"checkbox\" id=\"${this.id}\">\r\n\t<img onMouseOver=\"cursor_hand()\" onMouseOut=\"cursor_clearer()\" dojoAttachPoint=\"imageNode\" class=\"dojoHtmlBlockbox\" src=\"/wcsstore/MoosejawStorefrontAssetStore/images/blank.gif\" alt=\"\" />\r\n\t<input type=\"checkbox\" name=\"${this.name}\" style=\"display: none\" value=\"${this.value}\"\r\n\t\tdojoAttachPoint=\"inputNode\">\r\n</span>\r\n",templateCssString:".dojoHtmlBlockbox {\r\n\tborder: 0px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tmargin: 2px;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.dojoHtmlBlockboxOn {\r\n\tbackground: url(check.gif) 0px 0px;\r\n}\r\n.dojoHtmlBlockboxOff {\r\n\tbackground: url(check.gif) -16px 0px;\r\n}\r\n.dojoHtmlBlockboxDisabledOn {\r\n\tbackground: url(check.gif) -32px 0px;\r\n}\r\n.dojoHtmlBlockboxDisabledOff {\r\n\tbackground: url(check.gif) -48px 0px;\r\n}\r\n.dojoHtmlBlockboxOnHover {\r\n\tbackground: url(check.gif) -64px 0px;\r\n}\r\n.dojoHtmlBlockboxOffHover {\r\n\tbackground: url(check.gif) -80px 0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("wc/widget/templates/MJBlockbox.css"),widgetType:"MJBlockbox",name:"",id:"",checked:false,tabIndex:"",value:"on",postMixInProperties:function(){
wc.widget.MJBlockbox.superclass.postMixInProperties.apply(this,arguments);
if(!this.disabled&&this.tabIndex==""){
this.tabIndex="0";
}
},fillInTemplate:function(){
this._setInfo();
},postCreate:function(){
var _fec=true;
this.id=this.id!=""?this.id:this.widgetId;
if(this.id!=""){
var _fed=document.getElementsByTagName("label");
if(_fed!=null&&_fed.length>0){
for(var i=0;i<_fed.length;i++){
if(_fed[i].htmlFor==this.id){
_fed[i].id=(_fed[i].htmlFor+"label");
this._connectEvents(_fed[i]);
dojo.widget.wai.setAttr(this.domNode,"waiState","labelledby",_fed[i].id);
break;
}
}
}
}
this._connectEvents(this.domNode);
this.inputNode.checked=this.checked;
},_connectEvents:function(node){
dojo.event.connect(node,"onmouseover",this,"mouseOver");
dojo.event.connect(node,"onmouseout",this,"mouseOut");
dojo.event.connect(node,"onkey",this,"onKey");
dojo.event.connect(node,"onclick",this,"_onClick");
dojo.html.disableSelection(node);
},_onClick:function(e){
if(this.disabled==false){
this.checked=!this.checked;
this._setInfo();
}
e.preventDefault();
e.stopPropagation();
this.onClick();
},setValue:function(bool){
if(this.disabled==false){
this.checked=bool;
this._setInfo();
}
},onClick:function(){
},onKey:function(e){
var k=dojo.event.browser.keys;
if(e.key==" "){
this._onClick(e);
}
},mouseOver:function(e){
this._hover(e,true);
},mouseOut:function(e){
this._hover(e,false);
},_hover:function(e,_ff7){
if(this.disabled==false){
var _ff8=this.checked?"On":"Off";
var _ff9="dojoHtmlBlockbox"+_ff8+"Hover";
if(_ff7){
dojo.html.addClass(this.imageNode,_ff9);
}else{
dojo.html.removeClass(this.imageNode,_ff9);
}
}
},_setInfo:function(){
var _ffa="dojoHtmlBlockbox"+(this.disabled?"Disabled":"")+(this.checked?"On":"Off");
dojo.html.setClass(this.imageNode,"dojoHtmlBlockbox "+_ffa);
this.inputNode.checked=this.checked;
if(this.disabled){
this.inputNode.setAttribute("disabled",true);
}else{
this.inputNode.removeAttribute("disabled");
}
dojo.widget.wai.setAttr(this.domNode,"waiState","checked",this.checked);
}});
dojo.widget.defineWidget("dojo.widget.a11y.Checkbox",wc.widget.MJBlockbox,{templateString:"<span class='dojoHtmlCheckbox'>\r\n\t<input type=\"checkbox\" name=\"${this.name}\" tabIndex=\"${this.tabIndex}\" id=\"${this.id}\" value=\"${this.value}\"\r\n\t\t dojoAttachEvent=\"onClick: _onClick;\" dojoAttachPoint=\"inputNode\"> \r\n</span>\r\n",fillInTemplate:function(){
},postCreate:function(args,frag){
this.inputNode.checked=this.checked;
if(this.disabled){
this.inputNode.setAttribute("disabled",true);
}
},_onClick:function(){
this.onClick();
}});

