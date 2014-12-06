/********************************************************************
*-------------------------------------------------------------------
* Licensed Materials - Property of IBM
*
* WebSphere Commerce
*
* (c) Copyright IBM Corp. 2007
*
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*
*-------------------------------------------------------------------*/

/** XBUtil **********************************************************
*
* Cross Browser API
*
*********************************************************************/

// Global browser flags
// isIE (Internet Explorer 5.5+)
// isNS (Netscape 6+)
// isDHTML (DHTML cross-browser support)
var isIE = (document.all) ? true : false;
var isNS = (document.getElementById && !isIE) ? true : false;
var isOpera = (document.getElementById && isIE) ? true : false;
var isDHTML = (isIE || isNS) ? true : false;

/**********************************************************
* XBElement Class
*
* Read-Only Attributes:
* element       : The original DOM element.
* id            : ID of the element.
* type          : "XBElement"
* tagName       : Tag name of this element.
* class         : Currrent class applies to it. 
* style         : The style object of the DOM element.
* left          : The left position obtained from style.
* top           : The top position obtained from style.
* pageX         : Horizontal coordinate relative to the page.
* pageY         : Vertical coordinate relative to the page.
* offsetLeft    : Position relative to the left of the parent element.
* offsetTop     : Position relative to the top of the parent element.
* offsetWidth   : Width relative to the parent element.
* offsetHeight  : Height relative to the parent element.
* offsetParent  : A reference to the object in which the current element is offset.
*
* Methods:
* getAttribute          : Retrieves an attribute of the DOM element.
* setAttribute          : Sets an attribute value to the DOM element.
* getParentElement      : Returns the parent element in XBElement type.
* getFirstChild         : Returns the first child element in XBElement type.
* getLastChild          : Returns the last child element in XBElement type.
* getPreviousSibling    : Returns the previous sibling element in XBElement type.
* getNextSibling        : Returns the next sibling element in XBElement type.
* getChildElements      : Returns an array of children elemtns in XBElement types.
* getStyleClass         : Returns the current style class name.
* setStyleClass         : Sets the style class name.
* getStylePropertyValue : Returns a style property value.
* setStylePropertyValue : Sets a style property value.
* getInnerHTML          : Returns the innerHTML of the element.
* setInnerHTML          : Sets the innerHTML of the element.
* addEventListener      : Attaches an event to the element.
* removeEventListener   : Detaches an event to the element.
**********************************************************/
function XBElement(obj) {
	if (typeof(obj) == "string")
		obj = document.getElementById(obj);

	if (obj == document)
		return;

	this.element = obj;
	this.id = obj.id;
	this.type = "XBElement";
	this.tagName = obj.tagName;
	this.className = obj.className;
	this.style = obj.style;
	this.left = getObjStylePropertyValue(obj, "left");	
	this.top = getObjStylePropertyValue(obj, "top");
	this.pageX = getObjPageX(obj);
	this.pageY = getObjPageY(obj);
	this.offsetLeft = obj.offsetLeft;
	this.offsetTop = obj.offsetTop;
	this.offsetWidth = obj.offsetWidth;
	this.offsetHeight = obj.offsetHeight;
	this.offsetParent = obj.offsetParent;
	this.setAttribute = function(attr, val) { eval("this." + attr + " = val"); }
	this.getAttribute = function(attr) { return eval("this." + attr); }
	this.getParentElement = function() { return (obj.parentNode != null)?(new XBElement(obj.parentNode)):(null); }
	this.getFirstChild = function() { return (obj.firstChild != null)?(new XBElement(obj.firstChild)):(null); }
	this.getLastChild = function() { return (obj.lastChild != null)?(new XBElement(obj.lastChild)):(null); }
	this.getPreviousSibling = function() { return (obj.previousSibling != null)?(new XBElement(obj.previousSibling)):(null); }
	this.getNextSibling = function() { return (obj.nextSibling != null)?(new XBElement(obj.nextSibling)):(null); }
	this.getChildElements = function() {
		var childrenElements = new Array();

		for (var i = 0; i < obj.childNodes.length; i++) {
			childrenElements[i] = new XBElement(obj.childNodes[i]);
		}

		return childrenElements;
	}
	this.getStyleClass = function() { return obj.className; }
	this.setStyleClass = function(newClass) { obj.className = newClass; }
	this.getStylePropertyValue = function(property) {
		return getObjStylePropertyValue(this.element, property);
	}
	this.setStylePropertyValue = function(property, value) {
		setObjStylePropertyValue(this.element, property, value);
	}
	this.getInnerHTML = function() { return obj.innerHTML; }
	this.setInnerHTML = function(html) { obj.innerHTML = html; }
	this.addEventListener = function(eventType, eventListener) {
		addObjEventListener(this.element, eventType, eventListener);
	}
	this.removeEventListener = function(eventType, eventListener) {
		removeObjEventListener(this.element, eventType, eventListener);
	}
}

