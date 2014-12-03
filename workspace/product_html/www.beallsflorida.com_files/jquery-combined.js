/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 2.1.2-pre
 */

(function($){

/**
 * The bgiframe is chainable and applies the iframe hack to get 
 * around zIndex issues in IE6. It will only apply itself in IE6 
 * and adds a class to the iframe called 'bgiframe'. The iframe
 * is appeneded as the first child of the matched element(s) 
 * with a tabIndex and zIndex of -1.
 * 
 * By default the plugin will take borders, sized with pixel units,
 * into account. If a different unit is used for the border's width,
 * then you will need to use the top and left settings as explained below.
 *
 * NOTICE: This plugin has been reported to cause perfromance problems
 * when used on elements that change properties (like width, height and
 * opacity) a lot in IE6. Most of these problems have been caused by 
 * the expressions used to calculate the elements width, height and 
 * borders. Some have reported it is due to the opacity filter. All 
 * these settings can be changed if needed as explained below.
 *
 * @example $('div').bgiframe();
 * @before <div><p>Paragraph</p></div>
 * @result <div><iframe class="bgiframe".../><p>Paragraph</p></div>
 *
 * @param Map settings Optional settings to configure the iframe.
 * @option String|Number top The iframe must be offset to the top
 * 		by the width of the top border. This should be a negative 
 *      number representing the border-top-width. If a number is 
 * 		is used here, pixels will be assumed. Otherwise, be sure
 *		to specify a unit. An expression could also be used. 
 * 		By default the value is "auto" which will use an expression 
 * 		to get the border-top-width if it is in pixels.
 * @option String|Number left The iframe must be offset to the left
 * 		by the width of the left border. This should be a negative 
 *      number representing the border-left-width. If a number is 
 * 		is used here, pixels will be assumed. Otherwise, be sure
 *		to specify a unit. An expression could also be used. 
 * 		By default the value is "auto" which will use an expression 
 * 		to get the border-left-width if it is in pixels.
 * @option String|Number width This is the width of the iframe. If
 *		a number is used here, pixels will be assume. Otherwise, be sure
 * 		to specify a unit. An experssion could also be used.
 *		By default the value is "auto" which will use an experssion
 * 		to get the offsetWidth.
 * @option String|Number height This is the height of the iframe. If
 *		a number is used here, pixels will be assume. Otherwise, be sure
 * 		to specify a unit. An experssion could also be used.
 *		By default the value is "auto" which will use an experssion
 * 		to get the offsetHeight.
 * @option Boolean opacity This is a boolean representing whether or not
 * 		to use opacity. If set to true, the opacity of 0 is applied. If
 *		set to false, the opacity filter is not applied. Default: true.
 * @option String src This setting is provided so that one could change 
 *		the src of the iframe to whatever they need.
 *		Default: "javascript:false;"
 *
 * @name bgiframe
 * @type jQuery
 * @cat Plugins/bgiframe
 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 */
$.fn.bgIframe = $.fn.bgiframe = function(s) {
	// This is only for IE6
	if ( $.browser.msie && /6.0/.test(navigator.userAgent) ) {
		s = $.extend({
			top     : 'auto', // auto == .currentStyle.borderTopWidth
			left    : 'auto', // auto == .currentStyle.borderLeftWidth
			width   : 'auto', // auto == offsetWidth
			height  : 'auto', // auto == offsetHeight
			opacity : true,
			src     : 'javascript:false;'
		}, s || {});
		var prop = function(n){return n&&n.constructor==Number?n+'px':n;},
		    html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
		               'style="display:block;position:absolute;z-index:-1;'+
			               (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
					       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
					       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
					       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
					       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
					'"/>';
		return this.each(function() {
			if ( $('> iframe.bgiframe', this).length == 0 )
				this.insertBefore( document.createElement(html), this.firstChild );
		});
	}
	return this;
};

})(jQuery);/*!
 * jQuery blockUI plugin
 * Version 2.38 (29-MAR-2011)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;
(function($) {

    if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
        alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
        return;
    }

    $.fn._fadeIn = $.fn.fadeIn;

    var noOp = function() {};

    // this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
    // retarded userAgent strings on Vista)
    var mode = document.documentMode || 0;
    var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
    var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

    // global $ methods for blocking/unblocking the entire page
    $.blockUI = function(opts) {
        install(window, opts);
    };
    $.unblockUI = function(opts) {
        remove(window, opts);
    };

    // convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
    $.growlUI = function(title, message, timeout, onClose) {
        var $m = $('<div class="growlUI"></div>');
        if (title) $m.append('<h1>' + title + '</h1>');
        if (message) $m.append('<h2>' + message + '</h2>');
        if (timeout == undefined) timeout = 3000;
        $.blockUI({
            message: $m,
            fadeIn: 700,
            fadeOut: 1000,
            centerY: false,
            timeout: timeout,
            showOverlay: false,
            onUnblock: onClose,
            css: $.blockUI.defaults.growlCSS
        });
    };

    // plugin method for blocking element content
    $.fn.block = function(opts) {
        return this.unblock({
            fadeOut: 0
        }).each(function() {
            if ($.css(this, 'position') == 'static') this.style.position = 'relative';
            if ($.browser.msie) this.style.zoom = 1; // force 'hasLayout'
            install(this, opts);
        });
    };

    // plugin method for unblocking element content
    $.fn.unblock = function(opts) {
        return this.each(function() {
            remove(this, opts);
        });
    };

    $.blockUI.version = 2.38; // 2nd generation blocking at no extra cost!
    // override these in your code to change the default behavior and style
    $.blockUI.defaults = {
        // message displayed when blocking (use null for no message)
        message: '<h1>Please wait...</h1>',

        title: null,
        // title string; only used when theme == true
        draggable: true,
        // only used when theme == true (requires jquery-ui.js to be loaded)
        theme: false,
        // set to true to use with jQuery UI themes
        // styles for the message when blocking; if you wish to disable
        // these and use an external stylesheet then do this in your code:
        // $.blockUI.defaults.css = {};
        css: {
            padding: 0,
            margin: 0,
            width: '30%',
            top: '40%',
            left: '35%',
            textAlign: 'center',
            color: '#000',
            border: '3px solid #aaa',
            backgroundColor: '#fff',
            cursor: 'wait'
        },

        // minimal style set used when themes are used
        themedCSS: {
            width: '30%',
            top: '40%',
            left: '35%'
        },

        // styles for the overlay
        overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.6,
            cursor: 'wait'
        },

        // styles applied when using $.growlUI
        growlCSS: {
            width: '350px',
            top: '10px',
            left: '',
            right: '10px',
            border: 'none',
            padding: '5px',
            opacity: 0.6,
            cursor: 'default',
            color: '#fff',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            'border-radius': '10px'
        },

        // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
        // (hat tip to Jorge H. N. de Vasconcelos)
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

        // force usage of iframe in non-IE browsers (handy for blocking applets)
        forceIframe: false,

        // z-index for the blocking overlay
        baseZ: 1000,

        // set these to true to have the message automatically centered
        centerX: true,
        // <-- only effects element blocking (page block controlled via css above)
        centerY: true,

        // allow body element to be stetched in ie6; this makes blocking look better
        // on "short" pages.  disable if you wish to prevent changes to the body height
        allowBodyStretch: true,

        // enable if you want key and mouse events to be disabled for content that is blocked
        bindEvents: true,

        // be default blockUI will supress tab navigation from leaving blocking content
        // (if bindEvents is true)
        constrainTabKey: true,

        // fadeIn time in millis; set to 0 to disable fadeIn on block
        fadeIn: 200,

        // fadeOut time in millis; set to 0 to disable fadeOut on unblock
        fadeOut: 400,

        // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
        timeout: 0,

        // disable if you don't want to show the overlay
        showOverlay: true,

        // if true, focus will be placed in the first available input field when
        // page blocking
        focusInput: true,

        // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
        applyPlatformOpacityRules: true,

        // callback method invoked when fadeIn has completed and blocking message is visible
        onBlock: null,

        // callback method invoked when unblocking has completed; the callback is
        // passed the element that has been unblocked (which is the window object for page
        // blocks) and the options that were passed to the unblock call:
        //	 onUnblock(element, options)
        onUnblock: null,

        // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
        quirksmodeOffsetHack: 4,

        // class name of the message block
        blockMsgClass: 'blockMsg'
    };

    // private data and functions follow...
    var pageBlock = null;
    var pageBlockEls = [];

    function install(el, opts) {
        var full = (el == window);
        var msg = opts && opts.message !== undefined ? opts.message : undefined;
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
        var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
        var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
        msg = msg === undefined ? opts.message : msg;

        // remove the current block (if there is one)
        if (full && pageBlock) remove(window, {
            fadeOut: 0
        });

        // if an existing element is being used as the blocking content then we capture
        // its current place in the DOM (and current display style) so we can restore
        // it when we unblock
        if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
            var node = msg.jquery ? msg[0] : msg;
            var data = {};
            $(el).data('blockUI.history', data);
            data.el = node;
            data.parent = node.parentNode;
            data.display = node.style.display;
            data.position = node.style.position;
            if (data.parent) data.parent.removeChild(node);
        }

        var z = opts.baseZ;

        // blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
        // layer1 is the iframe layer which is used to supress bleed through of underlying content
        // layer2 is the overlay layer which has opacity and a wait cursor (by default)
        // layer3 is the message content that is displayed while blocking
        var lyr1 = ($.browser.msie || opts.forceIframe) ? $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>') : $('<div class="blockUI" style="display:none"></div>');

        var lyr2 = opts.theme ? $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>') : $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

        var lyr3, s;
        if (opts.theme && full) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + z + ';display:none;position:fixed">' + '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>' + '<div class="ui-widget-content ui-dialog-content"></div>' + '</div>';
        } else if (opts.theme) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + z + ';display:none;position:absolute">' + '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>' + '<div class="ui-widget-content ui-dialog-content"></div>' + '</div>';
        } else if (full) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + z + ';display:none;position:fixed"></div>';
        } else {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + z + ';display:none;position:absolute"></div>';
        }
        lyr3 = $(s);

        // if we have a message, style it
        if (msg) {
            if (opts.theme) {
                lyr3.css(themedCSS);
                lyr3.addClass('ui-widget-content');
            } else
            lyr3.css(css);
        }

        // style the overlay
        if (!opts.theme && (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))) lyr2.css(opts.overlayCSS);
        lyr2.css('position', full ? 'fixed' : 'absolute');

        // make iframe layer transparent in IE
        if ($.browser.msie || opts.forceIframe) lyr1.css('opacity', 0.0);

        //$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
        var layers = [lyr1, lyr2, lyr3],
            $par = full ? $('body') : $(el);
        $.each(layers, function() {
            this.appendTo($par);
        });

        if (opts.theme && opts.draggable && $.fn.draggable) {
            lyr3.draggable({
                handle: '.ui-dialog-titlebar',
                cancel: 'li'
            });
        }

        // ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
        var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
        if (ie6 || expr) {
            // give body 100% height
            if (full && opts.allowBodyStretch && $.boxModel) $('html,body').css('height', '100%');

            // fix ie6 issue when blocked element has a border width
            if ((ie6 || !$.boxModel) && !full) {
                var t = sz(el, 'borderTopWidth'),
                    l = sz(el, 'borderLeftWidth');
                var fixT = t ? '(0 - ' + t + ')' : 0;
                var fixL = l ? '(0 - ' + l + ')' : 0;
            }

            // simulate fixed position
            $.each([lyr1, lyr2, lyr3], function(i, o) {
                var s = o[0].style;
                s.position = 'absolute';
                if (i < 2) {
                    full ? s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"') : s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
                    full ? s.setExpression('width', 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
                    if (fixL) s.setExpression('left', fixL);
                    if (fixT) s.setExpression('top', fixT);
                } else if (opts.centerY) {
                    if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                    s.marginTop = 0;
                } else if (!opts.centerY && full) {
                    var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
                    var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
                    s.setExpression('top', expression);
                }
            });
        }

        // show the message
        if (msg) {
            if (opts.theme) lyr3.find('.ui-widget-content').append(msg);
            else
            lyr3.append(msg);
            if (msg.jquery || msg.nodeType) $(msg).show();
        }

        if (($.browser.msie || opts.forceIframe) && opts.showOverlay) lyr1.show(); // opacity is zero
        if (opts.fadeIn) {
            var cb = opts.onBlock ? opts.onBlock : noOp;
            var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
            var cb2 = msg ? cb : noOp;
            if (opts.showOverlay) lyr2._fadeIn(opts.fadeIn, cb1);
            if (msg) lyr3._fadeIn(opts.fadeIn, cb2);
        } else {
            if (opts.showOverlay) lyr2.show();
            if (msg) lyr3.show();
            if (opts.onBlock) opts.onBlock();
        }

        // bind key and mouse events
        bind(1, el, opts);

        if (full) {
            pageBlock = lyr3[0];
            pageBlockEls = $(':input:enabled:visible', pageBlock);
            if (opts.focusInput) setTimeout(focus, 20);
        } else
        center(lyr3[0], opts.centerX, opts.centerY);

        if (opts.timeout) {
            // auto-unblock
            var to = setTimeout(function() {
                full ? $.unblockUI(opts) : $(el).unblock(opts);
            }, opts.timeout);
            $(el).data('blockUI.timeout', to);
        }
    };

    // remove the block


    function remove(el, opts) {
        var full = (el == window);
        var $el = $(el);
        var data = $el.data('blockUI.history');
        var to = $el.data('blockUI.timeout');
        if (to) {
            clearTimeout(to);
            $el.removeData('blockUI.timeout');
        }
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        bind(0, el, opts); // unbind events
        var els;
        if (full) // crazy selector to handle odd field errors in ie6/7
        els = $('body').children().filter('.blockUI').add('body > .blockUI');
        else
        els = $('.blockUI', el);

        if (full) pageBlock = pageBlockEls = null;

        if (opts.fadeOut) {
            els.fadeOut(opts.fadeOut);
            setTimeout(function() {
                reset(els, data, opts, el);
            }, opts.fadeOut);
        } else
        reset(els, data, opts, el);
    };

    // move blocking element back into the DOM where it started


    function reset(els, data, opts, el) {
        els.each(function(i, o) {
            // remove via DOM calls so we don't lose event handlers
            if (this.parentNode) this.parentNode.removeChild(this);
        });

        if (data && data.el) {
            data.el.style.display = data.display;
            data.el.style.position = data.position;
            if (data.parent) data.parent.appendChild(data.el);
            $(el).removeData('blockUI.history');
        }

        if (typeof opts.onUnblock == 'function') opts.onUnblock(el, opts);
    };

    // bind/unbind the handler


    function bind(b, el, opts) {
        var full = el == window,
            $el = $(el);

        // don't bother unbinding if there is nothing to unbind
        if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked'))) return;
        if (!full) $el.data('blockUI.isBlocked', b);

        // don't bind events when overlay is not in use or if bindEvents is false
        if (!opts.bindEvents || (b && !opts.showOverlay)) return;

        // bind anchors and inputs for mouse and key events
        var events = 'mousedown mouseup keydown keypress';
        b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

        // former impl...
        //	   var $e = $('a,:input');
        //	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
    };

    // event handler to suppress keyboard/mouse events when blocking


    function handler(e) {
        // allow tab navigation (conditionally)
        if (e.keyCode && e.keyCode == 9) {
            if (pageBlock && e.data.constrainTabKey) {
                var els = pageBlockEls;
                var fwd = !e.shiftKey && e.target === els[els.length - 1];
                var back = e.shiftKey && e.target === els[0];
                if (fwd || back) {
                    setTimeout(function() {
                        focus(back)
                    }, 10);
                    return false;
                }
            }
        }
        var opts = e.data;
        // allow events within the message content
        if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0) return true;

        // allow events for content that is not being blocked
        return $(e.target).parents().children().filter('div.blockUI').length == 0;
    };

    function focus(back) {
        if (!pageBlockEls) return;
        var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
        if (e) e.focus();
    };

    function center(el, x, y) {
        var p = el.parentNode,
            s = el.style;
        var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, 'borderLeftWidth');
        var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, 'borderTopWidth');
        if (x) s.left = l > 0 ? (l + 'px') : '0';
        if (y) s.top = t > 0 ? (t + 'px') : '0';
    };

    function sz(el, p) {
        return parseInt($.css(el, p)) || 0;
    };

})(jQuery);/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};/**
 * jQuery Custom Radio-buttons and Checkbox; basically it's styling/theming for Checkbox and Radio button elements in forms
 * 
 * USAGE:
 * 	$(document).ready(function(){
 * 		$(".radio").styleRadioCheckbox();
 * 	}
 */

var elmHeight = "25";	// Should be specified based on image size

// Extend jQuery functionality for custom radio button functionality
jQuery.fn.extend({
	styleRadioCheckbox: function() {
		// Initialize with initial load time control state
		$.each($(this), function(){
			var elm	=	$(this).children().get(0);
			elmType = $(elm).attr("type");
			$(this).data('type',elmType);
			$(this).data('checked',$(elm).attr("checked"));
			$(this).clear();
		});
		$(this).mousedown(function() { $(this).effect(); });
		$(this).mouseup(function() { $(this).handle(); });	
	},
	clear: function() {
		if($(this).data("checked") == true)	{
			$(this).css("backgroundPosition","center -"+(elmHeight*2)+"px");
		} else {
			$(this).css("backgroundPosition","center 0");
		}
	},
	effect: function() {
		if($(this).data("checked") == true) {
			$(this).css({backgroundPosition:"center -"+(elmHeight*3)+"px"});
		} else {
			$(this).css({backgroundPosition:"center -"+(elmHeight)+"px"});
		}
	},
	handle: function() {
		var elm	=	$(this).children().get(0);
		if($(this).data("checked") == true) {
			$(elm).uncheck(this);
		} else {
			$(elm).check(this);
		}

		if($(this).data('type') == 'radio')	{
			$.each($("input[name='"+$(elm).attr("name")+"']"),function() {
				if(elm!=this)
					$(this).uncheck(-1);
			});
		}
	},
	check: function(div) {
		$(this).attr("checked",true);
		$(div).data('checked',true).css({backgroundPosition:"center -"+(elmHeight*2)+"px"});
	},
	uncheck: function(div) {
		$(this).attr("checked",false);
		if(div != -1) {
			$(div).data('checked',false).css({backgroundPosition:"center 0"});
		} else {
			$(this).parent().data("checked",false).css({backgroundPosition:"center 0"});
		}
	}
});
(function($) {
 
 	$.avs = {
	  jsonData : "",
	  check : function(data, settings) {
 		//alert("check");
		 var config = {
			 url: 'CVAjaxAddressUpdate',
			 callback : function(json) {}
		 };
	 
		 if (settings) $.extend(config, settings);
	 
	
		this._getData(config.url, data, config.callback); 
	 
		 return this;
	 
	  },
	  
	  _getData : function(url, data, callback) {
		 // alert("_getData");
	
	   	$.ajax({
	   	  url: url,
	   	  dataType: 'text',
	   	  //dataType: 'json',
	      //contentType: 	'application/json',
	      //cache:         false,
	   	  data: data,
	   	  success: function(json){
	   		tmp = json.split("{");
	   		data = "";
	   		for (i=0;i<=tmp.length;i++) {
	   		 if(i != 0 && tmp[i] != undefined) {
	   			 data = data + "{" + tmp[i];
	   		 }
	   		}
	   		data = data.replace(/[\n\r\t]/g,''); 
		   		try {
			   		this.jsonData = JSON.parse(data);
					callback(this.jsonData);
		   		}
		   		catch (err)
		   		{
					callback("{\"JSON\" : \"true\"}");
					if(console && console.error){console.error(err); }
		   		}
	   		},
	   	  error: function(x, e) {
	   		//alert("error: "+ e);	
	   	
	   		}
	   	});
	  }
	};
 
 
 })(jQuery);
(function($) {
	 
 	$.avs = {
	  jsonData : "",
	  validate : function(data, settings) {
 		var config = {
			 url: 'CVAjaxAddressUpdate',
			 callback : function(json) {}
		 };
	 
		 if (settings) $.extend(config, settings);
	 
	
		this._postData(config.url, data, config.callback); 
	 
		 return this;
	 
	  },
	  
	  _postData : function(url, data, callback) {
		 $.ajax({
		  type: 'POST',
	   	  url: url,
	   	  dataType: 'text',
	   	 
	   	  data: data,
	   	  success: function(json){
	   		tmp = json.split("{");
	   		data = "";
	   		for (i=0;i<=tmp.length;i++) {
	   		 if(i != 0 && tmp[i] != undefined) {
	   			 data = data + "{" + tmp[i];
	   		 }
	   		}
	   		data = data.replace(/[\n\r\t]/g,''); 
		   		try {
			   		this.jsonData = JSON.parse(data);
					callback(this.jsonData);
		   		}
		   		catch (err)
		   		{
					callback("{\"JSON\" : \"true\"}");
					if(console && console.error){console.error(err); }
		   		}
	   		},
	   		error: function(x, e) {
	   		}
	   	});
	  }
	};
 
 
 })(jQuery);/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2008 M. Alsup
 * Version: 2.30 (02-NOV-2008)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
;eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(4($){8 q=\'2.30\';8 r=$.25.26&&/37 6.0/.1u(38.39);4 1n(){7(27.28&&27.28.1n)27.28.1n(\'[B] \'+3a.3b.3c.3d(2x,\'\'))};$.E.B=4(n){8 o=2x[1];O x.1s(4(){7(n===3e||n===P)n={};7(n.29==2y){3f(n){2a\'3g\':7(x.S)1v(x.S);x.S=0;$(x).1F(\'B.1M\',\'\');O;2a\'2b\':x.1g=1;O;2a\'2z\':x.1g=0;7(o===2c){n=$(x).1F(\'B.1M\');7(!n){1n(\'2A 1o 2B, 2C 1o 2z\');O}7(x.S){1v(x.S);x.S=0}1j(n.1N,n,1,1)}O;3h:n={1p:n}}}Q 7(n.29==3i){8 d=n;n=$(x).1F(\'B.1M\');7(!n){1n(\'2A 1o 2B, 2C 1o 1O 2D\');O}7(d<0||d>=n.1N.L){1n(\'3j 2D 1G: \'+d);O}n.N=d;7(x.S){1v(x.S);x.S=0}1j(n.1N,n,1,d>=n.1b);O}7(x.S)1v(x.S);x.S=0;x.1g=0;8 e=$(x);8 f=n.2d?$(n.2d,x):e.3k();8 g=f.3l();7(g.L<2){1n(\'3m; 3n 3o 3p: \'+g.L);O}8 h=$.3q({},$.E.B.2E,n||{},$.2F?e.2F():$.3r?e.1F():{});7(h.2e)h.2f=h.2g||g.L;e.1F(\'B.1M\',h);h.1w=x;h.1N=g;h.H=h.H?[h.H]:[];h.1k=h.1k?[h.1k]:[];h.1k.1P(4(){h.2h=0});7(h.1x)h.1k.J(4(){1j(g,h,0,!h.1y)});7(r&&h.1Q&&!h.2G)2i(f);8 j=x.3s;h.D=T((j.1H(/w:(\\d+)/)||[])[1])||h.D;h.C=T((j.1H(/h:(\\d+)/)||[])[1])||h.C;h.W=T((j.1H(/t:(\\d+)/)||[])[1])||h.W;7(e.u(\'1R\')==\'3t\')e.u(\'1R\',\'3u\');7(h.D)e.D(h.D);7(h.C&&h.C!=\'1S\')e.C(h.C);7(h.18)h.18=T(h.18);7(h.1l){h.1q=[];1I(8 i=0;i<g.L;i++)h.1q.J(i);h.1q.3v(4(a,b){O 3w.1l()-0.5});h.Z=0;h.18=h.1q[0]}Q 7(h.18>=g.L)h.18=0;8 k=h.18||0;f.u({1R:\'2H\',y:0,9:0}).U().1s(4(i){8 z=k?i>=k?g.L-(i-k):k-i:g.L-i;$(x).u(\'z-1G\',z)});$(g[k]).u(\'1h\',1).V();7($.25.26)g[k].2I.2J(\'2j\');7(h.1m&&h.D)f.D(h.D);7(h.1m&&h.C&&h.C!=\'1S\')f.C(h.C);7(h.2b)e.2K(4(){x.1g=1},4(){x.1g=0});8 l=$.E.B.M[h.1p];7($.2L(l))l(e,f,h);Q 7(h.1p!=\'2k\')1n(\'3x 3y: \'+h.1p);f.1s(4(){8 a=$(x);x.11=(h.1m&&h.C)?h.C:a.C();x.12=(h.1m&&h.D)?h.D:a.D()});h.A=h.A||{};h.I=h.I||{};h.G=h.G||{};f.1o(\':2l(\'+k+\')\').u(h.A);7(h.1f)$(f[k]).u(h.1f);7(h.W){h.W=T(h.W);7(h.19.29==2y)h.19=$.1p.3z[h.19]||T(h.19);7(!h.1T)h.19=h.19/2;3A((h.W-h.19)<3B)h.W+=h.19}7(h.2m)h.1U=h.1V=h.2m;7(!h.1z)h.1z=h.19;7(!h.1J)h.1J=h.19;h.2M=g.L;h.1b=k;7(h.1l){h.N=h.1b;7(++h.Z==g.L)h.Z=0;h.N=h.1q[h.Z]}Q h.N=h.18>=(g.L-1)?0:h.18+1;8 m=f[k];7(h.H.L)h.H[0].1W(m,[m,m,h,2c]);7(h.1k.L>1)h.1k[1].1W(m,[m,m,h,2c]);7(h.1K&&!h.1a)h.1a=h.1K;7(h.1a)$(h.1a).2n(\'1K\',4(){O 1O(g,h,h.1y?-1:1)});7(h.2o)$(h.2o).2n(\'1K\',4(){O 1O(g,h,h.1y?1:-1)});7(h.1r)2N(g,h);h.3C=4(a,b){8 c=$(a),s=c[0];7(!h.2g)h.2f++;g[b?\'1P\':\'J\'](s);7(h.1c)h.1c[b?\'1P\':\'J\'](s);h.2M=g.L;c.u(\'1R\',\'2H\');c[b?\'3D\':\'2O\'](e);7(b){h.1b++;h.N++}7(r&&h.1Q&&!h.2G)2i(c);7(h.1m&&h.D)c.D(h.D);7(h.1m&&h.C&&h.C!=\'1S\')f.C(h.C);s.11=(h.1m&&h.C)?h.C:c.C();s.12=(h.1m&&h.D)?h.D:c.D();c.u(h.A);7(h.1r)$.E.B.2p(g.L-1,s,$(h.1r),g,h);7(1X h.X==\'4\')h.X(c)};7(h.W||h.1x)x.S=1Y(4(){1j(g,h,0,!h.1y)},h.1x?10:h.W+(h.2P||0))})};4 1j(a,b,c,d){7(b.2h)O;8 p=b.1w,1A=a[b.1b],1a=a[b.N];7(p.S===0&&!c)O;7(!c&&!p.1g&&((b.2e&&(--b.2f<=0))||(b.1Z&&!b.1l&&b.N<b.1b))){7(b.2q)b.2q(b);O}7(c||!p.1g){7(b.H.L)$.1s(b.H,4(i,o){o.1W(1a,[1A,1a,b,d])});8 e=4(){7($.25.26&&b.1Q)x.2I.2J(\'2j\');$.1s(b.1k,4(i,o){o.1W(1a,[1A,1a,b,d])})};7(b.N!=b.1b){b.2h=1;7(b.20)b.20(1A,1a,b,e,d);Q 7($.2L($.E.B[b.1p]))$.E.B[b.1p](1A,1a,b,e);Q $.E.B.2k(1A,1a,b,e,c&&b.2Q)}7(b.1l){b.1b=b.N;7(++b.Z==a.L)b.Z=0;b.N=b.1q[b.Z]}Q{8 f=(b.N+1)==a.L;b.N=f?0:b.N+1;b.1b=f?a.L-1:b.N-1}7(b.1r)$.E.B.2r(b.1r,b.1b)}7(b.W&&!b.1x)p.S=1Y(4(){1j(a,b,0,!b.1y)},b.W);Q 7(b.1x&&p.1g)p.S=1Y(4(){1j(a,b,0,!b.1y)},10)};$.E.B.2r=4(a,b){$(a).3E(\'a\').3F(\'2R\').2j(\'a:2l(\'+b+\')\').3G(\'2R\')};4 1O(a,b,c){8 p=b.1w,W=p.S;7(W){1v(W);p.S=0}7(b.1l&&c<0){b.Z--;7(--b.Z==-2)b.Z=a.L-2;Q 7(b.Z==-1)b.Z=a.L-1;b.N=b.1q[b.Z]}Q 7(b.1l){7(++b.Z==a.L)b.Z=0;b.N=b.1q[b.Z]}Q{b.N=b.1b+c;7(b.N<0){7(b.1Z)O 21;b.N=a.L-1}Q 7(b.N>=a.L){7(b.1Z)O 21;b.N=0}}7(b.22&&1X b.22==\'4\')b.22(c>0,b.N,a[b.N]);1j(a,b,1,c>=0);O 21};4 2N(a,b){8 c=$(b.1r);$.1s(a,4(i,o){$.E.B.2p(i,o,c,a,b)});$.E.B.2r(b.1r,b.18)};$.E.B.2p=4(i,a,b,c,d){8 e=(1X d.2s==\'4\')?$(d.2s(i,a)):$(\'<a 3H="#">\'+(i+1)+\'</a>\');7(e.3I(\'3J\').L==0)e.2O(b);e.2n(d.2S,4(){d.N=i;8 p=d.1w,W=p.S;7(W){1v(W);p.S=0}7(1X d.2t==\'4\')d.2t(d.N,c[d.N]);1j(c,d,1,d.1b<i);O 21});7(d.2T)e.2K(4(){d.1w.1g=1},4(){d.1w.1g=0})};4 2i(b){4 23(s){8 s=T(s).3K(16);O s.L<2?\'0\'+s:s};4 2U(e){1I(;e&&e.3L.3M()!=\'3N\';e=e.3O){8 v=$.u(e,\'2V-2W\');7(v.3P(\'3Q\')>=0){8 a=v.1H(/\\d+/g);O\'#\'+23(a[0])+23(a[1])+23(a[2])}7(v&&v!=\'3R\')O v}O\'#3S\'};b.1s(4(){$(x).u(\'2V-2W\',2U(x))})};$.E.B.2k=4(a,b,c,d,e){8 f=$(a),$n=$(b);$n.u(c.A);8 g=e?1:c.1z;8 h=e?1:c.1J;8 i=e?P:c.1U;8 j=e?P:c.1V;8 k=4(){$n.24(c.I,g,i,d)};f.24(c.G,h,j,4(){7(c.K)f.u(c.K);7(!c.1T)k()});7(c.1T)k()};$.E.B.M={2X:4(b,c,d){c.1o(\':2l(\'+d.18+\')\').u(\'1h\',0);d.H.J(4(){$(x).V()});d.I={1h:1};d.G={1h:0};d.A={1h:0};d.K={R:\'Y\'};d.X=4(a){a.U()}}};$.E.B.3T=4(){O q};$.E.B.2E={1p:\'2X\',W:3U,1x:0,19:3V,1z:P,1J:P,1a:P,2o:P,22:P,1r:P,2t:P,2S:\'1K\',2s:P,H:P,1k:P,2q:P,2m:P,1U:P,1V:P,1L:P,I:P,G:P,A:P,K:P,20:P,C:\'1S\',18:0,1T:1,1l:0,1m:0,2b:0,2T:0,2e:0,2g:0,2P:0,2d:P,1Q:0,1Z:0,2Q:0}})(2Y);(4($){$.E.B.M.3W=4(d,e,f){d.u(\'17\',\'1d\');f.H.J(4(a,b,c){$(x).V();c.A.y=b.1B;c.G.y=0-a.1B});f.1f={y:0};f.I={y:0};f.K={R:\'Y\'}};$.E.B.M.3X=4(d,e,f){d.u(\'17\',\'1d\');f.H.J(4(a,b,c){$(x).V();c.A.y=0-b.1B;c.G.y=a.1B});f.1f={y:0};f.I={y:0};f.K={R:\'Y\'}};$.E.B.M.3Y=4(d,e,f){d.u(\'17\',\'1d\');f.H.J(4(a,b,c){$(x).V();c.A.9=b.1C;c.G.9=0-a.1C});f.1f={9:0};f.I={9:0}};$.E.B.M.3Z=4(d,e,f){d.u(\'17\',\'1d\');f.H.J(4(a,b,c){$(x).V();c.A.9=0-b.1C;c.G.9=a.1C});f.1f={9:0};f.I={9:0}};$.E.B.M.40=4(f,g,h){f.u(\'17\',\'1d\').D();h.H.J(4(a,b,c,d){$(x).V();8 e=a.1C,2u=b.1C;c.A=d?{9:2u}:{9:-2u};c.I.9=0;c.G.9=d?-e:e;g.1o(a).u(c.A)});h.1f={9:0};h.K={R:\'Y\'}};$.E.B.M.41=4(f,g,h){f.u(\'17\',\'1d\');h.H.J(4(a,b,c,d){$(x).V();8 e=a.1B,2v=b.1B;c.A=d?{y:-2v}:{y:2v};c.I.y=0;c.G.y=d?e:-e;g.1o(a).u(c.A)});h.1f={y:0};h.K={R:\'Y\'}};$.E.B.M.42=4(d,e,f){f.H.J(4(a,b,c){$(a).u(\'F\',1)});f.X=4(a){a.U()};f.A={F:2};f.I={D:\'V\'};f.G={D:\'U\'}};$.E.B.M.43=4(d,e,f){f.H.J(4(a,b,c){$(a).u(\'F\',1)});f.X=4(a){a.U()};f.A={F:2};f.I={C:\'V\'};f.G={C:\'U\'}};$.E.B.M.1L=4(g,h,j){8 w=g.u(\'17\',\'2Z\').D();h.u({9:0,y:0});j.H.J(4(){$(x).V()});j.19=j.19/2;j.1l=0;j.1L=j.1L||{9:-w,y:15};j.1c=[];1I(8 i=0;i<h.L;i++)j.1c.J(h[i]);1I(8 i=0;i<j.18;i++)j.1c.J(j.1c.31());j.20=4(a,b,c,d,e){8 f=e?$(a):$(b);f.24(c.1L,c.1z,c.1U,4(){e?c.1c.J(c.1c.31()):c.1c.1P(c.1c.44());7(e)1I(8 i=0,2w=c.1c.L;i<2w;i++)$(c.1c[i]).u(\'z-1G\',2w-i);Q{8 z=$(a).u(\'z-1G\');f.u(\'z-1G\',T(z)+1)}f.24({9:0,y:0},c.1J,c.1V,4(){$(e?x:a).U();7(d)d()})})};j.X=4(a){a.U()}};$.E.B.M.45=4(d,e,f){f.H.J(4(a,b,c){$(x).V();c.A.y=b.11;c.I.C=b.11});f.X=4(a){a.U()};f.1f={y:0};f.A={C:0};f.I={y:0};f.G={C:0};f.K={R:\'Y\'}};$.E.B.M.46=4(d,e,f){f.H.J(4(a,b,c){$(x).V();c.I.C=b.11;c.G.y=a.11});f.X=4(a){a.U()};f.1f={y:0};f.A={y:0,C:0};f.G={C:0};f.K={R:\'Y\'}};$.E.B.M.47=4(d,e,f){f.H.J(4(a,b,c){$(x).V();c.A.9=b.12;c.I.D=b.12});f.X=4(a){a.U()};f.A={D:0};f.I={9:0};f.G={D:0};f.K={R:\'Y\'}};$.E.B.M.48=4(d,e,f){f.H.J(4(a,b,c){$(x).V();c.I.D=b.12;c.G.9=a.12});f.X=4(a){a.U()};f.A={9:0,D:0};f.I={9:0};f.G={D:0};f.K={R:\'Y\'}};$.E.B.M.32=4(d,e,f){f.1f={y:0,9:0};f.K={R:\'Y\'};f.H.J(4(a,b,c){$(x).V();c.A={D:0,C:0,y:b.11/2,9:b.12/2};c.K={R:\'Y\'};c.I={y:0,9:0,D:b.12,C:b.11};c.G={D:0,C:0,y:a.11/2,9:a.12/2};$(a).u(\'F\',2);$(b).u(\'F\',1)});f.X=4(a){a.U()}};$.E.B.M.49=4(d,e,f){f.H.J(4(a,b,c){c.A={D:0,C:0,1h:1,9:b.12/2,y:b.11/2,F:1};c.I={y:0,9:0,D:b.12,C:b.11}});f.G={1h:0};f.K={F:0}};$.E.B.M.4a=4(d,e,f){8 w=d.u(\'17\',\'1d\').D();e.V();f.H.J(4(a,b,c){$(a).u(\'F\',1)});f.A={9:w,F:2};f.K={F:1};f.I={9:0};f.G={9:w}};$.E.B.M.4b=4(d,e,f){8 h=d.u(\'17\',\'1d\').C();e.V();f.H.J(4(a,b,c){$(a).u(\'F\',1)});f.A={y:h,F:2};f.K={F:1};f.I={y:0};f.G={y:h}};$.E.B.M.4c=4(d,e,f){8 h=d.u(\'17\',\'1d\').C();8 w=d.D();e.V();f.H.J(4(a,b,c){$(a).u(\'F\',1)});f.A={y:h,9:w,F:2};f.K={F:1};f.I={y:0,9:0};f.G={y:h,9:w}};$.E.B.M.4d=4(d,e,f){f.H.J(4(a,b,c){c.A={9:x.12/2,D:0,F:2};c.I={9:0,D:x.12};c.G={9:0};$(a).u(\'F\',1)});f.X=4(a){a.U().u(\'F\',1)}};$.E.B.M.4e=4(d,e,f){f.H.J(4(a,b,c){c.A={y:x.11/2,C:0,F:2};c.I={y:0,C:x.11};c.G={y:0};$(a).u(\'F\',1)});f.X=4(a){a.U().u(\'F\',1)}};$.E.B.M.4f=4(d,e,f){f.H.J(4(a,b,c){c.A={9:b.12/2,D:0,F:1,R:\'1D\'};c.I={9:0,D:x.12};c.G={9:a.12/2,D:0};$(a).u(\'F\',2)});f.X=4(a){a.U()};f.K={F:1,R:\'Y\'}};$.E.B.M.4g=4(d,e,f){f.H.J(4(a,b,c){c.A={y:b.11/2,C:0,F:1,R:\'1D\'};c.I={y:0,C:x.11};c.G={y:a.11/2,C:0};$(a).u(\'F\',2)});f.X=4(a){a.U()};f.K={F:1,R:\'Y\'}};$.E.B.M.4h=4(e,f,g){8 d=g.33||\'9\';8 w=e.u(\'17\',\'1d\').D();8 h=e.C();g.H.J(4(a,b,c){c.A=c.A||{};c.A.F=2;c.A.R=\'1D\';7(d==\'34\')c.A.9=-w;Q 7(d==\'35\')c.A.y=h;Q 7(d==\'36\')c.A.y=-h;Q c.A.9=w;$(a).u(\'F\',1)});7(!g.I)g.I={9:0,y:0};7(!g.G)g.G={9:0,y:0};g.K=g.K||{};g.K.F=2;g.K.R=\'Y\'};$.E.B.M.4i=4(e,f,g){8 d=g.33||\'9\';8 w=e.u(\'17\',\'1d\').D();8 h=e.C();g.H.J(4(a,b,c){c.A.R=\'1D\';7(d==\'34\')c.G.9=w;Q 7(d==\'35\')c.G.y=-h;Q 7(d==\'36\')c.G.y=h;Q c.G.9=-w;$(a).u(\'F\',2);$(b).u(\'F\',1)});g.X=4(a){a.U()};7(!g.I)g.I={9:0,y:0};g.A=g.A||{};g.A.y=0;g.A.9=0;g.K=g.K||{};g.K.F=1;g.K.R=\'Y\'};$.E.B.M.4j=4(d,e,f){8 w=d.u(\'17\',\'2Z\').D();8 h=d.C();f.H.J(4(a,b,c){$(a).u(\'F\',2);c.A.R=\'1D\';7(!c.G.9&&!c.G.y)c.G={9:w*2,y:-h/2,1h:0};Q c.G.1h=0});f.X=4(a){a.U()};f.A={9:0,y:0,F:1,1h:1};f.I={9:0};f.K={F:2,R:\'Y\'}};$.E.B.M.4k=4(o,p,q){8 w=o.u(\'17\',\'1d\').D();8 h=o.C();q.A=q.A||{};8 s;7(q.1i){7(/4l/.1u(q.1i))s=\'1t(1e 1e \'+h+\'14 1e)\';Q 7(/4m/.1u(q.1i))s=\'1t(1e \'+w+\'14 \'+h+\'14 \'+w+\'14)\';Q 7(/4n/.1u(q.1i))s=\'1t(1e \'+w+\'14 1e 1e)\';Q 7(/4o/.1u(q.1i))s=\'1t(\'+h+\'14 \'+w+\'14 \'+h+\'14 1e)\';Q 7(/32/.1u(q.1i)){8 t=T(h/2);8 l=T(w/2);s=\'1t(\'+t+\'14 \'+l+\'14 \'+t+\'14 \'+l+\'14)\'}}q.A.1i=q.A.1i||s||\'1t(1e 1e 1e 1e)\';8 d=q.A.1i.1H(/(\\d+)/g);8 t=T(d[0]),r=T(d[1]),b=T(d[2]),l=T(d[3]);q.H.J(4(g,i,j){7(g==i)O;8 k=$(g).u(\'F\',2);8 m=$(i).u({F:3,R:\'1D\'});8 n=1,1E=T((j.1z/13))-1;4 f(){8 a=t?t-T(n*(t/1E)):0;8 c=l?l-T(n*(l/1E)):0;8 d=b<h?b+T(n*((h-b)/1E||1)):h;8 e=r<w?r+T(n*((w-r)/1E||1)):w;m.u({1i:\'1t(\'+a+\'14 \'+e+\'14 \'+d+\'14 \'+c+\'14)\'});(n++<=1E)?1Y(f,13):k.u(\'R\',\'Y\')}f()});q.K={};q.I={9:0};q.G={9:0}}})(2Y);',62,273,'||||function|||if|var|left|||||||||||||||||||||css|||this|top||cssBefore|cycle|height|width|fn|zIndex|animOut|before|animIn|push|cssAfter|length|transitions|nextSlide|return|null|else|display|cycleTimeout|parseInt|hide|show|timeout|onAddSlide|none|randomIndex||cycleH|cycleW||px|||overflow|startingSlide|speed|next|currSlide|els|hidden|0px|cssFirst|cyclePause|opacity|clip|go|after|random|fit|log|not|fx|randomMap|pager|each|rect|test|clearTimeout|container|continuous|rev|speedIn|curr|offsetHeight|offsetWidth|block|count|data|index|match|for|speedOut|click|shuffle|opts|elements|advance|unshift|cleartype|position|auto|sync|easeIn|easeOut|apply|typeof|setTimeout|nowrap|fxFn|false|prevNextClick|hex|animate|browser|msie|window|console|constructor|case|pause|true|slideExpr|autostop|countdown|autostopCount|busy|clearTypeFix|filter|custom|eq|easing|bind|prev|createPagerAnchor|end|updateActivePagerLink|pagerAnchorBuilder|pagerClick|nextW|nextH|len|arguments|String|resume|options|found|can|slide|defaults|metadata|cleartypeNoBg|absolute|style|removeAttribute|hover|isFunction|slideCount|buildPager|appendTo|delay|fastOnEvent|activeSlide|pagerEvent|pauseOnPagerHover|getBg|background|color|fade|jQuery|visible||shift|zoom|direction|right|up|down|MSIE|navigator|userAgent|Array|prototype|join|call|undefined|switch|stop|default|Number|invalid|children|get|terminating|too|few|slides|extend|meta|className|static|relative|sort|Math|unknown|transition|speeds|while|250|addSlide|prependTo|find|removeClass|addClass|href|parents|body|toString|nodeName|toLowerCase|html|parentNode|indexOf|rgb|transparent|ffffff|ver|4000|1000|scrollUp|scrollDown|scrollLeft|scrollRight|scrollHorz|scrollVert|slideX|slideY|pop|turnUp|turnDown|turnLeft|turnRight|fadeZoom|blindX|blindY|blindZ|growX|growY|curtainX|curtainY|cover|uncover|toss|wipe|l2r|r2l|t2b|b2t'.split('|'),0,{}));
/*
 * jQuery Field Plug-in
 *
 * Copyright (c) 2007 Dan G. Switzer, II
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: 14
 * Version: 0.9.2
 *
 * NOTES: The getValue() and setValue() methods are designed to be
 * executed on single field (i.e. any field that would share the same
 * "name" attribute--a single text box, a group of checkboxes or radio
 * elements, etc.)
 *
 * Revision History
 * v0.9.2
 * - Fixed code for jQuery v1.3.x support
 * - Fixed bug #6333 - setValue when value is typeof "number" and it is 0 (zero)
 * - Fixed bug in autoAdvance where it wasn't correctly advancing to the next field
 * - Fixed bug in createCheckboxRange where it where the high value wouldn't always
 *   be unchecked/checked
 * 
 * v0.9.1
 * - Optimized the createCheckboxRange to reduced complexity and code size.
 *   Functionality has not changed.
 * 
 * v0.9
 * - Removed createCheckboxRange custom event, this fixes problems with
 *   older jQuery versions that have problems with the trigger
 * - Changed the limitSelection() function to use an options argument, 
 *   instead of all the individual arguments
 * 
 * v0.8.1
 * - createCheckboxRange() no longer breaks the chain
 * - Added callback to createCheckboxRange() (the trigger() method 
 *   does not execute correctly in jQuery v1.1.2, so this functionality 
 *   doesn't work in that version.)
 * - Added configurable setting for the [SHIFT] key bind to the 
 *   createCheckboxRange().
 * - Added the $.Field.setProperty() and getProperty() methods
 * 
 * v0.8
 * - Fixed "bug in checkbox range" (http://plugins.jquery.com/node/1642)
 * - Fixed "Bug when setting value on a select element and the select is empty"
 *   (http://plugins.jquery.com/node/1281)
 *
 * v0.7.1
 * - Changed a comma in code to a semi-colon in a variable definition line
 * - Fixed code to work in min mode
 * - Fixed bug in hashForm() that would not see struct keys with empty values
 *
 * v0.7
 * - Added tabIndex related function (getTabIndex, moveNext, movePrev, moveIndex)
 *
 * v0.6
 * - Fixed bug in the $.formHash() where the arrayed form elements would
 *   not correctly report their values.
 * - Added the $.createCheckboxRange() which allow you to select multiple
 *   checkbox elements by doing a [SHIFT] + click.
 *
 * v0.5
 * - Added $.limitSelection() method for limiting the number of
 *   selection in a select-multiple of checkbox array.
 *
 * v0.4.1
 * - Moved $.type and $.isType into private functions
 * - Rewrote $type() function to use instanceof operator
 *
 * v0.4
 * - Added the formHash() method
 *
 * v0.3
 * - First public release
 *
*/
(function($){

	// set the defaults
	var defaults = {
		// use a comma as the string delimiter
		delimiter: ",",
		// the default key binding to check for when using the createCheckboxRange()
		checkboxRangeKeyBinding: "shiftKey",
		// for methods that could return either a string or array, decide default behavior
		useArray: false
	};

	// set default options
	$.Field = {
		version: "0.9.2",
		setDefaults: function(options){
			$.extend(defaults, options);
		},
		setProperty: function(prop, value){
			defaults[prop] = value;
		},
		getProperty: function(prop){
			return defaults[prop];
		}
	};


	/*
	 * jQuery.fn.fieldArray()
	 *
	 * returns either an array of values or a jQuery object
	 *
	 * NOTE: This *MAY* break the jQuery chain
	 *
	 * Examples:
	 * $("input[name='name']").fieldArray();
	 * > Gets the current value of the name text element
	 *
	 * $("input[name='name']").fieldArray(["Dan G. Switzer, II"]);
	 * > Sets the value of the name text element to "Dan G. Switzer, II"
	 *
	 * $("select[name='state']").fieldArray();
	 * > Gets the current value of the state text element
	 *
	 * $("select[name='state']").setValue(["OH","NY","CA"]);
	 * > Sets the selected value of the "state" select element to OH, NY and CA
	 *
	 */
	// this will set/get the values for a field based upon and array
	$.fn.fieldArray = function(v){
		var t = $type(v);

		// if no value supplied, return an array of values
		if( t == "undefined" ) return getValue(this);

		// convert the number/string into an array
		if( t == "string" ||  t == "number" ){
			v = v.toString().split(defaults.delimiter);
			t = "array";
		}

		// set the value -- doesn't break the chaing
		if( t == "array" ) return setValue(this, v);

		// if we don't know what do to, don't break the chain
		return this;
	};

	/*
	 * jQuery.fn.getValue()
	 *
	 * returns String - a comma delimited list of values for the field
	 *
	 * NOTE: Breaks the jQuery chain, since it returns a string.
	 *
	 * Examples:
	 * $("input[name='name']").getValue();
	 * > This would return the value of the name text element
	 *
	 * $("select[name='state']").getValue();
	 * > This would return the currently selected value of the "state" select element
	 *
	 */
	// the getValue() method -- break the chain
	$.fn.getValue = function(){
		// return the values as a comma-delimited string
		return getValue(this).join(defaults.delimiter);
	};

	/*
	 * getValue()
	 *
	 * returns Array - an array of values for the field
	 *
	 */
	// the getValue() method -- break the chain
	var getValue = function(jq){
		var v = [];

		jq.each(
			function (lc){
				// get the current type
				var t = getType(this);

				switch( t ){
					case "checkbox": case "radio":
						// if the checkbox or radio element is checked
						if( this.checked ) v.push(this.value);
					break;

					case "select":
						if( this.type == "select-one" ){
							v.push( (this.selectedIndex == -1) ? "" : getOptionVal(this[this.selectedIndex]) );
						} else {
							// loop through all element in the array for this field
							for( var i=0; i < this.length; i++ ){
								// if the element is selected, get the selected values
								if( this[i].selected ){
									// append the selected value, if the value property doesn't exist, use the text
									v.push(getOptionVal(this[i]));
								}
							}
						}
					break;

					case "text":
						v.push(this.value);
					break;
				}
			}
		);

		// return the values as an array
		return v;
	};

	/*
	 * setValue()
	 *
	 * returns jQuery object
	 *
	 * NOTE: This does *NOT* break the jQuery chain
	 *
	 * Examples:
	 * $("input[name='name']").setValue("Dan G. Switzer, II");
	 * > Sets the value of the name text element to "Dan G. Switzer, II"
	 *
	 * $("select[name='state']").setValue("OH");
	 * > Sets the selected value of the "state" select element to "OH"
	 *
	 */
	// the setValue() method -- does *not* break the chain
	$.fn.setValue = function(v){
		// f no value, set to empty string
		return setValue(this, ((!v && (v !== 0)) ? [""] : v.toString().split(defaults.delimiter)));
	};

	/*
	 * setValue()
	 *
	 * returns jQuery object
	 *
	 */
	// the setValue() method -- does *not* break the chain
	var setValue = function(jq, v){
		jq.each(
			function (lc){
				var t = getType(this), x;

				switch( t ){
					case "checkbox": case "radio":
						if( valueExists(v, this.value) ) this.checked = true;
						else this.checked = false;
					break;

					case "select":
						var bSelectOne = (this.type == "select-one");
						var bKeepLooking = true; // if select-one type, then only select the first value found
						// loop through all element in the array for this field
						for( var i=0; i < this.length; i++ ){
							x = getOptionVal(this[i]);
							bSelectItem = valueExists(v, x);
							if( bSelectItem ){
								this[i].selected = true;
								// if a select-one element
								if( bSelectOne ){
									// no need to look farther
									bKeepLooking = false;
									// stop the loop
									break;
								}
							} else if( !bSelectOne ) this[i].selected = false;
						}
						// if a select-one box and nothing selected, then try to select the default value
						if( bSelectOne && bKeepLooking && !!this[0] ){
							this[0].selected = true;
						}
					break;

					case "text":
						this.value = v.join(defaults.delimiter);
					break;
				}

			}
		);

		return jq;
	};

	/*
	 * jQuery.fn.formHash()
	 *
	 * returns either an hash table of form fields or a jQuery object
	 *
	 * NOTE: This *MAY* break the jQuery chain
	 *
	 * Examples:
	 * $("#formName").formHash();
	 * > Returns a hash map of all the form fields and their values
	 *
	 * $("#formName").formHash({"name": "Dan G. Switzer, II", "state": "OH"});
	 * > Returns the jQuery chain and sets the fields "name" and "state" with
	 * > the values "Dan G. Switzer, II" and "OH" respectively.
	 *
	 */
	// the formHash() method -- break the chain
	$.fn.formHash = function(inHash){
		var bGetHash = (arguments.length == 0);
		// create a hash to return
		var stHash = {};

		// run the code for each form
		this.filter("form").each(
			function (){
				// get all the form elements
				var els = this.elements, el, n, stProcessed = {}, jel;

				// loop through the elements and process
				for( var i=0, elsMax = els.length; i < elsMax; i++ ){
					el = els[i]; 
					n = el.name;

					// if the element doesn't have a name, then skip it
					if( !n || stProcessed[n] ) continue;

					// create a jquery object to the current named form elements
					var jel = $(el.tagName.toLowerCase() + "[name='"+n+"']", this);

					// if we're getting the values, get them now
					if( bGetHash ){
						stHash[n] = jel[defaults.useArray ? "fieldArray" : "getValue"]();
					// if we're setting values, set them now
					} else if( typeof inHash[n] != "undefined" ){
						jel[defaults.useArray ? "fieldArray" : "setValue"](inHash[n]);
					}

					stProcessed[n] = true;
				}
			}
		);

		// if getting a hash map return it, otherwise return the jQuery object
		return (bGetHash) ? stHash : this;
	};

	/*
	 * jQuery.fn.autoAdvance()
	 *
	 * Finds all text-based input fields and makes them autoadvance to the next
	 * fields when they've met their maxlength property.
	 *
	 *
	 * Examples:
	 * $("#form").autoAdvance();
	 * > When a field reaches it's maxlength attribute value, it'll advance to the
	 * > next field in the form's tabindex.
	 *
	 * $("#form").autoAdvance(callback);
	 * > Automatic advances to next field and triggers the callback function on the
	 * > field the user left.
	 *
	 */
	// the autoAdvance() method
	$.fn.autoAdvance = function(callback){
		return this.find(":text,:password,textarea").bind(
			"keyup.autoAdvance",
			function (e){
				var
					// get the field
					$field = $(this),
					// get the maxlength for the field
					iMaxLength = parseInt($field.attr("maxlength"), 10);

				// if the user tabs to the field, exit event handler
				// this will prevent movement if the field is already
				// field in with the max number of characters
				if( isNaN(iMaxLength) || ("|9|16|37|38|39|40|".indexOf("|" + e.keyCode + "|") > -1) ) return true;

				// if the value of the field is greater than maxlength attribute,
				// then move the focus to the next field
				if( $field.getValue().length >= $field.attr("maxlength") ){
					// move to the next field and select the existing value
					var $next = $field.moveNext().select();
					if( $.isFunction(callback) ) callback.apply($field, [$next]);
				}
			}
		);
	};

	/*
	 * jQuery.fn.moveNext()
	 *
	 * places the focus in the next form field. if the field element is
	 * the last in the form array, it'll return to the top.
	 *
	 * returns a jQuery object pointing to the next field element
	 *
	 * NOTE: if the selector returns multiple items, the first item is used.
	 *
	 *
	 * Examples:
	 * $("#firstName").moveNext();
	 * > Moves the focus to the next form field found after firstName
	 *
	 */
	// the moveNext() method
	$.fn.moveNext = function(){
		return this.moveIndex("next");
	};

	/*
	 * jQuery.fn.movePrev()
	 *
	 * places the focus in the previous form field. if the field element is
	 * the first in the form array, it'll return to the last element.
	 *
	 * returns a jQuery object pointing to the previos field element
	 *
	 * NOTE: if the selector returns multiple items, the first item is used
	 *
	 * Examples:
	 * $("#firstName").movePrev();
	 * > Moves the focus to the next form field found after firstName
	 *
	 */
	// the movePrev() method
	$.fn.movePrev = function(){
		return this.moveIndex("prev");
	};

	/*
	 * jQuery.fn.moveIndex()
	 *
	 * Places the tab index into the specified index position
	 *
	 * returns a jQuery object pointing to the previos field element
	 *
	 * NOTE: if the selector returns multiple items, the first item is used
	 *
	 * Examples:
	 * $("#firstName").movePrev();
	 * > Moves the focus to the next form field found after firstName
	 *
	 */
	// the moveIndex() method
	$.fn.moveIndex = function(i){
		// get the current position and elements
		var aPos = getFieldPosition(this);

		// if a string option has been specified, calculate the position
		if( i == "next" ) i = aPos[0] + 1; // get the next item
		else if( i == "prev" ) i = aPos[0] - 1; // get the previous item

		// make sure the index position is within the bounds of the elements array
		if( i < 0 ) i = aPos[1].length - 1;
		else if( i >= aPos[1].length ) i = 0;

		return $(aPos[1][i]).trigger("focus");
	};

	/*
	 * jQuery.fn.getTabIndex()
	 *
	 * gets the current tab index of the first element found in the selector
	 *
	 * NOTE: if the selector returns multiple items, the first item is used
	 *
	 * Examples:
	 * $("#firstName").getTabIndex();
	 * > Gets the tabIndex for the firstName field
	 *
	 */
	// the getTabIndex() method
	$.fn.getTabIndex = function(){
		// return the position of the form field
		return getFieldPosition(this)[0];
	};

	var getFieldPosition = function (jq){
		var
			// get the first matching field
			$field = jq.filter("input, select, textarea").get(0),
			// store items with a tabindex
			aTabIndex = [],
			// store items with no tabindex
			aPosIndex = [];

		// if there is no match, return 0
		if( !$field ) return [-1, []];

		// make a single pass thru all form elements
		$.each(
			$field.form.elements,
			function (i, o){
				if( o.tagName != "FIELDSET" && !o.disabled ){
					if( o.tabIndex > 0 ){
						aTabIndex.push(o);
					} else {
						aPosIndex.push(o);
					}
				}
			}
		);

		// sort the fields that had tab indexes
		aTabIndex.sort(
			function (a, b){
				return a.tabIndex - b.tabIndex;
			}
		);

		// merge the elements to create the correct tab position
		aTabIndex = $.merge(aTabIndex, aPosIndex);

		for( var i=0; i < aTabIndex.length; i++ ){
			if( aTabIndex[i] == $field ) return [i, aTabIndex];
		}

		return [-1, aTabIndex];
	};

	/*
	 * jQuery.fn.limitSelection()
	 *
	 * limits the number of items that can be selected
	 *
	 * Examples:
	 * $("input:checkbox").limitSelection(3);
	 * > No more than 3 items can be selected
	 *
	 * $("input:checkbox").limitSelection(2, {onsuccess: function (), onfailure: function ()});
	 * > Limits the selection to 2 items and runs the callback function when
	 * > more than 2 items have been selected.
	 *
	 * NOTE: Current when a "select-multiple" option undoes the selection,
	 * it selects the first 3 options in the array--which isn't necessarily
	 * the first 3 options the user selected. This is not the most desired
	 * behavior.
	 *
	 */
	$.fn.limitSelection = function(limit, options){
		// get the options to use
		var opt = jQuery.extend(
			(limit && limit.constructor == Object ? limit : {
					limit: limit
				, onsuccess: function (limit){ return true; }
				, onfailure: function (limit){ alert("You can only select a maximum a of " + limit + " items."); return false; }
			})
			, options);
		
		var self = this;

		var getCount = function (el){
			if( el.type == "select-multiple" ) return $("option:selected", self).length;
			else if( el.type == "checkbox" ) return self.filter(":checked").length;
			return 0;
		};

		var undoSelect = function (){
			// reduce selection to n items
			setValue(self, getValue(self).slice(0, opt.limit));
			// do callback
			return opt.onfailure.apply(self, [opt.limit]);
		};

		return this.bind(
			(!!self[0] && self[0].type == "select-multiple") ? "change.limitSelection" : "click.limitSelection",
			function (){
				if( getCount(this) > opt.limit ){
					// run callback, it must return false to prevent action
					return (this.type == "select-multiple") ? undoSelect() : opt.onfailure.apply(self, [opt.limit]);
				}
				opt.onsuccess.apply(self, [opt.limit]);
				return true;
			}
		);
	};

	/*
	 * jQuery.fn.createCheckboxRange()
	 *
	 * limits the number of items that can be selected
	 *
	 * Examples:
	 * $("input:checkbox").createCheckboxRange();
	 * > Allows a [SHIFT] + mouseclick to select all the items from the last
	 * > checked checkmark to the current checkbox.
	 *
	 * $("input:checkbox").createCheckboxRange(callback);
	 * > Runs the callback method for each item who's checked status changes.
	 * > This allows you to build hooks to highlight rows.
	 *
	 */
	$.fn.createCheckboxRange = function(callback){
		// get the options to use
		var opt = jQuery.extend(
			(callback && callback.constructor == Object ? callback : {
					bind: defaults.checkboxRangeKeyBinding
				, onclick: callback
			})
			, callback);

		var iLastSelection = 0, self = this, bCallback = $.isFunction(opt.onclick);

		// if there's a call back, bind it now and run it
		if( bCallback ) 
			this.each(function (){opt.onclick.apply(this, [$(this).is(":checked")])});
		
		// loop through each checkbox and return the jQuery object
		return this.each(
			function (){
				// only perform this action on checkboxes
				if( this.type != "checkbox" ) return false;
				var el = this;

				var updateLastCheckbox = function (e){
					iLastSelection = self.index(e.target);
				};

				var checkboxClicked = function (e){
					var bSetChecked = this.checked, current = self.index(e.target), low = Math.min(iLastSelection, current), high = Math.max(iLastSelection+1, current);
					// run the callback for the clicked item
					if( bCallback ) $(this).each(function (){opt.onclick.apply(this, [bSetChecked])});
					// if we don't detect the keypress, exit function
					if( !e[opt.bind] ) return;
					
					// loop through the items in the selected range
					for( var i=low; i < high; i++ ){
						// make sure to correctly set the checked status
						var item = self.eq(i).attr("checked", bSetChecked ? "checked" : "");
						// run the callback
						if( bCallback ) opt.onclick.apply(item[0], [bSetChecked]);
					}
					
					return true;
				};
				
				$(this)
					// unbind the events so we can re-run the createCheckboxRange() plug-in for dynamically created elements
					.unbind("click.createCheckboxRange")

					// bind the functions, we bind on blur for keyboard selected items
					.bind("click.createCheckboxRange", checkboxClicked)
					.bind("click.createCheckboxRange", updateLastCheckbox)
					;

				return true;
			}
		);
	};

	// determines how to process a field
	var getType = function (el){
		var t = el.type;

		switch( t ){
			case "select": case "select-one": case "select-multiple":
				t = "select";
				break;
			case "text": case "hidden": case "textarea": case "password": case "button": case "submit": case "submit":
				t = "text";
				break;
			case "checkbox": case "radio":
				t = t;
				break;
		}
		return t;
	};

	// gets the value of a select element
	var getOptionVal = function (el){
		 return jQuery.browser.msie && !(el.attributes['value'].specified) ? el.text : el.value;
	};

	// checks to see if a value exists in an array
	var valueExists = function (a, v){
		return ($.inArray(v, a) > -1);
	};

	// correctly gets the type of an object (including array/dates)
	var $type = function (o){
		var t = (typeof o).toLowerCase();

		if( t == "object" ){
			if( o instanceof Array ) t = "array";
	 		else if( o instanceof Date ) t = "date";
	 	}
	 	return t;
	};

	// checks to see if an object is the specified type
	var $isType = function (o, v){
		return ($type(o) == String(v).toLowerCase());
	};

})(jQuery);
// jquery.form.js

/*
 * jQuery Form Plugin
 * version: 2.17 (06-NOV-2008)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
;(function($) {

/*
    Usage Note:  
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });
        
    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.  
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting 
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location.toString(),
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }    
   
    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data) {
          if(options.data[n] instanceof Array) {
            for (var k in options.data[n])
              a.push( { name: n, value: options.data[n][k] } )
          }  
          else
             a.push( { name: n, value: options.data[n] } );
        }
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }    

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }    

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i].apply(options, [data, status, $form]);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

    // options.iframe allows user to force iframe mode
   if (options.iframe || found) { 
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if ($.browser.safari && options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];
        
        if ($(':input[name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }
        
        var opts = $.extend({}, $.ajaxSettings, options);
		var s = jQuery.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];

        if ($.browser.msie || $.browser.opera) 
            io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function() { 
                this.aborted = 1; 
                $io.attr('src','about:blank'); // abort op in progress
            }
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && jQuery.active--;
			return;
        }
        if (xhr.aborted)
            return;
        
        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');
            $form.attr({
                target:   id,
                method:   'POST',
                action:   opts.url
            });
            
            // ie borks in some cases when setting encoding
            if (! options.skipEncodingOverride) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);
            
                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                $form.attr('action', a);
                t ? $form.attr('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        function cb() {
            if (cbInvoked++) return;
            
            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var operaHack = 0;
            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                
                if (doc.body == null && !operaHack && $.browser.opera) {
                    // In Opera 9.2.x the iframe DOM is not always traversable when
                    // the onload callback fires so we give Opera 100ms to right itself
                    operaHack = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }
                
                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */ 
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) { 
    if (b == undefined) b = true;
    return this.each(function() { 
        this.disabled = !b 
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select == undefined) select = true;
    return this.each(function() { 
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);/**
 * History/Remote - jQuery plugin for enabling history support and bookmarking
 * @requires jQuery v1.0.3
 *
 * http://stilbuero.de/jquery/history/
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.2.3
 *
 * Updated - Rich Oswald
 * Removal of Hijax code.  Add call backs to server for history
 */

(function($) { // block scope

/**
 * Initialize the history manager. Subsequent calls will not result in additional history state change 
 * listeners. Should be called soonest when the DOM is ready, because in IE an iframe needs to be added
 * to the body to enable history support.
 *
 * @example $.ajaxHistory.initialize();
 *
 * @param Function callback A single function that will be executed in case there is no fragment
 *                          identifier in the URL, for example after navigating back to the initial
 *                          state. Use to restore such an initial application state.
 *                          Optional. If specified it will overwrite the default action of 
 *                          emptying all containers that are used to load content into.
 * @type undefined
 *
 * @name $.ajaxHistory.initialize()
 * @cat Plugins/History
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.ajaxHistory = new function() {

    var RESET_EVENT = 'historyReset';

    var _currentHash = '';
    var _intervalId = null;
    var _origQueryString = '';
    var _observeHistory; // define outside if/else required by Opera

    this.update = function() { }; // empty function body for graceful degradation
    
    this.updateBaseHash = function(oURL) {_origQueryString = oURL;  }; 

    // create custom event for state reset
    var _defaultReset = function() {
        $('.remote-output').empty();
    };
    $(document).bind(RESET_EVENT, _defaultReset);
    
  
    if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
    	// IE 8 supports the normal history logic
        var _historyIframe, initialized = false; // for IE
    		
        // add hidden iframe
        this.addHiddenFrame = function() {
            _historyIframe = $('<iframe style="display: none;"></iframe>').appendTo(document.body).get(0);
            var iframe = _historyIframe.contentWindow.document;
            // create initial history entry
            iframe.open();
            iframe.close();
            if (location.hash && location.hash != '#') {
            	iframe.location.hash = location.hash.replace('#', '');
            } else {
            	if (_origQueryString != ''){
            		iframe.location.hash = _origQueryString.replace('#', '');
				}
            	_currentHash = iframe.location.hash;
           	}
        };

        this.update = function(hash) {
            _currentHash = hash;
            if (_historyIframe == null) {              
            	_historyIframe = $('<iframe style="display: none;"></iframe>').appendTo(document.body).get(0);    
            }
            var iframe = _historyIframe.contentWindow.document;
            iframe.open();
            iframe.close();
            iframe.location.hash = hash;
          	location.hash = hash;
        };

        _observeHistory = function() {
        	var iframe = _historyIframe.contentWindow.document;
            var iframeHash = iframe.location.hash;            
                  
            if (iframeHash != _currentHash) {
            	_currentHash = iframeHash;
                
                if (iframeHash && iframeHash != '#') {
                    // order does matter, set location.hash after triggering the click...                   
                    $.ajaxHistory.callURLHistory("AJAXCatalogSearchResultCmd?"+_currentHash.replace('#', ''));
                }  else if (initialized) {
                    location.hash = '';                   
                    $.ajaxHistory.callURLHistory("AJAXCatalogSearchResultCmd?"+_origQueryString.replace('#', ''));
                    $(document).trigger(RESET_EVENT);
                }
            } 
            initialized = true;
        };

    } else if ($.browser.mozilla || $.browser.opera || $.browser.safari || $.browser.msie ) {

        this.update = function(hash) {
            _currentHash = hash;     
            location.hash = _currentHash;           
        };

        _observeHistory = function() {
            if (location.hash) {            	
                if (unescape(_currentHash) != unescape(location.hash)) {                	
                    _currentHash = location.hash;
                    $.ajaxHistory.callURLHistory("AJAXCatalogSearchResultCmd?"+_currentHash.replace('#', '')); 
                  	
                } 
            } else if (_currentHash) {
                _currentHash = '';
                $.ajaxHistory.callURLHistory("AJAXCatalogSearchResultCmd?"+_origQueryString.replace('#', ''));
                $(document).trigger(RESET_EVENT);
            }
           
        };

    } 

	this.initialize = function(callback) {
	    // custom callback to reset app state (no hash in url)
		if (typeof callback == 'function') {
		    $(document).unbind(RESET_EVENT, _defaultReset).bind(RESET_EVENT, callback);
		}
		if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
			$.ajaxHistory.addHiddenFrame();
		}         
		// look for hash in current URL (not Safari)
		// start observer
		if (_observeHistory && _intervalId == null) {
			_intervalId = setInterval(_observeHistory, 200); // Safari needs at least 200 ms
	    } 
	};
    
    /**
     * BEALLSPRO-72 - replacement object to fix the cases where
     * ampersand is located in a query parameter in the hash,
     * when this happens the parameters are incorrectly parsed because
     * the ampersand literally appears as a character in a value of a 
     * parameter, this object will replace the occurs in the
     * "filterValue" and "searchTerm".
     */
    this.ampReplacerObj = {

    	/*
    	 * filterValue variables (and categoryFilter, same pattern applies)
    	 */
		filterValuePattern1 : /(filterValue|categoryFilter)=\S+?\&\S+?(\=|$)/g,
		filterValueReplacePattern1 : /\+\&\+/g,
		filterValueReplaceWithText : '+%26+',
		
		/*
		 * search term fields
		 */
		searchTermPattern2 : /(searchTerm)=\S+?\&\S+?(\=|$)/g,
		searchTermReplacePatter2 : /\&/g,
		searchTermReplaceWithText : '%26',
		// search term skip string, when detected in category situation
		searchTermSkipIndexOfString : "searchTerm=&landingId=&landingIdType=",
		
		/**
		 * main replacement method
		 * 
		 * @input testString the string to perform replacement on
		 * @input excePattern the main matching pattern that will execute on the string and loop for more
		 * @input replacePattern the pattern to replace on in the matched text of the execPattern 
		 * @input replaceWithText the text to replace when running the replacePattern on the matched text
		 * @input lastIndexOfFn will replace the last index of a value if passed
		 * 
		 * @return the replaced string once the rules are applied
		 */
    	replacementFn : function(testString, execPattern, replacePattern, replaceWithText, lastIndexOfFn)	{
    		var matchedText1 = execPattern.exec(testString);
    		// matchedText1 will be null if nothing is matched
    		while(matchedText1 != null){
    			
    			if (! this.indexOfSearchTermEmptyStringFn(matchedText1[0])){
	        	    //console.log("matched:     %s",matchedText1[0]);
	        	    // replace the matched text 
	    			var replacementText = matchedText1[0].replace(replacePattern,replaceWithText);
	        	    //console.log("replacement: %s",replacementText);
	        	    
	        	    // if passed, replace the last index of the & back as an &, 
	        	    // because it got replaced in the match likely 
	        	    if ( lastIndexOfFn != undefined){ 
	        	    	replacementText = lastIndexOfFn(replacementText,"%26","&");
	        	    }
	        	    
	        	    if(replacementText != matchedText1[0]){
	        	        testString = testString.replace(matchedText1[0],replacementText);
	        	    } 
    			} else {
    				//console.log("index of empty search term text string has been found, leaving the matched text as is: %s", matchedText1[0]);
    			}
        	    
        	    matchedText1 = execPattern.exec(testString);
        	}
    		
    		return testString;
    	},
    	
    	replaceLastIndexOfFn : function(replacementText,lastIndexOfString,lastIndexOfPutBack){
    		var lstIdxAmp = replacementText.lastIndexOf(lastIndexOfString);
    	    
    	    if(lstIdxAmp != -1){
    	    	//console.log("last %26 position is: %s", lstIdxAmp);
    	    	var replacementHead = replacementText.substr(0,lstIdxAmp);
    	    	//console.log("replacement head: %s", replacementHead);
    	    	var replacementTail = replacementText.substr(lstIdxAmp + lastIndexOfString.length);
    	    	//console.log("replacement tail: %s", replacementTail);
    	    	
    	    	replacementText = replacementHead + lastIndexOfPutBack + replacementTail;
    	    	
    	    }
    	    
    	    return replacementText;
    	}, 
    	
    	/**
    	 * Determine if the input text is the skip text on the search term
    	 * 
    	 * The search term when submitted on the category page is empty, but 
    	 * the replacement match pattern matches. So we need to know when to leave it alone. 
    	 * 
    	 * For example, this would 
    	 * 
    	 * searchTerm=&landingId=&landingIdType=
    	 * 
    	 * turn into:
    	 * 
    	 * searchTerm=%26landingId&landingIdType=
    	 * 
    	 * The result will turn the searchTerm value as "&landingId"
    	 * 
    	 * @input inputText the text to check to the empty index of
    	 * @returns true when the index of the empty string is zero, false otherwise
    	 * 
    	 */
    	indexOfSearchTermEmptyStringFn : function(inputText){
    		return inputText.indexOf(this.searchTermSkipIndexOfString) == 0 ? true : false;
    	},
    	
    	/**
    	 * main calling function, does all the work on both terms
    	 * 
    	 * @input aUrl the input URL to replace on
    	 * @return the replaced string 
    	 */
    	mainFn : function(aUrl){
    		// replacement on the filter value, replacement index function is undefined, we dont need to put back the amp
    		aUrl = this.replacementFn(aUrl,this.filterValuePattern1,this.filterValueReplacePattern1,this.filterValueReplaceWithText,undefined);
    		// replacement on the search term
    		aUrl = this.replacementFn(aUrl,this.searchTermPattern2,this.searchTermReplacePatter2,this.searchTermReplaceWithText,this.replaceLastIndexOfFn);
    		
    		return aUrl;
    	}
    		
    };
    
    this.filterValuePlacementMemoryObj = {
    	pattern : /filterValue\=placement\:\S+?(\&|$)/,
    	
    	getPlacementFilterValueFromUrlFn : function(aUrl){
    		//console.log(aUrl);
    		var matchedText = this.pattern.exec(aUrl);
    		//console.log(matchedText[0]);
    		if(matchedText != undefined && matchedText != null){
    			var parts = matchedText[0].split("=",2);
    			//console.log("matched text array length: %s", parts.length);
    			return parts[1];
    		} else {
    			return undefined;
    		}
		}, 
		
		cleanValueForInputDomElementFn : function(placementFilterValue){
			
			placementFilterValue = placementFilterValue.replace(/\"/g,"&quot;");
			
			//console.log(placementFilterValue);
			//console.log(placementFilterValue.length);
			var lastIndexOf = placementFilterValue.lastIndexOf("&");
			//console.log(lastIndexOf);
			if( lastIndexOf == placementFilterValue.length - 1){
				placementFilterValue = placementFilterValue.substring(0,placementFilterValue.length - 1);
			}	
			//console.log(placementFilterValue.length);
			
			//console.log(placementFilterValue);
			placementFilterValue = placementFilterValue.replace(/\+\%26\+/g," & ");
			//console.log(placementFilterValue);
			
			//console.log(placementFilterValue);
			placementFilterValue = placementFilterValue.replace(/\+/g," ");
			//console.log(placementFilterValue);
			
			return placementFilterValue;
		},
		
		getInputFilterValueDomElementFn : function(placementFilterValue){
			
			/* model element: <input type="hidden" 
			 * 	value="placement:4|&amp;quot;BeallsFlorida.com|Leisure &amp; Sleepwear|Women's Leisure &amp; Sleepwear|Sleepwear&amp;quot;" 
			 * 	name="filterValue" 
			 * 	id="input-Placement-2" 
			 * 	disabled="disabled">
			 * 
			 */ 
			
			var inputDomElemt = $('<input/>');
			
			inputDomElemt.attr("type","hidden");
			inputDomElemt.attr("name","filterValue");
			inputDomElemt.attr("id","input-Placement-hash");
			inputDomElemt.attr("disbaled","disabled");
			inputDomElemt.attr("value",placementFilterValue);
			
			//console.log(inputDomElemt);
			
			return inputDomElemt;
		},
		
		mainFn : function(aUrl){
			var placementFilterValue = this.getPlacementFilterValueFromUrlFn(aUrl);
			//console.log(placementFilterValue);
			if(placementFilterValue != undefined){
				placementFilterValue = this.cleanValueForInputDomElementFn(placementFilterValue);
				//console.log(placementFilterValue);
				var inputDomElement = this.getInputFilterValueDomElementFn(placementFilterValue);
				// window.stateLastPlacementClicked is the global dom object to remember
				window.stateLastPlacementClicked = inputDomElement;
			}
			
		}
    };
    
	this.callURLHistory = function(aUrl)  {
			//perform this check to see if the url is invalid
			//reload the page if no storeId b/c user will get a 404 error
			//if the length is less than 5, it is an invalid url
				if (aUrl.indexOf("storeId") == -1 || aUrl.length < 33)
				{
					var qstr = $('#originalQueryString').html();

					if (qstr != undefined  &&  qstr != null)
					{
						while (qstr.indexOf("&amp;") > -1)
						{
							qstr = qstr.replace("&amp;","&");
						}
						aUrl = qstr;
					}
				}
			
				//call to server for history callback.
				if (aUrl != undefined && aUrl != null)
				{
					
					// BEALLSPRO-72 - fix the history page refresh
					aUrl = $.ajaxHistory.ampReplacerObj.mainFn(aUrl);
					
					// remember the placement filter value dom element for follow on clicks in the nav
					$.ajaxHistory.filterValuePlacementMemoryObj.mainFn(aUrl);
					
					//console.log("callURLHistory: calling history ajax via aUrl = %s",aUrl);
					blockSearchAreaForSearch();
					//call to server for history callback.
					$.ajax({
					    url: aUrl,
				        target:        '#category-area',   // target element(s) to be updated with server response 
				        beforeSubmit:  showRequest,  // pre-submit callback 
				        success:       showResponse,  // post-submit callback  
				        type:          'GET',      // 'get' or 'post', override for form's 'method' attribute 
				        timeout:       30000,
				        dataType:		'json',
				        contentType: 	'application/json',
				        cache:         false,
				        error: function(xhr, status, error) {
				        	$("#category-area").unblock();
				        }
					
					});
				}
				
	}
	
	
};



})(jQuery);

/*
var logger;
$(function() {
    logger = $('<div style="position: fixed; top: 0; overflow: hidden; border: 1px solid; padding: 3px; width: 120px; height: 150px; background: #fff; color: red;"></div>').appendTo(document.body);
});
function log(m) {    
    logger.prepend(m + '<br />');
};
*/

/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob, param, currObject, showInMilliSecs, closeLayerMilliSecs) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( param && param == 'customEventCompare' ) 
			{
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				cfg.over.apply(ob,[ev]);
				currObject.trigger('mouseout', ['customEvent' , currObject, showInMilliSecs, closeLayerMilliSecs ]);
				return;
			}
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				if ( param && param == 'customEvent' ) 
				{				
					ob.hoverIntent_t = setTimeout( function(){compare(ev, ob, 'customEventCompare', currObject, showInMilliSecs, closeLayerMilliSecs);} , showInMilliSecs );
				}
				else
					ob.hoverIntent_t = setTimeout( function(){compare(ev, ob );} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e, param , currObject, showInMilliSecs,  closeLayerMilliSecs) {
			
		
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if ( param && param == 'customEvent' ) 
				{
				    if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob, param, currObject,showInMilliSecs, closeLayerMilliSecs);} , showInMilliSecs );}
				}
				else
				{
				
					// if hoverIntent state is true, then call the mouseOut function after the specified delay
					if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob, param, currObject, closeLayerMilliSecs);} , cfg.interval );}
				}				
				

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				if ( param && param == 'customEvent' ) 
				{
				    if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , closeLayerMilliSecs );}
				}
				else
				{
				
					// if hoverIntent state is true, then call the mouseOut function after the specified delay
					if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
				}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 1.8
 * Last Modified: 12/28/2008
 * 
 * Copyright 2008 Trent Richardson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
