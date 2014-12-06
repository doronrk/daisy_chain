BrightTag.instance.errors({enabled:false});
BrightTag.instance.load(
'//s.btstatic.com/lib/e9d0c24d68c2172176ba6b76be7122d32387a459.js',
function (page) {
BrightTag.instance.dbe('product category name', 'bt_at.Product_Category_Name', {pageId:9110});
BrightTag.instance.dbe('tag group holiday 2013', 'bt_cookie(\x27BTgroupHoliday2013\x27)', {pageId:9110});
BrightTag.instance.dbe('product category id', 'bt_at.Product_Category_ID || bt_parameter(\x27catid\x27)', {pageId:9110});
BrightTag.instance.dbe('page name', 'bt_at.Page_Name', {pageId:9110});
BrightTag.instance.dbe('department name', 'bt_at.Department_Name', {pageId:9110});
BrightTag.instance.dbe('site', 'bt_at.Site', {pageId:9110});
BrightTag.instance.dbe('product name', 'bt_at.Product_Name', {pageId:9110});
BrightTag.instance.dbe('data dictionary available', 'window.bt_at !\x3d undefined', {pageId:9110});
BrightTag.instance.dbe('page type', 'bt_at.Page_Type', {pageId:9110});
BrightTag.instance.dbe('sku id', 'bt_at.Sku_ID', {pageId:9110});
BrightTag.EventBinding.bind('login success', window, 'DIRECT/loginSuccess', {pageId:9110}).data('shopping bag login email address', 'eventData[0]');
BrightTag.EventBinding.bind('update cart item', window, 'DIRECT/updateCartItemSuccess', {pageId:9110}).data('update cart item sku', 'eventData[0]').data('update cart item quantity', 'eventData[1]');
BrightTag.EventBinding.bind('add to bag', window, 'DIRECT/addToBagSuccess', {pageId:9110}).data('encoded add to bag category name', 'encodeURI(eventData[1].CategoryName)').data('add to bag cart count', 'eventData[1].cartCount').data('add to bag - sku', 'eventData[1].SkuID').data('add to bag - quantity', 'eventData[1].Quantity').data('add to bag category name', 'eventData[1].CategoryName').data('add to bag category id', 'eventData[1].CategoryId').data('add to bag added quantity', 'eventData[1].CurrentAddedQuantity').data('add to bag product name', 'eventData[1].ProductName').data('add to bag - price', 'eventData[1].Price');
BrightTag.EventBinding.bind('remove from bag', window, 'DIRECT/removeFromBag', {pageId:9110}).data('remove from bag sku id', 'eventData[0]').data('remove from bag quantity', 'eventData[1]');
BrightTag.instance.appendContent('\x3cscript language\x3d\x22javascript\x22 type\x3d\x22text/javascript\x22\x3e\ndocument.write(\x27\x3cs\x27+\x27cript language\x3d\x22javascript\x22 type\x3d\x22text/javascript\x22 src\x3d\x22\x27+document.location.protocol+\x27//dms.netmng.com/si/CM/Tracking/ClickTracking.aspx?siclientid\x3d8483\x26jscript\x3d1\x22\x3e\x3c/s\x27+\x27cript\x3e\x27);\n\x3c/script\x3e\n',{tagId:35697});
BrightTag.instance.appendContent('\x3cscript\x3e\ntry {\n    s.linkTrackVars \x3d \x27eVar32\x27;\n    s.eVar32 \x3d \x22'+bt_data_escaped('email')+'\x22;\n    s.tl(this, \x27o\x27, \x22Event Label\x22);\n} catch (e) {}\n\x3c/script\x3e',{tagId:53842});
try { BrightTag.instance.appendContent('\x3cscript type\x3d\x27text/javascript\x27\x3e\n        (function() {\n          var items \x3d [],\n            prdArr \x3d [],\n            varsString \x3d \x27\x27.replace(/(\\s+)/gm,\x22\x22);\n\n          if (!BrightTag.Types.isArray(items)) {\n            items \x3d [items];\n          };\n\n          var addIfDefined \x3d function(fieldName, keyStr, indexStr) {\n            if (fieldName) {\n              prdArr.push(keyStr + indexStr + \x22:\x22 + fieldName);\n            }\n          }\n\n          BrightTag.Util.each(items, function(prod, index) {\n            var indexStr \x3d (index + 1);\n            addIfDefined(prod[\x22\x22], \x22i\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22p\x22, indexStr);\n            addIfDefined(prod[\x220\x22], \x22q\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22c\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22l\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22a\x22, indexStr);\n          });\n\n          BrightTag.Content.image(\x22//ad.doubleclick.net/activity;src\x3d4258335;type\x3dinvmedia;cat\x3d0dammyxe\x22 + varsString + \x22;ord\x3d'+eval('Math.random()*10000000000000')+';prd\x3d\x22 + prdArr.join(\x22|\x22));\n        })();\n      \x3c/script\x3e',{tagId:142206});
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/javascript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22\x3e\ntwttr.conversion.trackPid(\x27l4ft8\x27);\n\x3c/script\x3e\n',{tagId:623960});
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//cdn.mercent.com/js/tracker.js\x22\x3e \x3c/script\x3e\n\x3cscript\x3e\nmr_merchantID \x3d "AnnTaylorLoft";\nmr_cookieDomain \x3d \x27\x27;\n  mr_Track();\n\x3c/script\x3e',{tagId:638607,group:'mercent'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("1069036611"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:646215,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        window.fb_param \x3d {\u2028\n          pixel_id: "6013556895736",\n          value: \x27\x27,\n          currency: "USD"\n        };\n      \x3c/script\x3e\n\n      \x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//connect.facebook.net/en_US/fp.js\x22\x3e\x3c/script\x3e',{tagId:893733,group:'facebook'});
BrightTag.instance.appendContent('\x3cscript\x3e\n        (function(d) {\n            var e \x3d d.createElement(\x27script\x27);\n            e.src \x3d d.location.protocol + \x27//bounceexchange.com/tag/1011/i.js\x27;\n            e.async \x3d true;\n            d.getElementsByTagName(\x22head\x22)[0].appendChild(e);\n        }(document));\n\x3c/script\x3e',{tagId:1155882});
BrightTag.instance.appendContent('\x3cscript\x3e(function() {\n  var _fbq \x3d window._fbq || (window._fbq \x3d []);\n  if (!_fbq.loaded) {\n    var fbds \x3d document.createElement(\x27script\x27);\n    fbds.async \x3d true;\n    fbds.src \x3d \x27//connect.facebook.net/en_US/fbds.js\x27;\n    var s \x3d document.getElementsByTagName(\x27script\x27)[0];\n    s.parentNode.insertBefore(fbds, s);\n    _fbq.loaded \x3d true;\n  }\n  _fbq.push([\x27addPixelId\x27, \x27279085955606942\x27]);\n})();\nwindow._fbq \x3d window._fbq || [];\nwindow._fbq.push([\x27track\x27, \x27PixelInitialized\x27, {}]);\n\x3c/script\x3e\n',{tagId:1212660});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        window.google_trackConversion({\n          google_conversion_id: "971033390",\n          google_conversion_language: \x27\x27,\n          google_conversion_format: \x27\x27,\n          google_conversion_color: \x27\x27,\n          google_conversion_label: \x27purchase\x27,\n          google_conversion_value: \x27\x27,\n          google_conversion_currency: \x27\x27\n        });\n      \x3c/script\x3e',{tagId:1295691,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("959699785"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:1527999,group:'yjss'});
BrightTag.EventBinding.when('add to bag').fire(15896);
BrightTag.EventBinding.when('remove from bag').fire(15898);
BrightTag.EventBinding.when('update cart item').fire(15899);
BrightTag.EventBinding.when('login success').fire(15903);
BrightTag.EventBinding.when('add to bag').fire(893771);
BrightTag.EventBinding.when('update cart item').fire(958809);
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('add to bag').fire(1389017).appendData('site').appendData('add to bag category id').appendData('add to bag - price').appendData('add to bag - quantity').appendData('add to bag - sku').appendData('product category name').appendData('email').appendData('add to bag product name');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('remove from bag').fire(1389035).appendData('site').appendData('remove from bag quantity').appendData('email').appendData('remove from bag sku id');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('update cart item').fire(1389044).appendData('site').appendData('update cart item quantity').appendData('update cart item sku').appendData('email');
}
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Home Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14055);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14056);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14622);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Home Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14623);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x22Women\x27s Clothing: LOFT\x22')) {
serverURL.cf(14624);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27New Arrivals: LOFT\x27')) {
serverURL.cf(14625);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Tops \x26 Sweaters: LOFT\x27')) {
serverURL.cf(14626);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Tops \x26 Sweaters: LOFT\x27')) {
serverURL.cf(14627);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Dresses: LOFT\x27')) {
serverURL.cf(14628);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Petite\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14629);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Denim: LOFT\x27')) {
serverURL.cf(14630);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Tall\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27)) || bt_data(\x27product category name\x27) \x3d\x3d \x27LOFT Tall\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14631);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Skirts: LOFT\x27')) {
serverURL.cf(14632);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Jackets: LOFT\x27')) {
serverURL.cf(14633);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27LOFT Suits\x27')) {
serverURL.cf(14634);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Lounge: LOFT\x27')) {
serverURL.cf(14635);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Shoes\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14636);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Shoes Accessories\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true \x26\x26 bt_data(\x27page name\x27) !\x3d \x27LOFT Style Closet\x27 \x26\x26 bt_data(\x27page name\x27) !\x3d \x27LOFT style closet statement\x27')) {
serverURL.cf(14637);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Maternity\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14638);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Sale\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14639);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Store Locator\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14641);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x22LOFT Style Closet\x22')) {
serverURL.cf(14642);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27LOFT Beach\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14643);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x27Order Confirmation\x27')) {
serverURL.cf(14971);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Product Details\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(15001);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Product Details\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(15893);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x22Order Confirmation\x22 \x26\x26 bt_data(\x27page type\x27) !\x3d \x22Product Details\x22 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(16043);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page name\x27) \x3d\x3d \x27Pants: LOFT\x27')) {
serverURL.cf(16204);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Product Details\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(48610);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x22Category Page\x22 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(48611);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x22Landing Page\x22')) {
serverURL.cf(142143);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27tag group holiday 2013\x27) \x3d\x3d \x22GroupD\x22')) {
serverURL.cf(189408);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27tag group holiday 2013\x27) \x3d\x3d \x22GroupC\x22')) {
serverURL.cf(242808);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x22Product Details\x22 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true \x26\x26 bt_data(\x27email\x27) !\x3d \x22\x22 \x26\x26 bt_data(\x27product category id\x27) !\x3d \x22\x22')) {
serverURL.cf(1389030).appendData('product category id').appendData('site').appendData('product name').appendData('product category name').appendData('email').appendData('sku id');
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('once');
});
});
