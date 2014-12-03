/*** dhtml.js
Author		: Huy K. Quan
Created on	: Wednesday, June 11, 2003
Company		: 
Type		: Javascript
Description : DHTML support functions
***/

var js_isMinNS4 = (navigator.appName.indexOf("Netscape")>=0 && parseFloat(navigator.appVersion)>=4) ? 1 : 0;
var js_isMinIE4 = (document.all) ? 1 : 0;
var js_isMinIE6 = (js_isMinIE4 && navigator.appVersion.indexOf("MSIE 6.")>=0) ? 1 : 0;
var js_isMinIE55= (js_isMinIE6 || (js_isMinIE4 && navigator.appVersion.indexOf("MSIE 5.5")>=0)) ? 1 : 0;
var js_isMinIE5 = (js_isMinIE55 || (js_isMinIE4 && navigator.appVersion.indexOf("MSIE 5.")>=0)) ? 1 : 0;

var js_windowWidth;
var js_windowHeight;

if (js_isMinNS4)
{
	js_windowWidth = window.innerWidth;
	js_windowHeight = window.innerHeight;
}

var js_mouseX = 0;
var js_mouseY = 0;
if (js_isMinNS4) document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = js_getMousePosition;

function js_getMousePosition(e)
{
	if(js_isMinNS4)
	{
		js_mouseX = e.pageX; 
		js_mouseY = e.pageY;
	}
	if(js_isMinIE4)
	{
		js_mouseX = window.event.clientX + document.body.scrollLeft;
		js_mouseY = window.event.clientY + document.body.scrollTop;
	}
}

function js_setLayerText(layer, text)
{
	if (typeof(layer) == "string") layer = js_getElementById(layer);
	layer.innerText = text;
}

function js_setLayerHtml(layer, html)
{
	if (typeof(layer) == "string") layer = js_getElementById(layer);
	layer.innerHTML = html;
}

function js_setLayerSize(layer, width, height)
{
	if(js_isMinNS4)
	{
		if(layer.document.width)
		{
			if (width) layer.document.width = width;
			if (height) layer.document.height = height;
		}
		else
		{
			if (width) layer.clip.left = layer.clip.right + width;
			if (height) layer.clip.bottom = layer.clip.top + height;
		}
	}
	if(js_isMinIE4)
	{
		if(layer.style)
		{
			if (width) layer.style.width = width;
			if (height) layer.style.height = height;
		}
		else
		{
			if (width) layer.clientWidth = width;
			if (height) layer.clientHeight = height;
		}
	}
}

function js_hideLayer(layer)
{
	if(js_isMinNS4)layer.visibility="hide";
	if(js_isMinIE4)
	{
		layer.style.visibility="hidden";
		layer.style.display="none";
	}
}

function js_showLayer(layer)
{
	if(js_isMinNS4)layer.visibility="show";
	if(js_isMinIE4)
	{
		layer.style.visibility="visible";
		layer.style.display="block";
	}
}

function js_inheritLayer(layer)
{
	if(js_isMinNS4)layer.visibility="inherit";
	if(js_isMinIE4)layer.style.visibility="inherit";
}

function js_getVisibility(layer)
{
	if(js_isMinNS4)
	{
		if(layer.visibility=="show")return "visible";
		if(layer.visibility=="hide")return "hidden";
		return layer.visibility;
	}
	if(js_isMinIE4)return layer.style.visibility;
	return "";
}

function js_moveLayerTo(layer,x,y)
{
	if(js_isMinNS4)layer.moveTo(x,y);
	if(js_isMinIE4){layer.style.left=x;layer.style.top=y;}
}

function js_moveLayerBy(layer,dx,dy)
{
	if(js_isMinNS4)layer.moveBy(dx,dy);
	if(js_isMinIE4){layer.style.pixelLeft+=dx;layer.style.pixelTop+=dy;}
}

function js_getLeft(layer)
{
	if(js_isMinNS4)return layer.left;
	if(js_isMinIE4)return layer.style.pixelLeft;
	return-1;
}

function js_getTop(layer)
{
	if(js_isMinNS4)return layer.top;
	if(js_isMinIE4)return layer.style.pixelTop;
	return-1;
}

function js_getRight(layer)
{
	if(js_isMinNS4)return layer.left+getWidth(layer);
	if(js_isMinIE4)return layer.style.pixelLeft+getWidth(layer);
	return-1;
}

function js_getBottom(layer)
{
	if(js_isMinNS4)return layer.top+getHeight(layer);
	if(js_isMinIE4)return layer.style.pixelTop+getHeight(layer);
	return-1;
}

