BrightTag.instance.dbe('promo id', '\x224\x22', {pageId:19109});
BrightTag.instance.dbe('page name', 's.pageName', {pageId:25675});
BrightTag.instance.dbe('encoded referring url', 'encodeURIComponent(document.referrer)', {pageId:25675});
BrightTag.instance.dbe('boseid', 'getCookie(\x27bose_id\x27)', {pageId:25675});
BrightTag.instance.dbe('dtm_token', 'getCookie(\x27dtm_token\x27)', {pageId:25675});
BrightTag.instance.dbe('subcategory name', '(function(){\r\nvar modelNumber \x3d \x22\x22;\r\nif(document.URL.indexOf(\x22model\x3d\x22) \x3e -1){\r\n\tmodelNumber \x3d document.URL.split(\x22model\x3d\x22)[1];\r\n\tif(modelNumber.indexOf(\x22\x26\x22) \x3e -1){\r\n\t\tmodelNumber \x3d modelNumber.split(\x22\x26\x22)[0];\r\n\t}\r\n}else if(document.URL.indexOf(\x22Variant\x3d\x22) \x3e -1){\r\n\tmodelNumber \x3d document.URL.split(\x22Variant\x3d\x22)[1];\r\n\tif(modelNumber.indexOf(\x22\x26\x22) \x3e -1){\r\n\t\tmodelNumber \x3d modelNumber.split(\x22\x26\x22)[0];\r\n\t}\r\n}\r\nreturn modelNumber;\r\n})();', {pageId:25675});
BrightTag.instance.appendContent('\x3ciframe height\x3d\x221\x22 width\x3d\x221\x22 frameborder\x3d\x220\x22 scrolling\x3d\x22no\x22 src\x3d\x22http://www.emjcd.com/tags/r?containerTagId\x3d2713\x26PROMOID\x3d'+bt_data_escaped('promo id')+'\x26USERID\x3d'+bt_data_escaped('boseid')+'\x26REFERRER\x3d'+bt_data_escaped('encoded referring url')+'\x26CATEGORY\x3d'+bt_data_escaped('page name')+'\x26SUBCATEGORY\x3d'+bt_data_escaped('subcategory name')+'\x26USER_TOKEN\x3d'+bt_data_escaped('dtm_token')+'\x22\x3e\x3c/iframe\x3e',{tagId:26430});
try { BrightTag.instance.appendContent('\x3cscript type\x3d\x27text/javascript\x27\x3e\n        (function() {\n          var items \x3d [],\n            prdArr \x3d [],\n            varsString \x3d \x27\x27.replace(/(\\s+)/gm,\x22\x22);\n\n          if (!BrightTag.Types.isArray(items)) {\n            items \x3d [items];\n          };\n\n          var addIfDefined \x3d function(fieldName, keyStr, indexStr) {\n            if (fieldName) {\n              prdArr.push(keyStr + indexStr + \x22:\x22 + fieldName);\n            }\n          }\n\n          BrightTag.Util.each(items, function(prod, index) {\n            var indexStr \x3d (index + 1);\n            addIfDefined(prod[\x22\x22], \x22i\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22p\x22, indexStr);\n            addIfDefined(prod[\x220\x22], \x22q\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22c\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22l\x22, indexStr);\n            addIfDefined(prod[\x22\x22], \x22a\x22, indexStr);\n          });\n\n          BrightTag.Content.iframe(\x22//1859255.fls.doubleclick.net/activityi;src\x3d1859255;type\x3dsitea812;cat\x3dboseu190\x22 + varsString + \x22;ord\x3d'+eval('Math.random()*10000000000000')+';prd\x3d\x22 + prdArr.join(\x22|\x22), {display: \x27none\x27});\n        })();\n      \x3c/script\x3e',{tagId:45196});
} catch(e) { bt_handle_exception(e); }
