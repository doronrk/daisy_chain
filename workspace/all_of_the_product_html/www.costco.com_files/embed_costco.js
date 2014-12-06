// JavaScript Document

RICHFX.prototype.embed_costco = function() {
  
  this.addCSSRule( '.RICHFXDragBoxFrame', 'border: 2px solid #c7c6c6; height:350px;width:350px; padding-right: 20px;' );
  this.addCSSRule( '.RICHFXFishEye', 'border: 2px solid #999999;');
  this.addCSSRule( '.RICHFXCloseUp', 'border: 2px solid #999999;' );
  this.addCSSRule( '.RICHFXCloseUpFade', 'border: 2px solid #999999;' );
  this.addCSSRule( '.RICHFXFloat', 'border: 2px solid #999999;' );
  this.addCSSRule( '.RICHFXMagnifyingGlass', 'border: 1px solid #999999;' );
  this.addCSSRule( '.RICHFXSurroundingDragBox', 'border: 0px inset #ffffff; background: #ffffff; opacity:0.3;  filter:alpha(opacity=50);' );
  this.addCSSRule( '.RICHFXColorChangeViewSelected', 'border: 1px solid #325C81' );
  
  RICHFX_CONFIG.imageDragBox = { defaults: [6] }
  RICHFX_CONFIG.zoomProgressive = { defaults: [3] }
  RICHFX_CONFIG.enlargePop = { defaults: [3] }
  RICHFX_CONFIG.enlargeFade = { defaults: [3] }
  RICHFX_CONFIG.enlargeHover = { defaults: [3] }
  RICHFX_CONFIG.zoomMagnifyingGlass = { defaults: [4] }
  RICHFX_CONFIG.colorchangePanel = { defaults: ["bottom",,true,,,,,,5] }
	

  RICHFX_CONFIG.target = [ 
  ];

  RICHFX_CONFIG.decodeMedia = {
		preprocess: function (url){
			//if ( url.indexOf("z500-") == -1 ) 
			//	url = url.replace("500-","z500-");
			
			//RICHFX.consoleDebug('[costcoEmbed] - decodeMedia: ' + url);
			if ( url.indexOf("z500-") == -1 && url.indexOf("500-") != -1 )
			{
				url = url.replace("500-", "");
				url = url.replace(".jpg", "_z.jpg");
			}
			
			url = url.replace("_119","");
			url = url.replace("_400","");
			return url;
		}
		
  };
 
}
RICHFX.prototype.embed_costco.require = [ ];

//RICHFX.consoleDebug('[costcoEmbed] - loading Embed: ');

var rfx_previousMediaID = "";
var rfx_zoomLoaded = 0;

var rfxChangeSourceImageID = "";
var rfxChangeSourceViewName = "";

function zoomIn(){
updateMedia('530258LL',1)
/*
    if (!(rfx_zoomLoaded)){
		return;
	}
	try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","js_zoomIn");
		break;
	}
	}
	catch(e){
		alert(e.message)
	}	
	*/
}
function zoomReset(){
    if (!(rfx_zoomLoaded)){
		return;
	}
	try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","js_zoomReset");
		break;
	}
	}
	catch(e){
		alert(e.message)
	}	
}
function zoomOut(){
    if (!(rfx_zoomLoaded)){
		return;
	}
	try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","js_zoomOut");
		break;
	}
	}
	catch(e){
		alert(e.message)
	}	
}

function updateMedia(mediaID,zoomOutPlease){

//RICHFX.consoleDebug('[costcoEmbed] - in updateMedia: ' + mediaID);

var mediaArray = new Array();
mediaArray = mediaID.split("_");

if ((mediaID == rfx_previousMediaID)) return;

//added for curious case of first click on  'other available colors' then back to first loaded swatch -- not sure about that 
//helps fix a bug if the base alt is clicked first -- the image was blanking

if (rfx_previousMediaID != ""){
 document.getElementById("firstFrameImage").style.visibility = "hidden";
}

rfx_previousMediaID = mediaID;	
var mediaObj = new Object();

mediaObj.mediaID = mediaID;
mediaObj.zoomOutPlease = zoomOutPlease;
if (!rfx_zoomLoaded){ return; }

try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","updateMedia",mediaObj);
		break;
	}
}
catch(e){
	alert(e.message)
}	

}


function firstLoadMedia(mediaID,firstLoad){

if ((mediaID == rfx_previousMediaID) && !(firstLoad)){ 
   return;
}
//document.getElementById("product_img").style.visibility = "hidden";
rfx_previousMediaID = mediaID;
try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","updateMedia",mediaID);
		break;
	}
}
catch(e){
	alert(e.message)
}	
	
}

