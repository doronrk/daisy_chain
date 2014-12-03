// common.js
// javascript functions

_objectMoving = "";
_objectMovingIF = "";
Gheight =0;
Gwidth=0;
GstoreID=0;

_isIE6 = false;
_isIE7 =(navigator.userAgent.indexOf('MSIE 7.0')>=0)?true:false;
_isIE8 =(navigator.userAgent.indexOf('MSIE 8.0')>=0)?true:false;
_isFOX =(navigator.userAgent.indexOf('Firefox')>=0)?true:false;
_isSafari =(navigator.userAgent.indexOf('Safari')>=0)?true:false;
_isChrome =(navigator.userAgent.indexOf('Chrome')>=0)?true:false;
_isIE = (_isIE6||_isIE7)?true:false;
_callHasSpecialAction = false;

boxesToClose = new Array('searchBox','shoppingBagWindow','myAccountBox');

function changeClassName(theitem, NewclassName) {
  if((document.getElementById(theitem).className != NewclassName)) {
    document.getElementById(theitem).className = NewclassName;
  } else {
    document.getElementById(theitem).className = 'clearfix';
  }
}

function toggleOneItem(theitem) {
  if((document.getElementById(theitem).style.display == 'block') || (document.getElementById(theitem).style.display == -1))
  	{
    document.getElementById(theitem).style.display = 'none';
    document.getElementById('invisibleFrame').style.display = 'none';
    }
  else
    document.getElementById(theitem).style.display = 'block';
}


function openWindow(theURL,w,h) {
  posx=(screen.availWidth-w)/2;
  posy=(screen.availHeight-h)/2;
  window.open(theURL,'popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable=yes'+',width='+w+',height='+h+',left='+posx+',top='+posy);
}

function getPageScroll(){

	var yScroll, arrayPageScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}

// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){
	
	var xScroll, yScroll, pageHeight, pageWidth, arrayPageSize;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function findClassProperties(style,rule)
{
	styles = document.styleSheets;
	for(x=0;x<styles.length;x++)
	{
		href = styles[x].href;
	
		if(href !== null || href !== '' || href.indexOf(style) || href.indexOf(style) !== null)	
		{
			try
			{
				
				rules = (styles[x].rules)?styles[x].rules:styles[x].cssRules;
			
				for(zz=0;zz<rules.length;zz++)
				{
					temp1 = rules[zz];
					temp2 = rule;
						
					if(temp1.type!=3)
					{	
						if(temp1.selectorText !==undefined || temp1.selectorText.toUpperCase() == rule.toUpperCase())
						{
							return rules[zz];
						}	
						
					}	
				}	
				
			}
			catch(err)
			{
			}
		}			
	}
}

_cssClass = "";


function showAlert(obj) {
	
	url = (!obj.url)?'':obj.url;
	message = (!obj.message)?'':obj.message;
	targetAlert = (!obj.target)?'alertbox':obj.target;	
	cssClass = (!obj.cssClass)?'alertbox':obj.cssClass;
	closeBText = (!obj.closeBText)?'x':obj.closeBText;
	size = (!obj.size)?'':obj.size;	
	textOnly=(!obj.textOnly)?'N':obj.textOnly;
	GstoreID=(!obj.storeID)?'':obj.storeID;
	
	if(size !='')
	{
		sizeVar=size.split("/")
		Gheight=sizeVar[0];
		Gwidth=sizeVar[1];	
	}
		
	checkObject = $(targetAlert);
	checkObjectIF = $(targetAlert+'IF');	
	
	if(checkObject!=null)
	{			
		killAlertBox();
	}
					
	_objectMoving = document.createElement('DIV');
	
	_objectMoving.id = targetAlert;
	_objectMoving.className = cssClass;
	_objectMoving.style.display = 'block';
	
	if(document.all&&(navigator.userAgent.indexOf('MSIE 7.0')<0))
	{
		_objectMovingIF = document.createElement('IFRAME');		
		_objectMovingIF.id = targetAlert+'IF';
		_objectMovingIF.className = cssClass;
		_objectMovingIF.style.display = 'block';	
		_objectMovingIF.style.border = "0";	
		_objectMovingIF.scrolling = "no";
		_objectMovingIF.frameborder = false;		
	}		
				
	_cssClass = '.'+cssClass;	
	
	if(textOnly=='Y')
	{
	 createTextOnlyPopUp(message,closeBText);
	 
	}
	else
	{
	DWREngine._execute(_cfGenericFunctionsLocation, null, 'getText',message,url,closeBText,callText_Result);
	}

}