/**********************************************************
* XBEvent Class
*
* Read-Only Attributes:
* event         : The original event object.
* type          : The event type.
* target        : A reference to the target object to which the event was originally dispatched.
* currentTarget : A reference to the currently registered target element.
* relatedTarget : A reference to indentify a secondary target element.
* eventPhase    : Indicates the current event phase.
* bubbles       : Boolean value to indicate if the event is bubbling.
* cancelable    : Boolean value to indicate if the default action can be prevented.
* timeStamp     : Timstamp at which the event was created.
* screenX       : Horizontal coordinate relative to the screen.
* screenY       : Vertical coordinate relative to the screen.
* clientX       : Horizontal coordinate relative to the client/browser visible area.
* clientY       : Vertical coordinate relative to the client/browser visible area.
* pageX         : Horizontal coordinate relative to the page.
* pageY         : Vertical coordinate relative to the page.
* ctrlKey       : Boolean value to indicate if <ctrl> key was pressed.
* shiftKey      : Boolean value to indicate if <shift> key was pressed.
* altKey        : Boolean value to indicate if <alt> key was pressed.
* metaKey       : Boolean value to indicate if meta key was pressed.
* keyCode       : A numeric value to represent the key tha was pressed.
*
* Methods:
* button          : Indicates which mouse button was pressed during the event.
* stopPropagation : Stops the event from propagating along the DOM.
* preventDefault  : Cancels the default action of the event, only if it is cancelable.
**********************************************************/
function XBEvent(e) {
	this.AT_TARGET = 1;
	this.BUBBLING_PHASE = 2;
	this.CAPTURING_PHASE = 3;
	this.LEFT = 0;
	this.MIDDLE = 1;
	this.RIGHT = 2;
	this.event = e;

	// DOM2 InterfaceEvent
	this.type = (isIE)?(e.type):(e.type);
	this.target = XBEvent_getTarget(e);
	this.currentTarget = XBEvent_getCurrentTarget(e);
	this.eventPhase = (isIE)?(0):(e.eventPhase);
	this.bubbles = (isIE)?(e.cancelBubble):(e.bubbles);
	this.cancelable = (isIE)?((e.returnValue)?(e.returnValue):(false)):(e.cancelable);
	this.timeStamp = (isIE)?(new Date().getTime()):(e.timeStamp);
	this.stopPropagation = function() {
		if (isIE)
			e.cancelBubble = true;
		else
			e.stopPropagation();
	}
	this.preventCapture = function() {
		if (isIE)
			e.returnValue = false;
		else
			e.preventCapture();
	}
	this.preventDefault = function() {
		if (this.cancelable) {
			if (isIE)
				e.returnValue = false;
			else
				e.preventDefault();
		}
	}

	// DOM2 MouseEvent
	this.screenX = e.screenX;
	this.screenY = e.screenY;
	this.clientX = e.clientX;
	this.clientY = e.clientY;
	this.pageX = e.clientX + getPageXOffset();
	this.pageY = e.clientY + getPageYOffset();
	this.ctrlKey = e.ctrlKey;
	this.shiftKey = e.shiftKey;
 	this.altKey = e.altKey;
 	this.metaKey = (isIE)?(0):(e.metaKey);
 	if (this.type.indexOf("mouse") != -1) {
 		this.button = function() {
 			if (isIE) {
 				switch(e.button) {
 					case 1:
 						return this.LEFT;
 					case 2:
 						return this.RIGHT;
 					case 4:
 						return this.MIDDLE;
 					default:
 						return -1;
 				}
 			}
 			else {
				return e.button;
 			}
 		}
 	}
 	else if (this.type.indexOf("click") != -1) {
 		this.button = function() { return this.LEFT; }
 	}
 	this.relatedTarget = XBEvent_getRelatedTarget(e);

 	// IE Specific AddOn
 	this.keyCode = (isIE)?(parseInt(e.keyCode)):(parseInt(e.which));
}