function changeSwatch(mediaID){

var firstLoad = 0;
var imageObjID = "product_img";
//alert(mediaID + "--" + rfx_previousMediaID + "--" + firstLoad + "--" + rfx_zoomLoaded);
//if (((mediaID == rfx_previousMediaID) && !(firstLoad)) || !(rfx_zoomLoaded) ) return;
if ((mediaID == rfx_previousMediaID) && !(firstLoad)){ 
   return;
}
else if (!(rfx_zoomLoaded)){
   //load another image 
   
   rfx_previousMediaID = mediaID;
   //is this the safest way to get the base url?
   baseMediaURL = window.RICHFX.imageMediaURL;
   
   //document.getElementById("product_img").src = baseMediaURL + mediaID + "/FirstFrame.jpg";
   RICHFX.api(document.getElementById(imageObjID),'imageColorChange').sendEvent('changeColor', mediaID);return false;
}

document.getElementById("product_img").style.visibility = "hidden";
rfx_previousMediaID = mediaID;
/*
try {
	var objs = window.RICHFX.RFX_INTERFACE.Application_Objects;
	for (var name in objs){
		objs[name].callMethod("zoom","updateMedia",mediaID);
		break;
	}
}
catch(e){
	alert(e.message)
}	*/

RICHFX.api(document.getElementById(imageObjID),'imageColorChange').sendEvent('changeColor', mediaID);
return false;	

}


function scriptLoaded(){
    rfx_zoomLoaded = 1;
	if (rfx_previousMediaID){
		firstLoadMedia(rfx_previousMediaID,1);
	}
}



function updateZoomMin(){
	document.getElementById("navButtonZoomOut").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomout_inactive.jpg";
    document.getElementById("navButtonZoomReset").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/reset_inactive.jpg";
	document.getElementById("navButtonZoomIn").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomin.jpg";
}

function updateZoomMax(){
   document.getElementById("navButtonZoomIn").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomin_inactive.jpg";
   document.getElementById("navButtonZoomReset").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/reset.jpg";
	document.getElementById("navButtonZoomOut").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomout.jpg";
}

function updateZoom(){
    document.getElementById("navButtonZoomIn").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomin.jpg";
	document.getElementById("navButtonZoomOut").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/zoomout.jpg";
    document.getElementById("navButtonZoomReset").src = "http://solutions.preview.richfx.com/project/settings/embeds/corpbuttons/reset.jpg";
}

function scriptLoaded(){
    rfx_zoomLoaded = 1;
	if (rfx_previousMediaID){
		changeSwatch2(rfx_previousMediaID,1,rfx_imageObjID);
	}
	updateZoomMin();
}

function rfx_redrawMedia(cssTag){

    if (cssTag){
	    var imageObj = 'img[' + cssTag + ']';
		$(imageObj).each(function(){var obj=RICHFX.api(this.id, 'imageColorChange'); if(obj.redraw){ obj.redraw() }})
	}
	else {
	    $('img').each(function(){var obj=RICHFX.api(this.id, 'imageColorChange'); if(obj.redraw){ obj.redraw() }})
	}
}

function rfxProductColorChangeClick(imageID, viewName) {
	
	//http://costco6.preview.richfx.com/image/media/500-11236116-847__1.jpg
	var elemSrc = $('#' + imageID).attr('src');
	
	var srcParts = elemSrc.split("__");
	var srcStart = srcParts[0];
	srcParts = srcParts[1].split(".");
	var srcEnd = srcParts[1];
	
	$('#' + imageID).attr('src', srcStart + '__' + viewName + '.' + srcEnd);
	
	
	RICHFX.api(imageID, 'imageColorChange').sendEvent('changeView', viewName);

	rfxChangeSourceImageID = imageID;
	rfxChangeSourceViewName = viewName;
}

function rfxZoomReset() {
	document.getElementById('rfximageZoom').originalSize();
}

function viewerAwakened() {
	RICHFX.api(rfxChangeSourceImageID, 'imageColorChange').sendEvent('changeView', rfxChangeSourceViewName);
}

var headID = document.getElementsByTagName("head")[0];  
/*
var jqNode = document.createElement('script'); 
jqNode.type = 'text/javascript';
jqNode.language = 'javascript';
jqNode.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js';
headID.appendChild(jqNode);   
*/
var swfObjNode = document.createElement('script');
swfObjNode.type = 'text/javascript';
swfObjNode.language = 'javascript';
swfObjNode.src = 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js';
headID.appendChild(swfObjNode);

