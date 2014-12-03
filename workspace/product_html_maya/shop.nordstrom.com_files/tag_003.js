BrightTag.instance.errors({enabled:false});
BrightTag.instance.appendContent('\x3cscript\x3e\n// Product Page\nvar digitalData \x3d { cart: { attributes: {} }, component: [], page: { attributes: {}, category: {}, pageInfo: { destinationURL: window.location.href.replace(/\x27/g, \x27%27\x27), keyword: (window.location.href.indexOf(\x22keyword\x22) \x3e 0 ? document.URL.split(\x22keyword\x3d\x22)[1] : null) } }, product: [], user: [] }, prod_string \x3d \x27\x27, ref_page_catID \x3d (bt_parameter(\x27PageCategoryId\x27) ? bt_parameter(\x27PageCategoryId\x27) : bt_parameter(\x27recs_categoryId\x27));\n\nfor (var i\x3dnord.config.settings.length;i-- \x3e 0;) {\n\tif (\x27product\x27 in nord.config.settings[i]) {\n\t\tvar product \x3d nord.config.settings[i].product;\n\t\tdigitalData.product.push({\n\t\t\tcategory: { primaryCategory: null },\n\t\t\tproductInfo: {\n\t\t\t\tcategory: { \n\t\t\t\t\tprimaryCategory: null, \n\t\t\t\t\tparentCategory: null, \n\t\t\t\t\treferringCategory: null \n\t\t\t\t},\n\t\t\t\tavailable: product.available,\n\t\t\t\tbaseCopySplitDesignation: product.baseCopySplitDesignation,\n\t\t\t\tbrandName: product.brandName, \n\t\t\t\tfitRecommendation: {\n\t\t\t\t\ttrufitEligible: (\x27fitRecommendation\x27 in product \x26\x26 \x27trufitEligible\x27 in product.fitRecommendation ? product.fitRecommendation.trufitEligible : false),\n\t\t\t\t\ttruFitRecommendation: (\x27fitRecommendation\x27 in product \x26\x26 \x27truFitRecommendation\x27 in product.fitRecommendation \x26\x26 product.fitRecommendation.truFitRecommendation !\x3d\x3d \x27\x27 ? product.fitRecommendation.truFitRecommendation : false),\n\t\t\t\t\tshoeFitrEligible: (\x27fitRecommendation\x27 in product \x26\x26 \x27shoeFitrEligible\x27 in product.fitRecommendation ? product.fitRecommendation.shoeFitrEligible : false),\n\t\t\t\t\tshoeFitrRecommendation: (\x27fitRecommendation\x27 in product \x26\x26 \x27shoeFitrRecommendation\x27 in product.fitRecommendation \x26\x26 product.fitRecommendation.shoeFitrRecommendation ? product.fitRecommendation.shoeFitrRecommendation : false),\n\t\t\t\t\tconsumerInsightEligible: (\x27fitRecommendation\x27 in product \x26\x26 \x27consumerInsightEligible\x27 in product.fitRecommendation ? product.fitRecommendation.consumerInsightEligible : false),\n\t\t\t\t\tCIRecommendedSize: (\x27fitRecommendation\x27 in product \x26\x26 \x27CIRecommendedSize\x27 in product.fitRecommendation \x26\x26 product.fitRecommendation.CIRecommendedSize !\x3d\x3d \x27\x27 ? product.fitRecommendation.CIRecommendedSize : false)\n\t\t\t\t},\n\t\t\t\tonSale: product.onSale,\n\t\t\t\tproductName: product.name,\n\t\t\t\tstyleNumber: product.styleNumber.replace(\x27\\\x27\x27,\x27\x27)\n\t\t\t}\n\t\t});\n\t\tprod_string \x3d \x27PRODUCT: \x27 + digitalData.product[0].productInfo.brandName + \x27 \x27 + digitalData.product[0].productInfo.productName + \x27 (\x27 + digitalData.product[0].productInfo.styleNumber + \x27)\x27;\n\t\tif (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) prod_string +\x3d \x27 - MOW\x27;\t\t// Page ID\n\t}\n\tif (\x27analytics\x27 in nord.config.settings[i]) {\n\t\tvar analytics \x3d nord.config.settings[i].analytics;\n\t\tif (\x27pageTemplate\x27 in analytics) digitalData.page.pageInfo.page_template \x3d analytics.pageTemplate;\t\t// Page Template\n\t\tif (\x27pageId\x27 in analytics) digitalData.page.pageInfo.pageID \x3d analytics.pageId.replace(/\\\x27/g, \x22\x22);\t\t// Page ID\n\t\tif (\x27categoryPath\x27 in analytics) digitalData.page.category.categoryString \x3d analytics.categoryPath;\t\t// Category String\n\t\tif (\x27categoryId\x27 in analytics) digitalData.product[0].category.primaryCategory \x3d analytics.categoryId;\n\t}\n\tif (\x27features\x27 in nord.config.settings[i]) {\n\t\tfor (var x in nord.config.settings[i].features) {\n\t\t\tdigitalData.component[x] \x3d {\n\t\t\t\tcomponentInfo: {\n\t\t\t\t\tcomponentID: null,\n\t\t\t\t\tisEnabled: nord.config.settings[i].features[x]\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t}\n\tif (\x27shopper\x27 in nord.config.settings[i]) {\n\t\tdigitalData.user.push({\n\t\t\tprofile: [{\n\t\t\t\tprofileID: (\x27id\x27 in nord.config.settings[i].shopper ? nord.config.settings[i].shopper.id : null),\n\t\t\t\tuserName: (\x27firstName\x27 in nord.config.settings[i].shopper \x26\x26 nord.config.settings[i].shopper.firstName !\x3d\x3d \x27\x27 ? nord.config.settings[i].shopper.firstName : null)\n\t\t\t}],\n\t\t\tsegment: {\n\t\t\t\tisLoggedIn: (\x27isLoggedIn\x27 in nord.config.settings[i].shopper ? nord.config.settings[i].shopper.isLoggedIn : false)\n\t\t\t}\n\t\t});\n\t}\n\tif (\x27tto\x27 in nord.config.settings[i]) {\n\t\tif (\x27parentCategoryId\x27 in nord.config.settings[i].tto) digitalData.product[0].category.parentCategory \x3d nord.config.settings[i].tto.parentCategoryId;\n\t}\n}\n\nfunction createAttributeString(attrArray, max) {\n\tvar attrString \x3d \x22\x22;\n\tfor (var i \x3d 1; i \x3c\x3d max; i++) {\n\t\tif(typeof attrArray[i.toString()] \x3d\x3d \x22boolean\x22) attrString +\x3d attrArray[i.toString()].toString();\n\t\telse if(attrArray[i.toString()] !\x3d \x22\x22 \x26\x26 attrArray[i.toString()] !\x3d undefined) attrString +\x3d attrArray[i.toString()];\n\t\tif(i !\x3d max) attrString +\x3d \x22-_-\x22;\n\t}\n\treturn attrString;\n}\n\nfunction decodeHtmlNumeric( str ) {\n\treturn str.replace( /\x26#([0-9]{1,7});/g, function( g, m1 ){\n\t\treturn String.fromCharCode( parseInt( m1, 10 ) );\n\t}).replace( /\x26#[xX]([0-9a-fA-F]{1,6});/g, function( g, m1 ){\n\t\treturn String.fromCharCode( parseInt( m1, 16 ) );\n\t});\n}\n\n// Mozilla, Opera, Webkit \nif ( document.addEventListener ) {\n  document.addEventListener( \x22DOMContentLoaded\x22, function(){\n  \t// console.log(\x27DOMContentLoaded: \x27 +(Date.now()-window.performance.timing.responseStart));\n    // document.removeEventListener( \x22DOMContentLoaded\x22, arguments.callee, false);\n    // domReady();\n    domready();\n  }, false );\n\n// If IE event model is used\n} else if ( document.attachEvent ) {\n  // ensure firing before onload\n  document.attachEvent(\x22onreadystatechange\x22, function(){\n    if ( document.readyState \x3d\x3d\x3d \x22complete\x22 ) {\n  \t// console.log(\x27DOMContentLoaded: \x27 +(Date.now()-window.performance.timing.responseStart));\n      // document.detachEvent( \x22onreadystatechange\x22, arguments.callee );\n      // domReady();\n    domready();\n    }\n  });\n}\n\nfunction domready() {\n\tdocument.write(\x27\x3cscr\x27 + \x27ipt src\x3d\x22//libs.coremetrics.com/eluminate.js\x22\x3e\x3c/scr\x27 + \x27ipt\x3e\x27);\n\tdigitalData.page.pageInfo.MMdata \x3d (function() { if (\x27mmcore\x27 in window \x26\x26 \x27GenInfo\x27 in mmcore) { var newarray \x3d []; $.each(mmcore.GenInfo, function(i, val) { $.each(val, function(j, val) { newarray.push(i + \x27:\x27 + j + \x27:\x27 + val); }); }); return newarray.join(\x27|\x27) || null; } })();\t\t// MMdata\n\tfireCM();\n}\n\n// product view tag\nfunction fireProductView() {\n\tvar fit_value \x3d \x22null\x22, category_id \x3d digitalData.product[0].category.primaryCategory, truFitRecommendation \x3d digitalData.product[0].productInfo.fitRecommendation.truFitRecommendation, shoeFitrRecommendation \x3d digitalData.product[0].productInfo.fitRecommendation.shoeFitrRecommendation, CIRecommendedSize \x3d digitalData.product[0].productInfo.fitRecommendation.CIRecommendedSize, isLoggedIn \x3d digitalData.user[0].segment.isLoggedIn;\n\tif (digitalData.product[0].productInfo.fitRecommendation.trufitEligible) {\n\t\tfit_value \x3d \x22TF\x22;\n\t\tif (!isLoggedIn) fit_value +\x3d \x22_U\x22;\n\t\telse if (truFitRecommendation \x26\x26 isLoggedIn) fit_value +\x3d \x22_RR\x22;\n\t\telse if (!truFitRecommendation \x26\x26 isLoggedIn) fit_value +\x3d \x22_NR\x22;\n\t}\n\telse if (digitalData.product[0].productInfo.fitRecommendation.shoeFitrEligible) {\n\t\tfit_value \x3d \x22SF\x22;\n\t\tif (shoeFitrRecommendation) fit_value +\x3d \x22_RR\x22;\n\t\telse if (!shoeFitrRecommendation) fit_value +\x3d \x22_NR\x22;\n\t}\n\telse if (digitalData.product[0].productInfo.fitRecommendation.consumerInsightEligible) {\n\t\tfit_value \x3d \x22NFS\x22;\n\t\tif (!isLoggedIn) fit_value +\x3d \x22_U\x22;\n\t\telse if (CIRecommendedSize \x26\x26 isLoggedIn) fit_value +\x3d \x22_RR\x22;\n\t\telse if (!CIRecommendedSize \x26\x26 isLoggedIn) fit_value +\x3d \x22_NR\x22;\n\t}\n\tif (digitalData.component[\x27isSizeSpecificRecsEnabled\x27].componentInfo.isEnabled) category_id \x3d \x27RELATED ITEMS-PP RECOMMENDATIONS-RECOMMENDO-SIZE BASED\x27;\n\tif (window.location.href.indexOf(\x22origin\x3dPredictiveSearchProducts\x22) !\x3d\x3d -1) category_id \x3d \x27PREDICTIVE SEARCH POPULAR RESULTS\x27;\n\n\tvar attrArray \x3d [];\n\tattrArray[\x228\x22]  \x3d digitalData.product[0].productInfo.onSale;\n\tattrArray[\x229\x22]  \x3d digitalData.product[0].productInfo.brandName;\n\tattrArray[\x2213\x22] \x3d digitalData.product[0].productInfo.baseCopySplitDesignation;\n\tattrArray[\x2214\x22] \x3d fit_value;\n\tattrArray[\x2218\x22] \x3d (document.getElementById(\x27rack-banner\x27) !\x3d null);\n\tattrArray[\x2220\x22] \x3d digitalData.product[0].productInfo.available;\n\n\tcmMakeTag([\x22tid\x22,\x225\x22,\x22pi\x22,decodeHtmlNumeric(prod_string),\x22pr\x22,digitalData.product[0].productInfo.styleNumber,\x22pm\x22,decodeHtmlNumeric(digitalData.product[0].productInfo.productName),\x22cg\x22,category_id,\x22pc\x22,\x22N\x22,\x22li\x22,\x224\x22,\x22ps1\x22,digitalData.product[0].productInfo.styleNumber,\x22ps2\x22,decodeHtmlNumeric(digitalData.product[0].productInfo.productName),\x22ps3\x22,category_id,\x22ps4\x22,decodeHtmlNumeric(prod_string),\x22ps5\x22,null,\x22ps6\x22,null,\x22cm_vc\x22,cmExtractParameter(\x22cm_vc\x22,document.location.href),\x22cmAttributes\x22,createAttributeString(attrArray, 25)]);\n}\n// function cmCreateProductviewTag(d,f,e,c,b){var a\x3dc1(cm_ClientID);cmMakeTag([\x22tid\x22,\x225\x22,\x22pi\x22,a?a:\x22Product: \x22+f+\x22 (\x22+d+\x22)\x22,\x22pr\x22,d,\x22pm\x22,f,\x22cg\x22,e,\x22pc\x22,\x22N\x22,\x22cm_vc\x22,b?b:cmExtractParameter(\x22cm_vc\x22,document.location.href),\x22cmAttributes\x22,c])} \n\nvar fireCM \x3d function() {\n\tif (typeof cmSetClientID \x3d\x3d \x27function\x27) {\n\t\t//console.log(\x27wcm sync_pv: \x27 +(Date.now()-window.performance.timing.responseStart));\n\t\tif (typeof(cmSetupOther) \x3d\x3d \x27function\x27) { cmSetupOther({\x22cm_TrackImpressions\x22:\x22\x22}); }\n\t\telse var cm_TrackImpressions \x3d\x22\x22;\n\t\tif (window.location.hostname.indexOf(\x27dev\x27) \x3e -1) cmSetClientID(\x2760033273\x27,false,\x27testdata.coremetrics.com\x27,\x27nordstrom.com\x27);\n\t\telse cmSetClientID(\x2790033273\x27,false,\x271901.nordstrom.com\x27,\x27nordstrom.com\x27);\n\t\t//cmCreatePageviewTag(digitalData.page.pageInfo.pageID, digitalData.page.category.categoryString, digitalData.page.pageInfo.keyword, null, digitalData.page.pageInfo.page_template);\n\t\tcmMakeTag([\x22tid\x22, \x221\x22, \x22pi\x22, prod_string.replace(/\\\x27/,\x22\x22).replace(\x27\xe9\x27,\x22e\x22), \x22cg\x22, (ref_page_catID !\x3d \x27\x27 ? ref_page_catID + \x27 Recommended Item\x27 : digitalData.product[0].category.primaryCategory), \x22se\x22, digitalData.page.pageInfo.keyword, \x22sr\x22, null, \x22pv1\x22, null, \x22li\x22, \x223\x22, \x22ps1\x22, prod_string.replace(/\\\x27/,\x22\x22).replace(\x27\xe9\x27,\x22e\x22), \x22ps2\x22, digitalData.page.pageInfo.page_template, \x22cmAttributes\x22, (bt_parameter(\x27recs_categoryId\x27) ? (\x27-_--_--_--_--_-\x27 + digitalData.page.pageInfo.MMdata + \x27-_--_--_-\x27 + ref_page_catID) : \x27-_--_--_--_--_-\x27 + digitalData.page.pageInfo.MMdata + \x27-_--_--_--_-\x27 + digitalData.product[0].productInfo.styleNumber)]);\n\t\tfireProductView();\n\t}\n\telse setTimeout(fireCM, 50);\n};\n\nvar jq \x3d function() {\n\tif (\x27jQuery\x27 in window) {\n\t\t$(document).on(\x27mouseup\x27, \x27#price input[type\x3dradio]\x27, function() {\n\t\t\tif (\x27require\x27 in window \x26\x26 require.defined(\x27nord/config\x27) \x26\x26 typeof require(\x27nord/config\x27).setValue \x3d\x3d \x27function\x27) {\n\t\t\t\trequire(\x27nord/config\x27).setValue(\x27product.styleNumber\x27, $(this).parents(\x27.item-price-rows\x27).find(\x22.item-number-wrapper\x22).html().replace(\x22Item #\x22, \x22\x22));\n\t\t\t\tfireProductView();\n\t\t\t}\n\t\t});\n\t}\n\telse setTimeout(jq, 500);\n};\njq();\n\x3c/script\x3e',{tagId:1667611});
BrightTag.Blab.group('domready').wait(function () {
BrightTag.instance.load(
'//s.btstatic.com/lib/3559e6e95a487b0feeea2f7277dc14b330ac00fb.js',
'//s.btstatic.com/lib/1e27e1ff4edb3df836cb62580c4d314d7d54ddd3.js',
'//s.btstatic.com/lib/c976935e2689002ee7a1696913e96ea29a4545e9.js',
'//s.btstatic.com/lib/375592676144d6cdbb127e6d9959b239ed233270.js',
'//s.btstatic.com/lib/9bcecbafd13089e1dd57fd894c8fa1116bfb45a7.js',
'//s.btstatic.com/lib/1078a76eda90ee937e750e4ce32d83d6994fecef.js',
function (page) {
BrightTag.instance.dbe('shopper status', 'if(window.PageParameters !\x3d undefined \x26\x26 window.PageParameters !\x3d null){if (window.PageParameters.shopper.isLoggedIn \x3d\x3d true) {\x22Registered\x22} else {\x22Guest\x22}}', {pageId:1686});
BrightTag.instance.dbe('visitor id', '_$cV1', {pageId:1686});
BrightTag.instance.dbe('document referrer', 'document.referrer', {pageId:1686});
BrightTag.instance.dbe('split traffic test group', 'bt_cookie(\x27BTgroup\x27)', {pageId:1686});
BrightTag.instance.dbe('product price', 'if (\x27PageParameters\x27 in window) {\r\n\tif ($(\x27#itemNumberPrice li.price\x27).text().indexOf(\x27$\x27) \x3e\x3d 0) $(\x27#itemNumberPrice li.price\x27).text().split(\x27$\x27)[1].split(\x27N\x27)[0].split(\x27After\x27)[0].replace(/,/g,\x22\x22)\r\n}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) {\r\n\trequire(\x27nord/config\x27).getValue(\x27product.regularPrice\x27).replace(\x27$\x27, \x27\x27)\r\n}', {pageId:1672});
BrightTag.instance.dbe('data lab ctl recs enabled', 'if (\x27PageParameters\x27 in window \x26\x26 \x27dataLabRecommendationsEnabled\x27 in  PageParameters \x26\x26 PageParameters.dataLabRecommendationsEnabled !\x3d undefined) {\r\n\tPageParameters.dataLabRecommendationsEnabled\r\n}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) {\r\n\trequire(\x27nord/config\x27).getValue(\x27recommendations.isEnabled\x27);\r\n}\r\nelse {\x27false\x27}', {pageId:1672});
BrightTag.instance.dbe('product age group', 'if(\x27PageParameters\x27 in window \x26\x26 \x27productAgeGroup\x27 in PageParameters \x26\x26 PageParameters.productAgeGroup !\x3d null) window.PageParameters.productAgeGroup\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.ageGroup\x27)', {pageId:1672});
BrightTag.instance.dbe('referrer url (lower case)', 'document.referrer.toLowerCase()', {pageId:1686});
BrightTag.instance.dbe('authentication status', 'if (jQuery(\x27#GlobalSignInLink\x27).text().indexOf(\x27Sign In\x27) \x3e -1 || jQuery(\x27#shopper-status\x27).text().indexOf(\x27Sign In\x27) \x3e -1) {\n  false;\n} else {\n  true;\n}', {pageId:1686});
BrightTag.instance.dbe('url (encoded)', 'encodeURI(window.location.href)', {pageId:1686});
BrightTag.instance.dbe('product gender', 'if (\x27PageParameters\x27 in window \x26\x26 \x27productGender\x27 in PageParameters \x26\x26 PageParameters.productGender !\x3d undefined \x26\x26 PageParameters.productGender !\x3d null) {PageParameters.productGender}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) {require(\x27nord/config\x27).getValue(\x27product.gender\x27)}', {pageId:1672});
BrightTag.instance.dbe('session based display suppression id', 'bt_cookie(\x27bt_sbdsID\x27)', {pageId:1686});
BrightTag.instance.dbe('hash', 'encodeURIComponent(window.location.hash)', {pageId:1686});
BrightTag.instance.dbe('page template', 'if(window.PageParameters !\x3d undefined \x26\x26 window.PageParameters !\x3d null){window.PageParameters.templateName} else {if (\x27require\x27 in window \x26\x26 require.defined(\x22nord/config\x22))require(\x22nord/config\x22).getValue(\x22analytics.pageTemplate\x22)}', {pageId:1686});
BrightTag.instance.dbe('style number', 'if (\x27PageParameters\x27 in window \x26\x26 \x27styleNumber\x27 in PageParameters \x26\x26 PageParameters.styleNumber !\x3d undefined \x26\x26 PageParameters.styleNumber !\x3d null) PageParameters.styleNumber;\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.styleNumber\x27);', {pageId:1672});
BrightTag.instance.dbe('hostname', 'window.location.hostname', {pageId:1686});
BrightTag.instance.dbe('shopper id authenticated (tellapart)', 'if (jQuery(\x27#GlobalSignInLink\x27).text().indexOf(\x27Sign In\x27) \x3e -1 || jQuery(\x27#shopper-status\x27).text().indexOf(\x27Sign In\x27) \x3e -1) { \x22\x22 } else {\r\n\r\nbt_cookie(\x27nordstrom\x27).replace(/(shopperid\x3d)/g, \x27\x27).replace(/\x26.*$/g, \x27\x27); }', {pageId:1686});
BrightTag.instance.dbe('product name', 'if (\x27PageParameters\x27 in window \x26\x26 \x27productPathAlias\x27 in PageParameters \x26\x26 PageParameters.productPathAlias !\x3d undefined \x26\x26 PageParameters.productPathAlias !\x3d null) PageParameters.productPathAlias\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.productPathAlias\x27)', {pageId:1672});
BrightTag.instance.dbe('categoryid', 'if(\x27PageParameters\x27 in window \x26\x26 typeof PageParameters !\x3d undefined) {PageParameters.categoryId} else if(\x27require\x27 in window \x26\x26 require.defined(\x27nord/config\x27))  {require(\x22nord/config\x22).getValue(\x22analytics.categoryId\x22)}', {pageId:1686});
BrightTag.instance.dbe('data lab page type', '\x22product_page\x22', {pageId:1672});
BrightTag.instance.dbe('product detail json', 'if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord \x26\x26 \x27settings\x27 in window.nord.config \x26\x26 \x27product\x27 in window.nord.config.settings) {\r\n  (function (params) {\r\n    var products \x3d [];\r\n    if (params.available) {\r\n      products.push({\r\n        \x22ProductQuantity\x22: 1,\r\n        \x22FashionId\x22: params.styleId,\r\n        \x22ProductPrice\x22: (params.salePrice !\x3d \x27\x27 ? params.salePrice : params.regularPrice).split(\x27$\x27)[1].split(\x27N\x27)[0].split(\x27After\x27)[0].replace(/,/g,\x22\x22)\r\n        });\r\n    }\r\n    return products;\r\n  }(window.nord.config.settings.product));\r\n}', {pageId:1672});
BrightTag.instance.dbe('url parameter (yieldbot)', 'bt_parameter(\x27ri\x27)', {pageId:1686});
BrightTag.instance.dbe('fashion id', 'if(\x27PageParameters\x27 in window \x26\x26 \x27fashionId\x27 in PageParameters){window.PageParameters.fashionId}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.styleId\x27);', {pageId:1672});
BrightTag.instance.dbe('hash (function)', '(function(){ return encodeURIComponent(window.location.hash); })();', {pageId:1686});
BrightTag.instance.dbe('shopper id from cookie (tellapart)', '(function() {\r\n  var btShopperID;\r\n  try {\r\n    btShopperID \x3d window.nord.config.settings.shopper.id;\r\n  } catch (e) {}\r\n  try {\r\n    btShopperID \x3d Sys.Application._components.PageInspector._properties.ShopperId;\r\n  } catch (e) {}\r\n  try {\r\n    btShopperID \x3d bt_cookie(\x27nordstrom\x27).replace(/^shopperid\\\x3d/, \x27\x27).replace(/\\\x26.*$/, \x27\x27);\r\n  } catch (e) {}\r\n  return btShopperID;\r\n})();', {pageId:1686});
BrightTag.instance.dbe('document url (decoded)', 'decodeURIComponent(document.URL).toLowerCase()', {pageId:1686});
BrightTag.instance.dbe('brighttag user id', '\x271055891323\x27');
BrightTag.instance.dbe('page url', 'window.location.href.replace(/\x27/g, \x27%27\x27)', {pageId:1686});
BrightTag.instance.dbe('product parent type', 'if (\x27PageParameters\x27 in window \x26\x26 \x27parentProductType\x27 in PageParameters \x26\x26 PageParameters.parentProductType !\x3d undefined \x26\x26 PageParameters.parentProductType !\x3d null) PageParameters.parentProductType\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.productType1\x27)', {pageId:1672});
BrightTag.instance.dbe('keyword', 'if(bt_parameter(\x27keyword\x27)){bt_parameter(\x27keyword\x27)} else if (window.location.href.indexOf(\x22keyword\x22) \x3e 0){document.URL.split(\x22keyword\x3d\x22)[1]} else if (window.PageParameters !\x3d undefined){window.PageParameters.keyword} else{null}', {pageId:1686});
BrightTag.instance.dbe('shopper id', 'if(\x27PageParameters\x27 in window \x26\x26 typeof PageParameters !\x3d undefined){PageParameters.shopperId}\r\nelse if(\x27require\x27 in window \x26\x26 require.defined(\x27nord/config\x27)) {require(\x22nord/config\x22).getValue(\x22shopper.id\x22)}', {pageId:1686});
BrightTag.instance.dbe('product type', 'if (\x27PageParameters\x27 in window \x26\x26 \x27productType\x27 in PageParameters \x26\x26 PageParameters.productType !\x3d undefined \x26\x26 PageParameters.productType !\x3d null) PageParameters.productType\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.productType2\x27)', {pageId:1672});
BrightTag.instance.dbe('session id - all pages', 'if(\x27PageParameters\x27 in window \x26\x26 \x27SessionId\x27 in PageParameters){PageParameters.SessionId} else if (\x27require\x27 in window \x26\x26 require.defined(\x27nord/config\x27)) require(\x27nord/config\x27).getValue(\x27shopper.sessionId\x27);', {pageId:1686});
BrightTag.instance.dbe('referrer url (encoded)', 'encodeURI(document.referrer)', {pageId:1686});
BrightTag.EventBinding.bind('mini bag checkout button clicked', '#mini-bag-checkout, #-mini-bag-notification .-notification-actions a:contains(\x22Checkout\x22)', 'mouseup', {pageId:386643}).data('page url', '$(this).attr(\x27href\x27)');
BrightTag.EventBinding.bind('unavailable sku selection', 'li[data-popover-id\x3d\x22tooltip-unavailable-item\x22]', 'mouseup', {pageId:386643});
BrightTag.EventBinding.bind('remove from cart', '.mini-bag-item .item-remove', 'mouseup', {pageId:386643});
BrightTag.EventBinding.bind('size chart link click', '#size-chart a.js-popup-link', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('sdd learn more link click', '#same-day-delivery-detail .copy button', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page live chat click', '.live-chat-link', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page learn more click', 'a[href$\x3d\x27origin\x3dfit\x27]', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('unavailable sku selection', 'li.button.unavailable', 'mouseup', {pageId:1672}).data('selected unavailable color', '$(\x27li.button.unavailable.selected[data-color-id] label\x27).text()').data('selected unavailable size', '$(\x27li.button.unavailable.selected label[for*\x3d\x22sizeId\x22]\x27).text()').data('selected unavailable options', '$(\x27li.button.unavailable.selected\x27).text().trim()');
BrightTag.EventBinding.bind('join the waitlist click', '.waitlist-link', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('write a review button clicked', '#BVRRRatingSummaryLinkWriteID', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page fit fundamentals video click', 'a[href*\x3d\x27fitVideo\x27]', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('get recs ad clicked', 'div#get-recs-ad-wrapper', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('istagram modal arrow click', '.BVTemplateLightboxCarousel .fm-btn-right, .BVTemplateLightboxCarousel .fm-btn-left', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('istagram modal image click', '.BVTemplateLightboxCarousel .fm-photo', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('inline review preview button click', '#BVButtonPreviewID', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('istagram carousel arrow click', '#BVInstagramPhotos .fm-btn-right, #BVInstagramPhotos .fm-btn-left', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('reading glasses magnification guide click', '[href*\x3d\x22http://i.nordstromimage.com/images/default/shop/image/shops/womens-sunglasses\x22]', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page q\x26a tab click', '#bv-tab-qa', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('add to minibag complete', document, 'DIRECT/update.miniBag', {pageId:1672});
BrightTag.EventBinding.bind('inline review field entry', '#BVFieldReviewtextID', 'change', {pageId:1672});
BrightTag.EventBinding.bind('shop my store radio button clicked', 'input.storeSelection', 'mouseup', {pageId:1672}).data('shop my store id', '$(this).attr(\x27value\x27)');
BrightTag.EventBinding.bind('get recs ad link clicked - beauty stylist', 'div#get-recs-beauty-ad-wrapper a', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page image alt click', '.image-thumbs li, .-list-thumbnails.-carousel-thumbnails li', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page quantity field changed', '#quantity-textbox', 'change', {pageId:1672});
BrightTag.EventBinding.bind('add to waitlist button click', 'button.add-to-waitlist', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('inline review submit', '#BVButtonSubmitID', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('istagram carousel image click', '#BVInstagramPhotos .fm-photo', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page: change style group', '#price input[type\x3d\x27radio\x27]', 'DIRECT/change', {pageId:1672});
BrightTag.EventBinding.bind('size chart modal open', '.product-sizechart.leftMargin a', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('true fit modal open', '.tfc-fitrec-product', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('watch size guide link click', '[href*\x3d\x22http://i.nordstromimage.com/images/default/shop/image/shops/watches\x22]', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('remove from cart', 'input#item-remove.item-remove.clearfix', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page bopus zip code search', '#search-by-store-save-button', 'DIRECT/mouseup', {pageId:1672});
BrightTag.EventBinding.bind('buy online and pickup click', '#buy-online-and-pick-up, .buy-online-and-pick-up', 'mouseup', {pageId:1672});
BrightTag.EventBinding.bind('product page reviews tab click', '#bv-tab-review', 'DIRECT/mouseup', {pageId:1672});
BrightTag.instance.appendContent('\x3cimg src\x3d\x22//tacoda.at.atwola.com/atx/sync/brighttag/btid/default\x22 width\x3d\x221\x22 height\x3d\x221\x22/\x3e',{tagId:14671});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n  bt_log("Preview Mode On");\n\x3c/script\x3e',{tagId:528717});
BrightTag.instance.appendContent('\x3cimg src\x3d\x22//p.rfihub.com/ca.gif?ra\x3d1835656858\x26rb\x3d8831\x26ca\x3d20553853\x26btag\x3d2\x26pid\x3d'+encodeURIComponent(bt_data_escaped('fashion id'))+'\x22 width\x3d\x221\x22 height\x3d\x221\x22 border\x3d\x220\x22\x3e',{tagId:550943});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([{key:"value",value:bt_data(\x27order merchandise total\x27)}], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("1072604278"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:1247024,group:'yjss'});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        BrightTag.Events.listen(window, \x27load\x27, function() {\n          var url,__cmbLoaded \x3d false;\n          BrightTag.Blab.wait(function() {\n            url \x3d \x22//static.tellaparts.com/KzjZs6pKrURr/crumb.js\x22;\n          }).script(url).wait(function() {\n        __cmbLoaded \x3d true;\n        var action \x3d TellApartCrumb.makeCrumbAction("KzjZs6pKrURr","pv");\n        action.setActionAttr(\x27PageType\x27, "Product");\n        action.setActionAttr(\x27ProductCategoryPath\x27, (""+bt_data(\x27product age group\x27)+" \\x3e "+bt_data(\x27product gender\x27)+" \\x3e "+bt_data(\x27product parent type\x27)+" \\x3e "+bt_data(\x27product type\x27)));\n        action.setActionAttr(\x27SKU\x27, (""+bt_data(\x27fashion id\x27)));\n        if (\x27\x27 !\x3d \x27\x27) {\n          action.setActionAttr(\x27SearchQuery\x27, \x27\x27);\n        }\n\n        BrightTag.each([{key:"x.Split",value:bt_data(\x27split traffic test group\x27)}], function(prop) {\n          action.setActionAttr(prop.key, prop.value);\n        });\n\n        action.setUserId(\x27\x27);\n\n        action.setUserId(\x27\x27);\n        if((""+bt_data(\x27visitor id\x27)) !\x3d \x22\x22){\n          action.setMerchantGuestId((""+bt_data(\x27visitor id\x27)))\n        };\n\n        if((""+bt_data(\x27shopper id authenticated (tellapart)\x27)) !\x3d \x22\x22){\n          action.setMerchantUserId((""+bt_data(\x27shopper id authenticated (tellapart)\x27)))\n        };\n        action.finalize();\n      });\n        });\n      \x3c/script\x3e',{tagId:1432162});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//www.googleadservices.com/pagead/conversion_async.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        (function () {\n          var google_tag_params \x3d {};\n          BrightTag.each([], function(prop) {\n            var val \x3d prop.value;\n            try { val \x3d JSON.parse(prop.value); } catch (e) {}\n            google_tag_params[prop.key] \x3d val;\n          });\n          window.google_trackConversion({\n              google_conversion_id: parseInt("998458727"),\n              google_conversion_label: \x27\x27,\n              google_custom_params: google_tag_params,\n              google_remarketing_only: true\n          });\n        })();\n      \x3c/script\x3e',{tagId:1580581,group:'yjss'});
BrightTag.EventBinding.when('true fit modal open').fire(43996);
BrightTag.EventBinding.when('size chart modal open').fire(53430);
BrightTag.EventBinding.when('get recs ad clicked').fire(53763);
BrightTag.EventBinding.when('unavailable sku selection').fire(54466);
BrightTag.EventBinding.when('onscrolltorecentlyviewedrecs').fire(56396);
BrightTag.EventBinding.when('product page quantity field changed').fire(57565);
BrightTag.EventBinding.when('inline review field entry').fire(223656);
BrightTag.EventBinding.when('inline review submit').fire(230425);
BrightTag.EventBinding.when('inline review preview button click').fire(231618);
BrightTag.EventBinding.when('write a review button clicked').fire(240267);
BrightTag.EventBinding.when('watch size guide link click').fire(256530);
BrightTag.EventBinding.when('reading glasses magnification guide click').fire(256539);
BrightTag.EventBinding.when('shop my store radio button clicked').fire(465803);
BrightTag.EventBinding.when('get recs ad link clicked - beauty stylist').fire(466667);
BrightTag.EventBinding.when('product page q\x26a tab click').fire(570504);
BrightTag.EventBinding.when('product page reviews tab click').fire(570516);
BrightTag.EventBinding.when('product page live chat click').fire(570545);
BrightTag.EventBinding.when('product page image alt click').fire(570563);
BrightTag.EventBinding.when('buy online and pickup click').fire(570669);
BrightTag.EventBinding.when('product page bopus zip code search').fire(570750);
BrightTag.EventBinding.when('product page fit fundamentals video click').fire(575774);
BrightTag.EventBinding.when('product page learn more click').fire(575796);
BrightTag.EventBinding.when('add to minibag complete').fire(643677).appendData('brighttag user id').appendData('session id - all pages').appendData('shopper id').appendData('data lab page type').appendData('url (encoded)').appendData('categoryid').appendData('fashion id').appendData('search string').appendData('shopper status').appendData('referrer url (encoded)').appendData('hash (function)');
BrightTag.EventBinding.when('join the waitlist click').fire(643974);
BrightTag.EventBinding.when('add to waitlist button click').fire(644043);
try { if (eval('(bt_data(\x27hostname\x27) !\x3d \x22mstage1.shop.nordstrom.com\x22 \x26\x26 bt_data(\x27hostname\x27) !\x3d \x22m.shop.nordstrom.com\x22)')) {
BrightTag.EventBinding.when('add to minibag complete').fire(1124198);
}
} catch(e) { bt_handle_exception(e); }
BrightTag.EventBinding.when('remove from cart').fire(1275468);
BrightTag.EventBinding.when('product page: change style group').fire(1295309);
BrightTag.EventBinding.when('sdd learn more link click').fire(1424530);
BrightTag.EventBinding.when('add to minibag complete').fire(1431974);
BrightTag.EventBinding.when('mini bag checkout button clicked').fire(1432563);
BrightTag.EventBinding.when('size chart link click').fire(1432595);
BrightTag.EventBinding.when('sdd learn more link click').fire(1432626);
BrightTag.EventBinding.when('mini bag checkout button clicked').fire(1455207);
try { if (eval('(bt_data(\x27page url\x27).indexOf(\x22origin\\x3dkeywordsearch\x22) \x3e -1 || bt_data(\x27page url\x27).indexOf(\x22origin\\x3dPredictiveSearch\x22) \x3e -1 || bt_data(\x27page url\x27).indexOf(\x22origin\\x3dadvancedsearch\x22) \x3e -1)')) {
BrightTag.EventBinding.when('search results product click').fire(1458321);
}
} catch(e) { bt_handle_exception(e); }
BrightTag.EventBinding.when('fast \x26 easy remove from bag click').fire(1634320).appendData('brighttag user id').appendData('session id - all pages').appendData('shopper id').appendData('data lab page type').appendData('url (encoded)').appendData('categoryid').appendData('fashion id').appendData('search string').appendData('shopper status').appendData('referrer url (encoded)').appendData('hash (function)');
BrightTag.EventBinding.when('remove item - shopping bag').fire(1634320).appendData('brighttag user id').appendData('session id - all pages').appendData('shopper id').appendData('data lab page type').appendData('url (encoded)').appendData('categoryid').appendData('fashion id').appendData('search string').appendData('shopper status').appendData('referrer url (encoded)').appendData('hash (function)');
BrightTag.EventBinding.when('remove from cart').fire(1634320).appendData('brighttag user id').appendData('session id - all pages').appendData('shopper id').appendData('data lab page type').appendData('url (encoded)').appendData('categoryid').appendData('fashion id').appendData('search string').appendData('shopper status').appendData('referrer url (encoded)').appendData('hash (function)');
BrightTag.EventBinding.when('istagram carousel arrow click').fire(1691502);
BrightTag.EventBinding.when('istagram carousel image click').fire(1691537);
BrightTag.EventBinding.when('istagram modal arrow click').fire(1691546);
BrightTag.EventBinding.when('istagram modal image click').fire(1691555);
BrightTag.EventBinding.when('inline review submit').fire(1703849);
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27authentication status\x27) \x3d\x3d false')) {
serverURL.cf(221718).appendData('shopper id from cookie (tellapart)');
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page template\x27).indexOf(\x22Outfit\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22origin\\x3dcoordinating\x22) \x3e -1)')) {
serverURL.cf(44399);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page template\x27).indexOf(\x22Outfit\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22origin\\x3drecommendation\x22) \x3e -1)')) {
serverURL.cf(44402);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page template\x27).indexOf(\x22Outfit\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22-FTR-\x22) \x3e -1)')) {
serverURL.cf(54323);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page template\x27).indexOf(\x22Outfit\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22origin\\x3dcoordinating\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22origin\\x3drelated\x22) \x3c 0 \x26\x26 bt_data(\x27page url\x27).indexOf(\x22origin\\x3drecommend\x22) \x3c 0)')) {
serverURL.cf(84804);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page template\x27).indexOf(\x22Outfit\x22) \x3c 0 \x26\x26 (bt_data(\x27page url\x27).indexOf(\x22origin\\x3drelated\x22) \x3e -1 || bt_data(\x27page url\x27).indexOf(\x22origin\\x3drecommend\x22) \x3e -1 || bt_data(\x27page url\x27).indexOf(\x22origin\\x3dcoordinating\x22) \x3e -1))')) {
serverURL.cf(85128);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27data lab ctl recs enabled\x27) \x3d\x3d true')) {
serverURL.cf(272860);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3e -1)')) {
serverURL.cf(379434);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27item backordered\x27)')) {
serverURL.cf(406599);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('((bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_ven\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_pla\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_ite\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_mmc\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0) || (bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22google.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22msn.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22aol.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22yahoo.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22bing.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0) || (bt_data(\x27referrer url (lower case)\x27).indexOf(\x22ask.com\x22) \x3e -1 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22mr:referralid\x22) \x3c 0 \x26\x26 bt_data(\x27document url (decoded)\x27).indexOf(\x22cm_cat\\x3ddatafeed\x22) \x3c 0))')) {
serverURL.cf(413693);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page url\x27).indexOf(\x22korkease-_-splashwmnmain_shop\x22) \x3e -1')) {
serverURL.cf(503180);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document url (decoded)\x27).indexOf(\x22nordstrom-cares-scholarship\x22) \x3e -1')) {
serverURL.cf(538215);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page url\x27).indexOf(\x22merch-_-wshoe_0310aglcustom\x22) \x3e -1')) {
serverURL.cf(551283);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page url\x27).indexOf(\x22dvcustom-_-layoutfshoes_shop\x22) \x3e -1')) {
serverURL.cf(575958);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27session based display suppression id\x27) \x3d\x3d \x22TAP\x22')) {
serverURL.cf(613758);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27session based display suppression id\x27) \x3d\x3d \x22NetM\x22')) {
serverURL.cf(613797);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27session based display suppression id\x27) \x3d\x3d \x22NetM\x22')) {
serverURL.cf(613833);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27session based display suppression id\x27) \x3d\x3d \x22TAP\x22')) {
serverURL.cf(613839);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document url (decoded)\x27).indexOf(\x22shop.nordstrom.com//sr\x22) \x3e -1')) {
serverURL.cf(1032393);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(!bt_data(\x27fashion id\x27) || bt_data(\x27fashion id\x27) \x3d\x3d \x22undefined\x22 || bt_data(\x27fashion id\x27) \x3d\x3d \x22\x22)')) {
serverURL.cf(1037555);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27document referrer\x27).indexOf(\x22/beautyboard\x22) \x3e -1')) {
serverURL.cf(1299961);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22A\x22')) {
serverURL.cf(1420391);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22B\x22')) {
serverURL.cf(1420400);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22B\x22')) {
serverURL.cf(1427240);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22A\x22')) {
serverURL.cf(1427258);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22B\x22')) {
serverURL.cf(1427320);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27split traffic test group\x27) \x3d\x3d \x22A\x22')) {
serverURL.cf(1427325);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27hostname\x27) \x3d\x3d \x22mstage1.shop.nordstrom.com\x22 || bt_data(\x27hostname\x27) \x3d\x3d \x22m.shop.nordstrom.com\x22)')) {
serverURL.cf(1438858);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27url parameter (yieldbot)\x27)')) {
serverURL.cf(1654138);
}
} catch(e) { bt_handle_exception(e); }
serverURL.appendData('brighttag user id');
serverURL.appendData('session id - all pages');
serverURL.appendData('shopper id');
serverURL.appendData('data lab page type');
serverURL.appendData('url (encoded)');
serverURL.appendData('categoryid');
serverURL.appendData('fashion id');
serverURL.appendData('search string');
serverURL.appendData('shopper status');
serverURL.appendData('referrer url (encoded)');
serverURL.appendData('fashioncolor');
serverURL.appendData('hash');
});
});
});