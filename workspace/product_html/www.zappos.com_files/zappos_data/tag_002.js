BrightTag.instance.errors({enabled:false});
BrightTag.instance.dbe('{criteo-amazon retargeting ab test group}', '(function (bt) {\r\n  var PERCENT_AMAZON \x3d 20; // to change the percent of customers in the amazon group, change this number\r\n  var tid \x3d bt.session ? bt.session.tid || \x27\x27 : \x27\x27;\r\n  var chars \x3d \x270123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\x27;\r\n  var index \x3d tid ? chars.indexOf(tid.charAt(0)) : -1;\r\n\r\n  if (index \x3d\x3d\x3d -1) {\r\n    return \x27\x27;\r\n  } else if (index \x3c chars.length * PERCENT_AMAZON / 100) {\r\n    return \x27amazon\x27;\r\n  } else {\r\n    return \x27criteo\x27;\r\n  }\r\n})(window.bt || {});', {pageId:152143});
BrightTag.instance.dbe('product.sku', 'bt.sku || bt.product.sku', {pageId:158115});
BrightTag.instance.dbe('session.uid', 'bt.session.uid', {pageId:152143});
BrightTag.instance.dbe('pageload.killed', 'bt.pageload.killed', {pageId:152143});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.googleRetargeting\x22) \x3c 0')) {
serverURL.cf(311160);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.choicestream-exclusion\x22) \x3c 0')) {
serverURL.cf(333294);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27pageload.killed\x27).indexOf(\x22bt.criteo\x22) \x3c 0 \x26\x26 bt_data(\x27{criteo-amazon retargeting ab test group}\x27) \x3d\x3d \x22criteo\x22)')) {
serverURL.cf(379690).appendData('product.sku').appendData('session.uid');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.mercent-referral\x22) \x3c 0')) {
serverURL.cf(383034);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.aolRetargeting\x22) \x3c 0')) {
serverURL.cf(1021758);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.nanigans\x22) \x3c 0')) {
serverURL.cf(1264740);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.amazonRetargeting\x22) \x3c 0')) {
serverURL.cf(1272332);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.facebook\x22) \x3c 0')) {
serverURL.cf(1595216);
}
} catch(e) { bt_handle_exception(e); }
});
