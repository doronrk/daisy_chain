
function S7ConfigObject()
{  //Please host this file on your own web server (do not reference from s7testis.adobe.com) and change the urls below to match your assigned image server urls
	this.isViewerRoot	= alternateConfigImagePath + "/is-viewers/";
	this.isRoot		= alternateConfigImagePath + "/is/image/";
   this.contentRoot = alternateConfigImagePath;
	this.skinsRoot = alternateConfigImagePath + "/skins/";
	//used by js->flash communication.
	var ua        = navigator.userAgent.toLowerCase();
	this.isIeWin  = ua.indexOf('msie') != -1 && ua.indexOf('win') != -1 && ua.indexOf('opera') == -1 && ua.indexOf('webtv') == -1;
	this.isFsCommand = true;

}

S7ConfigObject.prototype.setFlashParam = function(inId, inName, inVal) 
{
		var divcontainer = "flash_setvariables_" + inId;
		if (!document.getElementById(divcontainer))
		{
			var divholder = document.createElement("div");
			divholder.id = divcontainer;
			document.body.appendChild(divholder);
		}
		document.getElementById(divcontainer).innerHTML = "";
		var divinfo = "<embed src='" + alternateConfigImagePath + "/is-viewers/flash/gateway.swf' FlashVars='lc=" + inId + "&fq="+escape(inName + "=" + inVal)+"' width='0' height='0' type='application/x-shockwave-flash'></embed>";
		document.getElementById(divcontainer).innerHTML = divinfo;
};



function docWrite(line) {
    document.write(line);
}

var S7Config		= new S7ConfigObject();

var root		= S7Config.isViewerRoot;
var imageServer		= S7Config.isRoot;

//autoResize functions
function resizeStage(inWidth, inHeight)
{
	var elementId = myName;
	var isSafari = ((navigator.appName=='Safari') || (navigator.userAgent.toLowerCase().indexOf('safari')>-1));
	var elm = null;
	if (!isSafari)
	{
		elm = document.embeds[elementId];
	}
	var checkElm = false;
	if (elm)
	{
		checkElm = true;
	}
	else
	{
		checkElm = false;
	}

	if (!isSafari && checkElm)
	{
		elm.width = inWidth;
		elm.height= inHeight;
	}
	else
	{
		setWidth(elementId, inWidth);
		setHeight(elementId, inHeight);
	}
}

function getLayer(name)
{
	if (document.getElementById)
		return document.getElementById(name).style;
	if (document.all)
		return document.all[name].style;
	if (document.layers)
		return document[name];
}

function setWidth(layer,w)
{
	layer=getLayer(layer);
	if (document.getElementById)
		layer.width=w;
	else if (document.all)
		layer.posWidth=w;
	else if (layer.clip)
		layer.clip.width=w;
}

function setHeight(layer,h)
{
	layer=getLayer(layer);
	if (document.getElementById)
		layer.height=h;
	else if (document.all)
		layer.posHeight=h;
	else if (layer.clip)
		layer.clip.height=h;
}

function genInstance(){
 var curDateTime = new Date();
 var curTime = 'ZoomMX' + curDateTime.getHours()+ curDateTime.getMinutes() + curDateTime.getSeconds();
  return curTime;
 }
