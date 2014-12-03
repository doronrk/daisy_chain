(function(a){var b={}
b.$Modules=b
;
var c={"build_number":"20141027.061659","git_commit":"2afa91a6d4b0e565887e40f4473928c2779d92fb"},d=b.Module=(function(){var w=[],x=/^function *\( *\) *{ *([\s\S]*) *}$/
function y(C,D){var E=b[C]
E.module_function=new Function('$Modules',D.toString().replace(x,'$1'))
E.ready()}
function z(C){var D,E,F,G
for(D=w.length-1;D>=0;D--){F=w[D]
G=F.dependencies
for(E=G.length-1;E>=0;E--){if(G[E]==C){G.splice(E,1)
break}}
F.ready()}}
function A(){var C=Array.prototype.slice.call(arguments),D=C.shift()
this.fqname=D
this.name=D.split('.').pop()
this.callbacks=[]
this.dependencies=C
w.push(this)}
A.ensureLoaded=function(C,D){if(C instanceof A)C.ensureLoaded(D)
else D()}
A.prototype.ensureLoaded=function(C){this.ifLoaded(C)
this.load()}
A.prototype.ifLoaded=function(C){this.callbacks.push(C)}
A.prototype.load=function(){var C=this.getDependencies(),D,E
function F(G){y(G[0],G[1])}
for(D=0;D<C.length;D++){E=C[D]
if(E.loader)continue
E.loader=new s(c.baseURL+'/lib/'+c.build_number+'/'+E.fqname+'.js',b,F)}}
A.prototype.getDependencies=function(){var C=this.dependencies,D,E=[this]
for(D=0;D<C.length;D++){var F=b[C[D]]
E=E.concat(F.getDependencies())}
return E}
A.prototype.ready=function(){if(this.dependencies.length||!this.module_function)return
for(D=w.length-1;D>=0;D--)if(w[D]==this){w.splice(D,1)
break}
this.module_function(b)
var C=b[this.fqname],D
C.ifLoaded=C.ensureLoaded=B
for(D=0;D<this.callbacks.length;D++)this.callbacks[D](C)
z(this.fqname)
delete this.callbacks
delete this.fqname
delete this.name
delete this.dependencies
delete this.loader}
function B(C){C()}
if((typeof A==='function')&&A.prototype&&!A.__jx__no_fqname){A.prototype.__jx__fqname_chain=[(A.prototype.__jx__fqname_chain||"")," ","jx_core_Module"].join('')
A.prototype.__jx__fqname="jx_core_Module"}
return A})(),e=b.clone=(function(){function w(){}
function x(y){w.prototype=y
return new w()}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_core_globals_clone"].join('')
x.prototype.__jx__fqname="jx_core_globals_clone"}
return x})(),f=b.indexOf=(function(){var w=Array.prototype.indexOf
if(typeof w!='function'||!/\[native code\]/.test(w.toString()))w=x
function x(z){"use strict"
if(this==null){throw new TypeError()}
var A=Object(this),B=A.length>>>0
if(B===0){return -1}
var C=0
if(arguments.length>0){C=Number(arguments[1])
if(C!=C){C=0}
else if(C!=0&&C!=Infinity&&C!=-Infinity){C=(C>0||-1)*Math.floor(Math.abs(C))}}
if(C>=B){return -1}
var D=C>=0?C:Math.max(B-Math.abs(C),0)
for(;D<B;D++){if(D in A&&A[D]===z){return D}}
return -1}
function y(z,A,B){return w.call(A,z,B)}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","jx_core_globals_indexOf"].join('')
y.prototype.__jx__fqname="jx_core_globals_indexOf"}
return y})(),g=b.isArray=(function(){function w(x){return Object.prototype.toString.call(x)=='[object Array]'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_isArray"].join('')
w.prototype.__jx__fqname="jx_core_globals_isArray"}
return w})(),h=b.isFunction=(function(){function w(x){return typeof x=='function'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_isFunction"].join('')
w.prototype.__jx__fqname="jx_core_globals_isFunction"}
return w})(),i=b.isString=(function(){function w(x){return typeof (x)=='string'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_isString"].join('')
w.prototype.__jx__fqname="jx_core_globals_isString"}
return w})(),j=b.isNumber=(function(){function w(x){return typeof (x)=='number'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_isNumber"].join('')
w.prototype.__jx__fqname="jx_core_globals_isNumber"}
return w})(),k=b.isUndefined=(function(){var w=(function(x){return function(y,z){return z?y==null:y===x}})()
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_isUndefined"].join('')
w.prototype.__jx__fqname="jx_core_globals_isUndefined"}
return w})(),l=b.nextTick=(function(){var w,x=[]
function y(A,B,C){o.ok(typeof A=='function','1st argument to nextTick must be a function')
if(C){for(var D=0;D<x.length;D++)if(x[D][0]===A&&x[D][1]===B)return}
x.push([A,B])
if(!w)w=setTimeout(z,0)}
function z(){for(var A=0;A<x.length;A++)x[A][0].apply(x[A][1])
x=[]
w=!1}
y.tick=z
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","jx_core_globals_nextTick"].join('')
y.prototype.__jx__fqname="jx_core_globals_nextTick"}
return y})(),m=b.parseBoolean=(function(){function w(x){return !!x&&x!='false'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_globals_parseBoolean"].join('')
w.prototype.__jx__fqname="jx_core_globals_parseBoolean"}
return w})(),n=b.StackTrace=(function(){var w
try {(0)()}catch(z){w=z.arguments?'chrome':z.stack?'firefox':window.opera&&!('stacktrace' in z)?'opera':'other'}
function x(){this.stack=this[w]()}
x.prototype.toString=function(){return this.stack.join('\n')}
x.prototype.chrome=function(){try {(0)()}catch(z){return z.stack.replace(/^(.*?\n){2}/,'').replace(/^[^\(]+?[\n$]/g,'').replace(/^\s+at\s+/g,'').replace(/^Object.<anonymous>\s*\(/g,'{anonymous}()@').split('\n')}}
x.prototype.firefox=function(){try {(0)()}catch(z){return z.stack.replace(/^.*?\n/,'').replace(/(?:\n@:0)?\s+$/,'').replace(/^\(/g,'{anonymous}(').split('\n')}}
x.prototype.opera=function(){try {(0)()}catch(z){var A=z.message.split('\n'),B='{anonymous}',C=/Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,D,E,F
for(D=4,E=0,F=A.length;D<F;D+=2){if(C.test(A[D])){A[E++]=(RegExp.$3?RegExp.$3+'()@'+RegExp.$2+RegExp.$1:B+'()@'+RegExp.$2+':'+RegExp.$1)+' -- '+A[D+1].replace(/^\s+/,'')}}
A.splice(E,A.length-E)
return A}}
x.prototype.other=function(){var z=arguments.callee,A='{anonymous}',B=/function\s*([\w\-$]+)?\s*\(/i,C=[],D=0,E,F,G=20
while(z&&C.length<G){E=B.test(z.toString())?RegExp.$1||A:A
F=Array.prototype.slice.call(z['arguments'])
C[D++]=E+'('+y(F)+')'
if(z===z.caller&&window.opera){break}
z=z.caller}
return C}
function y(z){for(var A=0;A<z.length;++A){var B=z[A]
if(typeof B=='object'){z[A]='#object'}
else if(typeof B=='function'){z[A]='#function'}
else if(typeof B=='string'){z[A]='"'+B+'"'}}
return z.join(',')}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_core_StackTrace"].join('')
x.prototype.__jx__fqname="jx_core_StackTrace"}
return x})(),o=b.Assert=(function(){var w={ok:x,isFunction:function(y,z){x(h(y),z)}}
w.log=function(){}
function x(y,z){if(!y)w.log(z)}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_Assert"].join('')
w.prototype.__jx__fqname="jx_core_Assert"}
return w})(),p=b.Browser=(function(){var w=navigator,x=w.userAgent.toLowerCase(),y=eval("/*@cc_on(function(v,m){return v>=9?v:v>=5.8?8:v>=5.7&&m?7:v>=5.6?6:v>=5.5?5.5:v>=5.1?5:v>=3?4:3})(@_jscript_version,'maxHeight' in document.createElement('a').style)@*/"),z=y==8,A=y==7,B=y==6,C=window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]",D=navigator.vendor=='Google Inc.',E=navigator.vendor=='Apple Computer, Inc.',F=!y&&!C&&(D||E||/webkit|khtml/.test(x)),G=+/\d+/.exec(/firefox\/\d+/i.exec(navigator.userAgent)||''),H=x.indexOf('firefox/2')>-1,I=x.indexOf('firefox/3')>-1,J=x.indexOf("iphone")!=-1,K=x.indexOf("ipod")!=-1,L=x.indexOf("ipad")!=-1,M=J||L||K,N=x.indexOf("android")!=-1,O=x.indexOf("wp7")!=-1,P=M||N||O,Q,R=y&&'msie'||G&&'firefox'||C&&'opera'||D&&'chrome'||E&&'safari',S,T=y&&!U,U=document.compatMode=="CSS1Compat",V=!U,W=y&&V&&document.documentElement&&!!document.documentElement.style.setExpression,X=document.documentMode||y,Y=(x.indexOf("windows")!=-1||x.indexOf("win32")!=-1),Z=(x.indexOf("macintosh")!=-1||x.indexOf("mac os x")!=-1),$$=document.location.protocol=='https:',$_=w.language||w.browserLanguage||w.userLanguage||w.systemLanguage,$a={noBoxSizing:X<=7,ie:{cssBottomRight:B,cssFixed:B||W,buggyCSS:B||W}},$b=!1
if(window.CustomEvent){try {new window.CustomEvent('testevent',{bubbles:!1,cancelable:!0,detail:!0})
$b=!0}catch($p){;}}
switch(R){case 'msie':case 'firefox':case 'chrome':S=+/\d+/.exec(new RegExp(R+'[ /]\\d+').exec(x)||'')
break
default:S=+/\d+/.exec(/version[ \/]\d+/.exec(x)||'')}
function $c($p){return $p.replace(/^http:/,$$?'https:':'http:')}
function $d(){if(window.innerHeight!==a)return window.innerHeight
if(document.documentElement)return document.documentElement.offsetHeight
if(document.getElementsByTagName['body'].length)return document.getElementsByTagName['body'][0].clientHeight
return 0}
function $e(){if(window.innerWidth!==a)return window.innerWidth
if(document.documentElement)return document.documentElement.offsetWidth
if(document.getElementsByTagName['body'].length)return document.getElementsByTagName['body'][0].clientWidth
return 0}
if(B){var $f=[]
$a.leaksMemory=function($p){o.isFunction($p)
$f.push($p)}
var $g=function(){for(var $p=0;$p<$f.length;$p++)$f[$p]()}
$a.leaksMemory.remove=function($p){for(var $q=$f.length-1;$q>=0;$q--)if($p==$f[$q])$f.splice($q,1)}
window.attachEvent('onunload',$g)}
var $h='Shockwave Flash',$i='ShockwaveFlash.ShockwaveFlash',$j='application/x-shockwave-flash',$k='application/x-java-vm'
function $l(){var $p=w.plugins&&w.plugins[$h],$q
if($p){$q=w.mimeTypes&&w.mimeTypes[$j]
if($q&&!$q.enabledPlugin)return null
return $p.description}
else if(window.ActiveXObject){try {$p=new window.ActiveXObject($i)
$p.AllowScriptAccess='always'
return $p.GetVariable('$version')}catch($r){;}}}
function $m(){var $p=w.mimeTypes
if(y)return O?!1:('javaEnabled' in w)&&w.javaEnabled()
if($p&&($p=$p[$k])&&($p=$p.enabledPlugin))return $p.name}
function $n(){if(!k(Q))return Q
var $p=document.createElement('div'),$q=document.createElement('div'),$r=$p.style,$s=$q.style
$r.overflow='auto'
$r.width=$r.height='100px'
$r.position='absolute'
$r.top='-1000px'
$s.width='100%'
$s.height='200px'
$p.appendChild($q)
document.body.appendChild($p)
Q=$p.offsetWidth-$p.clientWidth
document.body.removeChild($p)
return Q}
var $o={browser:R,version:S,isStrict:U,isQuirks:V,isOpera:C,isSafari:E,isWebKit:F,isChrome:D,isAndroid:N,isIPhone:J,isIPod:K,isIPad:L,isIOS:M,isWP7:O,isMobile:P,isIE:y,isIE6:B,isIE7:A,isIE8:z,isFF:G,isFF2:H,isFF3:I,isBorderBox:T,isCustomEvents:$b,engineIE:X,bugs:$a,isWindows:Y,isMac:Z,isSecure:$$,secureURL:$c,hasFlash:$l(),hasJava:$m(),language:$_,getScrollbarSize:$n,getWindowClientHeight:$d,getWindowClientWidth:$e}
if((typeof $o==='function')&&$o.prototype&&!$o.__jx__no_fqname){$o.prototype.__jx__fqname_chain=[($o.prototype.__jx__fqname_chain||"")," ","jx_core_Browser"].join('')
$o.prototype.__jx__fqname="jx_core_Browser"}
return $o})(),q=b.Events=(function(){var w={extend:x,body:x(document.body,!0),window:x(window,!0),document:x(document,!0),runAfterScriptReady:A,runAfterFirstChildReady:B,runAfterDomReady:C}
w.extend(w)
function x(I,J){var K={},L={},M=function(W){if(!I.nodeType&&I!=window&&I!=document)return !0
if(I.tagName=='FORM'&&W=='submit')return !1
return !p.isCustomEvents&&(p.isFF&&p.isFF<9?!document.createEvent('event')[W.toUpperCase()]:typeof (I['on'+W])=='undefined')},N=function(W,X,Y){if(!W&&typeof X!='function')throw 'bad arguments to on / addEventListener'
if(!(W in K)){K[W]=[]
if(!M(W))O(W)}
K[W].push(X)
return I},O=function(W){if(W in L)return
L[W]=function(X){X&&(X.stopPropagation||T(X))
var Y,Z=K[W],$$=Z.length,$_=!0
Z._active=!0
for(Y=0;Y<$$;Y++){try {if(!Z[Y])continue
if(Z[Y].call(I,(p.isCustomEvents&&(X instanceof window.CustomEvent))?X.detail:X)===!1)$_=!1}catch($a){w.fire('error',$a)}}
Z._active=!1
if(Z._dirty){for(Y=0;Y<$$;Y++){if(!Z[Y]){if(Y==$$-1)Z.pop()
else Z[Y--]=Z.pop()
$$--}}
Z._dirty=!1}
if($_===!1){if(X){X.preventDefault()
X.returnValue=!1}
return !1}}
if(I.attachEvent)I.attachEvent('on'+W,L[W])
else if(I.addEventListener)I.addEventListener(W,L[W],!1)},P=function(W){var X=L[W]
if(!X)return
if(I.attachEvent)I.detachEvent('on'+W,X)
else if(I.addEventListener)I.removeEventListener(W,X,!1)
delete L[W]
delete K[W]},Q=function(W,X){var Y=K[W]
if(!Y)return
for(var Z=0,$$=Y.length;Z<$$;Z++)if(Y[Z]===X){if(Y.length==1){if(L[W])P(W)
else delete K[W]}
else if(Y._active)Y[Z]=null,Y._dirty=!0
else if(Z==$$-1)Y.pop()
else Y[Z]=Y.pop()
break}
return I},R=function(){if(K&&L){for(var W in L)if(L.hasOwnProperty(W))P(W)
K=L=null}},S=function(W,X){if(!p.isCustomEvents||M(W)){var Y=K[W],Z=!0
if(Y&&Y.length){Y._active=!0
var $$,$_,$a
for($$=0,$_=Y.length;$$<$_;$$++){try {$a=Y[$$].call(I,X)
if($a===!1)Z=!1}catch($b){w.fire('error',$b)}}
Y._active=!1
if(Y._dirty){for($$=0;$$<$_;$$++){if(!Y[$$]){if($$==$_-1)Y.pop()
else Y[$$--]=Y.pop()
$_--}}
Y._dirty=!1}}
return Z}
else{return I.dispatchEvent(new window.CustomEvent(W,{bubbles:!1,cancelable:!0,detail:X}))}},T=function(W){W.preventDefault=T.preventDefault
W.stopPropagation=T.stopPropagation
W.target=W.srcElement}
T.preventDefault=function(){this.returnValue=!1}
T.stopPropagation=function(){this.cancelBubble=!0}
var U={fire:S,on:N,un:Q,unextendEvents:R}
if(J)return U
for(var V in U)if(U.hasOwnProperty(V))I[V]=U[V]
if(p.bugs.leaksMemory)p.bugs.leaksMemory(function(){for(var W in U)if(U.hasOwnProperty(W))I[W]=null})
return I}
var y=0,z=[[],[],[],[]]
function A(I){D(0,I)}
function B(I){D(1,I)}
function C(I){D(2,I)}
function D(I,J){if(I<=y)J()
else z[I].push(J)}
function E(I){while(y<I){y++
for(var J=0;J<z[y].length;J++)z[y][J]()
z[y]=null}}
function F(){if(y>0)return
if(document.body&&document.body.firstChild)E(1)
else window.setTimeout(F,200)}
function G(){E(2)}
function H(){var I
if(p.isSafari){I=window.setInterval(function(){if(/loaded|complete/i.test(document.readyState)){window.clearInterval(I)
G()}},20)}
else if(document.addEventListener){if(/loaded|complete/i.test(document.readyState))G()
else document.addEventListener("DOMContentLoaded",G,!1)}
else if(p.isIE){window.attachEvent('onload',G)
var J=document.createElement('document:ready')
I=window.setInterval(function(){if(/loaded|complete/i.test(document.readyState)){J=null
window.clearInterval(I)
G()
return}
try {J.doScroll('left')}catch(K){return}
J=null
window.clearInterval(I)
G()},200)}}
F()
H()
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_Events"].join('')
w.prototype.__jx__fqname="jx_core_Events"}
return w})(),r=b.DataIFrame=(function(){function w(x){var y,z,A=q.extend(this)
if(window.ActiveXObject){y=new window.ActiveXObject('htmlfile')
y.open()
y.write('<script>document.win = window</script>')
y.close()
z=y.win}
else{var B=this.iframe=document.createElement('iframe'),C=B.style
A.allowTransparency='true'
A.frameBorder='0'
C.backgroundColor='transparent'
C.position='absolute'
C.width=C.height='1px'
C.left=C.top='-9999px'
C.border=0
document.body.appendChild(B)
try {z=B.contentWindow
y=z.document}catch(D){A.fire('error')
A.destroy()
return}}
A.doc=y
A.win=z
A.$Loader={cleanup:function(){l(function(){if(A.$Loader.payload)A.fire('success',A.$Loader.payload)
else A.fire('error')
A.$Loader.payload=null
if(!x)A.destroy()})}}
A.reusable=x}
w.prototype.setScope=function(x){this.scope=x}
w.prototype.load=function(x){this.doc.open()
this.win.$Loader=this.$Loader
this.win.$Loader.scope=this.scope||{}
this.doc.write('<html><head><script src="'+x+'"></script></head><body onload="try { $Loader.cleanup() } catch(e) {}"></body></html>')
this.doc.close()}
w.prototype.destroy=function(){try {this.iframe&&document.body.removeChild(this.iframe)
this.doc=this.win=this.iframe=this.win.$Loader=null}catch(x){;}}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_io_DataIFrame"].join('')
w.prototype.__jx__fqname="jx_io_DataIFrame"}
return w})(),s=b.ScriptLoader=(function(){function w(x,y,z){var A=this
q.extend(A)
var B=new r()
y=y||{}
B.setScope(y)
B.on('success',z)
B.on('error',function(C){A.onError(C)})
B.load(x)}
w.prototype.onError=function(x){x}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_io_ScriptLoader"].join('')
w.prototype.__jx__fqname="jx_io_ScriptLoader"}
return w})(),t=b.JCSS=(function(){var w={trim:/^\s+|\s+$/g,space:/ /g,repeatingLinearGradient:/^\s*repeating-linear-gradient/,prependFQName:/^(\*\*self|)(?!.+?keyframes)/,prePrependFQName:/^(?!\*\*self)/g,replacePseudo:/\:\:\:([A-Za-z_\-]+)/g,replaceAppend:/ +?&/g,placeholder:/::placeholder$/,replaceVariables:/(?:(?:& *:)?\$\$([A-Za-z_]+))(?=;)/g,replaceLeftovers:/(?:(?:[A-Za-z\-]+:)??(?:& *:)?(\$\$[A-Za-z_]*?)??)(?=;)/g,replaceMedia:/(.*)(@media.*)@mediaend(.*)/,commaStart:/^,/,selectorCase:/([A-Z]+)/g},x={placeholder:['::-webkit-input-placeholder',':-moz-placeholder','::-moz-placeholder',':-ms-input-placeholder','.placeholder']},y,z=[],A={},B={},C={},D='__jcss__default',E=0,F={},G=[],H,I={}
q.extend(I)
I.setIFrameOnly=function(V){y=m(V)}
I.generateAll=function(V){var W
for(var X in b)if(b.hasOwnProperty(X)){W=b[X]
if(W&&W.prototype&&W.__jx__jcss&&!W.__jx__jcss_generated){I.generate(null,W.prototype.__jx__fqname,W.__jx__jcss,null,W)
W.__jx__jcss_generated=!0}}
V||I.writeChanges()}
I.generate=function(V,W,X,Y,Z,$$){if(!X)return
if(!V&&!Z){return}
W=W?'.'+W.replace(w.trim,'').replace(w.space,'.'):''
X=X||{}
Y='_'+(Y||'')
var $_=[]
Z=Z||V.__jx__constructor
while(Z&&Z.prototype.__jx__super){Z=Z.prototype.__jx__super
if(Z.__jx__jcss)$_.unshift(O(Z.__jx__jcss,null,W,!0).join('\n'))}
try {$_.push(O(X,null,W,!0).join('\n'))}catch($b){;}
var $a=$_.join('')
if((Y in A)&&!$$){A[Y]=[A[Y],$a].join('')
if(!(Y in B))B[Y]=''
B[Y]=[B[Y],$a].join('')
C[Y]=!1}
else{A[Y]=$a
B[Y]=$a
C[Y]=!0}
if(!H)H=window.setTimeout(I.writeChanges,0)}
I.setPalette=function(V,W,X){V=V||{}
W=W||D
X=parseInt(X,10)
if(!F[W]&&isNaN(X)){return}
if(!isNaN(X)&&X<0){return}
if(W==D&&!isNaN(X)&&X!=E){return}
if(G[X]&&G[X]!=W){return}
var Y
for(var Z in V)if(V.hasOwnProperty(Z)){Y=typeof V[Z]
if(Y=='boolean'||Y=='number'||Y=='string')continue
V[Z]=O(V[Z],null,null,null,!0).join('')}
F[W]=V
if(!isNaN(X)){var $$=f(W,G)
if($$!=-1){G[$$]=a}
G[X]=W}}
I.setPalette({},D,E)
I.appendPalette=function(){}
I.getPalette=function(V){V=V||D
return F[V]||{}}
I.getVariable=function(V){for(var W=G.length-1;W>=0;W--){if(G[W]&&F[G[W]]&&V in F[G[W]]){return F[G[W]][V]}}}
I.reload=function(){I.writeChanges(!0)}
var J,K
function L(V,W){return J[W]||''}
I.writeChanges=function(V){if(H)window.clearTimeout(H)
H=null
var W=V?A:B,X,Y,Z,$$
J={}
K={}
for(Z in F)if(F.hasOwnProperty(Z)){$$=f(Z,G)
for(Y in F[Z])if(F[Z].hasOwnProperty(Y)){if(isNaN(K[Y])||$$>K[Y]){J[Y]=F[Z][Y]
K[Y]=$$}}}
for(Y in W)if(W.hasOwnProperty(Y)){if(!W[Y])continue
X=W[Y].replace(w.replaceVariables,L)
X=X.replace(w.replaceLeftovers,'')
if(!y)M(document,'jcss'+Y,X,V||C[Y])
for(var $_=0;$_<z.length;$_++)M(z[$_].idoc,'jcss'+Y,X,V||C[Y])
V||(W[Y]='')
C[Y]=!1}
I.fire('write',X)}
I.bindIFrame=function(V){for(var W=0,X=z.length;W<X;W++)if(V===z[W])return
z.push(V)
for(var Y in A)if(A.hasOwnProperty(Y))M(V.idoc,'jcss'+Y,A[Y])}
I.unbindIFrame=function(V){for(var W=0,X=z.length;W<X;W++)if(V===z[W])z.splice(W,1)}
function M(V,W,X,Y){if(!V)V=document
var Z=N(V,W)
if(!Z){Z=V.createElement('style')
V.getElementsByTagName('head')[0].appendChild(Z)
Z.type='text/css'
W&&Z.setAttribute('__jx__stylesheet_id',W)
if(Z.styleSheet!==a){if(!Z.styleSheet){V.getElementsByTagName('head')[0].removeChild(Z)
Z=null
return}
Z.styleSheet.cssText=X}
else{Z[typeof document.body.textContent!='undefined'?'textContent':'innerText']=X}}
else{if(Y){if(Z.styleSheet){Z.styleSheet.cssText=X}
else{Z[typeof document.body.textContent!='undefined'?'textContent':'innerText']=X}}
else{if(Z.styleSheet){Z.styleSheet.cssText=[Z.styleSheet.cssText,X].join('')}
else{var $$=document.createTextNode(X)
Z.appendChild($$)}}}}
function N(V,W){if(!W)return
if(!V)V=document
for(var X=0,Y=V.styleSheets.length;X<Y;X++){if(((V.styleSheets[X].ownerNode&&V.styleSheets[X].ownerNode.getAttribute('__jx__stylesheet_id'))||(V.styleSheets[X].owningElement&&V.styleSheets[X].owningElement.getAttribute('__jx__stylesheet_id')))==W){return ((V.styleSheets[X].ownerNode&&V.styleSheets[X].ownerNode)||(V.styleSheets[X].owningElement&&V.styleSheets[X].owningElement))}}}
function O(V,W,X,Y,Z){var $$=[],$_=[],$a,$b,$c,$d,$e,$f
for($a in V)if(V.hasOwnProperty($a)){$b=V[$a]
$c=a
if($a=='@keyframes'){$f=[]
for(var $g in $b)if($b.hasOwnProperty($g)){$f=O($b[$g])
$_.push(U(['@-webkit-keyframes ',$g,' { ',$f.join(' '),' } ']))
$_.push(U(['@-moz-keyframes ',$g,' { ',$f.join(' '),' } ']))
$_.push(U(['@-ms-keyframes ',$g,' { ',$f.join(' '),' } ']))
$_.push(U(['@-o-keyframes ',$g,' { ',$f.join(' '),' } ']))
$_.push(U(['@keyframes ',$g,' { ',$f.join(' '),' } ']))}
continue}
if($a.slice(0,6)=='@media'){$a=[$a,'@mediaend'].join('')}
switch(typeof $b){case 'boolean':case 'number':case 'string':$c=$a.split(',')
for($d=0,$e=$c.length;$d<$e;$d++)$$.push(P($c[$d],$b))
break
default:if(g($b)){for($d=0,$e=$b.length;$d<$e;$d++)$$.push(P($a,$b[$d]))
break}
if(w.placeholder.test($a)){$f=$a.replace(w.placeholder,'')
$c=[]
for($d=0,$e=x.placeholder.length;$d<$e;$d++)$c.push(U([$f,x.placeholder[$d]]))}
if(!g($c))$c=$a.split(',')
for($d=0,$e=$c.length;$d<$e;$d++)$_=$_.concat(O($b,$c[$d].replace(w.trim,'')))
break}}
if($$.length){if(!Z){$$.unshift('{')
$$.push('}')}
$_.push($$.join(''))}
if(W||X||(Y&&!(p.isIE<9))){for($d=0,$e=$_.length;$d<$e;$d++){W&&($_[$d]=[W.replace(w.replacePseudo,'\.$1'),' ',$_[$d]].join(''))
X&&($_[$d]=$_[$d].replace(w.prePrependFQName,' ').replace(w.prependFQName,X).replace(w.replaceAppend,''))
Y&&($_[$d]=$_[$d].replace(w.replaceMedia,"$2 { $1 $3 }"))}}
return $_}
function P(V,W){function X($b){Y.push(U([$b,(Z?' !important;':';')]))}
var Y=[],Z,$$=W&&W.split&&W.split(' ')
if($$&&$$.length&&$$[$$.length-1]=='!important'){Z=!0
$$.pop()
W=$$.join(' ')}
switch(V){case 'background':Y.push(U([V,':']))
switch($$[0]){case 'linear-gradient':$$.splice(0,1)
W=$$.join(' ')
X(U(['-webkit-linear-gradient',W]))
X(U(['background:-o-linear-gradient',W]))
X(U(['background:-moz-linear-gradient',W]))
X(U(['background:-ms-linear-gradient',W]))
X(U(['background:-linear-gradient',W]))
break
case 'gradient':var $_,$a
X(T($$[2],$$[3]));($$[1]=='top')&&($_='bottom');($$[1]=='left')&&($_='right');($$[1]=='right')&&($_='left');($$[1]=='bottom')&&($_='top')
$a=U([$$[1],',',$$[2],',',$$[3],')'])
X(U(['background:-o-linear-gradient(',$a]))
X(U(['background:-moz-linear-gradient(',$a]))
X(U(['background:-ms-linear-gradient(',$a]))
X(U(['background:linear-gradient(',$a]))
if($$[1]=='left'||$$[1]=='right'){X(U(['background:-webkit-gradient(linear,',$$[1],' center,',$_,' center,from(',$$[2],'),to(',$$[3],'))']))
X(U(['filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=',Q($$[2]),', endColorstr=',Q($$[3]),', GradientType=1)']))
X(U(['-ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=',Q($$[2]),', endColorstr=',Q($$[3]),', GradientType=1)']))}
else{X(U(['background:-webkit-gradient(linear,center ',$$[1],',center ',$_,',from(',$$[2],'),to(',$$[3],'))']))
X(U(['filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=',Q($$[2]),', endColorstr=',Q($$[3]),')']))
X(U(['-ms-filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=',Q($$[2]),', endColorstr=',Q($$[3]),')']))}
break
default:if(W.slice(0,4)=='rgba'){X(R(W,!0))
Y.push(U([V,':']))}
X(W)
break}
break
case 'radius':case 'borderRadius':switch($$.length){case 1:$$[1]=$$[0]
case 2:$$[2]=$$[0]
case 3:$$[3]=$$[1]
default:X(U(['-moz-border-radius-topleft:',$$[0]]))
X(U(['-moz-border-radius-topright:',$$[1]]))
X(U(['-moz-border-radius-bottomleft:',$$[2]]))
X(U(['-moz-border-radius-bottomright:',$$[3]]))
X(U(['border-top-left-radius:',$$[0]]))
X(U(['border-top-right-radius:',$$[1]]))
X(U(['border-bottom-left-radius:',$$[2]]))
X(U(['border-bottom-right-radius:',$$[3]]))
X(U(['-webkit-border-top-left-radius:',$$[0]]))
X(U(['-webkit-border-top-right-radius:',$$[1]]))
X(U(['-webkit-border-bottom-left-radius:',$$[2]]))
X(U(['-webkit-border-bottom-right-radius:',$$[3]]))
break}
break
case 'boxShadow':X(U(['-moz-box-shadow:',W]))
X(U(['-webkit-box-shadow:',W]))
X(U(['box-shadow:',W]))
break
case 'userSelect':X(U(['-moz-user-select:',W]))
X(U(['-webkit-user-select:',W]))
X(U(['-o-user-select:',W]))
X(U(['user-select:',W]))
break
case 'appearance':X(U(['-webkit-appearance:',W]))
X(U(['-moz-appearance:',W]))
X(U(['appearance:',W]))
break
case 'animation':X(U(['-webkit-animation:',W]))
X(U(['-moz-animation:',W]))
X(U(['-ms-animation:',W]))
X(U(['-o-animation:',W]))
X(U(['animation:',W]))
break
case 'transform':X(U(['-webkit-transform:',W]))
X(U(['-moz-transform:',W]))
X(U(['-ms-transform:',W]))
X(U(['-o-transform:',W]))
X(U(['transform:',W]))
break
case 'transition':X(U(['-webkit-transition:',W]))
X(U(['-moz-transition:',W]))
X(U(['-o-transition:',W]))
X(U(['transition:',W]))
break
case 'rotate':X(U(['-webkit-transform:rotate(',W,'deg)']))
X(U(['-moz-transform:rotate(',W,'deg)']))
X(U(['-ms-transform:rotate(',W,'deg)']))
X(U(['-o-transform:rotate(',W,'deg)']))
break
case 'opacity':X(U(['opacity:',W]))
X(U(['-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=',W*100,')"']))
X(U(['filter:alpha(opacity=',W*100,')']))
X(U(['-moz-opacity:',W]))
X(U(['-webkit-opacity:',W]))
X(U(['-o-opacity:',W]))
break
case 'textOverflow':X(U(['text-overflow:',W]))
X(U(['-o-text-overflow:',W]))
X(U(['-ms-text-overflow:',W]))
break
case 'display':if(p.bugs.noBoxSizing&&W=='inline-block'){X('display:inline')
X('zoom:1')}
else X(U(['display:',W]))
break
case 'backgroundImage':if(w.repeatingLinearGradient.test(W)){Y.push('background-image:')
W=W.replace(w.repeatingLinearGradient,'');(p.isChrome||p.isIOS||p.isSafari)?X(U(['-webkit-repeating-linear-gradient',W])):p.isFF?X(U(['-moz-repeating-linear-gradient',W])):p.isOpera?X(U(['-o-repeating-linear-gradient',W])):p.isIE?X(U(['-ms-repeating-linear-gradient',W])):X(U(['repeating-linear-gradient',W]))
break}
default:Y.push(V.replace(w.selectorCase,"-$1").replace(w.commaStart,"").toLowerCase())
X(U([':',W]))
break}
return Y.join('')}
function Q(V){if(typeof V!='string')return ''
var W
W=V.charAt(0)=='#'?V.substring(1):V
if(W.slice(0,3)=='rgb')return R(W)
if(W.length==3)W=W.charAt(0)+W.charAt(0)+W.charAt(1)+W.charAt(1)+W.charAt(2)+W.charAt(2)
return '#'+W}
function R(V,W){V=V.slice(5,-1)
V=V.split(',')
if(V.length==3||W)return '#'+S(V[0])+S(V[1])+S(V[2])
V[3]=(parseFloat(V[3],10)*255).toFixed()
return '#'+S(V[3])+S(V[0])+S(V[1])+S(V[2])}
function S(V){V=parseInt(V,10).toString(16)
if(V.length==1)V='0'+V
return V}
function T(V,W){(V.slice(0,3)=='rgb')&&(V=R(V,!0));(W.slice(0,3)=='rgb')&&(W=R(W,!0))
V=Q(V).substring(1)
W=Q(W).substring(1)
var X=$$(0),Y=$$(2),Z=$$(4)
return ('#'+X+Y+Z)
function $$($_){return (Math.round((parseInt(V.substring($_,$_+2),16)+parseInt(W.substring($_,$_+2),16))/32)*16).toString(16)}}
function U(V){return V.join('')}
if((typeof I==='function')&&I.prototype&&!I.__jx__no_fqname){I.prototype.__jx__fqname_chain=[(I.prototype.__jx__fqname_chain||"")," ","jx_core_JCSS"].join('')
I.prototype.__jx__fqname="jx_core_JCSS"}
return I})(),u=b.Element=(function(){var w={create:M,extend:S,appendChild:O,addChildren:P,hasParentNode:N,id:C,get:H,set:F,unset:G,mangleIDs:I,generateID:C,nativeGenerator:J,getStyles:Q,processDeferredStyles:A}
function x(Z,$$,$_){try {Z.style[Y($$)]=$_}catch($a){if(console)console.log('Failed to set style.'+$$+' to "'+$_+'": '+$a.description)}}
var y=x
function z(){}
function A(){}
var B=1
function C(){return '___$_'+B++}
var D='__JX__ID',E={}
function F(Z,$$){var $_=$$.getAttribute(D)
$_=$_?$_.split(' '):[]
Z||(Z=C())
E[Z]=$$
$_.push(Z)
$$.setAttribute(D,$_.join(' '))}
function G(Z){var $$=Z.getAttribute(D)
if(!$$)return
$$=$$.split(' ')
for(var $_=0;$_<$$.length;$_++)delete E[$$[$_]]}
function H(Z){return E[Z]}
if(p.bugs.leaksMemory)p.bugs.leaksMemory(function(){for(var Z=0,$$=E.length,$_;Z<$$;Z++){$_=E[Z]
$_.plugLeakage&&$_.plugLeakage()}})
function I(Z,$$){var $_
for(var $a=0;$a<$$.length;$a++){$_=$$[$a]
if(typeof ($_)!='string'){if($_[1])$_[1]=Z+'__'+$_[1]
if($_[3])I(Z,$_[3])}}
return $$}
function J(Z){var $$=function($_,$a,$b,$c,$d){$a=$a||C()
var $e=$_.ownerDocument,$f=w.create($e,Z,$a)
$f.__jx__constructor=$$
$f.__jx__native=!0
var $g=!1
$f.appendToParent=function($h){if(!w.hasParentNode($f))w.appendChild($_,$f)
if($h&&!$g){if($_.appendToParent)$_.appendToParent(!0)
$g=!0}}
$f.setStyle($b)
$f.setAttributes($d)
w.addChildren($f,$c)
$f.appendToParent()
return $f}
return $$}
function K(Z){while(Z.defaultPlacement)Z=Z.defaultPlacement
return Z}
function L(Z){if(Z.createElement)return Z
return K(Z).ownerDocument}
function M(Z,$$,$_,$a){var $b=L(Z).createElement($$)
if(p.isSafari&&$$.toLowerCase()=='textarea'){$b.style.resize='none'}
switch($$.toLowerCase()){case 'textarea':case 'input':$b.style.outlineStyle='none'}
z($b)
F($_,$b)
S($b)
q.extend($b)
$b.setStyle($a)
if(p.buggyCSS)$b.setOverflow('auto')
return $b}
function N(Z){return (Z.parentNode&&Z.parentNode.nodeType&&Z.parentNode.nodeType!=11)}
function O(Z,$$){if(Z==document.body&&($$.style.position=='absolute'||$$.style.position=='fixed')){Z.insertBefore($$,Z.firstChild)
$$.applyConstraints()
return}
var $_=Z
while($_.defaultPlacement)$_=$_.defaultPlacement
$_.appendChild($$)
$$.applyConstraints()}
function P(Z,$$){if(!$$||!$$.length)return
Z=K(Z)
var $_,$a,$b=Z.ownerDocument,$c
for(var $d=0;$d<$$.length;$d++){$a=$$[$d]
if(g($a))$_=$a[0](Z,$a[1],$a[2],$a[3],$a[4])
else{$c=$b.createTextNode($a)
Z.appendChild($c)
if(typeof $a.bind=='function')$a.bind($c)}}
return $_}
function Q(Z){var $$=Z.ownerDocument
if($$.defaultView&&$$.defaultView.getComputedStyle)return $$.defaultView.getComputedStyle(Z,null)||{}
if(Z.currentStyle)return Z.currentStyle
return {}}
function R(Z,$$){return Q(Z)[$$]}
function S(Z,$$){var $_=Z.style,$a=Z.ownerDocument,$b=$a.compatMode=='BackCompat',$c=!!($a.documentElement&&$a.documentElement.style.setExpression),$d=p.isIE6||(p.isIE&&$b&&$c)
function $e($1){var $2
for(var $3 in $1)if($1.hasOwnProperty($3)){$2='set'+$3.substr(0,1).toUpperCase()+$3.substr(1)
if(typeof Z[$2]=='function')Z[$2]($1[$3])}}
function $f(){return Z.innerText||Z.textContent||''}
function $g($1){v&&v.unbind&&v.unbind(Z)
if($1&&typeof $1.bind=='function')$1.bind(Z)
if(typeof document.body.textContent!='undefined')Z.textContent=$1
else Z.innerText=$1}
function $h($1){var $2,$3
if(arguments.length==1&&i($1)){if(!$1)return
$1=$1.split(';')
for($2=0;$2<$1.length;$2++){if($1[$2].match(/^\s*$/))continue
$3=$1[$2].match(/\s*([^:]+):\s*(.*?)\s*$/)
if(!$3&&$1[$2].length){if(console)console.log('Bad style: "'+$1[$2]+'"')
continue}
$5($3[1],$3[2])}}
else if(arguments.length==1&&typeof ($1)=='object'){for(var $4 in $1)if($1.hasOwnProperty($4))$5($4,$1[$4])}
else if(arguments.length>1){for($2=0;$2<arguments.length;$2+=2)$5(arguments[$2],arguments[$2+1])}
function $5($6,$7){var $8=Y('set-'+$6)
if(typeof Z[$8]=='function')Z[$8]($7)
else y(Z,$6,$7)}}
function $i($1){function $2(){var $3=(v&&v.flip)?v.flip($1):$1
if(p.isIE)$_.styleFloat=$3
else $_.cssFloat=$3}
;
v&&v.onLanguage&&v.onLanguage($2)
$2()
return Z}
var $j,$k,$l,$m,$n,$o,$p,$q,$r
$j=$k=$l=$m=$n=$o=NaN
$p=null
function $s($1){$j=$y($1)
$A()
return Z}
function $t($1){$l=$y($1)
$A()
return Z}
function $u($1){$k=$y($1)
$A()
return Z}
function $v($1){$m=$y($1)
$A()
return Z}
function $w($1){$n=$y($1)
$A()
return Z}
function $x($1){$o=$y($1)
$A()
return Z}
function $y($1){return (i($1)&&$1.substr($1.length-1)=='%')?parseInt($1,10)+'%':parseInt($1,10)}
function $z($1){switch($1){case 'static':case 'relative':case 'absolute':case 'fixed':$p=$1}
if($p!==null)y(Z,'position',($d&&$p=='fixed')?'absolute':$p)
return Z}
function $A(){if(!isNaN($j)&&!isNaN($o))$k=NaN
if(!isNaN($l)&&!isNaN($n))$m=NaN
if($n<0)$n=0
if($o<0)$o=0
$B()}
function $B(){if(!w.hasParentNode(Z))return
if(p.bugs.ie.cssFixed&&$p=='fixed'){l($C,Z,!0)
return}
if(p.bugs.ie.cssBottomRight&&((!isNaN($l)&&!isNaN($m))||(!isNaN($j)&&!isNaN($k)))){$E()
return}
$F()}
function $C(){$D()
if(Z.appendToParent)Z.appendToParent(!0)
if($k<0)$k=0
if($m<0)$m=0
o.ok(isNaN($l)!=isNaN($m),'One and only one of left/right must be set')
o.ok(isNaN($j)!=isNaN($k),'One and only one of top/bottom must be set')
o.ok(!isNaN($n),'Width must be set')
o.ok(!isNaN($o),'Height must be set')
o.ok(Z.ownerDocument==document,'Fixed element must be top level element')
if($o!=$r){$_.height=$o+'px'
$r=$o}
if($n!=$q){$_.width=$n+'px'
$q=$n}
var $1,$2,$3,$4
if(p.isQuirks){$4='document.body.clientHeight'
$3='document.body.clientWidth'
$1='(dummye34cf6=document.body.scrollLeft)+'
$2='(dummye34cf6=document.body.scrollTop )+'}
else{$4='document.documentElement.clientHeight'
$3='document.documentElement.clientWidth'
$1='(dummye34cf6=document.documentElement.scrollLeft)+'
$2='(dummye34cf6=document.documentElement.scrollTop )+'}
if(!isNaN($l))$1+=$l
else if(i($l))$1+=parseInt($l,10)/100*(p.isQuirks?document.body:document.documentElement).clientWidth
else $1+=$3+'-'+($n+$m)
if(!isNaN($j))$2+=$j
else if(i($j))$2+=parseInt($j,10)/100*(p.isQuirks?document.body:document.documentElement).clientHeight
else $2+=$4+'-'+($o+$k)
if(p.isIE6&&document.body.currentStyle.direction=='rtl'){if(p.isQuirks)$1+='-(document.body.scrollWidth-document.body.clientWidth)'
else $1+='-(document.documentElement.scrollWidth-document.documentElement.clientWidth)'}
$_.setExpression('left',$1+'+"px"')
$_.setExpression('top',$2+'+"px"')}
function $D(){if($D.alreadyHacked)return
$D.alreadyHacked=1
if(p.isStrict)document.body.parentNode.style.background='#fff url(https://) fixed'
else{if(document.body.currentStyle.backgroundAttachment!='fixed'){if(document.body.currentStyle.backgroundImage!='none'){var $1=document.createElement('div'),$2=$1.style,$3=document.body.currentStyle
$2.backgroundAttachment=$3.backgroundAttachment
$2.backgroundColor=$3.backgroundColor
$2.backgroundImage=$3.backgroundImage
$2.backgroundPositionX=$3.backgroundPositionX
$2.backgroundPositionY=$3.backgroundPositionY
$2.backgroundRepeat=$3.backgroundRepeat
$2.position='absolute'
$2.zIndex=-1
$2.top=$2.left=0
$2.width='100%'
document.body.insertBefore($1,document.body.firstChild)
var $4=!1,$5=0,$6,$7,$8=function(){if(!$4&&$5){$6+=document.body.clientWidth-$5
$2.width=$6+'px'
$5=document.body.clientWidth}
if($7)return
$7=setTimeout(function(){$2.width=0
document.body.className=document.body.className
$6=Math.max(document.body.scrollWidth,document.body.clientWidth)
$2.width=$6+'px'
$5=document.body.clientWidth
$4=document.body.scrollWidth>document.body.clientWidth
$7=null},0)}
setTimeout($8,0)
$2.setExpression('height','document.body.scrollHeight+"px"')
$8()}
document.body.style.backgroundImage='url(https://)'
document.body.style.backgroundAttachment='fixed'}}}
function $E(){if(Z.appendToParent)Z.appendToParent(!0)
$D()
var $1=isNaN($l)?'':$l,$2=isNaN($m)?'':$m,$3=isNaN($n)?'':$n,$4,$5=isNaN($j)?'':$j,$6=isNaN($k)?'':$k,$7=isNaN($o)?'':$o,$8,$9=Z.ownerDocument.compatMode=='BackCompat'
if($p=='fixed'&&Z.ownerDocument==document){if($9){$8='document.body.clientHeight'
$4='document.body.clientWidth'}
else{$8='document.documentElement.clientHeight'
$4='document.documentElement.clientWidth'}}
else{$8='this.offsetParent.clientHeight'
$4='this.offsetParent.clientWidth'}
if(p.isIE6){if(!isNaN($l)&&!isNaN($m)){$2=''
$3=[$4,$l,$m].join('-')}
if(!isNaN($j)&&!isNaN($k)){$6=''
$7=[$8,$j,$k].join(' - ')}}
if($p=='fixed'&&Z.ownerDocument==document){if($9){if(!isNaN($l)||isNaN($m))$1+='+(dummye34cf6=document.body.scrollLeft)'
else{$1+='+(dummye34cf6=document.body.scrollLeft)+document.body.clientWidth-this.offsetWidth-'+$m
$2=''}
if(!isNaN($j)||isNaN($k))$5+='+(dummye34cf6=document.body.scrollTop)'
else{$5+='+(dummye34cf6=document.body.scrollTop)+document.body.clientHeight-this.offsetHeight-'+$k
$6=''}}
else{if(!isNaN($l)||isNaN($m))$1+='+(dummye34cf6=document.documentElement.scrollLeft)'
else if(p.isIE6){$1+='+(dummye34cf6=document.documentElement.scrollLeft)+document.documentElement.clientWidth-this.offsetWidth-'+$m
$2=''}
else $2+='+document.documentElement.scrollWidth-(dummye34cf6=document.documentElement.scrollLeft)-document.documentElement.clientWidth'
if(!isNaN($j)||isNaN($k))$5+='+(dummye34cf6=document.documentElement.scrollTop)'
else if(p.isIE6){$5+='+(dummye34cf6=document.documentElement.scrollTop)+document.documentElement.clientHeight-this.offsetHeight-'+$k
$6=''}
else $6+='+document.documentElement.scrollHeight - (dummye34cf6=document.documentElement.scrollTop) - document.documentElement.clientHeight'}}
var _$,__
if(0&&Z.parentNode==document.body)window.attachEvent('onscroll',function(){if(!_$){_b('left',$1)
_b('right',$2)
_b('width',$3)
_b('top',$5)
_b('bottom',$6)
_b('height',$7)
_$=setInterval(function(){__--
if(!__)_a()},200)}
__=5})
function _a(){$_.removeExpression('left')
$_.removeExpression('right')
$_.removeExpression('width')
$_.removeExpression('top')
$_.removeExpression('bottom')
$_.removeExpression('height')
clearInterval(_$)
_$=!1}
_b('left',$1)
_b('right',$2)
_b('width',$3)
_b('top',$5)
_b('bottom',$6)
_b('height',$7)
function _b(_c,_d){$_[_c]=''
$_.removeExpression(_c)
if(typeof (_d)=='number')$_[_c]=_d+'px'
else if(i(_d)&&_d.substr(_d.length-1)=='%')$_[_c]=_d
else if(i(_d)&&_d.length)$_.setExpression(_c,_d)}}
function $F(){$H()
$G()}
function $G(){$_.top=i($j)?$j:isNaN($j)?'':$j+'px'
$_.bottom=i($k)?$k:isNaN($k)?'':$k+'px'
if($o!=$r){$_.height=i($o)?$o:isNaN($o)?'':$o+'px'
$r=$o}}
function $H(){$_.left=i($l)?$l:isNaN($l)?'':$l+'px'
$_.right=i($m)?$m:isNaN($m)?'':$m+'px'
if($n!=$q){$_.width=i($n)?$n:isNaN($n)?'':$n+'px'
$q=$n}}
var $I='',$J=0,$K=0
Z.dock=function($1,$2,$3){$I=$1
if(j($2))$J=$2
if(j($3))$K=$3
$L()
Z.on('jx:resize',$L)}
function $L(){var $1=isNaN($n)?Z.offsetWidth:$n,$2=isNaN($o)?Z.offsetHeight:$o,$3,$4,$5,$6,$7,$8
$3=$4=$5=$6=NaN
$7=$8=0
switch($I.charAt(0)){case 't':$3=0
break
case 'm':$3='50%'
break
case 'b':$4=0
break}
switch($I.charAt(1)){case 'l':$5=0
break
case 'c':$5='50%'
break
case 'r':$6=0
break}
if($3=='50%')$7=-($2/2)
if($5=='50%')$8=-($1/2)
var $9=0
if($K>=0||!isNaN($3)||typeof ($3)=="string"){$7+=$K}
else{$9=-$K}
$8+=$J
Z.setMargin([$7+'px',0,$9+'px',$8+'px'].join(' ')).setTop($3).setBottom($4).setLeft($5).setRight($6)}
var $M,$N=[0,0,0,0]
function $O($1){if(!g($1)){$1=$1.split(' ')
$1[0]=parseInt($1[0],10)
$1[1]=parseInt($1[1],10)
$1[2]=parseInt($1[2],10)
$1[3]=parseInt($1[3],10)}
if($d){$1[1]=Math.max(0,$1[1])
$1[2]=Math.max(0,$1[2])}
$M=$1
return Z}
function $P($1){if(!g($1)){$1=$1.split(' ')
$1[0]=parseInt($1[0],10)
$1[1]=parseInt($1[1],10)
$1[2]=parseInt($1[2],10)
$1[3]=parseInt($1[3],10)}
$N=[Math.max(0,$1[0]),Math.max(0,$1[1]),Math.max(0,$1[2]),Math.max(0,$1[3])]
return Z}
function $Q(){if(!$M)return
if($l<$M[3]+$N[3])$l=$M[3]
if($m<$M[1]+$N[1])$m=$M[1]
if($j<$M[0]+$N[0])$j=$M[0]
if($k<$M[2]+$N[2])$k=$M[2]
var $1=p.isQuirks?document.body:document.documentElement,$2=isNaN($n)?Z.offsetWidth:$n,$3=$1.clientWidth-$2,$4=$1.clientHeight-Z.offsetHeight
if($3-$l<=$M[1]+$N[1])$l=$3-$M[1]
if($3-$m<=$M[3]+$N[3])$m=$3-$M[3]
if($4-$j<=$M[2]+$N[2])$j=$4-$M[2]
if($4-$k<=$M[0]+$N[0])$k=$4-$M[0]}
function $R($1,$2){$k=$m=NaN
$j=$2
$l=$1
$Q()
$B()
return Z}
function $S($1,$2){if(isNaN($l)&&isNaN($m))$l=0
if(isNaN($j)&&isNaN($k))$j=0
if(!isNaN($l))$l+=$1
if(!isNaN($m))$m-=$1
if(!isNaN($j))$j+=$2
if(!isNaN($k))$k-=$2
$Q()
$B()}
function $T($1,$2,$3,$4){if($1){if(isNaN($n))$n=Z.offsetWidth
$n=Math.max($3||0,$n+$1)}
if($2){if(isNaN($o))$o=Z.offsetHeight
$o=Math.max($4||0,$o+$2)}
$Q()
$B()
Z.fire('jx:resize')
return Z}
var $U=!1
function $V($1){if($1=='none'||$1=='block')$U=!0
if($1=='none'||$1=='hidden'||$1=='false'||!$1)$W()
else $Y()
return Z}
function $W(){if($U){if($_.display!='none'){$_.display='none'
Z.fire('hide')}}
else{if($_.visibility!='hidden'){$_.visibility='hidden'
Z.fire('hide')}}
return Z}
function $X(){if($U)return Z.getStyle('display')!='none'
else return Z.getStyle('visibility')=='visible'}
function $Y(){if($U){if($_.display!='block'){$_.display='block'
Z.fire('show')}}
else{if($_.visibility!='visible'){$_.visibility='visible'
Z.fire('show')}}
return Z}
Z.getStyles=function(){return Q(Z)}
Z.getStyle=function($1){return R(Z,$1)}
Z.setAttributes=$e
Z.getText=$f
Z.setText=$g
Z.setStyle=$h
Z.setFloat=$i
Z.setPosition=$z
Z.setTop=$s
Z.setBottom=$u
Z.setLeft=$t
Z.setRight=$v
Z.setHeight=$x
Z.setWidth=$w
Z.applyConstraints=$B
Z.setVisible=$V
Z.setBounds=$O
Z.setSnaps=$P
Z.move=$S
Z.moveTo=$R
Z.resizeBy=$T
Z.hide=$W
Z.show=$Y
Z.isVisible=$X
for(var $Z in T)if(T.hasOwnProperty($Z))Z[$Z]=T[$Z]
if($$){var $0=Z.firstChild
while($0){S($0,!0)
$0=$0.nextSibling}}
return Z}
var T=w.proto={$:function(Z){return H(this.id+'__'+Z)},destroy:function(){if(this._destructors){for(var Z=this._destructors,$$=Z.length,$_=0;$_<$$;$_++)Z[$_].call(this)}
this.parentNode&&this.parentNode.removeChild(this)
this._autobinds&&this.autounbind()
typeof this.empty=='function'&&this.empty()
typeof this.unextendEvents=='function'&&this.unextendEvents()
G(this)
if(p.bugs.leaksMemory)typeof this.plugLeakage=='function'&&this.plugLeakage()},empty:function(){var Z
while((Z=this.firstChild)){if(typeof Z.destroy=='function')Z.destroy()
else if(Z.jx_wrapper)Z.jx_wrapper.destroy()
else if(Z.nodeType==1)T.destroy.call(Z)
else this.removeChild(Z)}},onDestruction:function(Z){(this._destructors||(this._destructors=[])).push(Z)},autobind:function(Z,$$,$_){Z.on($$,$_)
this._autobinds||(this._autobinds=[])
this._autobinds.push([Z,$$,$_])},autounbind:function(Z,$$,$_){var $a=this._autobinds,$b,$c
if(Z&&$$&&$_){for($b=$a.length-1;$b>=0;$b--){$c=$a[$b]
if($c[0]==Z&&$c[1]==$$&&$c[2]==$_){$a.splice($b,1)
$c[0].un($c[1],$c[2])
return}}
return}
if(!Z&&!$$&&!$_){if(!$a)return
for($b=$a.length-1;$b>=0;$b--){$c=$a[$b]
$c[0].un($c[1],$c[2])}
return}},getXY:function(){var Z,$$,$_=this.offsetParent
Z=this.offsetLeft
$$=this.offsetTop
while($_){Z+=$_.offsetLeft
$$+=$_.offsetTop
$_=$_.offsetParent}
return [Z,$$]},getFixedXY:function(){var Z=0,$$=0,$_=this
if("getBoundingClientRect" in this){var $a=this.ownerDocument,$b=$a.body,$c=$a.defaultView||$_.parentWindow||!1,$d=$_.getBoundingClientRect(),$e=$a.clientTop||$b.clientTop||0,$f=$a.clientLeft||$b.clientLeft||0,$g=$c.pageYOffset||$b.scrollTop,$h=$c.pageXOffset||$b.scrollLeft
$$=$d.top+$g-$e
Z=$d.left+$h-$f}
else{$$=$_.offsetTop
Z=$_.offsetLeft
while(($_=$_.offsetParent)){$$-=$_.scrollTop,Z-=$_.scrollLeft
$$+=$_.offsetTop,Z+=$_.offsetLeft}}
return [Z,$$]},toggle:function(){this.isVisible()?this.hide():this.show()
return this},setOpacity:function(Z){Z=Math.max(Math.min(Z,1),0)
if(p.isIE)this.style.filter=(this.style.filter||'').replace(/progid:DXImageTransform.Microsoft.Alpha\([^\)]*\),? ?/gi,'')+(Z>=1?'':'progid:DXImageTransform.Microsoft.Alpha(opacity='+Z*100+'), ')
else this.style.opacity=Z
return this},setBackgroundImage:function(Z){var $$=Z
if($$&&p.isIE)this.style.filter+='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+$$+'",sizingMethod="scale"), '
else this.style.backgroundImage='url("'+Z+'")'
return this},setClass:function(Z){this.className=Z
return this},addClass:function(Z){this.removeClass(Z)
this.className+=' '+Z
return this},removeClass:function(Z){var $$=this.className.split(' ')
for(var $_=0;$_<$$.length;$_++){if($$[$_]==Z){$$[$_]=""}}
this.className=$$.join(' ')
return this},setRotation:function(Z){if(p.isFF)this.style.MozTransform=Z?'rotate('+Z+'deg)':''
else if(p.isSafari)this.style.WebkitTransform=Z?'rotate('+Z+'deg)':''
else if(p.isIE){this.style.filter=Z?'progid:DXImageTransform.Microsoft.BasicImage(rotation='+Math.round(Z/90)+')':''
if(p.isIE8&&Z){var $$=this.getElementsByTagName('iframe')
if(p.isIE8&&$$.length){$$[0].style.filter=Z?'progid:DXImageTransform.Microsoft.BasicImage(rotation='+Math.round(Z/90)+')':''
this.style.overflow='visible'}}}
return this},setSelectable:function(Z){function $$(){return !1}
if(Z&&Z!='false'){this.unselectable='on'
if(typeof this.style.MozUserSelect!='undefined')this.style.MozUserSelect='none'
else if(typeof this.style.WebkitUserSelect!='undefined')this.style.WebkitUserSelect='none'
else if(typeof this.onselectstart!='undefined')this.un('selectstart',$$)}
else{this.unselectable='on'
if(typeof this.style.MozUserSelect!='undefined')this.style.MozUserSelect='none'
else if(typeof this.style.WebkitUserSelect!='undefined')this.style.WebkitUserSelect='none'
else if(typeof this.onselectstart!='undefined')this.on('selectstart',$$)}
return this},setScrollTop:function(Z){this.scrollTop=Z
return this}}
if(p.leaksMemory)T.plugLeakage=function(){this.unextendEvents&&this.unextendEvents()
this.$=this.plugLeakage=this.destroy=this.empty=this.autobind=this.autounbind=this._autobinds=this._destructors=this.onDestruction=this.getXY=this.appendToParent=this.defaultPlacement=this.getStyles=this.getStyle=this.setAttributes=this.getText=this.setText=this.setStyle=this.setFloat=this.setPosition=this.setTop=this.setBottom=this.setLeft=this.setRight=this.setHeight=this.setWidth=this.applyConstraints=this.setVisible=this.setBounds=this.setSnaps=this.move=this.moveTo=this.resizeBy=this.hide=this.show=this.isVisible=this.toggle=this.setOpacity=this.setBackgroundImage=this.setClass=this.addClass=this.removeClass=this.setRotation=this.setSthisectable=this.setScrollTop=this.setBackground=this.setBackgroundPosition=this.setBorder=this.setBorderColor=this.setBorderStyle=this.setBorderWidth=this.setBorderTop=this.setBorderRight=this.setBorderBottom=this.setBorderLeft=this.setClear=this.setColor=this.setPadding=this.setMargin=this.setMarginTop=this.setMarginRight=this.setMarginBottom=this.setMarginLeft=this.setDisplay=this.setLineHeight=this.setLetterSpacing=this.setVisibility=this.setOutline=this.setOverflow=this.setOverflowX=this.setOverflowY=this.setFontFamily=this.setFontSize=this.setFontWeight=this.setFontStyle=this.setTextAlign=this.setTextDecoration=this.setTextTransform=this.setVerticalAlign=this.setZIndex=this.setCursor=this.setHref=this.setSrc=this.setChecked=this.setMedia=this.setName=this.setType=this.setValue=this.setDataNode=this.__jx__constructor=this.__jx__native=null}
var U,V
U='background background-position border border-color border-style border-width color border-top border-right border-bottom border-left clear padding margin margin-top margin-right margin-bottom margin-left display line-height letter-spacing visibility outline overflow overflow-x overflow-y font-family font-size font-weight font-style text-align text-decoration text-transform vertical-align z-index cursor'.split(' ')
for(V=0;V<U.length;V++)T[Y('set-'+U[V])]=W(Y(U[V]))
U='checked href media name src target type value'.split(' ')
for(V=0;V<U.length;V++)T[Y('set-'+U[V])]=X(U[V])
function W(Z){return (function($$){try {this.style[Z]=$$}catch($_){;}
return this})}
function X(Z){return (function($$){this.setAttribute(Z,$$)
return this})}
function Y(Z){Z=Z.split(/[^a-zA-Z0-9]/)
for(var $$=1;$$<Z.length;$$++)if(Z[$$].length)Z[$$]=Z[$$].substr(0,1).toUpperCase()+Z[$$].substr(1)
return Z.join('')}
if(p.isIE)document.execCommand("BackgroundImageCache",!1,!0)
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_core_Element"].join('')
w.prototype.__jx__fqname="jx_core_Element"}
return w})()
b.__$$__getkudos_dashboard_widgets_ExtWindow=(function(){var w={width:600,height:500}
function x(C,D,E){var F=y(E)
this.window=window.open(C,D,F)}
x.prototype.isClosed=function(){return this.window.closed}
x.prototype.close=function(){this.window.close()}
function y(C){var D='',E=0,F=w
for(var G in C)if(C.hasOwnProperty(G)){F[G]=C[G]}
for(var H in F)if(F.hasOwnProperty(H)){if(E>0)D+=','
E++
D+=z(F,H)}
return D}
function z(C,D){var E,F=C[D]
switch(D){case 'verticalAlign':var G=parseInt(C['height'])
E=A(G,F)
break
case 'horizontalAlign':var H=parseInt(C['width'])
E=B(H,F)
break
default:E=D+'='+C[D]
break}
return E}
function A(C,D){var E=0
if(D==='middle'){E=p.getWindowClientHeight()/2-C/2}
else if(D==='bottom'){E=p.getWindowClientHeight()-C}
return 'top='+E}
function B(C,D){var E=0
if(D==='center'){E=p.getWindowClientWidth()/2-C/2}
else if(D==='right'){E=p.getWindowClientWidth()-C}
return 'left='+E}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_widgets_ExtWindow"].join('')
x.prototype.__jx__fqname="getkudos_dashboard_widgets_ExtWindow"}
return x})()
b.__$$__jx_data_SetDataNode=(function(){var w={applySetDataNode:y}
function x(z){var A,B
if(z.leaf){A=this
A.autobind(z,'value',function(C){if('value' in A)A.value=C
else A.setText(C)})}
else{A=this.firstChild
while(A){if(A.getAttribute){B=A.getAttribute('name')
if(B)A.setDataNode(z.descend(B))
else A.setDataNode(z)}
A=A.nextSibling}}}
function y(z){if(z.setDataNode)return
z.setDataNode=x
var A=z.firstChild
while(A){y(A)
A=A.nextSibling}}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_data_SetDataNode"].join('')
w.prototype.__jx__fqname="jx_data_SetDataNode"}
return w})()
b.__$$__getkudos_widget_controllers_DefaultDataNode=(function(){var w={getkudos:{"settings":{"theme":{"position$string":"bl","primary_color$string":"#555555","default_state$string":"banner"}}}}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_DefaultDataNode"].join('')
w.prototype.__jx__fqname="getkudos_widget_controllers_DefaultDataNode"}
return w})()
b.__$$__jx_core_ObjectUtil=(function(){var w=function(B,C){return B===C||B&&C&&typeof B=='object'&&typeof C=='object'&&x(B,C)},x=function(B,C){var D
for(D in B)if(B.hasOwnProperty(D))if(!w(B[D],C[D]))return !1
for(D in C)if(C.hasOwnProperty(D))if(!w(B[D],C[D]))return !1
return !0},y=function(B){if(typeof (B)!='object'||!B)return B
var C={}
for(var D in B)if(B.hasOwnProperty(D))C[D]=y(B[D])
return C},z=function(B){if(B){for(var C=1,D=arguments.length;C<D;C++){var E=arguments[C]
if(!E)continue
for(var F in E)if(E.hasOwnProperty(F)){B[F]=E[F]}}}
return B},A={equal:w,clone:y,extend:z}
if((typeof A==='function')&&A.prototype&&!A.__jx__no_fqname){A.prototype.__jx__fqname_chain=[(A.prototype.__jx__fqname_chain||"")," ","jx_core_ObjectUtil"].join('')
A.prototype.__jx__fqname="jx_core_ObjectUtil"}
return A})()
b.__$$__meshim_common_Chroma=(function(){var w={},x={};(function(){var z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$$,$_,$a,$b,$c,$d,$e,$f,$g,$h,$i,$j,$k,$l,$m,$n,$o
$e=typeof w!=="undefined"&&w!==null?w:this
I=($j=$e.chroma)!=null?$j:$e.chroma={}
if(typeof x!=="undefined"&&x!==null){x.exports=I}
z=(function(){function $p($q,$r,$s,$t){var $u,$v,$w
$u=this
if(($q==null)&&($r==null)&&($s==null)&&($t==null)){$q=[255,0,255]}
if($f($q)==="array"&&$q.length===3){if($t==null){$t=$r}
$w=$q,$q=$w[0],$r=$w[1],$s=$w[2]}
if($f($q)==="string"){$t='hex'}
else{if($t==null){$t='rgb'}}
if($t==='rgb'){$u._rgb=[$q,$r,$s]}
else if($t==='hsl'){$u._rgb=P($q,$r,$s)}
else if($t==='hsv'){$u._rgb=Q($q,$r,$s)}
else if($t==='hex'){$u._rgb=N($q)}
else if($t==='lab'){$u._rgb=S($q,$r,$s)}
else if($t==='lch'){$u._rgb=V($q,$r,$s)}
else if($t==='hsi'){$u._rgb=O($q,$r,$s)}
$v=J($u._rgb)}
$p.prototype.rgb=function(){return this._rgb}
$p.prototype.hex=function(){return Z(this._rgb)}
$p.prototype.toString=function(){return this.hex()}
$p.prototype.hsl=function(){return $_(this._rgb)}
$p.prototype.hsv=function(){return $a(this._rgb)}
$p.prototype.lab=function(){return $b(this._rgb)}
$p.prototype.lch=function(){return $c(this._rgb)}
$p.prototype.hsi=function(){return $$(this._rgb)}
$p.prototype.luminance=function(){return X(this._rgb)}
$p.prototype.name=function(){var $q,$r
$q=this.hex()
for($r in I.colors)if(I.colors.hasOwnProperty($r)){if($q===I.colors[$r]){return $r}}
return $q}
$p.prototype.interpolate=function($q,$r,$s){var $t,$u,$v,$w,$x,$y,$z,$A,$B,$C,$D,$E,$F
$A=this
if($s==null){$s='rgb'}
if($f($r)==="string"){$r=new $p($r)}
if($s==='hsl'||$s==='hsv'||$s==='lch'||$s==='hsi'){if($s==='hsl'){$E=$A.hsl()
$F=$r.hsl()}
else if($s==='hsv'){$E=$A.hsv()
$F=$r.hsv()}
else if($s==='hsi'){$E=$A.hsi()
$F=$r.hsi()}
else if($s==='lch'){$E=$A.lch()
$F=$r.lch()}
if($s.substr(0,1)==='h'){$v=$E[0],$C=$E[1],$y=$E[2]
$w=$F[0],$D=$F[1],$z=$F[2]}
else{$y=$E[0],$C=$E[1],$v=$E[2]
$z=$F[0],$D=$F[1],$w=$F[2]}
if(!isNaN($v)&&!isNaN($w)){if($w>$v&&$w-$v>180){$t=$w-($v+360)}
else if($w<$v&&$v-$w>180){$t=$w+360-$v}
else{$t=$w-$v}
$u=$v+$q*$t}
else if(!isNaN($v)){$u=$v
if($z===1||$z===0){$B=$C}}
else if(!isNaN($w)){$u=$w
if($y===1||$y===0){$B=$D}}
else{$u=void(0)}
if($B==null){$B=$C+$q*($D-$C)}
$x=$y+$q*($z-$y)
if($s.substr(0,1)==='h'){return new $p($u,$B,$x,$s)}
else{return new $p($x,$B,$u,$s)}}
else if($s==='rgb'){$E=$A._rgb
$F=$r._rgb
return new $p($E[0]+$q*($F[0]-$E[0]),$E[1]+$q*($F[1]-$E[1]),$E[2]+$q*($F[2]-$E[2]),$s)}
else if($s==='lab'){$E=$A.lab()
$F=$r.lab()
return new $p($E[0]+$q*($F[0]-$E[0]),$E[1]+$q*($F[1]-$E[1]),$E[2]+$q*($F[2]-$E[2]),$s)}
else{throw "color mode "+$s+" is not supported"}}
$p.prototype.darken=function($q){var $r,$s
if($q==null){$q=20}
$s=this
$r=$s.lch()
$r[0]-=$q
return I.lch($r)}
$p.prototype.darker=function($q){return this.darken($q)}
$p.prototype.brighten=function($q){if($q==null){$q=20}
return this.darken(-$q)}
$p.prototype.brighter=function($q){return this.brighten($q)}
$p.prototype.saturate=function($q){var $r,$s
if($q==null){$q=20}
$s=this
$r=$s.lch()
$r[1]+=$q
return I.lch($r)}
$p.prototype.desaturate=function($q){if($q==null){$q=20}
return this.saturate(-$q)}
return $p})()
N=function($p){var $q,$r,$s,$t,$u
if($p.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){if($p.length===4||$p.length===7){$p=$p.substr(1)}
if($p.length===3){$p=$p.split("")
$p=$p[0]+$p[0]+$p[1]+$p[1]+$p[2]+$p[2]}
$u=parseInt($p,16)
$s=$u>>16
$r=$u>>8&255
$q=$u&255
return [$s,$r,$q]}
if($t=M($p)){return $t}
throw "unknown color: "+$p}
M=function($p){var $q,$r,$s,$t
if((I.colors!=null)&&I.colors[$p]){return N(I.colors[$p])}
if($s=$p.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)){return $s.slice(1,4)}
if($s=$p.match(/rgb\(\s*(\-?\d+)%,\s*(\-?\d+)%\s*,\s*(\-?\d+)%\s*\)/)){$t=$s.slice(1,4)
for($r in $t)if($t.hasOwnProperty($r)){$t[$r]=Math.round($t[$r]*2.55)}
return $t}
if($s=$p.match(/hsl\(\s*(\-?\d+),\s*(\-?\d+)%\s*,\s*(\-?\d+)%\s*\)/)){$q=$s.slice(1,4)
$q[1]*=0.01
$q[2]*=0.01
return P($q)}}
Z=function(){var $p,$q,$r,$s,$t,$u
$u=$g(arguments),$r=$u[0],$q=$u[1],$p=$u[2]
$t=$r<<16|$q<<8|$p
$s="000000"+$t.toString(16)
return "#"+$s.substr($s.length-6)}
Q=function(){var $p,$q,$r,$s,$t,$u,$v,$w,$x,$y,$z,$A,$B,$C,$D,$E,$F,$G
$A=$g(arguments),$s=$A[0],$x=$A[1],$z=$A[2]
$z*=255
if($x===0){$w=$r=$p=$z}
else{if($s===360){$s=0}
if($s>360){$s-=360}
if($s<0){$s+=360}
$s/=60
$t=Math.floor($s)
$q=$s-$t
$u=$z*(1-$x)
$v=$z*(1-$x*$q)
$y=$z*(1-$x*(1-$q))
switch($t){case 0:$B=[$z,$y,$u],$w=$B[0],$r=$B[1],$p=$B[2]
break
case 1:$C=[$v,$z,$u],$w=$C[0],$r=$C[1],$p=$C[2]
break
case 2:$D=[$u,$z,$y],$w=$D[0],$r=$D[1],$p=$D[2]
break
case 3:$E=[$u,$v,$z],$w=$E[0],$r=$E[1],$p=$E[2]
break
case 4:$F=[$y,$u,$z],$w=$F[0],$r=$F[1],$p=$F[2]
break
case 5:$G=[$z,$u,$v],$w=$G[0],$r=$G[1],$p=$G[2]}}
$w=Math.round($w)
$r=Math.round($r)
$p=Math.round($p)
return [$w,$r,$p]}
$a=function(){var $p,$q,$r,$s,$t,$u,$v,$w,$x,$y
$y=$g(arguments),$v=$y[0],$r=$y[1],$p=$y[2]
$u=Math.min($v,$r,$p)
$t=Math.max($v,$r,$p)
$q=$t-$u
$x=$t/255.0
if($t===0){$s=void(0)
$w=0}
else{$w=$q/$t
if($v===$t){$s=($r-$p)/$q}
if($r===$t){$s=2+($p-$v)/$q}
if($p===$t){$s=4+($v-$r)/$q}
$s*=60
if($s<0){$s+=360}}
return [$s,$w,$x]}
P=function(){var $p,$q,$r,$s,$t,$u,$v,$w,$x,$y,$z,$A,$B,$C
$B=$g(arguments),$s=$B[0],$w=$B[1],$u=$B[2]
if($w===0){$v=$r=$p=$u*255}
else{$z=[0,0,0]
$q=[0,0,0]
$y=$u<0.5?$u*(1+$w):$u+$w-$u*$w
$x=2*$u-$y
$s/=360
$z[0]=$s+1/3
$z[1]=$s
$z[2]=$s-1/3
for($t=$A=0;$A<=2;$t=++$A){if($z[$t]<0){$z[$t]+=1}
if($z[$t]>1){$z[$t]-=1}
if(6*$z[$t]<1){$q[$t]=$x+($y-$x)*6*$z[$t]}
else if(2*$z[$t]<1){$q[$t]=$y}
else if(3*$z[$t]<2){$q[$t]=$x+($y-$x)*((2/3)-$z[$t])*6}
else{$q[$t]=$x}}
$C=[Math.round($q[0]*255),Math.round($q[1]*255),Math.round($q[2]*255)],$v=$C[0],$r=$C[1],$p=$C[2]}
return [$v,$r,$p]}
$_=function($p,$q,$r){var $s,$t,$u,$v,$w,$x
if($p!==void(0)&&$p.length===3){$x=$p,$p=$x[0],$q=$x[1],$r=$x[2]}
$p/=255
$q/=255
$r/=255
$v=Math.min($p,$q,$r)
$u=Math.max($p,$q,$r)
$t=($u+$v)/2
if($u===$v){$w=0
$s=void(0)}
else{$w=$t<0.5?($u-$v)/($u+$v):($u-$v)/(2-$u-$v)}
if($p===$u){$s=($q-$r)/($u-$v)}
else if($q===$u){$s=2+($r-$p)/($u-$v)}
else if($r===$u){$s=4+($p-$q)/($u-$v)}
$s*=60
if($s<0){$s+=360}
return [$s,$w,$t]}
B=18
E=0.95047
F=1
G=1.08883
S=function($p,$q,$r){var $s,$t,$u,$v,$w,$x,$y
if($p!==void(0)&&$p.length===3){$x=$p,$p=$x[0],$q=$x[1],$r=$x[2]}
if($p!==void(0)&&$p.length===3){$y=$p,$p=$y[0],$q=$y[1],$r=$y[2]}
$v=($p+16)/116
$u=$v+$q/500
$w=$v-$r/200
$u=T($u)*E
$v=T($v)*F
$w=T($w)*G
$t=$i(3.2404542*$u-1.5371385*$v-0.4985314*$w)
$s=$i(-0.969266*$u+1.8760108*$v+0.041556*$w)
$r=$i(0.0556434*$u-0.2040259*$v+1.0572252*$w)
return [W($t,0,255),W($s,0,255),W($r,0,255)]}
$b=function(){var $p,$q,$r,$s,$t,$u,$v
$v=$g(arguments),$r=$v[0],$q=$v[1],$p=$v[2]
$r=$d($r)
$q=$d($q)
$p=$d($p)
$s=$h((0.4124564*$r+0.3575761*$q+0.1804375*$p)/E)
$t=$h((0.2126729*$r+0.7151522*$q+0.072175*$p)/F)
$u=$h((0.0193339*$r+0.119192*$q+0.9503041*$p)/G)
return [116*$t-16,500*($s-$t),200*($t-$u)]}
U=function(){var $p,$q,$r,$s
$s=$g(arguments),$r=$s[0],$p=$s[1],$q=$s[2]
$q=$q*Math.PI/180
return [$r,Math.cos($q)*$p,Math.sin($q)*$p]}
V=function($p,$q,$r){var $s,$t,$u,$v,$w,$x,$y
$x=U($p,$q,$r),$s=$x[0],$t=$x[1],$u=$x[2]
$y=S($s,$t,$u),$w=$y[0],$v=$y[1],$u=$y[2]
return [W($w,0,255),W($v,0,255),W($u,0,255)]}
T=function($p){if($p>0.206893034){return $p*$p*$p}
else{return ($p-4/29)/7.787037}}
$h=function($p){if($p>0.008856){return Math.pow($p,1/3)}
else{return 7.787037*$p+4/29}}
$i=function($p){return Math.round(255*($p<=0.00304?12.92*$p:1.055*Math.pow($p,1/2.4)-0.055))}
$d=function($p){if(($p/=255)<=0.04045){return $p/12.92}
else{return Math.pow(($p+0.055)/1.055,2.4)}}
R=function(){var $p,$q,$r,$s,$t,$u
$u=$g(arguments),$t=$u[0],$p=$u[1],$q=$u[2]
$r=Math.sqrt($p*$p+$q*$q)
$s=Math.atan2($q,$p)/Math.PI*180
return [$t,$r,$s]}
$c=function(){var $p,$q,$r,$s,$t,$u,$v
$u=$g(arguments),$t=$u[0],$r=$u[1],$q=$u[2]
$v=$b($t,$r,$q),$s=$v[0],$p=$v[1],$q=$v[2]
return R($s,$p,$q)}
$$=function(){var $p,$q,$r,$s,$t,$u,$v,$w,$x
$x=$g(arguments),$v=$x[0],$r=$x[1],$q=$x[2]
$p=Math.PI*2
$v/=255
$r/=255
$q/=255
$u=Math.min($v,$r,$q)
$t=($v+$r+$q)/3
$w=1-$u/$t
if($w===0){$s=0}
else{$s=(($v-$r)+($v-$q))/2
$s/=Math.sqrt(($v-$r)*($v-$r)+($v-$q)*($r-$q))
$s=Math.acos($s)
if($q>$r){$s=$p-$s}
$s/=$p}
return [$s*360,$w,$t]}
O=function($p,$q,$r){var $s,$t,$u,$v
$v=$g(arguments),$p=$v[0],$q=$v[1],$r=$v[2]
$p/=360
if($p<1/3){$s=(1-$q)/3
$u=(1+$q*L(D*$p)/L(C-D*$p))/3
$t=1-($s+$u)}
else if($p<2/3){$p-=1/3
$u=(1-$q)/3
$t=(1+$q*L(D*$p)/L(C-D*$p))/3
$s=1-($u+$t)}
else{$p-=2/3
$t=(1-$q)/3
$s=(1+$q*L(D*$p)/L(C-D*$p))/3
$u=1-($t+$s)}
$u=W($r*$u*3)
$t=W($r*$t*3)
$s=W($r*$s*3)
return [$u*255,$t*255,$s*255]}
J=function($p){var $q
for($q in $p)if($p.hasOwnProperty($q)){if($p[$q]<0){$p[$q]=0}
if($p[$q]>255){$p[$q]=255}}
return $p}
X=function($p,$q,$r){var $s
$s=$g(arguments),$p=$s[0],$q=$s[1],$r=$s[2]
$p=Y($p)
$q=Y($q)
$r=Y($r)
return 0.2126*$p+0.7152*$q+0.0722*$r}
Y=function($p){$p/=255
if($p<=0.03928){return $p/12.92}
else{return Math.pow(($p+0.055)/1.055,2.4)}}
I.Color=z
I.color=function($p,$q,$r,$s){return new z($p,$q,$r,$s)}
I.hsl=function($p,$q,$r){return new z($p,$q,$r,'hsl')}
I.hsv=function($p,$q,$r){return new z($p,$q,$r,'hsv')}
I.rgb=function($p,$q,$r){return new z($p,$q,$r,'rgb')}
I.hex=function($p){return new z($p)}
I.css=function($p){return new z($p)}
I.lab=function($p,$q,$r){return new z($p,$q,$r,'lab')}
I.lch=function($p,$q,$r){return new z($p,$q,$r,'lch')}
I.hsi=function($p,$q,$r){return new z($p,$q,$r,'hsi')}
I.interpolate=function($p,$q,$r,$s){if(($p==null)||($q==null)){return '#000'}
if($f($p)==='string'){$p=new z($p)}
if($f($q)==='string'){$q=new z($q)}
return $p.interpolate($r,$q,$s)}
I.contrast=function($p,$q){var $r,$s
if($f($p)==='string'){$p=new z($p)}
if($f($q)==='string'){$q=new z($q)}
$r=$p.luminance()
$s=$q.luminance()
if($r>$s){return ($r+0.05)/($s+0.05)}
else{return ($s+0.05)/($r+0.05)}}
$e=typeof w!=="undefined"&&w!==null?w:this
I=($k=$e.chroma)!=null?$k:$e.chroma={}
z=I.Color
A=(function(){function $p($q){var $r,$s,$t
if($q==null){$q={}}
$r=this
$r.range($q.colors,$q.positions)
$r._mode=($s=$q.mode)!=null?$s:'rgb'
$r._nacol=I.hex(($t=$q.nacol)!=null?$t:I.hex('#ccc'))
$r._spread=0
$r._fixed=!1
$r.domain([0,1])
$r}
$p.prototype.range=function($q,$r){var $s,$t,$u,$v,$w,$x,$y,$z
$u=this
if($q==null){$q=['#ddd','#222']}
if(($q!=null)&&$f($q)==='string'&&((($x=I.brewer)!=null?$x[$q]:void(0))!=null)){$q=I.brewer[$q].slice(0)}
for($s=$v=0,$y=$q.length-1;0<=$y?$v<=$y:$v>=$y;$s=0<=$y?++$v:--$v){$t=$q[$s]
if($f($t)==="string"){$q[$s]=new z($t)}}
$u._colors=$q
if($r!=null){$u._pos=$r}
else{$u._pos=[]
for($s=$w=0,$z=$q.length-1;0<=$z?$w<=$z:$w>=$z;$s=0<=$z?++$w:--$w){$u._pos.push($s/($q.length-1))}}
return $u}
$p.prototype.domain=function($q){var $r
if($q==null){$q=[]}
$r=this
$r._domain=$q
$r._min=$q[0]
$r._max=$q[$q.length-1]
if($q.length===2){$r._numClasses=0}
else{$r._numClasses=$q.length-1}
return $r}
$p.prototype.get=function($q){var $r,$s,$t,$u
$u=this
if(isNaN($q)){return $u._nacol}
if($u._domain.length>2){$r=$u.getClass($q)
$s=$r/($u._numClasses-1)}
else{$s=$t=($q-$u._min)/($u._max-$u._min)
$s=Math.min(1,Math.max(0,$s))}
return $u.fColor($s)}
$p.prototype.fColor=function($q){var $r,$s,$t,$u,$v,$w,$x
$u=this
$s=$u._colors
for($t=$w=0,$x=$u._pos.length-1;0<=$x?$w<=$x:$w>=$x;$t=0<=$x?++$w:--$w){$v=$u._pos[$t]
if($q<=$v){$r=$s[$t]
break}
if($q>=$v&&$t===$u._pos.length-1){$r=$s[$t]
break}
if($q>$v&&$q<$u._pos[$t+1]){$q=($q-$v)/($u._pos[$t+1]-$v)
$r=I.interpolate($s[$t],$s[$t+1],$q,$u._mode)
break}}
return $r}
$p.prototype.classifyValue=function($q){var $r,$s,$t,$u,$v,$w,$x
$u=this
$r=$u._domain
$x=$q
if($r.length>2){$w=$r.length-1
$s=$u.getClass($q)
$v=$r[0]+($r[1]-$r[0])*(0+$u._spread*0.5)
$t=$r[$w-1]+($r[$w]-$r[$w-1])*(1-$u._spread*0.5)
$x=$u._min+(($r[$s]+($r[$s+1]-$r[$s])*0.5-$v)/($t-$v))*($u._max-$u._min)}
return $x}
$p.prototype.getClass=function($q){var $r,$s,$t,$u
$u=this
$r=$u._domain
if($r!=null){$t=$r.length-1
$s=0
while($s<$t&&$q>=$r[$s]){$s++}
return $s-1}
return 0}
$p.prototype.validValue=function($q){return !isNaN($q)}
return $p})()
I.ColorScale=A
I.scale=function($p,$q){var $r,$s,$t
$r=new I.ColorScale()
$r.range($p,$q)
$t=!1
$s=function($u){var $v
$v=$r.get($u)
if($t&&$v[$t]){return $v[$t]()}
else{return $v}}
$s.domain=function($u,$v,$w,$x){var $y
if($w==null){$w='e'}
if(!arguments.length){return $r._domain}
if($v!=null){$y=I.analyze($u,$x)
if($v===0){$u=[$y.min,$y.max]}
else{$u=I.limits($y,$w,$v)}}
$r.domain($u)
return $s}
$s.mode=function($u){if(!arguments.length){return $r._mode}
$r._mode=$u
return $s}
$s.range=function($u,$v){$r.range($u,$v)
return $s}
$s.out=function($u){$t=$u
return $s}
$s.getColor=function($u){return $s($u)}
$s.spread=function($u){if(!arguments.length){return $r._spread}
$r._spread=$u
return $s}
return $s}
if(($l=I.scales)==null){I.scales={}}
I.scales.cool=function(){return I.scale([I.hsl(180,1,0.9),I.hsl(250,0.7,0.4)])}
I.scales.hot=function(){return I.scale(['#000','#f00','#ff0','#fff'],[0,0.25,0.75,1]).mode('rgb')}
I.analyze=function($p,$q,$r){var $s,$t,$u,$v,$w,$x,$y
$u={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0}
if($r==null){$r=function(){return !0}}
$s=function($z){if(($z!=null)&&!isNaN($z)){$u.values.push($z)
$u.sum+=$z
if($z<$u.min){$u.min=$z}
if($z>$u.max){$u.max=$z}
$u.count+=1}}
$w=function($z,$A){if($r($z,$A)){if(($q!=null)&&$f($q)==='function'){return $s($q($z))}
else if(($q!=null)&&$f($q)==='string'||$f($q)==='number'){return $s($z[$q])}
else{return $s($z)}}}
if($f($p)==='array'){for($x=0,$y=$p.length;$x<$y;$x++){$v=$p[$x]
$w($v)}}
else{for($t in $p)if($p.hasOwnProperty($t)){$v=$p[$t]
$w($v,$t)}}
$u.domain=[$u.min,$u.max]
$u.limits=function($z,$A){return I.limits($u,$z,$A)}
return $u}
I.limits=function($p,$q,$r){var $s,$t,$u,$v,$w,$x,$y,$z,$A,$B,$C,$D,$E,$F,$G,$H,$I,$J,$K,$L,$M,$N,$O,$P,$Q,$R,$S,$T,$U,$V,$W,$X,$Y,$Z,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9,_$,__,_a,_b,_c,_d,_e,_f,_g,_h,_i,_j
if($q==null){$q='equal'}
if($r==null){$r=7}
if($p.values==null){$p=I.analyze($p)}
$E=$p.min
$C=$p.max
$O=$p.sum
$R=$p.values.sort(function(_k,_l){return _k-_l})
$B=[]
if($q.substr(0,1)==='c'){$B.push($E)
$B.push($C)}
if($q.substr(0,1)==='e'){$B.push($E)
for($y=$S=1,_$=$r-1;1<=_$?$S<=_$:$S>=_$;$y=1<=_$?++$S:--$S){$B.push($E+($y/$r)*($C-$E))}
$B.push($C)}
else if($q.substr(0,1)==='l'){if($E<=0){throw 'Logarithmic scales are only possible for values > 0'}
$F=Math.LOG10E*Math.log($E)
$D=Math.LOG10E*Math.log($C)
$B.push($E)
for($y=$T=1,__=$r-1;1<=__?$T<=__:$T>=__;$y=1<=__?++$T:--$T){$B.push(Math.pow(10,$F+($y/$r)*($D-$F)))}
$B.push($C)}
else if($q.substr(0,1)==='q'){$B.push($E)
for($y=$U=1,_a=$r-1;1<=_a?$U<=_a:$U>=_a;$y=1<=_a?++$U:--$U){$K=$R.length*$y/$r
$L=Math.floor($K)
if($L===$K){$B.push($R[$L])}
else{$M=$K-$L
$B.push($R[$L]*$M+$R[$L+1]*(1-$M))}}
$B.push($C)}
else if($q.substr(0,1)==='k'){$H=$R.length
$s=new Array($H)
$w=new Array($r)
$N=!0
$I=0
$u=null
$u=[]
$u.push($E)
for($y=$V=1,_b=$r-1;1<=_b?$V<=_b:$V>=_b;$y=1<=_b?++$V:--$V){$u.push($E+($y/$r)*($C-$E))}
$u.push($C)
while($N){for($z=$W=0,_c=$r-1;0<=_c?$W<=_c:$W>=_c;$z=0<=_c?++$W:--$W){$w[$z]=0}
for($y=$X=0,_d=$H-1;0<=_d?$X<=_d:$X>=_d;$y=0<=_d?++$X:--$X){$Q=$R[$y]
$G=Number.MAX_VALUE
for($z=$Y=0,_e=$r-1;0<=_e?$Y<=_e:$Y>=_e;$z=0<=_e?++$Y:--$Y){$x=Math.abs($u[$z]-$Q)
if($x<$G){$G=$x
$t=$z}}
$w[$t]++
$s[$y]=$t}
$J=new Array($r)
for($z=$Z=0,$2=$r-1;0<=$2?$Z<=$2:$Z>=$2;$z=0<=$2?++$Z:--$Z){$J[$z]=null}
for($y=$0=0,$3=$H-1;0<=$3?$0<=$3:$0>=$3;$y=0<=$3?++$0:--$0){$v=$s[$y]
if($J[$v]===null){$J[$v]=$R[$y]}
else{$J[$v]+=$R[$y]}}
for($z=$1=0,$4=$r-1;0<=$4?$1<=$4:$1>=$4;$z=0<=$4?++$1:--$1){$J[$z]*=1/$w[$z]}
$N=!1
for($z=_f=0,$5=$r-1;0<=$5?_f<=$5:_f>=$5;$z=0<=$5?++_f:--_f){if($J[$z]!==$u[$y]){$N=!0
break}}
$u=$J
$I++
if($I>200){$N=!1}}
$A={}
for($z=_g=0,$6=$r-1;0<=$6?_g<=$6:_g>=$6;$z=0<=$6?++_g:--_g){$A[$z]=[]}
for($y=_h=0,$7=$H-1;0<=$7?_h<=$7:_h>=$7;$y=0<=$7?++_h:--_h){$v=$s[$y]
$A[$v].push($R[$y])}
$P=[]
for($z=_i=0,$8=$r-1;0<=$8?_i<=$8:_i>=$8;$z=0<=$8?++_i:--_i){$P.push($A[$z][0])
$P.push($A[$z][$A[$z].length-1])}
$P=$P.sort(function(_k,_l){return _k-_l})
$B.push($P[0])
for($y=_j=1,$9=$P.length-1;_j<=$9;$y=_j+=2){if(!isNaN($P[$y])){$B.push($P[$y])}}}
return $B}
$e=typeof w!=="undefined"&&w!==null?w:this
$f=(function(){var $p,$q,$r,$s,$t
$p={}
$t="Boolean Number String Function Array Date RegExp Undefined Null".split(" ")
for($r=0,$s=$t.length;$r<$s;$r++){$q=$t[$r]
$p["[object "+$q+"]"]=$q.toLowerCase()}
return function($u){var $v
$v=Object.prototype.toString.call($u)
return $p[$v]||"object"}})()
if(($m=$e.type)==null){$e.type=$f}
Array.max=function($p){return Math.max.apply(Math,$p)}
Array.min=function($p){return Math.min.apply(Math,$p)}
W=function($p,$q,$r){if($q==null){$q=0}
if($r==null){$r=1}
if($p<$q){$p=$q}
if($p>$r){$p=$r}
return $p}
$g=function($p){if($p.length===3){return $p}
else{return $p[0]}}
D=Math.PI*2
C=Math.PI/3
L=Math.cos
$e=typeof w!=="undefined"&&w!==null?w:this
I=($n=$e.chroma)!=null?$n:$e.chroma={}
I.brewer=H={OrRd:['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],PuBu:['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'],BuPu:['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#810f7c','#4d004b'],Oranges:['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704'],BuGn:['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b'],YlOrBr:['#ffffe5','#fff7bc','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#993404','#662506'],YlGn:['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'],Reds:['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'],RdPu:['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'],Greens:['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b'],YlGnBu:['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],Purples:['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'],GnBu:['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081'],Greys:['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000'],YlOrRd:['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026'],PuRd:['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'],Blues:['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'],PuBuGn:['#fff7fb','#ece2f0','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016c59','#014636'],Spectral:['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'],RdYlGn:['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'],RdBu:['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac','#053061'],PiYG:['#8e0152','#c51b7d','#de77ae','#f1b6da','#fde0ef','#f7f7f7','#e6f5d0','#b8e186','#7fbc41','#4d9221','#276419'],PRGn:['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#f7f7f7','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b'],RdYlBu:['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'],BrBG:['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5','#c7eae5','#80cdc1','#35978f','#01665e','#003c30'],RdGy:['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#ffffff','#e0e0e0','#bababa','#878787','#4d4d4d','#1a1a1a'],PuOr:['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#f7f7f7','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b'],Set2:['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494','#b3b3b3'],Accent:['#7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f','#bf5b17','#666666'],Set1:['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'],Set3:['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],Dark2:['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666'],Paired:['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'],Pastel2:['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae','#f1e2cc','#cccccc'],Pastel1:['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6','#ffffcc','#e5d8bd','#fddaec','#f2f2f2']}
$e=typeof w!=="undefined"&&w!==null?w:this
I=($o=$e.chroma)!=null?$o:$e.chroma={}
I.colors=K={indigo:"#4b0082",gold:"#ffd700",hotpink:"#ff69b4",firebrick:"#b22222",indianred:"#cd5c5c",yellow:"#ffff00",mistyrose:"#ffe4e1",darkolivegreen:"#556b2f",olive:"#808000",darkseagreen:"#8fbc8f",pink:"#ffc0cb",tomato:"#ff6347",lightcoral:"#f08080",orangered:"#ff4500",navajowhite:"#ffdead",lime:"#00ff00",palegreen:"#98fb98",darkslategrey:"#2f4f4f",greenyellow:"#adff2f",burlywood:"#deb887",seashell:"#fff5ee",mediumspringgreen:"#00fa9a",fuchsia:"#ff00ff",papayawhip:"#ffefd5",blanchedalmond:"#ffebcd",chartreuse:"#7fff00",dimgray:"#696969",black:"#000000",peachpuff:"#ffdab9",springgreen:"#00ff7f",aquamarine:"#7fffd4",white:"#ffffff",orange:"#ffa500",lightsalmon:"#ffa07a",darkslategray:"#2f4f4f",brown:"#a52a2a",ivory:"#fffff0",dodgerblue:"#1e90ff",peru:"#cd853f",lawngreen:"#7cfc00",chocolate:"#d2691e",crimson:"#dc143c",forestgreen:"#228b22",darkgrey:"#a9a9a9",lightseagreen:"#20b2aa",cyan:"#00ffff",mintcream:"#f5fffa",silver:"#c0c0c0",antiquewhite:"#faebd7",mediumorchid:"#ba55d3",skyblue:"#87ceeb",gray:"#808080",darkturquoise:"#00ced1",goldenrod:"#daa520",darkgreen:"#006400",floralwhite:"#fffaf0",darkviolet:"#9400d3",darkgray:"#a9a9a9",moccasin:"#ffe4b5",saddlebrown:"#8b4513",grey:"#808080",darkslateblue:"#483d8b",lightskyblue:"#87cefa",lightpink:"#ffb6c1",mediumvioletred:"#c71585",slategrey:"#708090",red:"#ff0000",deeppink:"#ff1493",limegreen:"#32cd32",darkmagenta:"#8b008b",palegoldenrod:"#eee8aa",plum:"#dda0dd",turquoise:"#40e0d0",lightgrey:"#d3d3d3",lightgoldenrodyellow:"#fafad2",darkgoldenrod:"#b8860b",lavender:"#e6e6fa",maroon:"#800000",yellowgreen:"#9acd32",sandybrown:"#f4a460",thistle:"#d8bfd8",violet:"#ee82ee",navy:"#000080",magenta:"#ff00ff",dimgrey:"#696969",tan:"#d2b48c",rosybrown:"#bc8f8f",olivedrab:"#6b8e23",blue:"#0000ff",lightblue:"#add8e6",ghostwhite:"#f8f8ff",honeydew:"#f0fff0",cornflowerblue:"#6495ed",slateblue:"#6a5acd",linen:"#faf0e6",darkblue:"#00008b",powderblue:"#b0e0e6",seagreen:"#2e8b57",darkkhaki:"#bdb76b",snow:"#fffafa",sienna:"#a0522d",mediumblue:"#0000cd",royalblue:"#4169e1",lightcyan:"#e0ffff",green:"#008000",mediumpurple:"#9370db",midnightblue:"#191970",cornsilk:"#fff8dc",paleturquoise:"#afeeee",bisque:"#ffe4c4",slategray:"#708090",darkcyan:"#008b8b",khaki:"#f0e68c",wheat:"#f5deb3",teal:"#008080",darkorchid:"#9932cc",deepskyblue:"#00bfff",salmon:"#fa8072",darkred:"#8b0000",steelblue:"#4682b4",palevioletred:"#db7093",lightslategray:"#778899",aliceblue:"#f0f8ff",lightslategrey:"#778899",lightgreen:"#90ee90",orchid:"#da70d6",gainsboro:"#dcdcdc",mediumseagreen:"#3cb371",lightgray:"#d3d3d3",mediumturquoise:"#48d1cc",lemonchiffon:"#fffacd",cadetblue:"#5f9ea0",lightyellow:"#ffffe0",lavenderblush:"#fff0f5",coral:"#ff7f50",purple:"#800080",aqua:"#00ffff",whitesmoke:"#f5f5f5",mediumslateblue:"#7b68ee",darkorange:"#ff8c00",mediumaquamarine:"#66cdaa",darksalmon:"#e9967a",beige:"#f5f5dc",blueviolet:"#8a2be2",azure:"#f0ffff",lightsteelblue:"#b0c4de",oldlace:"#fdf5e6"}}).call(this)
var y=w.chroma
y.Color.prototype.lighten=function(z){return this.brighten(z)}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","meshim_common_Chroma"].join('')
y.prototype.__jx__fqname="meshim_common_Chroma"}
return y})()
b.__$$__jx_data_JSON=(function(){var w=(!k(window)&&window.JSON)||{parse:L,stringify:B}
w={parse:L,stringify:B}
var x=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,y={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','\\':'\\\\','"':'\\"'}
function z(M){return '"'+M.replace(x,A)+'"'}
function A(M){return y[M]||'\\u'+('0000'+M.charCodeAt(0).toString(16)).slice(-4)}
function B(M){switch(typeof M){case 'string':return z(M)
case 'number':return isFinite(M)?M.toString():'null'
case 'boolean':return String(M)
case 'object':if(!M)return 'null'
var N=[],O,P
if(g(M)){for(O=0,P=M.length;O<P;O++)N[O]=B(M[O])||'null'
return '['+N.join(',')+']'}
var Q,R=[],S
for(Q in M)if(M.hasOwnProperty(Q))R.push(Q)
R.sort()
for(O=0,P=R.length;O<P;O++){Q=R[O]
S=B(M[Q])
if(S)N.push(z(Q)+':'+S)}
if(N.length)return '{'+N.join(',')+'}'}}
var C='(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)',D='(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]'+'|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))',E='(?:\"'+D+'*\")',F=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]'+'|'+C+'|'+E+')','g'),G=new RegExp('\\\\(?:([^u])|u(.{4}))','g'),H={'"':'"','/':'/','\\':'\\','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t'},I=new String(''),J='\\'
function K(M,N,O){return N?H[N]:String.fromCharCode(parseInt(O,16))}
function L(M){var N=M.match(F),O=N.length,P=N[0],Q,R,S,T,U
if(P=='{')Q={},U=1
else if(P=='[')Q=[],U=1
else Q=[],U=0,R=!0
var V=[Q]
for(O=N.length;U<O;++U){P=N[U]
switch(P.charCodeAt(0)){case 91:T=V[0]
V.unshift(T[S||T.length]=[])
S=void(0)
break
case 93:V.shift()
break
case 123:T=V[0]
V.unshift(T[S||T.length]={})
S=void(0)
break
case 125:V.shift()
break
case 102:T=V[0]
T[S||T.length]=!1
S=void(0)
break
case 110:T=V[0]
T[S||T.length]=null
S=void(0)
break
case 116:T=V[0]
T[S||T.length]=!0
S=void(0)
break
case 34:P=P.substring(1,P.length-1)
if(P.indexOf(J)!==-1)P=P.replace(G,K)
T=V[0]
if(S==void(0)){if(T instanceof Array)S=T.length
else{S=P||I
break}}
T[S]=P
S=void(0)
break
default:T=V[0]
T[S||T.length]=+(P)
S=void(0)
break}}
if(R){if(V.length==1)return Q[0]}
else if(!V.length)return Q
throw 'error'}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_data_JSON"].join('')
w.prototype.__jx__fqname="jx_data_JSON"}
return w})()
b.__$$__getkudos_widget_utils_matchMedia=(function(){var w=window.matchMedia||((function(){"use strict"
var x=(window.styleMedia||window.media)
if(!x){var y=document.createElement('style'),z=document.getElementsByTagName('script')[0],A=null
y.type='text/css'
y.id='matchmediajs-test'
z.parentNode.insertBefore(y,z)
A=('getComputedStyle' in window)&&window.getComputedStyle(y,null)||y.currentStyle
x={matchMedium:function(B){var C='@media '+B+'{ #matchmediajs-test { width: 1px; } }'
if(y.styleSheet){y.styleSheet.cssText=C}
else{y.textContent=C}
return A.width==='1px'}}}
return function(B){return {matches:x.matchMedium(B||'all'),media:B||'all'}}})())
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_utils_matchMedia"].join('')
w.prototype.__jx__fqname="getkudos_widget_utils_matchMedia"}
return w})()
b.__$$__getkudos_dashboard_utils_base62=(function(){var w="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
w=w.split('')
var x={fromInt:y,toInt:z,generateKey:A}
function y(B,C){C=C||0
B=parseInt(B,10)||0
var D='',E
while(!0){E=B%62
B=Math.floor(B/62)
D=w[E]+D
if(B===0){if(D.length<C)D=new Array(C-D.length+1).join('0')+D
return D}}}
function z(B){var C=0,D=0,E,F
B=B+''
for(var G=B.length-1;G>=0;G--){F=B[G]
E=F.charCodeAt(0)
if('0'<=F&&F<='9')E-=48
else if('A'<=F&&F<='Z')E-=55
else if('a'<=F&&F<='z')E-=61
C+=Math.pow(62,D)*E
D++}
return C}
function A(B){B=parseInt(B,10)||32
var C=''
for(var D=0;D<B;D++){C+=w[Math.floor(Math.random()*62)]}
return C}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_base62"].join('')
x.prototype.__jx__fqname="getkudos_dashboard_utils_base62"}
return x})()
b.__$$__jx_data_DataNode=(function(){function w(y,z){this.name=y
this.leaf=/\$[a-z]+$/.test(y)
this.parentNode=z
this.listeners_value=[]
this.listeners_write=[]
if(!this.leaf){this.listeners_keys=[]
this.childNodes={}
this.keys={}}}
w.prototype.fqname=function(){return x(this.path())}
w.prototype.path=function(){var y=this,z=[this.name]
while((y=y.parentNode))z.unshift(y.name)
return z}
w.prototype.descend=function(y){var z=this,A,B,C
if(typeof y=='string')y=y.split('.')
for(B=0,C=y.length;B<C;B++){A=y[B]
if(!(A in z.childNodes))z.childNodes[A]=new w(A,z)
z=z.childNodes[A]}
return z}
w.prototype.$$=w.prototype.descend
w.prototype.$=function(y){if(!(y in this.childNodes))return (this.childNodes[y]=new w(y,this))
return this.childNodes[y]}
w.prototype.update=function(y,z,A){var B
if(this.leaf){this.value=y
this.notifyListeners(y,z,A)}
else{if(y==null){this.deleted=!0
for(B in this.childNodes)if(this.childNodes.hasOwnProperty(B))this.childNodes[B].update(null,!0,A)}
else{delete this.deleted
for(B in y)if(y.hasOwnProperty(B))this.$(B).update(y[B],!0,A)}
this.notifyListeners(y,z,A)}}
w.prototype.write=function(y,z){this.update(y,z||!1,{path:this.path(),value:y})}
w.prototype.bindWrite=function(y){this.listeners_write.push(y)}
w.prototype.bindValue=function(y){this.listeners_value.push(y)
try {y(this.getValue())}catch(z){q.fire('error',z)}}
w.prototype.bindKeys=function(y){if(this.leaf){return}
this.listeners_keys.push(y)
try {y(this.getKeys(),[])}catch(z){q.fire('error',z)}}
w.prototype.unbindValue=function(y){for(var z=0;z<this.listeners_value.length;z++)if(this.listeners_value[z]==y){this.listeners_value[z]=null
return}}
w.prototype.unbindKeys=function(y){if(this.leaf)return
for(var z=0;z<this.listeners_keys.length;z++)if(this.listeners_keys[z]==y){this.listeners_keys[z]=null
return}}
w.prototype.on=function(y,z){switch(y){case 'value':this.bindValue(z)
break
case 'keys':this.bindKeys(z)
break}}
w.prototype.un=function(y,z){switch(y){case 'value':this.unbindValue(z)
break
case 'keys':this.unbindKeys(z)
break}}
w.prototype.addListener=function(y,z){this.listeners[y].push(z)}
w.prototype.removeListener=function(y,z){var A=this.listeners[y]
for(var B=0;B<A.length;B++)if(A[B]==z)A.splice(B,1)}
w.prototype.notifyListeners=function(y,z,A){for(var B=0;B<this.listeners_value.length;){var C=this.listeners_value[B]
if(typeof C!=='function')this.listeners_value.splice(B,1)
else{try {C(y)}catch(H){q.fire('error',H)}
B++}}
if(A){for(B=0;B<this.listeners_write.length;B++)try {this.listeners_write[B](A)}catch(H){q.fire('error',H)}}
if(this.leaf)return
var D=[],E=[],F
if(y){for(F in y)if(y.hasOwnProperty(F)){if(y[F]!==null){if(!(F in this.keys)){this.keys[F]=1
D.push(F)}}
else{if(F in this.keys){delete this.keys[F]
E.push(F)}}}}
else{for(F in this.keys)if(this.keys.hasOwnProperty(F)){delete this.keys[F]
E.push(F)}}
for(B=0;B<this.listeners_keys.length;){C=this.listeners_keys[B]
if(typeof C!=='function')this.listeners_keys.splice(B,1)
else{try {C(D,E)}catch(H){q.fire('error',H)}
B++}}
if(!z&&this.parentNode){var G={}
G[this.name]=y
this.parentNode.notifyListeners(G,z,A)}}
w.prototype.getValue=function(y){if(y)return this.descend(y).getValue()
if(this.leaf)return this.value
if(this.deleted)return null
var z,A={},B
for(var C in this.childNodes)if(this.childNodes.hasOwnProperty(C)){if((B=this.childNodes[C].getValue())!=null){A[C]=B
z=!0}}
return z?A:null}
w.prototype.getKeys=function(){if(this.leaf){return null}
var y=[]
for(var z in this.keys)if(this.keys.hasOwnProperty(z))y.push(z)
return y}
function x(y){var z=''
for(var A=0;A<y.length;A++){if(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(y[A]))z+='.'+y[A]
else z+='['+JSON.stringify(y[A])+']'}
return z.substr(1)}
if(typeof exports!='undefined')exports.DataNode=w
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","jx_data_DataNode"].join('')
w.prototype.__jx__fqname="jx_data_DataNode"}
return w})()
b.__$$__getkudos_widget_controllers_GoogleAnalytics=(function(){var w='Getkudos Widget',x,y,z,A,B={OLD:'ga.js',NEW:'analytics.js'}
function C(){if(x||y)return !0
var I,J=window[window['GoogleAnalyticsObject']||'ga']
if(typeof J=='function'){y=J
I=!0}
if(window._gaq&&window._gat){x=window._gaq
z=window._gat
I=!0}
return I}
function D(I){if(I==B.NEW&&y){if(typeof y.getAll=='function'){return y.getAll()}}
else if(I==B.OLD&&z){if(typeof z._getTrackers=='function'){return z._getTrackers()}
else if(typeof z._getTrackerByName=='function'){return [z._getTrackerByName()]}}
return []}
function E(I,J,K){try {if(!C()||!I)return
if(y)F(I,J,K)
if(x)G(I,J,K)}catch(L){;}}
function F(I,J,K){A=D(B.NEW)
if(A.length){for(var L=0,M=A.length;L<M;L++){if(typeof A[L].send=='function'){A[L].send('event',w,I,J,K)}}}
else{y('send','event',w,I,J,K)}}
function G(I,J,K){A=D(B.OLD)
x.push(function(){for(var L=0,M=A.length;L<M;L++){if(typeof A[L]._trackEvent!='function')continue
A[L]._trackEvent(w,I,J,K)}})}
var H={trackEvent:E}
if((typeof H==='function')&&H.prototype&&!H.__jx__no_fqname){H.prototype.__jx__fqname_chain=[(H.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_GoogleAnalytics"].join('')
H.prototype.__jx__fqname="getkudos_widget_controllers_GoogleAnalytics"}
return H})()
b.__$$__getkudos_widget_Config=(function(){var w=window.location.protocol,x=w+"//static.getkudos.me/widget",y=x+"/assets",z=x+"/fonts",A="https://getkudos.me",B={assets_url:y,sprite_url:y+"/icons_v11.png",ssl_enabled:/^https/.test(w),ssl_proxy:A+"/safe_image.jpg",fonts_url:z+"/",data_url:w+"//getkudos.me/payload/v1/[site_name]/[layout_name].js",kudos_data_url:w+"//getkudos.me/pfeed/v1/[site_name].js",analytic_url:w+"//getkudos.me/a",reload_avatar_url:"https://getkudos.me/[site_name]/reload_avatar?feeds=[ids]",solicit_url:"https://getkudos.me/[site_name]/post",all_kudos_url:"https://getkudos.me/[site_name]",payload_expire:1000*60*10}
if((typeof B==='function')&&B.prototype&&!B.__jx__no_fqname){B.prototype.__jx__fqname_chain=[(B.prototype.__jx__fqname_chain||"")," ","getkudos_widget_Config"].join('')
B.prototype.__jx__fqname="getkudos_widget_Config"}
return B})()
b.__$$__getkudos_widget_controllers_data_normalizeCardType=(function(){var w=/twitter|facebook/i
function x(y){for(var z=0,A=y.length;z<A;z++){var B=y[z],C='',D=B.source,E=B.content_type
if(w.test(D)){if(!E||E=='text'){C='feed_'+D}
else{C=E+'_'+D}}
else{C='custom_'+B.type}
B.card_type=C.toLowerCase()}}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_data_normalizeCardType"].join('')
x.prototype.__jx__fqname="getkudos_widget_controllers_data_normalizeCardType"}
return x})()
b.__$$__getkudos_widget_widgets_FriendlyDataIFrame=(function(){function w(x){x=x||document
var y,z,A=q.extend(this)
A.parentDoc=x
if(window.ActiveXObject&&!1){y=new window.ActiveXObject('htmlfile')
y.open()
y.write('<script>document.win = window</script>')
y.close()
z=y.win}
else{var B=this.iframe=x.createElement('iframe'),C=B.style
A.allowTransparency='true'
A.frameBorder='0'
C.backgroundColor='transparent'
C.position='absolute'
C.width=C.height='1px'
C.left=C.top='-9999px'
C.border=0
x.body.appendChild(B)
try {z=B.contentWindow
y=z.document}catch(D){A.fire('error')
A.destroy()
return}}
A.doc=y
A.win=z
A.$Loader={cleanup:function(){l(function(){if(A.$Loader.payload)A.fire('success',A.$Loader.payload)
else A.fire('error')
A.$Loader.payload=null
A.destroy()})}}}
w.prototype.load=function(x){this.doc.open()
this.win.$Loader=this.$Loader
this.doc.write('<html><head><script charset="UTF-8" src="'+x+'"></script></head><body onload="try { $Loader.cleanup() } catch(e) {}"></body></html>')
this.doc.close()}
w.prototype.destroy=function(){try {this.iframe&&this.parentDoc.body.removeChild(this.iframe)
this.doc=this.win=this.iframe=this.win.$Loader=null}catch(x){;}}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_FriendlyDataIFrame"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_FriendlyDataIFrame"}
return w})()
b.__$$__getkudos_dashboard_utils_deparam=(function(){var w=window.decodeURIComponent
function x(y,z){var A={},B={'true':!0,'false':!1,'null':null}
y=y.replace(/\+/g,' ').split('&')
for(var C=0,D=y.length;C<D;C++){E(y[C])}
return A
function E(G){var H=G.split('='),I=F(H[0]),J,K=A,L=0,M=I.split(']['),N=M.length-1
if(/\[/.test(M[0])&&/\]$/.test(M[N])){M[N]=M[N].replace(/\]$/,'')
M=M.shift().split('[').concat(M)
N=M.length-1}
else{N=0}
if(H.length===2){J=F(H[1])
if(z){J=J&&!isNaN(J)?+J:J==='undefined'?a:B[J]!==a?B[J]:J}
if(N){for(;L<=N;L++){I=M[L]===''?K.length:M[L]
K=K[I]=L<N?K[I]||(M[L+1]&&isNaN(M[L+1])?{}:[]):J}}
else{if(g(A[I])){A[I].push(J)}
else if(A[I]!==a){A[I]=[A[I],J]}
else{A[I]=J}}}
else if(I){A[I]=z?a:''}}
function F(G){try {return w(G)}catch(H){return G}}}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_deparam"].join('')
x.prototype.__jx__fqname="getkudos_dashboard_utils_deparam"}
return x})()
b.__$$__getkudos_dashboard_utils_bind=(function(){var w=Function.prototype.bind,x=Array.prototype.slice
function y(z,A){if(w&&z.bind===w)return w.apply(z,x.call(arguments,1))
if(typeof z!=='function')throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
var B=x.call(arguments,2),C=z,D=function(){},E=function(){return C.apply(this instanceof D&&A?this:A,B.concat(x.call(arguments)))}
D.prototype=z.prototype
E.prototype=new D()
return E}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_bind"].join('')
y.prototype.__jx__fqname="getkudos_dashboard_utils_bind"}
return y})()
b.__$$__jx_ui_HTMLEvent=(function(){function w(y){y.preventDefault=w.preventDefault
y.stopPropagation=w.stopPropagation
y.target=y.srcElement}
w.preventDefault=function(){this.returnValue=!1}
w.stopPropagation=function(){this.cancelBubble=!0}
function x(){this.allCallbacks={}
this.nativeHandlers={}}
x.prototype.useCustomHandling=function(y){if(!this.dom.nodeType&&this.dom!=window&&this.dom!=document)return !0
if(this.tagName.toLowerCase()=='form'&&y=='submit')return !1
return !p.isCustomEvents&&(p.isFF&&p.isFF<9?!document.createEvent('event')[y.toUpperCase()]:typeof (this.dom['on'+y])=='undefined')}
x.prototype.addEventListener=function(y,z){if(!y&&typeof z!='function')throw 'bad arguments to on / addEventListener'
if(!(y in this.allCallbacks)){this.allCallbacks[y]=[]
if(!this.useCustomHandling(y))this.setupNativeEventListener(y)}
this.allCallbacks[y].push(z)
return this}
x.prototype.setupNativeEventListener=function(y){if(y in this.nativeHandlers)return
var z=this
this.nativeHandlers[y]=function(A){A&&(A.stopPropagation||w(A))
var B,C=z.allCallbacks[y],D=C.length,E=!0
C._active=!0
for(B=0;B<D;B++){try {if(!C[B])continue
if(C[B].call(z,(p.isCustomEvents&&(A instanceof window.CustomEvent))?A.detail:A)===!1)E=!1}catch(F){q.fire('error',F)}}
C._active=!1
if(C._dirty){for(B=0;B<D;B++){if(!C[B]){if(B==D-1)C.pop()
else C[B--]=C.pop()
D--}}
C._dirty=!1}
if(E===!1){if(A){A.preventDefault()
A.returnValue=!1}
return !1}}
if(this.dom.attachEvent)this.dom.attachEvent('on'+y,this.nativeHandlers[y])
else if(this.dom.addEventListener)this.dom.addEventListener(y,this.nativeHandlers[y],!1)}
x.prototype.teardownNativeEventListener=function(y){var z=this.nativeHandlers[y]
if(!z)return
if(this.dom.attachEvent)this.dom.detachEvent('on'+y,z)
else if(this.dom.addEventListener)this.dom.removeEventListener(y,z,!1)
delete this.nativeHandlers[y]
delete this.allCallbacks[y]}
x.prototype.removeEventListener=function(y,z){var A=this.allCallbacks[y]
if(!A)return
for(var B=0,C=A.length;B<C;B++)if(A[B]===z){if(A.length==1){if(this.nativeHandlers[y])this.teardownNativeEventListener(y)
else delete this.allCallbacks[y]}
else if(A._active)A[B]=null,A._dirty=!0
else if(B==C-1)A.pop()
else A[B]=A.pop()
break}
return this}
x.prototype.unextendEvents=function(){if(!this.allCallbacks||!this.nativeHandlers)return
for(var y in this.nativeHandlers)if(this.nativeHandlers.hasOwnProperty(y))this.teardownNativeEventListener(y)
this.allCallbacks=this.nativeHandlers=null}
x.prototype.fireCustomEvent=function(y,z){if(!p.isCustomEvents||this.useCustomHandling(y)){var A=this.allCallbacks[y],B=!0
if(A&&A.length){A._active=!0
var C,D,E
for(C=0,D=A.length;C<D;C++){try {E=A[C].call(this,z)
if(E===!1)B=!1}catch(F){q.fire('error',F)}}
A._active=!1
if(A._dirty){for(C=0;C<D;C++){if(!A[C]){if(C==D-1)A.pop()
else A[C--]=A.pop()
D--}}
A._dirty=!1}}
return B}
else{return this.dom.dispatchEvent(new window.CustomEvent(y,{bubbles:!1,cancelable:!0,detail:z}))}}
x.prototype.fire=x.prototype.fireCustomEvent
x.prototype.on=x.prototype.addEventListener
x.prototype.un=x.prototype.removeEventListener
x.__jx__no_fqname=!0
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_HTMLEvent"].join('')
x.prototype.__jx__fqname="jx_ui_HTMLEvent"}
return x})()
b.__$$__getkudos_widget_utils_onIWinLoaded=(function(){function w(x,y){var z=+new Date()
A()
function A(){var B=new Date()-z>200
if(x.isLoaded||B)window.setTimeout(y,0)
else window.setTimeout(A,50)}}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_utils_onIWinLoaded"].join('')
w.prototype.__jx__fqname="getkudos_widget_utils_onIWinLoaded"}
return w})()
b.__$$__getkudos_widget_controllers_data_normalizeCacheBuster=(function(){var w=b.__$$__getkudos_widget_Config
function x(){var y=w.payload_expire,z=+new Date()
return Math.ceil(z/y)*y}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_data_normalizeCacheBuster"].join('')
x.prototype.__jx__fqname="getkudos_widget_controllers_data_normalizeCacheBuster"}
return x})()
b.__$$__getkudos_widget_controllers_Data=(function(){var w=b.__$$__jx_data_DataNode,x=new w(),y={root:x,getRoot:A,getDatapath:z}
function z(B){var C=B.nodeType===9?B:B.ownerDocument
return C._getkudos_datapath}
function A(B){var C=B.nodeType===9?B:B.ownerDocument,D=C._getkudos_datapath
if(D)return x.$(D)
else return x}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_Data"].join('')
y.prototype.__jx__fqname="getkudos_widget_controllers_Data"}
return y})()
b.__$$__getkudos_dashboard_utils_convertToDataNode=(function(){var w=b.__$$__jx_core_ObjectUtil,x={'boolean':'bool','string':'string','number':'int'},y={timestamp:A},z={passthrough_nulls:{},useArrayOrder:!1,arrayOrderPadding:0,arrayOrderStart:0}
function A(D){D=parseInt(D,10)
return {name:'timestamp$int',value:D*1000}}
function B(D,E,F){var G={},H,I,J
E=w.extend({},y,E||{})
F=w.extend({},z,F||{})
K(D,E,F)
return C(G)?null:G
function K(L,M,N){if(g(L)){for(var O=0;O<L.length;O++){var P=L[O]
if(P===null)continue
if(typeof P=='object'){H=N.arrayOrderStart+O+''
if(N.useArrayOrder||!('id' in P)){if(H.length<N.arrayOrderPadding)H=new Array(N.arrayOrderPadding-H.length+1).join('0')+H}
else H=P.id
I=B(P,M,N)
if(!I)continue}
else{H=P+'$bool'
I=1}
G[H]=I}}
else{for(H in L)if(L.hasOwnProperty(H)){I=L[H]
if(/\$[a-z]+$/.test(H));
else if(H in M){J=M[H]
if(!J)continue
if(typeof J=='function'){var Q=J(I)
I=Q.value
H=Q.name}}
else if(I===null){if(!N.passthrough_nulls[H])continue}
else if(typeof I=='object'){I=B(I,M,N)
if(!I)continue}
else H=H+'$'+x[typeof I]
G[H]=I}}}}
function C(D){for(var E in D)if(D.hasOwnProperty(E)){E=E
return !1}
return !0}
if((typeof B==='function')&&B.prototype&&!B.__jx__no_fqname){B.prototype.__jx__fqname_chain=[(B.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_convertToDataNode"].join('')
B.prototype.__jx__fqname="getkudos_dashboard_utils_convertToDataNode"}
return B})()
b.__$$__meshim_widget_controllers_DOMStorage=(function(){var w=b.__$$__jx_data_JSON,x={},y=window,z=y.document,A='localStorage',B='__storejs__',C
x.disabled=!1
x.set=function(){}
x.get=function(){}
x.remove=function(){}
x.clear=function(){}
x.transact=function(K,L,M){var N=x.get(K)
if(M==null){M=L
L=null}
if(typeof N=='undefined'){N=L||{}}
M(N)
x.set(K,N)}
x.getAll=function(){}
x.serialize=function(K){return w.stringify(K)}
x.deserialize=function(K){if(typeof K!='string'){return a}
try {return w.parse(K)}catch(L){return K||a}}
function D(){try {return (A in y&&y[A])}catch(K){return !1}}
if(D()){C=y[A]
x.set=function(K,L){if(L===a){return x.remove(K)}
C.setItem(K,x.serialize(L))
return L}
x.get=function(K){return x.deserialize(C.getItem(K))}
x.remove=function(K){C.removeItem(K)}
x.clear=function(){C.clear()}
x.getAll=function(){var K={}
for(var L=0;L<C.length;++L){var M=C.key(L)
K[M]=x.get(M)}
return K}}
else if(z.documentElement.addBehavior){var E,F
try {F=new window.ActiveXObject('htmlfile')
F.open()
F.write('<s'+'cript>document.w=window</s'+'cript><iframe src="/favicon.ico"></frame>')
F.close()
E=F.w.frames[0].document
C=E.createElement('div')}catch(K){C=z.createElement('div')
E=z.body}
function G(K){return function(){try {var L=Array.prototype.slice.call(arguments,0)
L.unshift(C)
E.appendChild(C)
C.addBehavior('#default#userData')
C.load(A)
var M=K.apply(x,L)
E.removeChild(C)
return M}catch(N){;}}}
var H=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g")
function I(K){return K.replace(H,'___')}
x.set=G(function(K,L,M){L=I(L)
if(M===a){return x.remove(L)}
K.setAttribute(L,x.serialize(M))
K.save(A)
return M})
x.get=G(function(K,L){L=I(L)
return x.deserialize(K.getAttribute(L))})
x.remove=G(function(K,L){L=I(L)
K.removeAttribute(L)
K.save(A)})
x.clear=G(function(K){var L=K.XMLDocument.documentElement.attributes
K.load(A)
for(var M=0,N;N=L[M];M++){K.removeAttribute(N.name)}
K.save(A)})
x.getAll=G(function(K){var L=K.XMLDocument.documentElement.attributes,M={}
for(var N=0,O;O=L[N];++N){var P=I(O.name)
M[O.name]=x.deserialize(K.getAttribute(P))}
return M})}
try {x.set(B,B)
if(x.get(B)!=B){x.disabled=!0}
x.remove(B)}catch(K){x.disabled=!0}
x.enabled=!x.disabled
var J=x
if((typeof J==='function')&&J.prototype&&!J.__jx__no_fqname){J.prototype.__jx__fqname_chain=[(J.prototype.__jx__fqname_chain||"")," ","meshim_widget_controllers_DOMStorage"].join('')
J.prototype.__jx__fqname="meshim_widget_controllers_DOMStorage"}
return J})()
b.__$$__meshim_widget_controllers_Cookie=(function(){var w=b.__$$__jx_data_JSON,x={set:E,get:C,getJSONCookie:D,setJSONCookie:F,remove:G},y=window.encodeURIComponent,z=window.decodeURIComponent
function A(H){if(typeof H!='string'||H==='')return !1
return !0}
function B(){var H=document.cookie,I={},J,K,L,M,N
if(typeof H!=='string'||H==='')return {}
H=H.split(/;\s/g)
for(J=0,K=H.length;J<K;J++){try {L=H[J].match(/([^=]+)=/i)
if(L instanceof Array){M=z(L[1])
N=z(H[J].substr(L[1].length+1))}
else{M=z(L)
N=""}
I[M]=N}catch(O){;}
;}
return I}
function C(H){if(!A(H))return null
var I=B()
if(I[H])return I[H]
else return null}
function D(H){var I=C(H),J={}
try {J=w.parse(I)}catch(K){;}
if(!J||typeof J!='object')return {}
else return J}
function E(H,I,J){J=J||{}
var K=y(H)+'='+y(I)
if('ttl' in J){var L=new Date(),M=J.ttl*24*60*60*1000
L.setTime(L.getTime()+M)
K+='; expires='+L.toGMTString()}
if('path' in J)K+='; path='+J.path
if('domain' in J)K+='; domain='+J.domain
if(J.secure)K+='; secure'
document.cookie=K}
function F(H,I,J){if(typeof I!='object')I=={}
E(H,w.stringify(I),J)}
function G(H,I){I=I||{}
I.ttl=-1
E(H,"",I)}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","meshim_widget_controllers_Cookie"].join('')
x.prototype.__jx__fqname="meshim_widget_controllers_Cookie"}
return x})()
b.__$$__jx_ui_HTMLElement=(function(){var w=b.__$$__jx_ui_HTMLEvent
if(p.isIE)document.execCommand('BackgroundImageCache',!1,!0)
var x='background background-position border border-color border-style border-width color border-top border-right border-bottom border-left clear padding margin margin-top margin-right margin-bottom margin-left display line-height letter-spacing visibility outline overflow overflow-x overflow-y font-family font-size font-weight font-style text-align text-decoration text-transform vertical-align z-index cursor min-height min-width max-height max-width'.split(' '),y='title checked href media name src target'.split(' '),z=p.bugs.ie.cssFixed
function A(I){return (function(J){try {this.dom.style[I]=J}catch(K){;}
return this})}
function B(I){return (function(J){this.dom.setAttribute(I,J)
return this})}
function C(I){return (i(I)&&I.substr(I.length-1)=='%')?parseInt(I,10)+'%':parseInt(I,10)}
function D(){if(D.alreadyHacked)return
D.alreadyHacked=1
if(p.isStrict){document.body.parentNode.style.background='#fff url(https://) fixed'
document.body.className=document.body.className}
else{if(document.body.currentStyle.backgroundAttachment!='fixed'){if(document.body.currentStyle.backgroundImage!='none'){var I=document.createElement('div'),J=I.style,K=document.body.currentStyle,L=!1,M=0,N,O
J.backgroundAttachment=K.backgroundAttachment
J.backgroundColor=K.backgroundColor
J.backgroundImage=K.backgroundImage
J.backgroundPositionX=K.backgroundPositionX
J.backgroundPositionY=K.backgroundPositionY
J.backgroundRepeat=K.backgroundRepeat
J.position='absolute'
J.zIndex=-1
J.top=J.left=0
J.width='100%'
document.body.insertBefore(I,document.body.firstChild)
var P=function(){if(!L&&M){N+=document.body.clientWidth-M
J.width=N+'px'
M=document.body.clientWidth}
if(O)return
O=setTimeout(function(){J.width=0
document.body.className=document.body.className
N=Math.max(document.body.scrollWidth,document.body.clientWidth)
J.width=N+'px'
M=document.body.clientWidth
L=document.body.scrollWidth>document.body.clientWidth
O=null},0)}
setTimeout(P,0)
J.setExpression('height','document.body.scrollHeight+"px"')
P()}
document.body.style.backgroundImage='url(https://)'
document.body.style.backgroundAttachment='fixed'}}}
function E(I){I=I.split(/[^a-zA-Z0-9]/)
for(var J=1;J<I.length;J++)if(I[J].length)I[J]=I[J].substr(0,1).toUpperCase()+I[J].substr(1)
return I.join('')}
function F(I){while(I.defaultPlacement)I=I.defaultPlacement
return I}
function G(I,J,K,L,M){if(!(this instanceof G))return new G(I,J,K,L,M)
if(!I){return}
if(!M){M={}}
this.jx_id=J=J||u.generateID()
this._top=this._bottom=this._left=this._right=this._width=this._height=NaN
this._position=null
this.pos=''
this.offsetx=0
this.offsety=0
this._snaps=[0,0,0,0]
this.useDisplay=!1
this.doc=this.ownerDocument=I.ownerDocument
this.parentNode=I
this.attributes=M
this.tagName=M.tagName
this.isNew=!0
this.dom=this.doc.createElement(this.tagName)
this.dom.jx_wrapper=this
this.style=this.dom.style
this.children=[]
this._autobinds=[]
w.call(this)
L&&this.addChildren(L)
I.appendChild(I instanceof G?this:this.dom)
this.setStyle(K)
this.setAttributes(M)
this.addClass(this.__jx__fqname)
J&&u.set(J,this)}
G.prototype=e(w.prototype)
G.prototype.addChildren=function(I){var J=I&&I.length
if(!I||!J)return
var K=F(this),L,M=K.ownerDocument,N
for(var O=0;O<J;O++){L=I[O]
if(g(L))K.appendChild(L)
else{N=M.createTextNode(L)
K.appendChild(N)
if(typeof L.bind=='function')L.bind(N)}}}
G.prototype.appendChild=function(I){if(g(I)){return I[0](this,I[1],I[2],I[3],I[4])}
if(f(I,this.children)==-1&&I.nodeType!=3)this.children.push(I)
if(I.parentNode&&I.parentNode!=this)I.parentNode.removeChild(I.parentNode instanceof G?I:(I.dom||I))
I.dom&&(I.parentNode=this)
this.dom.appendChild(I.dom||I)
return I}
G.prototype.removeChild=function(I){try {if(I.dom){this.dom.removeChild(I.dom)
I.parentNode=null}
else this.dom.removeChild(I)
var J=f(I,this.children)
if(J!=-1)return this.children.splice(J,1)}catch(K){;}}
G.prototype.insertBefore=function(I,J){var K=f(J,this.children)
if(J&&K==-1){J=null}
if(I.parentNode){var L=f(I,this.children)
if(L!=-1){this.children.splice(L,1)
if(K>L)K--}
else{I.parentNode.removeChild(I)}}
I.dom&&(I.parentNode=this)
if(!J)this.children.push(I)
else this.children.splice(K,0,I)
this.dom.insertBefore(I.dom||I,J?(J.dom||J):null)}
G.prototype.insertAfter=function(I,J){this.insertBefore(I,J&&J.getNextSibling())}
G.prototype.prependTo=function(){}
G.prototype.cloneNode=function(I){return this.dom.cloneNode(I)}
G.prototype.getNextSibling=function(){return this.dom.nextSibling&&this.dom.nextSibling.jx_wrapper}
G.prototype.getPreviousSibling=function(){return this.dom.previousSibling&&this.dom.previousSibling.jx_wrapper}
G.prototype.getFirstChild=function(){return this.dom.firstChild&&this.dom.firstChild.jx_wrapper}
G.prototype.getLastChild=function(){return this.dom.lastChild&&this.dom.lastChild.jx_wrapper}
G.prototype.getText=function(){return this.dom.innerText||this.dom.textContent||''}
G.prototype.setText=function(I){if(!this.dom)return
v&&v.unbind&&v.unbind(this.dom)
if(I&&typeof I.bind=='function')I.bind(this.dom)
if(typeof document.body.textContent!='undefined')this.dom.textContent=I
else this.dom.innerText=I
return this}
G.prototype.getHTML=function(){return this.dom.innerHTML}
G.prototype.setHTML=function(I){this.dom.innerHTML=I
return this}
G.prototype.destroy=function(){if(this._destructors){for(var I=this._destructors,J=I.length,K=0;K<J;K++)I[K].call(this)}
this._autobinds&&this.autounbind()
this.dom.jx_wrapper=null
typeof this.empty=='function'&&this.empty()
this.parentNode&&this.parentNode.removeChild(this.parentNode instanceof G?this:this.dom)
this.parentNode=null
u.unset(this)}
G.prototype.empty=function(){var I
while(this.children.length){I=this.children.pop()
if(typeof I.destroy=='function')I.destroy()
else if(I.nodeType==1)u.proto.destroy.call(I)}}
G.prototype.onDestruction=function(I){(this._destructors||(this._destructors=[])).push(I)}
G.prototype.getClassName=G.prototype.getClass=function(){return this.dom.className}
G.prototype.setClassName=G.prototype.setClass=function(I,J){this.dom.className=(J?I:this.__jx__fqname+' '+I)+(this._pseudo?' '+this._pseudo:'')
return this}
G.prototype.setAddClass=G.prototype.addClass=function(I){if(this.dom.className){if((' '+this.dom.className+' ').indexOf(' '+I+' ')!=-1)return this
this.dom.className+=(' '+I)}
else this.dom.className=I
return this}
G.prototype.removeClass=function(I){if(!this.dom.className)return this
this.dom.className=(' '+this.dom.className+' ').replace(' '+I+' ',' ')
this.dom.className=this.dom.className.substring(1,this.dom.className.length-1)
return this}
G.prototype.hasClass=function(I){return f(I,this.dom.className.split(' '))!=-1}
G.prototype.autobind=function(I,J,K){if(!this._autobinds){return}
this._autobinds.push([I,J,K])
I.on(J,K)}
G.prototype.autounbind=function(I,J,K){if(!this._autobinds){return}
var L=this._autobinds,M,N
if(I&&J&&K){for(M=L.length-1;M>=0;M--){N=L[M]
if(N[0]==I&&N[1]==J&&N[2]==K){L.splice(M,1)
N[0].un(N[1],N[2])
return}}
return}
if(!I&&!J&&!K){if(!L)return
for(M=L.length-1;M>=0;M--){N=L[M]
N[0].un(N[1],N[2])}
delete this._autobinds
return}}
G.prototype.getAttribute=function(I){return this.dom.getAttribute(I)||this.dom[I]}
G.prototype.setAttribute=function(I,J){this.dom.setAttribute(I,J)
return this}
G.prototype.removeAttribute=function(I){this.dom.removeAttribute(I)
return this}
G.prototype.setAttributes=function(I){var J,K
for(K in I)if(I.hasOwnProperty(K)){J='set'+K.substr(0,1).toUpperCase()+K.substr(1)
if(typeof this[J]=='function')this[J](I[K])}
return this}
G.prototype.getStyle=function(I){return this.dom.style[E(I)]}
G.prototype.getComputedStyle=function(I){I=I&&E(I)
var J
if(window.getComputedStyle)J=window.getComputedStyle(this.dom,null)
else if(this.dom.currentStyle)J=this.dom.currentStyle
else return
return I?J[I]:J}
G.prototype.setStyle=function(I){var J,K
if(arguments.length==1&&i(I)){if(!I)return this
I=I.split(';')
for(J=0;J<I.length;J++){if(I[J].match(/^\s*$/))continue
K=I[J].match(/\s*([^:]+):\s*(.*?)\s*$/)
if(!K&&I[J].length){continue}
this.setOneStyle(K[1],K[2])}}
else if(arguments.length==1&&typeof (I)=='object'){for(var L in I)if(I.hasOwnProperty(L))this.setOneStyle(L,I[L])}
else if(arguments.length>1){for(J=0;J<arguments.length;J+=2)this.setOneStyle(arguments[J],arguments[J+1])}
return this}
G.prototype.setOneStyle=function(I,J){var K=E('set-'+I)
if(typeof this[K]=='function')this[K](J)
else this.setCSSStyle(I,J)
return this}
G.prototype.setCSSStyle=function(I,J){try {this.dom.style[E(I)]=J}catch(K){;}
return this}
G.prototype.getScrollWidth=function(){return this.dom.scrollWidth}
G.prototype.getScrollHeight=function(){return this.dom.scrollHeight}
G.prototype.getClientWidth=function(){return this.dom.clientWidth}
G.prototype.getClientHeight=function(){return this.dom.clientHeight}
G.prototype.getTop=function(){return this.dom.offsetTop}
G.prototype.getLeft=function(){return this.dom.offsetLeft}
G.prototype.getWidth=function(){return this.dom.offsetWidth}
G.prototype.getHeight=function(){return this.dom.offsetHeight}
G.prototype.setTop=function(I){this._top=C(I)
this.solveConstraints()
return this}
G.prototype.setLeft=function(I){this._left=C(I)
this.solveConstraints()
return this}
G.prototype.setBottom=function(I){this._bottom=C(I)
this.solveConstraints()
return this}
G.prototype.setRight=function(I){this._right=C(I)
this.solveConstraints()
return this}
G.prototype.setWidth=function(I){this._width=C(I)
this.solveConstraints()
return this}
G.prototype.setHeight=function(I){this._height=C(I)
this.solveConstraints()
return this}
G.prototype.getScrollLeft=function(){return this.dom.scrollLeft}
G.prototype.setScrollLeft=function(I){this.dom.scrollLeft=I
return this}
G.prototype.getScrollTop=function(){return this.dom.scrollTop}
G.prototype.setScrollTop=function(I){this.dom.scrollTop=I
return this}
G.prototype.setFloat=function(I){var J=this
if(v&&v.onLanguage&&!this._onLanguageFloat){v.onLanguage&&v.onLanguage(K)
this.onDestruction(function(){v.unLanguage&&v.unLanguage(K)})
this._onLanguageFloat=!0}
K()
function K(){var L=(v&&v.flip)?v.flip(I):I
if(p.isIE)J.dom.style.styleFloat=L
else J.dom.style.cssFloat=L}
return this}
G.prototype.solveConstraints=function(){if(!isNaN(this._top)&&!isNaN(this._height))this._bottom=NaN
if(!isNaN(this._left)&&!isNaN(this._width))this._right=NaN;(this._width<0)&&(this._width=0);(this._height<0)&&(this._height=0)
this.applyConstraints()}
G.prototype.applyConstraints=function(){var I=this.dom.style,J=this
if(!u.hasParentNode(this.dom))return
if(p.bugs.ie.cssFixed&&this._position=='fixed'){l(function(){J.dom&&J.hackFixed()})
return}
if(p.bugs.ie.cssBottomRight&&((!isNaN(this._left)&&!isNaN(this._right))||(!isNaN(this._top)&&!isNaN(this._bottom)))){if(this.appendToParent)this.appendToParent(!0)
D()
var K=isNaN(this._left)?'':this._left,L=isNaN(this._right)?'':this._right,M=isNaN(this._width)?'':this._width,N,O=isNaN(this._top)?'':this._top,P=isNaN(this._bottom)?'':this._bottom,Q=isNaN(this._height)?'':this._height,R,S=this.dom.ownerDocument.compatMode=='BackCompat'
if(this._position=='fixed'&&this.dom.ownerDocument==document){if(S){R='document.body.clientHeight'
N='document.body.clientWidth'}
else{R='document.documentElement.clientHeight'
N='document.documentElement.clientWidth'}}
else{R='this.offsetParent.clientHeight'
N='this.offsetParent.clientWidth'}
if(p.isIE6){if(!isNaN(this._left)&&!isNaN(this._right)){L=''
M=[N,this._left,this._right].join('-')}
if(!isNaN(this._top)&&!isNaN(this._bottom)){P=''
Q=[R,this._top,this._bottom].join(' - ')}}
var T=function(W,X){I[W]=''
I.removeExpression(W)
if(typeof (X)=='number')I[W]=X+'px'
else if(i(X)&&X.substr(X.length-1)=='%')I[W]=X
else if(i(X)&&X.length)I.setExpression(W,X)}
T('left',K)
T('right',L)
T('width',M)
T('top',O)
T('bottom',P)
T('height',Q)}
V()
U()
function U(){I.top=i(J._top)?J._top:isNaN(J._top)?'':J._top+'px'
I.bottom=i(J._bottom)?J._bottom:isNaN(J._bottom)?'':J._bottom+'px'
if(J._height!=J.__height){I.height=i(J._height)?J._height:isNaN(J._height)?'':J._height+'px'
J.__height=J._height}}
function V(){I.left=i(J._left)?J._left:isNaN(J._left)?'':J._left+'px'
I.right=i(J._right)?J._right:isNaN(J._right)?'':J._right+'px'
if(J._width!=J.__width){I.width=i(J._width)?J._width:isNaN(J._width)?'':J._width+'px'
J.__width=J._width}}}
G.prototype.hackFixed=function(){var I=this.dom.style
D()
if(this.appendToParent)this.appendToParent(!0)
if(this._bottom<0)this._bottom=0
if(this._right<0)this._right=0
o.ok(isNaN(this._left)!=isNaN(this._right),'One and only one of left/right must be set')
o.ok(isNaN(this._top)!=isNaN(this._bottom),'One and only one of top/bottom must be set')
o.ok(!isNaN(this._width),'Width must be set')
o.ok(!isNaN(this._height),'Height must be set')
o.ok(this.ownerDocument==document,'Fixed element must be top level element')
if(this._height!=this.__height){I.height=this._height+'px'
this.__height=this._height}
if(this._width!=this.__width){I.width=this._width+'px'
this.__width=this._width}
var J=this.getHeight(),K=this.getWidth(),L,M,N,O
if(p.isQuirks){O='document.body.clientHeight'
N='document.body.clientWidth'
L='(dummye34cf6=document.body.scrollLeft)+'
M='(dummye34cf6=document.body.scrollTop )+'}
else{O='document.documentElement.clientHeight'
N='document.documentElement.clientWidth'
L='(dummye34cf6=document.documentElement.scrollLeft)+'
M='(dummye34cf6=document.documentElement.scrollTop )+'}
if(!isNaN(this._left))L+=this._left
else if(i(this._left))L+=parseInt(this._left,10)/100*(p.isQuirks?document.body:document.documentElement).clientWidth
else L+=N+'-'+(K+this._right)
if(!isNaN(this._top))M+=this._top
else if(i(this._top))M+=parseInt(this._top,10)/100*(p.isQuirks?document.body:document.documentElement).clientHeight
else M+=O+'-'+(J+this._bottom)
if(p.isIE6&&document.body.currentStyle.direction=='rtl'){if(p.isQuirks)L+='-(document.body.scrollWidth-document.body.clientWidth)'
else L+='-(document.documentElement.scrollWidth-document.documentElement.clientWidth)'}
I.setExpression('left',L+'+"px"')
I.setExpression('top',M+'+"px"')}
G.prototype.dock=function(I,J,K){this.pos=I
if(j(J))this.offsetx=J
if(j(K))this.offsety=K
this.doDock()
this.on('jx:resize',this.doDock)}
G.prototype.doDock=function(){var I=isNaN(this._width)?this.dom.offsetWidth:this._width,J=isNaN(this._height)?this.dom.offsetHeight:this._height,K,L,M,N,O,P,Q
K=L=M=N=NaN
O=P=Q=0
switch(this.pos.charAt(0)){case 't':K=0
break
case 'm':K='50%'
break
case 'b':L=0
break}
switch(this.pos.charAt(1)){case 'l':M=0
break
case 'c':M='50%'
break
case 'r':N=0
break}
if(K=='50%')O=-(J/2)
if(M=='50%')P=-(I/2)
if(this.offsety>=0||!isNaN(K)||typeof (K)=="string")O+=this.offsety
else Q=-this.offsety
P+=this.offsetx
this.setMargin([O+'px',0,Q+'px',P+'px'].join(' ')).setTop(K).setBottom(L).setLeft(M).setRight(N)}
G.prototype.setBounds=function(I){if(!g(I)){I=I.split(' ')
I[0]=parseInt(I[0],10)
I[1]=parseInt(I[1],10)
I[2]=parseInt(I[2],10)
I[3]=parseInt(I[3],10)}
if(z){I[1]=Math.max(0,I[1])
I[2]=Math.max(0,I[2])}
this._bounds=I
return this}
G.prototype.setSnaps=function(I){if(!g(I)){I=I.split(' ')
I[0]=parseInt(I[0],10)
I[1]=parseInt(I[1],10)
I[2]=parseInt(I[2],10)
I[3]=parseInt(I[3],10)}
this._snaps=[Math.max(0,I[0]),Math.max(0,I[1]),Math.max(0,I[2]),Math.max(0,I[3])]
return this}
G.prototype.applyBounds=function(){if(!this._bounds)return
if(this._left<this._bounds[3]+this._snaps[3])this._left=this._bounds[3]
if(this._right<this._bounds[1]+this._snaps[1])this._right=this._bounds[1]
if(this._top<this._bounds[0]+this._snaps[0])this._top=this._bounds[0]
if(this._bottom<this._bounds[2]+this._snaps[2])this._bottom=this._bounds[2]
var I=p.isQuirks?document.body:document.documentElement,J=isNaN(this._width)?this.dom.offsetWidth:this._width,K=I.clientWidth-J,L=I.clientHeight-this.dom.offsetHeight
if(K-this._left<=this._bounds[1]+this._snaps[1])this._left=K-this._bounds[1]
if(K-this._right<=this._bounds[3]+this._snaps[3])this._right=K-this._bounds[3]
if(L-this._top<=this._bounds[2]+this._snaps[2])this._top=L-this._bounds[2]
if(L-this._bottom<=this._bounds[0]+this._snaps[0])this._bottom=L-this._bounds[0]}
G.prototype.moveTo=function(I,J){this._bottom=this._right=NaN
this._top=J
this._left=I
this.applyBounds()
this.applyConstraints()
return this}
G.prototype.move=function(I,J){if(isNaN(this._left)&&isNaN(this._right))this._left=0
if(isNaN(this._top)&&isNaN(this._bottom))this._top=0
if(!isNaN(this._left))this._left+=I
if(!isNaN(this._right))this._right-=I
if(!isNaN(this._top))this._top+=J
if(!isNaN(this._bottom))this._bottom-=J
this.applyBounds()
this.applyConstraints()}
G.prototype.resizeBy=function(I,J,K,L){if(I){if(isNaN(this._width))this._width=this.dom.offsetWidth
this._width=Math.max(K||0,this._width+I)}
if(J){if(isNaN(this._height))this._height=this.dom.offsetHeight
this._height=Math.max(L||0,this._height+J)}
this.applyBounds()
this.applyConstraints()
this.fire('jx:resize')
return this}
G.prototype.setVisible=function(I){if(I=='none'||I=='block')this.useDisplay=!0
if(I=='none'||I=='hidden'||I=='false'||!I)this.hide()
else this.show()
return this}
G.prototype.isVisible=function(){var I=this.dom.style
if(this.useDisplay)return I.display!='none'
else return I.visibility=='visible'}
G.prototype.show=function(){var I=this.dom.style
if(this.useDisplay){if(I.display!=(this._initialDisplay||'block')){I.display=this._initialDisplay||'block'
this.fire('show')}}
else{if(I.visibility!='visible'){I.visibility='visible'
this.fire('show')}}
return this}
G.prototype.hide=function(){var I=this.dom.style
if(this.useDisplay){if(I.display!='none'){this._initialDisplay=(I.display!='none')&&I.display
I.display='none'
this.fire('hide')}}
else{if(I.visibility!='hidden'){I.visibility='hidden'
this.fire('hide')}}
return this}
G.prototype.toggle=function(){return this.isVisible()?this.hide():this.show()}
G.prototype.getXY=function(){var I,J,K=this.dom.offsetParent
I=this.dom.offsetLeft
J=this.dom.offsetTop
while(K){I+=K.offsetLeft
J+=K.offsetTop
K=K.offsetParent}
return [I,J]}
G.prototype.getFixedXY=function(){var I,J,K=this.dom,L=this.dom.ownerDocument,M=L.documentElement,N=L.defaultView||K.parentWindow||!1,O={top:0,left:0},P=M.clientTop||0,Q=M.clientLeft||0,R=N.pageYOffset||M.scrollTop,S=N.pageXOffset||M.scrollLeft
if('getBoundingClientRect' in K)O=K.getBoundingClientRect()
J=O.top+R-P
I=O.left+S-Q
return [I,J]}
G.prototype.setOpacity=function(I){I=Math.max(Math.min(I,1),0)
if(p.isIE<9)this.dom.style.filter=(this.dom.style.filter||'').replace(/progid:DXImageTransform.Microsoft.Alpha\([^\)]*\),? ?/gi,'')+(I>=1?'':'progid:DXImageTransform.Microsoft.Alpha(opacity='+I*100+'), ')
else this.dom.style.opacity=I
return this}
G.prototype.setPosition=function(I){switch(I){case 'static':case 'relative':case 'absolute':case 'fixed':this._position=I}
if(this._position!==null)this.setCSSStyle('position',(z&&this._position=='fixed')?'absolute':this._position)
return this}
G.prototype.setBackgroundImage=function(I){var J=I
if(J&&p.isIE)this.dom.style.filter+='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+J+'",sizingMethod="scale"), '
else this.dom.style.backgroundImage='url("'+I+'")'
return this}
G.prototype.setRotation=function(I){if(p.isFF)this.dom.style.MozTransform=I?'rotate('+I+'deg)':''
else if(p.isSafari)this.dom.style.WebkitTransform=I?'rotate('+I+'deg)':''
else if(p.isIE){this.dom.style.filter=I?'progid:DXImageTransform.Microsoft.BasicImage(rotation='+Math.round(I/90)+')':''
if(p.isIE8&&I){var J=this.parentNode.getElementsByTagName('iframe')
if(p.isIE8&&J.length){J[0].style.filter=I?'progid:DXImageTransform.Microsoft.BasicImage(rotation='+Math.round(I/90)+')':''
this.dom.style.overflow='visible'}}}
return this}
G.prototype.appendToParent=function(I){if(!u.hasParentNode(this.dom))this.parentNode.appendChild(this.parentNode instanceof G?this:this.dom)
if(this.parentNode==document.body&&(this.style.position=='absolute'||this.style.position=='fixed')){this.parentNode.insertBefore(this.dom,this.parentNode.firstChild)}
if(I&&!this.inDOM){this.parentNode.appendToParent&&this.parentNode.appendToParent(I)
this.inDOM=!0}}
G.prototype.focus=function(){try {this.dom.focus()}catch(I){;}
;
return this}
G.prototype.blur=function(){try {this.dom.blur()}catch(I){;}
;
return this}
G.prototype.click=function(){this.dom.click&&this.dom.click()
return this}
G.prototype.validate=function(I){var J=!0
for(var K=0,L=this.children.length;K<L;K++){var M=this.children[K]
if(M instanceof G&&typeof M.validate=='function')if(!M.validate(I?J:!1))J=!1}
return J}
G.prototype.getSelectable=function(){return this.selectable}
G.prototype.setSelectable=function(I){function J(){return !1}
if(m(I)){this.selectable=!0
this.setStyle('user-select','text')
p.isFF&&this.setStyle('-moz-user-select','text')
p.isWebKit&&this.setStyle('-webkit-user-select','text')
p.isIE>9&&this.setStyle('-ms-user-select','text');(p.isIE<10||p.isOpera)&&this.un('selectstart',J)}
else{this.selectable=!1
this.setStyle('user-select','none')
p.isFF&&this.setStyle('-moz-user-select','none')
p.isWebKit&&this.setStyle('-webkit-user-select','none')
p.isIE>9&&this.setStyle('-ms-user-select','none');(p.isIE<10||p.isOpera)&&this.on('selectstart',J)}
return this}
G.prototype.getDisabled=function(){return this.dom.disabled}
G.prototype.setDisabled=function(I){I=m(I)
for(var J=0,K=this.children.length;J<K;J++)if(this.children[J] instanceof G)this.children[J].setDisabled(I)
this[I?'addClass':'removeClass']('disabled')
this.dom.disabled=I
return this}
G.prototype.getReadOnly=function(){return this.dom.readOnly}
G.prototype.setReadOnly=function(I){I=m(I)
for(var J=0,K=this.children.length;J<K;J++)if(this.children[J] instanceof G)this.children[J].setReadOnly(I)
this.dom.readOnly=I
return this}
G.prototype.getValue=function(){return this.dom.value}
G.prototype.setValue=function(I){this.dom.value=k(I,'allowNull')?'':I
return this}
G.prototype.getType=function(){return this.getAttribute('type')}
G.prototype.setType=function(I){try {this.dom.setAttribute('type',I)}catch(J){;}
return this}
G.prototype.getName=function(){return this.getAttribute('name')}
G.prototype.setName=function(I){return this.setAttribute('name',I)}
G.prototype.getTabIndex=G.prototype.getTabindex=function(){try {return this.dom.tabIndex}catch(I){;}}
G.prototype.setTabIndex=G.prototype.setTabindex=function(I){try {this.dom.tabIndex=I}catch(J){;}
return this}
G.prototype.setPlacement=function(I){if(!I||!this.parentNode||!(this.parentNode instanceof G))return
var J=this.parentNode.getContainer(I)
if(!J)return
if(m(this.attributes.discardPlacement)){while(this.children.length)J.appendChild(this.children[0])
this.destroy()
return}
J.appendChild(J instanceof G?this:this.dom)
return this}
G.prototype.setContainer=function(I){this.attributes.container=I
return this}
G.prototype.getContainer=function(I){if(!I)return
if(this.attributes.container==I)return this
var J,K=this.children.length
for(var L=0;L<K;L++)if(typeof this.children[L].getContainer=='function'){J=this.children[L].getContainer(I)
if(J)return J}
return}
G.prototype.getPseudo=function(){return this._pseudo}
G.prototype.setPseudo=function(I){if(this._pseudo)this.removeClass(I)
this._pseudo=I
if(this._pseudo)this.addClass(I)
return this}
G.prototype.setUseDisplay=function(I){this.useDisplay=m(I)
return this}
for(var H=0;H<x.length;H++)G.prototype[E('set-'+x[H])]=A(E(x[H]))
for(H=0;H<y.length;H++)G.prototype[E('set-'+y[H])]=B(E(y[H]))
G.__jx__no_fqname=!0
if((typeof G==='function')&&G.prototype&&!G.__jx__no_fqname){G.prototype.__jx__fqname_chain=[(G.prototype.__jx__fqname_chain||"")," ","jx_ui_HTMLElement"].join('')
G.prototype.__jx__fqname="jx_ui_HTMLElement"}
return G})()
b.__$$__meshim_widget_utils_Color=(function(){var w=b.__$$__meshim_common_Chroma,x={white:"#FFF",black:"#000",grey:"#808080"}
x.clampLuminance=function(z,A,B){z=x.getChromaObj(z)
if(!z)return
if(A<0)A=0
if(B>1)B=1
var C=z.luminance(),D=C<A?A:C>B?B:C
return C===D?z:x.getColorAtLuminance(z,D)}
x.lighten=function(z,A,B){return w.interpolate(z,x.white,A,B||'rgb')}
x.darken=function(z,A,B){return w.interpolate(z,x.black,A,B||'rgb')}
var y=100
x.getColorAtLuminance=function(z,A){if(A<0||A>1)return
z=x.getChromaObj(z)
if(!z)return
var B=0
if(z.luminance()>=A){for(;;){B++
if(z.luminance()<=(A+0.05)||B>=y)return z
z=x.darken(z,0.05)}}
else{for(;;){B++
if(z.luminance()>=(A-0.05)||B>=y)return z
z=x.lighten(z,0.05)}}}
x.getColorAtContrast=function(z,A,B){if(B<1)return
z=x.getChromaObj(z)
A=x.getChromaObj(A)
if(!z||!A)return
var C=0
if(w.contrast(z,A)>=B){for(;;){C++
if(w.contrast(z,A)<=(B+0.5)||C>=y)return A
if(A.luminance()>=z.luminance()){A=x.darken(A,0.05)}
else{A=x.lighten(A,0.05)}}}
else{var D=w.contrast(z,x.white),E=w.contrast(z,x.black)
for(;;){C++
if(w.contrast(z,A)>=(B-0.5)||C>=y)return A
if(A.luminance()>=z.luminance()){if(D>=(B-0.5)){A=x.lighten(A,0.05)}
else if(E>=(B-0.5)){A=x.darken(A,0.05)}
else{return D>E?x.getChromaObj(x.white):x.getChromaObj(x.black)}}
else{if(E>=(B-0.5)){A=x.darken(A,0.05)}
else if(D>=(B-0.5)){A=x.lighten(A,0.05)}
else{return D>E?x.getChromaObj(x.white):x.getChromaObj(x.black)}}}}}
x.getContrastColor=function(z,A,B,C,D,E,F){z=x.getChromaObj(z)
A=x.getChromaObj(A)
B=x.getChromaObj(B)
if(!z||!A||!B)return
var G=z.luminance()
if(D==='bright'){if(G<C){return A}
else{return x.getColorAtContrast(z,B,F?F:2.5)}}
else if(D==='dark'){if(G>C){return B}
else{return x.getColorAtContrast(z,A,E?E:4.5)}}}
x.isHexColor=function(z){if(typeof z=='string'&&/^#[0-9A-F]{3}([0-9A-F]{3})?$/i.test(z)){return !0}
else{return !1}}
x.getChromaObj=function(z){if(x.isHexColor(z)){return w.hex(z)}
else if(z instanceof w.constructor){return z}
else{return !1}}
x.rgbaColor=function(z,A){z=x.getChromaObj(z)
if(!z)return
if(typeof A=='undefined'){A=1}
else{A=parseFloat(A)
if(isNaN(A)||A>1)A=1
if(A<0)A=0}
return 'rgba('+x.toRGB(z).join(',')+','+A+')'}
x.toRGB=function(z){z=x.getChromaObj(z)
if(!z)return
var A=z.rgb()
A[0]=parseInt(A[0],10)
A[1]=parseInt(A[1],10)
A[2]=parseInt(A[2],10)
return A}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","meshim_widget_utils_Color"].join('')
x.prototype.__jx__fqname="meshim_widget_utils_Color"}
return x})()
b.__$$__getkudos_widget_controllers_UIController=(function(){var w=b.__$$__getkudos_widget_controllers_Data,x=b.__$$__getkudos_widget_controllers_GoogleAnalytics,y=b.__$$__getkudos_widget_Config,z='banner list button'.split(' ')
function A(B){if(!(this instanceof A))return new A(B)
this.doc=B.nodeType===9?B:B.ownerDocument
this.$root=w.getRoot(B)
this.$site_name=this.$root.$$('getkudos.account.site_name$string')}
A.prototype.onUserClick=function(B){var C=B
if(B=='custom-body-url'||B=='view_post'||B=='view_tweet'||B=='maximize'||B=='minimize'||/solicit/.test(B))C=B+' '+this.$root.$$('getkudos.ui.display$string').getValue()
this.trackEvent('click',C)
switch(B){case 'button':case 'maximize':case 'banner':this.showPanel('list')
break
case 'minimize':this.onMinimize()
break
case 'banner_left_nav':this.$root.$$('getkudos.ui.kudosBanner').update({left_nav$bool:!0})
break
case 'banner_right_nav':this.$root.$$('getkudos.ui.kudosBanner').update({right_nav$bool:!0})
break}
return this}
A.prototype.trackEvent=function(B,C,D){if(this.$site_name.getValue()!=='zopim')return this
x.trackEvent(B,C,D)}
A.prototype.onMinimize=function(){var B=this.$root.$$('getkudos.ui'),C=B.getValue('display$string')||'list'
switch(C){case 'list':this.showPanel('button')
break
case 'banner':this.showPanel('button')
break
default:this.showPanel('button')
break}
return this}
A.prototype.resetPanelIfNeeded=function(){var B=this.$root.$$('getkudos.ui.display$string').getValue(),C=f(B,z)>-1
if(!C)this.showPanel('default')
return this}
A.prototype.showPanel=function(B){if(B==='default'){var C=this.$root.$$('getkudos.settings.theme.default_state$string').getValue()
B=C||'banner'}
this.$root.$$('getkudos.ui').update({display$string:B})
return this}
A.prototype.reloadBrokenAvatars=function(B){var C=this.$root.$$('getkudos.ui.broken_avatars'),D=C.getKeys(),E=B+'$bool'
if(f(E,D)>-1)return
C.update({newKey:!0})
var F=y.reload_avatar_url.replace('[site_name]',this.$site_name.getValue()).replace('[ids]',B),G=this.doc.createElement('img')
G.src=F}
if((typeof A==='function')&&A.prototype&&!A.__jx__no_fqname){A.prototype.__jx__fqname_chain=[(A.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_UIController"].join('')
A.prototype.__jx__fqname="getkudos_widget_controllers_UIController"}
return A})()
b.__$$__jx_ui_html_iframe=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='iframe'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_iframe"].join('')
x.prototype.__jx__fqname="jx_ui_html_iframe"}
return x})()
b.__$$__jx_ui_html_A=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='A'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_A"].join('')
x.prototype.__jx__fqname="jx_ui_html_A"}
return x})()
b.__$$__jx_ui_html_span=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='span'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_span"].join('')
x.prototype.__jx__fqname="jx_ui_html_span"}
return x})()
b.__$$__jx_ui_html_a=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='a'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_a"].join('')
x.prototype.__jx__fqname="jx_ui_html_a"}
return x})()
b.__$$__jx_ui_html_br=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='br'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_br"].join('')
x.prototype.__jx__fqname="jx_ui_html_br"}
return x})()
b.__$$__getkudos_widget_themes_Default=(function(){var w=b.__$$__meshim_common_Chroma,x=b.__$$__meshim_widget_utils_Color,y={}
y.generate=function(z){var A=z.primary_color
A=w.hex(A)
var B=z.border_visible===!1?'0px':'1px',C=w.hex(z.border_color||'#ddd').hex(),D=A.lighten(5),E=A.lighten(10),F=A.darken(5),G=A.luminance()*255,H=120,I=220,J=w.interpolate(A,'#000',0.3,'rgb'),K=new w.ColorScale({colors:[x.white,x.white,J.darken(0.2),J.darken(0.05),J.darken(0.05)],positions:[0,(H-0.001)/255,(H+0.001)/255,I,1],mode:"lch"}),L=K.get(G/255).hex()
A=A.hex()
D=D.hex()
E=E.hex()
F=F.hex()
var M={primary_color:A,title_color:L,title_bar_text:{color:A},minimize_button_bg:D,button_hover:E,button_pressed:F,card_border_width:B,card_border_color:C}
return M}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","getkudos_widget_themes_Default"].join('')
y.prototype.__jx__fqname="getkudos_widget_themes_Default"}
return y})()
b.__$$__jx_ui_html_table=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='table'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_table"].join('')
x.prototype.__jx__fqname="jx_ui_html_table"}
return x})()
b.__$$__jx_ui_html_tbody=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='tbody'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_tbody"].join('')
x.prototype.__jx__fqname="jx_ui_html_tbody"}
return x})()
b.__$$__jx_ui_html_tr=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='tr'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_tr"].join('')
x.prototype.__jx__fqname="jx_ui_html_tr"}
return x})()
b.__$$__jx_ui_html_div=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='div'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_div"].join('')
x.prototype.__jx__fqname="jx_ui_html_div"}
return x})()
b.__$$__jx_ui_Widget=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName||(C.tagName='div')
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_Widget"].join('')
x.prototype.__jx__fqname="jx_ui_Widget"}
return x})()
b.__$$__jx_ui_html_img=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='img'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_img"].join('')
x.prototype.__jx__fqname="jx_ui_html_img"}
return x})()
b.__$$__getkudos_widget_controllers_StorageController=(function(){var w=b.__$$__meshim_widget_controllers_DOMStorage,x=b.__$$__meshim_widget_controllers_Cookie,y=b.__$$__getkudos_widget_controllers_Data,z=b.__$$__getkudos_dashboard_utils_base62,A=8*60*1000,B='__gkstore',C='__gkuid'
function D(G){if(!(this instanceof D))return new D(G)
this.$root=y.getRoot(G)
this.datapath=y.getDatapath(G)}
D.prototype.saveVariable=function(G,H){var I=w.get(B)||{},J=this.datapath
if(!I[J])I[J]={}
var K=I[J]
K[G]=H
K['timestamp']=+new Date()
w.set(B,I)}
D.prototype.getVariable=function(G){var H=w.get(B)||{},I=this.datapath
if(!H[I])return a
var J=H[I]
if(!J.timestamp)return J[G]||a
var K=+new Date()
if(K-J.timestamp>A)return a
else return J[G]}
D.prototype.getUID=function(){var G=x.get(C)
return k(G,'null too')?a:G}
D.prototype.generateUID=function(){var G=z.fromInt(+new Date(),8)+z.generateKey(8),H=F()
x.set(C,G,{path:'/',ttl:365,domain:H})
return G}
var E=/^(com|net|mil|gov|edu|eu)$/
function F(){var G='gk2095',H=window.location.hostname.split('.'),I=H.length
if(E.test(H[I-1])){return '.'+H.splice(I-2).join('.')}
var J='.'+H[I-1]
H.pop()
while(H.length){J='.'+H.pop()+J
var K={domain:J,path:'/'}
x.set(G,'1',K)
if(x.get(G)=='1'){x.remove(G,K)
break}}
return J}
if((typeof D==='function')&&D.prototype&&!D.__jx__no_fqname){D.prototype.__jx__fqname_chain=[(D.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_StorageController"].join('')
D.prototype.__jx__fqname="getkudos_widget_controllers_StorageController"}
return D})()
b.__$$__jx_ui_html_td=(function(){var w=b.__$$__jx_ui_HTMLElement
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(!C)C={}
C.tagName='td'
w.call(this,y,z,A,B,C)}
x.prototype=e(w.prototype)
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_html_td"].join('')
x.prototype.__jx__fqname="jx_ui_html_td"}
return x})()
b.__$$__meshim_widget_utils_Mobile=(function(){var w={isMobileBrowser:x(),isMobileWhitelist:y(),isMobileTablet:B(),isIEMobile:H(),isChromeIOSMobile:N(),isSafariIOSMobile:M(),isChromeAndroidMobile:I(),isOperaAndroidMobile:L(),isNativeAndroidMobile:J(),isUCBrowserMobile:K(),hideVirtualKeyboard:D,isLandscape:C,hackFastButtons:G,getZoomLevel:O,getOffset:P}
function x(){var Q=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i,R=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,S=window.navigator.userAgent||window.navigator.vendor||window.opera,T=Q.test(S)||R.test(S.substr(0,4))
return function(){return T}}
function y(){var Q,R=[/(android [2-9])|(iemobile\/(?![5-9]))|(ucbrowser)|(Webkit.+Chrome)|(ipod|iphone|ipad).+applewebkit.+(CriOS|Version\/[5-9])/i]
for(var S=0,T=R.length;S<T;S++){if(R[S].test(window.navigator.userAgent)){Q=!0
break}}
if(/android.+ucbrowser/i.test(window.navigator.userAgent)){Q=!1}
if(!Q);
return function(){return Q}}
var z=640,A=320
function B(){var Q,R=window.document.documentElement.clientWidth,S=window.document.documentElement.clientHeight
if(R>S){if(R<=z){Q=!1}
else{Q=!0}}
else{if(R<=A){Q=!1}
else{Q=!0}}
return function(){return Q}}
function C(){return window.document.documentElement.clientWidth>window.document.documentElement.clientHeight}
function D(Q){if(!Q)return}
var E=b.__$$__jx_ui_HTMLElement,F
function G(){if(F)return
F=!0
var Q=E.prototype.on,R=E.prototype.un
E.prototype.on=function($$){if($$=='click'&&(!this.allCallbacks['click']||!this.allCallbacks['click'].length)){this.dom.addEventListener('touchstart',S,!1)
this.dom.addEventListener('click',U,!1)}
return Q.apply(this,arguments)}
E.prototype.un=function($$){var $_=R.apply(this,arguments)
if($$=='click'&&(!this.allCallbacks['click']||!this.allCallbacks['click'].length)){this.dom.removeEventListener('touchstart',S,!1)
this.dom.removeEventListener('click',U,!1)}
return $_}
F=!0
function S($$){if(this.jx_wrapper)return S.call(this.jx_wrapper,$$)
$$.stopPropagation()
this.dom.addEventListener('touchend',U,!1)
this.doc.body.addEventListener('touchmove',T,!1)
this.startX=$$.touches[0].clientX
this.startY=$$.touches[0].clientY}
function T($$){if(this.jx_wrapper)return T.call(this.jx_wrapper,$$)
if(Math.abs($$.touches[0].clientX-this.startX)>10||Math.abs($$.touches[0].clientY-this.startY)>10){V.call(this)}}
function U($$){if(this.jx_wrapper)return U.call(this.jx_wrapper,$$)
$$.stopPropagation()
V.call(this)
this.nativeHandlers['click']($$)
if($$.type=='touchend'&&!this.allowGhostClick){X(this.startX,this.startY)}}
function V(){if(this.jx_wrapper)return V.call(this.jx_wrapper)
this.dom.removeEventListener('touchend',U,!1)
this.doc.body.removeEventListener('touchmove',T,!1)}
var W=[]
function X($$,$_){W.push($$,$_)
window.setTimeout(Y,2500)}
function Y(){W.splice(0,2)}
function Z($$){for(var $_=0;$_<W.length;$_+=2){var $a=W[$_],$b=W[$_+1]
if(Math.abs($$.clientX-$a)<25&&Math.abs($$.clientY-$b)<25){$$.stopPropagation()
$$.preventDefault()}}}
window.document.addEventListener('click',Z,!0)}
function H(){var Q=window.navigator.userAgent.toLowerCase()||'',R=/(iemobile|windows phone)/.test(Q)
return R}
function I(){var Q=window.navigator.userAgent.toLowerCase()||'',R=window.navigator.vendor&&window.navigator.vendor.toLowerCase()||'',S=/google inc./.test(R)&&/chrome/.test(Q)
return S}
function J(){var Q=window.navigator.userAgent.toLowerCase()||'',R=window.navigator.vendor&&window.navigator.vendor.toLowerCase()||'',S=/google inc./.test(R)&&(!/chrome/.test(Q)||/samsung/.test(Q))
return S}
function K(){var Q=window.navigator.userAgent.toLowerCase()||'',R=/ucbrowser/.test(Q)
return R}
function L(){var Q=window.navigator.userAgent.toLowerCase()||'',R=/(opera|opr).*android|android.*(opera|opr)/i.test(Q)
return R}
function M(){var Q=window.navigator.userAgent.toLowerCase()||'',R=window.navigator.vendor&&window.navigator.vendor.toLowerCase()||'',S=/apple computer, inc./.test(R)&&(!/crios/.test(Q))
return S}
function N(){var Q=window.navigator.userAgent.toLowerCase()||'',R=window.navigator.vendor&&window.navigator.vendor.toLowerCase()||'',S=/apple computer, inc./.test(R)&&/crios/.test(Q)
return S}
function O(){var Q=1.2,R=640,S=window.document.documentElement.clientWidth,T=window.document.documentElement.clientHeight,U=(S/T)>Q,V=window.screen.width,W=window.screen.height,X=!1
if(U&&V<W){X=!0
V=window.screen.height
W=window.screen.width}
var Y=window.innerWidth,Z=S/V
if(window.devicePixelRatio&&J()&&V>R){Z*=window.devicePixelRatio}
else if(H()){Z*=1.5}
var $$=(S/Y)/Z
$$=$$/Q
$$=$$.toFixed(2)
return $$}
function P(){var Q=window,R=Q.document.documentElement,S=Q.document.body,T=null,U={top:0,left:0}
if(!h(R.getBoundingClientRect));
else if(h(Q.getComputedStyle)){if(Q.getComputedStyle(S).position=='relative'){T=S}
else if(Q.getComputedStyle(R).position=='relative'){T=R}}
else if(S.currentStyle){if(S.currentStyle.position=='relative'){T=S}
else if(R.currentStyle.position=='relative'){T=R}}
else if(S.style.position=='relative'){T=S}
else if(R.style.position=='relative'){T=R}
if(T){var V=T.getBoundingClientRect()
U.top=V.top+Q.pageYOffset-R.clientTop
U.left=V.left+Q.pageXOffset-R.clientLeft}
return U}
if((typeof w==='function')&&w.prototype&&!w.__jx__no_fqname){w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","meshim_widget_utils_Mobile"].join('')
w.prototype.__jx__fqname="meshim_widget_utils_Mobile"}
return w})()
b.__$$__jx_ui_IFrame=(function(){var w=b.__$$__jx_ui_Widget,x=b.__$$__jx_ui_HTMLEvent,y=b.__$$__jx_ui_HTMLElement
function z(A,B,C,D,E){if(!(this instanceof z))return new z(A,B,C,D,E)
if(!E)E={}
E.tagName||(E.tagName='iframe')
this._top=this._bottom=this._left=this._right=this._width=this._height=NaN
this._position=null
this.pos=''
this.offsetx=0
this.offsety=0
this._snaps=[0,0,0,0]
this.useDisplay=!1
this.doc=this.ownerDocument=A.ownerDocument
this.parentNode=A
this.attributes=E
this.tagName=E.tagName
this.isNew=!0
this.dom=this.doc.createElement(this.tagName)
this.dom.jx_wrapper=this
this.style=this.dom.style
this.children=[]
this._autobinds=[]
x.call(this);(this.dom.seamless!==a)&&(this.dom.seamless=!0)
this.dom.allowTransparency='true'
this.dom.frameBorder='0'
this.style.backgroundColor='transparent'
this.style.verticalAlign='text-bottom'
this.style.visibility='hidden'
A.appendChild(A instanceof y?this:this.dom)
B&&u.set(B,this)
var F
if(p.bugs.noBoxSizing)F='<html><head><style>html,body{height:100%;width:100%;background:none} *{border:0;padding:0;margin:0;}</style></head><body onload="window.isLoaded=true"></body></html>'
else F='<!DOCTYPE html><html><head><style>html,body{height:100%;width:100%;} *{border:0;padding:0;margin:0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}</style></head><body onload="window.isLoaded = true"></body></html>'
if(p.isSafari||p.isChrome)this.dom.src='javascript:void(document.write(\''+F+'\'), document.close())'
else this.dom.src='javascript:false'
this.appendToParent(!0)
var G=this.iwin=this.dom.contentWindow,H=this.idoc=q.extend(G.document)
if(!p.isSafari&&!p.isChrome){H.write(F)
H.close()}
this.ihead=H.getElementsByTagName('head')[0]
var I=this.ibody=q.extend(H.body)
v&&v.onLanguage&&v.onLanguage(J)
function J(N){I.parentNode.setAttribute('lang',N)
I.parentNode.setAttribute('dir',v.flip('ltr'))}
v&&v.language&&J(v.language)
I.style.position='relative'
I.parentNode.style.overflowY=I.style.overflowY='hidden'
var K,L
if(p.bugs.noBoxSizing){K=new w(I,null,null,null,{position:'relative',width:'100%',height:'100%',overflow:'hidden'})
K.applyConstraints()
K.setPadding=function(N){I.style.padding=N}}
else{K=new w(I,null,null,null,{position:'absolute',top:0,right:0,bottom:0,left:0,overflow:'hidden'})
K.applyConstraints()}
var M='Background BackgroundImage Border BorderColor BorderStyle BorderWidth Color Cursor FontFamily FontSize FontWeight LetterSpacing LineHeight Opacity Padding Selectable TextAlign'.split(' ')
while((L=M.pop()))this['set'+L]=(function(N){return function(O){K['set'+N](O)
return this}})(L)
this.defaultPlacement=K
this.addChildren(D)
this.style.visibility=''
this.setStyle(C)
this.setAttributes(E)
t.bindIFrame(this)}
z.prototype=e(w.prototype)
z.prototype.destroy=function(){t.unbindIFrame(this)
this.defaultPlacement&&this.defaultPlacement.destroy()
w.prototype.destroy.call(this)}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","jx_ui_IFrame"].join('')
z.prototype.__jx__fqname="jx_ui_IFrame"}
return z})()
b.__$$__getkudos_widget_widgets_ScrollableFrame=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_Widget,null,null,[],{"ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_ScrollableFrame
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_Widget.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_Widget
w.__jx__jcss={"**self":{"width":"100%","height":"100%","overflowX":"hidden","overflowY":"auto"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_ScrollableFrame"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_ScrollableFrame"
w.prototype.__jx__constructor=w
return w})()
b.__$$__jx_ui_ViewStack=(function(){var w=b.__$$__jx_ui_Widget
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
w.call(this,y,z,A,B,C)
this.index=a
this.length=0
this.currentChild=null
var D=this
this._onChildHide=function(){switch(D.onChildHide){case 'next':D.next(!0)
break
case 'prev':D.prev(!0)
break
case 'first':D.first(!0)
break
case 'last':D.last(!0)
break
default:var E=parseInt(D.onChildHide,10)
if(isNaN(E))break
D.setIndex(E,!0)}}
this.onDestruction(function(){D.currentChild=null})}
x.prototype=e(w.prototype)
x.prototype.addChildren=function(y){var z=y&&y.length
if(!y||!z)return
for(var A=0;A<z;A++)if(g(y[A]))this.appendChild(y[A])
else ;}
x.prototype.appendChild=function(y){if(g(y))this.children.push(y)
else if(y.dom)this.dom.appendChild(y.dom)
else this.dom.appendChild(y)}
x.prototype.removeChild=function(y){try {if(g(y));
else if(y.dom)this.dom.removeChild(y.dom)
else this.dom.removeChild(y)
var z=f(y,this.children)
if(z!=-1)this.children.splice(z,1)}catch(A){;}}
x.prototype.setIndex=function(y,z){y=parseInt(y,10)
if(!this.validIndex(y)||y==this.index)return
var A=this.currentChild,B
if(A){if(!z&&(!A.fire('beforeIndexChange',y)||!this.fire('beforeIndexChange',y))){return !1}
this.autounbind(A,'hide',this._onChildHide)
A.setVisible('none')}
this.fire('indexChanging',y)
if(y==-1){this.currentChild=null
this.index=y
this.fire('indexChange',y)
return !0}
A=this.children[y]
if(g(A)){A=this.instantiateChild(A)
this.children[y]=A
B=!0}
A.setVisible('block')
this.autobind(A,'hide',this._onChildHide)
this.currentChild=A
this.index=y
B&&this.fire('instantiate',y)
this.fire('indexChange',y)
return !0}
x.prototype.instantiateChild=function(y){y=new y[0](this,y[1],y[2],y[3],y[4])
y.setVisible('none')
return y}
x.prototype.validIndex=function(y){return (y!=null)&&(y<this.getLength())&&(y>=-1)}
x.prototype.next=function(y){return k(this.index)?this.setIndex(0,y):this.setIndex(this.index+1,y)}
x.prototype.prev=function(y){return k(this.index)?this.setIndex(this.getLength()-1,y):this.setIndex(this.index-1,y)}
x.prototype.first=function(y){return this.setIndex(0,y)}
x.prototype.last=function(y){return this.setIndex(this.getLength()-1,y)}
x.prototype.getName=function(){return this.currentChild&&this.currentChild.getName()}
x.prototype.setName=function(y){if(!y)return this.setIndex(-1)
for(var z=0,A=this.children.length;z<A;z++){if(g(this.children[z])){if(this.children[z][4]&&this.children[z][4].name===y){return this.setIndex(z)}}
else{if(this.children[z].getName&&this.children[z].getName()===y){return this.setIndex(z)}}}}
x.prototype.isFirst=function(){return this.index<=0}
x.prototype.isLast=function(){return this.index>=this.getLength()-1}
x.prototype.getLength=function(){return this.children.length}
x.prototype.getChildren=function(){return this.children}
x.prototype.getCurrentChild=function(){return this.currentChild}
x.prototype.getIndex=function(){return this.index}
x.prototype.getOnChildHide=function(){return this.onChildHide}
x.prototype.setOnChildHide=function(y){this.onChildHide=y
return this}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_ViewStack"].join('')
x.prototype.__jx__fqname="jx_ui_ViewStack"}
return x})()
b.__$$__getkudos_widget_components_kudosList_FooterActionButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[[b.__$$__jx_ui_html_div,"button",null,[],{"class":"button","id":"button"}]],{"target":"_blank","components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__button')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=I.getRoot(E),K=J.$$('getkudos.settings.action_button'),L=K.$('url$string'),M=K.$('text$string')
function N(){E.autobind(L,'value',O)
E.autobind(M,'value',P)}
function O(Q){if(!Q)return
E.setHref(Q)}
function P(Q){if(!Q)return
F.setText(Q)}
N()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosList_FooterActionButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={"**self":{"display":"block",".button":{"textAlign":"center","borderRadius":"5px","padding":"8px","cursor":"pointer","fontSize":"12px","fontWeight":"bold","color":"#888","background":"#ddd"},".button:hover":{"background":"#e5e5e5"},"&:hover":{"textDecoration":"none"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosList_FooterActionButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosList_FooterActionButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_TextContainer=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"text_ellipsis",null,[],{"class":"text_ellipsis","id":"text_ellipsis"}]],{"pseudo":"text_container","widgets":"getkudos.widget.widgets","kudosBanner":"getkudos.widget.components.kudosBanner","cardFeed":"getkudos.widget.widgets.card.cardFeed","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__text_ellipsis')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=1.4
E.setMaxLine=function(J){J=parseInt(J,10)||0
E.setCSSStyle("maxHeight",J*I+"em")
E.setCSSStyle("*height",J*I+"em")
F.setCSSStyle("top",(J-1)*I+"em")}})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_TextContainer
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","lineHeight":"1.4em","overflow":"hidden",".text_ellipsis":{"height":"1.4em","width":"70%","position":"absolute","top":"-100px","right":"0","background":"gradient left rgba(255,255,255,0) #ffffff","backgroundColor":"transparent","zIndex":"1"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_TextContainer"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_TextContainer"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_themes_ThemeIndex=(function(){var w=b.__$$__getkudos_widget_themes_Default,x={'default':w}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_widget_themes_ThemeIndex"].join('')
x.prototype.__jx__fqname="getkudos_widget_themes_ThemeIndex"}
return x})()
b.__$$__getkudos_widget_widgets_AnchorAllKudosPage=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[],{"target":"_blank","pseudo":"site_anchor","xmlns":"jx.ui.html","ui":"jx.ui","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){function H(){var I=b.__$$__getkudos_widget_Config,J=b.__$$__getkudos_widget_controllers_Data,K=b.__$$__meshim_widget_utils_Mobile,L=J.getRoot(E),M=L.$$('getkudos.account.site_name$string').getValue(),N=I.all_kudos_url.replace('[site_name]',M)
E.setHref(N)
if(K.isMobileBrowser()){E.on('click',function(O){O.preventDefault()
window.open(N,"_blank")
return !1})}}
H()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_AnchorAllKudosPage
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_AnchorAllKudosPage"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_AnchorAllKudosPage"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_dashboard_utils_appendFormatText=(function(){var w=b.__$$__jx_ui_html_a,x=b.__$$__jx_ui_html_br,y=w,z=x,A=/https?:\/\/[\w.]+\.[a-zA-Z]{2,}[\S]*/g,B=/\n/g,C=/&amp;/g,D=/&gt;/g,E=/&lt;/g
function F(K,L){A.lastIndex=0
var M=[L]
G(M,A,I)
G(M,B,H)
J(M)
K.addChildren(M)}
function G(K,L,M){L.lastIndex=0
for(var N=0,O=K.length;N<O;){var P=K[N]
if(typeof P=='object'){N++
continue}
var Q=M(P)
Array.prototype.splice.apply(K,[N,1].concat(Q))
N=N+Q.length}}
function H(K){var L=0,M,N=[]
while((M=B.exec(K))!==null){var O=M[0],P=B.lastIndex-O.length
N.push(K.substring(L,P))
N.push([z,null,null,[],{tagName:'br'}])
L=B.lastIndex}
N.push(K.substring(L))
return N}
function I(K){var L=0,M,N=[]
while((M=A.exec(K))!==null){var O=M[0]
if(/[\.,?]$/.test(O)){O=O.substr(0,O.length-1)
A.lastIndex=A.lastIndex-1}
var P=A.lastIndex-O.length
N.push(K.substring(L,P))
N.push([y,null,null,[O],{tagName:'a',target:'_blank',href:O}])
L=A.lastIndex}
N.push(K.substring(L))
return N}
function J(K){for(var L=0,M=K.length;L<M;L++){var N=K[L]
if(typeof N=='object'){continue}
N=N.replace(C,'&').replace(D,'>').replace(E,'<')
K[L]=N}}
if((typeof F==='function')&&F.prototype&&!F.__jx__no_fqname){F.prototype.__jx__fqname_chain=[(F.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_appendFormatText"].join('')
F.prototype.__jx__fqname="getkudos_dashboard_utils_appendFormatText"}
return F})()
b.__$$__getkudos_widget_widgets_TopBar=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"pseudo":"top_bar","xmlns":"jx.ui.html"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_TopBar
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"height":"5px","width":"100%","position":"absolute","top":"0px","left":"0px","fontSize":"0px","overflow":"hidden","backgroundColor":["#555","$$primary_color"],"display":"block"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_TopBar"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_TopBar"
w.prototype.__jx__constructor=w
return w})()
b.__$$__jx_ui_FullFrame=(function(){var w=b.__$$__jx_ui_Widget
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
if(p.bugs.noBoxSizing){var D=this.table=new w(y,null,null,null,{tagName:'table'}),E=this.tbody=new w(D,null,null,null,{tagName:'tbody'}),F=this.tr=new w(E,null,null,null,{tagName:'tr'}),G=this.td=new w(F,null,null,null,{tagName:'td'}),H=this
this.table.destroy=function(){H.destroy()}
this.table.empty=function(){H.empty()}
this.setPadding=function(I){this.td.setPadding(I)
return this}
this.show=function(){this.table&&this.table.show()
return this}
this.hide=function(){this.table&&this.table.hide()
return this}
w.call(this,G,z,A,B,C)
D.style.tableLayout='fixed',D.style.borderCollapse='collapse'
E.style.height=E.style.width=this.style.height=this.style.width='100%'
D.setTop(0).setLeft(0).setWidth('100%').setHeight('100%').setPosition('absolute').applyConstraints()
this.style.position='relative',this.style.overflow='auto'
D.defaultPlacement=this}
else{this.setPadding=function(I){if(!i(I))return this
I=I.split(' ')
I[0]=parseInt(I[0],10)
I[1]=parseInt(I[1],10)
I[2]=parseInt(I[2],10)
I[3]=parseInt(I[3],10)
if(isNaN(I[0])){I[3]=I[2]=I[1]=I[0]=0}
else if(isNaN(I[3])){if(isNaN(I[1])){I[3]=I[2]=I[1]=I[0]}
else if(isNaN(I[2])){I[3]=I[1]
I[2]=I[0]}
else{I[3]=I[1]}}
this.setTop(parseInt(I[0],10)).setRight(parseInt(I[1],10)).setBottom(parseInt(I[2],10)).setLeft(parseInt(I[3],10))
return this}
w.call(this,y,z,A,B,C)
this.setStyle({top:0,bottom:0,left:0,right:0,overflow:'auto',position:'absolute'})}
this.setStyle(A)
this.setAttributes(C)}
x.prototype=e(w.prototype)
x.prototype.destroy=function(){w.prototype.destroy.call(this)
if(this.table){w.prototype.empty.call(this.table)
this.table.empty=null
w.prototype.destroy.call(this.table)
this.table=this.tbody=this.tr=this.td=null}}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_FullFrame"].join('')
x.prototype.__jx__fqname="jx_ui_FullFrame"}
return x})()
b.__$$__getkudos_widget_widgets_BigPanel=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"header",null,[],{"id":"header","class":"panel_head","container":"header"}],[b.__$$__jx_ui_html_div,null,null,[],{"class":"panel_body","container":"body","pseudo":"panel_body"}],[b.__$$__jx_ui_html_div,"footer",null,[],{"id":"footer","class":"panel_footer","container":"footer","pseudo":"panel_footer"}]],{"xmlns":"jx.ui.html","ui":"jx.ui","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__header'),G=u.get(y+'__footer')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){if(p.isIE&&p.isIE<9||p.isIE&&p.isQuirks){E.setBorder('1px solid #ccc')}
E.refresh=J
function J(){var K=F.getHeight(),L=G.getHeight()
E.setStyle('padding-top',K+'px')
E.setStyle('padding-bottom',L+'px')}})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_BigPanel
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"width":"300px","height":"450px","borderRadius":"5px","boxShadow":"0 0 5px 0 rgba(0,0,0,0.2)","backgroundColor":"#fff","position":"relative","*overflow":"hidden"},".panel_head":{"position":"absolute","top":0,"left":0,"width":"100%","borderRadius":"5px 5px 0 0","overflow":"hidden"},".panel_body":{"position":"relative","width":"100%","height":"100%"},".panel_footer":{"position":"absolute","bottom":0,"left":0,"width":"100%","borderRadius":"0 0 5px 5px","overflow":"hidden"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_BigPanel"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_BigPanel"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_YouTubePlayer=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_iframe,"frame",null,[],{"id":"frame","class":"player","frameborder":"0"}],[b.__$$__jx_ui_html_div,null,null,[],{"class":"stretcher"}]],{"pseudo":"youtube_player","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__frame')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){function I(){F.setAttribute('frameborder',0)
F.setAttribute('allowfullscreen','true')
E.setVidId=J}
function J(K){F.setSrc('//www.youtube.com/embed/'+K)}
I()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_YouTubePlayer
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","overflow":"hidden",".player":{"position":"absolute","top":"0","left":"0","width, height":"100%"},".stretcher":{"paddingTop":"56%"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_YouTubePlayer"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_YouTubePlayer"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_PageOverlay=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"bg",null,[],{"id":"bg","class":"gk-bg"}],[b.__$$__jx_ui_html_div,"container",null,[],{"id":"container","class":"gk-container","container":"default"}]],{"widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__bg'),G=u.get(y+'__container')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
E.defaultPlacement=G
var H=(function(){t.setIFrameOnly(!1)
t.reload()
function J(){G.setTop(K()+30)
F.on('click',function(){E.destroy()})
G.on('click',function(L){if(G.dom===L.target)E.destroy()})}
function K(){if(window.pgeYOffset)return window.pageYOffset
else if(document.documentElement.scrollTop)return document.documentElement.scrollTop
else return document.body.scrollTop}
J()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_PageOverlay
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"@keyframes":{"gk-bg-in":{"0%":{"opacity":"0"},"100%":{"opacity":"0.8"}}},"**self":{"position":"absolute !important","top":"0 !important","left":"0 !important","width":"100% !important","height":"100% !important","zIndex":"9999999 !important","textAlign":"center",".gk-bg":{"position":"fixed !important","top, left":"0 !important","width, height":"100% !important","backgroundColor":"black !important","zIndex":"-1 !important","opacity":"0.8","animation":"gk-bg-in 1s -0.5s both"},".gk-container":{"position":"relative !important","display":"inline-block !important","boxSizing":"border-box !important","width":"550px !important","maxWidth":"100% !important","padding":"15px !important"},"*":{"box-sizing":"border-box !important","-webkit-box-sizing":"border-box !important","-moz-box-sizing":"border-box !important"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_PageOverlay"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_PageOverlay"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_feedOverlay_FeedTimeStamp=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"pseudo":"timestamp","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){E.setDataNode=function(H){var I=H.getValue('timestamp$int')
E.setText(new Date(I).toLocaleString())}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedTimeStamp
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"color":"#999","fontSize":"11px"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedTimeStamp"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedTimeStamp"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_MediaTitle=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[],{"target":"_blank","pseudo":"media_title","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H,I=!1,J=!1
function K(){E.setDataNode=N
E.setDisableHref=L
E.setDisableText=M}
function L(P){I=m(P)}
function M(P){J=m(P)}
function N(P){if(H){E.autounbind(H,'value',O)}
H=P.$$('media')
E.autobind(H,'value',O)}
function O(P){if(!P)return
if('title$string' in P&&!J)E.setText(P.title$string)
if('url$string' in P&&!I)E.setHref(P.url$string)
if(/\.?getkudos\.me\//.test(P.url$string))E.setVisible('none')}
K()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_MediaTitle
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_MediaTitle"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_MediaTitle"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_FontIcon=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_span,null,null,[],{"xmlns":"jx.ui.html","pseudo":"font_icon"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H={crown:"&#57356;",crown_small:"&#57359;",quotation:"&#57345;",arrow_left:"&#57346;",arrow_right:"&#57347;",minimize:"&#57348;",maximize:"&#57349;",laurels_left:"&#57351;",laurels_right:"&#57350;",solicit:"&#57352;",facebook:"&#57353;",twitter:"&#57354;",external:"&#57355;",attachment_video:"&#57357;",logo_text:"&#57360;"}
function I(){E.setIcon=J}
function J(K){E.setHTML(H[K]||'')}
I()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_FontIcon
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_span.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_span
w.__jx__jcss={"**self":{"display":"inline-block","fontFamily":"GK Widget Icons","fontWeight":"normal","fontStyle":"normal","speak":"none","-webkit-font-smoothing":"antialiased","-webkit-text-stroke":"0.2px","userSelect":"none"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_FontIcon"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_FontIcon"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_feedOverlay_FeedInfoSource=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"pseudo":"info_source","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__jx_ui_html_A
function I(){E.setDataNode=J}
function J(K){var L=K.getValue(),M=L.source$string,N=L.from,O=L.to
if(M==='twitter'&&N.screen_name$string)E.setText('@'+N.screen_name$string)
else if(M==='facebook'){if(O){E.addChildren(['posted to ',[H,null,z,[O.name$string],{'target':'_blank','href':O.url$string}],' on Facebook'])}
else{E.setText(v('posted on Facebook'))}}
else if(M==='zendesk'){E.setText('submitted to '+O.name$string+' via Zendesk')}}
I()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedInfoSource
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedInfoSource"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedInfoSource"
w.prototype.__jx__constructor=w
return w})()
b.__$$__jx_ui_StyleSheet=(function(){var w=b.__$$__jx_ui_Widget
function x(y,z,A,B,C){if(!(this instanceof x))return new x(y,z,A,B,C)
var D=y.ownerDocument
if(!C)C={}
C.tagName||(C.tagName='style')
w.call(this,D.getElementsByTagName('head')[0],z,A,null,C)
this.dom.type='text/css'
this.addChildren(B)}
x.prototype=e(w.prototype)
x.prototype.getText=function(){return this.dom.styleSheet?this.dom.styleSheet.cssText:w.prototype.getText.call(this)}
x.prototype.addChildren=function(y){if(!y||!y.length)return
if('styleSheet' in this.dom){if(!this.dom.styleSheet){this.destroy()
return}
this.dom.styleSheet.cssText+=y.join('')}
else w.prototype.addChildren.call(this,[y.join('')])}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","jx_ui_StyleSheet"].join('')
x.prototype.__jx__fqname="jx_ui_StyleSheet"}
return x})()
b.__$$__getkudos_dashboard_utils_Utils=(function(){var w=b.__$$__getkudos_dashboard_utils_appendFormatText,x=b.__$$__getkudos_dashboard_utils_deparam,y=b.__$$__getkudos_dashboard_utils_bind,z=b.__$$__jx_core_ObjectUtil,A=['MozTransition','OTransition','WebkitTransition','transition'],B=['transitionend','otransitionend','webkitTransitionEnd','transitionend'],C=['animationend','oanimationend','webkitAnimationEnd','animationend'],D='-webkit- -moz- -o- -ms- '.split(' '),E='webkit Moz O ms '.split(' '),F={css_prefixes:D,cssom_prefixes:E,onTransitionEnd:G(!0,B),unTransitionEnd:G(!1,B),onAnimationEnd:G(!0,C),unAnimationEnd:G(!1,C),contains:H(),easyAutobind:I,prettyElapsedTime:M,prettyShorthandElapsedTime:N,isFeedItem:O,isCardItem:P,isNumeric:Q,isObject:R,escapeForRegExp:S,breakdownObject:T,cleanArray:V,param:W,maxWithoutNaN:X,minWithoutNaN:Y,sortKeys:Z,deepSortKeys:$$,compareJSONValue:$_,getDataNodePath:$a,getNodeJSONValue:U,roundToNthSignificant:$b,prettyNumber:$c,appendFormatText:w,updateNode:$d,updateLeaft:$e,writeLeaft:$f,getNodeArrayValue:$g,deparam:x,trim:$h,pruneKeys:$i,deepMerge:$j,randomNumberBetween:$k,linkLabelToInput:$l,enableMouseEnterLeave:$s,bind:y,forEach:$m,map:$n,some:$o,every:$p,keys:$q}
function G($w,$x){var $y=document.createElement('div'),$z
for(var $A=0,$B=A.length;$A<$B;$A++){if($y.style[A[$A]]!==a){$z=$x[$A]
break}}
if(!$z){return function(){}}
if($w){return function($C,$D,$E){$C.autobind($D,$z,$E)}}
else{return function($C,$D,$E){if(!B)return
$C.autounbind($D,$z,$E)}}}
function H(){var $w=document.documentElement
if($w.compareDocumentPosition)return function($x,$y){$x=$x.dom||$x
$y=$y.dom||$y
return !!($x.compareDocumentPosition($y)&16)}
else if($w.contains)return function($x,$y){$x=$x.dom||$x
$y=$y.dom||$y
var $z=$x.nodeType===9?$x.documentElement:$x,$A=$y.parentNode
return $x===$A||!!($A&&$A.nodeType===1&&$z.contains&&$z.contains($A))}
else return function($x,$y){$x=$x.dom||$x
$y=$y.dom||$y
while(($y=$y.parentNode)){if($y===$x)return !0}
return !1}}
function I($w,$x,$y,$z){return $A
function $A($B){var $C=$A.currentTarget
if($C)$w.autounbind($C,$x,$y)
$A.currentTarget=$B
$w.autobind($B,$x,$y)
if($z)$z($B)}}
var J=[[60,v('Just now')],[60*2,v('One hour ago')],[60*24,v('<num_hours> hours ago')],[60*24*2,v('One day ago')],[60*24*30,v('<num_days> days ago')],[60*24*30*2,v('One month ago')],[window.Infinity,v('<num_months> months ago')]],K=[[60,v('<num_mins>m')],[60*24,v('<num_hours>h')],[60*24*30,v('<num_days>d')],[window.Infinity,v('<num_months>mo')]]
function L($w,$x){var $y=''
$w=Math.floor($w/60000)
for(var $z=0;$z<$x.length;$z++){var $A=$x[$z]
if($w<$A[0]){$y=$A[1]
break}}
$y=$y.replace('<num_mins>',$w).replace('<num_hours>',Math.floor($w/60)).replace('<num_days>',Math.floor($w/60/24)).replace('<num_months>',Math.floor($w/60/24/30))
return $y}
function M($w){return L($w,J)}
function N($w){return L($w,K)}
function O($w){var $x=$w.getValue('source$string')
return !!$x}
function P(){return !1}
function Q($w){return !isNaN(parseFloat($w))&&isFinite($w)}
function R($w){return $w===Object($w)}
function S($w){return $w.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')}
function T($w){var $x=[],$y=[],$z=/\$(int|bool|string)$/,$A={}
$E($w,$x,$y)
for(var $B=0,$C=$y.length;$B<$C;$B++){var $D=$y[$B]
$A[$D[0]]=$D[1]}
return $A
function $E($F,$G,$H){for(var $I in $F)if($F.hasOwnProperty($I)){$G.push($I)
var $J=$F[$I]
if($J===null||typeof $J!='object'){var $K=$G.join('.').replace($z,'')
$H.push([$K,$J])}
else{$E($J,$G,$H)}
$G.pop()}}}
function U($w){var $x=$w.getValue(),$y=/\$(int|bool|string)$/
return $z($x,{})
function $z($A,$B){for(var $C in $A)if($A.hasOwnProperty($C)){var $D=$A[$C]
if($D===null||typeof $D!='object'){$B[$C.replace($y,'')]=$A[$C]}
else{$B[$C]={}
$z($D,$B[$C])}}
return $B}}
function V($w){for(var $x=0;$x<$w.length;){if(k($w[$x]))$w.splice($x,1)
else $x=$x+1}
return $w}
function W($w){var $x=window.encodeURIComponent,$y=[]
for(var $z in $w)if($w.hasOwnProperty($z)){if(typeof $w[$z]=='object')$B($z,$w[$z],$A)
else $A($z,$w[$z])}
return $y
function $A($C,$D){if(k($D))$D=''
$y.push($x($C)+'='+$x($D))}
function $B($C,$D,$E){if(typeof $D=='object'){for(var $F in $D)if($D.hasOwnProperty($F))$B($C+'['+$F+']',$D[$F],$E)}
else $E($C,$D)}}
function X(){var $w=Array.prototype.slice.call(arguments),$x=[]
for(var $y=0,$z=$w.length;$y<$z;$y++){if(!isNaN($w[$y]))$x.push($w[$y])}
return Math.max.apply(null,$x)}
function Y(){var $w=Array.prototype.slice.call(arguments),$x=[]
for(var $y=0,$z=$w.length;$y<$z;$y++){if(!isNaN($w[$y]))$x.push($w[$y])}
return Math.min.apply(null,$x)}
function Z($w,$x,$y){if(typeof $w!='object')return {}
var $z=[],$A={},$B
for($B in $w)if($w.hasOwnProperty($B))$z.push($B)
if($x)$z.sort(function($D,$E){return $x.call($w,$w[$D],$w[$E])})
else $z.sort()
$y=Y($z.length,$y)
for(var $C=0;$C<$y;$C++){$B=$z[$C]
$A[$B]=$w[$B]}
return $A}
function $$($w){$w=Z($w)
for(var $x in $w)if($w.hasOwnProperty($x)){if(typeof $w[$x]=='object')$w[$x]=$$($w[$x])}
return $w}
function $_($w,$x){$w=$$($w)
$x=$$($x)
return JSON.stringify($w)===JSON.stringify($x)}
function $a($w){var $x=$w.path()
$x=V($x).join('.')
return $x}
function $b($w,$x){$w=parseInt($w,10)
var $y=Math.floor(Math.log($w)/Math.log(10)),$z=Math.max(0,$y-$x+1),$A=Math.round(Math.pow(Math.E,$z*Math.log(10)))
return Math.floor($w/$A)*$A}
function $c($w){return ($w*1).toLocaleString()}
function $d($w,$x){if($w.leaf){$e($w,$x)}
else{$w.update($x)}}
function $e($w,$x){var $y={}
$y[$w.name]=$x
$w.parentNode.update($y)}
function $f($w,$x){var $y={}
$y[$w.name]=$x
$w.parentNode.write($y)}
function $g($w){var $x=F.keys($w.getValue()),$y=[]
for(var $z=0,$A=$x.length;$z<$A;$z++){var $B=$x[$z]
if(/\$bool$/.test($B)){$y.push($B.replace(/\$bool$/,''))}}
return $y}
function $h($w){$w=$w+''
return $w.replace(/^\s+|\s+$/g,'')}
function $i($w,$x){$w=z.clone($w)
$x=z.clone($x)
return $y({},$x,$w)
function $y($z,$A,$B){for(var $C in $A)if($A.hasOwnProperty($C)){if(!($C in $B)){$z[$C]=null}
else if(typeof $A[$C]=='object'&&typeof $B[$C]=='object'&&!g($A)&&!g($B)){$z[$C]={}
$y($z[$C],$A[$C],$B[$C])}}
return $z}}
function $j($w){if(!$w||typeof $w!='object')return $w
var $x=arguments,$y=$x.length
for(var $z=1;$z<$y;$z++){var $A=$x[$z]
if(k($A,'null too'))continue
for(var $B in $A)if($A.hasOwnProperty($B)){var $C=$w[$B],$D=$A[$B]
if($C===$D)continue
if($D&&typeof $D=='object'&&!g($D))$w[$B]=$j($C||{},$D)
else if($D!==a)$w[$B]=$D}}
return $w}
function $k($w,$x){return Math.floor(Math.random()*($x-$w+1))+$w}
function $l($w,$x){var $y=$x.getAttribute('id')
if(!$y){$y='_forid_'+$k(0,999)
$x.setAttribute($y)}
$w.setAttribute('for',$y)}
function $m($w,$x,$y){if($w.forEach){return $w.forEach($x,$y)}
for(var $z=0,$A=$w.length;$z<$A;$z++){$x.call($y,$w[$z],$z,$w)}}
function $n($w,$x,$y){if($w.map){return $w.map($x,$y)}
var $z=[]
for(var $A=0,$B=$w.length;$A<$B;$A++){$z.push($x.call($y,$w[$A],$A,$w))}
return $z}
function $o($w,$x,$y){if($w.some&&!1){return $w.some($x,$y)}
for(var $z=0,$A=$w.length;$z<$A;$z++){if($x.call($w[$z],$z,$w))return !0}
return !1}
function $p($w,$x,$y){if($w.every){return $w.every($w,$x,$y)}
for(var $z=0,$A=$w.length;$z<$A;$z++){if(!$x.call($w[$z],$z,$w))return !1}
return !0}
function $q($w){if(!F.isObject($w))return []
if(Object.keys){return Object.keys($w)}
var $x=[]
for(var $y in $w)if($w.hasOwnProperty($y)){$q.push($y)}
return $x}
var $r=$t()
function $s($w){if($r)return
$w.on('mouseover',$u)
$w.on('mouseout',$v)}
function $t(){var $w=document.documentElement
if(k($w.onmouseenter))return !1
else return !0}
function $u($w){var $x=this,$y=$w.relatedTarget||$w.fromElement
if(!$y||($y!==$x&&!F.contains($x,$y))){this.fire('mouseenter')}}
function $v($w){var $x=this,$y=$w.relatedTarget||$w.fromElement
if(!$y||($y!==$x&&!F.contains($x,$y))){this.fire('mouseleave')}}
if((typeof F==='function')&&F.prototype&&!F.__jx__no_fqname){F.prototype.__jx__fqname_chain=[(F.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_utils_Utils"].join('')
F.prototype.__jx__fqname="getkudos_dashboard_utils_Utils"}
return F})()
b.__$$__getkudos_widget_widgets_DefaultAvatar=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"icon":"crown_small"}]],{"pseudo":"default_avatar","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_DefaultAvatar
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"background-color":"#ccc","width":"40px","height":"40px","text-align":"center",":::font_icon":{"color":"#fff","fontSize":"16px","verticalAlign":"middle"},"&:after":{"content":"''","display":"inline-block","height":"100%","verticalAlign":"middle"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_DefaultAvatar"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_DefaultAvatar"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_utils_MediaQueryHelper=(function(){var w=b.__$$__jx_ui_StyleSheet,x=b.__$$__getkudos_widget_utils_matchMedia,y=window.RegExp,z={isSupported:x('only all').matches,extract:A,generateMediaStyleSheet:C}
function A(E){E+=''
var F=[],G=E.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi)||[]
for(var H=0,I=G.length;H<I;H++){var J=G[H].match(/@media *([^\{]+)\{([\S\s]+?)$/)
if(!J)continue
var K=y.$1.split(','),L=y.$2
for(var M=0;M<K.length;M++){var N=K[M]
F.push({media_type:N.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&y.$2||"all",rules:L,hasquery:N.indexOf("(")>-1,minw:N.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(y.$1)+(y.$2||""),maxw:N.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(y.$1)+(y.$2||"")})}}
return F}
function B(E,F){var G=D(E),H=[]
for(var I=0,J=F.length;I<J;I++){var K=F[I],L=!0
if(K.minw&&parseInt(K.minw,10)>G)L=!1
if(K.maxw&&parseInt(K.maxw,10)<G)L=!1
L&&H.push(K.rules)}
return H.join('\n')}
function C(E,F){var G=B(E,F),H=E.getElementsByTagName('head')[0],I=new w(H,null,null,[G])
return I}
function D(E){var F=E.parentWindow||E.defaultView
if(F.innerWidth!==a)return F.innerWidth
if(E.documentElement)return E.documentElement.offsetWidth
if(E.getElementsByTagName['body'].length)return E.getElementsByTagName['body'][0].clientWidth
return 0}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","getkudos_widget_utils_MediaQueryHelper"].join('')
z.prototype.__jx__fqname="getkudos_widget_utils_MediaQueryHelper"}
return z})()
b.__$$__jx_ui_FloatingFrame=(function(){var w=b.__$$__jx_ui_Widget,x=b.__$$__jx_ui_IFrame,y=b.__$$__jx_ui_FullFrame,z=16000000,A;(function D(){var E=['','WebKit'],F='MutationObserver'
for(var G=0;G<E.length;G++)if((E[G]+F) in window)A=window[E[G]+F]})()
function B(D,E,F,G,H){if(!(this instanceof B))return new B(D,E,F,G,H)
var I=this
this._onAutoResize=function(){I.onAutoResize()}
w.call(this,D,E,F,null,H)
this.iframe=new x(this,null,null,null,{tagName:'iframe',position:'relative',width:'100%',height:'100%',border:'0',margin:'0',padding:'0',background:'transparent',overflow:'hidden'})
w.prototype.setMargin.call(this,'0')
w.prototype.setPadding.call(this,'0')
w.prototype.setBorder.call(this,'0')
w.prototype.setBackground.call(this,'transparent')
w.prototype.setOverflow.call(this,'hidden')
w.prototype.setPosition.call(this,'fixed')
this.iwin=this.iframe.iwin
this.idoc=this.iframe.idoc
this.ibody=this.iframe.ibody
this.ihead=this.iframe.ihead
this.content=new y(this.iframe.defaultPlacement)
this.content.setOverflow('hidden')
this.wrapper=new w(this.content,null,null,null,{display:'inline-block'})
this.wrapper.__jx__fqname=this.__jx__fqname
this.wrapper.__jx__fqname_chain=this.__jx__fqname_chain
l(function(){if(!I.dom)return
I.content.addClass(D.__jx__fqname_chain)
I.wrapper.addClass(I.__jx__fqname_chain)
var J=I.getPseudo()
J&&I.wrapper.setPseudo(J)})
if(p.bugs.noBoxSizing){this.wrapper.style.display='inline'
this.wrapper.style.zoom='1'}
this.setAttributes(H)
this.defaultPlacement=this.wrapper
this.addChildren(G)
if(p.isIE<9){this.on('hide',function(){I.iframe.setDisplay('none')})
this.on('show',function(){I.iframe.setDisplay('block')})}
this.raise()}
B.prototype=e(w.prototype)
B.prototype.fire=function(D,E){w.prototype.fire.call(this,D,E)
this.iframe&&this.iframe.fire(D,E)
this.wrapper&&this.wrapper.fire(D,E)}
B.prototype.on=function(D,E){if(D=='init')w.prototype.on.call(this,D,E)
else this.wrapper&&this.wrapper.on(D,E)}
B.prototype.raise=function(D){D=parseInt(D,10)||1
this.setZIndex(z+=D)}
B.prototype.normalize=function(){var D=this.getXY()
this.moveTo(D[0],D[1]).setMargin(0)}
B.prototype.getXY=function(){var D=this.dom.offsetLeft,E=this.dom.offsetTop
if(p.isIE){if(p.isStrict){if(p.isIE6){D-=document.documentElement.scrollLeft
E-=document.documentElement.scrollTop}}
else{D-=document.body.scrollLeft
E-=document.body.scrollTop}}
else if(p.isSafari){var F=u.getStyles(this.iframe.offsetParent)
D+=parseInt(F.borderLeftWidth,10)
E+=parseInt(F.borderTopWidth,10)}
return [D,E]}
B.prototype.fitToContents=function D(E,F,G){E=E||this
var H=0,I=0
while(E.defaultPlacement)E=E.defaultPlacement
E.dom&&(E=E.dom)
I=E.scrollWidth-E.clientWidth
H=E.scrollHeight-E.clientHeight
this.resizeBy(I,H,G||0,F||0)}
B.prototype.destroy=function(){this.setAutoResize(!1)
w.prototype.destroy.call(this)
this.iframe=this.iwin=this.idoc=this.ibody=this.ihead=this.content=null}
B.prototype.setBackground=function(D){return this.iframe&&this.iframe.setBackground(D)}
B.prototype.setBackgroundImage=function(D){return this.iframe&&this.iframe.setBackgroundImage(D)}
B.prototype.setBorder=function(D){return this.iframe&&this.iframe.setBorder(D)}
B.prototype.setBorderColor=function(D){return this.iframe&&this.iframe.setBorderColor(D)}
B.prototype.setBorderStyle=function(D){return this.iframe&&this.iframe.setBorderStyle(D)}
B.prototype.setBorderWidth=function(D){return this.iframe&&this.iframe.setBorderWidth(D)}
B.prototype.setCursor=function(D){return this.iframe&&this.iframe.setCursor(D)}
B.prototype.setOpacity=function(D){return this.iframe&&this.iframe.setOpacity(D)}
B.prototype.setSelectable=function(D){return this.iframe&&this.iframe.setSelectable(D)}
B.prototype.setColor=function(D){return this.content&&this.content.setColor(D)}
B.prototype.setPadding=function(D){return this.content&&this.content.setPadding(D)}
B.prototype.setFontFamily=function(D){return this.content&&this.content.setFontFamily(D)}
B.prototype.setFontSize=function(D){return this.content&&this.content.setFontSize(D)}
B.prototype.setFontWeight=function(D){return this.content&&this.content.setFontWeight(D)}
B.prototype.setTextAlign=function(D){return this.content&&this.content.setTextAlign(D)}
B.prototype.setLetterSpacing=function(D){return this.content&&this.content.setLetterSpacing(D)}
B.prototype.setLineHeight=function(D){return this.content&&this.content.setLineHeight(D)}
B.prototype.setOverflow=function(D){return this.content&&this.content.setOverflow(D)}
var C=200
B.prototype.getAutoResize=function(){return this.autoResize}
B.prototype.setAutoResize=function(D){D=m(D)
this.autoResize=D
if(!this.wrapper)return
var E=this
if(this.autoResize){if(A){this._autoResizer=new A(function(){E.onAutoResize()})
this._autoResizer.observe(this.wrapper.dom,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}
else{if(this._autoResizer)window.clearInterval(this._autoResizer)
this._autoResizer=window.setInterval(this._onAutoResize,C)}
this.onAutoResize()}
else if(this._autoResizer){if(A){this._autoResizer.disconnect()
this._autoResizer=null}
else{window.clearInterval(this._autoResizer)
this._autoResizer=null}}
return this}
B.prototype.onAutoResize=function(){if(p.bugs.noBoxSizing){this.style.width='10px'
this.style.height='10px'}
var D=this.wrapper.getWidth(),E=this.wrapper.getHeight()
this.setWidth(D)
this.setHeight(E)
if(p.bugs.noBoxSizing){this.style.width=D+'px'
this.style.height=E+'px'
this.iframe.dom.className=this.iframe.dom.className}}
if((typeof B==='function')&&B.prototype&&!B.__jx__no_fqname){B.prototype.__jx__fqname_chain=[(B.prototype.__jx__fqname_chain||"")," ","jx_ui_FloatingFrame"].join('')
B.prototype.__jx__fqname="jx_ui_FloatingFrame"}
return B})()
b.__$$__getkudos_widget_widgets_MaximizeButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"pseudo":"max_icon","icon":"maximize","title":"Maximize","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_UIController
function I(){E.on('click',J)}
function J(){new H(E).onUserClick('maximize')}
I()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_MaximizeButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_FontIcon.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_FontIcon
w.__jx__jcss={"**self":{"fontSize":"7px","color":"#AAA","width":"16px","height":"16px","padding-top":"4px","textAlign":"center"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_MaximizeButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_MaximizeButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_MinimizeButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"pseudo":"min_icon","icon":"minimize","title":"Minimize","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_UIController
function I(){E.on('click',J)}
function J(){new H(E).onUserClick('minimize')}
I()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_MinimizeButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_FontIcon.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_FontIcon
w.__jx__jcss={"**self":{"fontSize":"7px","color":"#AAA","width":"16px","height":"16px","padding-top":"4px","textAlign":"center"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_MinimizeButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_MinimizeButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_custom_Laurels=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){function H(){E.setSide=I}
function I(J){if(J==='left'){E.setIcon('laurels_left')}
else if(J==='right'){E.setIcon('laurels_right')}}
H()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_custom_Laurels
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_FontIcon.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_FontIcon
w.__jx__jcss={"**self":{"fontSize":"60px"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_custom_Laurels"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_custom_Laurels"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_RightNavigation=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"icon":"arrow_right","class":"arrow_right"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_UIController
E.on('click',I)
function I(){new H(E).onUserClick('banner_right_nav')}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_RightNavigation
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"userSelect":"none","cursor":"pointer","background":"#EEE","width":"24px","height":"24px","textAlign":"center","verticalAlign":"middle","paddingTop":"2px","borderRadius":"4px",".arrow_right":{"fontSize":"10px","color":"#AAA"},"&:before":{"position":"absolute","background":"#EEE","content":"''","right":"0px","top":"4px","height":"24px","width":"5px"},"&:after":{"position":"absolute","bottom":"-6px","right":"0px","width":"5px","height":"6px","content":"''","background":"#BBB","-webkit-border-top-right-radius":"4px","-webkit-border-bottom-right-radius":"4px","-moz-border-radius-topright":"4px","-moz-border-radius-bottomright":"4px","border-top-right-radius":"4px","border-bottom-right-radius":"4px"},"&:hover":{"background":"#F5F5F5","&:before":{"background":"#F5F5F5"}},"&:active":{"marginTop":"1px","background":"#EEE","&:before":{"background":"#EEE"},"&:after":{"bottom":"-5px","height":"5px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_RightNavigation"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_RightNavigation"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_LeftNavigation=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"arrow_left","icon":"arrow_left"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_UIController
E.on('click',I)
function I(){new H(E).onUserClick('banner_left_nav')}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_LeftNavigation
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"userSelect":"none","cursor":"pointer","background":"#EEE","width":"24px","height":"24px","textAlign":"center","verticalAlign":"middle","paddingTop":"2px","borderRadius":"4px",".arrow_left":{"fontSize":"10px","color":"#AAA"},"&:before":{"position":"absolute","background":"#EEE","content":"''","left":"0px","top":"4px","height":"100%","width":"5px"},"&:after":{"position":"absolute","bottom":"-6px","left":"0px","width":"5px","height":"6px","content":"''","background":"#BBB","-webkit-border-top-left-radius":"4px","-webkit-border-bottom-left-radius":"4px","-moz-border-radius-topleft":"4px","-moz-border-radius-bottomleft":"4px","border-top-left-radius":"4px","border-bottom-left-radius":"4px"},"&:hover":{"background":"#F5F5F5","&:before":{"background":"#F5F5F5"}},"&:active":{"marginTop":"1px","background":"#EEE","&:before":{"background":"#EEE"},"&:after":{"bottom":"-5px","height":"5px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_LeftNavigation"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_LeftNavigation"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_KudosButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"icon":"crown_small","class":"kudos_crown"}],[b.__$$__jx_ui_html_span,"button_text",null,["Reviews"],{"pseudo":"button_text","id":"button_text"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__button_text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_UIController,J=b.__$$__getkudos_widget_controllers_Data,K=J.getRoot(E),L=K.$$('getkudos.settings.text.button_state$string')
function M(){E.on('click',N)
E.autobind(L,'value',O)}
function N(){new I(E).onUserClick('button')}
function O(P){if(k(P,'null too'))return
F.setText(P)
if(P){F.setDisplay('')}
else{F.setDisplay('none')}}
M()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_KudosButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"height":"35px","maxWidth":"300px","whiteSpace":"nowrap","textOverflow":"ellipsis","overflow":"hidden","fontWeight":"600","fontSize":"14px","color":"white","borderRadius":"5px","background":"$$primary_color","boxShadow":"0 0 5px 0 rgba(0,0,0,0.2)","cursor":"pointer","padding":"8px 12px",".kudos_crown":{"fontSize":"20px"},":::button_text":{"verticalAlign":"top","marginLeft":"8px"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_KudosButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_KudosButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_FontCSS=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_StyleSheet,null,null,[],{"xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_Config,I=H.fonts_url,J=''
if(!/\/$/.test(I))I=I+'/'
var K=[{name:'Open Sans',weight:400,style:'normal',local:['Open Sans','OpenSans'],src_name:'regular',path:'Open_Sans_1'},{name:'Open Sans',weight:600,style:'normal',local:['Open Sans Semibold','OpenSans-Semibold'],src_name:'semibold',path:'Open_Sans_1'},{name:'Open Sans',weight:600,style:'italic',local:['Open Sans Semibold Italic','OpenSans-SemiboldItalic'],src_name:'semibolditalic',path:'Open_Sans_1'},{name:'Open Sans',weight:700,style:'normal',local:['Open Sans Bold','OpenSans-Bold'],src_name:'bold',path:'Open_Sans_1'}],L=[{name:'GK Widget Icons',weight:400,style:'normal',local:['gk_widget_iconfont_v3'],src_name:'gk_widget_iconfont_v3',path:'GetKudos_Widget_Icons'}],M="@font-face {"+"font-family: '[family_name]';"+"font-weight: [font_weight];"+"font-style: [font_style];"+"src: url('[font_url][src_name].eot');"+"src:"+"[local_name],"+"url('[font_url][src_name].eot?#iefix') format('embedded-opentype'),"+"url('[font_url][src_name].woff') format('woff'),"+"url('[font_url][src_name].ttf') format('truetype');"+"}"
if(p.isIE&&p.isIE<9)K=K.slice(0,1)
N(K)
N(L)
function N(P){var Q,R
for(var S=0;S<P.length;S++){Q=P[S]
R=[]
for(var T=0;T<Q.local.length;T++){R.push('local(\''+Q.local[T]+'\')')}
R=R.join(' ,')
var U=M.replace(/\[family_name\]/g,Q.name).replace(/\[font_weight\]/g,Q.weight).replace(/\[font_style\]/g,Q.style).replace(/\[local_name\]/g,R).replace(/\[font_url\]/g,I+Q.path+"/").replace(/\[src_name\]/g,Q.src_name)
J=J+U}}
function O(){E.addChildren([J])}
O()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_FontCSS
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_StyleSheet.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_StyleSheet
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_FontCSS"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_FontCSS"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosList_ListFooter=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_kudosList_FooterActionButton,"action_button",null,[],{"id":"action_button","class":"action_button","visible":"none"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__action_button')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_controllers_UIController,K=I.getRoot(E),L=new J(E),M=K.$$('getkudos.settings.action_button.text$string'),N=K.$$('getkudos.ui.kudosList')
function O(){E.autobind(M,'value',P)
F.on('click',function(){L.onUserClick('action_button')})}
function P(Q){if(k(Q,'null too'))return
Q?F.show():F.hide()
N.update({refresh$bool:!0})}
O()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosList_ListFooter
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"background":"white","borderTop":"1px solid #eee","padding":"8px"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosList_ListFooter"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosList_ListFooter"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_DefaultCSS=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_StyleSheet,null,null,[" html { font-family: 'Open Sans', Helvetica, Arial, Sans-Serif; font-size: 13px; color: #666; } a { color: inherit; outline: 0; } a[href] { text-decoration: none; } a[href]:hover { text-decoration: underline; } table { font-size: 1em; } /* hide image loading icon in firefox */ img:-moz-loading { visibility: hidden; } ._clearfix:before, ._clearfix:after { display: table; content: \"\"; line-height: 0; clear: both; } "],{"xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_DefaultCSS
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_StyleSheet.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_StyleSheet
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_DefaultCSS"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_DefaultCSS"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_ChannelIcon=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"pseudo":"channel_icon","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_Config,I=b.__$$__getkudos_dashboard_utils_Utils,J={twitter:'twitter',facebook:'facebook',getkudos:'crown_small'},K=I.easyAutobind(E,'value',L)
E.setDataNode=K
function L(M){if(!M)return
var N=M.source$string
if(N){if(N=='zendesk'){E.setWidth('12px')
E.setHeight('12px')
E.setMarginBottom('-1px')
E.setBackgroundImage(H.assets_url+'/zd_cup/channelicon_zd.png')}
else{E.setIcon(J[N.toLowerCase()]||'')}}}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_ChannelIcon
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_FontIcon.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_FontIcon
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_ChannelIcon"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_ChannelIcon"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_dashboard_widgets_FilteredList=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"placeholder",null,[],{"id":"placeholder","visible":"none","container":"placeholder"}],[b.__$$__jx_ui_html_div,"content",null,[],{"id":"content"}]],{"xmlns":"jx.ui.html"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__placeholder'),G=u.get(y+'__content')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){var J=b.__$$__getkudos_dashboard_utils_Utils,K=b.__$$__jx_data_SetDataNode
E.setDataNode=W
E.setRenderer=V
E.setThreshold=function($G){T=$G}
E.setShowPlaceholder=function($G){S=m($G)
if(S)Z()}
E.getID=$b
E.getRowIDs=$c
E.clearList=X
E.select=$h
E.deselect=$i
E.setSort=$z
E.setFilter=$m
E.setExclude=$p
E.setSearch=$s
E.getLength=$v
E.getItem=$g
E.clearSearch=$t
E.resort=$A
E.setAppend=$w
E.scrollToAndHighlight=$j
var L,M={},N={},O={},P=[],Q=0,R=!1,S=!1,T,U
function V($G){U=$G
if(L)W(L)}
function W($G){if(!U)return
if(L){E.autounbind(L,'keys',$a)
E.autounbind(L,'value',$$)}
L=$G
X()
E.autobind(L,'keys',$a)
E.autobind(L,'value',$$)}
function X(){G.empty()
M={}
P=[]
if(Q){Q=0
Y()}}
function Y($G,$H){$G=$G||'jx:list:length'
$H=($H==null)?Q:$H
E.fire($G,$H)
Z($H)}
function Z($G){if(!S)return
if($G)F.hide()
else{F.show()}}
function $$($G){if(!$k)return
var $H=[]
for(var $I in $G)if($G.hasOwnProperty($I)){if($I in M)$B($G[$I],$I)
$G[$I]&&$H.push($I)}
$a($H,[])}
function $_($G,$H,$I){$I=$I||L.$($G).getValue($x)||'unknown'
if($H)return O[$G]
else{if(J.isNumeric($I))return $I
else return ($I+'\0'+$G).replace(/ /g,'').toLowerCase()}}
function $a($G,$H){var $I=T||2,$J=($G.length+$H.length)>$I
if($J)E.removeChild(G)
var $K=Q,$L,$M,$N,$O=[]
for($M=0;$M<$G.length;$M++){$L=$G[$M]
if($q($L)){if($L in M)continue
var $P=U(G),$Q=L.$($L)
M[$L]=$P
Q++
K.applySetDataNode($P)
$N=$x?$_($L):$L
$D($N,$P)
O[$L]=$N
N[$N]=$L
$P.setAttribute('jx:list:rowID',$L)
$P.setDataNode($Q)}
else{$O.push($L)}}
for($M=0;$M<$H.length;$M++){$L=$H[$M]
if(!($L in M))continue
$d($L)}
for($M=0;$M<$O.length;$M++){$L=$O[$M]
if(!($L in M))continue
$d($L)}
if($K!=Q){E.fire('jx:list:length',Q)
Y('jx:list:flength')}
if($G.length)E.fire('jx:list:added',$G)
if($J)E.appendChild(G)
$r&&$u()}
function $b($G){while($G.parentNode&&$G!=E){var $H=$G.getAttribute('jx:list:rowID')
if($H)return $H
$G=$G.parentNode}}
function $c(){var $G=[],$H,$I
for($H in M)if(M.hasOwnProperty($H)){$I=M[$H].getAttribute('jx:list:rowID')
if($I)$G.push($I)}
return $G}
function $d($G){var $H=$x?$_($G,!0):$G
$C($H)
delete N[$H]
if(M[$G]===$e||M[$G].dom===$e)$e=null
M[$G].destroy()
delete M[$G]
Q--}
var $e=null
function $f($G){$h($G.target)}
function $g($G){return M[$G]}
function $h($G){var $H,$I
if(i($G)){$I=$G
$H=M[$I]}
else if(typeof $G=='number'){$H=G.childNodes[$G]
if($H)$I=$H.getAttribute('jx:list:rowID')}
else{$H=$G
if($H.jx_wrapper)$H=$H.jx_wrapper
while($H.parentNode&&$H!=G){$I=$H.getAttribute('jx:list:rowID')
if($I){$H.jx_wrapper&&($H=$H.jx_wrapper)
break}
$H=$H.parentNode}}
if(!$H||$H==$e)return
$i()
$e=$H.jx_wrapper||$H
$e.addClass('active')
$e.fire('jx:list:selected')
E.fire('jx:list:select',$I)}
function $i(){$e&&$e.removeClass('active')
$e&&$e.fire('jx:list:deselected')
$e=null}
function $j($G){var $H=M[$G]
if(!$H)return
if($H.dom)$H=$H.dom
if(!$H.parentNode)return
var $I=$H.parentNode
for(;$I.nodeType!=9&&$I.style.overflowY!='auto';$I=$I.parentNode);
$I.scrollTop=$H.offsetTop-20
if($H.jx_wrapper)$H=$H.jx_wrapper
$H.addClass('highlight')
setTimeout(function(){$H.removeClass('highlight')},2000)}
var $k,$l
function $m($G){var $H={},$I
if(!$G)return
$k=$G
for(var $J in $k)if($k.hasOwnProperty($J)){$I=$k[$J].filter
if(typeof $I=='string')$H[$I]=!0
else if($I&&$I.length){for(var $K=0;$K<$I.length;$K++)$H[$I[$K]]=!0}
$k[$J].filter=$H}}
var $n,$o
function $p($G){$o=$G}
function $q($G){if(!$k)return !0
var $H,$I,$J
for($l in $k)if($k.hasOwnProperty($l)){$J=$k[$l]
$H=L.$($G).getValue()
if(!$H)return !1
$I=$H[$l]
if($J.exists){if(!$I)return !1}
else if($J.incl){if(!$J.filter[$I])return !1}
else{if($J.filter[$I])return !1}}
if($o){$n=$o.getValue()
for(var $K in $n)if($n.hasOwnProperty($K)){if($G==$K)return !1}}
return !0}
var $r
function $s($G,$H){if($G){$r=new RegExp($H?$G:$F($G),'ig')
$u()}
else $t()}
function $t(){var $G=0
$r=''
for(var $H in M)if(M.hasOwnProperty($H)){M[$H].show()
$G++}
Y('jx:list:slength')}
function $u(){var $G,$H,$I,$J=0,$K=0
for($G in M)if(M.hasOwnProperty($G)){$H=L.descend($G).getValue()
$J=0
for($I in $H)if($H.hasOwnProperty($I))if($H[$I]&&$r.test($H[$I]))$J++
$J?M[$G].show():M[$G].hide()
$J&&$K++}
Y('jx:list:slength',$K)}
function $v(){return Q}
;
function $w(){R=!0}
var $x,$y
function $z($G,$H){if($x!=$G||$y!=$H){$y=$H
$x=$G
N={}
O={}
if(Q>1)$A()}}
function $A(){var $G,$H
if(p.isIE){while(G.hasChildNodes()){G.removeChild(G.lastChild)}}
else G.innerHTML=""
P=[]
for($H in M)if(M.hasOwnProperty($H)){$G=$x?$_($H):$H
$D($G,M[$H])
O[$H]=$G
N[$G]=$H}}
function $B($G,$H){if(!$x)return
var $I,$J,$K
if(O[$H]&&$G&&$G[$x]){$I=M[$H]
$K=O[$H]
$J=$_($H,!1,$G[$x])
if(!$I){delete O[$H]
delete N[$J]
return};($I.dom)?G.removeChild($I.dom):G.removeChild($I)
delete N[$K]
$C($K)
N[$J]=$H
O[$H]=$J
$D($J,$I)}}
function $C($G){if(R)return
var $H=$E(P,$G)
if($H<0){return}
P.splice($H,1)}
function $D($G,$H){var $I=R?P.length:(-$E(P,$G)>>0)-1
P.splice($I,0,$G)
$y&&($I=P.length-$I-1)
G.insertBefore($H,G.children[$I]||null)}
function $E($G,$H){var $I=$G.length,$J=0,$K=$I-1,$L,$M
while($J<=$K){$L=($J+$K)/2>>0
$M=$G[$L]
if($M<$H)$J=$L+1
else if($M>$H)$K=$L-1
else return $L}
return -($J+1)}
function $F($G){return $G.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}
G.on('click',$f)})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_dashboard_widgets_FilteredList
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_dashboard_widgets_FilteredList"].join('')
w.prototype.__jx__fqname="getkudos_dashboard_widgets_FilteredList"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_utils_doStorage=(function(){var w=b.__$$__getkudos_widget_controllers_StorageController,x=b.__$$__getkudos_dashboard_utils_Utils,y=b.__$$__getkudos_widget_controllers_Data
function z(A,B){B=B||[]
var C=new w(A),D=y.getRoot(A),E,F,G
for(E=0;E<B.length;E++){F=B[E]
G=C.getVariable(F)
if(k(G,'with_null'))continue
x.updateNode(D.$$(F),G)}
var H=C.getUID()
if(!H)H=C.generateUID()
D.$$('getkudos.profile').update({'id$string':H})
q.window.on('unload',function(){for(E=0;E<B.length;E++){F=B[E]
G=D.$$(F).getValue()
C.saveVariable(F,G)}})}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","getkudos_widget_utils_doStorage"].join('')
z.prototype.__jx__fqname="getkudos_widget_utils_doStorage"}
return z})()
b.__$$__getkudos_widget_utils_getYouTubeVidId=(function(){var w=b.__$$__getkudos_dashboard_utils_Utils
function x(y){y=y+''
var z,A=y.substr(y.indexOf('?')+1)
A=w.deparam(A)
if(/youtube.com\//i.test(y)&&A.v)return A.v
z=/youtu.be\/(\w+)/i.exec(y)
if(z)return z[1]
z=/youtube.com\/embed\/(\w+)/i.exec(y)
if(z)return z[1]
return ''}
if((typeof x==='function')&&x.prototype&&!x.__jx__no_fqname){x.prototype.__jx__fqname_chain=[(x.prototype.__jx__fqname_chain||"")," ","getkudos_widget_utils_getYouTubeVidId"].join('')
x.prototype.__jx__fqname="getkudos_widget_utils_getYouTubeVidId"}
return x})()
b.__$$__getkudos_widget_MobileMainStack=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_DefaultCSS,null,null,[],{}],[b.__$$__getkudos_widget_widgets_FontCSS,null,null,[],{}],[b.__$$__getkudos_widget_widgets_AnchorAllKudosPage,null,null,[[b.__$$__getkudos_widget_components_KudosButton,null,null,[],{"addClass":"kudos_button"}]],{}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_Data,I=b.__$$__getkudos_widget_themes_ThemeIndex,J=b.__$$__getkudos_dashboard_utils_Utils,K=b.__$$__meshim_widget_utils_Mobile,L=H.getRoot(E),M=L.$$('getkudos.settings.theme'),N=M.$('primary_color$string'),O=M.$('position$string'),P=L.$$('getkudos.ui.resize_iframe$bool'),Q,R,S=300
function T(){E.setParentIframe=Z
E.autobind(N,'value',$$)
E.autobind(O,'value',X)
E.autobind(P,'value',Y)
window.setTimeout(V,50)
q.window.on('orientationchange',function($_){V($_,!0)})
q.window.on('resize',function($_){V($_,!0)})
q.window.on('scroll',function($_){V($_,!0)})
q.window.on('touchmove',V)
q.window.on('MSPointerMove',V)}
function U($_){if($_)E.removeClass('hide')
else E.addClass('hide')}
function V(){if(R){window.clearTimeout(R)}
R=window.setTimeout(W,S)}
function W(){if(R){window.clearTimeout(R)
R=null}
var $_=K.getZoomLevel()*1.2,$a=(1/$_).toFixed(2),$b=window.pageYOffset,$c=Q.wrapper.getWidth(),$d=Q.wrapper.getHeight(),$e=$c/$_,$f=$d/$_
U($b<300*$_)
$g()
function $g(){for(var $h=0,$i=J.cssom_prefixes.length;$h<$i;$h++){Q.wrapper.setStyle(J.cssom_prefixes[$h]+'Transform','scale('+$a+')')
Q.wrapper.setStyle(J.cssom_prefixes[$h]+'TransformOrigin','0 0')}
Q.setWidth($e+'px')
Q.setHeight($f+'px')}}
function X($_){if(X.last_position==$_||!Q)return
X.last_position=$_
E.removeClass('bl').removeClass('br')
E.addClass($_)
switch($_){case "br":Q.setLeft(NaN).setBottom('0px').setRight('0px')
break
case "bl":default:Q.setRight(NaN).setBottom('0px').setLeft('0px')}}
function Y($_){if(!$_)return
Q&&Q.onAutoResize()}
function Z($_){Q=$_
X(O.getValue())
J.onTransitionEnd(E,E,function(){if(E.hasClass('hide')){Q.setVisibility('hidden')}
else{Q.setVisibility('visible')}})}
function $$($_){if(!$_||$_==$$.last_value)return
var $a=I['default'].generate({primary_color:$_,border_visible:M.getValue('border_visible$bool'),border_color:M.getValue('border_color$string')})
t.setPalette($a)
t.reload()
$$.last_value=$_}
T()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_MobileMainStack
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","padding":"10px",".kudos_button":{"padding":"8px","opacity":"1",":::button_text":{"display":"none"}},"-webkit-transition":"-webkit-transform 0.2s","-moz-transition":"-moz-transform 0.2s","-ms-transition":"-ms-transform 0.2s","transition":"transform 0.2s","&.hide.br":{"transform":"translateX(100%)"},"&.hide.bl":{"transform":"translateX(-100%)"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_MobileMainStack"].join('')
w.prototype.__jx__fqname="getkudos_widget_MobileMainStack"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_controllers_getkudosAPI_options=(function(){var w=b.__$$__getkudos_widget_controllers_Data,x=b.__$$__getkudos_dashboard_utils_Utils,y=b.__$$__jx_core_ObjectUtil
function z(C){if(typeof C=='string'){A.apply(null,arguments)}}
function A(C,D){var E=w.root.$(C),F={}
if(B('gk-no-cache'))F.no_cache=!0
D=y.extend({},D,F)
if(D.no_cache){E.$$('getkudos.connection').update({"no_cache$bool":!!D.no_cache})}
if(D.widget_type){E.$$('getkudos.connection').update({"widget_type$string":D.widget_type})}
if(D.preview){E.$$('getkudos.connection').update({"preview$bool":!!D.preview})}
if(D.site_name){E.$$('getkudos.account').update({site_name$string:D.site_name+''})}
if(D.layout){E.$$('getkudos.connection').update({layout$string:D.layout})}
if(D.pagination_init){E.$$('getkudos.connection').update({pagination_init$int:D.pagination_init})}
if(D.pagination_each){E.$$('getkudos.connection').update({pagination_each$int:D.pagination_each})}}
function B(C){var D=x.deparam(window.location.search.replace(/^\?/,''))
return D[C]}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_getkudosAPI_options"].join('')
z.prototype.__jx__fqname="getkudos_widget_controllers_getkudosAPI_options"}
return z})()
b.__$$__getkudos_widget_components_feedOverlay_CloseButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[" ✖ "],{"pseudo":"close_button","title":"close","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_Data,I=b.__$$__getkudos_dashboard_utils_Utils
E.on('click',function(){var J=H.root.$$('close_overlay$bool')
I.updateNode(J,!0)})})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_CloseButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"padding":"15px","color":"#AAA","cursor":"pointer","lineHeight":"1","userSelect":"nonne","&:hover":{"color":"#8c8c8c"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_CloseButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_CloseButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_controllers_Analytics=(function(){var w=b.__$$__jx_ui_html_img,x=b.__$$__getkudos_widget_Config,y=b.__$$__getkudos_widget_controllers_Data,z=b.__$$__getkudos_widget_controllers_StorageController,A=b.__$$__getkudos_dashboard_utils_Utils,B=w
function C(D){if(!(this instanceof C))return new C(D)
this.elm=D
this.$root=y.getRoot(D)}
C.prototype.generateGif=function(){var D=this.$root.$$('getkudos.connection.preview$bool').getValue()
if(D)return
var E=window.location.href.substr(0,500),F=this.$root.$$('getkudos.account.site_name$string').getValue(),G=this.$root.$$('getkudos.connection.widget_type$string').getValue(),H=new z(this.elm),I=H.getUID()
if(!I)I=H.generateUID()
var J=A.param({uid:I,site:F,url:E,widget:G,_:+new Date()}).join('&'),K={visibility:"hidden",position:"absolute",top:"0px",left:"0px"},L=new B(this.elm,null,null,null,K)
L.setSrc(x.analytic_url+'?'+J)}
if((typeof C==='function')&&C.prototype&&!C.__jx__no_fqname){C.prototype.__jx__fqname_chain=[(C.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_Analytics"].join('')
C.prototype.__jx__fqname="getkudos_widget_controllers_Analytics"}
return C})()
b.__$$__getkudos_widget_controllers_data_Payload=(function(){var w=b.__$$__jx_core_ObjectUtil,x=b.__$$__getkudos_widget_Config,y=b.__$$__getkudos_dashboard_utils_convertToDataNode,z=b.__$$__getkudos_dashboard_utils_Utils,A=b.__$$__getkudos_widget_controllers_Data,B=b.__$$__getkudos_widget_controllers_data_normalizeCardType,C=b.__$$__getkudos_widget_controllers_data_normalizeCacheBuster,D=b.__$$__getkudos_widget_widgets_FriendlyDataIFrame
function E(G){q.extend(this)
this.doc=G.nodeType===9?G:G.ownerDocument
this.$root=A.getRoot(this.doc)}
E.prototype.load=function(G){this.loadOptions=G||{}
var H=this.$root.$$('getkudos.account.site_name$string').getValue(),I=this.$root.$$('getkudos.connection.no_cache$bool').getValue(),J=this.$root.$$('getkudos.connection.preview$bool').getValue(),K=x.data_url.replace('[site_name]',H).replace('[layout_name]',this.loadOptions.layout||'default'),L={_:I?+new Date():C()}
J&&(L.preview=1)
K=K+'?'+z.param(L).join('&')
var M=this,N=new D(this.doc)
N.on('success',function(O){M.loadData(O)})
N.load(K)}
E.prototype.loadData=function(G){var H=this.processData(G)
this.setData(H)}
E.prototype.processData=function(G){if(G.items){B(G.items)}
if(G.layout_settings){G.settings=w.extend({},G.settings,G.layout_settings)}
if(this.loadOptions&&!this.loadOptions.noSolicit)F(G.items)
var H={useArrayOrder:!0,arrayOrderPadding:4}
G=y(G,{},H)
return G||{}}
E.prototype.setData=function(G){this.$root.$$('getkudos.kudos.items').update(G.items)
delete G.items
this.$root.$$('getkudos').update(G)
this.$root.$$('getkudos.connection').update({payload_loaded$bool:!0})
if(this.$root.$$('getkudos.kudos.items').getKeys().length<30){this.$root.$$('getkudos.kudos').update({"all_fetched$bool":!0})}
this.destroy()}
E.prototype.destroy=function(){this.doc=null
this.$root=null}
function F(G){var H={card_type:'solicit'}
if(G.length<5){G.push(H)}
else{G.splice(4,0,H)}}
if((typeof E==='function')&&E.prototype&&!E.__jx__no_fqname){E.prototype.__jx__fqname_chain=[(E.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_data_Payload"].join('')
E.prototype.__jx__fqname="getkudos_widget_controllers_data_Payload"}
return E})()
b.__$$__getkudos_widget_widgets_TitleBar=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_Widget,null,null,[[b.__$$__getkudos_widget_widgets_TopBar,null,null,[],{}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"kudos_crown","icon":"crown_small"}],[b.__$$__jx_ui_html_span,"title_text",null,["What people are saying"],{"class":"title_text","id":"title_text"}]],{"pseudo":"title_info","class":"title"}],[b.__$$__getkudos_widget_widgets_MinimizeButton,null,null,[],{}]],{"pseudo":"title_bar","widgets":"getkudos.widget.widgets","components":"getkudos.widget.components","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__title_text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=I.getRoot(E),K=J.$$('getkudos.settings.text.title$string')
function L(){E.autobind(K,'value',M)}
function M(N){if(k(N,'null too'))N=v("What people are saying")
F.setText(N)}
L()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_TitleBar
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_Widget.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_Widget
w.__jx__jcss={"**self":{"position":"relative","height":"40px","overflow":"hidden","&":"$$title_bar"},".title":{"float":"left","margin":"10px",".kudos_crown":{"fontSize":"16px","float":"left","color":"$$primary_color","marginTop":"2px","marginRight":"5px"},".title_text":{"display":"inline-block","width":"200px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis","fontWeight":"600","fontSize":"15px","color":"#01addb","&":"$$title_bar_text"}},":::min_icon":{"display":"inline-block","position":"absolute","right":"6px","top":"13px","cursor":"pointer"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_TitleBar"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_TitleBar"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_EllapsedTime=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_span,null,null,[],{"pseudo":"ellapsed_time","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_dashboard_utils_Utils,I=H.easyAutobind(E,'value',J)
E.setDataNode=I
function J(K){if(!K)return
if('timestamp$int' in K){var L=+new Date()-K.timestamp$int
E.setText(H.prettyShorthandElapsedTime(L))}}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_EllapsedTime
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_span.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_span
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_EllapsedTime"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_EllapsedTime"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_controllers_data_FeedPayload=(function(){var w=b.__$$__jx_core_ObjectUtil,x=b.__$$__getkudos_widget_Config,y=b.__$$__getkudos_dashboard_utils_convertToDataNode,z=b.__$$__getkudos_dashboard_utils_Utils,A=b.__$$__getkudos_widget_controllers_Data,B=b.__$$__getkudos_widget_controllers_data_normalizeCardType,C=b.__$$__getkudos_widget_controllers_data_normalizeCacheBuster,D=b.__$$__getkudos_widget_widgets_FriendlyDataIFrame,E={limit:30}
function F(G){q.extend(this)
this.doc=G.nodeType===9?G:G.ownerDocument
this.$root=A.getRoot(this.doc)}
F.prototype.load=function(G,H){var I=this.$root.$$('getkudos.account.site_name$string').getValue(),J=this.$root.$$('getkudos.connection.no_cache$bool').getValue(),K=x.kudos_data_url.replace('[site_name]',I),L=w.extend({},E,G)
L._=J?+new Date():C()
K=K+'?'+z.param(L).join('&')
var M=this,N=new D(this.doc)
N.on('success',function(O){if(L.limit&&O.length&&L.limit>O.length){var P=M.$root.$$('getkudos.kudos.all_fetched$bool')
z.updateNode(P,!0)}
M.loadData(O)
H&&H()})
N.load(K)}
F.prototype.loadData=function(G){var H=this.processData(G)
this.setData(H)}
F.prototype.processData=function(G){G=G||[]
B(G)
var H=this.$root.$$('getkudos.kudos.items'),I=H.getKeys(),J={useArrayOrder:!0,arrayOrderPadding:4,arrayOrderStart:parseInt(I[I.length-1],10)+1||0}
G=y(G,{},J)
return G||{}}
F.prototype.setData=function(G){this.$root.$$('getkudos.kudos.items').update(G)
this.destroy()}
F.prototype.destroy=function(){this.doc=null
this.$root=null}
if((typeof F==='function')&&F.prototype&&!F.__jx__no_fqname){F.prototype.__jx__fqname_chain=[(F.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_data_FeedPayload"].join('')
F.prototype.__jx__fqname="getkudos_widget_controllers_data_FeedPayload"}
return F})()
b.__$$__getkudos_widget_widgets_Button=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"pseudo":"button","xmlns":"jx.ui.html","ui":"jx.ui","widgets":"getkudos.dashboard.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_dashboard_utils_Utils
E.on('mouseover',function(I){var J=I.target,K=I.relatedTarget||I.fromElement
if(!K||!H.contains(E,K)&&!H.contains(E,J)){E.fire('mouseenter',I)}})
E.on('mouseout',function(I){var J=I.target,K=I.relatedTarget||I.toElement
if(!K||!H.contains(E,K)&&!H.contains(E,J)){E.fire('mouseleave',I)}})})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_Button
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"padding":"8px 20px","backgroundColor":["#555","$$primary_color"],"borderRadius":"5px","display":"inline-block","border":"0px none","boxShadow":"inset 0 -2px 0 rgba(0,0,0,0.15)","textAlign":"center","cursor":"pointer","fontWeight":"700","textTransform":"uppercase","color":"white","fontSize":"12px","&.disabled, &.disabled:hover":{"cursor":"default","boxShadow":"none","backgroundColor":["#555","$$button_hover"],"color":"#cccccc"},"&:hover":{"backgroundColor":"$$button_hover"},"&:active":{"boxShadow":"inset 0 2px 0 rgba(0,0,0,0.15)","backgroundColor":"$$button_pressed"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_Button"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_Button"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_ViewMore=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_span,null,null,[[b.__$$__jx_ui_html_span,"view_more_text",null,[],{"id":"view_more_text","class":"view_more_text"}]],{"pseudo":"view_more","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__view_more_text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_dashboard_utils_Utils,J=I.easyAutobind(E,'value',O),K=v("view post"),L=v("view tweet"),M=v("Verified by Zendesk")
function N(){E.setDataNode=J}
function O(P){if('source$string' in P){switch(P.source$string){case "facebook":F.setText(K)
break
case "twitter":F.setText(L)
break
case "zendesk":F.setText(M)
break
default:F.setText(K)
break}}}
N()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_ViewMore
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_span.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_span
w.__jx__jcss={"**self":{"textTransform":"uppercase"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_ViewMore"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_ViewMore"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_MediaContainer=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_img,"img_thumbnail",null,[],{"id":"img_thumbnail","class":"img_thumbnail"}],[b.__$$__jx_ui_html_div,"div_thumbnail",null,[],{"id":"div_thumbnail","class":"div_thumbnail"}],[b.__$$__jx_ui_html_div,"video_overlay",null,[[b.__$$__jx_ui_html_div,null,null,[],{"class":"overlay"}],[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"video_icon","icon":"attachment_video"}]],{"id":"video_overlay","class":"video_overlay","visible":"none"}]],{"pseudo":"media_container","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__img_thumbnail'),G=u.get(y+'__div_thumbnail'),H=u.get(y+'__video_overlay')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var I=(function(){var K=b.__$$__getkudos_dashboard_utils_Utils,L=b.__$$__getkudos_widget_Config,M=!1,N=K.easyAutobind(E,'value',Q)
function O(){E.setDataNode=N
E.setUseBackgroundImage=P}
function P(T){M=m(T)
M?E.addClass('use_bg'):E.removeClass('use_bg')}
function Q(T){if(!T)return
var U=N.currentTarget,V=U.getValue('media.thumbnail$string'),W=U.getValue('media.hash$string')
if(V&&W){S(R(V,W))}
if(T.content_type$string=='video'){H.show()}}
function R(T,U){if(!L.ssl_enabled)return T
var V={hash:U,url:T}
return L.ssl_proxy+'?'+K.param(V).join('&')}
function S(T){if(M){G.setCSSStyle('backgroundImage','url('+T+')')
G.setCSSStyle('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'",sizingMethod="scale")')}
else{F.setSrc(T)}}
O()})()
for(var J in I)if(I.hasOwnProperty(J))E[J]=I[J]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_MediaContainer
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","display":"inline-block",".img_thumbnail":{"verticalAlign":"top","width":"100%"},".div_thumbnail":{"display":"none","width, height":"100%","backgroundPosition":"center","backgroundRepeat":"no-repeat","backgroundSize":"cover"},".video_overlay":{"position":"absolute","left, bottom":"0px","width":"100%","height":"30px",".overlay":{"backgroundColor":"#000000","opacity":"0.5","width":"100%","height":"100%"},".video_icon":{"position":"absolute","right":"5px","top":"50%","marginTop":"-0.5em","fontSize":"16px","color":"#ddd"}},"&.use_bg":{".img_thumbnail":{"display":"none"},".div_thumbnail":{"display":"inline-block"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_MediaContainer"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_MediaContainer"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_Name=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_span,null,null,[],{"pseudo":"name","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_dashboard_utils_Utils,I=H.easyAutobind(E,'value',K)
function J(){E.setDataNode=I}
function K(L){if(!L)return
var M=L.from
if(M&&M.name$string){E.setText(M.name$string)}}
J()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_Name
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_span.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_span
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_Name"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_Name"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_Avatar=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_DefaultAvatar,null,null,[],{"class":"default_avatar"}],[b.__$$__jx_ui_html_img,"circle_avatar",null,[],{"id":"circle_avatar","class":"img"}]],{"pseudo":"avatar","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__circle_avatar')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_dashboard_utils_Utils,J=b.__$$__getkudos_widget_controllers_UIController,K="https://static.getkudos.me/dashboard/assets/avatar_placeholder.png",L=I.easyAutobind(E,'value',N)
function M(){E.setDataNode=L
F.on('error',O)}
function N(P){if(!P)return
var Q=P.from
if(Q&&'avatar$string' in Q){var R=Q.avatar$string
if(/gravatar\.com/.test(R))R+="?d="+window.encodeURIComponent(K)
F.setSrc(R||K)}}
function O(){E.addClass('no_img')
var P=new J(E),Q=L.currentTarget.getValue('id$string')
P.reloadBrokenAvatars(Q)}
M()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_Avatar
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"border":"1px solid #ccc","borderRadius":"50%","overflow":"hidden","width, height":"40px",".img, :::default_avatar":{"width, height":"100%"},".default_avatar":{"display":"none"},"&.no_img":{"background":"#ccc",".img":{"display":"none"},".default_avatar":{"display":"block"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_Avatar"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_Avatar"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_CardCustomGeneral=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"review_title",null,[],{"class":"review_title","id":"review_title"}],[b.__$$__jx_ui_html_table,null,null,[[b.__$$__jx_ui_html_tbody,null,null,[[b.__$$__jx_ui_html_tr,null,null,[[b.__$$__jx_ui_html_td,null,null,[[b.__$$__getkudos_widget_widgets_card_custom_Laurels,null,null,[],{"side":"left"}]],{}],[b.__$$__jx_ui_html_td,null,null,[[b.__$$__jx_ui_html_div,"inner_container",null,[[b.__$$__jx_ui_html_span,"review_big_word",null,[],{"id":"review_big_word","class":"review_big_word hide"}],[b.__$$__jx_ui_html_img,"review_img",null,[],{"id":"review_img","class":"review_img hide"}]],{"id":"inner_container","class":"inner_container"}]],{}],[b.__$$__jx_ui_html_td,null,null,[[b.__$$__getkudos_widget_widgets_card_custom_Laurels,null,null,[],{"side":"right"}]],{}]],{}]],{}]],{"class":"review_container"}],[b.__$$__jx_ui_html_div,"review_text",null,[],{"id":"review_text","class":"review_text"}]],{"widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__review_title'),G=u.get(y+'__inner_container'),H=u.get(y+'__review_big_word'),I=u.get(y+'__review_img'),J=u.get(y+'__review_text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var K=(function(){var M=b.__$$__getkudos_dashboard_utils_Utils,N=b.__$$__getkudos_widget_controllers_UIController,O=M.easyAutobind(E,'value',Q)
function P(){E.setDataNode=O
E.on('click',V)}
function Q(W){var X=!1
if('title$string' in W.meta)F.setText(W.meta['title$string'])
if('image_url$string' in W.meta&&W.meta.image_url$string){R(W.meta['image_url$string'])
X=!0}
if('big_word$string' in W.meta&&W.meta.big_word$string){H.setText(W.meta['big_word$string'])}
if('text$string' in W.meta){J.setText(W.meta['text$string'])
if('url$string' in W){J.on('click',function(){window.open(W['url$string'],'_blank')})}}
S(X)}
function R(W){if(p.isIE&&p.isIE<8||p.isIE&&p.isIE5Quirks){G.setBackgroundImage(W)
G.setBackgroundPosition("center")}
else{I.setSrc(W)}}
function S(W){if(W){if(!(p.isIE&&p.isIE<8)&&!(p.isIE&&p.isIE5Quirks)){T(I)}
U(H)}
else{T(H)
U(I)}}
function T(W){W.removeClass('hide')}
function U(W){if(!W.hasClass('hide'))W.addClass('hide')}
function V(){new N(E).onUserClick('custom-body-url')}
P()})()
for(var L in K)if(K.hasOwnProperty(L))E[L]=K[L]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_CardCustomGeneral
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"width":"100%","position":"relative","textAlign":"center","overflow":"hidden"},".review_title":{"*width":"215px","fontWeight":"bold","color":"#AAA","fontSize":"11px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"},".review_container":{"margin":"10px auto 0","borderSpacing":"0px",".inner_container":{"maxWidth":"170px","*width":"170px","*height":"60px","overflow":"hidden","whiteSpace":"nowrap","textOverflow":"ellipsis","textAlign":"center",".review_big_word":{"fontWeight":"300","fontSize":"26px","&.hide":{"display":"none"}},".review_img":{"maxWidth":"150px","maxHeight":"60px","margin":"0 10px","&.hide":{"display":"none"}}}},".review_text":{"maxWidth":"215px","*width":"215px","margin":"auto","marginTop":"8px","lineHeight":"1.4em","maxHeight":"2.8em","textOverflow":"ellipsis","overflow":"hidden","cursor":"pointer","&:hover":{"textDecoration":"underline"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_CardCustomGeneral"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_CardCustomGeneral"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_Text=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"pseudo":"text","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_dashboard_utils_Utils,I=H.easyAutobind(E,"value",J)
E.setDataNode=I
function J(K){if(!K)return
if('text$string' in K)H.appendFormatText(E,K.text$string)}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_Text
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"wordWrap":"break-word"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_Text"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_Text"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_InlineFrame=(function(){var w=b.__$$__jx_ui_FloatingFrame,x=b.__$$__getkudos_dashboard_utils_Utils,y=b.__$$__getkudos_widget_utils_MediaQueryHelper
function z(A,B,C,D,E){if(!(this instanceof z))return new z(A,B,C,D,E)
w.call(this,A,B,C,D,E)
this.setPosition('relative')
this.setZIndex('0')
this.wrapper.setDisplay('block')
if(y.isSupported){this.iwin.onresize=x.bind(this.onIFrameResize,this)}
else{this.enableMediaCSSPolyfill()}}
z.prototype=e(w.prototype)
z.prototype.onAutoResize=function(){this.autoResizing=!0
if(p.isChrome){this.iframe.dom.offsetHeight=this.iframe.dom.offsetHeight}
var A=this.wrapper.getHeight()
this.setHeight(A)
if(p.bugs.noBoxSizing){this.style.height=A+'px'
this.iframe.dom.className=this.iframe.dom.className}}
z.prototype.enableMediaCSSPolyfill=function(){this.keepTrackOfMediaCSS()
var A=this
this.iwin.onresize=function(){if(A.autoResizing){A.autoResizing=!1
return}
if(A.respondTimer){window.clearTimeout(A.respondTimer)
A.respondTimer=null}
A.respondTimer=window.setTimeout(function(){A.respondCSS()
A.onAutoResize()},500)}}
z.prototype.onIFrameResize=function(){if(this.autoResizing){this.autoResizing=!1
return}
window.clearTimeout(this.respondTimer)
this.respondTimer=window.setTimeout(x.bind(this.onAutoResize,this),300)}
z.prototype.respondCSS=function(){if(this.mediaStyleSheet)this.mediaStyleSheet.destroy()
this.mediaStyleSheet=y.generateMediaStyleSheet(this.idoc,this.media_queries)}
z.prototype.keepTrackOfMediaCSS=function(){this.media_queries=[]
var A=this
t.on('write',function(B){A.media_queries=y.extract(B)})}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_InlineFrame"].join('')
z.prototype.__jx__fqname="getkudos_widget_widgets_InlineFrame"}
return z})()
b.__$$__getkudos_widget_components_feedOverlay_FeedInfo=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Avatar,"avatar",null,[],{"id":"avatar"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Name,"name",null,[],{"id":"name"}],[b.__$$__getkudos_widget_components_feedOverlay_FeedInfoSource,"info_source",null,[],{"id":"info_source"}]],{"class":"info_container"}],[b.__$$__jx_ui_html_div,null,null,[],{"class":"_clearfix"}]],{"feedOverlay":"getkudos.widget.components.feedOverlay","cardFeed":"getkudos.widget.widgets.card.cardFeed","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__avatar'),G=u.get(y+'__name'),H=u.get(y+'__info_source')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var I=(function(){function K(){E.setDataNode=L}
function L(M){F.setDataNode(M)
G.setDataNode(M)
H.setDataNode(M)}
K()})()
for(var J in I)if(I.hasOwnProperty(J))E[J]=I[J]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedInfo
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{":::avatar":{"float":"left","width":"45px","height":"45px"},".info_container":{"position":"relative","marginLeft":"55px",":::name, :::info_source":{"display":"block","paddingTop":"3px","overflow":"hidden","whiteSpace":"nowrap","textOverflow":"ellipsis"},":::name":{"fontWeight":"600","fontSize":"16px","color":"$$primary_color","marginRight":"20px"},":::info_source":{"fontSize":"12px","color":"#999"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedInfo"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedInfo"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_inline_LoadMore=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_Button,null,null,[" LOAD MORE "],{"pseudo":"load_more","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_data_FeedPayload,I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_controllers_UIController,K=I.getRoot(E),L=K.$$('getkudos.kudos'),M=L.$$('items'),N=L.$$('all_fetched$bool'),O=K.$$('getkudos.ui.inline.items'),P=K.$$('getkudos.settings.load_button.text$string'),Q=K.$$('getkudos.connection.pagination_init$int'),R=K.$$('getkudos.connection.pagination_each$int'),S=!1,T=new J(E)
function U(){W(Q.getValue()||6)
E.on('click',function(){T.trackEvent('click','load_more')
W(R.getValue()||6)})
E.autobind(P,'value',V)
E.autobind(N,'value',X)}
function V($$){if(!$$)return
E.setText($$)}
function W($$){var $_=O.getKeys(),$a=$_.length,$b=M.getKeys(),$c=$b.slice($a,$a+$$),$d={}
for(var $e=0,$f=$c.length;$e<$f;$e++){var $g=$c[$e]
$d[$g]=M.getValue($g)}
O.update($d)
X()}
function X(){var $$=O.getKeys(),$_=M.getKeys(),$a=N.getValue()
if($a&&$$.length>=$_.length){E.setDisplay('none')}
else if($_.length-$$.length<=12){Y(30)}}
function Y($$){if(S)return
S=!0
var $_=Z()
if(!$_)return
var $a=$_.timestamp$int
new H(E).load({"before_ts":Math.round($a/1000),"limit":$$},function(){S=!1})}
function Z(){var $$=M.getKeys()
for(var $_=$$.length-1;$_>-1;$_--){var $a=M.$$($$[$_])
if(/facebook|twitter/.test($a.getValue('source$string')))return $a.getValue()}}
U()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_inline_LoadMore
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_Button.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_Button
w.__jx__jcss={"**self":{}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_inline_LoadMore"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_inline_LoadMore"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_SolicitButton=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_Button,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"original_txt",null,[[b.__$$__jx_ui_html_span,"button_text",null,["Give Kudos"],{"id":"button_text"}],[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"external_icon","icon":"external"}]],{"id":"original_txt","class":"phrase_space"}],[b.__$$__jx_ui_html_div,"hover_txt",null,["Sample"],{"id":"hover_txt","class":"no_animate phrase_space"}]],{"class":"phrase_container"}]],{"pseudo":"solicit_button","xmlns":"jx.ui.html","ui":"jx.ui","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__original_txt'),G=u.get(y+'__button_text'),H=u.get(y+'__hover_txt')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var I=(function(){var K=b.__$$__getkudos_widget_controllers_UIController,L=new K(E),M=[v("Sharing is caring"),v("It'll make us happy"),v("It'll help us improve"),v("Share the love"),v("Go on, don't be shy")],N="",O=v("Give Kudos"),P,Q
function R(){E.getPhrase=T
E.setButtonText=S
E.on('mouseenter',U)
E.on('mouseleave',V)
X(H)
H.removeClass('no_animate')
E.on('click',function(){L.onUserClick('solicit_button')})}
function S(Y){P=Y
if(!Y)Y=O
G.setText(Y)}
function T(){return N}
function U(){if(P&&!Q){return}
var Y=Math.floor(Math.random()*M.length)
N=M[Y]
H.setText(N)
W(H)
X(F)}
function V(){W(F)
X(H)}
function W(Y){Y.removeClass('hide')
if(!Y.hasClass('show'))Y.addClass('show')}
function X(Y){Y.removeClass('show')
if(!Y.hasClass('hide'))Y.addClass('hide')}
R()})()
for(var J in I)if(I.hasOwnProperty(J))E[J]=I[J]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_SolicitButton
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_Button.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_Button
w.__jx__jcss={"**self":{"width":"175px","height":"28px","padding":"6px 10px",".phrase_container":{"position":"relative","overflow":"hidden","height":"100%",".external_icon":{"fontSize":"10px","color":"white","marginLeft":"5px"}},".phrase_space":{"position":"absolute","top":"0px","left":"0px","textAlign":"center","width":"100%","transition":"opacity 0.5s","&.no_animate":{"transition":"none"},"&.show":{"opacity":"1"},"&.hide":{"opacity":"0"},":::sprite_icon":{"marginLeft":"5px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_SolicitButton"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_SolicitButton"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_feedOverlay_FeedMedia=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"player_holder",null,[],{"class":"player_holder","id":"player_holder"}],[b.__$$__jx_ui_html_div,"media_holder",null,[],{"class":"media_holder","id":"media_holder"}]],{"pseudo":"feed_media","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__player_holder'),G=u.get(y+'__media_holder')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){var J=b.__$$__getkudos_widget_utils_getYouTubeVidId,K=b.__$$__getkudos_widget_widgets_MediaContainer,L=b.__$$__getkudos_widget_widgets_YouTubePlayer
function M(){E.setDataNode=N}
function N(P){var Q=P.getValue(),R
if(!Q.media){E.setVisible('none')
return}
if(!/photo|img|video/i.test(Q.content_type$string)){E.setVisible('none')
return}
if(R=O(Q)){var S=new L(F)
S.setVidId(R)
G.setVisible('none')
return}
var T=new K(G)
T.setDataNode(P)
F.setVisible('none')}
function O(P){var Q=P.media&&P.media.url$string
return J(Q)}
M()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedMedia
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"textAlign":"center",".player_holder, .media_holder":{"border":"1px solid #ddd","boxShadow":"0 1px 2px 0 rgba(0,0,0,0.3)","padding":"3px"},".media_holder":{"display":"inline-block"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedMedia"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedMedia"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_feedOverlay_FeedExternalLink=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_ChannelIcon,"channel_icon",null,[],{"id":"channel_icon"}],[b.__$$__jx_ui_html_span,"text",null,[],{"id":"text","class":"text"}]],{"pseudo":"external_link","cardFeed":"getkudos.widget.widgets.card.cardFeed","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__channel_icon'),G=u.get(y+'__text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){function J(){E.setDataNode=K}
function K(L){var M=L.getValue()
if('url$string' in M&&M.source$string!=='zendesk'){E.setHref(M.url$string)
E.setTarget('_blank')}
if('source$string' in M){var N=M.source$string
if(N==='facebook')G.setText(v('View on Facebook'))
else if(N==='twitter')G.setText(v('View on Twitter'))
else if(N==='zendesk')G.setText(v('Verified by Zendesk'))}
F.setDataNode(L)}
J()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedExternalLink
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={".text":{"paddingLeft":"5px"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedExternalLink"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedExternalLink"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_feedOverlay_FeedItem=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_feedOverlay_CloseButton,null,null,[],{}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_feedOverlay_FeedInfo,"info_block",null,[],{"id":"info_block"}],[b.__$$__getkudos_widget_components_feedOverlay_FeedMedia,"media",null,[],{"id":"media"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_Text,"text",null,[],{"id":"text"}],[b.__$$__getkudos_widget_components_feedOverlay_FeedTimeStamp,"timestamp",null,[],{"id":"timestamp"}]],{"class":"primary"}],[b.__$$__jx_ui_html_div,null,null,[],{"class":"ruler"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_feedOverlay_FeedExternalLink,"ext_link",null,[],{"id":"ext_link"}]],{"class":"secondary"}]],{"feedOverlay":"getkudos.widget.components.feedOverlay","cardFeed":"getkudos.widget.widgets.card.cardFeed","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__info_block'),G=u.get(y+'__media'),H=u.get(y+'__text'),I=u.get(y+'__timestamp'),J=u.get(y+'__ext_link')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var K=(function(){function M(){E.setDataNode=N}
function N(O){F.setDataNode(O)
G.setDataNode(O)
H.setDataNode(O)
I.setDataNode(O)
J.setDataNode(O)
t.reload()}
M()})()
for(var L in K)if(K.hasOwnProperty(L))E[L]=K[L]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_feedOverlay_FeedItem
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"background":"white","borderRadius":"5px","border":"1px solid #CCC",":::close_button":{"position":"absolute","top":"5px","right":"0px","zIndex":"99","fontSize":"22px"},".primary":{"padding":"15px 15px 0"},".secondary":{"padding":"15px",":::external_link":{"color":"#999","&:hover":{"color":"#8c8c8c"}}},":::feed_media":{"marginTop":"20px"},":::text":{"marginTop":"20px","wordBreak":"break-word","fontSize":"14px"},":::timestamp":{"marginTop":"20px","marginBottom":"10px"},".ruler":{"height":"1px","lineHeight":"0","backgroundColor":"#EEE"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_feedOverlay_FeedItem"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_feedOverlay_FeedItem"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_inline_Footer=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_inline_LoadMore,null,null,[],{}]],{"class":"loadmore_holder"}]],{"pseudo":"inline_footer","inline":"getkudos.widget.components.inline","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_inline_Footer
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"padding":"8px 0",".loadmore_holder":{"textAlign":"center"},".powered_bar":{"marginTop":"15px","backgroundColor":"transparent"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_inline_Footer"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_inline_Footer"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_SolicitAnchor=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[[b.__$$__getkudos_widget_widgets_SolicitButton,"button",null,[],{"id":"button"}]],{"target":"_blank","pseudo":"solicit_anchor","xmlns":"jx.ui.html","ui":"jx.ui","widgets":"getkudos.widget.widgets"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__button')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_Config,J=b.__$$__getkudos_widget_controllers_Data,K=b.__$$__getkudos_dashboard_utils_Utils,L=b.__$$__getkudos_dashboard_widgets_ExtWindow,M=J.getRoot(E),N=M.$$('getkudos.ui.display$string'),O=M.$$('getkudos.account.site_name$string').getValue(),P=I.solicit_url.replace('[site_name]',O)
function Q(){E.setHref(P)
E.setButtonText=F.setButtonText
E.on('click',R)}
function R(){var S=K.param({utm_campaign:"solicit_kudos",utm_medium:"widget",utm_source:window.location.hostname,utm_term:F.getPhrase(),utm_content:N.getValue()+'_state'}),T=P+'?'+S.join('&'),U={width:550,height:550,verticalAlign:'middle',horizontalAlign:'center'}
new L(T,'Give Kudos',U)
return !1}
Q()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_SolicitAnchor
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={"**self":{"position":"relative","display":"inline-block"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_SolicitAnchor"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_SolicitAnchor"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_CardSolicit=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[],{"container":"icon","pseudo":"icon_holder"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"solicit_text",null,[],{"id":"solicit_text","pseudo":"solicit_text"}],[b.__$$__getkudos_widget_widgets_SolicitAnchor,"solicit_anchor",null,[],{"id":"solicit_anchor"}]],{"pseudo":"solicit_content"}]],{"class":"position"}]],{"widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__solicit_text'),G=u.get(y+'__solicit_anchor')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){var J=b.__$$__getkudos_widget_controllers_Data,K=J.getRoot(E),L=K.$$('getkudos.settings.solicit_card'),M=v("Like what you see?")
function N(){P(M)
E.autobind(L,'value',O)}
function O(Q){if(!Q)return
if('message$string' in Q)P(Q.message$string)
if('button_text$string' in Q)G.setButtonText(Q.button_text$string)}
function P(Q){var R=Q||M
F.setText(R)}
N()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_CardSolicit
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","textAlign":"center",".position":{"position":"relative","width":"100%"},":::icon_holder":{"position":"absolute","top":"5px","left":"0"},":::solicit_content":{"position":"relative","marginLeft":"50px","textAlign":"left",":::solicit_text":{"width":"100%","fontWeight":"600","fontSize":"19px"},":::solicit_anchor":{"margin-top":"8px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_CardSolicit"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_CardSolicit"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_FeedOverlay=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_PageOverlay,null,null,[[b.__$$__getkudos_widget_widgets_InlineFrame,"frame",null,[[b.__$$__getkudos_widget_widgets_DefaultCSS,null,null,[],{}],[b.__$$__getkudos_widget_widgets_FontCSS,null,null,[],{}],[b.__$$__getkudos_widget_components_feedOverlay_FeedItem,"item",null,[],{"id":"item"}]],{"id":"frame","visible":"none","class":"inline_frame"}]],{"feedOverlay":"getkudos.widget.components.feedOverlay","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__frame'),G=u.get(y+'__item')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){var J=b.__$$__getkudos_widget_controllers_Data,K=b.__$$__getkudos_dashboard_utils_Utils,L=J.root.$$('close_overlay$bool')
function M(){E.setDataPath=N
E.setDataNode=O
E.autobind(L,'value',function(P){if(P){E.destroy()
K.updateNode(L,!1)}})}
function N(P){F.idoc._getkudos_datapath=P}
function O(P){F.show()
G.setDataNode(P)
F.onAutoResize()}
M()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_FeedOverlay
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_PageOverlay.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_PageOverlay
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_FeedOverlay"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_FeedOverlay"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_BannerCardSolicit=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_CardSolicit,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"solicit_icon","icon":"solicit","placement":"icon"}]],{"widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_BannerCardSolicit
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_CardSolicit.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_CardSolicit
w.__jx__jcss={"**self":{":::icon_holder":{"top":"1px"},":::solicit_content":{"marginLeft":"40px"},":::solicit_text":{"lineHeight":"1.4em","maxHeight":"4.2em","overflow":"hidden"},".solicit_icon":{"fontSize":"30px","color":"$$primary_color"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_BannerCardSolicit"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_BannerCardSolicit"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosList_ListCardSolicit=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_CardSolicit,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"solicit_icon","icon":"solicit","placement":"icon"}]],{"widgets":"getkudos.widget.widgets","solicit":"getkudos.widget.widgets.solicit","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosList_ListCardSolicit
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_CardSolicit.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_CardSolicit
w.__jx__jcss={"**self":{"marginTop":"15px","marginBottom":"15px",".solicit_icon":{"fontSize":"40px","color":"$$primary_color"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosList_ListCardSolicit"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosList_ListCardSolicit"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_controllers_FeedOverlayController=(function(){var w=b.__$$__getkudos_widget_controllers_Data,x=b.__$$__getkudos_widget_components_FeedOverlay
function y(z){if(!(this instanceof y))return new y(z)
this.doc=z.nodeType===9?z:z.ownerDocument
this.$root=w.getRoot(z)
this._getkudos_datapath=w.getDatapath(z)
this.$widget_type=this.$root.$$('getkudos.connection.widget_type$string')}
y.prototype.canCreate=function(){if(p.isIE<8||p.isIE5Quirks)return !1
if(this.$widget_type.getValue()!=='inline')return !1
return !0}
y.prototype.create=function(z){var A=new x(document.body)
A.setDataPath(this._getkudos_datapath)
A.setDataNode(z)
return A}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_FeedOverlayController"].join('')
y.prototype.__jx__fqname="getkudos_widget_controllers_FeedOverlayController"}
return y})()
b.__$$__getkudos_widget_widgets_card_cardFeed_FeedLink=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_a,null,null,[],{"pseudo":"feed_link","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_dashboard_utils_Utils,I=b.__$$__getkudos_widget_controllers_UIController,J=b.__$$__getkudos_widget_controllers_FeedOverlayController,K,L=H.easyAutobind(E,'value',N)
E.setDataNode=L
function M(){E.on('click',O)}
function N(P){if(!P)return
if('url$string' in P&&P.source$string!=='zendesk'){E.setHref(P.url$string)
E.setTarget('_blank')}
if('source$string' in P){K=P.source$string}}
function O(P){var Q=new I(E)
if(K){var R
switch(K){case 'facebook':R='view_post'
break
case 'twitter':R='view_tweet'
break}
Q.onUserClick(R)}
var S=new J(E)
if(S.canCreate()){S.create(L.currentTarget)
P.preventDefault()
return !1}}
M()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_FeedLink
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_a.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_a
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_FeedLink"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_FeedLink"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_CardFeed=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Avatar,"avatar",null,[],{"id":"avatar"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_FeedLink,"feed_link",null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Name,"name",null,[],{"id":"name"}]],{"id":"feed_link"}]],{"class":"name_holder"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_ChannelIcon,"channel_icon",null,[],{"id":"channel_icon"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_EllapsedTime,"ellapsed_time",null,[],{"id":"ellapsed_time"}]],{"class":"feed_src"}]],{"class":"feed_info"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_FeedLink,"feed_link2",null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_ViewMore,"view_more",null,[],{"id":"view_more"}],[b.__$$__getkudos_widget_widgets_FontIcon,"external",null,[],{"icon":"external","id":"external"}]],{"id":"feed_link2"}]],{"class":"feed_external"}],[b.__$$__jx_ui_html_div,"kudos_media",null,[[b.__$$__getkudos_widget_widgets_MediaTitle,"media_link",null,[[b.__$$__getkudos_widget_widgets_MediaContainer,"media",null,[],{"id":"media"}]],{"id":"media_link","disableText":"true"}]],{"id":"kudos_media","class":"kudos_media","visible":"none"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Text,"kudos_text",null,[],{"id":"kudos_text"}]],{"class":"text_holder"}]],{"class":"feed_content"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","cardFeed":"getkudos.widget.widgets.card.cardFeed","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__avatar'),G=u.get(y+'__feed_link'),H=u.get(y+'__name'),I=u.get(y+'__channel_icon'),J=u.get(y+'__ellapsed_time'),K=u.get(y+'__feed_link2'),L=u.get(y+'__view_more'),M=u.get(y+'__external'),N=u.get(y+'__kudos_media'),O=u.get(y+'__media_link'),P=u.get(y+'__media'),Q=u.get(y+'__kudos_text')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var R=(function(){var T=b.__$$__getkudos_dashboard_utils_Utils,U=T.easyAutobind(E,'value',X,W)
function V(){E.setDataNode=U}
function W(Y){F.setDataNode(Y)
H.setDataNode(Y)
I.setDataNode(Y)
J.setDataNode(Y)
G.setDataNode(Y)
K.setDataNode(Y)
O.setDataNode(Y)
P.setDataNode(Y)
Q.setDataNode(Y)
L.setDataNode(Y)}
function X(Y){if(!Y)return
var Z=Y.content_type$string
if(/img|video/.test(Z))N.show()
if(Y.source$string==='zendesk')M.hide()}
V()})()
for(var S in R)if(R.hasOwnProperty(S))E[S]=R[S]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_CardFeed
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","width":"100%",":::avatar":{"position":"absolute","left":"0px"},".feed_content":{"position":"relative","marginLeft":"50px",".feed_info":{".name_holder":{"display":"block","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis","*width":"140px","marginRight":"40px",":::name":{"fontWeight":"600","fontSize":"14px","color":"#666666","textTransform":"uppercase"}},".feed_src":{"position":"absolute","right":"0px","top":"0px","fontSize":"11px","color":"#aaa","marginTop":"3px",":::channel_icon":{"marginRight":"2px","fontSize":"12px"}}},".feed_external":{"marginTop":"3px","fontSize":"10px","color":"#999",":::font_icon":{"verticalAlign":"middle","paddingLeft":"4px"},"&:hover":{"color":"#8c8c8c"}},".kudos_media":{"marginTop":"15px",":::media_container":{"verticalAlign":"top","borderRadius":"5px","overflow":"hidden","width":"100%"}},".text_holder":{"marginTop":"10px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_CardFeed"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_CardFeed"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_card_cardFeed_InfoBlock=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Avatar,"avatar",null,[],{"id":"avatar"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Name,"name",null,[],{"id":"name"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_FeedLink,"feed_link",null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_ChannelIcon,"channel_icon",null,[],{"id":"channel_icon"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_ViewMore,"view_more",null,[],{"id":"view_more"}]],{"id":"feed_link"}]],{"class":"info_container"}]],{"pseudo":"info_block","cardFeed":"getkudos.widget.widgets.card.cardFeed","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__avatar'),G=u.get(y+'__name'),H=u.get(y+'__feed_link'),I=u.get(y+'__channel_icon'),J=u.get(y+'__view_more')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var K=(function(){function M(){E.setDataNode=N}
function N(O){F.setDataNode(O)
H.setDataNode(O)
G.setDataNode(O)
I.setDataNode(O)
J.setDataNode(O)}
M()})()
for(var L in K)if(K.hasOwnProperty(L))E[L]=K[L]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_card_cardFeed_InfoBlock
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{":::avatar":{"float":"left","width":"30px","height":"30px","marginTop":"3px"},".info_container":{"position":"relative","marginLeft":"35px",":::name":{"display":"block","width":"100%","fontWeight":"600","fontSize":"12px","textTransform":"uppercase","overflow":"hidden","whiteSpace":"nowrap","textOverflow":"ellipsis","color":"$$primary_color"},":::feed_link":{"color":"#AAA","fontSize":"11px",":::channel_icon":{"fontSize":"12px"},":::view_more":{"paddingLeft":"4px"},"&:hover":{"color":"#8c8c8c"}}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_card_cardFeed_InfoBlock"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_card_cardFeed_InfoBlock"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_MediaCardFeed=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_MediaContainer,"media",null,[],{"id":"media","useBackgroundImage":"true"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_TextContainer,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Text,"text",null,[],{"id":"text"}]],{"maxLine":"3"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_InfoBlock,"info_block",null,[],{"id":"info_block"}]],{"class":"feed_content"}]],{"class":"position _clearfix"}]],{"widgets":"getkudos.widget.widgets","kudosBanner":"getkudos.widget.components.kudosBanner","cardFeed":"getkudos.widget.widgets.card.cardFeed","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__media'),G=u.get(y+'__text'),H=u.get(y+'__info_block')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var I=(function(){var K=b.__$$__meshim_widget_utils_Mobile,L=b.__$$__getkudos_widget_controllers_FeedOverlayController,M
function N(){E.setDataNode=O
if(K.isMobileBrowser()){E.addClass('mobile')}
F.on('click',P)}
function O(Q){M=Q
H.setDataNode(M)
G.setDataNode(M)
F.setDataNode(M)}
function P(){var Q=new L(E)
if(Q.canCreate()){Q.create(M)}}
N()})()
for(var J in I)if(I.hasOwnProperty(J))E[J]=I[J]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_MediaCardFeed
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","width":"100%",".position":{"position":"relative","width":"100%"},":::media_container":{"float":"left","width":"81px","height":"106px","boxShadow":"0 1px 2px 0 rgba(0,0,0,0.3)","border":"3px solid #FFF"},".feed_content":{"marginLeft":"90px",":::text_container":{"width":"100%"},".info_block":{"marginTop":"9px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_MediaCardFeed"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_MediaCardFeed"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_Card=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[],{"xmlns":"jx.ui.html","pseudo":"kudos_card"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_widgets_CardFeed,I=b.__$$__getkudos_widget_components_kudosList_ListCardSolicit,J=b.__$$__getkudos_widget_widgets_CardCustomGeneral,K=H,L={solicit:I,custom_general:J},M,N,O
function P(){E.setDataNode=R
E.addCardType=S
E.setDefaultCardType=Q}
function Q(U){K=U}
function R(U){if(N)E.autounbind(N,'value',T)
M=U
N=U.$('card_type$string')
E.autobind(N,'value',T)}
function S(U,V){L[U]=V}
function T(U){E.empty()
if(!U)return
var V=L[U]||K
O=new V(E)
O.setDataNode&&O.setDataNode(M)
O.addClass('type_card')}
P()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_Card
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"borderTop":"1px solid #EEE","padding":"15px 10px","&:first-child":{"borderTop":"0px none"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_Card"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_Card"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_BannerCardFeed=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_FontIcon,null,null,[],{"class":"quote","icon":"quotation"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_TextContainer,null,null,[[b.__$$__getkudos_widget_widgets_card_cardFeed_Text,"text",null,[],{"id":"text"}]],{"maxLine":"4"}],[b.__$$__getkudos_widget_widgets_card_cardFeed_InfoBlock,"info_block",null,[],{"id":"info_block"}]],{"class":"feed_content"}]],{"class":"position _clearfix"}]],{"widgets":"getkudos.widget.widgets","kudosBanner":"getkudos.widget.components.kudosBanner","cardFeed":"getkudos.widget.widgets.card.cardFeed","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__text'),G=u.get(y+'__info_block')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var H=(function(){var J=b.__$$__meshim_widget_utils_Mobile
function K(){E.setDataNode=L
if(J.isMobileBrowser()){E.addClass('mobile')}}
function L(M){G.setDataNode(M)
F.setDataNode(M)}
K()})()
for(var I in H)if(H.hasOwnProperty(I))E[I]=H[I]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_BannerCardFeed
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","height":"145px","width":"100%",".position":{"position":"relative","width":"100%"},".quote":{"position":"absolute","top, left":"0px","fontSize":"21px","color":"$$primary_color"},".feed_content":{"marginLeft":"40px",":::info_block":{"marginTop":"9px"}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_BannerCardFeed"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_BannerCardFeed"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_widgets_LazyCard=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_Card,null,null,[],{"xmlns":"jx.ui.html","widgets":"getkudos.widget.widgets","class":"not_on_view"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_Data,I=H.getRoot(E),J=I.$$('getkudos.ui.kudosList.list_scroll$int'),K=E.setDataNode,L=150,M=420
function N(){E.setHeight(L+'px')
E.autobind(J,'value',P)
E.setDataNode=O}
function O(S){O.node=S
if(E.not_lazy==!0){R()}}
function P(S){if(typeof S!='number')return
var T=E.getTop(),U=E.getHeight(),V=T+U,W=80,X=S-W,Y=S+M+W
if(X<=V&&T<=Y){Q()
E.onView&&E.onView()}}
function Q(){E.setHeight('initial')
E.removeClass('not_on_view')
E.autounbind(J,'value',P)
E.not_lazy=!0
R()}
function R(){if(O.node){K(O.node)}}
N()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_widgets_LazyCard
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_Card.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_Card
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_widgets_LazyCard"].join('')
w.prototype.__jx__fqname="getkudos_widget_widgets_LazyCard"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_Card=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_Card,null,null,[],{"pseudo":"banner_card","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_components_kudosBanner_BannerCardFeed,I=b.__$$__getkudos_widget_components_kudosBanner_MediaCardFeed,J=b.__$$__getkudos_widget_components_kudosBanner_BannerCardSolicit
E.setDefaultCardType(H)
E.addCardType('video_twitter',I)
E.addCardType('video_facebook',I)
E.addCardType('img_twitter',I)
E.addCardType('img_facebook',I)
E.addCardType('photo_twitter',I)
E.addCardType('photo_facebook',I)
E.addCardType('solicit',J)})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_Card
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_Card.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_Card
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_Card"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_Card"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosList_ListBody=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_ScrollableFrame,null,null,[[b.__$$__getkudos_dashboard_widgets_FilteredList,"list",null,[],{"id":"list"}]],{"components":"getkudos.widget.components","dashboard":"getkudos.dashboard","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__list')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_widgets_LazyCard,K=b.__$$__getkudos_widget_controllers_UIController,L=I.getRoot(E),M=L.$$('getkudos.kudos.items'),N=L.$$('getkudos.ui.kudosList'),O=L.$$('getkudos.ui.display$string'),P=L.$$('getkudos.ui.kudosBanner.item_id$string'),Q=L.$$('getkudos.connection.editor$bool'),R
E.init=S
function S(){R=new K(E)
E.autobind(O,'value',V)
E.on('scroll',T)
F.setThreshold(50)
F.setSort(!0,!1)
F.setRenderer(J)
F.setDataNode(M)
T()}
function T(){N.update({'list_scroll$int':E.getScrollTop()})
U()}
function U(){if(U.updateGA>2)return
U.count=(U.count+1)||1
if(U.count==2)R.trackEvent('scroll','list')}
function V(X){if(!X||X!=='list')return
var Y=P.getValue(),Z=F.getItem(Y)
if(!Z)return
if(!Q.getValue()){W(Z)
l(function(){W(Z)})}}
function W(X){var Y=X.dom
if(Y.scrollIntoViewIfNeeded)Y.scrollIntoViewIfNeeded()
else if(Y.scrollIntoView)Y.scrollIntoView()}})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosList_ListBody
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_ScrollableFrame.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_ScrollableFrame
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosList_ListBody"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosList_ListBody"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_inline_InlineCard=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_components_kudosBanner_Card,"card",null,[],{"id":"card"}]],{"pseudo":"inline_card","kudosBanner":"getkudos.widget.components.kudosBanner","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__card')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){E.setDataNode=function(I){F.setDataNode(I)}})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_inline_InlineCard
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"@keyframes":{"fade_in":{"0%":{"opacity":"0"},"100%":{"opacity":"1"}}},"**self":{"animation":"fade_in 1s both","-webkit-backface-visibility":"hidden",":::media_container":{"cursor":"pointer"},":::feed_link":{"cursor":"pointer"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_inline_InlineCard"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_inline_InlineCard"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_kudosBanner_CardRoller=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__jx_ui_html_div,"holder",null,[],{"id":"holder","class":"holder"}]],{"kudosBanner":"getkudos.widget.components.kudosBanner","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__holder')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_components_kudosBanner_Card,K=b.__$$__getkudos_dashboard_utils_Utils,L=I.getRoot(E),M=L.$$('getkudos.kudos.items'),N=L.$$('getkudos.ui.kudosBanner'),O=N.$('left_nav$bool'),P=N.$('right_nav$bool'),Q=[],R=M.getKeys(),S,T,U=40*1000,V=N.getValue('auto_dir$string')||'right',W=270
function X(){$b()
Y()
K.onAnimationEnd(F,F,$a)
E.autobind(O,'value',$_)
E.autobind(P,'value',$$)}
function Y(){T&&window.clearTimeout(T)
T=window.setTimeout(Z,U)}
function Z(){if(S==R[R.length-1]&&V=='right')V='left'
else if(S==R[0]&&V=='left')V='right'
if(V=='right')$$(!0)
else if(V=='left')$_(!0)
Y()}
function $$($e){if(!$e)return
if(S==R[R.length-1]){$a()
F.dom.offsetWidth
F.addClass('shake_right')
return}
var $f=$d(S,+1)
V='right'
$c($f)
Y()}
function $_($e){if(!$e)return
if(S==R[0]){$a()
F.dom.offsetWidth
F.addClass('shake_left')
return}
var $f=$d(S,-1)
V='left'
$c($f)
Y()}
function $a(){F.removeClass('shake_left').removeClass('shake_right')}
function $b(){var $e=N.getValue('item_id$string'),$f=f($e,R)
if($f<0)$e=R[0]
F.setWidth(R.length*W+'px')
for(var $g=0;$g<R.length;$g++){var $h=new J(F)
Q.push($h)}
F.addClass('no_animate')
$c($e)
F.removeClass('no_animate')}
function $c($e){var $f=f($e,R),$g=Q[$f]
if($g&&!$g.dataNode){$g.setDataNode(M.$($e))
$g.dataNode=M.$($e)}
F.setMarginLeft(0-$f*W+'px')
S=$e
N.update({item_id$string:$e,auto_dir$string:V})}
function $d($e,$f){var $g=f($e,R)
if($g<0)$g=0
var $h=($g+$f)%R.length
if($h<0)$h=R.length+$h
return R[$h]}
X()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_kudosBanner_CardRoller
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"@keyframes":{"shake_left":{"0%, 100%":{"transform":"translateX(0)"},"50%":{"transform":"translateX(20px)"},"80%":{"transform":"translateX(-10px)"}},"shake_right":{"0%, 100%":{"transform":"translateX(0)"},"50%":{"transform":"translateX(-20px)"},"80%":{"transform":"translateX(10px)"}}},"**self":{"cursor":"pointer","height":"100%","width":"100%","overflow":"hidden",".holder":{"transition":"margin 0.8s","height":"100%","left":"0px","top":"0px","&.shake_left":{"animation":"shake_left 0.5s none"},"&.shake_right":{"animation":"shake_right 0.5s none"},"&.no_animate":{"transition":"none"},":::banner_card":{"display":"table","tableLayout":"fixed","float":"left","height":"100%","width":"270px","padding":"0px","borderTopWidth":"0px",".type_card":{"display":"table-cell","verticalAlign":"middle","padding-right":"25px","padding-left":"25px","margin-top":"10px"}}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_kudosBanner_CardRoller"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_kudosBanner_CardRoller"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_KudosList=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_BigPanel,null,null,[[b.__$$__getkudos_widget_widgets_TitleBar,null,null,[],{"placement":"header"}],[b.__$$__getkudos_widget_components_kudosList_ListBody,"body",null,[],{"placement":"body","id":"body"}],[b.__$$__getkudos_widget_components_kudosList_ListFooter,null,null,[],{"placement":"footer"}]],{"components":"getkudos.widget.components","dashboard":"getkudos.dashboard","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__body')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=I.getRoot(E),K=J.$$('getkudos.ui.kudosList.refresh$bool')
function L(){E.autobind(K,'value',M)
F.init()}
function M(N){if(!N)return
E.refresh()}
L()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_KudosList
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_BigPanel.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_BigPanel
w.__jx__jcss={":::title_bar":{"borderBottom":"1px solid #EEE"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_KudosList"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_KudosList"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_KudosBanner=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__getkudos_widget_widgets_BigPanel,null,null,[[b.__$$__getkudos_widget_widgets_TopBar,null,null,[],{"placement":"header"}],[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_MaximizeButton,null,null,[],{}],[b.__$$__getkudos_widget_widgets_MinimizeButton,null,null,[],{}],[b.__$$__getkudos_widget_components_kudosBanner_CardRoller,"card",null,[],{"id":"card"}]],{"placement":"body","class":"card_holder"}],[b.__$$__getkudos_widget_components_kudosBanner_RightNavigation,"nav_right",null,[],{"id":"nav_right","class":"right_nav"}],[b.__$$__getkudos_widget_components_kudosBanner_LeftNavigation,"nav_left",null,[],{"id":"nav_left","class":"left_nav"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__card'),G=u.get(y+'__nav_right'),H=u.get(y+'__nav_left')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var I=(function(){var K=b.__$$__getkudos_widget_controllers_UIController,L=b.__$$__getkudos_widget_controllers_Data,M=L.getRoot(E).$$('getkudos.kudos.items')
function N(){F.on('click',O)
P()}
function O(){new K(E).onUserClick('banner')}
function P(){if(M.getKeys()<=1){G.addClass('hide')
H.addClass('hide')}}
N()})()
for(var J in I)if(I.hasOwnProperty(J))E[J]=I[J]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_KudosBanner
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__getkudos_widget_widgets_BigPanel.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__getkudos_widget_widgets_BigPanel
w.__jx__jcss={"**self":{"width":"270px","height":"180px",".card_holder":{"padding-top":"10px","height":"100%"},".right_nav":{"position":"absolute","top":"75px","right":"-5px","zIndex":"9","&.hide":{"display":"none"}},".left_nav":{"position":"absolute","top":"75px","left":"-5px","zIndex":"9","&.hide":{"display":"none"}},":::panel_body":{"overflow":"hidden"},":::top_bar":{"position":"relative"},":::min_icon":{"z-index":"1","display":"inline-block","position":"absolute","right":"7px","top":"5px","cursor":"pointer"},":::max_icon":{"z-index":"1","display":"inline-block","position":"absolute","right":"23px","top":"5px","cursor":"pointer"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_KudosBanner"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_KudosBanner"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_components_inline_List=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_dashboard_widgets_FilteredList,"list",null,[],{"id":"list"}]],{"dashboard":"getkudos.dashboard","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__list')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_dashboard_utils_Utils,J=b.__$$__getkudos_widget_controllers_Data,K=b.__$$__getkudos_widget_components_inline_InlineCard,L=J.getRoot(E),M=L.$$('getkudos.ui.inline.items'),N=L.$$('getkudos.ui.resize_iframe$bool')
function O(){F.setThreshold(50)
F.setSort(!0,!1)
F.setRenderer(K)
F.setDataNode(M)
F.on('jx:list:length',function(){I.updateNode(N,!0)})
I.updateNode(N,!0)}
O()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_components_inline_List
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"maxWidth":"1500px","marginLeft, marginRight":"auto",":::inline_card":{"position":"relative","display":"inline-block","*display":"inline","zoom":"1","verticalAlign":"top","textAlign":"center","width":"33.3%","backgroundColor":"white","height":"170px","paddingLeft, paddingRight":"1%","borderStyle":"solid","borderWidth":["1px","$$card_border_width"],"borderColor":["#ddd","$$card_border_color"],"&:after":{"content":"''","display":"inline-block","height":"100%","verticalAlign":"middle"},":::kudos_card":{"display":"inline-block","width":"100%","verticalAlign":"middle","textAlign":["left","start"],"*textAlign":"left",":::type_card":{"width, height":"auto"}}},"@media (min-width: 765px)":{":::inline_card":{"&:nth-child(3n+1)":{"zIndex":"2"},"&:nth-child(3n+2)":{"zIndex":"1"},"&:nth-child(3n+2), &:nth-child(3n+3)":{"borderLeftWidth":"0px"},"&:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))":{"borderTopWidth":"0px"}}},"@media (min-width: 480px) and (max-width: 765px)":{":::inline_card":{"width":"49.99%","&:nth-child(2n+1)":{"zIndex":"1"},"&:nth-child(2n+2)":{"borderLeftWidth":"0px"},"&:not(:nth-child(1)):not(:nth-child(2))":{"borderTopWidth":"0px"}}},"@media (max-width: 480px)":{":::inline_card":{"display":"block","width":"100%","height":"auto","paddingTop, paddingBottom":"1%","textAlign":["left","start"],"borderTopWidth":"0px","&:first-child":{"borderTopWidth":["1px","$$card_border_width"]}}}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_components_inline_List"].join('')
w.prototype.__jx__fqname="getkudos_widget_components_inline_List"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_InlineMainStack=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_DefaultCSS,null,null,[],{}],[b.__$$__getkudos_widget_widgets_FontCSS,null,null,[],{}],[b.__$$__getkudos_widget_components_inline_List,null,null,[],{}],[b.__$$__getkudos_widget_components_inline_Footer,null,null,[],{}]],{"inline":"getkudos.widget.components.inline","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__getkudos_widget_controllers_Data,I=b.__$$__getkudos_widget_themes_ThemeIndex,J=H.getRoot(E),K=J.$$('getkudos.settings.theme'),L=J.$$('getkudos.ui.resize_iframe$bool'),M
function N(){E.setParentIframe=R
E.autobind(K,'value',Q)
E.autobind(L,'value',O)}
function O(S){if(!S)return
l(P)}
function P(){M&&M.onAutoResize()}
function Q(S){if(!S)return
var T=I['default'].generate({primary_color:K.getValue('primary_color$string'),border_visible:K.getValue('border_visible$bool'),border_color:K.getValue('border_color$string')})
t.setPalette(T)
t.reload()}
function R(S){M=S}
N()})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_InlineMainStack
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{":::inline_footer":{"marginTop":"20px"}}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_InlineMainStack"].join('')
w.prototype.__jx__fqname="getkudos_widget_InlineMainStack"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_MainStack=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_html_div,null,null,[[b.__$$__getkudos_widget_widgets_DefaultCSS,null,null,[],{}],[b.__$$__getkudos_widget_widgets_FontCSS,null,null,[],{}],[b.__$$__jx_ui_ViewStack,"main_stack",null,[[b.__$$__getkudos_widget_components_KudosButton,null,null,[],{"name":"button"}],[b.__$$__getkudos_widget_components_KudosBanner,null,null,[],{"name":"banner"}],[b.__$$__getkudos_widget_components_KudosList,null,null,[],{"name":"list"}]],{"id":"main_stack"}]],{"components":"getkudos.widget.components","widgets":"getkudos.widget.widgets","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
var F=u.get(y+'__main_stack')
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var G=(function(){var I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_themes_ThemeIndex,K=I.getRoot(E),L=K.$$('getkudos.ui'),M=K.$$('getkudos.ui.display$string'),N=K.$$('getkudos.settings.theme'),O=N.$('primary_color$string'),P=N.$('position$string'),Q=K.$$('getkudos.ui.resize_iframe$bool'),R
function S(){E.setParentIframe=Y
E.autobind(M,'value',U)
E.autobind(O,'value',X)
E.autobind(P,'value',Z)
E.autobind(Q,'value',T)}
function T($$){if(!$$)return
R&&R.onAutoResize()}
function U($$){if(!$$)return
F.setName($$)
V()
l(V)}
function V(){var $$=F.currentChild
if(!$$)return
$$.refresh&&$$.refresh()
W()}
function W(){L.update({resize_iframe$bool:!0})}
function X($$){if(!$$||$$==X.last_value)return
var $_=J['default'].generate({primary_color:$$,border_visible:N.getValue('border_visible$bool'),border_color:N.getValue('border_color$string')})
t.setPalette($_)
t.reload()
X.last_value=$$}
function Y($$){R=$$
Z(P.getValue())}
function Z($$){if(Z.last_position==$$||!R)return
Z.last_position=$$
switch($$){case "br":R.setLeft(NaN).setBottom('0px').setRight('10px')
break
case "bl":default:R.setRight(NaN).setBottom('0px').setLeft('10px')}}
S()})()
for(var H in G)if(G.hasOwnProperty(H))E[H]=G[H]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_MainStack
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_html_div.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_html_div
w.__jx__jcss={"**self":{"position":"relative","padding":"10px"}}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_MainStack"].join('')
w.prototype.__jx__fqname="getkudos_widget_MainStack"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_Widget=(function(){function w(x,y,z,A,B){if(!(this instanceof w))return new w(x,y,z,A,B)
y=y||u.generateID()
var C=[b.__$$__jx_ui_FloatingFrame,null,null,[],{"left":"10","bottom":"10","width":"1px","height":"1px","visible":"false","xmlns":"jx.ui.html","ui":"jx.ui"}],D=C[0].call(this,x,y,null,u.mangleIDs(y,C[3]),C[4]),E=D||this
u.set(y,E)
if(!w.__jx__jcss_generated){t.generate(x,w.prototype.__jx__fqname,w.__jx__jcss,null,w)
w.__jx__jcss_generated=!0}
var F=(function(){var H=b.__$$__meshim_widget_utils_Mobile,I=b.__$$__getkudos_widget_controllers_Data,J=b.__$$__getkudos_widget_controllers_UIController,K=b.__$$__getkudos_widget_controllers_DefaultDataNode,L=b.__$$__getkudos_widget_controllers_data_Payload,M=b.__$$__getkudos_widget_controllers_Analytics,N=b.__$$__getkudos_widget_MainStack,O=b.__$$__getkudos_widget_MobileMainStack,P=b.__$$__getkudos_widget_utils_doStorage,Q=b.__$$__getkudos_widget_utils_onIWinLoaded,R,S,T=['getkudos.ui.display$string','getkudos.ui.kudosBanner.item_id$string','getkudos.ui.kudosBanner.auto_dir$string','getkudos.ui.broken_avatars']
E.init=U
function U(){R=I.getRoot(E.content)
R.update(K)
P(E.idoc,T)
Q(E.iwin,W)
var Y=R.$$('getkudos.connection.payload_loaded$bool')
E.autobind(Y,'value',X)}
E.setDataPath=V
function V(Y){S=Y
E.idoc._getkudos_datapath=Y}
function W(){if(W.requested)return
W.requested=!0
new L(E.idoc).load()}
function X(Y){if(!Y)return
if(X.loaded)return
X.loaded=!0
t.generateAll()
E.show()
if(H.isMobileBrowser()&&H.isMobileWhitelist())new O(E.wrapper).setParentIframe(E)
else new N(E.wrapper).setParentIframe(E)
new M(E.content).generateGif()
new J(E.content).resetPanelIfNeeded()}})()
for(var G in F)if(F.hasOwnProperty(G))E[G]=F[G]
if(E.fire)E.fire('init')
E.setStyle&&E.setStyle(z)
E.setAttributes&&E.setAttributes(B)
if(typeof E.addChildren=='function')E.addChildren(A)
else u.addChildren(E,A)
if(E!==this){E.__jx__constructor=b.__$$__getkudos_widget_Widget
E.__jx__native=!1}
return E}
w.prototype=e(b.__$$__jx_ui_FloatingFrame.prototype)
w.prototype.__jx__native=!1
w.prototype.__jx__super=b.__$$__jx_ui_FloatingFrame
w.__jx__jcss={}
w.prototype.__jx__fqname_chain=[(w.prototype.__jx__fqname_chain||"")," ","getkudos_widget_Widget"].join('')
w.prototype.__jx__fqname="getkudos_widget_Widget"
w.prototype.__jx__constructor=w
return w})()
b.__$$__getkudos_widget_Inline=(function(){var w=b.__$$__getkudos_widget_widgets_InlineFrame,x=b.__$$__getkudos_widget_controllers_Data,y=b.__$$__getkudos_widget_controllers_data_Payload,z=b.__$$__getkudos_widget_controllers_UIController,A=b.__$$__getkudos_widget_controllers_DefaultDataNode,B=b.__$$__getkudos_widget_controllers_Analytics,C=b.__$$__getkudos_widget_InlineMainStack,D=b.__$$__getkudos_widget_utils_doStorage,E=b.__$$__getkudos_widget_utils_onIWinLoaded,F=b.__$$__getkudos_dashboard_utils_Utils,G={visible:"none"},H=['getkudos.ui.broken_avatar']
function I(K){this.parentNode=K}
var J=I.prototype
J.setDataPath=function(K){this.dataPath=K}
J.init=function(){var K=this.dataPath
this.$root=x.root.$$(K)
this.$root.$$('getkudos.ui').update(null)
this.frame=new w(this.parentNode,null,null,null,G)
this.frame.idoc._getkudos_datapath=K
E(this.frame.iwin,F.bind(this.initInline,this))}
J.initInline=function(){this.$root.update(A)
D(this.frame.idoc,H)
var K=this.$root.$$('getkudos.connection.payload_loaded$bool')
this.frame.autobind(K,'value',F.bind(this.onKudosLoaded,this))
this.requestPayload()}
J.onKudosLoaded=function(K){if(!K)return
if(this.kudosLoaded)return
var L=this.frame
this.kudosLoaded=!0
L.show()
t.generateAll()
new C(L.wrapper).setParentIframe(L)
new B(L.content).generateGif()
new z(L.content).resetPanelIfNeeded()}
J.requestPayload=function(){var K=this.$root.getValue('getkudos.connection.layout$string')
new y(this.frame.idoc).load({noSolicit:!0,layout:K})}
if((typeof I==='function')&&I.prototype&&!I.__jx__no_fqname){I.prototype.__jx__fqname_chain=[(I.prototype.__jx__fqname_chain||"")," ","getkudos_widget_Inline"].join('')
I.prototype.__jx__fqname="getkudos_widget_Inline"}
return I})()
b.__$$__getkudos_widget_controllers_getkudosAPI_create=(function(){var w=b.__$$__getkudos_widget_controllers_getkudosAPI_options,x=b.__$$__getkudos_widget_Widget,y=b.__$$__getkudos_widget_Inline,z={},A={'float':x,'float_mobile':x,'inline':y}
function B(C){var D,E,F,G,H={}
if(typeof C=='string'){E=C}
else if(typeof C=='object'){H=C
E=C.site_name}
if(!E){if(window.console&&window.console.log)window.console.log('Getkudos error: no site_name specified')
return}
var I=H.type||'float'
F=['gk',E,I].join('_')
if(!(F in z)){z[F]=0}
G=z[F]
D=F+(G?'_'+G:'')
z[F]=z[F]+1
H.site_name=E
H.widget_type=I
w(D,H)
var J=A[I]
if(!J)return
var K=new J(document.body)
K.setDataPath(D)
K.init()}
if((typeof B==='function')&&B.prototype&&!B.__jx__no_fqname){B.prototype.__jx__fqname_chain=[(B.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_getkudosAPI_create"].join('')
B.prototype.__jx__fqname="getkudos_widget_controllers_getkudosAPI_create"}
return B})()
b.__$$__getkudos_widget_controllers_getkudosAPI_parse=(function(){var w=b.__$$__getkudos_widget_controllers_getkudosAPI_options,x=b.__$$__getkudos_widget_Inline,y={}
function z(H){H=(H&&H.dom)||H||document.body
var I=D(H),J=[]
for(var K=0,L=I.length;K<L;K++){J.push(A(I[K]))}
return J}
function A(H){var I,J,K
K=C(H)
J=K.site_name
I=K.widget_id||B(K)
if(!J)return
w(I,K)
var L=new x(H)
L.setDataPath(I)
L.init()
H.className=H.className+' rendered'
return L.frame}
function B(H){var I,J,K,L=H.site_name,M=H.widget_type
I=['gk',L,M].join('_')
if(!(I in y)){y[I]=0}
J=y[I]
K=I+(J?'_'+J:'')
y[I]=y[I]+1
return K}
function C(H){return {site_name:F(H,'data-site-name'),layout:F(H,'data-layout'),no_cache:m(F(H,'data-no-cache')),preview:m(F(H,'data-preview')),widget_id:F(H,'data-widget-id'),pagination_init:parseInt(F(H,'data-pagination-init'),10)||null,pagination_each:parseInt(F(H,'data-pagination-each'),10)||null,widget_type:'inline'}}
function D(H){var I=[],J=H.parentNode,K=G(J,'div','getkudos-inline')
for(var L=0,M=K.length;L<M;L++){var N=K[L]
if(!E(N,'rendered'))I.push(N.jx_wrapper||N)}
return I}
function E(H,I){var J=H.className,K=new RegExp('\\b'+I+'\\b')
return K.test(J)}
function F(H,I){return H.getAttribute(I)}
function G(H,I,J){if(H.querySelectorAll)return H.querySelectorAll(I+'.'+J)
var K=H.getElementsByTagName(I),L=[]
for(var M=0,N=K.length;M<N;M++){var O=K[M]
if(E(O,J))L.push(O)}
return L}
if((typeof z==='function')&&z.prototype&&!z.__jx__no_fqname){z.prototype.__jx__fqname_chain=[(z.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_getkudosAPI_parse"].join('')
z.prototype.__jx__fqname="getkudos_widget_controllers_getkudosAPI_parse"}
return z})()
b.__$$__getkudos_widget_controllers_GetkudosAPI=(function(){var w=b.__$$__jx_core_ObjectUtil,x=b.__$$__getkudos_widget_controllers_getkudosAPI_create,y=b.__$$__getkudos_widget_controllers_getkudosAPI_parse,z=b.__$$__getkudos_widget_controllers_getkudosAPI_options,A=b.__$$__getkudos_dashboard_utils_Utils,B=Array.prototype.slice,C='getkudos',D={init:F},E={options:z,create:x,parse:y}
function F(){G()
J()}
function G(){window[C]=window[C]||[]
var M=window[C],N=M._
window[C]=H
w.extend(H,E)
if(N){for(var O=0,P=N.length;O<P;O++)H.apply(E,N[O])}}
function H(){var M=B.call(arguments),N=M[0]
if(typeof N=='function'){l(function(){I(N)})}
else if(typeof N=='string'){var O=E[N]
if(!O)return
O.apply(E,M.slice(1))}}
function I(M){try {M()}catch(N){var O=window.console
if(!O||!O.log)return
O.log('Error in API call: '+N.name+' - '+N.message)
O.dir&&O.dir(N)
O.log(M.toString())}}
function J(){var M=document.getElementsByTagName('script')
for(var N=0,O=M.length;N<O;N++){var P=M[N],Q=P.src
if(/\.getkudos\.me/.test(Q))K(Q)}}
function K(M){if(!/\?.+$/.test(M))return
var N=M.substr(M.indexOf('?')+1),O=A.deparam(N),P=O.api
if(!g(P))P=[P]
for(var Q=0,R=P.length;Q<R;Q++){L(P[Q])}}
function L(M){var N=M.split(','),O=0
for(O=0;O<N.length;O++)N[O]=A.trim(N[O])
var P=N[0]
N=N.slice(1)
if(!E[P])return
E[P].apply(null,N)}
if((typeof D==='function')&&D.prototype&&!D.__jx__no_fqname){D.prototype.__jx__fqname_chain=[(D.prototype.__jx__fqname_chain||"")," ","getkudos_widget_controllers_GetkudosAPI"].join('')
D.prototype.__jx__fqname="getkudos_widget_controllers_GetkudosAPI"}
return D})()
b.__$$__widget=(function(){var w=b.__$$__getkudos_widget_controllers_GetkudosAPI,x=b.__$$__meshim_widget_utils_Mobile
function y(){if(!A())return
t.setIFrameOnly(!0)
z()}
function z(){if(z.init)return
z.init=!0
w.init()}
function A(){if(p.isIE6)return !1
if(x.isMobileBrowser()&&!x.isMobileWhitelist())return !1
return !0}
if((typeof y==='function')&&y.prototype&&!y.__jx__no_fqname){y.prototype.__jx__fqname_chain=[(y.prototype.__jx__fqname_chain||"")," ","widget"].join('')
y.prototype.__jx__fqname="widget"}
return y})()
{q.runAfterFirstChildReady(function(){new b.__$$__widget(document.body,!1,'','',[])})}
function v(w){return w}})()
