BrightTag.instance.errors({enabled:false});
BrightTag.instance.dbe('country', '(function() {\r\n  if (bt_parameter(\x27bt_country\x27)) {\r\n    return bt_parameter(\x27bt_country\x27);\r\n  }\r\n  if (window.dataLayer \x26\x26 window.dataLayer[0]) {\r\n    return window.dataLayer[0][\x27DetectedRegion\x27] || \x27\x27;\r\n  }\r\n})();', {pageId:12702});
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22US\x22')) {
serverURL.cf(54311);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27country\x27) \x3d\x3d \x22GB\x22 || bt_data(\x27country\x27) \x3d\x3d \x22CA\x22 || bt_data(\x27country\x27) \x3d\x3d \x22AU\x22 || bt_data(\x27country\x27) \x3d\x3d \x22NZ\x22)')) {
serverURL.cf(62461);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22GB\x22')) {
serverURL.cf(285999);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22GB\x22')) {
serverURL.cf(286026);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22GB\x22')) {
serverURL.cf(286044);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22AU\x22')) {
serverURL.cf(286080);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22AU\x22')) {
serverURL.cf(286095);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22CA\x22')) {
serverURL.cf(286153);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22AU\x22')) {
serverURL.cf(286176);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22CA\x22')) {
serverURL.cf(286194);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27country\x27) \x3d\x3d \x22CA\x22')) {
serverURL.cf(286203);
}
} catch(e) { bt_handle_exception(e); }
});
