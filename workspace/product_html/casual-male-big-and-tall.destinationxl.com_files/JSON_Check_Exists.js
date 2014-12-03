
///////////////
//private functions and variables
var sjCallbacks=new Object();//!global variable MUST be created !
var sjErrCallbacks=new Object();//!global variable MUST be created !

function sjGetResponseLocal(inReq, inImg, inCallback, inErrCallback, documentReady) {

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
	
	// adding check to use document.write for quick view to allow images to load
	if(documentReady){
		document.write("<script language='javascript' src='" + urljson + "'><\/script>");
	} else {
		$('head').append("<script language='javascript' src='" + urljson + "'><\/script>");
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

function loadimagexists(inURL,callback,isFromQuickView) {

	sjGetResponseLocal(
		'req=exists,json',
		inURL,
		function(inArg) {
			imagexists=inArg;
			callback();
		},
		function(inArg) {
			alert('failed loading imageset for [' + inURL + ']: ' + inArg.message);
		},
		isFromQuickView
	);
}
           
           
function imageExists(obj) {
	
	var exists = false;  //variable that will be returned from the function, initially presumed to be false
	
	
	if (obj['catalogRecord.exists'] == 1)  //If the JSOn response indicates that the catalog record exists
		exists = true;  //set the return boolean to true
		
	
	return exists;
	
	}