function XBEvent_getTarget(e) {
	var result = null;

	if (isIE) {
		result = e.srcElement;
	}
	else {
		var node = e.target;
		if (node) {
		    while (node.nodeType != 1)
		        node = node.parentNode;
		    result = node;
	    }
	}

	if (result != null)
		return result;
	else
		return null;
}

function XBEvent_getCurrentTarget(e) {
	var result = null;

	if (isIE) {
		if (e.type.indexOf("mouseover") != -1)
			result = e.toElement;
		else if (e.type.indexOf("mouseout") != -1)
			result = e.fromElement;
	}
	else {
		result = e.currentTarget;
	}

	if (result != null)
		return result;
	else
		return null;

}

function XBEvent_getRelatedTarget(e) {
	var result = null;

	if (isIE) {
		if (e.type.indexOf("mouseover") != -1)
			result = e.fromElement;
		else if (e.type.indexOf("mouseout") != -1)
			result = e.toElement;
	}
	else {
		result = e.relatedTarget;
	}

	if (result != null)
		return result;
	else
		return null;
}

/**********************************************************
* Event Utils
**********************************************************/

function addObjEventListener(obj, eventType, eventListener) {
	// Disable event capturing, since IE doesn't support event capture
	var useCapture = false;
	var eventStart = "obj.on" + eventType.toLowerCase() + " = eventListener";

	if (obj.addEventListener) {
		obj.addEventListener(eventType, eventListener, useCapture);
	}
	else if (obj.attachEvent) {
		obj.attachEvent("on" + eventType, eventListener);
	}
	else {
		eval(eventStart);
	}
}

function removeObjEventListener(obj, eventType, eventListener) {
	// Disable event capturing, since IE doesn't support event capture
	var useCapture = false;
	var eventStop = "obj.on" + eventType.toLowerCase() + " = null";

	if (obj.removeEventListener) {
		obj.removeEventListener(eventType, eventListener, useCapture);
	}
	else if (obj.detachEvent) {
		obj.detachEvent(eventType, eventListener);
  	}
	else {
		eval(eventStop);
	}
}

/**********************************************************
* CSS Style Utils
**********************************************************/

///////////////////////////////////////////////////////////
// Given a DOM element and one of its style properties,
// returns the current style property value.
///////////////////////////////////////////////////////////
function getObjStylePropertyValue(obj, property) {
	var result = null;

	if (obj != null && obj != document) {
		if (isIE) {
			property = toJSPropertyName(property);
			result = obj.currentStyle.getAttribute(property);
		}
		else if (isNS) {
			if (obj.nodeName.indexOf("text") == -1) {
				result = obj.ownerDocument.defaultView.getComputedStyle(obj, "").getPropertyValue(property);
			}
		}
	}

	return result;
}

///////////////////////////////////////////////////////////
// Sets a style property value to a given DOM element.
///////////////////////////////////////////////////////////
function setObjStylePropertyValue(obj, property, value) {
	property = toJSPropertyName(property);
	eval("obj.style." + property + " = value");
}

///////////////////////////////////////////////////////////
// Returns the horizontal position of a given DOM element 
// relative to the page.
///////////////////////////////////////////////////////////
function getObjPageX(obj) {
	var num = 0;

	if (obj != document) {
		for (var p = obj; p && p.tagName != "BODY"; p = p.offsetParent)
			num += p.offsetLeft;
	}

	return num;
}

///////////////////////////////////////////////////////////
// Returns the vertical position of a given DOM element 
// relative to the page.
///////////////////////////////////////////////////////////
function getObjPageY(obj) {
	var num = 0;

	if (obj != document) {
		for (var p = obj; p && p.tagName != "BODY"; p = p.offsetParent)
			num += p.offsetTop;
	}
	return num;
}

///////////////////////////////////////////////////////////
// Returns the client/browser visible width in pixels.
///////////////////////////////////////////////////////////
function getClientWidth(winRef) {
	if (arguments.length == 0)
		winRef = window;
	
	var doc = winRef.document;
	var width = 0;
	if (isIE)
		width = doc.documentElement.clientWidth;
	else if (isNS)
		width = winRef.innerWidth;


	return width;
}

