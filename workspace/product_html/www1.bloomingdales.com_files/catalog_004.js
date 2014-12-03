MACYS.namespace("MACYS.util");MACYS.namespace("MACYS.util.Cookie");MACYS.util.Cookie=(function(){var c={mvcSeparator:"3_87_",mvcEquator:"1_92_",mvcEmptyString:"4_02_"},b="string",a=(BLOOMIES.useNewDesign);if(typeof YUI_Version==="undefined"){YUI_Version=null}function d(p,f){var q={},g,n,o=null,h=null,k=null,j,l;if(typeof p===b&&p.length>0){g=(f===false?function(i){return i}:decodeURIComponent);n=p.split(/;\s/g);for(j=0,l=n.length;j<l;j++){k=n[j].match(/([^=]+)=/i);if(k instanceof Array){try{o=decodeURIComponent(k[1]);h=g(n[j].substring(k[1].length+1))}catch(m){}}else{o=decodeURIComponent(n[j]);h=""}q[o]=h}}return q}function e(g,i,h,f){var j=encodeURIComponent(g)+"="+(h?encodeURIComponent(i):i);if(typeof f==="object"&&f!==null){if(f.expires instanceof Date){j+="; expires="+f.expires.toUTCString()}if(typeof f.path===b&&f.path!==""){j+="; path="+f.path}if(typeof f.domain===b&&f.domain!==""){j+="; domain="+f.domain}if(f.secure===true){j+="; secure"}}return j}if(a){c.cookieUtility={get:function(h,g){if(typeof h!==b||h===""){throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.")}var i,f="function",j;if(typeof g===f){i=g;g={}}else{if(typeof g==="object"&&g!==null){i=g.converter}else{g={}}}j=d(document.cookie,!g.raw);if(j[h]===undefined){return null}if(typeof i!==f){return j[h]}else{return i(j[h])}},set:function(g,h,f){if(typeof g!==b||g===""){throw new TypeError("Cookie.set(): Cookie name must be a string.")}if(h===undefined){throw new TypeError("Cookie.set(): Value cannot be undefined.")}f=f||{};var i=e(g,h,!f.raw,f);document.cookie=i;return i}}}else{if(YUI_Version>"3"){c.cookieUtility=BLOOMIES.Y.Cookie}else{c.cookieUtility=YAHOO.util.Cookie}}c.get=function(l,h){if(h==undefined){return this.cookieUtility.get(l)}else{var i=this.cookieUtility.get(h);if(i==null||i.indexOf(l)==-1){return undefined}var k=i.split(this.mvcSeparator);for(var g=0;g<k.length;g++){var f=k[g].split(this.mvcEquator);if(f[0]==l){return f[1]==this.mvcEmptyString?"":f[1]}}}return undefined};c.set=function(n,o,k,f){try{if(!this.domain){this.domain=document.getElementById("blmCookieDomain").value}}catch(i){this.domain=""}if(k){var m=this.cookieUtility.get(k);var r=n+this.mvcEquator+((o==="")?this.mvcEmptyString:o);if(m==null){o=r}else{if(m.indexOf(n)==-1){o=m+this.mvcSeparator+r}else{var q=m.split(this.mvcSeparator);var p="";var g=false;for(var h=0;h<q.length;h++){if(q[h].split(this.mvcEquator)[0]==n){g=true;if(p!=""){p+=this.mvcSeparator}p+=r}else{if(p!=""){p+=this.mvcSeparator}p+=q[h]}}o=p+(!g?this.mvcSeparator+r:"")}}n=k}var l={path:"/"};if(this.domain){l.domain=this.domain}else{l.domain=document.location.hostname.replace(/^[^.]*/,"")}if(f){l.expires=f}this.cookieUtility.set(n,o,l)};c.remove=function(m,i){if(i){var k=this.cookieUtility.get(i);if(k.indexOf(m)!=-1){var l=k.split(this.mvcSeparator);var h="";for(var g=0;g<l.length;g++){if((l[g].split(this.mvcEquator))[0]==m){if(h!=""){h+=this.mvcSeparator}h+=l[g]}}MACYS.util.Cookie.set(i,h)}}else{var f={path:"/"};if(this.domain){f.domain=this.domain}this.cookieUtility.remove(m,f)}};return c})();
