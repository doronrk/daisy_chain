monetate.r4("1844166425-0",[{"args":[1417579330],"op":"sst"},{"args":[{"content":"function runMonetateTestQV3(){\n  $(\"#qvPrice .save-promotion\").each(function(){\n     if($(this).html() == \"BLANKET_MARKDOWN_TEXT_SELECT_ITEMS\" || $(this).html() == \"BLANKET_MARKDOWN_TEXT\") $(this).html(\"Permanently Reduced.  Prices reflect all discounts including any special discounts.\");\n  });\n}","discriminator":"content","ref":"314/270111.js","type":"javascript"}],"actionId":543735,"op":"insertJavascript"},{"args":[{"content":"$(\".save-promotion\").each(function(){\nif($(this).html().indexOf(\"???\") > -1 ) $(this).html(\"Permanently Reduced.  Prices reflect all discounts including any special discounts.\");\n});","discriminator":"content","ref":"314/270544.js","type":"javascript"}],"actionId":544436,"op":"insertJavascript"},{"args":[{"content":"$(\"link[href*='mobile.css']\").remove();","discriminator":"content","ref":"314/266728.js","type":"javascript"}],"actionId":537745,"op":"insertJavascript"},{"args":[{"content":"$(\"#ws-error h2\").each(function(){\nif($(this).text() == \"Access information about your Dillard's Card >\") $(this).hide();\n});","discriminator":"content","ref":"314/256526.js","type":"javascript"}],"actionId":504747,"op":"insertJavascript"},{"args":[{"content":"","discriminator":"ref","ref":"314/256528.js","type":"javascript"}],"actionId":518826,"op":"insertJavascript"},{"args":[{"iwidth":980,"href":"","version":2,"clickzones":[{"popToolbar":"no","popHeight":"","popStatus":"no","popResizable":"no","h":40,"cls":"","popWidth":"","l":"","pop":"","popScrollbars":"no","href":"#ticker","t":"_self","w":220,"layerId":"936","y":0,"x":379,"alt":"","r":"","popMenubar":"no"},{"popToolbar":"no","popHeight":"","popStatus":"no","popResizable":"no","h":70,"cls":"","popWidth":"","l":"","pop":"","popScrollbars":"no","href":"http://catalog.dillards.com/dillard-s-catalogs-christmas-gift-guide-2014/0053133001412956132?cm_sp=header-_-promoLink-_-111314_gift_guide","t":"","w":357,"layerId":"740","y":0,"x":623,"alt":"","r":"","popMenubar":"no"},{"popToolbar":"no","popHeight":"","popStatus":"no","popResizable":"no","h":70,"cls":"","popWidth":"","l":"","pop":"","popScrollbars":"no","href":"/shop/Home-Giftcards/_/N-lgbc?cm_sp=header-_-GiftCards-_-SeasonalImageLink","t":"_self","w":359,"layerId":"549","y":0,"x":0,"alt":"","r":"","popMenubar":"no"}],"contentId":119121,"alt":"","iheight":70,"ref":"c/941/7c7f273e72fc7c9a77be06658b3593e398e2e8e3/3.2.GS3yXgLo_gLd0-Td0oIA8-vLbK0SzNvmwbbYuu6x1bsDopXI96LKMdKzDcOXv6y08utnkvKorOsN/_gJQXCqBAoGxoVzjleStC6EBN8hUbGEALI_mlvQo_VVMRrA5pt4tvQhEKgKugYX9pzWBRTz-NFEiWvIM/_ZY0msa8gHiCNQ9nihCfStbVyaiZz4PKPGBiwKlrLKiu302s_cPBipmCoPi8gaPtPlZiOQbh6KRlk9BT/YyNtIlZMq1UwSoVt0Xege7hnSQXVWTfj7K-pa0WwGD2LX0CM-oL7K1VjYsGS-ZT1UxqafFt-dxl2DF8S/k2estSkZc1rJY21j3X_rZ4jQzxIiS34Lg59dEKihkp9OlAIfCKTR6oAEASVEt4Zhz0DZm3kiEPSEFkr5/gMDvA8O2Cm79GO5NfcQAcn3q6IqqZ3d88fgWwqgDXenSbqSvXc89xXZ0aOunFcfEEsvDgOmKZ1chkuOB/qXdhJQBRzTwvW2FsyrebV3vRNxkUo3NH0vmfj4PdVk-pKTEmdjffzmoIMCdmfh3gIQ64dOksmQqUJEXj/IWCUo_ti_wSdwzDX2l6fvYazIDV0DolO8HMtgge7WVh9nvuG1BfFdNAv5mJ4vDQ=.png"},"#myDillardsBar","before","2014-12-19 23:45:00",2,1,1,"{01 day}",0,1,null,null,1,"0",null,"margin: 0 auto;","text-align:center;\nfont family: \"Open Sans\" ;\nfont-size:38px;\ncolor:#990D0E;\nfont-weight:bold;","/*HEIGHT MUST BE SAME AS MARGIN OF TOP BAR*/\nposition: absolute;\ntop: 0;\nheight: 70px;\n\nwidth: 100%;\nbackground: #c8d0c1;\ntext-align: center;",null,"/* Must equal height of inserted creative. */\nbody.mdbOn, #myDillardsBar, #main-nav-wrapper.sticky.us-nav { margin-top: 70px !important}\n\n #myDillardsContent {top: 99px!important;}",0,0],"actionId":530573,"op":"countdownBannerV3"},{"args":[{"content":".DillardsModal{top:110px !important;}","discriminator":"content","ref":"314/263145.css","type":"css"}],"actionId":530576,"op":"insertCSS"},{"args":[{"content":"setTimeout(function(){\n\nif(document.cookie.indexOf(\"returnCartNodalFired\") == -1){\n\n\tif(document.cookie.indexOf(\"301_CVMINICART\") > -1 && $.cookie(\"301_CVMINICART\").split(\"@\")[0].split(\"~~~\")[1] > 0){\n\t\tnewNodalContent = '';\n\t\tnewNodalContent += '<div id=\"return-modal\" class=\"DillardsModal\">';\n\t\tnewNodalContent += '\t<div class=\"DillardsModalTitle\">';\n\t\tnewNodalContent += '\t\tWelcome Back!';\n\t\tnewNodalContent += '\t</div>';\n    newNodalContent += '\t<div class=\"modalContent\">';\n\t\tnewNodalContent += '\t\t<a href=\"/webapp/wcs/stores/servlet/OrderItemDisplay?storeId=301&catalogId=301&langId=-1&orderId=.\"><img src=\"/images/monetate/100314_abandoncart.jpg\" style=\"width:450px\" ></a>';\n\t\tnewNodalContent += '\t</div>';\n\t\tnewNodalContent += '</div>';\n\t\t$(\"body\").append(newNodalContent);\n\t\tDillardsModal.scan();\n\t\t$(\"#return-modal\").DillardsModalOpen();\n\t}\n\tdocument.cookie = \"returnCartNodalFired=true; path=/\";\n}\n}, 500);","discriminator":"content","ref":"314/238283.js","type":"javascript"}],"actionId":517536,"op":"insertJavascript"},{"eventId":5152,"args":["#pinProduct"],"op":"trackClick"},{"eventId":5154,"args":["#shareProduct"],"op":"trackClick"},{"eventId":5206,"args":["#tweetProduct"],"op":"trackClick"},{"eventId":5207,"args":["#emailProduct"],"op":"trackClick"},{"eventId":5208,"args":["#printProduct"],"op":"trackClick"},{"eventId":5210,"args":["#add-box > div.fp-root.fp-enabled > div.fp-label > div.fp-copy.fp-predicted > p.fp-s > span"],"op":"trackClick"},{"eventId":5211,"args":["#addToCartBtn_1"],"op":"trackClick"},{"eventId":5212,"args":["#add-registry"],"op":"trackClick"},{"eventId":5213,"args":["#add-wishlist"],"op":"trackClick"},{"eventId":5214,"args":["#backLink"],"op":"trackClick"},{"eventId":5215,"args":["#brandLink"],"op":"trackClick"},{"eventId":5216,"args":["#noreviews > table > tbody > tr > td > a.pr-snippet-link"],"op":"trackClick"},{"eventId":5217,"args":["#zoomMouseDetection"],"op":"trackClick"},{"eventId":5218,"args":["#Size"],"op":"trackClick"},{"eventId":5219,"args":["#Color"],"op":"trackClick"}]);