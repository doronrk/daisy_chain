/*
ADOBE CONFIDENTIAL
Copyright 2005 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/

if(Array.prototype.push && ([0].push(true)==true))
	Array.prototype.push = null;

if(!Array.prototype.push) {
	function array_push() {
		for(var i=0;i<arguments.length;i++){
			this[this.length]=arguments[i]
		};
		return this.length;
	}
	Array.prototype.push = array_push;
}

if(!Array.prototype.pop) {
	function array_pop(){
	    lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
	    return lastElement;
	}
	Array.prototype.pop = array_pop;
}


String.prototype.doubleNewlines = function() { 
	return this.replace( /(\r?\n|\r){1,2}/g, '\n\n' ); 
}

function sjPBreak(str) {
	return( (str.indexOf("?")>=0?"&":"?") );
};

sjDelimList = [' ', '\n', '\r'];

function sjGetKeyValue(inS, inKey) {
	var keyIdx = inS.indexOf(inKey);
	if (keyIdx == -1) {
		return null;
	}
	var eqIdx = inS.indexOf('=', keyIdx + inKey.length);
	if (eqIdx == -1) {
		return null;
	}
	var valStartIdx = eqIdx + 1;
	while ((valEndIdx < inS.length) && (inS.charAt(valStartIdx) == ' ')) {
		valStartIdx ++;
	}
	if (valStartIdx >= inS.length - 1) {
		return null;
	}
	var valEndIdx = valStartIdx + 1;
	while ((valEndIdx < inS.length) && !sjIsLineDelim(inS.charAt(valEndIdx))) {
		valEndIdx ++;
	}
	return inS.substring(valStartIdx+1, valEndIdx);
};

function sjIsLineDelim(inChar) {
	for (var i = 0; i < sjDelimList.length; i ++) {
		if (inChar == sjDelimList[i]) {
			return true;
		}
	}
	return false;
};

function sjGetElement(name) {
   if(typeof(name)!='string') return name;
   if (document.getElementById) 
	   return document.getElementById(name);
   else if (document.all) 
	   return document.all[name];
   else if (document.layers) 
	   return document[name];
   else name=null;
   return name;
}

function sjGetElementDoc(name) {
   if (document.getElementById) 
	   return document.getElementById(name).ownerDocument;
   else if (document.all) 
	   return document.all[name].document;
   else if (document.layers) 
	   return document[name].document;
   else name=null;
   return name;
}

function sjGetElementStyle(name) {
   if (document.getElementById) 
	   return document.getElementById(name).style;
   if (document.all) 
	   return document.all[name].style;
   if (document.layers) 
	   return document[name];
}

function sjGetObj(name){
  if (document.getElementById){
  	this.obj = document.getElementById(name);
	this.style = document.getElementById(name).style;
  }else if (document.all){
	this.obj = document.all[name];
	this.style = document.all[name].style;
  }else if (document.layers){
   	this.obj = document.layers[name];
   	this.style = document.layers[name];
  }
}

function sjGetTextContent(inNode) {
	var s = '';
	var children = inNode.childNodes;
	for(var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeType == 3 /*Node.TEXT_NODE*/) s += child.data;
		else s += sjGetTextContent(child);
	}
	return s;
}

function sjCreateDiv(parentId,divId) {
	var parentElm = null;
      if (parentId != null) 
	    parentElm = sjGetElement(parentId);
   if (document.all) {
      if (parentElm == null) 
		  parentElm = document.body;
		 parentElm.insertAdjacentHTML('afterBegin',' <div unselectable="on" id="' + divId + 
												'" style="position:absolute;text-align:left;overflow:hidden;">'+' '+'</div> ');
   }
   else if (document.layers) {
      if (parentElm == null){
			document.layers[divId] = new Layer(0);
         } else {
			parentElm.document.layers[divId] = new Layer(0,parentElm);
         }
   }
   else if (document.getElementById) {
      if (parentElm == null)
		  parentElm = document.body;
      var tempLayer = document.createElement('div');
      tempLayer.setAttribute('id',divId);
      tempLayer.setAttribute('style','position:absolute;text-align:left;overflow:hidden;');
      parentElm.appendChild(tempLayer);
   }
}

function sjGetWidth(name) {
   if (document.getElementById) 
	   return document.getElementById(name).style.width;
   if (document.all) 
	   return document.all[name].offsetWidth;
   if (document.layers) 
	   return document[name].document.width;
}