///////////////////////////////////////////////////////////
// Returns the client/browser visible height in pixels.
///////////////////////////////////////////////////////////
function getClientHeight(winRef) {
	if (arguments.length == 0)
		winRef = window;

	var doc = winRef.document;
	var height = 0;

	if (isIE)
		height = doc.documentElement.clientHeight;
	else if (isNS)
		height = winRef.innerHeight;

	return height;
}

///////////////////////////////////////////////////////////
// Returns the page width in pixels.
///////////////////////////////////////////////////////////
function getPageWidth(winRef) {
	if (arguments.length == 0)
		winRef = window;

	var doc = winRef.document;
	var width = 0;

	if (isIE)
		width = doc.body.scrollWidth;
	else if (isNS)
		width = doc.width;

	return width;
}

///////////////////////////////////////////////////////////
// Returns the page height in pixels.
///////////////////////////////////////////////////////////
function getPageHeight(winRef) {
	if (arguments.length == 0)
		winRef = window;

	var doc = winRef.document;
	var height = 0;

	if (isIE)
		height = doc.body.scrollHeight;
	else if (isNS)
		height = doc.height;

	return height;
}

///////////////////////////////////////////////////////////
// Returns the amount of content that has been hidden 
// by scrolling to the right.
///////////////////////////////////////////////////////////
function getPageXOffset(winRef) {
	if (arguments.length == 0)
		winRef = window;

	var doc = winRef.document;
	var offset = 0;

	if (isIE)
		offset = doc.documentElement.scrollLeft;
	else if (isNS)
		offset = winRef.pageXOffset;

	return offset;
}

///////////////////////////////////////////////////////////
// Returns the amount of content that has been hidden 
// by scrolling down.
///////////////////////////////////////////////////////////
function getPageYOffset(winRef) {
	if (arguments.length == 0)
		winRef = window;

	var doc = winRef.document;
	var offset = 0;

	if (isIE)
		offset = doc.documentElement.scrollTop;
	else if (isNS)
		offset = winRef.pageYOffset;

	return offset;
}

///////////////////////////////////////////////////////////
// Converts a style property in CSS format to JavaScript
// format. (e.g. background-color  --> backgroundColor)
///////////////////////////////////////////////////////////
function toJSPropertyName(property) {
	while (property.lastIndexOf("-") != -1) {
		var dashPos = property.lastIndexOf("-");
		var upChar = property.charAt(dashPos + 1).toUpperCase();
		property = property.substring(0, dashPos) + upChar + property.substring(dashPos + 2);
	}
	return property;
}

/**********************************************************
* IFrame Utils
**********************************************************/

///////////////////////////////////////////////////////////
// Returns the window reference of an IFRAME by its ID.
// IE handles the content in an IFRAME in a special 
// attribute called "contentWindow".
///////////////////////////////////////////////////////////
function getIFrameById(iframeID, winRef) {
	if (arguments.length == 1)
		winRef = window;

	var doc = winRef.document;	
	var iframeElement = doc.getElementById(iframeID);

	if (iframeElement != null && iframeElement.contentWindow)
		return iframeElement.contentWindow;
	else
		return iframeElement;
}

///////////////////////////////////////////////////////////
// Returns the document reference of an IFRAME by its ID.
// IE handles the document in an IFRAME in a special 
// attribute called "contentDocument".
///////////////////////////////////////////////////////////
function getIFrameDocumentById(iframeID, winRef) {
	if (arguments.length == 1)
		winRef = window;
	
	var iframeDoc = null;
	var iframeObj = getIFrameById(iframeID, winRef);

	if (iframeObj != null && iframeObj.contentDocument) {
		iframeDoc = iframeObj.contentDocument;
	}
	else if (iframeObj != null && iframeObj.document) {
		iframeDoc = iframeObj.document;
	}

	return iframeDoc;
}

/**********************************************************
* Debug Utils
**********************************************************/

///////////////////////////////////////////////////////////
// Given any object, output its content in the following
// format:
//    attribute:::value<end>
///////////////////////////////////////////////////////////
function inspect(obj) {
	var output = "";

	if (obj == null) {
		return null;
	}
	else if (typeof(obj) == "string") {
		return obj;	
	}
	else {
		for (var i in obj) {
			if (typeof(obj[i]) != "unknown" && typeof(obj[i]) != "undefined")
				output += i + " ::: " + obj[i] + "<end>\n";
			else if (typeof(obj[i]) == "unknown")
				output += i + " ::: unknown<end>\n";
			else
				output += i + " ::: undefined<end>\n";
		}
		return output;
	}
}

