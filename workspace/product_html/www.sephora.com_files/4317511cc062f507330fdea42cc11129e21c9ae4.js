var wa = wa || {};


wa.config = {};

wa.search = {requests: 0, requestCache: {}};

/** @constructor */
wa.lineItem = function (productId, productName, skuId, skuName, quantity, price, special, biType, notInStock, isAncillary) {
  this.productId = productId;
  this.productName = productName;
  this.skuId = skuId;
  this.skuName = skuName;
  this.quantity = quantity;
  this.price = price;
  this.special = special ? special.toLowerCase() : "";
  this.biType = biType ? biType.toLowerCase() : "unspecified";
  this.notInStock = notInStock;
  this.isAncillary = isAncillary;
};

/** @constructor */
wa.Payment = function (type, value) {
  this.type = type;
  this.value = value;
};

/** @constructor */
wa.Refinement = function (type, value) {
  this.type = type;
  this.value = value;
};


wa.setCookie = function (name, value, days, onTopDomain) {
    if(typeof(days)==="undefined") { days = 365; }
    var millis = days*86400000;
  if(typeof(onTopDomain)==="undefined") { onTopDomain=false; }
      millis||(millis=0);

      var cookieStr = escape(name) + "=" + escape(value);//use encodeURI, decodeURI, encodeURIComponent, and decodeURIComponent

      if(millis!==0) {
        var now = new Date();
        var then = new Date(now.getTime() + millis);
        var exp = then.toGMTString();
        cookieStr += "; expires=" + exp;
      }

      cookieStr += "; path=/";
      if(onTopDomain) {
        var dom, parts;
        if(isNaN(parseInt(document.domain.replace(/\./g, "")))) {
          parts = document.domain.split(".");
          dom = parts.slice(-2).join(".");
        } else {
          dom = document.domain;
        }
        cookieStr += ";domain=" + dom;
      }
      document.cookie = cookieStr;
      return cookieStr;
};

wa.getCookie = function (key, skips) {
  var matchedCookies = [];
  if (skips == null)
        skips = 0;
      var cookie_string = "" + document.cookie;
      var cookie_array = cookie_string.split("; ");
      for (var i = 0; i < cookie_array.length; ++i) {
        var single_cookie = cookie_array[i].split("=");
        if (single_cookie.length != 2)
          continue;
        var name = unescape(single_cookie[0]);
        var value = unescape(single_cookie[1]);
        // Return cookie if found:
        /*if (key == name && skips-- == 0){
          /*return value;
        }
        */
        if (key == name){
          matchedCookies.push(value);
        }
      }
      // When there are more than one of the same name, get the second.
      if (matchedCookies.length > 1){ 

          return matchedCookies[1];
          /*I don't know if/where skips are used but this may need to be added back in...
          return matchedCookies[skips];*/
      }
      else if(matchedCookies.length){return matchedCookies[0];}
      else{return null;}

};

wa.deleteCookie = function (name, topLevelDomain) {
  this.setCookie(name, '', -1, topLevelDomain);
};

wa.isEmpty = function (a) {
  return a === null || typeof a == 'undefined' || a === '';
};

/*
@param bool includeUS - When true return even if sitLoc is 'us' and use '-' instead of ':'
*/
wa.getLocLangPrefix = function(includeUS){
  var siteLang = wa.getCookie("site_language");
  var siteLoc = wa.getCookie("site_locale");
  var prefix = "";
  if (siteLang && siteLoc){
    if (includeUS) { prefix = siteLoc + "-" + siteLang; }
    else if (siteLoc !== "us") { prefix = siteLoc + ":" + siteLang + ":"; }
  }
  return prefix;
}

wa.getShippingCountry = function(){
    var country = wa.getCookie("ship_country");
    return country ? country.toLowerCase() : "us";
}

wa.countryPath = function(newSelection){
    var path = sessionStorage.countryPath;
    if(newSelection){
      path = path ? path + "<" + newSelection : newSelection;
      sessionStorage.countryPath = path.toLowerCase();
    }
    return path;
}

