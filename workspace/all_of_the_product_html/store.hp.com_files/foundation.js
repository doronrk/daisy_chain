/***************foundation.min.js starts*****************/

/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
/*jslint unparam: true, browser: true, indent: 2 */
// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName=null;if(typeof jQuery=="undefined"&&typeof Zepto=="undefined"&&typeof $=="function")libFuncName=$;else if(typeof jQuery=="function")libFuncName=jQuery;else{if(typeof Zepto!="function")throw new TypeError;libFuncName=Zepto}(function(e,t,n,r){"use strict";Array.prototype.filter||(Array.prototype.filter=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(typeof e!="function")return;var r=[],i=arguments[1];for(var s=0;s<n;s++)if(s in t){var o=t[s];e&&e.call(i,o,s,t)&&r.push(o)}return r}),Function.prototype.bind||(Function.prototype.bind=function(e){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:r!=0&&r!=Infinity&&r!=-Infinity&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),e.fn.stop=e.fn.stop||function(){return this},t.Foundation={name:"Foundation",version:"4.1.5",cache:{},init:function(t,n,r,i,s,o){var u,a=[t,r,i,s],f=[],o=o||!1;o&&(this.nc=o),this.rtl=/rtl/i.test(e("html").attr("dir")),this.scope=t||this.scope;if(n&&typeof n=="string"){if(/off/i.test(n))return this.off();u=n.split(" ");if(u.length>0)for(var l=u.length-1;l>=0;l--)f.push(this.init_lib(u[l],a))}else for(var c in this.libs)f.push(this.init_lib(c,a));return typeof n=="function"&&a.unshift(n),this.response_obj(f,a)},response_obj:function(e,t){for(var n=0,r=t.length;n<r;n++)if(typeof t[n]=="function")return t[n]({errors:e.filter(function(e){if(typeof e=="string")return e})});return e},init_lib:function(e,t){return this.trap(function(){if(this.libs.hasOwnProperty(e))return this.patch(this.libs[e]),this.libs[e].init.apply(this.libs[e],t)}.bind(this),e)},trap:function(e,t){if(!this.nc)try{return e()}catch(n){return this.error({name:t,message:"could not be initialized",more:n.name+" "+n.message})}return e()},patch:function(e){this.fix_outer(e),e.scope=this.scope,e.rtl=this.rtl},inherit:function(e,t){var n=t.split(" ");for(var r=n.length-1;r>=0;r--)this.lib_methods.hasOwnProperty(n[r])&&(this.libs[e.name][n[r]]=this.lib_methods[n[r]])},random_str:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");e||(e=Math.floor(Math.random()*t.length));var n="";for(var r=0;r<e;r++)n+=t[Math.floor(Math.random()*t.length)];return n},libs:{},lib_methods:{set_data:function(e,t){var n=[this.name,+(new Date),Foundation.random_str(5)].join("-");return Foundation.cache[n]=t,e.attr("data-"+this.name+"-id",n),t},get_data:function(e){return Foundation.cache[e.attr("data-"+this.name+"-id")]},remove_data:function(t){t?(delete Foundation.cache[t.attr("data-"+this.name+"-id")],t.attr("data-"+this.name+"-id","")):e("[data-"+this.name+"-id]").each(function(){delete Foundation.cache[e(this).attr("data-"+this.name+"-id")],e(this).attr("data-"+this.name+"-id","")})},throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},data_options:function(t){function u(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==!1&&e!==!0}function a(t){return typeof t=="string"?e.trim(t):t}var n={},r,i,s=(t.attr("data-options")||":").split(";"),o=s.length;for(r=o-1;r>=0;r--)i=s[r].split(":"),/true/i.test(i[1])&&(i[1]=!0),/false/i.test(i[1])&&(i[1]=!1),u(i[1])&&(i[1]=parseInt(i[1],10)),i.length===2&&i[0].length>0&&(n[a(i[0])]=a(i[1]));return n},delay:function(e,t){return setTimeout(e,t)},scrollTo:function(n,r,i){if(i<0)return;var s=r-e(t).scrollTop(),o=s/i*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(o,10))||(t.scrollTo(0,e(t).scrollTop()+o),this.scrollTo(n,r,i-10))}.bind(this),10)},scrollLeft:function(e){if(!e.length)return;return"scrollLeft"in e[0]?e[0].scrollLeft:e[0].pageXOffset},empty:function(e){if(e.length&&e.length>0)return!1;if(e.length&&e.length===0)return!0;for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0}},fix_outer:function(e){e.outerHeight=function(e,t){return typeof Zepto=="function"?e.height():typeof t!="undefined"?e.outerHeight(t):e.outerHeight()},e.outerWidth=function(e){return typeof Zepto=="function"?e.width():typeof bool!="undefined"?e.outerWidth(bool):e.outerWidth()}},error:function(e){return e.name+" "+e.message+"; "+e.more},off:function(){return e(this.scope).off(".fndtn"),e(t).off(".fndtn"),!0},zj:function(){try{return Zepto}catch(e){return jQuery}}()},e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(e)),this})}})(libFuncName,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"4.1.3",settings:{activeClass:"open",opened:function(){},closed:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle scrollLeft"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.fndtn.dropdown","[data-dropdown]",function(t){t.preventDefault(),n.toggle(e(this))}).on("opened.fndtn.dropdown","[data-dropdown-content]",this.settings.opened).on("closed.fndtn.dropdown","[data-dropdown-content]",this.settings.closed),e("body").on("click.fndtn.dropdown",function(t){var r=e(t.target).closest("[data-dropdown-content]");if(e(t.target).data("dropdown"))return;if(r.length>0&&(e(t.target).is("[data-dropdown-content]")||e.contains(r.first()[0],t.target))){t.stopPropagation();return}n.close.call(n,e("[data-dropdown-content]"))}),e(t).on("resize.fndtn.dropdown",n.throttle(function(){n.resize.call(n)},50)).trigger("resize"),this.settings.init=!0},close:function(t){var n=this;t.each(function(){e(this).hasClass(n.settings.activeClass)&&(e(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(n.settings.activeClass),e(this).trigger("closed"))})},open:function(e,t){this.css(e.addClass(this.settings.activeClass),t),e.trigger("opened")},toggle:function(t){var n=e("#"+t.data("dropdown"));this.close.call(this,e("[data-dropdown-content]").not(n)),n.hasClass(this.settings.activeClass)?this.close.call(this,n):this.open.call(this,n,t)},resize:function(){var t=e("[data-dropdown-content].open"),n=e("[data-dropdown='"+t.attr("id")+"']");t.length&&n.length&&this.css(t,n)},css:function(n,r){if(/body/i.test(n.offsetParent()[0].nodeName)){var i=r.offset();i.top-=n.offsetParent().offset().top,i.left-=n.offsetParent().offset().left}else var i=r.position();if(this.small())n.css({position:"absolute",width:"95%",left:"2.5%","max-width":"none",top:i.top+this.outerHeight(r)});else{if(!Foundation.rtl&&e(t).width()>this.outerWidth(n)+r.offset().left)var s=i.left;else{n.hasClass("right")||n.addClass("right");var s=i.left-(this.outerWidth(n)-this.outerWidth(r))}n.attr("style","").css({position:"absolute",top:i.top+this.outerHeight(r),left:s})}return n},small:function(){return e(t).width()<768||e("html").hasClass("lt-ie9")},off:function(){e(this.scope).off(".fndtn.dropdown"),e("html, body").off(".fndtn.dropdown"),e(t).off(".fndtn.dropdown"),e("[data-dropdown-content]").off(".fndtn.dropdown"),this.settings.init=!1}}}(Foundation.zj,this,this.document),function(e,t,n){function f(e){var t={},r=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!r.test(n.name)&&(t[n.name]=n.value)}),t}function l(e,r){var i=this,s=n(i);if(i.value==s.attr("placeholder")&&s.hasClass("placeholder"))if(s.data("placeholder-password")){s=s.hide().next().show().attr("id",s.removeAttr("id").data("placeholder-id"));if(e===!0)return s[0].value=r;s.focus()}else i.value="",s.removeClass("placeholder"),i==t.activeElement&&i.select()}function c(){var e,t=this,r=n(t),i=r,s=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(o){e=n("<input>").attr(n.extend(f(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":s}).bind("focus.placeholder",l),r.data({"placeholder-textinput":e,"placeholder-id":s}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",s).show()}r.addClass("placeholder"),r[0].value=r.attr("placeholder")}else r.removeClass("placeholder")}var r="placeholder"in t.createElement("input"),i="placeholder"in t.createElement("textarea"),s=n.fn,o=n.valHooks,u,a;r&&i?(a=s.placeholder=function(){return this},a.input=a.textarea=!0):(a=s.placeholder=function(){var e=this;return e.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":l,"blur.placeholder":c}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},a.input=r,a.textarea=i,u={get:function(e){var t=n(e);return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,r){var i=n(e);return i.data("placeholder-enabled")?(r==""?(e.value=r,e!=t.activeElement&&c.call(e)):i.hasClass("placeholder")?l.call(e,!0,r)||(e.value=r):e.value=r,i):e.value=r}},r||(o.input=u),i||(o.textarea=u),n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(l);setTimeout(function(){e.each(c)},10)})}),n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})}))}(this,document,Foundation.zj),function(e,t,n,r){"use strict";Foundation.libs.forms={name:"forms",version:"4.1.6",cache:{},settings:{disable_class:"no-custom",last_combo:null},init:function(t,n,r){return typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.assemble(),this.settings.init):this[n].call(this,r)},assemble:function(){e('form.custom input[type="radio"]',e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup),e('form.custom input[type="checkbox"]',e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup),e("form.custom select",e(this.scope)).not('[data-customforms="disabled"]').not("[multiple=multiple]").each(this.append_custom_select)},events:function(){var r=this;e(this.scope).on("click.fndtn.forms","form.custom span.custom.checkbox",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_checkbox(e(this))}).on("click.fndtn.forms","form.custom span.custom.radio",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_radio(e(this))}).on("change.fndtn.forms",'form.custom select:not([data-customforms="disabled"])',function(t,n){r.refresh_custom_select(e(this),n)}).on("click.fndtn.forms","form.custom label",function(t){if(e(t.target).is("label")){var n=e("#"+r.escape(e(this).attr("for"))+':not([data-customforms="disabled"])'),i,s;n.length!==0&&(n.attr("type")==="checkbox"?(t.preventDefault(),i=e(this).find("span.custom.checkbox"),i.length==0&&(i=n.add(this).siblings("span.custom.checkbox").first()),r.toggle_checkbox(i)):n.attr("type")==="radio"&&(t.preventDefault(),s=e(this).find("span.custom.radio"),s.length==0&&(s=n.add(this).siblings("span.custom.radio").first()),r.toggle_radio(s)))}}).on("click.fndtn.forms","form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector",function(t){var n=e(this),s=n.closest("div.custom.dropdown"),o=i(s,"select");s.hasClass("open")||e(r.scope).trigger("click"),t.preventDefault();if(!1===o.is(":disabled"))return s.toggleClass("open"),s.hasClass("open")?e(r.scope).on("click.fndtn.forms.customdropdown",function(){s.removeClass("open"),e(r.scope).off(".fndtn.forms.customdropdown")}):e(r.scope).on(".fndtn.forms.customdropdown"),!1}).on("click.fndtn.forms touchend.fndtn.forms","form.custom div.custom.dropdown li",function(t){var n=e(this),r=n.closest("div.custom.dropdown"),s=i(r,"select"),o=0;t.preventDefault(),t.stopPropagation();if(!e(this).hasClass("disabled")){e("div.dropdown").not(r).removeClass("open");var u=n.closest("ul").find("li.selected");u.removeClass("selected"),n.addClass("selected"),r.removeClass("open").find("a.current").text(n.text()),n.closest("ul").find("li").each(function(e){n[0]==this&&(o=e)}),s[0].selectedIndex=o,s.data("prevalue",u.html()),s.trigger("change")}}),e(t).on("keydown",function(t){var r=n.activeElement,i=Foundation.libs.forms,s=e(".custom.dropdown.open");if(s.length>0){t.preventDefault(),t.which===13&&s.find("li.selected").trigger("click"),t.which===27&&s.removeClass("open");if(t.which>=65&&t.which<=90){var o=i.go_to(s,t.which),u=s.find("li.selected");o&&(u.removeClass("selected"),i.scrollTo(o.addClass("selected"),300))}if(t.which===38){var u=s.find("li.selected"),a=u.prev(":not(.disabled)");a.length>0&&(a.parent()[0].scrollTop=a.parent().scrollTop()-i.outerHeight(a),u.removeClass("selected"),a.addClass("selected"))}else if(t.which===40){var u=s.find("li.selected"),o=u.next(":not(.disabled)");o.length>0&&(o.parent()[0].scrollTop=o.parent().scrollTop()+i.outerHeight(o),u.removeClass("selected"),o.addClass("selected"))}}}),this.settings.init=!0},go_to:function(e,t){var n=e.find("li"),r=n.length;if(r>0)for(var i=0;i<r;i++){var s=n.eq(i).text().charAt(0).toLowerCase();if(s===String.fromCharCode(t).toLowerCase())return n.eq(i)}},scrollTo:function(e,t){if(t<0)return;var n=e.parent(),r=this.outerHeight(e),i=r*e.index()-n.scrollTop(),s=i/t*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(s,10))||(n[0].scrollTop=n.scrollTop()+s,this.scrollTo(e,t-10))}.bind(this),10)},append_custom_markup:function(t,n){var r=e(n),i=r.attr("type"),s=r.next("span.custom."+i);r.parent().hasClass("switch")||r.addClass("hidden-field"),s.length===0&&(s=e('<span class="custom '+i+'"></span>').insertAfter(r)),s.toggleClass("checked",r.is(":checked")),s.toggleClass("disabled",r.is(":disabled"))},append_custom_select:function(t,n){var r=Foundation.libs.forms,i=e(n),s=i.next("div.custom.dropdown"),o=s.find("ul"),u=s.find(".current"),a=s.find(".selector"),f=i.find("option"),l=f.filter(":selected"),c=i.attr("class")?i.attr("class").split(" "):[],h=0,p="",d,v=!1;if(i.hasClass(r.settings.disable_class))return;if(s.length===0){var m=i.hasClass("small")?"small":i.hasClass("medium")?"medium":i.hasClass("large")?"large":i.hasClass("expand")?"expand":"";s=e('<div class="'+["custom","dropdown",m].concat(c).filter(function(e,t,n){return e==""?!1:n.indexOf(e)==t}).join(" ")+'"><a href="#" class="selector"></a><ul /></div>'),a=s.find(".selector"),o=s.find("ul"),p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join(""),o.append(p),v=s.prepend('<a href="#" class="current">'+l.html()+"</a>").find(".current"),i.after(s).addClass("hidden-field")}else p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join(""),o.html("").append(p);r.assign_id(i,s),s.toggleClass("disabled",i.is(":disabled")),d=o.find("li"),r.cache[s.data("id")]=d.length,f.each(function(t){this.selected&&(d.eq(t).addClass("selected"),v&&v.html(e(this).html())),e(this).is(":disabled")&&d.eq(t).addClass("disabled")});if(!s.is(".small, .medium, .large, .expand")){s.addClass("open");var r=Foundation.libs.forms;r.hidden_fix.adjust(o),h=r.outerWidth(d)>h?r.outerWidth(d):h,Foundation.libs.forms.hidden_fix.reset(),s.removeClass("open")}},assign_id:function(e,t){var n=[+(new Date),Foundation.random_str(5)].join("-");e.attr("data-id",n),t.attr("data-id",n)},refresh_custom_select:function(t,n){var r=this,i=0,s=t.next(),o=t.find("option"),u=s.find("li");if(u.length!=this.cache[s.data("id")]||n)s.find("ul").html(""),o.each(function(){var t=e("<li>"+e(this).html()+"</li>");s.find("ul").append(t)}),o.each(function(t){this.selected&&(s.find("li").eq(t).addClass("selected"),s.find(".current").html(e(this).html())),e(this).is(":disabled")&&s.find("li").eq(t).addClass("disabled")}),s.removeAttr("style").find("ul").removeAttr("style"),s.find("li").each(function(){s.addClass("open"),r.outerWidth(e(this))>i&&(i=r.outerWidth(e(this))),s.removeClass("open")}),u=s.find("li"),this.cache[s.data("id")]=u.length},toggle_checkbox:function(e){var t=e.prev(),n=t[0];!1===t.is(":disabled")&&(n.checked=n.checked?!1:!0,e.toggleClass("checked"),t.trigger("change"))},toggle_radio:function(e){var t=e.prev(),n=t.closest("form.custom"),r=t[0];!1===t.is(":disabled")&&(n.find('input[type="radio"][name="'+this.escape(t.attr("name"))+'"]').next().not(e).removeClass("checked"),e.hasClass("checked")||e.toggleClass("checked"),r.checked=e.hasClass("checked"),t.trigger("change"))},escape:function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},hidden_fix:{tmp:[],hidden:null,adjust:function(t){var n=this;n.hidden=t.parents().andSelf().filter(":hidden"),n.hidden.each(function(){var t=e(this);n.tmp.push(t.attr("style")),t.css({visibility:"hidden",display:"block"})})},reset:function(){var t=this;t.hidden.each(function(n){var i=e(this),s=t.tmp[n];s===r?i.removeAttr("style"):i.attr("style",s)}),t.tmp=[],t.hidden=null}},off:function(){e(this.scope).off(".fndtn.forms")}};var i=function(t,n){var t=t.prev();while(t.length){if(t.is(n))return t;t=t.prev()}return e()}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.alerts={name:"alerts",version:"4.0.0",settings:{speed:300,callback:function(){}},init:function(t,n,r){return this.scope=t||this.scope,typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;e(this.scope).on("click.fndtn.alerts","[data-alert] a.close",function(n){n.preventDefault(),e(this).closest("[data-alert]").fadeOut(t.speed,function(){e(this).remove(),t.settings.callback()})}),this.settings.init=!0},off:function(){e(this.scope).off(".fndtn.alerts")}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.magellan={name:"magellan",version:"4.0.0",settings:{activeClass:"active"},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||(this.fixed_magellan=e("[data-magellan-expedition]"),this.set_threshold(),this.last_destination=e("[data-magellan-destination]").last(),this.events()),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("arrival.fndtn.magellan","[data-magellan-arrival]",function(t){var r=e(this),i=r.closest("[data-magellan-expedition]"),s=i.attr("data-magellan-active-class")||n.settings.activeClass;r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s),r.addClass(s)}),this.fixed_magellan.on("update-position.fndtn.magellan",function(){var t=e(this)}).trigger("update-position"),e(t).on("resize.fndtn.magellan",function(){this.fixed_magellan.trigger("update-position")}.bind(this)).on("scroll.fndtn.magellan",function(){var r=e(t).scrollTop();n.fixed_magellan.each(function(){var t=e(this);typeof t.data("magellan-top-offset")=="undefined"&&t.data("magellan-top-offset",t.offset().top),typeof t.data("magellan-fixed-position")=="undefined"&&t.data("magellan-fixed-position",!1);var i=r+n.settings.threshold>t.data("magellan-top-offset"),s=t.attr("data-magellan-top-offset");t.data("magellan-fixed-position")!=i&&(t.data("magellan-fixed-position",i),i?t.css({position:"fixed",top:0}):t.css({position:"",top:""}),i&&typeof s!="undefined"&&s!=0&&t.css({position:"fixed",top:s+"px"}))})}),this.last_destination.length>0&&e(t).on("scroll.fndtn.magellan",function(r){var i=e(t).scrollTop(),s=i+e(t).height(),o=Math.ceil(n.last_destination.offset().top);e("[data-magellan-destination]").each(function(){var t=e(this),r=t.attr("data-magellan-destination"),u=t.offset().top-i;u<=n.settings.threshold&&e("[data-magellan-arrival='"+r+"']").trigger("arrival"),s>=e(n.scope).height()&&o>i&&o<s&&e("[data-magellan-arrival]").last().trigger("arrival")})}),this.settings.init=!0},set_threshold:function(){this.settings.threshold||(this.settings.threshold=this.fixed_magellan.length>0?this.outerHeight(this.fixed_magellan,!0):0)},off:function(){e(this.scope).off(".fndtn.magellan")}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.reveal={name:"reveal",version:"4.1.3",locked:!1,settings:{animation:"fadeAndPop",animationSpeed:250,closeOnBackgroundClick:!0,dismissModalClass:"close-reveal-modal",bgClass:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options delay"),typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r),typeof n!="string"?(this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;return e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal","[data-reveal-id]",function(n){n.preventDefault(),t.locked||(t.locked=!0,t.open.call(t,e(this)))}).on("click.fndtn.reveal touchend.click.fndtn.reveal",this.close_targets(),function(n){n.preventDefault();if(!t.locked){var r=e.extend({},t.settings,t.data_options(e(".reveal-modal.open")));if(e(n.target)[0]===e("."+r.bgClass)[0]&&!r.closeOnBackgroundClick)return;t.locked=!0,t.close.call(t,e(this).closest(".reveal-modal"))}}).on("open.fndtn.reveal",".reveal-modal",this.settings.open).on("opened.fndtn.reveal",".reveal-modal",this.settings.opened).on("opened.fndtn.reveal",".reveal-modal",this.open_video).on("close.fndtn.reveal",".reveal-modal",this.settings.close).on("closed.fndtn.reveal",".reveal-modal",this.settings.closed).on("closed.fndtn.reveal",".reveal-modal",this.close_video),!0},open:function(t){if(t)var n=e("#"+t.data("reveal-id"));else var n=e(this.scope);if(!n.hasClass("open")){var r=e(".reveal-modal.open");typeof n.data("css-top")=="undefined"&&n.data("css-top",parseInt(n.css("top"),10)).data("offset",this.cache_offset(n)),n.trigger("open"),r.length<1&&this.toggle_bg(n),this.hide(r,this.settings.css.close),this.show(n,this.settings.css.open)}},close:function(t){var t=t||e(this.scope),n=e(".reveal-modal.open");n.length>0&&(this.locked=!0,t.trigger("close"),this.toggle_bg(t),this.hide(n,this.settings.css.close))},close_targets:function(){var e="."+this.settings.dismissModalClass;return this.settings.closeOnBackgroundClick?e+", ."+this.settings.bgClass:e},toggle_bg:function(t){e(".reveal-modal-bg").length===0&&(this.settings.bg=e("<div />",{"class":this.settings.bgClass}).appendTo("body")),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){r.top=e(t).scrollTop()-n.data("offset")+"px";var i={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}return/fade/i.test(this.settings.animation)?n.fadeIn(this.settings.animationSpeed/2):n.show()},hide:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){var i={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}return/fade/i.test(this.settings.animation)?n.fadeOut(this.settings.animationSpeed/2):n.hide()},close_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");r.length>0&&(r.attr("data-src",r[0].src),r.attr("src","about:blank"),n.fadeOut(100).hide())},open_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");if(r.length>0){var i=r.attr("data-src");typeof i=="string"&&(r[0].src=r.attr("data-src")),n.show().fadeIn(100)}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.1.3",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",appendTo:"body",tipTemplate:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(t,n,r){var i=this;this.scope=t||this.scope,typeof n=="object"&&e.extend(!0,this.settings,n);if(typeof n=="string")return this[n].call(this,r);Modernizr.touch?e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(t){t.preventDefault(),e(i.settings.tooltipClass).hide(),i.showOrCreateTip(e(this))}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(t){t.preventDefault(),e(this).fadeOut(150)}):e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(t){var n=e(this);t.type==="mouseover"||t.type==="mouseenter"?i.showOrCreateTip(n):(t.type==="mouseout"||t.type==="mouseleave")&&i.hide(n)})},showOrCreateTip:function(e){var t=this.getTip(e);return t&&t.length>0?this.show(e):this.create(e)},getTip:function(t){var n=this.selector(t),r=null;return n&&(r=e("span[data-selector="+n+"]"+this.settings.tooltipClass)),typeof r=="object"?r:!1},selector:function(e){var t=e.attr("id"),n=e.attr("data-tooltip")||e.attr("data-selector");return(t&&t.length<1||!t)&&typeof n!="string"&&(n="tooltip"+Math.random().toString(36).substring(7),e.attr("data-selector",n)),t&&t.length>0?t:n},create:function(t){var n=e(this.settings.tipTemplate(this.selector(t),e("<div></div>").html(t.attr("title")).html())),r=this.inheritable_classes(t);n.addClass(r).appendTo(this.settings.appendTo),Modernizr.touch&&n.append('<span class="tap-to-close">tap to close </span>'),t.removeAttr("title").attr("title",""),this.show(t)},reposition:function(n,r,i){var s,o,u,a,f,l;r.css("visibility","hidden").show(),s=n.data("width"),o=r.children(".nub"),u=this.outerHeight(o),a=this.outerHeight(o),l=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto",width:s?s:"auto"}).end()},l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",n.offset().left,s);if(e(t).width()<767)l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",12.5,e(this.scope).width()),r.addClass("tip-override"),l(o,-u,"auto","auto",n.offset().left);else{var c=n.offset().left;Foundation.rtl&&(c=n.offset().left+n.offset().width-this.outerWidth(r)),l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",c,s),r.removeClass("tip-override"),i&&i.indexOf("tip-top")>-1?l(r,n.offset().top-this.outerHeight(r),"auto","auto",c,s).removeClass("tip-override"):i&&i.indexOf("tip-left")>-1?l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left-this.outerWidth(r)-u,s).removeClass("tip-override"):i&&i.indexOf("tip-right")>-1&&l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left+this.outerWidth(n)+u,s).removeClass("tip-override")}r.css("visibility","visible").hide()},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),r=t.attr("class"),i=r?e.map(r.split(" "),function(t,r){if(e.inArray(t,n)!==-1)return t}).join(" "):"";return e.trim(i)},show:function(e){var t=this.getTip(e);this.reposition(e,t,e.attr("class")),t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150)},reload:function(){var t=e(this);return t.data("fndtn-tooltips")?t.foundationTooltips("destroy").foundationTooltips("init"):t.foundationTooltips("init")},off:function(){e(this.scope).off(".fndtn.tooltip"),e(this.settings.tooltipClass).each(function(t){e("[data-tooltip]").get(t).attr("title",e(this).text())}).remove()}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.clearing={name:"clearing",version:"4.1.3",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(t,n,r){var i=this;return Foundation.inherit(this,"set_data get_data remove_data throttle data_options"),typeof n=="object"&&(r=e.extend(!0,this.settings,n)),typeof n!="string"?(e(this.scope).find("ul[data-clearing]").each(function(){var t=e(this),n=n||{},r=t.find("li"),s=i.get_data(t);!s&&r.length>0&&(n.$parent=t.parent(),i.set_data(t,e.extend({},i.settings,n,i.data_options(t))),i.assemble(t.find("li")),i.settings.init||i.events().swipe_events())}),this.settings.init):this[n].call(this,r)},events:function(){var n=this;return e(this.scope).on("click.fndtn.clearing","ul[data-clearing] li",function(t,r,i){var r=r||e(this),i=i||r,s=r.next("li"),o=n.get_data(r.parent()),u=e(t.target);t.preventDefault(),o||n.init(),i.hasClass("visible")&&r[0]===i[0]&&s.length>0&&n.is_open(r)&&(i=s,u=i.find("img")),n.open(u,r,i),n.update_paddles(i)}).on("click.fndtn.clearing",".clearing-main-next",function(e){this.nav(e,"next")}.bind(this)).on("click.fndtn.clearing",".clearing-main-prev",function(e){this.nav(e,"prev")}.bind(this)).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}).on("keydown.fndtn.clearing",function(e){this.keydown(e)}.bind(this)),e(t).on("resize.fndtn.clearing",function(){this.resize()}.bind(this)),this.settings.init=!0,this},swipe_events:function(){var t=this;e(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var n={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};e(this).data("swipe-transition",n),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(n){n.touches||(n=n.originalEvent);if(n.touches.length>1||n.scale&&n.scale!==1)return;var r=e(this).data("swipe-transition");typeof r=="undefined"&&(r={}),r.delta_x=n.touches[0].pageX-r.start_page_x,typeof r.is_scrolling=="undefined"&&(r.is_scrolling=!!(r.is_scrolling||Math.abs(r.delta_x)<Math.abs(n.touches[0].pageY-r.start_page_y)));if(!r.is_scrolling&&!r.active){n.preventDefault();var i=r.delta_x<0?"next":"prev";r.active=!0,t.nav(n,i)}}).on("touchend.fndtn.clearing",".visible-img",function(t){e(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(t){var n=t.parent();n.after('<div id="foundationClearingHolder"></div>');var r=e("#foundationClearingHolder"),i=this.get_data(n),s=n.detach(),o={grid:'<div class="carousel">'+this.outerHTML(s[0])+"</div>",viewing:i.templates.viewing},u='<div class="clearing-assembled"><div>'+o.viewing+o.grid+"</div></div>";return r.after(u).remove()},open:function(e,t,n){var r=n.closest(".clearing-assembled"),i=r.find("div").first(),s=i.find(".visible-img"),o=s.find("img").not(e);this.locked()||(o.attr("src",this.load(e)).css("visibility","hidden"),this.loaded(o,function(){o.css("visibility","visible"),r.addClass("clearing-blackout"),i.addClass
("clearing-container"),s.show(),this.fix_height(n).caption(s.find(".clearing-caption"),e).center(o).shift(t,n,function(){n.siblings().removeClass("visible"),n.addClass("visible")})}.bind(this)))},close:function(t,n){t.preventDefault();var r=function(e){return/blackout/.test(e.selector)?e:e.closest(".clearing-blackout")}(e(n)),i,s;return n===t.target&&r&&(i=r.find("div").first(),s=i.find(".visible-img"),this.settings.prev_index=0,r.find("ul[data-clearing]").attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),i.removeClass("clearing-container"),s.hide()),!1},is_open:function(e){return e.parent().attr("style").length>0},keydown:function(t){var n=e(".clearing-blackout").find("ul[data-clearing]");t.which===39&&this.go(n,"next"),t.which===37&&this.go(n,"prev"),t.which===27&&e("a.clearing-close").trigger("click")},nav:function(t,n){var r=e(".clearing-blackout").find("ul[data-clearing]");t.preventDefault(),this.go(r,n)},resize:function(){var t=e(".clearing-blackout .visible-img").find("img");t.length&&this.center(t)},fix_height:function(t){var n=t.parent().children(),r=this;return n.each(function(){var t=e(this),n=t.find("img");t.height()>r.outerHeight(n)&&t.addClass("fix-height")}).closest("ul").width(n.length*100+"%"),this},update_paddles:function(e){var t=e.closest(".carousel").siblings(".visible-img");e.next().length>0?t.find(".clearing-main-next").removeClass("disabled"):t.find(".clearing-main-next").addClass("disabled"),e.prev().length>0?t.find(".clearing-main-prev").removeClass("disabled"):t.find(".clearing-main-prev").addClass("disabled")},center:function(e){return this.rtl?e.css({marginRight:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}):e.css({marginLeft:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}),this},load:function(e){if(e[0].nodeName==="A")var t=e.attr("href");else var t=e.parent().attr("href");return this.preload(e),t?t:e.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},loaded:function(e,t){function n(){t()}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},img:function(e){if(e.length){var t=new Image,n=e.find("a");n.length?t.src=n.attr("href"):t.src=e.find("img").attr("src")}return this},caption:function(e,t){var n=t.data("caption");return n?e.text(n).show():e.text("").hide(),this},go:function(e,t){var n=e.find(".visible"),r=n[t]();r.length&&r.find("img").trigger("click",[n,r])},shift:function(e,t,n){var r=t.parent(),i=this.settings.prev_index||t.index(),s=this.direction(r,e,t),o=parseInt(r.css("left"),10),u=this.outerWidth(t),a;t.index()!==i&&!/skip/.test(s)?/left/.test(s)?(this.lock(),r.animate({left:o+u},300,this.unlock())):/right/.test(s)&&(this.lock(),r.animate({left:o-u},300,this.unlock())):/skip/.test(s)&&(a=t.index()-this.settings.up_count,this.lock(),a>0?r.animate({left:-(a*u)},300,this.unlock()):r.animate({left:0},300,this.unlock())),n()},direction:function(t,n,r){var i=t.find("li"),s=this.outerWidth(i)+this.outerWidth(i)/4,o=Math.floor(this.outerWidth(e(".clearing-container"))/s)-1,u=i.index(r),a;return this.settings.up_count=o,this.adjacent(this.settings.prev_index,u)?u>o&&u>this.settings.prev_index?a="right":u>o-1&&u<=this.settings.prev_index?a="left":a=!1:a="skip",this.settings.prev_index=u,a},adjacent:function(e,t){for(var n=t+1;n>=t-1;n--)if(n===e)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".fndtn.clearing"),e(t).off(".fndtn.clearing"),this.remove_data(),this.settings.init=!1},reflow:function(){this.init()}}}(Foundation.zj,this,this.document),function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g,o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a),u===null&&(a.expires=-1);if(typeof a.expires=="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}return u=o.json?JSON.stringify(u):String(u),t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s,h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==null?(e.cookie(t,null,n),!0):!1}}(Foundation.zj,document),function(e,t,n,r){"use strict";Foundation.libs.joyride={name:"joyride",version:"4.1.2",defaults:{expose:!1,modal:!1,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'}},settings:{},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay"),typeof n=="object"?e.extend(!0,this.settings,this.defaults,n):e.extend(!0,this.settings,this.defaults,r),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end()}.bind(this)),e(t).on("resize.fndtn.joyride",n.throttle(function(){if(e("[data-joyride]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t),n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1,!0)}},100)),this.settings.init=!0},start:function(){var t=this,n=e(this.scope).find("[data-joyride]"),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;this.settings.init||this.init(),this.settings.$content_el=n,this.settings.$body=e(this.settings.tipContainer),this.settings.body_offset=e(this.settings.tipContainer).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},typeof e.cookie!="function"&&(this.settings.cookieMonster=!1);if(!this.settings.cookieMonster||this.settings.cookieMonster&&e.cookie(this.settings.cookieName)===null)this.settings.$tip_content.each(function(n){var s=e(this);e.extend(!0,t.settings,t.data_options(s));for(var o=i-1;o>=0;o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})}),!this.settings.startTimerOnClick&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")},resume:function(){this.set_li(),this.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(this.settings.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),n.append(e(this.settings.template.wrapper)),n.first().attr("data-index",t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&this.settings.startTimerOnClick&&this.settings.timer>0||this.settings.timer===0?n="":n=this.outerHTML(e(this.settings.template.timer)[0]),n},button_text:function(t){return this.settings.nextButton?(t=e.trim(t)||"Next",t=this.outerHTML(e(this.settings.template.button).append(t)[0])):t="",t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tipContainer).append(i)},show:function(t){var n=null;this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pauseAfter)===-1?(this.settings.paused?this.settings.paused=!1:this.set_li(t),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(t&&(this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tipSettings=e.extend(this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),n=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tipAnimation)?(n.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tipAnimation)&&(n.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return Modernizr?Modernizr.mq("only screen and (max-width: 767px)")||e(".lt-ie9").length>0:this.settings.$window.width()<767},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){e?(this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']"),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr("data-class"),r=this.settings.$li.attr("data-id"),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2,r=Math.ceil(this.settings.$target.offset().top-n+this.outerHeight(this.settings.$next_tip)),r>0&&this.scrollTo(e("html, body"),r,this.settings.scrollSpeed)},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)===-1},restart:function(){this.hide(),this.settings.$li=r,this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(this.outerWidth(o)/2),a=Math.ceil(this.outerHeight(o)/2),f=n||!1;f&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),typeof r=="undefined"&&(r=!1);if(!/body/i.test(this.settings.$target.selector)){if(this.bottom()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.outerHeight(this.settings.$target),left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-a,left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"bottom")}else this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"right"));!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length&&(o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}else this.settings.$li.length&&this.pos_modal(o);f&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=this.outerHeight(this.settings.$next_tip),r=this.settings.$next_tip.offset(),i=this.outerHeight(this.settings.$target),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),u&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o}),s.addClass("top")),u&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(e){this.center(),e.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tipAnimation)?t.show():t.fadeIn(this.settings.tipAnimationFadeSpeed)}},expose:function(){var n,r,i,s,o="expose-"+Math.floor(Math.random()*1e4);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1)return t.console&&console.error("element not valid",i),!1;n=e(this.settings.template.expose),this.settings.$body.append(n),n.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),r=e(this.settings.template.exposeCover),s={zIndex:i.css("z-index"),position:i.css("position")},i.css("z-index",parseInt(n.css("z-index"))+1),s.position=="static"&&i.css("position","relative"),i.data("expose-css",s),r.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),this.settings.$body.append(r),n.addClass(o),r.addClass(o),i.data("expose",o),this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,i),this.add_exposed(i)},un_expose:function(){var n,r,i,s,o=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1)return t.console&&console.error("element not valid",r),!1;n=r.data("expose"),i=e("."+n),arguments.length>1&&(o=arguments[1]),o===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove(),s=r.data("expose-css"),s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex),s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position)),r.removeData("expose"),r.removeData("expose-z-index"),this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[],t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t),this.settings.exposed=this.settings.exposed||[],r=this.settings.exposed.length;for(var i=0;i<r;i++)if(this.settings.exposed[i]==n){this.settings.exposed.splice(i,1);return}},center:function(){var n=e(t);return this.settings.$next_tip.css({top:(n.height()-this.outerHeight(this.settings.$next_tip))/2+n.scrollTop(),left:(n.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(n)}),!0},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+this.scrollLeft(r),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();return s<f&&(s<0?f=0:f=s),u>a&&(a=u),[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),this.scrollLeft(r)>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookieMonster&&e.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip),this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip),e(".joyride-tip-guide").remove()},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"4.1.0",settings:{timer_speed:1e4,animation_speed:500,bullets:!0,stack_on_small:!0,navigation_arrows:!0,slide_number:!0,container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning"},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options"),typeof n=="object"&&e.extend(!0,i.settings,n),e("[data-orbit]",t).each(function(t,n){var r=e.extend(!0,{},i);r._init(t,n)})},_container_html:function(){var e=this;return'<div class="'+e.settings.container_class+'"></div>'},_bullets_container_html:function(t){var n=this,r=e('<ol class="'+n.settings.bullets_container_class+'"></ol>');return t.each(function(t,i){var s=e('<li data-orbit-slide-number="'+(t+1)+'" class=""></li>');t===0&&s.addClass(n.settings.bullets_active_class),r.append(s)}),r},_slide_number_html:function(t,n){var r=this,i=e('<div class="'+r.settings.slide_number_class+'"></div>');return i.append("<span>"+t+"</span> of <span>"+n+"</span>"),i},_timer_html:function(){var e=this;return typeof e.settings.timer_speed=="number"&&e.settings.timer_speed>0?'<div class="'+e.settings.timer_container_class+'"><span></span><div class="'+e.settings.timer_progress_class+'"></div></div>':""},_next_html:function(){var e=this;return'<a href="#" class="'+e.settings.next_class+'">Next <span></span></a>'},_prev_html:function(){var e=this;return'<a href="#" class="'+e.settings.prev_class+'">Prev <span></span></a>'},_init:function(t,n){var r=this,i=e(n),s=i.wrap(r._container_html()).parent(),o=i.children();e.extend(!0,r.settings,r.data_options(i)),r.settings.navigation_arrows&&(s.append(r._prev_html()),s.append(r._next_html())),i.addClass(r.settings.slides_container_class),r.settings.stack_on_small&&s.addClass(r.settings.stack_on_small_class),r.settings.slide_number&&s.append(r._slide_number_html(1,o.length)),s.append(r._timer_html()),r.settings.bullets&&s.after(r._bullets_container_html(o)),i.append(o.first().clone().attr("data-orbit-slide","")),i.prepend(o.last().clone().attr("data-orbit-slide","")),i.css("marginLeft","-100%"),o.first().addClass(r.settings.active_slide_class),r._init_events(i),r._init_dimensions(i),r._start_timer(i)},_init_events:function(i){var s=this,o=i.parent();e(t).on("load.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height())),i.trigger("orbit:ready")}).on("resize.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height()))}),e(n).on("click.fndtn.orbit","[data-orbit-link]",function(t){t.preventDefault();var n=e(t.currentTarget).attr("data-orbit-link"),r=i.find("[data-orbit-slide="+n+"]").first();r.length===1&&(s._reset_timer(i,!0),s._goto(i,r.index(),function(){}))}),o.siblings("."+s.settings.bullets_container_class).on("click.fndtn.orbit","[data-orbit-slide-number]",function(t){t.preventDefault(),s._reset_timer(i,!0),s._goto(i,e(t.currentTarget).data("orbit-slide-number"),function(){})}),o.on("orbit:after-slide-change.fndtn.orbit",function(e,t){var n=o.find("."+s.settings.slide_number_class);n.length===1&&n.replaceWith(s._slide_number_html(t.slide_number,t.total_slides))}).on("orbit:next-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.next_class,function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"next",function(){})}).on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.prev_class,function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"prev",function(){})}).on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit","."+s.settings.timer_container_class,function(t){t.preventDefault();var n=e(t.currentTarget).toggleClass(s.settings.timer_paused_class),r=n.closest("."+s.settings.container_class).find("."+s.settings.slides_container_class);n.hasClass(s.settings.timer_paused_class)?s._stop_timer(r):s._start_timer(r)}).on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};o.data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=o.data("swipe-transition");typeof t=="undefined"&&(t={}),t.delta_x=e.touches[0].pageX-t.start_page_x,typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault(),s._stop_timer(i);var n=t.delta_x<0?"next":"prev";t.active=!0,s._goto(i,n,function(){})}}).on("touchend.fndtn.orbit",function(e){o.data("swipe-transition",{}),e.stopPropagation()})},_init_dimensions:function(e){var t=e.parent(),n=e.children();e.css("width",n.length*100+"%"),n.css("width",100/n.length+"%"),e.height(t.height()),e.css("width",n.length*100+"%")},_start_timer:function(e){var t=this,n=e.parent(),r=function(){t._reset_timer(e,!1),t._goto(e,"next",function(){t._start_timer(e)})},i=n.find("."+t.settings.timer_container_class),s=i.find("."+t.settings.timer_progress_class),o=s.width()/i.width(),u=t.settings.timer_speed-o*t.settings.timer_speed;s.animate({width:"100%"},u,"linear",r),e.trigger("orbit:timer-started")},_stop_timer:function(e){var t=this,n=e.parent(),r=n.find("."+t.settings.timer_container_class),i=r.find("."+t.settings.timer_progress_class),s=i.width()/r.width();t._rebuild_timer(n,s*100+"%"),e.trigger("orbit:timer-stopped"),r=n.find("."+t.settings.timer_container_class),r.addClass(t.settings.timer_paused_class)},_reset_timer:function(e,t){var n=this,r=e.parent();n._rebuild_timer(r,"0%");if(typeof t=="boolean"&&t){var i=r.find("."+n.settings.timer_container_class);i.addClass(n.settings.timer_paused_class)}},_rebuild_timer:function(t,n){var r=this,i=t.find("."+r.settings.timer_container_class),s=e(r._timer_html()),o=s.find("."+r.settings.timer_progress_class);if(typeof Zepto=="function")i.remove(),t.append(s),o.css("width",n);else if(typeof jQuery=="function"){var u=i.find("."+r.settings.timer_progress_class);u.css("width",n),u.stop()}},_goto:function(t,n,r){var i=this,s=t.parent(),o=t.children(),u=t.find("."+i.settings.active_slide_class),a=u.index(),f=Foundation.rtl?"marginRight":"marginLeft";if(s.hasClass(i.settings.orbit_transition_class))return!1;n==="prev"?a===0?a=o.length-1:a--:n==="next"?a=(a+1)%o.length:typeof n=="number"&&(a=n%o.length),a===o.length-1&&n==="next"?(t.css(f,"0%"),a=1):a===0&&n==="prev"&&(t.css(f,"-"+(o.length-1)*100+"%"),a=o.length-2),s.addClass(i.settings.orbit_transition_class),u.removeClass(i.settings.active_slide_class),e(o[a]).addClass(i.settings.active_slide_class);var l=s.siblings("."+i.settings.bullets_container_class);l.length===1&&(l.children().removeClass(i.settings.bullets_active_class),e(l.children()[a-1]).addClass(i.settings.bullets_active_class));var c="-"+a*100+"%";t.trigger("orbit:before-slide-change");if(t.css(f)===c)s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r();else{var h={};h[f]=c,t.animate(h,i.settings.animation_speed,"linear",function(){s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r()})}}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.section={name:"section",version:"4.1.3",settings:{deep_linking:!1,one_up:!0,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",active_region_selector:"section.active, .section.active, .active[data-section-region]",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',callback:function(){}},init:function(t,n,r){var i=this;return Foundation.inherit(this,"throttle data_options position_right offset_right"),typeof n=="object"&&e.extend(!0,i.settings,n),typeof n!="string"?(this.set_active_from_hash(),this.events(),!0):this[n].call(this,r)},events:function(){var r=this;e(this.scope).on("click.fndtn.section","[data-section] .title, [data-section] [data-section-title]",function(t){var n=e(this),i=n.closest(r.settings.section_selector);r.toggle_active.call(this,t,r),r.reflow()}),e(t).on("resize.fndtn.section",r.throttle(function(){r.resize.call(this)},30)).on("hashchange",function(){r.settings.toggled||(r.set_active_from_hash(),e(this).trigger("resize"))}).trigger("resize"),e(n).on("click.fndtn.section",function(t){e(t.target).closest(r.settings.title_selector).length<1&&e(r.settings.nav_selector).children(r.settings.region_selector).removeClass("active").attr("style","")})},toggle_active:function(t,n){var r=e(this),n=Foundation.libs.section,i=r.closest(n.settings.region_selector),s=r.siblings(n.settings.content_selector),o=i.parent(),u=e.extend({},n.settings,n.data_options(o)),a=o.children(n.settings.active_region_selector);n.settings.toggled=!0,!u.deep_linking&&s.length>0&&t.preventDefault();if(i.hasClass("active"))(n.small(o)||n.is_vertical_nav(o)||n.is_horizontal_nav(o)||n.is_accordion(o))&&(a[0]!==i[0]||a[0]===i[0]&&!u.one_up)&&i.removeClass("active").attr("style","");else{var a=o.children(n.settings.active_region_selector),f=n.outerHeight(i.children(n.settings.title_selector));if(n.small(o)||u.one_up)n.small(o)?a.attr("style",""):a.attr("style","visibility: hidden; padding-top: "+f+"px;");n.small(o)?i.attr("style",""):i.css("padding-top",f),i.addClass("active"),a.length>0&&a.removeClass("active").attr("style",""),n.is_vertical_tabs(o)&&(s.css("display","block"),a!==null&&a.children(n.settings.content_selector).css("display","none"))}setTimeout(function(){n.settings.toggled=!1},300),u.callback()},resize:function(){var t=Foundation.libs.section,n=e(t.settings.section_selector);n.each(function(){var n=e(this),r=n.children(t.settings.active_region_selector),i=e.extend({},t.settings,t.data_options(n));if(r.length>1)r.not(":first").removeClass("active").attr("style","");else if(r.length<1&&!t.is_vertical_nav(n)&&!t.is_horizontal_nav(n)&&!t.is_accordion(n)){var s=n.children(t.settings.region_selector).first();(i.one_up||!t.small(n))&&s.addClass("active"),t.small(n)?s.attr("style",""):s.css("padding-top",t.outerHeight(s.children(t.settings.title_selector)))}t.small(n)?r.attr("style",""):r.css("padding-top",t.outerHeight(r.children(t.settings.title_selector))),t.position_titles(n),t.is_horizontal_nav(n)&&!t.small(n)||t.is_vertical_tabs(n)?t.position_content(n):t.position_content(n,!1)})},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},set_active_from_hash:function(){var n=t.location.hash.substring(1),r=e("[data-section]"),i=this;r.each(function(){var t=e(this),r=e.extend({},i.settings,i.data_options(t));if(n.length>0&&r.deep_linking){var s=t.children(i.settings.region_selector).attr("style","").removeClass("active");s.map(function(){return e(this).children('.content[data-slug="'+n+'"], [data-section-content][data-slug="'+n+'"]')}).parent().addClass("active")}})},position_titles:function(t,n){var r=this,i=t.children(this.settings.region_selector).map(function(){return e(this).children(r.settings.title_selector)}),s=0,o=0,r=this;typeof n=="boolean"?i.attr("style",""):i.each(function(){r.is_vertical_tabs(t)?(e(this).css("top",o),o+=r.outerHeight(e(this))):(r.rtl?e(this).css("right",s):e(this).css("left",s),s+=r.outerWidth(e(this)))})},position_content:function(t,n){var r=this,i=t.children(r.settings.region_selector),s=i.map(function(){return e(this).children(r.settings.title_selector)}),o=i.map(function(){return e(this).children(r.settings.content_selector)});if(typeof n=="boolean")o.attr("style",""),t.attr("style","");else if(r.is_vertical_tabs(t)&&!r.small(t)){var u=0,a=Number.MAX_VALUE,f=null;i.each(function(){var n=e(this),i=n.children(r.settings.title_selector),s=n.children(r.settings.content_selector),o=0;f=r.outerWidth(i),o=r.outerWidth(t)-f,o<a&&(a=o),u+=r.outerHeight(i),e(this).hasClass("active")||s.css("display","none")}),i.each(function(){var t=e(this).children(r.settings.content_selector);t.css("minHeight",u),t.css("maxWidth",a-2)}),t.css("maxWidth",f+a)}else i.each(function(){var t=e(this),n=t.children(r.settings.title_selector),i=t.children(r.settings.content_selector);r.rtl?i.css({right:r.position_right(n)+1,top:r.outerHeight(n)-2}):i.css({left:n.position().left-1,top:r.outerHeight(n)-2})}),typeof 
Zepto=="function"?t.height(this.outerHeight(s.first())):t.height(this.outerHeight(s.first())-2)},position_right:function(t){var n=this,r=t.closest(this.settings.section_selector),i=r.children(this.settings.region_selector),s=t.closest(this.settings.section_selector).width(),o=i.map(function(){return e(this).children(n.settings.title_selector)}).length;return s-t.position().left-t.width()*(t.index()+1)-o},reflow:function(t){var t=t||n;e(this.settings.section_selector,t).trigger("resize")},small:function(t){var n=e.extend({},this.settings,this.data_options(t));return this.is_horizontal_tabs(t)?!1:t&&this.is_accordion(t)?!0:e("html").hasClass("lt-ie9")?!0:e("html").hasClass("ie8compat")?!0:e(this.scope).width()<768},off:function(){e(this.scope).off(".fndtn.section"),e(t).off(".fndtn.section"),e(n).off(".fndtn.section")}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"4.1.2",settings:{index:0,stickyClass:"sticky",custom_back_text:!0,back_text:"Back",init:!1},init:function(n,r,i){var s=this;return typeof r=="object"&&e.extend(!0,this.settings,r),typeof r!="string"?(e(".top-bar").each(function(){s.settings.$w=e(t),s.settings.$topbar=e(this),s.settings.$section=s.settings.$topbar.find("section"),s.settings.$titlebar=s.settings.$topbar.children("ul").first(),s.settings.$topbar.data("index",0);var n=e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);s.settings.breakPoint=n.width(),n.remove(),s.assemble(),s.settings.$topbar.parent().hasClass("fixed")&&e("body").css("padding-top",s.outerHeight(s.settings.$topbar))}),s.settings.init||this.events(),this.settings.init):this[r].call(this,i)},events:function(){var n=this,r=this.outerHeight(e(".top-bar"));e(this.scope).on("click.fndtn.topbar",".top-bar .toggle-topbar",function(i){var s=e(this).closest(".top-bar"),o=s.find("section, .section"),u=s.children("ul").first();s.data("height")||n.largestUL(),i.preventDefault(),n.breakpoint()&&s.toggleClass("expanded").css("min-height",""),s.hasClass("expanded")?s.parent().hasClass("fixed")&&(s.parent().removeClass("fixed"),s.addClass("fixed"),e("body").css("padding-top","0"),t.scrollTo(0,0)):(n.rtl?(o.css({right:"0%"}),o.find(">.name").css({right:"100%"})):(o.css({left:"0%"}),o.find(">.name").css({left:"100%"})),o.find("li.moved").removeClass("moved"),s.data("index",0),s.hasClass("fixed")&&(s.parent().addClass("fixed"),s.removeClass("fixed"),e("body").css("padding-top",r)))}).on("click.fndtn.topbar",".top-bar .has-dropdown>a",function(t){var r=e(this).closest(".top-bar"),i=r.find("section, .section"),s=r.children("ul").first(),o=e(this).next(".dropdown").outerHeight();(Modernizr.touch||n.breakpoint())&&t.preventDefault();if(n.breakpoint()){var u=e(this),a=u.closest("li");r.data("index",r.data("index")+1),a.addClass("moved"),n.rtl?(i.css({right:-(100*r.data("index"))+"%"}),i.find(">.name").css({right:100*r.data("index")+"%"})):(i.css({left:-(100*r.data("index"))+"%"}),i.find(">.name").css({left:100*r.data("index")+"%"})),e(".top-bar").css("min-height",o),u.siblings("ul").height(r.data("height")+n.outerHeight(s,!0)),r.css("min-height",r.data("height")+n.outerHeight(s,!0)*2)}}),e(t).on("resize.fndtn.topbar",function(){n.breakpoint()||e(".top-bar").css("min-height","").removeClass("expanded")}.bind(this)),e(this.scope).on("click.fndtn",".top-bar .has-dropdown .back",function(t){t.preventDefault();var r=e(this),i=r.closest(".top-bar"),s=i.find("section, .section"),o=r.closest("li.moved"),u=o.parent();i.data("index",i.data("index")-1),n.rtl?(s.css({right:-(100*i.data("index"))+"%"}),s.find(">.name").css({right:100*i.data("index")+"%"})):(s.css({left:-(100*i.data("index"))+"%"}),s.find(">.name").css({left:100*i.data("index")+"%"})),i.data("index")===0&&i.css("min-height",0),setTimeout(function(){o.removeClass("moved")},300)})},breakpoint:function(){return e(t).width()<=this.settings.breakPoint||e("html").hasClass("lt-ie9")},assemble:function(){var t=this;this.settings.$section.detach(),this.settings.$section.find(".has-dropdown>a").each(function(){var n=e(this),r=n.siblings(".dropdown"),i=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');t.settings.custom_back_text==1?i.find("h5>a").html("&laquo; "+t.settings.back_text):i.find("h5>a").html("&laquo; "+n.html()),r.prepend(i)}),this.settings.$section.appendTo(this.settings.$topbar),this.sticky()},largestUL:function(){var t=this.settings.$topbar.find("section ul ul"),n=t.first(),r=0,i=this;t.each(function(){e(this).children("li").length>n.children("li").length&&(n=e(this))}),n.children("li").each(function(){r+=i.outerHeight(e(this),!0)}),this.settings.$topbar.data("height",r)},sticky:function(){var n="."+this.settings.stickyClass;if(e(n).length>0){var r=e(n).length?e(n).offset().top:0,i=e(t),s=this.outerHeight(e(".top-bar"));i.scroll(function(){i.scrollTop()>=r?(e(n).addClass("fixed"),e("body").css("padding-top",s)):i.scrollTop()<r&&(e(n).removeClass("fixed"),e("body").css("padding-top","0"))})}},off:function(){e(this.scope).off(".fndtn.topbar"),e(t).off(".fndtn.topbar")}}}(Foundation.zj,this,this.document);

/***************foundation.min.js ends*****************/

/***************custom.js starts*****************/
// JavaScript Document
var heights = [];
var maxValueInArray;
var storenavSliderOuterHeight;
var sumHeaderAnimatedHeights;
var headeranimationlock = false;
var headerOrgOffset = 0;
var disableheaderscroll = false;
var slider;
var lastTab;
var live_help = live_help || {};

live_help.on = true;
live_help.window_on = function(){
	
$('#lp_link').click(function(event) {
    event.preventDefault();
	
	if(live_help.on){	
    window.open($(this).attr("href"), "popupWindow", "width=450,height=774,scrollbars=no");
	}else{
    window.open($(this).attr("rel"), "popupWindowoff", "width=450,height=350,scrollbars=no");
	}
});
};

live_help.window_off = function(){
$('#lp_link_off').click(function(event) {	
    event.preventDefault();
    window.open($(this).attr("href"), "popupWindowoff", "width=450,height=350,scrollbars=no");
});
};

live_help.call = function(){
$('#lh_call').click(function(event) {	
    event.preventDefault();
    window.open($(this).attr("href"), "popupRequestCall", "width=514,height=780,scrollbars=no");
});
};
live_help.call_received = function(){
$('#lh_call_received').click(function(event) {	
    event.preventDefault();
    window.open($(this).attr("href"), "popupRequestReceived", "width=450,height=350,scrollbars=no");
});
};
live_help.call_not_available = function(){
$('#lh_call_not_available').click(function(event) {	
    event.preventDefault();
    window.open($(this).attr("href"), "popupCallNotAvailable", "width=450,height=380,scrollbars=no");
});
};

live_help.dropdown = function(){
   
	$('.live_help_dd').click(function(){
	$('.lp_chat').addClass('show_options');
        $('.live_help_list').show();
});	

$('.live_help_list').mouseleave(function() {

$('.live_help_list').hide();
$('.lp_chat').removeClass('show_options')	
});
	
$('.live_help_list').mouseenter(function() {
$('.live_help_list').show();
	

});	
	
};


live_help.window_on();
live_help.window_off();
live_help.call();
live_help.call_received(); 
live_help.call_not_available();
live_help.dropdown();

$(document).ready(function(){
	$('.bxslider').bxSlider({
	  minSlides: 6,
	  maxSlides: 7,
	  slideWidth: 103,
	  slideMargin: 20,
      nextSelector: '#slider-next',
      prevSelector: '#slider-prev',
	  nextText: 'More',
	  prevText: 'Prev',
	  pager: false,
	  infiniteLoop: false,
	  hideControlOnEnd: true,
	  useCSS:false,
	  onSlideNext: function(){
    // do funky JS stuff here
    $("#slidemargin").addClass("right");
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
    $("#slidemargin").removeClass("right");
  },

	});


//Calculate SalesTax show function
	$('#calculatesalextaxButton').click(function() {
		$('#calculatesalextaxButton').css("display","none");
		$('.salesTaxCalculation').css("display","block");
	});
	$('#taxApply').click(function() {
		$('.salesTaxCalculation').css("display","none");
		$('#salestaxVal').css("display","block");

	});



});

$(document).ready(function(){

	$('#featuredmobile').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#featured-next',
      prevSelector: '#featured-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  oneToOneTouch: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },

	});

	$('#calloutslider').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#callout-next',
      prevSelector: '#callout-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },
	});	
	
	$('#calloutslider6').bxSlider({
	  minSlides: 2,
	  maxSlides: 2,
	  slidewidth: 250,
      slideMargin: 25,
      nextSelector: '#callout-next',
      prevSelector: '#callout-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
  
  },
  	  onSlidePrev: function(){

  },
	});

	$('#calloutslider1').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#callout1-next',
      prevSelector: '#callout1-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },

	});


	$('#calloutslider3').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#callout3-next',
      prevSelector: '#callout3-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },

	});

	$('#calloutslider4').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#callout4-next',
      prevSelector: '#callout4-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },

	});

	$('#calloutslider5').bxSlider({
	  minSlides: 1,
	  maxSlides: 1,
      slideMargin: 25,
      nextSelector: '#callout5-next',
      prevSelector: '#callout5-prev',
	  nextText: '',
	  prevText: '',
	  pager: false,
	  infiniteLoop: true,
	  hideControlOnEnd: false,
	  onSlideNext: function(){
    // do funky JS stuff here
  },
  	  onSlidePrev: function(){
    // do funky JS stuff here
  },

	});

});

