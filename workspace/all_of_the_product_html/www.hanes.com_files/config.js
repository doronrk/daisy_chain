/*
 * This Javacript is used for sending the runtime parameters to Flash
 * Object for changing the color swatch images as per runtime selection
 * from Color Dropdown and swatch color Block
 * 
 * Note: All the URLS used in this are register to Hanes Brand on Scene7 Server
 *  
 * @author Tarunam Verma
 * @Dated: 6/28/2010
 * 
 */

//Function creates the base Url to be used for flash Object
function S7ConfigObject()
{  
	if(location.protocol.toLowerCase() =='http:'){
		this.isViewerRoot	= "http://s7d5.scene7.com/is-viewers-4.1/";
		this.isRoot		= "http://s7d5.scene7.com/is/image/";
		this.contentRoot = "http://s7d5.scene7.com";
		this.skinsRoot = "http://s7d5.scene7.com/skins/";
	}else{
		this.isViewerRoot	= "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is-viewers-4.1/";
		this.isRoot		= "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/";
	    this.contentRoot = "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com";
		this.skinsRoot = "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/skins/";
	}
	
	//used by js->flash communication.
	var ua        = navigator.userAgent.toLowerCase();
	this.isIeWin  = ua.indexOf('msie') != -1 && ua.indexOf('win') != -1 && ua.indexOf('opera') == -1 && ua.indexOf('webtv') == -1;
	this.isFsCommand = true;

}

//To configure the Flash Object
S7ConfigObject.prototype.setFlashParam = function(inId, inName, inVal) 
{
		var divcontainer = "flash_setvariables_" + inId;
		
		if (!document.getElementById(divcontainer))
		{
			var divholder = document.createElement("div");
			divholder.id = divcontainer;
			document.body.appendChild(divholder);
		}
		//Making the <embed> tag with send parameters, in order to chage the color swatch image 
		document.getElementById(divcontainer).innerHTML = "";

		if(location.protocol.toLowerCase() =='http:'){
			var divinfo = "<embed src='http://s7d5.scene7.com/is-viewers-4.1/flash/gateway.swf' FlashVars='lc=" + inId + "&fq="+escape(inName + "=" + inVal)+"' width='257' height='422' type='application/x-shockwave-flash'></embed>";
			document.getElementById(divcontainer).innerHTML = divinfo;
		}else{
			var divinfo = "<embed src='https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is-viewers-4.1/flash/gateway.swf' FlashVars='lc=" + inId + "&fq="+escape(inName + "=" + inVal)+"' width='257' height='422' type='application/x-shockwave-flash'></embed>";
			document.getElementById(divcontainer).innerHTML = divinfo;
		}
};



function docWrite(line) {
    document.write(line);
}

var S7Config		= new S7ConfigObject();

var root		= S7Config.isViewerRoot;
var imageServer		= S7Config.isRoot;

/*
 * Function and variables used for setting up the flash Enviroment
 * @Author: Tarunam
 */

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
