	

function eglv_displayChatLink( available ){
	if (available === "true") {
		document.getElementById('chat-available').style.display = 'block';
		cmCreateElementTag('CHAT:AVAILABLE', 'STATIC CHAT');
	} else if (available === "off hours") {
		document.getElementById('chat-offhours').style.display = 'block';
		cmCreateElementTag('CHAT:OFF HOURS', 'STATIC CHAT');
	} else {
		document.getElementById('chat-unavailable').style.display = 'block';
		cmCreateElementTag('CHAT:UNAVAILABLE', 'STATIC CHAT');
	}
}
			
function openHelp( ) {
	try{
  	if( eglvchathandle != null && eglvchathandle.closed == false ){
    	eglvchathandle.focus();
      return;
    }
  }
  catch(err){}

	if (typeof(window.coremetrics) != 'undefined') {
			cmPID = window.coremetrics.cmLastReferencedPageID;
	} else {
			cmPID = '';
	}
	var entrypoint='1008';
	var serverName = 'live.qvcchat.com'; //production
    //var serverName = 'dev.qvcchat.com'; //production
    var templateName = "QVC";
	var refererName = cmPID;
	refererName = encodeURIComponent(refererName);			
	var refererurl = encodeURIComponent(document.location.href);
	var hashIndex = refererurl.lastIndexOf('#');
	if(hashIndex != -1){
	    refererurl = refererurl.substring(0,hashIndex);
	}
	
	var eglvcaseid = (/eglvcaseid=[0-9]*/gi).exec(window.location.search);
	var vhtIds = '';
	if(typeof EGAINCLOUD != "undefined" && EGAINCLOUD.Account.getAllIds)
	{
		var ids = EGAINCLOUD.Account.getAllIds();
	  vhtIds = '&aId=' + ids.a + '&sId=' + ids.s +'&uId=' + ids.u;
	}

 	//Server name, template name, and entry point ID will be updated per the production environment. 
 	var eGainChatUrl = 'https://'+serverName+'/system/templates/chat/'+templateName+'/chat.html?entryPointId='+entrypoint+'&templateName='+templateName+'&languageCode=en&countryCode=US&ver=v11&eglvrefname='+refererName+'&'+eglvcaseid+vhtIds + '&launchChat=STATIC';
 	if( (eGainChatUrl + refererurl).length <= 2000) {
 		eGainChatUrl += '&referer='+refererurl;
 	}
 	var params = "height=623,width=419,resizable=yes,scrollbars=yes,toolbar=no";
 	
 	eglvchathandle = window.open( eGainChatUrl,'',params)
}
   