/*$(document).ready(function(){
window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 1000);
});

});
*/

// Search results functions

$(document).ready(function(){

$('.showFilters').click(function() {
	$('#filtersView').slideToggle('slow');
	$(this).toggleClass("open");
	$("span", this).text($(this).hasClass('open') ? 'Hide' : 'Show');
	});

});

$(document).ready(function(){

$('.etr1module').remove();
//$('#navigation ul.main').remove();
$('#myShoppingLinks.removeMyShoppingLinks').remove();

});


//OffShore
$(document).ready(function(){
		$(".rotate").css('display', 'none');
		$("a.btnClose").click(function() {
			$(".popup").parent().addClass("default");
			$(".pdpBannerImage.bannerIMG").addClass("default");
			$(".pdpBannerImage.bannerIMG").removeClass("popup");
			$(".pdpBannerImage.bannerIMG").parent().removeClass("default");
			$(".rotate.popup + ").removeClass("overlay");
			$(".popup").hide(); //Hide it's parent
			$(".pdpBannerImage.bannerIMG").show();
			$(".pdpBannerImage.bannerIMG > .sliderImages").hide();
			$("#full_img").css('display', 'inline-block');
			return false; //stops the link from submiting
		});
		$(".sliderImages > a.btnClose").click(function() {
			$(".thumps li").removeClass("selected");
			$(".thumps li:first-child").addClass("selected");
		});
		$(".thumps li").click(function(){
			$(".pdpBannerImage").removeClass("default");
			$(".pdpBannerImage").addClass("popup");
			$(".bannerIMG.popup").css('display', 'block');
			$(".popup").parent().removeClass("default");
			$(".sliderImages ul li, .sliderImages, .sliderImages ul li img").show();
		});
		$(".thumps li.thumb360").click(function(){
			$(".rotate").removeClass("default");
			$(".rotate").addClass("popup");
			$(".bannerIMG.popup").hide();
			$(".rotate.popup").show();
			$(".rotate.popup + ").addClass("overlay");
			$('#img360').reel("frame",1);
			$(".rotate + .overlay").show();
		});
		$(".rotate a.btnClose").click(function() {
			$("#full_img img").show();
			$(".rotate").removeClass("popup");
			$(".rotate").hide();
			$(".rotate + .overlay").hide();
		});
		$(".positionRelative .thumps li").click(function(){
			$(".pdpBannerImage .bx-viewport, .pdpBannerImage .bx-viewport li").css({"height":"360px","width":"450px"});
		});
});
// Related Products
$(document).ready(function(){
	var pdpBanner=null;
	$('.relatedProducts ul.pdpSlider').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 250,
		slideMargin: 25,
		nextSelector: '#relslider-next',
		prevSelector: '#relslider-prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
		// do funky JS stuff here
		$("#slidemargin").addClass("right");
  	},
		onSlidePrev: function(){
			// do funky JS stuff here
			$("#slidemargin").removeClass("right");
		},
	});

	pdpBanner = $('.pdpBannerImage ul').bxSlider({
		minSlides: 1,
		maxSlides: 1,
		slideWidth: 1200,
		slideMargin: 25,
		nextSelector: '#bannerslider-next',
		prevSelector: '#bannerslider-prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(e,o,n){
		// do funky JS stuff here
		$("#slidemargin").addClass("right");
		highlightThumb(n);
  	},
		onSlidePrev: function(e,o,n){
			// do funky JS stuff here
			$("#slidemargin").removeClass("right");
			highlightThumb(n);
		}
	});
	function highlightThumb(n){
		$('.thumps li').removeClass("selected").eq(n).addClass("selected");
	}

	$('ul.thumps').bxSlider({
		minSlides: 5,
		maxSlides: 5,
		slideWidth: 68,
		slideMargin: 8,
		nextSelector: '#thumslider-next',
		prevSelector: '#thumslider-prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
		// do funky JS stuff here
		$("#slidemargin").addClass("right");
  	},
		onSlidePrev: function(){
			// do funky JS stuff here
			$("#slidemargin").removeClass("right");
		},
	});
	$(document).ready(function() {
		$('#thumslider-next .bx-next').css({"background":"none"});
		$('#thumslider-prev .bx-prev').css({"background":"none"});
		$(".rotate").css('display', 'none');
		$("a.btnClose").click(function() {
			$(".popup").parent().addClass("default");
			$(".pdpBannerImage.bannerIMG").addClass("default");
			$(".pdpBannerImage.bannerIMG").removeClass("popup");
			$(".pdpBannerImage.bannerIMG").parent().removeClass("default");
			$(".rotate.popup + ").removeClass("overlay");
			$(".popup").hide(); //Hide it's parent
			$(".pdpBannerImage.bannerIMG").show();
			$(".pdpBannerImage.bannerIMG > .sliderImages").hide();
			$("#full_img").css('display', 'inline-block');
			return false; //stops the link from submiting
		});
		$(".sliderImages > a.btnClose").click(function() {
			$(".thumps li").removeClass("selected");
			$(".thumps li:first-child").addClass("selected");
		});
		$(".thumps li").click(function(){
			$(".pdpBannerImage").removeClass("default");
			$(".pdpBannerImage").addClass("popup");
			$(".bannerIMG.popup").css('display', 'block');
			$(".popup").parent().removeClass("default");
			$(".sliderImages ul li, .sliderImages, .sliderImages ul li img").show();

		});
		$(".thumps li.thumb360").click(function(){
			$(".rotate").removeClass("default");
			$(".rotate").addClass("popup");
			$(".bannerIMG.popup").hide();
			$(".rotate.popup").show();
			$(".rotate.popup + ").addClass("overlay");
			$('#img360').reel("frame",1);
		});
		$(".thumps2 li").click(function(){
			if(!$(this).hasClass("thumb360"))
			{
				$("#pdpzoomarea .parent .panzoom img").attr("src",$(this).find("a").attr("href"));
				var $pdpzoom = $('#pdpzoomarea .panzoom').panzoom();
				$pdpzoom.panzoom("resetPan",false);
				$pdpzoom.panzoom("resetZoom",false);
			}
			return false;
		});
		$(".rotate a.btnClose").click(function() {
			$("#full_img img").show();
		});
		$(".positionRelative .thumps li").click(function(){
			$(".pdpBannerImage .bx-viewport, .pdpBannerImage .bx-viewport li").css({"height":"360px","width":"450px"});
		});
	});

