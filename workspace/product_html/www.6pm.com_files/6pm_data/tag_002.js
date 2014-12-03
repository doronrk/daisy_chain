BrightTag.instance.errors({enabled:false});
BrightTag.instance.dbe('product.styleid', 'bt.styleId || bt.product.styleId', {pageId:158115});
BrightTag.instance.dbe('session.uid', 'bt.session.uid', {pageId:152143});
BrightTag.instance.dbe('pageload.killed', 'bt.pageload.killed', {pageId:152143});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.googleRetargeting\x22) \x3c 0')) {
serverURL.cf(311109);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.criteo\x22) \x3c 0')) {
serverURL.cf(379726).appendData('product.styleid').appendData('session.uid');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.mercent-referral\x22) \x3c 0')) {
serverURL.cf(383124);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.choicestream-exclusion\x22) \x3c 0')) {
serverURL.cf(1143678);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.facebook\x22) \x3c 0')) {
serverURL.cf(1370067);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27pageload.killed\x27).indexOf(\x22bt.googleRetargeting\x22) \x3c 0')) {
serverURL.cf(1532436);
}
} catch(e) { bt_handle_exception(e); }
});
