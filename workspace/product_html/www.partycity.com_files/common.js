/**
 * Common JavaScript 
 * @author tsirijar
 * @copyright 2008 Scene7 Adobe Inc.
 */

/******************** Browser selection *************************/

//Browser detection object
var s7browser = {
					//raw data
					raw : {
							ua : navigator.userAgent.toLowerCase(),
							ver: navigator.appVersion.toLowerCase()							
						  },
					//browser name to undefined as default
					name : "undefined",
					//version info - major / minor /javascript
					version : {
								major: "0",
								minor: "0",
								js:"0"
							  },
					//initialization method
					init : function(){
								var ua = this.raw.ua;
								var ver = this.raw.ver;
								
								//Assume version information can be obtained from raw.ver
								this.version.minor = parseFloat(ver);
								this.version.major = parseInt(this.version.minor);
								
								if(ua.indexOf("opera")>-1){
									//Opera
									this.name = "opera";				
									if(this.version.major == 5 || this.version.major == 6){
										//opera 5 and 6 use js 1.3
										this.version.js = "1.3";
									}					
									else if(this.version.major >= 7){
										//opera 7+ use js 1.5
										this.version.js = "1.5";
									}
									else{
										//other opera 1.1
										this.version.js = "1.1";
									}
								}
								else if(ua.indexOf("safari")>-1&&ua.indexOf("mac")){
									//Safari
									this.name="safari";
									this.version.js = "1.5"; //safari use js 1.5
								}
								else if(ua.indexOf("konqueror")>-1){
									//Konqueror
									var kpos = ua.indexOf("konqueror");
									this.name="konquerer";
									this.version.minor =  parseFloat(ua.substring(kpos+10,ua.indexOf(";",kpos)));
									this.version.major = parseInt(this.version.minor);
									this.version.js = "1.5"; 
								}
								else if(navigator.product && navigator.product.toLowerCase()=="gecko"){
									//Gecko 
									if(ua.indexOf("mozilla/5") > -1 && 
									   ua.indexOf("spoofer") == -1 && 
									   ua.indexOf("compatible")==-1 &&
									   ua.indexOf("webtv")==-1 && ua.indexOf("hotjava")==-1){
									   
										if(navigator.vendor=="Firebird"){
											//Firebird
											this.name="firebird";
										}										
										else if(ua.indexOf("navigator")>-1){
											//Detect Netscape with Gecko - i.e. version 9
											this.name="netscape";
										}	
										else if(navigator.vendor=="Firefox" || ua.indexOf("firefox")>-1){
											//Firefox
											this.name="firefox";
										}
										else if(navigator.vendor=="" || navigator.vendor=="Mozilla" || navigator.vendor=="Debian"){
											//Mozilla
											this.name="mozilla";																				
										}
										if(this.name != "undefined" && this.name != "netscape"){											
											//If not fail to detect browser vendor, update the version info
											var mozVer = (navigator.vendorSub)?navigator.vendorSub:0;
											if(this.name=="firefox" && !mozVer){
												mozVer = parseFloat(ua.substring(ua.indexOf("firefox/")+8));												
											}
											else if(!mozVer){
												mozVer = ua.substring(ua.substring("rv:")+3);
												mozVerEnd = mozVer.indexOf(")");
												mozVer = parseFloat(mozVer.substring(0,mozVerEnd));												
											}
											this.version.minor = mozVer;
											this.version.major = parseInt(mozVer);
											this.version.js = "1.5"	
										}
										else if(this.name == "netscape"){
											//Netscape with gecko 
											var navPos = ua.indexOf("navigator");
											this.version.minor = parseFloat(ua.substring(navPos+10,navPos+13));
											this.version.major = parseInt(this.version.minor);
											this.version.js = "1.5";
										}
									}
								}
								else if(ua.indexOf("mozilla")>-1 &&
										ua.indexOf("spoofer")==-1 &&
										ua.indexOf("compatible")==-1 &&
										ua.indexOf("webtv")==-1 &&
										ua.indexOf("hotjava")==-1){
									//Netscape
									this.name="netscape";
									if(navigator.vendor && 
									  (navigator.vendor=="Netscape6" || navigator.vendor == "Netscape" )){
										this.version.minor = parseFloat(navigator.vendorSub);
										this.version.major = parseInt(navigator.vendorSub);
									}
									if(this.version.major==2){
										this.version.js = "1.0";		
									}
									else if(this.version.major==3){
										this.version.js = "1.1";
									}
									else if(this.version.major==4){
										this.version.js = (this.version.minor<=4.05 ? "1.2":"1.3");
									}
									else if(this.version.major==5){
										this.version.js = "1.4";
									}
									else if(this.version.major>=6){
										this.version.js = "1.5";
									}
								}
								else if(ua.indexOf("msie") > -1){
									//Internet Explorer
									this.name="ie";									
									if(ua.indexOf("mac")>-1){										
										var iePos = ua.indexOf("msie");
										this.version.minor = parseFloat(ua.substring(iePos+5,ua.indexOf(";",iePos)));
									}
									else{
										var iePos = ver.indexOf("msie");
										this.version.minor = parseFloat(ver.substring(iePos+5,ver.indexOf(";",iePos)));
									}
									this.version.major = parseInt(this.version.minor);
									if(this.version.major<4){
										this.version.js = "1.0";										
									}
									else if(this.version.major==4){
										this.version.js = "1.2";
									}
									else if(this.version.major >= 5 && ua.indexOf("mac")>-1){
										this.version.js = "1.4";
									}
									else if(this.version.major >= 5){
										this.version.js = "1.3";
									}									
									
								}
								else if(ua.indexOf("aol")>-1){
									//AOL
									this.name="aol";
								}
								else if(ua.indexOf("webtv")>-1){
									//WebTV
									this.name="webtv";
								}
								else if(ua.indexOf("hotjava")>-1){
									//hotjava
									this.name="hotjava";
									if(this.version.major>=3){
										this.version.js="1.4";
									}
								}
								
						   }
				};