//hide 360 slider
	$('.rotate').remove();
		$('#sections').hide();

//See all specs link
$('.specLink a').on("click", function( e ){
    $('.tabsUnderlined li a').each(function(index, element) {
		var title= $(this).attr('title');
		if (title == "specs")
		{
			$(this).addClass('active');
		}
		else
		{
			$(this).removeClass('active');
		}
	});
	$('#features').hide();
	$('#specs').show();
	$('#serviceAndSupport').hide();
	$('#accessories').hide();
	$('#osAndApps').hide();
	$('#specialoffertab').hide();
	$('html, body').animate({scrollTop:680}, 'slow');
	return false;
});
$('a.viewallLink').on("click", function( e ){
    $('.tabsUnderlined li a').each(function(index, element) {
		var title= $(this).attr('title');
		if (title == "specs")
		{
			$(this).addClass('active');
		}
		else
		{
			$(this).removeClass('active');
		}
	});
	$('#features').hide();
	$('#specs').show();
	$('#serviceAndSupport').hide();
	$('#accessories').hide();
	$('#osAndApps').hide();
	window.scrollBy(0,-2000);
	return false;
});

$('.seeAllOffers').on("click", function( e ){
    $('.tabsUnderlined li a').each(function(index, element) {
		var title= $(this).attr('title');
		if (title == "specialoffertab")
		{
			$(this).addClass('active');
		}
		else
		{
			$(this).removeClass('active');
		}
	});
	$('#features').hide();
	$('#specs').hide();
	$('#serviceAndSupport').hide();
	$('#accessories').hide();
	$('#osAndApps').hide();
	$('#specialoffertab').show();	
	$('html, body').animate({scrollTop:680}, 'slow');
	return false;

});


