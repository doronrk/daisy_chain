BrightTag.Blab.group('domready').wait(function () {
BrightTag.instance.dbe('product price', 'if (\x27PageParameters\x27 in window) {\r\n\tif ($(\x27#itemNumberPrice li.price\x27).text().indexOf(\x27$\x27) \x3e\x3d 0) $(\x27#itemNumberPrice li.price\x27).text().split(\x27$\x27)[1].split(\x27N\x27)[0].split(\x27After\x27)[0].replace(/,/g,\x22\x22)\r\n}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) {\r\n\trequire(\x27nord/config\x27).getValue(\x27product.regularPrice\x27).replace(\x27$\x27, \x27\x27)\r\n}', {pageId:1672});
BrightTag.instance.dbe('style number', 'if (\x27PageParameters\x27 in window \x26\x26 \x27styleNumber\x27 in PageParameters \x26\x26 PageParameters.styleNumber !\x3d undefined \x26\x26 PageParameters.styleNumber !\x3d null) PageParameters.styleNumber;\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.styleNumber\x27);', {pageId:1672});
BrightTag.instance.dbe('categoryid', 'if(\x27PageParameters\x27 in window \x26\x26 typeof PageParameters !\x3d undefined) {PageParameters.categoryId} else if(\x27require\x27 in window \x26\x26 require.defined(\x27nord/config\x27))  {require(\x22nord/config\x22).getValue(\x22analytics.categoryId\x22)}', {pageId:1686});
BrightTag.instance.dbe('fashion id', 'if(\x27PageParameters\x27 in window \x26\x26 \x27fashionId\x27 in PageParameters){window.PageParameters.fashionId}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) require(\x27nord/config\x27).getValue(\x27product.styleId\x27);', {pageId:1672});
BrightTag.instance.dbe('sale price', 'if (\x27PageParameters\x27 in window) {\r\n\tif ($(\x27#itemNumberPrice li.price span.price.sale\x27).text().indexOf(\x27$\x27) \x3e\x3d 0) $(\x27#itemNumberPrice li.price span.price.sale\x27).text().split(\x27$\x27)[1].split(\x27N\x27)[0].split(\x27After\x27)[0].replace(/,/g,\x22\x22)\r\n}\r\nelse if (\x27nord\x27 in window \x26\x26 \x27config\x27 in window.nord) {\r\n\trequire(\x27nord/config\x27).getValue(\x27product.salePrice\x27).replace(\x27$\x27, \x27\x27)\r\n}', {pageId:1672});
BrightTag.instance.dbe('keyword', 'if(bt_parameter(\x27keyword\x27)){bt_parameter(\x27keyword\x27)} else if (window.location.href.indexOf(\x22keyword\x22) \x3e 0){document.URL.split(\x22keyword\x3d\x22)[1]} else if (window.PageParameters !\x3d undefined){window.PageParameters.keyword} else{null}', {pageId:1686});
BrightTag.instance.store([{name:'btpdb.KxHRmBh.c2hvcHBlciBpZCBhbm9ueW1vdXMgKHRlbGxhcGFydCk', value:'MjNkN2U1ZjJiYWQyNDk0ZGExYzRjOTlhZGQ2N2ZkYjM', expires:1449115578264}]);
BrightTag.instance.appendContent('\x3c!-- BloomSurface tracking code.  Place at foot of page. --\x3e\n\n\n\n\x3cscript type\x3d\x22text/javascript\x22\x3e\n\nvar br_data \x3d {};\n\n\n\n/* --- Begin parameters section: fill in below --- */\n\n\nbr_data.acct_id \x3d \x225152\x22;\n\nbr_data.ptype \x3d \x22product\x22;\n\nbr_data.cat_id \x3d \x22'+bt_data_escaped('categoryid')+'\x22;\n\nbr_data.search_term \x3d \x22'+bt_data_escaped('keyword')+'\x22;\n\nbr_data.is_conversion \x3d \x220\x22;\n\nbr_data.prod_id \x3d \x22'+bt_data_escaped('fashion id')+'\x22;\n\nbr_data.sku \x3d \x22'+bt_data_escaped('style number')+'\x22;\n\nbr_data.prod_name \x3d document.title.replace(\x22 | Nordstrom\x22,\x22\x22);\n\nbr_data.price \x3d \x22'+bt_data_escaped('product price')+'\x22;\n\nbr_data.sale_price \x3d \x22'+bt_data_escaped('sale price')+'\x22;\n\n\n\n\n/* --- End parameter section --- */\n\n\n\n(function() {\nvar brtrk \x3d document.createElement(\x27script\x27);\n\nbrtrk.type \x3d \x27text/javascript\x27;\n\nbrtrk.async \x3d true;\n\nbrtrk.src \x3d \x27https:\x27 \x3d\x3d document.location.protocol ? \x22https://cdns.brsrvr.com/v1/br-trk-5152.js\x22 : \x22http://cdn.brcdn.com/v1/br-trk-5152.js\x22;\nvar s \x3d document.getElementsByTagName(\x27script\x27)[0];\ns.parentNode.insertBefore(brtrk, s);\n})();\n\x3c/script\x3e\n',{tagId:84804});
});