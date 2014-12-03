/****** This JavaScript file is used to manipulate HTML content on the client side *****/
/****** Copyright by QTek                                                          *****/
/****** Creation Date: May 30th, 2007                                              *****/

var qtek_dhtml = {
    language:null, initialized:false,
    isMinNS4:false, isMinIE4:false, isIE4:false, isMinIE5:false, isMinIE55:false, isMinIE6:false, isOpera:false, isMinOpera5:false, isMinOpera6:false, isMinOpera9:false,
    markX:0, markY:0, mouseX:0, mouseY:0, windowWidth:0, windowHeight:0, rootUrl:null,
    
    init:function(lang)
    {
        if (this.initialized) return;
        this.language = (lang  ? lang : "EN");
        this.isMinNS4 = (navigator.appName.indexOf("Netscape")>=0 && parseFloat(navigator.appVersion)>=4) ? true : false;
        this.isMinIE4 = (document.all) ? true : false;
        this.isIE4 = (this.isMinIE4 && navigator.appVersion.indexOf("MSIE 4.") >= 0) ? true : false;
        this.isMinIE5 = (this.isMinIE55 || (this.isMinIE4 && navigator.appVersion.indexOf("MSIE 5.")>=0)) ? true : false;
        this.isMinIE55= (this.isMinIE6 || (this.isMinIE4 && navigator.appVersion.indexOf("MSIE 5.5")>=0)) ? true : false;
        this.isMinIE6 = (this.isMinIE4 && navigator.appVersion.indexOf("MSIE 6.")>=0) ? true : false;        
        this.isOpera = (navigator.appName.toLowerCase().indexOf("opera")!=-1) ? true : false;
        this.isMinOpera5 = (this.isOpera && parseFloat(navigator.appVersion)>= 5)? true : false;
        this.isMinOpera6 = (this.isOpera && parseFloat(navigator.appVersion)>= 6)? true : false;
        this.isMinOpera9 = (this.isOpera && parseFloat(navigator.appVersion)>= 9)? true : false;
        
        if (typeof(window.innerWidth) == "number")
        {
	        this.windowWidth = window.innerWidth;
	        this.windowHeight = window.innerHeight;
        }
        else 
        {
	        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) //IE 6+ in 'standards compliant mode'
	        {
		        this.windowWidth = document.documentElement.clientWidth;
		        this.windowHeight = document.documentElement.clientHeight;
	        } 
	        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) //IE 4 compatible
	        {
		        this.windowWidth = document.body.clientWidth;
		        this.windowHeight = document.body.clientHeight;
            }
        }
        
        if (this.isMinNS4) 
        {
            document.captureEvents(Event.MOUSEMOVE);
            document.captureEvents(Event.CLICK);
        }
        document.onmousemove = this.getMousePosition;
        //document.onclick = this.getMouseClickPosition;//<<<<<<<An removed

        if (this.isMinIE55 && document.body.filters)
        {
            for(var i=0; i<document.images.length; i++)
            {
                var img = document.images[i];
                var imgName = img.src.toUpperCase();
                if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
                {
                    var imgID = (img.id) ? "id='" + img.id + "' " : "";
                    var imgClass = (img.className) ? "class='" + img.className + "' " : "";
                    var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
                    var imgStyle = "display:inline-block;" + img.style.cssText ;
                    if (img.align == "left") imgStyle = "float:left;" + imgStyle;
                    if (img.align == "right") imgStyle = "float:right;" + imgStyle;
                    if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                    var strNewHTML = "<span " + imgID + imgClass + imgTitle
                                    + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                                    + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"; 
                    img.outerHTML = strNewHTML;
                    i = i-1;
                }
            }
        }

        this.initialized = true;
        //alert("qtek_dhtml.init() called");
    }, //END init function
    
    /***** Common Methods *****/
    getElementById:function(elemId)
    {
	    if (typeof(elemId) == "object" || elemId.style) return elemId;	
	    if (document.getElementById) return document.getElementById(elemId);
	    else if (document.all) return document.all[elemId];
	    else if (document.layers) return document.layers[elemId];	
	    return null;
    }, //END getElementById function
    getArrayItemIndex:function(array, item)
    {
        if (array != null && array.length > 0)
        {
            for(var i = 0; i < array.length; i++)
            {
                if (array[i].toString() == item.toString()) return i;
            }
        }
        return -1;
    }, //END getArrayItemIndex function
    trim:function(input) 
    {
        if (typeof(input) == "object")
        {
            input.value = this.trim(input.value);
            return input.value;
        }
	    var startpos = 0, endpos = input.length - 1;
	    if (endpos == -1) return input;
	    while (startpos <= input.length && input.substring(startpos, startpos + 1) == " ") startpos++; 
	    while (endpos >= 0 && input.substring(endpos, endpos + 1) == " ") endpos--; 
	    if (startpos > endpos) return "";
	    else return input.substring(startpos, endpos + 1);
    }, //END trim function
    getCultureCode:function()
    {
        var code = (this.language ? this.language : "EN");
        if (arguments.length > 0 && arguments[0]) code = arguments[0];
        if (code.toUpperCase() == "VI") return 1; //Vietnamese
        return 0; //English
    }, //END getCultureCode function
    isDigit:function(digit)
    {
	    var alldigit = new Array(0,1,2,3,4,5,6,7,8,9);
	    for (var i = 0; i < alldigit.length; i++) 
	    {
		    if (digit == alldigit[i]) return true;
	    }
	    return false;
    }, //END isDigit function
    isNumeric:function(value)
    {
	    value = this.trim(value);
	    if (value == "") return false;
	    var arrayChars = value.split("");
	    var i = 0;
	    if (arrayChars[0] == "-") i = 1;
	    for (i = i; i < arrayChars.length; i++)
	    {
		    if (!this.isDigit(arrayChars[i])) return false;
	    }	
	    return true;
    }, //END isNumeric function
    
    /***** Key Code/Event *****/
    getKeyCode:function(e)
    {
        var keyEvent = (e) ? e : (window.event ? window.event : null);
        if (keyEvent) return (keyEvent.charCode ? keyEvent.charCode : (keyEvent.keyCode? keyEvent.keyCode : (keyEvent.which ? keyEvent.which : 0)));
        return 0;
    }, //END getKeyCode function
    getKeyDown:function(e)
    {
        return js_getKeyCode(e);
    }, //END getKeyDown function
    
    /***** Mouse Event *****/
    getMousePosition:function(e)
    {
	    if (this.isMinNS4)
	    {
		    this.mouseX = e.pageX; 
		    this.mouseY = e.pageY;
	    }
	    else if(this.isMinIE4)
	    {
		    this.mouseX = window.event.clientX + (document.body == null ? 0 : document.body.scrollLeft);
		    this.mouseY = window.event.clientY + (document.body == null ? 0 : document.body.scrollTop);
	    }
	    return [this.mouseX, this.mouseY]
    }, //END getMousePosition function
    getMouseClickPosition:function(e)
    {
        if (this.isMinNS4)
        {
            this.markX = e.pageX; 
            this.markY = e.pageY;
        }
        if (this.isMinIE4)
        {
            this.markX = window.event.clientX + document.body.scrollLeft;
            this.markY = window.event.clientY + document.body.scrollTop;
        }
        return [this.markX, this.markY];
    }, //END getMouseClickPosition function
    
    /***** Document and Elment dimensions *****/
    getDocumentHeight:function(doc) 
    {
        var docHt = 0, sh, oh;
        if (doc.height) docHt = doc.height;
        else if (doc.body) 
        {
            if (doc.body.scrollHeight) docHt = sh = doc.body.scrollHeight;
            if (doc.body.offsetHeight) docHt = oh = doc.body.offsetHeight;
            if (sh && oh) docHt = Math.max(sh, oh);
        }
        return docHt;
    }, //END getDocumentHeight function
    getDocumentWidth:function(doc)
    {
        if (!doc) doc = window.document;
        return qtek_dhtml.getElementWidth(window.document.body);
    }, //END getDocumentWidth function
    getElementHeight:function(layer)
    {
        var pvHeight = -1 ;
	    if (typeof(layer) == "string") layer = this.getElementById(layer);	
	    if (this.isMinNS4 && navigator.appVersion.indexOf('4.') >= 0) pvHeight = layer.clip.height;
	    else 
	    {
		    if (this.isOpera && navigator.appVersion.indexOf('5.') >= 0) pvHeight = layer.style.pixelHeight;
		    else 
		    {
			    if (layer.offsetHeight) pvHeight = layer.offsetHeight;
			    else pvHeight = layer.style.height;
		    }
	    }
	    return pvHeight;			 
    }, //END getElementHeight function
    getElementWidth:function(layer) 
    {
        var pvWidth = -1 ;
	    if (typeof(layer) == "string") layer = this.getElementById(layer);
	    if (this.isMinNS4 && navigator.appVersion.indexOf('4.') >= 0) pvHeight = layer.clip.width;
	    else 
	    {
		    if (this.isOpera && navigator.appVersion.indexOf('5.') >= 0) pvWidth = layer.style.pixelWidth;
		    else 
		    {
			    if (layer.offsetWidth) pvWidth = layer.offsetWidth;
			    else pvWidth = layer.style.width;
		    }
	    }
	    return pvWidth;		
    }, //END getElementWidth function
    setLayerSize:function(layer, width, height)
    {
		
        var measureUnit = "";
        if (this.isMinNS4) measureUnit = "px";
	    if (typeof(layer) == "string") layer = this.getElementById(layer);	
		//alert(layer);
	    if (this.isMinNS4 && navigator.appVersion.indexOf(' 4.') >= 0) 
	    {			
			//alert(this.isMinNS4 + '  ' +navigator.appVersion);
		    layer.clip.width = width + measureUnit;
		    layer.clip.height = height + measureUnit;
	    } 
	    else 
	    {
			//alert('2');
		    if (this.isOpera && navigator.appVersion.indexOf('5.') >= 0) 
		    { 
			    layer.style.pixelWidth = width + measureUnit;
			    layer.style.pixelHeight = height + measureUnit;
		    } 
		    else 
		    {
			    layer.style.width = width + measureUnit;
			    layer.style.height = height + measureUnit;
		    }
	    }
    }, //END setLayerSize function
    
    
    //--------------------------------------------------------------------
    // setLayerMargin Function
    // Description: Set Margin for country div - Add by Nhung Pham_28/04/08
    //---------------------------------------------------------------------
    setLayerMargin:function(layer, mgLeft, mgTop)
    {
	    layer.style.marginLeft = mgLeft + "px";
	    layer.style.marginTop = mgTop + "px";
		  
    }, //END setLayerSize function
    
    
    setIframeHeight:function(iframeName, height)
    {
        var iframeWin = window.frames[iframeName];
        var iframeEl = document.getElementById ? document.getElementById(iframeName) : document.all ? document.all[iframeName] : null;
        if (iframeEl && iframeWin) 
        {
            iframeEl.style.height = "auto"; // helps resize (for some) if new doc shorter than previous  
            if (!height)
            {
                var docHt = this.getDocumentHeight(iframeWin.document);
                height = docHt + 30; // need to add to height to be sure it will all show
            }
            iframeEl.style.height = height + "px";
        }
    }, //END setIframeHeight function
    
    /***** Positioning *****/
    getScrollXY:function() 
    {
        var scrOfX = 0, scrOfY = 0;
        if (typeof(window.pageYOffset) == "number") //Netscape compliant
        {
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } 
        else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) //DOM compliant
        {
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } 
        else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) //IE6 standards compliant mode
        {
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    }, //END getScrollXY function
    getScreenCenterXY:function()
    {
	    var js_centerX = 0;
	    var js_centerY = 0;
	    if (this.windowWidth > 0 && this.windowHeight > 0)
	    {
		    var scrollXY = getScrollXY();
		    js_centerX = this.windowWidth / 2 + scrollXY[0];
		    js_centerY = this.windowHeight / 2 + scrollXY[1];
	    }
	    return [js_centerX, js_centerY]
    }, //END getScreenCenterXY function
    getLayerTopLeft:function(layer)
    {
        var positionLeft = positionTop = 0;
        if (typeof(layer) == "string") layer = this.getElementById(layer);
	    if (layer.offsetParent) 
	    {
		    positionLeft = layer.offsetLeft;
		    positionTop = layer.offsetTop;
		    while (layer = layer.offsetParent) 
		    {
			    positionLeft += layer.offsetLeft;
			    positionTop += layer.offsetTop;
		    }
	    }
	    return [positionLeft, positionTop];
    }, //END getLayerTopLeft function
    getLayerLeft:function(layer)
    {
	    var pvPos = this.getLayerTopLeft(layer);
	    if (pvPos) return pvPos[0];
	    return -1;
    }, //END getLayerLeft function
    getLayerTop:function(layer)
    {
	    var pvPos = this.getLayerTopLeft(layer);
	    if (pvPos) return pvPos[1];
	    return -1;
    }, //END getLayerTop function
    getLayerRight:function(layer)
    {
	    var pvRight = -1;
	    var pvLeft = this.getLayerLeft(layer);
	    var pvWidth = this.getElementWidth(layer);
	    if (pvLeft > -1 && pvWidth > -1) pvRight = pvLeft + pvWidth;
	    return pvRight;
    }, //END getLayerRight function
    getLayerBottom:function(layer)
    {
	    var pvBottom = -1;
	    var pvTop = this.getLayerTop(layer);
	    var pvHeight = this.getElementHeight(layer);
	    if (pvTop > -1 && pvHeight > -1) pvBottom = pvTop + pvHeight;
	    return pvBottom;
    }, //END getLayerBottom function
    isInArea:function(top, left, right, bottom, posX, posY)
    {
        if (posX <= right && posX >= left && posY >= top && posY <= bottom) return true;
        return false;
    }, //END isInArea function
    moveLayerTo:function(layer, x, y)
    {
        var measureUnit = "";
	    if (this.isMinNS4) measureUnit = "px";
	    if (typeof(layer) == "string") layer = this.getElementById(layer);	
	    if (document.layers) layer.moveTo(x, y);
	    else
	    {
		    layer.style.left = x + measureUnit;
		    layer.style.top = y + measureUnit;
	    }
    }, //END moveLayerTo function
    moveLayerBy:function(layer, dx, dy)
    {
	    var pvPos = this.getLayerTopLeft(layer);
	    if (pvPos)
	    {
		    pvPos[0] += dx;
		    pvPos[1] += dy;
		    this.moveLayerTo(layer, pvPos[0], pvPos[1]);
	    }
    }, //END moveLayerBy function
    moveLayerToX:function(layer, x)
    {
	    var pvPos = this.getLayerTopLeft(layer);
	    if (pvPos) this.moveLayerTo(layer, x, pvPos[1]);
    }, //END moveLayerToX function
    moveLayerToY:function(layer, y)
    {
	    var pvPos = this.getLayerTopLeft(layer);
	    if (pvPos) this.moveLayerTo(layer, pvPos[0], y);
    }, //END moveLayerToY function
    
    /***** Layer Visibility *****/
    showhideLayer:function(layer) //should add effect type in second argument
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (!layer) return;
        if (this.isVisible(layer)) this.hideLayer(layer);
        else this.showLayer(layer);
    }, //END showhideLayer function
    showLayer:function(layer)
    {
	    if (typeof(layer) == "string") layer = this.getElementById(layer);
	    layer.style.visibility = "visible";
	    layer.style.display = "block";
	    if (this.isMinNS4)
	    {
		    if (layer.visibility) layer.visibility = "show";
		    else if (layer.style.visibility) layer.style.visibility = "visible";
	    }
    }, //END showLayer function
    hideLayer:function(layer)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
	    layer.style.visibility = "hidden";
	    layer.style.display = "none";	
	    if (this.isMinNS4) 
	    {
		    if (layer.visibility) layer.visibility = "hide";
		    else if (layer.style.visibility) layer.style.visibility = "hidden";
	    }
    }, //END hideLayer function
    isVisible:function(layer)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (layer.style.visibility == "visible" || layer.style.display == "block" || layer.style.display == "inline") return true;
        return false;
    }, //END isVisible function
    
    /***** Style Changes *****/
    changeColor:function(layer, toColor)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (layer) layer.style.color = toColor;
    }, //END changeBgColor function
    changeBgColor:function(layer, toColor)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (layer) layer.style.backgroundColor = toColor;
    }, //END changeBgColor function
    changeBgImage:function(layer, toImageUrl)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (layer) layer.style.backgroundImage = toImageUrl;
    }, //END changeBgImage function
    changeCursor:function(layer, cursor)
    {
        if (typeof(layer) == "string") layer = this.getElementById(layer);
        if (layer) layer.style.cursor = cursor;
    }, //END changeCursor function

    /***** Image Swap *****/
    swapImage:function(img, src1, src2)
    {
        img = this.getElementById(img);
        if (!img) return;
        if (img.src.toLowerCase() == src1.toLowerCase()) img.src = src2;
        else img.src = src1;
    }, //END swapImage function
    setImage:function(img, src)
    {
        img = this.getElementById(img);
        if (!img) return;
        img.src = src;
    }, //END setImage function
    /***** End Image Swap *****/

    /***** Url Parameters *****/
    appendUrlParameter:function(url, name, value)
    {
        var pair = (arguments.length > 3 && !arguments[3] ? name + "=" + value : this.encodeUrlParameter(name, value));
        if (!url || url.length < 3) return pair;
        if (url.indexOf("?") < 0) return (url + "?" + pair);
        else if (url.indexOf("?") == (url.length-1)) return (url + pair);
        return (url + "&" + pair);
    }, //END appendUrlParameter function
    buildUrlParameter:function(list, name, value)
    {
        var pair = (arguments.length > 3 && !arguments[3] ? name + "=" + value : this.encodeUrlParameter(name, value));
        return (!list || list.length < 3 ? pair : (list + "&" + pair))
    }, //END buildUrlParameter function
    encodeUrlParameter:function(name, value)
    {
		return encodeURIComponent(name) + "=" + encodeURIComponent(value);
	}, //END encodeUrlParameter function
    encodeUrl:function(url)
    {
        var array = url.split('&');
		for (var i = 0; i < array.length; i++)
		{
			var nvpairs = array[i].split('=');
			if (nvpairs[0].indexOf('amp;') != -1)
				nvpairs[0] = nvpairs[0].substring(4);
				
			nvpairs[i] = this.encodeUrlParameter(nvpairs[0], nvpairs[1]);
		}
	    return array.join('&');
    }, //END encodeUrl function
    
    /***** Cookies *****/
    createCookie:function(name, value, days)
    {
	    var expire_option = "";
	    if (days)
	    {
	        var current_time = new Date();
	        current_time.setTime(current_time.getTime() + days*24*60*60*1000);
	        expire_option = "; expires=" + current_time.toGMTString();
	    }
	    document.cookie = name+"="+value + expire_option + "; path=/";
    }, //END createCookie function
    readCookie:function(name) 
    {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++)
	    {
		    var c = ca[i];
		    while (c.charAt(0)==' ') c = c.substring(1, c.length);
		    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	    }
	    return null;
    }, //END readCookie function
    deleteCookie:function(name) 
    {
	    this.createCookie(name, "", -1);
    }, //END deleteCookie function
    /***** End Cookies *****/
    
    /***** Parsing *****/
    parseCurrency:function(incurrency) //convert currency to a value in specific culture
    {
        var culture = this.getCultureCode(arguments[1]); //no problem if arguments[1] is null
	    var cents = 0, dollars = "";
        var cent_delim = (culture == 1 ? "," : ".");
        var dollar_delim = (culture == 1 ? "." : ",");
        var money_parts = incurrency.toString().split(cent_delim);
        if (money_parts.length > 1)
        {
            if (this.isNumeric(money_parts[1]) == false)
            {
                alert("invalid cent part in currency value " + incurrency);
                return false;
            }
            cents = parseInt(money_parts[1], 10);
        }
        money_parts = money_parts[0].toString().split(dollar_delim);
        for(var i = money_parts.length - 1; i >= 0; i--)
        {
            if (this.isNumeric(money_parts[i]) == false || (i > 0 && money_parts[i].length != 3))
            {
                alert("invalid dollar part in currency value " + incurrency);
                return false;
            }
            else dollars = money_parts[i] + "" + dollars;
        }
        return parseFloat((dollars == "" ? "0" : dollars) + "" + (cents > 0 ? "." + cents : ""));
    }, //end parseCurrency function

    /***** formats *****/
    prefixZeros:function(input, finallength) //left padding
    {
        input = this.trim(input.toString());
        while(input.length < finallength) input = "0" + input;
        return input;
    }, //end prefixzeros function
    formatCurrency:function(incurrency)
    {
        var value = this.parseCurrency(incurrency, arguments[1]);
        if (!value) return incurrency;
        
        var culture = this.getCultureCode(arguments[1]);
	    var cent_delim = (culture == 1 ? "," : ".");
        var dollar_delim = (culture == 1 ? "." : ",");    
	    var money_parts = value.toString().split(cent_delim);
	    var cents = (money_parts.length > 1 ? money_parts[1].toString() : "0");
	    var dollars = money_parts[0].toString();

	    value = "";
	    for(var i = 1; i <= dollars.length; i++)
	    {
	        value = dollars.charAt(dollars.length - i) + "" + value;
	        if (i % 3 == 0 && i < dollars.length)
	            value = dollar_delim + value;
	    }
	    return value + (parseInt(cents, 10) > 0 ? cent_delim + cents : "");
    } //end formatcurrency function
}; //END qtek_dhtml OBJECT
qtek_dhtml.init();

