$(document).ready(function(){
	$('.navigation li a:contains("Room Reservations")').attr('href', 'https://gc.synxis.com/rez.aspx?Chain=504&Hotel=504').attr('target', '_blank');
});

/*************************************************/

	function SuperTour1()
		{
		var myLink = "http://thebreakers.supertour.com";
		pageTracker._trackPageview('/SuperTourLink1.cfm');
		window.open(pageTracker._getLinkerUrl(myLink),'BreakersSuperTour','height=700,width=980,resizable=yes,toolbar=no,left=100,top=100,status=yes,location=yes,scrollbars=yes');
		}
	function SuperTour2()
		{
		var myLink = "http://www.supertour.com/superbranded%5Fv1";
		pageTracker._trackPageview('/SuperTourLink2.cfm');
		window.open(pageTracker._getLinkerUrl(myLink),'BreakersSuperTour','height=700,width=980,resizable=yes,toolbar=no,left=100,top=100,status=yes,location=no,scrollbars=yes');
		}	

	function testHomeSignUpForm()
		{
		var err = 0;
		var errMSG = "";
		if(document.SignUpForm.email.value == '')
			{
			err = 1;
			errMSG = "Please enter your email address";
			}
		if(!isEmail(document.SignUpForm.email.value))
			{
			err = 1;
			errMSG = "Please enter a valid email address";
			}
			
		//return value
		if(err == 1)
			{
			alert(errMSG);
			return false;
			}
		else
			{
			return true;
			}
		}
	function checkGoMenu() {
		if(document.navform.menu[document.navform.menu.selectedIndex].value != "")
			{return true;}
		else
			{return false;}
		};
	

var version4 = true;
var popupHandle;
function closePopup() {
if(popupHandle != null && !popupHandle.closed) popupHandle.close()
}


function displayPopup(position,url,name,height,width,evnt)
{
// Nannette Thacker http://www.shiningstar.net
// position=1 POPUP: makes screen display up and/or left,
//    down and/or right
// depending on where cursor falls and size of window to open
// position=2 CENTER: makes screen fall in center

var properties = "toolbar=0,location=0,height="+height
properties = properties+",width="+width

var leftprop, topprop, screenX, screenY, cursorX, cursorY, padAmt

if(navigator.appName == "Microsoft Internet Explorer")
{
	screenY = document.body.offsetHeight
	screenX = window.screen.availWidth
}
else
{ // Navigator coordinates
//		screenY = window.outerHeight
//		screenX = window.outerWidth
	// change made 3/16/01 to work with Netscape:
		screenY = screen.height;
		screenX = screen.width;
}

if(position == 1)	// if POPUP not CENTER
{
	cursorX = evnt.screenX
	cursorY = evnt.screenY
	padAmtX = 10
	padAmtY = 10
	
	if((cursorY + height + padAmtY) > screenY)	
	// make sizes a negative number to move left/up
	{
		padAmtY = (-30) + (height*-1);	
		// if up or to left, make 30 as padding amount
	}
	if((cursorX + width + padAmtX) > screenX)
	{
		padAmtX = (-30) + (width*-1);	
		// if up or to left, make 30 as padding amount
	}

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		leftprop = cursorX + padAmtX
		topprop = cursorY + padAmtY
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (cursorX - pageXOffset + padAmtX)
		topprop = (cursorY - pageYOffset + padAmtY)
	}
}
else	// CENTER
{
	leftvar = (screenX - width) / 2
	rightvar = (screenY - height) / 2
		
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		leftprop = leftvar
		topprop = rightvar
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (leftvar - pageXOffset)
		topprop = (rightvar - pageYOffset)
	}
}

if(evnt != null)
{
properties = properties+",left="+leftprop
properties = properties+",top="+topprop
}
closePopup()
popupHandle = open(url,name,properties)
}

