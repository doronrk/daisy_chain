BrightTag.instance.dbe('brand code', '\x22anf\x22', {pageId:10565});
BrightTag.instance.dbe('store id', '(function () {\r\n\tvar fromObject\x3d\x27\x27;\r\n\tvar fromURL\x3d\x27\x27;\r\n\tvar fromCookie\x3d\x27\x27;\r\n\tvar baseKey \x3d \x27\x27;\r\n\tvar stepValue \x3d \x27\x27\r\n\tvar returnValue \x3d \x27\x27;\r\n\r\n\t//find possible values\r\n\ttry {\r\n\t\tfromURL \x3d bt_parameter(\x27storeId\x27).split(\x27,\x27)[0];\r\n\t\tif ($.isNumeric(fromURL) \x26\x26 fromURL.length \x3d\x3d 5) {\r\n\t\t\t// Do nothing\r\n\t\t} else {\r\n\t\t\tif (fromURL.length \x3e 5 \x26\x26 $.isNumeric(fromURL.substr(0,5))) {\r\n\t\t\t\tfromURL \x3d fromURL.substr(0,5);\r\n\t\t\t} else {\r\n                if (fromURL.length \x3e 0) {\r\n                    fromURL \x3d \x22storeid invalid\x22;\r\n                }\r\n\t\t\t}\r\n\t\t}\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\ttry {\r\n\t\tfromObject \x3d ANF.params.storeAttributes.storeId;\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\ttry {\r\n\t\tfromCookie \x3d $.cookie(\x27myStore\x27);\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\t//order of setting preference\r\n\tbaseKey \x3d fromObject || fromCookie || fromURL || \x27\x27;\r\n\r\n\r\n\t//interpret baseKey into something useful\r\n\tstepValue \x3d baseKey;\r\n\r\n\t//done determining value - assign returnValue \r\n\treturnValue \x3d stepValue\r\n\r\n\t//Any further processing?\r\n\tif (returnValue \x3d\x3d\x27\x27) {\r\n\t\treturnValue \x3d \x27storeid unavailable\x27;\r\n\t}\r\n\r\n\t//handle some cases where storeId is in the URL twice or just plain odd looking.\r\n\treturnValue \x3d returnValue.toString().split(\x22,\x22)[0];\r\n\treturnValue \x3d returnValue.toString().split(\x22_\x22)[0];\r\n\r\n\treturn returnValue;\r\n})();', {pageId:6988});
BrightTag.instance.dbe('category hierarchy for personalization ( | delimited)', '(function(){\r\n  var categoryHierarchy \x3d \x22\x22;\r\n  try { var categoryHierarchyObj \x3d ANF.catalog.data.categoryHierarchyObj; } catch(e) { }\r\n  try {\r\n    if (typeof categoryHierarchyObj !\x3d \x27undefined\x27) {\r\n      $.each( ANF.catalog.data.categoryHierarchyObj, function (i, v){ categoryHierarchy +\x3d \x22|\x22+v.name; });\r\n    }\r\n  } catch(e) {\r\n  }\r\n  categoryHierarchy \x3d categoryHierarchy.toLowerCase();\r\n  categoryHierarchy \x3d categoryHierarchy.replace(\x27|\x27,\x27\x27);\r\n  categoryHierarchy \x3d categoryHierarchy.replace(\x27|sale\x27,\x27\x27); \r\n  categoryHierarchy \x3d categoryHierarchy.replace(\x27|clearance\x27,\x27\x27); \r\n  categoryHierarchy \x3d categoryHierarchy.replace(\x27|featured items\x27,\x27\x27); \r\n\r\n  if (categoryHierarchy.split(\x27|\x27).length \x3e 1) {\r\n    return categoryHierarchy.split(\x27|\x27).slice(0,2).join(\x27|\x27);\r\n  } else {\r\n    return \x22\x22;\r\n  }\r\n})();', {pageId:6988});
BrightTag.instance.dbe('country code', '(function () {\r\n\tvar fromObject\x3d\x27\x27;\r\n\tvar fromURL\x3d\x27\x27;\r\n\tvar fromCookie\x3d\x27\x27;\r\n\tvar baseKey \x3d \x27\x27;\r\n\tvar stepValue \x3d \x27\x27\r\n\tvar returnValue \x3d \x27\x27;\r\n\r\n\t//find possible values\r\n\ttry {\r\n\t\tfromURL \x3d bt_parameter(\x27storeId\x27);\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\ttry {\r\n\t\tfromObject \x3d ANF.params.storeAttributes.storeId;\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\ttry {\r\n\t\tfromCookie \x3d $.cookie(\x27myStore\x27);\r\n\t}catch(e){ //Do nothing;\r\n\t}\r\n\r\n\t//order of setting preference\r\n\tbaseKey \x3d fromObject || fromURL || fromCookie || \x27\x27;\r\n\tbaseKey \x3d baseKey.toString();\r\n\tbaseKey \x3d baseKey.split(\x22,\x22)[0];\r\n\tbaseKey \x3d baseKey.split(\x22_\x22)[0];\r\n\r\n\r\n\t//interpret baseKey into something useful\r\n\tswitch (baseKey.toString()) {\r\n\t\tcase \x2711306\x27: case \x2711307\x27: case \x2711308\x27: \r\n\t\t\tstepValue \x3d \x27ca\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2719158\x27: case \x2719159\x27: case \x2719160\x27: \r\n\t\t\tstepValue \x3d \x27eu\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2716609\x27: case \x2719161\x27: case \x2719658\x27: case \x2719659\x27:\r\n\t\t\tstepValue \x3d \x27gb\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2715108\x27: case \x2716607\x27: case \x2717608\x27: \r\n\t\t\tstepValue \x3d \x27hk\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2714108\x27:\r\n\t\t\tstepValue \x3d \x27jp\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2711203\x27: case \x2711204\x27: case \x2711205\x27: case \x2714621\x27: \r\n\t\t\tstepValue \x3d \x27mx\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2720658\x27:\r\n\t\t\tstepValue \x3d \x27sg\x27;\r\n\t\t\tbreak;\r\n\t\tcase \x2710051\x27: case \x2710101\x27: case \x2710251\x27: case \x2713607\x27:  \r\n\t\t\tstepValue \x3d \x27us\x27;\r\n\t\t\tbreak;\r\n\t\tdefault:\r\n\t\t\tstepValue \x3d \x27country unavailable\x27;\r\n\t}\r\n\r\n\t//done determining value - assign returnValue \r\n\treturnValue \x3d stepValue\r\n\r\n\t//Any further processing?\r\n\r\n\t//Set return \r\n\treturn returnValue.toLowerCase();\r\n})();\r\n', {pageId:6988});
BrightTag.instance.dbe('liveperson lob', '\x22sales\x22', {pageId:6989});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\nfunction doLanguageFromLangCode(languageCode) {\n    var languageWord \x3d \x27\x27;\n\n    switch (languageCode.toLowerCase()) {\n    \tcase \x27en\x27:case \x27en-au\x27:case \x27en-bz\x27:case \x27en-ca\x27:case \x27en-ie\x27:case \x27en-jm\x27:case \x27en-nz\x27:case \x27en-ph\x27:case \x27en-za\x27:case \x27en-tt\x27:case \x27en-gb\x27:case \x27en-us\x27:case \x27en-zw\x27:\n\t\t\tlanguageWord\x3d\x27english\x27;\n\t\t\tbreak;\n\n\t\tcase \x27fr\x27: case \x27fr-be\x27: case \x27fr-ca\x27: case \x27fr-fr\x27: case \x27fr-lu\x27: case \x27fr-mc\x27: case \x27fr-mc\x27: case \x27fr-ch\x27:\n\t\t\tlanguageWord\x3d\x27french\x27;\n\t\t\tbreak;\n\n\n\t\tcase \x27de\x27: case \x27de-at\x27: case \x27de-de\x27: case \x27de-li\x27: case \x27de-lu\x27: case \x27de-ch\x27:\n\t\t\tlanguageWord\x3d\x27german\x27;\n\t\t\tbreak;\n\n\t\tcase \x27it\x27: case \x27it-ch\x27: \n\t\t\tlanguageWord\x3d\x27italian\x27;\n\t\t\tbreak;\n\n\t\tcase \x27nl\x27: case \x27nl-be\x27: \n\t\t\tlanguageWord\x3d\x27dutch\x27;\n\t\t\tbreak;\n\n\t\tcase \x27pt\x27: case \x27pt-br\x27: \n\t\t\tlanguageWord\x3d\x27portuguese\x27;\n\t\t\tbreak;\n\n\t\tcase \x27es\x27: case \x27es-ar\x27: case \x27es-bo\x27: case \x27es-cl\x27: case \x27es-co\x27: case \x27es-cr\x27: case \x27es-do\x27: case \x27es-ec\x27: case \x27es-sv\x27: case \x27es-gt\x27: case \x27es-hn\x27: case \x27es-mx\x27: case \x27es-ni\x27: case \x27es-pa\x27: case \x27es-py\x27: case \x27es-pe\x27: case \x27es-pr\x27: case \x27es-es\x27: case \x27es-ur\x27: case \x27es-ve\x27: \n\t\t\tlanguageWord\x3d\x27spanish\x27;\n\t\t\tbreak;\n\n\t\tcase \x27ja\x27:\n\t\t\tlanguageWord\x3d\x27japanese\x27;\n\t\t\tbreak;\n\n\t\tcase \x27zh-cn\x27:\n\t\t\tlanguageWord\x3d\x27chinese\x27;\n\t\t\tbreak;\n\n\t}\n\n\treturn languageWord;\n}\n\nfunction doLanguageFromSubdomain(thisSite){\n\tvar arr_thisSite \x3d thisSite.toLowerCase().split(\x22.\x22);\n\tvar env \x3d arr_thisSite[0];\n\n\tfor (i\x3d1;i\x3carr_thisSite.length-2;i++){\n\t\tenv +\x3d \x22.\x22 + arr_thisSite[i];\n\t}\n\n\tvar langCode \x3d env.replace(\x27test1.\x27,\x27\x27).replace(\x27test2.\x27,\x27\x27).replace(\x27test3.\x27,\x27\x27).replace(\x27dev1.\x27,\x27\x27).replace(\x27dev2.\x27,\x27\x27).replace(\x27dev3.\x27,\x27\x27).replace(\x27prod.\x27,\x27\x27).replace(\x27m.\x27,\x27\x27).replace(\x27.com\x27,\x27\x27).replace(\x27.ca\x27,\x27\x27).replace(\x27.co.uk\x27,\x27\x27).substring(0,2);\n\tvar languageWord \x3d \x27unknown\x27;\n\n\tswitch (langCode) {\n\t\tcase \x22ja\x22:\n\t\t\tlanguageWord \x3d \x27japanese\x27;\n\t\t\tbreak;\n\t\tcase \x22jp\x22: case \x22eu\x22: case \x22ww\x22: case \x22mx\x22: case \x22hk\x22: case \x22m\x22: case \x22sg\x22: case \x22uk\x22:\n\t\t\tlanguageWord \x3d \x27english\x27;\n\t\t\tbreak;\n\t\tcase \x22it\x22:\n\t\t\tlanguageWord \x3d \x27italian\x27;\n\t\t\tbreak;\n\t\tcase \x22de\x22:\n\t\t\tlanguageWord \x3d \x27german\x27;\n\t\t\tbreak;\n\t\tcase \x22fr\x22:\n\t\t\tlanguageWord \x3d \x27french\x27;\n\t\t\tbreak;\n\t\tcase \x22es\x22:\n\t\t\tlanguageWord \x3d \x27spanish\x27;\n\t\t\tbreak;\n\t\tcase \x22cn\x22:\n\t\t\tlanguageWord \x3d \x27chinese\x27;\n\t\t\tbreak;\n\t}\n\t//console.log (\x27thisSite \x27 + thisSite + \x27\x3d\x22\x27 + languageWord + \x27\x22\x27);\n\treturn languageWord;\n}\n\nvar browserAccept \x3d (navigator.language) ? navigator.language : navigator.userLanguage;\nvar browserLang \x3d doLanguageFromLangCode(browserAccept);\nvar userLang \x3d browserLang || doLanguageFromSubdomain(window.location.host);\n\x3c/script\x3e\n\n\n\n\x3cscript type\x3d\x22text/javascript\x22\x3e\n\tvar lpBrand \x3d \x27'+bt_data_escaped('brand code')+'\x27;\n\tvar lpLOB \x3d \x27'+bt_data_escaped('liveperson lob')+'\x27;\n\tvar lpLanguage \x3d userLang;\n\tvar lpCountryID \x3d \x27'+bt_data_escaped('country code')+'\x27.toUpperCase();\n\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//s.btstatic.com/lib/8dfde6b3aaea6358deb7d72f3ee9adec5ed5315b.js\x22\x3e\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/javascript\x22\x3e\nif (typeof(lpAddVars)!\x3d\x22undefined\x22) {  \n    if (typeof s.prop12 !\x3d \x27undefined\x27){\n        lpAddVars(\x27page\x27,\x27SearchResults\x27,s.prop12);\n    }\n    if (typeof s.eVar12 !\x3d \x27undefined\x27){\n    \tlpAddVars(\x27page\x27, \x27CampaignChannel\x27, s.eVar12);\n    }\n    if (typeof s.event35 !\x3d \x27undefined\x27){\n    \tlpAddVars(\x27page\x27, \x27CartTotal\x27, event35);\n    }\n    if (typeof s.channel !\x3d \x27undefined\x27){\n    \tlpAddVars(\x27page\x27, \x27Section\x27, s.channel);\n    }\n    if (typeof s.pageName !\x3d \x27undefined\x27){\n    \tlpAddVars(\x27page\x27, \x27ConversionStage\x27, s.pageName);\n    }\n    if (typeof s.eVar11 !\x3d \x27undefined\x27){\n    \tlpAddVars(\x27visitor\x27, \x27VisitorID\x27, s.eVar11);\n    }\n    \tlpAddVars(\x27page\x27,\x27BrowserLanguage\x27,browserLang);\n    \tlpAddVars(\x27page\x27,\x27StoreID\x27,\x27'+bt_data_escaped('store id')+'\x27);\n\n        if (\x27'+bt_data_escaped('purchase subtotal')+'\x27 !\x3d \x27\x27 || \x27'+bt_data_escaped('purchase id')+'\x27 !\x3d \x27\x27) {\n            /*some additional values for the Order Confirmation pages*/\n            lpAddVars(\x27page\x27,\x27OrderTotal\x27,\x27'+bt_data_escaped('purchase subtotal')+'\x27); \n            lpAddVars(\x27page\x27,\x27OrderNumber\x27,\x27'+bt_data_escaped('purchase id')+'\x27); \n        } else { \n            /*not order cofirmation, so send shopping cart values*/\n            var cartItems \x3d $(\x27li#util-minicart span.qty\x27).text().replace(\x27(\x27,\x27\x27).replace(\x27)\x27,\x27\x27) || \x220\x22;\n            var cartTotal \x3d (function(){\n                var subTotal \x3d $(\x27tr.subtotal\x27).attr(\x27data-usd-subtotal\x27);\n                var calculatedTotal \x3d \x27\x27;\n                try{\n                    calculatedTotal \x3d BTanalytics.cartTotal;\n                }catch(e){}\n                return subTotal || calculatedTotal || \x220\x22\n            })();\n\n            lpAddVars(\x27page\x27,\x27TotalItems\x27,cartItems); \n            lpAddVars(\x27page\x27,\x27CartTotal\x27,cartTotal); \n        }\n\n}\n$(\x27body\x27).append(\x27\x3cdiv id\x3d\x22lpchat\x22 style\x3d\x22z-index:20;\x22\x3e\x3c/div\x3e\x27);\n\x3c/script\x3e\n',{tagId:13215});
BrightTag.instance.appendContent('\x3cscript\x3e\n/* Personalization */\n    if (typeof BTanalytics.browse \x3d\x3d \x22undefined\x22) { BTanalytics.browse \x3d {}; }\n    if (typeof BTanalytics.browse.list \x3d\x3d \x22undefined\x22) { BTanalytics.browse.list \x3d \x22\x22; }\n    if (typeof BTanalytics.browse.cat \x3d\x3d \x22undefined\x22) { BTanalytics.browse.cat \x3d \x22\x22; }\n    if (typeof BTanalytics.browse.catCnt \x3d\x3d \x22undefined\x22) { BTanalytics.browse.catCnt \x3d 0; }\n    \n    if (\x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22 !\x3d \x22\x22) {\n        if (\x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22 \x3d\x3d BTanalytics.browse.cat) {\n            BTanalytics.browse.catCnt \x3d BTanalytics.browse.catCnt + 1;\n        } else {\n            BTanalytics.browse.cat \x3d \x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22;\n            BTanalytics.browse.catCnt \x3d 1;\n        }\n    }\n    \n    if (typeof BTanalytics.browse.list \x3d\x3d \x22\x22 \x26\x26 \x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22 !\x3d \x22\x22 \x26\x26 BTanalytics.browse.catCnt \x3e 3 ) {\n        BTanalytics.browse.list \x3d \x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22;\n    } else {\n        if (BTanalytics.browse.list.indexOf(\x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22) \x3c 0 \x26\x26 BTanalytics.browse.catCnt \x3e 3 ) {\n            BTanalytics.browse.list \x3d \x22'+bt_data_escaped('category hierarchy for personalization ( | delimited)')+'\x22 + \x22;\x22 + BTanalytics.browse.list;\n            BTanalytics.browse.list \x3d BTanalytics.browse.list.split(\x22;\x22).slice(0,5).join(\x22;\x22);\n\n        }\n    }\n\n    if (typeof $.cookie !\x3d \x27undefined\x27) {\n        $.cookie(\x27BTanalytics\x27,JSON.stringify(BTanalytics),{path:\x27/\x27});\n    }\n\x3c/script\x3e',{tagId:578937});
