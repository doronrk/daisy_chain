
// Javascript for: Browser Detect

// BROWSER AND PLATFORM DETECT SCRIPT
var agt = navigator.userAgent.toLowerCase();
var version = parseInt(navigator.appVersion);

var is_win = (agt.indexOf('win') != -1);
var is_mac = (agt.indexOf('mac') != -1);
var is_ie  = (agt.indexOf('msie') != -1);
var is_nav = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) 
				&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) 
				&& (agt.indexOf('webtv')==-1));

var ie4 = (is_ie && (version >= 4 ));
var nn4 = (is_nav && (version >= 4 ));

// USE DIFFERENT STYLES FOR MAC/IE

if (is_mac && ie4) {
	document.write('<style>');
	document.write('.container750Main {width:750px; position:relative;}');
	document.write('.floatingcircle {');
	document.write('  position: absolute;');
	document.write('  top: 8px;');
	document.write('  left: -4px;');
	document.write('  z-index:2;');
	document.write('  width:150px;');
	document.write('  visibility:visible;');
	document.write('}');
	document.write('.floatingcircle_c {');
	document.write('  position: absolute;');
	document.write('  top: 9px;');
	document.write('  left: 5px;');
	document.write('  z-index:2;');
	document.write('}');
	document.write('.popup_border {margin: 40px 0px 0px 40px;}');
	document.write('</style>');
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  
  if(!d) 
    d=document; 
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; 
    n=n.substring(0,p);
  }

  if(!(x=d[n])&&d.all) 
    x=d.all[n]; 
  for (i=0;!x&&i<d.forms.length;i++) 
    x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) 
    x=MM_findObj(n,d.layers[i].document);

  if(!x && document.getElementById) 
    x=document.getElementById(n); 
  return x;
}
	
function MM_preloadImages() { //v3.0
  var d=document; 
  if(d.images){
    if(!d.MM_p) 
      d.MM_p=new Array();

    var i,j=d.MM_p.length,a=MM_preloadImages.arguments,img;
    for(i=0; i<a.length; i++)
      if (a[i].indexOf("#")!=0){ 
        d.MM_p[j]=new Image;
				img = 'images/'+a[i];
        d.MM_p[j++].src=img;
    }
  }
}
	
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; 
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) 
    x.src=x.oSrc;
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) 
    with (navigator) {
      if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
        document.MM_pgW=innerWidth; 
        document.MM_pgH=innerHeight; 
        onresize=MM_reloadPage; 
    }
  } else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) 
    location.reload();
}

MM_reloadPage(true);

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; 

  document.MM_sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
    if ((x=MM_findObj(a[i]))!=null){
      document.MM_sr[j++]=x; 
      if(!x.oSrc) 
        x.oSrc=x.src; 
      x.src=a[i+2];
    }

}

function getElementPosition(elemID) {
	var offsetTrail = document.getElementById(elemID);
	var offsetLeft = 0;
	var offsetTop = 0;
	var coords = {left:0, top:0};
	while (offsetTrail) {
		offsetLeft += offsetTrail.offsetLeft;
		offsetTop += offsetTrail.offsetTop;
		offsetTrail = offsetTrail.offsetParent;
	}

	coords.left = offsetLeft;
	coords.top = offsetTop;
	return (coords);
}

var theMenuTimer;

function showGymFunMenu(evt) {
	
	clearTimeout(theMenuTimer);
	
	var position = getElementPosition('GymFunButton');

	theMenu = document.getElementById('GymFunMenu').style;
	theHeight = theMenu.height.substring(0,theMenu.height.indexOf('px'));
	theMenu.left = position.left + "px";
	theMenu.top = position.top - theHeight + "px";

 	theMenu.visibility = "visible";
}

function hideGymFunMenu() {
	theMenuTimer = setTimeout("doHideGymFunMenu()",1000);

}

function doHideGymFunMenu() {
	clearTimeout(theMenuTimer);
	theMenu = document.getElementById('GymFunMenu').style;
	theMenu.visibility = "hidden";

}


// Products Section
// expand/collapse category items
function cat_display(num,state) {
   var id = 'cat_' + num + '_' + state;

   document.getElementById('cat_'+num+'_hide').style.display="none";
   document.getElementById('cat_'+num+'_show').style.display="none";
   document.getElementById(id).style.display="inline";

   return false;
}

// expand/collapse "all categories" list
function allcats_display() {
	if (document.getElementById('allcats').style.display == "inline") {
		document.getElementById('allcats').style.display = "none";
	} else {
		document.getElementById('allcats').style.display = "inline";
	}
	return false;
}

/****** Shopping Bag Widget Functions ******/

// this function expects one of three values: {1, -1, 0}
// a value of 1 will move the scrollContentDiv to the right (scrolling left)
// a value of -1 will move the scrollContentDiv to the left (scrolling right)
// a value of 0 will stop scrolling
function scrollSBItems(direction) {
	if (direction != 0) {
		theInterval = setInterval("doMoveSB("+direction+")",interval);
	} else {
		clearInterval(theInterval);
		return false;
	}
}

function doMoveSB(direction) {
	theTable.l = theTable.l + (direction * scrollincrement);
	if (theTable.l >= rightlimit) {
		theTable.l = rightlimit;
		theLeftArrowImg.className="arrowdisabled";
		theLeftArrowImgDisabled.className="arrowleftnoclick";
		scrollSBItems(0);
	} else {
		theLeftArrowImg.className = "arrowleft";
		theLeftArrowImgDisabled.className = "arrowdisabled";
	}	
	
	if (theTable.l <= leftlimit) {
		theTable.l = leftlimit;
		theRightArrowImg.className = "arrowdisabled";
		theRightArrowImgDisabled.className = "arrowrightnoclick";
		scrollSBItems(0);
	} else {
		theRightArrowImg.className = "arrowright";
		theRightArrowImgDisabled.className = "arrowdisabled";
	}
	theTable.style.left = theTable.l + "px";
}

function initShoppingBagScroller() {
	theTable = document.getElementById('scrollContentDiv');
	theLeftArrowImg = document.getElementById('arrowleftimg');
	theLeftArrowImgDisabled = document.getElementById('arrowleftimgdisabled');
	theRightArrowImg = document.getElementById('arrowrightimg');
	theRightArrowImgDisabled = document.getElementById('arrowrightimgdisabled');
	theItems = theTable.getElementsByTagName('td');

	theTable.w = (theItems.length) * 70;  //width of each item
	theTable.l = 4; // scrollContentDiv initial left position
	
	viewerWidth = 571; // width of scrollWindowDiv
	
	// these two values can be used to adjust scrolling speed
	interval = 50;			// time between scroll jumps in msec (1000 = 1 sec)
	scrollincrement = 20;	// scroll jump distance in pixels

	rightlimit = 4;
	if (theTable.w > viewerWidth) {
		leftlimit = viewerWidth - theTable.w;
	} else {
		leftlimit = 4;
	}
	
	scrollSBItems(1);
}


function checkAlert(warningMsg){
	if(warningMsg != null && warningMsg != ""){
		alert(warningMsg);
	}
}

