eStara_obscuration['54443']='creditCardNumber|cardVerificationNumber';try{if (document.body && eStara_def(document.body.innerHTML)){var tocheck=document.body.innerHTML;var m=tocheck.match(/(\>Total:|Estimated Order Total)[^\$]+\$([^\<]+)\</m);if (m && typeof(m[2])!='undefined'){eStara_debug('Rule: 54383: ' + 'Found var match: (\\>Total:|Estimated Order Total)[^\\$]+\\$([^\\<]+)\\< 2 match to store in var6' + '', 1);eStara_debug("match="+m[2], 1);eStara_var6=m[2];eStara_urids_to_log.push('54383');}else{var nomatch = true;if (document.getElementsByTagName("head")){var tocheck=document.getElementsByTagName("head").item(0).innerHTML;var m=tocheck.match(/(\>Total:|Estimated Order Total)[^\$]+\$([^\<]+)\</m);if (m && typeof(m[2])!='undefined'){nomatch = false;eStara_debug('Rule: 54383: ' + 'Found var match: (\\>Total:|Estimated Order Total)[^\\$]+\\$([^\\<]+)\\< 2 match to store in var6' + '', 1);eStara_debug("match in head="+m[2], 1);eStara_var6=m[2];eStara_urids_to_log.push('54383');}}if(nomatch){eStara_debug('Rule: 54383: ' + 'No var match for (\\>Total:|Estimated Order Total)[^\\$]+\\$([^\\<]+)\\<' + '', 1);}}}}catch(err){eStara_logerr("rule=54383",err);}try{if (document.body && eStara_def(document.body.innerHTML)){var tocheck=document.body.innerHTML;var m=tocheck.match(/order number is:[^\d]+([\d]+)/m);if (m && typeof(m[1])!='undefined'){eStara_var5=m[1];eStara_urids_to_log.push('54453');}else{var nomatch = true;if (document.getElementsByTagName("head")){var tocheck=document.getElementsByTagName("head").item(0).innerHTML;var m=tocheck.match(/order number is:[^\d]+([\d]+)/m);if (m && typeof(m[1])!='undefined'){nomatch = false;eStara_var5=m[1];eStara_urids_to_log.push('54453');}}if(nomatch){}}}}catch(err){eStara_logerr("rule=54453",err);}rule54463_func.i = 3000;function rule54463_func(){var matchval = '';try{if(typeof(s)!='undefined' && typeof(s.eVar18)!='undefined'){var num="";var strToCheck=''+s.eVar18;if(typeof(strToCheck)!='string'){return;}var m=strToCheck.match(/.*/);if (m){eStara_var3=s.eVar18;m=-1;}else{}if(true==m ||m || m>0){eStara_urids_to_log.push('54463');}else{setTimeout('rule54463_func();', arguments.callee.i);}}else{}}catch(err){eStara_logerr("rule=54463", err);}}rule54463_func();function eStara_check_cookies(){var keys=eStaraCookieDictionaryGetKeys('estaracookie');for(var i=0;i<keys.length;i++){var key=keys[i];if(key.match(/^rule_action_\d+$/)){var urid=key.substring(12);var value=eStaraCookieDictionaryGet('estaracookie',key);var commapos=value.indexOf(',');if(commapos!=-1){var ulbid=value.substring(0,commapos);var debug=value.substring(commapos+1);if(debug)eStara_debug('Rule:'+urid+':Found match from previous page',debug);if(ulbid!=0){eStara_append(eStara_add_var_fields('http://as00.estara.com/as/commonlink.php?accountid=200106296473&template='+ulbid+'&urid='+urid+'&host=as00.estara.com&fromrules=1&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc=1417586081.46385407570343'));eStara_urids_to_cookie.push(''+urid+'');}else eStara_urids_to_log.push(''+urid+'');eStaraCookieDictionaryDelete('estaracookie',key,true,null);}}}}eStara_check_cookies();function eStara_log_rule_action(){if(eStara_urids_to_log.length>0||eStara_urids_to_cookie.length>0){var urids='';while(eStara_urids_to_log.length>0){urid=eStara_urids_to_log.shift();if (urids!='')urids+=',';urids+=urid;}var cookieurids='';while(eStara_urids_to_cookie.length>0) {urid=eStara_urids_to_cookie.shift();if(cookieurids!='')cookieurids+=',';cookieurids+=urid;}setTimeout('eStara_append(\'http://as00.estara.com/fs/ruleaction.php?accountid=200106296473&urid='+urids+'&cookieurid='+cookieurids+'&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc='+(new Date()).getTime()+Math.round(Math.random()*1000000)+'\');',3000);}setTimeout('eStara_log_rule_action();',3000);}eStara_log_rule_action();