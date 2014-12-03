BrightTag.instance.errors({timestamp:1417579807972});
BrightTag.instance.load(
'//s.btstatic.com/lib/e9d0c24d68c2172176ba6b76be7122d32387a459.js',
function (page) {
BrightTag.instance.dbe('product category name', 'bt_at.Product_Category_Name', {pageId:9111});
BrightTag.instance.dbe('product category id', 'bt_at.Product_Category_ID || bt_parameter(\x27catid\x27)', {pageId:9111});
BrightTag.instance.dbe('tag group', 'bt_cookie(\x22BTgroup\x22)', {pageId:9111});
BrightTag.instance.dbe('department name', 'bt_at.Department_Name', {pageId:9111});
BrightTag.instance.dbe('site', 'bt_at.Site', {pageId:9111});
BrightTag.instance.dbe('product name', 'bt_at.Product_Name', {pageId:9111});
BrightTag.instance.dbe('data dictionary available', 'window.bt_at !\x3d undefined', {pageId:9111});
BrightTag.instance.dbe('page type', 'bt_at.Page_Type', {pageId:9111});
BrightTag.instance.dbe('sku id', 'bt_at.Sku_ID', {pageId:9111});
BrightTag.EventBinding.bind('remove from bag', window, 'DIRECT/removeFromBag', {pageId:9111}).data('remove from bag sku id', 'eventData[0]');
BrightTag.EventBinding.bind('more share options', '.addThis a:eq(4)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('size chart', 'a.calloutLink.js-genericLargePopup:contains(\x27Size Chart\x27)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('view return policy', 'p.note.js-returnPolicy a', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('promo details', '.promo a', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('add to bag', window, 'addToBagSuccess', {pageId:9111}).data('add to bag quantity', 'eventData[1].Quantity').data('encoded add to bag category name', 'encodeURI(eventData[1].CategoryName)').data('add to bag cart count', 'eventData[1].cartCount').data('add to bag price', 'eventData[1].Price').data('add to bag added quantity', 'eventData[1].CurrentAddedQuantity').data('add to bag product name', 'eventData[1].ProductName').data('add to bag category id', 'eventData[1].CategoryId').data('add to bag category name', 'eventData[1].CategoryName').data('add to bag sku', 'eventData[1].SkuID');
BrightTag.EventBinding.bind('product share delicious', '.addThis a:eq(2)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('product share facebook', '.addThis a:eq(0)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('find in store', 'img.input-image.js-hasHover', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('product share digg', '.addThis a:eq(3)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('quick look click', 'a.quick-look', 'DIRECT/click', {pageId:9111}).data('quick look product id', 'jQuery(event.target).find(\x27div#quick-lookUrl\x27).text().split(\x22prodId\x3d\x22)[1].split(\x22\x26\x22)[0]').data('quick look product sku', 'jQuery(event.target).find(\x27div#quick-lookUrl\x27).text().split(\x22skuId\x3d\x22)[1].split(\x22\x26\x22)[0]');
BrightTag.EventBinding.bind('update cart item', window, 'DIRECT/updateCartItemSuccess', {pageId:9111}).data('updated cart item edited quantity', 'eventData[2]').data('updated cart item quantity', 'eventData[1]').data('updated cart item sku', 'eventData[0]');
BrightTag.EventBinding.bind('login success', window, 'DIRECT/loginSuccess', {pageId:9111}).data('shopping bag login email address', 'eventData[0]');
BrightTag.EventBinding.bind('product share myspace', '.addThis a:eq(1)', 'DIRECT/click', {pageId:9111});
BrightTag.EventBinding.bind('go to blog', '.utils a:contains(\x27blog\x27)', 'DIRECT/click', {pageId:9111});
BrightTag.instance.appendContent('\x3cscript language\x3d\x22javascript\x22 type\x3d\x22text/javascript\x22\x3e\ndocument.write(\x27\x3cs\x27+\x27cript language\x3d\x22javascript\x22 type\x3d\x22text/javascript\x22 src\x3d\x22\x27+document.location.protocol+\x27//dms.netmng.com/si/CM/Tracking/ClickTracking.aspx?siclientid\x3d8482\x26jscript\x3d1\x22\x3e\x3c/s\x27+\x27cript\x3e\x27);\n\x3c/script\x3e\n',{tagId:35696});
BrightTag.instance.appendContent('\x3cscript\x3e\ntry {\n    s.linkTrackVars \x3d \x27eVar32\x27;\n    s.eVar32 \x3d \x22'+bt_data_escaped('email')+'\x22;\n    s.tl(this, \x27o\x27, \x22Event Label\x22);\n} catch (e) {}\n\x3c/script\x3e',{tagId:53748});
BrightTag.instance.appendContent('\x3cscript language\x3d\x22javascript\x22 type\x3d\x22text/javascript\x22\x3e\n\nvar tracks \x3d Array(\n    \x276240b6cfda22a42e379aa7fc92cb82c1\x27,\n\t\x27f55993e707fcd77b446f0565df84f01b\x27,\n\t\x276a9e309cef5f108ef57f4f8f2e3f2dcb\x27,\n\t\x276a9e309cef5f108ef57f4f8f2e3f2dcb\x27,\n\t\x27b92f3b6346ef0c8336a0de0eb06a6839\x27,\n\t\x274677fc26bf945665f65042a12b4877bb\x27,\n\t\x272d3b429ee8d5cf6d6e685b14112c69f9\x27,\n\t\x27ed76e9ab883662c20782ca4ebb11c4d9\x27,\n\t\x272f396379d93a7d75398efaf54ae6d5ed\x27,\n\t\x27cc1d113fb8e8e5e019f2e8fdbf114fdb\x27,\n\t\x279822fd38b6d31e140c0abffb751120ca\x27,\n\t\x27bbf0f875ba716f550796fe5fecee4b44\x27,\n\t\x270a2d65e799458415bcf5883109929356\x27,\n\t\x27d8846619ce2d83b7e7458bab76bf53bc\x27,\n\t\x277ea2b533d29cd0714ebd31306dc9eafa\x27,\n\t\x27f695c87fb2ac4eb68ef3c5270d5b714e\x27,\n\t\x276783683b509703644268f5969ac4b6b0\x27\n);\n\n/**\n* Dynamically call Argyle Social\x27s goal tracking by adding a 0x0 \n*  image at the bottom of the page.\n* @param int    The index of the goal we are tracking within the tracks array above\n* @param number A number to pass to Argyle for the value of this conversion, can be left out of the call to pass no conversion value\n*/\nfunction performTrack(track_id, value) {\n    var img \x3d document.createElement(\x27img\x27);\n    src_url \x3d \x27http://goals.ann.tl/bug.gif?hash\x3d\x27 + tracks[track_id];\n    if (value) {\n        src_url +\x3d \x22\x26value\x3d\x22 + value;\n    }\n    img.src \x3d src_url;\n    document.body.appendChild(img);\n}\n\x3c/script\x3e',{tagId:58107});
try { BrightTag.instance.appendContent('\x3cscript type\x3d\x27text/javascript\x27\x3e\n        (function() {\n          var items \x3d [],\n            prdArr \x3d [],\n            varsString \x3d \x27\x27.replace(/(\\s+)/gm,\x22\x22);\n\n          if (!BrightTag.Types.isArray(items)) {\n            items \x3d [items];\n          };\n\n          var addIfDefined \x3d function(fieldName, keyStr, indexStr) {\n            if (fieldName) {\n              prdArr.push(keyStr + indexStr + \x22:\x22 + fieldName);\n            }\n          }\n\n          BrightTag.Util.each(items, function(prod, index) {\n            var indexStr \x3d (index + 1);\n            addIfDefined(prod[\x22\x22], \x22i\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22p\x22, indexStr);\n            addIfDefined(prod[\x220\x22], \x22q\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22c\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22l\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22a\x22, indexStr);\n          });\n\n          BrightTag.Content.image(\x22//ad.doubleclick.net/activity;src\x3d4258335;type\x3dinvmedia;cat\x3dvogs5cfq\x22 + varsString + \x22;ord\x3d'+eval('Math.random()*10000000000000')+';prd\x3d\x22 + prdArr.join(\x22|\x22));\n        })();\n      \x3c/script\x3e',{tagId:142089});
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/javascript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22\x3e\ntwttr.conversion.trackPid(\x27l4d91\x27);\n\x3c/script\x3e\n',{tagId:553427});
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//cdn.mercent.com/js/tracker.js\x22\x3e \x3c/script\x3e\n\x3cscript\x3e\nmr_merchantID \x3d "AnnTaylor";\nmr_cookieDomain \x3d \x27\x27;\n  mr_Track();\n\x3c/script\x3e',{tagId:638565,group:'mercent'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("1069133027"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:646203,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        window.fb_param \x3d {\u2028\n          pixel_id: "6013883307736",\n          value: \x27\x27,\n          currency: "USD"\n        };\n      \x3c/script\x3e\n\n      \x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//connect.facebook.net/en_US/fp.js\x22\x3e\x3c/script\x3e',{tagId:1037334,group:'facebook'});
BrightTag.instance.appendContent('\x3cscript\x3e\n        (function(d) {\n            var e \x3d d.createElement(\x27script\x27);\n            e.src \x3d d.location.protocol + \x27//bounceexchange.com/tag/1007/i.js\x27;\n            e.async \x3d true;\n            d.getElementsByTagName(\x22head\x22)[0].appendChild(e);\n        }(document));\n\x3c/script\x3e',{tagId:1155876});
BrightTag.instance.appendContent('\x3cscript\x3e(function() {\n  var _fbq \x3d window._fbq || (window._fbq \x3d []);\n  if (!_fbq.loaded) {\n    var fbds \x3d document.createElement(\x27script\x27);\n    fbds.async \x3d true;\n    fbds.src \x3d \x27//connect.facebook.net/en_US/fbds.js\x27;\n    var s \x3d document.getElementsByTagName(\x27script\x27)[0];\n    s.parentNode.insertBefore(fbds, s);\n    _fbq.loaded \x3d true;\n  }\n  _fbq.push([\x27addPixelId\x27, \x27279085955606942\x27]);\n})();\nwindow._fbq \x3d window._fbq || [];\nwindow._fbq.push([\x27track\x27, \x27PixelInitialized\x27, {}]);\n\x3c/script\x3e\n',{tagId:1212603});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("973550317"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:1295641,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n var _lrc \x3d _lrc || [];\n _lrc.push([\x27aw_lrid\x27, \x27384086\x27]); \n _lrc.push([\x27ds_lrid\x27, \x27384096\x27]); \n (function() {\n var ga \x3d document.createElement(\x27script\x27); ga.type \x3d \x27text/javascript\x27;\n ga.src \x3d \x27//cdn.rlcdn.com/js/ga.js?\x27 + new Date().getTime();\n var s \x3d document.getElementsByTagName(\x27script\x27)[0]; s.parentNode.insertBefore(ga, s);\n})();\n\x3c/script\x3e',{tagId:1420490});
BrightTag.EventBinding.when('add to bag').fire(15608);
BrightTag.EventBinding.when('remove from bag').fire(15828);
BrightTag.EventBinding.when('login success').fire(15829);
BrightTag.EventBinding.when('update cart item').fire(15832);
BrightTag.EventBinding.when('quick look click').fire(21771);
BrightTag.EventBinding.when('subscribe email').execute('performTrack(6);',{tagId:58107});
BrightTag.EventBinding.when('find in store').execute('performTrack(4);',{tagId:58107});
BrightTag.EventBinding.when('go to blog').execute('performTrack(8);',{tagId:58107});
BrightTag.EventBinding.when('global facebook like').execute('performTrack(17);',{tagId:58107});
BrightTag.EventBinding.when('view return policy').execute('performTrack(2);',{tagId:58107});
BrightTag.EventBinding.when('product share').execute('performTrack(9);',{tagId:58107});
BrightTag.EventBinding.when('more share options').execute('performTrack(14);',{tagId:58107});
BrightTag.EventBinding.when('product share delicious').execute('performTrack(12);',{tagId:58107});
BrightTag.EventBinding.when('promo details').execute('performTrack(1);',{tagId:58107});
BrightTag.EventBinding.when('style for students').execute('performTrack(5);',{tagId:58107});
BrightTag.EventBinding.when('product facebook like').execute('performTrack(15);',{tagId:58107});
BrightTag.EventBinding.when('size chart').execute('performTrack(3);',{tagId:58107});
BrightTag.EventBinding.when('subscribe catalog').execute('performTrack(7);',{tagId:58107});
BrightTag.EventBinding.when('product share pinterest').execute('performTrack(16);',{tagId:58107});
BrightTag.EventBinding.when('add to bag').execute('performTrack(0);',{tagId:58107});
BrightTag.EventBinding.when('product share facebook').execute('performTrack(10);',{tagId:58107});
BrightTag.EventBinding.when('product share myspace').execute('performTrack(11);',{tagId:58107});
BrightTag.EventBinding.when('product share digg').execute('performTrack(13);',{tagId:58107});
BrightTag.EventBinding.when('add to bag').fire(1037429);
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('add to bag').fire(1388980).appendData('site').appendData('add to bag category id').appendData('add to bag price').appendData('add to bag quantity').appendData('add to bag sku').appendData('product category name').appendData('email').appendData('add to bag product name');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('remove from bag').fire(1388999).appendData('site').appendData('updated cart item edited quantity').appendData('email').appendData('remove from bag sku id');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27email\x27)')) {
BrightTag.EventBinding.when('update cart item').fire(1389008).appendData('site').appendData('updated cart item quantity').appendData('updated cart item sku').appendData('email');
}
} catch(e) { bt_handle_exception(e); }
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(13789);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Home Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(13855);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(13856);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Apparel\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(13930);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Shoes\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14031);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Accessories\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14032);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Petites\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14033);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Tall\x27 \x26\x26 (bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 || bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27) \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14034);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Weddings Events\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14035);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Lookbook\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14036);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27department name\x27) \x3d\x3d \x27AT Sale\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Landing Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14037);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Home Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14392);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT New Arrivals\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14395);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT Blouses Tops\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14396);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Knits Tees\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14397);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT Sweaters\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14398);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Dresses\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14399);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Suits\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14529);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT Pants\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14530);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Skirts\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14532);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Jackets\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14533);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Outerwear\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14534);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT View All\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14539);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Store Locator\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14544);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27product category name\x27) \x3d\x3d \x27AT Swim\x27 \x26\x26 bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14545);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Category Page\x27 \x26\x26 bt_data(\x27product category name\x27) \x3d\x3d \x27AT Denim\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14548);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x27Order Confirmation\x27')) {
serverURL.cf(14723);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Product Details\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(14837);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x27Product Details\x27 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(15834);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x22Order Confirmation\x22 \x26\x26 bt_data(\x27page type\x27) !\x3d \x22Product Details\x22 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true')) {
serverURL.cf(16018);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27tag group\x27) \x3d\x3d \x22Google\x22')) {
serverURL.cf(43081);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27tag group\x27) \x3d\x3d \x22Control\x22')) {
serverURL.cf(43084);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x22Landing Page\x22')) {
serverURL.cf(142080);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) \x3d\x3d \x22Product Details\x22 \x26\x26 bt_data(\x27data dictionary available\x27) \x3d\x3d true \x26\x26 bt_data(\x27email\x27) !\x3d \x22\x22 \x26\x26 bt_data(\x27product category id\x27) !\x3d\x22\x22')) {
serverURL.cf(1388990).appendData('product category id').appendData('site').appendData('product name').appendData('product category name').appendData('email').appendData('sku id');
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('capped');
});
});
