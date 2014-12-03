define("dropbox/dropbox",["jquery","get!core/eBags"],function(n,t){function r(n){return location.hash==="#"+n?!0:!1}function u(n){var t=document.cookie,u=t.indexOf(n+"="),r,i,f;if(u!==-1)return r=u+n.length+1,i=t.indexOf(";",r),i===-1&&(i=t.length),f=t.substring(r,i),decodeURIComponent(f)}function f(n){var t,i,r;n.name&&n.value&&(t=n.name+"="+encodeURIComponent(n.value),n.days&&(i=new Date,r=i.getDate()+1,i.setDate(r),t+="; expires="+i.toUTCString()),n.domain&&(t+="; domain="+n.domain+"; path=/"),document.cookie=t)}function i(n,t){if(window.s_gi&&window.s_account){var i=s_gi(s_account);i&&(i.linkTrackEvents=i.events=n,i.linkTrackVars="events",void i.tl(!0,"o",t.id))}}return n.fn.dropbox=function(t){var i=n.extend({},{openSpeed:"normal",closeSpeed:"normal",boxWidth:286,docWidth:770,docPad:5,boxId:"dropbox",relativeToElem:!1,container:"",url:"",closeLink:"",reverseAnimation:!0,cookie:{name:"",value:""},urlHash:"",autoCloseSeconds:3},t),o={isOpen:!1,placeBelow:!1},e,s,l=new Date,h=function(t,r){var c=i.relativeToElem?n(i.relativeToElem):t,u=c.position();u.height=c.height();u.width=c.width();var l={height:n(window).height(),width:n(window).width()},f={top:0,right:0},a=function(){e||(e=n("#"+i.boxId));e.unbind("mouseenter").unbind("mouseleave");i.reverseAnimation&&o.placeBelow?e.animate({left:u.left+u.width-i.boxWidth+"px"},i.closeSpeed,function(){e.animate({height:"hide",opacity:0},i.closeSpeed,function(){e.css("opacity",1)})}):e.hide(i.closeSpeed);s&&clearTimeout(s);o.isOpen=!1;t.trigger("closed.dropbox")},v=function(c){var v;l.width>=i.docWidth+i.docPad*2+i.boxWidth?(f.top=u.top,f.right=u.width+i.docPad,o.placeBelow=!1):(f.top=u.top+u.height,f.right=0,o.placeBelow=!0);e=n("#"+i.boxId);e.length===0&&(e=n('<div id="'+i.boxId+'"><\/div>'));c&&(e.html(c),t.trigger("loaded.dropbox",[e]));n(i.preloadImg,e).each(function(){v=new Image;v.src=n(this).attr("src")});e.css({position:"absolute",top:f.top+"px",right:f.right+"px",width:i.boxWidth+"px",display:"none","z-index":900});n(i.container).append(e);typeof sr_updateMessages=="function"&&sr_updateMessages();n(i.closeLink,e).click(a);o.placeBelow?e.slideDown(i.openSpeed,function(){if(l.width>i.docWidth+i.docPad*2){var n=l.width-(i.boxWidth+i.docPad);e.animate({left:n+"px"},i.openSpeed)}}):e.show(i.openSpeed);o.isOpen=!0;t.trigger("opened.dropbox");r?t.trigger("autoOpened.dropbox"):t.trigger("clickOpened.dropbox");r&&e.hover(function(){s&&clearTimeout(s)},function(){r&&(s=setTimeout(function(){h(t,!0)},i.autoCloseSeconds*1e3))})};return o.isOpen?a():i.url?n.ajax({url:i.url,success:v,dataType:"html",cache:!1}):v(),!1},c=!1;return(i.autoShowConfig==!0||r(i.urlHash))&&(r(i.urlHash)?c=!0:u(i.cookie.name)!==i.cookie.value&&(c=!0)),c&&(h(n(this),!0),f(i.cookie),s=setTimeout(function(){h(n(this),!0)},i.autoCloseSeconds*1e3)),this.each(function(){return n(this).click(function(){return h(n(this),!1),!1})})},t.dotdSubscribe=function(t,i){var r=function(t,r){n.ajax({type:"POST",url:i.serviceUrl+"/"+r,data:JSON.stringify(t),contentType:"application/json; charset=utf-8",dataFilter:function(n){var t=JSON.parse(n);return t.hasOwnProperty("d")?t.d:t},success:u})},u=function(){n(i.subscribeDivId,t).hide("normal");n(i.completeDivId,t).show("normal")};n(i.linkId,t).click(function(){var u;return i.customerId?(u={customerId:i.customerId,emailSubscriptionType:i.subscribeType,emailSubscriptionStatus:i.subscribeStatus,websiteId:i.websiteId},r(u,i.serviceCustIdMethod)):(n(i.submitButton,t).click(function(){var f=n(i.emailTextbox,t).val();return n.trim(f)&&(u={email:f,emailSubscriptionType:i.subscribeType,emailSubscriptionStatus:i.subscribeStatus,websiteId:i.websiteId},r(u,i.serviceEmailMethod)),!1}),n(i.subscribeDivId,t).show(),n(i.emailTextbox,t).focus()),!1})},t.dropbox=function(r,u,f){var o=n.extend(!0,{},t.dropbox.defaults,t.dropbox[f],u),e=n(r).dropbox(o).bind("loaded.dropbox",function(r,e){var h=n(o.brandLogoImage,e),s,c;h.length>0&&(s=new Image,s.src=h.attr("src"),s.width>o.maxLogoWidth&&(c=o.maxLogoWidth/s.width,h.width(o.maxLogoWidth),h.height(s.height*c)));f==="dotdDefaults"&&t.dotdSubscribe(e,u.subscribe);n(o.detailsLink,e||window).click(function(){return i("event14",this),!0})});return e.bind("autoOpened.dropbox",function(){i("event11",e[0])}),e.bind("clickOpened.dropbox",function(){i("event12",e[0])}),e.bind("closed.dropbox",function(){i("event13",e[0])}),e},t.dropbox.defaults={preloadImg:".preloadImg"},t.dropbox.dotdDefaults={closeLink:"#imgClose",url:"/deals/DealOfTheDay.cfm",urlHash:"steal",detailsLink:".lnkSeeDetails",subscribe:{},brandLogoImage:"#imgBrandLogo",maxLogoWidth:100},t.dropbox})