///////////////////////////////////////////////////////////
// Given a DOM element, output its style properties and
// values in the following format:
//    attribute:::value<end>
// Can be used in conjunction with debugDialog:
//    debugDialog(insepect(obj));
///////////////////////////////////////////////////////////
function inspectStyle(obj) {
	var output = "";

	if (obj.style) {
		for (var i in obj.style) {
			if (typeof(obj.style[i]) != "unknown" && typeof(obj.style[i]) != "undefined")
				output += i + " ::: " + obj.style[i] + "<end>\n";
			else if (typeof(obj[i]) == "unknown")
				output += i + " ::: unknown<end>\n";
			else
				output += i + " ::: undefined<end>\n";
		}
	}
	else {
		output += "Error: style is undefined in this object.";
	}

	return output;
}

///////////////////////////////////////////////////////////
// Shows the mouse status information in window status bar.
///////////////////////////////////////////////////////////
function showMouseMoveStatus(isEnable) {
	if (isEnable) {
		addObjEventListener(document, "mousemove", XBDebug_mouseMoveListener);
	}
	else {
		removeObjEventListener(document, "mousemove", XBDebug_mouseMoveListener);
	}
}

///////////////////////////////////////////////////////////
// Event handler of showMouseMoveStatus.
// For internal use only.
///////////////////////////////////////////////////////////
function XBDebug_mouseMoveListener(evt) {
	var e = new XBEvent(evt);
	var mouseStatus = "Mouse Status:";
	mouseStatus += " ClientX: " + e.clientX;
	mouseStatus += " ClientY: " + e.clientY;
	mouseStatus += " PageX: " + e.pageX;
	mouseStatus += " PageY: " + e.pageY;
	mouseStatus += " ScreenX: " + e.screenX;
	mouseStatus += " ScreenY: " + e.screenY;
	window.status = mouseStatus;
}

/**********************************************************
* Modal Dialog Utils
**********************************************************/

///////////////////////////////////////////////////////////
// Open an UTF-8 modal dialog
///////////////////////////////////////////////////////////
function openModalDialog(url, width, height, scrolling, args) {
	var features = "";
	var dialogName = (new Date()).getMilliseconds().toString();
	var dialogWidth = width;
	var dialogHeight = height;
	var dialogArgs = new Object();
	var returnValue = null;

	for (i in args) {
		dialogArgs[i] = args[i];
	}

	dialogArgs.timeout = false;
	if (isIE && !isOpera) {
		features = "dialogWidth: " + dialogWidth + "px; dialogHeight: " + dialogHeight + "px; center; status: no; help: no;";
		features += (scrolling)?(" scroll: yes;"):(" scroll: no;");
		returnValue = window.showModalDialog(url, dialogArgs, features);
		if (dialogArgs.timeout == true) {
			top.close();
		}
		return returnValue;
	} else if(isOpera) {
		
		window.returnValue = null;
		for (i in args) {
			alert(args[i]);
		}
		if (window.returnValue != null)
			return window.returnValue;
	} else {
		dialogWidth = (dialogWidth - 20 <= 0)?(dialogWidth):(dialogWidth - 20);
		dialogHeight = (dialogHeight - 20 <= 0)?(dialogHeight):(dialogHeight - 20);
		var posX = window.screenX + ((window.outerWidth - parseInt(dialogWidth)) / 2);
		var posY = window.screenY + ((window.outerHeight - parseInt(dialogHeight)) / 2);
		window.dialogArguments = dialogArgs;
		features = "screenX=" + posX + ", screenY=" + posY + ", width=" + dialogWidth + "px, height=" + dialogHeight + "px, modal=yes, sidebars=no, menubars=no";
		features += (scrolling)?(", scrollbars=yes"):(", scrollbars=no");
		window.returnValue = null;
		window.open(url, dialogName, features);

		if (window.returnValue != null)
			return window.returnValue;
	}
}

///////////////////////////////////////////////////////////
// Adjusts the size of the modal dialog to fit the content.
///////////////////////////////////////////////////////////
function autoResizeModalDialog() {
	var hiddenWidth = getPageWidth() - getClientWidth();
	var hiddenHeight = getPageHeight() - getClientHeight();
	if (isIE) {
		window.dialogWidth = parseInt(window.dialogWidth) + hiddenWidth + -15 + "px";
		window.dialogHeight = parseInt(window.dialogHeight) + hiddenHeight - 15  + "px";
		
	}
	else if (isNS) {
		window.sizeToContent();
	}
}

