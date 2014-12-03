
/*! Sizzle v1.9.4-pre | (c) 2013 jQuery Foundation, Inc. | jquery.org/license
*/(function(e,t){function n(e,t,n,r){var o,i,u,l,a,c,f,s,h,g;if((t?t.ownerDocument||t:F)!==R&&I(t),t=t||R,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if($&&!r){if(o=vt.exec(e))if(u=o[1]){if(9===l){if(i=t.getElementById(u),!i||!i.parentNode)return n;if(i.id===u)return n.push(i),n}else if(t.ownerDocument&&(i=t.ownerDocument.getElementById(u))&&O(t,i)&&i.id===u)return n.push(i),n}else{if(o[2])return et.apply(n,t.getElementsByTagName(e)),n;if((u=o[3])&&E.getElementsByClassName&&t.getElementsByClassName)return et.apply(n,t.getElementsByClassName(u)),n}if(E.qsa&&(!q||!q.test(e))){if(s=f=k,h=t,g=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){for(c=p(e),(f=t.getAttribute("id"))?s=f.replace(xt,"\\$&"):t.setAttribute("id",s),s="[id='"+s+"'] ",a=c.length;a--;)c[a]=s+d(c[a]);h=pt.test(e)&&t.parentNode||t,g=c.join(",")}if(g)try{return et.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{f||t.removeAttribute("id")}}}return x(e.replace(ct,"$1"),t,n,r)}function r(){function e(n,r){return t.push(n+=" ")>T.cacheLength&&delete e[t.shift()],e[n]=r}var t=[];return e}function o(e){return e[k]=!0,e}function i(e){var t=R.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function u(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}function l(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||Q)-(~e.sourceIndex||Q);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function c(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function f(e){return o(function(t){return t=+t,o(function(n,r){for(var o,i=e([],n.length,t),u=i.length;u--;)n[o=i[u]]&&(n[o]=!(r[o]=n[o]))})})}function s(){}function p(e,t){var r,o,i,u,l,a,c,f=U[e+" "];if(f)return t?0:f.slice(0);for(l=e,a=[],c=T.preFilter;l;){(!r||(o=ft.exec(l)))&&(o&&(l=l.slice(o[0].length)||l),a.push(i=[])),r=!1,(o=st.exec(l))&&(r=o.shift(),i.push({value:r,type:o[0].replace(ct," ")}),l=l.slice(r.length));for(u in T.filter)!(o=mt[u].exec(l))||c[u]&&!(o=c[u](o))||(r=o.shift(),i.push({value:r,type:u,matches:o}),l=l.slice(r.length));if(!r)break}return t?l.length:l?n.error(e):U(e,a).slice(0)}function d(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,o=n&&"parentNode"===r,i=j++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,u){var l,a,c,f=z+" "+i;if(u){for(;t=t[r];)if((1===t.nodeType||o)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||o)if(c=t[k]||(t[k]={}),(a=c[r])&&a[0]===f){if((l=a[1])===!0||l===w)return l===!0}else if(a=c[r]=[f],a[1]=e(t,n,u)||w,a[1]===!0)return!0}}function g(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function m(e,t,n,r,o){for(var i,u=[],l=0,a=e.length,c=null!=t;a>l;l++)(i=e[l])&&(!n||n(i,r,o))&&(u.push(i),c&&t.push(l));return u}function y(e,t,n,r,i,u){return r&&!r[k]&&(r=y(r)),i&&!i[k]&&(i=y(i,u)),o(function(o,u,l,a){var c,f,s,p=[],d=[],h=u.length,g=o||b(t||"*",l.nodeType?[l]:l,[]),y=!e||!o&&t?g:m(g,p,e,l,a),v=n?i||(o?e:h||r)?[]:u:y;if(n&&n(y,v,l,a),r)for(c=m(v,d),r(c,[],l,a),f=c.length;f--;)(s=c[f])&&(v[d[f]]=!(y[d[f]]=s));if(o){if(i||e){if(i){for(c=[],f=v.length;f--;)(s=v[f])&&c.push(y[f]=s);i(null,v=[],c,a)}for(f=v.length;f--;)(s=v[f])&&(c=i?nt.call(o,s):p[f])>-1&&(o[c]=!(u[c]=s))}}else v=m(v===u?v.splice(h,v.length):v),i?i(null,u,v,a):et.apply(u,v)})}function v(e){for(var t,n,r,o=e.length,i=T.relative[e[0].type],u=i||T.relative[" "],l=i?1:0,a=h(function(e){return e===t},u,!0),c=h(function(e){return nt.call(t,e)>-1},u,!0),f=[function(e,n,r){return!i&&(r||n!==L)||((t=n).nodeType?a(e,n,r):c(e,n,r))}];o>l;l++)if(n=T.relative[e[l].type])f=[h(g(f),n)];else{if(n=T.filter[e[l].type].apply(null,e[l].matches),n[k]){for(r=++l;o>r&&!T.relative[e[r].type];r++);return y(l>1&&g(f),l>1&&d(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(ct,"$1"),n,r>l&&v(e.slice(l,r)),o>r&&v(e=e.slice(r)),o>r&&d(e))}f.push(n)}return g(f)}function N(e,t){var r=0,i=t.length>0,u=e.length>0,l=function(o,l,a,c,f){var s,p,d,h=[],g=0,y="0",v=o&&[],N=null!=f,b=L,x=o||u&&T.find.TAG("*",f&&l.parentNode||l),C=z+=null==b?1:Math.random()||.1;for(N&&(L=l!==R&&l,w=r);null!=(s=x[y]);y++){if(u&&s){for(p=0;d=e[p++];)if(d(s,l,a)){c.push(s);break}N&&(z=C,w=++r)}i&&((s=!d&&s)&&g--,o&&v.push(s))}if(g+=y,i&&y!==g){for(p=0;d=t[p++];)d(v,h,l,a);if(o){if(g>0)for(;y--;)v[y]||h[y]||(h[y]=Z.call(c));h=m(h)}et.apply(c,h),N&&!o&&h.length>0&&g+t.length>1&&n.uniqueSort(c)}return N&&(z=C,L=b),v};return i?o(l):l}function b(e,t,r){for(var o=0,i=t.length;i>o;o++)n(e,t[o],r);return r}function x(e,t,n,r){var o,i,u,l,a,c=p(e);if(!r&&1===c.length){if(i=c[0]=c[0].slice(0),i.length>2&&"ID"===(u=i[0]).type&&E.getById&&9===t.nodeType&&$&&T.relative[i[1].type]){if(t=(T.find.ID(u.matches[0].replace(Ct,Et),t)||[])[0],!t)return n;e=e.slice(i.shift().value.length)}for(o=mt.needsContext.test(e)?0:i.length;o--&&(u=i[o],!T.relative[l=u.type]);)if((a=T.find[l])&&(r=a(u.matches[0].replace(Ct,Et),pt.test(i[0].type)&&t.parentNode||t))){if(i.splice(o,1),e=r.length&&d(i),!e)return et.apply(n,r),n;break}}return D(e,c)(r,t,!$,n,pt.test(e)),n}var C,E,w,T,A,S,D,L,B,I,R,P,$,q,H,M,O,k="sizzle"+-new Date,F=e.document,z=0,j=0,G=r(),U=r(),V=r(),X=!1,J=function(e,t){return e===t?(X=!0,0):0},K=typeof t,Q=1<<31,W={}.hasOwnProperty,Y=[],Z=Y.pop,_=Y.push,et=Y.push,tt=Y.slice,nt=Y.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},rt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ot="[\\x20\\t\\r\\n\\f]",it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ut=it.replace("w","w#"),lt="\\["+ot+"*("+it+")"+ot+"*(?:([*^$|!~]?=)"+ot+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+ut+")|)|)"+ot+"*\\]",at=":("+it+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+lt.replace(3,8)+")*)|.*)\\)|)",ct=RegExp("^"+ot+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ot+"+$","g"),ft=RegExp("^"+ot+"*,"+ot+"*"),st=RegExp("^"+ot+"*([>+~]|"+ot+")"+ot+"*"),pt=RegExp(ot+"*[+~]"),dt=RegExp("="+ot+"*([^\\]'\"]*)"+ot+"*\\]","g"),ht=RegExp(at),gt=RegExp("^"+ut+"$"),mt={ID:RegExp("^#("+it+")"),CLASS:RegExp("^\\.("+it+")"),TAG:RegExp("^("+it.replace("w","w*")+")"),ATTR:RegExp("^"+lt),PSEUDO:RegExp("^"+at),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ot+"*(even|odd|(([+-]|)(\\d*)n|)"+ot+"*(?:([+-]|)"+ot+"*(\\d+)|))"+ot+"*\\)|)","i"),bool:RegExp("^(?:"+rt+")$","i"),needsContext:RegExp("^"+ot+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ot+"*((?:-\\d)?\\d*)"+ot+"*\\)|)(?=[^-]|$)","i")},yt=/^[^{]+\{\s*\[native \w/,vt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Nt=/^(?:input|select|textarea|button)$/i,bt=/^h\d$/i,xt=/'|\\/g,Ct=RegExp("\\\\([\\da-f]{1,6}"+ot+"?|("+ot+")|.)","ig"),Et=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{et.apply(Y=tt.call(F.childNodes),F.childNodes),Y[F.childNodes.length].nodeType}catch(wt){et={apply:Y.length?function(e,t){_.apply(e,tt.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}S=n.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},E=n.support={},I=n.setDocument=function(e){var n=e?e.ownerDocument||e:F,r=n.defaultView;return n!==R&&9===n.nodeType&&n.documentElement?(R=n,P=n.documentElement,$=!S(n),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){I()}),E.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),E.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),E.getElementsByClassName=i(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),E.getById=i(function(e){return P.appendChild(e).id=k,!n.getElementsByName||!n.getElementsByName(k).length}),E.getById?(T.find.ID=function(e,t){if(typeof t.getElementById!==K&&$){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(Ct,Et);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(Ct,Et);return function(e){var n=typeof e.getAttributeNode!==K&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=E.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==K?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},T.find.CLASS=E.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==K&&$?n.getElementsByClassName(e):t},H=[],q=[],(E.qsa=yt.test(n.querySelectorAll))&&(i(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||q.push("\\["+ot+"*(?:value|"+rt+")"),e.querySelectorAll(":checked").length||q.push(":checked")}),i(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&q.push("[*^$]="+ot+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),q.push(",.*:")})),(E.matchesSelector=yt.test(M=P.webkitMatchesSelector||P.mozMatchesSelector||P.oMatchesSelector||P.msMatchesSelector))&&i(function(e){E.disconnectedMatch=M.call(e,"div"),M.call(e,"[s!='']:x"),H.push("!=",at)}),q=q.length&&RegExp(q.join("|")),H=H.length&&RegExp(H.join("|")),O=yt.test(P.contains)||P.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},J=P.compareDocumentPosition?function(e,t){if(e===t)return X=!0,0;var r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return r?1&r||!E.sortDetached&&t.compareDocumentPosition(e)===r?e===n||O(F,e)?-1:t===n||O(F,t)?1:B?nt.call(B,e)-nt.call(B,t):0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,o=0,i=e.parentNode,u=t.parentNode,a=[e],c=[t];if(e===t)return X=!0,0;if(!i||!u)return e===n?-1:t===n?1:i?-1:u?1:B?nt.call(B,e)-nt.call(B,t):0;if(i===u)return l(e,t);for(r=e;r=r.parentNode;)a.unshift(r);for(r=t;r=r.parentNode;)c.unshift(r);for(;a[o]===c[o];)o++;return o?l(a[o],c[o]):a[o]===F?-1:c[o]===F?1:0},n):R},n.matches=function(e,t){return n(e,null,null,t)},n.matchesSelector=function(e,t){if((e.ownerDocument||e)!==R&&I(e),t=t.replace(dt,"='$1']"),!(!E.matchesSelector||!$||H&&H.test(t)||q&&q.test(t)))try{var r=M.call(e,t);if(r||E.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(o){}return n(t,R,null,[e]).length>0},n.contains=function(e,t){return(e.ownerDocument||e)!==R&&I(e),O(e,t)},n.attr=function(e,n){(e.ownerDocument||e)!==R&&I(e);var r=T.attrHandle[n.toLowerCase()],o=r&&W.call(T.attrHandle,n.toLowerCase())?r(e,n,!$):t;return o===t?E.attributes||!$?e.getAttribute(n):(o=e.getAttributeNode(n))&&o.specified?o.value:null:o},n.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},n.uniqueSort=function(e){var t,n=[],r=0,o=0;if(X=!E.detectDuplicates,B=!E.sortStable&&e.slice(0),e.sort(J),X){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return e},A=n.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=A(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r];r++)n+=A(t);return n},T=n.selectors={cacheLength:50,createPseudo:o,match:mt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Ct,Et),e[3]=(e[4]||e[5]||"").replace(Ct,Et),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||n.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&n.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return mt.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&ht.test(r)&&(n=p(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Ct,Et).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=G[e+" "];return t||(t=RegExp("(^|"+ot+")"+e+"("+ot+"|$)"))&&G(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==K&&e.getAttribute("class")||"")})},ATTR:function(e,t,r){return function(o){var i=n.attr(o,e);return null==i?"!="===t:t?(i+="","="===t?i===r:"!="===t?i!==r:"^="===t?r&&0===i.indexOf(r):"*="===t?r&&i.indexOf(r)>-1:"$="===t?r&&i.slice(-r.length)===r:"~="===t?(" "+i+" ").indexOf(r)>-1:"|="===t?i===r||i.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),u="last"!==e.slice(-4),l="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,a){var c,f,s,p,d,h,g=i!==u?"nextSibling":"previousSibling",m=t.parentNode,y=l&&t.nodeName.toLowerCase(),v=!a&&!l;if(m){if(i){for(;g;){for(s=t;s=s[g];)if(l?s.nodeName.toLowerCase()===y:1===s.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[u?m.firstChild:m.lastChild],u&&v){for(f=m[k]||(m[k]={}),c=f[e]||[],d=c[0]===z&&c[1],p=c[0]===z&&c[2],s=d&&m.childNodes[d];s=++d&&s&&s[g]||(p=d=0)||h.pop();)if(1===s.nodeType&&++p&&s===t){f[e]=[z,d,p];break}}else if(v&&(c=(t[k]||(t[k]={}))[e])&&c[0]===z)p=c[1];else for(;(s=++d&&s&&s[g]||(p=d=0)||h.pop())&&((l?s.nodeName.toLowerCase()!==y:1!==s.nodeType)||!++p||(v&&((s[k]||(s[k]={}))[e]=[z,p]),s!==t)););return p-=o,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var r,i=T.pseudos[e]||T.setFilters[e.toLowerCase()]||n.error("unsupported pseudo: "+e);return i[k]?i(t):i.length>1?(r=[e,e,"",t],T.setFilters.hasOwnProperty(e.toLowerCase())?o(function(e,n){for(var r,o=i(e,t),u=o.length;u--;)r=nt.call(e,o[u]),e[r]=!(n[r]=o[u])}):function(e){return i(e,0,r)}):i}},pseudos:{not:o(function(e){var t=[],n=[],r=D(e.replace(ct,"$1"));return r[k]?o(function(e,t,n,o){for(var i,u=r(e,null,o,[]),l=e.length;l--;)(i=u[l])&&(e[l]=!(t[l]=i))}):function(e,o,i){return t[0]=e,r(t,null,i,n),!n.pop()}}),has:o(function(e){return function(t){return n(e,t).length>0}}),contains:o(function(e){return function(t){return(t.textContent||t.innerText||A(t)).indexOf(e)>-1}}),lang:o(function(e){return gt.test(e||"")||n.error("unsupported lang: "+e),e=e.replace(Ct,Et).toLowerCase(),function(t){var n;do if(n=$?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===P},focus:function(e){return e===R.activeElement&&(!R.hasFocus||R.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},header:function(e){return bt.test(e.nodeName)},input:function(e){return Nt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:f(function(){return[0]}),last:f(function(e,t){return[t-1]}),eq:f(function(e,t,n){return[0>n?n+t:n]}),even:f(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:f(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:f(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:f(function(e,t,n){for(var r=0>n?n+t:n;t>++r;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;for(C in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[C]=a(C);for(C in{submit:!0,reset:!0})T.pseudos[C]=c(C);s.prototype=T.filters=T.pseudos,T.setFilters=new s,D=n.compile=function(e,t){var n,r=[],o=[],i=V[e+" "];if(!i){for(t||(t=p(e)),n=t.length;n--;)i=v(t[n]),i[k]?r.push(i):o.push(i);i=V(e,N(o,r))}return i},E.sortStable=k.split("").sort(J).join("")===k,E.detectDuplicates=X,I(),E.sortDetached=i(function(e){return 1&e.compareDocumentPosition(R.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||u("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),E.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||u("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||u(rt,function(e,n,r){var o;return r?t:(o=e.getAttributeNode(n))&&o.specified?o.value:e[n]===!0?n.toLowerCase():null}),"function"==typeof define&&define.noamd?define(function(){return n}):e.cbar_Sizzle=n})(window);

// #4322
//if (typeof window.cbar_Sizzle =='undefined') window.cbar_Sizzle=jQuery.find;

var cbar_url= window.location.href;

var cbar_url_en = encodeURIComponent(cbar_url);


				var cbar_dynamic_url = '//www.barilliance.net/';
				var cbar_static_url = '//s3.amazonaws.com/static.barilliance.com/';
				var cbar_userimages = '//s3.amazonaws.com/userimages.barilliance.com/';
				
				var cbar_wl = false;
			 
var cbar_startearly=false;
var cbar_ui_t='';
var cbar_ui_n='';
var cbar_ui_s='';
var cbar_urls_update=false;
var cbar_md= false;
var cbar_ro= false;
var cbar_force_li= false;
var cbar_uro= false;
var cbar_add_data=false;
var cbar_cid='';
var cbar_pid2cid='';
var cbar_cname='';
var cbar_c_from_p=false;
var cbar_cattree=false;
var cbar_cat_cids=[];
var cbar_cat_level =0;
var cbar_cids_cur='';
var cbar_cids_p='';
var cbar_cats_l=[];
var cbar_cats_c=[];
var cbar_lnk=3; 
var cbar_pid='';
var cbar_pid_unique=1;
var cbar_qty=1;
var cbar_hidden_mode=true;
var cbar_logo="star16.png";
var cbar_results = null;
var cbar_str1;
var cbar_str2;
var cbar_str1_w=90;
var cbar_str2_w=90;
var cbar_strs_fsize =15;
var cbar_strs= null;
var cbar_sid=0;
var cbar_uid;
var cbar_nuid=0;
var cbar_pic='';
var cbar_name='';
var cbar_purl='';  // ONLY WORKS FOR SCRAPING MODE 2 !
var cbar_catmode=1;
var cbar_cm2_update=false;
var cbar_pri='';
var cbar_bgcolor='white';
var cbar_bordercolor='gray';
var cbar_icon_bordercolor='orange';
var cbar_color='darkgray';
var cbar_pop_bgcolor='#CAE1FF';
var cbar_pop_bordercolor='gray';
var cbar_pop_color='#050505';
var cbar_pop_pri_color='green';
var cbar_pop_width=250; 
var cbar_pop_show_clk = false;
var cbar_details_template='';
var cbar_rss = false;
var cbar_is_add=false;// obsolete
var cbar_is_pur=false;
var cbar_pur_pids=[];
var cbar_pur_qtys=[];
var cbar_pur_add=false;
var cbar_pur_pid_add='';
var cbar_pur_qty_add=0;
var cbar_crt='';
var cbar_crst='';
var cbar_crtn='';
var cbar_shp='';
var cbar_pur_com=false;
var cbar_pur_mode =0;
var cbar_home=false;
var cbar_other=false;
var cbar_brand=false;
var cbar_switchto=null;
var cbar_encode = false; //false means utf-8
var cbar_lang= false;
var cbar_block_bt=false;
var cbar_cookiedomain = '';
var cbar_user_attributes= new Object();
var cbar_product_attributes= new Object();
var cbar_del_user_attributes= new Object();
var cbar_del_product_attributes= new Object();
var cbar_userinfo= new Object();
var cbar_rtl=false;
var cbar_height =60;
var cbar_width =0;
var cbar_round_corners=false;
var cbar_showprice=false;
var cbar_showiconprice=false;
var cbar_showicontext1 = false;
var cbar_showicontext2 = false;
var cbar_icontext_width1 = 0;
var cbar_icontext_width2 = 0;
var cbar_showiconprice1=false;
var cbar_showiconprice2=false;
var cbar_showicontext_price=true;
var cbar_showicontext_text = true;
var cbar_numicons1 = 6;
var cbar_numicons2 = 4;
var cbar_iconspace=5;
var cbar_dynamic = true;
var cbar_ratio = 0.2;
var cbar_currency = '$';
var cbar_pcm = 0;
var cbar_icontext_col = 'red';
var cbar_iconwidth_small= 55;
var cbar_iconheight_small= 49;
var cbar_iconwidth_large= 110;
var cbar_iconheight_large= 125;
var cbar_icontext_len = 35;
var cbar_icontext_fsize=13;
var cbar_icontext_template ;
var cbar_spacers_width = 110;
var cbar_flash_mode =0;
var cbar_PositionFixedSupported = true; // default
var cbar_show_in_cart = false;
var cbar_abt=0;
var cbar_abt_key=1;
var cbar_pagetype="U";
var cbar_log='';
var cbar_elog='';
var cbar_logg='';
var cbar_log_hov=false;
var cbar_popup_link='more details';
var cbar_pop_add2cart ='';
var cbar_global_temp;
var cbar_oos = 0;
var cbar_oos_page = 0;
var cbar_auto_oos =true;
var cbar_ne = null;
var cbar_ne_html='';
var cbar_sa = null;
var cbar_sa_html='';
var cbar_bs = null;
var cbar_bs_html='';
var cbar_pd = null;
var cbar_pd_html='';
var cbar_fl1 = null;
var cbar_fl1_html='';
var cbar_fl2 = null;
var cbar_fl2_html='';
var cbar_questionmark = true;
var cbar_demo_mode = false;
var cbar_img_search ='';
var cbar_img_replace ='';
var ie7u =false;
var cbar_shf = false; 
var cbar_ipuid_save=false;
var cbar_ipuid_get=false;

var cbar_span_template ='';
var cbar_span_width = 300;
var cbar_span_bg_t= "span/popup_top.png";
var cbar_span_bg= "span/popup_middle.png";
var cbar_span_bg_b= "span/popup_bottom.png";
var ie6_small_icons_shift = false;
var cbar_extra1='';
var cbar_extra2='';
var cbar_extra3='';
var cbar_xtxt='';
var cbar_filter_val='';
var cbar_flow ='';
var cbar_num_widgets =2;
var cbar_search='';
var cbar_e_clk=false;
var cbar_ctr1=0;
var cbar_ctr2=0;
var cbar_ctr3=0;
var cbar_liX=1;
var cbar_liP=1;
var cbar_liL=1;

var cbar_new_mode_enabled = false;
var cbar_widget_show = false;
var cbar_widget_to_draw=0; //1,2,0=all
var cbar_widget=false;
var cbar_w_template_head= [];
var cbar_w_item_template=[];
var cbar_w_linebreak_template=[];
var cbar_w_iconsperline=[];
var cbar_w_template_bottom=[];
var cbar_w_anchor = [];
var cbar_w_insert_where=[]; // 0=after 1=before 2=child 3= overwrite
var cbar_w_title_len= 199;
var cbar_w_scrollbuttons = [];
var cbar_w_numshowicons = [];
var cbar_w_next_html= [];
var cbar_w_prev_html= [];
var cbar_dups_ok=false;

// facebook fan_page
var cbar_fb_fanpage=false;

// for facebook widget (obsolete)
var cbar_fb_show = false;
var cbar_fb=false;
var cbar_fb_iniframe=true;
var cbar_fb_api_key = '';
var cbar_fb_channel_path = "xd_receiver.htm";//todo- move to def file
var cbar_fb_api = null;
var cbar_fb_id =null;
var cbar_fb_anchor=null;
var cbar_fb_width=400;
var cbar_fb_url_sep ='&';
var cbar_fb_wantit='tbd...';
var cbar_fb_isconnected =null;
var cbar_fb_template_loggedout='';
var cbar_fb_template_loggedin='';
var cbar_fb_template_loggedinuser='';
var cbar_fb_feed_template='';
var cbar_fb_actionlink='';
var cbar_fb_insert_where=0; // 0=after 1=before 2=child 3= overwrite
var cbar_fb_wl_item_template ='';
var cbar_fb_wl_bottom_template ='';
var cbar_fb_wl_head_template ='';
var cbar_fb_wl_empty='';
var cbar_fb_wl_width=400;
var cbar_fb_wl_height = 300;
var cbar_fb_wl_offset = -100;
var cbar_fb_get_random = false;
var cbar_fb_get_emails_perm=false;
var cbar_fb_ref='';
var cbar_fb_clk=false;

var cbar_shortlist_show= false;

var cbar_LP=false;

// internal
var cbar_datajs='data.js.php';
var cbar_override_titles=[];
var rule_title_index= [];
var cbar_recstep_titles =[];
var cbar_new_mode = false;
var cbar_suppress_rules=[];

var cbar_user_wantit = false;
var cbar_fb_total_wantit =0;
var cbar_fb_friends=[];
var cbar_fb_friends_str='';
var cbar_fb_wantit_friends=[];
var cbar_fb_wantit_nonfriends=[];
var cbar_fb_total_wantit_friends =0;
var cbar_fb_random_users =[];
var cbar_wl_items = [];
var cbar_lvt=0;
var cbar_sess=0;
var cbar_sess_pv=0;
var cbar_exp =false;
var cbar_date = new Date();
var cbar_abt_str ='';
var cbar_scrolltimeout =0;
var cbar_resizetimeout =0;
var cbar_ban_resizetimeout =0;
var cbar_ban_scrolltimeout =0;
var cbar_ban_retrytimeout =0;
var cbar_banners=[];
var cbar_coups=[];
var cbar_e_input=[];
var cbar_e_last='';
var cbar_e_com=false;
var cbar_e_checkbox=[];
var cbar_cou_input='';
var cbar_rules_str='';
var cbar_popups=[];
var cbar_pop_scrolltimeout =0;
var cbar_img_overlay_show_params=[];
var cbar_ba=false;

var cbar2url ={
cbar_cid: "cid",
cbar_pid2cid: "pid2cid",
cbar_pic: "pic",
cbar_name: "name",
cbar_purl: "purl",
cbar_pri: "pri",
cbar_log: "lo",
cbar_elog: "elo",
cbar_logg: "logg",
cbar_crt: "crt",
cbar_crtn: "crtn",
cbar_crst: "crst",
cbar_shp: "shp",
cbar_extra1: "xtr1",
cbar_extra2: "xtr2",
cbar_extra3: "xtr3",
cbar_xtxt: "xtxt",
cbar_filter_val: "fltr",
cbar_oos:"oos"
}

//ret
var cbar_pub_only=false; //true= only publisher
var cbar_adv=false;

function cbar_findPos(obj) {

	var curleft = curtop =curright= 0;
	var objwidth= obj.scrollWidth;
	var objheight= obj.scrollHeight;
	
	if (obj.offsetParent) {

	do {
			curleft += obj.offsetLeft;
		
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curleft,curtop,window.document.body.scrollWidth- curleft- objwidth, curtop+objheight];
	}
}

		// widget file
		var cbar_curricon = [0,0,0,0];
		var action_text='';
		
		var cbar_w_shownext =[false,false,false,false];
		var cbar_w_showprev=[false,false,false,false];
		
		function cbar_w_init () {
		
		return;
		}
		
	function cbar_data_returned_widget(){
//		if (typeof (cbar_after_load) =='function') cbar_after_load('widget');
	
		for (var i=0; i < cbar_results.length; i++ ){
			if  ((cbar_widget_to_draw >0) && (cbar_widget_to_draw-1) !=i) continue; 
			
			if  (( cbar_results[i].length ==0) || (cbar_w_anchor.length <i ) || (typeof cbar_w_anchor[i] == "undefined") || (cbar_w_anchor[i] == null)  ) continue;
			
			var cbar_recstep = eval("cbar_rectype"+i);

			if ((cbar_w_scrollbuttons == true) || ((typeof cbar_w_scrollbuttons[i] != 'undefined') && cbar_w_scrollbuttons[i])) {
				if ( (cbar_w_numshowicons[i]+cbar_curricon[i]) < cbar_results[i].length) cbar_w_shownext[i]=true; else cbar_w_shownext[i]=false;
				if (cbar_curricon[i] > 0) cbar_w_showprev[i]=true; else cbar_w_showprev[i]=false;
			}

			if (typeof cbar_w_numshowicons[i] !='number') cbar_w_numshowicons[i] = 99;
			
			if (typeof cbar_override_titles[i]  !='undefined') title_index= cbar_override_titles[i] ; else title_index=cbar_recstep;
			if (typeof rule_title_index[i] !='undefined') title_index = rule_title_index[i];
			cbar_widget_html= cbar_w_template_head[i].replace(/%group_title%/g, cbar_recstep_titles[title_index]);
			
			var cbar_numicons=eval ('cbar_numicons'+(i+1)); 

			for (var t=cbar_curricon[i]; (t < cbar_results[i].length) && ( t <  cbar_numicons)&& ((t-cbar_curricon[i]) <cbar_w_numshowicons[i]); t++){
				if  ( (typeof cbar_w_iconsperline[i] == "number") && (t>0) &&((t % cbar_w_iconsperline[i])==0 ) && (typeof cbar_w_linebreak_template[i] !='undefined')) cbar_widget_html+=cbar_w_linebreak_template[i];
				
				try {//#231
					var cbar_short_title = decodeURIComponent(cbar_results[i][t][2].replace (/\+/g, ' '));
				}catch (err){
					var cbar_short_title=unescape(cbar_results[i][t][2]).replace (/\+/g, ' ');
				}
		
				cbar_short_title=cbar_short_title.substring(0, cbar_w_title_len);
				if  (cbar_short_title.length == cbar_w_title_len) cbar_short_title+='...';
				
				try{ //#231
				var cbar_tmp_xtr1=decodeURIComponent(cbar_results[i][t][16].replace (/\+/g, ' '));
				}catch (err){
					var cbar_tmp_xtr1=unescape(cbar_results[i][t][16]);
				}
				try{
				var cbar_tmp_xtr2=decodeURIComponent(cbar_results[i][t][17].replace (/\+/g, ' '));
				}catch (err){
					var cbar_tmp_xtr2=unescape(cbar_results[i][t][17]);
				}
				try{
				var cbar_tmp_xtr3=decodeURIComponent(cbar_results[i][t][18].replace (/\+/g, ' '));
				}catch (err){
					var cbar_tmp_xtr3=unescape(cbar_results[i][t][18]); 
				}
				var cbar_clk_js = ' return cbar_click(document.getElementById(\'cbar_div_'+(i+1)+(t+1)+'\'))'; // taken from bar. needs check
												
				if  (cbar_recstep ==19)  {
					try{ action_text=eval('ra_action_texts.'+eval('cbar_ra_data_'+cbar_results[i][t][0]+'.activity'));} catch(error){action_text='';};
				}	
					
				cbar_widget_html+= cbar_w_item_template[i].replace(/%picture%/g, decodeURIComponent(cbar_results[i][t][1].replace (/\+/g, ' ')))
				.replace(/%idx%/g, cbar_results[i][t][0])
				.replace(/%rectype%/g, cbar_recstep)
				.replace(/%title%/g, cbar_short_title)
				.replace(/%ra_action%/g, action_text )
				.replace(/%url%/g, decodeURIComponent(cbar_results[i][t][3].replace (/\+/g, ' ')))
				.replace(/%price%/g, decodeURIComponent(cbar_results[i][t][4].replace (/\+/g, ' ')))
				.replace(/%price_clean%/g, decodeURIComponent(cbar_results[i][t][5].replace (/\+/g, ' ')))
				.replace(/%pid%/g, decodeURIComponent(cbar_results[i][t][6].replace (/\+/g, ' ')))
				.replace(/%clicks%/g, decodeURIComponent(cbar_results[i][t][7].replace (/\+/g, ' ')))
				.replace(/%hoovers%/g, decodeURIComponent(cbar_results[i][t][8].replace (/\+/g, ' ')))
				.replace(/%onclick%/g, cbar_clk_js)
				.replace(/%new%/g, (cbar_results[i][t][10]=='1') ? cbar_ne_html:'')
				.replace(/%sale%/g, (cbar_results[i][t][11]=='1') ? cbar_sa_html:'')
				.replace(/%bestseller%/g, (cbar_results[i][t][12]=='1') ? cbar_bs_html:'')
				.replace(/%pricedrop%/g, (cbar_results[i][t][13]=='1') ? cbar_pd_html:'')
				.replace(/%flag1%/g, (cbar_results[i][t][14]=='1') ? cbar_fl1_html:'')
				.replace(/%flag2%/g, (cbar_results[i][t][15]=='1') ? cbar_fl2_html:'')
				.replace(/%xtr1%/g, cbar_tmp_xtr1)
				.replace(/%xtr2%/g, cbar_tmp_xtr2)
				.replace(/%xtr3%/g, cbar_tmp_xtr3)
				.replace(/%perc_purchased%/g, decodeURIComponent(cbar_results[i][t][19].replace (/\+/g, ' ')))
				.replace(/%t%/g, t);
			}
			
			cbar_widget_html+= cbar_w_template_bottom[i];
			
			cbar_w_prev_html_tmp='';
			if (typeof cbar_w_prev_html =='object' && typeof cbar_w_prev_html[i]!='undefined') cbar_w_prev_html_tmp= cbar_w_prev_html[i];
			if (typeof cbar_w_prev_html =='string') cbar_w_prev_html_tmp = cbar_w_prev_html;
			cbar_widget_html=cbar_widget_html.replace(/%prevbutton%/g, (cbar_w_showprev[i])?cbar_w_prev_html_tmp:"");
			
			cbar_w_next_html_tmp='';
			if (typeof cbar_w_next_html =='object' && typeof cbar_w_next_html[i]!='undefined') cbar_w_next_html_tmp= cbar_w_next_html[i];
			if (typeof cbar_w_next_html =='string') cbar_w_next_html_tmp = cbar_w_next_html;
			cbar_widget_html=cbar_widget_html.replace(/%nextbutton%/g, (cbar_w_shownext[i])?cbar_w_next_html_tmp:"");
			
			var cbar_tmp = document.createElement('div'); 
			cbar_tmp.innerHTML = cbar_widget_html.replace(/%i%/g, i);
			var cbar_new_w = cbar_tmp.firstChild;
			var parent = cbar_w_anchor[i].parentNode;
			
			if (cbar_w_insert_where[i]==2) cbar_w_anchor[i].appendChild(cbar_new_w);
			else if (cbar_w_insert_where[i]==1) 	parent.insertBefore(cbar_new_w, cbar_w_anchor[i]);
			else if (cbar_w_insert_where[i]==3) 	parent.replaceChild(cbar_new_w, cbar_w_anchor[i]);
			else if (cbar_w_insert_where[i]==0) {
				if (parent.lastchild == cbar_w_anchor[i]) 
					parent.appendChild(cbar_new_w);
				else 
					parent.insertBefore(cbar_new_w, cbar_w_anchor[i].nextSibling);
			}
		}
		if (typeof (cbar_after_show) =='function') cbar_after_show('widget');
		
}

function cbar_del_widgets(){
	for (var i=0; i<cbar_num_widgets; i++){
		var cbar_widget=document.getElementById("cbar_widget"+i);
		if (cbar_widget !=null) cbar_widget.parentNode.removeChild (cbar_widget);
	}
}

function cbar_w_next (group){

	cbar_del_widgets();
	cbar_curricon[group]+=1;
	cbar_data_returned_widget();

	return false;
}

function cbar_w_prev (group){
	cbar_del_widgets();
	cbar_curricon[group]-=1;
	cbar_data_returned_widget();
	return false;
}

//end widget file// sl functions
var cbar_shortlist_url=cbar_dynamic_url;
cbar_shortlist_url='//barilliance.net/';

var sl_box_t=100;
var sl_side='r';

/* Tongue Skin 2 */  
var sl_tongue_html='<div style="color:white; top:5px; left:15px; position:absolute; font-weight:bold; font-size:13px; line-height:13px;  margin:0 0 0 0; padding 0 0 0 0; width:20px;  cursor:pointer; cursor:hand; display:block; text-align:center;">S<br/>H<br/>O<br/>R<br/>T<br/> <br/>L<br/>I<br/>S<br/>T</div>';
var sl_tongue_img='shortlist_tongueV3.png';
var sl_tongue_img_w=45;
var sl_tongue_img_h=148;
var sl_tongue_t=150; //top of tongue

var sl_add_img='shortlist_addV3.png';
var sl_add_img_w=31;
var sl_add_img_h=33;
var sl_add_img_x=3;
var sl_add_img_y=-6;
var sl_add_html='';


var sl_num_img='shortlist_numV3.png';
var sl_num_img_w=46;
var sl_num_img_h=33;
var sl_num_img_x=0;
var sl_num_img_y=0;
var sl_num_style='color:red; font-weight:bold; line-height:26px;font-size:14px;';
/* end tongue skin 2 */


var sl_add_show=false;
  
var sl_base='//s3.amazonaws.com/shortlist.barilliance.com/';

var sl_top_img='shortlist_top.png';
var sl_body_img='shortlist_body.png';
var sl_bottom_img='shortlist_bottom.png';
var sl_close_img='shortlist-close.png';
var sl_help_img='shortlist_help.png';
var sl_box_title='Short list';
var sl_box_title_style='color:black; margin-left:10px; font-weight:bold; line-height:40px;';
var sl_box_w=290;
var sl_box_h=390;
var sl_box_top_h=73;
var sl_box_bottom_h=32;
var sl_help_html='<b>Short List help</b><br/><br/>The Short list is a convenient place to keep products when you search for the one which is right for you.<br/> Your Short List products are always available anywhere on the site without leaving the page you\'re on.';
sl_help_html+='<br/><br/><b>Add product </b> To add product to the Short List click the + symbol which appears on the Short List tab when visiting product pages.';
sl_help_html+='<br/><br/><b>View products </b> To view your Short List click on the Short List tab.';
sl_help_html+='<br/><br/><b>Remove product </b> To remove a product from the Short List click the tab to view products, then click the delete symbol next to the product you want removed.';


var sl_pop_img='shortlist_popup.png';
var sl_pop_img_w=142;
var sl_pop_img_h=79;
var sl_pop_style='color:red; font-weight:bold; font-size:12px; line-height:13px; display:block; margin:10px 5px;5px 5px';
var sl_added_msg="Product Added";
var sl_exists_msg="Product Exists";
var sl_removed_msg="Product Removed";
var sl_noproducts="Your Short List is empty";

var sl_price_style='font-size:12px; color:green; font-weight:bold;';
var sl_button_img='shortlist_button2.png';
var sl_button_html='Go to product';
var sl_button_style='margin-top:10px; float:right; color:white; font-size:12px; line-height:22px; text-align:center;'
var sl_title_len= 50;

var sl_by_barilliance=' <a style="text-decoration:none;" href="http://www.barilliance.com/shortlist_easy_shopping_experience" target="_blank"><div style="color: gray; font-size: 12px; position: relative; top: 11px; left: 180px; width: 107px; height: 18px; display: block; font-family: serif;">by <span style="color:dark-gray; font-size: 13px;font-weight:bold;"><i> Barilliance</i></span></div></a>';



/////////////////
// sl_position
// called when fixed positioning is not supported

sl_position_callback = function (){
	
	var  scrolltop = document.compatMode=="CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop;
	if (typeof window.sl_element!='undefined'){
		window.sl_element.style.top=sl_box_t+scrolltop+"px"; 
		if (sl_side=='l') {window.sl_element.style.left="0px"; window.sl_element.style.right="auto";}
		if (sl_side=='r') {window.sl_element.style.right="0px"; window.sl_element.style.left="auto";}
	}
	if (typeof window.sl_tongue_element !='undefined'){
		window.sl_tongue_element.style.top=sl_box_t+scrolltop+"px"; 
		if (sl_side=='l') {window.sl_tongue_element.style.left="0px"; window.sl_tongue_element.style.right="auto";}
		if (sl_side=='r') {window.sl_tongue_element.style.right="0px"; window.sl_tongue_element.style.left="auto";}
	}
	
}



// callback- initiates shortlist after page loads (caller from cbar.js after scraping)
cbar_shortlist= function (){
	show_tongue ();
	if (!cbar_PositionFixedSupported ) cbar_listen ("scroll", window, sl_position_callback);
	cnt= sl_update_count ();
	if (isNaN(cnt)) loadjscssfile (cbar_shortlist_url+'shortlist.php?a=i&sid='+cbar_sid+'&uid='+cbar_uid+"&ts="+Math.ceil(10000*Math.random()),'js');	
}

////////////////////
//  sl_show
// show shortlist after tongue was clicked
sl_show =function (e){
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    	
    // delete tongue
     var content_div=document.getElementById('sl_tongue');
     window.document.body.removeChild(content_div);
  
    var html="<div id='sl_wrapper' style='z-index:1000000; width:"+sl_box_w+"px; height:"+sl_box_h+"px; text-align:left; border:0 0 0 0; margin:0 0 0 0; position:fixed; top:"+sl_box_t+"px; "+side_str+"'>";
		if (!cbar_PositionFixedSupported) html=html.replace(/fixed/,'absolute'); // change to absolute positioning
		// top
		html+="<div style='background:url("+sl_base+sl_top_img+"); width:"+sl_box_w+"px; height:"+sl_box_top_h+"px; border:0 0 0 0; margin:0 0 0 0;'><div style='background:url("+sl_base+sl_close_img+"); position:absolute; top:8px; right:10px;  width:22px; height:22px; display:block;' onclick='sl_close();'></div><div style='background:url("+sl_base+sl_help_img+"); position:absolute; top:8px; right:40px;  width:22px; height:22px; display:block;' onclick='sl_help();'></div> <div id='sl_pop' style='position:absolute; display:none; background:url("+sl_base+sl_pop_img+"); height:"+sl_pop_img_h+"px; width:"+sl_pop_img_w+"px; top:"+(-10-sl_pop_img_h)+"px; left:"+(-20-sl_pop_img_w)+"px; color:red; text-align:center; '><span id='sl_msg' style='"+sl_pop_style+"'></span></div><span style='"+sl_box_title_style+"'>"+sl_box_title+"</span> </div>";
		
		//body
		html+="<div style='background:url("+sl_base+sl_body_img+"); width:"+sl_box_w+"px; height:"+(sl_box_h-sl_box_top_h-sl_box_bottom_h)+"px; border:0 0 0 0; margin:0 0 0 0;'><div id='sl_content' style='margin:0 0 0 0; border:0 0 0 0; padding:0 0 0 0;' ></div></div>";
		// bottom
		html+="<div style='background:url("+sl_base+sl_bottom_img+"); width:"+sl_box_w+"px; height:"+sl_box_bottom_h+"px; border:0 0 0 0; margin:0 0 0 0;'> "+sl_by_barilliance+"</div>";
    html+="</div>"; // wrapper
    
    tmp=window.document.createElement('div');
    tmp.innerHTML=html;
    window.document.body.appendChild(tmp.childNodes[0]);
	
	
	if (!cbar_PositionFixedSupported) {
		window.sl_element=document.getElementById('sl_wrapper');; // quicker positioning when fixed not supported
		sl_position_callback();
	}
	
	loadjscssfile (cbar_shortlist_url+'shortlist.php?a=g&sid='+cbar_sid+'&uid='+cbar_uid+"&ts="+Math.ceil(10000*Math.random()),'js');
	
}

    
///////////////////
// sl_fill_content
function sl_fill_content() {
    var content_div=document.getElementById('sl_content');
	 products = window.sl_products;
    var html="<div id='sl_inner_div' style='overflow:auto; width:"+(sl_box_w-30)+"px; height:"+(sl_box_h-sl_box_top_h-sl_box_bottom_h-4)+"px; margin:0px 15px 0px 15px; padding 0 0 0 0; '>";
    for (i=0; i< products.length; i++){
        html+=sl_render_product (products[i]);        
    }
    html+="</div>";
    content_div.innerHTML=html;
}

///////////////////
// sl render product
function sl_render_product (product){
    var img_div_width=((sl_box_w-50)*0.4 -5);
    var info_div_width= ((sl_box_w-50)*0.6 -2)
    var short_title = decodeURIComponent(product.p_name).substring(0, sl_title_len);
                if  (short_title.length == sl_title_len) short_title+='...';        
        
        
	var html="<div style='width:"+(sl_box_w-50)+"px; height:auto; display:block; border-bottom:1px dotted lightgray; margin:4px 0px 4px 0px;'>";

    html+="<a style='text-decoration:none; color:#333333; cursor:pointer; cursor:hand; ' href='"+product.p_url+"'>";
	html+="	<div style='float:left; display:block; width:"+img_div_width+"px; height:auto; margin:2px;'>";
	html+="		<img style='width:"+img_div_width+"px; height:auto; ' src='"+decodeURIComponent(product.p_img)+"'/>";
    html+="	</div>";
    html+="	<div style='float:left; display:block; width:"+info_div_width+"px; height:auto;'>";
    html+="		<div style='font-size:12px; font-weight:bold; margin:2px; display:block;'>"+short_title+"</div>";
	html+="		<div style=' margin:4px 2px 4px 2px; display:block; "+sl_price_style+"'>"+decodeURIComponent(product.p_price)+"</div>";
    //html+="<span style='background:url("+sl_base+sl_button_img+"); width:90px; height:25px; display:block; margin 0 0 0 0; padding 0 0 0 0; "+sl_button_style+"'>"+sl_button_html+"</span>";
	html+="		<div style='background:url("+sl_base+"shortlist_delete.png); float:right; margin:8px;width:19px; height:19px; display:block; padding 0 0 0 0; ' onclick=' return sl_delete("+product.p_pid+");'></div>";	
    html+="	</div> </a>";
    html+="<br style='clear:both;'/></div>";
        
        
  return html;
    
}


////////////////////
// sl_close
sl_close= function (){
    var content_div=document.getElementById('sl_wrapper');
     window.document.body.removeChild(content_div);
    show_tongue();
	sl_update_count ();
}

///////////////
// sl_help
sl_help=function (){
 var content_div=document.getElementById('sl_content');
	 
    var html="<div style=' width:"+(sl_box_w-30)+"px; height:20px; margin:0px 15px 5px 15px; text-align:right;'><img onclick='sl_fill_content();' src='"+sl_base+"shortlist_delete.png'></div>";
	html+="<div id='sl_inner_div' style='overflow:auto; width:"+(sl_box_w-30)+"px; height:"+(sl_box_h-sl_box_top_h-sl_box_bottom_h -25 -4)+"px; margin:0px 15px 0px 15px; padding 0 0 0 0; '>";
    html+=sl_help_html;
    html+="</div>";
    content_div.innerHTML=html;
}

///////////////////////////
// click on add button
sl_add =function (e){

    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
	
	loadjscssfile (cbar_shortlist_url+'shortlist.php?a=a&sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+encodeURIComponent(cbar_pid)+'&url='+encodeURIComponent((cbar_purl=='')?cbar_url:cbar_purl)+'&pic='+encodeURIComponent(cbar_pic)+'&name='+encodeURIComponent(cbar_name)+'&pri='+encodeURIComponent(cbar_pri)+"&ts="+Math.ceil(10000*Math.random()),'js');
        
}

///////////////////
// show_tongue 
function show_tongue (){
    if (sl_side=='l') side_str=' left:0px; '; else side_str=' right:0px; ';
    var html="<div id='sl_tongue' style=' z-index:1000000; background:url("+sl_base+sl_tongue_img+");border:0 0 0 0; margin:0 0 0 0; position:fixed; width: "+sl_tongue_img_w+"px; height:"+sl_tongue_img_h+"px; top:"+sl_tongue_t+"px; "+side_str+"'>";
	if (!cbar_PositionFixedSupported) html=html.replace(/fixed/,'absolute'); // change to absolute positioning
	
    // Add tab
	// decide if we should show the add tab
	if  ((cbar_pid.length) && (cbar_pic.length) && (cbar_name.length)) sl_add_show=true; else sl_add_show=false;
	   
    // num items tab
    html+="<div id='sl_num' style='position:absolute; background:url("+sl_base+sl_num_img+"); height:"+sl_num_img_h+"px; width:"+sl_num_img_w+"px; top:"+((-sl_num_img_h)+ sl_num_img_y)+"px; left:"+(((sl_tongue_img_w- sl_num_img_w)/2)+sl_num_img_x)+"px; color:red; text-align:center; '><span id='sl_num_number' style='"+sl_num_style+"'></span></div>";
    
	if (sl_add_show) html+="<div id='sl_add' style='position:absolute; background:url("+sl_base+sl_add_img+"); height:"+sl_add_img_h+"px; width:"+sl_add_img_w+"px; top:"+(sl_tongue_img_h+sl_add_img_y)+"px; left:"+(((sl_tongue_img_w- sl_add_img_w)/2)+sl_add_img_x)+"px;  cursor:pointer; cursor:hand; text-align:center; '>"+sl_add_html+"</div>";
    	
    // tongue popup
    html+="<div id='sl_pop' style='position:absolute; display:none; background:url("+sl_base+sl_pop_img+"); height:"+sl_pop_img_h+"px; width:"+sl_pop_img_w+"px; top:"+(-10-sl_pop_img_h)+"px; left:"+(-20-sl_pop_img_w)+"px; color:red; text-align:center; '><span id='sl_msg' style='"+sl_pop_style+"'></span></div>";

    html+=sl_tongue_html+"</div>";
        
    tmp=window.document.createElement('div');
    tmp.innerHTML=html;
    window.document.body.appendChild(tmp.childNodes[0]);
	
	if (!cbar_PositionFixedSupported) {
		window.sl_tongue_element=document.getElementById('sl_tongue'); // save for quicker positioning when fixed not supported
		sl_position_callback();
	}

    // listen to clicks on tongue
    cbar_listen('click', document.getElementById('sl_tongue'), sl_show );
	if (sl_add_show) cbar_listen('click', document.getElementById('sl_add'), sl_add ); // listen to clicks on add
	
}

//////////////////////////
// update count on the tongue
// return count or NaN
function sl_update_count(){
		var cnt = parseInt( cbar_readCookie ('sl_cnt'));
		if (!isNaN(cnt)) {		
			document.getElementById('sl_num_number').innerHTML=cnt;
		}
	return cnt;
}


////////////////////////
// sl_delete
sl_delete = function (pid){
	//if (!e) var e = window.event;
    //e.cancelBubble = true;
    //if (e.stopPropagation) e.stopPropagation();
	
	loadjscssfile (cbar_shortlist_url+'shortlist.php?a=d&sid='+cbar_sid+'&uid='+cbar_uid+'&pid_int='+pid+"&ts="+Math.ceil(10000*Math.random()),'js');
 
   
   return false;
}

//////////////////
// sl_popup
sl_popup = function (message_text){
	tmp=document.getElementById('sl_msg');
		tmp.innerHTML=message_text;
		tmp=document.getElementById('sl_pop');
		tmp.style.display='block';
		setTimeout ('document.getElementById(\'sl_pop\').style.display=\'none\';',3000)
}    
//////////////////
// call_returned
 sl_call_returned=function (action) {
	// store updated count in cookie
	
	if (action=='i')  sl_update_count();
	if (action=='a')  {
		if (sl_product_added) sl_popup (sl_added_msg);
		else  sl_popup (sl_exists_msg);
		sl_update_count();
		
	}
	if (action=='g') {
		if (window.sl_products.length==0)	{
			sl_help(); // show help if no products
			sl_popup (sl_noproducts);
		}
		else	sl_fill_content (window.sl_products);
	}
	if (action=='d') sl_fill_content (window.sl_products);
	 
 }
            
function cbar_listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
         var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
    return false;
}


	var qr_base='//s3.amazonaws.com/qrcode.barilliance.com/';
	var qr_powered_by=' <a style="text-decoration:none;" href="http://www.barilliance.com/" target="_blank"><div style="color: gray; font-size: 12px; position: relative; top: 11px; left: 180px; width: 107px; height: 18px; display: block; font-family: serif;">by <span style="color:dark-gray; font-size: 13px;font-weight:bold;"><i> Barilliance</i></span></div></a>';
	


var qr_top_img='qr_top.png';
var qr_body_img='qr_body.png';
var qr_bottom_img='qr_bottom.png';
var qr_box_w=291;
var qr_box_t=100;
var qr_close_img='qr_close.png';
var  side_str=' right:0px; ';


////////////////////
//  cbar_QR_show
// show qr code popup after banner was clicked
cbar_QR_show =function (e){

    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    	
    // delete tongue
     //var content_div=document.getElementById('sl_tongue');
     //window.document.body.removeChild(content_div);
	var qr_left= parseInt((window.document.body.scrollWidth-qr_box_w)/2);
    var html="<div id='qr_wrapper' style='z-index:1000000; width:"+qr_box_w+"px; height:auto; text-align:left; border:0 0 0 0; margin:0 0 0 0; position:fixed; top:"+qr_box_t+"px; left:"+qr_left+"px'>";
	if (!cbar_PositionFixedSupported) html=html.replace(/fixed/,'absolute'); // change to absolute positioning
	// top
	html+="<div style='background:url("+qr_base+qr_top_img+"); width:"+qr_box_w+"px; height:23px; border:0 0 0 0; margin:0 0 0 0;'><div style='background:url("+qr_base+qr_close_img+"); position:absolute; top:4px; right:1px;  width:25px; height:24px; display:block;' onclick='cbar_qr_close();'></div> </div>";
	
	//body
	 var cbar_qr_html=decodeURIComponent(window.cbar_qr_code.replace (/\+/g, ' '));
	 
	 cbar_qr_html=cbar_qr_html.replace ('%qrcode%','<img src="http://img.barilliance.net/qrcode.php?url='+encodeURIComponent(window.location.href)+'&s='+cbar_sid+'"> ');
	
	html+="<div style='background:url("+qr_base+qr_body_img+"); width:"+qr_box_w+"px; height:auto; border:0 0 0 0; margin:0 0 0 0;'><div id='qr_content' style='margin:0 15px 0 15px; border:0 0 0 0; padding:0 0 0 0;' >";
	html+=cbar_qr_html;
	html+="</div></div>";
	// bottom
	html+="<div style='background:url("+qr_base+qr_bottom_img+"); width:"+qr_box_w+"px; height:32px; border:0 0 0 0; margin:0 0 0 0;'> "+qr_powered_by+"</div>";
    html+="</div>"; // wrapper
    
    tmp=window.document.createElement('div');
    tmp.innerHTML=html;
    window.document.body.appendChild(tmp.childNodes[0]);
	
	
	if (!cbar_PositionFixedSupported) {
		window.qr_element=document.getElementById('qr_wrapper'); // quicker positioning when fixed not supported
		qr_position_callback();
	}

}

////////////////////
// qr_close
cbar_qr_close= function (){
    var content_div=document.getElementById('qr_wrapper');
     window.document.body.removeChild(content_div);

}

function  cbar_click2 (a_element, url, rectype, to_pid) {

	// set temp cookie that will register the click after the page is switched to the selected product
	cbar_createCookie('cbar_rec_clk',  rectype+','+to_pid+','+encodeURIComponent(cbar_pid)+','+encodeURIComponent(cbar_cid)+','+cbar_pagetype ,0); // will be deleted in next page view
	cbar_report_click(true); // first click report (sometimes may not work)  = to support back button on IE we dont use redirection
	a_element.href= url;
	return true; // go to the product in the href (the click will be registered after the page chages- allows back button to work normally);
}

function  cbar_click3 (a_element, url, rectype, to_pid, to_pid_orig) {
	// set temp cookie that will register the click after the page is switched to the selected product
	cbar_createCookie('cbar_rec_clk',  rectype+','+to_pid+','+encodeURIComponent(cbar_pid)+','+encodeURIComponent(cbar_cid)+','+cbar_pagetype+','+encodeURIComponent(to_pid_orig) ,0); // will be deleted in next page view
	cbar_report_click(true); // first click report (sometimes may not work)  = to support back button on IE we dont use redirection
	a_element.href= url;
			
	return true; // go to the product in the href (the click will be registered after the page chages- allows back button to work normally);
}

// check if we arrived from click on widget, if so, report it
// The report happens twice, after the click and after the page change
function cbar_report_click (before_page_change){
	var data= cbar_readCookie('cbar_rec_clk');
	if  ( (data ==null) || (data==false) || (data=='false')) return;
	// click data exists
	if (!before_page_change) cbar_createCookie('cbar_rec_clk',  false ,0); // 'delete' cookie (set to false actually)
	var datas = data.split(',');
	cbar_switchto=''; // legacy// obsolete
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+datas[1]+'&rt='+datas[0]+'&clk=1'+cbar_abt_str+"&f_pt="+datas[4]+"&f_cid="+(datas[3]?datas[3]:0)+"&f_pid="+(datas[2]?datas[2]:0)+"&ts="+Math.ceil(10000*Math.random()),'js');
}

function  cbar_click (obj) {
	var switch_to = obj.getAttribute ('xhref');
	cbar_switchto =switch_to;
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+obj.getAttribute ('idx')+'&rt='+obj.getAttribute ('rectype')+'&clk=1'+cbar_abt_str+"&f_pt="+cbar_pagetype+"&f_cid="+(cbar_cid?cbar_cid:0)+"&f_pid="+(cbar_pid?cbar_pid:0)+"&ts="+Math.ceil(10000*Math.random()),'js');
	return false;
}

function  cbar_add2cart_click (obj) {
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+obj.getAttribute ('idx')+'&rt='+obj.getAttribute ('rectype')+'&a2c_clk=1'+cbar_abt_str+"&pt="+cbar_pagetype+"&ts="+Math.ceil(10000*Math.random()),'js');
	return false;
}

function cbar_report_delayed_action (rule_id){

	cbar_rule_active (rule_id, true  );

	var str="&rid="+rule_id;
	if (typeof window['cbar_rule_suppressed_'+rule_id] !='undefined') str+='&supp=true'; // rule was suppressed
	
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=delayed&sid='+cbar_sid+'&uid='+cbar_uid+str+cbar_abt_str+'&ts='+Math.ceil(10000*Math.random()),'js');	
}

// data from server
function cbar_data_returned () {

	if (cbar_exp ==true) 	cbar_createCookie('cbar_exp', Math.round(cbar_date.getTime()/1000),1000); // # 555
		
	if ( cbar_new_mode && (typeof (cbar_after_load) =='function')) cbar_after_load('new_mode');	
	if (cbar_new_mode_enabled && cbar_new_mode)  cbar_data_returned_new_mode ();
		
	if ( cbar_widget && (typeof (cbar_after_load) =='function')) cbar_after_load('widget');	
	if (cbar_widget && cbar_widget_show ) 	cbar_data_returned_widget(); 
	// bar
	if (!cbar_hidden_mode ) 	cbar_data_returned_bar();
				
 return 1;
}


var cbar_BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{ //#131124
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer",
			versionSearch: "rv"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			   string: navigator.userAgent,
			   subString: "Android",
			   identity: "Android"
		},
		{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
		},
		{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone" // also ipod 
		},
		{
			   string: navigator.userAgent,
			   subString: "iPad",
			   identity: "iPad"
		},
		{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
		}
	]

};



function loadjscssfile(filename, filetype){
	 if (filetype=="js"){ //if filename is a external JavaScript file
	  var fileref=document.createElement('script');
	  fileref.setAttribute("type","text/javascript");
	  fileref.setAttribute("src", filename);
	  //if (onload_function) fileref.onload=onload_function;
	  
	 }
	 
	 else if (filetype=="css"){ //if filename is an external CSS file
	  var fileref=document.createElement("link")
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", filename);
	 }
	 if (typeof fileref!="undefined")
	  document.getElementsByTagName("head")[0].appendChild(fileref);
}


function cbar_createCookie(name,value, days) {
	var expires = "";
		
	if (typeof days!= "undefined") {
		var date = new Date();
		date.setTime(date.getTime()+parseInt(days*24*60*60*1000));
		if (days !=0) 	expires="; expires="+date.toGMTString();
	}
		
	document.cookie = name+"="+value+expires+"; path=/; domain="+cbar_cookiedomain;
	
}

function cbar_readCookie(name) {
	var nameEQ = name + "=";
		
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function cbar_getElementsByClassName(clsName, parentEle, tagName) {
	var elements = null;
	var found = new Array();
	var re = new RegExp('\\b'+clsName+'\\b');
	if (!parentEle) parentEle = document;
	if (!tagName) tagName = '*';
	if (parentEle.getElementsByTagName) {elements = parentEle.getElementsByTagName(tagName);}
	else if (document.all) {elements = document.all.tags(tagName);}
	if (elements) {
		for (var i = 0; i < elements.length; ++i) {
			if (elements[i].className.search(re) != -1) {
				found[found.length] = elements[i];
			}
		}
	}
	if (found.length>0) return found; 
	else return null;
}


function cbar_in_array (item, array) {	var o = {};	for(var i=0;i<array.length;i++)  o[array[i]]='';	return ( item in o)	}

function  cbar_array_unique (array, num) { // num= how many items to output
    var a = []; store=false;
    for(var i=0; i<array.length; i++) {
		if (a.length == num) return a;
		if (! cbar_in_array (array[i],a)) a.push(array[i]);
	}
	return a;
}

function cbar_getnums (str, tofloat){
	var regex = /\d+(\.\d|\,\d)?\d*(\.\d|\,\d)?\d*/gim;
	var floats = str.match(regex);
	if (floats==null) return [];
	
	return floats.map(function(v) {
		if (tofloat==false) return v;
	
		var has_cents=false; var has_tencents=false;
		
		if (v.length<=2) return parseFloat(v);
		
		if (v[v.length-3]==',' ||v[v.length-3]=='.') has_cents=true;
		if (v[v.length-2]==',' ||v[v.length-2]=='.') has_tencents=true;
		v=v.replace(/[^0-9]+/img,'');
		if (has_cents) return parseFloat(v/100);
		if (has_tencents) return parseFloat(v/10);
		return parseFloat(v);
	});
}

function cbar_any2url(prefix, obj) {
	var args=new Array();
	if(typeof(obj) == 'object'){
		for(var i in obj)
			args[args.length]=cbar_any2url(prefix+'['+encodeURIComponent(i)+']', obj[i]);
	}
	else
		args[args.length]=prefix+'='+encodeURIComponent(obj);
	return args.join('&');
}

function cbar_gup( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function cbar_geturlp(url)
{
	if  ((typeof(url)=="undefined")||(url=='')) url = window.location.href;
	try {
		var urlstring = url.replace ('http://','').replace ('https://','').split('/');
	 } catch (e) {
		return false;
	 }
	 return urlstring;
}
// use cookies to save rules and get them "rule~1st_time~pageviews~1st_time_session@"
function cbar_rule_active (rule_id, track_time){ // store rules on cookie inc engagement time and page views
	var rule_found=false; var rules=new Array();
	var cbar_rules_str= cbar_readCookie('cbar_rules');
	if (cbar_rules_str!=null){
		 rules=cbar_rules_str.split ('@');
		for ( rule=0; rule  < rules.length; rule++) if ( rules[rule].indexOf(rule_id+'~') >-1) {
			rule_found=true;
			var ruleparts=rules[rule].split('~');
			ruleparts[2]=parseInt(ruleparts[2])+1; // increase page count
			rules[rule]=ruleparts[0]+'~'+ruleparts[1]+'~'+ruleparts[2]+'~'+ruleparts[3];
		}
	}
	if (!rule_found) {
		var curtime=0; // to save space on cookies
		if (track_time){
			var now=new Date();
			curtime=parseInt(now.getTime()/1000);
		} 
		rules[rules.length]=rule_id+"~"+curtime+"~1~"+cbar_sess;
	}
	// repack rules
	var rules_str='';
	for ( rule=0; rule  < rules.length; rule++)  rules_str+=((rule==0)?'':'@') + rules[rule];
	cbar_createCookie ('cbar_rules', rules_str, 1000);
}


function cbar_em_com(com){
		var str='';
		if (cbar_ipuid_get) str+="&ipuidget=true";
		if (cbar_ipuid_save) str+="&ipuidsave=true";
		loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+str+'&ec='+( com?'1':'0' )+cbar_abt_str+'&ts='+Math.ceil(10000*Math.random()),'js');	
}

function cbar_em_optout(opt){
		var str='';
		if (cbar_ipuid_get) str+="&ipuidget=true";
		if (cbar_ipuid_save) str+="&ipuidsave=true";
		loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=opt&sid='+cbar_sid+'&uid='+cbar_uid+str+'&opt='+( opt?'1':'0' )+cbar_abt_str+'&ts='+Math.ceil(10000*Math.random()),'js');	
}

// called from input box change event or directly
function cbar_em_change (e) {
	var value='';

	if (typeof  e =='string') value=e;
	 
	else {
		// from event
		var targ;
		if (!e) var e = window.event;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		if (targ.nodeType == 3) targ = targ.parentNode; //safari
			
		if (typeof targ.value =='string') value=targ.value;
		else if (typeof  this.value == 'string') value= this.value;
		else return;
	}
	
	if (cbar_e_com) e_com_str='&e_com=true'; else e_com_str='';
		
	if (value !== cbar_e_last) {
		if  (value.match (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi) !==null) {
			loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+e_com_str+'&e='+encodeURIComponent(value)+cbar_abt_str+"&ts="+Math.ceil(10000*Math.random()),'js');	
		}
	}
	
	cbar_e_last= value;
	
}

function cbar_em_listen (input_element){
	cbar_listen('blur', input_element , cbar_em_change );
	cbar_listen('keyup', input_element , cbar_em_change );
}

window.cbar_em_change_g=cbar_em_change;

function cbar_e_checkbox_change(){
	if ((typeof event !='undefined') &&(typeof event.srcElement !='undefined')) {
		cbar_em_com (event.srcElement.checked);
	} else {
		if (this.checked) cbar_em_com( true); else cbar_em_com(false);
	}
} 

function cbar_waitforelement (css3_selector, function_to_run){
	
	var timer=window.setInterval(function(){
		var elements=cbar_Sizzle (css3_selector);
		if (elements.length) {
			window.clearInterval(timer);
			if (typeof function_to_run == "function") 
				function_to_run (elements);
		}
	},500);
}

function cbar_monitorelement (element_name, function_get_value, function_to_run){
	
	var timer=window.setInterval(function(){
	
		var val = function_get_value();
		if (typeof val=='undefined' || val==null || val==false) return;
		var lastval= cbar_readCookie (element_name);
		if (lastval==val) return; // no change
		
		cbar_createCookie(element_name, val,0);
		if (typeof window.countupdates == 'undefined') window.countupdates=0;
		if (window.countupdates++ > 5) return; // limit potential pounding
			
		function_to_run (val);
	
	},500);
}


function cbar_log_event(msg){
	cbar_uid=cbar_readCookie('cbar_uid');
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=lg&sid='+cbar_sid+'&uid='+cbar_uid+'&lo='+encodeURIComponent(msg)+cbar_abt_str+'&ts='+Math.ceil(10000*Math.random()),'js');	
}

function cbar_analysis_track(msg){
	if (typeof msg=='undefined' || (msg==null) || (msg=="")) return;
	var tmp_str='';
	cbar_uid=cbar_readCookie('cbar_uid');
	//if (cbar_ba)  tmp_str +="&ba=1";
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=trke&sid='+cbar_sid+'&uid='+cbar_uid+tmp_str+'&e='+encodeURIComponent(msg)+cbar_abt_str+'&ts='+Math.ceil(10000*Math.random()),'js');	
}

function cbar_get_info (inf){
	var current = null;
	current = document;
	
	var variations= inf.split ('@');
	var iteration;
	for ( iteration=0; iteration < variations.length; iteration++){
		
		var steps = variations[iteration].split('|');

		for (var stepi=0; stepi < steps.length; stepi++){
			var command= steps[stepi].split(',');
			if (command[0]=='id') current= document.getElementById(command[1]);
			
			if (command[0]=='name') {
				elements=  document.getElementsByName(command[1]);
				current = elements[0];
				}
			
			if (command[0]=='tag') {
				var ret=null;
				var  thetag= command[1].split('##');
				if (thetag[1]==undefined) thetag[1]=0;
				var cntchild=0;
				for (child=0;child<current.childNodes.length; child++){
				
					if (( current.childNodes[child].tagName == thetag[0].toLowerCase()) ||  (current.childNodes[child].tagName == thetag[0].toUpperCase())){
						if (cntchild == thetag[1]) ret = current.childNodes[child];
						cntchild++;
					}
				}
			current=ret;
			}
			
			if (command[0]=='ntag') {
				var ret=null;
				var  thetag= command[1].split('##');
				if (thetag[1]==undefined) thetag[1]=0;
				var elements =current.getElementsByTagName(thetag[0]);
				ret = elements[thetag[1]];
				current=ret;
			}
			
			if (command[0]=='up') {
				var ret=null;
				var  thetag= command[1].split('##');
				for (child=0;child<thetag[1]; child++){
						ret = current.parentNode;
					}
				current=ret;	
			}
			
			if (command[0]=='tag~attribute~value') {
			 var ret=null;
			 var cnttag=0;
			 var  thetag= command[1].split('##');
			if (thetag[1]==undefined) thetag[1]=0;
			 
			 var  tagattributevalue= thetag[0].split('~');
				var cbar_nodes=document.getElementsByTagName(tagattributevalue[0]);
				for (var nodei=0; nodei < cbar_nodes.length; nodei++){
					if (tagattributevalue[1].toLowerCase() =='class') {
						if  (cbar_nodes[nodei].className ==tagattributevalue[2]) {
							if  (thetag[1]==cnttag) ret = cbar_nodes[nodei];	
							cnttag++;
							}
					}	else{
						if  (cbar_nodes[nodei].getAttribute (tagattributevalue[1]) ==tagattributevalue[2]) {
							if  (thetag[1]==cnttag) ret = cbar_nodes[nodei];
							cnttag++;
						}	else  {
						   try {
								var retval= eval(cbar_nodes[nodei]+"."+tagattributevalue[1]);
								if  (retval ==  tagattributevalue[2])  {
									if  (thetag[1]==cnttag) ret = cbar_nodes[nodei];
									cnttag++;
								}
							} catch (e) {
									continue;
							}
						}
					}
				}
			current=ret;
		}
			
			if (command[0]=='class') { 
				var ret=null;
				var  theclass= command[1].split('##');
				if (theclass[1]==undefined) theclass[1]=0;
				var cntchild=0;
				for( child=0;  child < current.childNodes.length; child++) {
					if (current.childNodes[ child].className == theclass[0]) {
						if (cntchild == theclass[1]) ret= current.childNodes[child];
						cntchild++;
					}
				}
			current=ret;
			}
			
			if (current == null) break;
			
			if (command[0]=='ret') {
				if (command[1]=='src') return current.src;
				if (command[1]=='obj') return current;
				if (command[1]=='href') return current.href;
				if (command[1]=='innerHTML') return current.innerHTML;
			}
		}
	}
} 

function cbar_leave_site_callback(evt){

	if (window.cbar_mouseout==false || window.cbar_back_button==true)  return;

	for (ind=0; ind< window.cbar_delayed_action.length; ind++){
		
		if (window.cbar_delayed_action[ind].type!='tab_close') continue;
	
		if ((window.cbar_delayed_action[ind].rule_id >0) && (cbar_readCookie('cbar_pc_'+ window.cbar_delayed_action[ind].rule_id ) == '1')) continue;  
		
		cbar_report_delayed_action (window.cbar_delayed_action[ind].rule_id);
		
		if (typeof window['cbar_rule_suppressed_'+window.cbar_delayed_action[ind].rule_id] !='undefined') return; // dont execute if suppressed
	
		//if ((typeof window.cbar_user_activity_time =='undefined' ) ||  (Math.round(cbar_date.getTime()/1000) - window.cbar_user_activity_time) >3) {
			// #8763
			if ((cbar_BrowserDetect.browser=='Chrome') || (cbar_BrowserDetect.browser=="Safari"))
				setTimeout (function () {  eval (decodeURIComponent(window.cbar_delayed_action[ind].func_eval_enc.replace (/\+/g, ' ')));},100);
			else 
				eval (decodeURIComponent(window.cbar_delayed_action[ind].func_eval_enc.replace (/\+/g, ' ')));
			
			return " "+decodeURIComponent(window.cbar_delayed_action[ind].data.replace (/\+/g, ' '));
		//}
	}
	return ;
}

/*function cbar_leave_site_suspend (evt){
	window.cbar_user_activity_time=Math.round(cbar_date.getTime()/1000);
}
*/

// cbar_delayed_action_set 
// type='tab_close' - when visitor closes page (data is message to show)
// 'delayed' - after delay - data is delay timing
// 'mouse_exit' - mouse exit from page
// 'by_code' - action will be run by javascript code (cbar_run_delayed_action(rule_id)) - to launch popup from banner by code for example
function cbar_delayed_action_set (rule_id, type, data, func_eval_enc ){

	if (typeof  window.cbar_delayed_action=='undefined') window.cbar_delayed_action=[];
	window.cbar_delayed_action[window.cbar_delayed_action.length]={rule_id:rule_id, type:type, data:data, func_eval_enc:func_eval_enc }; //function to run when visitor leaves site (encoded)
	
	if (type=='tab_close'){
		cbar_init_mouse_exit_detect(); // track mouse status and back button (window.cbar_mouseout window.cbar_back_button)
		window.onbeforeunload = cbar_leave_site_callback;
	}
	if (type=='mouse_exit'){
		cbar_init_mouse_exit_detect();
		cbar_listen ('cbar_mouse_exit', document,
			function (e){
				if (e.data.back_button==false){
					 cbar_run_delayed_action(rule_id);
				}
			}
		);
		
	}
	if (type=='delayed'){
		setTimeout (function () { cbar_run_delayed_action(rule_id)}, 1000* parseInt(data));
	}
}

function cbar_createfunc (funcname,param){
    return function() { funcname(param) };
}

// run_delayed_action
function cbar_run_delayed_action (rule_id){
	for (ind=0; ind< window.cbar_delayed_action.length; ind++){
		if (window.cbar_delayed_action[ind].rule_id==rule_id) {
			if (typeof window.cbar_delayed_action[ind].runned =='undefined' || window.cbar_delayed_action[ind].type=='by_code'){
				window.cbar_delayed_action[ind].runned=true;
				if (cbar_readCookie('cbar_pc_'+rule_id ) == '1') continue;
				
				if (typeof window['cbar_rule_suppressed_'+rule_id] =='undefined') // execute if not suppressed
					eval (decodeURIComponent(window.cbar_delayed_action[ind].func_eval_enc.replace (/\+/g, ' ')));
				
				cbar_report_delayed_action (rule_id);
				
			}
		}
	}
}

function cbar_launch_popup (rule_id){
	eval(eval ('window.launch_popup_data_'+rule_id));
}



function cbar_div_popup_show (rule_id, popup_width, popup_height, img_url, html, img_is_background, img_width, img_height , token, replace_encoded, embed_data, popup_close, border, bordercol, backg, darken, corner){//(called from data.js)
	
	if (typeof img_is_background != 'boolean') return; // remove this. only used temporarily to suppress old cached cbar.js until changes are cached.
	
	if (cbar_in_array(rule_id, cbar_suppress_rules)) return; // allow suppressing by js action
	
	// dont show popup if user closed it (and not preview from control panel) (rule_id=0)
	if ((rule_id >0) && (cbar_readCookie('cbar_pc_'+ rule_id ) == '1')) return; 
	
	if (img_is_background) {
		popup_width=img_width+'px';
		popup_height=img_height+'px';
	}
	
	cbar_popup = window.document.createElement('div');
 
	cbar_popup.id= 'cbar_popup_'+rule_id;
	cbar_popup.className="cbar_popup";
	var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
	 
	if (popup_width =='')	popup_width='auto';
	if (popup_width==parseInt(popup_width))  popup_width=popup_width+'px'
	//if (popup_width !='auto') popup_width=popup_width+'px';
	cbar_popup.style.width= popup_width;
	
	cbar_popup.popup_close=popup_close;
	
	 
	if (popup_height =='')	popup_height='auto';
	if (popup_height==parseInt(popup_height))  popup_height=popup_height+'px'
	//if (popup_height !='auto') popup_height=popup_height+'px';
	cbar_popup.style.height= popup_height;
		
	cbar_popup.style.top= "100px";
	if (img_is_background)
		cbar_popup.style.background="transparent url('"+cbar_userimages+img_url+"') no-repeat left top";
	else
		cbar_popup.style.background= backg;
			
	cbar_popup.style.border= border+"px solid "+bordercol;
	cbar_popup.style.zIndex="500000" ;
	
	if (corner >0) {
		cbar_popup.style.borderRadius = corner+'px';  
		cbar_popup.style.MozBorderRadius = corner+'px'; 
		cbar_popup.style.WebkitBorderRadius = corner+'px';
	}

	
	cbar_popup_html="<img style='position:absolute; right:-15px; top:-15px; display:block; width:32px; height:32px' onclick=\" cbar_close_popup ("+rule_id+"); \" src='"+cbar_static_url+"img/common/dialog_close.png' alt='[X]' />";
	if (img_url !='') img_html= "<img src='"+cbar_userimages+img_url+"' style='border:none' />";
	else img_html='';
	
	if (img_is_background) img_html='';
	
	cbar_popup_html+="<div style='width:auto; margin:0 0 0 0; height:auto;  background:transparent; display:block; ' >"+img_html+decodeURIComponent(html.replace (/\+/g, ' '));
	
	/*if (type=='coupon'){ 		// add 'Get Coupon button' switch button token with html
		cbar_popup_html=cbar_popup_html.replace(data1,decodeURIComponent(data2)).replace (/\+/g, ' ');
	}
	*/
	
	if (token!=''){
		// dynamic token. used in 'Get Coupon button' switch button token with html
		cbar_popup_html=cbar_popup_html.replace(token,decodeURIComponent(replace_encoded.replace (/\+/g, ' ')));
	}
			
	// embed external forms in the popup
	if  (embed_data !== false){
		if (embed_data.scrollbars=='on') noscroll=''; else noscroll="scrolling='no'";
		embed_html="<iframe src='"+embed_data.url+"' width='"+embed_data.width+"' height='"+embed_data.height+"'   frameborder='0' "+noscroll+"   allowTransparency='true'>your browser does not support iframes</iframe>";
		cbar_popup_html=cbar_popup_html.replace('%embed_form%',embed_html);
	}
	
	cbar_popup_html+=" </div>";
	
			cbar_popup_html+=" <div class='poweredbybarilliance' style='display:block; position:absolute;  bottom:5px; top:auto; right:5px;  font-size:8px;  cursor:pointer;cursor:hand;' ><a style='color:gray; margin-right:10px;text-align:right;' href='http://www.barilliance.com'>powered by Barilliance</a></div>";
		
	cbar_popup.innerHTML=cbar_popup_html;
	cbar_popup.style.display= "block";
	cbar_popup.style.visibility='visible';
		
	// reset inherited CSS
	loadjscssfile (cbar_static_url+'popup.css','css');	
	window.document.body.appendChild(cbar_popup);

	// darken under popup
	if (darken >0){
		cbar_underlay = window.document.createElement('div');
		cbar_underlay.id= 'cbar_underlay_'+rule_id;
		cbar_underlay.style.display= "block";
		cbar_underlay.style.position= "fixed";
		cbar_underlay.style.background= "none repeat scroll 0% 0% rgb(17, 17, 17)";
		cbar_underlay.style.top='0px';
		cbar_underlay.style.left='0px';
		cbar_underlay.style.opacity=darken;
		cbar_underlay.style.filter = "alpha(opacity="+ parseInt( darken*100) +")"; // IE7,8
		cbar_underlay.style.zIndex="490000";
		cbar_underlay.style.height=clientheight+"px";
		cbar_underlay.onclick =function(){eval ("cbar_close_popup ("+rule_id+");"); return false;};		
		var clientwidth =  document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth: document.body.clientWidth;
		cbar_underlay.style.width=clientwidth+"px";
		window.document.body.appendChild(cbar_underlay);
			
	}	
		
	cbar_popups.push (cbar_popup); // add this popup to array
	cbar_popups_position();
	
	cbar_listen ("scroll", window, cbar_popup_scroll_event);
	cbar_listen ("resize", window, cbar_popups_position);
	
}

function cbar_close_popup( rule_id){
	var popup = document.getElementById('cbar_popup_'+rule_id);
	if (popup!=null) var old = (popup.parentNode).removeChild(popup);
		
	var elem = document.getElementById('cbar_underlay_'+rule_id);
	if (elem!=null) var old = (elem.parentNode).removeChild(elem);
	
	// close popup
	if ((typeof popup.popup_close =='undefined') || isNaN(parseInt(popup.popup_close)) ) popup.popup_close =1000;
	if (popup.popup_close != -1) cbar_createCookie('cbar_pc_'+rule_id ,1, parseInt(popup.popup_close));
}

function cbar_close_offerzone( rule_id, days){
	var oz = cbar_Sizzle("div[rule_id='"+rule_id+"']");
	if (oz.length) var old = (oz[0].parentNode).removeChild(oz[0]);
	cbar_createCookie('cbar_oz_'+rule_id ,1, parseInt(days));
}


function cbar_iframe_popup_show (rule_id, popup_url, popup_width , popup_height , img_w, img_h, img_url, popup_close){//(called from data.js)
	
	if (cbar_in_array(rule_id, cbar_suppress_rules)) return; // allow suppressing by js action
	
	// dont show popup if user closed it (and not preview from control panel) (rule_id=0)
	if ((rule_id >0) && (cbar_readCookie('cbar_pc_'+ rule_id ) =='1')) return; 
	
	cbar_popup = window.document.createElement('div');
	cbar_popup.id= 'cbar_popup_'+rule_id;
	cbar_popup.className="cbar_popup";
	
	var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
			
	if (popup_width =='')	popup_width=iframe_width='auto';
	if (popup_width !='auto') {iframe_width=(popup_width-8)+"px"; popup_width+="px";}
	cbar_popup.style.width= popup_width;
	
	cbar_popup.popup_close=popup_close;
	
	if (popup_height =='')	popup_height=iframe_height='auto'; 
	if (img_h=='') img_h=0;
	if (popup_height !='auto') {iframe_height=(popup_height-parseInt(img_h)-8)+"px"; popup_height+="px";}
	cbar_popup.style.height= popup_height;
	
	cbar_popup.style.top= "100px";
	cbar_popup.style.background="white";
	cbar_popup.style.border="4px solid silver";
	cbar_popup.style.zIndex="600000" ;
	cbar_popup.setAttribute("rule_id", rule_id);
	
	if (img_url !='') img_html="<img src='"+ cbar_userimages+img_url+"' style='border:none' />";
	else img_html='';

	
	cbar_popup_html="<img style='position:absolute; right:-15px; top:-15px; display:block; width:32px; height:32px' onclick=\" cbar_close_popup ("+rule_id+"); \" src='"+cbar_static_url+"img/common/dialog_close.png' alt='[X]' />"+
	img_html+
	"<iframe style=' margin:5px; ' src='"+popup_url+"'  width='"+iframe_width+"' height='"+iframe_height+"' frameborder='0'>your browser does not support frames</iframe> ";
	
			cbar_popup_html+="<a class='poweredbybarilliance' style='color:gray; position:absolute; font-size:9px; right:10px; bottom:10px;' href='http://www.barilliance.com'>powered by Barilliance</a>"
		
	cbar_popup.innerHTML=cbar_popup_html;
	cbar_popup.style.display= "block";
	cbar_popup.style.visibility='visible';
	window.document.body.appendChild(cbar_popup);	
		
	cbar_popups.push (cbar_popup); // add this popup to array
	cbar_popups_position();
	
	cbar_listen ("scroll", window, cbar_popup_scroll_event);
	cbar_listen ("resize", window, cbar_popups_position);
	
}

function cbar_popup_scroll_event  () {// must be here for ie6
	if (cbar_pop_scrolltimeout >0) window.clearTimeout (cbar_pop_scrolltimeout);
	cbar_pop_scrolltimeout= window.setTimeout("cbar_popups_position()",300);
}

//  position all available popups
function cbar_popups_position () {
	var  scrolltop = document.compatMode=="CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop;
	var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
	var clientwidth =  document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth: document.body.clientWidth;
	
	for (i=0; i < cbar_popups.length; i++){
		
		if (cbar_popups[i].getAttribute('dont_reposition')!==null) continue; // tender #2425
		
		if (cbar_PositionFixedSupported){
			cbar_popups[i].style.position= "fixed";
			cbar_popups[i].style.top="100px";
			width= cbar_popups[i].scrollWidth;
			cbar_popups[i].style.left= parseInt((clientwidth/2)-(width/2))+"px";
			
		} else { // no fixed position
			cbar_popups[i].style.position= "absolute";
			cbar_popups[i].style.top=parseInt(100+scrolltop)+"px";
			width= cbar_popups[i].scrollWidth;
			cbar_popups[i].style.left= parseInt((clientwidth/2)-(width/2))+"px";
		}
	}
}

// cbar_js_action
function cbar_js_action (){
	//run the 'run javascript' action. it is executed last after all rules and recommendations finished.
	if (typeof window.cbar_rule_js_action =='undefined') return;
	for (var jstorun=0; jstorun < window.cbar_rule_js_action.length; jstorun++) eval ( decodeURIComponent(window.cbar_rule_js_action[jstorun].replace (/\+/g, ' ')));

}


// Trust!
function cbar_trust_message (payload){

	var msg_data=JSON.parse(payload);
	
	if  (typeof cbar_trust_message_show == 'function') {msg_data=cbar_trust_message_show (msg_data);}
	
	var v_margin= parseInt(msg_data.margin)*msg_data.count;
	for (var i=1; i< msg_data.count; i++) {
		bubble=cbar_Sizzle ("div#cbar_trust_"+msg_data.rule_id+"_"+i);
		if (bubble.length) v_margin+= bubble[0].scrollHeight;
	}
		
	var top='auto', bottom= 'auto', left='auto', right='auto', height='auto';
	var dynamic_css=' border: none; ';
	
	if (msg_data.type=='bar' ||  msg_data.type=='pbar') {
	
		if (msg_data.type=='pbar') 	msg_data.barpos='t';
			
		if (msg_data.barpos=='b') bottom = '0px';  else  top ='0px';
					
		if (msg_data.borderw > 0){
			dynamic_css+=' border-top: '+msg_data.borderw+'px solid '+msg_data.border+ '; ';
			if (msg_data.barpos=='t') dynamic_css=dynamic_css.replace('border-top','border-bottom');
		}
		
		if (msg_data.shadow > 0) {
			dynamic_css+=" box-shadow:"+msg_data.shadow+"px 0px "+msg_data.shadow+"px #888888; ";
			if (msg_data.barpos=='b') dynamic_css=dynamic_css.replace('box-shadow:','box-shadow:-');
		
		}
			
	} else { 
		if (msg_data.pos[0] == 't') top= v_margin+'px';
		if (msg_data.pos[0] == 'b') bottom= v_margin+'px';
		if (msg_data.pos[1] == 'r') right= msg_data.margin+'px'; 
		if (msg_data.pos[1] == 'l') left= msg_data.margin+'px';
	}
	
		
	var div = document.createElement('div');
	if (msg_data.type=='bubble')
		div.innerHTML = "<div class='cbar_bubble' id='cbar_trust_"+msg_data.rule_id+"_"+msg_data.count+"' style='position:fixed; width:"+msg_data.width+"px; height:"+height+"; right:"+right+"; left:"+left+"; top:"+top+"; bottom:"+bottom+"; opacity:0.1; background:"+msg_data.bg+";   color:"+msg_data.txtcolor+"; border: "+msg_data.borderw+"px solid "+msg_data.border+"; border-radius:"+msg_data.round+"px; padding:5px; box-shadow: "+msg_data.shadow+"px "+msg_data.shadow+"px "+msg_data.shadow+"px #888888; text-align:"+msg_data.align+";  font:"+msg_data.font+"; z-index:2000000;'>"+decodeURIComponent(msg_data.message.replace (/\+/g, ' '))+" <a class='cbar_trust_qm' style='float:right; font-size:80%; opacity:0.5;  cursor:pointer; cursor:hand;' onclick='cbar_trust_popup(); return false;'>?</a></div>";
	else 
		div.innerHTML = "<div class='cbar_bubble' id='cbar_trust_"+msg_data.rule_id+"_"+msg_data.count+"' style=' position:fixed; width:100%; height:"+height+"; right:"+right+"; left:"+left+"; top:"+top+"; bottom:"+bottom+"; opacity:0.1; background:"+msg_data.bg+"; "+dynamic_css+"   color:"+msg_data.txtcolor+";  border-radius:0px; padding:10px;  text-align:center;  font:"+msg_data.font+"; z-index:2000000;'><div style='margin:"+msg_data.barmargin+"px;'>"+decodeURIComponent(msg_data.message.replace (/\+/g, ' '))+" <a class='cbar_trust_qm' style='margin-left:30px; font-size:80%; opacity:0.5;  cursor:pointer; cursor:hand;' onclick='cbar_trust_popup(); return false;'>?</a></div></div>";
	var bubble = div.firstChild;
	window.document.body.appendChild(bubble);
	
	if (msg_data.type=='pbar') document.body.style.marginTop = bubble.scrollHeight+'px';
		
	// fade in
	var myVar = setInterval(function(){
		
		bubble.style.opacity =  parseFloat(bubble.style.opacity) +0.05;
	 
		if (bubble.style.opacity < 1 )return;
		clearInterval (myVar );

		// fade out
		setTimeout(function(){
			
			var myVar = setInterval(function(){
				bubble.style.opacity =  parseFloat(bubble.style.opacity) -0.05;
			
				if (bubble.style.opacity > 0.05 )return;
				clearInterval (myVar );
				bubble.style.display='none';
			},40);
	   
	   
			if (msg_data.type=='pbar') {
				var myVar2 = setInterval(function(){
					var newmargin= parseInt(document.body.style.marginTop)* 0.7;
					document.body.style.marginTop = newmargin +'px';
					if (newmargin > 5 )return;
					clearInterval (myVar2 );
					document.body.style.marginTop='0px';
				},150);
			}
	 
		},  msg_data.time*1000); 
	},40);
}


function cbar_trust_popup (){
	loadjscssfile (cbar_dynamic_url+'cbar_trust_popup.js.php?action=wrapper&sid='+cbar_sid,'js');
}


function cbar_trust_store_cart_message (pid_orig, message){
	cbar_createCookie ('cbar_trust_cartmsg_'+pid_orig, message, 0);
}

function cbar_img_overlay_show (   image, type, align, lrmargin, tbmargin, eletype ,attrib, attrib_search, rule_id, zindex, is_redraw) {

	if (cbar_in_array(rule_id, cbar_suppress_rules)) return; // allow suppressing by js action
	
	tbmargin=parseInt (tbmargin);
	lrmargin=parseInt (lrmargin);
		
	elements=cbar_Sizzle (eletype+"["+attrib+"*='"+attrib_search+"']");
	
	if (elements.length){
	
			for (i=0; i<elements.length; i++){
				cbar_overlay_img = window.document.createElement('span');
				cbar_overlay_img.className = 'cbar_ovl_img';
				cbar_overlay_img.style.height= "0px"; 
				cbar_overlay_img.style.width= "0px"; 
				cbar_overlay_img.style.margin= "0px 0px 0px 0px"; 
				cbar_overlay_img.style.padding= "0px 0px 0px 0px"; 
	
				if (zindex!="") cbar_overlay_img.style.zIndex=zindex; else cbar_overlay_img.style.zIndex="2147483646" ;
				cbar_overlay_img.innerHTML="<img style='position:relative; top:"+tbmargin+"px; left:"+lrmargin+"px; border:none; margin: 0 0 0 0; padding :0 0 0 0 ;' src='"+cbar_userimages+image+"'/>";
				cbar_overlay_img.style.display= "inline"; 
				cbar_overlay_img.style.border= "none";
				cbar_overlay_img.style.position= "absolute";
				cbar_overlay_img.style.visibility='visible';
				cbar_overlay_img.style.overflow='visible';
				
	
				elements[i].parentNode.insertBefore(cbar_overlay_img, elements[i]);

				
				
			}
		}
	
return;
}


function cbar_offerzone_show (x, align, width, frm_col, html, h_html, h_col, offerzone_id, rule_id, preview){

	if (cbar_in_array(rule_id, cbar_suppress_rules)) return; // allow suppressing by js action

	if ((!preview) && (cbar_readCookie('cbar_oz_'+ rule_id ) =='1')) return; 

	var rand="";
	if (preview) rand="?rnd="+Math.ceil(1000*Math.random());
	var reset_style=' margin:0 0 0 0; padding:0 0 0 0; border:0px solid white;  line-height:1em; font-size:1em; text-align:left;';
	template="<div onmouseover=\"var tmp=document.getElementById('tooltip_"+offerzone_id+"'); if (tmp) tmp.style.display='block';\" onmouseout=\"var tmp=document.getElementById('tooltip_"+offerzone_id+"'); if (tmp) tmp.style.display='none';\" style='"+reset_style+" width:"+width+"px; height:auto; background:#"+h_col+";'>";
	if (h_html.length >0) template+="<div id='tooltip_"+offerzone_id+"' style='"+reset_style+" height:auto; width:"+width+"px;  display:none;'><div style='"+reset_style+" padding:4px; display:block;'>"+decodeURIComponent(h_html.replace (/\+/g, ' '))+"</div></div>";
	template+="<div style='"+reset_style+" height:13px; width:"+width+"px; background:url(https://d2lafqfdp6zd0i.cloudfront.net/"+rule_id+"_top.png"+rand+") no-repeat bottom'></div>";
	template+="<div style='"+reset_style+" height:auto; width:"+width+"px; padding-bottom:2px;background:url(https://d2lafqfdp6zd0i.cloudfront.net/"+rule_id+"_middle.png"+rand+") repeat-y'><div style='"+reset_style+" margin-left:12px; margin-right:12px; padding 0 0 0 0;'>"+decodeURIComponent(html.replace (/\+/g, ' '))+"</div><div style='clear:both; height:2px;'>&nbsp;</div></div>";
	//template+="<div style='"+reset_style+" height:13px; width:"+width+"px; background:url(https://d2lafqfdp6zd0i.cloudfront.net/"+rule_id+"_bottom.png"+rand+") no-repeat'></div>";
	template+="</div>";

	cbar_offerzone = window.document.createElement('div');
	cbar_offerzone.className = 'cbar_offerzone';
	cbar_offerzone.id= 'cbar_offerzone_'+offerzone_id;
	cbar_offerzone.setAttribute("rule_id", rule_id);	
	cbar_offerzone.style.zIndex="80000"; 
	
	cbar_offerzone.innerHTML=template;
	// get the html of cbar_banner
	tmp_div= window.document.createElement('div');
	tmp_div.appendChild(cbar_offerzone);
	offerzone_outerHTML=tmp_div.innerHTML;
	
		// store all offerzone data as banner for repositioning.
	var cbar_Banner= {id:'cbar_offerzone_'+offerzone_id,  position:'f'  ,overlay:'' , align:align, lrmargin:x, tbmargin: 0, html_item: '' , width:width, height:'auto', banner_html:offerzone_outerHTML}
	cbar_banners[cbar_banners.length]=cbar_Banner; 
	
		// css position
	
	if (!cbar_PositionFixedSupported ) { 
		cbar_offerzone.style.position='absolute';
		cbar_listen ("scroll", window, cbar_banner_scroll_event);
		cbar_listen ("resize", window, cbar_banner_resize_event);
	} else{
		 cbar_offerzone.style.position='fixed';
		
	}
	
	window.document.body.appendChild(cbar_offerzone);	
	cbar_banner_position( cbar_banners.length-1);
}


function cbar_banner_show (img_url, width, height, clk_url, align, position, lrmargin, tbmargin, html_item , zindex, overlay, newwin, banner_id, close_butt_pos, onclick, mouseover,mouseout, rule_id, extra_html){//(called from data.js)
	
	if (cbar_in_array(rule_id, cbar_suppress_rules)) return; // allow suppressing by js action
	
	if (cbar_readCookie('cbar_bc_'+ rule_id ) != null) return; // stops both banner and thumbnail
		
	cbar_banner = window.document.createElement('div');
	cbar_banner.className = 'cbar_banner';
	cbar_banner.id= 'cbar_banner_'+banner_id;
	cbar_banner.setAttribute("rule_id", rule_id);

	if (newwin) target_str=' _blank'; else target_str="";
	if (zindex!="") cbar_banner.style.zIndex=zindex; else cbar_banner.style.zIndex="600000" ;
	var tmp='';
	if (onclick || (clk_url!='')) tmp='cursor:pointer; cursor:hand; ';
	cbar_banner_html="<img src='"+cbar_userimages+img_url+"' style='border:none; "+tmp+"' /> ";

	
	if (close_butt_pos !='') {
			
		if (close_butt_pos.search('t')>-1) {butt_t="1px"; butt_b ="auto"; }  
		if (close_butt_pos.search('b')>-1) {butt_t="auto"; butt_b ="1px"; }  
		if (close_butt_pos.search('l')>-1) {butt_l="1px"; butt_r="auto";}
		if (close_butt_pos.search('r')>-1) {butt_l="auto"; butt_r="1px";}
				
		cbar_banner_html+="<img src='"+cbar_static_url+"img/close-button2.png' style='position:absolute;cursor:pointer;cursor:hand; border:none; top:"+butt_t+";bottom:"+butt_b+";left:"+butt_l+";right:"+butt_r+";' onclick=' cbar_b_no_click_"+rule_id+" = true; this.parentNode.style.display=\"none\"; this.parentNode.setAttribute(\"hidden_banner\", \"1\"); cbar_createCookie(\"cbar_bc_"+rule_id+"\" ,1, 30); return false;' />";
	}
	
	if  (extra_html.length>0)  cbar_banner_html+=decodeURIComponent(extra_html.replace (/\+/g, ' '));
	
	if  (clk_url.length>0)  cbar_banner_html="<a href='"+clk_url+"'  target='"+target_str+"' style='border:none;'>"+cbar_banner_html+"</a>";
	cbar_banner.style.width= "auto";
	cbar_banner.style.height= "auto"; 
	cbar_banner.style.top= "0px";
	cbar_banner.style.left= "0px";
	cbar_banner.style.display= "block";
	cbar_banner.style.margin='0 0 0 0';
	cbar_banner.style.position='relative'; //position cant be static, so close button will appear inside
	
	cbar_banner.style.visibility='visible';
	cbar_banner.innerHTML=cbar_banner_html;
	// get the html of cbar_banner
	tmp_div= window.document.createElement('div');
	tmp_div.appendChild(cbar_banner);
	banner_outerHTML=tmp_div.innerHTML;
	
	// store all banner data for repositioning.
	var cbar_Banner= {id:'cbar_banner_'+banner_id,  position:position  ,overlay:overlay , align:align, lrmargin:lrmargin, tbmargin: tbmargin, html_item: html_item , width:width, height:height, banner_html:banner_outerHTML}
	cbar_banners[cbar_banners.length]=cbar_Banner; 
	
	if ( (position=='html') && (overlay =='r') ) // overwrite existing HTML element content
		cbar_banner=cbar_replace_element (cbar_banners.length-1);
	if (typeof cbar_banner != 'undefined'){
		if (onclick) cbar_listen('click', cbar_banner, eval ("cbar_banner_onclick_"+banner_id)) ;
		if (mouseover) cbar_listen('mouseover', cbar_banner, eval ("cbar_banner_mouseover_"+banner_id)) ;
		if (mouseout) cbar_listen('mouseout', cbar_banner, eval ("cbar_banner_mouseout_"+banner_id)) ;
		
	}
	
	if ( (position=='html') && (overlay =='r') ) return; // overwrite existing HTML element content
	
	// css position
	
	if (!cbar_PositionFixedSupported || (position=='html')) { 
		cbar_banner.style.position='absolute';
		cbar_listen ("scroll", window, cbar_banner_scroll_event);
		cbar_listen ("resize", window, cbar_banner_resize_event);
	} else{
		if (position=='f') cbar_banner.style.position='fixed';
		else cbar_banner.style.position='absolute';
	}
	
		
	window.document.body.appendChild(cbar_banner);	
	cbar_banner_position( cbar_banners.length-1);
}

function cbar_replace_element (banners_index) {
	banner_data=cbar_banners[banners_index]; 
	var ele= document.getElementById (banner_data.html_item);
	if (ele !=null) ele.innerHTML=banner_data.banner_html;
	else cbar_ban_retrytimeout= window.setTimeout("cbar_replace_element("+banners_index+")",600);
	if (ele !=null)  return ele;
}

function cbar_banner_resize_event  () {// # 227
	if (cbar_ban_resizetimeout >0) window.clearTimeout (cbar_ban_resizetimeout);
	cbar_ban_resizetimeout= window.setTimeout("cbar_banners_position()",100);
}
		
function cbar_banner_scroll_event  () {// must be here for ie6
	if (cbar_ban_scrolltimeout >0) window.clearTimeout (cbar_ban_scrolltimeout);
	cbar_ban_scrolltimeout= window.setTimeout("cbar_banners_position()",300);
}

// all banners position
function cbar_banners_position (){
	for (i=0; i<cbar_banners.length; i++) {
		cbar_banner_position(i);
	} 
}

// single banner position
function cbar_banner_position( banners_index){

	banner_data=cbar_banners[banners_index]; 
	cbar_banner=document.getElementById (banner_data.id);
	if (cbar_banner == null) return;
	if (cbar_banner.getAttribute('hidden_banner')!==null) return; // banner is hidden

	if ((banner_data.position=='html') && (banner_data.overlay=='f')) { // float over html element
		var ele= document.getElementById (banner_data.html_item);
		if (ele !=null){
			var pos= cbar_findPos(ele);
				if (pos != null){
					if (banner_data.align.search('t')>-1) {cbar_banner.style.top=banner_data.tbmargin+pos[1]+"px";  }
					if (banner_data.align.search('b')>-1) {cbar_banner.style.top=pos[3]-banner_data.tbmargin+"px"; }  
					if (banner_data.align.search('l')>-1) {cbar_banner.style.left=pos[0]+banner_data.lrmargin+"px";}
					if (banner_data.align.search('r')>-1) {cbar_banner.style.right=pos[2] +banner_data.lrmargin+"px"; cbar_banner.style.left="auto";}
					cbar_banner.style.display= "block";
				}
			else{
				window.console && console.log('cbar error: dont use hidden div '+banner_data.html_item+' for floating banner position');
				cbar_banner.style.display= "none";
				}
		}else{
			cbar_banner.style.display= "none";
			cbar_ban_retrytimeout= window.setTimeout("cbar_banner_position("+banners_index+")",600);
		}
		return;
	}

		
	var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
	var clientwidth =  document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth: document.body.clientWidth;

			
	if ( ! ((banner_data.position=='html') && (banner_data.overlay=='r'))) { // dont reposition banner if its replacing content
		
		if  (!cbar_PositionFixedSupported && (banner_data.position=='f') ){ 
			var  scrolltop = document.compatMode=="CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop;
			
			if (banner_data.align.search('t')>-1) {cbar_banner.style.top=banner_data.tbmargin+scrolltop+"px";  }
			if (banner_data.align.search('b')>-1) {cbar_banner.style.top="auto"; cbar_banner.style.bottom=banner_data.tbmargin-scrolltop+"px"; }  
			if (banner_data.align.search('l')>-1) {cbar_banner.style.left=banner_data.lrmargin+"px";}
			if (banner_data.align.search('r')>-1) {cbar_banner.style.right=banner_data.lrmargin+"px"; cbar_banner.style.left="auto";}
			if (banner_data.align=='c') {cbar_banner.style.left=Math.floor((clientwidth/2)+banner_data.lrmargin-(banner_data.width/2))+"px";  cbar_banner.style.top=Math.floor(scrolltop+(clientheight/2)+banner_data.tbmargin-(banner_data.height/2))+"px"; }
		} else {

			if (banner_data.align.search('t')>-1) {cbar_banner.style.top=banner_data.tbmargin+"px"; }
			if (banner_data.align.search('b')>-1) {cbar_banner.style.bottom=banner_data.tbmargin+"px"; cbar_banner.style.top="auto";}  
			if (banner_data.align.search('l')>-1) {cbar_banner.style.left=banner_data.lrmargin+"px"; }
			if (banner_data.align.search('r')>-1) {cbar_banner.style.right=banner_data.lrmargin+"px"; cbar_banner.style.left="auto";}
			if (banner_data.align=='c') {cbar_banner.style.left=Math.floor((clientwidth/2)+banner_data.lrmargin-(banner_data.width/2))+"px";  cbar_banner.style.top=Math.floor((clientheight/2)+banner_data.tbmargin-(banner_data.height/2))+"px"; }
		}
	}
}


// COUPONS

function cbar_coupon_get (type, rule_id) {
		
	var banpop='';
	if (type==1) {
		var banner=cbar_Sizzle('div[rule_id='+rule_id+']');
		if  (banner.length) banpop=banner[0].id;
	}
	else if (type==2){
			banpop= 'cbar_popup_'+rule_id;
	}
	else if (type==3){
		var oz=cbar_Sizzle('div[rule_id='+rule_id+']');
		if  (oz.length) banpop=oz[0].id;
	}
	var usertime=Math.round(new Date().getTime() /1000);
	// update coupons list 
	cur_coupons=cbar_readCookie('cbar_co');
	// remove old appearance
	if (cur_coupons==null) cur_coupons='';
	
	var regExp = new RegExp(rule_id+"~[0-9]+_?|_?"+rule_id+"~[0-9]+",  "gi");
	cur_coupons=cur_coupons.replace (regExp,'');
	
	if (cur_coupons.length>3 ) cur_coupons+='_';
	// add coupon 
	cur_coupons+=rule_id+'~'+usertime;
	cbar_createCookie ('cbar_co',cur_coupons,1000);
	
	// hide all active tooltips 
	if (typeof cbar_coups[0] !='undefined'){
		var tt=cbar_Sizzle('div[rule_id="'+cbar_coups[0].rule+'"]');
		if  (tt.length) tt[0].parentNode.removeChild(tt[0]);
	}
	
		
	var cbar_str='';
	if (cbar_readCookie ('cbar_preview_rules') == '1' ) cbar_str += '&prev_ru=1';
	if (cbar_md)  cbar_str +="&md=1";
	
	if (cbar_readCookie ('cbar_data2') == '1' ) cbar_datajs = 'data2.js.php';
	
	cbar_str+="&br="+cbar_BrowserDetect.browser+"&v="+cbar_BrowserDetect.version+"&os="+cbar_BrowserDetect.OS;
	if  (typeof  screen.width !='undefined')
		cbar_str+="&scw="+screen.width+"&sch="+screen.height;
	
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?sid='+cbar_sid+'&uid='+cbar_uid+'&a=ca&r='+rule_id+'&cou='+cur_coupons+'&bp='+banpop+cbar_abt_str+cbar_str+"&ut="+usertime+"&ts="+Math.ceil(10000*Math.random()),'js');
}

function cbar_cou_th_anim (rule_id, pop_ban_id, animstep, image_name, align, sx, sy, tx, ty){
	totalsteps=20;
	
	if (animstep==0) {
		tmp=cbar_Sizzle('#'+pop_ban_id);
		
		var  scrolltop = document.compatMode=="CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop;
		var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
		var clientwidth =  document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth: document.body.clientWidth;
		
		sx=tmp[0].offsetLeft;
		sy=tmp[0].offsetTop+scrolltop;
		
		if (align.search('t')>-1) ty=scrolltop; else ty=clientheight+scrolltop-80;
		if (align.search('l')>-1) tx=0; else tx=clientwidth-80;
		
		var element = window.document.createElement('img');
				element.id='randomid';
				element.style.position='absolute';
				element.style.display='block';
				element.style.zIndex='30000';
				element.src= cbar_userimages+image_name;
				window.document.body.appendChild(element);	
	}
	tmp=cbar_Sizzle('#randomid');
	if (tmp.length) {
		element=tmp[0];
		element.style.left= Math.round(sx+(tx-sx)*(animstep/totalsteps))+"px";
		element.style.top= Math.round(sy+(ty-sy)*(animstep/totalsteps))+"px";
	}
	if (animstep<totalsteps) setTimeout ( " cbar_cou_th_anim ("+rule_id+",'"+pop_ban_id+"',"+ (animstep+1)+",'"+ image_name+"', '"+align+"', "+sx+","+sy+","+tx+", "+ty+"); " , 80 );
	else {
		
		element.style.display='none';
		
		// hide coupon banner (if any)
		tmp=cbar_Sizzle('#'+pop_ban_id);
		if (tmp.length) {
			tmp[0].style.display='none';
			tmp[0].setAttribute("hidden_banner", '1');
		}
		// hide coupon popup (if any)
		cbar_close_popup (rule_id);
	}
}

function cbar_cou_tooltip ( rule_id, banner_id , show, prompt) {

	tooltip_tmp=cbar_Sizzle ('div#cbar_tooltip_'+rule_id);
	
	if (tooltip_tmp.length==0){
		var thumbnail=cbar_Sizzle ('div#cbar_banner_'+banner_id); // find the thumbnail
		tmp= window.document.createElement('div');
		var xoffset= 0; 
		var yoffset=0;
		if (thumbnail[0].offsetLeft >100) xoffset=- 220; else xoffset= thumbnail[0].clientWidth+20;
		if (thumbnail[0].offsetTop >100) yoffset=- 100; else yoffset= thumbnail[0].clientHeight+20;
		
		tmp.innerHTML ='<div id= "cbar_tooltip_'+rule_id+'" style="position:absolute; top:'+yoffset+'px; left:'+xoffset+'px; bottom:auto; right:auto; z-index:30010; display:block; position:absolute; font-size:12px; width:213px; height:94px; border:none; background:url('+cbar_static_url+'img/coupons/tooltip_1.png) no-repeat left top; font-weight:normal ; color:#333333; text-align:center"><div style="margin:10px;">'+decodeURIComponent(prompt.replace (/\+/g, ' '))+'</div></div>';
		tooltip=tmp.childNodes[0];
		thumbnail[0].appendChild(tooltip);	
	} else tooltip= tooltip_tmp[0];
	
	if (show){
			tooltip.style.display='block';
			// position
/*			
			if (tmp.length) {
			var  scrolltop = document.compatMode=="CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop;
				
				if (tmp[0].offsetTop >10) tooltip.style.top=scrolltop+tmp[0].offsetTop-100+'px'; else  tooltip.style.top=scrolltop+tmp[0].scrollHeight+10+"px";
				if (tmp[0].offsetLeft >10) tooltip.style.left=tmp[0].offsetLeft-200+'px'; 
				else 
				tooltip.style.left=tmp[0].scrollWidth+10+"px";

			}				
		*/				
	} else {
		tooltip.style.display='none';
	}
				

}

function cbar_hide_coupon_box (){

	if (typeof window.hide_message !='undefined') {
			var myElement = window.document.createElement('span');
			 myElement.innerHTML='<span style="background:white">'+decodeURIComponent(window.hide_message.replace (/\+/g, ' '))+'</span>';
			cbar_cou_input.parentNode.insertBefore(myElement,cbar_cou_input); 
			cbar_cou_input.style.width='0px';
			cbar_cou_input.style.padding='0pt';
			cbar_cou_input.style.margin='0pt';
			cbar_cou_input.style.border='none';
			cbar_cou_input.style.backgroundColor="transparent";
	} 
}
  
function cbar_cou_inj (cou_code,hide_message){ 
	window.hide_message=hide_message;
	
	if  (typeof cbar_before_cou_inj == 'function') {dont_inj_coupon=cbar_before_cou_inj (cbar_cou_input);}
	
	if ((typeof window.hide_message !='undefined') && (window.hide_message !='')) cbar_hide_coupon_box ();
	
	if ((typeof dont_inj_coupon !='undefined') && (dont_inj_coupon==false)) {
		window.console && console.log('cbar:coupon not injected'); 
		return;
	} 
	
	
	cbar_cou_input.value=cou_code;
	
	if  (typeof cbar_after_cou_inj == 'function') cbar_after_cou_inj (cbar_cou_input);
}

function cbar_cou_tick (){

	for (i=0; i < cbar_coups.length; i++){
		// format time string
		
		if (cbar_coups[i].div==null) {tmp=cbar_Sizzle('div#'+cbar_coups[i].id); if (tmp.length) cbar_coups[i].div=tmp[0] }; // find the countdown div
			
		if ((cbar_coups[i].secs_left <1)) {
			  if (cbar_coups[i].div!==null) 	cbar_coups[i].div.innerHTML=decodeURIComponent(cbar_coups[i].coupon_expired.replace (/\+/g, ' '));
			return;
		}
		
		var hours=  Math.floor(cbar_coups[i].secs_left /3600);
		var minutes= Math.floor((cbar_coups[i].secs_left % 3600)/60);
		var seconds=  Math.floor(cbar_coups[i].secs_left % 60);
		var days= 0;
		var dayshtml='';
		if (cbar_coups[i].showdays ==true) {
			days= parseInt(hours/24);
			hours-=days*24;
			if (days>0) dayshtml= days+cbar_coups[i].daysword+" ";
		}
		
		if (cbar_coups[i].div!==null) cbar_coups[i].div.innerHTML=  dayshtml + (hours<10?' 0':' ')+hours+ (minutes<10?':0':':')+minutes+ (seconds<10?':0':':')+seconds;
		cbar_coups[i].secs_left--;
		
		
	} 
}

function cbar_cou_reset (rule_id){
	// remove from to coupons list 
	cur_coupons=cbar_readCookie('cbar_co');
	if (cur_coupons==null) return;
	
	var regExp = new RegExp(rule_id+"~[0-9]+_?|_?"+rule_id+"~[0-9]+",  "gi");
	cur_coupons=cur_coupons.replace (regExp,'');
		
	cbar_createCookie ('cbar_co',cur_coupons,1000);
}

function cbar_cou_expire (rule_id){
	cur_coupons=cbar_readCookie('cbar_co');
	// remove old appearance
	if (cur_coupons==null) cur_coupons='';
	
	var regExp = new RegExp(rule_id+"~[0-9]+_?|_?"+rule_id+"~[0-9]+",  "gi");
	cur_coupons=cur_coupons.replace (regExp,'');
	
	if (cur_coupons.length>3 ) cur_coupons+='_';
	// add coupon 
	cur_coupons+=rule_id+'~12345678'; // past
	cbar_createCookie ('cbar_co',cur_coupons,1000);
}

var cbar_alreadyrunflag=false; //flag to indicate whether target function has already been run
			
function cbar_listen(evnt, elem, func) {
	if (elem.addEventListener)  // W3C DOM
		elem.addEventListener(evnt,func,false);
	else if (elem.attachEvent) { // IE DOM
		 var r = elem.attachEvent("on"+evnt, func);
	return r;
	}
	return false;
}

// custom events support
function cbar_firecustomevent(eventName, element, data) {
	var event;
	if (document.createEvent) {
		event = document.createEvent("CustomEvent");
		event.initCustomEvent(eventName, true, true,data);
	} else {
		event = document.createEventObject();
		event.eventType = eventName;
	}

	event.eventName = eventName;
	event.data = data || { };

	if (document.createEvent) {
		element.dispatchEvent(event);
	} else {
		element.fireEvent("on" + event.eventType, event);
	}
}

//cbar_position_fixed supported
function cbar_pos_fixed_supported() {
  var androidversion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android")+8)); 
  if (androidversion <3) return false;
  return true;
}

// LP integration
function cbar_LP_set(){
	if(typeof lpMTagConfig !='undefined'){
		if (typeof lpMTagConfig.sessionVar == "undefined"){ 
				lpMTagConfig.sessionVar = new Array();
		}
			//sid
		lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'SID='+ cbar_sid;
			//uid
		lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'UID='+ cbar_readCookie('cbar_uid');
	} else 
		setTimeout ('cbar_LP_set();', 1000); // call again until LP code initializes
} 


cbar_init_ajax_cart =function (){ 
	// ajax cart
	if (typeof cbar_check_cart =='function') {
		
		var tmp=cbar_readCookie('cbar_cart_checksum'); //#130721
		if (tmp!=null) window['cbar_cart_checksum']=tmp;
	
		window.cbar_samplingcart = setInterval(function(){

			var retval = cbar_check_cart();
			if (retval===false) return;
			
			if ((typeof window['cbar_cart_checksum'] == 'undefined') || (retval != window['cbar_cart_checksum'])) {
				// something changed in ajax cart
				
				window['cbar_cart_checksum']= retval;
				cbar_createCookie('cbar_cart_checksum', retval, 0);
				
				// scrape cart
				if (typeof cbar_scrape_ajax_cart =='function') {
					
					var cbar_str='';
					cbar_pur_pids=[];
					cbar_pur_qtys=[];
					cbar_userinfo= new Object();

					var proceed=cbar_scrape_ajax_cart();
					
					if (proceed ===false) return;

					if  (cbar_pur_pids.length >0 && cbar_pur_pids.length <25) { 
						for (var i=0; i < cbar_pur_pids.length; i++){
							cbar_str +='&pid'+i+'='+encodeURIComponent(cbar_pur_pids[i]);
							cbar_str +="&qty"+i+"="+((typeof cbar_pur_qtys[i] == "undefined")?1:cbar_pur_qtys[i]);
						}
					}
					cbar_str += '&pur=1'+'&pur_mode='+cbar_pur_mode+'&pur_add='+cbar_pur_add;
					loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=cartu&sid='+cbar_sid+'&uid='+cbar_uid+cbar_str+"&"+cbar_any2url('uinf',cbar_userinfo)+cbar_abt_str+"&ts="+Math.ceil(10000*Math.random()),'js');
				

				}
			}

		},600);
	}
}

// add to cart after page loads
function cbar_add_to_cart (pid, qty , pur_mode){

	cbar_abt_str="&abt="+cbar_abt;
	cbar_str = '&pur=1'+'&pid0='+encodeURIComponent(pid)+'&qty0='+qty+'&pur_mode='+pur_mode+'&pur_add=true';
	loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=cartu&sid='+cbar_sid+'&uid='+cbar_uid+cbar_str+cbar_abt_str+"&ts="+Math.ceil(10000*Math.random()),'js');
	
}

function cbar_late_update (fieldname, get_value_function, once){
	
	var tmp=cbar_readCookie('cbar_data_'+fieldname);
	if (tmp!=null) window['cbar_data_'+fieldname]=tmp;
	
	window['cbar_sampling_cnt'+fieldname]=0;
	window['cbar_timer_'+fieldname] = setInterval(
		function (){
		
			var retval=get_value_function();
			if (retval===false || (typeof retval=='undefined')) return;
				
			if ((typeof window['cbar_data_'+fieldname] == 'undefined') || (retval != window['cbar_data_'+fieldname])) {
				window['cbar_data_'+fieldname]=retval;
				cbar_createCookie('cbar_data_'+fieldname, retval, 0);
				if (typeof cbar2url[fieldname] != 'undefined')
					cbar_str="&"+cbar2url[fieldname]+"="+encodeURIComponent(retval);
				else 
					cbar_str="&"+fieldname+"="+encodeURIComponent(retval); // e.g. uinf[gender]
			
				//if (cbar_ba)  cbar_str +="&ba=1";
				loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=datau&sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+cbar_pid+cbar_str+cbar_abt_str+"&ts="+Math.ceil(10000*Math.random()),'js');
				
				if (window['cbar_sampling_cnt'+fieldname]++ >20 || once) clearInterval (window['cbar_timer_'+fieldname]);
			}
		}
	,550)
}

function cbar_visible (name, element){
	
	if (element == null) return;
	if (typeof element=='array') element=element[0];
	
	var vis_cookie=cbar_readCookie('cbar_vis_'+name);
	if (vis_cookie!=null) return;
	
	var scrolltop = document.body.scrollTop || document.documentElement.scrollTop; 
	var clientheight = document.body.clientHeight || document.documentElement.clientHeight;
	
	var pos= cbar_findPos(element);
	if ((pos[1] > scrolltop) && (pos[1] < (scrolltop+clientheight))) {
		cbar_uid=cbar_readCookie('cbar_uid');
		cbar_createCookie('cbar_vis_'+name, true, 0);
		cbar_str="&f="+name;
		//if (cbar_ba)  cbar_str +="&ba=1";
		loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=vis&sid='+cbar_sid+'&uid='+cbar_uid+cbar_str+cbar_abt_str+"&ts="+Math.ceil(10000*Math.random()),'js');
	} 
	else 
	window.setTimeout(function(){cbar_visible(name, element);},400);
}

function cbar_mouse_move(e) {
		
	if (!e) var e = window.event;
	
	if (e.clientX || e.clientY) 	{
		window.posx = e.clientX; 
		window.posy = e.clientY ;
	}
}

function cbar_init_mouse_exit_detect(){
	// will fire custom event cbar_mouse_exit
	if (typeof window.cbar_mousexitdetect !='undefined') return;
	
	window.cbar_mousexitdetect=setInterval (
		function(){
		
			if (typeof window.cbar_mouseout=='undefined') window.cbar_mouseout=false; 
	
			if (typeof window.last2posy !='undefined') {
				if (  (window.lastposy==window.posy ) && ((window.lastposy-window.last2posy) < -10 ) && (window.posy <50 )) {
							
					var deltax=window.posx-window.lastposx;
					if (window.lastposx+2*deltax < 150) 
						window.cbar_back_button=true;
					else 
						window.cbar_back_button=false;
									
					window.cbar_mouseout=true;
					cbar_firecustomevent('cbar_mouse_exit', document, {back_button:window.cbar_back_button, mouseout:window.cbar_mouseout});
				 }
				 
				if ((window.lastposy- window.last2posy) >0 && window.cbar_mouseout==true){
					window.cbar_mouseout=false;
					cbar_firecustomevent('cbar_mouse_exit', document, {back_button:window.cbar_back_button, mouseout:window.cbar_mouseout});
				}
			}
			
			window.last2posx=window.lastposx;
			window.lastposx=window.posx;
			window.last2posy=window.lastposy;
			window.lastposy=window.posy;
					
		},100);
	
	cbar_listen( "mousemove", window, cbar_mouse_move );

}

// Ret

function cbar_pub_ping(){
	if (typeof window.exitpop =='undefined'){
		window.exitpop=true;
		if (cbar_readCookie ('cbar_preview_rules') == '1' ) prev_str = '&prev_ru=1'; else prev_str='';
		loadjscssfile (cbar_dynamic_url+'ret/ping.js.php?a=ping&sid='+cbar_sid+prev_str+"&ts="+Math.ceil(10000*Math.random()),'js');
	}
} 


var cbar_readyBound = false;
var cbar_isReady= false;
function cbar_bindReady(){
	if ( cbar_readyBound ) return;
	cbar_readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			cbar_dom_ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				cbar_dom_ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( cbar_isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			cbar_dom_ready();
		})();
	}

	// A fallback to window.onload, that will always work
	cbar_listen( "load", window, cbar_dom_ready );
	
}

	function cbar_dom_ready () {
		if ( !cbar_isReady ) {
			cbar_isReady = true;
			cbar_start();
			}
		}
         
		// integrate code from def file which determines whether to start early by manipulating cbar_startearly
				
		if (cbar_startearly) 
			cbar_start();
		else
			cbar_bindReady ();
 
function cbar_start () {

	var wait=false;
	if (typeof cbar_hold_execution =='function') wait=cbar_hold_execution();
	if (wait) {
		window.console && console.log('cbar wait'); 
		window.setTimeout(function(){cbar_start();},500);
		return;
	}
	
	if (cbar_alreadyrunflag) return;
	cbar_alreadyrunflag=true;
    	
	// cookie domain (starts with dot)
	if ( !cbar_cookiedomain ) {
		if (document.location.host.substring (0,4) == 'www.' )
			cbar_cookiedomain = '.'+document.location.host.substring(4);
		else 
			cbar_cookiedomain = '.'+document.location.host;
	}
	
	cbar_BrowserDetect.init();  
	
	if ((cbar_BrowserDetect.browser=='Explorer') && (cbar_BrowserDetect.version >6)) ie7u=true;
	if ( (cbar_BrowserDetect.browser=='Explorer') &&	((document.compatMode =='BackCompat') || ((document.compatMode =='CSS1Compat') && (cbar_BrowserDetect.version < 7)))) 
	cbar_PositionFixedSupported=false;
	
	// on android try
	if (cbar_BrowserDetect.OS=='Android') cbar_PositionFixedSupported=cbar_pos_fixed_supported();
	
	
	// bots
	if (typeof navigator.userAgent !='undefined') {
		if (navigator.userAgent.search('Googlebot')>-1) return; 
		if (navigator.userAgent.search('BrowserMob')>-1) return;
	}
			
	
cbar_sid 			= 19031; 	//determine the SID using QWERTY format using first 5 chars of the domain name
cbar_widget_show	= true;		//turn this on (set to true) only when ready for production, otherwise use widget_show=true as URL parameter to view the widgets in test mode
cbar_widget 			= true;		// required for widgets
cbar_widget_show2	= false;
//cbar_catmode 		= 2;		//not required in new scraping mode.
cbar_encode 			= '';		//set according to the encoding of the website. eg utf-8

// General associating variables
var cbar_temp		= '';
var cbar_temp2 		= '';
var cbar_match		= '';
var cbar_pattern 	= '';
var cbar_arr 		= '';
cbar_c_from_p		= true;


//Uncomment to log the def file calls.
//cbar_datajs='log_data_live.js.php';

//Dealing with multiple site domains

//cbar_md=true;

cbar_cookiedomain	= '.alpacadirect.com';	//replace domain.com with actual site domain	
if(cbar_url.toLowerCase().search('beta.alpacadirect.com') > -1) {
	cbar_cookiedomain	= '.alpacadirect.com';
	cbar_ro = true;
}
//if (cbar_url.search('.yahoo.net')>-1) cbar_cookiedomain = '.yahoo.net';

//handle any test environmnets. we don't want to save any test env urls.
if (window.location.href.match(/(:\/\/[0-9.]+)\//) !=null) cbar_ro=1;
if (window.location.href.search('localhost') >-1 ) cbar_ro=1;

//handle urls with google translation as read only

if(cbar_url.toLowerCase().search('translate.googleusercontent.com')>-1) cbar_ro=true;

//##replace it with actual domain name.

if(document.location.hostname.toLowerCase().	search('alpacadirect.com') == -1) cbar_ro = true;


cbar_temp=cbar_gup('widget_show');
if(cbar_temp=='true'){
	cbar_createCookie('cbar_widget_show2',true, 2/24);
}
else if(cbar_temp=='false'){
	cbar_createCookie('cbar_widget_show2',false, 2/24);
}

if(cbar_readCookie('cbar_widget_show2')=='true'){
	cbar_widget_show2=true;
}

//cbar_dev_site = false;
if(cbar_url.toLowerCase().search('beta.alpacadirect.com') > -1) {
	//cbar_dev_site = true;
	//cbar_widget_show=false;
	cbar_ro=true;
}

// BEGIN SCRAPING & WIDGETS

// Widget titles
cbar_recstep_titles = []; // required temporarily
cbar_recstep_titles[1]		= "Suggestions";
cbar_recstep_titles[2]		= "Top Sellers";
cbar_recstep_titles[3]		= "Recently Viewed"
cbar_recstep_titles[4]		= "Customers Who Bought This Product Also Bought";
cbar_recstep_titles[5]		= "You May Like";
cbar_recstep_titles[6]		= "You May Like";
cbar_recstep_titles[7]		= "Customers Also Bought";
cbar_recstep_titles[8]		= "Top Sellers";
cbar_recstep_titles[9]		= "Customers With Similar Searches Also Viewed";
cbar_recstep_titles[10]		= "Customers Who Bought Products You Own Also Bought";
cbar_recstep_titles[11]		= "Recommended For You";
cbar_recstep_titles[12]		= "Top Sellers From Recent Categories You Visited";
cbar_recstep_titles[13]		= "Recommendations Based On Your Google Search";
cbar_recstep_titles[19]		= "What Other Customers Are Buying Right Now";
cbar_recstep_titles[18]		= "What do customers ultimately buy after viewing this item?";
cbar_recstep_titles[100]	= "You Might Also Like";
/*
// Widget titles
cbar_recstep_titles = []; // required temporarily
cbar_recstep_titles[1]		= "Customers Who Viewed This Product Also Viewed";
cbar_recstep_titles[2]		= "Top Sellers";
cbar_recstep_titles[3]		= "Recently Viewed"
cbar_recstep_titles[4]		= "Customers Who Bought This Product Also Bought";
cbar_recstep_titles[5]		= "Based On Your Recently Viewed Products You Might Also Like";
cbar_recstep_titles[6]		= "You Might Also Like";
cbar_recstep_titles[7]		= "Customers Who Bought This Product Also Bought";
cbar_recstep_titles[8]		= "Top Sellers";
cbar_recstep_titles[9]		= "Customers With Similar Searches Also Viewed";
cbar_recstep_titles[10]		= "Customers Who Bought Products You Own Also Bought";
cbar_recstep_titles[11]		= "Recommended For You";
cbar_recstep_titles[12]		= "Top Sellers From Recent Categories You Visited";
cbar_recstep_titles[13]		= "Recommendations Based On Your Google Search";
cbar_recstep_titles[19]		= "What Other Customers Are Buying Right Now";
cbar_recstep_titles[18]		= "What do customers ultimately buy after viewing this item?";
cbar_recstep_titles[100]	= "You Might Also Like";

*/


// determines the widget that are shown on the pages. Required for display of widgets. 
//Can be different from site to site. Below cbar_flow displays "Recently Viewed" items in the widget.
//cbar_flow="H0:1,3-12,3,13,5.9,12,8;H1:1,0,0,0,0;P0:1,2,13,1,5,1.4,2;P1:1,2,4.4,1.4.0.11,2;C0:1,2-9,13,5.0,2.0,2.6,2.4,3;C1:1,0,0,0,0;Sc0:1,2,7.4.0.0.7,7.2.0.0.1,11.4;Sc1:1,0,0,0,0";

//standard flow
//cbar_flow="H0:1,3-12,13,5.9,12,8,3;H1:1,0,0,0,0;P0:1,2,13,1,5,2;P1:1,2,4.4,1.4.0.11,2;C0:1,2-9,13,5.0,2.0,3;C1:1,0,0,0,0;Sc0:1,2,3,7.4.0.0.7,7.2.0.0.1,11.4;Sc1:1,0,0,0,0";

cbar_flow="H0:1,3-12,3,13,5.9,12,8;H1:1,0,0,0,0;P0:1,3,13,1,5,1.4,2;P1:1,2,4.4,1.4.0.11,2;C0:1,2-9,13,5.0,2.0,2.6;C1:1,0,0,0,0;Sc0:1,3,7.4.0.0.7,7.2.0.0.1,11.4;Sc1:1,0,0,0,0";


//New Mode: reset extra variables with a space to support new mode (in new mode , empty fields do not get updated)
cbar_extra1=" "; //deal with old price that has been removed
//cbar_extra2 = " "; 	
//cbar_extra3 = " "; 	

cbar_after_load= function  (cbar_mode)
{
	if ( cbar_mode == 'widget') 
	{
		for (var group_ctr=0; group_ctr <2; group_ctr++)
		{
			for (var t=0; t < cbar_results[group_ctr].length ; t++)
			{					
				//trim spaces in extra variables.
				cbar_results[group_ctr][t][16] = cbar_results[group_ctr][t][16].replace(/^\s+|\s+$/g,'');
				cbar_results[group_ctr][t][17] = cbar_results[group_ctr][t][17].replace(/^\s+|\s+$/g,'');
				cbar_results[group_ctr][t][18] = cbar_results[group_ctr][t][18].replace(/^\s+|\s+$/g,'');					
				
				//Snippet: replace the . with comma in prices
				/*
				if (cbar_results[group_ctr][t][4] != "") 
				{
					cbar_results[group_ctr][t][4] = cbar_results[group_ctr][t][4].replace(".",",");                       
				} 
				if (cbar_results[group_ctr][t][16] != " ") 
				{
					//if extra1 does not contain blank value
					cbar_results[group_ctr][t][16] = cbar_results[group_ctr][t][16].replace(".",",");                       
				}
				*/
					
			}
		}
	}
} 
// end

cbar_after_show= function  ( mode)
{
	if (mode == 'widget') 
	{ 
		for (var group_ctr=0; group_ctr <2; group_ctr++)
		{
			for (var t=0; t < cbar_results[group_ctr].length ; t++)
			{
				//hide default widget if any				
				if((cbar_pagetype == 'P') && cbar_results[0].length>0 && cbar_widget_show == true) {
					jQuery('div.left-menu ul.left-cat').css('paddingTop','34px');
					jQuery('div.left-menu ul.left-cat div.left-titles').css('paddingLeft','5px');
				}
				if((cbar_pagetype == 'Sc') && cbar_results[0].length>0 && cbar_widget_show == true) {
					jQuery('section.detail-window:has(form[name="updatecart"])').css('float','left');
					jQuery('div[id$="_item_s"]:first').css('marginLeft','0px');
					jQuery('div[id$="_item_s"]:last').css('marginRight','0px');
				}
				
				jQuery('div[id$="_item_title_s"]').hover(
					function(){
						jQuery(this).css({ color: '#005580', textDecoration: 'underline' });
					},
					function(){
						jQuery(this).css({ color: '#0072BC', textDecoration: 'none' });
					}
				);
				
				//display old price if any in extra1 var
				if (cbar_results[group_ctr][t][16] != "" && cbar_results[group_ctr][t][16] != " ") { 
					//if extra1 is not empty
					tmp = cbar_Sizzle('div#cbar_w'+ group_ctr +'_'+t+'_item_xtr1_s');					
					if(tmp.length)
					{
						tmp[0].style.display="";
					}
				}
				
				//Display star rating
				if (cbar_results[group_ctr][t][17] != "" && cbar_results[group_ctr][t][17] != " " && cbar_results[group_ctr][t][17] > 0 && cbar_results[group_ctr][t][17] <= 5) {
			
					var bgposition="0 0";
					if(cbar_results[group_ctr][t][17]==5){
						bgposition="0 -180px"
					}	
					else if(cbar_results[group_ctr][t][17]>=4.5 && cbar_results[group_ctr][t][17]<5){
						bgposition="0 -162px"
					}	
					else if(cbar_results[group_ctr][t][17]>=4 && cbar_results[group_ctr][t][17]<4.5){
						bgposition="0 -144px"
					}	
					else if(cbar_results[group_ctr][t][17]>=3.5 && cbar_results[group_ctr][t][17]<4){
						bgposition="0 -126px"
					}	
					else if(cbar_results[group_ctr][t][17]>=3 && cbar_results[group_ctr][t][17]<3.5){
						bgposition="0 -108px"
					}	
					else if(cbar_results[group_ctr][t][17]>=2.5 && cbar_results[group_ctr][t][17]<3){
						bgposition="0 -90px"
					}	
					else if(cbar_results[group_ctr][t][17]>=2 && cbar_results[group_ctr][t][17]<2.5){
						bgposition="0 -72px"
					}	
					else if(cbar_results[group_ctr][t][17]>=1.5 && cbar_results[group_ctr][t][17]<2){
						bgposition="0 -54px"
					}	
					else if(cbar_results[group_ctr][t][17]>=1 && cbar_results[group_ctr][t][17]<1.5){
						bgposition="0 -36px"
					}	
					else if(cbar_results[group_ctr][t][17]>0 && cbar_results[group_ctr][t][17]<1){
						bgposition="0 -18px"
					}	
					
					jQuery('div#cbar_w'+ group_ctr +'_'+t+'_item_rating_star_s').css("background-position",bgposition).css('background-image', 'url("https://cdn.powerreviews.com/repos/10569/pr/pwr/engine/images/stars_small.gif")').css({height: '16px', lineHeight: '16px', width: '83px' });					
					
				}
				else{				
					jQuery('div#cbar_w'+group_ctr+'_'+t+'_item_rating_box_s').hide();
				}
				
				/*
				//enable the ultimately bought widget text:
				if (cbar_results[group_ctr][t][19] >0) 
				{
					if (cbar_results[group_ctr][t][6] == cbar_pid) 
					{
						// show ultimately bought current product						
						tmp= document.getElementById("cbar_w"+group_ctr+"_"+t+"_item_perc_pur2_s");
						if (tmp!=null) 
						{
							tmp.style.display='block';							
							tmp.style.color="green";
						}
					}						
					else 
					{	
						// show ultimately bought not current product.					
						tmp= document.getElementById("cbar_w"+group_ctr+"_"+t+"_item_perc_pur_s");
						if (tmp!=null) tmp.style.display='block';						
					}
				} 
				//end ultimately bought;
				*/
			}
		}
		
		
		cbar_temp = cbar_Sizzle(".big-links");
		cbar_temp1 = cbar_Sizzle('.free-download').length;  //fix for free download products
		if(cbar_pagetype=='C' && cbar_temp.length>0 || cbar_temp1 >0) {
			cbar_temp = cbar_Sizzle("#cbar_widget0");
			if (cbar_temp.length>0) cbar_temp[0].style.marginTop='0px';
		}
		

		//ovveride for image with differnt dimensions
		cbar_temp = cbar_Sizzle ('#cbar_widget0 img');
		for (var i=0; i< cbar_temp.length; i++){
			if (cbar_temp[i].src.search('cardreg')>-1) {
				cbar_temp[i].style.height="auto";
				cbar_temp[i].style.maxWidth="150px";
				
			}
			
		}
	}
} 
//end

//Google analytics event tracking function. Called from widget items click event
//link: reference to link element clicked.
//category: always set to Barilliance.
//action: can have following possible values: Home, Category, Product, Cart, Search or any other PageType
//opt_label: title of the product clicked.
//For usage see widget html templates.

cbar_ga_eventtrack = function(link,category,action,opt_label)
{
	return true; //for now it's causing errors
	if (!_gat) return true; 
	
	//pageTracker._trackEvent(category, action, opt_label); //(use for traditional GA tracking snippet. needs ref to pageTracker object)
	
	_gaq.push(['_trackEvent', category, action, opt_label]); //(use for new async GA tracking snippet. More common these days)

	setTimeout(function() 
	{
		location.href=link.href
	}, 200);
	return false;
}


// Home page scraping
if (document.location.pathname=='/') {
	cbar_home=true;
}	
	
// Category page scraping . Scrape for cid and cname(optional)
cbar_top_cat = false;
// Top category code
cbar_temp = cbar_Sizzle("div.details-panel");	
if(cbar_temp.length >0 && 
	cbar_url.toLowerCase().search('/list/') > -1 &&
	cbar_url.toLowerCase().search('clearance') == -1 &&
	cbar_url.toLowerCase().search('keywords') == -1 &&
	cbar_url.toLowerCase().search('top-sellers') == -1){
	if (cbar_url.split('?')[0].toLowerCase().search(/yarn~and~fiber\/8$/)> -1 || 
		cbar_url.split('?')[0].toLowerCase().search(/gifts\/25$/)>-1 ||		
		cbar_url.split('?')[0].toLowerCase().search(/women\/1$/)>-1) 
		{
		
		if(cbar_url.toLowerCase().search('/8')>-1){
			cbar_top_cat = true;
			cbar_cid = 'yarn-and-fiber';
			cbar_cname = 'yarn and fiber';
			cbar_flow = 'C0:1,4,5.6,2.6;';
		}
		else if(cbar_url.toLowerCase().search('/25')>-1){
			cbar_top_cat = true;
			cbar_cid = 'gifts';
			cbar_cname = 'Gifts';
			cbar_flow = 'C0:1,4,5.6,2.6;';
		}
		else if(cbar_url.toLowerCase().search('/1')>-1){
			cbar_top_cat = true;
			cbar_cid = 'virt_apparel';
			cbar_cname = 'apparel';
			
			//linked cats
			var linked_cats = new Array();	
			linked_cats['virt_apparel'] = ['women_scarves/wraps','women_socks','women_accessories','women_sweaters','women_ponchos','men_socks','men_scarves/wraps','men_mens-sweaters'];
			for (var i=0; i<linked_cats['virt_apparel'].length; i++)
				cbar_cats_l.push(linked_cats['virt_apparel'][i]);
			
			cbar_flow = 'C0:1,2,5.5,2.5;';
		}
	}	
	else {
		cbar_temp_main = cbar_Sizzle('ul.breadcrumb li');
		if(cbar_temp_main.length >1) {
		
			cbar_cids_p = cbar_Sizzle('a',cbar_temp_main[0])[0].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cids_p = cbar_cids_p.toLowerCase().replace(/\s/g,"-");
			
			cbar_cname = cbar_temp_main[1].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cid = cbar_cname.toLowerCase().replace(/\s/g,"-");
		}
		else if(cbar_temp_main.length >0) {
		
			cbar_cname = cbar_temp_main[0].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cid = cbar_cname.toLowerCase().replace(/\s/g,"-");
		}
		cbar_temp = cbar_Sizzle('ul.breadcrumb li.active');
		if(!cbar_cid && cbar_temp.length >0) {
			cbar_cname = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cid = cbar_cname.toLowerCase().replace(/\s/g,"-");
		}
		
		//.. make sure to set cbar_ro=1 for virtual categories such as best seller, new products, brand etc
		// ###### important: Assign full path to cid where there are chances of categories like (Womens >> Shoes & Mens >> Shoes), here "Shoes" is ambiguous if not assigned the full path
		cbar_cid = cbar_cid.toLowerCase();	//make sure alpha-numeric CIDs are always lowerCased
		
		if(cbar_cids_p!="" && cbar_cid !="") {
			cbar_cid = cbar_cids_p +"_"+ cbar_cid;	//## also match on category pages.
		}
		
		if( cbar_cids_p.search('clearance') > -1 || 
			cbar_cid.search('clearance') > -1 || 
			cbar_cids_p.search('top-sellers') > -1 || 
			cbar_cid.search('top-sellers') > -1 
		){	
			cbar_cid = '';
			cbar_cname = '';
			cbar_cids_p = '';
		}	
	}
}	

// Product page scraping
cbar_temp1 = cbar_Sizzle ('table#tableProductDetails');
cbar_temp2 = cbar_Sizzle ('div.details-panel:has(div.item-picture,div.item-form)');
if((cbar_temp1.length>0 || cbar_temp2.length>0) && 
	cbar_url.toLowerCase().search('/details.cfm') > -1 || cbar_url.toLowerCase().search('/product/') > -1) 
{
	
	// Cbar Pid. scrapped generally from URL. Please make sure PIDs are always lowerCased if they are alpha-numeric
	cbar_temp = cbar_Sizzle('form[name="AddToCart"] input[name="ProdID"]');
	if(cbar_temp.length>0) {
		cbar_pid = cbar_temp[0].value;
	}
	
	if (cbar_pid.search('tel:') >-1) { 
		// on Ipad/iphone a number is turned into <a href="tel:1102373">1102373</a>
		cbar_pattern = /([0-9]+)/gim; 
		cbar_match= cbar_pattern.exec(cbar_pid); 
		if (cbar_match!=null && cbar_match[1].length>0) cbar_pid= cbar_match[1]; 
	}
	
	//name	
	cbar_temp = cbar_Sizzle('h1.title-headline');
	if (cbar_temp.length>0) {
		cbar_name = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
	}
	
	//purl. (query parameters required for loading correct product page must be tested and included in the url, by default no parameters are included) 
	var tmp =window.location.href.split("#");
	cbar_purl = tmp[0];
	
	// Cbar cid and parent category	
	cbar_temp = cbar_Sizzle('ul.breadcrumb li a');
	if(cbar_temp.length>0) {
		if(cbar_temp.length>1) {
		
			cbar_cids_p = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"").replace(/\s/g,"-");
			cbar_cname = cbar_temp[1].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cid = cbar_cname.toLowerCase().replace(/\s/g,"-");
		}
		else {
		
			cbar_cname = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
			cbar_cid = cbar_cname.toLowerCase().replace(/\s/g,"-");
		}
	}

	cbar_cid = cbar_cid.replace('all-','');
	
	//Lower case CIDs and Parent CIDs
	if(cbar_cid!="") cbar_cid = cbar_cid.toLowerCase();
	if(cbar_cids_p!="") cbar_cids_p = cbar_cids_p.toLowerCase();
	
	
	// ###### important: Assign full path to cid where there are chances of categories like (Womens >> Shoes & Mens >> Shoes), here "Shoes" is ambiguous if not assigned the full path
	if(cbar_cids_p!="" && cbar_cid !="") {
		cbar_cid = cbar_cids_p +"_"+ cbar_cid;	//## also match on category pages.
	}
	if (cbar_cids_p!='') {
		cbar_cids_cur=cbar_cid; // make sure the product cid doesnt change on server side when storing parent category.
	}
	if( cbar_cids_p.search('clearance') > -1 || cbar_cid.search('clearance') > -1 || 
		cbar_cids_p.search('top-sellers') > -1 || cbar_cid.search('top-sellers') > -1 ){
		
			cbar_cid = '';
			cbar_cname = '';
			cbar_cids_p = '';
			cbar_cids_cur = '';
	}

	//out of stock. 
	cbar_temp= cbar_Sizzle ('form[name="AddToCart"] p');
	if (cbar_temp.length>0 && cbar_temp[0].innerHTML.toLowerCase().replace(/^\s+|\s+$/g,"") == "we are sorry. this product is currently out of stock.") {
		cbar_oos = 1;
	}
	
	//Product image
	//Important: Always scrape medium or large size images for product image. If you need to scrape thumbnail images (for example to display in the widget) scrape it in extra variables explained below

	var cbar_temp = cbar_Sizzle('div.details-panel div.item-picture img#zoomed_image'); //generally from main image tag
	if (cbar_temp.length>0) {
	
		cbar_pic = cbar_temp[0].src;
		if(cbar_pic.search('localhost')>-1) cbar_pic = '';
		if(cbar_pic.search(/[0-9]\/bmi\//)>-1) cbar_pic = '';
	}
	else {
	
		cbar_temp = cbar_Sizzle('div.details-panel div.item-picture img[src^="/custom/alpacadirect/images/"]:first'); 
		if (cbar_temp.length>0) {				
			
			cbar_pic = cbar_temp[0].src;
			if(cbar_pic.search('localhost')>-1) cbar_pic = '';
			if(cbar_pic.search(/[0-9]\/bmi\//)>-1) cbar_pic = '';
		}	
	}
	
	//Product Price
	cbar_temp = cbar_Sizzle('#DetailsNewPrice');
	if (cbar_temp.length>0) { 
		cbar_pri = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
	}
	else{
		cbar_temp = cbar_Sizzle('#prodskuprice');
		if (cbar_temp.length>0) { 
			cbar_pri = "$" + cbar_temp[0].value;
		}
		
	}
	
	if (cbar_pri=='' && cbar_name.toLowerCase().search('gift card')>-1) cbar_pri ='$15.00'; //exception for gift cards, cart total is scraped too
	
	//out of stock pages..(this is different from out of stock (cbar_oos) where product info is available but the product is out of stock, here no product info is available similar to 404)
	cbar_temp = cbar_Sizzle('');
	if (cbar_temp.length>0) {
		cbar_oos_page=1;
		cbar_ctr1=1;
	}

	//Optional elements to scrape..	
	//old price  or list price(if any), scrape into cbar_extra1
	cbar_temp = cbar_Sizzle('#DetailsListPrice');
	if (cbar_temp.length>0) { 
		cbar_extra1 = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,""); 
	}
	
	//Product ratings (image) if any. scrape into cbar_extra2
	cbar_temp = cbar_Sizzle('div.pr-snippet-stars span.pr-snippet-rating-decimal');
	if(cbar_temp.length>0) {
		cbar_extra2 = cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
		if(cbar_extra2 == "0.0" || cbar_extra2 == "0"){
			cbar_extra2 =' ';
		}
	}
	
	//Similariy, cbar_extra3 can be used for any other extra value you have scrapped like above
	
	//Brand or manufacturer if any. scrape into cbar_filter_val (optional)
	var cbar_temp = cbar_Sizzle('ul.list-det:has(li:contains(Brand:)) li:last a:first');
	if (cbar_temp.length>0) { 
		cbar_filter_val	= cbar_temp[0].innerHTML.replace(/^\s+|\s+$/g,"");
	}
	
	/*
	//show ultimately bought on second page view	
	if (cbar_readCookie (cbar_pid) == null )
		cbar_createCookie(cbar_pid,'true');
	else 
	{	
		//cbar flow to display the ultimately bought widget; Note if the widget doesnot appear try changing 50 value in the below flow to some lower value eg 1 in the P0 or P1 section of the flow				
		cbar_flow="H0:0,5,13,5.9,12,8;H1:0,0,0,0,0;P0:0,2,13,18.0.0.0.0.0.0.50,1.0.2,5,1.2,2;P1:0,3,1.2.1.14,5.2,6,2;C0:1,3,13,5.0,2;C1:0,0,0,0,0;Sc0:1,2,7.2.1.0.0.0.5,11.2,17,3;Sc1:1,0,0,0,0;OOS0:1,1,1.0.0.0.0.100";	
		
		OR (another example, if you want ultimately bought on the second widget. also if featured item is not appearing as the first item try (18.0.0.0.0.0.0.50)
		
		cbar_flow="H0:1,3,13,5.9,12,8;H1:1,0,0,0,0;P0:1,3,13,1.4.0.7,1,5,2;P1:1,3,18.0.0.0.0.0.0.50,2.0;C0:1,2,13,5.0,2.0;C1:1,1,2.6;Sc0:1,2,7.4.0.100,11.4.0.100;Sc1:1,0,0,0,0";
		
		cbar_ctr2=1;
	}	
	//end ultimately bought
	*/
	
	cbar_interval = window.setInterval(function() {
		if (typeof jQuery !="undefined") {
			if (jQuery("#QuickCartModal").is(':visible')){
				cbar_add_to_cart(cbar_pid, 1,0);
				window.clearInterval (cbar_interval);
			}
		}
	},1000);
}		
//end product page	

	
//Search page scraping
if ((cbar_url.toLowerCase().search('/results.cfm')>-1) && (cbar_url.toLowerCase().search('keywords=')> -1)){
	cbar_search=cbar_gup('keywords');	//scrape the search keyword. generally from url parameter
}


// Shopping Cart scraping.
cbar_temp = cbar_Sizzle("div#payTypeCreditCard"); //(related to LH#2063. don't scrape the cart when its part of thanks)	
	
if (cbar_url.toLowerCase().search('/showcart.cfm')>-1 && cbar_temp.length == 0) 
{
	//cbar_pur_mode	= 1;	//Turn this on when sending items list by product names, instead of product ids (recommended)
	
	cbar_is_pur		= 1;
	//cbar_crtn 	= 0;	//cart number of items (add the quantities)
	cbar_pur_pids	= [];	//stores either product ids (recommended) or product names or products in cart
	cbar_pur_qtys	= [];	//quantity of each product in cart

	var cbar_temp = cbar_Sizzle('form[name="updatecart"] table.order-summery tr[data-productid]');
	if(cbar_temp.length>0){	
		for (var nodei=0; nodei < cbar_temp.length; nodei++) {
			pid_tmp= jQuery(cbar_temp[nodei]).attr('data-productid');			
			cbar_pur_pids.push(pid_tmp);	//push product id/name. Make sure PIDs are lowerCased if they are alpha-numeric
		}
	}
	else {
		var cbar_temp = cbar_Sizzle('form[name="updatecart"] table.order-summery tr.cart-item-row div.cart-item-title a');
		for (var nodei=0; nodei < cbar_temp.length; nodei++) {
		
			pid_tmp= cbar_temp[nodei].href.match(/ProdID=([0-9]+)/);			
			cbar_pur_pids.push(pid_tmp[1].toLowerCase());	//push product id/name. Make sure PIDs are lowerCased if they are alpha-numeric
		}
	}
	
	var cbar_temp = cbar_Sizzle('form[name="updatecart"] table.order-summery tr.cart-item-row select[name="qty"] option[selected=""]');
	for (var nodei=0; nodei < cbar_temp.length; nodei++) {
	
		qty_tmp= cbar_temp[nodei].value;	
		cbar_pur_qtys.push(qty_tmp);	//push product qty
			
		cbar_crtn ++; // !!!! Important: if cbar_crtn is scraped make sure to scrape cbar_crt & vice-versa !!!!
	}
	
	//Scrape the cart total
	// !!!! Important: if cbar_crt is scraped make sure to scrape cbar_crtn & vice-versa !!!!
	
	
	cbar_temp = cbar_Sizzle('#subtotal-value');	
	if (cbar_temp.length>0) {
		cbar_crt = cbar_getnums(cbar_temp[0].innerHTML)[0];
	}
		
	
	//coupon code handling...
	cbar_temp =cbar_Sizzle ('input[name="SpecialOfferCode"]');
	if (cbar_temp.length>0) {
		cbar_cou_input= cbar_temp[0];
	}
}
//end shopping cart	


//coupon code callbacks
/* ONLY USE WHEN THERE IS PAGE REFRESH IN COUPON SUBMISSION
cbar_before_cou_inj = function (input) {

	// avoid infinite loop when injecting coupon (it is reloading the same page)
	var last_inj_time = cbar_readCookie('cbar_coupon_injected' );
	var now=Math.round(new Date().getTime() /1000);
	if ( (last_inj_time==null) || (( now- last_inj_time) >60) ) {
		cbar_createCookie('cbar_coupon_injected',now );
		return true;
	}
	else return false; // dont inject
}
*/

cbar_after_cou_inj = function (input) {
	
	//window.onbeforeunload=null;  // prevent leaving page events by the coupon apply page refresh (use only when coupon refreshes page)	
	tmp = cbar_Sizzle('input[name="imgApplyButton"], button[name="imgApplyButton"]');
	if(tmp.length>0) {		
		$('#UsingSpecialOffer')[0].click();
		$(tmp[0]).click();
	}
}	
//end coupon code callbacks

// Scrape email inputs. We scrape all the possible email inputs as an array from checkout, login or register pages
if( cbar_url.toLowerCase().search('/signinform.cfm') > -1 || 
	cbar_url.toLowerCase().search('/orderform.cfm') > -1 ||
	cbar_url.toLowerCase().search('/wholesaleaccount.cfm') > -1 ) 
{ 	
	cbar_e_input= cbar_Sizzle ('form#CustForm input[name="cstEmail"]');
	cbar_e_com=true;		
}
//For footer newsletter 
cbar_temp = cbar_Sizzle('form[name="quicksignup"]');
if(cbar_temp.length > 0)
{
	cbar_temp = cbar_Sizzle('input[name="CustomerEmail"]:first');
	if(cbar_e_input){
		cbar_e_input.push(cbar_temp[0]);
		cbar_e_com=true;	
	}else{
		cbar_e_input = cbar_temp;
		cbar_e_com=true;	
	}
	cbar_temp = cbar_Sizzle('form[name="quicksignup"] input[name="CustomerEmail"]');
	if(cbar_e_input){
		cbar_e_input.push(cbar_temp[0]);
		cbar_e_com=true;	
	}else{
		cbar_e_input = cbar_temp;
		cbar_e_com=true;	
	}	
}
cbar_temp = cbar_Sizzle('div#GiftCardForm input[name="GiftCardFrom"]');
if(cbar_temp.length > 0)
{
	if(cbar_e_input){
		cbar_e_input.push(cbar_temp[0]);
		cbar_e_com=true;	
	}else{
		cbar_e_input = cbar_temp;
		cbar_e_com=true;	
	}
} 
//end email


// Thank You Page scraping. (possible only after purchase is made)

//detect purchases earlier (LH#2063)
if(cbar_url.toLowerCase().search('/confirmation.cfm')>-1 || cbar_url.toLowerCase().search('paypalcheckout.cfm')>-1)
{  	
	cbar_is_pur		= 1;			
	cbar_pur_com	= true;	//actual buy took place	
}

if(cbar_url.toLowerCase().search('showcart.cfm')>-1)
{  	
	var cbar_temp = cbar_Sizzle("div#payTypeCreditCard");
	if(cbar_temp.length>0)
	{
		cbar_is_pur		= 1;			
		cbar_pur_com	= true;	//actual buy took place	
	}	
} 

// end thank you


// Widgets Begin
//common widget variables
cbar_w_title_len	= 50;	//max length of product titles displayed on widget.


//for multiline widgets use:
//cbar_w_linebreak_template[0]='<br style="clear:both"/>';
//cbar_w_iconsperline[0]=4;

//example  Home Page Widget (simple widget)
/*
* NOTE:
* There can be more than 1 widget on one page (max 2). For second widget simply replace the  '0' with '1' in 
* all the widget variables and array.
*
 */

if (cbar_home)
{		
	//Scrape anchor element, around which the widget displays itself on the page
	cbar_temp = cbar_Sizzle('');
	if (cbar_temp.length>0) {
		cbar_w_anchor[0]=cbar_temp[0];
	}
	
	cbar_w_numshowicons[0] = 3; //number items shown in the widget
	cbar_w_insert_where[0] = 0;	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor	
	
	// styles
	cbar_w0_wrap_s				= '';
	cbar_w0_header_s			= '';
	cbar_w0_items_s				= '';
	cbar_w0_item_s				= '';
	cbar_w0_item_a_s			= '';
	cbar_w0_item_img_s			= '';
	cbar_w0_item_perc_pur_s		= '';
	cbar_w0_item_perc_pur2_s	= '';
	cbar_w0_item_title_s		= '';
	cbar_w0_item_xtr1_s			= '';
	cbar_w0_item_xtr1_in_s		= '';
	cbar_w0_item_price_s		= '';
	cbar_w0_item_price_in_s		= '';
	cbar_w0_item_xtr2_s			= '';
	cbar_w0_item_xtr2_in_s		= '';
	cbar_w0_item_xtr3_s			= '';
	cbar_w0_item_xtr3_in_s		= '';

	// html   	
	//widget head
	cbar_w_template_head[0]='<div  id="cbar_widget0" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">%group_title%</div>'+
	'<div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';
    
	//widget items
	cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Home\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
	        '<img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%">'+
	        '<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
	        '<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
	        '<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
	        '<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'">Regular price: <span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_xtr2_s"  style=" display:none;'+cbar_w0_item_xtr2_s+'">:<span id="cbar_w0_%t%_item_xtr2_in_s" style="'+cbar_w0_item_xtr2_in_s+'">%xtr2%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';

	//widget footer
	cbar_w_template_bottom[0]='</div></div>';
}


//Category widget start
if (cbar_cid && !cbar_pid)
{
	//Scrape anchor element, around which the widget displays itself on the page
	if(cbar_top_cat == false)
	{
		cbar_w_title_len	= 35;

		//cbar_temp = cbar_Sizzle('div.left-menu div:first');		
		cbar_temp = cbar_Sizzle('div#barilliance');
		if (cbar_temp.length>0) {
			cbar_w_anchor[0]=cbar_temp[0];
		}
		
		cbar_w_insert_where[0] = 2; 	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor
		cbar_numicons1		 	= 4; 	//tells how many items are actually in the widget	(for first scrolling widget you suffix the the variable with 1, for second widget, suffix with 2)	
		cbar_w_scrollbuttons	= false;	//scrolling widget.
		
		
		// styles
		cbar_w0_wrap_s				= 'float: left; width: auto; background-color:white; width:100%;';
		cbar_w0_header_s			= 'background-color: #72A6D8; font-family: OpenSansSemiBold; font-size: 16px; padding: 12px 0; color:white; text-align:center; text-transform:capitalize; letter-spacing:2px;margin-left:0px;';
		cbar_w0_items_s				= 'padding: 5px;';
		cbar_w0_item_s				= 'float: left; padding-top:5px; width:155px; height:255px; margin:10px 15px;';
		cbar_w0_item_a_s			= 'text-decoration: none;';
		cbar_w0_item_img_s			= 'height: 160px; border: 0px; display:block; margin:auto;';
		cbar_w0_item_perc_pur_s		= '';
		cbar_w0_item_perc_pur2_s	= '';
		cbar_w0_item_title_s		= 'color: #0072BC; font-size: 14px; font-family: Droid Sans,sans-serif; font-weight: normal; text-align: left; padding: 2px 0; line-height: 20px; text-transform:capitalize; ';
		cbar_w0_item_xtr1_s			= 'float: left; width: 70px; margin-right:5px;';
		cbar_w0_item_xtr1_in_s		= 'color: #72A6D8; font-size: 14px; font-family: open_sansregular; font-weight: normal; text-decoration: line-through;';
		cbar_w0_item_price_s		= 'float: left; width: 70px; ';
		cbar_w0_item_price_in_s		= 'color: #FF0000; font-size: 14px; font-family: open_sansregular; font-weight: normal;';
		cbar_w0_item_xtr2_s			= '';
		cbar_w0_item_xtr2_in_s		= '';
		cbar_w0_item_xtr3_s			= '';
		cbar_w0_item_xtr3_in_s		= '';
		cbar_w0_item_rating_box_s   = 'float: left; margin:2px 0px;' ;
		cbar_w0_item_rating_count_s	= 'background-color: #414142; color: #FFFFFF; padding: 0 0.2em; float: left; font-size: 85%; height: 15px; line-height: 15px; margin-right: 0.3em; border-radius: 0.2em 0.2em 0.2em 0.2em;';
		cbar_w0_item_rating_s       = 'float:left; margin-top: 2px; width:100%;';
		
		
		//html	
		//change the paths of arrows in below code
		cbar_w_next_html='<a href="javascript:void(0)"><img style="float:left;width:42px; height:28px; margin-top:0px"  onclick="return cbar_w_next(%i%);" src="/docroot/css/immagini/carosello_freccia_dx.gif"></img></a>';
		cbar_w_prev_html='<a href="javascript:void(0)"><img style="float:left;margin-top:0px"; onclick="return cbar_w_prev(%i%);" src="/docroot/css/immagini/carosello_freccia_sx.gif"></img></a>';

		
		//widget head
		cbar_w_template_head[0]='<div  id="cbar_widget0" class="facetContainer" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">%group_title%</div>'+
		'<div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';

		//widget items
		cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
				'<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Product\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
				'<div style="width:150px; height:160px; border: 1px solid #dbc1a4"><img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%"></div></a>'+
				'<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
				'<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
				'<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Product\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
				'<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
				'<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'"><span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
				'<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
				'<div id="cbar_w0_%t%_item_rating_s" style="'+cbar_w0_item_rating_s+'">'+
				'<div id="cbar_w0_%t%_item_rating_box_s" style="'+cbar_w0_item_rating_box_s+'"><div id="cbar_w0_%t%_item_rating_star_s" style="float:left; margin-right: 2px;">&nbsp;</div><span style="'+cbar_w0_item_rating_count_s+'">%xtr2%</span></div>'+'</div>'+
				'<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';
		
		//widget footer
		cbar_w_template_bottom[0]='</div><div style="float:left;">%nextbutton%</div></div>';
	}
	
	if(cbar_top_cat == true)
	{
	
		cbar_w_title_len	= 35;
		//Scrape anchor element, around which the widget displays itself on the page
		cbar_temp = cbar_Sizzle('div.container div.detail-page');
		if (cbar_temp.length>0) {
			cbar_w_anchor[0]=cbar_temp[0];
		}
		
		cbar_w_insert_where[0] 	= 2; 	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor
		
		cbar_w_numshowicons[0] 	= 5; 	//number of items displayed in the scroll at a time
		cbar_numicons1		 	= 8; 	//tells how many items are actually in the widget	(for first scrolling widget you suffix the the variable with 1, for second widget, suffix with 2)	
		cbar_w_scrollbuttons	= false;	//scrolling widget.
		
		
		// styles
		cbar_w0_wrap_s				= 'background-color: #FFFFFF; border: 1px solid #CCCCCC; float: left; width:100%; padding-bottom:20px;';
		cbar_w0_header_s			= 'background-color: #72A6D8; font-family: OpenSansSemiBold; font-size: 18px; padding: 12px 0; color:white; text-align:center; text-transform:capitalize; letter-spacing:2px;';
		cbar_w0_items_s				= 'padding: 5px;';
		cbar_w0_item_s				= 'float: left; width:182px; padding-top:5px; margin:0px 8px;';
		cbar_w0_item_a_s			= 'text-decoration: none;';
		cbar_w0_item_img_s			= 'width: auto; height: 160px; border: 0px; display:block; margin:auto;';
		cbar_w0_item_perc_pur_s		= '';
		cbar_w0_item_perc_pur2_s	= '';
		cbar_w0_item_title_s		= 'color: #0072BC; font-size: 14px; font-family: Droid Sans,sans-serif; font-weight: normal; text-align: left; padding: 2px 0; line-height: 20px; text-transform:capitalize; ';
		cbar_w0_item_xtr1_s			= 'float: left; width: 70px; margin-right:5px;';
		cbar_w0_item_xtr1_in_s		= 'color: #72A6D8; font-size: 14px; font-family: open_sansregular; font-weight: normal; text-decoration: line-through;';
		cbar_w0_item_price_s		= 'float: left; width: 70px; ';
		cbar_w0_item_price_in_s		= 'color: #FF0000; font-size: 14px; font-family: open_sansregular; font-weight: normal;';
		cbar_w0_item_xtr2_s			= '';
		cbar_w0_item_xtr2_in_s		= '';
		cbar_w0_item_xtr3_s			= '';
		cbar_w0_item_xtr3_in_s		= '';
		cbar_w0_item_rating_box_s   = 'float: left; margin-top: 3px; margin-right: 0.3em; ';
		cbar_w0_item_rating_count_s	= 'background-color: #414142; color: #FFFFFF; padding: 0 0.2em; float: left; font-size: 85%; height: 15px; line-height: 15px; margin-right: 0.3em; border-radius: 0.2em 0.2em 0.2em 0.2em;';
		cbar_w0_item_rating_s       = 'float:left; margin-top: 2px; width:100%;';
		
		
		//html	
		//change the paths of arrows in below code
		cbar_w_next_html='<a href="javascript:void(0)"><img style="float:left;width:42px; height:28px; margin-top:0px"  onclick="return cbar_w_next(%i%);" src="/docroot/css/immagini/carosello_freccia_dx.gif"></img></a>';
		cbar_w_prev_html='<a href="javascript:void(0)"><img style="float:left;margin-top:0px"; onclick="return cbar_w_prev(%i%);" src="/docroot/css/immagini/carosello_freccia_sx.gif"></img></a>';

		
		//widget head
		cbar_w_template_head[0]='<div  id="cbar_widget0" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">Suggestions</div>'+
		'<div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';

		//widget items
		cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
				'<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Category\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
				'<div style="width:180px; height:160px; border: 1px solid #dbc1a4"><img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%"></div></a>'+
				'<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
				'<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
				'<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Category\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
				'<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
				'<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'"><span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
				'<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
				'<div id="cbar_w0_%t%_item_rating_s" style="'+cbar_w0_item_rating_s+'">'+
				'<div id="cbar_w0_%t%_item_rating_box_s" style="'+cbar_w0_item_rating_box_s+'"><div id="cbar_w0_%t%_item_rating_star_s" style="float:left; margin-right: 2px;">&nbsp;</div><span style="'+cbar_w0_item_rating_count_s+'">%xtr2%</span></div>'+'</div>'+
				'<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';
		
		//widget footer
		cbar_w_template_bottom[0]='</div><div style="float:left;">%nextbutton%</div></div>';
	}
}
//Category widget end


// Product Page Widget
if (cbar_pid && !cbar_oos_page)
{
	//Scrape anchor element, around which the widget displays itself on the page
	//cbar_temp = cbar_Sizzle('div.left-menu ul.left-cat div.left-titles')
	cbar_temp = cbar_Sizzle('div#barilliance');
	if (cbar_temp.length>0) {
		cbar_w_anchor[0]=cbar_temp[0];
	}
	
	cbar_w_insert_where[0] 	= 2; 	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor
	
	cbar_w_numshowicons[0] 	= 3; 	//number of items displayed in the scroll at a time
	cbar_numicons1		 	= 8; 	//tells how many items are actually in the widget	(for first scrolling widget you suffix the the variable with 1, for second widget, suffix with 2)	
	cbar_w_scrollbuttons	= false;	//scrolling widget.
	
	
	// styles
	cbar_w0_wrap_s				= 'float: left; border: 1px solid #CCCCCC; margin-left: 2px; width: auto; background-color:white;';
	cbar_w0_header_s			= 'background-color: #72A6D8; font-family: OpenSansSemiBold; font-size: 18px; padding: 12px 0; color:white; text-align:center; text-transform:capitalize; letter-spacing:2px;';
	cbar_w0_items_s				= 'padding: 5px;';
	cbar_w0_item_s				= 'float: left; border-bottom:1px solid #EEEEEE; padding-top:5px;width:196px';
	cbar_w0_item_a_s			= 'text-decoration: none;';
	cbar_w0_item_img_s			= 'width: auto; height: 160px; border: 0px; display:block; margin:auto;';
	cbar_w0_item_perc_pur_s		= '';
	cbar_w0_item_perc_pur2_s	= '';
	cbar_w0_item_title_s		= 'color: #0072BC; font-size: 14px; font-family: Droid Sans,sans-serif; font-weight: normal; text-align: left; padding: 2px 0; line-height: 20px; text-transform:capitalize;';
	cbar_w0_item_xtr1_s			= 'float: left; width: 70px; margin-right: 5px;';
	cbar_w0_item_xtr1_in_s		= 'color: #72A6D8; font-size: 14px; font-family: open_sansregular; font-weight: normal; text-decoration: line-through;';
	cbar_w0_item_price_s		= 'float: left; width: 70px;';
	cbar_w0_item_price_in_s		= 'color: #FF0000; font-size: 14px; font-family: open_sansregular; font-weight: normal;';
	cbar_w0_item_xtr2_s			= '';
	cbar_w0_item_xtr2_in_s		= '';
	cbar_w0_item_xtr3_s			= '';
	cbar_w0_item_xtr3_in_s		= '';
	cbar_w0_item_rating_box_s   = 'float: left; margin-top: 3px; margin-right: 0.3em;';
	cbar_w0_item_rating_count_s	= 'background-color: #414142; color: #FFFFFF; padding: 0 0.2em; float: left; font-size: 85%; height: 15px; line-height: 15px; margin-right: 0.3em; border-radius: 0.2em 0.2em 0.2em 0.2em;';
	cbar_w0_item_rating_s       = 'float:left; margin-top: 2px; width:100%;';
	
	
	//html	
	//change the paths of arrows in below code
	cbar_w_next_html='<a href="javascript:void(0)"><img style="float:left;width:42px; height:28px; margin-top:0px"  onclick="return cbar_w_next(%i%);" src="/docroot/css/immagini/carosello_freccia_dx.gif"></img></a>';
	cbar_w_prev_html='<a href="javascript:void(0)"><img style="float:left;margin-top:0px"; onclick="return cbar_w_prev(%i%);" src="/docroot/css/immagini/carosello_freccia_sx.gif"></img></a>';

	
	//widget head
	cbar_w_template_head[0]='<div  id="cbar_widget0" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">Suggestions</div>'+
	'<div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';

	//widget items
	cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Product\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
	        '<img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%"></a>'+
	        '<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
	        '<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Product\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
			'<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
	        '<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'"><span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
			'<div id="cbar_w0_%t%_item_rating_s" style="'+cbar_w0_item_rating_s+'">'+
			'<div id="cbar_w0_%t%_item_rating_box_s" style="'+cbar_w0_item_rating_box_s+'"><div id="cbar_w0_%t%_item_rating_star_s" style="float:left; margin-right: 2px;">&nbsp;</div><span style="'+cbar_w0_item_rating_count_s+'">%xtr2%</span></div>'+'</div>'+
	        '<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';
	
	//widget footer
	cbar_w_template_bottom[0]='</div><div style="float:left;">%nextbutton%</div></div>';
}
//product page widget end


//Search widget start
if ((cbar_url.toLowerCase().search('/results.cfm')>-1) && (cbar_url.toLowerCase().search('keywords=')> -1))
{
	//Scrape anchor element, around which the widget displays itself on the page
	cbar_temp = cbar_Sizzle('section#highlighted-product div.container');
	//cbar_temp = cbar_Sizzle('');
	if (cbar_temp.length>0) {
		cbar_w_anchor[0]=cbar_temp[0];
	}
	
	cbar_w_insert_where[0] 	= 2; 	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor
	
	cbar_w_numshowicons[0] 	= 5; 	//number of items displayed in the scroll at a time
	cbar_numicons1		 	= 8; 	//tells how many items are actually in the widget	(for first scrolling widget you suffix the the variable with 1, for second widget, suffix with 2)	
	cbar_w_scrollbuttons	= false;	//scrolling widget.
	
	
	// styles
	cbar_w0_wrap_s				= 'float: left; padding: 0 3px 10px; width: 80%;';
	cbar_w0_header_s			= 'background-color: #72A6D8; font-family: OpenSansSemiBold; font-size: 18px; padding: 8px 0; color:white; text-align:center; text-transform:capitalize; letter-spacing:2px; width: 99.25%;';
	cbar_w0_items_s				= 'float: left; margin: 10px 0;';
	cbar_w0_item_s				= 'float: left; margin: 0 12px; width: 17%;';
	cbar_w0_item_a_s			= 'text-decoration: none;';
	cbar_w0_item_img_s			= 'width: auto; height: 160px; border: 0px; display:block; margin:auto;';
	cbar_w0_item_perc_pur_s		= '';
	cbar_w0_item_perc_pur2_s	= '';
	cbar_w0_item_title_s		= 'color: #0072BC; font-size: 14px; font-family: Droid Sans,sans-serif; font-weight: normal; height: 60px; text-align: left; padding: 2px 0; line-height: 20px; text-transform:capitalize;overflow:hidden;';
	cbar_w0_item_xtr1_s			= 'float: left; width: 70px; margin-right: 5px;';
	cbar_w0_item_xtr1_in_s		= 'color: #72A6D8; font-size: 14px; font-family: open_sansregular; font-weight: normal; text-decoration: line-through;';
	cbar_w0_item_price_s		= 'float: left; width: 70px;';
	cbar_w0_item_price_in_s		= 'color: #FF0000; font-size: 14px; font-family: open_sansregular; font-weight: normal;';
	cbar_w0_item_xtr2_s			= '';
	cbar_w0_item_xtr2_in_s		= '';
	cbar_w0_item_xtr3_s			= '';
	cbar_w0_item_xtr3_in_s		= '';
	cbar_w0_item_rating_box_s   = 'float: left; margin-top: 3px; margin-right: 0.3em;';
	cbar_w0_item_rating_count_s	= 'background-color: #414142; color: #FFFFFF; padding: 0 0.2em; float: left; font-size: 85%; height: 15px; line-height: 15px; margin-right: 0.3em; border-radius: 0.2em 0.2em 0.2em 0.2em;';
	cbar_w0_item_rating_s       = 'float:left; margin-top: 2px; width:100%;';
	
	
	//html	
	//change the paths of arrows in below code
	cbar_w_next_html='<a href="javascript:void(0)"><img style="float:left;width:42px; height:28px; margin-top:0px"  onclick="return cbar_w_next(%i%);" src="/docroot/css/immagini/carosello_freccia_dx.gif"></img></a>';
	cbar_w_prev_html='<a href="javascript:void(0)"><img style="float:left;margin-top:0px"; onclick="return cbar_w_prev(%i%);" src="/docroot/css/immagini/carosello_freccia_sx.gif"></img></a>';

	
	//widget head
	cbar_w_template_head[0]='<div  id="cbar_widget0" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">%group_title%</div>'+
	'<div style="float:left;">%prevbutton%</div><div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';

	//widget items
	cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Shopping Cart\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
	        '<img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%"></a>'+
	        '<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
	        '<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Shopping Cart\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
			'<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
	        '<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'"><span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
			'<div id="cbar_w0_%t%_item_rating_s" style="'+cbar_w0_item_rating_s+'">'+
			'<div id="cbar_w0_%t%_item_rating_box_s" style="'+cbar_w0_item_rating_box_s+'"><div id="cbar_w0_%t%_item_rating_star_s" style="float:left; margin-right: 2px;">&nbsp;</div><span style="'+cbar_w0_item_rating_count_s+'">%xtr2%</span></div>'+'</div>'+
	        '<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';
	
	//widget footer
	cbar_w_template_bottom[0]='</div><div style="float:left;">%nextbutton%</div></div>';
}
//Search widget end


// Shopping Cart Widget - Dev site
if (cbar_url.toLowerCase().search('/showcart.cfm')>-1) 
{
	//Scrape anchor element, around which the widget displays itself on the page
	cbar_temp = cbar_Sizzle('.detail-window');
	if (cbar_temp.length>0) {
		cbar_w_anchor[0]=cbar_temp[0];
	}
	
	cbar_w_insert_where[0] 	= 2; 	//determines the position of widget with reference to anchor element possible values 0 = after the anchor, 1= before the anchor, 2= inside the anchor
	
	cbar_w_numshowicons[0] 	= 5; 	//number of items displayed in the scroll at a time
	cbar_numicons1		 	= 8; 	//tells how many items are actually in the widget	(for first scrolling widget you suffix the the variable with 1, for second widget, suffix with 2)	
	cbar_w_scrollbuttons	= false;	//scrolling widget.
	
	
	// styles
	cbar_w0_wrap_s				= 'padding: 0 20px 10px; width:auto;margin-top:25px;';
	cbar_w0_header_s			= 'background-color: #72A6D8; font-family: OpenSansSemiBold; font-size: 18px; padding: 8px 0; color:white; text-align:center; text-transform:capitalize; letter-spacing:2px;';
	cbar_w0_items_s				= 'float: left; margin: 10px 0;';
	cbar_w0_item_s				= 'float: left; margin-left: 15px; margin-right: 17px; width: 17%; ';
	cbar_w0_item_a_s			= 'text-decoration: none;';
	cbar_w0_item_img_s			= 'width: auto; height: 160px; border: 0px; display:block; margin:auto;';
	cbar_w0_item_perc_pur_s		= '';
	cbar_w0_item_perc_pur2_s	= '';
	cbar_w0_item_title_s		= 'color: #0072BC; font-size: 14px; font-family: Droid Sans,sans-serif; font-weight: normal; text-align: left; padding: 2px 0; line-height: 20px; text-transform:capitalize;';
	cbar_w0_item_xtr1_s			= 'float: left; width: 70px; margin-right: 5px;';
	cbar_w0_item_xtr1_in_s		= 'color: #72A6D8; font-size: 14px; font-family: open_sansregular; font-weight: normal; text-decoration: line-through;';
	cbar_w0_item_price_s		= 'float: left; width: 70px;';
	cbar_w0_item_price_in_s		= 'color: #FF0000; font-size: 14px; font-family: open_sansregular; font-weight: normal;';
	cbar_w0_item_xtr2_s			= '';
	cbar_w0_item_xtr2_in_s		= '';
	cbar_w0_item_xtr3_s			= '';
	cbar_w0_item_xtr3_in_s		= '';
	cbar_w0_item_rating_box_s   = 'float: left; margin-top: 3px; margin-right: 0.3em;';
	cbar_w0_item_rating_count_s	= 'background-color: #414142; color: #FFFFFF; padding: 0 0.2em; float: left; font-size: 85%; height: 15px; line-height: 15px; margin-right: 0.3em; border-radius: 0.2em 0.2em 0.2em 0.2em;';
	cbar_w0_item_rating_s       = 'float:left; margin-top: 2px; width:100%;';
	
	
	//html	
	//change the paths of arrows in below code
	cbar_w_next_html='<a href="javascript:void(0)"><img style="float:left;width:42px; height:28px; margin-top:0px"  onclick="return cbar_w_next(%i%);" src="/docroot/css/immagini/carosello_freccia_dx.gif"></img></a>';
	cbar_w_prev_html='<a href="javascript:void(0)"><img style="float:left;margin-top:0px"; onclick="return cbar_w_prev(%i%);" src="/docroot/css/immagini/carosello_freccia_sx.gif"></img></a>';

	
	//widget head
	cbar_w_template_head[0]='<div  id="cbar_widget0" style="'+cbar_w0_wrap_s+'"><div id="cbar_w0_header_s" style="'+cbar_w0_header_s+'">%group_title%</div>'+
	'<div style="float:left;">%prevbutton%</div><div id="cbar_w0_items_s" style="'+cbar_w0_items_s+'">';

	//widget items
	cbar_w_item_template[0]='<div id="cbar_w0_%t%_item_s" style="'+cbar_w0_item_s+'">'+
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Shopping Cart\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
	        '<img id="cbar_w0_%t%_item_img_s" style="'+cbar_w0_item_img_s+'"  src="%picture%"></a>'+
	        '<div  id="cbar_w0_%t%_item_perc_pur_s"  style="display:none; '+cbar_w0_item_perc_pur_s+'">%perc_purchased%% buy:</div>'+ // % purchased this item
	        '<div  id="cbar_w0_%t%_item_perc_pur2_s"  style="display:none; '+cbar_w0_item_perc_pur2_s+'">%perc_purchased%% buy the item featured on this page:</div>'+ // % purchased item on this page
	        '<a id="cbar_w0_%t%_item_a_s" style="'+cbar_w0_item_a_s+'"  onclick="cbar_ga_eventtrack(this, \'Barilliance\', \'Shopping Cart\', \'%title%\'); return cbar_click3(this, \'%url%\', %rectype%, %idx%,\'%pid%\');" href="%url%">'+
			'<div  id="cbar_w0_%t%_item_title_s"  style="'+cbar_w0_item_title_s+'">%title%</div></a>'+
	        '<div  id="cbar_w0_%t%_item_xtr1_s"  style="display:none; '+cbar_w0_item_xtr1_s+'"><span id="cbar_w0_%t%_item_xtr1_in_s" style="'+cbar_w0_item_xtr1_in_s+'">%xtr1%</span></div>'+
	        '<div  id="cbar_w0_%t%_item_price_s"  class= "relatedprice" style="'+cbar_w0_item_price_s+'"><span id="cbar_w0_%t%_item_price_in_s" style="'+cbar_w0_item_price_in_s+'">%price%</span></div>'+
			'<div id="cbar_w0_%t%_item_rating_s" style="'+cbar_w0_item_rating_s+'">'+
			'<div id="cbar_w0_%t%_item_rating_box_s" style="'+cbar_w0_item_rating_box_s+'"><div id="cbar_w0_%t%_item_rating_star_s" style="float:left; margin-right: 2px;">&nbsp;</div><span style="'+cbar_w0_item_rating_count_s+'">%xtr2%</span></div>'+'</div>'+
	        '<div  id="cbar_w0_%t%_item_xtr3_s"  style="display:none; '+cbar_w0_item_xtr3_s+'">:<span id="cbar_w0_%t%_item_xtr3_in_s"  style="'+cbar_w0_item_xtr3_in_s+'">%xtr3%</span></div>'+'</div>';
	
	//widget footer
	cbar_w_template_bottom[0]='</div><div style="float:left;">%nextbutton%</div></div>';
}
//shopping cart widget end

function cbar_check_ref(domain) 
{ 
	// example : xxxxxxxx.com    
	var cbar_temp_ref = '';
	var regex = /([^\?]*)/;
	var result = regex.exec(document.referrer); // Remove parameters
	if ( result!=null && result[1]!=null ) 
		cbar_temp_ref = result[1];
	else
		cbar_temp_ref = document.referrer;
	if (cbar_temp_ref.search(domain) == -1) 
	{
		cbar_ro=true;
		return 1; // Didn't come from the domain
	}
	else return 0; // Came from the domain
}	
	// check cookies support
	cbar_createCookie('cbar_tst', 'y', 0);
	var tst= cbar_readCookie('cbar_tst');
	
	if ((typeof tst=='undefined') || (tst !='y')) { 
		window.console && console.log('cbar cookies disabled'); 
		return;
	}
	
	// check cookiedomain
	if ((typeof cbar_cookiedomain!='undefined') && (document.location.host.search (cbar_cookiedomain.substring(1))==-1)) { 
		window.console && console.log('cbar_cookiedomain not set properly'); 
		return;
	}
	

	// trim pid to 64 bytes
	if (typeof cbar_pid=='string') cbar_pid=cbar_pid.substring(0, 63);
	
	// if unsupported browser
	if  (!cbar_in_array(cbar_BrowserDetect.browser, ['Explorer','Safari','Firefox','Chrome','Mozilla','Opera'])) return; // end script execution
	// Mozilla is for fnac ebook. allow only it
	//if ((cbar_BrowserDetect.browser=='Mozilla') && (cbar_BrowserDetect.version !== 5) && cbar_BrowserDetect.OS!=='Android') return;
	// Mozilla allowed only on android 
	if ((cbar_BrowserDetect.browser=='Mozilla') && cbar_BrowserDetect.OS!=='Android') return;
	// Opera allowed only on android
	if ((cbar_BrowserDetect.browser=='Opera') && cbar_BrowserDetect.OS!=='Android') return;
	
	// Error detection:
	// cookiedomain setting - does cbar_uid appear more than once in cookie
	 var tmp = document.cookie.split(' cbar_uid'); //space required. other cookies may inc cbar_uid
	 if (tmp.length>2) cbar_elog='cookiedomain_problem';
	 
	// check for user cookie
	cbar_uid=cbar_readCookie ('cbar_uid'); 
		
	if (cbar_uid== null) {
		cbar_uid= Math.ceil(1000000000*Math.random());
		cbar_createCookie('cbar_uid',cbar_uid,1000);
	}

	if (!isNaN(cbar_abt)){
		if (cbar_readCookie ('cbar_abt_'+cbar_abt_key) == null ){
			if  (Math.ceil(100*Math.random()) < cbar_abt) 	cbar_abt = 'b'; else cbar_abt='a';
			if (typeof cbar_override_ab =='function') cbar_abt=cbar_override_ab();
			cbar_createCookie('cbar_abt_'+cbar_abt_key,cbar_abt, 1000);
		} else {
			cbar_abt =cbar_readCookie ('cbar_abt_'+cbar_abt_key);
		}
	}
	cbar_abt_str="&abt="+cbar_abt;
	
	if  (typeof cbar_abt_func == 'function') cbar_abt_func (cbar_abt);
	
	
	if (cbar_gup ('cbar_show')=="true")   cbar_createCookie('cbar_show','true',1000);
	if (cbar_gup ('cbar_show')=="false")   cbar_createCookie('cbar_show','false',1000);
	if (cbar_gup ('cbar_new_mode')=="true")   cbar_createCookie('cbar_new_mode','true',1000);
	if (cbar_gup ('cbar_new_mode')=="false")   cbar_createCookie('cbar_new_mode','false',1000);
	if (cbar_gup ('widget_show')=="true")   cbar_createCookie('cbar_widget_show','true',1000);
	if (cbar_gup ('widget_show')=="false")   cbar_createCookie('cbar_widget_show','false',1000);
	if (cbar_gup ('facebook_show')=="true")   cbar_createCookie('cbar_facebook_show','true',1000);
	if (cbar_gup ('facebook_show')=="false")   cbar_createCookie('cbar_facebook_show','false',1000);
	if (cbar_gup ('shortlist_show')=="true")   cbar_createCookie('cbar_sl_show','true',1000);
	if (cbar_gup ('shortlist_show')=="false")   cbar_createCookie('cbar_sl_show','false',1000);
	
	if (cbar_gup ('cbar_preview_rules')=="true")   cbar_createCookie('cbar_preview_rules','1',0);
	if (cbar_gup ('cbar_preview_rules')=="false")   cbar_createCookie('cbar_preview_rules','0',0);
	
	if (cbar_gup ('cbar_data2')=="true")   cbar_createCookie('cbar_data2','1',0);
	if (cbar_gup ('cbar_data2')=="false")   cbar_createCookie('cbar_data2','0',0);
	
	if (cbar_gup ('cbar_publisher')=="true")   cbar_createCookie('cbar_pub','true',1000);
	if (cbar_gup ('cbar_publisher')=="false")   cbar_createCookie('cbar_pub','false',1000);
	
	if (cbar_gup ('cbar_advertiser')=="true")   cbar_createCookie('cbar_adv','true',1000);
	if (cbar_gup ('cbar_advertiser')=="false")   cbar_createCookie('cbar_adv','false',1000);
	
		
	if (cbar_readCookie ('cbar_new_mode') =='true') cbar_new_mode_enabled = true;
	if (cbar_readCookie ('cbar_widget_show') =='true') cbar_widget_show = true;
	if (cbar_readCookie ('cbar_facebook_show') =='true') cbar_fb_show = true;
	if (cbar_readCookie ('cbar_sl_show') =='true') cbar_shortlist_show = true;
	if (cbar_readCookie ('cbar_pub') =='true') cbar_pub = 1;
	if (cbar_readCookie ('cbar_adv') =='true') cbar_adv = true;
		
	if  ((cbar_hidden_mode == true ) && (cbar_readCookie ('cbar_show') =='true'))  cbar_hidden_mode = false; 
	
	if (cbar_gup ('cbar_show_in_cart')=="true")   cbar_createCookie('cbar_show_in_cart','true',1000);
	if (cbar_gup ('cbar_show_in_cart')=="false")   cbar_createCookie('cbar_show_in_cart','false',1000);
	if  ((cbar_show_in_cart == false ) && (cbar_readCookie ('cbar_show_in_cart') =='true'))  cbar_show_in_cart = true; 
		
	if (cbar_gup ('cbar_iconprice'))  cbar_showiconprice=true;
	if (cbar_gup ('cbar_rounded'))  cbar_round_corners=true;
	
	if (cbar_pub_only) return;
			
	// Automatic OOS - if there was a click and its not a product page report OOS page
	if (cbar_auto_oos){ 
		if ((typeof cbar_pid=='undefined') || (cbar_pid.length==0)) { // not a product page
			var data= cbar_readCookie('cbar_rec_clk');
			if  ( (data !=null)  &&  (data.length >10)){ // click data exists
				var datas = data.split(',');
				if (datas.length>5) { // cbar_click3 implemented so we have original pid
					cbar_pid=decodeURIComponent(datas[5].replace (/\+/g, ' '));
					cbar_oos_page=true;
					cbar_createCookie('cbar_rec_clk',  false ,0); // 'delete' cookie (set to false actually)
				}
			}
		}
	}
	

	
	if (cbar_nuid >0) cbar_createCookie('cbar_uid',cbar_nuid,1000); // #669
	
	if  (cbar_home) cbar_pagetype ="H";
	if  (cbar_other) cbar_pagetype ="O";
	if  (cbar_brand) cbar_pagetype ="B";
	if  (cbar_pid) cbar_pagetype ="P";
	if  ((cbar_cid || cbar_pid2cid)  && !cbar_pid) cbar_pagetype ="C";
	if  (cbar_is_pur) cbar_pagetype ="Sc";
	if  (cbar_pur_com) cbar_pagetype ="Pu";
	if (cbar_search!='') cbar_pagetype="S";
	if (cbar_oos_page) cbar_pagetype="OOS";
	
	// update the server on product, home, cat or cart page
	if  (cbar_cid || cbar_pid2cid || cbar_pid || cbar_home || cbar_brand || cbar_is_pur || cbar_search || cbar_pagetype=='U' || cbar_pagetype=='O' || cbar_pagetype=='OOS')   { 
						  if (cbar_widget_show == true ) cbar_w_init(); 				
		 var cbar_str='';
 
		 
		if (cbar_encode) cbar_str += '&enc='+cbar_encode;
		if (cbar_lang) cbar_str += '&lng='+cbar_lang;
		if (cbar_shf) cbar_str += '&shf=true';
		
		if (cbar_c_from_p) cbar_str+='&cfp=1';
				
		if (cbar_adv) cbar_str+='&adv=1';
		
		if (cbar_dups_ok) cbar_str+='&dups=1';
		
		if (cbar_block_bt) cbar_str+='&blockbt=1';
						
		if  (cbar_is_pur) {
			if (cbar_pur_pid_add) cbar_str += '&pid_add='+encodeURIComponent(cbar_pur_pid_add);
			if (cbar_pur_qty_add) cbar_str += '&qty_add='+encodeURIComponent(cbar_pur_qty_add);
			
			if (!cbar_show_in_cart) cbar_hidden_mode = true;
			if  ((cbar_pid != undefined) &&(cbar_pid.length >0)){
				cbar_pur_pids.push (cbar_pid);
				cbar_pur_qtys.push (cbar_qty);
			}
			
			if (cbar_pur_com==true) cbar_str +='&pur_com=true';
			if  (cbar_pur_pids.length >0) 
				for (var i=0; i < cbar_pur_pids.length; i++){
					cbar_str +='&pid'+i+'='+encodeURIComponent(cbar_pur_pids[i]);
					cbar_str +="&qty"+i+"="+((typeof cbar_pur_qtys[i] == "undefined")?1:cbar_pur_qtys[i]);
				}
			
			cbar_str += '&pur=1'+'&pur_mode='+cbar_pur_mode+'&pur_add='+cbar_pur_add;
		}
		
		var cbar_lvt=cbar_readCookie ('cbar_lvt');
		cbar_str +='&lvt='+cbar_lvt;
		var usertime=Math.round(cbar_date.getTime()/1000)
		cbar_createCookie('cbar_lvt', usertime,1000);
		cbar_str+='&ut='+usertime;
		
		// #20131107
		var session_reset=false;
		if (cbar_lvt !=null && (usertime - parseInt(cbar_lvt)) > 3600) session_reset=true;
			
			
		cbar_sess=cbar_readCookie ('cbar_sess');
		if ( (cbar_sess==null ) ||  (null==cbar_readCookie ('cbar_sess_pv')) ||  session_reset ){
			if (cbar_sess==null) cbar_sess=0;
			cbar_sess=parseInt(cbar_sess)+1;
			cbar_createCookie('cbar_sess', cbar_sess,1000); 		
		}

		cbar_str +='&ses='+cbar_sess;
				
		cbar_str +='&exp='+cbar_readCookie ('cbar_exp'); //# 555
		
		cbar_sess_pv = parseInt(cbar_readCookie ('cbar_sess_pv'));
		if (isNaN(cbar_sess_pv) || session_reset) cbar_sess_pv=1;
		cbar_createCookie('cbar_sess_pv', cbar_sess_pv+1,0); 
		cbar_str +='&spv='+cbar_sess_pv;
		
		if (cbar_cattree) 
			for ( var c=0; c< cbar_cat_cids.length; c++ ) cbar_str +='&cid'+c+'='+encodeURIComponent(cbar_cat_cids[c]);
		if (cbar_cat_level !==0) cbar_str += '&cl='+cbar_cat_level;
		
		if (cbar_cids_cur!='') cbar_str +="&cids_cur="+encodeURIComponent(cbar_cids_cur);
		if (cbar_cids_p!='') cbar_str +="&cids_p="+encodeURIComponent(cbar_cids_p);
		for ( var c=0; c< cbar_cats_l.length; c++ ) cbar_str +='&cids_l'+c+'='+encodeURIComponent(cbar_cats_l[c]);
		for ( var c=0; c< cbar_cats_c.length; c++ ) cbar_str +='&cids_c'+c+'='+encodeURIComponent(cbar_cats_c[c]);
		
//		if (cbar_oos) cbar_str +="&oos="+cbar_oos;  
		if (cbar_ne!=null) cbar_str +="&ne="+cbar_ne;
		if (cbar_sa!=null) cbar_str +="&sa="+cbar_sa;
		if (cbar_bs!=null) cbar_str +="&bs="+cbar_bs;
		if (cbar_pd!=null) cbar_str +="&pd="+cbar_pd;
		if (cbar_fl1!=null) cbar_str +="&fl1="+cbar_fl1;
		if (cbar_fl2!=null) cbar_str +="&fl2="+cbar_fl2;
		
		if (cbar_nuid && (cbar_nuid>0))  cbar_str +="&nuid="+cbar_nuid;
		
		if (cbar_e_clk==true)  cbar_str +="&eclk=y";
		if (cbar_fb_clk==true)  cbar_str +="&fbclk=y";
		
		if (cbar_ba)  cbar_str +="&ba=1";
		if (cbar_md)  cbar_str +="&md=1";
		if (cbar_ro)  cbar_str +="&ro=1";
		if (cbar_wl)  cbar_str +="&wl=1";
		if (cbar_urls_update)  cbar_str +="&urlu=1";
		if (cbar_force_li)  cbar_str +="&fli=1";
		if (cbar_uro)  cbar_str +="&uro=1";
		if (cbar_add_data)  cbar_str +="&add=1"; 
		if (cbar_cm2_update) cbar_str+="&cm2_u=1";
		
		if (cbar_ctr1>0)  cbar_str +="&ctr1="+cbar_ctr1;
		if (cbar_ctr2>0)  cbar_str +="&ctr2="+cbar_ctr2;
		if (cbar_ctr3>0)  cbar_str +="&ctr3="+cbar_ctr3;
		if (cbar_liX!=1)  cbar_str +="&liX="+cbar_liX;
		if (cbar_liP!=1)  cbar_str +="&liP="+cbar_liP;
		if (cbar_liL!=1)  cbar_str +="&liL="+cbar_liL;
	
		if (cbar_flow!='') cbar_str +="&flow="+cbar_flow;
		
		if (cbar_search!='') cbar_str += '&se='+encodeURIComponent(cbar_search);
		if (cbar_cname!='') cbar_str += '&cname='+encodeURIComponent(cbar_cname);
		
		if (cbar_readCookie ('cbar_preview_rules') == '1' ) {cbar_str+='&prev_ru=1';
				var prev_msg_div = window.document.createElement('div');
				prev_msg_div.id= 'prev_msg_div';
				prev_msg_div.style.position='fixed';
				var clientheight =  document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight: document.body.clientHeight;
				prev_msg_div.style.top= (clientheight -100)+"px";
				prev_msg_div.style.left='40%';
				prev_msg_div.style.display='block';
				prev_msg_div.style.zIndex='30000';
				
							
				prev_msg_div.innerHTML =' <div style="font-size:15px; padding:10px; border:1px solid gray; font-weight:bold; color:red;background:white; text-align:center;">Barilliance RULES PREVIEW MODE<br /><span style="font-size:10px;">Close the browser to exit this mode</span></div>';
						
				window.document.body.appendChild(prev_msg_div);	
		}
		
		if (cbar_readCookie ('cbar_data2') == '1' ) cbar_datajs = 'data2.js.php';
		
		cbar_rules_str= cbar_readCookie('cbar_rules');
		if (cbar_rules_str != null) cbar_str+="&rul="+cbar_rules_str;
		else cbar_rules_str='';
		
		cbar_cou_str= cbar_readCookie('cbar_co');
		if (cbar_cou_str != null) cbar_str+="&cou="+cbar_cou_str;
		
		if (cbar_cou_input !='') cbar_str+='&cou_inj=true';
				
		cbar_str+='&ref='+encodeURIComponent(document.referrer);
		
		cbar_str+="&br="+cbar_BrowserDetect.browser+"&v="+cbar_BrowserDetect.version+"&os="+cbar_BrowserDetect.OS;
		if  (typeof  screen.width !='undefined')
			cbar_str+="&scw="+screen.width+"&sch="+screen.height;
		
		if (cbar_ipuid_get) cbar_str+="&ipuidget=true";
		if (cbar_ipuid_save) cbar_str+="&ipuidsave=true";
		
		cbar_str+="&th="+cbar_date.getHours();
		cbar_str+="&tdw="+cbar_date.getDay();
		cbar_str+="&tdm="+cbar_date.getDate();
		
		if (cbar_ui_t!=''){
			cbar_str+="&uit="+encodeURIComponent(cbar_ui_t);
			cbar_str+="&uin="+encodeURIComponent(cbar_ui_n);
			cbar_str+="&uis="+encodeURIComponent(cbar_ui_s);
		}
		
		for (var cbar_param in cbar2url){
			if (window[cbar_param]!='') cbar_str+="&"+cbar2url[cbar_param]+"="+encodeURIComponent(window[cbar_param]);
		}
		
		if (cbar_lnk!=3)	cbar_str+="&lnk="+cbar_lnk;
		if (cbar_num_widgets!=2)	cbar_str+="&nw="+cbar_num_widgets;
				
		var cbar_ui_n='';
		
		if (cbar_fb_fanpage)	cbar_str+="&fbf=1";
		
		
		if (typeof  cbar_js_loaded  =='function') cbar_js_loaded();

		// check for custom trust message in cart page
		if (cbar_pagetype=="Sc"){
			// is there a custom message for any of the cart products
			
			if  (cbar_pur_pids.length >0) {
				for (var i=0; i < cbar_pur_pids.length; i++){
					var msg=cbar_readCookie ('cbar_trust_cartmsg_'+cbar_pur_pids[i])
					if (msg !=null) {
						cbar_str+="&trustcmsg="+encodeURIComponent(msg);
						break;
					}
				}
			}
			
		
		
		}
		
	
		if (!cbar_demo_mode)	
			loadjscssfile (cbar_dynamic_url+cbar_datajs+'?a=pv&sid='+cbar_sid+'&uid='+cbar_uid+'&pid='+encodeURIComponent(cbar_pid)+cbar_str+'&url='+cbar_url_en+"&cm="+cbar_catmode+"&pcm="+cbar_pcm+cbar_abt_str+"&pt="+cbar_pagetype+"&pidu="+cbar_pid_unique+"&"+cbar_any2url('attu',cbar_user_attributes)+"&"+cbar_any2url('attp',cbar_product_attributes)+"&"+cbar_any2url('attud',cbar_del_user_attributes)+"&"+cbar_any2url('attpd',cbar_del_product_attributes)+"&"+cbar_any2url('uinf',cbar_userinfo)+"&ts="+Math.ceil(10000*Math.random()),'js');
		else  cbar_data_returned(); 
		
		// 2nd click report - after the page change
		cbar_report_click(false); 
		
		if (typeof cbar_e_input[0] !=='undefined'){
			for (ww=0; ww< cbar_e_input.length; ww++){
				cbar_em_listen (cbar_e_input[ww]);
			}
		}
		
		
		if (typeof cbar_e_checkbox[0] !=='undefined') {	
			if (cbar_e_checkbox[0].checked) cbar_em_com( true); else cbar_em_com(false); // default value
			cbar_listen('click', cbar_e_checkbox[0] , cbar_e_checkbox_change ) ; // track changes
		}
		
		// init shortlist code (after scraping so we have page type and all)
		if (cbar_shortlist_show && (typeof  cbar_shortlist =='function')) cbar_shortlist();

		
		// LP integration
		if(cbar_LP) cbar_LP_set();
		cbar_init_ajax_cart();
			
	}	
}



if (typeof cbar_scraper_start =='function') cbar_scraper_start();