function js_getPageLeft(layer)
{
	var x;
	if(js_isMinNS4)return layer.pageX;
	if(js_isMinIE4)
	{
		x=0;
		while(layer.offsetParent!=null)
		{
			x+=layer.offsetLeft;
			layer=layer.offsetParent;
		}
		x+=layer.offsetLeft;
		return x;
	}
	return-1;
}

function js_getPageTop(layer)
{
	var y;
	if(js_isMinNS4)return layer.pageY;
	if(js_isMinIE4)
	{
		y=0;
		while(layer.offsetParent!=null)
		{
			y+=layer.offsetTop;
			layer=layer.offsetParent;
		}
		y+=layer.offsetTop;
		return y;
	}
	return-1;
}

function js_getWidth(layer)
{
	if(js_isMinNS4)
	{
		if(layer.document.width)return layer.document.width;
		else return layer.clip.right-layer.clip.left;
	}
	if(js_isMinIE4)
	{
		if(layer.style.pixelWidth)return layer.style.pixelWidth;
		else return layer.clientWidth;
	}
	return-1;
}

function js_getHeight(layer)
{
	if(js_isMinNS4)
	{
		if(layer.document.height)return layer.document.height;
		else return layer.clip.bottom-layer.clip.top;
	}
	if(js_isMinIE4)
	{
		if(layer.style.pixelHeight)return layer.style.pixelHeight;
		else return layer.clientHeight;
	}
	return-1;
}

function js_getzIndex(layer)
{
	if(js_isMinNS4)return layer.zIndex;
	if(js_isMinIE4)return layer.style.zIndex;
	return-1;
}

function js_setzIndex(layer,z)
{
	if(js_isMinNS4)layer.zIndex=z;
	if(js_isMinIE4)layer.style.zIndex=z;
}

function js_clipLayer(layer,clipleft,cliptop,clipright,clipbottom)
{
	if(js_isMinNS4)
	{
		layer.clip.left=clipleft;
		layer.clip.top=cliptop;
		layer.clip.right=clipright;
		layer.clip.bottom=clipbottom;
	}
	if(js_isMinIE4)layer.style.clip='rect('+cliptop+' '+clipright+' '+clipbottom+' '+clipleft+')';
}

function js_getClipLeft(layer)
{
	if(js_isMinNS4)return layer.clip.left;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return 0;
		var clip=getIEClipValues(layer.style.clip);
		return(clip[3]);
	}
	return-1;
}

function js_getClipTop(layer)
{
	if(js_isMinNS4)return layer.clip.top;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return 0;
		var clip=getIEClipValues(layer.style.clip);
		return clip[0];
	}
	return-1;
}

function js_getClipRight(layer)
{
	if(js_isMinNS4)return layer.clip.right;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return layer.style.pixelWidth;
		var clip=getIEClipValues(layer.style.clip);
		return clip[1];
	}
	return-1;
}

function js_getClipBottom(layer)
{
	if(js_isMinNS4)return layer.clip.bottom;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return layer.style.pixelHeight;
		var clip=getIEClipValues(layer.style.clip);
		return clip[2];
	}
	return-1;
}

function js_getClipWidth(layer)
{
	if(js_isMinNS4)return layer.clip.width;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return layer.style.pixelWidth;
		var clip=getIEClipValues(layer.style.clip);
		return clip[1]-clip[3];
	}
	return-1;
}

function js_getClipHeight(layer)
{
	if(js_isMinNS4)return layer.clip.height;
	if(js_isMinIE4)
	{
		var str=layer.style.clip;
		if(!str)return layer.style.pixelHeight;
		var clip=getIEClipValues(layer.style.clip);
		return clip[2]-clip[0];
	}
	return-1;
}

function js_getIEClipValues(str)
{
	var clip=new Array();
	var i;
	i=str.indexOf("(");
	clip[0]=parseInt(str.substring(i+1,str.length),10);
	i=str.indexOf(" ",i+1);
	clip[1]=parseInt(str.substring(i+1,str.length),10);
	i=str.indexOf(" ",i+1);
	clip[2]=parseInt(str.substring(i+1,str.length),10);
	i=str.indexOf(" ",i+1);
	clip[3]=parseInt(str.substring(i+1,str.length),10);
	return clip;
}

function js_scrollLayerTo(layer,x,y,bound)
{
	var dx=getClipLeft(layer)-x;
	var dy=getClipTop(layer)-y;
	scrollLayerBy(layer,-dx,-dy,bound);
}

function js_scrollLayerBy(layer,dx,dy,bound)
{
	var cl=getClipLeft(layer);
	var ct=getClipTop(layer);
	var cr=getClipRight(layer);
	var cb=getClipBottom(layer);
	if(bound)
	{
		if(cl+dx<0)dx=-cl;
		else if(cr+dx>getWidth(layer))dx=getWidth(layer)-cr;
		if(ct+dy<0)dy=-ct;
		else if(cb+dy>getHeight(layer))dy=getHeight(layer)-cb;
	}
	clipLayer(layer,cl+dx,ct+dy,cr+dx,cb+dy);
	moveLayerBy(layer,-dx,-dy);
}