/** END OF XBUtil **********************************************************/


/****************************************************************************
* Open a new window.
*
* url - The URL of the help file.
* windowName - The title of the window.
* offset     - The offset in pixels from the parent window
* features   - The various attributes of the window to be created.
*
* Returns the opened window
****************************************************************************/
function openWindow(url, windowName, offset, features)
{
  if (features == null)
    features = "resizable=yes,scrollbars=yes,menubar=yes, copyhistory=no";

  if (offset == null)
    offset = 0;

  offset += 20;

  if(navigator.appName == "Netscape")
  {
    if(parseInt(navigator.appVersion) > 3)
    {
      // set width and height
      if (features.indexOf(",width=") < 0)
        features += ",width=" + top.innerWidth + ",height=" + top.innerHeight;

      // set window position
      features += ",screenX=" + (top.screenX+offset) + ",screenY=" + (top.screenY+offset);
    }
    else
    {
      // set width and height
      if (features.indexOf(",width=") < 0)
        features += ",width=" + top.width + ",height=" + top.height;

      // set window position not available in version 3 and less
    }
  }// END if

  else
  {
    // set width and height
    if (features.indexOf(",width=") < 0)
    {
      var width=",width=", height=",height=";

      if (screen.width < 750)
        width += screen.availWidth;
      else
        width += "750";

      if (screen.height < 500)
        height += screen.availHeight;
      else
        height += "500";
      features += width + height;
    }

    // No way to query current window position in IE...
    // features += ",left=" + (screen.availLeft+offset) + ",top=" + (screen.availTop+offset);
    features += ",screenLeft=" + (screen.availLeft+offset) + ",screenTop=" + (screen.availTop+offset);

  }// END else

  var target = window.open( "", windowName, features);

  target.location.href = url;
  // focus function is not working under IE4 with Service pack 2
  // it will crash, we need to detect the specific IE version 'MSIE 4.01' - d48999
  // we only use focus() function for all browser except IE 4.01
  var navVersion = navigator.appVersion
  if ( navVersion.indexOf("MSIE 4.01") == -1 )
  {
    target.focus();
  }

  return target;

}// END openWindow

/****************************************************************************
* Determines whether an object has been assigned a value.
*
* Returns TRUE if it has been assigned a value; FALSE otherwise
****************************************************************************/
function defined(obj)
{
  var str = typeof obj;

  if((str == "undefined") || (obj == null))
    return false;
  else
    return true;
}// END defined

/****************************************************************************
* Returns the type of object.
****************************************************************************/
function objectType(obj)
{
 //
 // alert( "The function Util::objectType() is deprecated!"
 //      + "It fails in IE and thus must not be used.\n\n"
 //      + "If you see this message open a defect immediately.");

  var constructor = (String)(obj.constructor);
  var tokens = constructor.split(" ");

  for(var i=0; i<tokens.length; i++)
  {
    if(tokens[i].indexOf("function") != -1)
    {
      var end = tokens[i+1].indexOf("(");

      if(end == -1)
        return(tokens[i+1]);
      else
        return(tokens[i+1].substring(0, end));
    }
  }

}// END objectType

/****************************************************************************
* Trim the leading and trailing blank of the input string 'word'
*
* Returns a string
****************************************************************************/
function trim(inword)
{
   if(inword!=undefined && inword!=null)
   {
	   word = inword.toString();
	   var i=0;
	   var j=word.length-1;
	   while(word.charAt(i) == " ") i++;
	   while(word.charAt(j) == " ") j--;
	   if (i > j) {
			return word.substring(i,i);
		} else {
			return word.substring(i,j+1);
		}
	   
   }
   
}

/****************************************************************************
* Check if the input string 'id' is empty
*
* Returns true or false
****************************************************************************/
function isInputStringEmpty(id)
{
  return !id.match(/[^\s]/);
}


/****************************************************************************
* This will alert the user with the error/warning message 'message' and
* highlight the text field 'field'.
*
*
****************************************************************************/
function reprompt(field, message) {
    window.status = "";
    alertDialog(message);
    field.focus();
    field.select();

}

/****************************************************************************
* This will remove the Return \r \n chars from a string and
* replace them by " " char.
*
*
****************************************************************************/
function removeReturnChar(word)
{
   var i=0;
   var j=word.length;
   var result="";

   for (i=0; i<j; ++i) {
      if((word.charAt(i) == "\r") || (word.charAt(i) == "\n" )) {
         result += " ";
      } else {
         result += word.charAt(i);
      }
   }

   return result;
}