function GetInList (list, index, delim)
{
	var flag = false, curr = 0;
	var posStart = "", posStop = "";

	// first, look for at least one occurance of the delimeter
	// if we can't find one, then just return the original
	if(list.indexOf(delim) == -1) return list;

	// alright, let's go through the string one character at a time
	for(x=0; x<list.length; x++)
	{
		/*/
		/ / We process if we find a delimeter, or we already found
		/ / a delimeter before and reached the end of the string.
		/*/
		if( (list.substr(x, 1) == delim) || (flag && (x == (list.length - 1))) )
		{
			// increment the current index if we need to
			if(index > 0) curr++;

			/*/ are we looking for the end or begining of the index? /*/
			if(flag)
			{	/*/ ending /*/

				/*/
				/ / Record the index for extraction later.  Remember, we want
				/ / the char before the delim, so we're done with this cycle.
				/ / But, we don't do this for the last index because there is
				/ / not delimeter for us to track, so we add one.
				/*/
				if(x == (list.length - 1))
					posStop = x + 1;
				else
					posStop = x;
				break;
			}
			else
			{	/*/ beginning /*/

				// did we find a match?
				if(curr == index)
				{
					/*/
					/ / We are on the index the caller wants.
					/ / So we record this for extraction later.
					/*/

					/*/ flag indicates we found the start /*/
					flag = true;

					/*/
					/ / Now, here's the tricky part.  If we're not on the first
					/ / index (0) we want posStart to be one greater than the
					/ / current iteration to pass up the delimeter; however,
					/ / if we are on the first index, we want posStart to be the
					/ / beginning and posStop to be what posStart was supposed to be.
					/*/
					if(curr == 0)
					{	/*/ zero /*/
						posStart = 0;
						posStop  = x;

						// we have the data we need
						break;
					}
					else
						/*/ non-zero /*/
						posStart = x + 1;
				}
			}
		}
	}

	/*/ if we made it here w/o flag being set, then we didn't find the index /*/
	if(!flag)
		return false;
	else
	{	/*/ we have what we need to extract the index /*/

		// return the data back to the caller
		return list.substring(posStart, posStop);
	}
}

function ListLen (list, delim)
{
	var curr = 0;
	var listToArray = "";

	listToArray = list.split(delim);
	
	curr = listToArray.length;
	
	//return the number of items in the list
	return curr;
}

function ListFind(list, item, delim) {
	var searchResult = false;
	//get the list length
	myListLength = ListLen(list, delim);
	//loop over the list using the GetInList() function
	for(i=0; i<=(myListLength-1); i++)
		{
		tempVar = GetInList(list, i, delim);
		if(tempVar == item)
			{searchResult = true; break;}
		}
	return searchResult;
}

function ListFindPos(list, item, delim) {
	var searchResult = 0;
	//get the list length
	myListLength = ListLen(list, delim);
	//loop over the list using the GetInList() function
	for(i=0; i<=(myListLength-1); i++)
		{
		tempVar = GetInList(list, i, delim);
		if(tempVar == item)
			{searchResult = i; break;}
		}
	return searchResult;
}
function SetCFCookie (name, value)
	{
	var name = name.toUpperCase();
	var path = "/";
	document.cookie = name + "=" + escape (value) +"; path=" + path + ";";
	};
function GetCFCookie(name)
	{ 
	var cname = name.toUpperCase() + "="; //the cookie name is given an equal signs after it and assigned as cname
	var dc = document.cookie; //the main document.cookie code that will follow is assigned to dc
	var bl = "";
	if (dc.length > 0)
		{ //here the length of the cookie is checked, if it is above 0 the function continues and if not then it returns null
		begin = dc.indexOf(cname); //here the indexOf() method is used to find the location of the cookie's name and it is assigned to begin
		if (begin != -1)
			{ //if the cookie's name is not found in dc then begin is given a value of -1
			begin += cname.length; //if the name is found begin is increased by the length of the cname
			end = dc.indexOf(";", begin); //the indexOf() method now searches for a semicolon to be given to the variable end
			if (end == -1) end = dc.length; 
			return unescape(dc.substring(begin, end)); //here is where is made sure that the value of the cookie is extracted and returned using the substring() method on dc
			} 
		}
	return bl; 
	}
function clicktrack()
	{
	if (location.pathname.indexOf('reservation_button_on_home_page')==-1)
	{
		var Click = GetCFCookie("ClickVisit");
		var Click = Click / 1;
		var ClickInc = Click + 1;
		SetCFCookie("ClickVisit",ClickInc);

	}
	else // if this is the reservation redirect page on the 3rd click, decrement one to delay the popunder
	{
		var Click = GetCFCookie("ClickVisit");
		if(Click==2)
		{
		var Click = Click / 1;
		var ClickInc = Click - 1;
		SetCFCookie("ClickVisit",ClickInc);
		}
	}
	};
window.load = clicktrack();
function GetCookie(name)
	{ 
	var cname = name + "="; //the cookie name is given an equal signs after it and assigned as cname
	var dc = document.cookie; //the main document.cookie code that will follow is assigned to dc
	var bl = "";
	if (dc.length > 0)
		{ //here the length of the cookie is checked, if it is above 0 the function continues and if not then it returns null
		begin = dc.indexOf(cname); //here the indexOf() method is used to find the location of the cookie's name and it is assigned to begin
		if (begin != -1)
			{ //if the cookie's name is not found in dc then begin is given a value of -1
			begin += cname.length; //if the name is found begin is increased by the length of the cname
			end = dc.indexOf(";", begin); //the indexOf() method now searches for a semicolon to be given to the variable end
			if (end == -1) end = dc.length; 
			return unescape(dc.substring(begin, end)); //here is where is made sure that the value of the cookie is extracted and returned using the substring() method on dc
			} 
		}
	return bl; 
	}

