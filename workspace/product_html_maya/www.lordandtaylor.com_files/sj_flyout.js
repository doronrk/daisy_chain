/*
ADOBE CONFIDENTIAL
Copyright 2009 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/

//effects&utility////////////////////////////////////////////////////////////////////////////////////////////
sj=[];
sj.path='../dhtml/';
sj.version = '5.1.1';

var isIOS = ((navigator.userAgent.indexOf('Safari') != -1) && (navigator.userAgent.indexOf('Mobile') != -1) && (navigator.userAgent.indexOf('AppleWebKit') != -1));

function checkPath(){
	if (typeof(sj_codebase)!="undefined"){
		if (sj_codebase.substring(sj_codebase.length-1)!='/' && sj_codebase!='') 
			sj_codebase+='/'; 
		sj.path=sj_codebase;
	}
	return sj.path;
}

function sjPBreak(str) {
	return( (str.indexOf("?")>=0?"&":"?") );
};

Number.prototype.NaN0=function() { return isNaN(this) ? 0 : this; }

function findPos(obj){
var x = 0;
var y = 0;
var dx = 0;
var dy = 0; 
	while( obj != null ){
		if( window.getComputedStyle ) {
		  dx = window.getComputedStyle(obj,null).borderLeftWidth;
		  dy = window.getComputedStyle(obj,null).borderTopWidth;
		} else if( obj.currentStyle ) {
		  dx = obj.currentStyle.borderLeftWidth;
		  dy = obj.currentStyle.borderTopWidth;
		}
		x += obj.offsetLeft + parseInt(dx).NaN0();
		y += obj.offsetTop +parseInt(dy).NaN0();
		obj = obj.offsetParent ;
	}
	return [x,y];
}

function getDim(obj){
var w = 0;
var h = 0;
	if( window.getComputedStyle ) {
	  w = window.getComputedStyle(obj,null).width;
	  h = window.getComputedStyle(obj,null).height;
	} else if( obj.currentStyle ) {
	  w = obj.currentStyle.width;
	  h = obj.currentStyle.height;
	}
	return [w,h];
}

function sjFixPNG (img) {
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (version <=9) && (document.body.filters) && (img.src.indexOf("images/spacer.gif") == -1)){
		var src = img.src;
		img.style.width = img.width + "px";
		img.style.height = img.height + "px";
		img.style.backgroundImage="none";
		if (img.filters){
			if (img.filters.length>0){
				if (img.filters["DXImageTransform.Microsoft.AlphaImageLoader"]){
					img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = encodeURI(src);
					img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = 'scale';
					img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").enabled = true;
					img.src = checkPath()+"images/spacer.gif";
				}else{
					img.style.filter += " progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='" + encodeURI(src) + "', sizingMethod='scale')";
				}	
			}else{
				img.style.filter = " progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='" + encodeURI(src) + "', sizingMethod='scale')";
			}
			img.src = checkPath()+"images/spacer.gif";
		}
	}
};

function sjSetOpacity(inObj,inOpacity) {
    if(inOpacity < 0) inOpacity = 0; 
	if(inOpacity > 99) inOpacity = 99.999999;
	inObj.style.opacity = (inOpacity / 100);
	inObj.style.MozOpacity = (inOpacity / 100);
	inObj.style.KhtmlOpacity = (inOpacity / 100);
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (version <=9) && (document.body.filters)){
		if(inOpacity > 99){
			inOpacity = 100;
			inObj.style.opacity = (inOpacity / 100);
		}
		if (inObj.filters){
			if (inObj.filters.length>0){
				if (inObj.filters["DXImageTransform.Microsoft.Alpha"]){
					inObj.filters.item("DXImageTransform.Microsoft.Alpha").Opacity = inOpacity;
				}else{
					inObj.style.filter += " progid:DXImageTransform.Microsoft.Alpha(opacity="+inOpacity+")"; 
				}	
			}else{
				inObj.style.filter = " progid:DXImageTransform.Microsoft.Alpha(opacity="+inOpacity+")"; 
			}
		}
	}
	inObj.opacity = inObj.style.opacity;
	return inObj.opacity;
}

function sjFadeEffect(inObj,fromOpacity, toOpacity, time, fps,callback){
	inObj.effectStartTime	= new Date().getTime();
	inObj.time	= time;
	if(typeof inObj._fadeOpId != 'undefined'){
		clearTimeout(inObj._fadeOpId);
		inObj._fadeOpId = null;
	}
	var steps = Math.ceil(fps * (time / 1000));
	var delta = (toOpacity - fromOpacity) / steps;
	sjFadeOpacityStep(inObj,0, steps, fromOpacity, delta, (time / steps),callback);
}

function sjFadeOpacityStep(inObj,stepNum, steps, fromOpacity, delta, timePerStep,callback){
	var dt = new Date().getTime() - inObj.effectStartTime;
	sjSetOpacity(inObj,Math.round(fromOpacity + (delta * stepNum)));
    if (dt <= inObj.time){
		stepNum = Math.round(steps * dt / inObj.time);
        inObj._fadeOpId = setTimeout(function(){
									sjFadeOpacityStep(inObj,(stepNum+1),steps,fromOpacity ,delta,timePerStep,callback );
								}, timePerStep);
	}else{
		if (callback){
			callback();
		}
	}
}

////////////////////
//	'wipeLR', 'wipeRL', 'wipeTB', 'wipeBT' 
////////////////////
function sjShutterEffect(inObj,fromClip, toClip, direction, time, fps,callback){
	inObj.effectStartTime	= new Date().getTime();
	inObj.time	= time;
	if(typeof inObj._shutterOpId != 'undefined'){
		clearTimeout(inObj._shutterOpId);
		inObj._shutterOpId = null;
	}
	var steps = Math.ceil(fps * (time / 1000));
	var delta = new Object();
	delta.top = (toClip.top - fromClip.top) / steps;
	delta.right = (toClip.right - fromClip.right) / steps;
	delta.bottom = (toClip.bottom - fromClip.bottom) / steps;
	delta.left = (toClip.left - fromClip.left) / steps;
	shutterStep(inObj,0, steps, fromClip, direction, delta, Math.ceil(time / steps), callback);
}

function shutterStep(inObj,stepNum, steps, fromClip, direction, delta, timePerStep,callback){
	var dt = new Date().getTime() - inObj.effectStartTime;
	//rect(top right bottom left) 
	switch(direction){
		case 'top':
			inObj.style.clip = 'rect(' +
				Math.round(inObj.offsetHeight - inObj.offsetHeight/100*(fromClip.bottom + delta.bottom * stepNum)) + 'px, ' +
				inObj.offsetWidth + 'px, ' +
				inObj.offsetHeight + 'px, ' +
				'0px' +
			')';
			inObj.clipArea = Math.round(fromClip.bottom + (delta.bottom * stepNum));
			break;
		case 'right':
			inObj.style.clip = 'rect(' +
				'0px, ' +
				Math.round(inObj.offsetWidth/100*(fromClip.right + delta.right * stepNum)) + 'px, ' +
				inObj.offsetHeight + 'px, ' +
				'0px' +
			')';
			inObj.clipArea = Math.round(fromClip.right + (delta.right * stepNum));
			break;
		case 'bottom':
			inObj.style.clip = 'rect(' +
				'0px, ' +
				inObj.offsetWidth + 'px, ' +
				Math.round(inObj.offsetHeight/100*(fromClip.bottom + delta.bottom * stepNum)) + 'px, ' +
				'0px' +
			')';
			inObj.clipArea = Math.round(fromClip.bottom + (delta.bottom * stepNum));
			break;
		case 'left':
			inObj.style.clip = 'rect(' +
				'0px, ' +
				inObj.offsetWidth + 'px, ' +
				inObj.offsetHeight + 'px, ' +
				Math.round(inObj.offsetWidth - inObj.offsetWidth/100*(fromClip.right + delta.right * stepNum)) + 'px' +
			')';
			inObj.clipArea = Math.round(fromClip.right + (delta.right * stepNum));
			break;
		default:
			inObj.style.clip = 'rect(' +
				'0px, ' +
				Math.round(inObj.offsetWidth/100*(fromClip.right + delta.right * stepNum)) + 'px, ' +
				inObj.offsetHeight + 'px, ' +
				'0px' +
			')';
			inObj.clipArea = Math.round(fromClip.right + (delta.right * stepNum));
			break;
	}

    if (dt <= inObj.time){
			stepNum = Math.round(steps * dt / inObj.time);
			inObj._shutterOpId = setTimeout(function(){
										shutterStep(inObj,stepNum,steps,fromClip ,direction ,delta,timePerStep ,callback);
									}, timePerStep);
	}else{
		if (callback){
			callback();
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isTouchScreen = typeof(window['ontouchstart']) != 'undefined';
var presentGesture = typeof(window['ongesturestart']) != 'undefined';
/*
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))|| (navigator.userAgent.match(/Android/i))) {
	var isTouchScreen = 1;
}else{
	var isTouchScreen = 0;
}
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function sjSendLoadMsg(inImg) {
	var timeStamp = 0;//(new Date()).getTime();
	var url = "";
	var res = inImg.replace(/%2f|%2F/g, "/").match(new RegExp('(http[s]?://[^/]+)?[/]+([^/]+[/]+[^/]+)[/]+([^/]+)[/]+([^\\?]+)[\\?]?', 'i'));
	//host = res[1]; path = res[2];company = res[3];catalogId = res[4]
	var serverURL = (res[1] || "") + '/' + res[2];
	if (typeof res[1] != "undefined"){
		serverURL = res[1] + '/' + res[2];
	}else{
		serverURL = '/' + res[2];
	} 
	var id = sjHashCode(inImg);//alert(inImg+"\n"+"host = "+res[1]+"; path = "+res[2]+";company = "+res[3]+";catalogId = "+res[4]);
	url = serverURL+"/"+escape(res[3])+"?req=message&message="+id+","+timeStamp+",LOAD,14,"+sj.version+",0,-1,-1,-1,"+res[3]+"/"+res[4]; 
   	var oImg = document.getElementById('sjMsgImg_'+id);
   	if (oImg) {
		document.body.removeChild(oImg);
		oImg = null;
	}
   	oImg = document.createElement('img');
	oImg.id= 'sjMsgImg_'+id;
	oImg.style.visibility = 'hidden';
   	oImg.src= url;
	if (typeof oImg !="undefined"){
		document.body.appendChild(oImg);
	}

}
//end effects&utility////////////////////////////////////////////////////////////////////////////////////////

function SJZoomer(smallImage,bigImage){
var obj = null;
	obj = smallImage;
	var flyout = {wid:parseInt(smallImage.clientWidth),hei:parseInt(smallImage.clientHeight),left:parseInt(smallImage.clientWidth)+10,top:0};
	var zoomFactor = 2 ;
	var transition = {effect:"none" , duration:1 , direction:"right"}; 
	var iconURL = null;
	var frameBorder = '#0000ff 1px solid';
	var flyoutBorder = '#0000ff 1px solid';
	var transparent = "false";
	var dimOpacity = 0;
	var dimColor = "gray";
	var parentColor = "";
	var params = smallImage.getAttribute("params");
	var paramList = params.split(';');
	for (var i = 0; i < paramList.length; i++){
		var paramObj = paramList[i].split(':');
		switch (paramObj[0].toLowerCase()){
			case "transition":
				transition.effect = (paramObj[1].split(","))[0].toLowerCase();
				transition.duration = (isNaN(parseFloat((paramObj[1].split(","))[1])) || (parseFloat((paramObj[1].split(","))[1]) <= 0)) ? transition.duration:parseFloat((paramObj[1].split(","))[1]);
			break;
			case "flyout":
				flyout.wid  = (isNaN(parseInt((paramObj[1].split(","))[0])) || (parseInt((paramObj[1].split(","))[0]) < 0)) ? flyout.wid:parseInt((paramObj[1].split(","))[0]);
				flyout.hei  = (isNaN(parseInt((paramObj[1].split(","))[1])) || (parseInt((paramObj[1].split(","))[1]) < 0)) ? flyout.hei:parseInt((paramObj[1].split(","))[1]);
				flyout.left = (isNaN(parseInt((paramObj[1].split(","))[2]))) ? flyout.left:parseInt((paramObj[1].split(","))[2]);
				flyout.top  = (isNaN(parseInt((paramObj[1].split(","))[3]))) ? flyout.top:parseInt((paramObj[1].split(","))[3]);
			break;
			case "zoomfactor":
				zoomFactor = (isNaN(parseFloat(paramObj[1])) || (parseFloat(paramObj[1]) <= 0)) ? zoomFactor:parseFloat(paramObj[1]);
			break;
			case "iconurl":
				iconURL = unescape(paramObj[1]);
			break;
			case "frameborder":
				frameBorder = paramObj[1];
			break;
			case "flyoutborder":
				flyoutBorder = paramObj[1];
			break;
			case "transparent":
				transparent = paramObj[1].toLowerCase();
			break;
			case "dimopacity":
				dimOpacity = (isNaN(parseFloat(paramObj[1])) || (parseFloat(paramObj[1]) <= 0)) ? dimOpacity:parseFloat(paramObj[1]);
			break;
			case "dimcolor":
				dimColor = paramObj[1];
			break;
		}
	}

	if (isIOS) {
		var flyoutPixels = parseInt(smallImage.clientWidth) * parseInt(smallImage.clientHeight) * zoomFactor * zoomFactor;
		//2MP is iOS limit
		var iOSLimit = 2000000;
		if (flyoutPixels >= iOSLimit) {
			zoomFactor = Math.pow(iOSLimit / parseInt(smallImage.clientWidth) / parseInt(smallImage.clientHeight), 0.5);
		}
	}

////////////////
	function setPosition() {
		if (cont && smallImage){
			cont.style.left = findPos(smallImage)[0]+parseInt(smallImage.style.borderLeftWidth).NaN0()+"px";
			cont.style.top = findPos(smallImage)[1]+parseInt(smallImage.style.borderTopWidth).NaN0()+"px";
			lupaImg.style.left = findPos(smallImage)[0]+parseInt(smallImage.style.borderLeftWidth).NaN0()+"px";
			lupaImg.style.top = findPos(smallImage)[1]+parseInt(smallImage.style.borderTopWidth).NaN0()+"px";
		}
		if (lupaV && smallImage){
			lupaV.style.left = findPos(smallImage)[0] + flyout.left+"px";
			lupaV.style.top = findPos(smallImage)[1] + flyout.top+"px";
		}
	}

	function updates(coor){
		lupa.style.left = coor.x1+"px";
		lupa.style.top = coor.y1+"px";
		//rect(top right bottom left)
		lupaImg.style.clip  = 'rect(' +
				(-parseInt(lupaImg.style.top).NaN0() + coor.y1)+ 'px,' +
				(parseInt(lupa.style.width).NaN0()+parseInt(lupa.style.borderLeftWidth).NaN0()+(-parseInt(lupaImg.style.left).NaN0() + coor.x1))+ 'px,' +
				(parseInt(lupa.style.height).NaN0()+parseInt(lupa.style.borderTopWidth).NaN0()+(-parseInt(lupaImg.style.top).NaN0() + coor.y1))+ 'px,' +
				(-parseInt(lupaImg.style.left).NaN0() + coor.x1)+ 'px' +
			')';
		zoomImgCV.style.left = coor.x2+"px";
		zoomImgCV.style.top = coor.y2+"px";
	}
/////////////////////////////////////////////////////

	function Handlemouse(e,obj){
		if (!e) var e = window.event;
		if (e.touches && e.touches.length) { 	// iPhone
			e.posx = e.touches[0].clientX;
			e.posy = e.touches[0].clientY;
		} else if(window.event){
			e.posx=e.clientX;
			e.posy=e.clientY;
			if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){
				e.posx=e.clientX+document.body.scrollLeft
				e.posy=e.clientY+document.body.scrollTop;
			}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){
					e.posx=e.clientX+document.documentElement.scrollLeft
					e.posy=e.clientY+document.documentElement.scrollTop;
			}
		}else{
			e.posx=e.clientX;
			e.posy=e.clientY;
			e.posx+=window.pageXOffset
			e.posy+=window.pageYOffset;
		}
		if (e.changedTouches) { 	// iPhone
			e.posx = e.changedTouches[0].clientX;
			e.posy = e.changedTouches[0].clientY;
		}
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		if(window.event) window.event.cancelBubble=true;
		if (e.srcElement){
			if(e.srcElement.id != obj.id){ 
				return false;
			}
		}
		obj.xr = findPos(obj)[0];
		obj.yr = findPos(obj)[1];
		var coor = {x1:0,y1:0,x2:0,y2:0};
		if (e.posx >= obj.xr){
			coor.x1 = obj.xr-parseInt(lupa.style.borderLeftWidth).NaN0();
		}
		if (e.posx >= obj.xr+lupa.offsetWidth/2-parseInt(lupa.style.borderLeftWidth).NaN0()){
			coor.x1 = e.posx-lupa.offsetWidth/2;
		}
		if (e.posx >= obj.xr+obj.offsetWidth-lupa.offsetWidth/2+parseInt(lupa.style.borderRightWidth).NaN0()){
			coor.x1 = obj.xr+obj.offsetWidth-lupa.offsetWidth+parseInt(lupa.style.borderRightWidth).NaN0();
		}

		if (e.posy >= obj.yr){
			coor.y1 = obj.yr-parseInt(lupa.style.borderTopWidth).NaN0();
		}
		if (e.posy >= obj.yr+lupa.offsetHeight/2-parseInt(lupa.style.borderTopWidth).NaN0()){
			coor.y1 = e.posy-lupa.offsetHeight/2;
		}
		if (e.posy >= obj.yr+obj.offsetHeight-lupa.offsetHeight/2+parseInt(lupa.style.borderBottomWidth).NaN0()){
			coor.y1 = obj.yr+obj.offsetHeight-lupa.offsetHeight+parseInt(lupa.style.borderBottomWidth).NaN0();
		}
		var multiplierX = zoomImgCV.clientWidth/obj.clientWidth;
		var multiplierY = zoomImgCV.clientHeight/obj.clientHeight;
		coor.x2 = -(
						parseInt(lupa.style.left)+parseInt(lupa.style.borderLeftWidth).NaN0()
						- obj.xr
					)*multiplierX;
		coor.y2 = -(
						parseInt(lupa.style.top)+parseInt(lupa.style.borderTopWidth).NaN0()
						- obj.yr
					)*multiplierY;
		if((e.type == 'mousemove') || (e.type == 'touchmove'))  {
			lupa.style.visibility = 'inherit';
			lupaImg.style.visibility = 'inherit';
			if (zoomImgV.loaded){
				lupaV.style.visibility = 'inherit';
			}else{
				lupaV.style.visibility = 'hidden';
			}
			setTimeout(function(){
							updates(coor);
						},10);
		}else if((e.type == 'mouseout') || (e.type == 'touchend')){
			if (transition.effect == 'fade'){
				var coeff = parseFloat(lupaV.opacity || 1); 
				sjFadeEffect(lupaV,coeff*100,0,(0.001+coeff)*transition.duration*1000,25,function(){
						lupaV.style.visibility = 'hidden';
						if (typeof s7onFlyoutEnd != 'undefined'){
							s7onFlyoutEnd(smallImage.id);
						}
					});
			}else if ((transition.effect == 'wipe') || 
						(transition.effect == 'wipelr') || 
						(transition.effect == 'wiperl') || 
						(transition.effect == 'wipetb') || 
						(transition.effect == 'wipebt')){
				var coeff = lupaV.clipArea; 
				var ttime = (0.001+coeff/100)*transition.duration;
				sjShutterEffect(lupaV,{top:0,       right:coeff,	 bottom:coeff, left:0},
									  {top:0,       right:0,		 bottom:0,	   left:0},
									  transition.direction,ttime*1000, 25,function(){
						lupaV.style.visibility = 'hidden';
						if (typeof s7onFlyoutEnd != 'undefined'){
							s7onFlyoutEnd(smallImage.id);
						}
					});
			}else{
				lupaV.style.visibility = 'hidden';
				if (typeof s7onFlyoutEnd != 'undefined'){
					s7onFlyoutEnd(smallImage.id);
				}
			}
			lupa.style.visibility = 'hidden';
			lupaImg.style.visibility = 'hidden';
			smallImage.parentNode.style.backgroundColor = parentColor;
			sjSetOpacity(smallImage,100);
		}else if((e.type == 'mouseover') || (e.type == 'touchstart')){
			if (typeof s7onFlyoutStart != 'undefined'){
				s7onFlyoutStart(smallImage.id);
			}
			if (transition.effect == 'fade'){
				if ((lupaV.opacity*100) >= 99){ 
					sjSetOpacity(lupaV,0);
				}
				sjFadeEffect(lupaV,lupaV.opacity*100,100,(1.001-lupaV.opacity*100/100)*transition.duration*1000,25);
			}else if ((transition.effect == 'wipe') || 
						(transition.effect == 'wipelr') || 
						(transition.effect == 'wiperl') || 
						(transition.effect == 'wipetb') || 
						(transition.effect == 'wipebt')){
				if (lupaV.clipArea >= 99){
					lupaV.clipArea = 0;
				}
				var coeff = lupaV.clipArea; 
				var ttime = transition.duration;
				ttime = (1.001-coeff/100)*transition.duration;
				sjShutterEffect(lupaV,{top:0,       right:coeff,  bottom:coeff,  left:0},
									  {top:0,       right:100,bottom:100,left:0},
									  transition.direction,ttime*1000,25,function(){
										lupaV.clipArea = 100;
										lupaV.style.clip = 'rect(' +
											'0px, ' +
											lupaV.offsetWidth + 'px, ' +
											lupaV.offsetHeight + 'px, ' +
											'0px' +
										')';
								});
			}
			lupaV.style.visibility = 'inherit';
			parentColor = smallImage.parentNode.style.backgroundColor;
			try{
				smallImage.parentNode.style.backgroundColor = dimColor;
			}catch(e){
			}
			sjSetOpacity(smallImage,100-dimOpacity);
		}
		return e;
	}

/////////////////////////////////////////////////////

	var cont = document.getElementById('cont'+obj.id);
	if (cont){
	  cont.onmousemove = cont.ontouchmove = null;
	  cont.onmouseout = cont.ontouchend = null;
	  cont.onmouseover = cont.ontouchstart = null;
	  document.body.removeChild(cont);
	  cont = null;
	}
	cont = document.createElement("img");
	cont.id = 'cont'+obj.id;
	cont.style.width = obj.clientWidth+"px";
	cont.style.height = obj.clientHeight+"px";
	cont.style.left = findPos(smallImage)[0]+parseInt(smallImage.style.borderLeftWidth).NaN0()+"px";
	cont.style.top = findPos(smallImage)[1]+parseInt(smallImage.style.borderTopWidth).NaN0()+"px";
	cont.style.overflow = 'hidden';
	cont.style.position = 'absolute';
	cont.style.zIndex = 10000;
	cont.onmousedown = function(event) {
						return false;
					}
	cont.onmousemove = cont.ontouchmove = function(event) {
						//setPosition();
						if (!event) var event = window.event;
						if (event.preventDefault) event.preventDefault();
						Handlemouse(event,this);
						return false;
					}
	cont.onmouseout = cont.ontouchend = function(event) {
						if (!event) var event = window.event;
						setPosition();
						if (event.preventDefault) event.preventDefault();
						Handlemouse(event,this);
						return false;
					}
	cont.onmouseover = cont.ontouchstart = function(event) {
						if (!event) var event = window.event;
						setPosition();
						if (event.preventDefault) event.preventDefault();
						Handlemouse(event,this);
						return false;
					}
	document.body.appendChild(cont);
	sjSetOpacity(cont,0);

	var lupa = document.getElementById('lupa'+obj.id);
	if (lupa){
		document.body.removeChild(lupa);
		lupa = null;
	}
	lupa = document.createElement("img");
	lupa.id = 'lupa'+obj.id;
	lupa.style.width = 100+"px";
	lupa.style.height = 100+"px";
	lupa.style.left = parseInt(cont.style.left)+"px";
	lupa.style.top = parseInt(cont.style.top)+"px";
	lupa.style.border = frameBorder;
	lupa.style.position = 'absolute';
	lupa.style.visibility = 'hidden';
	lupa.style.overflow = 'hidden';
	lupa.style.zIndex = 10000-2;
	if ((typeof iconURL !='undefined') && (iconURL != "null") && (iconURL != null)&& (iconURL != "")){
		lupa.src = iconURL;
	}else{
		lupa.src = checkPath()+'images/spacer.gif';
	}
	document.body.appendChild(lupa);
	sjSetOpacity(lupa,100);

	var lupaImg = document.getElementById('lupaImg'+obj.id);
	if (lupaImg){
		document.body.removeChild(lupaImg);
		lupaImg = null;
	}
	lupaImg = document.createElement("img");
	lupaImg.id = 'lupaImg'+obj.id;
	lupaImg.style.width = obj.clientWidth+"px";
	lupaImg.style.height = obj.clientHeight+"px";
	lupaImg.style.left = parseInt(cont.style.left)+"px";
	lupaImg.style.top = parseInt(cont.style.top)+"px";
	lupaImg.style.position = 'absolute';
	lupaImg.style.visibility = 'hidden';
	lupaImg.style.zIndex = 10000-3;
	document.body.appendChild(lupaImg);
	lupaImg.src = smallImage.src;
	sjSetOpacity(lupa,100);

	var lupaV = document.getElementById('lupaV'+obj.id);
	var zoomImgCV = document.getElementById("zoomImgCV"+obj.id);
	var zoomImgV = document.getElementById("zoomImgV"+obj.id);
	if (lupaV){
		if (zoomImgCV){
			zoomImgV.onload = null;
			zoomImgV.onerror = null;
			zoomImgCV.removeChild(zoomImgV);
			lupaV.removeChild(zoomImgCV);
		}
		document.body.removeChild(lupaV);
		zoomImgCV = null;
		zoomImgV = null;
		lupaV = null;
	}
	lupaV = document.createElement("div");
	lupaV.id = 'lupaV'+obj.id;
	lupaV.style.width = (flyout.wid || parseInt(obj.clientWidth))+"px";
	lupaV.style.height = (flyout.hei || parseInt(obj.clientHeight))+"px";
	lupaV.style.left = findPos(smallImage)[0] + flyout.left+"px";
	lupaV.style.top = findPos(smallImage)[1] + flyout.top+"px";
	lupaV.style.overflow = 'hidden';
	lupaV.style.position = 'absolute';
	lupaV.style.visibility = 'hidden';
	lupaV.style.border = flyoutBorder;
	if (smallImage.style){
		lupaV.style.zIndex = 10000-1;
	}

	zoomImgCV = document.createElement("div");
	zoomImgCV.id = 'zoomImgCV'+obj.id;
	zoomImgCV.style.overflow = 'hidden';
	zoomImgCV.style.position = 'absolute';

	zoomImgV = document.createElement("img");
	zoomImgV.id = 'zoomImgV'+obj.id;
	zoomImgV.style.position = 'absolute';
	zoomImgV.style.left = 0+"px";
	zoomImgV.style.top = 0+"px";
	zoomImgV.style.display = 'inline-block';
	
	zoomImgCV.appendChild(zoomImgV);
	lupaV.appendChild(zoomImgCV);
	document.body.appendChild(lupaV);
	lupaV.content = zoomImgCV;
	sjSetOpacity(lupaV,100);
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
	//if ((version >= 5.5) && (version <=9) && (document.body.filters) && (bigImage.indexOf("png-alpha") != -1)){
	if ((version >= 5.5) && (version <=9) && (document.body.filters) && (transparent == "true")){
		sjSetOpacity(zoomImgCV,100);//urgent request of AlphaImageLoader??
	}
	lupaV.clipArea = 100;
	zoomImgCV.clipArea = 100;

	lupa.style.width = Math.round(lupaV.clientWidth / zoomFactor)+"px";
	lupa.style.height = Math.round(lupaV.clientHeight / zoomFactor)+"px";

	// if lupa is larger than the image adjust zoomFactor(aka flash)
	if (parseInt(lupa.style.height) > smallImage.clientHeight || parseInt(lupa.style.width) > smallImage.clientWidth) {
		var zoomViewScale = 1;
		if (parseInt(lupaV.style.width) / parseInt(lupaV.style.height) > smallImage.clientWidth / smallImage.clientHeight) {
			// fit width
			zoomFactor *= parseInt(lupa.style.width) / smallImage.clientWidth;
			zoomViewScale = smallImage.clientWidth / parseInt(lupa.style.width);                
		}
		else { // fit height
			zoomFactor *= parseInt(lupa.style.height) / smallImage.clientHeight;
			zoomViewScale = smallImage.clientHeight / parseInt(lupa.style.height);
		}
		var scaleY = zoomViewScale;
		var scaleX = zoomViewScale;   
		lupa.style.width = Math.round(parseInt(lupa.style.width) * scaleX)+"px";
		lupa.style.height = Math.round(parseInt(lupa.style.height) * scaleY)+"px";
	}
	//

	zoomImgV.onload = function(){
		zoomImgV.style.width = this.width+"px";
		zoomImgV.style.height = this.height+"px";
		zoomImgCV.style.width = this.width+"px";
		zoomImgCV.style.height = this.height+"px";
//		if (transparent == "true"){
			sjFixPNG(this);
//		}
		this.loaded = true;
	}

	zoomImgV.onerror = function(){
		this.loaded = false;
	}

	var zImageURL = "";
		zImageURL = bigImage + sjPBreak(bigImage) + "wid="+Math.round(zoomFactor*smallImage.clientWidth)+
							"&hei="+Math.round(zoomFactor*smallImage.clientHeight)+"&fit=fit,1";

	var tempDir = transition.effect.substring(4);
	switch (tempDir){
		case "lr":transition.direction = "right";
		break;
		case "rl":transition.direction = "left";
		break;
		case "tb":transition.direction = "bottom";
		break;
		case "bt":transition.direction = "top";
		break;
	}
	if (transition.effect == 'wipe'){
		var iLeft = cont.clientWidth/2;
		var iTop =  cont.clientHeight/2;
		var fLeft = flyout.left + flyout.wid/2;
		var fTop = flyout.top + flyout.hei/2;
		var angle = Math.atan2((iTop-fTop),(fLeft-iLeft))*180/Math.PI;
		if ((angle >= -45) && (angle <= 45)){
			transition.direction = "right";
		}
		if ((angle > 45) && (angle < 135)){
			transition.direction = "top";
		}
		if ((angle > -135) && (angle < -45)){
			transition.direction = "bottom";
		}
		if (Math.abs(angle) >= 135){
			transition.direction = "left";
		}
	}

	smallImage.transparent = transparent;
	zoomImgV.src = zImageURL;
	if(typeof this.posId != 'undefined'){
		clearInterval(this.posId);
		this.posId = null;
	}
	this.posId = setInterval(setPosition, 25);
	return this;
}

function sjFlyout(inId,inURL){
	var smallImage = document.getElementById(inId);
	smallImage.onload = function(){
		if (this.sjz){
			if(typeof this.sjz.posId != 'undefined'){
				clearInterval(this.sjz.posId);
				this.sjz.posId = null;
			}
			this.sjz = null;
		}
		this.sjz = new SJZoomer(smallImage,inURL);
//		if (smallImage.transparent == "true"){
			sjFixPNG(this);
//		}
	}
	smallImage.onerror = function(){
		if (this.sjz){
			if(typeof this.sjz.posId != 'undefined'){
				clearInterval(this.sjz.posId);
				this.sjz.posId = null;
			}
			this.sjz = null;
		}
		var cont = document.getElementById('cont'+inId);
		if (cont){
			cont.onmousemove = cont.ontouchmove = null;
			cont.onmouseout = cont.ontouchend = null;
			cont.onmouseover = cont.ontouchstart = null;
		}

		if (typeof smallImage.transparent != 'undefined'){
			if (smallImage.transparent == "true"){
				if (this.filters){
					if (this.filters.length>0){
						if (this.filters["DXImageTransform.Microsoft.AlphaImageLoader"]){
							this.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").enabled = false;
						}else{
							this.style.filter += " progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=false,src='" + "" + "', sizingMethod='scale')";
						}	
					}else{
						this.style.filter = " progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=false,src='" + "" + "', sizingMethod='scale')";
					}
				}
			}
		}
	}

	smallImage.src =  inURL + sjPBreak(inURL) +"wid="+parseInt(getDim(smallImage)[0])+"&hei="+parseInt(getDim(smallImage)[1])+"&fit=fit,1";
	if (typeof this.inId == "undefined"){
		this.inId = [];
	}
	if ((typeof this.inId[inId] == "undefined") || (!this.inId[inId])){
			sjSendLoadMsg(inURL);
			this.inId[inId] = true;
	};

	/*start additional code for printing*/
	function before(){
		var cont = document.getElementById('cont'+inId);
		var lupa = document.getElementById('lupa'+inId);
		var lupaImg = document.getElementById('lupaImg'+inId);
		var lupaV = document.getElementById('lupaV'+inId);
		if (cont){
			cont.style.display = "none";  
			lupa.style.display = "none";  
			lupaV.style.display = "none";  
			lupaImg.style.display = "none";  
		}
	}
	function after(){
		var cont = document.getElementById('cont'+inId);
		var lupa = document.getElementById('lupa'+inId);
		var lupaImg = document.getElementById('lupaImg'+inId);
		var lupaV = document.getElementById('lupaV'+inId);
		if (cont){
			cont.style.display = "block";  
			lupa.style.display = "block";  
			lupaV.style.display = "block";  
			lupaImg.style.display = "block";  
		}
	}
	if (window.addEventListener) { 
		window.addEventListener("beforeprint", before, false);
		window.addEventListener("afterprint", after, false);
	}else if (window.attachEvent) { 
		window.attachEvent("onbeforeprint", before);
		window.attachEvent("onafterprint", after);
	}
    /*end additional code for printing*/
}

