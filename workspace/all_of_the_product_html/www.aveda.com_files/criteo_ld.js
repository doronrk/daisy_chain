try{var CRITEO=function(){var q,u;var p={home:{eventType:"sendEvent",params:"v=2&pt1=0&pt2=1"},product:{eventType:"sendEvent",params:"v=2&pt1=2"},list:{eventType:"sendEvent",params:"v=2&pt1=3"},basket:{eventType:"transaction",params:"v=2&s=0"},confirmation:{eventType:"transaction",params:"v=2&s=1"},search:{eventType:"sendEvent",params:"v=2&pt1=4"}};function k(){return q[0]}function v(){return q[1]}function j(){return(typeof(q[2])!="undefined"&&q[2]!="")?"."+q[2]:""}function b(){var y=q[3].charAt(0);return typeof(y)!="undefined"&&y==1}function g(){var y=q[3].charAt(1);return typeof(y)!="undefined"&&y==1}function t(){var y=q[3].charAt(2);return typeof(y)!="undefined"&&y==1}function h(){return q[4]}function w(){return q[5]}function f(){return(document.location.protocol=="https:"&&"https:"||"http:")+"//dis"+j()+".criteo.com/dis/dis.aspx"}function x(y){return(document.location.protocol=="https:"?"https://sslwidget.":"http://widget.")+"criteo.com/"+v()+"/display.js?resptype="+y+"&"+d()}function r(z,y){switch(z){case"sendEvent":return y[0];case"transaction":return y[1];default:break}}function d(){var C="";var B=u&&u.length||0;var z=h();var D=1;for(var A=0;A<B;A++){for(var E=0;E<z.length;E++){if(D>1){C+="&"}C+=s(u[A],D,z[E]);D++}}return C}function s(L,I,H){var F=p[L.pageType];if(!F){return}var E=w();var D="";var A="";for(name in E){if(!L.hasOwnProperty(name)){continue}var C=E[name][0];var z=E[name][1];var K=E[name][2];var B="";if(typeof(L[name])=="function"){B=L[name]()}else{B=L[name]}if(!B){continue}switch(z){case 0:A+="&"+C+"="+B;break;case 1:var y;if(typeof B==="string"){y=B.split(L.delimiter)}else{if(Object.prototype.toString.apply(B)==="[object Array]"){y=B}}var J=y.length;if(typeof K!="undefined"&&J>K){J=K}for(var G=1;G<=J;G++){A+="&"+C+G+"="+y[G-1]}break;case 2:D+="&"+C+"="+encodeURIComponent(B);break;default:break}}return"t"+I+"="+F.eventType+"&p"+I+"="+encodeURIComponent(F.params+"&wi="+r(F.eventType,H)+A)+D}function c(){var z=f()+"?p="+k()+"&cb="+Math.floor(Math.random()*99999999999);try{z+="&ref="+encodeURIComponent(document.referrer)}catch(y){}try{z+="&sc_r="+encodeURIComponent(screen.width+"x"+screen.height)}catch(y){}try{z+="&sc_d="+encodeURIComponent(screen.colorDepth)}catch(y){}return z.substring(0,2000)}function a(){var z=f()+"?p="+k();z+="&"+d();z+="&cb="+Math.floor(Math.random()*99999999999);try{z+="&ref="+encodeURIComponent(document.referrer)}catch(y){}try{z+="&sc_r="+encodeURIComponent(screen.width+"x"+screen.height)}catch(y){}try{z+="&sc_d="+encodeURIComponent(screen.colorDepth)}catch(y){}return z.substring(0,2000)}function l(y){var z=window.onload;window.onload=function(){if(z&&typeof(z.fired)=="undefined"){z.fired=true;z()}y()}}function e(){var A=[];if(b()){if(document.createElement){var y=document.createElement("iframe");if(y){y.width="1px";y.height="1px";y.style.display="none";y.src=a()}A.push(y)}}else{var z=document.createElement("img");if(z){z.width="1px";z.height="1px";z.style.display="none";z.src=x("gif")}var B=document.createElement("iframe");if(B){B.width="1px";B.height="1px";B.style.display="none";B.src=c();z.onload=function(){n(B)}}A.push(z)}return A}function i(z){for(var y=0;y<z.length;y++){n(z[y])}}function n(y){var z;if(!t()){z=document.getElementsByTagName("body");if(!z||z.length==0){return}z=z[0]}else{z=document.getElementById("cto_mg_div")}if(z!=null&&z.appendChild){z.appendChild(y)}}function m(){if(t()){document.write("<div id='cto_mg_div' style='display:none;'></div>")}}function o(y){if(g()){l(function(){i(y)})}else{i(y)}}return{Load:function(z,y){q=y;u=z;m();var A=e();o(A)}}}()}catch(err){};