$('.cta_view_all_options a').on("click", function( e ){

    $('.tabsUnderlined li a').each(function(index, element) {
		var title= $(this).attr('title');
		if (title == "viewalloption")
		{
			$(this).addClass('active');
		}
		else
		{
			$(this).removeClass('active');
		}

	});
	$('#features').hide();
	$('#specs').hide();
	$('#serviceAndSupport').hide();
	$('#accessories').hide();
	$('#osAndApps').hide();
	
	if(matchMedia("screen and (max-width : 497px)").matches) {}else{		
	var tabsOffset = $("#tabs_mobile").offset().top;
	var tabsHeight = $("#tabs_mobile").outerHeight();
	var calcScroll = (tabsOffset + tabsHeight -50);
	$('#viewalloption').show();
	$('html, body').animate({scrollTop:calcScroll}, 'slow');
	}
	return false;

});



//HomePage
	$('#secondaryFeatured ul').bxSlider({
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 250,
		slideMargin: 25,
		nextSelector: '#relslider-next',
		prevSelector: '#relslider-prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
	},
		onSlidePrev: function(){
		},
	});
	
	$('#accessoriessliderarea ul').bxSlider({
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 250,
		slideMargin: 25,
		nextSelector: '#accessoriesslidernext',
		prevSelector: '#accessoriessliderprev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
	},
		onSlidePrev: function(){
		},
	});

	$('#servicesliderarea ul').bxSlider({
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 250,
		slideMargin: 25,
		nextSelector: '#serviceslidernext',
		prevSelector: '#servicesliderprev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
	},
		onSlidePrev: function(){
		},
	});



	$('#featuredLaptops ul').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 225,
		slideMargin: 25,
		nextSelector: '#next',
		prevSelector: '#prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
  	},
		onSlidePrev: function(){
		},
	});

	$('#featuredTablets ul').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 225,
		slideMargin: 25,
		nextSelector: '#nextArrow',
		prevSelector: '#prevArrow',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
  	},
		onSlidePrev: function(){
		},
	});

	$('#featuredPrinters ul').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 225,
		slideMargin: 25,
		nextSelector: '#nextPrinter',
		prevSelector: '#prevPrinter',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		useCSS:false,
		onSlideNext: function(){
  	},
		onSlidePrev: function(){
		},
	});

	$('.accessoriesSlider.cases ul').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 225,
        slideMargin: 25,
        nextSelector: '#next',
        prevSelector: '#prev',
        nextText: '',
        prevText: '',
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        useCSS:false,
        onSlideNext: function(){
      },
        onSlidePrev: function(){
        },
    });


    $('.accessoriesSlider.storage ul').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 225,
        slideMargin: 25,
        nextSelector: '#nextStorage',
        prevSelector: '#prevStorage',
        nextText: '',
        prevText: '',
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        useCSS:false,
        onSlideNext: function(){
      },
        onSlidePrev: function(){
        },
    });

    $('.accessoriesSlider.headsets ul').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 225,
        slideMargin: 25,
        nextSelector: '#nextHeadsets',
        prevSelector: '#prevHeadsets',
        nextText: '',
        prevText: '',
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        useCSS:false,
        onSlideNext: function(){
      },
        onSlidePrev: function(){
        },
    });

    $('.accessoriesSlider.specialty ul').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 225,
        slideMargin: 25,
        nextSelector: '#nextSpecialty',
        prevSelector: '#prevSpecialty',
        nextText: '',
        prevText: '',
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        useCSS:false,
        onSlideNext: function(){
      },
        onSlidePrev: function(){
        },
    });

	//Browse by Category Icons Slider
	var initialized = false;
	function initCategorySliders() {
		if(!initialized) {
			$('.categoryList').bxSlider({
				minSlides: 6,
				maxSlides: 6,
				slideWidth: 120,
				slideMargin: 40,
				nextSelector: '#browse-next',
				prevSelector: '#browse-prev',
				nextText: '',
				prevText: '',
				pager: false,
				infiniteLoop: false,
				hideControlOnEnd: true,
				useCSS:false,
				onSlideNext: function(){
				// do funky JS stuff here
			},

				onSlidePrev: function(){
					// do funky JS stuff here
				},
			});
		}
		if(!initialized) {
			initialized = true;
		}
	}

	$('.da-slider ul').bxSlider({
		minSlides: 1,
		maxSlides: 1,
		slideMargin: 0,
		nextSelector: '#category-next',
		prevSelector: '#category-prev',
		nextText: '',
		prevText: '',
		pager: false,
		infiniteLoop: true,
		hideControlOnEnd: false,
		useCSS:false,
		onSlideNext: function(){
		// do funky JS stuff here
		$("#slidemargin").addClass("right");
  	},
		onSlidePrev: function(){
			// do funky JS stuff here
			$("#slidemargin").removeClass("right");
		},
	});


	/* Main Image show and hide */
	$('.tab2').click(function() {
		$('#specs').hasClass('tab2');
		$('.items').hide();
	});
	$('.tab3').click(function() {
		$('#specs').hasClass('tab3');
		$('.items').hide();
	});
	$('.tab4').click(function() {
		$('#specs').hasClass('tab4');
		$('.items').hide();
	});
	$('.tab5').click(function() {
		$('#specs').hasClass('tab5');
		$('.items').hide();
	});

	$('.tab1').click(function() {
		$('.items').show();
	});
	$('.heroTabs li, .thumps li').click(function() {
		$(".zoomContainer").hide();
	});

	$('.heroTabs li:first-child').click(function() {
		$(".zoomContainer").show();
	});

	

	/* Tabs show and hide */	
	$('.cta_view_all_options').click(function() {
		
		$('.tabsUnderlined li a, .heroTabs li a').removeClass('active')
		$('#vao').addClass('active');
		$('#features').hide();
		$('#specs').hide();
		$('#serviceAndSupport').hide();
		$('#accessories').hide();
		$('#osAndApps').hide();
		$('#viewalloption').show();
		$('#thumbSlider2').hide();
		
	});


	/* Tabs show and hide */
	$('.tabsUnderlined li a, .heroTabs li a').click(function() {
		var sId = $(this).attr('title');
		$('.tabsUnderlined li a, .heroTabs li a').removeClass('active')
		$(this).addClass('active');
		$('#features').hide();
		$('#specs').hide();
		$('#serviceAndSupport').hide();
		$('#accessories').hide();
		$('#osAndApps').hide();
		$('#viewalloption').hide();
		$('#specialoffertab').hide();
		$('#'+sId).show();
		if(sId == 'accessories') {
			initCategorySliders();
		}
	});

	//Browse by category image hover
	$('.categoryList li a').hover(function() {
		getSrc = $(this).find('img').attr('src');
		if(!$(this).hasClass('selected')) {
			var newSrc = getSrc.replace('active', 'hover');
			var srcAttr = $(this).find('img').attr('src').replace('active', 'hover');
			$(this).find('img').attr("src", newSrc);
		}
	},function() {
			$(this).find('img').attr("src", getSrc);
	});


	//Browse by category image hover
	$('.exploreCategory li a').on('click',function(event) {
		event.preventDefault();
		getId = $(this).attr('href');
		if(!$(this).hasClass('active')) {
			$('.exploreCategory li a').removeClass('active');
			$(this).addClass('active');
			$('.tab').removeClass('open');
			$(getId).addClass('open');
		}
	});


	/* PDP Banner Image Transit */
	$('.thumps li a').on('click',function(event) {
		event.preventDefault();
		//get href attribute
		var srcImage = $(this).attr('href');
		var idx = $(this).parent().index();
		if(srcImage != '360') {
			$('.bannerIMG img').css('display','block');
			$('.rotate').css('display','none');
			//$('.bannerIMG img').attr('src',srcImage);
			$('.thumps li').removeClass('selected');
			$(this).parent('li').addClass('selected');
			setTimeout(function(){
				pdpBanner.goToSlide(idx);
			}, 500);

		}
		else {
			$('.rotate').css('display','block');
			$('.thumps li').removeClass('selected');
			$(this).parent('li').addClass('selected');
		}
	});

});


