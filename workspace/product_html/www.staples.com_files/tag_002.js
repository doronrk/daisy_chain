BrightTag.instance.errors({enabled:false});
BrightTag.instance.load(
'//s.btstatic.com/lib/d5c1bcf576bfe93e4c0a5cc2a227c5191f21fa9a.js',
'//s.btstatic.com/lib/8711d122bd34d6bf1ded8441ff6bc4373f26515a.js',
function (page) {
BrightTag.instance.dbe('product price', 'jQuery.trim(jQuery(\x27.finalPrice\x27).text().replace(\x27$\x27,\x27\x27)).replace(\x27*\x27,\x27\x27)', {pageId:950797});
BrightTag.instance.dbe('user agent', 'navigator.userAgent', {pageId:1030812});
BrightTag.instance.dbe('product image url', 'jQuery(\x27img#largeProductImage\x27).attr(\x27src\x27)', {pageId:950797});
BrightTag.instance.dbe('product name - detail page', 'jQuery.trim(jQuery(\x27h1\x27).text().toLowerCase().replace(/[^a-z0-9\\s]/gi, \x27\x27))', {pageId:950797});
BrightTag.instance.dbe('product sku\x27s list - space', 'window.location.pathname.split(\x27/product_\x27)[1]', {pageId:950797});
BrightTag.instance.dbe('hashed email address', 'SHA256(getParameterByName(\x27email\x27))', {pageId:1030812});
BrightTag.EventBinding.bind('add to cart', 'a[href\x3d\x22javascript:void(0);\x22]', 'DIRECT/click', {pageId:953659});
BrightTag.EventBinding.bind('add to cart', 'a[href\x3d\x22javascript:void(0);\x22]', 'DIRECT/click', {pageId:1030812});
BrightTag.EventBinding.bind('add to cart', '.buttonLink', 'DIRECT/click', {pageId:950797});
BrightTag.instance.appendContent('\x3cimg src\x3d\x22//leadback.advertising.com/adcedge/lb?site\x3d695501\x26betr\x3dstaplesrt%3D%5B%2B%5D30day%5B720%5D%2C1year%5B8760%5D\x22 width\x3d\x221\x22 height\x3d\x221\x22 style\x3d\x22display:none\x22 border\x3d\x220\x22 /\x3e',{tagId:1518148});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n  (function () {\n    var uri \x3d \x27//d.turn.com/r/dd/id/L21rdC8yNy9waWQvMzg1Mzc4NjIvdC8w\x27,\n        optional \x3d [\n          {key:\x27/cat/\x27, value:\x27\x27},\n          {key:\x27/qry/\x27, value:\x27\x27},\n          {key:\x27/kv/\x27, value:\x27\x27},\n          {key:\x27/oid/\x27, value:\x27\x27},\n          {key:\x27/oval/\x27, value:\x27\x27}\n        ];\n    BrightTag.each(optional, function (param) {\n      if (param.value) {\n        uri +\x3d param.key + encodeURIComponent(param.value);\n      }\n    });\n    new Image().src \x3d uri;\n  })();\n\x3c/script\x3e\n\x3cimg src\x3d\x22//r.turn.com/r/du/id/L2NzaWQvMS9zcGlkLzM/url/http%3A%2F%2Fs.thebrighttag.com%2Fcs%3Fbtt%3D6En_kxa77-7aAFwl3mZYpshk35dlu0gBK9mO4Opp_mQ%26tp%3DrWc5RFi%26uid%3DPARTNER_UUID\x22 height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22/\x3e',{tagId:1618813});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        BrightTag.Content.iframe(\n          BrightTag.HTTP.URL(\x27http://servedby.flashtalking.com/container/5076;30291;3571;iframe/\x27)\n          .appendParams({\n            \x27cachebuster\x27: "1790597035",\n            \x27spotname\x27: "Product_Pages",\n          })\n          .appendPartialQueryString(\x27u1\x3d'+encodeURIComponent(bt_data_escaped('product sku\x27s list - pipe bar'))+'\x27)\n        );\n      \x3c/script\x3e',{tagId:1618822});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n  new Image().src\x3d\x22//pixel.mathtag.com/event/img?mt_id\x3d169179\x26mt_adid\x3d108017\x26redir\x3dhttp%3A%2F%2Fs.thebrighttag.com%2Fcs%3Ftp%3Dmm%26uid%3D%5BMM_UUID%5D\x22;\n\x3c/script\x3e',{tagId:1618868});
BrightTag.instance.appendContent('\x3cimg src\x3d \x22//data.actnx.com/v2d?tok\x3d6432b927-2fa7-4f52-bde0-cc1273d4eab0\x26tr\x3din:true\x26i\x3des2:'+bt_data_escaped('hashed email address')+'\x26v\x3duser-agent:'+bt_data_escaped('user agent')+'\x26pas\x3d'+bt_data_escaped('product sku\x27s list - space')+':v:brand:s:::'+bt_data_escaped('product name - detail page')+':::t:s::::::i:s:::'+bt_data_escaped('product image url')+':::p:f:::'+bt_data_escaped('product price')+':::\x26sync\x3dtrue\x22 /\x3e',{tagId:1627120});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n\n   var _lrc \x3d _lrc || [];\n   _lrc.push([\x27aw_lrid\x27, \x27385316\x27]); \n   _lrc.push([\x27ds_lrid\x27, \x27385326\x27]); \n\n   (function() {\n      var ga \x3d document.createElement(\x27script\x27); ga.type \x3d \x27text/javascript\x27;\n      ga.src \x3d \x27//cdn.rlcdn.com/js/ga.js?\x27 + new Date().getTime();\n      var s \x3d document.getElementsByTagName(\x27script\x27)[0];      s.parentNode.insertBefore(ga, s);\n})();\n\n\x3c/script\x3e',{tagId:1740947});
BrightTag.EventBinding.when('add to cart').fire(1627121);
BrightTag.instance.secondary(function(serverURL) {
serverURL.appendData('product sku\x27s list - space');
serverURL.appendData('signal user id');
});
});