wa.isOriginalContent = true; // used to tell if the ajax page is the first one for setting events

//fix for pages that lose data when switching between https and http
(function(){
  var was = wa.getCookie("wasHttps");
    var is = location.protocol == "https:";
    wa.setCookie("wasHttps", is, 1);
  wa.wasHttps = was;
})();

wa.inStringRegExpList = function (a,v) {
  for (var i = a.length; i--;) {
    if (typeof a[i] == 'string' && a[i] == v) {
      return true;
    } else if (a[i] instanceof RegExp && a[i].test(v)) {
      return true;
    }
  }
  return false;
};

wa.getQueryParam = function(name, href) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var result = RegExp('[\\?&]' + name + '=([^&#]*)').exec(href);
  return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
};

wa.findStoreName = function(){
  return $(".storehq-detail .store-name").length > 0 ? $(".storehq-detail .store-name").text().trim() +":" : "";
}

// cleanup data being passed into SiteCatalyst
// (perform recursive URL-decoding, etc.)
wa.clean = function(txt) {
  // called 3x because some content is encoded multiple times
  txt = decodeURIComponent(decodeURIComponent(decodeURIComponent(txt)));
  return txt;
};

// called twice to make sure both document ready and script loaded
wa.initOnReady = function() {
  if (wa.config.ready) {
    if((typeof wa !== 'undefined') && ("waInitReady" in wa)) {
        wa.init();
    } else {
        $("body").on("waInitReady", function(){wa.init();});
    }
  } else {
    wa.config.ready=true;
  }
};

wa.getNextPageData = function(clear){
  var next = wa.getCookie('nextPage');
  next = JSON.parse(next ? next : "{}");
  if(clear){
    wa.setCookie("nextPage", "{}", 1);
  }
  return next;
};

wa.forNextPage = function(data){
  var next= wa.getNextPageData();
  for(var n in data){
    next[n] = data[n];
  }
  wa.setCookie("nextPage", JSON.stringify(next), 1);
};

wa.addSavedVarsToObject = function(obj){
  var prevData = wa.getNextPageData(true);
  for(var n in prevData){
    if(n == "events"){
      obj[n] = s[n] && s[n].length > 0 ? obj[n] + "," + prevData[n] : prevData[n];
    } else if (n.indexOf("prop") > -1 || n.indexOf("eVar") > -1){
      obj[n] = prevData[n];
    }
  }
}

wa.findInitalSearchNum = function(tabName){
  var num = "0";
  if(wa.search.tabs){
    $(wa.search.tabs).each(function(){
      if(this.title.toLowerCase() == tabName.toLowerCase()){
        num = this.total_items;
      }
    });
  } else {
    return "";
  }
  return num.toString();
};

wa.widthHeight = function(){
  return screen.width+"x"+screen.height;
};

wa.firstClick = function (target) {
  // Test if clicked argument passed
  if ( !(target.attr("data-clicked")) ) {
    target.attr("data-clicked", "true");
    return true;
  }
  else {
    return false;
  }
};

wa.removeSpecialChars = function(s){
  var charMatrix = { ô:"o","&#244;":"o", è:"e", é:"e", "&#200;":"e", "È":"e", "&#233":"e", "&#201;":"e", à:"a", "®":"", "&#174;":"",
    "™":"", "&#153;":"", "&#8482":"", "&#192;":"a", "&#236;":"i", "&#238;":"i", "&#212;": "o", "&#232;": "e"};
  var re = new RegExp(Object.keys(charMatrix).join("|"),"gi");
  s = s.replace(re, function(matched){
    return charMatrix[matched];
  });
  return s;
};

wa.setPageName = function(name){
  name = wa.removeSpecialChars(name);
  wa.pageName = name.toLowerCase();
};

wa.colorIqLookUp = "directlookup"; //overridden in eventBridge if reverse lookup