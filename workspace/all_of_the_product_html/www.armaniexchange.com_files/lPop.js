 /****************************************
 MarketLive.com
 Biswa Jena
 ****************************************/
 var AX_Width=0, AX_Height=0;
 var AX_ScrOfX=0, AX_ScrOfY=0;
 var pageW=960;
 var py=0;
 var dnsp=false;//Popup will remain static on the window when scrolled
 var t=".png";
 var popVisibleDivID = null;
 var laodingContent="Loading...Please Wait!";
 var iPopOBJ=new Array();

 function closeP(){
	document.getElementById("popdiv").innerHTML="";
	document.getElementById("popdiv").style.display="none";
	py-=1;
	delete iPopOBJ[0];
 }

  var browser = navigator.appName;//detecting browser IE 6 and below
    var version = navigator.appVersion;
    if ( browser== "Microsoft Internet Explorer" )
        {
        var version1 = version.substring(22,25);
        var sisop = version.substring(26,41);
		if (parseInt(version1)<7){
			t=".gif";
		}
    }
 function AX_Win_Prop() {
    AX_Width = jQuery(window).width();
    AX_Height = jQuery(window).height();
	AX_ScrOfY = jQuery(document).scrollTop();
    AX_ScrOfX = jQuery(document).scrollLeft();
}