function hidealldivs() {
	$('#div_1').hide();
	$('#div_2').hide();
	$('#div_3').hide();
	$('#div_4').hide();
	$('#div_5').hide();
	$('#link1').removeClass('active');
	$('#link2').removeClass('active');
	$('#link3').removeClass('active');
	$('#link4').removeClass('active');
	$('#link5').removeClass('active');
	}
	function showdiv(divid,linkid)
	{
	$('#'+divid).show();
	$('#'+linkid).addClass('active');
}
function hidealltabs() {
	$('#byCategory').hide();
	$('#byBrand').hide();
	$('#byUse').hide();
	$('#active1').removeClass('active');
	$('#active2').removeClass('active');
	$('#active3').removeClass('active');
	}
	function showtab(divid,linkid)
	{
	$('#'+divid).show();
	$('#'+linkid).addClass('active');
}


$(document).ready(function(){
	$('#div_1').show();
	$('#link1').addClass('active');
});
$(document).ready(function(){
	$('.linkforswitch a').on('click',function(event){
		event.preventDefault();
		var scenarioID = $(this).attr('href');
		$('.multipleScenarios').removeClass('open');
		$(scenarioID).addClass('open');
	});

	$('.linkforswitch2 a').on('click',function(event){
		event.preventDefault();
		var scenarioID = $(this).attr('href');
		$('.multipleScenarios2').removeClass('open');
		$(scenarioID).addClass('open');
	});

	$('.cart').on('click',function(event){
		event.preventDefault();
		$('#itemsoncart').css('display','block');
	});

	$('#itemsoncart a.close').on('click',function(event){
		$('#itemsoncart').css('display','none');
	});

	$('#popupblockexit a.popupclose').on('click',function(event){
		$('#popupblockexit').css('display','none');
	});

	$('#popupblockenter a.popupclose').on('click',function(event){
		$('#popupblockenter').css('display','none');
	});

	$('.warningarea .linkforswitch3 #twowarnings').click(function() {
		$('.warningarea .warningdetailarea').css("display","block");
		$('.warningarea .warningdetailarea .alertbox').css("display","block");
	});

	$('.warningarea .linkforswitch3 #onewarning').click(function() {
		$('.warningarea .warningdetailarea').css("display","block");
		$('.warningarea .warningdetailarea .alertbox').css("display","none");
		$('.warningarea .warningdetailarea .alertbox:first').css("display","block");
	});

	$('.warningarea .linkforswitch3 #nowarning').click(function() {
		$('.warningarea .warningdetailarea').css("display","none");
		$('.warningarea .warningdetailarea .alertbox').css("display","none");
	});

	$('#itemsoncart #minicartOutfstock .items .outofstock .outofstocklinkarea').click(function() {
		$(this).css("display","none");
		$(this).siblings('#outofstockemailarea').css("display","block");
	});

	$('#cart #outofstock .outofstocklink').click(function() {
		$(this).css("display","none");
		$(this).siblings('#outofstockemailarea').css("display","block");
	});
	/* item on cart */
	$('.subtotal').on('click',function(event){

		$('.cartBlock').css('display','block');
	});

	$('.cartBlock').on('click',function(event){
		event.preventDefault();
		$('.itemsoncart').css('display','block');
	});




	$('.warningdetailarea .alertbox.warningforprice .popupclose').on('click',function(event){
		$('.alertbox.warningforprice').css('display','none');
	});
	$('.warningdetailarea .alertbox.warningforquantity .popupclose').on('click',function(event){
		$('.alertbox.warningforquantity').css('display','none');
	});





});

