BrightTag.instance.errors({enabled:false});
BrightTag.EventBinding.bind('login start', window, 'DIRECT/login_start', {pageId:1075002});
BrightTag.EventBinding.bind('login complete', window, 'DIRECT/login_complete', {pageId:1075002});
BrightTag.EventBinding.bind('refinement', window, 'DIRECT/refine_results', {pageId:1075002});
BrightTag.EventBinding.bind('product review', window, 'DIRECT/product_review', {pageId:1075002});
BrightTag.EventBinding.bind('remove from bag', window, 'DIRECT/remove_from_cart', {pageId:1075002});
BrightTag.EventBinding.bind('quick look', window, 'DIRECT/quick_look', {pageId:1075002});
BrightTag.EventBinding.bind('add to bag', window, 'DIRECT/add_to_cart', {pageId:1075002});
BrightTag.EventBinding.bind('store locator search', window, 'DIRECT/store_locator_search', {pageId:1075002});
BrightTag.EventBinding.bind('paypal checkout', window, 'DIRECT/paypal_checkout', {pageId:1075002});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n//console2.log(pageData);\n//alert(JSON.stringify(pageData));\n\x3c/script\x3e',{tagId:1594950});
BrightTag.EventBinding.when('login start').execute('//alert(JSON.stringify(eventData[0]));\r\n',{tagId:1594950});
BrightTag.EventBinding.when('paypal checkout').execute('//document.write(\x27\x3cpre\x3e\x27 + JSON.stringify(eventData[0]) + \x27\x3c/pre\x3e\x27);\r\n//console2.log(eventData[0]);\r\n//alert(eventData[0]);',{tagId:1594950});
BrightTag.EventBinding.when('store locator search').execute('alert(JSON.stringify(eventData[0]));',{tagId:1594950});
BrightTag.EventBinding.when('quick look').execute('//document.write(\x27\x3cpre\x3e\x27 + JSON.stringify(eventData[0]) + \x27\x3c/pre\x3e\x27);\r\n//console2.log(eventData[0]);',{tagId:1594950});
BrightTag.EventBinding.when('login complete').execute('//alert(JSON.stringify(eventData[0]));',{tagId:1594950});
BrightTag.EventBinding.when('product review').execute('//document.write(\x27\x3cpre\x3e\x27 + JSON.stringify(eventData[0]) + \x27\x3c/pre\x3e\x27);\r\n//alert(JSON.stringify(eventData[0]));',{tagId:1594950});
BrightTag.EventBinding.when('add to bag').execute('if (window.pageData \x26\x26 window.pageData.site \x26\x26 pageData.site.is_production \x3d\x3d\x3d \x22false\x22) {\r\n//alert(JSON.stringify(eventData[0]));\r\n}',{tagId:1594950});
BrightTag.EventBinding.when('remove from bag').execute('//document.write(\x27\x3cpre\x3e\x27 + JSON.stringify(eventData[0]) + \x27\x3c/pre\x3e\x27);\r\n//alert(JSON.stringify(eventData[0]));',{tagId:1594950});
BrightTag.EventBinding.when('refinement').execute('if (window.pageData \x26\x26 window.pageData.site \x26\x26 pageData.site.is_production \x3d\x3d\x3d \x22false\x22) {\r\n//alert(JSON.stringify(eventData[0]));\r\n}',{tagId:1594950});
