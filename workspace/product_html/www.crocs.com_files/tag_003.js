BrightTag.instance.errors({enabled:false});
BrightTag.instance.load(
'//s.btstatic.com/lib/a409846b61e9022757b8dfe0b02569b6aaa8ba6d.js',
function (page) {
BrightTag.instance.dbe('global :: certona :: rrqs', '\x22Language\x3d\x22 + (app.config.locale \x3d\x3d \x22default\x22 ? \x22en_US\x22 : app.config.locale)', {pageId:30140});
BrightTag.instance.dbe('locale', '(function(){if(typeof app.config !\x3d \x27undefined\x27){return app.config.locale}else{return s.eVar8}})()', {pageId:30140});
BrightTag.instance.dbe('global :: facebook :: custom audience pixel id', '\x22283061001901751\x22', {pageId:65112});
BrightTag.instance.dbe('omnassetid', '(function(){ if(typeof(omnAssetID) \x3d\x3d \x22undefined\x22) { return \x22\x22; } else { var a \x3d omnAssetID; if (a.length \x3e\x3d 2) { return a; } else { return \x22\x22; } } }())', {pageId:30140});
BrightTag.instance.dbe('global :: omniture :: tracking server', 'var p \x3d document.location.protocol;\nswitch(p){\ncase \x22http:\x22:\n    ts \x3d \x22metrics.crocs.com\x22;\n    break;\ncase \x22https:\x22:\n    ts \x3d \x22smetrics.crocs.com\x22;\n    break;\n};', {pageId:65112});
BrightTag.instance.dbe('email address', 'typeof app.config.customerEmail !\x3d \x22undefined\x22 ? app.config.customerEmail : \x22\x22', {pageId:30140});
BrightTag.instance.dbe('a/b test cell', 'bt_cookie(\x22BTcell\x22)', {pageId:65112});
BrightTag.instance.dbe('global :: dotomi :: dtm_token', 'bt_cookie(\x27dtm_token\x27)', {pageId:65112});
BrightTag.instance.dbe('global :: omniture :: suite id', '\x22demandcrocsusbeta\x22', {pageId:65112});
BrightTag.instance.dbe('global :: utils :: null', '\x22\x22', {pageId:30140});
BrightTag.instance.dbe('global :: certona :: itemid', 'pageData.productID', {pageId:94425});
BrightTag.instance.dbe('global :: certona :: applicationid', '\x22Crocsus\x22', {pageId:65112});
BrightTag.instance.dbe('referring url domain', 'if(document.referrer !\x3d\x22\x22\x26\x26 document.referrer.indexOf(\x22www\x22)\x3e0){document.referrer.split(\x27//www.\x27)[1].split(\x27/\x27)[0]}else{\x22\x22}', {pageId:65112});
BrightTag.instance.dbe('category', '(function(){if(typeof($(\x27div.pdpcrumbs\x27)) !\x3d \x22undefined\x22)\r\n{var arr \x3d [];\r\n$(\x22div.pdpcrumbs a\x22).each(function() {\r\n arr.push($(this).text());\r\n});\r\nreturn arr[1];} \r\nelse{return \x22\x22;} }());', {pageId:96099});
BrightTag.instance.dbe('page type', 'pageData.pageType', {pageId:30140});
BrightTag.instance.dbe('order confirmation number', '(function(){\r\nif(typeof(omnOrderNumber) \x3d\x3d \x22undefined\x22) {\r\nreturn \x22\x22;\r\n} else {\r\nvar a \x3d omnOrderNumber;\r\nif (a.length \x3e\x3d 2) {\r\nreturn a;\r\n} else {\r\nreturn \x22\x22;\r\n}\r\n}\r\n}())', {pageId:30140});
BrightTag.instance.dbe('customer no', 'typeof app.config.customerNo !\x3d \x22undefined\x22 ? app.config.customerNo : \x22\x22', {pageId:30140});
BrightTag.instance.dbe('global :: certona :: event', '\x22product\x22', {pageId:94425});
BrightTag.instance.store([{name:'btpdb.RFE3R2G.dGZjLjE0MjA2MjQ', value:'U0VTU0lPTg'},{name:'btpdb.RFE3R2G.dGZjLjQyNzQ0Mw', value:'UkVRVUVTVFMuMA', expires:1449122021165}]);
BrightTag.EventBinding.bind('add to cart', '#addToCartButton', 'mouseup', {pageId:94425}).data('global :: certona :: event', '\x22shopping+cart\x22').data('global :: certona :: itemid', 'app.config.productID');
BrightTag.EventBinding.bind('just added view', document, 'DIRECT/ajaxComplete', {pageId:94425}).data('global :: certona :: itemid', 'app.config.productID').data('ajax url', 'eventData[1].url');
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n(function() {\n  var pa \x3d document.createElement(\x27script\x27), ae \x3d document.getElementsByTagName(\x27script\x27)[0]\n  , protocol \x3d ((\x27https:\x27 \x3d\x3d document.location.protocol) ? \x27https://\x27 : \x27http://\x27);pa.async \x3d true;  \n  pa.src \x3d protocol + \x27d2xgf76oeu9pbh.cloudfront.net/e32e14640d6ba7b85b16e24c6d899a0e.js\x27; pa.type \x3d \x27text/javascript\x27; ae.parentNode.insertBefore(pa, ae);\n})();\n\x3c/script\x3e',{tagId:218608});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n        var s_account \x3d (""+bt_data(\x27global :: omniture :: suite id\x27));\n      \x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22 src\x3d\x22//s.btstatic.com/lib/65520d13eb4290e980eab5050c04df9171ffb58e.js\x22\x3e\x3c/script\x3e\n      \x3cscript type\x3d\x22text/javascript\x22\x3e\n        var ch \x3d s.ch \x3d s.channel \x3d \x27\x27;\n        s.campaign \x3d \x27\x27;\n        s.pageName \x3d \x27\x27;\n        s.currencyCode \x3d \x27USD\x27;\n        s.events \x3d "event18";\n        s.products \x3d \x27\x27;\n        BrightTag.each([{key:"eVar64",value:bt_data(\x27a/b test cell\x27)}], function (param) {\n          s[param.key] \x3d param.value;\n        });\n        BrightTag.eval(("s.visitorNamespace\\x3d\\x22demandwarecrocs\\x22;\\ns.trackingServer\\x3d"+bt_data(\x27global :: omniture :: tracking server\x27)+";"));\n        var s_code \x3d s.t();\n        if (s_code) { document.write(s_code); }\n      \x3c/script\x3e',{tagId:427443});
BrightTag.instance.appendContent('\x3c!-- SeeWhy Header --\x3e\n\x3cscript src\x3d\x22https://d3m83gvgzupli.cloudfront.net/webEvent/cywevent.js?servicecode\x3dAD26199339\x22\x3e\x3c/script\x3e\n\x3cscript src\x3d\x22https://d3m83gvgzupli.cloudfront.net/webEvent/browse.js\x22\x3e\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/javascript\x22\x3e\n    var funnelLevel \x3d 0;\n    var cartTriggered \x3d _cyGetCookie(\x22__cy_mode\x22, false);\n\n    if(app.config.customerEmail !\x3d \x22\x22){\n        funnelLevel \x3d 1;\n        cy.UserId \x3d app.config.customerEmail;\n    }\n    \n    if(pageData.pageType \x3d\x3d \x22product\x22 \x26\x26 cartTriggered !\x3d\x3d \x22cart\x22){\n        bd.addProduct(\n            pageData.productID,\n            pageData.name,\n            \x22\x22,\n            pageData.image,\n            pageData.link,\n            pageData.productValue,\n            pageData.categoryID\n        );\n    }\n        \n    if(typeof app.config.cart !\x3d\x3d \x22undefined\x22 \x26\x26 app.config.cart.cartQty \x3e 0){\n        funnelLevel \x3d 4;\n        _cyCreateClientCookie(\x22__cy_mode\x22, \x22cart\x22);\n        cy.Custom9 \x3d \x22Cart\x22;\n        cy.Custom5 \x3d app.config.cart.currency;\n        cy.Value \x3d app.config.cart.cartValue;\n        cy.BASKETAPPEND \x3d 0;\n        \n        $(app.config.cart.cartItems).each(function(index, item){\n            cyNewBasketLine();\n            cyAddBasketLineDetail(\x22ItemName\x22, item.name);\n            cyAddBasketLineDetail(\x22ItemPageURL\x22, item.link);\n            cyAddBasketLineDetail(\x22ItemImageURL\x22, item.image);\n            cyAddBasketLineDetail(\x22ItemPrice\x22, item.price);\n            cyAddBasketLineDetail(\x22ItemBasePrice\x22, item.unitPrice); \n            cyAddBasketLineDetail(\x22ItemQuantity\x22, item.qty); \n            cyAddBasketLineDetail(\x22ItemID\x22, item.id);\n            cyAddBasketLineDetail(\x22ItemMasterID\x22, item.master);\n            cyAddBasketLineDetail(\x22ItemCategory\x22, item.categoryID);\n            cyAddBasketLineDetail(\x22ItemCategoryName\x22, item.categoryName);\n            cyAddBasketLineDetail(\x22ItemAvailability\x22, item.stockStatus);\n        });\n        \n        if(app.config.cart.paymentMethod.length \x3e 0){\n           funnelLevel \x3d 6;\n        }\n    }\n    \n    if(pageData.pageType \x3d\x3d \x22confirm\x22){\n        funnelLevel \x3d 7;\n        cy.OrderNumber \x3d pageData.orderID;\n        cy.Value \x3d pageData.orderValue;\n        cy.custom10 \x3d pageData.paymentMethod[0];\n        cy.UserId \x3d app.config.orderEmail;\n    }\n    \n    if(!cy.SUPPRESSDEFAULT \x26\x26 funnelLevel \x3e 0){\n        var firstName \x3d app.config.customerFirstName;\n        \n        cy.FunnelLevel \x3d funnelLevel;\n        cy.ReturnToLink \x3d app.config.urls.cartShow;\n        cy.Custom1 \x3d (typeof firstName !\x3d\x3d \x22undefined\x22 ? firstName : \x22Guest\x22);\n        cy_getImageSrc();\n    }\n    \n    $(document).ready(function(){\n        var seeWhyEmailRegex \x3d /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;\n        var seeWhyTimeout \x3d 0;\n        \n        var seeWhyEmailInputList \x3d [\n            \x22#dwfrm_newsletter_email\x22,\n            \x22#newsletterFooter input.email\x22,\n            \x22#newsletterLens input.email\x22,\n            \x22#nrlsk_email_address\x22,\n            \x22input[name\x3dEmail_Address]\x22\n        ].join(\x22, \x22);\n        \n        $(seeWhyEmailInputList).on(\x22input\x22, function(){\n            var emailInput \x3d $(this);\n            \n            if(seeWhyEmailRegex.test(emailInput.val())){\n                if(seeWhyTimeout !\x3d 0){clearTimeout(seeWhyTimeout)};\n                seeWhyTimeout \x3d setTimeout(function(){\n                    if(cy){\n                        if(funnelLevel \x3d\x3d 0){cy.FunnelLevel \x3d 1};\n                        cy.UserId \x3d emailInput.val();\n                        cy_getImageSrc();\n                    }\n                }, 200);\n            }\n        });\n    });\n\x3c/script\x3e',{tagId:1212696});
BrightTag.instance.appendContent('\x3cscript type\x3d\x22text/javascript\x22\x3e\n          window._fbq \x3d window._fbq || [];\n\n          if (!window._fbq.loaded) {\n            BrightTag.Content.script(BrightTag.HTTP.URL(\x27//connect.facebook.net/en_US/fbds.js\x27));\n            window._fbq.loaded \x3d true;\n          }\n\n          window._fbq.push([\x27addPixelId\x27, (""+bt_data(\x27global :: facebook :: custom audience pixel id\x27))]);\n          window._fbq.push([\x22track\x22, \x22PixelInitialized\x22, {}]);\n      \x3c/script\x3e',{tagId:1323965});
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/javascript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22\x3e\ntwttr.conversion.trackPid(\x27l4sob\x27);\n\x3c/script\x3e\n',{tagId:1420624});
BrightTag.EventBinding.when('add to cart').fire(897324);
BrightTag.EventBinding.when('quick view').fire(897324);
BrightTag.EventBinding.when('just added view').evaluate('bt_data(\x27ajax url\x27).indexOf(\x22MiniAddProduct\x22) \x3e -1').fire(897510);
BrightTag.instance.secondary(function(serverURL) {
try { if (eval('bt_data(\x27referring url domain\x27) \x3d\x3d \x27shopping.com\x27')) {
serverURL.cf(44324);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22boys\x22')) {
serverURL.cf(93741);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22girls\x22')) {
serverURL.cf(93957);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22men\x22')) {
serverURL.cf(93966);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22women\x22')) {
serverURL.cf(93975);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22jibbitz\x22')) {
serverURL.cf(93984);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22outlet\x22')) {
serverURL.cf(94002);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27omnassetid\x27).indexOf(\x22product_detail\x22) \x3e -1')) {
serverURL.cf(94020);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22collections\x22')) {
serverURL.cf(147417);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27category\x27) \x3d\x3d \x22accessories\x22')) {
serverURL.cf(147498);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27order confirmation number\x27) \x3d\x3d \x22\x22')) {
serverURL.cf(155679);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x22confirm\x22')) {
serverURL.cf(449583);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('!!bt_data(\x27global :: dotomi :: dtm_token\x27)')) {
serverURL.cf(521598);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('(bt_data(\x27page type\x27) !\x3d \x22checkout\x22 \x26\x26 bt_data(\x27locale\x27) !\x3d \x22pt_BR\x22)')) {
serverURL.cf(751643);
}
} catch(e) { bt_handle_exception(e); }
try { if (eval('bt_data(\x27page type\x27) !\x3d \x22confirm\x22')) {
serverURL.cf(1416529);
}
} catch(e) { bt_handle_exception(e); }
});
});
