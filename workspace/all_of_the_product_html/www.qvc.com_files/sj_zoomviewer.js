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

function SjZViewer(baseServer,baseImage,width,height,newWidth, newHeight,transparency, imgVersion,inView,pageId,inParams){
	this.baseServerUrl = baseServer;
	this.onEvent = new Object();
	this.SjElement = SjElement;
	this.SjElement(); 	
	if (typeof tsj != 'undefined'){
		this.codePath		= tsj.path;
	}else if(typeof sj != 'undefined'){
		this.codePath		= sj.path;
	}else{
		this.codePath		= '../dhtml/';
	}
	if ((typeof inView == 'undefined') || (inView == null)) {
		inView = 'izView';
	}
    if (sjGetElement(inView)){
		width = parseInt(sjGetElement(inView).offsetWidth);
		height = parseInt(sjGetElement(inView).offsetHeight);
		var str="";
		str+=' <div id='+this._elementId+'_base';
		str+=' STYLE="position:relative;width:' + width + 'px;height:' + height + 'px;">';
		str+='<table id='+this._elementId+'_tbl_base'+' STYLE="width:' + width + 'px;height:' + height + 'px;border:0px solid #ffffff;"  cellspacing=0 cellpadding=0 >';
		str+=' <tr style="HEIGHT:'+height+'px;"><td>';
		str +='<img id='+this._elementId+'_img';
		str +=' src='+this.codePath+"images/spacer.gif"
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + 0 + 'px;"';
		str +=' border="0"'; 
		str +=' >'; 
		str+=' <div  id='+this._elementId;
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + height + 'px;">';
		str+=' </div> ';
		str+=' </td></tr>';
		str+=' </table> ';
		str+=' </div> ';
		sjSetLayerHTML(inView,str);
		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this.elem_base=sjGetElement(this._elementId+'_base');
		this.elem_base._elementId = this._elementId+'_base';
		this.x = 0;
		this.y = 0;
	}else{
		var str="";
		str+=' <div id='+this._elementId+'_base';
		str+=' STYLE="position:relative;width:' + width + 'px;height:' + height + 'px;">';
		str+='<table id='+this._elementId+'_tbl_base'+' STYLE="width:' + width + 'px;height:' + height + 'px;border:0px solid #ffffff;"  cellspacing=0 cellpadding=0 >';
		str+=' <tr style="HEIGHT:'+height+'px;"><td>';
		str +='<img id='+this._elementId+'_img';
		str +=' src='+this.codePath+"images/spacer.gif"
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + 0 + 'px;"';
		str +=' border="0"'; 
		str +=' >'; 
		str+=' <div  id='+this._elementId;
		str+=' STYLE="position:absolute;left:0px;top:0px;width:' + width + 'px;height:' + height + 'px;">';
		str+=' </div> ';
		str+=' </td></tr>';
		str+=' </table> ';
		str+=' </div> ';
			document.write(str);

		this.elem=sjGetElement(this._elementId);
		this.elem._elementId = this._elementId;
		this.elem_base=sjGetElement(this._elementId+'_base');
		this.elem_base._elementId = this._elementId+'_base';
		this.x = 0;
		this.y = 0;
	}

	this.transparency = transparency;

    if (inParams){
		this.params = this.makeParamObject(inParams);
		if ( typeof this.params.persistence  != 'undefined') {
			this.cookieExpiration = getExpDate(0, 0, this.params.persistence);//by default 30min
		}
		var st = sjIS.getCookie(escape(baseImage+".state"));
		this.state = st.split(';');
	}

	this.zviewer = new SjZoom(this.elem,baseServer+baseImage,width,height,true,true,true,this.transparency);
	var oMap = document.getElementById('s7map_'+this.zviewer._elementId);
	if (oMap){
		document.body.removeChild(oMap);
	}
    oMap = document.createElement('map');
	oMap.id= 's7map_'+this.zviewer._elementId;
	oMap.name= 's7map_'+this.zviewer._elementId;
	if (typeof oMap!="undefined"){
	   if (document.all) {
			document.body.insertAdjacentHTML('afterBegin',' <map id="' + oMap.id +'" name="'+oMap.name+'"></map> ');
	   } else if (document.getElementById) {
			document.body.appendChild(oMap);
	   }
  	}
    this.zviewer.toXY(0,0);
	this.zviewer.initHandlers();
	 
	//if (((baseServer) && (baseImage)) && ((newWidth)&&(newHeight)&&(imgVersion))){
	if (((baseServer) && (baseImage)) && ((newWidth)&&(newHeight))){
		this.zviewer.changeContext(baseServer+baseImage,null,null,null,null,newWidth, newHeight, imgVersion,pageId);
	}else if ((baseServer) && (baseImage)){
		this.zviewer.changeContext(baseServer+baseImage,null,null,null,null,null,null,pageId);
	}
	var sjZoomViewer = this;
	this.zviewer.addEventListener('endZoom', 
		function (o){
				switch(o.target.state){
					case "zoomIn":
					if (sjZoomViewer.onEvent.onImageZoomedIn){
						sjZoomViewer.onEvent.onImageZoomedIn(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
					break;
					case "zoomOut":
					if (sjZoomViewer.onEvent.onImageZoomedOut){
						sjZoomViewer.onEvent.onImageZoomedOut(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
						break;
					case "reset":
					if (sjZoomViewer.onEvent.onImageResetted){
						sjZoomViewer.onEvent.onImageResetted(1+Math.log(o.target.defaultScl/o.target.currentScl)/Math.log(o.target.zoom_factor));
					}
						break;
					case "changeContext":
					if (sjZoomViewer.onEvent.onImageChanged){
						sjZoomViewer.onEvent.onImageChanged(o.target.oldImage,o.target.mainURL);
					}
						break;
					case "setRGN":
					if (sjZoomViewer.onEvent.onRegionSet){
						sjZoomViewer.onEvent.onRegionSet(o.target.currentRGN);
					}
						break;
				}  
			return false;
		}
	);
}

SjZViewer.prototype = new SjElement();

SjZViewer.prototype.addToPage = function(absolutePos) {
/*
if(absolutePos) {
		sjGetElementStyle(this.elem_base._elementId).position='absolute'; 
		sjSetXY(this.elem_base._elementId,this.x,this.y);
	}else{ 
		sjGetElementStyle(this.elem_base._elementId).position ='relative';
	    this.zviewer.toXY(0,0);
	}
*/
};

SjZViewer.prototype.enableNav = function(position,inX,inY,inWidth,inHeight) {	
	if( position >= 1 && position <= 4 ) {
		return (this.zviewer.enableNav(position,null,null,50,50)); 
	}else if( position > 4 ) {
		return (this.zviewer.enableNav(position,inX,inY,inWidth || 50,inHeight || 50)); 
	};
};

SjZViewer.prototype.setBorderNav = function(sz,inColor) {	
	if (this.zviewer.navLayer){
		this.zviewer.navLayer.setBorder(sz,inColor); 
	}
};

SjZViewer.prototype.setBackground = function(bgColor) {
	if (bgColor.toLowerCase() == "transparent"){
		bgColor = "";
	}
	if( ""+bgColor != "undefined" && ""+bgColor.length > 6 ) {
		this.zviewer.color("#"+bgColor.substr(bgColor.length-6)); 
		if (this.zviewer.navLayer){
			this.zviewer.navLayer.color("#"+bgColor.substr(bgColor.length-6)); 
		}
	} else {
		this.zviewer.color(bgColor); 
		if (this.zviewer.navLayer){
			this.zviewer.navLayer.color(bgColor.substr(bgColor.length-6)); 
		}
	};
};

/*
SjZViewer.prototype.setImage = function(img, reset, newWidth, newHeight, imgVersion) { 
	if (reset || (this.zviewer.initialScl == this.zviewer.currentScl)){
		this.zviewer.changeContext(img,null,null,null,null,newWidth, newHeight, imgVersion);
	}else{
		this.zviewer.changeContext(img,this.zviewer.currentX,this.zviewer.currentY,this.zviewer.currentScl,null,newWidth, newHeight, imgVersion);
	}
};
*/
SjZViewer.prototype.setImage = function(img, reset, newWidth, newHeight, imgVersion,pageId) { 
	if (this.zviewer.foreImage._fadeid) {
		clearTimeout(this.zviewer.foreImage._fadeid);
		this.zviewer.foreImage._fadeid = null;
	}
	if (reset || (this.zviewer.initialScl == this.zviewer.currentScl)){
		this.zviewer.changeContext(img,null,null,null,null,newWidth, newHeight, imgVersion,pageId);
	}else{
		this.zviewer.changeContext(img,this.zviewer.currentX,this.zviewer.currentY,this.zviewer.currentScl,null,newWidth, newHeight, imgVersion,pageId);
	}
};

SjZViewer.prototype.setBrochureImage = function(img, reset, defaultScl, newWidth, newHeight, imgVersion,pageId) { 
	if (this.zviewer.foreImage._fadeid) {
		clearTimeout(this.zviewer.foreImage._fadeid);
		this.zviewer.foreImage._fadeid = null;
	}
	if (reset || (this.zviewer.initialScl == this.zviewer.currentScl)){
		this.zviewer.changeContext(img,null,null,null,defaultScl,newWidth, newHeight, imgVersion,pageId);
	}else{
		this.zviewer.changeContext(img,this.zviewer.currentX,this.zviewer.currentY,this.zviewer.currentScl,defaultScl,newWidth, newHeight, imgVersion,pageId);
	}
};

SjZViewer.prototype.setFadeTime = function(inFadeTime) { 
	this.zviewer.fadeTime = inFadeTime*1000; 
};

SjZViewer.prototype.setTurnTime = function(inTurnTime) { 
	this.zviewer.turnTime = inTurnTime*1000; 
};

SjZViewer.prototype.setTransitionTime = function(inTransitionTime) { 
	this.zviewer.transitionTime = inTransitionTime*1000; 
};

SjZViewer.prototype.setWaitIconTimer = function(inTimerStr){
	var tempStr = inTimerStr.split(",");
	this.zviewer.waitIconTimer.showDelay = (tempStr[0]-0)*1000;
	this.zviewer.waitIconTimer.hideDelay = (tempStr[1]-0)*1000;
}


SjZViewer.prototype.setMaxZoom = function(limit) {	
	this.zviewer.setMaxZoom(this.zviewer.max_zoom,this.zviewer.zoom_factor*limit/100,limit/100); 
};

SjZViewer.prototype.setZoomStep = function(amount) {	
	if (amount == 0){
		var d = this.zviewer.defaultScl/Math.pow(this.zviewer.zoom_factor , 0);
		this.zviewer.setMaxZoom(1,d); 
	}else{
		this.zviewer.setMaxZoom(this.zviewer.max_zoom, Math.pow(2,1/amount),this.zviewer.zoom_factor_limit); 
	}
};

SjZViewer.prototype.zoomOut = function() {	
	this.zviewer.ZoomOut(this.zviewer.backImage); 
};

SjZViewer.prototype.zoomIn = function() {	
	this.zviewer.ZoomIn(this.zviewer.backImage);
};

SjZViewer.prototype.pan = function(direction,amount) {	
	var directionX=0;
	var directionY=0;
	switch(direction){
		case 'leftup':
			directionX=-1;directionY=-1;
			break;
		case 'up':
			directionX=0;directionY=-1;
			break;
		case 'rightup':
			directionX=1;directionY=-1;
			break;
		case 'left':
			directionX=-1;directionY=0;
			break;
		case 'right':
			directionX=1;directionY=0;
			break;
		case 'leftdown':
			directionX=-1;directionY=1;
			break;
		case 'down':
			directionX=0;directionY=1;
			break;
		case 'rightdown':
			directionX=1;directionY=1;
			break;
	}
	this.zviewer.pan(this.zviewer.backImage,directionX,directionY,amount); 
};

SjZViewer.prototype.reset = function() {			
	this.zviewer.ResetView(this.zviewer.backImage); 
};

SjZViewer.prototype.initialRGN = function(rgn) {		
	this.zviewer.ZoomInit(rgn,"rgn"); 
};

SjZViewer.prototype.initialRGNN = function(rgn) {
	this.zviewer.ZoomInit(rgn,"rgnn"); 
};

SjZViewer.prototype.initialRGNA = function(rgn) {		
	this.zviewer.ZoomInit(rgn,"rgna"); 
};

SjZViewer.prototype.setRGN = function(rgn) {		
	this.zviewer.ZoomSet(rgn,"rgn"); 
};

SjZViewer.prototype.setRGNN = function(rgn) {		
	this.zviewer.ZoomSet(rgn,"rgnn"); 
};

SjZViewer.prototype.setRGNA = function(rgn) {		
	this.zviewer.ZoomSet(rgn,"rgna"); 
};

SjZViewer.prototype.setBorder = function(sz,bgColor) {	
	var w =	parseInt(sjGetWidth(this.elem_base._elementId));
	var h =	parseInt(sjGetHeight(this.elem_base._elementId));
	var bgColor = bgColor || "#666666";
	var sz = sz || 0;
		if( ""+bgColor != "undefined" && ""+bgColor.length > 6 ) {
//			sjSetBackColor(this.elem_base._elementId,"#"+bgColor.substr(bgColor.length-6));
			sjSetBackColor(this._elementId+'_img',"#"+bgColor.substr(bgColor.length-6));
			sjSetBorder(this._elementId+'_tbl_base',sz,'solid',"#"+bgColor.substr(bgColor.length-6));
			if (this.zviewer.navLayer)
				sjSetBorder(this.zviewer.navLayer._elementId,1,'solid',"#"+bgColor.substr(bgColor.length-6));
		} else {
//			sjSetBackColor(this.elem_base._elementId,bgColor);
			sjSetBackColor(this._elementId+'_img',bgColor);
			sjSetBorder(this._elementId+'_tbl_base',sz,'solid',bgColor);
			if (this.zviewer.navLayer)
				sjSetBorder(this.zviewer.navLayer._elementId,1,'solid',bgColor);
		};
			sjSetWidth(this.elem_base._elementId, w+2*sz);
			sjSetHeight(this.elem_base._elementId, h+2*sz);
			sjSetWidth(this._elementId+'_tbl_base', w+2*sz);
			sjSetHeight(this._elementId+'_tbl_base', h+2*sz);
			sjSetXY(this.elem._elementId, sz,sz);
			this.zviewer.imgBorder = sz;
};

SjZViewer.prototype.setFormat = function(str) {		
	this.zviewer.setFormat(str); 
};

SjZViewer.prototype.setCachingModel = function(str) {	
	this.zviewer.setCachingModel(str); 
};

SjZViewer.prototype.addInformation = function(str) {	
	this.zviewer.addInformation(str); 
};

SjZViewer.prototype.setHelpPage = function(str,w,h) {	
	this.zviewer.setHelpPage(str,w,h); 
};

SjZViewer.prototype.initialRGN = function(rgn) {		
	this.zviewer.ZoomInit(rgn,"rgn"); 
};

SjZViewer.prototype.initialRGNN = function(rgn) {		
	this.zviewer.ZoomInit(rgn,"rgnn"); 
};

SjZViewer.prototype.initialRGNA = function(rgn) {		
	this.zviewer.ZoomInit(rgn,"rgna"); 
};

SjZViewer.prototype.advanced = function( zoomAmount,tiles,percision,transitionLoops,buf_size ) {
	this.zviewer.advanced( zoomAmount,tiles,percision,transitionLoops,buf_size );
};


SjZViewer.prototype.enableUI = function(imgFolder,offset,spacing) {
		sjSetHeight(this.elem_base._elementId,parseInt(sjGetHeight(this._elementId+'_tbl_base'))+20-Math.min(20,offset)+1);
		//sjSetHeight(this._elementId+'_tbl_base',parseInt(sjGetHeight(this._elementId+'_tbl_base'))+20-Math.min(20,offset)+1);
		sjSetHeight(this._elementId+'_img',20-Math.min(20,offset)+1);
		sjSetWidth(this._elementId+'_img',parseInt(sjGetWidth(this._elementId+'_tbl_base')));
		sjSetXY(this._elementId+'_img',0,parseInt(sjGetHeight(this._elementId+'_tbl_base')));
		this.zviewer.enableUI(imgFolder,offset,spacing);
};

SjZViewer.prototype.enableCloseButton = function(position) {	
	this.zviewer.enableCloseButton(position); 
};

SjZViewer.prototype.showInformation = function() {
	this.zviewer.showInformation();
}

////////
SjZViewer.prototype.setClickToZoom = function(inState){
	return (this.zviewer.clickToZoom = inState);
}

///////
SjZViewer.prototype.setAltText = function(inTooltip){
	if (this.zviewer.mapImage){
		sjGetElement(this.zviewer.mapImage.img._uId).alt = inTooltip;
		sjGetElement(this.zviewer.mapImage.img._uId).title = inTooltip;
	}else if(this.zviewer.foreImage){
		sjGetElement(this.zviewer.foreImage.img._uId).alt = inTooltip;
		sjGetElement(this.zviewer.foreImage.img._uId).title = inTooltip;
	}
}

///////
SjZViewer.prototype.getViewerState = function() {
    var i = -1;
	var idx = 0;
	for (i = 0; i < this.zviewer.pageId.length; i++) {
        if (this.zviewer.pageId.charAt(i).charCodeAt(0) >= 48 && this.zviewer.pageId.charAt(i).charCodeAt(0) <= 57) {
            break;
        }
    }
	if (i < this.zviewer.pageId.length){
		idx = parseInt(this.zviewer.pageId.substring(i));
	}
	var stateForXML = "";	
	stateForXML += '<state version="1">';
	stateForXML += '<ilc>';
	stateForXML += '<currentImageIdx>'+idx+'</currentImageIdx>';
	stateForXML += '</ilc>';
	stateForXML += '<zpc>';
	stateForXML += '<scale>'+this.zviewer.currentScl+'</scale>';
	stateForXML += '<center>';
	stateForXML += '<x>'+Math.round(this.zviewer.currentScl*(-this.zviewer.currentX+this.zviewer.viewSize.width/2))+'</x>';
	stateForXML += '<y>'+Math.round(this.zviewer.currentScl*(-this.zviewer.currentY+this.zviewer.viewSize.height/2))+'</y>';
	stateForXML += '</center>';
	stateForXML += '</zpc>';
	stateForXML += '</state>';
	return stateForXML;
}

///////
SjZViewer.prototype.makeParamObject = function(inParams){
	var paramObject = null;
	if ((typeof inParams != 'undefined') && (inParams!= null)){
		var paramObject = new Object();
		for (var i = 0; i < inParams.length; i+=2){
			paramObject[inParams[i]] = inParams[i+1];
		}
	}
	return paramObject;
}
///////
SjZViewer.prototype.setHotSpotEnable = function(inState){
	return (this.zviewer.hotSpotEnable = inState);
}
///////
SjZViewer.prototype.imageLabel = function(inLabel){
	if (typeof inLabel != 'undefined'){
		this.zviewer.oimgLabel = this.zviewer.imgLabel;
		this.zviewer.imgLabel = inLabel;
	}
	return this.zviewer.imgLabel;
}