function createTextOnlyPopUp(message,closeBText)
 {
 


   	contentVar ='<div id="alertBoxCloseButton">';
   	
   	contentVar =contentVar+'<a class="secondaryButton"' + 'href="javascript:void(0);"' +'onclick="killAlertBox'+"('')"+';"'+'style="display:none;">';
  
    contentVar =contentVar+'<span class="closeBtnTextEng" style="display: none">close</span>';
     	
	contentVar =contentVar+'<span class="closeBtnTextFre" style="display: none">fermer</span>';
	
	contentVar =contentVar+'<span class="closeBtnX">'+closeBText+'</span></a>';
	
	contentVar =contentVar+'<button type="submit" class="secondaryButton"' + 'onclick="killAlertBox'+"('')"+'">'+closeBText+'</button>'+'</div>'
	 
    contentVar =contentVar+'<div id="alertBoxScroller">'+message+'</div>';

	try{
		contentVar = decodeURIComponent(contentVar);
	}catch(err){
		;
	}
	//

	_objectMoving.innerHTML =contentVar;
	arrayPageScroll = getPageScroll();
	arrayPageSize = getPageSize();
	
	var target_temp = arrayPageSize[3];

	box = findClassProperties('mainStyles.css',_cssClass).style;
	if (Gheight!=0) 
		{
		boxHeight = parseInt(Gheight);
		boxWidth=parseInt(Gwidth);	
		}
	else
	   {
		boxHeight = parseInt(box.height);
		boxWidth = parseInt(box.width);
	   }
	
	targetY = ((arrayPageScroll[1])+(arrayPageSize[3]/2))-(boxHeight/2)-90;
	targetX = (arrayPageSize[2]/2)-(boxWidth/2);	
		
	_objectMoving.style.position = 'absolute';
	_objectMoving.style.top = targetY+'px';
	_objectMoving.style.left = targetX+'px';
	
	
	if(document.all&&(navigator.userAgent.indexOf('MSIE 7.0')<0))
	{		
		_objectMovingIF.src = siteUrl + "/frontEndComponents/specificComponents/b2c/presentationLayer/blank.html";
		_objectMovingIF.zIndex = parseInt(box.zIndex)-1;		
		_objectMovingIF.style.filter = "alpha(opacity=0)";
		_objectMovingIF.style.position = 'absolute';
		_objectMovingIF.style.top = targetY+'px';
		_objectMovingIF.style.left = targetX+'px';
		_objectMovingIF.style.padding = box.padding;
		_objectMovingIF.frameBorder = false;
		_objectMovingIF.style.width = boxWidth;	
		_objectMovingIF.style.height = boxHeight+43;
		_objectMovingIF.style.width = boxWidth+11;
		document.body.appendChild(_objectMovingIF);	
	}
		
	document.body.appendChild(_objectMoving);
	
	
	
	
	
 }





function newsLetterBox(obj) {
	
	url = (!obj.url)?'':obj.url;
	message = (!obj.message)?'':obj.message;
	targetAlert = (!obj.target)?'alertboxNewsletter':obj.target;	
	cssClass = (!obj.cssClass)?'alertboxNewsletter':obj.cssClass;
	closeBText = (!obj.closeBText)?'x':obj.closeBText;
		
	checkObject = $(targetAlert);
	checkObjectIF = $(targetAlert+'IF');	
	
	if(checkObject!=null)
	{			
		killAlertBox();
	}
	//TODO: MARK PLEASE Fix this css	START			
	mainDiv = document.createElement('DIV');
	mainDiv.id = 'newsLetterDiv';
	mainDiv.className = 'newsLetterContainer';
	
	overlay = document.createElement('DIV');
	overlay.className = 'overlayBG';
	mainDiv.appendChild(overlay);
	//TODO: MARK PLEASE Fix this css	END	


	_objectMoving = document.createElement('DIV');
	_objectMoving.id = targetAlert;
	_objectMoving.className = cssClass;
	_objectMoving.style.display = 'block';
	mainDiv.appendChild(_objectMoving);
	if(document.all&&(navigator.userAgent.indexOf('MSIE 7.0')<0))
	{
		_objectMovingIF = document.createElement('IFRAME');		
		_objectMovingIF.id = targetAlert+'IF';
		_objectMovingIF.className = cssClass;
		_objectMovingIF.style.display = 'block';	
		_objectMovingIF.style.border = "0";	
		_objectMovingIF.scrolling = "no";
		_objectMovingIF.frameborder = false;
		mainDiv.appendChild(_objectMovingIF);		
	}		
				
	_cssClass = '.'+cssClass;	
	
	DWREngine._execute(_cfGenericFunctionsLocation, null, 'getText',message,url,closeBText,callText_Result);
}


