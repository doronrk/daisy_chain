eStara_obscuration['52663']='creditCardNumber|cardVerificationNumber';eStara_debug('Rule: 51869: ' + 'Cobrowse rule seen' + '', 1);eStara_fs_level=1;
eStara_cs=eStara_urlencode((typeof(document.characterSet)!='undefined')?document.characterSet:document.charset);var g_eStaraWatchdogEnd = false;var g_eStaraHost='http://as00.estara.com';function eStara_onloadupload(only_upload){if(only_upload==null) only_upload = false;try{var clwidth = document.documentElement.clientWidth || document.body.clientWidth; if(only_upload){eStara_upload_form('http://as00.estara.com/fs/cbgs.php?accountid=200106296473&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&cs='+eStara_cs+'&location='+eStara_urlencode((document.location).toString().substring(0,1000))+'&revision=0&fs_level='+eStara_fs_level+'&clientwidth='+clwidth+'&onlyupload=1', 'as00.estara.com', uploadpageid);} else {eStara_upload_form('http://as00.estara.com/fs/cbgs.php?accountid=200106296473&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&cs='+eStara_cs+'&location='+eStara_urlencode((document.location).toString().substring(0,1000))+'&revision=0&fs_level='+eStara_fs_level+'&clientwidth='+clwidth, 'as00.estara.com');eStara_collect_data();}}catch(err){if(typeof(eStara_logerr)=="function")eStara_logerr("cobrowse.php:eStara_onloadupload:",err);}}var g_eStaraCobrowseStarted = false; function eStara_startCobrowseGUIReal(only_upload){ if(only_upload || g_eStaraCobrowseStarted==false) {if(!only_upload) g_eStaraCobrowseStarted = true; setTimeout("eStara_onloadupload("+only_upload+")", 50); }}function eStara_cb_watchdog(){esconsole.log("eStara_cb_watchdog called ["+eStara_getpageid()+"]");if(g_eStaraWatchdogEnd==true)return;if(typeof(eStara_startCobrowseGUINoFunc)!="undefined"&&eStara_startCobrowseGUINoFunc!=0){eStara_startCobrowseGUI(false, eStara_startCobrowseGUINoFunc);}if(typeof(eStara_startCobrowseButtonNoFunc)!="undefined"&&eStara_startCobrowseButtonNoFunc!=0){eStara_startCobrowseButton(eStara_startCobrowseButtonNoFunc);}setTimeout('eStara_cb_watchdog()',3000);}setTimeout('eStara_cb_watchdog()',3000);eStara_fs_firstime=1;function eStara_collect_data(){try{esconsole.log("eStara_collect_data called");if(typeof(eStaraEndCobrowsePoll) != "undefined" && eStaraEndCobrowsePoll==1){ eStaraEndCobrowsePoll=null; return;}g_eStaraWatchdogEnd=true;var sent=0;var clwidth=document.documentElement.clientWidth||document.body.clientWidth;var clheight=document.body.scrollHeight;var clposition=(document.documentElement&&document.documentElement.scrollTop)?document.documentElement.scrollTop:document.body.scrollTop;var extra='invite=b78648701cddd810e9cd9affb2e54cbb&accountid=200106296473&fs_level='+eStara_fs_level+'&cs='+eStara_cs+'&fs_firsttime='+eStara_fs_firstime+'&clientwidth='+clwidth+'&clientheight='+clheight+'&clientposition='+clposition;if(typeof(eStara_pageid)!="undefined"&&(eStara_fs_level==1||eStara_fs_level==-2)){extra+='&pageid='+eStara_getpageid();}if(eStara_fs_firstime)extra+='&referrer='+eStara_urlencode((document.referrer).toString().substring(0,1000));if(typeof(eStara_form_data)!=="object"){eStara_init_form_data();}if(eStara_form_data.sent===''||eStara_form_data.sent==='?'){eStara_form_data.sent=eStara_build_form_data(false);}eStara_form_data.current=eStara_build_form_data(false);if(eStara_form_data.outOfSync()){eStara_form_data.sent=eStara_form_data.current;eStara_fd_post(eStara_build_form_action('http://as00.estara.com/fs/cbfd.php', 'b78648701cddd810e9cd9affb2e54cbb', 'E8BEED9D8AA92917A43CA625BE0C3C8F'), 'current', false);sent=1;}else{}if(!sent && (eStara_form_data.current!==''||eStara_fs_firstime==1||1==0)){if(eStara_fs_firstime==1)eStara_fd_post(eStara_build_form_action('http://as00.estara.com/fs/cbfd.php', 'b78648701cddd810e9cd9affb2e54cbb', 'E8BEED9D8AA92917A43CA625BE0C3C8F'), 'sent', false);eStara_add_include('http://as00.estara.com/fs/cbgs.php?'+extra+'&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F');}eStara_fs_firstime=0;if(typeof(eStaraEndCobrowsePoll) != "undefined" && eStaraEndCobrowsePoll==1){ eStaraEndCobrowsePoll=null; return;}setTimeout('eStara_collect_data()',eStara_interval);}catch(err){esconsole.log("eStara_collect_data encountered an exception ["+err+"]");eStara_logerr("cobrowse.php:eStara_collect_data:",err);}}function eStara_check_cookies(){var keys=eStaraCookieDictionaryGetKeys('estaracookie');for(var i=0;i<keys.length;i++){var key=keys[i];if(key.match(/^rule_action_\d+$/)){var urid=key.substring(12);var value=eStaraCookieDictionaryGet('estaracookie',key);var commapos=value.indexOf(',');if(commapos!=-1){var ulbid=value.substring(0,commapos);var debug=value.substring(commapos+1);if(debug)eStara_debug('Rule:'+urid+':Found match from previous page',debug);if(ulbid!=0){eStara_append(eStara_add_var_fields('http://as00.estara.com/as/commonlink.php?accountid=200106296473&template='+ulbid+'&urid='+urid+'&host=as00.estara.com&fromrules=1&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc=1417586552.18927312419211'));eStara_urids_to_cookie.push(''+urid+'');}else eStara_urids_to_log.push(''+urid+'');eStaraCookieDictionaryDelete('estaracookie',key,true,null);}}}}eStara_check_cookies();function eStara_log_rule_action(){if(eStara_urids_to_log.length>0||eStara_urids_to_cookie.length>0){var urids='';while(eStara_urids_to_log.length>0){urid=eStara_urids_to_log.shift();if (urids!='')urids+=',';urids+=urid;}var cookieurids='';while(eStara_urids_to_cookie.length>0) {urid=eStara_urids_to_cookie.shift();if(cookieurids!='')cookieurids+=',';cookieurids+=urid;}setTimeout('eStara_append(\'http://as00.estara.com/fs/ruleaction.php?accountid=200106296473&urid='+urids+'&cookieurid='+cookieurids+'&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc='+(new Date()).getTime()+Math.round(Math.random()*1000000)+'\');',3000);}setTimeout('eStara_log_rule_action();',3000);}eStara_log_rule_action();