/* popup close button function*/



/*function getCurrentID(currentClass)
{
	// alert($(currentClass).attr("id"));
	var cid=$(currentClass).attr("id");
	alert(cid);
	var select=''.warningdetailarea .alertbox.'+cid+' .popupclose'';
	alert(select);
	$(select).on('click',function(event){
		alert('hi');
		$(select).css('display','none');
	});

}*/
function hide(obj) {

    var el = document.getElementById(obj);

        el.style.display = 'none';

}
function hideForUnavailabilty(obj,orderId,catentDeletedName2) {
	var params = [];

	params["orderId"] = orderId;
	params["catentDeletedName2"]=catentDeletedName2;
	//alert("orderId"+orderId);
	wc.service.invoke("AjaxCatentryUnavailabilitychk", params);
    var el = document.getElementById(obj);

        el.style.display = 'none';


}



/* items on cart  close button function*/
function closebut(){
	$('#itemsoncart').hide();
}

/* Cart count hiding function*/
function hideCartCount(){
	$('.cartcount').hide();
}

/* go to cart */
function gotocart(url){
	window.location.href=url;
}


// Storenav

$(document).ready(function(){
	
	var previous_clientWidth=document.documentElement.clientWidth;
	//var oneTime = false;
	$(window).resize(function() {
		
		if ((document.documentElement.clientWidth < 1008) && (previous_clientWidth >= 1008)) { 
		if (!$('#storenav').hasClass('minified')){	
			$('.header-container').stop().animate({
				height: 101 + maxValueInArray + 5 // flagh
			}, 600);
		}else if ($('#storenav').hasClass('minified')){
			$(".header-container").animate({height:17 + maxValueInArray + 5},600);		//flagh	
			}
		}
		
		if ((document.documentElement.clientWidth > 1008) && (previous_clientWidth <= 1008)) {
		if (!$('#storenav').hasClass('minified')){	
			$('.header-container').stop().animate({
				height: 99 + maxValueInArray + 5 // flagh
			}, 600);
		}else if ($('#storenav').hasClass('minified')){
			$(".header-container").animate({height:15 + maxValueInArray + 5},600);		 //flagh	
			}
		}		
				
		previous_clientWidth = document.documentElement.clientWidth;
		//oneTime= true;
		});
	
		
	var slider = $('#storenav ul').bxSlider({
	  minSlides: 7,
	  maxSlides: 7,
	  slideWidth: 100,
	  slideMargin: 28,
		controls: false,
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		onSliderLoad: function(){
				
				$('.loginStorenavGroup').addClass('loadedState');
				
				
					// EXPAND SECTION
					var time = 500;
					setTimeout(function() {
							 // First animation
							 expandSlide();
					
					},time);
					
						function expandSlide() {
						
					var bow = $(window).width();	
					var bowi = parseInt(bow);
					var breakpoint = [767, 1024];		
					var collapsedHeight1024 = 17;//139 -128  flagh
					var collapsedHeight1024up = 15; 	// -155	flagh
setTimeout(function(){
       if (slider.getSlideCount() <= 7) {
               $('#storenav .nextcolumn').css("display", "none");
       }
       else {
               $('#storenav .nextcolumn').css("display", "block");
       }
$('#storeSlider').css({"top":"0", "height":"auto"});

});

						
					if($(window).width() > breakpoint[0]){

	afterloading = setTimeout(function(){
		
		$('#storenav ul li').each( function(i) {
		$(this).addClass('storenav-item-'+i);
	})

	var heights=[];	
					
	$('#storenav .caption').each( function() {
		heights.push($(this).height());
	});

		maxValueInArray = Math.max.apply(Math, heights);
		collapsedHeight1024 += maxValueInArray + 5;					
		collapsedHeight1024up += maxValueInArray + 5;				

					if ($('#storenav').hasClass('collapsedStart')) {
						if ((bowi < breakpoint[1])){
						//$('#storenav').stop().animate({width:'90%'},600);
						//$('#storenav.minified .slidercolumn').stop().animate({width:'87%'},600);
						$(".header-container").animate({height:collapsedHeight1024},600);
						} else if ((bowi > breakpoint[1])) {
							$(".header-container").animate({height:collapsedHeight1024up},600);
							}
                    }
					//  Animate height as per its breakpoint if is not collapsed

		$('#storenav .caption').css('height', maxValueInArray);
							
						if (!$('#storenav').hasClass('collapsedStart')){
							
							if ((bowi > breakpoint[0]) && (bowi < breakpoint[1])) {		
									$('.header-container').stop().animate({
										height: 101 + maxValueInArray + 5//218 it was 208  flagh
								}, 600);
								} else if ((bowi > breakpoint[1])) {
									$('.header-container').stop().animate({
										height: 99 + maxValueInArray + 5 // flagh
									}, 600);		
								}
								

						}
						},30);//end afterloading timeout
					}
				
					//$('.nextcolumn').slideDown(400);	
					$('.topmenu ul.right, #storenav ul').slideDown('slow', function(){
						
						
						$('.header-container').addClass('totalHeight');
						
						if ($('#storenav').hasClass('collapsedStart')) {
							$('.header-container').addClass('collapsedHeader');
						}
						
					});
				
/*					$( '.slidercolumn p.caption' ).each(function () {
					var $span = $( this ).wrapInner( '<span>' ).children( 'span' );
					$( this ).css( 'width', $span.width() );
					$span.replaceWith( $span.contents() );
					});*/
					
				//$('.nextcolumn').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
				//$('.topmenu, .nextcolumn').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);
				$('#storenav').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
				
				}},


			onSlideNext: function(){
			if(((slider.getCurrentSlide() + 1) *7)  >= slider.getSlideCount())
			{
				$('#storenav .nextcolumn').css("display","none");
				onSlideMore();
			}
			$('#storenav .slidercolumn').css("margin-left","0em");
			$('#storenav .prevcolumn').css("display","block");
  	},
		onSlidePrev: function(){
			if(slider.getCurrentSlide() == 0)
			{
				$('#storenav .prevcolumn').css("display","none");
				//$('#storenav .slidercolumn').css("margin-left","15px");
				onSlideMore();

			}
			$('#storenav .nextcolumn').css("display","block");
		},
	});

	function onSlideMore () {
				$('#storenav .caption').css("visibility","hidden");
				$('#storenav .caption').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 3000);
	};


	$('#storenav #prev').click(function(){
    slider.goToPrevSlide();
    return false;
  });

	$('#storenav #next').click(function(){
    slider.goToNextSlide();
    return false;
  });


  
/*	$( '.slidercolumn p.caption' ).each(function () {
    var $span = $( this ).wrapInner( '<span>' ).children( 'span' );
    $( this ).css( 'width', $span.width() );
    $span.replaceWith( $span.contents() );
});*/ 


	
});

$(document).ready(function() {
	
	// Events
	
	
	// Storenav Scroll up   //Remove this effect
/*	$('#navigation').waypoint(function(direction) {
	var dir = direction;
	
	if (direction == "up"){
		expandstorenav ();
		};
	});
*/	

/*changedby Michelle*/
	// Storenav Mouse enter expand

	$(document).on('mouseenter', '.minified .caption', function() {
		expandstorenav ();
		}).on("mouseleave", function() {
		//	
	});
	

	// Expand
	function expandstorenav () {
	
	var bow = $(window).width();	
	var bowi = parseInt(bow);
	var breakpoint = [767, 1024];
	var collapsedHeight = 139; 		
		
			if ((bowi > breakpoint[0]) && (bowi < breakpoint[1])) {
			//$('#storenav').stop().animate({width:'100%'},600);
			//$('#storenav .slidercolumn').stop().animate({width:'96.5%'},600);
			}
			
			$('#storenav').removeClass('minified');
			$('.sliderImgContainer').stop().animate({
					height:'80px'
				},600);
			$('#storenav .nextcolumn, #storenav .prevcolumn').stop().animate({
                height:'105px'
            },600);
			//

				if ((bowi > breakpoint[0]) && (bowi < breakpoint[1])) {		
					$('.header-container').stop().animate({
						height: 79 + maxValueInArray + 5 // flagh
					}, 600);
				} else if ((bowi > breakpoint[1])) {
					$('.header-container').stop().animate({
						height: 79 + maxValueInArray + 5 // flagh
					}, 600);
				}
	
			//
			$('#storenav .bx-wrapper').stop().animate({
                height:'109px'
            },600);
			
	};
	

	
});


$(document).ready(function(){
	$(".paymentDetails a.expand").on('click',function(event) {
	    event.preventDefault();
		$("a.expand").toggleClass('collapse');
		$(".userOrderDetails").toggleClass('expandDetails');
	});
	$("#detect-browser-dialog a.btnCloseBrowserDetect").on('click',function(event) {
	    event.preventDefault();
	    $("#detect-browser-dialog").hide().css({opacity: 0, visibility: "hidden"});
	    $(".reveal-modal-bg").css("display","none");
	});
	
	$(".expirydateinputarea #customDropdown_month + .custom.dropdown").attr("tabindex","2");
	$(".expirydateinputarea #customDropdown_year + .custom.dropdown").attr("tabindex","3");
	$(".billingaddressarea .statearea #customDropdown1 + .custom.dropdown").attr("tabindex","14");
	$(".shippingaddressarea.addressinput .statearea #customDropdown + .custom.dropdown").attr("tabindex","10");
	

});

function toggleDelDetails(divId){
	if($("#deliveryDetails_"+divId).css("display")=="block"){
		$("#deliveryDetails_"+divId).css("display","none");
	}
	else {
		$("#deliveryDetails_"+divId).css("display","block");
	}

}

/*Model Attached Slider arrow hide/show*/
$(document).ready(function(){
var test = $(".slider li").size();
if(test==3)/*Number of <li> present*/
{
	$(".nextarrow").css('display', 'none');
	$(".prevarrow").css('display', 'none');
}
	else
{
	$(".nextarrow").css('display', 'block');
	$(".prevarrow").css('display', 'block');
}
});



/*Home Page Banner Slider arrow hide/show*/
$(document).ready(function(){
var test1 = $(".heroSlider li").size();

if(test1==3)/*Number of <li> present*/
{
	$(".orbit-prev").css('display', 'none');
	$(".orbit-next").css('display', 'none');
}
	else
{
	$(".orbit-prev").css('display', 'block');
	$(".orbit-next").css('display', 'block');
}
});
$(document).ready(function(){
	
findBrackets();	

function findBrackets() {
	$('h1, h2, h3, h4, p').each(
		function (){
			$(this).html($(this).html().replace(/\[[^\)]*?\]/g, '<sup class="brackets_highlight">$&</sup>'));
		}
	);	
}

});