function callText_Result(result)
{
	try{
		result = decodeURIComponent(result);
	}catch(err){
		;
	}
	
	_objectMoving.innerHTML = result;
	arrayPageScroll = getPageScroll();
	arrayPageSize = getPageSize();
		
	var target_temp = arrayPageSize[3];

	box = findClassProperties('mainStyles.css',_cssClass).style;
	if (Gheight!=0) 
		{
		boxHeight = parseInt(Gheight);
		boxWidth=parseInt(Gwidth);	
		}
	else
	   {
		boxHeight = parseInt(box.height);
		boxWidth = parseInt(box.width);
	   }
	
	targetY = ((arrayPageScroll[1])+(arrayPageSize[3]/2))-(boxHeight/2)-90;
	targetX = (arrayPageSize[2]/2)-(boxWidth/2);	
		
	_objectMoving.style.position = 'absolute';		
	_objectMoving.style.top = targetY+'px';
	_objectMoving.style.left = targetX+'px';
		
	
		
	if(document.all&&(navigator.userAgent.indexOf('MSIE 7.0')<0))
	{		
		_objectMovingIF.src = siteUrl + "/frontEndComponents/specificComponents/b2c/presentationLayer/blank.html";
		_objectMovingIF.zIndex = parseInt(box.zIndex)-1;		
		_objectMovingIF.style.filter = "alpha(opacity=0)";
		_objectMovingIF.style.position = 'absolute';			
		_objectMovingIF.style.top = targetY+'px';
		_objectMovingIF.style.left = targetX+'px';
	  	_objectMovingIF.style.padding = box.padding;
		_objectMovingIF.frameBorder = false;
		_objectMovingIF.style.width = boxWidth;	
		_objectMovingIF.style.height = boxHeight+43;
		_objectMovingIF.style.width = boxWidth+11;		 	
		document.body.appendChild(_objectMovingIF);	
	}
		

		
	document.body.appendChild(_objectMoving);		
	
	if(document.getElementById("loading"))
		setTimeout('removeLoading()',300);
		
						
					
		
}

	function removeLoading()
			{
			document.getElementById("loading").innerHTML="";
			}
	


function killAlertBox()
{
	
	document.body.removeChild(_objectMoving);
	if(document.all&&(navigator.userAgent.indexOf('MSIE 7.0')<0))
	{
			document.body.removeChild(_objectMovingIF);			
	}	
							
}					
	
function init()
{
	DWREngine._errorHandler =  errorHandler;
}

init();

//used for interactpopup
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function hideBox(id)
{   
  	$(id).style.display = 'none';
}

var timer;

function ShowShopingCartPopUpDelay()
{
	
	if($('shoppingBagWindow').style.display != 'block')
	{
		timer = setTimeout('ShowShopingCartPopUp()',300);
	}
	else
	{
		ShowShopingCartPopUp();
	}
	
}

function ShowShopingCartPopClearTimeout()
{
	clearTimeout(timer);
}


function ShowShopingCartPopUp()
{	
	DWREngine._execute(_cfCatLevelsLocation, null, 'getShoppingbagBoxInfo','',ShowShoppingBoxText);	
}

