var Mustache;(function(p){"undefined"!==typeof module&&module.exports?module.exports=p:"function"===typeof define?define(p):Mustache=p})(function(){function p(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(a){this.tail=this.string=a;this.pos=0}function l(a,b){this.view=a;this.parent=b;this.clearCache()}function h(){this.clearCache()}function w(a){for(var b=a[3],c=b,d;(d=a[4])&&d.length;)a=d[d.length-1],c=a[3];return[b,c]}function s(a){function b(a,b,g){if(!c[a]){var e=s(b);c[a]=function(a,b){return e(a,b,g)}}return c[a]}var c={};return function(c,f,g){for(var e="",k,j,i=0,h=a.length;i<h;++i)switch(k=a[i],k[0]){case"#":j=g.slice.apply(g,w(k));e+=c._section(k[1],f,j,b(i,k[4],g));break;case"^":e+=c._inverted(k[1],f,b(i,k[4],g));break;case">":e+=c._partial(k[1],f);break;case"&":e+=c._name(k[1],f);break;case"name":e+=c._escaped(k[1],f);break;case"text":e+=k[1]}return e}}function t(a){if(2!==a.length)throw Error("Invalid tags: "+a.join(" "));return[RegExp(p(a[0])+"\\s*"),RegExp("\\s*"+ p(a[1]))]}var j={name:"mustache.js",version:"0.7.0",tags:["{{","}}"]};j.Scanner=r;j.Context=l;j.Writer=h;var x=/\s*/,y=/\s+/,z=/\S/,u=/\s*=/,A=/\s*\}/,B=/#|\^|\/|>|\{|&|=|!/,v=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};j.escape=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return C[a]})};r.prototype.eos=function(){return""===this.tail};r.prototype.scan=function(a){return(a=this.tail.match(a))&&0===a.index?(this.tail=this.tail.substring(a[0].length),this.pos+=a[0].length,a[0]):""};r.prototype.scanUntil=function(a){var b=this.tail.search(a);switch(b){case-1:a=this.tail;this.pos+=this.tail.length;this.tail="";break;case 0:a="";break;default:a=this.tail.substring(0,b),this.tail=this.tail.substring(b),this.pos+=b}return a};l.make=function(a){return a instanceof l?a:new l(a)};l.prototype.clearCache=function(){this._cache={}};l.prototype.push=function(a){return new l(a,this)};l.prototype.lookup=function(a){var b=this._cache[a];if(!b){if("."===a)b=this.view;else for(var c=this;c;){if(0<a.indexOf("."))for(var d=a.split("."),f=0,b=c.view;b&&f<d.length;)b=b[d[f++]];else b=c.view[a];if(null!=b)break;c=c.parent}this._cache[a]=b}"function"===typeof b&&(b=b.call(this.view));return b};h.prototype.clearCache=function(){this._cache={};this._partialCache={}};h.prototype.compile=function(a,b){var c=this._cache[a];c||(c=j.parse(a,b),c=this._cache[a]=this.compileTokens(c,a));return c};h.prototype.compilePartial=function(a,b,c){b=this.compile(b,c);return this._partialCache[a]=b};h.prototype.compileTokens=function(a,b){var c=s(a),d=this;return function(a,g){if(g)if("function"===typeof g)d._loadPartial=g;else for(var e in g)d.compilePartial(e,g[e]);return c(d,l.make(a),b)}};h.prototype.render=function(a,b,c){return this.compile(a)(b,c)};h.prototype._section=function(a,b,c,d){a=b.lookup(a);switch(typeof a){case"object":if(v(a)){for(var c="",f=0,g=a.length;f<g;++f)c+=d(this,b.push(a[f]));return c}return a?d(this,b.push(a)):"";case"function":var e=this,d=a.call(b.view,c,function(a){return e.render(a,b)});return null!=d?d:"";default:if(a)return d(this,b)}return""};h.prototype._inverted=function(a,b,c){a=b.lookup(a);return!a||v(a)&&0===a.length?c(this,b):""};h.prototype._partial=function(a,b){!(a in this._partialCache)&&this._loadPartial&&this.compilePartial(a,this._loadPartial(a));var c=this._partialCache[a];return c?c(b):""};h.prototype._name=function(a,b){var c=b.lookup(a);"function"===typeof c&&(c=c.call(b.view));return null==c?"":String(c)};h.prototype._escaped=function(a,b){return j.escape(this._name(a,b))};j.parse=function(a,b){for(var b=b||j.tags,c=t(b),d=new r(a),f=[],g=[],e=!1,k=!1,h,i,m;!d.eos();){h=d.pos;if(m=d.scanUntil(c[0]))for(var l=0,q=m.length;l<q;++l)if(i=m.charAt(l),RegExp.prototype.test.call(z,i)?k=!0:g.push(f.length),f.push(["text",i,h,h+1]),h+=1,"\n"===i){if(e&&!k)for(;g.length;)f.splice(g.pop(),1);else g=[];k=e=!1}h=d.pos;if(!d.scan(c[0]))break;e=!0;i=d.scan(B)||"name";d.scan(x);"="===i?(m=d.scanUntil(u),d.scan(u),d.scanUntil(c[1])):"{"===i?(m=RegExp("\\s*"+p("}"+b[1])),m=d.scanUntil(m),d.scan(A),d.scanUntil(c[1]),i="&"):m=d.scanUntil(c[1]);if(!d.scan(c[1]))throw Error("Unclosed tag at "+d.pos);f.push([i,m,h,d.pos]);if("name"===i||"{"===i||"&"===i)k=!0;"="===i&&(b=m.split(y),c=t(b))}for(var c=f,n,f=[],g=0;g<c.length;++g)d=c[g],n&&"text"===n[0]&&"text"===d[0]?(n[1]+=d[1],n[3]=d[3]):(n=d,f.push(d));n=f;e=c=[];d=[];for(g=0;g<n.length;++g)switch(f=n[g],f[0]){case"#":case"^":f[4]=[];d.push(f);e.push(f);e=f[4];break;case"/":if(0===d.length)throw Error("Unopened section: "+f[1]);e=d.pop();if(e[1]!==f[1])throw Error("Unclosed section: "+e[1]);e=0<d.length?d[d.length-1][4]:c;break;default:e.push(f)}if(e=d.pop())throw Error("Unclosed section: "+e[1]);return c};var q=new h;j.clearCache=function(){return q.clearCache()};j.compile=function(a,b){return q.compile(a,b)};j.compilePartial=function(a,b,c){return q.compilePartial(a,b,c)};j.compileTokens=function(a,b){return q.compileTokens(a,b)};j.render=function(a,b,c){return q.render(a,b,c)};j.to_html=function(a,b,c,d){a=j.render(a,b,c);if("function"===typeof d)d(a);else return a};return j}());(function(f,w){function m(){}function g(a,b){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}}function v(a,b){var c=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&c===a}function k(a){return v("Function",a)}function h(a){a=a||m;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};return(a=p[b.name])&&a.url===b.url?a:p[b.name]=b}function q(a){var a=a||p,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==r)return!1;return!0}function s(a,b){b=b||m;a.state===r?b():a.state===x?d.ready(a.name,b):a.state===y?a.onpreload.push(function(){s(a,b)}):(a.state=x,z(a,function(){a.state=r;b();g(l[a.name],function(a){h(a)});j&&q()&&g(l.ALL,function(a){h(a)})}))}function z(a,b){var b=b||m,c;/\.css[^\.]*$/.test(a.url)?(c=e.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",c.href=a.url):(c=e.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||f.event;if("load"===a.type||/loaded|complete/.test(c.readyState)&&(!e.documentMode||9>e.documentMode))c.onload=c.onreadystatechange=c.onerror=null,b()};c.onerror=function(){c.onload=c.onreadystatechange=c.onerror=null;b()};c.async=!1;c.defer=!1;var d=e.head||e.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function i(){e.body?j||(j=!0,g(A,function(a){h(a)})):(f.clearTimeout(d.readyTimeout),d.readyTimeout=f.setTimeout(i,50))}function t(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",t,!1),i()):"complete"===e.readyState&&(e.detachEvent("onreadystatechange",t),i())}var e=f.document,A=[],B=[],l={},p={},E="async"in e.createElement("script")||"MozAppearance"in e.documentElement.style||f.opera,C,j,D=f.head_conf&&f.head_conf.head||"head",d=f[D]=f[D]||function(){d.ready.apply(null,arguments)},y=1,x=3,r=4;d.load=E?function(){var a=arguments,b=a[a.length-
1],c={};k(b)||(b=null);g(a,function(d,e){d!==b&&(d=n(d),c[d.name]=d,s(d,b&&e===a.length-2?function(){q(c)&&h(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!C)return B.push(function(){d.load.apply(null,a)}),d;c?(g(b,function(a){if(!k(a)){var b=n(a);b.state===w&&(b.state=y,b.onpreload=[],z({url:b.url,type:"cache"},function(){b.state=2;g(b.onpreload,function(a){a.call()})}))}}),s(n(a[0]),k(c)?c:function(){d.load.apply(null,b)})):s(n(a[0]));return d};d.js=d.load;d.test=function(a,b,c,e){a="object"===typeof a?a:{test:a,success:b?v("Array",b)?b:[b]:!1,failure:c?v("Array",c)?c:[c]:!1,callback:e||m};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):e();return d};d.ready=function(a,b){if(a===e)return j?h(b):A.push(b),d;k(a)&&(b=a,a="ALL");if("string"!==typeof a||!k(b))return d;var c=p[a];if(c&&c.state===r||"ALL"===a&&q()&&j)return h(b),d;(c=l[a])?c.push(b):l[a]=[b];return d};d.ready(e,function(){q()&&g(l.ALL,function(a){h(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===e.readyState)i();else if(e.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),f.addEventListener("load",i,!1);else{e.attachEvent("onreadystatechange",t);f.attachEvent("onload",i);var u=!1;try{u=null==f.frameElement&&e.documentElement}catch(F){}u&&u.doScroll&&function b(){if(!j){try{u.doScroll("left")}catch(c){f.clearTimeout(d.readyTimeout);d.readyTimeout=f.setTimeout(b,50);return}i()}}()}setTimeout(function(){C=!0;g(B,function(b){b()})},300)})(window);(function(a,b,c){function e(a){return a}function f(a){return decodeURIComponent(a.replace(d," "))}var d=/\+/g;var g=a.cookie=function(d,h,i){if(h!==c){i=a.extend({},g.defaults,i);if(h===null){i.expires=-1}if(typeof i.expires==="number"){var j=i.expires,k=i.expires=new Date;k.setDate(k.getDate()+j)}h=g.json?JSON.stringify(h):String(h);return b.cookie=[encodeURIComponent(d),"=",g.raw?h:encodeURIComponent(h),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}var l=g.raw?e:f;var m=b.cookie.split("; ");for(var n=0,o;o=m[n]&&m[n].split("=");n++){if(l(o.shift())===d){var p=l(o.join("="));return g.json?JSON.parse(p):p}}return null};g.defaults={};a.removeCookie=function(b,c){if(a.cookie(b)!==null){a.cookie(b,null,c);return true}return false}})(jQuery,document);(function(b){var a=b({});b.subscribe=function(){a.on.apply(a,arguments)};b.unsubscribe=function(){a.off.apply(a,arguments)};b.publish=function(){a.trigger.apply(a,arguments)}})(jQuery);var AA=AA||{};AA.Pages=AA.Pages||{};AA.Utils=AA.Utils||{};AA.Modules=AA.Modules||{};AA.Config=AA.Config||{};AA.namespace=function(ns_string){var parts=ns_string.split('.'),parent=AA,i;if(parts[0]==="AA"){parts=parts.slice(1);}
for(i=0;i<parts.length;i+=1){if(typeof parent[parts[i]]==="undefined"){parent[parts[i]]={};}
parent=parent[parts[i]];}
return parent;};AA.Utils.Modal={config:{"width":500,"height":500,"overlayOpacity":0.9,"overlayColor":"#ffffff","padding":0,"type":"inline","titleShow":false,"centerOnScroll":true,"onStart":function(){$("body").css({"overflow":"hidden"});},"onClosed":function(){$("body").css({"overflow":"visible"});}}};AA.Utils.Analytics=(function(AA,window){function Analytics(enableTracking,pageName){this._gaq=window._gaq||[];this.pagename=pageName||AA.Config.PAGE_NAME;this.enableTracking=enableTracking;};Analytics.prototype={trackingEnabled:function(){return this.enableTracking;},trackClick:function(pageName,action,label,value,interaction){if(this.trackingEnabled()){var _gaq=window._gaq||[];if(typeof value!=="undefined"&&typeof interaction!=="undefined"){_gaq.push(['_trackEvent',pageName,action,label,value,interaction]);}else if(typeof value!=="undefined"&&typeof interaction==="undefined"){_gaq.push(['_trackEvent',pageName,action,label,value]);}else{_gaq.push(['_trackEvent',pageName,action,label]);}}},trackAddToBag:function(qty){var pageName=(MasterTmsUdo.pageName||AA.Config.PAGE_NAME),_gaq=window._gaq||[];_gaq.push(['_trackEvent',pageName,'Button - Click','Add to Bag',Number(qty)]);},trackGalleryClick:function(e,data){var bxSlider=data.bxSlider,$target=$(data.target),index=(bxSlider.getCurrentSlide()+ 1),type=$target.parent().attr('data-type'),pageName=(MasterTmsUdo.pageName||AA.Config.PAGE_NAME),_gaq=window._gaq||[];_gaq.push(['_trackEvent',pageName,'Gallery - Click',' Internal:'+ type,index]);},trackSlideClick:function(e,data,pageName){var bxSlider=data.bxSlider,$target=$(data.target),index=(bxSlider.getCurrentSlide()+ 1),mkItmId=bxSlider.attr('id')||'',img=$target.attr('src'),imgLink=$target.closest('a'),_gaq=window._gaq||[];if(imgLink.length){_gaq.push(['_trackEvent',pageName,'Slide - Click','MktItmID:'+ mkItmId+' - Img:'+ img,Number(index)]);}},trackKickerClick:function($targetEl,pageName){var $target=$targetEl,index=$target.attr('data-ga_value'),label=$target.attr('data-ga_label'),imgSrc=$target.find('img').attr('src'),_gaq=window._gaq||[];_gaq.push(['_trackEvent',pageName,'Kicker - Click',imgSrc,Number(index)]);},trackGridAdClick:function($targetEl,pageName){var $target=$targetEl,index=$target.attr('data-ga_value'),label=$target.attr('data-ga_label'),imgSrc=$target.find('img').attr('src'),_gaq=window._gaq||[];_gaq.push(['_trackEvent',pageName,'GridAd - Click',imgSrc,Number(index)]);}};return Analytics;}(AA,window));AA.Utils.LoadScript=function(url,callback){var newScript=document.createElement("script"),firstScript=document.getElementsByTagName('script')[0];newScript.async=true;newScript.src=url;if(typeof callback==='function'){newScript.onload=function(){if(!newScript.isLoaded){newScript.isLoaded=true;callback();}};newScript.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!newScript.isLoaded){newScript.isLoaded=true;callback();}};}
firstScript.parentNode.insertBefore(newScript,firstScript);};AA.Utils.LoadCss=function(url){var link=document.createElement("link");link.type="text/css";link.rel="stylesheet";link.href=url;document.getElementsByTagName("head")[0].appendChild(link);};AA.Utils.FireEvent=function(el,eventname){var element=(el instanceof jQuery)?el[0]:el,event=eventname,evt;if(typeof element==="undefined"||element===null){return;}
if(document.createEvent){evt=document.createEvent("HTMLEvents");evt.initEvent(event,false,true);if(evt.preventDefault){evt.preventDefault();}else{evt.returnValue=false;}
return!element.dispatchEvent(evt);}else{evt=document.createEventObject();evt.returnValue=false;return element.fireEvent('on'+event,evt);}};AA.Utils.AjaxSubmit=function(formId,successCallback){$("#"+formId).submit(function(){var frm=$(this);$.ajax({dataType:'json',type:frm.attr('method'),url:frm.attr('action'),data:frm.serialize(),success:successCallback});return false;});}
AA.Utils.ReadCookie=function(name){var nameEQ=name+"=",ca=document.cookie.split(';'),c;for(var i=0,len=ca.length;i<len;i++){c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length);}}
return null;};AA.Utils.GetQueryValue=function(val){var q=location.search,params=q.substring(1).split('&'),i,len,pair;for(i=0,len=params.length;i<len;i++){pair=params[i].split('=');if(decodeURIComponent(pair[0])===val&&pair[1]){return pair[1];}}
return null;};AA.namespace("AA.Utils.Date");AA.Utils.Date={ONE_DAY:(24*60*60*1000),parseDate:function(d){var parts=d.split(" "),date=parts[0].split('/'),time=parts[1].split(':'),year=(date[2].length===2)?'20'+ date[2]:date[2],month=date[0]- 1,day=date[1],hours=time[0],minutes=time[1];return new Date(year,month,day,hours,minutes);},getDaysLeft:function(startDate,endDate,resetTime){if(typeof resetTime!=="undefined"&&resetTime===true){startDate.setHours(0,0,0,1);endDate.setHours(23,59,59,999);}
return Math.round(Math.abs((endDate.getTime()- startDate.getTime())/(this.ONE_DAY)));}};AA.Utils.LoadTicker=function(ticker){var siteAlert=AA.Modules.SiteAlert;$.each(ticker,function(){if(siteAlert.isCookieSet(this.id)){return;};var ticker=$(this),options=ticker.data('params'),targetEl=options.target,isFancyBox=options.type==='modal',cookieAge=options.cookieAge?Number(options.cookieAge):0,tickerId=ticker.attr('id');siteAlert.init({sessionCookie:options.sessionCookie,cookieAge:cookieAge,cookieName:'aa-sa-'+ tickerId,templateUrl:null,placement:options.placement||'after',isFancyBox:isFancyBox,tickerID:tickerId,target:$(targetEl),fancyBoxOptions:ticker.data('fancybox')||{},addTo:function(html){if($(targetEl).length){$(targetEl).append(html);}},params:options});});};var productDetailsFullScreenLink=IMAGE_URL+'/storefront/photos/fullscreen.html?l=1&i=',_onlineStoreID=1;$(function(){var $body=$("body"),$regionList=$body.find("ul.regionselector"),$miniCartBtn=$("#mini-cart-btn"),$mobileNavMenu=$("#m-cat-menu"),$catalogNav=$("#catalog-nav"),$miniCart=$("#mini-cart"),$categoryList=$catalogNav.find('ul > .has-flyout');function toggleMobileMenu(){$body.find('.header-toolbar').toggleClass('is-active');$body.find('.lowerHeader').toggleClass('is-active');$mobileNavMenu.toggleClass('is-active');return false;}
$body.on('click','#m-cat-menu',toggleMobileMenu);if($miniCart.hasClass('is-active')){toggleMobileMenu();}
$catalogNav.on('click','.has-flyout > a',function(e){if($mobileNavMenu&&!$mobileNavMenu.is(":hidden")){e.preventDefault();$categoryList.removeClass('flyout-active');$(this).parent().addClass('flyout-active');}});$body.on('click','.toolbar-item.dropdown',function(e){$(this).find('.dropdown-menu').toggle().end().toggleClass('dropdown-active');});if($.browser.msie){$.each($("body").find("input[type=text]"),function(index){var el=$(this);if(el.attr("placeholder")&&el.val()===""){el.val(el.attr('placeholder'));}});$("body").on("blur focus",'input[type=text]',function(event){var el=$(event.target);if(el.attr('placeholder')&&el.val()===el.attr('placeholder')){el.val('');}else if(el.attr('placeholder')&&el.val()===''){el.val(el.attr('placeholder'));}});}
$regionList.on("click","a",function(e){$.cookie('aaRegion',$(this).attr('data-region'),{path:'/',expires:120});$.cookie('aaLanguage',$(this).attr('data-lang'),{path:'/',expires:120});});$("#aa-newsletter-signup").submit(handleNewsLetterSignup);$body.find('.dropdown-toggle').mouseover(function(e){$(this).parent().addClass('dropdown-active');});$body.find(".dropdown").mouseleave(function(){$(this).removeClass('dropdown-active');});$miniCartBtn.click(function(e){e.preventDefault();$miniCart.toggle();});$miniCart.find('.mini-cart-close-btn').click(function(){$miniCart.toggle();});head.js(CDN_URL+'/js/lib/jquery.ui.autocomplete.js',CDN_URL+'/js/modules/AA.modules.typeahead.js',function(){var typeAhead=AA.Modules.TypeAhead,url=(location.protocol==='https:')?'https://'+ location.host+'/search/type_ahead.jsp':'/search/type_ahead.jsp';typeAhead.init({targetElement:'#Ntt',dataURL:url,autoComplete:{select:function(event,ui){var item=ui.item,searchTerm=(item.termMatchesProdId==='true')?item.prodId:item.label;event.preventDefault();this.value=searchTerm;this.form.submit();}}});});var slideshows=$('.aa-slider');if(slideshows.length){head.js(CDN_URL+"/js/lib/jquery.bxslider.min.js",CDN_URL+'/js/modules/AA.modules.slideshow.js',function(){var slider=AA.Modules.Slider,config=slider.config;$.each(slideshows,function(){var slideshow=$(this);if(slideshow.attr('data-type')!==null&&typeof config[slideshow.attr('data-type')]!=="undefined"){var sliderConfig=config[slideshow.attr('data-type')];slider.init($.extend({targetDiv:"#"+ slideshow.attr('id'),dataUrl:slideshow.attr('data-url')},sliderConfig));}else{slider.init({targetDiv:"#"+ slideshow.attr('id'),dataUrl:slideshow.attr('data-url')});}});});}
head.js(CDN_URL+'/js/utils/cookie.js',CDN_URL+'/js/modules/AA.modules.sitealert.js',function(){if($("#aa-tickers").length&&$("#aa-tickers").find('div.aa-site-alert').length){AA.Utils.LoadTicker($("#aa-tickers").find('div.aa-site-alert'));}});$('.products .product .color').mouseover(function(){$(this).closest('.product').find('.product-img').attr('src',$(this).attr('data-image'));$(this).closest('.product').find('.product-img').closest('a').attr('href',$(this).attr('data-link'));$(this).closest('.product').find('.name a').attr('href',$(this).attr('data-link'));});$("#searchRefinements").on('click','.refinement-name',function(e){e.preventDefault();$(e.currentTarget).parent().toggleClass('active');});$('input[data-input="number"]').keydown(function(event){if(AA.Config.LANGUAGE==="fr"){return;}else if(event.keyCode==46||event.keyCode==8||event.keyCode==9||event.keyCode==27||event.keyCode==13||(event.keyCode==65&&event.ctrlKey===true)||(event.keyCode==65&&event.metaKey===true)||(event.keyCode==86&&event.ctrlKey===true)||(event.keyCode==86&&event.metaKey===true)||(event.keyCode==67&&event.ctrlKey===true)||(event.keyCode==67&&event.metaKey===true)||(event.keyCode==88&&event.ctrlKey===true)||(event.keyCode==88&&event.metaKey===true)||(event.keyCode>=35&&event.keyCode<=39)){return;}else{if(event.shiftKey||(event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)){event.preventDefault();}}});$('input[data-input="text"]').keydown(function(event){if(AA.Config.LANGUAGE==="fr"){return;}else if(event.keyCode==46||event.keyCode==8||event.keyCode==9||event.keyCode==27||event.keyCode==13||(event.keyCode==65&&event.ctrlKey===true)||(event.keyCode==65&&event.metaKey===true)||(event.keyCode==86&&event.ctrlKey===true)||(event.keyCode==86&&event.metaKey===true)||(event.keyCode==67&&event.ctrlKey===true)||(event.keyCode==67&&event.metaKey===true)||(event.keyCode==88&&event.ctrlKey===true)||(event.keyCode==88&&event.metaKey===true)||(event.keyCode>=35&&event.keyCode<=39)){return;}else{if(event.shiftKey||(event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105)){}else{event.preventDefault();}}});});function showError(error,element){if(error){$('.errorMessage').show();element.closest('.inputGroup').attr('data-red','');}else{$('.errorMessage').hide();element.closest('.inputGroup').removeAttr('data-red');}}
function isValidEmailAddress(emailAddress){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailAddress);
}


function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}


function replaceString(txt,cut_str,paste_str){
	var f=0;
	var ht='';
	ht = ht + txt;
	f=ht.indexOf(cut_str);
	while (f!=-1) {
		f=ht.indexOf(cut_str);
		if (f>=0) {
			ht = ht.substr(0,f) + paste_str + ht.substr(f+cut_str.length);
		};
	};
	return ht;
}


/**
 * @method PopWishList - constructs the wishlist URL based on HTTP protocol
 * @param oid - N/A
 * @param style - N/A
 * @returns {String}
 */
function PopWishlist(oid, style) {
	var link = "/";
	
	if (!oid) {
		oid = (_onlineStoreID ? _onlineStoreID : 1);
	}
	
	if (CDN_URL && CDN_URL.indexOf('http://') === 0) {
		link += 'main';
	}
	else {
		link += 'account';
	}
	
	link += "/wishList.jsp?o=" + (oid ? oid : 1) + (style ? "&Style=" + style : "");

	return link;
}

/**
 * @method handleNewsLetterSignup - form handler for email newsletter sign up form in footer
 * @returns {Boolean}
 */
function handleNewsLetterSignup() {
	var email = $.trim($(this).find("input[name=e]").val());

	if (IsValidEmail(email)) {
		return true;
	} else {
		$(this).find("div.aa-error").show();
		return false;
	}
	
}


function IsValidEmail(email) {
	return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
}


function filterData(data){
	// no body tags
	data = data.replace(/<?\/?body[^>]*>/g,'');
	//no p tags
	data = data.replace(/<?\/?p>/g,'');
	//data = data.replace(/<\/p>/g,'');
	// no linebreaks
	data = data.replace(/[\r|\n]+/g,'');
	// no comments
	data = data.replace(/<--[\S\s]*?-->/g,'');
	// no noscript blocks
	data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
	// no script blocks
	data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
	// no self closing scripts
	data = data.replace(/<script.*\/>/,'');
	return data;
}


function popIt(width, height, scrollbars, pname, url) {
	if (!width) width = "500";
	if (!height) height = "500";
	if (!scrollbars) scrollbars = 1;
	var windowString = 'width=' + width + ',height=' + height + ',resizable=0,status=0,toolbar=no,scrollbars=' + scrollbars + ',scrolling=auto';
	var popItWindow = window.open(url, pname, windowString);
	
	return false;
}

/**
 * @method cartformsubmit - removes a commerce item via the minicart form.
 * @param formid id of the form
 * @param comItem - id of the commerce item to remove
 */
function cartformsubmit(formid, comItem) {
	
	var pageName = AA.Config.PAGE_NAME,
		analytics = new AA.Utils.Analytics(AA.Config.TRACK_EVENTS, pageName);
	
	$('#removeItemId').attr("value", comItem);
	
	// track event remove item from mini cart
	analytics.trackClick(pageName, "Button- Click", "Remove Item from Mini Cart");
	
	document.miniCartForm.submit();
}