/**************************************************************************
* This will return the index position that a char in a given string
* return "false" if couldn't found, otherwise it returns the first invalid
* character.
*
***************************************************************************/
function find(givenString, searchChars)
{
  for ( var i=0; i< searchChars.length; i++)
  {
   var achar = searchChars.substring(i, i+1);

   if ( givenString.indexOf(achar) != -1 )
     return achar;
  }
   return "false";
}

/*********************************************************************
* Return the number of occurrence of a given char
**********************************************************************/
function numOfOccur(givenString, searchChars)
{
  var count = 0;

  for (var i=0; i< givenString.length; i++)
  {
     if ( givenString.charAt(i) == searchChars.charAt(0) )
       count ++;
  }

  return count;
}


function convertFromTextToHTML(obj)
{
   var string = new String(obj);
   var result = "";

   for (var i=0; i < string.length; i++ ) {
      if (string.charAt(i) == "<")       result += "&lt;";
      else if (string.charAt(i) == ">")  result += "&gt;";
      else result += string.charAt(i);
   }
   return result;
}

function convertFromHTMLToText(obj)
{
   /* add some padding to the string so we don't
      require bounds checking */
   var string = new String(obj + "_____");
   var result = "";

   for (var i=0; i < string.length; ) {
      if (string.charAt(i) == "&") {
         if (string.substring(i, i+4) == "&lt;") {
            result += "<";
            i += 4;
         }
         else if (string.substring(i, i+4) == "&gt;") {
            result += ">";
            i += 4;
         }
         else {
            result += string.charAt(i);
            i++;
         }
      }
      else {
         result += string.charAt(i);
         i++;
      }
   }
   return result.substring(0, result.length-5);
}


function isEmpty(id) {
	if (typeof(id) == "string") {
		return !id.match(/[^\s]/);
	}
	else {
		return (id)?(false):(true);
	}
}


//////////////////////////////////////////////////////////
// This function will check whether or not the time has
// a valid format. hh:mm
//
// by Tony Mao
// Input: time
// Return code = "true", time has a right format
// Return code = "false", time format is wrong
//
//////////////////////////////////////////////////////////
function validTime(time1) {
   var delimiter = ":";
   var hh, mm;
   var time1Length;
   var hhlength;
   var mmlength;

   time1Length = time1.length;

   if (time1 == "" || time1.indexOf(delimiter) == -1 ||  time1Length > 5 ) return false;

   hh = time1.substring(0,time1.indexOf(delimiter));
   mm = time1.substring(time1.indexOf(delimiter) + 1);

   hhlength = hh.length;
   mmlength = mm.length;

   if (hhlength <1 || hhlength >2 || mmlength <1 || mmlength >2) return false;
   if (hh=="" || mm == "" ) return false;
   if (isNaN(hh) || isNaN(mm) ) return false;

   if ( parseInt(hh) > 23 || parseInt(hh) < 0 ) return false;
   if ( parseInt(mm) > 59 || parseInt(mm) < 0 ) return false;

   return true;
}


//////////////////////////////////////////////////////////
// This function will limit a text area input box to a
// specified size.  just use the onKeyUp and onKeyDown events
// with the text area box.
// call with ::
//    arg1=this.form.<myTextAreaName>
//    arg2=<maximumSizeForTextArea>
// by Glen Shortliffe
//////////////////////////////////////////////////////////
function limitTextArea(field, maxlimit) {
    if (field.value.length > maxlimit) {
       //  field is too long... chop it down
       field.value = field.value.substring(0, maxlimit);
    }
}


//////////////////////////////////////////////////////////
// This function will validate a typical name field
// and restrict it to pretty much alphanumerics.
// All special characters are invalid with some exceptions
// " ", "-", "_", and "." are all valid
// The string can also not start with a leading number
// The string can also not be empty
// call with ::
//    arg1=<myInputString>
//
// return true is name is valid, false otherwise
// by Glen Shortliffe
//////////////////////////////////////////////////////////
function isValidName(myString) {
    var invalidChars = "~!@#$%^&*()+=[]{};:,<>?/|`"; // invalid chars
    invalidChars += "\t\'\"\\"; // escape sequences
    var invalidStartChars = "0123456789";

    // if the string is empty it is not a valid name
    if (isEmpty(myString)) return false;

    // look for presence of invalid characters.  if one is
    // found return false.  otherwise return true
    for (var i=0; i<myString.length; i++) {
      if (invalidChars.indexOf(myString.substring(i, i+1)) >= 0) {
        return false;
      }
    }

    // look for a leading number... and disallow it.
    var startChar = myString.substring(0,1);
    for (var i=0; i<invalidStartChars.length; i++) {
      if (invalidStartChars.indexOf(startChar) >= 0) {
        return false;
      }
    }

    return true;
}