function ShowShoppingBoxText(result)
{	
	if($('ShoppingBagInfoLine').innerHTML.length != 0)
	{
		$('ShoppingBagInfoLine').innerHTML = result[0].AMOUNT;
		$('miniCartAmount').innerHTML = result[0].DOLLARAMOUNT;
		
		if (result[0].NUMBERITEMS != '0')
		{
			$('ShippingBagLineItems').innerHTML = result[0].SHOPPINGBAGTEXT;
			$('shoppingBagWindow').style.display = 'block';
			if( j$("#icon-shopping").length > 0 && result[0].NUMBERITEMS != '0' )
				j$( "#icon-shopping" ).html( "<img src='/_static/images/www/Shared/icon-shopping-red.png' alt='#' />" );
		}else{
			if( j$("#icon-shopping").length > 0 )
				j$( "#icon-shopping" ).html( "<img src='/_static/images/www/Shared/icon-shopping.png' alt='#' />" );
		}		
	}
	else
	{
		if (result[0].NUMBERITEMS != '0')
		{
			$('ShippingBagLineItems').innerHTML = result[0].SHOPPINGBAGTEXT;
			$('shoppingBagWindow').style.display = 'block';
			if( j$("#icon-shopping").length > 0 && result[0].SHOPPINGBAGTEXT.NUMBERITEMS != '0' )
				j$( "#icon-shopping" ).html( "<img src='/_static/images/www/Shared/icon-shopping-red.png' alt='#' />" );
		}else{
			if( j$("#icon-shopping").length > 0 )
				j$( "#icon-shopping" ).html( "<img src='/_static/images/www/Shared/icon-shopping.png' alt='#' />" );
		}	
	}
	
	var explorer = navigator.userAgent.indexOf("MSIE") != -1;
	var explorer6 = navigator.userAgent.indexOf("MSIE 6.0") != -1;
	var explorer7 = navigator.userAgent.indexOf("MSIE 7.0") != -1;
	var explorer8 = navigator.userAgent.indexOf("MSIE 8.0") != -1;
	var firefox = navigator.userAgent.indexOf("Firefox") != -1;
	var safari = navigator.userAgent.indexOf("Safari") != -1;
	var opera = navigator.userAgent.indexOf("Opera") != -1;
	var chrome = navigator.userAgent.indexOf("Chrome") != -1;
	
	leftVal = getWinWidth()/1.65;
	
	if(explorer){leftVal = getWinWidth()/1.65;}
	if(firefox){leftVal = getWinWidth()/1.667;}
	if(safari){leftVal = getWinWidth()/1.66;}
	if(opera){leftVal = getWinWidth()/1.667;}
	if(chrome){leftVal = getWinWidth()/1.667;}
	
	
	$('shoppingBagWindow').style.left = leftVal + "px";	

} 

function CloseShoppingCartPopUp() {
	$('shoppingBagWindow').style.display = 'none';
	}


boxesToClose = new Array('shoppingBagWindow');

function getWinWidth() {
	if (window.innerWidth) {
		return window.innerWidth;
		} 
	else if (document.body.clientWidth) {
		return document.body.clientWidth;
		} 
	else {
		return 100;
	}
}

function showBoxAndSetPosition(e,id)
{   
	  hideBox('shoppingBagWindow');
  	
  //	setLeft = (_isFOX)?e.offsetLeft:getLeftPos(e);
  	
  	//$(id).style.left = e.offsetLeft+'px';
  	
  //	widthAdjust = (_isFOX)?1:-3;
  //	leftAdjust = (_isFOX)?6:9;
  	
  //	$(id).style.left = (setLeft-leftAdjust)+'px';
  //	$(id).style.width = (e.offsetWidth-widthAdjust)+'px';
  	$(id).style.display = 'block';
  	
}

//Used for IE
function getLeftPos(e)
{
	z = 0;
  	myElement = e;
  	while(myElement.tagName != 'BODY')
  	{
  		z+=myElement.offsetLeft;
  		myElement = myElement.parentNode;
  	}
  	
  	return z;
}

function getTopPos(e)
{
	z = 0;
  	myElement = e;
  	while(myElement.tagName != 'BODY')
  	{
  		z+=myElement.offsetTop;
  		myElement = myElement.parentNode;
  	}
  	
  	return z;
}



