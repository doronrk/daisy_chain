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

function SjTextLoader() {
	this._id = SjTextLoader._cnt ++;
	this.req = null;
	this.tid=null;
	this.text=null;
	this.IFrameDoc=null;
	this.first = false;
	this.json = false;
	this.counter = 0;
	SjTextLoader.all[this._id] = this;
/*
	if( document.childNodes && document.createElement ) {
		sjCreateDiv(null,"datadiv"+this._id);
		var dname="datadiv"+this._id;
		var lname="loader"+this._id;
		var str=' <div id='+dname+' style="position:absolute;visibility:hidden"><iframe src="about:blank" id='+lname+' name='+lname+' onload=""></iframe> </div> ';
		sjSetLayerHTML("datadiv"+this._id,str);
	}
*/
}

SjTextLoader.prototype.load = function(inURL,firstLoading) {
	if (inURL.indexOf("json") >= 0){
		this.json = true;
		tljson = this;
		sjLoadCtx(tljson,inURL);
		this.counter = 0;
		clearInterval(this.tid);
	}
/*	
	else{
		this.json = false;
		if (!firstLoading){
			if (window.XMLHttpRequest) {//native XMLHttpRequest object
				this.req = new XMLHttpRequest();
				eval('this.req.onreadystatechange = function() { SjTextLoader.all[' + this._id + ']._onLoadText(); }');
				this.req.open("GET", inURL, true);
				this.req.send(null);
			}else {
				var elm=sjGetElement("loader" + this._id);
				if (elm){
					if (typeof elm.src != 'undefined')
						elm.src = inURL;
					else if (typeof elm.location != 'undefined')
						elm.location = inURL;
					this.tid=setInterval(this+'.checkLoad()', 100);
				}
			} 
		}else{
			image = new Object;
			metadata = new Object;//for future
			protocol = new Object;//for future
			context = new Object;//for future
			this.first = true;
			document.write("<script type='text/javascript' src='" + inURL+  ",javascript'></" + "script>");
			this.tid=setInterval(this+'.checkLoad()', 100);
		}
	}
*/
};

/*
SjTextLoader.prototype._onLoadText = function() {
	if (this.req.readyState == 4) {//"loaded";0 = uninitialized 1 = loading 2 = loaded 3 = interactive 4 = complete
		if (this.req.status == 200) {//"OK" Numeric code returned by server, such as 404 for "Not Found" or 200 for "OK"
			this.text = this.req.responseText;
			if (this.onLoadText){
				this.onLoadText();
			}
        } else {
            //alert("There was a problem retrieving data:\n" + this.req.statusText);
            alert(sj_resource.getResource("%THERE_WAS_A_PROBLEM_RETRIEVING_DATA%:\n") + this.req.statusText);
        }
    }
};
*/

function dumpProps(obj,obj_name) {
	var str = "", i ="";
	for (i in obj)
	str += obj_name +"."+ i +" = "+ obj[i] +"\n";
	return str;
}

SjTextLoader.prototype.checkLoad = function() {
	if (this.first == true){
		if (image.rect) {
			this.text = dumpProps(image,"image");
			if (metadata){
				this.text += dumpProps(metadata,"metadata");
			}
			if (protocol){
				this.text += dumpProps(protocol,"protocol");
			}
			if (context){
				this.text += dumpProps(context,"context");
			}
			if (this.onLoadText){
				this.onLoadText();
			}
			this.counter = 0;
			clearInterval(this.tid);
		}else{
			if (this.counter < 100){
				this.counter++;
			}else{
				//alert(sj_resource.getResource('%ERROR_LOADING_CONTEXT%!'));
				if(typeof window.console != "undefined"){
					window.console.log(sj_resource.getResource('%ERROR_LOADING_CONTEXT%!'));
				}else{
					//window.status = sj_resource.getResource('%ERROR_LOADING_CONTEXT%!');
				}
				this.counter = 0;
				clearInterval(this.tid);
			}
		}
	}
/*	else{
		var elm=sjGetElement("loader" + this._id);
		if (elm != null)
		if(document.frames){
		 if(document.frames[elm.name]) { this.IFrameDoc=document.frames[elm.name].document } // For IE5
		}else if (elm.contentDocument) { this.IFrameDoc=elm.contentDocument } //For NS6
		 else if (elm.contentWindow) { this.IFrameDoc=elm.contentWindow.document } //For IE5.5
		else{
			alert(sj_resource.getResource('%PROBLEMS%.....'));
			clearInterval(this.tid);
			return true;
		}
		var inf = sjGetTextContent(this.IFrameDoc);
		if (inf){
			this.text = inf;
			if (this.onLoadText){
				this.onLoadText();
			}
			clearInterval(this.tid);
		}
	}
*/
}

SjTextLoader.prototype.clearText = function(txt) {
	var testText = txt;
	if ((testText != null) && (testText != '')) {
	    var result = testText;
	    var teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
		var idx = testText.indexOf(teg);
		while (idx != -1) {
			result = result.substring(0, idx) + '' + result.substring(idx + teg.length);
			testText=result;
		    idx=-1;
			teg=testText.substring(testText.indexOf("<"),testText.indexOf(">")+1);
			if (teg!=''){
		     idx = testText.indexOf(teg);
			 result=testText;
			}
		}
 	    
		testText=testText.replace("&lt;","<"); 
		testText=testText.replace("&gt;",">"); 
		this.text = testText;
	}
	return this.text;
}