jQuery.extend({	
	ImpromptuDefaults: { prefix:'jqi', buttons:{ Ok:true }, loaded:function(){}, submit:function(){return true;}, callback:function(){}, opacity:0.6, zIndex: 999, overlayspeed:'slow', promptspeed:'fast', show:'fadeIn', focus:0, useiframe:false, top: '100px', persistent: true },
	SetImpromptuDefaults: function(o){ 
		jQuery.ImpromptuDefaults = jQuery.extend({},jQuery.ImpromptuDefaults,o);
	},
	prompt: function(m,o){
		o = jQuery.extend({},jQuery.ImpromptuDefaults,o);
		
		var ie6 = (jQuery.browser.msie && jQuery.browser.version < 7);	
		var b = jQuery(document.body);
		var w = jQuery(window);
		
		
		
		var msgbox = '<div class="'+ o.prefix +'box" id="'+ o.prefix +'box">';		
		if(o.useiframe && ((jQuery.browser.msie && jQuery('object, applet').length > 0) || ie6))//if you want to use the iframe uncomment these 3 lines
			msgbox += '<iframe src="javascript:;" class="'+ o.prefix +'fade" id="'+ o.prefix +'fade"></iframe>';
		else{ 
			if(ie6) jQuery('select').css('visibility','hidden');
			msgbox +='<div class="'+ o.prefix +'fade" id="'+ o.prefix +'fade"></div>';
		}	
		msgbox += '<div class="'+ o.prefix +'" id="'+ o.prefix +'"><div class="'+ o.prefix +'container"><div class="'+ o.prefix +'close">close window <span>x</span></div><div class="'+ o.prefix +'message">'+ m +'</div><div class="'+ o.prefix +'buttons" id="'+ o.prefix +'buttons">';
		jQuery.each(o.buttons,function(k,v){ msgbox += '<button name="'+ o.prefix +'button'+ k +'" id="'+ o.prefix +'button'+ k +'" value="'+ v +'">'+ k +'</button>'}) ;
		msgbox += '</div></div></div></div>';
		
		var jqib =b.append(msgbox).children('#'+ o.prefix +'box');
		var jqi = jqib.children('#'+ o.prefix);
		var jqif = jqib.children('#'+ o.prefix +'fade');

		var getWindowScrollOffset = function(){ 
			return (document.documentElement.scrollTop || document.body.scrollTop) + 'px'; 
		};		
		
		var getWindowSize = function(){ 
			var size = {
				width: window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth),
				height: window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight)
			};
			return size;
		};
		
		var ie6scroll = function(){ 
			jqib.css({ top: getWindowScrollOffset() }); 
		};
		
		var fadeClicked = function(){
			if(o.persistent){
				var i = 0;
				jqib.addClass(o.prefix +'warning');
				var intervalid = setInterval(function(){ 
					jqib.toggleClass(o.prefix +'warning');
					if(i++ > 1){
						clearInterval(intervalid);
						jqib.removeClass(o.prefix +'warning');
					}
				}, 100);
			}
			else removePrompt();
		};		
		

		var escapeKeyClosePrompt = function(e){
			var key = (window.event) ? event.keyCode : e.keyCode; // MSIE or Firefox?
			if(key==27) removePrompt();
		};

		var positionPrompt = function(){
			var wsize = getWindowSize();
			jqib.css({ position: (ie6)? "absolute" : "fixed", height: wsize.height, width: "100%", top: (ie6)? getWindowScrollOffset():0, left: 0, right: 0, bottom: 0 });
			jqif.css({ position: "absolute", height: wsize.height, width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
			jqi.css({ position: "absolute", top: o.top, left: "50%", marginLeft: ((((jqi.css("paddingLeft").split("px")[0]*1) + jqi.width())/2)*-1) });					
		};
		
		var stylePrompt = function(){
			jqif.css({ zIndex: o.zIndex, display: "none", opacity: o.opacity });
			jqi.css({ zIndex: o.zIndex+1, display: "none" });
			jqib.css({ zIndex: o.zIndex });
		}
		
		var removePrompt = function(callCallback, clicked, msg){
			jqi.remove(); 
			if(ie6)b.unbind('scroll',ie6scroll);//ie6, remove the scroll event
			w.unbind('resize',positionPrompt);			
			jqif.fadeOut(o.overlayspeed,function(){
				jqif.unbind('click',fadeClicked);
				jqif.remove();
				if(callCallback) o.callback(clicked,msg);
				jqib.unbind('keypress',escapeKeyClosePrompt);
				jqib.remove();
				if(ie6 && !o.useiframe) jQuery('select').css('visibility','visible');
			});
		}
		
		positionPrompt();
		stylePrompt();	

		//Events
		jQuery('#'+ o.prefix +'buttons').children('button').click(function(){ 
			var msg = jqi.children('.'+ o.prefix +'container').children('.'+ o.prefix +'message');
			var clicked = o.buttons[jQuery(this).text()];	
			if(o.submit(clicked,msg))				
				removePrompt(true,clicked,msg);
		});
		if(ie6) w.scroll(ie6scroll);//ie6, add a scroll event to fix position:fixed
		jqif.click(fadeClicked);
		w.resize(positionPrompt);
		jqib.keypress(escapeKeyClosePrompt);
		jqi.find('.'+ o.prefix +'close').click(removePrompt);
		
		//Show it
		jqif.fadeIn(o.overlayspeed);
		jqi[o.show](o.promptspeed,o.loaded);
		jqi.find('#'+ o.prefix +'buttons button:eq('+ o.focus +')').focus();//focus the default button
		return jqib;
	}	
});
/*
 *jQuery browser plugin detection 1.0.3
 * http://plugins.jquery.com/project/jqplugin
 * Checks for plugins / mimetypes supported in the browser extending the jQuery.browser object
 * Copyright (c) 2008 Leonardo Rossetti motw.leo@gmail.com
 * MIT License: http://www.opensource.org/licenses/mit-license.php
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
*/

