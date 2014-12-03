//~~tv:6020.20140717
//~~tc: Add support for value and currency conversion fields


var _fbds = _fbds || {};
var _fbq = _fbq || [];

//tealium universal tag - utag.sender.6020 ut4.0.201408112154, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;
    // Start Tealium loader
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { b.hFlag = 0; b.onreadystatechange = function () { if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) { b.hFlag = 1; o.cb(); } }; b.onload = function () { if (!b.hFlag) { b.hFlag = 1; o.cb(); } }; } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    u.ev = {'view': 1};
    u.initialized = false;
    u.map={};
  u.extend=[];

    u.send=function(a,b){
      if (u.ev[a] || u.ev.all !== undefined){
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        u.data = {
          "base_url" : "//connect.facebook.net/en_US/fbds.js",
          "pixel_id" : "700313256667146",
          "value" : "",
          "currency" : ""
        }

        var c, d, e, f;

        
        
        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("event.") === 0) {
                c.push(b[d]);
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }
        // End Mapping

        window._fbds.pixelId = u.data.pixel_id;


        if (!u.initialized) {
          u.initialized = true;
          window._fbq.push(["track", "PixelInitialized", {"value" : u.data.value, "currency" : u.data.currency}]); //map value, currency
        }

        for (var i=0; i<c.length; i++) {
          window._fbq.push(c[i]);
        }
        
        // Start Loader Callback
        u.loader_cb = function () {
        };
        // End Loader Callback

        u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_200' });
        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }('200', 'oakley.hybrisprod'));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