function rLoad(x){
	document.getElementById("popLoad").style.display="none";
	x.style.visibility="visible";
}
function rRemove(){
	document.getElementById("popLoad").style.display="block";
}

 function AX_Pop_Create(objpop){

	var pPID="";
	py+=1;
	document.getElementById("popdiv").style.display="block";
	if (objpop.pID && typeof(objpop.pID) != "undefined") pPID = objpop.pID;
	var pBG=document.createElement("DIV");
	pBG.className="pBG";
	pBG.style.zIndex=1001+py;
	AX_Win_Prop();
	pBG.style.top=AX_ScrOfY+"px";
	pBG.style.left=AX_ScrOfX+"px";
	pBG.id="ipopbg"+pPID+py;
	popVisibleDivID = pPID+py;
	//document.body.appendChild(pBG);
	document.getElementById("popdiv").appendChild(pBG);

	var pP=document.createElement("DIV");
	var dHeight=parseInt(objpop.pHeight)+18, dWidth=parseInt(objpop.pWidth)+18;
	var iHeight=parseInt(objpop.pHeight)-22;
	var iWidth=parseInt(objpop.pWidth)-22;

	if (isNaN(objpop.pTop/objpop.pTop)){
		var dTop=((jQuery(window).height()-parseInt(objpop.pHeight))/2)+AX_ScrOfY;
	}
	else {
		var dTop=parseInt(AX_ScrOfY)+parseInt(objpop.pTop);
	}
	if (isNaN(objpop.pLeft/objpop.pLeft)){
		var dLeft=((jQuery(window).width()-parseInt(objpop.pWidth))/2)+AX_ScrOfX;
	}
	else {
		var dLeft=((jQuery(window).width()-pageW)/2)+parseInt(objpop.pLeft);
	}



	pP.style.position="absolute";
	pP.style.zIndex=1001+py;
	pP.style.height=dHeight+"px";
	pP.style.width=dWidth+"px";
	pP.style.top=dTop+"px";
	pP.style.left=dLeft+"px";
	pP.id="ipop"+pPID+py;
	var d=new Date();
	var fID="lPopFrame"+pPID+py;
	var scrl="no";
	if(objpop.pSC)scrl=objpop.pSC;

	if(objpop.pLK!="LookBook"){
		pP.innerHTML='<table border="0" cellspacing="0" cellpadding="0" style="border-bottom:10px solid #000;"><tr><td style="background-color:#5C5C5C;padding-top:'+objpop.tP+';padding-right:'+objpop.rP+';padding-bottom:'+objpop.bP+';padding-left:'+objpop.lP+';"><div id="popLoad" style="position:absolute;width:'+iWidth+'px;height:'+iHeight+'px;z-index:100;display:none;"><div>'+laodingContent+'</div></div><div id="cls'+py+'" style="position:absolute;right:50px;top:12px;cursor:pointer;"><img src="'+iPop_imagePath+'global/scene7/closeLK.gif" border="0" /></div><iframe scrolling="'+scrl+'" src="" frameborder="0" height="'+iHeight+'" width="'+iWidth+'" id="'+fID+'" name="'+fID+'" style="background-color: #FFFFFF" closeP=""></iframe></td></tr></table>';
	}
	else{
		pP.innerHTML='<table border="0" cellspacing="0" cellpadding="0"><tr><td style="background-color:#5C5C5C;padding-top:'+objpop.tP+';padding-right:'+objpop.rP+';padding-bottom:'+objpop.bP+';padding-left:'+objpop.lP+';"><div id="popLoad" style="position:absolute;width:'+objpop.pWidth+'px;height:'+objpop.pHeight+'px;z-index:100;display:none;"><div>'+laodingContent+'</div></div><div id="cls'+py+'" style="position:absolute;right:30px;top:12px;cursor:pointer;"><img src="'+iPop_imagePath+'global/scene7/closeLK.gif" border="0" /></div><iframe scrolling="'+scrl+'" src="" frameborder="0" height="'+objpop.pHeight+'" width="'+objpop.pWidth+'" id="'+fID+'" name="'+fID+'" style="background-color: #FFFFFF" closeP=""></iframe></td></tr></table>';
	}
		pBG.pop=pP;

	document.getElementById("popdiv").appendChild(pP);
	document.getElementById(fID).src=objpop.source;
	document.getElementById(fID).contentWindow.pop=pBG;

	objpop.pBG=pBG;
	objpop.pF=document.getElementById(fID);
	var browser = navigator.appName;//detecting browser IE 6 and below
	var version = navigator.appVersion;
	objpop.close=function(){
		parent.document.getElementById("lPopFrame"+pPID+py).src=iPop_imagePath+'local/localbuttons/close03_btn.gif';
		document.getElementById("popdiv").removeChild(pBG.pop);
		document.getElementById("popdiv").removeChild(pBG);
		py-=1;
		delete objpop;
		if(!py){
			document.getElementById("popdiv").style.display="none";
			if ( browser== "Microsoft Internet Explorer" )
			{
				var version1 = version.substring(22,25);
				var sisop = version.substring(26,41);
				if (parseInt(version1)<7){
					jQuery("select").css("visibility","visible");
				}
			}
		}
	}
	//closeP=objpop.close;
	if(objpop.pType!="modal"){pBG.onclick=parent.closeP;jQuery("#cls"+py).click(parent.closeP);}
	//document.getElementById(fID).closeP=objpop.close;
	if ( browser== "Microsoft Internet Explorer" )
			{
				var version1 = version.substring(22,25);
				var sisop = version.substring(26,41);
				if (parseInt(version1)<7){
					jQuery("select").css("visibility","visible");
				}
			}
	iPopOBJ[0]=objpop;
 }

  function AX_Pop(pH,pW,pT,pL,pS,pID,pST,pTP,pSC,pLK){
	this.pHeight=pH;							//Popup height
	this.pWidth=pW;								//Popup width
	this.pTop=pT;								//Popup top position*
	this.pLeft=pL;								//Popup left position*
	this.pType=pTP;								//Popup type Modal/Non-Modal*
	this.source=pS;								//Popup source URL
	this.pID=pID;								//Popup unique ID
	this.sourceType=pST;						//Popup source type URL/HTML*
	this.pSC=pSC;								//Popup scroll information
	this.pLK=pLK;								//Pass LookBook for LookBook look of the popup frame
	AX_Pop_Create(this);
 }
