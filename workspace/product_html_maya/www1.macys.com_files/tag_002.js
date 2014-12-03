BrightTag.instance.errors({enabled:false});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22http://admin.brightcove.com/js/BrightcoveExperiences.js\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22http://admin.brightcove.com/js/APIModules_all.js\x22\x3e\x3c/script\x3e',{tagId:198781});
BrightTag.instance.appendContent('\x3cscript\x3e\nvar monetateT \x3d new Date().getTime();\n(function() {\n    var p \x3d document.location.protocol;\n    if (p \x3d\x3d \x22http:\x22 || p \x3d\x3d \x22https:\x22) {\n        var m \x3d document.createElement(\x27script\x27); m.type \x3d \x27text/javascript\x27; m.async \x3d true; m.src \x3d (p \x3d\x3d \x22https:\x22 ? \x22https://s\x22 : \x22http://\x22) + \x22b.monetate.net/js/1/a-de9c980b/p/macys.com/\x22 + Math.floor((monetateT + 1604491) / 3600000) + \x22/g\x22;\n        var s \x3d document.getElementsByTagName(\x27script\x27)[0]; s.parentNode.insertBefore(m, s);\n    }\n})();\n\x3c/script\x3e',{tagId:1022219});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22http://macys.ugc.bazaarvoice.com/static/7129aa/bvapi.js\x22\x3e\x3c/script\x3e',{tagId:1316202});
BrightTag.instance.appendContent('\x3cscript\x3e\n(function(){\n  var dom,doc,where,iframe \x3d document.createElement(\x27iframe\x27);\n  iframe.src \x3d \x22javascript:false\x22;\n  (iframe.frameElement || iframe).style.cssText \x3d \x22width:0;height:0;border:0;display:none;\x22;\n  where \x3d document.getElementsByTagName(\x27script\x27)[0];\n  where.parentNode.insertBefore(iframe, where);\n\n  try {\n    doc \x3d iframe.contentWindow.document;\n  } catch(e) {\n    dom \x3d document.domain;\n    iframe.src\x3d\x22javascript:var d\x3ddocument.open();d.domain\x3d\x27\x22+dom+\x22\x27;void(0);\x22;\n    doc \x3d iframe.contentWindow.document;\n  }\n  doc.open()._l \x3d function() {\n    var js \x3d this.createElement(\x22script\x22);\n    if(dom) this.domain \x3d dom;\n    js.id \x3d \x22boomr-if-as\x22;\n    js.src \x3d \x27//c.go-mpulse.net/boomerang/\x27 +\n    \x27LAH8J-FVQ95-M6TNY-QQEKG-HA4QA\x27;\n    BOOMR_lstart\x3dnew Date().getTime();\n    this.body.appendChild(js);\n  };\n  doc.write(\x27\x3cbody onload\x3d\x22document._l();\x22\x3e\x27);\n  doc.close();\n  })();\n  \x3c/script\x3e',{tagId:1551754});
BrightTag.Blab.group('domready').wait(function () {
BrightTag.instance.dbe('get device', 'var str \x3d bt_cookie(\x27MISCGCs\x27);\r\nstr.indexOf(\x27iPad\x27);\r\n', {pageId:7002});
BrightTag.instance.dbe('pdp category', 'document.title.split(\x22-\x22)[2]', {pageId:10409});
BrightTag.instance.dbe('page id', 'MACYS.brightTag.navigation.pageID', {pageId:11697});
BrightTag.instance.dbe('product id', 'MACYS.brightTag.product.productID', {pageId:11697});
BrightTag.instance.dbe('random', 'BrightTag.Random.integer(9999999999)', {pageId:11697});
BrightTag.instance.dbe('product name', 'MACYS.brightTag.product.productName', {pageId:10409});
BrightTag.instance.dbe('true fit enabled', 'MACYS.brightTag.product.trueFitSize', {pageId:11697});
BrightTag.instance.dbe('category id', 'MACYS.brightTag.product.productCategoryID', {pageId:10409});
BrightTag.instance.dbe('document title', 'document.title', {pageId:7002});
BrightTag.instance.dbe('get fine jewelry breadcrumb', 'var str \x3d $(\x27meta[itemprop\x3d\x22breadcrumb\x22]\x27).attr(\x22content\x22); str.indexOf(\x27Fine Jewelry\x27);', {pageId:10409});
BrightTag.instance.dbe('olapic enabled', 'MACYS.brightTag.product.olapicEnabled', {pageId:7002});
BrightTag.instance.dbe('breadcrumb - element two', 'document.getElementsByTagName(\x22meta\x22)[11].getAttribute(\x27content\x27).split(\x22-\x22)[1];', {pageId:10409});
BrightTag.instance.dbe('customer user id', 'bt_cookie(\x27macys_online_uid\x27)', {pageId:7929});
BrightTag.instance.dbe('current page url', 'document.url', {pageId:7002});
BrightTag.instance.dbe('pdp intentifier', 'document.URL.split(\x22/\x22)[4]', {pageId:14208});
BrightTag.instance.dbe('pdp top level category name', 'MACYS.brightTag.product.topLevelCategoryName.toLowerCase()', {pageId:10409});
BrightTag.EventBinding.bind('test bag', '.addToBagButton', 'DIRECT/click', {pageId:10409});
BrightTag.EventBinding.bind('add to bag', 'img.addToBagButton', 'DIRECT/click', {pageId:10409});
BrightTag.EventBinding.bind('order by phone', '#orderByPhoneImage', 'DIRECT/click', {pageId:11697});
BrightTag.EventBinding.bind('add to bag', 'img.addToBagButton', 'DIRECT/click', {pageId:11697});
BrightTag.instance.appendContent('\x3cscript type\x3d\x27text/javascript\x27\x3e\n        (function() {\n          var items \x3d [],\n            prdArr \x3d [],\n            varsString \x3d (";num\\x3d"+bt_data(\x27random\x27)).replace(/(\\s+)/gm,\x22\x22);\n\n          if (!BrightTag.Types.isArray(items)) {\n            items \x3d [items];\n          };\n\n          var addIfDefined \x3d function(fieldName, keyStr, indexStr) {\n            if (fieldName) {\n              prdArr.push(keyStr + indexStr + \x22:\x22 + fieldName);\n            }\n          }\n\n          BrightTag.Util.each(items, function(prod, index) {\n            var indexStr \x3d (index + 1);\n            addIfDefined(prod[\x22\x22], \x22i\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22p\x22, indexStr);\n            addIfDefined(prod[\x220\x22], \x22q\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22c\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22l\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22a\x22, indexStr);\n          });\n\n          BrightTag.Content.iframe(\x22//3856256.fls.doubleclick.net/activityi;src\x3d3856256;type\x3dmacys001;cat\x3dalluniqu\x22 + varsString + \x22;ord\x3d1;prd\x3d\x22 + prdArr.join(\x22|\x22), {display: \x27none\x27});\n        })();\n      \x3c/script\x3e',{tagId:19414});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function() {\n          window.CRITEO \x3d null;\n          var criteoVals \x3d {\n                \x27pageType\x27: \x27product\x27,\n                \x27Product ID\x27: (""+bt_data(\x27product id\x27))\n              }, criteoCustomConfig \x3d {},\n              customParams \x3d [(\x27\x27).split(\x27,\x27), (\x27\x27).split(\x27,\x27)];\n\n          if (criteoVals[\x27Product ID\x27] !\x3d\x3d \x27\x27) {\n            criteoCustomConfig[\x27Product ID\x27] \x3d [\x27i\x27, 0];\n          }\n          BrightTag.each(customParams, function(customParam) {\n            if (customParam.length \x3d\x3d 3) {\n              var criteoLabel \x3d BrightTag.trim(customParam[0]);\n              criteoVals[criteoLabel] \x3d BrightTag.trim(customParam[2]);\n              criteoCustomConfig[criteoLabel] \x3d [BrightTag.trim(customParam[1]), 0];\n            }\n          });\n\n          window.CRITEO_CONF \x3d [[criteoVals],\n              ["5535", "pmo",\n              "us", \x27000\x27,\n              [BrightTag.trim("7719498, 7719499").split(/\\s*,\\s*/)],\n              criteoCustomConfig]];\n        }());\n      \x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//static.criteo.net/js/universal/v0_5_4/criteo_ld.js\x22\x3e\x3c/script\x3e',{tagId:22563,group:'criteo'});
try { BrightTag.instance.appendContent('\x3cscript type\x3d\x27text/javascript\x27\x3e\n        (function() {\n          var items \x3d [],\n            prdArr \x3d [],\n            varsString \x3d (";u1\\x3d"+bt_data(\x27category id\x27)+";u2\\x3d"+bt_data(\x27product id\x27)+";u12\\x3d"+bt_data(\x27product name\x27)).replace(/(\\s+)/gm,\x22\x22);\n\n          if (!BrightTag.Types.isArray(items)) {\n            items \x3d [items];\n          };\n\n          var addIfDefined \x3d function(fieldName, keyStr, indexStr) {\n            if (fieldName) {\n              prdArr.push(keyStr + indexStr + \x22:\x22 + fieldName);\n            }\n          }\n\n          BrightTag.Util.each(items, function(prod, index) {\n            var indexStr \x3d (index + 1);\n            addIfDefined(prod[\x22\x22], \x22i\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22p\x22, indexStr);\n            addIfDefined(prod[\x220\x22], \x22q\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22c\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22l\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22a\x22, indexStr);\n          });\n\n          BrightTag.Content.iframe(\x22//3856256.fls.doubleclick.net/activityi;src\x3d3856256;type\x3dmacys001;cat\x3dmacys520\x22 + varsString + \x22;ord\x3d'+eval('Math.random()*10000000000000')+';prd\x3d\x22 + prdArr.join(\x22|\x22), {display: \x27none\x27});\n        })();\n      \x3c/script\x3e',{tagId:27504});
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("1012760282"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:164769,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.macys.com/navapp/web20/assets/script/foresee/foresee-trigger.js\x22\x3e\x3c/script\x3e',{tagId:620184});
BrightTag.instance.appendContent('\x3cimg src\x3d\x22//tracking.searchmarketing.com/welcome.asp?SMCID\x3d12015634\x26x\x3d\x22 width\x3d1 height\x3d1\x3e',{tagId:1286759});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n          new Image().src \x3d new BrightTag.HTTP.URL(\x27//helium.adextent.com/vi\x27).appendParam(\x22url\x22,(""+bt_data(\x27current page url\x27)) || \x27http://www1.macys.com/shop/product/motherhood-maternity-long-sleeve-v-neck-top?ID\\x3d1651335\\x26CategoryID\\x3d66718\x27).toString();\n      \x3c/script\x3e\n      \x3cimg src\x3d\x22//helium.adextent.com/sync?csurl\x3dhttp%3A%2F%2Fs.thebrighttag.com%2Fcs%3Fbtt%3D6En_kxa77-7aAFwl3mZYpshk35dlu0gBK9mO4Opp_mQ%26tp%3DCrVDT8R\x22 width\x3d\x221\x22 height\x3d\x221\x22 /\x3e',{tagId:1327349});
BrightTag.instance.appendContent('\x3cscript\x3e\n\n        \t\t\t\t(function (d, t) {\n\t\t\t    var g \x3d d.createElement(t), s \x3d d.getElementsByTagName(t)[0];\n\t\t\t    g.src\x3d\x27https://www.loopassets.net/app/macys/loop.js\x27;\n\t\t\t    g.async \x3d true;\n\t\t\t    s.parentNode.insertBefore(g, s);\n\t\t\t}(document, \x27script\x27));\n\n\x3c/script\x3e',{tagId:1518887});
BrightTag.EventBinding.when('add to bag').fire(49332);
BrightTag.EventBinding.when('test bag').fire(904035);
try { if (eval('bt_data(\x27pdp top level category name\x27) \x3d\x3d \x22mattresses\x22')) {
BrightTag.EventBinding.when('order by phone').fire(1264287);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pdp top level category name\x27) \x3d\x3d \x22mattresses\x22')) {
BrightTag.EventBinding.when('order by phone').fire(1272723);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27pdp top level category name\x27) \x3d\x3d \x22mattresses\x22 || bt_data(\x27pdp top level category name\x27) \x3d\x3d \x22furniture\x22 || bt_data(\x27pdp top level category name\x27) \x3d\x3d \x22\x22)')) {
BrightTag.EventBinding.when('order by phone').fire(1532800);
}
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27pdp intentifier\x27) !\x3d \x22product\x22')) {
serverURL.cf(26927);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pdp intentifier\x27) !\x3d \x22product\x22')) {
serverURL.cf(28378).appendData('top level category name');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page id\x27) !\x3d \x22xx-xx-xx-xx.index\x22')) {
serverURL.cf(36459);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pdp category\x27) \x3d\x3d \x22 furniture \x22 || bt_data(\x27pdp category\x27) \x3d\x3d \x22 mattresses \x22 || bt_data(\x27pdp category\x27) \x3d\x3d \x22 Rugs \x22 || bt_data(\x27pdp category\x27) \x3d\x3d \x22 for the home \x22')) {
serverURL.cf(53708);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document title\x27) !\x3d \x22Size Chart - Macy\x27s\x22')) {
serverURL.cf(58648);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document title\x27) !\x3d \x22Size Chart - Macy\x27s\x22')) {
serverURL.cf(64765);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document title\x27) !\x3d \x22Size Chart - Macy\x27s\x22')) {
serverURL.cf(64766);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category name\x27) \x3d\x3d \x22bracelets\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22earrings\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22necklaces \x22 || bt_data(\x27category name\x27) \x3d\x3d \x22rings\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22diamonds\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22gold\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22wedding \x26 engagement rings\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22pearls\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22gemstones\x22 || bt_data(\x27category name\x27) \x3d\x3d \x22fine jewelry\x22')) {
serverURL.cf(67461);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27breadcrumb - element two\x27) \x3d\x3d \x22 FINE JEWELRY \x22')) {
serverURL.cf(71792);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document title\x27) !\x3d \x22Product - Not Available - Macy\x27s\x22 \x26\x26 bt_data(\x27document title\x27) !\x3d \x22Size Chart - Macy\x27s\x22')) {
serverURL.cf(168666);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27olapic enabled\x27) \x3d\x3d \x22true\x22')) {
serverURL.cf(1140261);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27get device\x27) \x3c 1')) {
serverURL.cf(1246931);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document title\x27) !\x3d \x22Size Chart - Macy\x27s\x22')) {
serverURL.cf(1407098);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27get fine jewelry breadcrumb\x27) \x3e -1')) {
serverURL.cf(1462380);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27true fit enabled\x27) \x3d\x3d \x22true\x22')) {
serverURL.cf(1640539);
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('category id');
serverURL.appendData('product name');
});
});