!function(a,b){function c(a,b,c,d){if(!a)throw new Error("Application name required");if(!b)throw new Error("Experiment id required");if(!c)throw new Error("Experiment name required");null==d&&(d={}),this.application=a,this.id=b,this.name=c,this.options=d,this.variants=[]}function d(a,b,d){null==b&&(b={}),b.i=(new Date).getTime();var e=[];for(var f in b)e.push(f+"="+encodeURIComponent(b[f]));var g=new Image;d&&(g.onload=d),g.src="//"+c.endpoint+a+"?"+e.join("&")}function e(){for(var a=arguments[0],b=arguments.length>=2?[].slice.call(arguments,1):[],c=0,d=b.length;d>c;c++){var e=b[c];for(var f in e)null!=e[f]&&(a[f]=e[f])}return a}b["true"]=a,c.endpoint="ab.fit-predictor.net",c.cookieDefaults={path:"/",expires:3650},c.prototype.variant=function(a,b,c){if("string"!=typeof a)throw new Error("Variant name required");return"function"==typeof b&&(c=b,b={}),b.name=a,b.callback=c,null==b.weight&&(b.weight=1),this.variants.push(b),this},c.prototype.control=function(a,b,c){return null==a&&(a="Control"),"function"==typeof b&&(c=b,b={}),b.control=!0,this.variant(a,b,c)},c.prototype.resume=function(){var a=this.getPreviousVariant();return a&&this.useVariant(a),this},c.prototype.start=function(a,b){null==b&&(b={});var c,d=this.getPreviousVariant();if(d&&(d.name===a||null==a))return this.useVariant(d),this;if(null!=a)c=this.getVariantForName(a),c||(c={name:a,control:b.control});else{var e,f=0,g=this.variants.length;for(e=0;g>e;e++)f+=this.variants[e].weight;var h=Math.random()*f,i=0;for(e=0;g>e&&(c=this.variants[e],i+=c.weight,!(i>=h));e++);}if(!c)throw new Error("No variants added");return this.recordStart(c),this.useVariant(c),this},c.prototype.complete=function(a){return a||(a=this.getVariantCookie()),a?this.hasPersistCompleteCookie()?this:(this.options.persist===!1?this.reset():this.setPersistCompleteCookie(),this.recordComplete(a),this):this},c.prototype.reset=function(){return this.removeVariantCookie(),this.removePersistCompleteCookie(),this.result=null,this},c.prototype.getVariantForName=function(a){for(var b=0,c=this.variants.length;c>b;b++){var d=this.variants[b];if(d.name===a)return d}},c.prototype.useVariant=function(a){null!=a&&"function"==typeof a.callback&&a.callback(),this.chosen=a},c.prototype.recordStart=function(a){d("/start",{application:this.application,experiment:this.id,variant:a.name,control:a.control||!1}),this.setVariantCookie(a.name)},c.prototype.recordComplete=function(a){d("/complete",{application:this.application,experiment:this.id,variant:a})},c.prototype.getPreviousVariant=function(){var a=this.getVariantCookie();return a?this.getVariantForName(a):void 0},c.prototype.getVariantCookie=function(){return this.getCookie("SSP_AB_"+this.id)},c.prototype.setVariantCookie=function(a){this.setCookie("SSP_AB_"+this.id,a,{expires:this.options.expires})},c.prototype.removeVariantCookie=function(){this.setCookie("SSP_AB_"+this.id,"",{expires:!0})},c.prototype.setPersistCompleteCookie=function(){this.setCookie("SSP_AB_COMPLETE_"+this.id,"1",{expires:this.options.expires})},c.prototype.hasPersistCompleteCookie=function(){return!!this.getCookie("SSP_AB_COMPLETE_"+this.id)},c.prototype.removePersistCompleteCookie=function(){this.setCookie("SSP_AB_COMPLETE_"+this.id,"",{expires:!0})},c.prototype.setCookie=function(a,b,d){if(d=e({},c.cookieDefaults,d||{}),d.expires===!0&&(d.expires=-1),"number"==typeof d.expires){var f=new Date;f.setTime(f.getTime()+1e3*60*60*24*d.expires),d.expires=f}b=b.toString().replace(/[^!#-+\--:<-\[\]-~]/g,encodeURIComponent);var g=encodeURIComponent(a)+"="+b;d.expires&&(g+=";expires="+d.expires.toGMTString()),d.path&&(g+=";path="+d.path),d.domain&&(g+=";domain="+d.domain),document.cookie=g},c.prototype.getCookie=function(a){for(var b=document.cookie.split("; "),c=0,d=b.length;d>c;c++){var e=b[c],f=e.indexOf("="),g=decodeURIComponent(e.substr(0,f)),h=decodeURIComponent(e.substr(f+1));if(g===a)return h}return null};var f={},g={"Fit Predictor":{id:"FP_20131104",variants:{Control:{css:"fp-disabled",control:!0,data:{ab_fp:"Control",v_fpe:!1},weight:1},Test:{css:"fp-enabled",data:{ab_fp:"Test",v_fpe:!0},weight:1},Enabled:{css:"fp-enabled",data:{ab_fp:"Enabled"},weight:98}}}},h="Destination XL",i=b.FitPredictor={};i.roots=function(){var a=[],b=document.getElementById("fp-root");b&&a.push(b);for(var c=document.getElementsByTagName("*"),d=/(^| )fp-root( |$)/,e=0,f=c.length;f>e;e++)if(d.test(c[e].className)&&(a.push(c[e]),localStorage&&localStorage.fp_debug&&console&&"function"==typeof console.log)){var g=c[e].getAttribute("data-product-id"),h=c[e].getAttribute("data-customer-id"),i="[FitPredictor] Detected root element (Product ID: ";i+=g?g:"-",h&&(i+=", Customer ID: "+h),i+=")",console.log(i)}return a}();var j="e6deaa2";i.ab={experiments:{},variants:{},data:{},complete:function(a){var b=this.experiments[a];if(!b)throw new Error("There's no experiment with the name "+a);b.complete()},completeAll:function(){for(var a in this.experiments)this.complete(a)}};for(var k in g)!function(a,b){var d=new c(h,b.id,a,f);for(var e in b.variants)!function(b,c){d.variant(b,c,function(){if(i.ab.variants[a]=this.name,this.data)for(var b in this.data)i.ab.data[b]=this.data[b];if(this.css)for(var c=0,d=i.roots.length;d>c;c++){var e=i.roots[c];e.className+=" "+this.css}this.revision&&(j=this.revision)})}(e,b.variants[e]);i.ab.experiments[a]=d;var g=i.roots.length>0,k=/fpp=[0-9]*/.test(location.href);if("Fit Predictor"===a)if(k)g?d.start("Enabled"):d.resume();else{var l=g&&i.roots[0].getAttribute("data-ab-enabled");l?d.start("true"===l?"Test":"Control"):g?d.start():d.resume()}else("Test"===i.ab.variants["Fit Predictor"]||"Enabled"===i.ab.variants["Fit Predictor"])&&(k?g?d.start("Enabled"):d.resume():g?d.start():d.resume())}(k,g[k]);try{var l="//dnmpbe216ptzf.cloudfront.net"+(j?"/"+j:"")+"/"+"casual-male",m=document.getElementsByTagName("head")[0],n=document.createElement("link"),o=document.createElement("script");n.href=l+"/fitpredictor.css",n.rel="stylesheet",n.media="screen",n.type="text/css",m.appendChild(n),o.async=!0,o.src=l+".js",o.type="text/javascript",m.appendChild(o)}catch(p){}}({},function(){return this}());