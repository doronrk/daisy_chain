
//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;

//create popup & background div
j$("<div id='div_Background_Popup'></div>").appendTo("body");
j$("<div id='div_jQuery_Popup'></div>").appendTo("body");

//centering popup
function centerPopup(){
	//request data for centering
	
	//get the window dimensions
	var windowWidth = 0, windowHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    windowWidth = window.innerWidth;
	    windowHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    windowWidth = document.documentElement.clientWidth;
	    windowHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    windowWidth = document.body.clientWidth;
	    windowHeight = document.body.clientHeight;
	}
	
	//get the scrolling offsets
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
	    //Netscape compliant
	    scrOfY = window.pageYOffset;
	    scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	    //DOM compliant
	    scrOfY = document.body.scrollTop;
	    scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	    //IE6 standards compliant mode
	    scrOfY = document.documentElement.scrollTop;
	    scrOfX = document.documentElement.scrollLeft;
	}
	
	var popupHeight = j$("#div_jQuery_Popup").height();
	var popupWidth = j$("#div_jQuery_Popup").width();

	//centering
	j$("#div_jQuery_Popup").css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2+scrOfY,
		"left": windowWidth/2-popupWidth/2
	});
	//only need force for IE6
	
	j$("#div_Background_Popup").css({
		"height": windowHeight
	});

}

function loadPopup(){

	//center popup
	centerPopup();
	
	//loads popup only if it is disabled
	if(popupStatus==0){
		
		j$("#div_Background_Popup").css({"opacity": "0.7"});
		j$("#div_Background_Popup").fadeIn("fast");
		j$("#div_jQuery_Popup").fadeIn("fast");
		popupStatus = 1;
	}
}



function jQueryPopupShow(obj) {
	
	var url, message, cssClass, popupID, closeBText, hideCloseBtn, template, storeID, redirect, redirectType;
	
	url = (!obj.url)?'':obj.url;
	message = (!obj.message)?'':obj.message;
	template = (!obj.template)?'':obj.template;
	cssClass = (!obj.cssClass)?'alertbox':obj.cssClass;
	popupID = (!obj.popupID)?'0':obj.popupID;
	closeBText = (!obj.closeBText)?'X':obj.closeBText;
	hideCloseBtn = (!obj.hideCloseBtn)?false:obj.hideCloseBtn;
	storeID = (!obj.storeID)?'0':obj.storeID;
	popupRedirect = (!obj.redirect)?false:obj.redirect;
	popupRedirectType = (!obj.redirect)?false:obj.redirectType;

	var args = {
			MESSAGE: escape(message)
		,	URL: url
		,	CLOSEBUTTONTEXT: escape(closeBText)
		,	TEMPLATE: template
		,	CSSCLASS: cssClass
		,	POPUPID: popupID
		,	HIDECLOSEBTN: hideCloseBtn
		,	STOREID: storeID
	};

	j$.post(
			jqueryURL + "com/b2c/genericProxy.cfc?returnFormat=json&method=getText_Popup"
		,	args
		,	jQueryPopupText_Result
		,	"json"
	);

}

function disablePopup(){
	//disables popup only if it is enabled
	if(popupStatus==1){
		j$("#div_Background_Popup").fadeOut("fast");
		j$("#div_jQuery_Popup").fadeOut("fast");
		popupStatus = 0;
		if(popupRedirect!='')
		{
			if(popupRedirectType=='url')
			{
				// redirect to specified URL
				window.location=popupRedirect;
			}
			if(popupRedirectType=='submitForm')
			{
				//Call a script that submits desired form - must exist on calling page				
				submitForm();
			}
		}
	}
}

function jQueryPopupText_Result(result)
{

	try{
		result.CONTENT = decodeURIComponent( result.CONTENT );
		
	} catch(e) {}
	
	j$('#div_jQuery_Popup').removeClass();
	j$('#div_jQuery_Popup').addClass(result.PARAMS.CSSCLASS);
	
	j$('#div_jQuery_Popup').html(unescape(result.CONTENT));
	
	j$('#div_jQuery_Popup').css('width',result.PARAMS.WIDTH + 'px');
	j$('#div_jQuery_Popup').css('height',result.PARAMS.HEIGHT + 'px');
	j$('#div_jQuery_Popup').css('background','#'+result.PARAMS.BGCOLOR);

	if(result.PARAMS.HIDECLOSEBTN){
		j$('#div_CloseBT_Popup').hide();
	}
	
	loadPopup();

}

j$(document).ready(function(){
	//CLOSING POPUP

	//Click out event!
	j$("#div_Background_Popup").click(function(){
		disablePopup();
	});
	
	//Press Escape event!
	j$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});
});