$(document).ready(function(){
	
	ul_thumps2_slider = $('ul.thumps2').bxSlider({
		minSlides: 3,
		maxSlides: 5,
		slideWidth: 68,
		slideMargin: 8,
		nextSelector: '#thumslider2-next',
		prevSelector: '#thumslider2-prev',
		infiniteLoop: false,
		pager: false,
		hideControlOnEnd: true,
		onSliderLoad: function(){
		$('#attach_to_overlay_after_loading, .rotate').appendTo('#pdpzoomarea');	
		}

	});	

	$('#featured_image_pager li.thumb360').click(function(){
		$('#pdpzoomarea').addClass('showing360');
		$('.thumps2 li').removeClass('selected');
		$('.thumps2 li.thumb360').addClass('selected');
		$('.rotate').show();
		$('#img360').reel("frame",1);
	});
	
	$(".thumps2 li").click(function(){
		if(!$(this).hasClass("thumb360"))
		{	
			$('#pdpzoomarea').removeClass('showing360');		
			$("#pdpzoomarea .parent .panzoom img").attr("src",$(this).find("a").attr("href"));
			var $pdpzoom = $('#pdpzoomarea .panzoom').panzoom({
  minScale: 2
});
			$pdpzoom.panzoom("resetPan",false);
			$pdpzoom.panzoom("resetZoom",false);
		}else{
			$('#pdpzoomarea').addClass('showing360');
			}
		return false;
	});		

	$('.thumps2 li a').on('click',function(event) {
		event.preventDefault();
		//get href attribute
		var srcImage = $(this).attr('href');
		var idx = $(this).parent().index();
		if(srcImage != '360') {
			$('.bannerIMG img').css('display','block');
			$('.rotate').css('display','none');
			//$('.bannerIMG img').attr('src',srcImage);
			$('.thumps2 li').removeClass('selected');
			$(this).parent('li').addClass('selected');
			setTimeout (function(){
				pdp_featured_image_slider.goToSlide(idx);
			}, 500);
		}
		else {
			$('.thumps2 li').removeClass('selected');
			$(this).parent('li').addClass('selected');
						setTimeout (function(){
				pdp_featured_image_slider.goToSlide(idx);
			}, 500);
			
			$('.bannerIMG img').css('display','none');
			$('.rotate').css('display','block');
		}
	});	
	
	pdp_featured_image_slider = $('.pdp_featured_image').bxSlider({
	  pagerCustom: '#featured_image_pager',
	  mode: 'fade',
	  controls: false,
	
	});
	
	
	$('.sub-slider').bxSlider({
			minSlides: 3,
			maxSlides: 5,
			slideWidth: 68,
			slideMargin: 8,
			infiniteLoop: false,
			hideControlOnEnd: true,
			pager: false,
			nextSelector: '#pager-next',
			prevSelector: '#pager-prev',
			
			
	});

	$('.topmenu ul li').click(function(){		
		$('.pop_drk:visible').click();
	});	
		
	
	$('.featured_image_container').click(function(){
	ul_thumps2_slider.reloadSlider();	
	});
	
});
// Storenav

//$(document).ready(function(){
	
	function category_slider_global(){			
	slider = $('#storenav ul').bxSlider({
	  minSlides: 7,
	  maxSlides: 7,
	  slideWidth: 100,
	  slideMargin: 28,
		controls: false,
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		onSliderLoad: function(){
				
				$('.loginStorenavGroup').addClass('loadedState');
				
				
				
					// EXPAND SECTION
					var time = 500;
					setTimeout(function() {
							 // First animation
							 expandSlide();
					
					},time);
					
						function expandSlide() {
						
					var bow = $(window).width();	
					var bowi = parseInt(bow);
					var breakpoint = [767, 1024];		
					//var collapsedHeight1024 = 17;//139 -128  flagh
					//var collapsedHeight1024up = 15; 	// -155	flagh
						
					if($(window).width() > breakpoint[0]){

	afterloading = setTimeout(function(){
								
	$('#storenav ul li').each( function(i) {
		$(this).addClass('storenav-item-'+i);
	})
						
	$('#storenav .caption').each( function() {
		heights.push($(this).height());
	});
		maxValueInArray = Math.max.apply(Math, heights);
		storenavSliderOuterHeight = $('.sliderImgContainer').outerHeight();
		sumHeaderAnimatedHeights = maxValueInArray + storenavSliderOuterHeight;

					if ($('#storenav').hasClass('collapsedStart')) {
						if ((bowi < breakpoint[1])){
						$(".header-container").animate({height:sumHeaderAnimatedHeights},600);
						} else if ((bowi > breakpoint[1])) {
							$(".header-container").animate({height:sumHeaderAnimatedHeights},600);
							}
                    }
					//  Animate height as per its breakpoint if is not collapsed

		$('#storenav .caption').css('height', maxValueInArray);
							
						if (!$('#storenav').hasClass('collapsedStart')){
							
							if ((bowi > breakpoint[0]) && (bowi < breakpoint[1])) {		
									$('.header-container').stop().animate({
										height: storenavSliderOuterHeight + maxValueInArray + 4//  flagh
								}, 600);
								} else if ((bowi > breakpoint[1])) {
									$('.header-container').stop().animate({
										height: storenavSliderOuterHeight + maxValueInArray + 4 // flagh
									}, 600);		
								}
								

						}
						},30);//end afterloading timeout
					}
				
					//$('.nextcolumn').slideDown(400);	
					$('#storenav ul').slideDown('slow', function(){
						
						
						$('.header-container').addClass('totalHeight');
						
						if ($('#storenav').hasClass('collapsedStart')) {
							$('.header-container').addClass('collapsedHeader');
						}
						
					});
				
/*					$( '.slidercolumn p.caption' ).each(function () {
					var $span = $( this ).wrapInner( '<span>' ).children( 'span' );
					$( this ).css( 'width', $span.width() );
					$span.replaceWith( $span.contents() );
					});*/
					
				//$('.nextcolumn').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
				//$('.topmenu, .nextcolumn').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);
				$('#storenav').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
				if(slider.getSlideCount() <= 7){
					$('#storenav .nextcolumn').css("display","none");
				}
				else{ $('#storenav .nextcolumn').css("display","block"); }
				}
				},		
			onSlideNext: function(){
			if(((slider.getCurrentSlide() + 1) *7)  >= slider.getSlideCount())
			{
				$('#storenav .nextcolumn').css("display","none");
				onSlideMore();
			}
			$('#storenav .slidercolumn').css("margin-left","0em");
			$('#storenav .prevcolumn').css("display","block");
  	},
		onSlidePrev: function(){
			if(slider.getCurrentSlide() == 0)
			{
				$('#storenav .prevcolumn').css("display","none");
				//$('#storenav .slidercolumn').css("margin-left","15px");
				onSlideMore();

			}
			$('#storenav .nextcolumn').css("display","block");
		},
	});
	return slider;
	}
	
	
    $(document).ready(function(){
        $(".carepackproductseries").change(function(){
            $( ".carepackproductseries option:selected").each(function(){
				
				if($(this).attr("value")==0){
                    $( "#carepackbtn" ).addClass( "" );
                }
                else{
                    $( "#carepackbtn" ).addClass( "bluebuttonarea" );
                }
				
               
                
            });
        }).change();
    });

	function onSlideMore () {
				$('#storenav .caption').css("visibility","hidden");
				$('#storenav .caption').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 3000);
	};
	
	
	
   	
//});



/*MDP Slider arrow hide/show*/
$(document).ready(function(){
var test = $("#model_attached .categorySlider li").size();
if(test==3)/*Number of <li> present*/
{
	$(".orbit-prev").css('display', 'none');
	$(".orbit-next").css('display', 'none');
}
	else
{
$(".orbit-prev").css('display', 'block');
	$(".orbit-next").css('display', 'block');
}
/* Tooltip list - Offshore */
	$(".seealloffertooltiparea .tooltip ul > li").each(function(){
		if($(this).html() == "" || typeof($(this).html())=="undefined"){
   			$(this).remove();
		}
	});
/* Tooltip list - Offshore */
});


/*Category Slider arrow hide/show*/
$(document).ready(function(){
var test = $(".categorySlider li").size();
if(test==3)/*Number of <li> present*/
{
	$(".orbit-prev").css('display', 'none');
	$(".orbit-next").css('display', 'none');
}
	else
{
	$(".orbit-prev").css('display', 'block');
	$(".orbit-next").css('display', 'block');
}
});
	
	/*Hero banner Slider arrow hide/show*/	
$(document).ready(function(){
var testnew = $(".heroSlider li").size();
if(testnew==3)/*Number of <li> present*/
{
	$(".orbit-prev").css('display', 'none');
	$(".orbit-next").css('display', 'none');
}
	else
{
	$(".orbit-prev").css('display', 'block');
	$(".orbit-next").css('display', 'block');
}
});
/***************custom.js ends*****************/

/***************foundation.orbit.js starts*****************/
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '4.1.0',

    settings: {
      timer_speed: 0,
      animation_speed: 500,
      bullets: true,
      stack_on_small: true,
      navigation_arrows: true,
      slide_number: false,
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning'
    },

    init: function (scope, method, options) {
      var self = this;
      Foundation.inherit(self, 'data_options');

      if (typeof method === 'object') {
        $.extend(true, self.settings, method);
      }

      $('[data-orbit]', scope).each(function(idx, el) {
        var scoped_self = $.extend(true, {}, self);
        scoped_self._init(idx, el);
      });
    },

    _container_html: function() {
      var self = this;
      return '<div class="' + self.settings.container_class + '"></div>';
    },

    _bullets_container_html: function($slides) {
      var self = this,
          $list = $('<ol class="' + self.settings.bullets_container_class + '"></ol>');
      $slides.each(function(idx, slide) {
        var $item = $('<li data-orbit-slide-number="' + (idx+1) + '" class=""></li>');
        if (idx === 0) {
          $item.addClass(self.settings.bullets_active_class);
        }
        $list.append($item);
      });
      return $list;
    },

    _slide_number_html: function(slide_number, total_slides) {
      var self = this,
          $container = $('<div class="' + self.settings.slide_number_class + '"></div>');
      $container.append('<span>' + slide_number + '</span> of <span>' + total_slides + '</span>');
      return $container;
    },

    _timer_html: function() {
      var self = this;
      if (typeof self.settings.timer_speed === 'number' && self.settings.timer_speed > 0) {
        return '<div class="' + self.settings.timer_container_class
          + '"><span></span><div class="' + self.settings.timer_progress_class
          + '"></div></div>';
      } else {
        return '';
      }
    },

    _next_html: function() {
      var self = this;
      return '<a href="#" class="' + self.settings.next_class + '">Next <span></span></a>';
    },

    _prev_html: function() {
      var self = this;
      return '<a href="#" class="' + self.settings.prev_class + '">Prev <span></span></a>';
    },

    _init: function (idx, slider) {
      var self = this,
          $slides_container = $(slider),
          $container = $slides_container.wrap(self._container_html()).parent(),
          $slides = $slides_container.children();
      
      $.extend(true, self.settings, self.data_options($slides_container));

      if (self.settings.navigation_arrows) {
          $container.append(self._prev_html());
          $container.append(self._next_html());
      }
      $slides_container.addClass(self.settings.slides_container_class);
      if (self.settings.stack_on_small) {
        $container.addClass(self.settings.stack_on_small_class);
      }
      if (self.settings.slide_number) {
        $container.append(self._slide_number_html(1, $slides.length));
      }
      $container.append(self._timer_html());
      if (self.settings.bullets) {
        $container.after(self._bullets_container_html($slides));
      }
      // To better support the "sliding" effect it's easier
      // if we just clone the first and last slides
      $slides_container.append($slides.first().clone().attr('data-orbit-slide',''));
      $slides_container.prepend($slides.last().clone().attr('data-orbit-slide',''));
      // Make the first "real" slide active
      $slides_container.css('marginLeft', '-100%');
      $slides.first().addClass(self.settings.active_slide_class);

      self._init_events($slides_container);
      self._init_dimensions($slides_container);
      self._start_timer($slides_container);
    },

    _init_events: function ($slides_container) {
      var self = this,
          $container = $slides_container.parent();

      $(window)
        .on('load.fndtn.orbit', function() {
          $slides_container.height('');
          $slides_container.height($slides_container.height($container.height()));
          $slides_container.trigger('orbit:ready');
        })
        .on('resize.fndtn.orbit', function() {
          $slides_container.height('');
          $slides_container.height($slides_container.height($container.height()));
        });

      $(document).on('click.fndtn.orbit', '[data-orbit-link]', function(e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr('data-orbit-link'),
            $slide = $slides_container.find('[data-orbit-slide=' + id + ']').first();

        if ($slide.length === 1) {
          self._reset_timer($slides_container, true);
          self._goto($slides_container, $slide.index(), function() {});
        }
      });

      $container.siblings('.' + self.settings.bullets_container_class)
        .on('click.fndtn.orbit', '[data-orbit-slide-number]', function(e) {
          e.preventDefault();
          self._reset_timer($slides_container, true);
          self._goto($slides_container, $(e.currentTarget).data('orbit-slide-number'),function() {});
        });

      $container
        .on('orbit:after-slide-change.fndtn.orbit', function(e, orbit) {
          var $slide_number = $container.find('.' + self.settings.slide_number_class);

          if ($slide_number.length === 1) {
            $slide_number.replaceWith(self._slide_number_html(orbit.slide_number, orbit.total_slides));
          }
        })
        .on('orbit:next-slide.fndtn.orbit click.fndtn.orbit', '.' + self.settings.next_class, function(e) {
          e.preventDefault();
          self._reset_timer($slides_container, true);
          self._goto($slides_container, 'next', function() {});
        })
        .on('orbit:prev-slide.fndtn.orbit click.fndtn.orbit', '.' + self.settings.prev_class, function(e) {
          e.preventDefault();
          self._reset_timer($slides_container, true);
          self._goto($slides_container, 'prev', function() {});
        })
        .on('orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit', '.' + self.settings.timer_container_class, function(e) {
          e.preventDefault();
          var $timer = $(e.currentTarget).toggleClass(self.settings.timer_paused_class),
              $slides_container = $timer.closest('.' + self.settings.container_class)
                .find('.' + self.settings.slides_container_class);

          if ($timer.hasClass(self.settings.timer_paused_class)) {
            self._stop_timer($slides_container);
          } else {
            self._start_timer($slides_container);
          }
        })
        .on('touchstart.fndtn.orbit', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          var data = {
            start_page_x: e.touches[0].pageX,
            start_page_y: e.touches[0].pageY,
            start_time: (new Date()).getTime(),
            delta_x: 0,
            is_scrolling: undefined
          };
          $container.data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.orbit', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = $container.data('swipe-transition');
          if (typeof data === 'undefined') {
            data = {};
          }

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            self._stop_timer($slides_container);
            var direction = (data.delta_x < 0) ? 'next' : 'prev';
            data.active = true;
            self._goto($slides_container, direction, function() {});
          }
        })
        .on('touchend.fndtn.orbit', function(e) {
          $container.data('swipe-transition', {});
          e.stopPropagation();
        });
    },

    _init_dimensions: function ($slides_container) {
      var $container = $slides_container.parent(),
          $slides = $slides_container.children();

      $slides_container.css('width', $slides.length * 100 + '%');
      $slides.css('width', 100 / $slides.length + '%');
      $slides_container.height($container.height());
      $slides_container.css('width', $slides.length * 100 + '%');
    },

    _start_timer: function ($slides_container) {
      var self = this,
          $container = $slides_container.parent();

      var callback = function() {
        self._reset_timer($slides_container, false);
        self._goto($slides_container, 'next', function() {
          self._start_timer($slides_container);
        });
      };

      var $timer = $container.find('.' + self.settings.timer_container_class),
          $progress = $timer.find('.' + self.settings.timer_progress_class),
          progress_pct = ($progress.width() / $timer.width()),
          delay = self.settings.timer_speed - (progress_pct * self.settings.timer_speed);

      $progress.animate({'width': '100%'}, delay, 'linear', callback);
      $slides_container.trigger('orbit:timer-started');
    },

    _stop_timer: function ($slides_container) {
      var self = this,
          $container = $slides_container.parent(),
          $timer = $container.find('.' + self.settings.timer_container_class),
          $progress = $timer.find('.' + self.settings.timer_progress_class),
          progress_pct = $progress.width() / $timer.width();
      self._rebuild_timer($container, progress_pct * 100 + '%');
      // $progress.stop();
      $slides_container.trigger('orbit:timer-stopped');
      $timer = $container.find('.' + self.settings.timer_container_class);
      $timer.addClass(self.settings.timer_paused_class);
    },

    _reset_timer: function($slides_container, is_paused) {
      var self = this,
          $container = $slides_container.parent();
      self._rebuild_timer($container, '0%');
      if (typeof is_paused === 'boolean' && is_paused) {
        var $timer = $container.find('.' + self.settings.timer_container_class);
        $timer.addClass(self.settings.timer_paused_class);
      }
    },

    _rebuild_timer: function ($container, width_pct) {
      // Zepto is unable to stop animations since they
      // are css-based. This is a workaround for that
      // limitation, which rebuilds the dom element
      // thus stopping the animation
      var self = this,
          $timer = $container.find('.' + self.settings.timer_container_class),
          $new_timer = $(self._timer_html()),
          $new_timer_progress = $new_timer.find('.' + self.settings.timer_progress_class);

      if (typeof Zepto === 'function') {
        $timer.remove();
        $container.append($new_timer);
        $new_timer_progress.css('width', width_pct);
      } else if (typeof jQuery === 'function') {
        var $progress = $timer.find('.' + self.settings.timer_progress_class);
        $progress.css('width', width_pct);
        $progress.stop();
      }
    },

    _goto: function($slides_container, index_or_direction, callback) {
      var self = this,
          $container = $slides_container.parent(),
          $slides = $slides_container.children(),
          $active_slide = $slides_container.find('.' + self.settings.active_slide_class),
          active_index = $active_slide.index(),
          margin_position = Foundation.rtl ? 'marginRight' : 'marginLeft';

      if ($container.hasClass(self.settings.orbit_transition_class)) {
        return false;
      }

      if (index_or_direction === 'prev') {
        if (active_index === 0) {
          active_index = $slides.length - 1;
        }
        else {
          active_index--;
        }
      }
      else if (index_or_direction === 'next') {
        active_index = (active_index+1) % $slides.length;
      }
      else if (typeof index_or_direction === 'number') {
        active_index = (index_or_direction % $slides.length);
      }
      if (active_index === ($slides.length - 1) && index_or_direction === 'next') {
        $slides_container.css(margin_position, '0%');
        active_index = 1;
      }
      else if (active_index === 0 && index_or_direction === 'prev') {
        $slides_container.css(margin_position, '-' + ($slides.length - 1) * 100 + '%');
        active_index = $slides.length - 2;
      }
      // Start transition, make next slide active
      $container.addClass(self.settings.orbit_transition_class);
      $active_slide.removeClass(self.settings.active_slide_class);
      $($slides[active_index]).addClass(self.settings.active_slide_class);
      // Make next bullet active
      var $bullets = $container.siblings('.' + self.settings.bullets_container_class);
      if ($bullets.length === 1) {
        $bullets.children().removeClass(self.settings.bullets_active_class);
        $($bullets.children()[active_index-1]).addClass(self.settings.bullets_active_class);
      }
      var new_margin_left = '-' + (active_index * 100) + '%';
      // Check to see if animation will occur, otherwise perform
      // callbacks manually
      $slides_container.trigger('orbit:before-slide-change');
      if ($slides_container.css(margin_position) === new_margin_left) {
        $container.removeClass(self.settings.orbit_transition_class);
        $slides_container.trigger('orbit:after-slide-change', [{slide_number: active_index, total_slides: $slides_container.children().length - 2}]);
        callback();
      } else {
        var properties = {};
        properties[margin_position] = new_margin_left;

        $slides_container.animate(properties, self.settings.animation_speed, 'linear', function() {
          $container.removeClass(self.settings.orbit_transition_class);
          $slides_container.trigger('orbit:after-slide-change', [{slide_number: active_index, total_slides: $slides_container.children().length - 2}]);
          callback();
        });
      }
    }
  };
}(Foundation.zj, this, this.document));