function wfOnScroll(){
	if(VL)AX_VL.reSize();
	if(py>0){
		for(i=1;i<=py;i++){
				if(dnsp){
					document.getElementById("ipopbg" + i).style.top=jQuery(document).scrollTop()+"px";
					document.getElementById("ipopbg" + i).style.left=jQuery(document).scrollLeft()+"px";
				}
				else{
					document.getElementById("ipopbg" + i).style.top=jQuery(document).scrollTop()+"px";
					document.getElementById("ipopbg" + i).style.left=jQuery(document).scrollLeft()+"px";
					document.getElementById("ipop"  + i).style.top=((jQuery(window).height()-parseInt(document.getElementById("ipop" + i).style.height))/2)+jQuery(document).scrollTop()+"px";
					document.getElementById("ipop" + i).style.left=((jQuery(window).width()-parseInt(document.getElementById("ipop" + i).style.width))/2)+jQuery(document).scrollLeft()+"px";
				}
			}
		}
}
function wfOnResize(){
	if(VL)AX_VL.reSize();
	if(py>0){
		for(i=1;i<=py;i++){
				if(dnsp){
					document.getElementById("ipopbg" + i).style.top=jQuery(document).scrollTop()+"px";
					document.getElementById("ipopbg" + i).style.left=jQuery(document).scrollLeft()+"px";
				}
				else{
					document.getElementById("ipopbg" + i).style.top=jQuery(document).scrollTop()+"px";
					document.getElementById("ipopbg" + i).style.left=jQuery(document).scrollLeft()+"px";
				}
				document.getElementById("ipop"  + i).style.top=((jQuery(window).height()-parseInt(document.getElementById("ipop" + i).style.height))/2)+jQuery(document).scrollTop()+"px";
				document.getElementById("ipop" + i).style.left=((jQuery(window).width()-parseInt(document.getElementById("ipop" + i).style.width))/2)+jQuery(document).scrollLeft()+"px";
			}
		}
}



/****************************
Scene7 View Larger
*****************************/
var VL=false;
var AX_VL = {

	initVL : function(){
		VL = true;
		var divHt = '<div style="position:absolute;display:none;z-index:2998;background-color:#FFFFFF;" id="divViewLargerPort"><iframe id="iPortFrame" src="" width="100%" height="100%" frameborder="0" scrolling="no"></iframe></div>';
		jQuery('body').prepend(divHt);
	},

	reSize : function(){
		jQuery('#divViewLargerPort').css({width:jQuery(window).width(), height:(jQuery(window).height()-jQuery('.navheaderbg').innerHeight()+jQuery(document).scrollTop()), top:jQuery('.navheaderbg').innerHeight(), bottom:'0px', left:'0px'});
	},

	showVL : function(){
		jQuery('#divViewLargerPort').show();
	},

	hideVL : function(){
		jQuery('#divViewLargerPort').hide();
		jQuery('#iPortFrame').attr("src","");
	},

	vlPort : function (pSRC){
		jQuery('#iPortFrame').attr('src', pSRC);
		this.reSize();
		this.showVL();
	}
};



/**********************/
window.onscroll=wfOnScroll;
window.onresize=wfOnResize;






/**********************
Implementing back to top
~Biswa Dutta Jena
***********************/
var backToTopScroll=false; //Define this variable as true in the body of any page where the functionality is required
function bkToTop(){
	var body = jQuery("html, body");
	body.animate({scrollTop:0}, '500', 'swing');
}

function bkToTopScroll(){
	var bTT=jQuery("#backToTop");
	var tBuff=jQuery(".navheaderbg").height();//Height that needs to be scrolled before the back to top button appears
	var bH=jQuery(document).height() - bTT.parent().offset().top - 40;

	if(backToTopScroll && jQuery(document).height()-jQuery(document).scrollTop()-jQuery(window).height() >= bH){


		if (jQuery(document).scrollTop()>tBuff){
				bTT.addClass("fixedBTT");
				bTT.show("slow");
		}
		else if(jQuery(document).scrollTop()<tBuff){
			bTT.hide("slow", function(){bTT.removeClass("fixedBTT")});
		}
	}
	else{
		bTT.removeClass("fixedBTT");
	}

}


var isTouchDevice = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));


jQuery(document).ready(function(){
	jQuery(window).scroll(bkToTopScroll);
	if(isTouchDevice) backToTopScroll=false; //Stop back to top in touch devices like Pad
})

//Add a new CSS to control UI on touch devices
if (isTouchDevice) document.write('<link rel="stylesheet" href="/text/armaniexchange/staging/includes/carousel/touch.css" type="text/css" />');