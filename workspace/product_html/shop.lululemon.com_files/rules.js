eStara_fs_level=-2;var divHolder = document.getElementById('liveChat');if (document.body && divHolder != null && eStara_def(divHolder)){                  divHolder.innerHTML = "<a href=\"javascript:webISChatPop('Template=880159','urid=272104');\">" +
                                    "<img src=\"http://as00.estara.com/webcare/public/linkimage.php?ulbid=880159&urid=272104&dnc=1417586238.12238312353572\"" + 
                                    " border='0' alt='Click to Chat'/></a>";eStara_append(eStara_add_var_fields('http://as00.estara.com/as/InitiateCall2.php?accountid=200106301439&template=880159&checklinkstatus=1'));eStara_urids_to_cookie.push('272104');} else {}var rule_runjs_267549_func_match=false;var rule_runjs_267549_func_executed=false;try{ eval('rule_runjs_267549_func_executed=eStara_var6 = s.pageName;'); }catch(err){eStara_logerr("rule=267549",err);}var rule_runjs_268025_func_match=false;var rule_runjs_268025_func_executed=false;try{ eval('rule_runjs_268025_func_executed=eStara_var7 = s_account;'); }catch(err){eStara_logerr("rule=268025",err);}var rule_runjs_268015_func_match=false;var rule_runjs_268015_func_executed=false;eStara_GuiJSFunctions[eStara_GuiJSFunctions.length] = "rule_runjs_268015_func_executed=s=s_gi(s_account);s.linkTrackVars=\"prop22,eVar48,events\";s.linkTrackEvents=\'event41\';s.events=\'event41\';s.prop22=s.pageName +\'initiate chat\';s.eVar48=s.pageName +\'initiate chat\';s.tl(this,\'o\',\'chat link clicked \');";var rule_runjs_268659_func_match=false;var rule_runjs_268659_func_executed=false;eStara_ButtonJSFunctions[eStara_ButtonJSFunctions.length] = "rule_runjs_268659_func_executed=s=s_gi(s_account);s.linkTrackVars=\'events\';s.linkTrackEvents=\'event47\';s.events=\'event47\';s.tl(this,\'o\',\'chat button available\');";eStara_cs=eStara_urlencode((typeof(document.characterSet)!='undefined')?document.characterSet:document.charset);
if (!window.ATG_ppss) { var ATG_ppss = {}; }
ATG_ppss.active = true;
var g_eStaraWatchdogEnd=false;
var g_eStaraHost='http://as00.estara.com';
function eStara_onloadupload(only_upload){
if(only_upload==null) only_upload = false;
try{
var clwidth = document.documentElement.clientWidth || document.body.clientWidth; 
if(only_upload){
eStara_upload_form_api('http://as00.estara.com/fs/cbgs.php', 'as00.estara.com', uploadpageid);
} else {
eStara_upload_form_api('http://as00.estara.com/fs/cbgs.php', 'as00.estara.com');
}
}catch(err){if(typeof(eStara_logerr)=="function")eStara_logerr("pagepeek_cobrowse.php:eStara_onloadupload:",err);}
}
var g_eStaraCobrowseStarted = false; function eStara_startCobrowseGUIReal(only_upload){ if(only_upload || g_eStaraCobrowseStarted==false) {if(!only_upload) g_eStaraCobrowseStarted = true; setTimeout("eStara_onloadupload("+only_upload+")", 50); }}function eStara_cb_watchdog()
{
esconsole.log("eStara_cb_watchdog called ["+eStara_getpageid()+"]");
if(g_eStaraWatchdogEnd==true)return;
if(typeof(eStara_startCobrowseGUINoFunc)!="undefined"&&eStara_startCobrowseGUINoFunc!=0){
eStara_startCobrowseGUI(false, eStara_startCobrowseGUINoFunc);
}
setTimeout('eStara_cb_watchdog()',3000);
}
setTimeout('eStara_cb_watchdog()',3000);
function eStara_check_cookies(){
var keys=eStaraCookieDictionaryGetKeys('estaracookie');
for(var i=0;i<keys.length;i++){
var key=keys[i];
if(key.match(/^rule_action_\d+$/)){
var urid=key.substring(12);
var value=eStaraCookieDictionaryGet('estaracookie',key);
var commapos=value.indexOf(',');
if(commapos!=-1){
var ulbid=value.substring(0,commapos);
var debug=value.substring(commapos+1);
if(debug)
eStara_debug('Rule:'+urid+':Found match from previous page',debug);
if(ulbid!=0){
eStara_append(eStara_add_var_fields('http://as00.estara.com/as/commonlink.php?accountid=200106301439&template='+ulbid+'&urid='+urid+'&host=as00.estara.com&fromrules=1&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc=1417586238.2095511718197'));
eStara_urids_to_cookie.push(''+urid+'');
}else eStara_urids_to_log.push(''+urid+'');
eStaraCookieDictionaryDelete('estaracookie',key,true,null);
}
}
}
}
eStara_check_cookies();
function eStara_log_rule_action()
{
if(eStara_urids_to_log.length>0||eStara_urids_to_cookie.length>0){
var urids='';
while(eStara_urids_to_log.length>0){
urid=eStara_urids_to_log.shift();
if (urids!='')
urids+=',';
urids+=urid;
}
var cookieurids='';
while(eStara_urids_to_cookie.length>0) {
urid=eStara_urids_to_cookie.shift();
if(cookieurids!='')
cookieurids+=',';
cookieurids+=urid;
}
setTimeout('eStara_append(\'http://as00.estara.com/fs/ruleaction.php?accountid=200106301439&urid='+urids+'&cookieurid='+cookieurids+'&estara_fsguid=E8BEED9D8AA92917A43CA625BE0C3C8F&dnc='+(new Date()).getTime()+Math.round(Math.random()*1000000)+'\');',3000);
}
setTimeout('eStara_log_rule_action();',3000);
}
eStara_log_rule_action();