//////////////////////////////////////////////////////////
// This function will dump out the content of a javascript object
// This is useful for debugging purposes.
// In your code you can do this:
// alert(dumpObject(myBigFatObject));
//
// This will dump out the objects contents
// arg1 = the object you want info on...
// return a string which you can send to alert()
// by Glen Shortliffe
//////////////////////////////////////////////////////////
function dumpObject(what) {
   var output = '';
   for (i in what) {
       if (typeof what[i] == 'object') {
           output += dumpObject(what[i]);
       }
       else
           output += i + ' = ' + what[i] + '\n';
   }
   return output;
}

// function to clone a javascript object
function cloneObject(what) {
    for (i in what) {
       if (typeof i == 'object') {
          this[i] = new cloneObject(what[i]);
       }
       else {
          this[i] = what[i];
       }
    }
}

//////////////////////////////////////////////////////////
// This function will validate a positive integer quantity (including 0)
//
// arg1 = the object you want info on...
// Return true is this input arg is a valid positive int,
// otherwise return false...
//
//////////////////////////////////////////////////////////
function isValidPositiveInteger(myString) {
    var validChars = "0123456789";

    // if the string is empty it is not a valid integer
    if (isEmpty(myString)) return false;

    // look for non numeric characters in the input string
    for (var i=0; i<myString.length; i++) {
      if (validChars.indexOf(myString.substring(i, i+1)) == "-1") {
        return false;
      }
    }
    // look for bad leading zeroes in the input string
    if (myString.length > 1 && myString.substring(0,1) == "0") {
       return false;
    }

    return true;
}

//////////////////////////////////////////////////////////
// This function will validate a positive integer quantity (excluding 0)
//
// arg1 = the object you want info on...
// Return true is this input arg is a valid positive int,
// otherwise return false...
//
//////////////////////////////////////////////////////////
function isValidNZPosInt(myString) {
    var validChars = "0123456789";

    // if the string is empty it is not a valid integer
    if (isEmpty(myString)) return false;

    // look for non numeric characters in the input string
    for (var i=0; i<myString.length; i++) {
      if (validChars.indexOf(myString.substring(i, i+1)) == "-1") {
        return false;
      }
    }
    // look for bad leading zeroes in the input string
    if (myString.substring(0,1) == "0") {
       return false;
    }

    return true;
}

//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-8 string
// arg2 = the maximum number of bytes allowed in your input field
// Return false is this UTF-8 string is larger then arg2
// Otherwise return true...
//////////////////////////////////////////////////////////
function isValidUTF8length(UTF8String, maxlength) {
    // alert('UTF8String='+UTF8String+'\nUTF-8 length='+utf8StringByteLength(UTF8String)+'\nmaxlength='+maxlength);
    if (utf8StringByteLength(UTF8String) > maxlength) return false;
    else return true;
}

//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-8 string you want a byte count of...
// Return the integer number of bytes represented by the string
//////////////////////////////////////////////////////////
function utf8StringByteLength(UTF8String) {
  if (UTF8String === null) return 0;
  var str = String(UTF8String);
  var oneByteMax = 0x007F;
  var twoByteMax = 0x07FF;
  var byteSize = str.length;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    if (chr > oneByteMax) byteSize = byteSize + 1;
    if (chr > twoByteMax) byteSize = byteSize + 1;
  }
  return byteSize;
}

/**********************************************************
* Globalized Modal Dialogs
**********************************************************/
function alertDialog(sMsg, storeId, catalogId,langId)
{
	if (typeof(sMsg) == "undefined")
		sMsg = "undefined";

	var dialogArgs = new Array();
	dialogArgs.message = sMsg;
	
	var url = "AlertView?storeId="+storeId+"&catalogId="+catalogId+"&langId="+langId;
	
	openModalDialog(url, 375, 140, true, dialogArgs);		
}
