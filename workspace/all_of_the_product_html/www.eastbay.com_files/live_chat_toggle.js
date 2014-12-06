// JavaScript Document
function showHeaderChat() {
	var rightNow = new Date();
	var currentDate = new Date(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate(), 0, 0, 0, 0);
	var compareDate = new Date(rightNow.getFullYear(), 6, 15, 0, 0, 0, 0);
	if(compareDate.getUTCHours() == currentDate.getUTCHours()){
		timeOffset = 5;
	} else {
		timeOffset = 6;
	}
	var day;
	if(rightNow.getUTCHours() < (timeOffset)) {
		if(rightNow.getUTCDay() == 0){
			day = 6; 
		} else {
			day = parseInt(rightNow.getUTCDay() - 1);	
		}
	} else {
		day = rightNow.getUTCDay();
	}
	if(day != 0 && day != 6) {
		// WEEKDAY HOURS
		starttime = 8;
		endtime = 23;
	} else {
		// WEEKEND HOURS
		starttime = 8;
		endtime = 23;
	}
	if((rightNow.getUTCHours() - timeOffset) < 0) {
		currentHour = 24 - (timeOffset - rightNow.getUTCHours());
	} else {
		currentHour = rightNow.getUTCHours() - timeOffset;
	}
	
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<a title=\"Eastbay Live Chat - Online\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" href=\"#\"><span class=\"icon_chat_small\"></span><span class=\"chat_text\">Live Chat</span></a>");
	} else {
		document.write("<a title=\"Eastbay Live Chat - Offline\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" href=\"#\"><span class=\"icon_chat_small\"></span><span class=\"chat_text\">Live Chat</span></a>");
	}
	
	
}

function showFooterChat() {
	var rightNow = new Date();
	var currentDate = new Date(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate(), 0, 0, 0, 0);
	var compareDate = new Date(rightNow.getFullYear(), 6, 15, 0, 0, 0, 0);
	if(compareDate.getUTCHours() == currentDate.getUTCHours()){
		timeOffset = 5;
	} else {
		timeOffset = 6;
	}
	var day;
	if(rightNow.getUTCHours() < (timeOffset)) {
		if(rightNow.getUTCDay() == 0){
			day = 6; 
		} else {
			day = parseInt(rightNow.getUTCDay() - 1);	
		}
	} else {
		day = rightNow.getUTCDay();
	}
	if(day != 0 && day != 6) {
		// WEEKDAY HOURS
		starttime = 8;
		endtime = 23;
	} else {
		// WEEKEND HOURS
		starttime = 8;
		endtime = 23;
	}
	if((rightNow.getUTCHours() - timeOffset) < 0) {
		currentHour = 24 - (timeOffset - rightNow.getUTCHours());
	} else {
		currentHour = rightNow.getUTCHours() - timeOffset;
	}
	
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<li><a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" title=\"Eastbay Live Chat - Online\"><span class=\"icon_chat\"></span></a></li>");
	} else {
		document.write("<li><a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" title=\"Eastbay Live Chat - Offline\"><span class=\"icon_chat\"></span></a></li>");
	}
	
	
}