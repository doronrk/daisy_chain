BrightTag.instance.dbe('product id', 'document.URL.split(\x22listing/\x22)[1].split(\x22/\x22)[0]', {pageId:12373});
BrightTag.instance.dbe('category name', '(function(){\r\n    var hasInnerText \x3d (document.getElementsByTagName(\x22body\x22)[0].innerText !\x3d undefined) ? true : false;\r\n    var cat \x3d (jQuery(\x27#item-tags .item-data-content a\x27)[0] !\x3d undefined) ? jQuery(\x27#item-tags .item-data-content a\x27)[0] : jQuery(\x27#tags li\x27)[0];\r\n    if( !hasInnerText ) { \r\n        cat \x3d cat.textContent.replace(/^\\s+|\\s+$/g, \x27\x27);\r\n    } else {\r\n        cat \x3d cat.innerText.replace(/^\\s+|\\s+$/g, \x27\x27);\r\n    }\r\n    return cat;\r\n})();', {pageId:12373});
BrightTag.instance.dbe('product price', 'jQuery(\x27meta[property\x3d\x22etsymarketplace:price_value\x22]\x27).attr(\x22content\x22)', {pageId:12373});
BrightTag.instance.dbe('encrypted user id', '(function() {\r\n  return document.getElementsByTagName(\x27html\x27)[0].getAttribute(\x27data-encrypted-user-id\x27) || \x27\x27;\r\n})();', {pageId:12702});
BrightTag.instance.dbe('user purchase history', 'Etsy.Context.data.user_purchase_count \x3e\x3d 1 ? \x221\x22 : \x220\x22', {pageId:12373});
BrightTag.instance.dbe('null', '\x22\x22', {pageId:11599});
BrightTag.instance.dbe('login status', '(!!document.getElementById(\x22sign-out\x22))', {pageId:11599});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([{key:"ecomm_prodid",value:bt_data(\x27product id\x27)},{key:"ecomm_pagetype",value:"product"},{key:"ecomm_totalvalue",value:bt_data(\x27order subtotal\x27)},{key:"ecomm_rec_prodid",value:bt_data(\x27null\x27)},{key:"ecomm_category",value:bt_data(\x27category name\x27)},{key:"ecomm_pvalue",value:bt_data(\x27product price\x27)},{key:"ecomm_quantity",value:bt_data(\x27cart count\x27)},{key:"a",value:bt_data(\x27null\x27)},{key:"g",value:bt_data(\x27gender\x27)},{key:"hasaccount",value:bt_data(\x27login status\x27)},{key:"cqs",value:bt_data(\x27null\x27)},{key:"rp",value:bt_data(\x27user purchase history\x27)},{key:"ly",value:bt_data(\x27null\x27)},{key:"hs",value:bt_data(\x27null\x27)},{key:"_google_crm_id",value:bt_data(\x27encrypted user id\x27)}], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("1062314128"),\n              google_conversion_label: "LpFfCMyopQIQkMHG-gM",\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:54311,group:'yjss'});