// Find and replace characters within a string
function Switch(item,OldChar,NewChar)
	{
	var _ONE=0;
	var _ret="";
	var _flag=0;
	var _item=item.split("");
	for(var i=0;i<_item.length;i++)
		{
		if(!_flag&&_item[i]==OldChar)
			{
			_item[i]=NewChar;
			_flag=_ONE;
			}
		_ret+=_item[i];
		}
	return(_ret);
	}

// open a new window


function getCookieVal (offset)
	{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
	};


function SetCookie (name, value)
	{
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var path = "/";
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	document.cookie = name + "=" + escape (value);
	//((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	//((path == null) ? "" : ("; path=" + path)) +
	//((domain == null) ? "" : ("; domain=" + domain)) +
	//((secure == true) ? "; secure" : "");
	};
	
	
function ResetCounts()
	{
	var expdate = new Date();
	expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365)); 
	visit = 0;
	SetCookie("visit", visit, expdate , "/", null, false);
	history.go(0);
	};

// Show the welcome in the header render nothing ask to remove 12/02/2011	
function showWelc()
	{
return false;
	}
// END Show the welcome in the header

//not used?
function eCommLargerImagePopup(loc, windowname)
{
	window.open(loc, windowname, 'width=375,height=395,left=1,top=1,scrollbars=no,resizable=no');
        return false;
}
//not used?	

function checkpop(myurl,width,height)
	{
	var pagelisting=GetCookie("poplist").split(",");
	var popwindow = true;
	for(var i=0;i < pagelisting.length;i++)
		{
		var mypage = pagelisting[i];
		if(myurl == mypage)
			{
			var popwindow = false;
			}
		}
	if(popwindow == true)
		{
		if(GetCookie("poplist").length == 0)
			{
			var setit = myurl;	
			}
		else
			{
			var setit = GetCookie("poplist") + "," + myurl;	
			}
		// set the cookie
		SetCookie("poplist",setit);
		// pop the window
		twin=window.open(myurl,'twin','resizable=no,toolbar=no,status=no,location=no,height='+height+',width='+width+',scrollbars=no');
		}
	}


var version4 = true;
var popupHandle;
function closePopup() {
if(popupHandle != null && !popupHandle.closed) popupHandle.close()
}


function displayPopup(position,url,name,height,width,evnt)
{
// Nannette Thacker http://www.shiningstar.net
// position=1 POPUP: makes screen display up and/or left,
//    down and/or right
// depending on where cursor falls and size of window to open
// position=2 CENTER: makes screen fall in center

var properties = "toolbar=0,location=0,height="+height
properties = properties+",width="+width

var leftprop, topprop, screenX, screenY, cursorX, cursorY, padAmt

if(navigator.appName == "Microsoft Internet Explorer")
{
	screenY = document.body.offsetHeight
	screenX = window.screen.availWidth
}
else
{ // Navigator coordinates
//		screenY = window.outerHeight
//		screenX = window.outerWidth
	// change made 3/16/01 to work with Netscape:
		screenY = screen.height;
		screenX = screen.width;
}

if(position == 1)	// if POPUP not CENTER
{
	cursorX = evnt.screenX
	cursorY = evnt.screenY
	padAmtX = 10
	padAmtY = 10
	
	if((cursorY + height + padAmtY) > screenY)	
	// make sizes a negative number to move left/up
	{
		padAmtY = (-30) + (height*-1);	
		// if up or to left, make 30 as padding amount
	}
	if((cursorX + width + padAmtX) > screenX)
	{
		padAmtX = (-30) + (width*-1);	
		// if up or to left, make 30 as padding amount
	}

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		leftprop = cursorX + padAmtX
		topprop = cursorY + padAmtY
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (cursorX - pageXOffset + padAmtX)
		topprop = (cursorY - pageYOffset + padAmtY)
	}
}
else	// CENTER
{
	leftvar = (screenX - width) / 2
	rightvar = (screenY - height) / 2
		
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		leftprop = leftvar
		topprop = rightvar
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (leftvar - pageXOffset)
		topprop = (rightvar - pageYOffset)
	}
}

if(evnt != null)
{
properties = properties+",left="+leftprop
properties = properties+",top="+topprop
}
closePopup()
popupHandle = open(url,name,properties)
}
	

function rezTrack()
	{
	var ref = escape(document.referrer);
	var Qstring = '?cid=504&ref='+ ref;
	var roiTrack = '<img src="'+document.location.protocol+'//reztrack.com/roi/' + Qstring;
	var roiGo =  roiTrack+ '"  height="0" width="0">';
	$(document.body).append(roiGo);
	};
