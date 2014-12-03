AjaxBaseUrl = window.location.protocol+"//"+window.location.hostname+"/";

function olarkChat(){
(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){
f[z]=function(){
(a.s=a.s||[]).push(arguments)};var a=f[z]._={
},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){
f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={
0:+new Date};a.P=function(u){
a.p[u]=new Date-a.p[0]};function s(){
a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){
hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){
return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){
b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{
b.contentWindow[g].open()}catch(w){
c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{
var t=b.contentWindow[g];t.write(p());t.close()}catch(x){
b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})
({
loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
olark.identify('9650-363-10-6218');
}
$j(document).ready(function(){
  setTimeout(function(){
    olarkChat();
  }, 200);
});

function ajaxFormatUrl(somepath) {
  if (somepath.substr(0,1) == '/')
    somepath = somepath.substr(1);
  return AjaxBaseUrl + somepath;
}

function SetsCookie(c_name,value,expiredays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/;domain=.brighton.com");
}

function deleteCookie( name, path, domain ) {
  if ( getCookie( name ) ) document.cookie = name + "=" +
  ( ( path ) ? ";path=" + path : "") +
  ( ( domain ) ? ";domain=" + domain : "" ) +
  ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function checkCookie()
{
  var servername = '.'+window.location.hostname.replace('www.','');
  if(servername != '.brighton.com') {
    document.cookie='Guest=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain='+servername;
  }
  cexist=getCookie('Guest');
  if (cexist == null || cexist == "")
    {
    SetsCookie('Guest','0',365);
    }
  else if (cexist == "0") {
    deleteCookie('Guest','','');
    deleteCookie('Guest','/','');
  }
}


checkCookie();

evalDescendantScripts = function(root) {
  var scripts = root.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; ++i) {
    eval(scripts[i].innerHTML);
  }
};

function ProductTimer(id,expireUnixDate,tzos,setTimer,wordMode,preText,postText) {
  this.date = new Date();
  this.div = document.getElementById(id);
  this.timeZoneOst = (tzos - this.date.getTimezoneOffset())*60;
  this.expireSeconds = Math.round(expireUnixDate - (this.date.getTime() / 1000));
  this.expireSeconds += this.timeZoneOst;
  this.message = "";
  this.preText = "<span class=\"timer_pre_text\">"+preText+"</span> ";
  this.postText = " <span class=\"timer_post_text\">" + postText+"</span>";
  this.wordMode = wordMode;

  if(this.preText) this.preText += " ";
  if(this.expireSeconds > 0) {
    this.expireDays = Math.floor(this.expireSeconds / 86400);
    this.expireSeconds %= 86400;

    this.expireHours = Math.floor(this.expireSeconds / 3600);
    this.expireSeconds %= 3600;

    this.expireMinutes = Math.floor(this.expireSeconds / 60);
    this.expireSeconds %= 60;
    if(!this.wordMode) {
      if(this.expireSeconds < 10) this.expireSeconds = "0"+this.expireSeconds;
      if(this.expireMinutes < 10) this.expireMinutes = "0"+this.expireMinutes;
      if(this.expireHours < 10) this.expireHours = "0"+this.expireHours;
    }
    if(this.expireDays < 14) {
      if(this.expireHours < 24) {
        if(this.wordMode) {
          this.message = this.expireHours+" hours "+(this.expireMinutes)+" minutes "+(this.expireSeconds)+" seconds";
        } else {
          this.message = this.expireHours+":"+(this.expireMinutes)+":"+(this.expireSeconds);
        }

        if(!setTimer) window.setInterval("ProductTimer('"+id+"',"+expireUnixDate+","+tzos+",1,"+wordMode+",'"+preText+"','"+postText+"')",1000);
      } else if (this.expireDays == 1) {
        this.message = "1 day";
      } else {
        this.message = this.expireDays+" days";
      }
    }
  }
  this.div.innerHTML = this.preText + this.message + this.postText;
}


var QuickCart_quck_cart_update_div;
var QuickCart_add_to_cart_form = '';
var QuickCart_div_cart_area_added = false;
var QuickCart_div_cart_add_enabled= false;
var QuickCart_AddToCart = true;
var QuickCart_div_cart_area = 'shopping_cart_area';
var QuickCart_div_quickcart_area = 'cart_request_area';
var QuickCart_div_cart_status = 'cart_request_status';
var QuickCart_div_cart_response = 'cart_request_status';
var QuickCart_div_cart_action_id = 'cart_action_key';
var QuickCart_request = false;
var QuickCart_updateDiv = false;
var QuickCart_request_url = '';
var QuickCart_request = false;
var QuickCart_form = false;
var QuickCart_jsonp_enabled = false;
var quickCartAction = 1;
var QuickCart_ValuesSet=function() { };
var QuickCart_timeout_handler;

var QuickView_div = 'quick_view_area';
var QuickView_div_content = 'quick_view_stage';
var QuickView_windowposition = 0;
var QuickView_windowoffset = 100;
var QuickView_WindowPositionHandler = false;
var QuickView_request = false;
    
    
QuickCart_getHttpObject = function()
{
    var request;
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    request = false;
  }
  return request;
}

QuickCart_getRequest = function(url)
{
    QuickCart_request = QuickCart_getHttpObject();
    if(QuickCart_request) {
    QuickCart_request.onreadystatechange = function() {
        if (QuickCart_request.readyState == 4) {
          if (QuickCart_request.status == 200) {
                if(document.getElementById(quck_cart_update_div) && QuickCart_request.responseText){
                  document.getElementById(quck_cart_update_div).innerHTML = QuickCart_request.responseText;
                  document.getElementById(quck_cart_update_div).style.display = 'block';
                var qc_area = document.getElementById(QuickCart_div_quickcart_area);
                qc_area.className = qc_area.className.replace(/ cart_request_added_items/,'');
                        evalDescendantScripts(document.getElementById(quck_cart_update_div));

                }
          }
        }
    }
    QuickCart_request.open("GET", url, true);
      QuickCart_request.send(null);
  }
}

QuickCart_postRequest = function(url,parameters)
{
    QuickCart_request = QuickCart_getHttpObject();
    if(QuickCart_request) {
    QuickCart_request.onreadystatechange = QuickCart_postResponse;
    QuickCart_request.open("POST", url, true);
    QuickCart_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // QuickCart_request.setRequestHeader("Content-length", parameters.length);
        // QuickCart_request.setRequestHeader("Connection", "close");
      QuickCart_request.send(parameters);
  }
}

QuickCart_postResponse = function()
{
  if (QuickCart_request.readyState == 4) {
      QuickCart_clearRequestTimeout();
                document.getElementById('cart_request_loading').style.display = 'none';
    if (QuickCart_request.status == 200) {
        if(document.getElementById(quck_cart_update_div) && QuickCart_request.responseText){
          document.getElementById(quck_cart_update_div).innerHTML = QuickCart_request.responseText;
          jQuery('#cartrequest_addeditems').hide();          document.getElementById(quck_cart_update_div).style.display = 'block';
          evalDescendantScripts(document.getElementById(quck_cart_update_div));
                document.getElementById(QuickCart_div_quickcart_area).style.zIndex = '400000100';
          document.getElementById(QuickCart_div_quickcart_area).className += " cart_request_added_items";
                document.getElementById('cart_request_loading').style.display = 'none';
                RemoveAllQuantities();
        
                        jQuery('#cartrequest_addeditems').fadeIn('slow'); 
              cart_popup_timeout = setTimeout(function() {jQuery("#cartrequest_addeditems").fadeOut('slow');}, 3800); 
              jQuery("#cartrequest_addeditems").hover(
                 function() {
                    clearTimeout(cart_popup_timeout);
                 },
                 function() {
                    clearTimeout(cart_popup_timeout);
                    cart_popup_timeout = setTimeout(function() {jQuery("#cartrequest_addeditems").fadeOut('slow');}, 1000); 
                 }
              );
              jQuery('#cartrequest_subnumber').hover(
                  function(){
                      cart_popup_timeout_wrapper = setTimeout(function(){
                          clearTimeout(cart_popup_timeout);
                          jQuery("#cartrequest_addeditems").fadeIn('slow');
                          cart_popup_timeout = setTimeout(function() {jQuery("#cartrequest_addeditems").fadeOut('slow');}, 3800); 
                          jQuery("#cartrequest_addeditems").hover(
                             function() {
                                clearTimeout(cart_popup_timeout);
                             },
                             function() {
                                clearTimeout(cart_popup_timeout);
                                cart_popup_timeout = setTimeout(function() {jQuery("#cartrequest_addeditems").fadeOut('slow');}, 1000); 
                             }
                          );
                      },300);
                  },
                  function(){
                      clearTimeout(cart_popup_timeout_wrapper);
                  }
              );
                      }
    } else {
                    document.getElementById('cart_request_loading').style.display = 'none';
        QuickCart_postForm();
    }
  }
}

QuickCart_postForm = function()
{
    if(QuickCart_form.action) {
        QuickCart_form.action = ajaxFormatUrl('cart');
        QuickCart_form.submit();
    }
}

QuickCart_getFormContents = function(form)
{
    var postelements = "";
    for(i=0; i<form.elements.length; i++)
    {
        if(postelements) postelements = postelements + "&";
        postelements = postelements + form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value);
    }
    if(quickCartAction == 2) {
        if(postelements) postelements = postelements + "&";
        postelements = postelements + 'registry_x'+"=1";
    }
    if(quickCartAction == 3) {
        if(postelements) postelements = postelements + "&";
        postelements = postelements + 'wishlist_x'+"=1";
    }
    return postelements;
}

QuickCart_getCartStatus = function()
{
    quck_cart_update_div = QuickCart_div_cart_status;
    QuickCart_getRequest(ajaxFormatUrl('Shop/Cart/Request/Total'));
}

QuickCart_postCartAction = function(form)
{
    quck_cart_update_div = QuickCart_div_cart_response;
    document.getElementById('cart_request_loading').style.zIndex = '400000100';
    document.getElementById('cart_request_loading').style.display = "block";
    QuickCart_postRequest(ajaxFormatUrl('Shop/Cart/Request/Items'), QuickCart_getFormContents(form));
}

QuickCart_init = function()
{
    request = QuickCart_getHttpObject();
    if(request) {
        if(document.getElementById(QuickCart_div_cart_area) && !QuickCart_div_cart_area_added) {
            QuickCart_div_cart_area_added = true;
            document.getElementById(QuickCart_div_cart_area).innerHTML += '<div id="cart_request_area"><div id="cart_request_status" style="display:none;"></div></div>';
            var loadingDiv = document.createElement('div');
            loadingDiv.id = 'cart_request_loading';
            loadingDiv.style.display = 'none';
            loadingDiv.style.zIndex = 400000100;
            document.getElementById('body').appendChild(loadingDiv);
        }
        if(QuickCart_div_cart_area_added && document.getElementById(QuickCart_div_quickcart_area)) {
            QuickCart_div_cart_add_enabled = true;
        }
    }
}

QuickCart_checkQuckCart = function()
{
    QuickCart_init();
    if(QuickCart_div_cart_area_added) {
        if(QuickCart_jsonp_enabled){
            quck_cart_update_div = QuickCart_div_cart_status;
            QuickCart_JsonpRequest("http://www.brighton.com/Shop/Cart/Request/Total?callback=QuickCart_JsonpResponseTotal");
        }else{
            QuickCart_getCartStatus();
  }
    }
}

QuickCart_JsonpRequest = function(url) {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

function QuickCart_JsonpResponseTotal(response){
    if(document.getElementById(quck_cart_update_div)){
        document.getElementById(quck_cart_update_div).innerHTML = response.cart_count;
        document.getElementById(quck_cart_update_div).style.display = 'block';
        var qc_area = document.getElementById(QuickCart_div_quickcart_area);
        qc_area.className = qc_area.className.replace(/ cart_request_added_items/,'');
    }
}

QuickCart_setActionId = function()
{
    var action_input = document.getElementById(QuickCart_div_cart_action_id);
    var key = 1 + Math.floor(Math.random()*99999999);
    if(action_input) {
        action_input.value = key;
    }
}

QuickCart_setRequestTimeout = function()
{
    QuickCart_timeout_handler = setTimeout("QuickCart_callRequestTimeout()",4000);
}

QuickCart_clearRequestTimeout = function()
{
    clearTimeout(QuickCart_timeout_handler);
}

QuickCart_callRequestTimeout = function()
{
    QuickCart_postForm();
}

QuickCart_addEventToCart = function(form_id)
{
  if(document.getElementById("eventtermsandcondition").checked==false){
    alert("Please agree to the terms and conditions");
    return false;   
  }
  var x=document.getElementsByTagName("input");
  for (var i = 0; i < x.length; i++) {
      
  }
  QuickCart_addToCart(form_id);
  window.location = ajaxFormatUrl("cart");
}



function phonenumbertrim(stringToTrim) {
  return stringToTrim.replace(/^\s+|\s+$/g,"");
}
QuickCart_addToCart = function(form_id)
{
    QuickCart_init();
    if(quickCartAction == 1 && QuickCart_div_cart_add_enabled && QuickCart_AddToCart == true) {
        QuickCart_setActionId();
        QuickCart_setRequestTimeout();
        var error = CheckQuantitySubmitNoMessage(form_id);
        if(form_id == 'sub_items' && !error || form_id != 'sub_items') {
            if(QuickCart_form = document.getElementById(form_id)){
                QuickCart_postCartAction(QuickCart_form);
                window.scroll(0,0);
                QuickView_SetToTop();
                return false;
            }
        } else {
            alert(error);
            return false;
        }
    }
    return true;
}
QuickView_getWindowOffset = function() {

  // Window Size

  if (self.innerHeight) { // Everyone but IE
    return window.pageYOffset;
  } else if (document.documentElement && document.documentElement.clientHeight) { // IE6 Strict
    return document.documentElement.scrollTop;
  } else if (document.body) { // Other IE, such as IE7
    return document.body.scrollTop;
  }
}


QuickView_CheckWindowPosition = function()
{
    var wPos = QuickView_getWindowOffset();
    if(wPos != QuickView_windowposition || !wPos) {
        QuickView_windowposition = wPos;
        var d = QuickView_windowposition+QuickView_windowoffset;
        document.getElementById(QuickView_div).style.top = d + 'px';
    }
    //QuickView_WindowPositionHandler = setTimeout("QuickView_CheckWindowPosition()",400);
}


QuickView_SetToTop = function()
{
    if(document.getElementById(QuickView_div)) {
        document.getElementById(QuickView_div).style.top = QuickView_windowoffset + 'px';
    }
}

QuickView_ClearWindowPosition = function()
{
    QuickView_windowposition=0;
    if(QuickView_WindowPositionHandler) clearTimeout(QuickView_WindowPositionHandler);
}

QuickViewOpen = function()
{
    QuickView_CheckWindowPosition();
    document.getElementById(QuickView_div).style.display = 'block';
    
}

QuickViewClose = function()
{
    QuickView_ClearWindowPosition();
    document.getElementById(QuickView_div).style.display = 'none';
}

QuickView_getRequest = function(url, id)
{
    $.get(url, function(data) {
        $('#'+QuickView_div_content).html(data);
        jQuery("img[src='']").parent('.alt_image').css('display','none');


        var vidlink = document.getElementById('product_video_link');
        if (vidlink) {
          vidlink.style.display = 'none';
          vidlink.style.visibility = 'hidden';  
        }
                if (typeof(resx) != "undefined" && typeof(certonaResx) != "undefined") {
            oldresx = resx;
            resx = {};
            resx.appid = oldresx.appid;
            resx.top1 = oldresx.top1;
            resx.top2 = oldresx.top2;
            resx.event = "quickview";
            resx.itemid = id;
            resx.links = id;
            if (certonaResx.run) {
                certonaResx.run();
            }
        }
        
    });
}

QuickView = function(id)
{
    request = QuickCart_getHttpObject();
    var url = ajaxFormatUrl("Shop/Product/Request?id=")+id;
    
    if(request && id) {
        document.getElementById(QuickView_div_content).innerHTML = '<div class="quickview_loading"></div>';
        QuickViewOpen();
        QuickView_getRequest(url, id);

    } else {
        QuickViewClose();
        window.location = ajaxFormatUrl("show_product/")+id;
    }
}

MemberMessage = function()
{
  var urlr = ajaxFormatUrl("Shop/Customer/MessageRequest");
    $j.get(urlr,function(data) {
      if(data != "") {
        $j("#customer_message").html(data);
        $j("#customer_message").css('display','inline');
		      }
    });
}

sfHover = function() {
  if(document.getElementById("meua")){
  var sfEls = document.getElementById("meua").getElementsByTagName("LI");
  for (var i=0; i<sfEls.length; i++) {
    sfEls[i].onmouseover=function() {
      this.className+=" sfhover";
    }
    sfEls[i].onmouseout=function() {
      this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
    }
  }
      }
    if(document.getElementById("meu")){
    sfEls = document.getElementById("meu").getElementsByTagName("LI");
  for (var i=0; i<sfEls.length; i++) {
    sfEls[i].onmouseover=function() {
      this.className+=" sfhover";
    }
    sfEls[i].onmouseout=function() {
      this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
    }
  }
  }
}

if (window.attachEvent) window.attachEvent("onload", sfHover);

function addEvent(obj, evType, fn){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
  } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
    return false;
  }
}

supportsInputPlaceholder = 'placeholder' in document.createElement('input');
function setInputPlaceholderFallback(elt) {
  if (supportsInputPlaceholder)
    return;
  if (elt.value == '')
    elt.value = elt.placeholder;
  addEvent(elt, 'focus', function() {
    if (elt.value == elt.placeholder)
      elt.value = '';
  });
  addEvent(elt, 'blur', function() {
    if (elt.value == '')
      elt.value = elt.placeholder;
  });
}

jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

(function($) {
    $.extend({
        debounce: function(fn, timeout, invokeAsap, ctx) {
            if(arguments.length == 3 && typeof invokeAsap != 'boolean') {
                ctx = invokeAsap;
                invokeAsap = false;
            }
            var timer;
            return function() {
                var args = arguments;
                ctx = ctx || this;
                invokeAsap && !timer && fn.apply(ctx, args);
                clearTimeout(timer);
                timer = setTimeout(function() {
                    !invokeAsap && fn.apply(ctx, args);
                    timer = null;
                }, timeout);
            };
        }
    });
})(jQuery);

unserializeParams = function(str) {
  var parts = str.split('&');
  var data = {};
  for (var i = 0; i < parts.length; i++) {
    var pos, name, value;
    if ((pos = parts[i].indexOf('=')) != -1) {
      name = decodeURIComponent(parts[i].substr(0, pos));
      value = decodeURIComponent(parts[i].substr(pos+1));
      data[name] = value;
    }
  }
  return data;
};

serializeParams = function(obj) {
  var strParts = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      strParts.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return strParts.join("&");
};

setUserData = function(name, value) {
  userData[name] = value;
  saveUserData();
};

saveUserData = function() {
  $j.cookie('userData', serializeParams(userData), {expires:14,path:'/',domain:".brighton.com"});
};

(function() {
  var c;
  if (c = jQuery.cookie('userData')) {
    userData = unserializeParams(c);
  } else {
    userData = {};
  }
})();

//Keeps a running total for products which share the same parent id
function SiblingsSum(parent_id){
  var sum = 0;
  var inputs = jQuery('input[data-parentid="' + parent_id + '"]')
  for (var i = 0; i < inputs.length; i++) {
     sum = (eval(sum) + eval(inputs[i].value)); 
  } 
  return sum;
}

function ValidateInputRangeCart(id,product_min,product_max,sibling_qty,parent_min,parent_max)
{
  var min = product_min;
  if (min == undefined) min = 0;
  var max = product_max;
  if (max <= 0) max = 9999;
  var parent_min = parent_min;
  if (parent_min == undefined) parent_min = 0;
  var parent_max = parent_max;
  if (parent_max <= 0) parent_max = 9999;
  if (sibling_qty > parent_max){
    remainder = parent_max - (sibling_qty - id.value);
    if (remainder < 0) remainder = 0;
    alert("Sorry but these items share a limit of "+ parent_max);
    id.value = remainder;
  }
  if (id.value > max){
    id.value=max;
    alert("The maximum quantity for this item is " + max );
  }

  else if (id.value < min && id.value != 0) alert("Sorry the minimum quantity for this item is " + min );
  else if (sibling_qty < parent_min && sibling_qty!= 0) alert("Please note you will need to purchase at least " + parent_min + " of this item.");

}

function yearlessDateSelector() {
    var dayCounts = new Array();
    dayCounts[0] = ''; dayCounts[1] = 31; dayCounts[2] = 29;
    dayCounts[3] = 31; dayCounts[4] = 30;
    dayCounts[5] = 31; dayCounts[6] = 30;
    dayCounts[7] = 31; dayCounts[8] = 31;
    dayCounts[9] = 30; dayCounts[10] = 31;
    dayCounts[11] = 30; dayCounts[12] = 31;
    var dates = new Array();
    dates[0] = 'Select a Date'; dates[1] = '1st'; dates[2] = '2nd'; dates[3] = '3rd'; 
    dates[4] = '4th'; dates[5] = '5th'; dates[6] = '6th'; 
    dates[7] = '7th'; dates[8] = '8th'; dates[9] = '9th'; 
    dates[10] = '10th'; dates[11] = '11th'; dates[12] = '12th'; 
    dates[13] = '13th'; dates[14] = '14th'; dates[15] = '15th'; 
    dates[16] = '16th'; dates[17] = '17th'; dates[18] = '18th'; 
    dates[19] = '19th'; dates[20] = '20th'; dates[21] = '21st'; 
    dates[22] = '22nd'; dates[23] = '23rd'; dates[24] = '24th'; 
    dates[25] = '25th'; dates[26] = '26th'; dates[27] = '27th'; 
    dates[28] = '28th'; dates[29] = '29th'; dates[30] = '30th'; 
    dates[31] = '31st'; 
    jQuery('#Customer_user_customer_mybirthday_date').find('option').remove();
    for(var i=0;i<=dayCounts[jQuery('#Customer_user_customer_mybirthday_month').val()];i++) {
        jQuery('#Customer_user_customer_mybirthday_date').append('<option value='+i+'>'+dates[i]+'</option>');
    }
}

function checkPost(id)
{
  if(id != "")
    id = "_"+id;
  else
    id = "";
  if(document.getElementById('contact_email'+id).value == document.getElementById('contact_emailchk'+id).value) {
    if(chkForm('frm'+id, 'Name', 'Name is required', 'Email', 'Email address is required', 'Subject', 'Subject is required', 'Message', 'Message is required.')) {
      return true;
    }else{return false;}
  } else {
    alert("Email addresses don't match. Check your email address.'");
    return false;
  }
}