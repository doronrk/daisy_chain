TAGMAN.tmp.striderite_1417586557176(function(){(function(){TMAN.getContainerByName('striderite').addTags(new TMAN.Tag(
  "/*\n" + 
  "* Vendor: Foresee\n" + 
  "* Template type: Foresee Option 1 Trigger Tag\n" + 
  "* Template Version: 1.0.0\n" + 
  "* Author: Tahir Fayyaz\n" + 
  "* Date modified: 21/08/2012\n" + 
  "* TM ver: 3\n" + 
  "*/\n" + 
  "(function () {\n" + 
  "   \n" + 
  "// Declaration of template customisations\n" + 
  "var custom_behaviour_1 = function () {}; \n" + 
  "var custom_vendor_domain = \"striderite.com\";                                      \n" + 
  "var custom_foresee_path = \"striderite/includes/foresee/foresee-trigger.js\";\n" + 
  "\n" + 
  "// Template custom behaviour\n" + 
  "custom_behaviour_1();\n" + 
  "// End template custom behaviour                          \n" + 
  "var local_scr_url = ('https:' == document.location.protocol ? 'https://' : 'http://' ) + custom_vendor_domain  + '/' + custom_foresee_path;\n" + 
  "  \n" + 
  "TMAN.util.appendScript(local_scr_url);\n" + 
  "\n" + 
  "})();",
{
  "id":"3666",
  "async":true,
  "movable":true,
  "repeatable":false,
  "sandbox":false,
  "position":TMAN.position.BOTTOM_HEAD,
  "events":[

  ],
  "params":[

  ],
  "execRulesQuantifier":"all"
}));

window.tmImmediate=1;})();
(function(){TMAN.getContainerByName('striderite').addTags(new TMAN.Tag(
  "/*\n" + 
  "* Vendor: Google\n" + 
  "* Template type: Analytics - Standard\n" + 
  "* Template Version: 1.0.0\n" + 
  "* Author: Tahir Fayyaz\n" + 
  "* Date modified: 2012-08-28\n" + 
  "* TM ver: 3.0\n" + 
  "*/\n" + 
  "(function () {\n" + 
  "\n" + 
  "// Declaration of template customisations\n" + 
  "var custom_behaviour_1 = function () {};\n" + 
  "var custom_behaviour_2 = function () {};\n" + 
  "var custom_behaviour_3 = function () {};\n" + 
  "\n" + 
  "var custom_google_id = \"UA-1693159-3\"; // account id - REQ\n" + 
  "var custom_google_domain = \"\"; // just pass domain.com. No www. sub. or . - REQ if multiple subdomains\n" + 
  "\n" + 
  "window._gaq = window._gaq || [];\n" + 
  "custom_behaviour_3();\n" + 
  "window._gaq.push(['_setAccount', custom_google_id]);\n" + 
  "window._gaq.push(['_setDomainName', custom_google_domain]);\n" + 
  "window._gaq.push(['_trackPageview']);\n" + 
  "\n" + 
  "// Template custom behaviour\n" + 
  "custom_behaviour_1();\n" + 
  "// End template custom behaviour\n" + 
  "\n" + 
  "var local_script_url = ( 'https:'==document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n" + 
  "custom_behaviour_2();\n" + 
  "TMAN.util.appendScript(local_script_url);\n" + 
  "\n" + 
  "})();",
{
  "id":"4098",
  "async":true,
  "movable":true,
  "repeatable":false,
  "sandbox":false,
  "position":TMAN.position.BOTTOM_HEAD,
  "events":[

  ],
  "params":[

  ],
  "execRulesQuantifier":"all"
}));

window.tmImmediate=1;})();
(function(){TMAN.getContainerByName('striderite').addTags(new TMAN.Tag(
  "/*\n" + 
  "* Vendor: MediaForge\n" + 
  "* Template type: Product Tag\n" + 
  "* Template Version: 1.0\n" + 
  "* Author: Slavko Petrovic\n" + 
  "* Date modified: 2012-10-31\n" + 
  "* TM ver 3.0\n" + 
  "*/\n" + 
  "(function(){\n" + 
  "    var custom_behaviour_1 = function() {};\n" + 
  "    var custom_client_id = \"1185\";\n" + 
  "    var param_product_id = TMAN.getParam(\"product_id\");\n" + 
  "  \n" + 
  "    custom_behaviour_1();\n" + 
  "  \n" + 
  "    var local_scr_url = ('https:' == document.location.protocol ? 'https' : 'http') + \"://tags.mediaforge.com/js/\" + custom_client_id + \"/?prodID=\" + param_product_id;\n" + 
  "    TMAN.util.appendScript(local_scr_url);\n" + 
  "})();",
{
  "id":"18002",
  "async":true,
  "movable":true,
  "repeatable":false,
  "sandbox":false,
  "position":TMAN.position.BOTTOM_BODY,
  "events":[

  ],
  "params":{
    "product_id":{
      "r":true,
      "v":[

      ]
    }
  },
  "execRulesQuantifier":"all"
}));

window.tmImmediate=1;})();
(function(){TMAN.getContainerByName('striderite').addTags(new TMAN.Tag(
  "/*\n" + 
  "* Vendor: Yahoo YSM\n" + 
  "* Template type: Yahoo YSM TAG\n" + 
  "* Template Version: 1.0\n" + 
  "* Author: Marko Martinovic\n" + 
  "* Date modified: 2013-02-20\n" + 
  "* TM ver: 4.0\n" + 
  "*/\n" + 
  "(function() {\n" + 
  " \n" + 
  "    var custom_behaviour_1 = function() {};\n" + 
  "    var custom_subdomain = \"srv1\";\n" + 
  "    var custom_account_id = \"1BNJM38FSFFG5MK1VJUEC5FSNH0\";\n" + 
  "    var param_trans_id = \"\";\n" + 
  "    var param_currency = \"\";\n" + 
  "    var param_amount = \"\";\n" + 
  " \n" + 
  "    custom_behaviour_1();\n" + 
  "     \n" + 
  "    var local_data_arr = [];\n" + 
  "     \n" + 
  "    if (param_trans_id)\n" + 
  "        local_data_arr.push(\"transId=\" + param_trans_id);\n" + 
  "     \n" + 
  "    if (param_currency)\n" + 
  "        local_data_arr.push(\"currency=\" + param_currency);\n" + 
  "         \n" + 
  "    if (param_amount)\n" + 
  "        local_data_arr.push(\"amount=\" + param_amount);\n" + 
  " \n" + 
  "    window.ysm_customData = {};\n" + 
  "    window.ysm_customData.conversion = local_data_arr.join();\n" + 
  "    window.ysm_accountid = custom_account_id;\n" + 
  " \n" + 
  "    local_scr_url = (\"https:\" == document.location.protocol ? \"https\" : \"http\") + \"://\" + custom_subdomain + \".wa.marketingsolutions.yahoo.com/script/ScriptServlet?aid=\" + custom_account_id;\n" + 
  "    TMAN.util.appendScript(local_scr_url);\n" + 
  " \n" + 
  "})();",
{
  "id":"18036",
  "async":true,
  "movable":true,
  "repeatable":false,
  "sandbox":false,
  "position":TMAN.position.BOTTOM_HEAD,
  "events":[

  ],
  "params":[

  ],
  "execRulesQuantifier":"all"
}));

window.tmImmediate=1;})();
tmDisableIframe = 1;
if (window.LEV_TMIFCB) LEV_TMIFCB();})