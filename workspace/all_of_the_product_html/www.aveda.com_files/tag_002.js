BrightTag.instance.errors({enabled:false});
BrightTag.instance.load(
'//s.btstatic.com/lib/85b06f59dfe09d3638588e02589c62c53b68bd0e.js',
'//s.btstatic.com/lib/9f3ff3a93503b0e92966f7d807e6a7c9a849d9cf.js',
'//s.btstatic.com/lib/9353c6e11b34b27f5c2dcc5d7aa0524f45c6c25a.js',
'//s.btstatic.com/lib/5834754f0bd35adee7927a2284fd9e5968e78bf1.js',
function (page) {
BrightTag.instance.dbe('adobe: products line', '\x27;\x27+ window.PRODUCT_ID', {pageId:874952});
BrightTag.instance.dbe('adobe: regionid', 'tms_page_data.tms_page_info.site_info.REGION_ID', {pageId:857792});
BrightTag.instance.dbe('adobe: mobile or pc', '(function(){\r\n\tvar raw \x3d tms_page_data.tms_page_info.MOBILE;\r\n\tif (raw \x3d\x3d 1){\r\n\t\treturn \x27Mobile\x27;\r\n        }\r\n\tif (raw \x3d\x3d 0){\r\n\t\treturn \x27PC\x27;\r\n\t}\t\r\n\t\r\n})();', {pageId:857792});
BrightTag.instance.dbe('adobe: pageid', 'tms_page_data.tms_page_info.page_name.pageID', {pageId:857792});
BrightTag.instance.dbe('adobe: currentpageevent', '\x27prodView,event10\x27', {pageId:874952});
BrightTag.instance.dbe('adobe: language', 'tms_page_data.tms_page_info.site_info.LANGUAGE_ID', {pageId:857792});
BrightTag.instance.dbe('adobe: locale', 'tms_page_data.tms_page_info.site_info.LOCALE', {pageId:857792});
BrightTag.instance.dbe('adobe: currentuser', 'tms_page_data.tms_page_info.user_info.ident', {pageId:857792});
BrightTag.instance.dbe('adobe: legacy catid', 'tms_page_data.tms_page_info.page_name.categoryID', {pageId:857792});
BrightTag.instance.dbe('adobe: page_path', 'window.location.pathname', {pageId:857792});
BrightTag.instance.dbe('adobe: brand name', 'tms_page_data.tms_page_info.site_info.BRAND_ID', {pageId:857792});
BrightTag.instance.dbe('adobe: account summary', 'tms_page_data.tms_page_info.user_info.sorted', {pageId:857792});
BrightTag.instance.dbe('adobe: page prefix', 'tms_page_data.tms_page_info.page_name.pageType', {pageId:857792});
BrightTag.instance.dbe('adobe: products line eric', '\x27;\x27+ window.PRODUCT_ID', {pageId:874952});
BrightTag.EventBinding.bind('qv popup', window, 'DIRECT/MPP:productQVBT', {pageId:874952}).data('qvcatid', 'eventData[0].catId').data('qvprodname', 'btProductNameFromSPPID(eventData[0].prodId)').data('qvprodid', 'eventData[0].prodId');
BrightTag.EventBinding.bind('altercart', window, 'DIRECT/BTCARTALTER', {pageId:857792}).data('adobe: cart products', '\x27;\x27+ eventData[0][\x27itemProd\x27]+\x27;\x27+1').data('qvdata', 'eventData[0]');
BrightTag.EventBinding.bind('top nav email signup', '#form--nav_email_signup--field--PC_EMAIL_ADDRESS', 'DIRECT/focus', {pageId:857792});
BrightTag.EventBinding.bind('live chat button clicked', window, 'DIRECT/livechat:button_clicked', {pageId:857792}).data('adobe: chat type', 'eventData[0].name').data('adobe: chat initiation', '\x22UserInitiated\x22');
BrightTag.EventBinding.bind('live chat proactive chat invite', window, 'DIRECT/livechat:invite_accepted', {pageId:857792}).data('adobe: chat type', 'eventData[0].name').data('adobe: chat initiation', '\x22Proactive\x22');
BrightTag.instance.appendContent('    \x3cscript language\x3d\x22JavaScript\x22 type\x3d\x22text/javascript\x22\x3e\x3c!--\n    \n    s.pageName\x3d\x22'+bt_data_escaped('adobe: pageid')+'\x22\n    s.server\x3d\x22\x22\n    s.channel\x3d\x22'+bt_data_escaped('adobe: legacy catid')+'\x22\n    s.hier1 \x3d \x22'+bt_data_escaped('adobe: pageid')+'\x22\n    s.pageType\x3d\x22\x22\n    s.prop1 \x3d \x22'+bt_data_escaped('search term')+'\x22    \n    s.prop2\x3d\x22'+bt_data_escaped('search count')+'\x22\n    s.prop3\x3d\x22D\x3dg\x22\n    s.prop4\x3d\x22D\x3dv20\x22\n    s.prop5\x3d\x22D\x3dv16\x22\n    s.prop6\x3d\x22D\x3dv15\x22\n    s.prop7\x3d\x22D\x3dv2\x22\n    s.prop8\x3d\x22'+bt_data_escaped('adobe: language')+'\x22\n    s.prop9\x3d\x22'+bt_data_escaped('adobe: page prefix')+'\x22\n    s.prop15\x3d\x22D\x3dv22\x22\n    /* Conversion Variables */\n    s.campaign \x3d s.Util.getQueryParam(\x22cm_mmc\x22)\n    s.events\x3d \x22'+bt_data_escaped('adobe: currentpageevent')+'\x22\n    s.products\x3d\x22'+bt_data_escaped('adobe: products line eric')+'\x22\n    s.purchaseID\x3d\x22'+bt_data_escaped('global:checkout:order id')+'\x22\n    s.eVar1\x3d\x22'+bt_data_escaped('adobe: currentuser')+'\x22\n    s.eVar2\x3d\x22'+bt_data_escaped('adobe: brand name')+'|'+bt_data_escaped('adobe: regionid')+'\x22\n    s.eVar3\x3d\x22'+bt_data_escaped('adobe: legacy catid')+'\x22\n    s.eVar4\x3d\x22D\x3dpurchaseID\x22 \n    s.eVar5\x3d\x22'+bt_data_escaped('global:checkout:shipping cost')+'\x22\n    s.eVar6\x3d\x22'+bt_data_escaped('global:checkout:offer list')+'\x22\n    s.eVar7\x3d\x22'+bt_data_escaped('search term')+'\x22\n    s.eVar8\x3d\x22'+bt_data_escaped('search count')+'\x22\n    /* s.evar11 handled on viewcart offers */\n    \n    /* s.eVar13 Collection name merch evar in s.products */\n    /* s.eVar14 Collection type merch evar in s.products */\n    s.eVar15\x3d\x22'+bt_data_escaped('adobe: account summary')+'\x22\n    s.eVar16\x3d\x22'+bt_data_escaped('adobe: locale')+'\x22\n    s.eVar17\x3d\x22'+bt_data_escaped('adobe: order history sum')+'\x22\n    s.eVar18\x3d\x22'+bt_data_escaped('adobe: order history avg')+'\x22\n    s.eVar19\x3d\x22'+bt_data_escaped('adobe: order history count')+'\x22\n    s.eVar20\x3d\x22'+bt_data_escaped('adobe: mobile or pc')+'\x22\n    s.eVar22 \x3d s.getPreviousValue(s.pageName, \x27v21\x27, \x27\x27);\n    s.eVar23 \x3d \x22'+bt_data_escaped('adobe: aov compare')+'\x22\n    var s_code\x3ds.t();if(s_code)document.write(s_code)//--\x3e\x3c/script\x3e',{tagId:639705});
BrightTag.instance.appendContent('\x3cscript src\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/javascript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/javascript\x22\x3e\ntwttr.conversion.trackPid(\x27l566m\x27);\x3c/script\x3e\n',{tagId:1703337});
BrightTag.EventBinding.when('altercart').fire(639651);
BrightTag.EventBinding.when('qv popup').fire(639723);
BrightTag.EventBinding.when('top nav email signup').fire(639741);
BrightTag.EventBinding.when('live chat proactive chat invite').fire(1696663);
BrightTag.EventBinding.when('live chat button clicked').fire(1696663);
});