function jqShowAlert(obj) {
	
	var url, message, targetAlert, cssClass, closeBText, hideCloseBtn;
	
	url = (!obj.url)?'':obj.url;
	message = (!obj.message)?'':obj.message;
	targetAlert = (!obj.target)?'alertbox':obj.target;	
	cssClass = (!obj.cssClass)?'alertbox':obj.cssClass;
	closeBText = (!obj.closeBText)?'X':obj.closeBText;
	hideCloseBtn = (!obj.hideCloseBtn)?false:obj.hideCloseBtn;
	
	var args = {
			MESSAGE: message
		,	URL: url
		,	CLOSEBUTTONTEXT: closeBText
		,	TEMPLATE: 1
		,	DIVID: targetAlert
		,	CSSCLASS: cssClass
		,	HIDECLOSEBTN: hideCloseBtn
	};
	
	if ( message != "" ) {
		
		args.PARAMS = args;
		
		args.CONTENT = message;
		
		jqCallText_Result( args );
				
	} else {
	
		j$.post(
				siteUrl + "/com/b2c/genericProxy.cfc?returnFormat=json&method=getText"
			,	args
			,	jqCallText_Result
			,	"json"
		);

	}
	
}

function jqCallText_Result(result)
{

	try{
		result.CONTENT = decodeURIComponent( result.CONTENT );
	} catch(e) {}
	
	j$( ".ui-dialog-content" ).each( function () {
		try {
			j$( this ).dialog( "close" );
		} catch (e) {}
	});
		
	var jAlert = j$("<div id='" + result.PARAMS.DIVID + "' class='" + result.PARAMS.CSSCLASS + "'>" + result.CONTENT + "</div>").appendTo('body').hide();
	
	jAlert.dialog({
			width: jAlert.css( "width" )
		,	autoOpen: true
		,	modal: g_ShowModal
	});
	
	if ( result.PARAMS.HIDECLOSEBTN )
		jAlert.parent().find( ".ui-dialog-titlebar" ).hide();
	
	if(_callHasSpecialAction)
	{
		eval(_callHasSpecialAction);
		_callHasSpecialAction = null;
	}			
		
}

function __IsValidEmailMask(email)
{

	filter = /^[a-zA-Z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-zA-Z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,})$/

		if (filter.test(email))
		{
			return true;
		}
		else
		{
			return false;
		}
}

j$(document).ready(function() {
	var OSName="";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if(OSName=="MacOS"){
			j$(".lb #searchTerm").css("padding-top", "6px");
			if(_isSafari){
				j$(".lb #searchTerm").css("padding-top", "4px");
				j$("h1.lb a").css("top", "-66px");
			}
			if(_isChrome){
				j$(".lb #searchTerm").css("padding-top", "2px");
				j$("h1.lb a").css("top", "-66px");
				
			}
			
			if(_isFOX){
				j$("#searchBox input").css("height", "13px");
				j$("#searchBox input").css("padding-bottom", "8px");
			}
			
		}


	if((_isIE7)||(_isIE8)){
		j$('.aldoNav li.cat1').each(function(){
			var listWidth = j$(this).find('div.level2 ul.level2').width();
			listWidth = listWidth + "px";
			j$(this).find('div.level2').css('width', listWidth)
			j$(this).find('li.separator').css('width', listWidth)
		});
	}
	
	j$('.aldoNav li.cat1:last-child').addClass('last');
	if(j$('.aldoNav li.cat1').length == 7) {
		j$('.aldoNav').addClass('trends');
	}
});

j$(document).ready(function() {
	j$('li.cat1').each(function(){
       if( j$(this).children('div.level2').length > 0 ) {
           j$(this).addClass('js-hasChildren');                   
        }
        
    	j$(this).mouseover(function() {
			j$(this).addClass('js-hover');
		});
    	j$(this).mouseout(function() {
			j$(this).removeClass('js-hover');
		});
    	           
    });
    
    j$('#searchBox input#searchTerm').focus(function() {
		j$(this).addClass('js-onfocus');
	});
	j$('#searchBox input#searchTerm').focusout(function() {
		j$(this).removeClass('js-onfocus');
	});
	
	j$('#searchResultsImage .product:nth-child(4n)').addClass('js-4n');
 	
 });
 
