(function(w,d,a){var $,i,k="",m=Math;for(i=0;i<8;i=i+1){k=k+String.fromCharCode(m.floor(m.random()*26)+97)}$=w[k]={};$.k=k;$.w=w;$.d=d;$.a=a;$.f=function(){var s={kk:[],api:{getTitle:function(){return $.d.title},getUrl:function(){return $.d.URL},getReferrer:function(){return $.d.referrer}},listen:function(el,ev,fn){if(typeof $.w.addEventListener!=="undefined"){el.addEventListener(ev,fn,false)}else if(typeof $.w.attachEvent!=="undefined"){el.attachEvent("on"+ev,fn)}},unlisten:function(el,ev,fn){if(typeof el.removeEventListener!=="undefined"){el.removeEventListener(ev,fn,false)}else if(typeof el.detachEvent!=="undefined"){el.detachEvent("on"+ev,fn)}},postMessage:function(w,m){if(typeof w.postMessage!=="undefined"){w.postMessage(m,"*")}},getSexy:function(n){var i,k="",s="0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";for(i=0;i<12;i=i+1){k=k+s.substr(Math.floor(Math.random()*60),1)}return k},readCookie:function(t){var i,k,v;var p=$.d.cookie.split(";");var n=p.length;for(i=0;i<n;i=i+1){k=p[i].split("=")[0];if(k.charAt(0)==" ")k=k.substring(1);v=p[i].split("=")[1];if(k===t){return v}}return null},writeCookie:function(k,v){var cookieExpires=new Date;cookieExpires.setTime($.v.startTime+$.a.daysToExpire*24*60*60*1e3);$.d.cookie=k+"="+v+"; expires="+cookieExpires.toGMTString()+"; path=/;"},getTarget:function(e){var el=null;if(e.target){el=e.target.nodeType===3?e.target.parentNode:e.target}else{el=e.srcElement}return el},callback:function(r){if(r&&r.newClickId){$.v.hitId=r.newClickId}if(r&&r.v){$.v.visitorId=r.v;$.f.writeCookie($.a.cookieId,$.v.visitorId)}if(r.chat&&!$.v.chatShown){$.f.startChat(r.chat)}},startChat:function(data){$.v.chatShown=true;if(typeof window.postMessage==="undefined"){$.f.run($.a.server+"/"+$.a.publicId+"/v/"+$.v.visitorId+"/cir/1/",{});return}var ll_chat_notification=document.createElement("div");ll_chat_notification.id="ll_chat_notification";ll_chat_notification.style.zIndex="100003";ll_chat_notification.style.position="fixed";ll_chat_notification.style.width="0px";ll_chat_notification.style.height="0px";ll_chat_notification.overflow="hidden";ll_chat_notification.style.bottom="0px";if(!$.f.isMobileAgent())ll_chat_notification.style.right="10px";var iframe=document.createElement("iframe");var qp="";for(var key in data){if(!data.hasOwnProperty(key))continue;if(key==="host")continue;if(qp)qp+="&";qp+=encodeURIComponent(key)+"="+encodeURIComponent(data[key])}iframe.src=(data.host+"/chat/popup?"+qp).replace(/^(http:)?\/\//,"https://");iframe.style.zIndex="100003";iframe.scrolling="no";iframe.style.height="100%";iframe.style.width="100%";if($.f.isMobileAgent()){iframe.style.border="0";iframe.style.height="200px"}ll_chat_notification.appendChild(iframe);document.body.appendChild(ll_chat_notification);function flashTitle(newTitle,period){var oldTitle=$.d.title;var id=setInterval(function(){if($.d.title==newTitle){$.d.title=oldTitle}else{$.d.title=newTitle}},period);return function(){clearInterval(id);$.d.title=oldTitle}}var unflash;$.f.listen($.w,"message",function(event){event=event||window.event;var match=event.data.match(/^size:([0-9]*):([0-9]*)$/);if(match){var w=match[1],h=match[2];ll_chat_notification.style.width=w+"px";ll_chat_notification.style.height=h+"px";ll_chat_notification.style.display="block";unflash=flashTitle("Chat Requested",1e3);return}if(event.data==="show chat"&&$.f.isMobileAgent()){ll_chat_notification.style.left="0";ll_chat_notification.style.width="100%";ll_chat_notification.style.height="48px";ll_chat_notification.style.display="block";unflash=flashTitle("Chat Requested",1e3);return}if(event.data!=="close iframe")return;unflash();$.w.setTimeout(function(){$.v.chatShown=false},4e3);if(ll_chat_notification.parentNode)ll_chat_notification.parentNode.removeChild(ll_chat_notification);$.f.run($.a.server+"/"+$.a.publicId+"/v/"+$.v.visitorId+"/cir/1",{})})},kill:function(id){var s=$.d.getElementById($.k+".f.kk["+id+"]");if(typeof s==="object"&&s.tagName&&s.parentNode){s.parentNode.removeChild(s)}},run:function(url,qp){var t=$.f.kk.length,n=$.d.getElementsByTagName("SCRIPT")[0],s=$.d.createElement("SCRIPT");$.f.kk[t]=function(r){$.f.kill(t);$.f.callback(r)};url=url+"/c/"+$.k+".f.kk["+t+"]";if(typeof qp==="object"){var first=true;for(var k in qp){url=url+(first?"?":"&")+k+"="+encodeURIComponent(qp[k]);first=false}}s.src=$.d.location.protocol+"//"+url;s.type="text/javascript";s.id=$.k+".f.kk["+t+"]";n.parentNode.insertBefore(s,n)},ping_url:function(first){if(typeof first==="undefined")first=false;var url=$.a.server;var qp={};var pageUrl=$.f.api.getUrl();var attribution=$.d.getElementById("lexitySalesAttribution")||$.d.getElementById("vurveSalesAttribution")||$.d.getElementById("lex_invoice_id");if(attribution&&attribution.name){$.a.pageClass="confirm";if(pageUrl.indexOf("?")!==-1){pageUrl+="&invoiceId="+attribution.name}else{pageUrl+="?invoiceId="+attribution.name}}if($.a.embedHash&&$.a.partnerCode&&$.a.merchantId){url+="/embed/"+$.a.partnerCode+"/"+$.a.embedHash;qp={id:$.a.merchantId,ts:(new Date).getTime()}}else{url+="/"+$.a.publicId}if(!first)url+="/h/1";url+="/v/"+$.v.visitorId+"/k/"+$.v.hitId+"/u/"+encodeURIComponent(pageUrl);url+="/n/"+$.a.time_start;var buying_flag=$.d.getElementById("lex_user_in_cart");if($.v.look_for_div&&buying_flag){$.a.pageClass="buying";$.v.look_for_div=false;buying_flag.parentNode.removeChild(buying_flag)}if($.a.pageClass)url+="/x/"+encodeURIComponent($.a.pageClass);if($.f.api.getTitle())url+="/t/"+encodeURIComponent($.f.api.getTitle());if($.f.api.getReferrer())url+="/r/"+encodeURIComponent($.f.api.getReferrer());if($.a.version)url+="/vn/"+encodeURIComponent($.a.version);return[url,qp]},phoneHome:function(first){var a=$.f.ping_url(first);var url=a[0];var qp=a[1];$.f.run(url,qp)},ping:function(first){$.f.phoneHome(first);var now=(new Date).getTime();if(now-$.v.startTime<$.a.maxSessionLength){$.w.setTimeout(function(){$.f.ping()},$.a.pingInterval*1e3)}},buildConversion:function(args){if(typeof args==="object"&&args.id){var query="",key="",path="//www.googleadservices.com/pagead/conversion/"+args.id,img=$.d.createElement("IMG");for(key in args){if(args[key].hasOwnProperty){if(key!=="id"){if(query){query=query+"&"}else{query="/?"}query=query+encodeURIComponent(key)+"="+encodeURIComponent(args[key])}}}img.height=1;img.width=1;img.style.height="1px";img.style.width="1px";img.style.position="absolute";img.style.top="-1000px";img.style.left="-1000px";img.src=path+query;$.d.b.appendChild(img)}},getVisitorId:function(vpx,cont){$.v.visitorId=$.f.readCookie($.a.cookieId);$.f.listen($.w,"message",receiveVisitorId);var iframed=$.w.top!=$.w;if(iframed)$.f.postMessage($.w.top,"Get Lexity visitorId");var giveUp=$.w.setTimeout(rest,100);function receiveVisitorId(event){event=event||window.event;if(!event||!event.data)return;var s=event.data.split("=");if(s.length===2&&s[0]==="Lexity visitorId"){$.v.visitorId=s[1];$.w.clearTimeout(giveUp)}}function rest(){$.f.unlisten($.w,"message",receiveVisitorId);if(!$.v.visitorId){$.v.visitorId=$.f.getSexy()}if(vpx){$.v.visitorId=vpx.split(";")[0]}else if(!iframed){$.w.name=$.w.name+"_vpx="+$.v.visitorId+";"}$.f.writeCookie($.a.cookieId,$.v.visitorId);cont()}},setupYcc:function(setupYccCb){var old_ycc=[].concat($.w._ycc||[],$.w._lex||[]);var toSend={};var e=encodeURI;var url_prefix=function(){return $.a.server+"/"+$.a.publicId+"/v/"+$.v.visitorId+"/k/"+$.v.hitId};var count=0;function getWaiter(){count++;return function(){count--;if(count<=0)setupYccCb()}}var _ycc_handler={_awaitSetup:function(cb){cb()},_delayPings:function(cb){cb(getWaiter())},_rule:function(message){var urlRule=url_prefix()+"/rule/"+e(message);$.f.run(urlRule,null)},_addTrans:function(id,store_name,total,tax,shipping,city,state,country){toSend["_addTrans"]=Array.prototype.slice.call(arguments,0)},_addItem:function(id,sku,name,variant,unit_price,quantity){toSend["_addItem"]=toSend["_addItem"]||[];toSend["_addItem"].push(Array.prototype.slice.call(arguments,0))},_trackTrans:function(){var sendString=url_prefix()+"/ecomm/"+e(JSON.stringify(toSend));$.f.run(sendString,null);toSend={}}};$.w._ycc={__internal:$,push:function(arr){if(Object.prototype.toString.call(arr)!="[object Array]"||!arr[0]||!_ycc_handler.hasOwnProperty(arr[0])){return false}_ycc_handler[arr[0]].apply(null,arr.slice(1))}};$.w._lex=$.w._ycc;for(var i=0;i<old_ycc.length;i++){$.w._ycc.push(old_ycc[i])}getWaiter()()},lookForOrders:function(){var result=[];var scripts=$.d.getElementsByTagName("script");var scraped_orders=[];for(var i=0;i<scripts.length;i++){var text=scripts[i].innerHTML;var gaq_regex=/_gaq.push\(([^)]*)\)/g;var match;var res=[];while(match=gaq_regex.exec(text))res.push(match[1]);scraped_orders.push(res)}scraped_orders=[].concat.apply([],scraped_orders);var parsed_orders=[];for(var i=0;i<scraped_orders.length;i++){var res;try{res=eval(scraped_orders[i])}catch(e){res=null}if(res)parsed_orders.push(eval(scraped_orders[i]))}var supported_commands={_addTrans:1,_addItem:1,_trackTrans:1};for(var i=0;i<parsed_orders.length;i++){if(supported_commands[parsed_orders[i][0]]){result.push(parsed_orders[i])}}$.w._ycc=$.w._ycc||[];for(var i=0;i<result.length;i++){$.w._ycc.push(result[i])}},isMobileAgent:function(){return/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},init:function(){if(typeof $.w.name==="undefined"){$.w.name=""}if($.a.publicId==="1e817333")$.f.lookForOrders();$.a.time_start=$.a.time_start||0;var vpx=$.w.name.split("_vpx=")[1];$.d.b=$.d.getElementsByTagName("BODY")[0];if($.a.cid&&$.a.lab){$.f.buildConversion({id:$.a.cid,label:$.a.lab,format:3,language:"en",color:"666666",value:0})}$.v={rf:0,hitId:$.f.getSexy(),startTime:(new Date).getTime(),look_for_div:true};$.f.getVisitorId(vpx,function(){$.f.setupYcc(function(){$.f.listen($.w,"message",function(event){event=event||window.event;if(!event)return;if(event.data==="Get Lexity visitorId"){$.f.postMessage(event.source,"Lexity visitorId="+$.v.visitorId)}});if(!$.a.silent)$.f.ping(true)})})}};;return s}();$.w.setTimeout(function(){$.f.init()},100)})(window,document,{"publicId":"YA.eeaec8aae133","embedHash":"ea1251f48baf685375d15e12af484038","partnerCode":"YA","merchantId":"eeaec8aae133","pageClass":"","server":"np.lexity.com","click_id":"","silent":"","time_start":"1417586518219","daysToExpire":1000,"waitBeforeUnload":300,"cookieId":"_vpx","pingInterval":4,"maxSessionLength":1200000,"version":1});(function(w,d,a){var $,i,k="",m=Math;for(i=0;i<8;i=i+1){k=k+String.fromCharCode(m.floor(m.random()*26)+97)}$=w[k]={};$.k=k;$.w=w;$.d=d;$.a=a;$.f=function(){var s ={
  getHighestZIndex: function() {
    var elements = document.querySelectorAll('*') || oXmlDom.documentElement.selectNodes('*'),
    i = 0,
    e, s,
    max = elements.length,
    found = [];

    for(; i < max; i += 1) {
      e = window.getComputedStyle !== undefined ? window.getComputedStyle(elements[i], null).zIndex : elements[i].currentStyle.zIndex;
      s = window.getComputedStyle !== undefined ? window.getComputedStyle(elements[i], null).position : elements[i].currentStyle.position;

      if (e && e !== 'auto' && s !== 'static') {
        found.push(parseInt(e, 10));
      }
    }

    return found.length ? Math.max.apply(null, found) : 0;
  },
  fadeIn: function(el, cb) {
    var opacity = 0.1;
    el.style.opacity = 0;
    el.style.display = 'block';

    var timer = setInterval(function() {
      if (opacity >= 1) {
        clearInterval(timer);
        el.style.opacity = 1;
        if (cb) {
          cb();
        }
      }

      el.style.opacity = opacity;
      el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
      opacity += opacity * 0.1;
    }, 10);
  },
  fadeOut: function(el, cb) {
    var opacity = 1;

    var timer = setInterval(function() {
      if (opacity <= 0.1) {
        clearInterval(timer);
        el.style.opacity = 0;
        el.style.display = 'none';
        if (cb) {
          cb();
        }
      }

      el.style.opacity = opacity;
      el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
      opacity -= opacity * 0.1;
    }, 10);
  },
  animateSize: function(el, startWidth, startHeight, endWidth, endHeight, duration, cb) {
    var _duration = duration !== undefined ? duration : 500;
    Date.now = Date.now || function() { return +new Date; };
    var _startTime = (window.performance !== undefined && window.performance.now !== undefined) ? window.performance.now() : Date.now();

    var _easingFunction = function(k) {
      if ((k *= 2) < 1) return 0.5 * k * k;
      return -0.5 * (--k * (k - 2) - 1);
    };

    var update = function(time) {
      var elapsed = (time - _startTime) / _duration;
      elapsed = elapsed > 1 ? 1 : elapsed;

      var value = _easingFunction(elapsed);
      var newWidth = startWidth + (endWidth - startWidth) * value;
      var newHeight = startHeight + (endHeight - startHeight) * value;
      if(isNaN(newHeight))
        newHeight = '338';
      el.style.width = newWidth + 'px';
      el.style.height = newHeight + 'px';

      if (elapsed == 1) {
        cb();
        return false;
      }
      return true;
    };

    var timeout = setInterval(function() {
      var time = (window.performance !== undefined && window.performance.now !== undefined) ? window.performance.now() : Date.now();
      var cont = update(time);
      if (!cont) clearInterval(timeout);
    }, 10);
  },
  createBadge: function(zIndex) {
    var ll_badge = document.createElement('div');
    ll_badge.id = 'll_badge';

    ll_badge.style.zIndex = zIndex + 21 + '';
    if($.a.position == "right"){
      ll_badge.style.right = '5px';
    }
    else{
      ll_badge.style.left = '5px';
    }

    var badge_footer = document.createElement('div');
    badge_footer.id = "ll_badge_footer";

    var badge_logo = document.createElement('img');
    badge_logo.src =  '//yccext.zenfs.com/public-assets/live-store-logo.png';


    badge_footer.appendChild(badge_logo);

    var award_keys = [];
    var ie8 = navigator.userAgent.toLowerCase();
    ie8 = (ie8.indexOf('msie') != -1) ? parseInt(ie8.split('msie')[1]) : false == 8;
    if(ie8){
      for (var i in $.a.awards) {
        if ($.a.awards.hasOwnProperty(i)) {
          award_keys.push(i);
        }
      }
    }
    else{
      award_keys = Object.keys($.a.awards);
    }

    // append first award to ll_badge
    if (award_keys.length > 0) {
      var award = document.createElement('div');


      var award_text = document.createElement('span');
      award_text.id = 'll_award_names';
      award_text.innerHTML = award_keys[0];
      award_text.style.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';

      award.appendChild(award_text);
      ll_badge.appendChild(award);
    }

    ll_badge.appendChild(badge_footer);

    return ll_badge;
  },
  createPanel: function(zIndex) {
    var ll_panel = document.createElement('div');
    ll_panel.id = 'll_panel';
    ll_panel.style.zIndex = zIndex + 22 + '';


    if($.a.position == "right"){
      ll_panel.style.right = '5px';
    }
    else{
      ll_panel.style.left = '5px';
    }


    var panel_header = document.createElement('div');
    panel_header.id = 'panel_header';


    var new_line_award = 1;
    if ($.a.storeLogo) {
      store_logo_img = new Image();
      store_logo_img.src = $.a.storeLogo.replace(/https?:\/\//, "//");
      var store_logo = document.createElement('img');
      store_logo.onerror = function(){this.src="";};
      store_logo.id = 'store_logo';
      store_logo.style.maxHeight = '30px';
      store_logo.src = $.a.storeLogo.replace(/https?:\/\//, "//");

      store_logo_img.onload = function(){
        var store_logo_element = document.getElementById('store_logo');
        if(store_logo_img.width != store_logo_img.height){
          store_logo_element.style.maxHeight = '30px';
        }
        else{
          store_logo_element.style.maxHeight = '45px';
          store_logo_element.style.maxWidth = '45px';
          var award_container_element = document.getElementById("award-container");
          award_container_element.style.display = 'inline-block';
          award_container_element.style.width = '230px';
          award_container_element.style.marginLeft = '14px';
          award_container_element.style.verticalAlign = 'middle';
          new_line_award = 0;
        }

      };
      panel_header.appendChild(store_logo);
    } else {
      var store_name = document.createElement('span');
      store_name.id = "store_name";
      store_name.innerHTML = $.a.storeName;
      store_name.style.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';

      panel_header.appendChild(store_name);
    }

    var ie8 = navigator.userAgent.toLowerCase();
    ie8 = (ie8.indexOf('msie') != -1) ? parseInt(ie8.split('msie')[1]) : false == 8;

    var award_keys = [];
    if(ie8){
      for (var i in $.a.awards) {
        if ($.a.awards.hasOwnProperty(i)) {
          award_keys.push(i);
        }
      }
    }
    else{
      award_keys = Object.keys($.a.awards);
    }

    if (award_keys.length > 0){
      var key = award_keys[0];
      var award_container = document.createElement('div');
      award_container.id = 'award-container';

      var award = document.createElement('div');
      award.id = "panel_award";
      award.style.marginTop = '10px';

      var award_name = document.createElement('span');
      award_name.id = "panel_award_name";
      award_name.innerHTML = key + '<br>';
      award_name.style.fontFamily = 'Helvetica Neue Bold, Helvetica, Arial, sans-serif';


      var award_description = document.createElement('span');
      award_description.id = "panel_award_description";
      award_description.innerHTML = $.a.awards[key];
      award_description.style.fontFamily = 'Helvetica Neue Regular, Helvetica, Arial, sans-serif';



      award.appendChild(award_name);
      award.appendChild(award_description);
      award_container.appendChild(award);
      panel_header.appendChild(award_container);
    }

    if ($.a.topProducts.length > 0){
      var top_products_header = document.createElement('div');
      top_products_header.id = 'top_products_header';
      top_products_header.innerHTML = "TOP SELLING PRODUCTS";
      top_products_header.style.fontFamily = 'Helvetica Neue Light, Helvetica, Arial, sans-serif';

      panel_header.appendChild(top_products_header);
    }

    var panel_body = document.createElement('div');

    // Code to add top products in the panel
    var top_products = document.createElement('div');
    top_products.id = 'top_products_body';

    //top_products.style.backgroundColor = '#ffffff';

    var top_products_body = document.createElement('div');

    for(i=0; i<$.a.topProducts.length; i++){
      product = $.a.topProducts[i];

      if (product.title.length > 30)
        product.title = product.title.slice(0, 30) + '...';

      product_div = document.createElement('div');
      product_div.className += "top_product_lines";

      product_title = document.createElement('span');
      product_title.className = "product_titles";
      product_title.style.fontFamily = 'Helvetica Neue Bold, Helvetica, Arial, sans-serif';
      product_title.innerHTML = product.title;

      var product_img = document.createElement('img');
      product_img.className += "product_img";
      product_img.onerror = function(){this.src="//yccext.zenfs.com/public-assets/live-product-page.png";};
      product_img.onload = function(){this.style.background = "transparent url('')";};
      product_img.src = product.img_url.replace(/https?:\/\//, "//");
      product_img.style.background = "transparent url('//yccext.zenfs.com/public-assets/animated-loader.gif') no-repeat scroll center center";

      var product_chevron = document.createElement('img');
      product_chevron.className += "product_chevron";
      product_chevron.src = '//yccext.zenfs.com/public-assets/chevron.png';


      var product_url = document.createElement('a');
      product_url.className = "product_links";
      product_url.style.fontFamily = 'Helvetica Neue Bold, Helvetica, Arial, sans-serif';
      var attr_ref = "ref=lexity&_vs=livebadge&_vm=productlink";
      if (product.url.indexOf("?") >= 0) {
        product_url.href = product.url + "&" + attr_ref;
      } else {
        product_url.href = product.url + "?" + attr_ref;
      }

      product_url.appendChild(product_img);
      product_url.appendChild(product_title);
      product_url.appendChild(product_chevron);

      product_div.appendChild(product_url);
      product_div.appendChild(document.createElement('br'));
      top_products_body.appendChild(product_div);
    }

    top_products_body.style.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';


    if (!$.a.topProducts.length && !award_keys.length){
      var default_message = document.createElement('span');
      default_message.id = 'll_default_message';

      default_message.innerHTML = "The Live Store program helps shoppers identify reputable online sellers with track records of strong consumer engagement and loyalty through an independent assessment from Yahoo.<br>";
      default_message.style.fontFamily = 'Helvetica Neue Bold, Helvetica, Arial, sans-serif';


      top_products_body.appendChild(default_message);
    }

    top_products.appendChild(top_products_body);
    panel_body.appendChild(top_products);

    var panel_footer = document.createElement('div');
    panel_footer.id = "panel_footer";


    var panel_logo = document.createElement('img');
    panel_logo.src = '//yccext.zenfs.com/public-assets/live-store-logo.png';
    panel_logo.id = "panel_logo";

    var panel_help = document.createElement('a');
    panel_help.href = 'http://commercecentral.yahoo.com/livestore';
    panel_help.target = '_blank';

    var panel_help_img = document.createElement('img');

    panel_help_img.src = '//yccext.zenfs.com/public-assets/question-mark-icon.png';
    panel_help_img.className +='panel_help_img';
    panel_help_img.style.cssFloat = 'right';

    panel_help.appendChild(panel_help_img);

    var panel_description = document.createElement('div');
    panel_description.id = "panel_description";
    panel_description.innerHTML = 'Shop confidently when you see the Yahoo Live Store badge';
    panel_description.style.fontFamily = 'Helvetica Neue Light, Helvetica, Arial, sans-serif';


    panel_footer.appendChild(panel_logo);
    panel_footer.appendChild(panel_help);
    panel_footer.appendChild(panel_description);

    ll_panel.appendChild(panel_header);
    ll_panel.appendChild(panel_body);
    ll_panel.appendChild(panel_footer);
    ll_panel.style.visibility = 'hidden';

    return ll_panel;
  },
  createOverlay: function(zIndex) {
    var overlay = document.createElement('div');
    overlay.id = 'll_overlay';

    overlay.style.zIndex = zIndex + 23 + '';
    if($.a.position == "right"){
      overlay.style.right = '5px';
    }
    else{
      overlay.style.left = '5px';
    }

    return overlay;
  },

  addStyle: function(){

    var linkEl = document.createElement('link');
        linkEl.href= $.a.assetsLoc + 'css/badge.css';
        linkEl.rel='stylesheet';
        linkEl.type='text/css';
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(linkEl);

        if (linkEl.addEventListener) {
             linkEl.addEventListener('load', function() {
                $.f.showBadge();
            })
        }else{
            linkEl.attachEvent('load', function() {
                $.f.showBadge();
            })
        }
  },

  showBadge: function() {
    var maxZ = $.f.getHighestZIndex();
    var ll_badge = $.f.createBadge(maxZ);
    document.body.appendChild(ll_badge);

    var ie8 = navigator.userAgent.toLowerCase();
    ie8 = (ie8.indexOf('msie') != -1) ? parseInt(ie8.split('msie')[1]) : false == 8;

    var award_keys = [];
    if(ie8){
      for (var i in $.a.awards) {
        if ($.a.awards.hasOwnProperty(i)) {
          award_keys.push(i);
        }
      }
    }
    else{
      award_keys = Object.keys($.a.awards);
    }

    var numAwards = award_keys.length;
    var numTopProducts = $.a.topProducts.length;

    var ll_panel = $.f.createPanel(maxZ);
    var ll_overlay = $.f.createOverlay(maxZ);
    document.body.appendChild(ll_panel);
    document.body.appendChild(ll_overlay);

    if (numAwards > 1) {
      var $award_name = document.getElementById("ll_award_names");
      var $panel_award = document.getElementById("panel_award");
      var $panel_award_name = document.getElementById("panel_award_name");
      var $panel_award_description = document.getElementById("panel_award_description");

      var i = 0;
      window.setInterval(function() {
        $.f.fadeOut($award_name, function() {
          $award_name.innerHTML = award_keys[i];
          $.f.fadeIn($award_name);
        });

        $.f.fadeOut($panel_award, function() {
          $panel_award_name.innerHTML = award_keys[i];
          $panel_award_description.innerHTML = $.a.awards[award_keys[i]];
          $.f.fadeIn($panel_award);
        });


        i = (i + 1) % numAwards;
      }, 5000);
    }

    var $badge = document.getElementById('ll_badge');
    var badgePxHeight, panelPxHeight;
    if(window.getComputedStyle)
      badgePxHeight = window.getComputedStyle($badge, null).height;
    else
      badgePxHeight = $badge.currentStyle.height;
    var badgeHeight = parseInt(badgePxHeight.replace(/[A-Za-z]+/g, ''));

    var $panel = document.getElementById('ll_panel');

    if(window.getComputedStyle)
      panelPxHeight = window.getComputedStyle($panel, null).height;
    else
      panelPxHeight = $panel.currentStyle.height;
    var panelHeight = parseInt(panelPxHeight.replace(/[A-Za-z]+/g, ''));

    var $overlay = document.getElementById('ll_overlay');
    $overlay.style.height = badgePxHeight;

    if($badge.addEventListener){
      $badge.addEventListener('mouseover', function() {
        $.f.fadeIn($overlay, function() {
          $badge.style.display = 'none';
          $.f.animateSize($overlay, 177, badgeHeight, 310, panelHeight, 200, function() {
            $panel.style.visibility = 'visible';
            $panel.style.display = 'block';
            $.f.fadeOut($overlay);
          });
        });
      });

      $panel.addEventListener('mouseout', function(e) {
        // imitate jQuery mouseleave event bubbling behavior
        var isChildOf = function(pNode, cNode) {
          if (pNode === cNode) return true;
          while (cNode && cNode !== pNode) cNode = cNode.parentNode;
          return cNode === pNode;
        };

        var target = e.srcElement || e.target;
        var relTarget = e.relatedTarget || e.toElement;

        if (!isChildOf($panel, relTarget)) {
          $.f.fadeIn($overlay, function() {
            $panel.style.display = 'none';
            $.f.animateSize($overlay, 310, panelHeight, 177, badgeHeight, 200, function() {
              $badge.style.display = 'block';
              $.f.fadeOut($overlay);
            });
          });
        }
      });
    }
    else{
      $badge.attachEvent('onmouseover', function() {
        $.f.fadeIn($overlay, function() {
          $badge.style.display = 'none';
          $.f.animateSize($overlay, 177, badgeHeight, 310, panelHeight, 200, function() {
            $panel.style.visibility = 'visible';
            $panel.style.display = 'block';
            $.f.fadeOut($overlay);
          });
        });
      });

      $panel.attachEvent('onmouseleave', function(e) {
        // imitate jQuery mouseleave event bubbling behavior
        var isChildOf = function(pNode, cNode) {
          if (pNode === cNode) return true;
          while (cNode && cNode !== pNode) cNode = cNode.parentNode;
          return cNode === pNode;
        };

        var target = e.srcElement || e.target;
        var relTarget = e.relatedTarget || e.toElement;

        if (!isChildOf($panel, relTarget)) {
          $.f.fadeIn($overlay, function() {
            $panel.style.display = 'none';
            $.f.animateSize($overlay, 310, panelHeight, 177, badgeHeight, 200, function() {
              $badge.style.display = 'block';
              $.f.fadeOut($overlay);
            });
          });
        }
      });
    }
    // }
  },
  init: function() {
    /*
     * For now don't show Live badge on mobile devices due to UI issues
     * We can remove the below condition once we sort out the issues.
     */
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return;
    }
    $.f.addStyle();

  }
}

;return s}();$.w.setTimeout(function(){$.f.init()},100)})(window,document,{"badge":{"topProducts":[{"url":"http://www.beltoutlet.com/woclpashasco.html","img_url":"http://ep.yimg.com/ay/beltoutlet/womens-pashmina-style-shawl-wrap-12.gif","title":"CTM® Womens Classic Pashmina Shawl Wraps"},{"url":"http://www.beltoutlet.com/unwodrglby.html","img_url":"http://ep.yimg.com/ay/beltoutlet/unlined-womens-driving-gloves-by-isotoner-76.gif","title":"totes ISOTONER Womens Unlined Leather Palm Driving Gloves"},{"url":"http://www.beltoutlet.com/socoelchsuby.html","img_url":"http://ep.yimg.com/ca/I/beltoutlet_2271_106668810","title":"CTM® Kids Elastic Clip-End 1 Inch Solid Suspenders"}],"awards":{"Secure Checkout":"This store utilizes Yahoo's 256-bit secure encryption during checkout to protect your data","Pro Seller":"Customers place more orders here than on other stores","Top Destination":"This store gets more visitors than other stores"},"storeLogo":"https://yccext.zenfs.com/palaran_uploads/ads/29845/store_logo","position":"left"},"awards":{"Secure Checkout":"This store utilizes Yahoo's 256-bit secure encryption during checkout to protect your data","Pro Seller":"Customers place more orders here than on other stores","Top Destination":"This store gets more visitors than other stores"},"topProducts":[{"url":"http://www.beltoutlet.com/woclpashasco.html","img_url":"http://ep.yimg.com/ay/beltoutlet/womens-pashmina-style-shawl-wrap-12.gif","title":"CTM® Womens Classic Pashmina Shawl Wraps"},{"url":"http://www.beltoutlet.com/unwodrglby.html","img_url":"http://ep.yimg.com/ay/beltoutlet/unlined-womens-driving-gloves-by-isotoner-76.gif","title":"totes ISOTONER Womens Unlined Leather Palm Driving Gloves"},{"url":"http://www.beltoutlet.com/socoelchsuby.html","img_url":"http://ep.yimg.com/ca/I/beltoutlet_2271_106668810","title":"CTM® Kids Elastic Clip-End 1 Inch Solid Suspenders"}],"storeName":"","storeLogo":"https://yccext.zenfs.com/palaran_uploads/ads/29845/store_logo","position":"left","assetsLoc":"//yccext.zenfs.com/public-assets/"});