function js_setBgColor(layer,color)
{
	if(js_isMinNS4)layer.bgColor=color;
	if(js_isMinIE4)layer.style.backgroundColor=color;
}

function js_setBgImage(layer,src)
{
	if(js_isMinNS4)layer.background.src=src;
	if(js_isMinIE4)layer.style.backgroundImage="url("+src+")";
}

function js_getLayer(name)
{
	if(js_isMinNS4)return findLayer(name,document);
	if(js_isMinIE4)return eval('document.all.'+name);
	return null;
}

function js_findLayer(name,doc)
{
	var i,layer;
	for(i=0;i<doc.layers.length;i++)
	{
		layer=doc.layers[i];
		if(layer.name==name)return layer;
		if(layer.document.layers.length>0)
			if((layer=findLayer(name,layer.document))!=null)return layer;
	}
	return null;
}

function js_getImage(name)
{
	if(js_isMinNS4){return findImage(name,document);}
	if(js_isMinIE4)return eval('document.all.'+name);
	return null;
}

function js_findImage(name,doc)
{
	var i,img;
	for (i = 0; i < doc.images.length; i++)
	{
		if (doc.images[i].name == name) return doc.images[i];
	}
	for (i = 0; i < doc.layers.length; i++)
	{
		if ((img = findImage(name,doc.layers[i].document)) != null)
		{
			img.container = doc.layers[i];
			return img;
		}
	}
	return null;
}

