BrightTag.instance.dbe('brighttag user id', '\x271731210185\x27');
BrightTag.instance.dbe('product id', 'pageData.product_Details.itemProductID', {pageId:13578});
BrightTag.instance.dbe('keyword', 'pageData.page_details.pageKeyword', {pageId:13578});
BrightTag.instance.dbe('page type - hl', 'pageData.page_details ? pageData.page_details.pageTypeHL : pageData.Page_Details.pageTypeHL', {pageId:1092174});
BrightTag.instance.dbe('product price - hl', 'pageData.product_Details.itemOriginalPrice.replace(/^\\W/,\x27\x27)', {pageId:13578});
BrightTag.instance.appendContent('\x3c!-- HookLogic library --\x3e\n\x3cscript type\x3d\x22text/javascript\x22 language\x3d\x22javascript\x22\x3e\n(function() {\n    var useSSL \x3d \x27https:\x27 \x3d\x3d document.location.protocol;\n    var src \x3d (useSSL ? \x27https:\x27 : \x27http:\x27) + \x27//www.hlserve.com/Delivery/ClientPaths/Library/hook.js\x27;\n    document.write(\x27\x3cscr\x27 + \x27ipt src\x3d\x22\x27 + src + \x27\x22\x3e\x3c/scr\x27 + \x27ipt\x3e\x27);\n})();\n\x3c/script\x3e\n\x3c!-- HookLogic page properties --\x3e \n\x3cscript type\x3d\x22text/javascript\x22 language\x3d\x22javascript\x22\x3e \n   HLLibrary.setProperty(\x22clientId\x22, \x22164\x22); \n   HLLibrary.setProperty(\x22pageType\x22, \x22'+bt_data_escaped('page type - hl')+'\x22); \n   HLLibrary.setProperty(\x22taxonomy\x22, \x22'+bt_data_escaped('hooklogic taxonomy')+'\x22); \n   HLLibrary.setProperty(\x22prodId\x22, \x22'+bt_data_escaped('product id')+'\x22); \n   HLLibrary.setProperty(\x22parentsku\x22, \x22'+bt_data_escaped('product id')+'\x22); \n   HLLibrary.setProperty(\x22qty\x22, \x221\x22); \n   HLLibrary.setProperty(\x22prodP\x22, \x22'+bt_data_escaped('product price - hl')+'\x22); \n   HLLibrary.setProperty(\x22pUserId\x22, \x22'+bt_data_escaped('brighttag user id')+'\x22); \n   HLLibrary.setProperty(\x22cUserId\x22, \x22\x22); \n   HLLibrary.setProperty(\x22kw\x22, \x22'+bt_data_escaped('keyword')+'\x22); \n   \n\x3c/script\x3e \n \n\x3c!-- HookLogic Product Ad Slot 1 --\x3e\n\x3cscript type\x3d\x22text/javascript\x22 language\x3d\x22javascript\x22\x3e\nHLLibrary.setLocation (\x22hl_1_999\x22);\x3c/script\x3e\n\x3c!-- HookLogic Data Call --\x3e\n\x3cscript type\x3d\x22text/javascript\x22 language\x3d\x22javascript\x22\x3e\n   HLLibrary.submit();\n\x3c/script\x3e',{tagId:191274});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//static.criteo.net/js/ld/ld.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        window.criteo_q \x3d window.criteo_q || [];\n        (function() {\n          var events \x3d [];\n          function addEventIfDefined(eventName, fieldName, fieldValue) {\n            if (fieldValue) {\n              var event \x3d { \x27event\x27: eventName};\n              event[fieldName] \x3d fieldValue;\n              events.push(event);\n            }\n          }\n          addEventIfDefined(\x22setAccount\x22, \x22account\x22, "9171");\n          addEventIfDefined(\x22setCustomerId\x22, \x22id\x22, "2254016530920600");\n          if (\x27\x27.indexOf(\x27@\x27) \x3e\x3d 0) {\n            addEventIfDefined(\x22setHashedEmail\x22, \x22email\x22, \x22\x22);\n          } else {\n            addEventIfDefined(\x22setHashedEmail\x22, \x22email\x22, \x27\x27);\n          }\n          addEventIfDefined(\x22setSiteType\x22, \x22type\x22, "d");\n          BrightTag.each([{key:"ui_tt",value:"product"}], function(param) {\n            addEventIfDefined(\x22setData\x22, param.key, param.value);\n          });\n          events.push({ event: \x27viewItem\x27, product: "1404948" });\n          window.criteo_q.push(events);\n        })();\n      \x3c/script\x3e',{tagId:541601});