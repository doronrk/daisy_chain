﻿var TWC=function(n){function w(i){if(i.keyCode==13){var r=n("#srchSgg .active").text();r!=""&&(t=r,n("#tb_search").val(t));o(i)}}function b(i){t=n.trim(n("#tb_search").val()).toLowerCase();var r;if(i.keyCode==38){if(r=n("#srchSgg .active").index(),r==0)return;r==-1&&(r=n("#srchSgg li").length);r--;n("#srchSgg li").removeClass("active");n(n("#srchSgg li")[r]).addClass("active")}else if(i.keyCode==40){if(r=n("#srchSgg .active").index(),r>=n("#srchSgg li").length-1)return;r++;n("#srchSgg li").removeClass("active");n(n("#srchSgg li")[r]).addClass("active")}else e?c():n.getJSON("/twc/search.txt",function(n){e=n;c()})}function c(){var u=e.filter(function(n){return n.Term.indexOf(t)==0}),i=u.length,r,f;if(i!=0){for(i>5&&(i=5),n("#srchSgg > ul").empty(),r=0;r<i;r++)n("#srchSgg > ul").append("<li>"+u[r].Term+"<\/li>");n("#srchSgg li").on("click",function(i){t=n(this).text();n("#tb_search").val(t);o(i)}).on("mouseover",function(){n("#srchSgg li").removeClass("active");n(this).addClass("active")});f=n("#tb_search").position().left;n("#srchSgg").css("left",f+"px").fadeIn("fast")}}function o(i){i.preventDefault();t==""&&(t=n("#tb_search").val());var r=t;r=r.replace(/[^a-zA-Z 0-9\-!_\.]+/g,"");r=r.replace(/\s+/g,"-");r=r.replace(/-{2,}/g,"-");r.toLowerCase()!="search"&&r.toLowerCase()!=""&&n.get("/twc/search.ashx",{w:r},function(n){location.href=n})}function l(){for(var i,t=0;t<f.length;t++)i=f[t],k(i)&&(n(i).attr("src",n(i).attr("data-ll")),[].indexOf&&[].slice.call(f).indexOf(self)!==-1&&[].slice.call(f).splice(t,1))}function k(n){var t=n.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;return(t.top>=0&&t.left>=0&&t.top)<=i+100}function a(){var t,i;if(n("#srchSgg").hide(),l(),r=n(window).width()<768?!0:!1,r||n("#mainMenu").show(),n(".navMenu").hide(),!hideNavs)if(r){n("#mainMenu > li,.navMenu ul li,.navMenu").off();n("#mainMenu > li").on("tap",g);n(".navMenu ul li").each(function(){var t=n(this).children("a");if(t.length>0)n(this).on("click",function(){location.href=t.attr("href")})});n("#mi6").on("tap",function(){location.href="/storelocator"})}else{n("#mainMenu > li,.navMenu ul li,.navMenu").off();n("#mainMenu > li,.navMenu").mouseenter(nt).mouseleave(v);n(".navMenu a").on("click touchend",function(){var t=n(this),i=t.attr("href");window.location=i})}if(!r){for(t=0;t<7;t++)i=0,t==2?i=-200:t==6&&(i=-100),n("#mn"+t).css({left:n("#mi"+t).position().left+i});n("#hdr-search").show();n("#btn_email_nl").off("click").on("click",d)}}function d(t){var i,r;if(t.preventDefault(),i=n("#tb_email_nl").val(),i!=s){if(r=new RegExp(/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b/),!r.test(i)){alert("Please Provide a valid e-mail address.");return}s=i;n("#div_email_nl").fadeOut("fast",function(){n("#div_email_nl").html("Thank you for signing up for our newsletter!").fadeIn();n.get("/twc/EmailSignUp.ashx?eml="+i,function(){})})}}function g(t){if(t.preventDefault(),!i){var r=t.currentTarget.id.substr(2);i=!0;n("#mn"+r).slideToggle("fast",function(){i=!1})}}function nt(t){t.preventDefault();var i=v(t);n("#mn"+i).show()}function v(t){var r,i;for(t.preventDefault(),r=t.currentTarget.id.substr(2),i=0;i<7;i++)n("#mn"+i).hide();return r}function tt(t){t.preventDefault();n(this).parent().hide().parent().find(".hidden").removeClass("hidden")}function it(){n("body").prepend('<div class="tip"><div class="tipMid"><\/div><div class="tipBtm"><\/div><\/div>');n(".ttip").each(function(){var i=n(this),t=n(".tip"),r=n(".tip .tipMid"),u=this.title;this.title="";i.hover(function(){var i=n(this).offset(),f=i.left,e=i.top;r.html(u);var o=t.height(),s=f+"px",h=e-o-7+"px";t.css({top:h,left:s});t.fadeIn()},function(){t.hide()});i.click(function(n){n.preventDefault()})})}function rt(){location.href.toLowerCase().indexOf("cart")>-1||(n("#cartWidget").fadeIn("fast"),h||y())}function ut(t){t.preventDefault();var i=n(this).attr("data-rid");n.getJSON("/twc/cart/Cart_Edit.ashx?action=-1&recordid="+i,function(){y()})}function y(){n.getJSON("/twc/cart/Cart_List.ashx?d="+(new Date).getTime(),function(t){var u;if(h=!0,t.CartList.length==0){n("#cwc").html("<i>Your cart is empty<\/i>");n("#cwn").text("0");n("#cartCnt1,#cartCnt2").text("Cart (0)");return}var r='<table class="tb">',e=0,f=0;for(u=0;u<t.CartList.length;u++){var i=t.CartList[u],s=i.OnSale?'<span class="red">$'+i.ExtendedAmount.toFixed(2)+"<\/span>":"$"+i.ExtendedAmount.toFixed(2),o="";i.GiftWrap>0&&(o=' <img src="/twc/img/icon-gift.png" alt="Gift" />');f+=i.Quantity;r+='<tr><td rowspan="2"><a href="/'+i.ProductHref+'"><img class="th" src="//img.thewalkingcompany.com/common/images/AddtoBag/'+i.Thumbnail.replace("th.jpg","sm.jpg")+'"><\/a><\/td><td colspan="2"><b><a href="/'+i.ProductHref+'">'+i.BrandName+" "+i.ProductName+'<\/a><\/b><\/td><\/tr><tr><td><div class="text-12">Size: '+i.SizeName+'<\/div><div class="text-12">QTY: '+i.Quantity+o+' <a href="#" data-rid="'+i.RecordId+'">(remove)<\/a><\/div><\/td><td class="t">'+s+'<\/td><\/tr><tr><td colspan="3"><hr/><\/td><\/tr>';e+=i.ExtendedAmount}r+='<tr><td colspan="2"><b>Order Subtotal:<\/b><\/td><td><b>$'+e.toFixed(2)+"<\/b><\/td><\/tr><\/table>";t.ShippingCosts[0]==0&&(r+='<div class="text-center red bold">Free Shipping on this order<\/div>');n("#cwc").html(r);n("#cwn").text(f);n("a[data-rid]").click(ut);n("#cartCnt1,#cartCnt2").text("Cart ("+f+")")})}function p(t){t.preventDefault();n("#signInErr").hide();var r={};r.u=n("#Txt_Email").val();r.p=Base64.encode(n("#Txt_Password").val());(r.u==""||r.p=="")&&n("#signInErr").text("Please provide an email address and password").fadeIn();i=!0;n("#signInBox .wait_indicator").show();n.post("/twc/member/SignIn.ashx",r,function(t){if(t=="-2")n("#signInErr").text("Please provide an email address and password").fadeIn();else if(t=="-3")n("#signInErr").text("Your email address appears invalid.").fadeIn();else if(t=="-999")n("#signInErr").text("There was an error logging you in. Please try again.").fadeIn();else if(t=="-1")n("#signInErr").text("The information you provided was not found in our system.").fadeIn();else if(t=="0")n("#signInErr").text("Your e-mail address or password was incorrect. Please try again.").fadeIn();else{location.href="/twc/member/rewards.aspx";return}i=!1;n("#signInBox .wait_indicator").hide()})}var i=!1,r=!1,t="",f=[],h=!1,e,s,u;return!/mobile/i.test(navigator.userAgent)||pageYOffset||location.hash||setTimeout(function(){window.scrollTo(0,1)},1e3),n(function(){for(var t=0;t<7;t++)hideNavs?n("#mn"+t).hide():n("#mi"+t).after(n("#mn"+t));if(n("img[data-ll]").each(function(){f.push(this)}),n(window).scroll(function(){clearTimeout(n.data(this,"scrollTimer"));n.data(this,"scrollTimer",setTimeout(function(){l()},250))}),a(),!Modernizr.touch)n(window).on("resize",function(){u(a,300)});n(window).on("orientationchange",function(){n("#offcanvas").hasClass("active")&&(n("#cl,#op").toggle(),n("#offcanvas,#offcanvas_main").toggleClass("active"));n("#srchSgg").hide()});n("#mobileMenu li").on("tap",function(t){t.preventDefault();var i=n(this).index();switch(i){case 0:u(function(){n("#mainMenu").slideToggle("fast")},200);break;case 1:u(function(){n("#hdr-search").slideToggle("fast",function(){n(this).is(":visible")&&n("#tb_search").focus()})},200);break;case 2:location.href="/twc/cart/Cart.aspx"}});n("svg").on("click",function(){location.href="/"});n("#btn_offcanvas").on("tap",function(t){t.preventDefault();n("#cl,#op").toggle();n("#offcanvas,#offcanvas_main,#btn_offcanvas").toggleClass("active");n("#btn_offcanvas > div > div").toggleClass("hidden");window.scrollTo(0,n("#btn_offcanvas").offset().top)});n(".more").on(Modernizr.touch?"touchstart":"click",tt);n("#btn_search").click(o);n("#tb_search").on("keyup",b);n("#tb_search").on("keypress",w);n("#sortbar li").each(function(){var t=n(this).text(),i=n(this).children("a").attr("href"),r=i==undefined?"<option selected>"+t+"<\/option>":'<option value="'+i+'">'+t+"<\/option>";n("#sortbar select").append(r)});n("#sortbar select").on("change",function(){var t=n("#sortbar select").val();t&&(location.href=t)});n("#scrollInd").on("tap",function(t){t.preventDefault();window.scrollBy(0,40);n("#scrollInd").fadeOut("fast")});if(u(function(){n(window).scroll(function(){n("#scrollInd").fadeOut("fast")})},1e3),n("img[usemap]").rwdImageMaps(),n("a[data-ah]").each(function(){var t=n(this);t.attr("href",t.attr("data-ah"))}),Modernizr.touch?n(".hht,.hhmt,.hhmb,.hpb,.hpbo").click(function(){n(this).find(".holy").toggle().toggleClass("holyon")}):n(".hht,.hhmt,.hhmb,.hpb,.hpbo").hover(function(){n(this).find(".holy").show().addClass("holyon")},function(){n(this).find(".holy").removeClass("holyon")}),!Modernizr.touch){n("#cartLink").on("mouseover",rt);n("header").on("mouseleave",function(){n("#cartWidget").fadeOut("fast")})}n("#Btn_SignIn").click(p);n("#signInBox").click(function(){i||n("#signInBox").fadeOut("fast")});n("#signInBox > div").click(function(n){n.stopPropagation()});n(".signInLink").click(function(t){t.preventDefault();n("#signInBox").fadeIn("fast");n("#Txt_Email").focus()});n("#Txt_Password").on("keydown",function(n){n.keyCode==13&&p(n)})}),s="",u=function(){var n=0;return function(t,i){clearTimeout(n);n=setTimeout(t,i)}}(),{mobile:r,delay:u,setUpToolTips:it}}(jQuery),Base64;
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
(function(n){n.picturefill=function(){for(var f,e,u,h,o,t,s,r=n.document.getElementsByTagName("span"),i=0,c=r.length;i<c;i++)if(r[i].getAttribute("data-picture")!==null){for(f=r[i].getElementsByTagName("span"),e=[],u=0,h=f.length;u<h;u++)o=f[u].getAttribute("data-media"),(!o||n.matchMedia&&n.matchMedia(o).matches)&&e.push(f[u]);t=r[i].getElementsByTagName("img")[0];e.length?(s=e.pop(),t&&t.parentNode.nodeName!=="NOSCRIPT"||(t=n.document.createElement("img"),t.alt=r[i].getAttribute("data-alt")),t.src=s.getAttribute("data-src"),s.appendChild(t)):t&&t.parentNode.removeChild(t)}};n.addEventListener?(n.addEventListener("resize",n.picturefill,!1),n.addEventListener("DOMContentLoaded",function(){n.picturefill();n.removeEventListener("load",n.picturefill,!1)},!1),n.addEventListener("load",n.picturefill,!1)):n.attachEvent&&n.attachEvent("onload",n.picturefill)})(this);Array.prototype.filter||(Array.prototype.filter=function(n){var f=this.length>>>0,i,u,t,r;if(typeof n!="function")throw new TypeError;for(i=[],u=arguments[1],t=0;t<f;t++)t in this&&(r=this[t],n.call(u,r,t,this)&&i.push(r));return i}),function(n){n.fn.rwdImageMaps=function(){var t=this,i=function(){t.each(function(){if(typeof n(this).attr("usemap")!="undefined"){var i=this,t=n(i);n("<img />").load(function(){var r=t.attr("width"),u=t.attr("height"),f;r&&u||(f=new Image,f.src=t.attr("src"),r||(r=f.width),u||(u=f.height));var e=t.width()/100,o=t.height()/100,s=t.attr("usemap").replace("#",""),i="coords";n('map[name="'+s+'"]').find("area").each(function(){var f=n(this),s,h,t;for(f.data(i)||f.data(i,f.attr(i)),s=f.data(i).split(","),h=new Array(s.length),t=0;t<h.length;++t)h[t]=t%2==0?parseInt(s[t]/r*100*e):parseInt(s[t]/u*100*o);f.attr(i,h.toString())})}).attr("src",t.attr("src"))}})};return n(window).resize(i).trigger("resize"),this}}(jQuery);Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(n){var f="",e,t,i,s,h,o,r,u=0;for(n=Base64._utf8_encode(n);u<n.length;)e=n.charCodeAt(u++),t=n.charCodeAt(u++),i=n.charCodeAt(u++),s=e>>2,h=(e&3)<<4|t>>4,o=(t&15)<<2|i>>6,r=i&63,isNaN(t)?o=r=64:isNaN(i)&&(r=64),f=f+this._keyStr.charAt(s)+this._keyStr.charAt(h)+this._keyStr.charAt(o)+this._keyStr.charAt(r);return f},decode:function(n){var t="",e,o,s,h,u,r,f,i=0;for(n=n.replace(/[^A-Za-z0-9\+\/\=]/g,"");i<n.length;)h=this._keyStr.indexOf(n.charAt(i++)),u=this._keyStr.indexOf(n.charAt(i++)),r=this._keyStr.indexOf(n.charAt(i++)),f=this._keyStr.indexOf(n.charAt(i++)),e=h<<2|u>>4,o=(u&15)<<4|r>>2,s=(r&3)<<6|f,t=t+String.fromCharCode(e),r!=64&&(t=t+String.fromCharCode(o)),f!=64&&(t=t+String.fromCharCode(s));return Base64._utf8_decode(t)},_utf8_encode:function(n){var i,r,t;for(n=n.replace(/\r\n/g,"\n"),i="",r=0;r<n.length;r++)t=n.charCodeAt(r),t<128?i+=String.fromCharCode(t):t>127&&t<2048?(i+=String.fromCharCode(t>>6|192),i+=String.fromCharCode(t&63|128)):(i+=String.fromCharCode(t>>12|224),i+=String.fromCharCode(t>>6&63|128),i+=String.fromCharCode(t&63|128));return i},_utf8_decode:function(n){for(var r="",t=0,i=c1=c2=0;t<n.length;)i=n.charCodeAt(t),i<128?(r+=String.fromCharCode(i),t++):i>191&&i<224?(c2=n.charCodeAt(t+1),r+=String.fromCharCode((i&31)<<6|c2&63),t+=2):(c2=n.charCodeAt(t+1),c3=n.charCodeAt(t+2),r+=String.fromCharCode((i&15)<<12|(c2&63)<<6|c3&63),t+=3);return r}};
/*
//# sourceMappingURL=twc.min.js.map
*/