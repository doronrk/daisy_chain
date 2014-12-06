BrightTag.instance.errors({enabled:false});
BrightTag.instance.dbe('product sku', 'pageData.Sku', {pageId:10732});
BrightTag.instance.dbe('repeat buyer', 'pageData.IsRepeatBuyer', {pageId:10732});
BrightTag.instance.dbe('customer number', 'pageData.CustomerID', {pageId:10732});
BrightTag.instance.appendContent('\x3c!-- PLEASE INCLUDE THIS COMMENT ON THE WEB PAGE WITH THE TAG\nRemarketing tags may not be associated with personally identifiable information\nor placed on pages related to sensitive categories.\n--\x3e\n\x3cscript type\x3d\x22text/javascript\x22\x3e\n\nvar google_tag_params \x3d {\nprodid: \x27'+bt_data_escaped('product sku')+'\x27, // Must match your Google Merchant Center ID. See sample file\npagetype: \x22product\x22, // See guide for values\nvalue: \x27\x27 // (optional) can be used to segment lists, optimize bids\n};\n\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/javascript\x22\x3e\n/* \x3c![CDATA[ */\nvar google_conversion_id \x3d 1010880510;\nvar google_conversion_label \x3d \x22RmDgCNqsvwMQ_p-D4gM\x22;\nvar google_custom_params \x3d window.google_tag_params;\nvar google_remarketing_only \x3d true;\n\n/* ]]\x3e */\n\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/\nconversion.js\x22\x3e\n\x3c/script\x3e\n\n',{tagId:23010});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n    (function() {\n\t\tvar s \x3d document.createElement(\x27script\x27),\n\t\t\te \x3d document.getElementsByTagName(\x27script\x27)[0];\n\t\ts.src \x3d \x27//d3cxv97fi8q177.cloudfront.net/foundation-A58772-c4c4-4714-974e-f334109965bd1.js\x27;s.type \x3d \x27text/javascript\x27;s.async \x3d true;\n\t\te.parentNode.insertBefore(s, e);\n\t})();\n\x3c/script\x3e\n',{tagId:52890});
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//d1cerpgff739r9.cloudfront.net/tt-16a3e9e922b41fde13be3ae377b18e08d44fb136594e7f9819ff2ac75bab5516.js\x22 async\x3e\n\x3c/script\x3e\n',{tagId:1462556});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27page url\x27).indexOf(\x22**casa.com/order/ordercomplete**\x22) \x3c 0')) {
serverURL.cf(87198);
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('product sku');
serverURL.appendData('customer number');
serverURL.appendData('repeat buyer');
});
