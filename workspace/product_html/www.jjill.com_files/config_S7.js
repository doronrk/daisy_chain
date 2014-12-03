
// onDemandServer should be changed to point to the appropriate server
// For example, if you use s7d2.scene7.com for your requests, onDemandServer should be "s7d2.scene7.com"
var onDemandServer = "s7.jjill.com";


// Function: S7ConfigObject()
// Purpose: Constructor for the S7ConfigObject class
// Param: None
// Output: A new instantiated S7ConfigObject instance
// Notes: No need to use this function explicitly
function S7ConfigObject()
{
    this.isViewerRoot = "http://" + onDemandServer + "/is-viewers352A";
	this.isRoot		= "http://" + onDemandServer + "/is/image/";
        this.contentRoot = "http://" + onDemandServer + "/";
	this.skinsRoot = "http://" + onDemandServer + "/skins/";
	//used by js->flash communication.
	var ua        = navigator.userAgent.toLowerCase();
	this.isIeWin  = ua.indexOf('msie') != -1 && ua.indexOf('win') != -1 && ua.indexOf('opera') == -1 && ua.indexOf('webtv') == -1;
	this.isFsCommand = true;

}

S7ConfigObject.prototype.defaultInstanceName = function(img)
{
	var j = img.indexOf('?');
	var j1 = img.indexOf(',');
	if (j1 > 0 && (j < 0 || j > j1)) j = j1;
	j1 = img.indexOf(';');
	if (j1 > 0 && (j < 0 || j > j1)) j = j1;
	j1 = img.indexOf(':');
	if (j1 > 0 && (j < 0 || j > j1)) j = j1;
	j1 = img.indexOf('%3f');
	if (j1 > 0 && (j < 0 || j > j1)) j = j1;
	j1 = img.indexOf('%3F');
	if (j1 > 0 && (j < 0 || j > j1)) j = j1;
	if (j < 0) j = img.length;
	var i = img.lastIndexOf('/', j) + 1;
	return img.substring(i, j);
}

// Function: setFlashParam(int, string, int)
// Purpose: Set the Flash parameter for the DOM
// Param: inID ID number for the operation
// Param: inNAme is the name of the inner HTML object
// Param: inVale is the value of the inner HTML object
// Output: None
// Notes: No need to use this function explicitly
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
		var divinfo = "<embed src='http://" + onDemandServer + "/is-viewers/flash/gateway.swf' FlashVars='lc=" + inId + "&fq="+escape(inName + "=" + inVal)+"' width='0' height='0' type='application/x-shockwave-flash'></embed>";
		document.getElementById(divcontainer).innerHTML = divinfo;
};


// Function: docWrite(string)
// Purpose: Embeds lines directly into the document to work around the IE activeX protocols
// Param: line is the string to embed in the document
// Output: None
function docWrite(line) {
    document.write(line);
}

var S7Config		= new S7ConfigObject();

var root		= S7Config.isViewerRoot;
var imageServer		= S7Config.isRoot;

// Function: resiszeStage(int, int)
// Purpose: Function to allow for automatic resizing of the stage
// Param: inWidth is the new width of the stage
// Param: inHeight is the new height of the stage
// Output: None
// Notes: No need to use this function explicitly
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

// Function: getLayer(string)
// Purpose: Function to extract the layer object from the DOM, used by setWidth() and setHeight()
// Param: name is the name of the layer to extract
// Output: None
// Notes: No need to use this function explicitly
function getLayer(name)
{
	if (document.getElementById)
		return document.getElementById(name).style;
	if (document.all)
		return document.all[name].style;
	if (document.layers)
		return document[name];
}

// Function: setWidth(layer, int)
// Purpose: Function to automaticly set the width of a layer, used by resizeStage()
// Param: layer is a pointer to the layer to alter
// Output: None
// Notes: No need to use this function explicitly
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

// Function: setHeight(layer, int)
// Purpose: Function to automaticly set the height of a layer, used by resizeStage()
// Param: layer is a pointer to the layer to alter
// Output: None
// Notes: No need to use this function explicitly
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

// Variable definition for use in the isFlashCurrent function
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var flashDescription;

// Function: isFlashCurrent(int, int, int)
// Purpose: To check the installed version of Flash against the supplied requirement
// Param: versionMajorReq is the integer value of the lowest allowed major version supported
// Param: versionMinorReq is the integer value of the lowest allowed minor version supported
// Param: versionRevisoinReq is the integer value of the lowest allowed revision version supported
// Output: True if the installed version of Flash meets the supplied requirements, false otherwise
// Notes: This will likely fail on versions before flash 6, but since we don't 
// support versions before 6.0r65 it is ok.
//
function isFlashCurrent(versionMajorReq, versionMinorReq, versionRevisionReq) {
    var versionMajor;
    var versionMinor;
    var versionRevision;

    // This If-else block captures the values of the Major, Minor and Revsion version numbers for the installed Flash plugin
    // First checks for Netscape, and Opera version 3 orlater
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash"]) {
            // parse the description to get the version
            flashDescription = navigator.plugins["Shockwave Flash"].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            versionMajor = tempArrayMajor[0];
            versionMinor = tempArrayMajor[1];
            if (descArray[3] != "") {
                tempArrayMinor = descArray[3].split("r");
            } else {
                tempArrayMinor = descArray[4].split("r");
            }
            versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;

        }
    }
    // Next checks Internet Explorer
    else if (isIE && isWin && !isOpera) {
        try {
            var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + versionMajorReq);

            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
            // so be careful.  Of course we don't run those versions.
            axo.AllowScriptAccess = "always";
            // required for v6.x?
            var version = axo.GetVariable("$version");
            // safe to call for 6.0r47 or greater
            flashDescription = version;

            // parse the version data
            tempArray = version.split(" ");
            // ["WIN", "2,0,0,11"]
            tempString = tempArray[1];
            // "2,0,0,11"
            versionArray = tempString.split(",");
            // ['2', '0', '0', '11']

            versionMajor = versionArray[0];
            versionMinor = versionArray[1];
            versionRevision = versionArray[2];
            // should be 3???
        } catch (e) {
        }
    }

    // test version
    if (versionMajor > versionMajorReq) {
	// alerts are just for demonstration and testing, disable when in production
    	//alert("Flash Version: " + versionMajor + "," + versionMinor + "," + versionRevision + " detected");
        return true;
    }
    if (versionMajor == versionMajorReq
            && versionMinor > versionMinorReq) {
	// alerts are just for demonstration and testing, disable when in production
        //alert("Flash Version: " + versionMajor + "," + versionMinor + "," + versionRevision + " detected");
       	return true;
    }
    if (versionMajor == versionMajorReq
            && versionMinor == versionMinorReq
            && versionRevision >= versionRevisionReq) {
	// alerts are just for demonstration and testing, disable when in production
	//alert("Flash Version: " + versionMajor + "," + versionMinor + "," + versionRevision + " detected");
        return true;
    }

    // alerts are just for demonstration and testing, disable when in production
    //alert("Flash Version: " + versionMajor + "," + versionMinor + "," + versionRevision + " detected");
    return false;
}