window.load = rezTrack();

/* Photo Galleries on Accommodations */
$(document).ready(function(){
	var loaded = false;
	
	$('.lightboxLink a').each(function(){
		var $t = $(this);
		var href = $t.attr('href');
		if(href.match(/'([^']*)/)){
			$t.click(function(){
				loaded = false;
				window.scrollTo(0,1);
				$.fn.nyroModalManual({
					titleFromIframe: true, 
					height: href.match(/height=([0-9]*)/)[1], 
					width: href.match(/width=([0-9]*)/)[1], 
					url:href.match(/'([^']*)/)[1]+(href.match(/enter\.cfm/i)?'&view=1':('body_'+href.match(/([^']{2,})/g)[2]+'.htm?'+Math.random())),
					endShowContent: function(){
						$('.galleryPhoto').load();
					}
				});
				return false;
			});
		}
	});
	
	$('.galleryPhoto').live('load',function(){
		var $t = $(this);
		$t.css({position:'absolute'});
		if(!loaded&&$('.galleryPhoto').length>1){
			$t.css({'z-index':99}).addClass('active').after(
				'<div class="leftArrow" style="top:230px;left:20px;position:absolute;cursor:pointer;z-index:999;"><img src="/i/SITE_021227_132610_WMD8U/templates/arrow_left.png"></div>'
				+'<div class="rightArrow" style="top:230px;left:685px;position:absolute;cursor:pointer;z-index:999;"><img src="/i/SITE_021227_132610_WMD8U/templates/arrow_right.png"></div>'
			);
			$('.rightArrow,.leftArrow').fadeTo(0,.9);
			loaded = true;
		}
	});
	$('.rightArrow').live('click',function(){
		var $a = $('.active');
		var $n = $a.nextAll('.galleryPhoto:first');
		if($n.length==0)$n = $('.galleryPhoto:first');
		$n.css({'z-index':95}).addClass('active');
		$a.css({'z-index':99}).fadeOut({duration:800,easing:'swing',complete:function(){
			$a.css({'z-index':90}).show();
		}}).removeClass('active');
	});
	$('.leftArrow').live('click',function(){
		var $a = $('.active');
		var $n = $a.prevAll('.galleryPhoto:first');
		if($n.length==0)$n = $('.galleryPhoto:last');
		$n.css({'z-index':95}).addClass('active');
		$a.css({'z-index':99}).fadeOut({duration:800,easing:'swing',complete:function(){
			$a.css({'z-index':90}).show();
		}}).removeClass('active');
	});
});

function loadGallery(){

var buffer = false;
$(function(){
    if(buffer){
        $('div.slideshow').append('<div class="buffer"></div>');
        $('.buffer').css({
            'z-index':'4',
            'height':totalH,
            'width':totalW,
            'margin-left' : 0,
            'margin-top' : 0
        });
    }
                $('div.slideshow').height(totalH);
var d = new Date()
    $.ajax({
        url: path+'myimages.xml?='+d.getTime(),
        cache: false,
        dataType: 'xml',
        success: function(data){
            var dataArray = [];
            $(data).find('data').each(function(){
                dataArray.push({img:$(this).attr('img'),imgcaption:$(this).attr('imgcaption')});
            });
            $('.slideshow').append(
                '<img sr'+'c="'+path
                +dataArray[0].img
                +'" imagelabel="'
                +dataArray[0].imgcaption
                +'" style="position: absolute;display: none; ">'
            );
            dataArray.shift();
            /* As soon as the first image is loaded, we may begin */
            $('.slideshow img:first').load(function(){
                for(var i in dataArray){
                    $('.slideshow').append(
                        '<img sr'+'c="'+path
                        +dataArray[i].img
                        +'" imagelabel="'
                        +dataArray[i].imgcaption
                        +'" style="position: absolute;display: none; ">'
                    );
                }
                /* Variables */
                var transitionTime = 5000;
                
                /* Show First Image / Gallery / Hide Play Button */
                var n = $('.slideshow img:first');
                $('.descriptionText').html(n.attr('imageLabel').replace(/ /g,'')==''?'&nb'+'sp;':n.attr('imageLabel'));
                n.show();
                if(buffer){
                    $('.buffer').css({
                        'height':n.height(),
                        'width':n.width(),
                        'margin-left' : (totalW-n.width())/2,
                        'margin-top' : (totalH-n.height())/2
                    }).fadeOut(1000,function(){
                        n.css('z-index','5');
                        $('.buffer').show();
                    });
                    n.css({
                        position : 'absolute',
                        'margin-left' : (totalW-$(this).width())/2,
                        'margin-top' : (totalH-$(this).height())/2
                    });
                }
                
                $('.play').hide();
                var animating = false;
                var nextSlide = function(next){
                    /* Make sure we're not already in transition */
                    if(animating) return false;
                    animating = true;
                    var f = $('.slideshow img:visible');
                    if(next){
                        var n = $('.slideshow img:visible').prev('img');
                        if(n.length==0) n = $('.slideshow img:last');
                    }else{
                        var n = $('.slideshow img:visible').next('img');
                        if(n.length==0) n = $('.slideshow img:first');
                    }
                    /* Make sure the next image is loaded before proceeding (don't worry, the loop event will re-fire) */
                    //if(!n[0].complete) return false;
                    
                    /* Buffered Animation */
                    if(buffer){
                        $('.buffer').css({
                            'z-index':'4',
                            'height':f.height(),
                            'width':f.width(),
                            'margin-left' : (totalW-f.width())/2,
                            'margin-top' : (totalH-f.height())/2
                        });
                        f.css('z-index','5').fadeOut(600,function(){
                            $('.buffer').animate({
                                'height':n.height(),
                                'width':n.width(),
                                'margin-left' : (totalW-n.width())/2,
                                'margin-top' : (totalH-n.height())/2
                            },300,'swing',function(){
                                n.css({
                                    position : 'absolute',
                                    'margin-left' : (totalW-$(this).width())/2,
                                    'margin-top' : (totalH-$(this).height())/2,
                                    'z-index' : 3
                                }).show();
                                animating=false;
                                /* Alter Text */
                                $('.descriptionText').html(n.attr('imageLabel').replace(/ /g,'')==''?'&nb'+'sp;':n.attr('imageLabel'));
                                
                                $('.buffer').fadeOut(1000,function(){
                                    n.css('z-index','5');
                                    $('.buffer').show();
                                });
                            });
                        });
                    }else{
                        /* Non Buffered Animation */
                        f.css('z-index',5);
                        n.css('z-index',4).show();
                        f.fadeOut(1000,function(){
                            animating=false;
                            /* Alter Text */
                            $('.descriptionText').html(n.attr('imageLabel').replace(/ /g,'')==''?'&nb'+'sp;':n.attr('imageLabel'));
                        },'linear');
                    }
                };
                var looping=true;
                var t = setTimeout(function(){beginLoop();},transitionTime);
                var beginLoop = function(){
                    nextSlide();
                    t = setTimeout(function(){beginLoop();},transitionTime);
                };
                var play = function(){
                    clearTimeout(t);
                    $('.play').hide();
                    $('.pause').show();
                    beginLoop();
                };
                var pause = function(){
                    clearTimeout(t);
                    $('.play').show();
                    $('.pause').hide();
                };
                $('.play').click(play);
                $('.pause').click(pause);
                $('.back').click(function(){nextSlide(true);play();});
                $('.next').click(function(){nextSlide();play();});
            /* If the image is loaded from cache, the load event doesn't fire, this checks if it's already loaded and the load event missed */
            }).each(function(){
                if(this.complete) $(this).trigger("load");
            });
        }
    });
});
        
		
}


function popup_flash(url,swfId) {
	 var winName = Math.round(9999*Math.random()) + new Date().getTime();
	 var width  = screen.width;
	 var height = screen.height;
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	  var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=yes';
	 params += ', menubar=yes';
	 params += ', resizable=yes';
	 params += ', scrollbars=yes';
	 params += ', status=no';
	 params += ', toolbar=no';
	 var winNew = window.open(url,winName, params);
 if(!winNew) {
            		getSwf(swfId).openWindowFromSwf(url);
       	 }else {
            		winNew.focus();
       	 }
}
//Function used by flash booking mask links
function getSwf(id) {
if (navigator.appName.indexOf("Microsoft") != -1) {
            		return window[id];
        	} else {
           		 return document[id];
     }
}



$(document).ready(function(){
$('.arrow_left_home').click(function(){$('.back').click();});
$('.arrow_right_home').click(function(){$('.next').click();});
});
var clickedInternal = false;
$(function(){
  $('a').click(function(){
    if(this && this.href && ( this.href.match(/breakers.com/i) || !this.href.match(/http/) ) )
      clickedInternal = true;
  });
  $(window).unload(function(){
    if(!clickedInternal){
      /* This is where we trigger and cookie */
      document.cookie = 'exitedSite='+escape(new Date())+';expires='+new Date(new Date()*1+1000*60*60*24*90).toUTCString()+';';
    }
  });
});

/*
window.onbeforeunload = function(){
	if(!document.cookie.match(/exitedSite/) && !clickedInternal){
	      
	// This is where we trigger and cookie 
	document.cookie = 'exitedSite='+escape(new Date())+';expires='+new Date(new Date()*1+1000*60*60*24*90).toUTCString()+';';
	clickedInternal = true;
	$.fn.nyroModalManual({titleFromIframe: false, minWidth: 900, minHeight: 200, height: 500, width: 900, url:'http://esurvey.cendyn.com/eSurvey_Cendyn/eInsightweb.aspx?key=vXaHfpdCGxkwNDzr6kLEjVusU0lmH4%2fj&firstname=&lastname=&email=experience@breakers.com'});
	return 'Click to stay on this page and take a survey';
	}
}
*/


/*should we show click to talk based on eastern time*/

/*********************************************************
 *
 * This will find a fairly accurate eastern timestamp
 * 
 * (and hide the linkP2Talk accordingly)
 *
 **********************************************************/
/*
$(function(){
	var now = new Date()


	var startTime = 6
	var endTime = 19
	
	var newZone = -5
	var startDSTRange = new Date(Date.UTC(now.getYear()+1900,2,14))
	var endDSTRange = new Date(Date.UTC(now.getYear()+1900,10,7))
	if(
		now > startDSTRange
		&& now < endDSTRange
	)
		newZone++

	var date = new Date()
	var minute = 1000*60
	var hour = minute*60
	var offset = date.getTimezoneOffset()
	var utc = new Date(date*1 + offset*minute + newZone*hour)
	var hourOfDay= utc.getHours()
	if(
		hourOfDay < startTime
		|| hourOfDay >= endTime
	)
		$('#lnkP2Talk').remove()
})
*/
/*end click to talk*/
/*New booking mask code*/
$(document).ready(function() {
						   
		$("#arrive").datepicker({
			minDate:0,
			showAnim: "fadeIn",
			showOn: 'both',
			buttonText: 'Select Check In Date',
			buttonImage: '/i/SITE_021227_132610_WMD8U/templates/btnCal.png',
			buttonImageOnly: true,
			onSelect:function(theDate) {
				$("#depart").datepicker('option','minDate',addDays(new Date(theDate),1))
				if(($("#depart").datepicker( 'getDate' )===null)||(trim($("#depart").datepicker( 'getDate' ))=="")||(comparedate($("#arrive").datepicker( 'getDate' ),$("#depart").datepicker( 'getDate' )))){
					$("#depart").datepicker('setDate' ,addDays(new Date(theDate),1))
				}
			}
		});

		$("#depart").datepicker({
			minDate:1,
			showAnim: "fadeIn",
			showOn: 'both',
			buttonText: 'Select Check Out Date',
			buttonImage: '/i/SITE_021227_132610_WMD8U/templates/btnCal.png',
			buttonImageOnly: true,
			defaultDate: +1,
			gotoCurrent: true
		});	
		
		
		$("#arriveSub").datepicker({
			minDate:0,
			showAnim: "fadeIn",
			showOn: 'both',
			buttonText: 'Select Check In Date',
			buttonImage: '/i/SITE_021227_132610_WMD8U/templates/home_book_cal2.gif',
			buttonImageOnly: true,
			defaultDate: +1,
			gotoCurrent: true
		});	
		$("#arrive").datepicker('setDate',addDays(new Date(),0));
		$("#arriveSub").datepicker('setDate',addDays(new Date(),0));
		$("#depart").datepicker('setDate',addDays(new Date(),1));
		
		$("#dialog").dialog({
				bgiframe: true,
				modal: true,
				autoOpen: false,
				height:560,
				width:700,
				show: "fold",
				position:"center",
				buttons: {
					"Thank You": function() {
						$(this).dialog("close");
					}
				}
			});
 		
		$('li.ptt a.ir').click(function(e) {
			$.fn.nyroModalManual({titleFromIframe: false, minWidth: 700, minHeight: 550, height: 550, width: 700, content:'<iframe src="http://www.navistechnologies.info/p2talk/P2TCust.aspx?account=14595&dnis=8882732537" height="550px" width="700px"  frameborder="0"></iframe>'})
			/*$('#dialog').html('<iframe src="http://www.navistechnologies.info/p2talk/p2talk.aspx?Account=14595" height="400px" width="625px"  frameborder="0"></iframe>');
				$('#dialog').dialog('open');*/
			return false;
		});

});

var Booking_Domain = "gc.synxis.com" //needed for google_tracking.js
	
function bookinglinkUrchin() {
	_gaq.push(function() {
		var tracker = _gat._getTrackerByName(); 
		window.open(tracker._getLinkerUrl('https://gc.synxis.com/rez.aspx?Hotel=504&Chain=504'));
	});
}

jQuery(document).ready(function () {
/*
    if (jQuery(".Booking_Mask").length > 0) {
        jQuery(".Booking_Mask").submit(function () {

            var values = jQuery(this).serialize();
            var action = jQuery(this).attr('action')
            var strLink = action + '?' + values;

            var linkerUrl = getLinkerUrl(strLink);
            //trackPageview('/outgoing/checkavailability-bookingMask/');
            _gaq.push(['_trackEvent', 'Reservations', 'CheckAvailability', 'Submit']);

            window.open(linkerUrl, jQuery(this).attr('target'), '');
            return false;
        }); //end .Booking_Mask submit
    } //end if booking mask form 
*/

    function getLinkerUrl(url) {
        var tracker = _gat._getTrackerByName();
        var linkerUrl = tracker._getLinkerUrl(url);
        return linkerUrl;
    }

    function trackPageview(str) {
        _gaq.push(['_trackPageview', str]);
    }
	
    jQuery("a, area").click(function () {
        var strippedUrl;
        var str;
        var originalUrl = jQuery(this).attr('href');
        if (originalUrl != '') { //if it has an href (some <area> tags do not);
            strippedUrl = stripUrl(jQuery(this).attr('href'));
            if (contains(originalUrl, 'mailto:')) {
                //str = '/mailto/' + strippedUrl;
                //trackPageview(str);
                _gaq.push(['_trackEvent', 'MailTo', strippedUrl]);
                return true;
            }
            //Booking Domain undefined. - http://dmartin.org/weblog/javascript-checking-whether-a-variable-exists
            try {
                if (Booking_Domain) { }
            } catch (err) {
                Booking_Domain = "booking domain needs to be set in header";
            }
            //if Booking_Domain is a subdomain (as well as external) track outgoing
            //mh moved this block up b/c if we have a match on Booking_Domain we can return(since any domain that is the booking domain should return true;.
            if (contains(strippedUrl, Booking_Domain)) {
                //str = '/outgoing/checkavailability'
                //trackPageview(str);
                _gaq.push(['_trackEvent', 'Reservations', 'CheckAvailability', 'Link']);
                //for reservation links that open in pop-up windows, can put params in rel attribute
                if (jQuery(this).hasClass("popup")) {
                    var popup_params = 'resizable,scrollbars,width=1020,height=600,top=800,left=800';
                    //pull popup parameters from forms' rel attribute
                    if (jQuery(this).attr('rel') != undefined) {
                        popup_params = jQuery(this).attr('rel');
                    }
                    window.open(getLinkerUrl(originalUrl), '', popup_params);
                    return false; //so link doesn't return as well as popup
                } //end popup
                //sets getLinkerUrl href here
                jQuery(this).attr('href', getLinkerUrl(originalUrl));
                return true;
            }
            //if it doesn't have http or https then internal link do nothing - return true.
            //exclude internal relative links (those that have no protocol )
            if ((doesNotContains(originalUrl, 'http://')) && (doesNotContains(originalUrl, 'https://'))) return true;
            //if the hostname is not in the href url (external links)
            if (doesNotContains(strippedUrl, location.hostname)) {
                str = '/outgoing/' + strippedUrl;
                trackPageview(str);
            } // end external links block
            return true;
        } //end check if url has href
    }); //end click 
});        //end ready




	
	function addDays(myDate,days) {
	//myDate = starting date, days = no. days to add.
		var temp_date = new Date();
		var i = 0;
		var days_to_add = 0;
		while (i < (days)){
			temp_date = new Date(myDate.getTime() + (days_to_add*24*60*60*1000));
				i+=1;
			days_to_add += 1;
		}
		return new Date(myDate.getTime() + days_to_add*24*60*60*1000);
	}
	
	function comparedate(date1str,date2str){
		var date1 = new Date(date1str);
		var date2 = new Date(date2str);
		if (date1 > date2){
			return true;
		}else if (date1 < date2){
			return false;
		}else{
			return true;
		}
	}
	
	function trim(stringToTrim) {
		return stringToTrim.toString().replace(/^\s+|\s+$/g,"");
	}
	
	function stripUrl(inStrip) {
		inStrip = inStrip.replace(/http:/gi, '');
		inStrip = inStrip.replace(/https:/gi, '');
		inStrip = inStrip.replace(/www./gi, '');
		inStrip = inStrip.replace(/&/gi, '_');
		inStrip = inStrip.replace(/#/gi, ''); //remove hashes
		inStrip = inStrip.replace(/\/\//gi, ''); //remove slashes
		return inStrip;
	}
	
	function contains(haystack, needle) {
		return haystack.indexOf(needle) > -1;
	}
	
	function doesNotContains(haystack, needle) {
		return haystack.indexOf(needle) == -1;
	}
//extend navis number replacement
	$(document).ready(function() {
		try{
			
			var nums=["888-273-2537","561-659-8440","561-653-6656"]; 
			
			if(($.browser.msie && $.browser.version == 7) || ($.browser.msie && $.browser.version == 8)){
				var pNum = new Array();
					pNum[0] = '';
					pNum[1] = $('#navisNum').text();
					//alert(pNum[1])
			}else{
				var pNum = $('#navisNum').text().split(';');
			}	
			
			if(trim(pNum[1]).length >= 10) {
				$('*', 'body')
				.andSelf()
				.filter(function() {
					if(!$(this).is("iframe")){
						return this;
					}
				})
				.contents()
				.filter(function(){
					return this.nodeType === 3;
				})
				.filter(function(){
					for(var i = 0; i < nums.length; i++){
						if (this.nodeValue.indexOf(nums[i]) !=-1) {
							return this.nodeValue.indexOf(nums[i]) != -1;
							//console.log('hit')
						}
					}
					//return this.nodeValue.indexOf('888-273-2537') != -1;
					
				})
				.each(function(){
					$(this).parent().text($(this).text().replace(/888-273-2537|561-659-8440|561-653-6656/g, pNum[1]))
				});
			}
		}catch(e){
			//console.log(e);
		}
		
		(function($) {
			jQuery.fn.getchildNodes = function(){
				//console.log('foo');
				return this.childNodes;
			}
		})(jQuery);
	});




$(document).ready(function() {
    $('#homeSlides .photos').cycle({
		fx: 'fade', next: '#next', prev: '#prev'
	});
});

$(document).ready(function() {
						   
	$("#terms").dialog({
	        bgiframe: true,
	        modal: true,
	        autoOpen: false,
	        height:330,
	        width:450,
		show: "fold",
	        position:"center",
	        buttons: {"Thank You": function() {$(this).dialog("close");}}
	});						   
						   
	$('a.disclaimerID').click(function(e) {
		var ourContent = $('#' + $(this).attr("title")+ '').html();
		$('#terms').html('<div class="ui-corner-all" style="background-color:#fff; border:1px solid #fff; color:#444; padding:5px; line-height:1.8em;">'+ ourContent + '</div>')
			$("#terms").dialog('open');
			$('.ui-widget-overlay').css({'z-index':'999'});
		return false;
	});					   
});


$(document).ready(function(){
	$('a[href="http://rfp.thebreakers.com/Breaker/BreakerRFPform.aspx"]').attr('target' , '');
});



/****************************   [RSG] add navis number in booking mask and links [5/3/2012]  ****************************************/

$(document).ready(function() {
	try{
		//#hiddenNumber is a hidden span in the booking mask
		//alert($.browser.msie + '    ' + $.browser.version)
		if(($.browser.msie && $.browser.version == 7) || ($.browser.msie && $.browser.version == 8.0)){
			//alert($.browser.msie + '    ' + $.browser.version + '    ' + $('#hiddenNumber').text())
			var pNav = new Array();
				pNav[0] = '';
				pNav[1] = $('#hiddenNumber').text();
		}else{
			var pNav = $('#hiddenNumber').text().split(';');
		}	
		$('input[name="src"]').val(pNav[1].replace(/[^0-9.]/g, ""));
		
		$('a[href^="https://gc.synxis.com/rez.aspx"],a[href^="http://gc.synxis.com/rez.aspx"]').each(function() {
			$(this).attr('href',$(this).attr("href")+'&src='+pNav[1].replace(/[^0-9.]/g, ""));
		})
	
	}catch(e){
		//console.log(e);
	}
});
			

/***************************   [RSG] end add navis number is booking mask and links [5/3/2012]  ****************************************/




/*$(document).ready(function () {
	$("#homeSpecials .action").click(function () {
		var text = $(this).parent("div.copy1").children("h2").text();
		_gaq.push(['_trackEvent', 'Rotating Specials Widget', 'Click', text]);
	});
});*/

$(document).ready(function () {
	$("#homeSpecials .action").click(function () {
		var text = $(this).parent("div.copy1, div.copy2").children("h2").text();
		_gaq.push(['_trackEvent', 'Rotating Specials Widget', 'Click', text]);
	});
});




$(document).ready(function(){

	$(".instructorhide .show").click(function () {
		$(this).parent().next(".moretext").slideToggle("slow");
		$(this).slideToggle("fast");
		$(this).next(".hide").slideToggle("fast");
	});

	$(".instructorhide .hide").click(function () {
		$(this).parent().next(".moretext").slideToggle("slow");
		$(this).prev(".show").slideToggle("fast");
		$(this).slideToggle("fast");
	});

	$(".qatxt .show").click(function () {
		$(this).parent().parent().next(".bottom").slideToggle("slow");
		$(this).slideToggle("fast");
		$(this).next(".hide").slideToggle("fast");
	});

	$(".qatxt .hide").click(function () {
		$(this).parent().parent().next(".bottom").slideToggle("slow");
		$(this).prev(".show").slideToggle("fast");
		$(this).slideToggle("fast");
	});
});