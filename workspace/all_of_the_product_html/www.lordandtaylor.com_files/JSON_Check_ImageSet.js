
///////////////
//private functions and variables
var sjCallbacks=new Object();//!global variable MUST be created !
var sjErrCallbacks=new Object();//!global variable MUST be created !

function sjGetResponseLocal(inReq, inImg, inCallback, inErrCallback) {

	var tempi = inImg.indexOf("?");
	var tempmod = "";
	if(tempi >= 0){
		tempmod = inImg.substring(tempi+1);
		inImg = inImg.substring(0,tempi);
	}
	
	var urljson = S7ConfigClient.isRoot + '/' + inImg + '?' + inReq;
	
	if (tempmod){
		urljson += '&' + tempmod;
		
	}
	
	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks[id] = inCallback;
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks[id] = inErrCallback;
	}
	
	if (this.imageSet.IMAGE_SET != null) { // make new JSON request if image set already exists
		var oHead = this.document.head;
		var oScript = this.document.createElement('script');
		oScript.type = 'text/javascript';
		oScript.src = urljson;
		oHead.appendChild(oScript);
	} else {
		document.write("<script language='javascript' src='" + urljson + "'><\/script>");
	}
}

function s7jsonResponse(inArg, inId) {
	sjCallbacks[inId](inArg);
}

function s7jsonError(inArg, inId) {
	if (typeof sjErrCallbacks[inId] != 'undefined'){
		sjErrCallbacks[inId](inArg);
	}else{
		alert(inArg.message);
	}
}

function sjDebug(inPsResponse, inJsonResponse, inPsResponseParserName, inPsRequest) {
}

function sjHashCode(d) {//unix style
	if (!d || d=="") return 1;
	var h=0,g=0;
	for (var i=d.length-1;i>=0;i--) {
		var c=parseInt(d.charCodeAt(i));
		h=((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
	}
	return h;
}

function loadImageSet(inURL) {

	sjGetResponseLocal(
		'req=imageset,json',
		inURL,
		function(inArg) {
			imageSet=inArg;
						
		},
		function(inArg) {
			alert('failed loading imageset for [' + inURL + ']: ' + inArg.message);
		}
	);
}
           
           
function returnSet(obj) {
	
	var imageSetArray = obj['IMAGE_SET'].split(","); //Split the JSOn imageset response on , to get an array of main strings that each represent a main image ; swatch image for each element of the imageset
	
	for(var i=0; i<imageSetArray.length; i++){  //Step through the array and split on ; to update the imageset array so that each index is another array with the first index being the main image and the second index the swatch image.
	 
		imageSetArray[i] = imageSetArray[i].split(";");
	
	}
	
	return imageSetArray;  //Return the generated array so that it can be used when swapping images in the main page.
	
	}
	
function generateSwatches(swatchArray){
 
  var retstr = "";
  
  for(i=0; i<swatchArray.length; i++){
	 //setup the response that would go into the page for the swatch images
	 retstr=retstr + '<a href="javascript:swapImage(\'' + swatchArray[i][0] + '\')">';           
   retstr=retstr + '<img class="thumb" src="' + S7ConfigClient.isRoot + swatchArray[i][1] + '?$THUMBSMALL$"/>'; 
   retstr=retstr + '</a>'; 
                
	}
	return retstr;
}

function swapImage(image, overlay){

	//document.getElementById('mainImage').src = S7ConfigClient.isRoot + image + '?$PDPLARGE$';
	
	// load image into vieer
	var path = S7ConfigClient.isRoot + image + "?";
	if(overlay != null){
		path = path + overlay;
	}
	var SUZEPICKS = null;
	if(prodImageOverlay != null && prodImageOverlay != undefined){
		SUZEPICKS = prodImageOverlay;
	}
	if(SUZEPICKS != null){
		path = path + "$PDPLARGE$" + "&$" + SUZEPICKS + "$";
	}
	else{
		path = path + "$PDPLARGE$";
	}
	sjFlyout("flyzoom", path);

}