/***************foundation.orbit.js ends*****************/

/***************jquery.bxslider.min.js starts*****************/
/**
 * BxSlider v4.1 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2012, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */
(function(e){var t={},n={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};e.fn.bxSlider=function(s){if(0==this.length)return this;if(this.length>1)return this.each(function(){e(this).bxSlider(s)}),this;var o={},r=this;t.el=this;var a=e(window).width(),l=e(window).height(),d=function(){o.settings=e.extend({},n,s),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var e=document.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in t)if(void 0!==e.style[t[i]])return o.cssPrefix=t[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),c()},c=function(){if(r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=e('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?215*o.children.length+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),v(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:u()}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.width(p()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=e('<div class="bx-controls" />'),o.settings.captions&&E(),o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var t="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,t).clone().addClass("bx-clone"),n=o.children.slice(-t).clone().addClass("bx-clone");r.append(i).prepend(n)}o.active.last=o.settings.startSlide==f()-1,o.settings.video&&r.fitVids();var s=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(s=r.children()),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&w(),o.settings.controls&&T(),o.settings.auto&&o.settings.autoControls&&C(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),s.imagesLoaded(g)},g=function(){o.loader.remove(),m(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(h()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,e(window).bind("resize",Y),o.settings.auto&&o.settings.autoStart&&L(),o.settings.ticker&&W(),o.settings.pager&&M(o.settings.startSlide),o.settings.controls&&D(),o.settings.touchEnabled&&!o.settings.ticker&&O()},h=function(){var t=0,n=e();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var s=1==o.settings.moveSlides?o.active.index:o.active.index*x();for(n=o.children.eq(s),i=1;o.settings.maxSlides-1>=i;i++)n=s+i>=o.children.length?n.add(o.children.eq(i-1)):n.add(o.children.eq(s+i))}else n=o.children.eq(o.active.index);else n=o.children;return"vertical"==o.settings.mode?(n.each(function(){t+=e(this).outerHeight()}),o.settings.slideMargin>0&&(t+=o.settings.slideMargin*(o.settings.minSlides-1))):t=Math.max.apply(Math,n.map(function(){return e(this).outerHeight(!1)}).get()),t},u=function(){var e="100%";return o.settings.slideWidth>0&&(e="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),e},p=function(){var e=o.settings.slideWidth,t=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>t&&!o.carousel||"vertical"==o.settings.mode?e=t:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(t>o.maxThreshold||o.minThreshold>t&&(e=(t-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),e},v=function(){var e=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)e=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)e=o.settings.maxSlides;else{var t=o.children.first().width();e=Math.floor(o.viewport.width()/t)}else"vertical"==o.settings.mode&&(e=o.settings.minSlides);return e},f=function(){var e=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)e=o.children.length/x();else for(var t=0,i=0;o.children.length>t;)++e,t=i+v(),i+=o.settings.moveSlides<=v()?o.settings.moveSlides:v();else e=Math.ceil(o.children.length/v());return e},x=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=v()?o.settings.moveSlides:v()},m=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var e=o.children.last(),t=e.position();S(-(t.left-(o.viewport.width()-e.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,t=o.children.eq(i).position();S(-t.top,"reset",0)}}else{var t=o.children.eq(o.active.index*x()).position();o.active.index==f()-1&&(o.active.last=!0),void 0!=t&&("horizontal"==o.settings.mode?S(-t.left,"reset",0):"vertical"==o.settings.mode&&S(-t.top,"reset",0))}},S=function(e,t,i,n){if(o.usingCSS){var s="vertical"==o.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==t?(r.css(o.animProp,s),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),I()})):"reset"==t?r.css(o.animProp,s):"ticker"==t&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,s),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),S(n.resetValue,"reset",0),H()}))}else{var a={};a[o.animProp]=e,"slide"==t?r.animate(a,i,o.settings.easing,function(){I()}):"reset"==t?r.css(o.animProp,e):"ticker"==t&&r.animate(a,speed,"linear",function(){S(n.resetValue,"reset",0),H()})}},b=function(){for(var t="",i=f(),n=0;i>n;n++){var s="";o.settings.buildPager&&e.isFunction(o.settings.buildPager)?(s=o.settings.buildPager(n),o.pagerEl.addClass("bx-custom-pager")):(s=n+1,o.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+n+'" class="bx-pager-link">'+s+"</a></div>"}o.pagerEl.html(t)},w=function(){o.settings.pagerCustom?o.pagerEl=e(o.settings.pagerCustom):(o.pagerEl=e('<div class="bx-pager" />'),o.settings.pagerSelector?e(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),b()),o.pagerEl.delegate("a","click",z)},T=function(){o.controls.next=e('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=e('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",A),o.controls.prev.bind("click",P),o.settings.nextSelector&&e(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&e(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=e('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},C=function(){o.controls.start=e('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=e('<div class="bx-controls-auto" />'),o.controls.autoEl.delegate(".bx-start","click",k),o.controls.autoEl.delegate(".bx-stop","click",y),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?e(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),q(o.settings.autoStart?"stop":"start")},E=function(){o.children.each(function(){var t=e(this).find("img:first").attr("title");void 0!=t&&e(this).append('<div class="bx-caption"><span>'+t+"</span></div>")})},A=function(e){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),e.preventDefault()},P=function(e){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),e.preventDefault()},k=function(e){r.startAuto(),e.preventDefault()},y=function(e){r.stopAuto(),e.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto();var i=e(t.currentTarget),n=parseInt(i.attr("data-slide-index"));n!=o.active.index&&r.goToSlide(n),t.preventDefault()},M=function(t){return"short"==o.settings.pagerType?(o.pagerEl.html(t+1+o.settings.pagerShortSeparator+o.children.length),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,n){e(n).find("a").eq(t).addClass("active")}),void 0)},I=function(){if(o.settings.infiniteLoop){var e="";0==o.active.index?e=o.children.eq(0).position():o.active.index==f()-1&&o.carousel?e=o.children.eq((f()-1)*x()).position():o.active.index==o.children.length-1&&(e=o.children.eq(o.children.length-1).position()),"horizontal"==o.settings.mode?S(-e.left,"reset",0):"vertical"==o.settings.mode&&S(-e.top,"reset",0)}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},q=function(e){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[e]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active"))},D=function(){1==f()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==f()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},L=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},W=function(){var t=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();t="horizontal"==o.settings.mode?-i.left:-i.top}S(t,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var t=0;o.children.each(function(){t+="horizontal"==o.settings.mode?e(this).outerWidth(!0):e(this).outerHeight(!0)});var i=o.settings.speed/t,n="horizontal"==o.settings.mode?"left":"top",s=i*(t-Math.abs(parseInt(r.css(n))));H(s)}),H()},H=function(e){speed=e?e:o.settings.speed;var t={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?t=r.find(".bx-clone").first().position():i=o.children.first().position();var n="horizontal"==o.settings.mode?-t.left:-t.top,s="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:s};S(n,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",N)},N=function(e){if(o.working)e.preventDefault();else{o.touch.originalPos=r.position();var t=e.originalEvent;o.touch.start.x=t.changedTouches[0].pageX,o.touch.start.y=t.changedTouches[0].pageY,o.viewport.bind("touchmove",B),o.viewport.bind("touchend",X)}},B=function(e){var t=e.originalEvent,i=Math.abs(t.changedTouches[0].pageX-o.touch.start.x),n=Math.abs(t.changedTouches[0].pageY-o.touch.start.y);if(3*i>n&&o.settings.preventDefaultSwipeX?e.preventDefault():3*n>i&&o.settings.preventDefaultSwipeY&&e.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var s=0;if("horizontal"==o.settings.mode){var r=t.changedTouches[0].pageX-o.touch.start.x;s=o.touch.originalPos.left+r}else{var r=t.changedTouches[0].pageY-o.touch.start.y;s=o.touch.originalPos.top+r}S(s,"reset",0)}},X=function(e){o.viewport.unbind("touchmove",B);var t=e.originalEvent,i=0;if(o.touch.end.x=t.changedTouches[0].pageX,o.touch.end.y=t.changedTouches[0].pageY,"fade"==o.settings.mode){var n=Math.abs(o.touch.start.x-o.touch.end.x);n>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var n=0;"horizontal"==o.settings.mode?(n=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(n=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&n>0||o.active.last&&0>n)?S(i,"reset",200):Math.abs(n)>=o.settings.swipeThreshold?(0>n?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):S(i,"reset",200)}o.viewport.unbind("touchend",X)},Y=function(){var t=e(window).width(),i=e(window).height();(a!=t||l!=i)&&(a=t,l=i,r.redrawSlider())};return r.goToSlide=function(t,i){if(!o.working&&o.active.index!=t)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>t?f()-1:t>=f()?0:t,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=f()-1,o.settings.pager&&M(o.active.index),o.settings.controls&&D(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=h()&&o.viewport.animate({height:h()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){e(this).css("zIndex",50),I()});else{o.settings.adaptiveHeight&&o.viewport.height()!=h()&&o.viewport.animate({height:h()},o.settings.adaptiveHeightSpeed);var n=0,s={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);s=a.position(),n=o.viewport.width()-a.width()}else{var l=o.children.length-o.settings.minSlides;s=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-x():(f()-1)*x()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);s=a.position()}else if("next"==i&&0==o.active.index)s=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(t>=0){var c=t*x();s=o.children.eq(c).position()}if(s!==void 0){var g="horizontal"==o.settings.mode?-(s.left-n):-s.top;S(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var e=parseInt(o.active.index)+1;r.goToSlide(e,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var e=parseInt(o.active.index)-1;r.goToSlide(e,"prev")}},r.startAuto=function(e){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=e&&q("stop"))},r.stopAuto=function(e){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=e&&q("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).width(p()),o.viewport.css("height",h()),o.settings.ticker||m(),o.active.last&&(o.active.index=f()-1),o.active.index>=f()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(b(),M(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,e(".bx-clone",this).remove(),o.children.removeAttr("style"),this.removeAttr("style").unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),e(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),e(window).unbind("resize",Y))},r.reloadSlider=function(e){void 0!=e&&(s=e),r.destroySlider(),d()},d(),this}})(jQuery),function(e,t){var i="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e.fn.imagesLoaded=function(n){function s(){var t=e(g),i=e(h);a&&(h.length?a.reject(d,t,i):a.resolve(d)),e.isFunction(n)&&n.call(r,d,t,i)}function o(t,n){t.src===i||-1!==e.inArray(t,c)||(c.push(t),n?h.push(t):g.push(t),e.data(t,"imagesLoaded",{isBroken:n,src:t.src}),l&&a.notifyWith(e(t),[n,d,e(g),e(h)]),d.length===c.length&&(setTimeout(s),d.unbind(".imagesLoaded")))}var r=this,a=e.isFunction(e.Deferred)?e.Deferred():0,l=e.isFunction(a.notify),d=r.find("img").add(r.filter("img")),c=[],g=[],h=[];return e.isPlainObject(n)&&e.each(n,function(e,t){"callback"===e?n=t:a&&a[e](t)}),d.length?d.bind("load.imagesLoaded error.imagesLoaded",function(e){o(e.target,"error"===e.type)}).each(function(n,s){var r=s.src,a=e.data(s,"imagesLoaded");a&&a.src===r?o(s,a.isBroken):s.complete&&s.naturalWidth!==t?o(s,0===s.naturalWidth||0===s.naturalHeight):(s.readyState||s.complete)&&(s.src=i,s.src=r)}):s(),a?a.promise(r):r}}(jQuery);
/***************jquery.bxslider.min.js ends*****************/