(function ($) {
	if(!$.browser.msie){
		$.getScript(window.location.protocol + "//java.com/js/deployJava.js");
		
		//checks if browser object exists
		if (typeof $.browser === "undefined" || !$.browser) {
			var browser = {};
			$.extend(browser);
		}
		var pluginList = {
			flash: {
				activex: ["ShockwaveFlash.ShockwaveFlash", "ShockwaveFlash.ShockwaveFlash.3", "ShockwaveFlash.ShockwaveFlash.4", "ShockwaveFlash.ShockwaveFlash.5", "ShockwaveFlash.ShockwaveFlash.6", "ShockwaveFlash.ShockwaveFlash.7"],
				plugin: /flash/gim
			},
			sl: {
				activex: ["AgControl.AgControl"],
				plugin: /silverlight/gim
			},
			pdf: {
				activex: ["acroPDF.PDF.1", "PDF.PdfCtrl.1", "PDF.PdfCtrl.4", "PDF.PdfCtrl.5", "PDF.PdfCtrl.6"],
				plugin: /adobe\s?acrobat/gim
			},
			qtime: {
				activex: ["QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "QuickTime.QuickTime.4"],
				plugin: /quicktime/gim
			},
			wmp: {
				activex: ["WMPlayer.OCX", "MediaPlayer.MediaPlayer.1"],
				plugin: /(windows\smedia)|(Microsoft)/gim
			},
			shk: {
				activex: ["SWCtl.SWCtl", "SWCt1.SWCt1.7", "SWCt1.SWCt1.8", "SWCt1.SWCt1.9", "ShockwaveFlash.ShockwaveFlash.1"],
				plugin: /shockwave/gim
			},
			rp: {
				activex: ["RealPlayer", "rmocx.RealPlayer G2 Control.1"],
				plugin: /realplayer/gim
			}
		};
		var isSupported = function (p) {
			if (window.ActiveXObject) {
				$.browser[p] = false;
				
				for (i = 0; i < pluginList[p].activex.length; i++) {
					try {
						new ActiveXObject(pluginList[p].activex[i]);
						$.browser[p] = true;
					} catch (e) {}	
				}
			} else {
				$.each(navigator.plugins, function () {
					if (this.name.match(pluginList[p].plugin)) {
						$.browser[p] = true;
						return false;
					} else {
						$.browser[p] = false;
					}
				});
			}
		};
		
		$.each(pluginList, function (i, n) {
			isSupported(i);
		});
		
		//uses sun script to detect if java plugin is available
		$.getScript(window.location.protocol + "//java.com/js/deployJava.js", function () {
			
			// BEALLSPRO-158 - bypass the java logic in this plug-in
			// so it doesn't break the page load
			
			function hackedJavaVersionCheck (versionPattern){
				// we don't care about checking the java version, return true
				return false;
			}
			
			var oldVersionCheckFunction = deployJava.versionCheck;
			deployJava.versionCheck = hackedJavaVersionCheck;
			
			if (deployJava.versionCheck("1.6.0+") || deployJava.versionCheck("1.4") || deployJava.versionCheck("1.5.0*")) {
				$.browser.java = true;
			} else {
				$.browser.java = false;
			}
			
			deployJava.versionCheck = oldVersionCheckFunction;
			console.assert(deployJava.versionCheck != hackedJavaVersionCheck);
		});

	} else {
		//ie 7 fix
		$.browser.flash = true;
		
	}
})(jQuery);/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2008/05/28
 *
 * @author Blair Mitchelmore
 * @version 2.0.1
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = settings.spaces === false ? false : true;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  
  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      try{
    	  var m, rx = /\[([^[]*)\]/g, match = /^(\S+?)(\[\S*\])?$/.exec(path), base = match[1], tokens = [];
    	  while (m = rx.exec(match[2])) tokens.push(m[1]);
          return [base, tokens];
      } catch (err){
    	  return [[],[]];
      }
      
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        jQuery.each(arguments, function() {
          var q = "" + this;
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = this.split('=')[0];
            var val = this.split('=')[1];
            
            if (!key) return;
            
            if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
              val = parseFloat(val);
            else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
              val = parseInt(val, 10);
            
            val = (!val && val !== 0) ? true : val;
            
            if (val !== false && val !== true && typeof val != 'number')
              val = decodeURIComponent(val);
            
            self.SET(key, val);
          });
        });
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key) {
        return this.SET(key, null).COMPACT();
      },
      remove: function(key) {
        return this.copy().REMOVE(key);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [key];
          if (value !== true) {
            o.push("=");
            o.push(encodeURIComponent(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object

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
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
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
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
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
				var Pos	= axis == 'x' ? 'Left' : 'Top',
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

})( jQuery );/*
 * SimpleModal 1.3.5 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * Copyright (c) 2010 Eric Martin (http://twitter.com/EricMMartin)
 * Dual licensed under the MIT and GPL licenses
 * Revision: $Id: jquery.simplemodal.js 245 2010-03-25 20:41:15Z emartin24 $
 */
;(function($){var ie6=$.browser.msie&&parseInt($.browser.version)==6&&typeof window['XMLHttpRequest']!="object",ieQuirks=null,w=[];$.modal=function(data,options){return $.modal.impl.init(data,options);};$.modal.close=function(){$.modal.impl.close();};$.fn.modal=function(options){return $.modal.impl.init(this,options);};$.modal.defaults={appendTo:'body',focus:true,opacity:50,overlayId:'simplemodal-overlay',overlayCss:{},containerId:'simplemodal-container',containerCss:{},dataId:'simplemodal-data',dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:'simplemodal-close',escClose:true,overlayClose:false,position:null,persist:false,modal:true,onOpen:null,onShow:null,onClose:null};$.modal.impl={o:null,d:{},init:function(data,options){var s=this;if(s.d.data){return false;}ieQuirks=$.browser.msie&&!$.boxModel;s.o=$.extend({},$.modal.defaults,options);s.zIndex=s.o.zIndex;s.occb=false;if(typeof data=='object'){data=data instanceof jQuery?data:$(data);s.d.placeholder=false;if(data.parent().parent().size()>0){data.before($('<span></span>').attr('id','simplemodal-placeholder').css({display:'none'}));s.d.placeholder=true;s.display=data.css('display');if(!s.o.persist){s.d.orig=data.clone(true);}}}else if(typeof data=='string'||typeof data=='number'){data=$('<div></div>').html(data);}else{alert('SimpleModal Error: Unsupported data type: '+typeof data);return s;}s.create(data);data=null;s.open();if($.isFunction(s.o.onShow)){s.o.onShow.apply(s,[s.d]);}return s;},create:function(data){var s=this;w=s.getDimensions();if(s.o.modal&&ie6){s.d.iframe=$('<iframe src="javascript:false;"></iframe>').css($.extend(s.o.iframeCss,{display:'none',opacity:0,position:'fixed',height:w[0],width:w[1],zIndex:s.o.zIndex,top:0,left:0})).appendTo(s.o.appendTo);}s.d.overlay=$('<div></div>').attr('id',s.o.overlayId).addClass('simplemodal-overlay').css($.extend(s.o.overlayCss,{display:'none',opacity:s.o.opacity/100,height:s.o.modal?w[0]:0,width:s.o.modal?w[1]:0,position:'fixed',left:0,top:0,zIndex:s.o.zIndex+1})).appendTo(s.o.appendTo);s.d.container=$('<div></div>').attr('id',s.o.containerId).addClass('simplemodal-container').css($.extend(s.o.containerCss,{display:'none',position:'fixed',zIndex:s.o.zIndex+2})).append(s.o.close&&s.o.closeHTML?$(s.o.closeHTML).addClass(s.o.closeClass):'').appendTo(s.o.appendTo);s.d.wrap=$('<div></div>').attr('tabIndex',-1).addClass('simplemodal-wrap').css({height:'100%',outline:0,width:'100%'}).appendTo(s.d.container);s.d.data=data.attr('id',data.attr('id')||s.o.dataId).addClass('simplemodal-data').css($.extend(s.o.dataCss,{display:'none'})).appendTo('body');data=null;s.setContainerDimensions();s.d.data.appendTo(s.d.wrap);if(ie6||ieQuirks){s.fixIE();}},bindEvents:function(){var s=this;$('.'+s.o.closeClass).bind('click.simplemodal',function(e){e.preventDefault();s.close();});if(s.o.modal&&s.o.close&&s.o.overlayClose){s.d.overlay.bind('click.simplemodal',function(e){e.preventDefault();s.close();});}$(document).bind('keydown.simplemodal',function(e){if(s.o.modal&&s.o.focus&&e.keyCode==9){s.watchTab(e);}else if((s.o.close&&s.o.escClose)&&e.keyCode==27){e.preventDefault();s.close();}});$(window).bind('resize.simplemodal',function(){w=s.getDimensions();s.setContainerDimensions(true);if(ie6||ieQuirks){s.fixIE();}else if(s.o.modal){s.d.iframe&&s.d.iframe.css({height:w[0],width:w[1]});s.d.overlay.css({height:w[0],width:w[1]});}});},unbindEvents:function(){$('.'+this.o.closeClass).unbind('click.simplemodal');$(document).unbind('keydown.simplemodal');$(window).unbind('resize.simplemodal');this.d.overlay.unbind('click.simplemodal');},fixIE:function(){var s=this,p=s.o.position;$.each([s.d.iframe||null,!s.o.modal?null:s.d.overlay,s.d.container],function(i,el){if(el){var bch='document.body.clientHeight',bcw='document.body.clientWidth',bsh='document.body.scrollHeight',bsl='document.body.scrollLeft',bst='document.body.scrollTop',bsw='document.body.scrollWidth',ch='document.documentElement.clientHeight',cw='document.documentElement.clientWidth',sl='document.documentElement.scrollLeft',st='document.documentElement.scrollTop',s=el[0].style;s.position='absolute';if(i<2){s.removeExpression('height');s.removeExpression('width');s.setExpression('height',''+bsh+' > '+bch+' ? '+bsh+' : '+bch+' + "px"');s.setExpression('width',''+bsw+' > '+bcw+' ? '+bsw+' : '+bcw+' + "px"');}else{var te,le;if(p&&p.constructor==Array){var top=p[0]?typeof p[0]=='number'?p[0].toString():p[0].replace(/px/,''):el.css('top').replace(/px/,'');te=top.indexOf('%')==-1?top+' + (t = '+st+' ? '+st+' : '+bst+') + "px"':parseInt(top.replace(/%/,''))+' * (('+ch+' || '+bch+') / 100) + (t = '+st+' ? '+st+' : '+bst+') + "px"';if(p[1]){var left=typeof p[1]=='number'?p[1].toString():p[1].replace(/px/,'');le=left.indexOf('%')==-1?left+' + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"':parseInt(left.replace(/%/,''))+' * (('+cw+' || '+bcw+') / 100) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}}else{te='('+ch+' || '+bch+') / 2 - (this.offsetHeight / 2) + (t = '+st+' ? '+st+' : '+bst+') + "px"';le='('+cw+' || '+bcw+') / 2 - (this.offsetWidth / 2) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}s.removeExpression('top');s.removeExpression('left');s.setExpression('top',te);s.setExpression('left',le);}}});},focus:function(pos){var s=this,p=pos||'first';var input=$(':input:enabled:visible:'+p,s.d.wrap);input.length>0?input.focus():s.d.wrap.focus();},getDimensions:function(){var el=$(window);var h=$.browser.opera&&$.browser.version>'9.5'&&$.fn.jquery<='1.2.6'?document.documentElement['clientHeight']:$.browser.opera&&$.browser.version<'9.5'&&$.fn.jquery>'1.2.6'?window.innerHeight:el.height();return[h,el.width()];},getVal:function(v){return v=='auto'?0:v.indexOf('%')>0?v:parseInt(v.replace(/px/,''));},setContainerDimensions:function(resize){var s=this;if(!resize||(resize&&s.o.autoResize)){var ch=$.browser.opera?s.d.container.height():s.getVal(s.d.container.css('height')),cw=$.browser.opera?s.d.container.width():s.getVal(s.d.container.css('width')),dh=s.d.data.outerHeight(true),dw=s.d.data.outerWidth(true);var mh=s.o.maxHeight&&s.o.maxHeight<w[0]?s.o.maxHeight:w[0],mw=s.o.maxWidth&&s.o.maxWidth<w[1]?s.o.maxWidth:w[1];if(!ch){if(!dh){ch=s.o.minHeight;}else{if(dh>mh){ch=mh;}else if(dh<s.o.minHeight){ch=s.o.minHeight;}else{ch=dh;}}}else{ch=ch>mh?mh:ch;}if(!cw){if(!dw){cw=s.o.minWidth;}else{if(dw>mw){cw=mw;}else if(dw<s.o.minWidth){cw=s.o.minWidth;}else{cw=dw;}}}else{cw=cw>mw?mw:cw;}s.d.container.css({height:ch,width:cw});if(dh>ch||dw>cw){s.d.wrap.css({overflow:'auto'});}}if(s.o.autoPosition){s.setPosition();}},setPosition:function(){var s=this,top,left,hc=(w[0]/2)-(s.d.container.outerHeight(true)/2),vc=(w[1]/2)-(s.d.container.outerWidth(true)/2);if(s.o.position&&Object.prototype.toString.call(s.o.position)==="[object Array]"){top=s.o.position[0]||hc;left=s.o.position[1]||vc;}else{top=hc;left=vc;}s.d.container.css({left:left,top:top});},watchTab:function(e){var s=this;if($(e.target).parents('.simplemodal-container').length>0){s.inputs=$(':input:enabled:visible:first, :input:enabled:visible:last',s.d.data[0]);if((!e.shiftKey&&e.target==s.inputs[s.inputs.length-1])||(e.shiftKey&&e.target==s.inputs[0])||s.inputs.length==0){e.preventDefault();var pos=e.shiftKey?'last':'first';setTimeout(function(){s.focus(pos);},10);}}else{e.preventDefault();setTimeout(function(){s.focus();},10);}},open:function(){var s=this;s.d.iframe&&s.d.iframe.show();if($.isFunction(s.o.onOpen)){s.o.onOpen.apply(s,[s.d]);}else{s.d.overlay.show();s.d.container.show();s.d.data.show();}s.focus();s.bindEvents();},close:function(){var s=this;if(!s.d.data){return false;}s.unbindEvents();if($.isFunction(s.o.onClose)&&!s.occb){s.occb=true;s.o.onClose.apply(s,[s.d]);}else{if(s.d.placeholder){var ph=$('#simplemodal-placeholder');if(s.o.persist){ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display',s.display));}else{s.d.data.hide().remove();ph.replaceWith(s.d.orig);}}else{s.d.data.hide().remove();}s.d.container.hide().remove();s.d.overlay.hide().remove();s.d.iframe&&s.d.iframe.hide().remove();s.d={};}}};})(jQuery);/*
Stylish Select 0.4.1 - $ plugin to replace a select drop down box with a stylable unordered list
http://github.com/sko77sun/Stylish-Select

Requires: jQuery 1.3 or newer

Contributions from Justin Beasley: http://www.harvest.org/ & Anatoly Ressin: http://www.artazor.lv/

Dual licensed under the MIT and GPL licenses.

*/
(function(a){a("html").addClass("stylish-select");Array.prototype.indexOf=function(c,d){for(var b=(d||0);b<this.length;b++){if(this[b]==c){return b}}};a.fn.extend({getSetSSValue:function(b){if(b){a(this).val(b).change();return this}else{return a(this).find(":selected").val()}},resetSS:function(){var b=a(this).data("ssOpts");$this=a(this);$this.next().remove();$this.unbind(".sSelect").sSelect(b)}});a.fn.sSelect=function(b){return this.each(function(){var i={defaultText:"Please select",animationSpeed:0,ddMaxHeight:"",containerClass:""};var l=a.extend(i,b),e=a(this),j=a('<div class="selectedTxt"></div>'),r=a('<div class="newListSelected '+l.containerClass+'"></div>'),z=a('<ul class="newList" style="visibility:hidden;"></ul>'),t=-1,d=-1,m=[],w=false,v=false,x;a(this).data("ssOpts",b);r.insertAfter(e);r.attr("tabindex",e.attr("tabindex")||"0");j.prependTo(r);z.appendTo(r);e.hide();j.data("ssReRender",!j.is(":visible"));if(e.children("optgroup").length==0){e.children().each(function(B){var C=a(this).html();var T=a(this).attr('title');var A=a(this).val();m.push(C.charAt(0).toLowerCase());if(a(this).attr("selected")==true){l.defaultText=C;d=B}z.append(a('<li title="'+ T+'"><a href="JavaScript:void(0);">'+C+"</a></li>").data("key",A))});x=z.children().children()}else{e.children("optgroup").each(function(){var A=a(this).attr("label"),C=a('<li class="newListOptionTitle">'+A+"</li>");C.appendTo(z);var B=a("<ul></ul>");B.appendTo(C);a(this).children().each(function(){++t;var E=a(this).html();var D=a(this).val();m.push(E.charAt(0).toLowerCase());if(a(this).attr("selected")==true){l.defaultText=E;d=t}B.append(a('<li><a href="JavaScript:void(0);">'+E+"</a></li>").data("key",D))})});x=z.find("ul li a")}var o=z.height(),n=r.height(),y=x.length;if(d!=-1){h(d,true)}else{j.text(l.defaultText)}function p(){var B=r.offset().top,A=jQuery(window).height(),C=jQuery(window).scrollTop();if(o>parseInt(l.ddMaxHeight)){o=parseInt(l.ddMaxHeight)}B=B-C;if(B+o>=A){z.css({top:"-"+o+"px",height:o});e.onTop=true}else{z.css({top:n+"px",height:o});e.onTop=false}}p();a(window).bind("resize.sSelect scroll.sSelect",p);function s(){r.css("position","relative")}function c(){r.css("position","static")}j.bind("click.sSelect",function(A){A.stopPropagation();if(a(this).data("ssReRender")){o=z.height("").height();n=r.height();a(this).data("ssReRender",false);p()}a(".newList").not(a(this).next()).hide().parent().css("position","static").removeClass("newListSelFocus");z.toggle();s();x.eq(d).focus()});x.bind("click.sSelect",function(B){var A=a(B.target);d=x.index(A);v=true;h(d);z.hide();r.css("position","static")});x.bind("mouseenter.sSelect",function(B){var A=a(B.target);A.addClass("newListHover")}).bind("mouseleave.sSelect",function(B){var A=a(B.target);A.removeClass("newListHover")});function h(A,E){x.removeClass("hiLite").eq(A).addClass("hiLite");if(z.is(":visible")){x.eq(A).focus()}var D=x.eq(A).html();var C=x.eq(A).parent().data("key");if(E==true){e.val(C);j.text(D);return false}try{e.val(C)}catch(B){e[0].selectedIndex=A}e.change();j.text(D)}e.bind("change.sSelect",function(A){$targetInput=a(A.target);if(v==true){v=false;return false}$currentOpt=$targetInput.find(":selected");d=$targetInput.find("option").index($currentOpt);h(d,true)});function q(A){a(A).unbind("keydown.sSelect").bind("keydown.sSelect",function(D){var C=D.which;v=true;switch(C){case 40:case 39:u();return false;break;case 38:case 37:k();return false;break;case 33:case 36:g();return false;break;case 34:case 35:f();return false;break;case 13:case 27:z.hide();c();return false;break}keyPressed=String.fromCharCode(C).toLowerCase();var B=m.indexOf(keyPressed);if(typeof B!="undefined"){++d;d=m.indexOf(keyPressed,d);if(d==-1||d==null||w!=keyPressed){d=m.indexOf(keyPressed)}h(d);w=keyPressed;return false}})}function u(){if(d<(y-1)){++d;h(d)}}function k(){if(d>0){--d;h(d)}}function g(){d=0;h(d)}function f(){d=y-1;h(d)}r.bind("click.sSelect",function(A){A.stopPropagation();q(this)});r.bind("focus.sSelect",function(){a(this).addClass("newListSelFocus");q(this)});r.bind("blur.sSelect",function(){a(this).removeClass("newListSelFocus")});a(document).bind("click.sSelect",function(){r.removeClass("newListSelFocus");z.hide();c()});j.bind("mouseenter.sSelect",function(B){var A=a(B.target);A.parent().addClass("newListSelHover")}).bind("mouseleave.sSelect",function(B){var A=a(B.target);A.parent().removeClass("newListSelHover")});z.css({left:"0",display:"none",visibility:"visible"})})}})(jQuery);/**
 * Tabs - jQuery plugin for accessible, unobtrusive tabs
 * @requires jQuery v1.1.1
 *
 * http://stilbuero.de/tabs/
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 2.7.4
 */

(function($) { // block scope

$.extend({
    tabs: {
        remoteCount: 0 // TODO in Tabs 3 this is going to be more cleanly in one single namespace
    }
});

/**
 * Create an accessible, unobtrusive tab interface based on a particular HTML structure.
 *
 * The underlying HTML has to look like this:
 *
 * <div id="container">
 *     <ul>
 *         <li><a href="#fragment-1">Section 1</a></li>
 *         <li><a href="#fragment-2">Section 2</a></li>
 *         <li><a href="#fragment-3">Section 3</a></li>
 *     </ul>
 *     <div id="fragment-1">
 *
 *     </div>
 *     <div id="fragment-2">
 *
 *     </div>
 *     <div id="fragment-3">
 *
 *     </div>
 * </div>
 *
 * Each anchor in the unordered list points directly to a section below represented by one of the
 * divs (the URI in the anchor's href attribute refers to the fragment with the corresponding id).
 * Because such HTML structure is fully functional on its own, e.g. without JavaScript, the tab
 * interface is accessible and unobtrusive.
 *
 * A tab is also bookmarkable via hash in the URL. Use the History/Remote plugin (Tabs will
 * auto-detect its presence) to fix the back (and forward) button.
 *
 * @example $('#container').tabs();
 * @desc Create a basic tab interface.
 * @example $('#container').tabs(2);
 * @desc Create a basic tab interface with the second tab initially activated.
 * @example $('#container').tabs({disabled: [3, 4]});
 * @desc Create a tab interface with the third and fourth tab being disabled.
 * @example $('#container').tabs({fxSlide: true});
 * @desc Create a tab interface that uses slide down/up animations for showing/hiding tab
 *       content upon tab switching.
 *
 * @param Number initial An integer specifying the position of the tab (no zero-based index) that
 *                       gets activated at first (on page load). Two alternative ways to specify
 *                       the active tab will overrule this argument. First a li element
 *                       (representing one single tab) belonging to the selected tab class, e.g.
 *                       set the selected tab class (default: "tabs-selected", see option
 *                       selectedClass) for one of the unordered li elements in the HTML source.
 *                       In addition if a fragment identifier/hash in the URL of the page refers
 *                       to the id of a tab container of a tab interface the corresponding tab will
 *                       be activated and both the initial argument as well as an eventually
 *                       declared class attribute will be overruled. Defaults to 1 if omitted.
 * @param Object settings An object literal containing key/value pairs to provide optional settings.
 * @option Array<Number> disabled An array containing the position of the tabs (no zero-based index)
 *                                that should be disabled on initialization. Default value: null.
 *                                A tab can also be disabled by simply adding the disabling class
 *                                (default: "tabs-disabled", see option disabledClass) to the li
 *                                element representing that particular tab.
 * @option Boolean bookmarkable Boolean flag indicating if support for bookmarking and history (via
 *                              changing hash in the URL of the browser) is enabled. Default value:
 *                              false, unless the History/Remote plugin is included. In that case the
 *                              default value becomes true. @see $.ajaxHistory.initialize
 * @option Boolean remote Boolean flag indicating that tab content has to be loaded remotely from
 *                        the url given in the href attribute of the tab menu anchor elements.
 * @option String spinner The content of this string is shown in a tab while remote content is loading.
 *                        Insert plain text as well as an img here. To turn off this notification
 *                        pass an empty string or null. Default: "Loading&#8230;".
 * @option String hashPrefix A String that is used for constructing the hash the link's href attribute
 *                           of a remote tab gets altered to, such as "#remote-1".
 *                           Default value: "remote-tab-".
 * @option Boolean fxFade Boolean flag indicating whether fade in/out animations are used for tab
 *                        switching. Can be combined with fxSlide. Will overrule fxShow/fxHide.
 *                        Default value: false.
 * @option Boolean fxSlide Boolean flag indicating whether slide down/up animations are used for tab
 *                         switching. Can be combined with fxFade. Will overrule fxShow/fxHide.
 *                         Default value: false.
 * @option String|Number fxSpeed A string representing one of the three predefined speeds ("slow",
 *                               "normal", or "fast") or the number of milliseconds (e.g. 1000) to
 *                               run an animation. Default value: "normal".
 * @option Object fxShow An object literal of the form jQuery's animate function expects for making
 *                       your own, custom animation to reveal a tab upon tab switch. Unlike fxFade
 *                       or fxSlide this animation is independent from an optional hide animation.
 *                       Default value: null. @see animate
 * @option Object fxHide An object literal of the form jQuery's animate function expects for making
 *                       your own, custom animation to hide a tab upon tab switch. Unlike fxFade
 *                       or fxSlide this animation is independent from an optional show animation.
 *                       Default value: null. @see animate
 * @option String|Number fxShowSpeed A string representing one of the three predefined speeds
 *                                   ("slow", "normal", or "fast") or the number of milliseconds
 *                                   (e.g. 1000) to run the animation specified in fxShow.
 *                                   Default value: fxSpeed.
 * @option String|Number fxHideSpeed A string representing one of the three predefined speeds
 *                                   ("slow", "normal", or "fast") or the number of milliseconds
 *                                   (e.g. 1000) to run the animation specified in fxHide.
 *                                   Default value: fxSpeed.
 * @option Boolean fxAutoHeight Boolean flag that if set to true causes all tab heights
 *                              to be constant (being the height of the tallest tab).
 *                              Default value: false.
 * @option Function onClick A function to be invoked upon tab switch, immediatly after a tab has
 *                          been clicked, e.g. before the other's tab content gets hidden. The
 *                          function gets passed three arguments: the first one is the clicked
 *                          tab (e.g. an anchor element), the second one is the DOM element
 *                          containing the content of the clicked tab (e.g. the div), the third
 *                          argument is the one of the tab that gets hidden. If this callback
 *                          returns false, the tab switch is canceled (use to disallow tab
 *                          switching for the reason of a failed form validation for example).
 *                          Default value: null.
 * @option Function onHide A function to be invoked upon tab switch, immediatly after one tab's
 *                         content got hidden (with or without an animation) and right before the
 *                         next tab is revealed. The function gets passed three arguments: the
 *                         first one is the clicked tab (e.g. an anchor element), the second one
 *                         is the DOM element containing the content of the clicked tab, (e.g. the
 *                         div), the third argument is the one of the tab that gets hidden.
 *                         Default value: null.
 * @option Function onShow A function to be invoked upon tab switch. This function is invoked
 *                         after the new tab has been revealed, e.g. after the switch is completed.
 *                         The function gets passed three arguments: the first one is the clicked
 *                         tab (e.g. an anchor element), the second one is the DOM element
 *                         containing the content of the clicked tab, (e.g. the div), the third
 *                         argument is the one of the tab that gets hidden. Default value: null.
 * @option String navClass A CSS class that is used to identify the tabs unordered list by class if
 *                         the required HTML structure differs from the default one.
 *                         Default value: "tabs-nav".
 * @option String selectedClass The CSS class attached to the li element representing the
 *                              currently selected (active) tab. Default value: "tabs-selected".
 * @option String disabledClass The CSS class attached to the li element representing a disabled
 *                              tab. Default value: "tabs-disabled".
 * @option String containerClass A CSS class that is used to identify tab containers by class if
 *                               the required HTML structure differs from the default one.
 *                               Default value: "tabs-container".
 * @option String hideClass The CSS class used for hiding inactive tabs. A class is used instead
 *                          of "display: none" in the style attribute to maintain control over
 *                          visibility in other media types than screen, most notably print.
 *                          Default value: "tabs-hide".
 * @option String loadingClass The CSS class used for indicating that an Ajax tab is currently
 *                             loading, for example by showing a spinner.
 *                             Default value: "tabs-loading".
 * @option String tabStruct @deprecated A CSS selector or basic XPath expression reflecting a
 *                          nested HTML structure that is different from the default single div
 *                          structure (one div with an id inside the overall container holds one
 *                          tab's content). If for instance an additional div is required to wrap
 *                          up the several tab containers such a structure is expressed by "div>div".
 *                          Default value: "div".
 * @type jQuery
 *
 * @name tabs
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.fn.tabs = function(initial, settings) {

    // settings
    if (typeof initial == 'object') settings = initial; // no initial tab given but a settings object
    settings = $.extend({
        initial: (initial && typeof initial == 'number' && initial > 0) ? --initial : 0,
        disabled: null,
        bookmarkable: $.ajaxHistory ? true : false,
        remote: false,
        spinner: 'Loading&#8230;',
        hashPrefix: 'remote-tab-',
        fxFade: null,
        fxSlide: null,
        fxShow: null,
        fxHide: null,
        fxSpeed: 'normal',
        fxShowSpeed: null,
        fxHideSpeed: null,
        fxAutoHeight: false,
        onClick: null,
        onHide: null,
        onShow: null,
        navClass: 'tabs-nav',
        selectedClass: 'tabs-selected',
        disabledClass: 'tabs-disabled',
        containerClass: 'tabs-container',
        hideClass: 'tabs-hide',
        loadingClass: 'tabs-loading',
        tabStruct: 'div'
    }, settings || {});

    $.browser.msie6 = $.browser.msie && ($.browser.version && $.browser.version < 7 || /MSIE 6.0/.test(navigator.userAgent)); // do not check for 6.0 alone, userAgent in Windows Vista has "Windows NT 6.0"

    // helper to prevent scroll to fragment
    function unFocus() {
        scrollTo(0, 0);
    }

    // initialize tabs
    return this.each(function() {

        // remember wrapper for later
        var container = this;

        // setup nav
        var nav = $('ul.' + settings.navClass, container);
        nav = nav.size() && nav || $('>ul:eq(0)', container); // fallback to default structure
        var tabs = $('a', nav);

        // prepare remote tabs
        if (settings.remote) {
            tabs.each(function() {
                var id = settings.hashPrefix + (++$.tabs.remoteCount), hash = '#' + id, url = this.href;
                this.href = hash;
                $('<div id="' + id + '" class="' + settings.containerClass + '"></div>').appendTo(container);

                $(this).bind('loadRemoteTab', function(e, callback) {
                    var $$ = $(this).addClass(settings.loadingClass), span = $('span', this)[0], tabTitle = span.innerHTML;
                    if (settings.spinner) {
                        // TODO if spinner is image
                        span.innerHTML = '<em>' + settings.spinner + '</em>'; // WARNING: html(...) crashes Safari with jQuery 1.1.2
                    }
                    setTimeout(function() { // Timeout is again required in IE, "wait" for id being restored
                        $(hash).load(url, function() {
                            if (settings.spinner) {
                                span.innerHTML = tabTitle; // WARNING: html(...) crashes Safari with jQuery 1.1.2
                            }
                            $$.removeClass(settings.loadingClass);
                            callback && callback();
                        });
                    }, 0);
                });

            });
        }

        // set up containers
        var containers = $('div.' + settings.containerClass, container);
        containers = containers.size() && containers || $('>' + settings.tabStruct, container); // fallback to default structure

        // attach classes for styling if not present
        nav.is('.' + settings.navClass) || nav.addClass(settings.navClass);
        containers.each(function() {
            var $$ = $(this);
            $$.is('.' + settings.containerClass) || $$.addClass(settings.containerClass);
        });

        // try to retrieve active tab from class in HTML
        var hasSelectedClass = $('li', nav).index( $('li.' + settings.selectedClass, nav)[0] );
        if (hasSelectedClass >= 0) {
           settings.initial = hasSelectedClass;
        }

        // try to retrieve active tab from hash in url, will override class in HTML
        if (location.hash) {
            tabs.each(function(i) {
                if (this.hash == location.hash) {
                    settings.initial = i;
                    // prevent page scroll to fragment
                    if (($.browser.msie || $.browser.opera) && !settings.remote) {
                        var toShow = $(location.hash);
                        var toShowId = toShow.attr('id');
                        toShow.attr('id', '');
                        setTimeout(function() {
                            toShow.attr('id', toShowId); // restore id
                        }, 500);
                    }
                    unFocus();
                    return false; // break
                }
            });
        }
        if ($.browser.msie) {
            unFocus(); // fix IE focussing bottom of the page for some unknown reason
        }

        // highlight tab accordingly
        containers.filter(':eq(' + settings.initial + ')').show().end().not(':eq(' + settings.initial + ')').addClass(settings.hideClass);
        $('li', nav).removeClass(settings.selectedClass).eq(settings.initial).addClass(settings.selectedClass); // we need to remove classes eventually if hash takes precedence over class
        // trigger load of initial tab
        tabs.eq(settings.initial).trigger('loadRemoteTab').end();

        // setup auto height
        if (settings.fxAutoHeight) {
            // helper
            var _setAutoHeight = function(reset) {
                // get tab heights in top to bottom ordered array
                var heights = $.map(containers.get(), function(el) {
                    var h, jq = $(el);
                    if (reset) {
                        if ($.browser.msie6) {
                            el.style.removeExpression('behaviour');
                            el.style.height = '';
                            el.minHeight = null;
                        }
                        h = jq.css({'min-height': ''}).height(); // use jQuery's height() to get hidden element values
                    } else {
                        h = jq.height(); // use jQuery's height() to get hidden element values
                    }
                    return h;
                }).sort(function(a, b) {
                    return b - a;
                });
                if ($.browser.msie6) {
                    containers.each(function() {
                        this.minHeight = heights[0] + 'px';
                        this.style.setExpression('behaviour', 'this.style.height = this.minHeight ? this.minHeight : "1px"'); // using an expression to not make print styles useless
                    });
                } else {
                    containers.css({'min-height': heights[0] + 'px'});
                }
            };
            // call once for initialization
            _setAutoHeight();
            // trigger auto height adjustment if needed
            var cachedWidth = container.offsetWidth;
            var cachedHeight = container.offsetHeight;
            var watchFontSize = $('#tabs-watch-font-size').get(0) || $('<span id="tabs-watch-font-size">M</span>').css({display: 'block', position: 'absolute', visibility: 'hidden'}).appendTo(document.body).get(0);
            var cachedFontSize = watchFontSize.offsetHeight;
            setInterval(function() {
                var currentWidth = container.offsetWidth;
                var currentHeight = container.offsetHeight;
                var currentFontSize = watchFontSize.offsetHeight;
                if (currentHeight > cachedHeight || currentWidth != cachedWidth || currentFontSize != cachedFontSize) {
                    _setAutoHeight((currentWidth > cachedWidth || currentFontSize < cachedFontSize)); // if heights gets smaller reset min-height
                    cachedWidth = currentWidth;
                    cachedHeight = currentHeight;
                    cachedFontSize = currentFontSize;
                }
            }, 50);
        }

        // setup animations
        var showAnim = {}, hideAnim = {}, showSpeed = settings.fxShowSpeed || settings.fxSpeed, hideSpeed = settings.fxHideSpeed || settings.fxSpeed;
        if (settings.fxSlide || settings.fxFade) {
            if (settings.fxSlide) {
                showAnim['height'] = 'show';
                hideAnim['height'] = 'hide';
            }
            if (settings.fxFade) {
                showAnim['opacity'] = 'show';
                hideAnim['opacity'] = 'hide';
            }
        } else {
            if (settings.fxShow) {
                showAnim = settings.fxShow;
            } else { // use some kind of animation to prevent browser scrolling to the tab
                showAnim['min-width'] = 0; // avoid opacity, causes flicker in Firefox
                showSpeed = 1; // as little as 1 is sufficient
            }
            if (settings.fxHide) {
                hideAnim = settings.fxHide;
            } else { // use some kind of animation to prevent browser scrolling to the tab
                hideAnim['min-width'] = 0; // avoid opacity, causes flicker in Firefox
                hideSpeed = 1; // as little as 1 is sufficient
            }
        }

        // callbacks
        var onClick = settings.onClick, onHide = settings.onHide, onShow = settings.onShow;

        // attach activateTab event, required for activating a tab programmatically
        tabs.bind('triggerTab', function() {

            // if the tab is already selected or disabled or animation is still running stop here
            var li = $(this).parents('li:eq(0)');
            if (container.locked || li.is('.' + settings.selectedClass) || li.is('.' + settings.disabledClass)) {
                return false;
            }

            var hash = this.hash;

            if ($.browser.msie) {

                $(this).trigger('click');
                if (settings.bookmarkable) {
                    $.ajaxHistory.update(hash);
                    location.hash = hash.replace('#', '');
                }

            } else if ($.browser.safari) {

                // Simply setting location.hash puts Safari into the eternal load state... ugh! Submit a form instead.
                var tempForm = $('<form action="' + hash + '"><div><input type="submit" value="h" /></div></form>').get(0); // no need to append it to the body
                tempForm.submit(); // does not trigger the form's submit event...
                $(this).trigger('click'); // ...thus do stuff here
                if (settings.bookmarkable) {
                    $.ajaxHistory.update(hash);
                }

            } else {

                if (settings.bookmarkable) {
                    location.hash = hash.replace('#', '');
                } else {
                    $(this).trigger('click');
                }

            }

        });

        // attach disable event, required for disabling a tab
        tabs.bind('disableTab', function() {
            var li = $(this).parents('li:eq(0)');
            if ($.browser.safari) { /* fix opacity of tab after disabling in Safari... */
                li.animate({ opacity: 0 }, 1, function() {
                   li.css({opacity: ''});
                });
            }
            li.addClass(settings.disabledClass);

        });

        // disabled from settings
        if (settings.disabled && settings.disabled.length) {
            for (var i = 0, k = settings.disabled.length; i < k; i++) {
                tabs.eq(--settings.disabled[i]).trigger('disableTab').end();
            }
        };

        // attach enable event, required for reenabling a tab
        tabs.bind('enableTab', function() {
            var li = $(this).parents('li:eq(0)');
            li.removeClass(settings.disabledClass);
            if ($.browser.safari) { /* fix disappearing tab after enabling in Safari... */
                li.animate({ opacity: 1 }, 1, function() {
                    li.css({opacity: ''});
                });
            }
        });

        // attach click event
        tabs.bind('click', function(e) {

            var trueClick = e.clientX; // add to history only if true click occured, not a triggered click
            var clicked = this, li = $(this).parents('li:eq(0)'), toShow = $(this.hash), toHide = containers.filter(':visible');

            // if animation is still running, tab is selected or disabled or onClick callback returns false stop here
            // check if onClick returns false last so that it is not executed for a disabled tab
            if (container['locked'] || li.is('.' + settings.selectedClass) || li.is('.' + settings.disabledClass) || typeof onClick == 'function' && onClick(this, toShow[0], toHide[0]) === false) {
                this.blur();
                return false;
            }

            container['locked'] = true;

            // show new tab
            if (toShow.size()) {

                // prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
                if ($.browser.msie && settings.bookmarkable) {
                    var toShowId = this.hash.replace('#', '');
                    toShow.attr('id', '');
                    setTimeout(function() {
                        toShow.attr('id', toShowId); // restore id
                    }, 0);
                }

                var resetCSS = { display: '', overflow: '', height: '' };
                if (!$.browser.msie) { // not in IE to prevent ClearType font issue
                    resetCSS['opacity'] = '';
                }
                
                // switch tab, animation prevents browser scrolling to the fragment
                function switchTab() {
                    if (settings.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
                        $.ajaxHistory.update(clicked.hash);
                    }
                    toHide.animate(hideAnim, hideSpeed, function() { //
                        $(clicked).parents('li:eq(0)').addClass(settings.selectedClass).siblings().removeClass(settings.selectedClass);
                        toHide.addClass(settings.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.                        
                        if (typeof onHide == 'function') {
                            onHide(clicked, toShow[0], toHide[0]);
                        }
                        if (!(settings.fxSlide || settings.fxFade || settings.fxShow)) {
                            toShow.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab containers
                        }
                        toShow.animate(showAnim, showSpeed, function() {
                            toShow.removeClass(settings.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
                            if ($.browser.msie) {
                                toHide[0].style.filter = '';
                                toShow[0].style.filter = '';
                            }
                            if (typeof onShow == 'function') {
                                onShow(clicked, toShow[0], toHide[0]);
                            }
                            container['locked'] = null;
                        });
                    });
                }

                if (!settings.remote) {
                    switchTab();
                } else {
                    $(clicked).trigger('loadRemoteTab', [switchTab]);
                }

            } else {
                alert('There is no such container.');
            }

            // Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
            var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
            setTimeout(function() {
                window.scrollTo(scrollX, scrollY);
            }, 0);

            this.blur(); // prevent IE from keeping other link focussed when using the back button

            return settings.bookmarkable && !!trueClick; // convert undefined to Boolean for IE

        });

        // enable history support if bookmarking and history is turned on
        if (settings.bookmarkable) {
            $.ajaxHistory.initialize(function() {
                tabs.eq(settings.initial).trigger('click').end();
            });
        }

    });

};

/**
 * Activate a tab programmatically with the given position (no zero-based index)
 * or its id, e.g. the URL's fragment identifier/hash representing a tab, as if the tab
 * itself were clicked.
 *
 * @example $('#container').triggerTab(2);
 * @desc Activate the second tab of the tab interface contained in <div id="container">.
 * @example $('#container').triggerTab(1);
 * @desc Activate the first tab of the tab interface contained in <div id="container">.
 * @example $('#container').triggerTab();
 * @desc Activate the first tab of the tab interface contained in <div id="container">.
 * @example $('#container').triggerTab('fragment-2');
 * @desc Activate a tab via its URL fragment identifier representation.
 *
 * @param String|Number tab Either a string that matches the id of the tab (the URL's
 *                          fragment identifier/hash representing a tab) or an integer
 *                          specifying the position of the tab (no zero-based index) to
 *                          be activated. If this parameter is omitted, the first tab
 *                          will be activated.
 * @type jQuery
 *
 * @name triggerTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Disable a tab, so that clicking it has no effect.
 *
 * @example $('#container').disableTab(2);
 * @desc Disable the second tab of the tab interface contained in <div id="container">.
 *
 * @param String|Number tab Either a string that matches the id of the tab (the URL's
 *                          fragment identifier/hash representing a tab) or an integer
 *                          specifying the position of the tab (no zero-based index) to
 *                          be disabled. If this parameter is omitted, the first tab
 *                          will be disabled.
 * @type jQuery
 *
 * @name disableTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Enable a tab that has been disabled.
 *
 * @example $('#container').enableTab(2);
 * @desc Enable the second tab of the tab interface contained in <div id="container">.
 *
 * @param String|Number tab Either a string that matches the id of the tab (the URL's
 *                          fragment identifier/hash representing a tab) or an integer
 *                          specifying the position of the tab (no zero-based index) to
 *                          be enabled. If this parameter is omitted, the first tab
 *                          will be enabled.
 * @type jQuery
 *
 * @name enableTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

var tabEvents = ['triggerTab', 'disableTab', 'enableTab'];
for (var i = 0; i < tabEvents.length; i++) {
    $.fn[tabEvents[i]] = (function(tabEvent) {
        return function(tab) {
            return this.each(function() {
                var nav = $('ul.tabs-nav' , this);
                nav = nav.size() && nav || $('>ul:eq(0)', this); // fallback to default structure
                var a;
                if (!tab || typeof tab == 'number') {
                    a = $('li a', nav).eq((tab && tab > 0 && tab - 1 || 0)); // fall back to 0
                } else if (typeof tab == 'string') {
                    a = $('li a[href$="#' + tab + '"]', nav);
                }
                a.trigger(tabEvent);
            });
        };
    })(tabEvents[i]);
}

/**
 * Get the position of the currently selected tab (no zero-based index).
 *
 * @example $('#container').activeTab();
 * @desc Get the position of the currently selected tab of an interface
 * contained in <div id="container">.
 *
 * @type Number
 *
 * @name activeTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

$.fn.activeTab = function() {
    var selectedTabs = [];
    this.each(function() {
        var nav = $('ul.tabs-nav' , this);
        nav = nav.size() && nav || $('>ul:eq(0)', this); //fallback to default structure
        var lis = $('li', nav);
        selectedTabs.push(lis.index( lis.filter('.tabs-selected')[0] ) + 1);
    });
    return selectedTabs[0];
};

})(jQuery);jQuery.url=function(){var segments={};var parsed={};var options={url:window.location,strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var parseUri=function(){str=decodeURI(options.url);var m=options.parser[options.strictMode?"strict":"loose"].exec(str);var uri={};var i=14;while(i--){uri[options.key[i]]=m[i]||""}uri[options.q.name]={};uri[options.key[12]].replace(options.q.parser,function($0,$1,$2){if($1){uri[options.q.name][$1]=$2}});return uri};var key=function(key){if(!parsed.length){setUp()}if(key=="base"){if(parsed.port!==null&&parsed.port!==""){return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/"}else{return parsed.protocol+"://"+parsed.host+"/"}}return(parsed[key]==="")?null:parsed[key]};var param=function(item){if(!parsed.length){setUp()}return(parsed.queryKey[item]===null)?null:parsed.queryKey[item]};var setUp=function(){parsed=parseUri();getSegments()};var getSegments=function(){var p=parsed.path;segments=[];segments=parsed.path.length==1?{}:(p.charAt(p.length-1)=="/"?p.substring(1,p.length-1):path=p.substring(1)).split("/")};return{setMode:function(mode){strictMode=mode=="strict"?true:false;return this},setUrl:function(newUri){options.url=newUri===undefined?window.location:newUri;setUp();return this},segment:function(pos){if(!parsed.length){setUp()}if(pos===undefined){return segments.length}return(segments[pos]===""||segments[pos]===undefined)?null:segments[pos]},attr:key,param:param}}();/*******************************************************
 *	jqueryUtils.js
 *	12/21/2007
 *	Mike Peterson - Sirius Computer Solutions
 *
 *  This file contains custom util functions meant
 *	to accompany the jquery.js lib.
 ******************************************************/
 
 	  // Search HTML response string and return innerHTML of element with matching ID.
	  
	  // Start and end tags of element must match case and should be of the
	  // form, "<a id=''></a>".  Does not work for tags of the form,
	  // "<input id=''/>".  Also, the 'id' attribute label must be lower case
	  // in the htmlStr.
	  function inlineSearch(htmlStr, id) {
	  	var fullSearchString = "id=\"" + id + "\"";
		var idIndex = htmlStr.indexOf(fullSearchString);
		var elemStartIndex = -1;
		var elemEndIndex = -1;
		
		if (idIndex >= 0) {
		  // Find beginning index of element tag to return (backwards search)
		  for (var i = idIndex-1; i >= 0; i--) {
		  	if (htmlStr.charAt(i) == '<') {
			  elemStartIndex = i;
			  break;
			}
		  }
		  
		  if (elemStartIndex > 0) {
		  	// Get tag name of element to return
		  	var tagEndIndex = htmlStr.indexOf(" ", elemStartIndex);
			if (tagEndIndex > 0) {
			  var tagName = htmlStr.substring(elemStartIndex+1, tagEndIndex);
			  
			  var startTag = "<" + tagName;
			  var endTag = "</" + tagName + ">";
			  var startTagIndex = new Array();
			  var endTagIndex = new Array();
			  
			  // Reset elementStartIndex to point to end of start tag.
			  elemStartIndex = htmlStr.indexOf(">", elemStartIndex)
			  
			  // Find all occurences of startTag after desired element start tag
			  var tempIndex = elemStartIndex;
			  var count = 0;
			  do {
			  	tempIndex = htmlStr.indexOf(startTag, tempIndex);
				if (tempIndex >= 0) {
					startTagIndex[count] = tempIndex;
					tempIndex++;
					count++;
				}	
			  } while (tempIndex > 0)
			  
			  // Find all occurences of endTag after desired element start index
			  var tempIndex = elemStartIndex;
			  var count = 0;
			  do {
			  	tempIndex = htmlStr.indexOf(endTag, tempIndex);
				if (tempIndex >= 0) {
					endTagIndex[count] = tempIndex;
					tempIndex++;
					count++;
				}	
			  } while (tempIndex > 0)
			  
			  // Get elemEndIndex.  Looks at locations of each start and end tag
			  // to determine which end tag matches the element begin tag.
			  if (endTagIndex.length > 0) {
			  	var startTagCount = 1;
				var sIndex, eIndex = -1;
				tempIndex = 0;
				for (i = 0; i < endTagIndex.length; i++) {
				  // get next set of tags for comparison
				  eIndex = endTagIndex[i];
				  if (tempIndex < startTagIndex.length) {
				  	sIndex = startTagIndex[tempIndex];
				  }
				  
				  // Found matching end tag, or no end tags found which ultimately returns null.
				  if ((eIndex == -1) || ((eIndex < sIndex) && (startTagCount == 1))) {
				  	elemEndIndex = eIndex;
					break;
				  } 
				  // Want to look at next end tag
				  else if (eIndex < sIndex) {
				  	startTagCount--;
				  } 
				  // Want to look at next start tag.  (i-- is so that loop index is not incremented)
				  else if (sIndex < eIndex) {
				  	tempIndex++;
					i--;
				    startTagCount++;	
				  }
				}
				
			    // return element
				if (elemEndIndex > 0) {
				  return elemStr = htmlStr.substring(elemStartIndex+1, elemEndIndex);
				}
			  }
			}
		  }
		} 
	  	
		return null;
	  } 
	  
	  // recursively searches the response jquery object from html string by id
	  // *** This does not work for very deep DOM trees because of the amount
	  //	 of recursion here and in jQuery.  Browsers cannot handle too much.
	  //	 Use inlineSearch() instead.
	  function recursiveSearch(htmlToParse) {
	  	// Search across array of elements in jquery object
		for (var i = 0; i < htmlToParse.length; i++) {
		  var testElem = jQuery(htmlToParse[i]);
		  var elemsInTest = testElem.length;
		  var testChildren = testElem.children();
		  var childrenInTest = testChildren.length;
		  // Check if current jquery object is a match and return
		  if(htmlToParse[i].id == "addToListButton") {
			return htmlToParse[i];
		  } 
		  // Check if current jquery object element has more than one element in  
		  // array and proceed down element tree first
		  else if(elemsInTest > 1) {
		    var innerResult = recursiveSearch(testElem);
		  	if (innerResult != null) return innerResult;
		  } 
		  // Check if current jquery object element has more than one child 
		  // and proceed down each child
		  else if(childrenInTest > 0) {
		  	for (var j = 0; j < childrenInTest; j++) {
			  var childToSearch = jQuery(testChildren[j])
			  var innerResult = recursiveSearch(childToSearch);
			  if (innerResult != null) return innerResult;
			}
		  }
		}
		return null;
	  }
/**
 * Autotab - jQuery plugin 1.1b
 * http://www.lousyllama.com/sandbox/jquery-autotab
 * 
 * Copyright (c) 2008 Matthew Miller
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Revised: 2008-09-10 16:55:08
 */

(function($) {
// Look for an element based on ID or name
var check_element = function(name) {
	var obj = null;
	var check_id = $('#' + name);
	var check_name = $('input[name=' + name + ']');

	if(check_id.length)
		obj = check_id;
	else if(check_name != undefined)
		obj = check_name;

	return obj;
};

/**
 * autotab_magic automatically establishes autotabbing with the
 * next and previous elements as provided by :input.
 * 
 * autotab_magic should called after applying filters, if used.
 * If any filters are applied after calling autotab_magic, then
 * Autotab may not protect against brute force typing.
 * 
 * @name	autotab_magic
 * @param	focus	Applies focus on the specified element
 * @example	$(':input').autotab_magic();
 */
$.fn.autotab_magic = function(focus) {
	for(var i = 0; i < this.length; i++)
	{
		var n = i + 1;
		var p = i - 1;

		if(i > 0 && n < this.length)
			$(this[i]).autotab({ target: $(this[n]), previous: $(this[p]) });
		else if(i > 0)
			$(this[i]).autotab({ previous: $(this[p]) });
		else
			$(this[i]).autotab({ target: $(this[n]) });

		// Set the focus on the specified element
		if(focus != null && (isNaN(focus) && focus == $(this[i]).attr('id')) || (!isNaN(focus) && focus == i))
			$(this[i]).focus();
	}
	return this;
};

/**
 * This will take any of the text that is typed and
 * format it according to the options specified.
 * 
 * Option values:
 *	format		text|number|alphanumeric|all|custom
 *	- Text			Allows all characters except numbers
 *	- Number		Allows only numbers
 *	- Alphanumeric	Allows only letters and numbers
 *	- All			Allows any and all characters
 *	- Custom		Allows developer to provide their own filter
 *
 *	uppercase	true|false
 *	- Converts a string to UPPERCASE
 * 
 *	lowercase	true|false
 *	- Converts a string to lowecase
 * 
 *	nospace		true|false
 *	- Remove spaces in the user input
 * 
 *	pattern		null|(regular expression)
 *	- Custom regular expression for the filter
 * 
 * @name	autotab_filter
 * @param	options		Can be a string, function or a list of options. If a string or
 *						function is passed, it will be assumed to be a format option.
 * @example	$('#number1, #number2, #number3').autotab_filter('number');
 * @example	$('#product_key').autotab_filter({ format: 'alphanumeric', nospace: true });
 * @example	$('#unique_id').autotab_filter({ format: 'custom', pattern: '[^0-9\.]' });
 */
$.fn.autotab_filter = function(options) {
	var defaults = {
		format: 'all',
		uppercase: false,
		lowercase: false,
		nospace: false,
		pattern: null
	};

	if(typeof options == 'string' || typeof options == 'function')
		defaults.format = options;
	else
		$.extend(defaults, options);

	for(var i = 0; i < this.length; i++)
	{
		$(this[i]).bind('keyup', function(e) {
			var val = this.value;

			switch(defaults.format)
			{
				case 'text':
					var pattern = new RegExp('[0-9]+', 'g');
					val = val.replace(pattern, '');
					break;

				case 'alpha':
					var pattern = new RegExp('[^a-zA-Z]+', 'g');
					val = val.replace(pattern, '');
					break;

				case 'number':
				case 'numeric':
					var pattern = new RegExp('[^0-9]+', 'g');
					val = val.replace(pattern, '');
					break;

				case 'alphanumeric':
					var pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
					val = val.replace(pattern, '');
					break;

				case 'custom':
					var pattern = new RegExp(defaults.pattern, 'g');
					val = val.replace(pattern, '');
					break;

				case 'all':
				default:
					if(typeof defaults.format == 'function')
						var val = defaults.format(val);

					break;
			}

			if(defaults.nospace)
			{
				var pattern = new RegExp('[ ]+', 'g');
				val = val.replace(pattern, '');
			}

			if(defaults.uppercase)
				val = val.toUpperCase();

			if(defaults.lowercase)
				val = val.toLowerCase();

			if(val != this.value)
				this.value = val;
		});
	}
};

/**
 * Provides the autotabbing mechanism for the supplied element and passes
 * any formatting options to autotab_filter.
 * 
 * Refer to autotab_filter's description for a detailed explanation of
 * the options available.
 * 
 * @name	autotab
 * @param	options
 * @example	$('#phone').autotab({ format: 'number' });
 * @example	$('#username').autotab({ format: 'alphanumeric', target: 'password' });
 * @example	$('#password').autotab({ previous: 'username', target: 'confirm' });
 */
$.fn.autotab = function(options) {
	var defaults = {
		format: 'all',
		maxlength: 2147483647,
		uppercase: false,
		lowercase: false,
		nospace: false,
		target: null,
		previous: null,
		pattern: null
	};

	$.extend(defaults, options);

	// Sets targets to element based on the name or ID
	// passed if they are not currently objects
	if(typeof defaults.target == 'string')
		defaults.target = check_element(defaults.target);

	if(typeof defaults.previous == 'string')
		defaults.previous = check_element(defaults.previous);

	var maxlength = $(this).attr('maxlength');

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

	if(defaults.format != 'all')
		$(this).autotab_filter(defaults);

	// Go to the previous element when backspace
	// is pressed in an empty input field
	return $(this).bind('keydown', function(e) {
		if(e.which == 8 && this.value.length == 0 && defaults.previous)
			defaults.previous.focus().val(defaults.previous.val());
	}).bind('keyup', function(e) {
		/**
		 * Do not auto tab when the following keys are pressed
		 * 8:	Backspace
		 * 9:	Tab
		 * 16:	Shift
		 * 17:	Ctrl
		 * 18:	Alt
		 * 19:	Pause Break
		 * 20:	Caps Lock
		 * 27:	Esc
		 * 33:	Page Up
		 * 34:	Page Down
		 * 35:	End
		 * 36:	Home
		 * 37:	Left Arrow
		 * 38:	Up Arrow
		 * 39:	Right Arrow
		 * 40:	Down Arrow
		 * 45:	Insert
		 * 46:	Delete
		 * 144:	Num Lock
		 * 145:	Scroll Lock
		 */
		var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

		if(e.which != 8)
		{
			var val = $(this).val();

			if($.inArray(e.which, keys) == -1 && val.length == defaults.maxlength && defaults.target)
				defaults.target.focus();
		}
	});
};

})(jQuery);jQuery.fn.supersleight=function(c){c=jQuery.extend({imgs:!0,backgrounds:!0,shim:"x.gif",apply_positioning:!0},c);return this.each(function(){jQuery.browser.msie&&7>parseInt(jQuery.browser.version,10)&&4<parseInt(jQuery.browser.version,10)&&jQuery(this).find("*").andSelf().each(function(f,d){var a=jQuery(d);if(c.backgrounds&&null!==a.css("background-image").match(/\.png/i)){var b=a.css("background-image"),b=b.substring(5,b.length-2),e="no-repeat"==a.css("background-repeat")?"crop":"scale",b={filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+
b+"', sizingMethod='"+e+"')","background-image":"url("+c.shim+")"};a.css(b)}c.imgs&&a.is("img[src$=png]")&&(b={width:a.width()+"px",height:a.height()+"px",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a.attr("src")+"', sizingMethod='scale')"},a.css(b).attr("src",c.shim));c.apply_positioning&&a.is("a, input","buton")&&(""===a.css("position")||"static"==a.css("position"))&&a.css("position","relative")})})};