function js_getImagePageLeft(img)
{
	var x,obj;
	if(js_isMinNS4)
	{
		if(img.container!=null)return img.container.pageX+img.x;
		else return img.x;
	}
	if(js_isMinIE4)
	{
		x=0;
		obj=img;
		while(obj.offsetParent!=null)
		{
			x+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
		x+=obj.offsetLeft;
		return x;
	}
	return-1;
}

function js_getImagePageTop(img)
{
	var y,obj;
	if(js_isMinNS4)
	{
		if(img.container!=null)return img.container.pageY+img.y;
		else return img.y;
	}
	if(js_isMinIE4)
	{
		y=0;obj=img;
		while(obj.offsetParent!=null)
		{
			y+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		y+=obj.offsetTop;
		return y;
	}
	return-1;
}

function js_getTopLeftCoord(mode, layerw, layerh, mwidth, mheight)
{
	var pwidth, pheight;
	
	if (!mwidth) mwidth = 10;
	if (!mheight) mheight = 10;
	var coord = new Array();
	coord[0] = mwidth;
	coord[1] = mheight;
	mode = mode.split("");	
	if (mode.length != 3) return coord;
	
	if (mode[0].toUpperCase() == "P") // use page size 
	{
		pwidth = js_getPageWidth();
		pheight = js_getPageHeight();
	}
	else // use window size
	{
		pwidth = js_getWindowWidth();
		pheight = js_getWindowHeight();
	}
	
	if (mode[1].toUpperCase() == "C") // center
	{
		if (layerw < pwidth && ((pwidth - layerw)/2) > mwidth) coord[0] = ((pwidth - layerw)/2) - 25;
		if (coord[0] < mwidth) coord[0] = mwidth;
	}
	else if (mode[1].toUpperCase() == "R") // right
	{
		coord[0] = pwidth - mwidth;
	}
	
	if (mode[2].toUpperCase() == "M") // middle
	{
		if (layerh < pheight && ((pheight - layerh)/2) > mheight) coord[1] = (pheight - layerh)/2;
	}
	if (mode[2].toUpperCase() == "N") // middle of middle
	{
		if (layerh < pheight && ((pheight - layerh)/2) > mheight) coord[1] = (pheight - layerh)/2;
		if (((coord[1] - mheight)/2) > 20) coord[1] = coord[1] - (coord[1] - mheight)/2;
	}
	else if (mode[2].toUpperCase() == "B") // bottom
	{
		coord[1] = pheight - mheight;
	}
	return coord;
}

function js_getTopLeftPoint(mode, layer, mwidth, mheight)
{
	if (typeof(layer) == "string") layer = js_getElementById(layer);
	return js_getTopLeftCoord(mode, js_getWidth(layer), js_getHeight(layer), mwidth, mheight);
}

function js_getWindowWidth()
{
	if(js_isMinNS4)return window.innerWidth;
	if(js_isMinIE4)return document.body.clientWidth;
	return-1;
}

function js_getWindowHeight()
{
	if(js_isMinNS4)return window.innerHeight;
	if(js_isMinIE4)return document.body.clientHeight;
	return-1;
}

function js_getPageWidth()
{
	if(js_isMinNS4)return document.width;
	if(js_isMinIE4)return document.body.scrollWidth;
	return-1;
}

function js_getPageHeight()
{
	if(js_isMinNS4) return document.height;
	if(js_isMinIE4) return document.body.scrollHeight;
	return-1;
}

function js_getPageScrollX()
{
	if(js_isMinNS4)return window.pageXOffset;
	if(js_isMinIE4)return document.body.scrollLeft;
	return-1;
}

function js_getPageScrollY()
{
	if(js_isMinNS4)return window.pageYOffset;
	if(js_isMinIE4)return document.body.scrollTop;
	return-1;
}

function js_getElementById(elemId)
{
	if (typeof(elemId) == "object" || elemId.style) return elemId;
	if (js_isMinNS4) return eval("document.layers." + elemId);
	else if (js_isMinIE4) return document.all[elemId];
	return null;
}

function js_changeElementClass(elemId, cssClassName)
{
	var fv_elem = js_getElementById(elemId);
	if (fv_elem) fv_elem.className = cssClassName;
}

function js_changeObjectClass(object, cssClassName)
{
	if (object) object.className = cssClassName;
}

function js_getParentWindow()
{
	return window.parent;
}

function js_showText(elemId, text, title)
{
	elemId = js_getElementById(elemId);
	if (!elemId)
	{
		alert("Cannot find element container to show text or message!");
		return;
	}
	
	var html = "";
	html += '<table class="camTable" style="border:1px; margin:0px; background-color:gray">';
	
	if (title)
	{
		html += '<tr style="background-color:yellow"><td align="left" nowrap><span style="color:navy; font-size:8pt; font-weight:bold; margin:1px">' + title +'</span></td></tr>';
	}
	html += '<tr><td align="left"><span style="color:black; font-size:8pt; margin:1px">' + text +'</span></td></tr>';	
	html += '</table>';	
	
	elemId.innerHTML = html;
	js_moveLayerTo(elemId, js_mouseX, js_mouseY);
	js_showLayer(elemId);
}

/***** from FusionScript 2.0 *****/
/*
var js_cbeAll = new Array();
var js_cbeEventJsLoaded = true;

function _retZero() { return 0; }
function _retFull() { return 100; }
function _retNull() { return null; }
function _retEStr() { return ""; }
function _retVoid() {}
function _def()
{
	var i; 
	for (i=0; i<arguments.length; ++i)
	{
		if (typeof(arguments[i])=="" || typeof(arguments[i])=="undefined") return false;
	}
	return true;
}

function CrossBrowserNode()
{
	this.parentNode=null; 
	this.childNodes=0; 
	this.firstChild=null; 
	this.lastChild=null; 
	this.previousSibling=null; 
	this.nextSibling=null;
}
CrossBrowserNode.prototype.appendNode = function(cbeChild) { 
	if (cbeChild)
	{
		if (!this.firstChild)
		{
			this.firstChild=cbeChild;
		}
		else
		{
			cbeChild.previousSibling=this.lastChild; 
			this.lastChild.nextSibling=cbeChild;
		}
		cbeChild.parentNode=this;
		this.lastChild=cbeChild; 
		++this.childNodes;
	}
	return cbeChild;
}
CrossBrowserElement.prototype = new CrossBrowserNode;

function CrossBrowserElement()
{
	this.contains=this.left=this.top=this.offsetLeft=this.offsetTop=this.pageX=this.pageY=this.zIndex=_retZero;
	this.show=this.hide=this.moveTo=this.moveBy=this.sizeTo=this.sizeBy=this.resizeTo=this.resizeBy=_retVoid;
	this.opacity=_retFull;
	this.visibility=this.color=this.background=this.clip=this.innerHtml=_retEStr;
	if (js_cbeAll.length < 2)
	{
		this.width=cbeInnerWidth; 
		this.height=cbeInnerHeight; 
		this.scrollLeft=cbePageXOffset; 
		this.scrollTop=cbePageYOffset;
	}
	else
	{
		this.width=this.height=this.scrollLeft=this.scrollTop=_retZero;
	}
	this.id=""; 
	this.index=js_cbeAll.length; 
	js_cbeAll[this.index]=this; 
	this.w=this.h=0; 
	this.x=this.y=0;
	if (window.js_cbeEventJsLoaded) this.listeners = new Array();
}

function js_nnGetElementById(sId)
{
	for (var i=0; i < js_cbeAll.length; i++)
	{
		if ( js_cbeAll[i].id==sId ) return js_cbeAll[i].ele;
	}
	return null;
}
*/