function sjGetHeight(name) {
   if (document.getElementById) 
	   return document.getElementById(name).style.height;
   if (document.all) 
	   return document.all[name].offsetHeight;
   if (document.layers) 
	   return document[name].document.height;
}


function sjGetX(layer) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById) 
	   return parseInt(layer.left);
   if (document.all) 
	   return layer.pixelLeft;
   if (document.layers) 
	   return layer.x;
}

function sjGetY(layer) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById) 
	   return parseInt(layer.top);
   if (document.all) 
	   return layer.pixelTop;
   if (document.layers) 
	   return layer.y;
}

function sjSetClip(layer,x,y,t,r,b,l) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById) {
      //layer.clip='rect('+t+' '+r+' '+b+' '+l+')';
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)';
   } else if (document.all) {
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)';
      layer.pixelLeft=x;
      layer.pixelTop=y;
      layer.overflow='hidden';
   } else if (document.layers) {
      layer.clip.top=t;
      layer.clip.right=r;
      layer.clip.bottom=b;
      layer.clip.left=l;
      layer.moveTo(x,y);
   }
}

function sjSetWidth(layer,w) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
      layer.width=parseInt(w)+'px';
   else if (document.all)
      layer.posWidth=parseInt(w)+'px';
   else if (layer.clip)
      layer.clip.width=w;
}

function sjSetHeight(layer,h) {
   layer=sjGetElementStyle(layer);
   if (document.getElementById)
      layer.height=parseInt(h)+'px';
   else if (document.all)
      layer.posHeight=parseInt(h)+'px';
   else if (layer.clip)
      layer.clip.height=h;
}

function sjZoomMap (inMapName, inXfactor, inYfactor) {
	if(inMapName){
	  if (document.all) {
		var map = document.all[inMapName];
		if (map){
			var areas = map.all.tags('AREA');
		}
	  } else if (document.getElementsByName) {
		var map = document.getElementsByName(inMapName)[0];
		if (map){
			var areas = map.getElementsByTagName('AREA');
		}
	  }
	  if (areas) {
		for (var a = 0; a < areas.length; a++) {
		  //var coords = areas[a].getAttribute('origcoords').split(/\s*,\s*/);
		  var coords = areas[a].getAttribute('coords').split(/\s*,\s*/);
		  if (areas[a].getAttribute('shape').toLowerCase() == 'rect' || areas[a].getAttribute('shape').toLowerCase() == 'poly') {
			for (var p = 0; p < coords.length; p += 2) {
			  coords[p] = Math.round(coords[p] * inXfactor);
			  coords[p + 1] = Math.round(coords[p + 1] * inYfactor);
			}
		  } else if (areas[a].getAttribute('shape').toLowerCase() == 'circle') {
			coords[0] = Math.round(coords[0] * inXfactor);
			coords[1] = Math.round(coords[1] * inYfactor);
			coords[2] = Math.round(coords[2] * (inXfactor < inYfactor ? inXfactor : inYfactor));
		  }
		  //areas[a].coords = coords.join(', ');
		  areas[a].setAttribute('coords',coords.join(', '));
		}
	  }
	}
}

function sjResetMap (inMapName) {
	if(inMapName){
	  if (document.all) {
		var map = document.all[inMapName];
		if (map){
			var areas = map.all.tags('AREA');
		}
	  } else if (document.getElementsByName) {
		var map = document.getElementsByName(inMapName)[0];
		if (map){
			var areas = map.getElementsByTagName('AREA');
		}
	  }
	  if (areas) {
		for (var a = 0; a < areas.length; a++) {
		  var coords = areas[a].getAttribute('origcoords').split(/\s*,\s*/);
		  areas[a].setAttribute('coords',coords.join(', '));
		}
	  }
	}
}

function sjSetLayerHTML(layer,html) {  
   if (navigator.userAgent.indexOf('MSIE 5.0') && navigator.userAgent.indexOf('Mac') != -1) html += '\n';
   if (document.getElementById){
      document.getElementById(layer).innerHTML=html;
   } else if (document.all) {
      layer=eval(layer);
      layer.innerHTML=html;
   } else if (document.layers) {
      var doc=sjGetElementDoc(layer);
      doc.open();
      doc.writeln(html);
      doc.close();
   }	
}

function sjGetLayerHTML(layer) {
   if (document.getElementById){
      return document.getElementById(layer).innerHTML;
   } else if (document.all) {
      layer=eval(layer);
      return layer.innerHTML;
   }
}

