var __$1D0C = __$1D0C || {};
if (__$1D0C) {
  (function (d, r) {
    r.pir = r.pir || {};
    r.pir.swap = function (img, isInputTag) {
        try {
        var sl_src, newsrc, setAttrName, oldsrc;
        setAttrName = "sl_set";
        sl_src = img.getAttribute("sl_src");
        if (typeof (sl_src) == "undefined" || sl_src == null || sl_src == "") { return; }
        if (img.getAttribute(setAttrName) == "true") { return; }

        if (!isInputTag && r.pir.images[sl_src]) {
          newsrc = r.pir.images[sl_src];
        }
        else {
          newsrc = unescape(sl_src);
        }

        if( img.sl_haschanged_url ) {
            return;
        }

        oldsrc = img.getAttributeNode('src').value;
        if ( oldsrc.slice(0, 5) != "data:") {
            return;
        }

        img.setAttribute(setAttrName, "true");
        img.src = newsrc;
        img.sl_haschanged_url = false;
      }
      catch (e) { /* eat */ }
    }
    r.pir.replace = function () {
      try {
        var imgs, i, inputs;
        inputs = d.getElementsByTagName("input");
        for (i = 0; i < inputs.length; i++) {
          if (inputs[i].getAttribute("type") && inputs[i].getAttribute("type").toLowerCase() == "image") {
            r.pir.swap(inputs[i], true);
          }
       
        }
        imgs = d.getElementsByTagName("img");
        for (i = 0; i < imgs.length; i++) {
          r.pir.swap(imgs[i], false);
        }
      }
      catch (e) { /* eat */ }
    }
    r.pir.images = r.pir.images || {};
    
    r.pir.replace();
    r.pir.images = {};

  })(document, __$1D0C);
}