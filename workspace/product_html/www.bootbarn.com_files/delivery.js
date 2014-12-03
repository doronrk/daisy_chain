(function(){var c="bronto-popup-id";var b=function(j,m){var f=this;var o="";var h={};var k={};var n={};var i=function(q){if(q.match(/^www\./)){q=q.replace(/^www\./,"");}var p=new RegExp(".*"+q.replace(/\./g,"\\.")+"$");return p.test(document.domain);};var g=function(q){if(!i(q.popup.domain)){return false;}var s=/\*$/;for(var p=0;p<q.popup.excludes.length;p++){if(s.test(q.popup.excludes[p])){var r=new RegExp(q.popup.excludes[p].replace("*",".+"));if(r.test(window.location.pathname)){return false;}}else{if(q.popup.excludes[p]==window.location.pathname){return false;}}}if(!matchMedia("(min-width: "+q.popup.excludeDeviceWidth+"px)").matches){return false;}return true;};var l=function(t){var p=[];var s={};for(var q=0;q<t.length;q++){var r=t[q];if(!s[r.name]){s[r.name]={};p.push(r);}}return p;};this.loadPopupResources=function(){var p=function(u){var t=0;k=u.detail||k;var r=Math.floor(Math.random()*k.versions.length);o=k.versions[r].versionId;k.popup={formId:k.formId,domain:k.domain,excludes:k.versions[r].excludes,resources:k.versions[r].resources,excludeDeviceWidth:k.versions[r].excludeDeviceWidth};
k.popup.resources.push({name:"popup.js",type:"javascript"});if(g(k)){var q=l(k.popup.resources||[]);for(var s=0;s<q.length;s++){(function(v){new e(j,f.getPopupGuid()+"/"+o).gather(v.name,v.type,function(x){t++;if(x instanceof Error){n[v.name]=x;}else{v.data=x;h[v.name]=v;}if(t==q.length){var w=new CustomEvent("bronto:popup-delivered",{detail:f});document.dispatchEvent(w);}});})(q[s]);}}document.removeEventListener("bronto:popup-config",p,false);};document.addEventListener("bronto:popup-config",p,false);new e(j,f.getPopupGuid()).gather("config.js","javascript",function(q){document.removeEventListener("bronto:popup-config",p);});};this.getHost=function(){return j;};this.getPopupGuid=function(){return m;};this.getGuid=function(){return o;};this.getFormId=function(){return k.popup.formId;};this.getResources=function(){return h;};this.getResource=function(p){return h[p]?h[p]:{};};this.getConfig=function(){return k.popup;};this.getErrors=function(){return n;};this.hasErrors=function(){for(var p in n){return true;
}return false;};};var e=function(g,f){this.gather=function(j,l,n){var i=g+"/"+(f?f+"/":"")+j;switch(l){case"javascript":var h=false;var k=document.createElement("script");k.setAttribute("type","text/javascript");k.onload=k.onreadystatechange=function(){if(!h&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){h=true;k.onload=k.onreadystatechange=null;if(n){n(k);document.documentElement.removeChild(k);}}};k.onerror=function(){if(n){n(new Error("Failed to load js: "+i));}k.onerror=null;};k.setAttribute("src",i);document.documentElement.appendChild(k);break;case"image":var m=new Image();m.onload=function(){if(n){n(m);}m.onload=null;};m.onerror=function(){if(n){n(new Error("Failed to load image: "+i));}m.onerror=null;};m.src=i;break;default:n(new Error("Resource with name "+j+" is not valid."));}};};var a=function(g){var i=g.src.split("/").slice(0,-1).join("/");var h=function(n){var l=0;var j=["polyfills.js"];for(var m=0,k;k=j[m];m++){(function(o){new e(i).gather(o,"javascript",function(){l++;
if(l==j.length){n();}});})(k);}};var f=function(){var j=g.getAttribute(c);if(j){new b(i,j).loadPopupResources();}};h(function(){document.dispatchEvent(new CustomEvent("bronto:polyfills"));document.addEventListener("bronto:load-popup",f,false);f();});};var d=function(g,f,h){if(g.addEventListener){g.addEventListener(f,h,false);}else{if(g.attachEvent){g.attachEvent("on"+f,h);}}};d(window,"load",function(){if(document.all&&(document.documentMode===undefined)){return;}var f=document.getElementsByTagName("script");var h=c.replace(/\-/g,"");for(var j=0,g;g=f[j];j++){if(g.hasAttribute(c)||g.hasAttribute(h)){return new a(g);}}});})();