function sjSetXY(layer,x,y) {
   layer=sjGetElementStyle(layer)
   if (document.getElementById) {
      layer.left=parseInt(x)+'px';
      layer.top=parseInt(y)+'px';
   } else if (document.all) {
      layer.pixelLeft=parseInt(x)+'px';
      layer.pixelTop=parseInt(y)+'px';
   } else if (document.layers)
      layer.moveTo(x,y);
}

function sjCenter(layer,y) { 
	sjSetXY(layer,Math.round((width-getWidth(layer)-leftMargin-rightMargin)/2)+leftMargin,y); 
}

function sjSetCursor(curtype) { 
   var ua = navigator.userAgent.toLowerCase(); 
   var isIE = (ua.indexOf('msie') != -1); 
   var isMAC = (ua.indexOf('mac') != -1); 
	document.body.style.cursor = ((!isIE || isMAC) && curtype == 'hand')? 'pointer' : curtype;
	//if (document.all) document.body.style.cursor=curtype; 
}

// value must be "visible", "hidden", or "inherit".
function sjSetVisibility (layer, value){  
   layer=sjGetElementStyle(layer);
	if (document.layers) 
	  layer.visibility = value;
   else if (layer) 
	  layer.visibility = value;
}

// return values as strings "visible", "hidden", or "inherit".
function sjGetVisibility (layer){  
   layer=sjGetElementStyle(layer);
	if (document.layers){
	 var value = layer.visibility;
	 if (value == "show") 
		return "visible";
	 else if (value == "hide") 
	 	return "hidden";
	 else return value;
   }
   else if (layer) 
	 return layer.visibility;
}

function sjGetZIndex (layer){ 
   layer=sjGetElementStyle(layer);
  if (document.layers) 
	  return(layer.zIndex);
  else if (layer) 
	  return (layer.zIndex);
}

function sjSetZIndex (layer, z){ 
   layer=sjGetElementStyle(layer);
	if (document.layers) 
		layer.zIndex = z;
	else if (layer) 
		layer.zIndex = z;
}

function sjSetBackColor (layer, color){ 
	if (color.toLowerCase() == "transparent"){
		color = "";
	}
   layer=sjGetElementStyle(layer);
	if(layer.background) 
		layer.background = color;
	else if (document.layers) 
		layer.bgColor = color;  
	else if(document.all || document.getElementById) 
		layer.backgroundColor = color;
}

sjSetBackImage = function (layer, imageURL) {
   layer=sjGetElementStyle(layer);
	if(layer.background) 
		layer.background.src = imageURL == 'none' ? null : imageURL;
	else if (document.layers)
		layer.background.src = imageURL == 'none' ? null : imageURL;
	else if (document.all || document.getElementById)
		layer.backgroundImage = imageURL == 'none' ? 'none' : 'url(' + imageURL + ')';
}

function sjSetBorder (layer, width,style,color){ 
   stl=sjGetElementStyle(layer);
	stl.borderWidth = width + "px" || 0;  
	stl.borderStyle = style || 'solid';
	stl.borderColor = color || 'black';
}

function sjOpacity (layer,inOpacity) {
	if (inOpacity != null) {
		stl=sjGetElementStyle(layer);
	    if(inOpacity < 0) inOpacity = 0; 
		if(inOpacity > 99) inOpacity = 99;
		stl.opacity = (inOpacity / 100);
		stl.MozOpacity = (inOpacity / 100);
		stl.KhtmlOpacity = (inOpacity / 100);
		stl.filter = "alpha(opacity=" + inOpacity + ")";
		return stl.opacity;
	}
}

function sjGetMouseXY(e){
  var mousePos = {x: 0, y: 0};
	if (document.all) {
		mousePos.x = event.clientX + document.body.scrollLeft;
	    mousePos.y = event.clientY + document.body.scrollTop;
	} else {
        mousePos.x = e.pageX;
   	    mousePos.y = e.pageY;
	}
  return mousePos;
}

function sjGetPageCoords (element) {
  var coords = {x: 0, y: 0};
  while (element) {
    coords.x += element.offsetLeft;
    coords.y += element.offsetTop;
    element = element.offsetParent;
  }
  return coords;
}

function sjGetOffsets (evt) {
 if(evt){
  if (typeof evt.offsetX != 'undefined')
    return { x: evt.offsetX, y: evt.offsetY }
  else if (evt.target) {
    if (window.opera)
      var element = evt.target;
    else
      var element = evt.target.nodeType == 1 ? evt.target : evt.target.parentNode;
    var eventCoords = {
      x: evt.clientX + window.pageXOffset,
      y: evt.clientY + window.pageYOffset
    };
    var elCoords = sjGetPageCoords(element);
    return {x: eventCoords.x - elCoords.x, y: eventCoords.y - elCoords.y};
  }
 }
}


function sjAddObjectEvent(inObject, evType, handler, useCapture){
 var  inObject = sjGetElement(inObject.getElementId());
  if (inObject.addEventListener){
		inObject.addEventListener(evType, handler, useCapture);
    return true;
  } else if (inObject.attachEvent){
    var res = inObject.attachEvent("on"+evType, handler);
    return res;
  } else {
		//alert("Handler could not be attached");
		alert(sj_resource.getResource('%HANDLER_COULD_NOT_BE_ATTACHED%'));
  }
} 

function sjRemoveObjEvent(inObject, evType, handler, useCapture){
 var  inObject = sjGetElement(inObject.getElementId());
  if (inObject.removeEventListener){
		inObject.removeEventListener(evType, handler, useCapture);
    return true;
  } else if (inObject.detachEvent){
    var res = inObject.detachEvent("on"+evType, handler);
    return res;
  } else {
		//alert("Handler could not be removed");
		alert(sj_resource.getResource('%HANDLER_COULD_NOT_BE_REMOVED%'));
  }
}

// usage :
//   addKeyHandler(document.body);
//     document.body.addKeyPress(32, function(){alert("You pressed Space");});
//or  document.body.addKeyDown(65, function(){alert('a pressed');})
//    document.body.removeKeyDown(65)
//or var counter = 0;
//   function increaseCounter() {
//     window.status = "counter = " + counter++;
//   }
//
//   document.body.addKeyPress(13, increaseCounter);document.body.addKeyPress(13, increaseCounter);
// or document.body.addKeyDown(67, function() {if (window.event.ctrlKey) alert("CTRL + C");});
// or 
//	var w, q;
//	document.body.addKeyDown(81, function() {q = true; if (q && w) window.status = "q and w is pressed";});
//	document.body.addKeyUp(81, function() {q = false; window.status = "";});
//	document.body.addKeyDown(87, function() {w = true; if (q && w) window.status = "q and w is pressed";});
//	document.body.addKeyUp(87, function() {w = false; window.status = "";});
sjAddKeyHandler = function sjAddKeyHandler(element) {
	element._keyObject = new Array();
	element._keyObject["keydown"] = new Array();
	element._keyObject["keyup"] = new Array();
	element._keyObject["keypress"] = new Array();
	
	element.addKeyDown = function (keyCode, action) {
		element._keyObject["keydown"][keyCode] = action;
	}
	
	element.removeKeyDown = function (keyCode) {
		element._keyObject["keydown"][keyCode] = null;
	}

	element.addKeyUp = function (keyCode, action) {
		element._keyObject["keyup"][keyCode] = action;
	}
	
	element.removeKeyUp = function (keyCode) {
		element._keyObject["keyup"][keyCode] = null;
	}
	
	element.addKeyPress = function (keyCode, action) {
		element._keyObject["keypress"][keyCode] = action;
	}
	
	element.removeKeyPress = function (keyCode) {
		element._keyObject["keypress"][keyCode] = null;
	}
	
	function handleEvent() {
		var type = window.event.type;
		var code = window.event.keyCode;
		
		if (element._keyObject[type][code] != null) 
			element._keyObject[type][code]();
	}
	
	element.onkeypress = handleEvent;
	element.onkeydown = handleEvent;
	element.onkeyup = handleEvent;
}

/////////////
function sjGetKey(obj,evt) {
	var key=document.all?event.keyCode:
		evt.keyCode?evt.keyCode:
		evt.charCode?evt.charCode:
		evt.which?evt.which:void 0;
  return key;
}

/////////////
//	reading the scrollBars width (depending on the OS settings).
function getScrollBarWidth (){
	try{
		var elem = document.createElement("DIV");
		elem.id = "asdf";
		elem.style.width = 100;
		elem.style.height = 100;
		elem.style.overflow = "scroll";
		elem.style.position = "absolute";
		elem.style.visibility = "hidden";
		elem.style.top = "0";
		elem.style.left = "0";
		document.body.appendChild (elem);
		scrollWidth = sjGetElement('asdf').offsetWidth - sjGetElement('asdf').clientWidth;
		document.body.removeChild (elem);
		delete elem;
	}catch (ex){
		return false;
	}
	return scrollWidth;
}
///////////
function getRowIndex (cell) {
  return document.all ? cell.parentElement.rowIndex : cell.parentNode.rowIndex;
}