//initialize the browser info
s7browser.init();	
/**
 * Usage: get viewer command 
 */
function getViewerCmd(){
	var isIeWin  = (s7browser.name == "ie");
	if (isIeWin){
    	return "&eventLog=FSCommand:s7Tag(%22$1$%22)";
	} 
	else{
    	return "&eventLog=javascript:s7Tag(%22$1$%22)";
	}	
}




/**
 * Get inner browser window size of current state
 * @return size of browser inner window area in JSON {x,y}
 */
function getInnerSize() {
    var size = {x:0, y:0};
    if (self.innerHeight) {
        size.x = self.innerWidth;
        size.y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        //IE6
        size.x = document.documentElement.clientWidth;
        size.y = document.documentElement.clientHeight;
    }else if (document.body) {
        //other IE
        size.x = document.body.clientWidth;
        size.y = document.body.clientHeight;
    }
    return size;
}

/**
 * Resize window to w x h size
 * @param {int} w - width
 * @param {int} h - height
 */
function resizeWin(win,w,h){   
        win.resizeTo(screen.availWidth,screen.availHeight);
        var inWinSize = getInnerSize();
        var dx = screen.availWidth-inWinSize.x
        var dy = screen.availHeight-inWinSize.y;
        win.resizeTo(w+dx, h+dy);   
}


/**
 * Get obj size
 * @param {Object} obj
 * @return size of obj in JSON {h,w}
 */
function getObjSize(obj){
    var size = {h:0, w:0};        
    
    if (window.event) { 
        size.h = obj.style.pixelHeight;
        size.w = obj.style.pixelWidth;
    } else {
        size.h = obj.offsetHeight;
        size.w = obj.offsetWidth;
    } 
    return size
}

function setOPos(x,y,obj){
  if(window.event){
    if(y != null)  obj.style.pixelTop = y;
    if(x != null)  obj.style.pixelLeft = x;
  }else {
      if(y != null) obj.style.top = y+"px";
      if(x != null) obj.style.left = x+"px"
  }
}

/**
 * Get absolute position
 * @param {Object} obj
 */
function getOPos(obj){
  var posx = 0;
  var posy = 0;
  while( obj != null ) {
    posy += obj.offsetTop;
	posx += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  return {x:posx,y:posy};
}


function popupUrl(url,refId){
	closePopupUrl();
	var obj = document.getElementById(refId);
	var size = getObjSize(obj);
	var pos = getOPos(obj); 
	var px = pos.x;
	var py = pos.y + size.h;
	var tw = size.w-60;	
	
	var pup = document.createElement("div");
	var ptxt = document.createElement("input");
	var pc = document.createElement("a");
	ptxt.className = "epopup";
	ptxt.value = url;		
	ptxt.style.width = tw+"px";
	
	pc.className = "epopup";
	pc.appendChild(document.createTextNode("close"));
	pc.setAttribute("href","javascript:void(0);");
	pc.onclick = function(){
		closePopupUrl();
	}
	pup.setAttribute("id","embedPopup");
	pup.className = "epopup";
	pup.style.width = size.w+"px";
	pup.style.height = "50px";
 	pup.appendChild(ptxt);
	pup.appendChild(pc);
	document.body.appendChild(pup);
	setOPos(px,py,pup);
	ptxt.focus();
	ptxt.select();
}

function closePopupUrl(){
	if(document.getElementById("embedPopup")){
		document.body.removeChild(document.getElementById("embedPopup"));
	}
}

function openEmail(state){
	if(state != null){
		document.getElementById("currentState").value = state;
	}
	var newWin = window.open("","emailfriend","width=" + emailWindowWidth + ",height=" + emailWindowHeight + ",location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");            
	if(s7browser.name == 'safari')
		newWin.resizeTo(emailWindowWidth,emailWindowHeight);
	document.getElementById("frmState").submit();
}

function isValidEmail(email){
	return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+[a-zA-Z0-9]{2,4}$/.test(email);
}

function getFlashApp(name){
	if (s7browser.name == 'ie') {
		return window[name];
	} 
	else{
		return document.getElementById(name);
	}	
}
var s7socialProp = {
					w : 300,
					h : 100,
					copyCaption : "copy",
					closeCaption: "close",
					init : function(w,h,copy,close){
						this.h = h;
						this.w = w;
						this.copyCaption = copy;
						this.closeCaption = close;
					}
				  };

function showSocial(txt){
	var pos = getOPos(document.getElementById("s7sociallinks"));
	getFlashApp("s7social").popupDialogText(txt,s7socialProp.copyCaption,s7socialProp.w,s7socialProp.h,s7socialProp.closeCaption,"hideSocial","");
	setOPos(pos.x,pos.y,document.getElementById("s7socialbox"));	
	
}

function hideSocial(){
	setOPos(-5000,-5000,document.getElementById("s7socialbox"));
}

function initSocial(){
	showSocial("");
	hideSocial();
}

function s7email(param){
	var loc = window.location.href;
	document.getElementById("emailToFriendHref").value = loc+param;
	var newWin = window.open("","emailfriend","width=" + emailWindowWidth + ",height=" + emailWindowHeight + ",location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");            
	document.getElementById("frmState").submit();
}
//Workaround for safari bug on sizing
function s7emailSafariFix(){
	if(s7browser.name == 'safari'){
		window.resizeTo(opener.emailWindowWidth,opener.emailWindowHeight);
	}
}