SjTextLoader.prototype.toString = function() {
	return 'SjTextLoader.all[' + this._id + ']';
};

SjTextLoader.all = [];
SjTextLoader._cnt = 0;

//private functions and variables
var sjCallbacks=[];//!global variable MUST be created !
var sjErrCallbacks=[];//!global variable MUST be created !

function sjGetResponse(inReq, inImg, inCallback, inErrCallback) {
	var urljson = "";
	var tempi = inImg.indexOf("?");
	if(tempi >= 0){
		urljson = inImg + '&' + inReq;
	}else{
		urljson = inImg + '?' + inReq;
	}
	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks.push({callback:inCallback,id:id});
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks.push({callback:inErrCallback,id:id});
	}
    var oScript = document.getElementById('sjScript_'+id);
    if (oScript) {
		document.getElementsByTagName("head")[0].removeChild(oScript);
		oScript = null;
	}
    oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.id= 'sjScript_'+id;
    oScript.src= urljson;
	if (typeof oScript!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(oScript);
	}
}

function s7jsonResponse(inArg, inId) {
	for (var i = 0; i < sjCallbacks.length; i ++) {
		if (sjCallbacks[i] != null){
			if (sjCallbacks[i].id == parseInt(inId)){
				if (sjCallbacks[i].callback){
					sjCallbacks[i].callback(inArg);
				}
				delete sjCallbacks[i];
			}
		}
	}
}

function s7jsonError(inArg, inId) {
	var alertErr = true;
	for (var i = 0; i < sjErrCallbacks.length; i ++) {
		if (sjErrCallbacks[i] != null){
			if (sjErrCallbacks[i].id == parseInt(inId)){
				if (sjErrCallbacks[i].callback){
					sjErrCallbacks[i].callback(inArg);
				}
				delete sjErrCallbacks[i];
				alertErr = false;
			}
		}
	}
	if (alertErr){
		//alert(inArg.message);
		//console.log(inArg.message);
		if(typeof window.console != "undefined"){
			window.console.log(inArg.message);
		}else{
			//window.status = inArg.message;
		}
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

function sjLoadCtx(tl,inURL) {
	sjGetResponse(
		'req=ctx,json&scl=1',
		inURL.replace(/req=ctx,json/gi, ""),//check doubling req
		function(inArg) {
			tl.text = dumpProps(inArg,"");
			if (tl.onLoadText){
				tl.onLoadText();
			}
		},
		function(inArg) {
			//alert('failed loading ctx for image [' + inURL + ']: ' + inArg.message);
			if(typeof window.console != "undefined"){
				window.console.log('failed loading ctx for image [' + inURL + ']: ' + inArg.message);
			}else{
				//window.status = 'failed loading ctx for image [' + inURL + ']: ' + inArg.message;
			}
			if (tl.onError){
				tl.onError(inArg);
			}
		}
	);
}

function sjAddAreaToMap(inMap,inArg) {
    var oMap = document.getElementById(inMap);
	if (typeof oMap != "undefined"){
		var oArea = document.createElement('area');
		oArea.shape = inArg.shape || null;
		oArea.coords = inArg.coords || null;
		oArea.href = inArg.href || "";
		oArea.target = inArg.target || "";
		oArea.alt = inArg.alt || "";
		oArea.title = inArg.alt || "";
		oArea.setAttribute("origcoords",oArea.coords  || null);
		oArea.setAttribute("rollover_key",inArg.rollover_key || null);
		if (typeof oArea != "undefined"){
			oMap.appendChild(oArea);
		}
	}
}

function sjLoadMap(inImage,inMeta,inSclX,inSclY,inId,inCallback) {
	sjGetResponse(
		'req=map,json&scl=1'+inMeta,
		inImage,
		function(inArg) {
			var oMap = document.getElementById("s7map_"+inId);
			if (inArg != null) {
					if ((typeof oMap != "undefined")&&(oMap != null)){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
						for (var i = 0; i < inArg.length; i ++) {
							sjAddAreaToMap("s7map_"+inId,inArg[i]);
						}
						sjResetMap("s7map_"+inId);
						sjZoomMap ("s7map_"+inId,inSclX,inSclY);
						inCallback();
					}
				} else {
					if (typeof oMap != "undefined"){
						for (var k = oMap.childNodes.length-1; k >= 0 ; k--) {
							oMap.removeChild(oMap.childNodes[k])
						}
					}
				}
		},
		function(inArg) {
			//alert('failed loading map for image [' + inImage + ']: ' + inArg.message);
			if(typeof window.console != "undefined"){
				window.console.log('failed loading map for image [' + inImage + ']: ' + inArg.message);
			}else{
				//window.status = 'failed loading map for image [' + inImage + ']: ' + inArg.message;
			}
		}
	);
}

function sjLoadUserData(inServerUrl,inConfig,inParams,inCallback,inErrCallback){
	var obj = this;
	var urljson = "";
	if (inConfig.indexOf("?") == -1){
		urljson = inServerUrl + '/' + inConfig + "?req=userdata,json";
	}else{
		urljson = inServerUrl + '/' + inConfig + "&req=userdata,json";
	}
	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks.push({callback:inCallback,id:id});
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks.push({callback:inErrCallback,id:id});
	}
	document.write('<script type="text/javascript" src="'+urljson+'"><\/script>');
}

