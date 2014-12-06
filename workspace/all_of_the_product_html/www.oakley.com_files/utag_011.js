//~~tv:template_script.20131125
//~~tc: Adding config for Account ID.

//tealium universal tag - utag.sender.template_script ut4.0.201405010940, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  u = utag.o[loader].sender[id] = {};
  u.ev = {'view':1};
  u.data = {};
  u.data.acct = "10479";
  u.map={"Steelhouse_AccountID":"acct"};
  u.extend=[];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      
      var c,d,e,f;
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        u.data[e[f]] = b[d];
      }}}

      (function () {
          "use strict";
          var e = null,
              b = "4.0.0",
              n = u.data.acct,
              additional = u.data.additional || "",
              t, r, i;
          try {
              t = top.document.referer !== "" ? encodeURIComponent(top.document.referrer.substring(0, 2048)) : ""
          } catch (o) {
              t = document.referrer !== null ? document.referrer.toString().substring(0, 2048) : ""
          }
          try {
              r = window && window.top && document.location && window.top.location === document.location ? document.location : window && window.top && window.top.location && "" !== window.top.location ? window.top.location : document.location
          } catch (u) {
              r = document.location
          }
          try {
              i = parent.location.href !== "" ? encodeURIComponent(parent.location.href.toString().substring(0, 2048)) : ""
          } catch (a) {
              try {
                  i = r !== null ? encodeURIComponent(r.toString().substring(0, 2048)) : ""
              } catch (f) {
                  i = ""
              }
          }
          var l, c = document.createElement("script"),
              h = null,
              p = document.getElementsByTagName("script"),
              d = Number(p.length) - 1,
              v = document.getElementsByTagName("script")[d];
          if (typeof l === "undefined") {
              l = Math.floor(Math.random() * 1e17)
          }
          h = "dx.steelhousemedia.com/spx?" + "dxver=" + b + "&shaid=" + n + "&tdr=" + t + "&plh=" + i + "&cb=" + l + additional;
          c.type = "text/javascript";
          c.src = ("https:" === document.location.protocol ? "https://" : "http://") + h;
          v.parentNode.insertBefore(c, v)
      })()

    }
  }
  utag.o[loader].loader.LOAD(id);
})('181','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag

