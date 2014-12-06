// ***************************************
// NOTICE OF COPYRIGHT
//
// Permission is granted to use and
// distribute this work in conjunction
// with licensed server software from DepLabs, Inc.
//
// Except as permitted above no part of
// this work may be reproduced in whole
// or in part in any manner without the
// permission of the copyright owner.
//
// Copyright (C) 2004 By DepLabs, Inc.
// ***************************************

/**
 * Creates the appropriate viewer by reading the querystring and/or detecting
 * browser capabilities.
 *
 * viewerWidth : width of the viewer on the page
 * viewerHeight: height of the viewer on the page
 * imgSrc: full path to the initial image to be shown in the viewer
 * imgWidth: width of the initial image
 * imgHeight: height of the initial image
 *

 */
function createViewer( viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,movie,id,detailImageWidth,flashVarValues ) {
	
    var qs = querystring("flash");

    if (qs && qs.toLowerCase() == "yes" ) {
        return new FlashViewer(viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,movie,id,flashVarValues);
    }
    else if (qs && qs.toLowerCase() ==  "no" ) {
        return new JavaScriptViewer(viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,id,detailImageWidth );
    }

    // need to detect
    if (browserInfo.flashVersion >= 6) {
        return new FlashViewer(viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,movie,id,flashVarValues);
    }
    else {
        return new JavaScriptViewer(viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,id,detailImageWidth );
    }

}


function FlashViewer(  viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,movie,id,flashVarValues ) {
    this.viewerWidth = viewerWidth;
    this.viewerHeight = viewerHeight;
    this.imgSrc = imgSrc;
	this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
	this.movie =movie;
	this.id=id;
    this.flashVarValues =flashVarValues;
}



/*
 * Writes the flash player plugin code.  Required values are defined in
 * the constructor
 */
FlashViewer.prototype.writeZoomWindow = function() {
	
	
	document.write( '  <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="' + this.viewerWidth + '" HEIGHT="' + this.viewerHeight + '" id="'+this.id+'" ALIGN="">');
    document.write( '     <PARAM NAME="movie" VALUE="' + this.movie + '">' );
	document.write('	<PARAM NAME=FlashVars VALUE="'+ this.flashVarValues + '">' );
    document.write( '     <PARAM NAME="quality" VALUE="high">' );
	document.write( '     <PARAM NAME="wmode" VALUE="transparent"><param name="scale" value="noscale"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always">' );
    document.write( '     <PARAM NAME="bgcolor" VALUE="#FFFFFF"><embed src="' + this.movie + '" FlashVars="'+ this.flashVarValues +'" quality="high" bgcolor="#FFFFFF" width="' + this.viewerWidth + '" height="' + this.viewerHeight +'" name="'+this.id+'" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"  wmode="transparent" >' );
    document.write( '  </OBJECT>' );
	jQuery(document).ready(function(){jQuery('#zoomText').show();});
	//document.write( "</div");
}


FlashViewer.prototype.swapZoomImage = function(imgSrc) {
	var app =getFlexApp(this.id);
	app.changeZoomImageSrc(imgSrc);
}



function JavaScriptViewer(  viewerWidth, viewerHeight, imgSrc, imgWidth, imgHeight,id,detailImageWidth ) {
    this.viewerWidth = viewerWidth;
    this.viewerHeight = viewerHeight;

    this.imgSrc = imgSrc;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
	this.detailImageWidth=detailImageWidth;
}


/*
 * Writes the player code.
 * For JavaScript this is just the appropriately sized image.
 */
JavaScriptViewer.prototype.writeZoomWindow = function() {
	var imgUrl = this.imgSrc
	    + "&wid=" + this.detailImageWidth + "&cvt=jpeg" ;
	document.write( "<div id='mainIMG'><img class=bordertrends id='zoomImg' src='" + imgUrl + "' /></div>");
    // document.write( "</div");
}

JavaScriptViewer.prototype.swapZoomImage = function(imageUrl,detailImageWidth) {
	var imgUrl = imageUrl + "&wid=" + detailImageWidth + "&cvt=jpeg" ;
	var zoomImg = document.getElementById( "zoomImg" );
	zoomImg.src = "";
    zoomImg.src = imgUrl;
}




function getFlexApp(appName){
  if (navigator.appName.indexOf ("Microsoft") !=-1)
  {
	var app =window[appName];
   if(typeof(app) == "undefined") {
		app=document[appName];
	}
	if(app.length){return document[appName];}
	else {return app;}
  } 
  else 
  {
    return document[appName];
  }
}