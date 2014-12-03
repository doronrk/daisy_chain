BrightTag.instance.errors({enabled:false});
BrightTag.instance.load(
'//s.btstatic.com/lib/729033260e1859d1eea356976f406f266f63ca56.js',
function (page) {
BrightTag.instance.dbe('product id', 'jQuery(\x27div#ProductAttributes li:eq(0)\x27).text().split(\x27#\x27)[1]', {pageId:34048});
BrightTag.instance.dbe('category name', 'jQuery(\x27div#product_bread_crums a[style\x3d\x22text-decoration:none\x22]:eq(1)\x27).text().split(\x22\xbb\x22)[0]', {pageId:34048});
BrightTag.instance.dbe('product price', 'parseInt(jQuery(\x27label[id*\x3d\x22l_price1_value\x22]\x27).text().replace(/[\\$,\\,]/g,\x27\x27))', {pageId:34048});
BrightTag.instance.dbe('subcategory name', 'jQuery(\x27div#product_bread_crums a[style\x3d\x22text-decoration:none\x22]:eq(2)\x27).text()', {pageId:34048});
BrightTag.instance.store([{name:'btpdb.gIgF3sY.dGZjLjQxNjY2MA', value:'U0VTU0lPTg'}]);
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        function createPixel(subdomain) {\n          var src \x3d \x27//\x27 + subdomain + \x27.adnxs.com/seg?add\x3d1232679\x27;\n          if ("1" \x3d\x3d \x221\x22) {\n            src +\x3d \x27\x26t\x3d1\x27;\n            var script \x3d document.createElement(\x27SCRIPT\x27);\n            script.setAttribute(\x27type\x27,\x27text/javascript\x27);\n            script.setAttribute(\x27src\x27, src);\n            document.body.appendChild(script);\n          } else {\n            src +\x3d \x27\x26t\x3d2\x27;\n            new Image().src \x3d src;\n          }\n        }\n      \x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        createPixel(\x27ib\x27);\n      \x3c/script\x3e\n\x3cimg src\x3d\x22//ib.adnxs.com/getuid?http%3A%2F%2Fs.thebrighttag.com%2Fcs?btt\x3d6En_kxa77-7aAFwl3mZYpshk35dlu0gBK9mO4Opp_mQ\x26tp\x3dan\x26uid\x3d$UID\x22 width\x3d\x221\x22 height\x3d\x221\x22 /\x3e',{tagId:317487});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 id\x3d\x22adacadoPixel\x22 src\x3d\x22//pixel.adacado.com/1000492?segment\x3dproduct\x26productid\x3d'+bt_data_escaped('product id')+'\x26categoryid\x3d'+bt_data_escaped('category name')+'\x26subcategoryid\x3d'+bt_data_escaped('subcategory name')+'\x22\x3e\x3c/script\x3e',{tagId:323526});
BrightTag.instance.appendContent('\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22border-style:none;\x22 alt\x3d\x22\x22 src\x3d\x22//insight.adsrvr.org/track/evnt/?adv\x3dx2zeij6\x26ct\x3d0:rihl5u8g\x26fmt\x3d3\x22/\x3e',{tagId:413855});
BrightTag.instance.appendContent('\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22border-style:none;\x22 alt\x3d\x22\x22 src\x3d\x22//insight.adsrvr.org/track/conv/?adv\x3dx2zeij6\x26ct\x3d0:sw8cxj1h\x26fmt\x3d3\x22/\x3e',{tagId:416660});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 50 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 100)')) {
serverURL.cf(54498);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 100 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 200)')) {
serverURL.cf(54499);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 200 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 500)')) {
serverURL.cf(54501);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 500 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 1000)')) {
serverURL.cf(54502);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 1000 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 1500)')) {
serverURL.cf(54504);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 1500 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 2000)')) {
serverURL.cf(54505);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22 \x26\x26 (bt_data(\x27product price\x27) \x3e\x3d 2000 \x26\x26 bt_data(\x27product price\x27) \x3c\x3d 7000)')) {
serverURL.cf(54506);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27subcategory name\x27) \x3d\x3d \x22Televisions\x22')) {
serverURL.cf(58638);
}
} catch(e) { bt_handle_exception(e); }
});
});