var ajaxQueue = new Queue();
var isSending = false;

function nextRequest(){
    setTimeout("sendAjax()",100);
}
// input: ...<script ...> script content </script>...
// output: script content
function findScriptContent( rawText ){
    if( rawText == "" ){
        return "";
    }
    var tempText = rawText.toLowerCase();
    var indexOfScript = tempText.indexOf( "<script" );
    if( indexOfScript < 0 ){
        return "";
    }
    var startScriptIndex = tempText.indexOf( ">", indexOfScript );
    if( startScriptIndex < indexOfScript ){
        return "";
    }
    var endScriptIndex = tempText.indexOf( "</script>", startScriptIndex );    
    if( endScriptIndex < startScriptIndex ){
        return "";
    }
    
    return rawText.substring( startScriptIndex+1, endScriptIndex );
}
function ajaxComplete( ajaxObj ){
    ajaxObj.responseText = ajaxObj.HttpRequest.responseText;
    ajaxObj.responseXML = ajaxObj.HttpRequest.responseXML;
    ajaxObj.responseStatus[0] = ajaxObj.HttpRequest.status;
    ajaxObj.responseStatus[1] = ajaxObj.HttpRequest.statusText;
    if (ajaxObj.responseContainer) 
    {
	    var elemNodeName = ajaxObj.responseContainer.nodeName.toLowerCase();
	    if (elemNodeName == "input" || elemNodeName == "select" || elemNodeName == "option" || elemNodeName == "textarea")
		    ajaxObj.responseContainer.value = ajaxObj.responseText;
	    else ajaxObj.responseContainer.innerHTML = ajaxObj.responseText;
	    // execute script in response text
	    eval("" + findScriptContent(ajaxObj.responseText));
    }
    if (ajaxObj.executeResponse) ajaxObj.evalResponse();
    isSending = false;    
    ajaxObj.onComplete(); //should call last
}
function sendAjax(){
    if( isSending ){
       nextRequest();
    }    
    if( ajaxQueue.isEmpty() ){
        return;
    }
    
    var ajaxObj = ajaxQueue.dequeue();
    
    ajaxObj.init();
    
    if (!ajaxObj.HttpRequest && ajaxObj.errorMessage){
        alert(ajaxObj.errorMessage);
    }
	else{	
	    if (ajaxObj.responseContainer && typeof(ajaxObj.responseContainer) == "string"){
	        ajaxObj.responseContainer = qtek_dhtml.getElementById(ajaxObj.responseContainer);
	    }
	    
	    try{
	        var sCurrentLocation = (window.location + '');
	        
	        var sTest3W = 'http://www.';
	        var bRequestHave3W = !( ajaxObj.requestUrl.indexOf( sTest3W ) < 0 );
	        var bCurrentLocationHave3W = !( sCurrentLocation.indexOf( sTest3W ) < 0 );
	        
	        if( bRequestHave3W != bCurrentLocationHave3W ){
	            if( bCurrentLocationHave3W ){
	                ajaxObj.requestUrl = ajaxObj.requestUrl.replace('http://swim.com','http://www.swim.com');
	            }
	            else{
	                ajaxObj.requestUrl = ajaxObj.requestUrl.replace('http://www.swim.com','http://swim.com');
	            }
	        }
	        
	        ajaxObj.HttpRequest.open(ajaxObj.requestMethod, ajaxObj.requestUrl, true);
		    if (ajaxObj.requestMethod == "POST"){
			    try { 
			        ajaxObj.HttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded") 
			    } 
			    catch (e){
			        if (ajaxObj.errorMessage) alert("Error setting request header.");			        
			    }
		    }		    
		    
		    ajaxObj.HttpRequest.send(ajaxObj.params);
		    isSending = true;				    		    
		    ajaxObj.HttpRequest.onreadystatechange = function() {
			    switch (ajaxObj.HttpRequest.readyState){
				    case 1: ajaxObj.onLoad(); break;
				    case 2: ajaxObj.onLoaded(); break;
				    case 3: ajaxObj.onInteractive(); break;
				    case 4:
					    ajaxComplete( ajaxObj );
				        break;
			    }
		    };
		}
		catch (e){	    
		    if (ajaxObj.errorMessage) alert("Error executing ajax.");
		    isSending = false;
		}
    }
}
///***************************** Ajax with XMLHTTP ActiveX **********************************/
function qtek_ajax(url, method)
{
    this.errorMessage = "I am sorry that your browser does not support AJAX!\n";
    this.HttpRequest = null;
    this.requestUrl = url;
    this.requestMethod = (method ? method : "GET");  
    this.responseStatus = new Array(2);
    this.responseText = "";
    this.responseXML = "";
    this.responseContainer = "";
    this.executeResponse = false;
    this.params = "";
    
    this.onLoad = function() { };
	this.onLoaded = function() { };
	this.onInteractive = function() { };
	this.onComplete = function() { };
	
	this.init = function() {
	    try { this.HttpRequest = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(ex)
        {
            try { this.HttpRequest = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch(oc) { }
        }
        if (!this.HttpRequest && typeof(XMLHttpRequest) != "undefined") this.HttpRequest = new XMLHttpRequest();
        if (!this.HttpRequest && this.errorMessage) alert(this.errorMessage);
	}; //END init function
	
	this.execute = function(params) {
	    this.params = params;
	    ajaxQueue.enqueue( this );	    
	    sendAjax();
	}; //END execute function
	
	this.evalResponse = function() {
	    if (this.responseText) eval(this.responseText);
	}; //END evalResponse function
	
//	this.init(); //initialize qtek_ajax object
} //END qtek_ajax object function


/***************************** Form and Controls **********************************/
var qtek_form = {
    loadedforms:null, initialized:false,    
    init:function()
    {
        if (this.initialized) return;
        this.loadedforms = document.forms; //save forms at first loaded state
        this.initialized = true;
    },

    /***** General methods *****/
    findForm:function(formName)
    {
	    if (typeof(formName) == "object") return formName;    	
	    var dforms = (arguments.length > 1 && typeof(arguments[1]) == "object" ? arguments[1] : document.forms);
	    if (!formName && dforms.length > 0) return dforms[0];
	    if (typeof(formName) == "string")
	    {		
		    for (var i = 0; i < dforms.length; i++)
		    {
			    if (dforms[i].name.toUpperCase() == formName.toUpperCase()) return dforms[i];
		    }
	    }
	    return null;
    },
    findFormByField:function(fieldName)
    {
	    if (typeof(fieldName) == "object") return fieldName.form;
	    var dforms = document.forms;
	    for (var i = 0; i < dforms.length; i++)
	    {
		    for(var j = 0; j < dforms[i].elements.length; j++)
		    {
			    if (dforms[i].elements[j].name.toUpperCase() == fieldName.toUpperCase()) return dforms[i];
		    }
	    }
	    if (arguments.length == 1) alert("Could not find form that contains field " + fieldName + ".");
	    return null;
    },
    findField:function(fieldName, formName)
    {
	    if (typeof(fieldName) == "object") return fieldName;    	
	    var i = 0, j = 0;
	    if (formName)
	    {
		    formName = js_findForm(formName);
		    for(j = 0; j < formName.elements.length; j++)
		    {
			    if (formName.elements[j].name.toUpperCase() == fieldName.toUpperCase()) return formName.elements[j];
		    }
	    }
	    else
	    {		
		    var dforms = document.forms;
		    for (i = 0; i < dforms.length; i++)
		    {
			    for(j = 0; j < dforms[i].elements.length; j++)
			    {
				    if (dforms[i].elements[j].name.toUpperCase() == fieldName.toUpperCase()) return dforms[i].elements[j];
			    }
		    }
	    }	
	    if (arguments.length < 3) alert("Could not find field " + fieldName + ".");
	    return null;
    },
    enable:function(controllist, valuelist, checkvalue)
    {
        if (typeof(controllist) == "object")
        {
            valuelist = qtek_dhtml.trim(valuelist);
            checkvalue = qtek_dhtml.trim(checkvalue);
            var valueFound = false;
            if (valuelist == checkvalue) valueFound = true;
            else if (valuelist != "")
            {
                var values = valuelist.split(";");
                for(var i = 0; i < values.length && valueFound == false; i++)
                {
                    if (values[i].toString() == checkvalue.toString())
                        valueFound = true;
                }
            }
            controllist.disabled = (valueFound ? false : true);
            return;
        }
        else if (controllist != "")
        {
            var controls = controllist.split(";");
            for(var i = 0; i < controls.length; i++)
            {
                var control = this.findField(controls[i]);
                if (control) this.enable(control, valuelist, checkvalue);
            }
        }
        return;
    },
    disable:function(controllist, valuelist, checkvalue)
    {
        if (typeof(controllist) == "object")
        {
            valuelist = qtek_dhtml.trim(valuelist);
            checkvalue = qtek_dhtml.trim(checkvalue);
            var valueFound = false;
            if (valuelist == checkvalue) valueFound = true;
            else if (valuelist != "")
            {
                var values = valuelist.split(";");
                for(var i = 0; i < values.length && valueFound == false; i++)
                {
                    if (values[i].toString() == checkvalue.toString())
                        valueFound = true;
                }
            }
            controllist.disabled = (valueFound ? true : false);
            return;
        }
        else if (controllist != "")
        {
            var controls = controllist.split(";");
            for(var i = 0; i < controls.length; i++)
            {
                var control = this.findField(controls[i]);
                if (control) this.disable(control, valuelist, checkvalue);
            }
        }
        return;
    },
    focus:function(field)
    {
        window.focus();
        field = this.findField(field, null);
        if (field) field.focus();
    },
    focusNext:function(nextField, eventKeyCode, e) //e is captured event
    {
        if (qtek_html.getKeyCode(e) == eventKeyCode)
        {
            nextField = this.findField(nextField, null);
            if (nextField)
            {
                qtek_html.trimForm(nextField.form);
                if (arguments.length > 3)
                {
                    var doFocus = false;
                    if (arguments[3] == "EMPTY" && nextField.value == "")
                        doFocus = true;

                    if (doFocus) nextField.focus();
                    else if (arguments.length > 4 && arguments[4] == "SUBMIT") nextField.form.submit();
                }
                else nextField.focus();
            }
        }  
    },
    reset:function(form)
    {
        form = this.findForm(form);
        if (!form) return;
    
	    var focusid = null;
	    var originalform = this.findForm(form.name, this.loadedforms);
	    if (!originalform) return;
	    
	    for(var i = 0; i < form.length; i++) 
	    {
		    var fieldType = form[i].type.toLowerCase();
		    if (fieldType == "text" || fieldType == "password" || fieldType == "textarea" || fieldType == "hidden")
		    {
			    form[i].value = originalform[i].value;
			    if (focusid == null) focusid = i;
		    }
		    else if (fieldType == "checkbox" || fieldType == "radiobox") form[i].checked = originalform[i].checked;
		    //need implementation for dropdown and list boxes
	    }
	    if (focusid != null) form[focusid].focus();
    },
    trim:function(form)
    {
        form = this.findForm(form);
        if (form)
        {
	        for(var i = 0; i < form.length; i++)
	        {
		        if (form[i].type == "text" || form[i].type == "password" || form[i].type == "textarea") qtek_dhtml.trim(form[i]);
	        }
	    }
    },
    
    /***** Checkbox Fields *****/
    checkAll:function(form, checkName, checkDisabled, enableWithPrefix)
    {
	    var fv_prefixes = null;
	    if (enableWithPrefix)
	    {
		    fv_prefixes = enableWithPrefix.split(",");
	    }

	    form = this.findForm(form);
	    for (var i = 0; i < form.length; i++)
	    {
		    if (form[i].type == "checkbox" && (checkDisabled || form[i].disabled == false))
		    {
			    if (!checkName || checkName == form[i].name)
			    {
				    form[i].checked = true;
				    if (enableWithPrefix)
				    {
					    for (var j = 0; j < fv_prefixes.length; j++)
					    {
						    var ctrlobj = this.findField(qtek_dhtml.trim(fv_prefixes[j]) + form[i].value, form, false);
						    if (ctrlobj && ctrlobj.disabled) ctrlobj.disabled = false;
					    }
				    }
			    }
		    }
	    }
    },
    uncheckAll:function(form, checkName, checkval, disableWithPrefix)
    {
	    var fv_prefixes = null;
	    if (disableWithPrefix)
	    {
		    fv_prefixes = disableWithPrefix.split(",");
	    }
    	
	    form = this.findForm(form);
	    for (var i = 0; i < form.length; i++)
	    {
		    if (form[i].type == "checkbox")
		    {
			    if (!checkName || checkName == form[i].name)
			    {
    		
				    if (checkval && form[i].value == checkval) form[i].checked = true;
				    else
				    {
					    form[i].checked = false;
					    if (disableWithPrefix)
					    {
						    for (var j = 0; j < fv_prefixes.length; j++)
						    {
							    var ctrlobj = this.findField(qtek_dhtml.trim(fv_prefixes[j]) + form[i].value, form, false);
							    if (ctrlobj && !ctrlobj.disabled) ctrlobj.disabled = true;
						    }
					    }

				    }
			    }
		    }
	    }
    },
    countChecked:function(form, checkName)
    {
	    var fvcnt = 0;
	    form = this.findForm(form);
	    for (var i = 0; i < form.length; i++)
	    {
		    if (form[i].type == "checkbox" && form[i].name == checkName && form[i].checked) fvcnt++;
	    }
	    return fvcnt;
    },
    getCheckedValues:function(checkName, delimiter) //delimiter can be passed as second parameter
    {
        checkName = this.findField(checkName); 
        if (!checkName) return "";
        if (!delimiter) delimiter = ",";

	    var fvcnt = 0, fvresult = "", form = checkName.form;
	    for (var i = 0; i < form.length; i++)
	    {
		    if (form[i].type == "checkbox" && form[i].name == checkName.name && form[i].checked)
		    {
			    if (fvcnt > 0) fvresult = fvresult + delimiter + form[i].value;
			    else fvresult = form[i].value;
			    fvcnt++;
		    }
	    }
	    return fvresult;
    },
    checkOnValue:function(checker, values)
    {
        checker = this.findField(checker);
        if (checker && values)
        {
            for(var i = 0; i < checker.form.length; i++)
            {
                if (checker.form[i].name == checker.name)
                {
                    var value_items = values.split(",");
                    for(var j=0; j < value_items.length; j++)
                    {
                        if (checker.form[i].value.toString() == value_items[j].toString())
                        {
                            checker.form[i].checked = true;
                            break;
                        }
                    }
                }
            }
        }
    },
    
    /***** Text Fields *****/
    getValue:function(field) //2nd parameter is form
    {
        if (arguments.length > 1) field = this.findField(field, arguments[1]);
        else field = this.findField(field, null);
        if (field) return field.value;
        return null;
    },
    isEmpty:function(field) //2nd parameter is form
    {
        var value = this.getValue(field, (arguments.length > 1 ? arguments[1] : null));
        return (value ? false : true);
    },
    validateTextLength:function(textfield, maxlength)
    {
        textfield = this.findField(textfield);
        if (textfield && textfield.value.length > maxlength)
            textfield.value = textfield.value.substring(0, maxlength);
    },
    
    /***** Dropdown/Listbox Fields *****/
    selectOptions:function(dropdownlist, values) //pass values=null to select all options
    {
        dropdownlist = this.findField(dropdownlist);
        if (dropdownlist && values != null)
        {
	        for (var i=0; i < dropdownlist.options.length; i++)
	        {
	            var value_items = values.toString().split(",");
	            for(var j=0; j < value_items.length; j++)
	            {
	                if (value_items[j].toString() == dropdownlist.options[i].value.toString())
		                dropdownlist.options[i].selected = true;
	            }
	        }
	    }
    },
    addOption:function(dropdownlist, value, text, selected)
    {
	    dropdownlist = this.findField(dropdownlist);
	    if (dropdownlist && typeof(dropdownlist) == "object")
	    {
	        var option = new Option(text, value);
	        dropdownlist.options[dropdownlist.options.length] = option;
	        if (selected) dropdownlist.options[dropdownlist.options.length - 1].selected = true;
	    }
    },
    removeOption:function(dropdownlist, values, removeByValue) //values is a list of indexes; if removeByValue=true then values is an option value list
    {
	    if (values == null || values.length == 0) return;
	    var arrayValue = values.split(",");
	    if (arrayValue.length > 1)
	    {
		    for (var i = 0; i < arrayValue.length; i++)
		    {
			    this.removeOption(dropdownlist, arrayValue[i], removeByValue);
		    }
		    return;
	    }
    	
	    var dropdownlist = this.findField(dropdownlist);
	    if (dropdownlist && typeof(dropdownlist) == "object")
	    {
	        var optionIndex = values; //values contains a single value and assuming it is an index value
	        if (removeByValue)
	        {
	            optionIndex = -1;
		        for (var i = 0; i < dropdownlist.options.length; i++) 
		        {
			        if (dropdownlist.options[i].value.toString() == values.toString()) 
			        {
				        optionIndex = i;
				        break;
			        }
		        }
	        }
	        if (dropdownlist.options.length > 0 && optionIndex >= 0 && optionIndex < dropdownlist.options.length)
	        {
		        dropdownlist.options[optionIndex] = null;
		        if (dropdownlist.options.length > optionIndex) dropdownlist.options[optionIndex].selected = true;
		        else if (dropdownlist.options.length) dropdownlist.options[dropdownlist.options.length - 1].selected = true;
	        }
	    }
    },
    clearOptions:function(dropdownlist, fromIndex, toIndex)
    {
        dropdownlist = this.findField(dropdownlist);
        if (dropdownlist && typeof(dropdownlist) == "object")
        {
            if (!toIndex || toIndex <= 0) toIndex = dropdownlist.options.length - 1;
            if (!fromIndex || fromIndex < 0 || fromIndex > dropdownlist.options.length) fromIndex = 0;
            for (var i = fromIndex; i <= toIndex && i < dropdownlist.options.length; i++)
	        {
		        dropdownlist.options[i] = null;
	        }
        }
    },
    getSelectedValues:function(dropdownlist, multiple)
    {
	    dropdownlist = this.findField(dropdownlist);
	    if (dropdownlist)
	    {
	        if (!multiple) return dropdownlist.options[dropdownlist.selectedIndex].value;
	        var values = "";
	        for (var i = 0; i < dropdownlist.options.length; i++)
	        {
		        if (dropdownlist.options[i].selected)
		        {
			        if (values != "") values += ",";
			        values += dropdownlist.options[i].value.toString();
		        }
	        }
	        return values;
	    }
	    return null;
    }
};
qtek_form.init(); //initialize qtek_form object


/***************************** Window Objects and Events **********************************/
var qtek_window = {
    popupwindow:null, popupdiv:null, reloadopener:false,
    
    init:function(popwin, popdiv)
    {
        this.popupwindow = (popwin ? popwin : "QTekPopupWin");
        this.popupdiv = qtek_dhtml.getElementById(popdiv ? popdiv : "DIV_Popup");
    },
    getOpener:function()
    {
	    return (window.opener ? window.opener : (window.parent ? window.parent : window));
    },
    getOpenerUrl:function()
    {
        var opener = this.getOpener();
        return (opener ? opener.location.href : (arguments.length > 0 ? arguments[0] : ""));
    },
    reloadOpener:function()
    {
        if (this.reloadopener)
        {
            var winobj = this.getOpener();
            if (winobj != null && winobj != window) winobj.location.reload();
        }
    },
    reload:function()
    {
        if (this.reloadopener || (arguments.length > 0 && arguments[0] == true)) //the child window must set the variable qtek_window.reloadopener=true in order to force the opener window to reload
        {
            var winobj = this.getOpener();
            if (winobj != null && winobj != window) winobj.location.reload(); //= winobj.location.href;
        }
        else window.location.reload();
    },
    redirect:function(url)
    {
        if (arguments.length > 1 && arguments[1] == "opener")
        {
            var winobj = this.getOpener();
            if (winobj != null && winobj != window) winobj.document.location.href = url;
        }
        else window.document.location.href = url;
    },
    close:function()
    {
        window.close();
    },
    loadIframe:function(iframeName, url) 
    {
        if (window.frames[iframeName] && window.frames[iframeName].location != url) 
        {
            window.frames[iframeName].location = url;
            return false;
        }
        else return true;
    },
    
    popup:function(url, width, height, options) //options=window options
    {
        if (arguments.length > 4)
        {
            var control = this.getElementById(arguments[4]);
            if (control)
            {
                var valuelist = "";
                if (arguments[4].toLowerCase().indexOf("checker") >= 0) valuelist = qtek_form.getCheckedValues(eval("control.form." + arguments[4]), ",");
                if (valuelist.length > 0)
                {
                    if (url.indexOf("?") < 0) url += "?";
                    else if (url.substr(url.length-1) != "?") url += "&";                
                    url += "keys=" + valuelist;
                }
                else
                {
                    alert("Please select a value.");
                    return false;
                }
            }
            else
            {
                alert("Could not find field to generate id");
                return false;
            }
        }

        if (width <= 0) width = 720;
        if (height <= 0) height = 400;
        if (!options) options = "menubar=0,toolbar=0,location=0,status=0,resizable=0";
        var popup = window.open(url, this.popupwindow, options + ",width="+width+",height="+height);
        popup.moveTo(window.screen.width/2 - width/2 - 25, window.screen.height/2 - height/2 - 25);
        
        return popup;
    },
    showContent:function(contentUrl, eventElement)
    {
        this.hideContent();
        if (!this.popupdiv)
        {
            alert("Missing popup container.");
            return false;
        }
        if (eventElement) qtek_dhtml.moveLayerTo(this.popupdiv, qtek_dhtml.getLayerRight(eventElement) - 5, qtek_dhtml.getLayerBottom(eventElement) - 5);
        this.popupdiv.innerHTML = "Loading";

        var ajax = new qtek_ajax(contentUrl, "GET");
        ajax.responseContainer = this.popupdiv;
        if (ajax.execute(null) == false) this.hideContent();
        else
        {
            if (qtek_dhtml.getLayerBottom(this.popupdiv) >= qtek_dhtml.windowHeight) 
                qtek_dhtml.moveLayerToY(this.popupdiv, qtek_dhtml.windowHeight - qtek_dhtml.getElementHeight(this.popupdiv) - 2);
		    if (qtek_dhtml.getLayerRight(this.popupdiv) >= qtek_dhtml.windowWidth)
		        qtek_dhtml.moveLayerToX(this.popupdiv, qtek_dhtml.windowWidth - qtek_dhtml.getElementWidth(this.popupdiv) - 2);
        }
    },
    hideContent:function()
    {
        if (this.popupdiv) qtek_dhtml.hideLayer(this.popupdiv);
    },
    openUploader:function(scripturl, callbackscripts)
    {
        this.popup(scripturl, 400, 240);
    }
};
qtek_window.init(); //initialize qtek_window object

function isAjaxFinished(){
    return (ajaxQueue.getSize() == 0 && !isSending);
}