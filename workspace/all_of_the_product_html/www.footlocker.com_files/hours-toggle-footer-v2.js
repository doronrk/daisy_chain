// JavaScript Document
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
	/*
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); cmCreateConversionEventTag('Live Chat',2,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\"><img src=\"//www.footlocker.com/ns/chat/images/livechat-online.png\" border=\"0\" /></a>");
	} else {
		document.write("<img src=\"//www.footlocker.com/ns/chat/images/livechat-offline.png\" />");
	}
	*/
	
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<a title='Live Chat' href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); cmCreateConversionEventTag('Live Chat',2,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\"><p><span>Chat Hours of Operation:</span><br /> 7 days a week <br />8am - 11pm CDT</p><span class=\"chat_box\"><img src=\"//www.footlocker.com/ns/chat/images/livechat-online.png\" border=\"0\" /></a></span>");
	} else {
		document.write("<p><span>Chat Hours of Operation:</span><br /> 7 days a week <br />8am - 11pm CDT</p><span class=\"chat_box\"><img src=\"//www.footlocker.com/ns/chat/images/livechat-offline.png\" /></span>");
	}
	
	
}