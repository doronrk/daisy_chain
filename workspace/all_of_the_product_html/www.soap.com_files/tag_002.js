BrightTag.instance.errors({enabled:false});
BrightTag.instance.dbe('product sku', 'pageData.Sku', {pageId:10728});
BrightTag.instance.dbe('repeat buyer', 'pageData.IsRepeatBuyer', {pageId:10728});
BrightTag.instance.dbe('customer number', 'pageData.CustomerID', {pageId:10728});
BrightTag.instance.appendContent('\x3cscript\x3e\n        (function() {\n          var customVars \x3d [],\n          url \x3d new BrightTag.HTTP.URL(\x27//googleads.g.doubleclick.net/pagead/viewthroughconversion/\x27 +\n            "1017995215"+\x27/\x27).appendParams({\n              \x27value\x27: \x270\x27,\n              \x27label\x27: "ly-kCOGllwUQz7-15QM",\n              \x27guid\x27: \x27ON\x27,\n              \x27script\x27: \x270\x27\n            });\n\n          BrightTag.each([{key:"prodid",value:bt_data(\x27product sku\x27)},{key:"pagetype",value:"product"},{key:"use_case",value:"retail"}], function(prop) {\n            if (BrightTag.Types.isArray(prop.value)) {\n              prop.value \x3d prop.value.join(\x27,\x27);\n            }\n\n            BrightTag.pushIfDefined(customVars, prop.key + \x22\x3d\x22 + prop.value);\n          });\n\n          url.appendParam(\x22data\x22, customVars.join(\x22;\x22));\n\n          new Image().src \x3d url.toString();\n        }());\n      \x3c/script\x3e',{tagId:37128,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n    (function() {\n\t\tvar s \x3d document.createElement(\x27script\x27),\n\t\t\te \x3d document.getElementsByTagName(\x27script\x27)[0];\n\t\ts.src \x3d \x27//d3cxv97fi8q177.cloudfront.net/foundation-A58772-c4c4-4714-974e-f334109965bd1.js\x27;s.type \x3d \x27text/javascript\x27;s.async \x3d true;\n\t\te.parentNode.insertBefore(s, e);\n\t})();\n\x3c/script\x3e\n',{tagId:52890});
BrightTag.instance.appendContent('\x3cscript\x3e\nvar OrderID \x3d pageData.OrderID;\nvar Revenue \x3d pageData.Revenue;\n\x3c/script\x3e \n\x3cscript src\x3d\x22//tt.mbww.com/tt-53f4041ba0cc8ed13c5a119242af44e60105ea5e486e4e8e3153e770c09261bb.js\x22 async\x3e\n\x3c/script\x3e\n',{tagId:1462551});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27page url\x27).indexOf(\x22**soap.com/order/ordercomplete**\x22) \x3c 0')) {
serverURL.cf(87153);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page url\x27).indexOf(\x22**soap.com/order/payment.qs**\x22) \x3c 0 || bt_data(\x27page url\x27).indexOf(\x22**soap.com/order/review.qs**\x22) \x3c 0 || bt_data(\x27page url\x27).indexOf(\x22**soap.com/order/shipping.qs**\x22) \x3c 0)')) {
serverURL.cf(1433665);
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('product sku');
serverURL.appendData('customer number');
serverURL.appendData('repeat buyer');
});
